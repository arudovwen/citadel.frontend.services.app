<template>
  <div className="">
    <Modal
      :activeModal="state.role.roleEditModal"
      @close="closeEditRoleModal"
      :title="`Update ${roleName} permissions`"
      sizeClass="max-w-[900px]"
      centered
    >
      <form
        @submit.prevent="updateRole"
        class="max-w-[100rem] p-6 space-y-4 bg-white"
      >
        <Textinput
          label="Role name"
          type="text"
          placeholder="Enter role name"
          name="title"
          v-model="roleName"
          disabled
          :error="roleNameError"
        />
        <div class="grid grid-cols-2 gap-x-8 max-h-[400px] overflow-x-auto">
          <ul
            class="border border-gray-200 rounded-lg max-h-[400px] overflow-y-auto overflow-x-auto p-6"
          >
            <p class="mb-3 font-medium cursor-pointer">Modules</p>
            <div v-if="modulesLoading || permissionsLoading" class="">
              ...Loading
            </div>
            <li v-for="n in modules" :key="n.name">
              <div
                class="capitalize mb-1 flex gap-3 items-center"
                @click="handleIndex(n.name)"
              >
                <span
                  :class="[
                    selectedIndex.includes(n.name) ? 'transform rotate-90' : '',
                    'mt-[-4px]',
                  ]"
                >
                  <svg
                    width="9"
                    height="10"
                    viewBox="0 0 9 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.627552 0.912076L8.38375 5.46257L0.564808 9.90439L0.627552 0.912076Z"
                      fill="#3B444C"
                    />
                  </svg>
                </span>

                {{ n.name }}
              </div>
              <div class="pl-2" v-if="selectedIndex.includes(n.name)">
                <ul>
                  <li v-for="p in n.permissions" :key="p">
                    <label
                      class="uppercase mb-1 text-sm flex gap-x-1 items-center"
                    >
                      <input
                        :value="p"
                        v-model="selectedPermissions"
                        type="checkbox"
                        :checked="true"
                      />
                      {{ p.displayValue }}
                    </label>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div
            class="border border-gray-200 rounded-lg p-6 max-h-[400px] overflow-y-auto overflow-x-auto min-h-full"
          >
            <p class="mb-3 font-medium">Selected Permissions</p>
            <ul>
              <ul>
                <li v-for="p in selectedPermissions" :key="p">
                  <label
                    class="uppercase mb-1 text-sm flex gap-x-1 items-center"
                  >
                    {{ p.displayValue }}
                  </label>
                </li>
              </ul>
            </ul>
          </div>
        </div>

        <div class="text-right mt-8">
          <Button
            text="Update role"
            btnClass="btn-dark"
            :isLoading="loading"
            :disabled="loading"
          ></Button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { ref, reactive, onMounted, watchEffect, defineProps } from "vue";
import Textinput from "@/components/Textinput";
// import { useStore } from "vuex";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

import { computed, watch } from "vue";

const props = defineProps(["detail"]);
onMounted(() => {
  dispatch("getModulesList");
  dispatch("getPermissionsList");
  if (props?.detail?.id) {
    dispatch("getRolePermissionsList", props.detail.id);
    setFieldValue("roleName", props.detail.name);
  }
});

const { state, dispatch } = useStore();
const isOpen = computed(() => state.role.roleEditModal);
const success = computed(() => state.role.addRoleSuccess);
const getRolePermissionsSuccess = computed(
  () => state.role.getRolePermissionsSuccess
);
const err = computed(() => state.role.addRoleError);
const loading = computed(() => state.role.addRoleLoading);
const modulesLoading = computed(() => state.role.getModulesLoading);
const permissionsLoading = computed(() => state.role.getRolePermissionsLoading);
const modulesList = computed(() => state.role.modules);
const rolepermissions = computed(() => state.role.rolepermissions);
const permissionsList = computed(() => state.role.permissions);
const toast = useToast();
const schema = yup.object({
  roleName: yup.string().required("Name is required"),
  selectedPermissions: yup.array(),
});

const selectedIndex = ref([]);
function handleIndex(index) {
  if (selectedIndex.value.includes(index)) {
    selectedIndex.value = selectedIndex.value.filter((i) => i != index);
  } else {
    selectedIndex.value.push(index);
  }
}

const modules = ref([]);

const formData = reactive({
  roleName: props?.detail?.name || "",
  selectedPermissions: [],
});
const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: formData,
});
const { value: roleName, errorMessage: roleNameError } = useField("roleName");
const { value: selectedPermissions } = useField("selectedPermissions");

const updateRole = handleSubmit((values) => {
  const payload = {
    roleName: values.roleName,
    platformPermissions: values?.selectedPermissions?.map((p) => {
      return {
        moduleName: p.moduleName,
        accessRight: p.accessRight,
      };
    }),
  };
  console.log("🚀 ~ file: index.vue:126 ~ addRole ~ values:", payload);
  dispatch("updateRolePermissions", payload);
});
const closeEditRoleModal = () => {
  dispatch("closeEditRoleModal");
};
watch(getRolePermissionsSuccess, () => {
  if (getRolePermissionsSuccess.value) {
    setFieldValue(
      "selectedPermissions",
      rolepermissions.value.map((i) => ({
        accessRight: i.accessRight,
        displayValue: `${i.accessRight.toUpperCase()}_${i.moduleName.toUpperCase()}`,
        moduleName: i.moduleName,
      }))
    );
    formData.selectedPermissions = rolepermissions.value.map((i) => ({
      accessRight: i.accessRight,

      displayValue: `${i.accessRight.toUpperCase()}_${i.moduleName.toUpperCase()}`,
      moduleName: i.moduleName,
    }));
    selectedIndex.value = [
      ...new Set(rolepermissions.value.map((i) => i.moduleName)),
    ];
  }
});

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Created Role");
    dispatch("getRolesList");
  }

  closeEditRoleModal();
});

watch(err, () => {
  resetForm();
  closeEditRoleModal();
});

watch(isOpen, () => {
  if (!isOpen.value) {
    resetForm();
  }
});
const defaultPermissions = [
  "can_create",
  "can_view",
  "can_update",
  "can_delete",
];
const otherPermissions = {
  Events: ["can_approve_reject"],
  Department: ["can_approve_reject_department_request", "can_view_all"],
  Appoitment: ["can_approve_reject"],
  "CIH Management": ["can_view_all_center_reports", "can_view_center_reports"],
  Members: ["can_update_church_affiliation", "can_update_other"],
  Zones: ["can_view_all"],
  Centers: ["can_view_all"],
  Outreach: ["can_approve_reject"],
  Venues: ["can_approve_reject"],
};
watchEffect(() => {
  if (modulesList.value?.length > 0 && permissionsList.value?.length > 0) {
    modules.value = modulesList.value?.map((module) => {
      return {
        name: module,
        permissions: permissionsList.value
          ?.map((permission) => {
            return {
              accessRight: permission,
              displayValue: `${permission.toUpperCase()}_${module.toUpperCase()}`,
              moduleName: module,
            };
          })
          .filter(
            (i) =>
              defaultPermissions.includes(i.accessRight) ||
              otherPermissions[module]?.includes(i.accessRight)
          ),
      };
    });
  }
});
</script>
<style lang=""></style>

<!-- 
// {
//   "roleName": "string",
//   "platformPermissions": [
//     {
//       "createdBy": "string",
//       "modifiedBy": "string",
//       "id": 0,
//       "moduleName": "string",
//       "roleId": "string",
//       "accessRight": "string"
//     }
//   ]
// }
\


when i click on a permission i want to add the modulename, accessright


s







// -->

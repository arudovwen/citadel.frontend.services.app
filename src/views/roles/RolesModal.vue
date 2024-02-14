<template>
  <div className="">
    <Modal
      :activeModal="state.role.roleModal"
      @close="closeRoleModal"
      title="Create Role"
      sizeClass="max-w-[800px]"
      centered
    >
      <form
        @submit.prevent="addRole"
        class="max-w-[100rem] p-6 space-y-4 bg-white"
      >
        <Textinput
          label="Role name"
          type="text"
          placeholder="Enter role name"
          name="title"
          v-model.value="roleName"
          :error="roleNameError"
        />

        <div
          class="grid grid-cols-2 gap-x-8 max-h-[400px] overflow-y-auto overflow-x-auto"
        >
          <ul class="border border-gray-200 rounded-lg overflow-x-auto p-6">
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
            text="Create role"
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
import { ref, reactive, onMounted, watchEffect } from "vue";
import Textinput from "@/components/Textinput";
// import { useStore } from "vuex";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

import { computed, watch } from "vue";
onMounted(() => {
  dispatch("getModulesList");
  dispatch("getPermissionsList");
});

const { state, dispatch } = useStore();
const isOpen = computed(() => state.role.roleModal);
const success = computed(() => state.role.addRoleSuccess);
const err = computed(() => state.role.addRoleError);
const loading = computed(() => state.role.addRoleLoading);
const modulesLoading = computed(() => state.role.getModulesLoading);
const permissionsLoading = computed(() => state.role.getPermissionsLoading);
const modulesList = computed(() => state.role.modules);
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

// const modules = [
//   {
//     name: "Module 1",
//     permissions: [
//       "CAN_VIEW_MODUL_1",
//       "CAN_DELETE_MODULE_1",
//       "CAN_CREATE_MODULE_1",
//     ],
//   },
//   {
//     name: "Module 2",
//     permissions: [
//       "CAN_VIEW_MODULE_2",
//       "CAN_DELETE_MODULE_2",
//       "CAN_CREATE_MODULE_2",
//     ],
//   },
// ];

const formData = reactive({
  roleName: "",
  selectedPermissions: [],
});
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: formData,
});
const { value: roleName, errorMessage: roleNameError } = useField("roleName");
const { value: selectedPermissions } = useField("selectedPermissions");

const addRole = handleSubmit((values) => {
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
  dispatch("addRole", payload);
});
const closeRoleModal = () => {
  dispatch("closeRoleModal");
};

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Created Role");
    dispatch("getRolesList");
  }

  closeRoleModal();
});

watch(err, () => {
  resetForm();
  closeRoleModal();
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
  Events: ["can_approve_reject_event"],
  Department: ["can_approve_reject_department_request"],
  Appoitment: ["can_approve_reject_appointment"],
  "CIH Management": [
    "can_view_all_zones",
    "can_view_zone",
    "can_view_all_centers",
    "can_view_center",
    "can_view_all_center_reports",
    "can_view_center_reports",
  ],
  Members: ["can_update_church_affiliation"],
};
watchEffect(() => {
  if (modulesList.value?.length > 0 && permissionsList.value?.length > 0) {
    modules.value = modulesList.value?.map((module) => {
      return {
        name: module,
        permissions: permissionsList.value
          ?.map((permission) => {
            return {
              moduleName: module,
              accessRight: permission,
              displayValue: permission.toUpperCase(),
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

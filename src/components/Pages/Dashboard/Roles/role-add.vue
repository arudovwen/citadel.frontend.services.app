<template>
  <form @submit.prevent="addRole" class="max-w-[60rem] p-6 space-y-4 bg-white">
    <Textinput
      label="Role name"
      type="text"
      placeholder="Enter role name"
      name="title"
      v-model.value="roleName"
      :error="roleNameError"
    />

    <!-- <Textarea
      label="Role description"
      type="text"
      placeholder="Enter role description"
      name="title"
      v-model.value="roleDesc"
      :error="roleDescError"
    /> -->

    <div class="grid grid-cols-2 gap-x-8">
      <ul
        class="border border-gray-200 rounded-lg overflow-x-auto p-6 max-h-[300px] overflow-y-auto"
      >
        <p class="mb-3 font-medium">Modules</p>
        <li v-for="n in modulesWithPermissions" :key="n.name">
          <div
            class="capitalize cursor-pointer mb-1"
            @click="handleIndex(n.name)"
          >
            {{ n.name }}
          </div>
          <div class="pl-2" v-if="selectedIndex.includes(n.name)">
            <ul>
              <li v-for="p in n.permissions" :key="p">
                <label class="uppercase mb-1 text-sm flex gap-x-1 items-center">
                  <input
                    :value="p"
                    v-model="platformPermissions"
                    type="checkbox"
                  />
                  {{ p.accessRight }}
                </label>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div
        class="border border-gray-200 rounded-lg p-6 max-h-[300px] overflow-y-auto"
      >
        <p class="mb-3 font-medium">Selected Permissions</p>
        <ul>
          <ul>
            <li v-for="p in platformPermissions" :key="p">
              <label class="uppercase mb-1 text-sm flex gap-x-1 items-center">
                {{ p.accessRight }}
              </label>
            </li>
          </ul>
        </ul>
      </div>
    </div>

    <div class="text-right mt-8">
      <Button
        :isLoading="loading"
        :disabled="loading"
        text="Create role"
        btnClass="btn-dark"
      ></Button>
    </div>
  </form>
</template>
<script setup>
import { ref, reactive, computed, watchEffect, watch } from "vue";
import { useField, useForm } from "vee-validate";
import Button from "@/components/Button";
import Textinput from "@/components/Textinput";
import * as yup from "yup";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

const { state, dispatch } = useStore();
const toast = useToast();
const success = computed(() => state.role.addRoleSuccess);
const loading = computed(() => state.role.addRoleLoading);
const selectedIndex = ref([]);
function handleIndex(index) {
  if (selectedIndex.value.includes(index)) {
    selectedIndex.value = selectedIndex.value.filter((i) => i != index);
  } else {
    selectedIndex.value.push(index);
  }
}

const modules = computed(() => {
  return state?.role?.modules?.map((i) => {
    return {
      name: i,
    };
  });
});

const fetchedPermissions = computed(() => {
  return state?.role?.permissions?.map((i) => {
    return {
      name: i,
    };
  });
});

const modulesWithPermissions = ref([]);

const schema = yup.object({
  roleName: yup.string().required("Name is required"),
  platformPermissions: yup.array(),
});

const formData = reactive({
  roleName: "",
  // roleDesc: "",
  platformPermissions: [],
});
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: formData,
});
const { value: roleName, errorMessage: roleNameError } = useField("roleName");
const { value: platformPermissions } = useField("platformPermissions");

const addRole = handleSubmit((values) => {
  // console.log("🚀 ~ file: index.vue:126 ~ addRole ~ values:", values);
  // console.log("Role and permission payload: " + JSON.stringify(values));
  dispatch("addRole", values);
});

watchEffect(() => {
  if (modules.value?.length !== 0 && fetchedPermissions.value?.length !== 0) {
    modulesWithPermissions.value = modules.value?.map((module) => {
      const moduleName = module?.name ?? ""; // Use optional chaining to get the name property
      return {
        name: moduleName,
        // permissions: fetchedPermissions.value?.map(
        //   (permission) =>
        //     permission.name +
        //     "_" +
        //     moduleName.toLowerCase().replace(/\s+/g, "_")
        // ),
        permissions: fetchedPermissions.value?.map((permission) => {
          return {
            moduleName: moduleName,
            accessRight:
              permission.name +
              "_" +
              moduleName.toLowerCase().replace(/\s+/g, "_"),
          };
        }),
      };
    });
  }
});

const closeModal = () => {
  dispatch("closeRoleEditModal");
  resetForm();
};

watch(loading, () => {
  console.log("loaded");
  if (!loading.value && success.value) {
    toast.success("Successfully Created");
    dispatch("getRoles");
  }

  closeModal();
});
</script>

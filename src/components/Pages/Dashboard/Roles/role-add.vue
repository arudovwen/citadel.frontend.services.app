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

    <Textarea
      label="Role description"
      type="text"
      placeholder="Enter role description"
      name="title"
      v-model.value="roleDesc"
      :error="roleDescError"
    />

    <div class="grid grid-cols-2 gap-x-8">
      <ul class="border border-gray-200 rounded-lg overflow-x-auto p-6">
        <p class="mb-3 font-medium">Modules</p>
        <li v-for="n in modules" :key="n.name">
          <div class="capitalize mb-1" @click="handleIndex(n.name)">
            {{ n.name }}
          </div>
          <div class="pl-2" v-if="selectedIndex.includes(n.name)">
            <ul>
              <li v-for="p in n.permissions" :key="p">
                <label class="uppercase mb-1 text-sm flex gap-x-1 items-center">
                  <input
                    :value="p"
                    v-model="selectedPermissions"
                    type="checkbox"
                  />
                  {{ p }}
                </label>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="border border-gray-200 rounded-lg p-6">
        <p class="mb-3 font-medium">Selected Permissions</p>
        <ul>
          <ul>
            <li v-for="p in selectedPermissions" :key="p">
              <label class="uppercase mb-1 text-sm flex gap-x-1 items-center">
                {{ p }}
              </label>
            </li>
          </ul>
        </ul>
      </div>
    </div>

    <div class="text-right mt-8">
      <Button text="Create role" btnClass="btn-dark"></Button>
    </div>
  </form>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useField, useForm } from "vee-validate";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
// import { useStore } from "vuex";
import * as yup from "yup";

const selectedIndex = ref([]);
function handleIndex(index) {
  if (selectedIndex.value.includes(index)) {
    selectedIndex.value = selectedIndex.value.filter((i) => i != index);
  } else {
    selectedIndex.value.push(index);
  }
}

const modules = [
  {
    name: "Module 1",
    permissions: [
      "CAN_VIEW_MODUL_1",
      "CAN_DELETE_MODULE_1",
      "CAN_CREATE_MODULE_1",
    ],
  },
  {
    name: "Module 2",
    permissions: [
      "CAN_VIEW_MODULE_2",
      "CAN_DELETE_MODULE_2",
      "CAN_CREATE_MODULE_2",
    ],
  },
];

const schema = yup.object({
  roleName: yup.string().required("Nmae is required"),
  roleDesc: yup.string().required("Please provide a description"),
  selectedPermissions: yup.array(),
});

const formData = reactive({
  roleName: "",
  roleDesc: "",
  selectedPermissions: [],
});
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formData,
});
const { value: roleName, errorMessage: roleNameError } = useField("roleName");
const { value: roleDesc, errorMessage: roleDescError } = useField("roleDesc");
const { value: selectedPermissions } = useField("selectedPermissions");

const addRole = handleSubmit((values) => {
  console.log("🚀 ~ file: index.vue:126 ~ addRole ~ values:", values);
});
</script>

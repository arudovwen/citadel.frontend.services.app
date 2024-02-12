<template>
  <div v-if="state.department.addmodal">
    <Modal
      :activeModal="state.department.addmodal"
      @close="closeModal"
      title="Create Department"
      centered
    >
      <form @submit.prevent="createDepartment" class="space-y-4">
        <Textinput
          label="department Name"
          type="text"
          placeholder="Department Name"
          name="departmentName"
          v-model.value="departmentName"
          :error="departmentNameError"
        />
        <div class="assagin space-y-4">
          <Textarea
            label="Department description"
            placeholder="Department description"
            v-model.value="description"
            :error="descriptionError"
          />

          <Select
            label="HOD"
            :options="membersOptions"
            v-model.value="hod"
            :error="hodError"
          />

          <!-- {{ membersOptions[0] }} -->
        </div>

        <div class="text-right">
          <Button
            text="Add department"
            type="submit"
            :isLoading="loading"
            :disabled="loading"
            btnClass="btn-dark"
          ></Button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import Select from "@/components/Select";
import Button from "@/components/Button";
import { computed, watch, onMounted } from "vue";
import Modal from "@/components/Modal";
import { useToast } from "vue-toastification";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
// import vSelect from "vue-select";
import { useStore } from "vuex";
import * as yup from "yup";

onMounted(() => {
  dispatch("getAllUsers", {
    pageNumber: 1,
    pageSize: 25000,
    name: "hod",
  });
});

let { dispatch, state } = useStore();
const toast = useToast();
const membersOptions = computed(() =>
  state?.member?.allUsers?.map((i) => {
    return {
      label: `${i.firstName} ${i.lastName}`,
      value: i.userId,
    };
  })
);
// const membersOptions = computed(() => state?.member?.data);
const success = computed(() => state.department.addsuccess);
const loading = computed(() => state.department.loading);

const schema = yup.object({
  departmentName: yup.string().required("Name is required"),
  description: yup.string().required("Please provide a short description"),
  hod: yup.string().nullable(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});
const { value: departmentName, errorMessage: departmentNameError } =
  useField("departmentName");
const { value: description, errorMessage: descriptionError } =
  useField("description");
const { value: hod, errorMessage: hodError } = useField("hod");
const createDepartment = handleSubmit((values) => {
  dispatch("addDepartment", {
    userId: values.hod,
    departmentCode:
      values.departmentName.slice(0, 2).toUpperCase() +
      Math.floor(Math.random() * 100 + 100),
    ...values,
  });
});

const closeModal = () => {
  dispatch("closeModal");
};
watch(success, () => {
  if (success.value) {
    closeModal();
    toast.success("Department created");
  }
});

watch(membersOptions, () => {
  console.log("🚀 ~ watch ~ membersOptions:", membersOptions.value);
});
</script>
<style lang=""></style>

<template>
  <div v-if="state.department.editModal">
    <Modal
      :activeModal="state.department.editModal"
      @close="closeEditModal"
      title="Update Department"
      centered
    >
      <form @submit.prevent="updateDepartment" class="space-y-4">
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

          <!-- <Select
            label="HOD"
            :options="membersOptions"
            v-model.value="hod"
            :error="hodError"
          /> -->
          <FormGroup label="HOD" :error="hodError">
            <VueSelect
              class="w-full mb-10"
              v-model.value="hod"
              :options="membersOptions"
              placeholder="Select HOD"
              name="hod"
              optionClass=""
            />
          </FormGroup>
        </div>
        <div class="text-right">
          <Button
            text="Update department"
            type="submit"
            :disabled="loading"
            :isLoading="loading"
            btnClass="btn-dark"
          ></Button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
// import Select from "@/components/Select";
import FormGroup from "@/components/FormGroup";
import VueSelect from "@/components/Select/VueSelect";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
// import VueSelect from "@/components/Select/VueSelect";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import { computed, onMounted, watch } from "vue";
// import vSelect from "vue-select";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import * as yup from "yup";

onMounted(() => {
  dispatch("getAllUsers", {
    pageNumber: 1,
    pageSize: 25000,
  });
});

let { dispatch, state } = useStore();

const toast = useToast();
const department = computed(() => state.department.department);

const success = computed(() => state.department.updatesuccess);
const loading = computed(() => state.department.loading);
const schema = yup.object({
  departmentName: yup.string().required("Name is required"),
  description: yup.string().required("Please provide a short description"),
  hod: yup.mixed().nullable(),
});
const membersOptions = computed(() =>
  state?.member?.allUsers?.map((i) => {
    return {
      label: `${i.firstName} ${i.lastName}`,
      value: i.userId,
    };
  })
);
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: department.value,
});
const { value: departmentName, errorMessage: departmentNameError } =
  useField("departmentName");
const { value: description, errorMessage: descriptionError } =
  useField("description");
const { value: hod, errorMessage: hodError } = useField("hod");

const updateDepartment = handleSubmit((values) => {
  dispatch("editDepartment", {
    id: values.id,
    userId: values.hod.value,
    departmentName: values.departmentName,
    departmentCode: values.departmentCode,
    description: values.description,
  });
});
// ...values,
// userId: values.hod.value,

const closeModal = () => {
  dispatch("closeModal");
};

watch(department, () => {
  setValues({
    ...department.value,
    hod: {
      label: department.value.hodName,
      value: department.value.userId,
    },
  });
});
watch(success, () => {
  if (success.value) {
    closeModal();
    toast.success("Department updated");
    dispatch("closeEditModal");
  }
});
const closeEditModal = () => {
  dispatch("closeEditModal");
};
</script>
<style lang=""></style>

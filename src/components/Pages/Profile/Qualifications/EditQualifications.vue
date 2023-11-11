<template>
  <div v-if="state.profile.editModal">
    <Modal
      :activeModal="state.profile.editModal"
      @close="closeEditModal"
      title="Update Qualificcation Details"
      centered
    >
      <form @submit.prevent="updateQualification" :validation-schema="schema">
        <div class="flex gap-x-8 mb-12">
          <div class="w-full lg:grid-cols-2 grid-cols-1 grid gap-5 last:mb-0">
            <Select
              label="Highest Qualification"
              :options="highestQualificationMenu"
              v-model.value="highestQualification"
              :modelValue="highestQualification"
              :error="highestQualificationError"
              classInput="!h-[40px]"
            />

            <Textinput
              label="Professional Qualification"
              type="text"
              placeholder="Type your professional qualification"
              name="professionalQualification"
              v-model="professionalQualification"
              :error="professionalQualificationError"
              classInput="h-[40px]"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            :disabled="submitLoading"
            :isLoading="submitLoading"
            type="submit"
            class="btn btn-primary block w-full text-center"
          >
            Save Changes
          </Button>
          <div class="hidden sm:block"></div>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import Button from "@/components/Button";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import Select from "@/components/Select";
import { useToast } from "vue-toastification";
import * as yup from "yup";
import { computed, watch, inject } from "vue";
import { useStore } from "vuex";
import { highestQualificationMenu } from "@/constant/data";

import Modal from "@/components/Modal";

let { dispatch, state } = useStore();

const toast = useToast();
const details = computed(() => state.profile.qualificationDetails);
const id = inject("id");

const success = computed(() => state.profile.updateQualificationDataSuccess);
const submitLoading = computed(
  () => state.profile.updateQualificationDataloading
);
const schema = yup.object({
  highestQualification: yup.string().required("This field is required"),
  professionalQualification: yup.string().nullable(),
});

const formValues = {
  highestQualification: "",
  professionalQualification: "",
};

const { handleSubmit, values, setValues } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const { value: highestQualification, errorMessage: highestQualificationError } =
  useField("highestQualification");

const {
  value: professionalQualification,
  errorMessage: professionalQualificationError,
} = useField("professionalQualification");

const prepareDetails = (values) => {
  const updateObj = {
    id: values.id,
    userId: id.value,
    highestQualification: values.highestQualification,
    professionalQualification: values.professionalQualification
      ? values.professionalQualification
      : "",
  };
  return updateObj;
};

const updateQualification = handleSubmit(() => {
  dispatch("updateQualification", prepareDetails(values));
});

watch(details, () => {
  setValues(details.value);
});
watch(success, () => {
  if (success.value) {
    if (state.profile.editModal) {
      toast.success("Details updated");
    }

    dispatch("getQualificationsById", id.value);
    closeEditModal();
  }
});
const closeEditModal = () => {
  dispatch("closeEditModal");
};
</script>
<style lang=""></style>

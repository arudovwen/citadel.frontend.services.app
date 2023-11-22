<template>
  <div>
    <Modal
      :activeModal="state.ministry.editModal"
      @close="closeModal"
      title="Edit Ministry"
      centered
    >
      <form @submit.prevent="updateMinistry" class="space-y-4">
        <Textinput
          label="Name"
          type="text"
          placeholder="Ministry name"
          name="ministryName"
          v-model.trim="ministryName"
          :error="ministryNameError"
        />
        <div class="assagin space-y-4">
          <Textarea
            label="Description"
            placeholder="description"
            v-model="description"
            :error="descriptionError"
          />
        </div>

        <div class="text-right">
          <Button
            :isLoading="loading"
            :disabled="loading"
            text="Save Changes"
            btnClass="btn-dark"
          ></Button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import * as yup from "yup";
import { computed, watch } from "vue";
import { useToast } from "vue-toastification";

const { state, dispatch } = useStore();
const ministry = computed(() => state.ministry.ministry);
const success = computed(() => state.ministry.updateMinistrySuccess);
const loading = computed(() => state.ministry.updateMinistryLoading);
const toast = useToast();

const schema = yup.object({
  ministryName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: ministry.value,
});
const { value: ministryName, errorMessage: ministryNameError } =
  useField("ministryName");
const { value: description, errorMessage: descriptionError } =
  useField("description");

// const { value: category, errorMessage: errorCategory } = useField("category");

const updateMinistry = handleSubmit((values) => {
  // console.log(values);
  dispatch("updateMinistry", values);
});

const closeModal = () => {
  dispatch("closeMinistryEditModal");
};

watch(ministry, () => {
  setValues(ministry.value);
});

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Updated");
    dispatch("getMinistries");
    closeModal();
  } else {
    closeModal();
  }
});
</script>
<style lang=""></style>

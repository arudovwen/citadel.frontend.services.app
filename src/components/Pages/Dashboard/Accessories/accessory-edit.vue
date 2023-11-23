<template>
  <div>
    <Modal
      :activeModal="state.accessory.editModal"
      @close="closeModal"
      title="Edit Acccessory"
      centered
    >
      <form @submit.prevent="updateAccessory" class="space-y-4">
        <Textinput
          label="Name"
          type="text"
          placeholder="Accessory name"
          name="accessoryName"
          v-model.trim="accessoryName"
          :error="accessoryNameError"
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
            text="Save changes"
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
import { computed, watch, inject } from "vue";
import { useToast } from "vue-toastification";

const { state, dispatch } = useStore();
const accessory = computed(() => state.accessory.accessory);
const success = computed(() => state.accessory.updateAccessorySuccess);
const loading = computed(() => state.accessory.updateAccessoryLoading);
const toast = useToast();
const userId = inject("userId");
const schema = yup.object({
  accessoryName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: accessory.value,
});
const { value: accessoryName, errorMessage: accessoryNameError } =
  useField("accessoryName");
const { value: description, errorMessage: descriptionError } =
  useField("description");

// const { value: category, errorMessage: errorCategory } = useField("category");

const updateAccessory = handleSubmit((values) => {
  // console.log(values);
  // console.log({ ...values, userId: userId.value });
  const data = {
    ...values,
    userId: userId.value,
  };
  dispatch("updateAccessory", data);
});

const closeModal = () => {
  dispatch("closeAccessoryEditModal");
};

watch(accessory, () => {
  setValues(accessory.value);
});

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Updated");
    dispatch("getAccessories");
    closeModal();
  } else {
    closeModal();
  }
});
</script>
<style lang=""></style>

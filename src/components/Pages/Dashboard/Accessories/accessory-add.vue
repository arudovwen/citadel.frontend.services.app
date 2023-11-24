<template>
  <div>
    <Modal
      :activeModal="state.accessory.addModal"
      @close="closeModal"
      title="Create Accessory"
      centered
    >
      <form @submit.prevent="addAccessory" class="space-y-4">
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
            text="Save"
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
import { useToast } from "vue-toastification";

import { computed, watch, inject } from "vue";

const { state, dispatch } = useStore();
const userId = inject("userId");
const success = computed(() => state.accessory.addAccessorySuccess);
const loading = computed(() => state.accessory.addAccessoryLoading);
const toast = useToast();
const schema = yup.object({
  accessoryName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const { value: accessoryName, errorMessage: accessoryNameError } =
  useField("accessoryName");
const { value: description, errorMessage: descriptionError } =
  useField("description");

const addAccessory = handleSubmit((values) => {
  const data = {
    userId: userId.value,
    ...values,
  };

  // console.log(data);
  dispatch("addAccessory", data);
});

const closeModal = () => {
  dispatch("closeAddAccessoryModal");
  resetForm();
};

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Created");
    dispatch("getAccessories");
  }

  closeModal();
});
</script>
<style lang=""></style>

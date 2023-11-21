<template>
  <div>
    <Modal
      :activeModal="state.ministry.addModal"
      @close="closeModal"
      title="Create Ministry"
      centered
    >
      <form @submit.prevent="addMinistry" class="space-y-4">
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
const success = computed(() => state.ministry.addMinistrySuccess);
const loading = computed(() => state.ministry.addMinistryLoading);
const toast = useToast();
const schema = yup.object({
  ministryName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: ministryName, errorMessage: ministryNameError } =
  useField("ministryName");
const { value: description, errorMessage: descriptionError } =
  useField("description");

const addMinistry = handleSubmit((values) => {
  const data = { userId: userId.value, ...values };
  console.log(data);
  dispatch("addMinistry", data);
});

const closeModal = () => {
  dispatch("toggleAddMinistry");
};

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Created");
    dispatch("getMinistries");
  }

  closeModal();

  // getAllZones();
});
</script>
<style lang=""></style>

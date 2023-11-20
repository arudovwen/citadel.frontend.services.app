<template>
  <div>
    <Modal
      :activeModal="state.zone.addmodal"
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
            text="Add Ministry"
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

import { computed, watch } from "vue";

const { state, dispatch } = useStore();
const success = computed(() => state.zone.addZoneSuccess);
const loading = computed(() => state.zone.addZoneLoading);
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
  console.log(values);
  // dispatch("addMinistry", values);
});

const closeModal = () => {
  dispatch("closeModal");
};

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Created");
    dispatch("getZones");
  }

  closeModal();

  // getAllZones();
});
</script>
<style lang=""></style>

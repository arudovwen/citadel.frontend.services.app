<template>
  <div>
    <Modal
      :activeModal="state.zone.addmodal"
      @close="closeModal"
      title="Create Special Unit"
      centered
    >
      <form @submit.prevent="addSpecialUnit" class="space-y-4">
        <Textinput
          label="Name"
          type="text"
          placeholder="Special Unit name"
          name="specialUnitName"
          v-model.trim="specialUnitName"
          :error="specialUnitNameError"
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

import { computed, watch } from "vue";

const { state, dispatch } = useStore();
const success = computed(() => state.zone.addZoneSuccess);
const loading = computed(() => state.zone.addZoneLoading);
const toast = useToast();
const schema = yup.object({
  specialUnitName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: specialUnitName, errorMessage: specialUnitNameError } =
  useField("specialUnitName");
const { value: description, errorMessage: descriptionError } =
  useField("description");

const addSpecialUnit = handleSubmit((values) => {
  console.log(values);
  // dispatch("addSpecialUnit", values);
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

<template>
  <div>
    <Modal
      :activeModal="state.zone.addmodal"
      @close="closeModal"
      title="Create Mountain of Influence"
      centered
    >
      <form @submit.prevent="addMOI" class="space-y-4">
        <Textinput
          label="Name"
          type="text"
          placeholder="Mointain of Influence name"
          name="mountainOfInfluence"
          v-model.trim="mountainOfInfluence"
          :error="mountainOfInfluenceError"
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
            text="Add mountain of influence"
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
  mountainOfInfluence: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: mountainOfInfluence, errorMessage: mountainOfInfluenceError } =
  useField("mountainOfInfluence");
const { value: description, errorMessage: descriptionError } =
  useField("description");

const addMOI = handleSubmit((values) => {
  console.log(values);
  // dispatch("addZone", values);
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

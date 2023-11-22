<template>
  <div>
    <Modal
      :activeModal="state.moi.addModal"
      @close="closeModal"
      title="Create Mountain of Influence"
      centered
    >
      <form @submit.prevent="addMOI" class="space-y-4">
        <Textinput
          label="Name"
          type="text"
          placeholder="Mointain of Influence name"
          name="mountainOfInfluenceName"
          v-model.trim="mountainOfInfluenceName"
          :error="mountainOfInfluenceNameError"
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

import { computed, watch, inject } from "vue";

const { state, dispatch } = useStore();
const userId = inject("userId");
const success = computed(() => state.moi.addMOISuccess);
const loading = computed(() => state.moi.addMOILoading);
const toast = useToast();
const schema = yup.object({
  mountainOfInfluenceName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const {
  value: mountainOfInfluenceName,
  errorMessage: mountainOfInfluenceNameError,
} = useField("mountainOfInfluenceName");
const { value: description, errorMessage: descriptionError } =
  useField("description");

const addMOI = handleSubmit((values) => {
  const data = { userId: userId.value, ...values };
  // console.log(data);
  dispatch("addMOI", data);
});

const closeModal = () => {
  dispatch("closeAddMOIModal");
  resetForm();
};

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Created");
    dispatch("getMOIs");
  }

  closeModal();
});
</script>
<style lang=""></style>

<template>
  <div>
    <Modal
      :activeModal="state.unit.addModal"
      @close="closeModal"
      title="Create Special Unit"
      centered
    >
      <form @submit.prevent="addUnit" class="space-y-4">
        <Textinput
          label="Name"
          type="text"
          placeholder="Special unit name"
          name="unitName"
          v-model.trim="unitName"
          :error="unitNameError"
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

import { computed, watch, inject, ref } from "vue";

const { state, dispatch } = useStore();
const userId = inject("userId");
const isSpecialUnit = ref(true);
const success = computed(() => state.unit.addUnitSuccess);
const loading = computed(() => state.unit.addUnitLoading);
const toast = useToast();
const schema = yup.object({
  unitName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const { value: unitName, errorMessage: unitNameError } = useField("unitName");
const { value: description, errorMessage: descriptionError } =
  useField("description");

const addUnit = handleSubmit((values) => {
  const data = {
    userId: userId.value,
    ...values,
    isSpecialUnit: isSpecialUnit.value,
  };

  // console.log(data);
  dispatch("addUnit", data);
});

const closeModal = () => {
  dispatch("closeAddUnitModal");
  resetForm();
};

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Created");
    dispatch("getUnits");
  }

  closeModal();
});
</script>
<style lang=""></style>

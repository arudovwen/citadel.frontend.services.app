<template>
  <div>
    <Modal
      :activeModal="state.unit.editModal"
      @close="closeModal"
      title="Edit Unit"
      centered
    >
      <form @submit.prevent="updateUnit" class="space-y-4">
        <Textinput
          label="Name"
          type="text"
          placeholder="Unit name"
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
import { computed, watch, inject, ref } from "vue";
import { useToast } from "vue-toastification";

const { state, dispatch } = useStore();
const unit = computed(() => state.unit.unit);
const success = computed(() => state.unit.updateUnitSuccess);
const loading = computed(() => state.unit.updateUnitLoading);
const toast = useToast();
const userId = inject("userId");
const isSpecialUnit = ref(false);
const schema = yup.object({
  unitName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: unit.value,
});
const { value: unitName, errorMessage: unitNameError } = useField("unitName");
const { value: description, errorMessage: descriptionError } =
  useField("description");

// const { value: category, errorMessage: errorCategory } = useField("category");

const updateUnit = handleSubmit((values) => {
  // console.log(values);
  // console.log({ ...values, userId: userId.value });
  const data = {
    ...values,
    userId: userId.value,
    isSpecialUnit: isSpecialUnit.value,
  };
  dispatch("updateUnit", data);
});

const closeModal = () => {
  dispatch("closeUnitEditModal");
};

watch(unit, () => {
  setValues(unit.value);
});

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Updated");
    dispatch("getUnits");
    closeModal();
  } else {
    closeModal();
  }
});
</script>
<style lang=""></style>

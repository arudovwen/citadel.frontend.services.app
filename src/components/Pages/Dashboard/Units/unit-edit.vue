<template>
  <div>
    <Modal
      :activeModal="state.zone.editModal"
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
import { computed, watch } from "vue";
import { useToast } from "vue-toastification";

const { state, dispatch } = useStore();
const zone = computed(() => state.zone.zone);
const success = computed(() => state.zone.updateZoneSuccess);
const loading = computed(() => state.zone.updateZoneLoading);
const toast = useToast();

const schema = yup.object({
  unitName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: zone.value,
});
const { value: unitName, errorMessage: unitNameError } = useField("unitName");
const { value: description, errorMessage: descriptionError } =
  useField("description");

// const { value: category, errorMessage: errorCategory } = useField("category");

const updateUnit = handleSubmit((values) => {
  console.log(values);
  // dispatch("updateUnit", values);
});

const closeModal = () => {
  dispatch("closeEditModal");
};

watch(zone, () => {
  setValues(zone.value);
});

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Updated");
    dispatch("getZones");
    closeModal();
  } else {
    closeModal();
  }

  // getAllZones();
});
</script>
<style lang=""></style>

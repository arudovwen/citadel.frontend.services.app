<template>
  <div>
    <Modal
      :activeModal="state.zone.editModal"
      @close="closeModal"
      title="Edit Ministry"
      centered
    >
      <form @submit.prevent="updateMinistry" class="space-y-4">
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
            text="Update mountain of influence"
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
  ministryName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: zone.value,
});
const { value: ministryName, errorMessage: ministryNameError } =
  useField("ministryName");
const { value: description, errorMessage: descriptionError } =
  useField("description");

// const { value: category, errorMessage: errorCategory } = useField("category");

const updateMinistry = handleSubmit((values) => {
  console.log(values);
  // dispatch("updateMinistry", values);
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

<template>
  <div>
    <Modal
      :activeModal="state.moi.editModal"
      @close="closeModal"
      title="Edit Mountain Of Influence"
      centered
    >
      <form @submit.prevent="updateMOI" class="space-y-4">
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
const moi = computed(() => state.moi.moi);
const success = computed(() => state.moi.updateMOISuccess);
const loading = computed(() => state.moi.updateMOILoading);
const toast = useToast();

const schema = yup.object({
  mountainOfInfluenceName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: moi.value,
});
const {
  value: mountainOfInfluenceName,
  errorMessage: mountainOfInfluenceNameError,
} = useField("mountainOfInfluenceName");
const { value: description, errorMessage: descriptionError } =
  useField("description");

// const { value: category, errorMessage: errorCategory } = useField("category");

const updateMOI = handleSubmit((values) => {
  // console.log(values);
  dispatch("updateMOI", values);
});

const closeModal = () => {
  dispatch("closeMOIEditModal");
};

watch(moi, () => {
  setValues(moi.value);
});

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Updated");
    dispatch("getMOIs");
    closeModal();
  } else {
    closeModal();
  }

  // getAllZones();
});
</script>
<style lang=""></style>

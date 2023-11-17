<template>
  <form @submit.prevent="onSubmit">
    <div class="flex gap-2 flex-col">
      <!-- <span>CenterTiUpdate: {{ centerToUpdate }}</span>
      <span>values: {{ values }}</span> -->
    </div>
    <Card>
      <div class="flex flex-col gap-y-6">
        <Textinput
          label="Name"
          type="text"
          v-model="centerName"
          :error="centerNameError"
          placeholder="Enter a name"
        />

        <div class="assagin space-y-4">
          <Textarea
            label="Address"
            placeholder="Update center address"
            v-model="description"
            :error="descriptionError"
          />
        </div>
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button
          :isLoading="loading"
          :disabled="loading"
          type="submit"
          text="Update record"
          btnClass="btn-dark w-full"
        />
      </div>
    </Card>
  </form>
</template>
<script setup>
import { watch, computed, inject } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import { useStore } from "vuex";
import Textarea from "@/components/Textarea";
import { useToast } from "vue-toastification";

const { state, dispatch } = useStore();
const toast = useToast();
const closeModal = inject("closeModal");
const success = computed(() => state.center.updateCenterSuccess);
const loading = computed(() => state.center.updateCenterLoading);
const centerToUpdate = computed(() => state.center.centerToUpdate);

const schema = yup.object().shape({
  centerName: yup.string().required("Name is required"),
  description: yup.string().required("Please provide center address"),
});

// eslint-disable-next-line no-unused-vars
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: centerToUpdate.value,
});

const { value: centerName, errorMessage: centerNameError } =
  useField("centerName");
const { value: description, errorMessage: descriptionError } =
  useField("description");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ file: edit-center.vue:74 ~ onSubmit ~ values:", values);
  dispatch("updateCenter", {
    id: values.id,
    centerName: values.centerName,
    description: values.description,
  });
});

watch(success, () => {
  if (success.value) {
    toast.success("Successfully updated");
    closeModal();
  }
});
</script>
<style lang=""></style>

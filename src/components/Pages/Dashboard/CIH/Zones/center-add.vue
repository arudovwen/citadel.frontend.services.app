<template>
  <form @submit.prevent="onSubmit">
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
            placeholder="Enter center address"
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
          text="Add center"
          btnClass="btn-dark w-full"
        />
      </div>
    </Card>
  </form>
</template>
<script setup>
import { reactive } from "vue";
import { useField, useForm } from "vee-validate";
import { useRoute } from "vue-router";
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import { useStore } from "vuex";
import { computed, watch, inject } from "vue";
import { useToast } from "vue-toastification";
import Textarea from "@/components/Textarea";

const { state, dispatch } = useStore();
const loading = computed(() => state.center.addCenterLoading);
const success = computed(() => state.center.addCenterSuccess);
const toast = useToast();
const closeModal = inject("closeModal");
const route = useRoute();

const formData = reactive({
  centerName: "",
  zoneId: route.params.zoneId,
  description: "",
});
const schema = yup.object().shape({
  centerName: yup.string().required("Name is required"),
  description: yup.string().required("Please provide center address"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formData,
});

const { value: centerName, errorMessage: centerNameError } =
  useField("centerName");

const { value: description, errorMessage: descriptionError } =
  useField("description");

const onSubmit = handleSubmit((values) => {
  console.log(values);
  // console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", values);
  dispatch("addCenter", values);
});

watch(success, () => {
  if (success.value) {
    toast.success("Center Created");
    dispatch("resetSuccess");
    closeModal();
  } else {
    closeModal();
  }
});
</script>
<style lang=""></style>

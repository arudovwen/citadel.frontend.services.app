<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Textinput
        label="Highest Qualification"
        type="text"
        placeholder="Type your highest qualification"
        name="highestQualification"
        v-model="highestQualification"
        :error="highestQualificationError"
        classInput="h-[48px]"
      />
      <Textinput
        label="Lowest Qualification"
        type="text"
        placeholder="Type your lowest qualification"
        name="lowestQualiofication"
        v-model="lowestQualiofication"
        :error="lowestQualioficationError"
        classInput="h-[48px]"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
      <div class="hidden sm:block"></div>
      <button type="submit" class="btn btn-dark block w-full text-center">
        Save Changes
      </button>
    </div>
  </form>
</template>

<script setup>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

// Define a validation schema
const schema = yup.object({
  highestQualification: yup.string(),
  lowestQualiofication: yup.string(),
});

const formValues = {
  highestQualification: "",
  lowestQualiofication: "",
};

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const { value: highestQualification, errorMessage: highestQualificationError } =
  useField("highestQualification");
const { value: lowestQualiofication, errorMessage: lowestQualioficationError } =
  useField("lowestQualiofication");

const onSubmit = handleSubmit((values) => {
  console.log("Qualifications: " + JSON.stringify(values));
});
</script>

<style lang="scss" scoped></style>

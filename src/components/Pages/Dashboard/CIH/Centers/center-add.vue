<template>
  <form @submit.prevent="onSubmit">
    <Card>
      <div class="flex flex-col gap-y-6">
        <Textinput
          label="Name"
          type="text"
          v-model="name"
          :error="nameError"
          placeholder="Enter a name"
        />
        <VueSelect
          class="min-w-[200px] w-full md:w-auto"
          v-model="zone"
          :options="options"
          placeholder="Select zone"
          name="zone"
        />
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button type="submit" text="Save record" btnClass="btn-dark w-full" />
      </div>
    </Card>
  </form>
</template>
<script setup>
import { reactive } from "vue";
import { useField, useForm } from "vee-validate";
import VueSelect from "@/components/Select/VueSelect";
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";

const formData = reactive({
  name: "",
  zone: "",
});
const formDataSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  zone: yup.string().required("Select a zone"),
});

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: name, errorMessage: nameError } = useField("name");
const options = [
  {
    value: "option2",
    label: "Zone 1",
  },
  {
    value: "option3",
    label: "Zone 2",
  },
];
const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", values);
});
</script>
<style lang=""></style>

<template>
  <form @submit.prevent="onSubmit">
    <Card title="">
      <div class="grid gap-5">
        <div class="">
          <Textinput
            label="Name"
            v-model="name"
            :error="nameError"
            placeholder="Provide name for outreach"
          />
        </div>
        <FormGroup
          label="Date of outreach"
          name="dateOfOutreach"
          :error="dateOfOutreachError"
        >
          <flat-pickr
            v-model="dateOfOutreach"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FormGroup>

        <div class="">
          <Textinput
            label="Location"
            v-model="location"
            :error="locationError"
            placeholder="Provide location for outreach"
          />
        </div>

        <Textarea
          label="Description"
          type="text"
          :rows="4"
          v-model="description"
          :error="descriptionError"
          placeholder="Provide a description"
        />
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button type="submit" text="Update info" btnClass="btn-dark" />
      </div>
    </Card>
  </form>
</template>
<script setup>
import { reactive } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";

const formData = reactive({
  dateOfOutreach: "",
  description: "",
  location: "",
  name: "",
});
const formDataSchema = yup.object().shape({
  name: yup
    .date()
    .typeError("Please enter a valid date")
    .required("Please provie a name"),

  dateOfOutreach: yup
    .date()
    .typeError("Please enter a valid date")
    .required("Date is required"),

  location: yup.string().required("Location is required"),
  description: yup.string().required("A short description is required"),
});

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: name, errorMessage: nameError } = useField("name");
const { value: location, errorMessage: locationError } = useField("location");
const { value: description, errorMessage: descriptionError } =
  useField("description");

const { value: dateOfOutreach, errorMessage: dateOfOutreachError } =
  useField("dateOfOutreach");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", values);
});
</script>
<style lang=""></style>

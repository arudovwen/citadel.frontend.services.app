<template>
  <form @submit.prevent="onSubmit">
    <Card title="">
      <div class="grid gap-5">
        <div class="">
          <Textinput
            label="Requester Name"
            v-model="name"
            :error="nameError"
            placeholder="Provide name for outreach"
          />
        </div>
        <FormGroup label="Event type" name="date" :error="typeError">
          <Select
            placeholder="Select type"
            v-model="type"
            :options="eventsOption"
          />
        </FormGroup>

        <FormGroup label="Event Date" name="date" :error="dateError">
          <flat-pickr
            v-model="date"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FormGroup>
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button type="submit" text="Submit" btnClass="btn-dark" />
      </div>
    </Card>
  </form>
</template>
<script setup>
import { reactive } from "vue";
import { useField, useForm } from "vee-validate";
import * as Yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import Select from "@/components/Select";

const eventsOption = [
  {
    value: "Baby Christening",
    label: "Baby Christening",
  },
  {
    value: "Baby Dedication",
    label: "Baby Dedication",
  },
  {
    value: "House Warming",
    label: "House Warming",
  },
  {
    value: "Special Thanksgiving",
    label: "Special Thanksgiving",
  },
  {
    value: "Burial Ceremony",
    label: "Burial Ceremony",
  },
];
const formData = reactive({
  date: "",
  type: "",

  name: "",
});
const formDataSchema = Yup.object().shape({
  date: Yup.date().required("Date is required"),
  type: Yup.string().required("Type is required"),
  name: Yup.string().required("Name is required"),
});

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: name, errorMessage: nameError } = useField("name");

const { value: date, errorMessage: dateError } = useField("date");

const { value: type, errorMessage: typeError } = useField("type");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", values);
});
</script>
<style lang=""></style>

<template>
  <form @submit.prevent="onSubmit">
    <Card title="">
      <div class="grid gap-5 mb-10">
        <FormGroup label="Date" name="dateOfOutreach" :error="dateError">
          <flat-pickr
            v-model="date"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FormGroup>

        <Textarea
          label="Summary"
          type="text"
          :rows="4"
          v-model="summary"
          :error="summaryError"
          placeholder="Provide activities report summary"
        />
      </div>

      <div>
        <h3 class="text-base font-bold mb-8">Converts Detail</h3>
        <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
          <h3 class="text-base font-medium min-w-[150px]">Adults</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textinput
              label="Total"
              v-model="adultsTotal"
              :error="adultsTotalError"
              placeholder="Enter value"
            />
            <Textinput
              label="Males"
              v-model="adultMales"
              :error="adultMalesError"
              placeholder="Enter value"
            />
            <Textinput
              label="Females"
              v-model="adultFemales"
              :error="adultFemalesError"
              placeholder="Enter value"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
          <h3 class="text-base font-medium min-w-[150px]">Youths</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textinput
              label="Total"
              v-model="youthsTotal"
              :error="youthsTotalError"
              placeholder="Enter value"
            />
            <Textinput
              label="Males"
              v-model="youthMales"
              :error="youthMalesError"
              placeholder="Enter value"
            />
            <Textinput
              label="Females"
              v-model="youthFemales"
              :error="youthFemalesError"
              placeholder="Enter value"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
          <h3 class="text-base font-medium min-w-[150px]">Teenagers</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textinput
              label="Total"
              v-model="teenagersTotal"
              :error="teenagersTotalError"
              placeholder="Enter value"
            />
            <Textinput
              label="Males"
              v-model="teenagerMales"
              :error="teenagerMalesError"
              placeholder="Enter value"
            />
            <Textinput
              label="Females"
              v-model="teenagerFemales"
              :error="teenagerFemalesError"
              placeholder="Enter value"
            />
          </div>
        </div>
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
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";

const formData = reactive({
  date: "",
  summary: "",
  adults: {
    total: null,
    males: null,
    females: null,
  },
  youths: {
    total: null,
    males: null,
    females: null,
  },
  females: {
    total: null,
    males: null,
    females: null,
  },
});
const formDataSchema = yup.object().shape({
  date: yup.string().required("Date is required"),
  summary: yup.string().required("Summary is required"),
  adults: yup.object().shape({
    total: yup
      .number()
      .typeError("Total adults must be a number")
      .required("Total adults is required")
      .min(0, "Total adults must be at least 0"),
    males: yup
      .number()
      .typeError("Male adults must be a number")
      .required("Male adults is required")
      .min(0, "Male adults must be at least 0"),
    females: yup
      .number()
      .typeError("Female adults must be a number")
      .required("Female adults is required")
      .min(0, "Female adults must be at least 0"),
  }),
  youths: yup.object().shape({
    total: yup
      .number()
      .typeError("Total youths must be a number")
      .required("Total youths is required")
      .min(0, "Total youths must be at least 0"),
    males: yup
      .number()
      .typeError("Male youths must be a number")
      .required("Male youths is required")
      .min(0, "Male youths must be at least 0"),
    females: yup
      .number()
      .typeError("Female youths must be a number")
      .required("Female youths is required")
      .min(0, "Female youths must be at least 0"),
  }),
  teenagers: yup.object().shape({
    total: yup
      .number()
      .typeError("Total females must be a number")
      .required("Total females is required")
      .min(0, "Total females must be at least 0"),
    males: yup
      .number()
      .typeError("Male females must be a number")
      .required("Male females is required")
      .min(0, "Male females must be at least 0"),
    females: yup
      .number()
      .typeError("Female females must be a number")
      .required("Female females is required")
      .min(0, "Female females must be at least 0"),
  }),
});

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: date, errorMessage: dateError } = useField("date");
const { value: summary, errorMessage: summaryError } = useField("summary");

const { value: adultsTotal, errorMessage: adultsTotalError } =
  useField("adults.total");
const { value: adultMales, errorMessage: adultMalesError } =
  useField("adults.males");
const { value: adultFemales, errorMessage: adultFemalesError } =
  useField("adults.females");

const { value: youthsTotal, errorMessage: youthsTotalError } =
  useField("youths.total");
const { value: youthMales, errorMessage: youthMalesError } =
  useField("youths.males");
const { value: youthFemales, errorMessage: youthFemalesError } =
  useField("youths.females");
const { value: teenagersTotal, errorMessage: teenagersTotalError } =
  useField("teenagers.total");
const { value: teenagerMales, errorMessage: teenagerMalesError } =
  useField("teenagers.males");
const { value: teenagerFemales, errorMessage: teenagerFemalesError } =
  useField("teenagers.females");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", values);
});
</script>
<style lang=""></style>

<template>
  <form @submit.prevent="onSubmit">
    <Card title="">
      <div class="grid gap-5">
        <div class="">
          <Textinput
            label="Activity Name"
            v-model="name"
            :error="nameError"
            placeholder="Provide name for outreach"
          />
        </div>
        <FormGroup label="Activity Date" name="date" :error="dateError">
          <flat-pickr
            v-model="date"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FormGroup>
        <div class="">
          <Textinput
            label="State of flocks"
            v-model="name"
            :error="nameError"
            placeholder=""
          />
        </div>
        <div>
          <h3 class="text-base font-bold mb-8">Attendance Detail</h3>
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
          <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
            <h3 class="text-base font-medium min-w-[150px]">Children</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Textinput
                label="Total"
                v-model="childrensTotal"
                :error="childrensTotalError"
                placeholder="Enter value"
              />
              <Textinput
                label="Males"
                v-model="childrenMales"
                :error="childrenMalesError"
                placeholder="Enter value"
              />
              <Textinput
                label="Females"
                v-model="childrenFemales"
                :error="childrenFemalesError"
                placeholder="Enter value"
              />
            </div>
          </div>
        </div>
        <Textarea
          label="Summary"
          type="text"
          :rows="4"
          v-model="summary"
          :error="summaryError"
          placeholder="Provide a summary"
        />
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
import Textarea from "@/components/Textarea";

const formData = reactive({
  date: "",
  type: "",
  center: "",
  zone: "",
  state_of_flock: "",
  summary: "",
  name: "",
  attendance: {
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

    teenagers: {
      total: null,
      males: null,
      females: null,
    },
    children: {
      total: null,
      males: null,
      females: null,
    },
  },
});
const formDataSchema = Yup.object().shape({
  date: Yup.date()
    .typeError("Please enter a valid date")
    .required("Date is required"),
  type: Yup.string().required("Type is required"),
  center: Yup.string().required("Center is required"),
  zone: Yup.string().required("Zone is required"),
  state_of_flock: Yup.string().required("State of Flock is required"),
  summary: Yup.string().required("Summary is required"),
  name: Yup.string().required("Name is required"),
  attendance: Yup.object().shape({
    adults: Yup.object().shape({
      total: Yup.number().required("Total Adult is required").nullable(),
      males: Yup.number().required("Male Adult is required").nullable(),
      females: Yup.number().required("Female Adult is required").nullable(),
    }),
    youths: Yup.object().shape({
      total: Yup.number().required("Total Youth is required").nullable(),
      males: Yup.number().required("Male Youth is required").nullable(),
      females: Yup.number().required("Female Youth is required").nullable(),
    }),

    teenagers: Yup.object().shape({
      total: Yup.number().required("Total Teenager is required").nullable(),
      males: Yup.number().required("Male Teenager is required").nullable(),
      females: Yup.number().required("Female Teenager is required").nullable(),
    }),
    children: Yup.object().shape({
      total: Yup.number().required("Total Children is required").nullable(),
      males: Yup.number().required("Male Children is required").nullable(),
      females: Yup.number().required("Female Children is required").nullable(),
    }),
  }),
});

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: name, errorMessage: nameError } = useField("name");
const { value: adultsTotal, errorMessage: adultsTotalError } = useField(
  "attendance.adults.total"
);
const { value: adultMales, errorMessage: adultMalesError } = useField(
  "attendance.adults.males"
);
const { value: adultFemales, errorMessage: adultFemalesError } = useField(
  "attendance.adults.females"
);

const { value: youthsTotal, errorMessage: youthsTotalError } = useField(
  "attendance.youths.total"
);
const { value: youthMales, errorMessage: youthMalesError } = useField(
  "attendance.youths.males"
);
const { value: youthFemales, errorMessage: youthFemalesError } = useField(
  "attendance.youths.females"
);
const { value: teenagersTotal, errorMessage: teenagersTotalError } = useField(
  "attendance.teenagers.total"
);
const { value: teenagerMales, errorMessage: teenagerMalesError } = useField(
  "attendance.teenagers.males"
);
const { value: teenagerFemales, errorMessage: teenagerFemalesError } = useField(
  "attendance.teenagers.females"
);
const { value: childrensTotal, errorMessage: childrensTotalError } = useField(
  "attendance.teenagers.total"
);
const { value: childrenMales, errorMessage: childrenMalesError } = useField(
  "attendance.teenagers.males"
);
const { value: childrenFemales, errorMessage: childrenFemalesError } = useField(
  "attendance.teenagers.females"
);

const { value: summary, errorMessage: summaryError } = useField("summary");

const { value: date, errorMessage: dateError } = useField("date");

// const { value: zone, errorMessage: Error } = useField("zone");

// const { value: center, errorMessage: centerError } = useField("center");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", values);
});
</script>
<style lang=""></style>

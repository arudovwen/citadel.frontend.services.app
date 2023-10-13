<!-- <template>
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

<style lang="scss" scoped></style> -->

<template>
  <div>
    <Card bodyClass="p-0">
      <header
        class="border-b px-4 border-slate-100 dark:border-slate-700 pt-4 pb-3 flex justify-between items-center"
      >
        <h6 class="card-title mb-0">Repeating Forms</h6>
        <div>
          <Button
            text="Add new"
            icon="heroicons-outline:plus"
            btnClass="btn-dark"
            @click="push(formValues)"
          />
        </div>
      </header>
      <div class="p-6">
        <!-- {{ values }} -->
        <form @submit="onSubmit" novalidate>
          <div
            v-for="(field, idx) in fields"
            :key="field.idx"
            class="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
          >
            <Textinput
              :key="field.idx"
              :id="`highestQualification_${idx}`"
              label="Highest Qualification"
              v-model="values.users[idx].highestQualification"
              type="text"
              :name="`users[${idx}].highestQualification`"
              placeholder="Type your highest qualification"
            />
            <Textinput
              :key="field.idx"
              :id="`lowestQualiofication_${idx}`"
              label="Lowest Qualification"
              type="text"
              v-model="values.users[idx].lowestQualiofication"
              :name="`users[${idx}].lowestQualiofication`"
              placeholder="Type your lowest qualification"
            />

            <div class="flex justify-between items-end space-x-5">
              <div class="flex-none relative">
                <button
                  type="button"
                  class="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                  @click="remove(idx)"
                >
                  <Icon icon="heroicons-outline:trash" />
                </button>
              </div>
            </div>
          </div>

          <div class="ltr:text-right rtl:text-left">
            <Button
              text="Submit"
              btnClass="btn-dark"
              :isDisabled="fields.length === 0"
            />
          </div>
        </form>
      </div>
    </Card>
  </div>
</template>
<script setup>
import { useForm, useFieldArray } from "vee-validate";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import Icon from "@/components/Icon";

const formValues = {
  highestQualification: "dd",
  lowestQualiofication: "ff",
};

const { handleSubmit, values } = useForm({
  initialValues: {
    users: [formValues, formValues],
  },
});
const { remove, push, fields } = useFieldArray("users");
const onSubmit = handleSubmit(() => {
  console.log("Qualifications: " + JSON.stringify(values.users, null, 2));
});
</script>

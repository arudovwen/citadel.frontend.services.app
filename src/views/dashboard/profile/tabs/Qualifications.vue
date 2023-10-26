<template>
  <div>
    <Card bodyClass="p-0">
      <header
        class="border-b px-4 border-slate-100 dark:border-slate-700 pt-4 pb-3 flex justify-end items-center"
      >
        <div>
          <Button
            text="Add new"
            icon="heroicons-outline:plus"
            btnClass="btn btn-primary "
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
              v-model="values.qualifications[idx].highestQualification"
              type="text"
              :name="`qualifications[${idx}].highestQualification`"
              placeholder="Type your highest qualification"
            />
            <Textinput
              :key="field.idx"
              :id="`lowestQualification_${idx}`"
              label="Lowest Qualification"
              type="text"
              v-model="values.qualifications[idx].lowestQualification"
              :name="`qualifications[${idx}].lowestQualification`"
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
              btnClass="btn btn-primary "
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
  highestQualification: "",
  lowestQualification: "",
};

// const schema = yup.object().shape({
//   qualifications: yup
//     .array()
//     .of(
//       yup.object().shape({
//         name: yup.string().required().label('Name'),
//         email: yup.string().email().required().label('Email'),
//       })
//     )
//     .strict(),
// });

const { handleSubmit, values } = useForm({
  initialValues: {
    qualifications: [formValues],
  },
});

const { remove, push, fields } = useFieldArray("qualifications");
const onSubmit = handleSubmit(() => {
  console.log(
    "Qualifications: " + JSON.stringify(values.qualifications, null, 2)
  );
});
</script>

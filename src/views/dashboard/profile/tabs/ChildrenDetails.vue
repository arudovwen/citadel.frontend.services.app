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
            class="flex gap-x-8 mb-12"
          >
            <div
              class="w-full lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 last:mb-0"
            >
              <Textinput
                :key="field.idx"
                :id="`firstName_${idx}`"
                label="First Name"
                type="text"
                v-model="values.childrenDetails[idx].firstName"
                placeholder="Type your first name"
                :name="`childrenDetails[${idx}].firstName`"
                :error="firstNameError"
                classInput="h-[40px]"
              />

              <Textinput
                :key="field.idx"
                :id="`lastName_${idx}`"
                label="Last Name"
                type="text"
                v-model="values.childrenDetails[idx].lastName"
                placeholder="Type your last name"
                :name="`childrenDetails[${idx}].lastName`"
                :error="lastNameError"
                classInput="h-[40px]"
              />

              <Textinput
                :key="field.idx"
                :id="`middleName_${idx}`"
                label="Middle Name"
                type="text"
                v-model="values.childrenDetails[idx].middleName"
                placeholder="Type your middle name"
                :name="`childrenDetails[${idx}].middleName`"
                :error="middleNameError"
                classInput="h-[40px]"
              />

              <Textinput
                :key="field.idx"
                :id="`email_${idx}`"
                label="Middle Name"
                type="text"
                v-model="values.childrenDetails[idx].email"
                placeholder="Type your email address"
                :name="`childrenDetails[${idx}].email`"
                :error="emailError"
                classInput="h-[40px]"
              />

              <Textinput
                :key="field.idx"
                :id="`mobile1_${idx}`"
                label="Mobile 1"
                type="text"
                v-model="values.childrenDetails[idx].mobile1"
                placeholder="Type your mobile number"
                :name="`childrenDetails[${idx}].mobile1`"
                :error="mobile1Error"
                classInput="h-[40px]"
              />

              <Textinput
                :key="field.idx"
                :id="`mobile2_${idx}`"
                label="Mobile 2"
                type="text"
                v-model="values.childrenDetails[idx].mobile2"
                placeholder="Type your mobile 2"
                :name="`childrenDetails[${idx}].mobile2`"
                :error="mobile2Error"
                classInput="h-[40px]"
              />

              <CustomVueSelect
                :key="field.idx"
                :id="`title_${idx}`"
                label="Title"
                v-model="values.childrenDetails[idx].title"
                :name="`childrenDetails[${idx}].title`"
                :modelValue="title"
                :error="titleError"
                :options="titleMenu"
                @update:modelValue="defaultSelectedValue = $event"
              />

              <CustomVueSelect
                :key="field.idx"
                :id="`gender_${idx}`"
                label="Gender"
                v-model="values.childrenDetails[idx].gender"
                :name="`childrenDetails[${idx}].gender`"
                :modelValue="gender"
                :error="genderError"
                :options="genderMenu"
                @update:modelValue="defaultSelectedValue = $event"
              />

              <FromGroup label="DOB" name="d1">
                <flat-pickr
                  :key="field.idx"
                  v-model="values.childrenDetails[idx].DOB"
                  class="form-control"
                  id="d1"
                  placeholder="yyyy, dd M"
                />
              </FromGroup>
            </div>
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
import Icon from "@/components/Icon";
import Card from "@/components/Card";
import Button from "@/components/Button";
import FromGroup from "@/components/FromGroup";
import Textinput from "@/components/Textinput";
import { useForm, useFieldArray } from "vee-validate";
import { titleMenu, genderMenu } from "@/constant/data";
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";

// import * as yup from "yup";
// import { useRouter } from "vue-router";

// Define a validation schema
// const schema = yup.object({
//   firstName: yup.string().required("First name is required"),
// lastName: yup.string().required("Last name is required"),
// middleName: yup.string(),
// email: yup.string().required("Email is required").email(),
// mobile1: yup.string(),
// mobile2: yup.string(),

// title: yup
//   .object()
//   .shape({
//     value: yup.string().required("Title text is required"),
//     label: yup.string(),
//   })
//   .nullable(),

// gender: yup
//   .object()
//   .shape({
//     value: yup.string(),
//     label: yup.string(),
//   })
//   .nullable(),
// DOB: yup.string(),
// });

// const router = useRouter();

// const goToProfile = () => {
//   router.push("/profile");
// };

const formValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  title: {
    value: "",
    label: "",
  },
  mobile1: "",
  mobile2: "",
  gender: {
    value: "",
    label: "",
  },
  DOB: "",
};

const { handleSubmit, values } = useForm({
  // validationSchema: schema,
  initialValues: {
    childrenDetails: [formValues],
  },
});
// No need to define rules for fields

// const { value: firstName, errorMessage: firstNameError } =
//   useField("firstName");
// const { value: lastName, errorMessage: lastNameError } = useField("lastName");
// const { value: middleName, errorMessage: middleNameError } =
//   useField("middleName");
// const { value: email, errorMessage: emailError } = useField("email");
// const { value: mobile1, errorMessage: mobile1Error } = useField("mobile1");
// const { value: mobile2, errorMessage: mobile2Error } = useField("mobile2");

// const { value: title, errorMessage: titleError } = useField("title");

// const { value: gender, errorMessage: genderError } = useField("gender");

// const { value: DOB } = useField("DOB");

// const { value: email, errorMessage: emailError } = useField("email");

const { remove, push, fields } = useFieldArray("childrenDetails");

// console.log(
//   firstName + lastName + middleName + email + mobile1 + mobile2 + title + DOB
// );

const onSubmit = handleSubmit((values) => {
  console.log("PersonalDetails: " + JSON.stringify(values));
  // goToProfile();
});
</script>

<style lang="scss" scoped></style>

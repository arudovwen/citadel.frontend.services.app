<template>
  <Card>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Textinput
          label="First Name"
          type="text"
          placeholder="Type your first name"
          name="firstName"
          v-model="firstName"
          :error="firstNameError"
          classInput="h-[40px]"
        />
        <Textinput
          label="Last Name"
          type="text"
          placeholder="Type your last name"
          name="lastName"
          v-model="lastName"
          :error="lastNameError"
          classInput="h-[40px]"
        />
        <Textinput
          label="Middle Name"
          type="text"
          placeholder="Type your middle name"
          name="middleName"
          v-model="middleName"
          :error="middleNameError"
          classInput="h-[40px]"
        />

        <Textinput
          label="Email"
          type="email"
          placeholder="Type your email"
          name="emil"
          v-model="email"
          :error="emailError"
          classInput="h-[40px]"
        />
        <Textinput
          label="Mobile 1"
          type="text"
          placeholder="Type your mobile 1"
          name="mobile1"
          v-model="mobile1"
          :error="mobile1Error"
          classInput="h-[40px]"
        />

        <Textinput
          label="Mobile 2"
          type="text"
          placeholder="Type your mobile 2"
          name="mobile2"
          v-model="mobile2"
          :error="mobile2Error"
          classInput="h-[40px]"
        />

        <CustomVueSelect
          name="title"
          v-model="title"
          :modelValue="title"
          :error="titleError"
          :options="titleMenu"
          label="Title"
          @update:modelValue="defaultSelectedValue = $event"
        />

        <CustomVueSelect
          name="gender"
          v-model="gender"
          :modelValue="gender"
          :error="genderError"
          :options="genderMenu"
          label="Gender"
          @update:modelValue="defaultSelectedValue = $event"
        />

        <FromGroup label="DOB" name="d1">
          <flat-pickr
            v-model="DOB"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FromGroup>

        <FromGroup label="Wedding Anniversary" name="d2">
          <flat-pickr
            v-model="weddingAnniversary"
            class="form-control"
            id="d2"
            placeholder="yyyy, dd M"
          />
        </FromGroup>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
        <div class="hidden sm:block"></div>
        <button type="submit" class="btn btn-primary block w-full text-center">
          Save Changes
        </button>
      </div>
    </form>
  </Card>
</template>

<script setup>
import Card from "@/components/Card";
import FromGroup from "@/components/FromGroup";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
import { useRouter } from "vue-router";
import { titleMenu, genderMenu } from "@/constant/data";
// Define a validation schema
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  middleName: yup.string(),
  email: yup.string().required("Email is required").email(),
  mobile1: yup.string().required("Mobile 1 is required"),
  mobile2: yup.string(),

  title: yup
    .object()
    .shape({
      value: yup.string().required("Title text is required"),
      label: yup.string(),
    })
    .nullable(),

  gender: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
  DOB: yup.string(),
  weddingAnniversary: yup.string(),
});

const router = useRouter();

const goToProfile = () => {
  router.push("/profile");
};

const formValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  email: "dashcode@gmail.com",
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
  weddingAnniversary: "",
};

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
// No need to define rules for fields

const { value: firstName, errorMessage: firstNameError } =
  useField("firstName");
const { value: lastName, errorMessage: lastNameError } = useField("lastName");
const { value: middleName, errorMessage: middleNameError } =
  useField("middleName");
const { value: email, errorMessage: emailError } = useField("email");
const { value: mobile1, errorMessage: mobile1Error } = useField("mobile1");
const { value: mobile2, errorMessage: mobile2Error } = useField("mobile2");

const { value: title, errorMessage: titleError } = useField("title");

const { value: gender, errorMessage: genderError } = useField("gender");

const { value: DOB } = useField("DOB");
const { value: weddingAnniversary } = useField("weddingAnniversary");

// const { value: email, errorMessage: emailError } = useField("email");

const onSubmit = handleSubmit((values) => {
  console.log("PersonalDetails: " + JSON.stringify(values));
  goToProfile();
});
</script>

<style lang="scss" scoped></style>

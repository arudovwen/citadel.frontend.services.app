<template>
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
      <Textinput
        label="Address 1"
        type="text"
        placeholder="Type your address 1"
        name="address1"
        v-model="address1"
        :error="address1Error"
        classInput="h-[40px]"
      />
      <Textinput
        label="Address 2"
        type="text"
        placeholder="Type your address 2"
        name="address2"
        v-model="address2"
        :error="address2Error"
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
        name="LGA"
        v-model="LGA"
        :modelValue="LGA"
        :error="LGAError"
        :options="LGAMenu"
        label="LGA"
        @update:modelValue="defaultSelectedValue = $event"
      />
      <CustomVueSelect
        name="state"
        v-model="state"
        :modelValue="state"
        :error="stateError"
        :options="stateMenu"
        label="State"
        @update:modelValue="defaultSelectedValue = $event"
      />

      <CustomVueSelect
        name="country"
        v-model="country"
        :modelValue="country"
        :error="countryError"
        :options="countryMenu"
        label="Country"
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

      <CustomVueSelect
        name="employmentStatus"
        v-model="employmentStatus"
        :modelValue="employmentStatus"
        :error="employmentStatusError"
        :options="employmentStatusMenu"
        label="Employment Status"
        @update:modelValue="defaultSelectedValue = $event"
      />

      <CustomVueSelect
        name="nationality"
        v-model="nationality"
        :modelValue="nationality"
        :error="nationalityError"
        :options="nationalityMenu"
        label="Nationality"
        @update:modelValue="defaultSelectedValue = $event"
      />

      <CustomVueSelect
        name="stateOfOrigin"
        v-model="stateOfOrigin"
        :modelValue="stateOfOrigin"
        :error="stateOfOriginError"
        :options="stateOfOriginMenu"
        label="State of Origin"
        @update:modelValue="defaultSelectedValue = $event"
      />

      <CustomVueSelect
        name="maritalStatus"
        v-model="maritalStatus"
        :modelValue="maritalStatus"
        :error="maritalStatusError"
        :options="maritalStatusMenu"
        label="Marital Status"
        @update:modelValue="defaultSelectedValue = $event"
      />

      <Textinput
        label="Nearest Bus Stop"
        type="text"
        placeholder="Type your nearest bus stop"
        name="nearestBusStop"
        v-model="nearestBusStop"
        :error="nearestBusStopError"
        classInput="h-[40px]"
      />

      <Textinput
        label="Place Of Birth"
        type="text"
        placeholder="Type your placeOfBirth"
        name="placeOfBirth"
        v-model="placeOfBirth"
        :error="placeOfBirthError"
        classInput="h-[40px]"
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
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
import { useRouter } from "vue-router";
import {
  titleMenu,
  LGAMenu,
  stateMenu,
  countryMenu,
  genderMenu,
  employmentStatusMenu,
  nationalityMenu,
  stateOfOriginMenu,
  maritalStatusMenu,
} from "@/constant/data";
// Define a validation schema
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  middleName: yup.string(),
  email: yup.string().required("Email is required").email(),
  mobile1: yup.string().required("Mobile 1 is required"),
  mobile2: yup.string(),
  address1: yup.string(),
  address2: yup.string(),
  // title: yup.string(),
  title: yup
    .object()
    .shape({
      value: yup.string().required("Title text is required"),
      label: yup.string(),
    })
    .nullable(),
  nearestBusStop: yup.string(),
  LGA: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
  state: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
  country: yup
    .object()
    .shape({
      value: yup.string(),
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
  employmentStatus: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
  placeOfBirth: yup.string(),
  nationality: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
  stateOfOrigin: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
  maritalStatus: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
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
  address1: "",
  address2: "",
  title: {
    value: "Mrs",
    label: "Mrs",
  },
  mobile1: "",
  mobile2: "",
  nearestBusStop: "",
  LGA: {
    value: "",
    label: "",
  },
  state: {
    value: "",
    label: "",
  },
  country: {
    value: "",
    label: "",
  },
  gender: {
    value: "",
    label: "",
  },
  employmentStatus: {
    value: "",
    label: "",
  },
  placeOfBirth: "",
  nationality: {
    value: "",
    label: "",
  },
  stateOfOrigin: {
    value: "",
    label: "",
  },
  maritalStatus: {
    value: "",
    label: "",
  },
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
const { value: address1, errorMessage: address1Error } = useField("address1");
const { value: address2, errorMessage: address2Error } = useField("address2");
const { value: title, errorMessage: titleError } = useField("title");
const { value: nearestBusStop, errorMessage: nearestBusStopError } =
  useField("nearestBusStop");
const { value: LGA, errorMessage: LGAError } = useField("LGA");
const { value: state, errorMessage: stateError } = useField("state");
const { value: country, errorMessage: countryError } = useField("country");
const { value: gender, errorMessage: genderError } = useField("gender");
const { value: employmentStatus, errorMessage: employmentStatusError } =
  useField("employmentStatus");
const { value: placeOfBirth, errorMessage: placeOfBirthError } =
  useField("placeOfBirth");
const { value: nationality, errorMessage: nationalityError } =
  useField("nationality");
const { value: stateOfOrigin, errorMessage: stateOfOriginError } =
  useField("stateOfOrigin");
const { value: maritalStatus, errorMessage: maritalStatusError } =
  useField("maritalStatus");

// const { value: email, errorMessage: emailError } = useField("email");

const onSubmit = handleSubmit((values) => {
  console.log("PersonalDetails: " + JSON.stringify(values));
  goToProfile();
});
</script>

<style lang="scss" scoped></style>

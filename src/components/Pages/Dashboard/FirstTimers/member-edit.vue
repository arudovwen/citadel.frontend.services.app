<template>
  <form @submit.prevent="onSubmit">
    <Card noborder className="border-none shadow-none" bodyClass="p-2" title="">
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <Textinput
          label="First Name"
          type="text"
          v-model="firstName"
          :error="firstNameError"
          placeholder="Add your first name"
        />
        <Textinput
          label="Middle name"
          type="text"
          v-model="middleName"
          :error="middleNameError"
          placeholder="Add your middle name"
        />
        <Textinput
          label="Surname"
          type="text"
          v-model="surName"
          :error="surNameError"
          placeholder="Add your surname"
        />
        <Select
          label="Gender"
          :options="genderOptions"
          v-model="gender"
          :error="genderError"
        />
        <FormGroup
          label="Date of birth"
          name="dateOfBirth"
          :error="dateOfBirthError"
        >
          <flat-pickr
            v-model="dateOfBirth"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FormGroup>
        <Textinput
          label="Phone"
          type="text"
          v-model="mobile1"
          :error="mobile1Error"
          placeholder="Add your phone"
        />
        <div class="lg:col-span-2 col-span-1">
          <Textinput
            label="Email"
            type="email"
            v-model="email"
            :error="emailError"
            placeholder="Add your email"
          />
        </div>
        <FormGroup
          label="Date of visit"
          name="dateOfVisit"
          :error="dateOfVisitError"
        >
          <flat-pickr
            v-model="dateOfVisit"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FormGroup>

        <Select
          label="Purpose of visit"
          :options="purposeOptions"
          v-model="purposeOfVisit"
          :error="purposeOfVisitError"
        />
        <Select
          label="Place of visit"
          :options="placeOptions"
          v-model="placeOfVisit"
          :error="placeOfVisitError"
        />
        <div class="lg:col-span-2 col-span-1">
          <Textinput
            label="Residential Address"
            v-model="address"
            :error="addressError"
            placeholder="Enter our residential address"
          />
        </div>

        <Textinput
          label="Nearest Busstop"
          type="ext"
          v-model="nearestBusStop"
          :error="nearestBusStopError"
          placeholder="Add your nearest bus-stop"
        />
        <FormGroup label="Country" :error="countryError">
          <VueSelect
            class="w-full"
            v-model.value="country"
            :options="countriesOption"
            placeholder="Select your country"
            name="country"
          />
        </FormGroup>

        <FormGroup label="State" :error="stateError">
          <VueSelect
            class="w-full"
            v-model.value="state"
            :options="statesOption"
            placeholder="Select your state"
            name="state"
          />
        </FormGroup>
        <Textinput
          label="City"
          v-model="city"
          :error="cityError"
          type="text"
          placeholder="Enter your city"
        />
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button type="submit" text="Update record" btnClass="btn-dark" />
      </div>
    </Card>
  </form>
</template>
<script setup>
import VueSelect from "@/components/Select/VueSelect";
import { reactive } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import Select from "@/components/Select";
import { defineProps, watch, computed } from "vue";
import { useStore } from "vuex";
import Countries from "@/util/countries.json";

const toast = useToast();
// eslint-disable-next-line no-unused-vars
const countriesOption = computed(() =>
  Countries.map((i) => {
    return { label: i.name, value: i.name };
  })
);
const statesOption = computed(() => {
  return Countries.find((i) => i.name === country.value.label)?.states?.map(
    (i) => {
      return { label: i.name, value: i.name };
    }
  );
});
const { dispatch, state: vState } = useStore();
const props = defineProps(["detail"]);
const formData = reactive({
  dateOfVisit: "",
  surName: "",
  firstName: "",
  middleName: "",
  gender: "",
  dateOfBirth: "",
  mobile1: "",
  email: "",
  address: "",
  nearestBusStop: "",
  city: "",
  state: "",
  country: "",
  purposeOfVisit: "",
  placeOfVisit: "",
});
const formDataSchema = yup.object().shape({
  dateOfVisit: yup
    .date()
    .typeError("Please enter a valid date")
    .required("Date of Visit is required"),
  surName: yup.string().required("Surname is required"),
  firstName: yup.string().required("firstName is required"),
  middleName: yup.string().required("middleName is required"),
  gender: yup.string().required("Gender is required"),
  dateOfBirth: yup
    .date()
    .typeError("Please enter a valid date")
    .required("Date of Birth is required"),
  mobile1: yup.string().required("Phone Number is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email Address is required"),
  address: yup.string().required("Residential Address is required"),
  nearestBusStop: yup.string().required("Nearest Bus Stop is required"),
  city: yup.string().required("City is required"),
  state: yup.object().required("State is required"),
  country: yup.object().required("Country is required"),
  purposeOfVisit: yup.string().required("Purpose of Visit is required"),
  placeOfVisit: yup.string().required("Place of Visit is required"),
});
const purposeOptions = [
  { value: "become member", label: "Become Member" },
  { value: "just visitation", label: "Just Visitation" },
  { value: "other", label: "Other" },
];
const placeOptions = [
  { value: "church", label: "The Church" },
  { value: "cih", label: "CIH" },
];
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: {
    ...formData,
    ...props.detail,
    country: {
      label: props.detail.country,
      value: props.detail.country,
    },
    state: {
      label: props.detail.state,
      value: props.detail.state,
    },
    dateOfBirth: new Date(props.detail.dateOfBirth),
  },
});

const { value: email, errorMessage: emailError } = useField("email");
const { value: dateOfVisit, errorMessage: dateOfVisitError } =
  useField("dateOfVisit");
const { value: surName, errorMessage: surNameError } = useField("surName");
const { value: firstName, errorMessage: firstNameError } =
  useField("firstName");
const { value: middleName, errorMessage: middleNameError } =
  useField("middleName");
const { value: gender, errorMessage: genderError } = useField("gender");
const { value: dateOfBirth, errorMessage: dateOfBirthError } =
  useField("dateOfBirth");
const { value: mobile1, errorMessage: mobile1Error } = useField("mobile1");
const { value: address, errorMessage: addressError } = useField("address");
const { value: nearestBusStop, errorMessage: nearestBusStopError } =
  useField("nearestBusStop");
const { value: city, errorMessage: cityError } = useField("city");
const { value: state, errorMessage: stateError } = useField("state");
const { value: country, errorMessage: countryError } = useField("country");
const { value: purposeOfVisit, errorMessage: purposeOfVisitError } =
  useField("purposeOfVisit");
const { value: placeOfVisit, errorMessage: placeOfVisitError } =
  useField("placeOfVisit");

const profileCreated = computed(() => vState.profile.profileCreated);
const onSubmit = handleSubmit((values) => {
  dispatch("updateProfile", {
    ...values,
    country: values.country.value,
    state: values.state.value,
  });
});
watch(profileCreated, () => {
  if (profileCreated.value) {
    toast.success("Detail updated");
  }
});
</script>
<style lang=""></style>

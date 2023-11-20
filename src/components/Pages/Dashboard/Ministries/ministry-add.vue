<template>
  <form @submit.prevent="onSubmit">
    <Card noborder className="border-none shadow-none" bodyClass="p-2" title="">
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <Textinput
          label="First Name"
          type="text"
          v-model="firstname"
          :error="firstnameError"
          placeholder="Add your first name"
        />
        <Textinput
          label="Middle name"
          type="text"
          v-model="middlename"
          :error="middlenameError"
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
          :options="genderMenu"
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

        <div class="lg:col-span-2 col-span-1">
          <Textinput
            label="Residential Address"
            v-model="address"
            :error="addressError"
            placeholder="Enter our residential address"
          />
        </div>
        <div class="lg:col-span-2 col-span-1">
          <Textinput
            label="Nearest Busstop"
            type="ext"
            v-model="nearestBusStop"
            :error="nearestBusStopError"
            placeholder="Add your nearest bus-stop"
          />
        </div>

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
        <FormGroup label="Lga" :error="lgaError">
          <VueSelect
            class="w-full"
            v-model.value="lga"
            :options="lgasOption"
            placeholder="Select your lga"
            name="lga"
          />
        </FormGroup>
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button
          :isLoading="loading"
          :disabled="loading"
          type="submit"
          text="Add member"
          btnClass="btn-dark"
        />
      </div>
    </Card>
  </form>
</template>
<script setup>
import VueSelect from "@/components/Select/VueSelect";
import { reactive, computed, watch } from "vue";
import { useToast } from "vue-toastification";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import * as yup from "yup";
import Lgas from "@/util/lgastate.json";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import Select from "@/components/Select";
import Countries from "@/util/countries.json";
import { genderMenu } from "@/constant/data";
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
const lgasOption = computed(() => {
  return Lgas.find(
    (i) => i?.state?.toLowerCase() === state?.value?.label?.toLowerCase()
  )?.lgas?.map((i) => {
    return { label: i, value: i };
  });
});
const { state: vState, dispatch } = useStore();
const success = computed(() => vState.profile.profileCreated);
const loading = computed(() => vState.profile.creatingProfile);
const formData = reactive({
  dateOfVisit: "",
  surName: "",
  firstname: "",
  middlename: "",
  gender: "",
  dateOfBirth: "",
  mobile1: "",
  email: "",
  address: "",
  nearestBusStop: "",
  lga: "",
  state: "",
  country: "",
  purposeOfVisit: "",
  placeOfVisit: "",
});
const formDataSchema = yup.object().shape({
  surName: yup.string().required("Surname is required"),
  firstname: yup.string().required("Firstname is required"),
  middlename: yup.string().nullable(),
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
  nearestBusStop: yup.string().nullable(),
  lga: yup.object().typeError("Invalid lga").nullable(),
  state: yup
    .object()
    .typeError("Invalid state")
    .required("State is required")
    .nullable(),
  country: yup
    .object()
    .typeError("Invalid country")
    .required("Country is required")
    .nullable(),
});

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: email, errorMessage: emailError } = useField("email");
const { value: surName, errorMessage: surNameError } = useField("surName");
const { value: firstname, errorMessage: firstnameError } =
  useField("firstname");
const { value: middlename, errorMessage: middlenameError } =
  useField("middlename");
const { value: gender, errorMessage: genderError } = useField("gender");
const { value: dateOfBirth, errorMessage: dateOfBirthError } =
  useField("dateOfBirth");
const { value: mobile1, errorMessage: mobile1Error } = useField("mobile1");
const { value: address, errorMessage: addressError } = useField("address");
const { value: nearestBusStop, errorMessage: nearestBusStopError } =
  useField("nearestBusStop");
const { value: lga, errorMessage: lgaError } = useField("lga");
const { value: state, errorMessage: stateError } = useField("state");
const { value: country, errorMessage: countryError } = useField("country");

const onSubmit = handleSubmit((values) => {
  dispatch("createProfile", {
    ...values,
    isFirstTime: false,
    country: values.country.value,
    state: values.state.value,
    lga: values.lga.value,
    dateOfVisit: new Date(),
  });
});
watch(success, () => {
  if (success.value) {
    toast.success("Member added");
  }
});
</script>
<style lang=""></style>

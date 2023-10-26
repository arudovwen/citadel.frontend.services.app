<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Textinput
        label="Employer Name"
        type="text"
        placeholder="Type your employer name"
        name="employerName"
        v-model="employerName"
        :error="employerNameError"
        classInput="h-[40px]"
      />

      <Textinput
        label="Employer Address 1"
        type="text"
        placeholder="Type your address 1"
        name="employerAddress1"
        v-model="employerAddress1"
        :error="employerAddress1Error"
        classInput="h-[40px]"
      />
      <Textinput
        label="Employer Address 2"
        type="text"
        placeholder="Type your address 2"
        name="employerAddress2"
        v-model="employerAddress2"
        :error="employerAddress2Error"
        classInput="h-[40px]"
      />
      <Textinput
        label="Position Held"
        type="text"
        placeholder="Type your position"
        name="positionHeld"
        v-model="positionHeld"
        :error="positionHeldError"
        classInput="h-[40px]"
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
        name="industry"
        v-model="industry"
        :modelValue="industry"
        :error="industryError"
        :options="industryMenu"
        label="Industry"
        @update:modelValue="defaultSelectedValue = $event"
      />

      <Textinput
        label="Sub Sector"
        type="text"
        placeholder="Type your position"
        name="subSector"
        v-model="subSector"
        :error="subSectorError"
        classInput="h-[40px]"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
      <button type="submit" class="btn btn-primary block w-full text-center">
        Save Changes
      </button>
      <div class="hidden sm:block"></div>
    </div>
  </form>
</template>

<script setup>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
import { useRouter } from "vue-router";
import { LGAMenu, stateMenu, countryMenu, industryMenu } from "@/constant/data";
import { useToast } from "vue-toastification";

const toast = useToast();
// Define a validation schema
const schema = yup.object({
  employerName: yup.string(),
  employerAddress1: yup.string(),
  employerAddress2: yup.string(),
  positionHeld: yup.string(),
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
  industry: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),

  subSector: yup.string(),
});

const router = useRouter();

const goToProfile = () => {
  router.push("/profile");
};

const formValues = {
  employerName: "",
  employerAddress1: "",
  employerAddress2: "",
  positionHeld: "",
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
  industry: {
    value: "",
    label: "",
  },

  subSector: "",
};

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
// No need to define rules for fields

const { value: employerName, errorMessage: employerNameError } =
  useField("employerName");

const { value: employerAddress1, errorMessage: employerAddress1Error } =
  useField("employerAddress1");
const { value: employerAddress2, errorMessage: employerAddress2Error } =
  useField("employerAddress2");
const { value: positionHeld, errorMessage: positionHeldError } =
  useField("positionHeld");
const { value: LGA, errorMessage: LGAError } = useField("LGA");
const { value: state, errorMessage: stateError } = useField("state");
const { value: country, errorMessage: countryError } = useField("country");
const { value: industry, errorMessage: industryError } = useField("industry");

const { value: subSector, errorMessage: subSectorError } =
  useField("subSector");

// const { value: email, errorMessage: emailError } = useField("email");

const onSubmit = handleSubmit((values) => {
  console.log("PersonalDetails: " + JSON.stringify(values));
  toast.success("Update successful");
  goToProfile();
});
</script>

<style lang="scss" scoped></style>

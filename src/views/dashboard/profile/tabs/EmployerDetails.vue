<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <!-- {{ values }} -->
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
        name="employerAddress"
        v-model="employerAddress"
        :error="employerAddressError"
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
        v-model="lga"
        :modelValue="lga"
        :error="lgaError"
        :options="LGAMenu"
        label="lga"
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
        name="sector"
        v-model="sector"
        :modelValue="sector"
        :error="sectorError"
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
import { LGAMenu, stateMenu, countryMenu, industryMenu } from "@/constant/data";
import { useToast } from "vue-toastification";
import { inject, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";

onMounted(() => {
  getEmployerData();
});
const id = inject("id");
const store = useStore();
const getEmployerData = () => {
  store.dispatch("getEmployerDetailById", id.value);
};

const employerData = computed(() => store.state.profile.employerData);
const success = computed(() => store.state.profile.updateEmployerDatasuccess);

const toast = useToast();
// Define a validation schema
const schema = yup.object({
  employerName: yup.string(),
  employerAddress: yup.string(),
  employerAddress2: yup.string(),
  positionHeld: yup.string(),
  lga: yup
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
  sector: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),

  subSector: yup.string(),
});

// const formValues = {
//   employerName: "",
//   employerAddress: "",
//   employerAddress2: "",
//   positionHeld: "",
//   lga: {
//     value: "",
//     label: "",
//   },
//   state: {
//     value: "",
//     label: "",
//   },
//   country: {
//     value: "",
//     label: "",
//   },
//   sector: {
//     value: "",
//     label: "",
//   },

//   subSector: "",
// };

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: employerData.value,
});
// No need to define rules for fields

const { value: employerName, errorMessage: employerNameError } =
  useField("employerName");

const { value: employerAddress, errorMessage: employerAddressError } =
  useField("employerAddress");
const { value: employerAddress2, errorMessage: employerAddress2Error } =
  useField("employerAddress2");
const { value: positionHeld, errorMessage: positionHeldError } =
  useField("positionHeld");
const { value: lga, errorMessage: lgaError } = useField("lga");
const { value: state, errorMessage: stateError } = useField("state");
const { value: country, errorMessage: countryError } = useField("country");
const { value: sector, errorMessage: sectorError } = useField("sector");

const { value: subSector, errorMessage: subSectorError } =
  useField("subSector");

// const { value: email, errorMessage: emailError } = useField("email");
const prepareDetails = (values, type) => {
  const updateObj = {
    userId: id.value,
    employerName: values.employerName,
    employerAddress: values.employerAddress,
    lga: values.lga?.value ? values.lga.value : values.lga,
    state: values.state?.value ? values.state.value : values.state,
    positionHeld: values.positionHeld,
    sector: values.sector?.value ? values.sector.value : values.sector,
    subSector: values.subSector,
    country: values.country?.value ? values.country.value : values.country,

    createdBy: "string",
    modifiedBy: "string",
    createdAt: "2023-11-01T03:44:32.216Z",
    modifiedAt: "2023-11-01T03:44:32.216Z",
    id: employerData.value.id,
    isDeleted: true,
  };
  const createObj = {
    userId: id.value,
    employerName: values.employerName,
    employerAddress: values.employerAddress,
    lga: values.lga.value,
    state: values.state.value,
    positionHeld: values.positionHeld,
    sector: values.sector.value,
    subSector: values.subSector,
    country: values.country.value,
  };
  const obj = type == "create" ? createObj : updateObj;
  return obj;
};
const onSubmit = handleSubmit((values) => {
  // console.log("PersonalDetails: " + JSON.stringify(values));
  const hasDataError = employerData.value == null;
  if (hasDataError) {
    store.dispatch("createEmployer", prepareDetails(values, "create"));
  }
  if (!hasDataError) {
    store.dispatch("updateEmployer", prepareDetails(values, "edit"));
  }
});

watch(employerData, () => {
  setValues(employerData.value);
});

watch(success, () => {
  if (success.value) {
    toast.success("Successful");
  }
});
</script>

<style lang="scss" scoped></style>

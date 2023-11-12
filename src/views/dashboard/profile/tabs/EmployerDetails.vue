<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <!-- {{ values }} -->
    <!-- {{ employerData == null }} -->

    <ProfileInputSkeleton v-if="employerDataLoading" />
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        label="Position Held"
        type="text"
        placeholder="Type your position"
        name="positionHeld"
        v-model="positionHeld"
        :error="positionHeldError"
        classInput="h-[40px]"
      />

      <Select
        label="Industry"
        :options="industryMenu"
        v-model.value="sector"
        :modelValue="sector"
        :error="sectorError"
        classInput="!h-[40px]"
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

      <Textinput
        label="Employer Address"
        type="text"
        placeholder="Type your addres"
        name="employerAddress"
        v-model="employerAddress"
        :error="employerAddressError"
        classInput="h-[40px]"
      />
      <!-- <Textinput
        label="Employer Address 2"
        type="text"
        placeholder="Type your address 2"
        name="employerAddress2"
        v-model="employerAddress2"
        :error="employerAddress2Error"
        classInput="h-[40px]"
      /> -->
      <!-- <Select
        label="Country"
        :options="countryMenu"
        v-model.value="country"
        :modelValue="country"
        :error="countryError"
        classInput="!h-[40px]"
      />

      <Select
        label="State"
        :options="stateMenu"
        v-model.value="state"
        :modelValue="state"
        :error="stateError"
        classInput="!h-[40px]"
      /> -->

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

      <Select
        label="LGA"
        :options="LGAMenu"
        v-model.value="lga"
        :modelValue="lga"
        :error="lgaError"
        classInput="!h-[40px]"
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
import Select from "@/components/Select";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { LGAMenu, industryMenu } from "@/constant/data";
import { useToast } from "vue-toastification";
import { inject, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import ProfileInputSkeleton from "@/components/Pages/Profile/ProfileInputSkeleton.vue";
import Countries from "@/util/countries.json";
import VueSelect from "@/components/Select/VueSelect";
import FormGroup from "@/components/FormGroup";

onMounted(() => {
  getEmployerData();
});
const id = inject("id");
const store = useStore();
const getEmployerData = () => {
  store.dispatch("getEmployerDetailById", id.value);
};
const employerDataLoading = computed(
  () => store.state.profile.getEmployerDataloading
);

const employerData = computed(() => store.state.profile.employerData);
const success = computed(() => store.state.profile.updateEmployerDataSuccess);
const countriesOption = computed(() =>
  Countries.map((i) => {
    return { label: i.name, value: i.name };
  })
);
const statesOption = computed(() => {
  return Countries.find((i) => i.name === country?.value?.label)?.states?.map(
    (i) => {
      return { label: i.name, value: i.name };
    }
  );
});
const toast = useToast();
// Define a validation schema
const schema = yup.object({
  employerName: yup.string(),
  employerAddress: yup.string(),
  // employerAddress2: yup.string(),
  positionHeld: yup.string(),
  lga: yup.string(),
  state: yup.object().nullable(),
  country: yup.object().nullable(),
  sector: yup.string(),

  subSector: yup.string(),
});

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: employerData.value,
});
// No need to define rules for fields

const { value: employerName, errorMessage: employerNameError } =
  useField("employerName");

const { value: employerAddress, errorMessage: employerAddressError } =
  useField("employerAddress");
// const { value: employerAddress2, errorMessage: employerAddress2Error } =
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
    lga: values.lga,
    state: values.state.value,
    positionHeld: values.positionHeld,
    sector: values.sector,
    subSector: values.subSector,
    country: values.country.value,
    id: employerData.value?.id,
  };
  const createObj = {
    userId: id.value,
    employerName: values.employerName,
    employerAddress: values.employerAddress,
    lga: values.lga,
    state: values.state.value,
    positionHeld: values.positionHeld,
    sector: values.sector,
    subSector: values.subSector,
    country: values.country.value,
  };
  const obj = type == "create" ? createObj : updateObj;
  return obj;
};
const onSubmit = handleSubmit((values) => {
  const hasDataError = employerData.value == null;
  if (hasDataError) {
    store.dispatch("createEmployer", prepareDetails(values, "create"));
  }
  if (!hasDataError) {
    store.dispatch("updateEmployer", prepareDetails(values, "edit"));
  }
});

watch(employerData, () => {
  setValues({
    ...employerData.value,
    country: {
      value: employerData.value.country,
      label: employerData.value.country,
    },
    state: {
      value: employerData.value.state,
      label: employerData.value.state,
    },
  });
});

watch(success, () => {
  if (success.value) {
    toast.success("Successful");
  }
});
</script>

<style lang="scss" scoped></style>

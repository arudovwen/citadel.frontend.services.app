<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div
      v-if="!canEditDetails"
      class="z-30 h-full w-full absolute bg-transparent cursor-not-allowed"
    ></div>
    <!-- {{ values }} -->
    <!-- {{ employerData == null }} -->
    <!-- <pre class="text-blue-500">
    {{ nigeriaOption }}
    </pre> -->

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

      <!-- <Textinput
        label="Sub Sector"
        type="text"
        placeholder="Type your position"
        name="subSector"
        v-model="subSector"
        :error="subSectorError"
        classInput="h-[40px]"
      /> -->
      <Select
        label="Sub Sector"
        :options="subSectorMenu"
        v-model.value="subSector"
        :modelValue="subSector"
        :error="subSectorError"
        classInput="!h-[40px]"
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

      <!-- <Select
        label="LGA"
        :options="LGAMenu"
        v-model.value="lga"
        :modelValue="lga"
        :error="lgaError"
        classInput="!h-[40px]"
      /> -->
      <FormGroup
        v-if="values?.country?.value?.toLowerCase() == 'nigeria'"
        label="LGA"
        :error="lgaError"
      >
        <VueSelect
          class="w-full"
          v-model.value="lga"
          :options="lgaOption"
          placeholder="Select your lga"
          name="lga"
        />
      </FormGroup>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
      <Button
        v-if="canEditDetails"
        :isLoading="submitLoading"
        :disabled="submitLoading"
        type="submit"
        class="btn btn-primary block w-full text-center"
      >
        Save Changes
      </Button>
      <div class="hidden sm:block"></div>
    </div>
  </form>
</template>

<script setup>
import Button from "@/components/Button";
import Select from "@/components/Select";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
// import { industryMenu } from "@/constant/data";
import lgaState from "@/util/lgastate.json";
import { useToast } from "vue-toastification";
import { inject, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import ProfileInputSkeleton from "@/components/Pages/Profile/ProfileInputSkeleton.vue";
import Countries from "@/util/countries.json";
import Industries from "@/util/industries.json";

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
const submitLoading = computed(
  () => store.state.profile.updateEmployerDataloading
);
const employerDataLoading = computed(
  () => store.state.profile.getEmployerDataloading
);
const canEditDetails = inject("canEditDetails");
const employerData = computed(() => store.state.profile.employerData);
const success = computed(() => store.state.profile.updateEmployerDataSuccess);
const countriesOption = computed(() =>
  Countries.map((i) => {
    return { label: i.name, value: i.name };
  })
);

// const nigeriaOption = computed(() => {
//   return countriesOption?.value?.find(
//     (i) => i.label.toLowerCase() === "nigeria"
//   );
// });

const statesOption = computed(() => {
  return Countries.find((i) => i.name === country?.value?.label)?.states?.map(
    (i) => {
      return { label: i.name, value: i.name };
    }
  );
});

const industryMenu = computed(() => {
  return Industries.map((i) => {
    return { label: i.name, value: i.name };
  });
});

const subSectorMenu = computed(() => {
  return Industries.find((i) => i.name === sector?.value)?.subSectors?.map(
    (i) => {
      return { label: i.name, value: i.name };
    }
  );
});

const lgaOption = computed(() =>
  lgaState
    .find(
      (item) =>
        item?.state?.toLowerCase() === state?.value?.value?.toLowerCase()
    )
    ?.lgas?.map((i) => {
      return { label: i, value: i };
    })
);
const toast = useToast();
// Define a validation schema
const schema = yup.object({
  employerName: yup.string(),
  employerAddress: yup.string(),
  // employerAddress2: yup.string(),
  positionHeld: yup.string(),
  lga: yup.object().nullable(),
  state: yup.object().nullable(),
  country: yup.object().nullable(),
  sector: yup.string(),

  subSector: yup.string(),
});

const { handleSubmit, setValues, values } = useForm({
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
    userId: id?.value,
    employerName: values?.employerName,
    employerAddress: values?.employerAddress,
    lga: values?.lga?.value,
    state: values?.state?.value,
    positionHeld: values?.positionHeld,
    sector: values?.sector,
    subSector: values?.subSector,
    country: values?.country?.value,
    id: employerData?.value?.id,
  };
  const createObj = {
    userId: id?.value,
    employerName: values?.employerName,
    employerAddress: values?.employerAddress,
    lga: values?.lga?.value,
    state: values?.state?.value,
    positionHeld: values?.positionHeld,
    sector: values?.sector,
    subSector: values?.subSector,
    country: values?.country?.value,
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
    lga: {
      value: employerData.value.lga,
      label: employerData.value.lga,
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

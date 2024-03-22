<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div
      v-if="!canEditDetails"
      class="z-30 h-full w-full absolute bg-transparent cursor-not-allowed"
    ></div>

    <ProfileInputSkeleton
      v-if="(!biodata && biodataLoading) || isShowing == false"
    />
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Select
        label="Title"
        :options="titleMenu"
        v-model.value="title"
        :modelValue="title"
        :error="titleError"
        classInput="!h-[40px]"
      />
      <Textinput
        id="firstName"
        label="First Name"
        type="text"
        placeholder="Type your first name"
        name="firstName"
        v-model="firstName"
        :modelValue="firstName"
        :error="firstNameError"
        classInput="h-[40px]"
      />
      <Textinput
        label="Last Name"
        type="text"
        placeholder="Type your last name"
        name="surName"
        v-model="surName"
        :error="surNameError"
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
        label="Email Address"
        type="email"
        placeholder="Type your email"
        name="emil"
        v-model="email"
        :error="emailError"
        classInput="h-[40px]"
        :disabled="biodata?.email?.length > 0"
      />
      <Textinput
        label="Mobile 1"
        type="text"
        placeholder="Type your mobile 1"
        name="mobile1"
        v-model="mobile1"
        :error="mobile1Error"
        classInput="h-[40px]"
        :disabled="biodata?.mobile1?.length > 0"
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

      <Select
        label="Gender"
        :options="genderMenu"
        v-model.value="gender"
        :modelValue="gender"
        :error="genderError"
        classInput="!h-[40px]"
      />

      <FormGroup label="DOB" name="d1">
        <flat-pickr
          v-model="dateOfBirth"
          class="form-control"
          id="d1"
          placeholder="yyyy, dd M"
          :error="dateOfBirthError"
          :config="{ maxDate: 'today' }"
        />
      </FormGroup>

      <Select
        label="Marital Status"
        :options="maritalStatusMenu"
        v-model.value="maritalStatus"
        :modelValue="maritalStatus"
        :error="maritalStatusError"
        classInput="!h-[40px]"
      />

      <Select
        label="Employment Status"
        :options="employmentStatusMenu"
        v-model.value="employmentStatus"
        :modelValue="employmentStatus"
        :error="employmentStatusError"
        classInput="!h-[40px]"
      />

      <Textinput
        label="Address"
        type="text"
        placeholder="Type your addres"
        name="address"
        v-model="address"
        :error="addressError"
        classInput="h-[40px]"
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
      <!-- 
      <Select
        label="Nationality"
        :options="nationalityOption"
        v-model.value="nationality"
        :modelValue="nationality"
        :error="nationalityError"
        classInput="!h-[40px]"
      />

      <Select
        label="State Of Origin"
        :options="stateOfOriginOption"
        v-model.value="stateOfOrigin"
        :modelValue="stateOfOrigin"
        :error="stateOfOriginError"
        classInput="!h-[40px]"
      /> -->

      <FormGroup label="Nationality" :error="nationalityError">
        <VueSelect
          class="w-full"
          v-model.value="nationality"
          :options="nationalityOption"
          placeholder="Select your nationality"
          name="nationality"
        />
      </FormGroup>

      <FormGroup label="State Of Origin" :error="stateOfOriginError">
        <VueSelect
          class="w-full"
          v-model.value="stateOfOrigin"
          :options="stateOfOriginOption"
          placeholder="Select your state of origin"
          name="state of origin"
        />
      </FormGroup>

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
      <!-- {{ submitLoading }} -->
      <Button
        v-if="canEditDetails"
        :disabled="createProfileLoading || submitLoading"
        :isLoading="submitLoading"
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
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Countries from "@/util/countries.json";
import VueSelect from "@/components/Select/VueSelect";
// import lgas from "@/util/lgas.json";
import lgaState from "@/util/lgastate.json";
import {
  titleMenu,
  genderMenu,
  employmentStatusMenu,
  // nationalityMenu,
  // stateOfOriginMenu,
  maritalStatusMenu,
} from "@/constant/data";
import { useStore } from "vuex";
import { computed, onMounted, watch, ref, inject, watchEffect } from "vue";
import { useToast } from "vue-toastification";
// import { inject } from "vue";
import { useRoute } from "vue-router";
import ProfileInputSkeleton from "@/components/Pages/Profile/ProfileInputSkeleton.vue";

onMounted(() => {
  getBiodata();
});

const store = useStore();
const route = useRoute();
const toast = useToast();
const createProfileLoading = computed(
  () => store.state.profile.getBiodataloading
);
const canEditDetails = inject("canEditDetails");

const isShowing = ref(false);
const showMarriedTab = inject("showMarriedTab");
const isEmployed = inject("isEmployed");

const biodataLoading = computed(() => store.state.profile.getBiodataloading);
const success = computed(() => store.state.profile.profileCreated);
const biodata = computed(() => store.state.profile.biodata);
const profileData = computed(() => store.state.member.profile);
const id = computed(() => route.params.userId);
const submitLoading = computed(() => store.state.profile.creatingProfile);
const getBiodata = () => {
  store.dispatch("getBiodataByUserId", id.value);
};

const creationSuccess = computed(() => store.getters["profile/profileCreated"]);
// Define a validation schema
const schema = yup.object({
  firstName: yup.string().required("First name is required").nullable(),
  surName: yup.string().required("Last name is required").nullable(),
  middleName: yup.string().nullable(),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .nullable(),
  mobile1: yup.string().required("Mobile 1 is required").nullable(),
  mobile2: yup.string().nullable(),
  address: yup.string().nullable(),
  // address2: yup.string(),
  // .required("Title text is required")
  title: yup.string().nullable(),
  nearestBusStop: yup.string().nullable(),
  lga: yup.object().nullable(),
  state: yup.object().nullable(),
  country: yup.object().nullable(),
  gender: yup.string().nullable(),
  employmentStatus: yup.string().nullable(),
  placeOfBirth: yup.string().nullable(),
  nationality: yup.object().nullable(),
  stateOfOrigin: yup.object().nullable(),
  maritalStatus: yup.string().nullable(),
  dateOfBirth: yup.string().nullable(),
});

const { handleSubmit, setValues, values } = useForm({
  validationSchema: schema,
  initialValues: biodata.value,
});

// No need to define rules for fields
const { value: firstName, errorMessage: firstNameError } =
  useField("firstName");
const { value: surName, errorMessage: surNameError } = useField("surName");
const { value: middleName, errorMessage: middleNameError } =
  useField("middleName");
const { value: email, errorMessage: emailError } = useField("email");
const { value: mobile1, errorMessage: mobile1Error } = useField("mobile1");
const { value: mobile2, errorMessage: mobile2Error } = useField("mobile2");
const { value: address, errorMessage: addressError } = useField("address");
// const { value: address2, errorMessage: address2Error } = useField("address2");
const { value: title, errorMessage: titleError } = useField("title");
const { value: nearestBusStop, errorMessage: nearestBusStopError } =
  useField("nearestBusStop");
const { value: lga, errorMessage: lgaError } = useField("lga");
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

const { value: dateOfBirth, errorMessage: dateOfBirthError } =
  useField("dateOfBirth");

// const { value: email, errorMessage: emailError } = useField("email");

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

const nationalityOption = computed(() =>
  Countries.map((i) => {
    return { label: i.name, value: i.name };
  })
);

const lgaOption = computed(() =>
  // lgas.map((i) => {
  //   return { label: i, value: i };
  // })
  lgaState
    .find(
      (item) =>
        item?.state?.toLowerCase() === state?.value?.value?.toLowerCase()
    )
    ?.lgas?.map((i) => {
      return { label: i, value: i };
    })
);
const stateOfOriginOption = computed(() => {
  return Countries.find(
    (i) => i.name === nationality?.value?.label
  )?.states?.map((i) => {
    return { label: i.name, value: i.name };
  });
});

const setGenderByTitle = (title) => {
  const autoFillGenderValue = genderMenu.find((gender) =>
    gender.titles.includes(title)
  );
  values.gender = autoFillGenderValue?.value;
};

const prepareDetails = (values, type) => {
  const updateObj = {
    title: values?.title,
    userId: id?.value,
    id: biodata?.value?.id,
    firstName: values?.firstName,
    middleName: values?.middleName,
    surName: values?.surName,
    mobile1: values?.mobile1,
    mobile2: values?.mobile2,
    email: values?.email,
    address: values?.address,
    nearestBusStop: values?.nearestBusStop,
    lga: values?.lga?.value,
    state: values?.state?.value,
    country: values?.country?.value,
    gender: values?.gender,
    employmentStatus: values?.employmentStatus,
    dateOfBirth: values?.dateOfBirth,
    placeOfBirth: values?.placeOfBirth,
    nationality: values?.nationality?.value,
    stateOfOrigin: values?.stateOfOrigin?.value,
    maritalStatus: values?.maritalStatus,
  };
  const createObj = {
    title: values.title,
    userId: id.value,

    firstName: values?.middleName,
    surName: values?.surName,
    mobile1: values?.mobile1,
    mobile2: values?.mobile2,
    email: values?.email,
    address: values?.address,
    nearestBusStop: values?.nearestBusStop,
    lga: values?.lga?.value,
    state: values?.state?.value,
    country: values?.country?.value,
    gender: values?.gender,
    employmentStatus: values?.employmentStatus,
    dateOfBirth: values?.dateOfBirth,
    placeOfBirth: values?.placeOfBirth,
    nationality: values?.nationality,
    stateOfOrigin: values?.stateOfOrigin,
    maritalStatus: values?.maritalStatus,
  };

  const obj = type == "create" ? createObj : updateObj;
  return obj;
};
const onSubmit = handleSubmit((values) => {
  console.log("PersonalDetails: " + JSON.stringify(prepareDetails(values)));

  const hasBiodataError = biodata.value == null;

  if (hasBiodataError) {
    store.dispatch("createProfile", prepareDetails(values, "create"));
  }
  if (!hasBiodataError) {
    store.dispatch("updateProfile", prepareDetails(values, "edit"));
  }
});
watch(creationSuccess, () => {
  toast.success("Successfully created profile");
});

watch(biodataLoading, () => {
  if (biodata.value !== null) {
    setValues({
      ...biodata.value,
      country: {
        value: biodata.value.country,
        label: biodata.value.country,
      },
      state: {
        value: biodata.value.state,
        label: biodata.value.state,
      },
      nationality: {
        value: biodata.value.nationality,
        label: biodata.value.nationality,
      },
      stateOfOrigin: {
        value: biodata.value.stateOfOrigin,
        label: biodata.value.stateOfOrigin,
      },
      lga: {
        value: biodata.value.lga,
        label: biodata.value.lga,
      },
    });
    isShowing.value = true;
  } else {
    setValues({
      // ...values,
      firstName: profileData.value.firstName,
      surName: profileData.value.lastName,
      middleName: profileData.value.middleName,
      email: profileData.value.email,
      mobile1: profileData.value.phoneNumber,
    });
  }

  isShowing.value = true;
});

watch(success, () => {
  if (success.value) {
    toast.success("Successful");
  }
  getBiodata();
});

watch(id, (newValue) => {
  if (newValue !== null && newValue !== undefined) {
    getBiodata();
  }
});

watch(title, () => {
  setGenderByTitle(title.value);
});

watchEffect(() => {
  if (values.maritalStatus == "Married") {
    showMarriedTab.value = true;
  } else {
    showMarriedTab.value = false;
  }

  if (values.employmentStatus == "Employed") {
    isEmployed.value = true;
  } else {
    isEmployed.value = false;
  }
});
</script>
<style lang="scss" scoped></style>

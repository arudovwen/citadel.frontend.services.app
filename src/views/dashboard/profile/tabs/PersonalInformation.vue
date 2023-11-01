<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <!-- {{ biodata }} -->
    <!-- {{ getBiodataError !== null }} -->
    <!-- <span>{{ createProfileLoading }}</span>
    <span>{{  }}</span> -->
    <!-- <span>UserData: {{ profileData }}</span> -->
    <!-- <span>FormVal: {{ formValues }}</span> -->
    <!-- {{ firstName }} -->
    <ProfileInputSkeleton v-if="biodataLoading" />
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        name="address"
        v-model="address"
        :error="addressError"
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
        name="lga"
        v-model="lga"
        :modelValue="lga"
        :error="lgaError"
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
      <FormGroup label="DOB" name="d1">
        <flat-pickr
          v-model="dateOfBirth"
          class="form-control"
          id="d1"
          placeholder="yyyy, dd M"
          :error="dateOfBirthError"
        />
      </FormGroup>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
      <button
        :disabled="createProfileLoading"
        type="submit"
        class="btn btn-primary block w-full text-center"
      >
        Save Changes
      </button>
      <div class="hidden sm:block"></div>
    </div>
  </form>
</template>
<script setup>
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
// import { useRouter } from "vue-router";
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
import { useStore } from "vuex";
import { computed, onMounted, watch } from "vue";
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

const biodataLoading = computed(() => store.state.profile.getBiodataloading);
const success = computed(() => store.state.profile.profileCreated);
// const getBiodataloading = computed(() => store.state.profile.getBiodataloading);
const biodata = computed(() => store.state.profile.biodata);
// const profileData = computed(() => store.state.member.profile);
const id = computed(() => route.params.userId);

const getBiodata = () => {
  store.dispatch("getBiodataByUserId", id.value);
};

const creationSuccess = computed(() => store.getters["profile/profileCreated"]);
// Define a validation schema
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  surName: yup.string().required("Last name is required"),
  middleName: yup.string(),
  email: yup.string().required("Email is required").email(),
  mobile1: yup.string().required("Mobile 1 is required"),
  mobile2: yup.string(),
  address: yup.string(),
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
  dateOfBirth: yup.string(),
});

// const formValues = {
//   firstName: "",
//   surName: "",
//   middleName: "",
//   email: "",
//   address: "",
//   address2: "",
//   title: {
//     value: "",
//     label: "",
//   },
//   mobile1: "",
//   mobile2: "",
//   nearestBusStop: "",
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
//   gender: {
//     value: "",
//     label: "",
//   },
//   employmentStatus: {
//     value: "",
//     label: "",
//   },
//   placeOfBirth: "",
//   nationality: {
//     value: "",
//     label: "",
//   },
//   stateOfOrigin: {
//     value: "",
//     label: "",
//   },
//   maritalStatus: {
//     value: "",
//     label: "",
//   },
// };
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: null,
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
const { value: address2, errorMessage: address2Error } = useField("address2");
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

const prepareDetails = (values, type) => {
  const updateObj = {
    title: values.title.value ? values.title.value : values.title,
    userId: id.value,
    firstName: values.firstName,
    middleName: values.middleName,
    surName: values.surName,
    mobile1: values.mobile1,
    mobile2: values.mobile2,
    email: values.email,
    address: values.address,
    nearestBusStop: values.nearestBusStop,
    lga: values.lga.value,
    state: values.state.value ? values.state.value : values.state,
    country: values.country.value ? values.country.value : values.country,
    gender: values.gender.value ? values.gender.value : values.gender,
    employmentStatus: values.employmentStatus.value
      ? values.employmentStatus.value
      : values.employmentStatus,
    dateOfBirth: values.dateOfBirth,
    placeOfBirth: values.placeOfBirth,
    nationality: values.nationality.value
      ? values.nationality.value
      : values.nationality,
    stateOfOrigin: values.stateOfOrigin.value
      ? values.stateOfOrigin.value
      : values.stateOfOrigin,
    maritalStatus: values.maritalStatus.value
      ? values.maritalStatus.value
      : values.maritalStatus,
  };
  const createObj = {
    title: values.title.value,
    userId: id.value,
    firstName: values.firstName,
    middleName: values.middleName,
    surName: values.surName,
    mobile1: values.mobile1,
    mobile2: values.mobile2,
    email: values.email,
    address: values.address,
    nearestBusStop: values.nearestBusStop,
    lga: values.lga.value,
    state: values.state.value,
    country: values.country.value,
    gender: values.gender.value,
    employmentStatus: values.employmentStatus.value,
    dateOfBirth: values.dateOfBirth,
    placeOfBirth: values.placeOfBirth,
    nationality: values.nationality.value,
    stateOfOrigin: values.stateOfOrigin.value,
    maritalStatus: values.maritalStatus.value,
  };

  const obj = type == "create" ? createObj : updateObj;
  return obj;
};
const onSubmit = handleSubmit((values) => {
  const hasBiodataError = biodata.value == null;

  if (hasBiodataError) {
    store.dispatch("createProfile", prepareDetails(values, "create"));
  }
  if (!hasBiodataError) {
    store.dispatch("updateProfile", prepareDetails(values, "edit"));
  }
  // console.log("PersonalDetails: " + JSON.stringify(prepareDetails(values)));
});
watch(creationSuccess, () => {
  toast.success("Successfully created profile");
});

// watch(profileData, (newValue) => {
//   if (newValue !== null) {
//     setValues({
//       firstName: profileData.value.firstName,
//       surName: profileData.value.surName,
//       middleName: profileData.value.middleName,
//       email: profileData.value.email,
//       mobile1: profileData.value.phoneNumber,
//     });
//   }
// });
watch(biodata, () => {
  setValues(biodata.value);
});

// watch(getBiodataloading, (newValue) => {
//   if (newValue == false) {
//     if (biodata.value !== null && biodata.value !== undefined) {
//       setValues(biodata.value);
//     } else {
//       setValues({
//         firstName: profileData.value.firstName,
//         surName: profileData.value.surName,
//         middleName: profileData.value.middleName,
//         email: profileData.value.email,
//         mobile1: profileData.value.phoneNumber,
//       });
//     }
//   }
// });

watch(success, () => {
  if (success.value) {
    toast.success("Successful");
  }
});

watch(id, (newValue) => {
  if (newValue !== null && newValue !== undefined) {
    getBiodata();
  }
});
</script>
<style lang="scss" scoped></style>

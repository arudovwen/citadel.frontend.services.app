<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <!-- {{ values }} -->
    <!-- {{ $store.state.auth.userData.userName }} -->
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

      <FormGroup label="dateOfBirth" name="d1">
        <flat-pickr
          v-model="dateOfBirth"
          class="form-control"
          id="d1"
          placeholder="yyyy, dd M"
        />
      </FormGroup>

      <FormGroup label="Wedding Anniversary" name="d2">
        <flat-pickr
          v-model="weddingAnniversary"
          class="form-control"
          id="d2"
          placeholder="yyyy, dd M"
        />
      </FormGroup>
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
import { useToast } from "vue-toastification";
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
// import { useRouter } from "vue-router";
import { titleMenu, genderMenu } from "@/constant/data";
import { inject, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";

onMounted(() => {
  getSpouseData();
});
const id = inject("id");
const store = useStore();
const getSpouseData = () => {
  store.dispatch("getSpouseDetailById", id.value);
};
const success = computed(() => store.state.profile.updateSpouseDatasuccess);

// const getSpouseDataloading = computed(
//   () => store.state.profile.getSpouseDataloading
// );

// const getSpouseDataErr = scomputed(() => store.state.profile.getSpouseDataerr);
const spouseData = computed(() => store.state.profile.spouseData);
const toast = useToast();
// Define a validation schema
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  surName: yup.string().required("Last name is required"),
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
  dateOfBirth: yup.string(),
  weddingAnniversary: yup.string(),
});

// const router = useRouter();

// const formValues = {
//   firstName: "",
//   surName: "",
//   middleName: "",
//   email: "dashcode@gmail.com",
//   title: {
//     value: "",
//     label: "",
//   },
//   mobile1: "",
//   mobile2: "",
//   gender: {
//     value: "",
//     label: "",
//   },
//   dateOfBirth: "",
//   weddingAnniversary: "",
// };

const { handleSubmit, setValues, values } = useForm({
  validationSchema: schema,
  initialValues: spouseData.value,
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

const { value: title, errorMessage: titleError } = useField("title");

const { value: gender, errorMessage: genderError } = useField("gender");

const { value: dateOfBirth } = useField("dateOfBirth");
const { value: weddingAnniversary } = useField("weddingAnniversary");

// const { value: email, errorMessage: emailError } = useField("email");

const prepareDetails = (values, type) => {
  const updateObj = {
    userId: id.value,
    title: values.title.value,
    firstName: values.firstName,
    middleName: values.middleName,
    surName: values.surName,
    mobile1: values.mobile1,
    mobile2: values.mobile2,
    email: values.title,
    gender: values.gender.value,
    dateOfBirth: values.dateOfBirth,
    weddingAnniversary: values.weddingAnniversary,
    createdBy: "",
    modifiedBy: store.state.auth.userData.userName,
    createdAt: spouseData.value.createdAt,
    modifiedAt: spouseData.value.modifiedAt,
    id: spouseData.value.id,
    isDeleted: spouseData.value.isDeleted,
  };
  const createObj = {
    userId: id.value,
    title: values.title.value,
    firstName: values.firstName,
    middleName: values.middleName,
    surName: values.surName,
    mobile1: values.mobile1,
    mobile2: values.mobile2,
    email: values.email,
    gender: values.gender.value,
    dateOfBirth: values.dateOfBirth,
    weddingAnniversary: values.weddingAnniversary,
  };
  const obj = type == "create" ? createObj : updateObj;
  return obj;
};

const onSubmit = handleSubmit((values) => {
  // console.log("PersonalDetails: " + JSON.stringify(values));
  // toast.success("Update successful");

  const hasDataError = spouseData.value == null;
  if (hasDataError) {
    store.dispatch("createSpouse", prepareDetails(values, "create"));
  }
  if (!hasDataError) {
    store.dispatch("updateSpouse", prepareDetails(values, "edit"));
  }
});

watch(spouseData, () => {
  setValues(spouseData.value);
});

watch(success, () => {
  if (success.value) {
    toast.success("Successful");
  }
});
</script>

<style lang="scss" scoped></style>

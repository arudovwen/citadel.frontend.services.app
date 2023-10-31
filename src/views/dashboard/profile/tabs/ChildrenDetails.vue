<template>
  <div>
    <Card bodyClass="p-0">
      <!-- <header
        class="border-b px-4 border-slate-100 dark:border-slate-700 pt-4 pb-3 flex justify-end items-center"
      >
      
      </header> -->
      <div class="p-6">
        <!-- {{ values }} -->
        <form @submit.prevent="pushDetails()" :validation-schema="schema">
          <div class="flex gap-x-8 mb-12">
            <div class="w-full lg:grid-cols-2 grid-cols-1 grid gap-5 last:mb-0">
              <Textinput
                :id="firstName"
                label="First Name"
                type="text"
                v-model="firstName"
                placeholder="Type your first name"
                :name="firstName"
                :error="firstNameError"
                classInput="h-[40px]"
              />

              <Textinput
                :id="lastName"
                label="Last Name"
                type="text"
                v-model="lastName"
                placeholder="Type your last name"
                :name="lastName"
                :error="lastNameError"
                classInput="h-[40px]"
              />

              <Textinput
                :id="middleName"
                label="Middle Name"
                type="text"
                v-model="middleName"
                placeholder="Type your middle name"
                :name="middleName"
                :error="middleNameError"
                classInput="h-[40px]"
              />

              <Textinput
                :id="email"
                label="Email Address"
                type="text"
                v-model="email"
                placeholder="Type your email address"
                :name="email"
                :error="emailError"
                classInput="h-[40px]"
              />

              <Textinput
                :id="mobile1"
                label="Mobile 1"
                type="text"
                v-model="mobile1"
                placeholder="Type your mobile number"
                :name="mobile1"
                :error="mobile1Error"
                classInput="h-[40px]"
              />

              <Textinput
                :id="mobile2"
                label="Mobile 2"
                type="text"
                v-model="mobile2"
                placeholder="Type your mobile 2"
                :name="mobile2"
                :error="mobile2Error"
                classInput="h-[40px]"
              />

              <CustomVueSelect
                :id="title"
                label="Title"
                v-model="title"
                name="title"
                :modelValue="title"
                :error="titleError"
                :options="titleMenu"
                @update:modelValue="defaultSelectedValue = $event"
              />

              <CustomVueSelect
                :id="gender"
                label="Gender"
                v-model="gender"
                name="gender"
                :modelValue="gender"
                :error="genderError"
                :options="genderMenu"
                @update:modelValue="defaultSelectedValue = $event"
              />

              <FormGroup label="DOB" name="d1">
                <flat-pickr
                  v-model="DOB"
                  class="form-control"
                  id="d1"
                  placeholder="yyyy, dd M"
                  :error="DOBError"
                />
              </FormGroup>
            </div>
            <div class="flex justify-between items-end space-x-5">
              <div class="flex-none relative">
                <!-- <button
                  type="button"
                  class="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                  @click="remove(idx)"
                >
                  <Icon icon="heroicons-outline:trash" />
                </button> -->
                <div>
                  <Button
                    text="Add new"
                    icon="heroicons-outline:plus"
                    btnClass="btn-primary btn-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        <Card v-if="childrenDetails.length > 0" bodyClass="p-0">
          <header class="px-4 pt-4 pb-3 mb-3">
            <h5 class="card-title mb-0 !text-[18px]">Children List</h5>
          </header>
          <vue-good-table
            :columns="childrenDetailstable"
            :rows="childrenDetails"
            styleClass=" vgt-table"
            :sort-options="{
              enabled: false,
            }"
          >
            <template v-slot:table-row="props">
              <span
                v-if="props.column.field == 'gender'"
                class="text-slate-500 dark:text-slate-300"
              >
                {{ props.row.gender.value }}
              </span>
              <span v-if="props.column.field == 'action'">
                <div class="flex space-x-3 rtl:space-x-reverse justify-center">
                  <button
                    type="button"
                    class="action-btn inline-flex items-center justify-center h-8 w-8 text-lg border rounded text-white"
                    @click="() => {}"
                  >
                    <Icon icon="heroicons:pencil-square" />
                  </button>

                  <button
                    type="button"
                    class="inline-flex items-center justify-center h-8 w-8 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                    @click="removeChild"
                  >
                    <Icon icon="heroicons-outline:trash" />
                  </button>
                </div>
              </span>
            </template>
          </vue-good-table>
        </Card>

        <div
          v-if="childrenDetails.length > 0"
          @click="addDetail"
          class="mt-6 ltr:text-right rtl:text-left"
        >
          <Button text="Submit" btnClass="btn btn-primary" />
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon";
import Card from "@/components/Card";
import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import { titleMenu, genderMenu, childrenDetailstable } from "@/constant/data";
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
import { useToast } from "vue-toastification";
import * as yup from "yup";
import { inject, onMounted, ref } from "vue";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";

onMounted(() => {
  getChildrensData();
});
const id = inject("id");
const store = useStore();
const getChildrensData = () => {
  store.dispatch("getChildrenDetailById", id.value);
};
const toast = useToast();
const childrenDetails = ref([]);
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  middleName: yup.string(),
  email: yup.string().required("Email is required").email(),
  mobile1: yup.string(),
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
  DOB: yup.string(),
});

const formValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  title: {
    value: "",
    label: "",
  },
  mobile1: "",
  mobile2: "",
  gender: {
    value: "",
    label: "",
  },
  DOB: "",
};

const removeChild = (idx) => {
  // Index of the item you want to remove
  const indexToRemove = idx; // For example, removing "item3"

  // Use splice to remove the item at the specified index
  childrenDetails.value.splice(indexToRemove, 1);
};

// const router = useRouter();

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

const { value: title, errorMessage: titleError } = useField("title");

const { value: gender, errorMessage: genderError } = useField("gender");

const { value: DOB, errorMessage: DOBError } = useField("DOB");

// const { remove, push, fields } = useFieldArray("childrenDetails");

// console.log(
//   firstName + lastName + middleName + email + mobile1 + mobile2 + title + DOB
// );

const resetForm = () => {
  formValues.firstName = "";
  formValues.lastName = "";
  formValues.middleName = "";
  formValues.email = "";
  formValues.title = {
    value: "",
    label: "",
  };
  formValues.mobile1 = "";
  formValues.mobile2 = "";
  formValues.gender = {
    value: "",
    label: "",
  };
  formValues.DOB = "";
};

const pushDetails = handleSubmit((values) => {
  console.log("PersonalDetails: " + JSON.stringify(values));
  childrenDetails.value.push(values);
  console.log("Children's Details" + JSON.stringify(childrenDetails.value));
  resetForm();
});

const addDetail = () => {
  toast.success("Update successful");
  console.log("PersonalDetails: " + JSON.stringify(childrenDetails.value));
};
</script>

<style lang="scss" scoped>
.action-btn {
  @apply flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
}
</style>

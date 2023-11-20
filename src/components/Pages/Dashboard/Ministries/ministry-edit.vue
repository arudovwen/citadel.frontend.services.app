<template>
  <form @submit.prevent="onSubmit">
    <Card noborder className="border-none shadow-none" bodyClass="p-2" title="">
      <div class="flex flex-col gap-y-5">
        <Textinput
          label="First Name"
          type="text"
          v-model="firstname"
          :error="firstnameError"
          placeholder="Provide a first name"
        />
        <Textinput
          label="Middle name"
          type="text"
          v-model="middlename"
          :error="middlenameError"
          placeholder="Provide a middle name"
        />
        <Textinput
          label="Surname"
          type="text"
          v-model="surname"
          :error="surnameError"
          placeholder="Provide a surnanme"
        />
        <div class="">
          <Textinput
            label="Email"
            type="email"
            v-model="emailAddress"
            :error="emailAddressError"
            placeholder="Provide an email address"
          />
        </div>
        <Select
          label="Role"
          :options="roleOptions"
          v-model="role"
          :error="roleError"
        />

        <Textinput
          label="Phone"
          type="text"
          v-model="phoneNumber"
          :error="phoneNumberError"
          placeholder="Provide a phone number"
        />
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button type="submit" text="Update record" btnClass="btn-dark" />
      </div>
    </Card>
  </form>
</template>
<script setup>
import { reactive } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import Select from "@/components/Select";

const formData = reactive({
  surname: "",
  firstname: "",
  middlename: "",
  role: "",
  phoneNumber: "",
  emailAddress: "",
});
const formDataSchema = yup.object().shape({
  surname: yup.string().required("Surname is required"),
  firstname: yup.string().required("Firstname is required"),
  middlename: yup.string(),
  role: yup.string().required("Please select a role"),
  phoneNumber: yup
    .string()
    .max(11, "Phone number must be 11 digits or less")
    .required("Phone number is required"),
  emailAddress: yup
    .string()
    .email("Invalid email format")
    .required("Email Address is required"),
});
const roleOptions = [
  { value: "admin", label: "Administrator" },
  { value: "hod", label: "HOD" },
];

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: emailAddress, errorMessage: emailAddressError } =
  useField("emailAddress");

const { value: surname, errorMessage: surnameError } = useField("surname");
const { value: firstname, errorMessage: firstnameError } =
  useField("firstname");
const { value: middlename, errorMessage: middlenameError } =
  useField("middlename");
const { value: role, errorMessage: roleError } = useField("role");

const { value: phoneNumber, errorMessage: phoneNumberError } =
  useField("phoneNumber");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", values);
});
</script>
<style lang=""></style>

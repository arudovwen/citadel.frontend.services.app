<template>
  <form @submit.prevent="onSubmit">
    <Card title="">
      <div class="flex flex-col gap-y-5">
        <FormGroup label="Full name" :error="membersError">
          <VueSelect
            class="min-w-[200px] w-full md:w-auto"
            v-model="members"
            :options="membersOptions"
            placeholder="Select a member"
            name="members"
          />
        </FormGroup>
        <FormGroup label="Assign role" :error="membersError">
          <VueSelect
            class="min-w-[200px] w-full md:w-auto"
            v-model="members"
            :options="membersOptions"
            placeholder="Select a role"
            name="members"
          />
        </FormGroup>
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button type="submit" text="Submit" btnClass="btn-dark" />
      </div>
    </Card>
  </form>
</template>
<script setup>
import FormGroup from "@/components/FormGroup";
import VueSelect from "@/components/Select/VueSelect";
import { reactive } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
// import Textinput from "@/components/Textinput";

const formData = reactive({
  surname: "",
  firstname: "",
  middlename: "",
  members: "",
  phoneNumber: "",
  emailAddress: "",
});
const formDataSchema = yup.object().shape({
  members: yup.object().required("Please select a members"),
});
const membersOptions = [
  { value: "admin", label: "John Snow" },
  { value: "hod", label: "Tony Starke" },
];

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

// const { value: emailAddress, errorMessage: emailAddressError } =
//   useField("emailAddress");

// const { value: surname, errorMessage: surnameError } = useField("surname");
// const { value: firstname, errorMessage: firstnameError } =
//   useField("firstname");
// const { value: middlename, errorMessage: middlenameError } =
//   useField("middlename");
const { value: members, errorMessage: membersError } = useField("members");
// const { value: gender, errorMessage: genderError } = useField("gender");

// const { value: phoneNumber, errorMessage: phoneNumberError } =
//   useField("phoneNumber");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", values);
});
</script>
<style lang=""></style>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Textinput
        label="Email"
        type="email"
        placeholder="Type your email"
        name="emil"
        v-model="email"
        :error="emailError"
        classInput="h-[48px]"
      />
      <Textinput
        label="Password"
        type="password"
        placeholder="8+ characters, 1 capitat letter "
        name="password"
        v-model="password"
        :error="passwordError"
        hasicon
        classInput="h-[48px]"
      />
    </div>

    <button type="submit" class="btn btn-dark block w-full text-center">
      Sign in
    </button>
  </form>
</template>

<script setup>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

import { useRouter } from "vue-router";

// Define a validation schema
const schema = yup.object({
  email: yup.string().required("Email is required").email(),
  password: yup.string().required("Password is required").min(8),
});

const router = useRouter();

const goToProfile = () => {
  router.push("/profile");
};

const formValues = {
  email: "dashcode@gmail.com",
  password: "dashcode",
};

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
// No need to define rules for fields

const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");

const onSubmit = handleSubmit((values) => {
  console.log("PersonalDetails: " + values);
  goToProfile();
});
</script>

<style lang="scss" scoped></style>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="New Password"
      type="password"
      placeholder="Type your new password"
      name="password"
      v-model="password"
      :error="passwordError"
      hasicon
      classInput="h-[48px]"
    />
    <Textinput
      label="Confirm Password"
      type="password"
      placeholder="Type your password"
      name="comfirmPassword"
      v-model="comfirmPassword"
      :error="comfirmPasswordError"
      hasicon
      classInput="h-[48px]"
    />

    <button type="submit" class="btn btn-primary block w-full text-center">
      Submit
    </button>
  </form>
</template>
<script>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    Textinput,
  },
  data() {
    return {
      checkbox: false,
    };
  },
  setup() {
    // Define a validation schema
    const schema = yup.object({
      password: yup.string().required(),
      confirmPassword: yup.string().required(),
    });

    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields

    const { value: comfirmPassword, errorMessage: comfirmPasswordError } =
      useField("comfirmPassword");
    const { value: password, errorMessage: passwordError } =
      useField("password");

    const onSubmit = handleSubmit(() => {
      // console.warn(values);
    });

    return {
      password,
      comfirmPasswordError,
      comfirmPassword,
      passwordError,
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>

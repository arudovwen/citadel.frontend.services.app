<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div
      style="display: flex; flex-direction: row"
      class="justify-center mt-5 mb-8 gap-x-4"
    >
      <v-otp-input
        ref="otpInput"
        v-model:value="bindModal"
        input-classes="w-12 h-12 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 text-center"
        separator=" "
        :num-inputs="6"
        :should-auto-focus="true"
        input-type="letter-numeric"
        :conditionalClass="['mr-4', 'mr-4', 'mr-4', 'mr-4', 'mr-4']"
        :placeholder="['*', '*', '*', '*', '*', '*']"
        @on-change="handleOnChange"
        @on-complete="handleOnComplete"
      />
    </div>

    <button type="submit" class="btn btn-dark block w-full text-center">
      Verify Email
    </button>
  </form>
</template>
<script setup>
import { ref } from "vue";
import VOtpInput from "vue3-otp-input";

const otpInput = ref(null);
const handleOnComplete = (value) => {
  console.log("OTP completed: ", value);
};

const handleOnChange = (value) => {
  console.log("OTP changed: ", value);
};

// const clearInput = () => {
//   otpInput.value?.clearInput();
// };

// const fillInput = (value) => {
//   console.log(value);
//   otpInput.value?.fillInput(value);
// };
// Define a validation schema

// No need to define rules for fields
</script>
<style lang="scss"></style>

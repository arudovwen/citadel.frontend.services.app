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

    <button
      type="button"
      class="btn btn-light block w-full text-center"
      @click="resendOTP"
      :disabled="resendDisabled"
    >
      Resend OTP
      <span v-if="resendDisabled">
        (Resend in {{ resendCountdown }} seconds)</span
      >
    </button>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import VOtpInput from "vue3-otp-input";

const otpInput = ref(null);
const bindModal = ref("");
const resendCountdown = ref(0);
const resendDisabled = ref(false);

const handleOnComplete = (value) => {
  console.log("OTP completed: ", value);
};

const handleOnChange = (value) => {
  console.log("OTP changed: ", value);
};

const resendOTP = () => {
  // Implement your OTP resend logic here
  // Disable the button and start the countdown
  resendDisabled.value = true;
  let countdown = 120; // 2 minutes
  resendCountdown.value = countdown;

  const interval = setInterval(() => {
    countdown--;
    resendCountdown.value = countdown;
    if (countdown <= 0) {
      clearInterval(interval);
      resendDisabled.value = false;
    }
  }, 1000);
};

// Automatically start the countdown on component mount
onMounted(() => {
  watch(
    resendDisabled,
    (newValue) => {
      if (newValue) {
        const interval = setInterval(() => {
          resendCountdown.value--;
          if (resendCountdown.value <= 0) {
            clearInterval(interval);
            resendDisabled.value = false;
          }
        }, 1000);
      }
    },
    { immediate: true }
  );
});
</script>

<style lang="scss"></style>

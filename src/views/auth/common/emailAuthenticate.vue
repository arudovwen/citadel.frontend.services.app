<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="OTP token"
      placeholder="Type your otp"
      name="token"
      v-model="token"
      classInput="h-[48px]"
      required
      :error="tokenError"
    />

    <Textinput
      label="Password"
      type="password"
      placeholder="Type your password"
      name="password"
      v-model="password"
      hasicon
      classInput="h-[48px]"
      required
      :error="passwordError"
    />

    <button
      :disabled="isLoading"
      type="submit"
      class="btn btn-primary block w-full text-center disabled:opacity-60"
    >
      Verify Email
    </button>

    <button
      type="button"
      class="btn btn-light block w-full text-center"
      @click="handleOtp"
      :disabled="resendDisabled || isOtpLoading"
    >
      Resend OTP
      <span v-if="resendDisabled">
        (Resend in {{ resendCountdown }} seconds)</span
      >
    </button>
  </form>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter, useRoute } from "vue-router";
import { ref, watch, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import Textinput from "@/components/Textinput";

const schema = yup.object({
  token: yup.string().required("Token is required"),
  password: yup.string().required("Password is required"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: token, errorMessage: tokenError } = useField("token");
const { value: password, errorMessage: passwordError } = useField("password");

const router = useRouter();
const route = useRoute();
const { state, dispatch } = useStore();
const emailAddress = route.params.email;
const toast = useToast();
const isLoading = computed(() => state.auth.loading);
const isOtpLoading = computed(() => state.auth.loading);
const isSuccess = computed(() => state.auth.validendsuccess);
const isOtpSuccess = computed(() => state.auth.validinitsuccess);
const resendCountdown = ref(0);
const resendDisabled = ref(false);

const resendOTP = () => {
  // Implement your OTP resend logic here
  // Disable the button and start the countdown
  resendDisabled.value = true;
  let countdown = 20; // 2 minutes
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

const handleOtp = () => {
  dispatch("validateEmailInitiate", {
    emailAddress,
  });
};
onMounted(() => {
  setTimeout(() => {
    handleOtp();
  }, 1000);
});
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

const onSubmit = handleSubmit((values) => {
  dispatch("validateEmailComplete", {
    emailAddress,
    ...values,
  });
});
watch(isOtpSuccess, () => {
  resendOTP();
});
watch(isSuccess, () => {
  toast.success("Sign up successful");
  isSuccess.value && router.push(`/login`);
});
</script>

<style lang="scss"></style>

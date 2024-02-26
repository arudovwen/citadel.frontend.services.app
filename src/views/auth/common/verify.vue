<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      :label="`${
        route.params.type.toLowerCase() === 'otp' ? 'OTP' : 'Password'
      }`"
      :type="`${
        route.params.type.toLowerCase() === 'otp' ? 'text' : 'password'
      }`"
      :placeholder="`Type your ${
        route.params.type.toLowerCase() === 'otp' ? 'otp' : 'password'
      }`"
      name="password"
      v-model="password"
      hasicon
      classInput="h-[48px]"
      required
      :error="passwordError"
    />
    <div
      v-if="route.params.type.toLowerCase() === 'password'"
      class="mt-4 text-right"
    >
      <router-link
        to="/forgot-password"
        class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >Forgot Password?</router-link
      >
    </div>
    <Button
      :disabled="isLoading"
      :isLoading="isLoading"
      type="submit"
      class="btn btn-primary block w-full text-center disabled:opacity-60"
    >
      Verify
    </Button>

    <button
      v-if="route.params.type.toLowerCase() === 'otp'"
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
import Button from "@/components/Button";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useRoute } from "vue-router";
import { ref, watch, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import Textinput from "@/components/Textinput";
onMounted(() => {
  if (route.params?.type?.toLowerCase() === "otp") {
    handleOtp();
  }
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

const route = useRoute();
const { state, dispatch } = useStore();
const toast = useToast();
const permissions = computed(() => state.auth.permissions);

const canSeeOverview = computed(
  () =>
    permissions.value?.includes("CAN_VIEW_ADMIN_DASHBOARD") ||
    permissions.value?.includes("CAN_VIEW_INSPECTORATE_DASHBOARD")
);

const canSeeHodDashboard = computed(() =>
  permissions?.value?.includes("CAN_VIEW_HOD_DASHBOARD")
);

const canSeeCoordinatorZone = computed(() =>
  permissions.value?.includes("CAN_VIEW_COORDINATOR_DASHBOARD")
);

const canSeePastorCenter = computed(
  () =>
    permissions.value?.includes("CAN_VIEW_CENTERS") &&
    permissions.value?.includes("CAN_VIEW_CIH_MANAGEMENT")
);
const canSeeVenues = computed(
  () =>
    permissions.value?.includes("CAN_VIEW_VENUES") &&
    permissions.value?.includes("CAN_VIEW_REQUESTS")
);

const isLoading = computed(() => state.auth.loading);
const isOtpLoading = computed(() => state.auth.loading);
const isSuccess = computed(() => state.auth.loginsuccess);
const isOtpSuccess = computed(() => state.auth.requestsuccess);

const userData = computed(() => JSON.parse(localStorage.getItem("userData")));
const resendCountdown = ref(20);
const resendDisabled = ref(true);

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

const formValues = {
  password: "",
};
// Define a validation schema
const schema = yup.object({
  password: yup.string().required("Password is required"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
// No need to define rules for fields

const { value: password, errorMessage: passwordError } = useField("password");

const handleOtp = () => {
  dispatch("requestOtp", {
    emailAddress: route.params.email,
    grantType: "password",
  });
};
const onSubmit = handleSubmit((values) => {
  dispatch("login", {
    ...values,
    username: route.params.email,
    grantType: "password",
  });
});

// Automatically start the countdown on component mount

const handleNavigation = (userId) => {
  if (canSeeOverview.value) {
    window.location.replace("/overview");
    return;
  }
  if (canSeeHodDashboard.value) {
    window.location.replace("/departments");
    return;
  }

  if (canSeeCoordinatorZone.value) {
    window.location.replace("/cih/zones");
    return;
  }

  if (canSeePastorCenter.value) {
    window.location.replace("/cih/center");
    return;
  }

  if (canSeeVenues.value) {
    window.location.replace("/venue-management");
    return;
  }

  window.location.replace(`/profile/${userId}`);
  console.log("My permissions:" + JSON.stringify(permissions.value));
};

watch(isOtpSuccess, () => {
  if (isOtpSuccess.value) {
    toast.success("Otp sent");
    resendOTP();
  }
});
watch(isSuccess, () => {
  // const isMember = userData.value?.userRole.toLowerCase() == "member";
  const userId = userData.value?.id;
  toast.success("Login successful");
  dispatch("getAuthUserRoles", userId);
  // dispatch("getRolesList");

  handleNavigation(userId);

  // if (route.query.redirect_from) {
  //   window.location.replace(route.query.redirect_from);
  // } else {
  //   if (isMember.value) {
  //     window.location.replace(`/profile/${userId}`);
  //   } else {
  //     window.location.replace("/overview");
  //   }
  // }
});
</script>

<style lang="scss"></style>

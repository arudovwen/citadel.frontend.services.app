<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="Email"
      type="email"
      placeholder="Type your email"
      name="emailAddress"
      v-model="emailAddress"
      :error="emailError"
      classInput="h-[48px]"
    />

    <button
      type="submit"
      :disabled="isLoading"
      class="btn btn-primary block w-full text-center disabled:opacity-50"
    >
      Send recovery email
    </button>
  </form>
</template>
<script>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { computed, watch, reactive } from "vue";
import { useRouter } from "vue-router";

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
    const router = useRouter();
    const { state, dispatch } = useStore();
    const isLoading = computed(() => state.auth.loading);
    const success = computed(() => state.auth.forgotsuccess);

    // Define a validation schema
    const schema = yup.object({
      emailAddress: yup.string().required().email(),
    });
    const formState = reactive({
      emailAddress: "",
    });
    const { handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: formState,
    });
    // No need to define rules for fields

    const { value: emailAddress, errorMessage: emailError } =
      useField("emailAddress");

    const onSubmit = handleSubmit((value) => {
      dispatch("forgotPassword", value);
    });

    watch(success, () => {
      router.push(`/reset-password?email=${encodeURIComponent(emailAddress)}`);
    });
    return {
      emailAddress,
      emailError,
      onSubmit,
      isLoading,
    };
  },
};
</script>
<style lang="scss"></style>

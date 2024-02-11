<template>
  <form @submit.prevent="onSubmit">
    <Card title="">
      <div class="flex flex-col gap-y-5">
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
          :options="roles"
          v-model="userRole"
          :error="roleError"
        />
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button
          type="submit"
          text="Add user"
          btnClass="btn-dark w-full disabled:opacity-50"
          :disabled="loading"
          :isLoading="loading"
        />
      </div>
    </Card>
  </form>
</template>
<script setup>
import { reactive, computed, onMounted } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import Select from "@/components/Select";
import { useStore } from "vuex";

const { state, dispatch } = useStore();
onMounted(() => {
  dispatch("getRolesList");
});
const loading = computed(() => state.member.addloading);
const roles = computed(() =>
  state?.role?.roles
    ?.filter((i) => i.name.toLowerCase() !== "firsttimers")
    .map((i) => {
      return { value: i.name, label: i.name };
    })
);
const formData = reactive({
  userRole: "",

  emailAddress: "",
});
const formDataSchema = yup.object().shape({
  userRole: yup.string().required("Please select a role"),

  emailAddress: yup
    .string()
    .email("Invalid email format")
    .required("Email Address is required"),
});

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: emailAddress, errorMessage: emailAddressError } =
  useField("emailAddress");

const { value: userRole, errorMessage: roleError } = useField("userRole");

const onSubmit = handleSubmit((values) => {
  dispatch("addUser", {
    ...values,
    password: "Password@1234",
  });
});
</script>
<style lang=""></style>

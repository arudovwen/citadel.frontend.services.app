<template>
  <form @submit.prevent="onSubmit">
    <Card title="">
      <div class="flex flex-col gap-y-5">
        <Textinput
          label="Affinity Group Name"
          type="text"
          v-model="affinityGroupName"
          :error="affinityGroupNameError"
          placeholder="Type in your group name"
        />
        <Select
          label="Marital Status"
          :options="maritalStatusMenu"
          v-model.value="maritalStatus"
          :modelValue="maritalStatus"
          :error="maritalStatusError"
          classInput="!h-[40px]"
        />

        <Textinput
          type="number"
          label="Minimum age"
          placeholder="Enter a minimum age"
          v-model.value="startAge"
          :error="startAgeError"
        />
        <Textinput
          type="number"
          label="Maximum age"
          placeholder="Enter a maximum age"
          v-model.value="endAge"
          :error="endAgeError"
        />
        <Textarea
          label="Affinity Group description"
          placeholder="Type in your group description"
          v-model.value="description"
          :error="descriptionError"
        />
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button
          type="submit"
          text="Add Affinity Group"
          btnClass="btn-dark w-full disabled:opacity-50"
          :isLoading="loading"
          :disabled="loading"
        />
      </div>
    </Card>
  </form>
</template>
<script setup>
import Select from "@/components/Select";

import { reactive, computed, watch } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";
import { useToast } from "vue-toastification";

import { useStore } from "vuex";
import { maritalStatusMenu } from "@/constant/data";

const { state, dispatch } = useStore();
const toast = useToast();
const loading = computed(() => state.affinityGroup.addAffinityGroupLoading);
const userId = computed(() => state.auth?.userData?.id);
const success = computed(() => state.affinityGroup.addAffinityGroupSuccess);
const formData = reactive({
  userId: userId.value,
  affinityGroupName: "",
  description: "",
  startAge: null,
  endAge: null,
});
const schema = yup.object().shape({
  affinityGroupName: yup.string().required("Group is required"),
  maritalStatus: yup.string(),
  startAge: yup
    .number()
    .typeError("Invalid value")
    .required("Enter a min age")
    .integer("Start age must be an integer"),
  endAge: yup
    .number()
    .typeError("Invalid value")
    .required("Enter a max age")
    .integer("End age must be an integer")
    .min(
      yup.ref("startAge"),
      "End age must be greater than or equal to start age"
    ),
  description: yup.string(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formData,
});
const { value: maritalStatus, errorMessage: maritalStatusError } =
  useField("maritalStatus");
const { value: affinityGroupName, errorMessage: affinityGroupNameError } =
  useField("affinityGroupName");
const { value: description, errorMessage: descriptionError } =
  useField("description");
const { value: startAge, errorMessage: startAgeError } = useField("startAge");
const { value: endAge, errorMessage: endAgeError } = useField("endAge");

const onSubmit = handleSubmit((values) => {
  dispatch("addAffinityGroup", {
    ...values,
    affinityGroupCode:
      values.affinityGroupName.slice(0, 2).toUpperCase() +
      Math.floor(Math.random() * 100 + 100),
  });

  console.log(values);
});

watch(success, () => {
  if (success.value) {
    dispatch("closeModal");
    toast.success("Affinity group successfully created");
    dispatch("getAffinityGroups");
  }
});
</script>
<style lang=""></style>

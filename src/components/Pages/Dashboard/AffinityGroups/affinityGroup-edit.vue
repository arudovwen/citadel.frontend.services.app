<template>
  <form @submit.prevent="onSubmit">
    <!-- {{ values }} -->
    <Card title="">
      <div class="flex flex-col gap-y-5">
        <Textinput
          label="Affinity Group Name"
          type="text"
          v-model="affinityGroupName"
          :error="affinityGroupNameError"
          placeholder="Type in your group name"
        />
        <VueSelect
          label="Marital Status"
          :options="maritalStatusMenu"
          v-model.value="maritalStatus"
          :modelValue="maritalStatus"
          :error="maritalStatusError"
          classInput="!h-[40px]"
          multiple
        />
        <Textinput
          label="Minimum age"
          placeholder="Enter a minimum age"
          v-model.value="startAge"
          :error="startAgeError"
        />
        <Textinput
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
import { computed, watch } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";
import { useToast } from "vue-toastification";
import { maritalStatusMenu } from "@/constant/data";
import VueSelect from "@/components/Select/VueSelect.vue";

import { useStore } from "vuex";

const { state, dispatch } = useStore();
const defaultData = computed(() => state.affinityGroup.selectedGroupToEdit);
const toast = useToast();
const loading = computed(() => state.affinityGroup.addAffinityGroupLoading);
const userId = computed(() => state.auth?.userData?.id);
const success = computed(() => state.affinityGroup.updateAffinityGroupSuccess);

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
  id: yup.string(),
  userId: yup.string(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    ...defaultData.value,
    userId: userId.value,
    maritalStatus: defaultData.value.maritalStatus
      ?.split(",")
      ?.map((i) => ({ label: i, value: i })),
  },
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
  const data = {
    ...values,
    maritalStatus: values.maritalStatus.map((i) => i.value).join(","),
  };

  dispatch("updateAffinityGroup", data);

  // console.log(values);
});

watch(success, () => {
  if (success.value) {
    toast.success("Affinity group successfully edited");
    dispatch("closeModal");
    dispatch("resetSuccess");

    dispatch("getAffinityGroups", {
      pageNumber: 1,
      pageSize: 25,
      searchParameter: "",
      sortOrder: "",
    });
  }
});
</script>
<style lang=""></style>

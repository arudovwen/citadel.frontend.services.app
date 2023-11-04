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
        <Textinput
          label="Affinity Group Code"
          type="text"
          v-model="affinityGroupCode"
          :error="affinityGroupCodeError"
          placeholder="Type in your group code"
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

import { useStore } from "vuex";

const { state, dispatch } = useStore();
const defaultData = computed(() => state.affinityGroup.selectedGroupToEdit);
const toast = useToast();
const loading = computed(() => state.affinityGroup.addAffinityGroupLoading);
const userId = computed(() => state.auth?.userData?.id);
const success = computed(() => state.affinityGroup.updateAffinityGroupSuccess);

const schema = yup.object().shape({
  affinityGroupName: yup.string().required("Group is required"),
  affinityGroupCode: yup.string().required("Group code is required"),
  description: yup.string(),
  id: yup.string(),
  userId: yup.string(),
});

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: { ...defaultData.value, userId: userId.value },
});

const { value: affinityGroupName, errorMessage: affinityGroupNameError } =
  useField("affinityGroupName");
const { value: affinityGroupCode, errorMessage: affinityGroupCodeError } =
  useField("affinityGroupCode");
const { value: description, errorMessage: descriptionError } =
  useField("description");

const onSubmit = handleSubmit((values) => {
  dispatch("updateAffinityGroup", values);

  // console.log(values);
});

watch(defaultData, () => {
  console.log("Changed");
  setValues({ ...defaultData.value });
});

watch(success, () => {
  if (success.value) {
    toast.success("Affinity group successfully created");
    dispatch("closeModal");
    dispatch("resetSuccess");

    dispatch("getAffinityGroups");
  }
});
</script>
<style lang=""></style>

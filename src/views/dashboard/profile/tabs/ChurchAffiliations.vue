<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CustomVueSelect
        name="levelOfATS"
        v-model="levelOfATS"
        :modelValue="levelOfATS"
        :error="levelOfATSError"
        :options="levelOfATSMenu"
        label="Level Of ATS"
        @update:modelValue="defaultSelectedValue = $event"
      />

      <CustomVueSelect
        name="isCharterMember"
        v-model="isCharterMember"
        :modelValue="isCharterMember"
        :error="isCharterMemberError"
        :options="isCharterMemberMenu"
        label="Charter Member"
        @update:modelValue="defaultSelectedValue = $event"
      />

      <Textinput
        label="Charter Member Number"
        type="number"
        placeholder="Type your charter number"
        name="charterMemberNumber"
        v-model="charterMemberNumber"
        :error="charterMemberNumberError"
        classInput="h-[40px]"
      />

      <CustomVueSelect
        name="CIHZone"
        v-model="CIHZone"
        :modelValue="CIHZone"
        :error="CIHZoneError"
        :options="CIHZoneMenu"
        label="CIH Zone"
        @update:modelValue="defaultSelectedValue = $event"
      />

      <Textinput
        label="Mountain of Evidence"
        type="text"
        placeholder="Type your charter number"
        name="MOE"
        v-model="MOE"
        :error="MOEError"
        classInput="h-[40px]"
      />

      <CustomVueSelect
        name="affinityGroup"
        v-model="affinityGroup"
        :modelValue="affinityGroup"
        :error="affinityGroupError"
        :options="affinityGroupMenu"
        label="Affinity Group"
        @update:modelValue="defaultSelectedValue = $event"
      />
      <CustomVueSelect
        name="department"
        v-model="department"
        :modelValue="department"
        :error="departmentError"
        :options="departmentMenu"
        label="Department"
        @update:modelValue="defaultSelectedValue = $event"
      />
      <CustomVueSelect
        name="CIHAddress"
        v-model="CIHAddress"
        :modelValue="CIHAddress"
        :error="CIHAddressError"
        :options="CIHAddressMenu"
        label="CIH Address"
        @update:modelValue="defaultSelectedValue = $event"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
      <div class="hidden sm:block"></div>
      <button type="submit" class="btn btn-dark block w-full text-center">
        Save Changes
      </button>
    </div>
  </form>
</template>

<script setup>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
import { useRouter } from "vue-router";
import {
  levelOfATSMenu,
  isCharterMemberMenu,
  CIHZoneMenu,
  affinityGroupMenu,
  departmentMenu,
  CIHAddressMenu,
} from "@/constant/data";
// Define a validation schema
const schema = yup.object({
  levelOfATS: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
  isCharterMember: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
  charterMemberNumber: yup.string(),
  CIHZone: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
  MOE: yup.string(),
  affinityGroup: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
  department: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
  CIHAddress: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
});

const router = useRouter();

const goToProfile = () => {
  router.push("/profile");
};

const formValues = {
  levelOfATS: {
    value: "",
    label: "",
  },
  isCharterMember: {
    value: "",
    label: "",
  },
  charterMemberNumber: "",
  CIHZone: {
    value: "",
    label: "",
  },
  MOE: "",
  affinityGroup: {
    value: "",
    label: "",
  },
  department: {
    value: "",
    label: "",
  },
  CIHAddress: {
    value: "",
    label: "",
  },
};

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
// No need to define rules for fields

const { value: levelOfATS, errorMessage: levelOfATSError } =
  useField("levelOfATS");
const { value: isCharterMember, errorMessage: isCharterMemberError } =
  useField("isCharterMember");
const { value: charterMemberNumber, errorMessage: charterMemberNumberError } =
  useField("charterMemberNumber");
const { value: CIHZone, errorMessage: CIHZoneError } = useField("CIHZone");
const { value: MOE, errorMessage: MOEError } = useField("MOE");
const { value: affinityGroup, errorMessage: affinityGroupError } =
  useField("affinityGroup");

const { value: department, errorMessage: departmentError } =
  useField("department");

const { value: CIHAddress, errorMessage: CIHAddressError } =
  useField("CIHAddress");

const onSubmit = handleSubmit((values) => {
  console.log("PersonalDetails: " + JSON.stringify(values));
  goToProfile();
});
</script>

<style lang="scss" scoped></style>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <ProfileInputSkeleton v-if="churchAffiliationsDataLoading" />

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        name="charteredMember"
        v-model="charteredMember"
        :modelValue="charteredMember"
        :error="charteredMemberError"
        :options="charteredMemberMenu"
        label="Charter Member"
        @update:modelValue="defaultSelectedValue = $event"
      />

      <Textinput
        v-if="Number(levelOfATS?.value) >= 2 && charteredMember.value"
        label="Charter Member Number"
        type="number"
        placeholder="Type your charter number"
        name="charterMemberNumber"
        v-model="charterMemberNumber"
        :error="charterMemberNumberError"
        classInput="h-[40px]"
      />

      <CustomVueSelect
        name="cihZone"
        v-model="cihZone"
        :modelValue="cihZone"
        :error="cihZoneError"
        :options="cihZoneMenu"
        label="CIH Zone"
        @update:modelValue="defaultSelectedValue = $event"
      />

      <Textinput
        label="Mountain of Evidence"
        type="text"
        placeholder="Type your charter number"
        name="mountainOfInfluence"
        v-model="mountainOfInfluence"
        :error="mountainOfInfluenceError"
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
        name="cihAddress"
        v-model="cihAddress"
        :modelValue="cihAddress"
        :error="cihAddressError"
        :options="cihAddressMenu"
        label="CIH Address"
        @update:modelValue="defaultSelectedValue = $event"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
      <button type="submit" class="btn btn-primary block w-full text-center">
        Save Changes
      </button>
      <div class="hidden sm:block"></div>
    </div>
  </form>
</template>

<script setup>
import { computed, watch } from "vue";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
import ProfileInputSkeleton from "@/components/Pages/Profile/ProfileInputSkeleton.vue";

// import { useRouter } from "vue-router";
import {
  levelOfATSMenu,
  charteredMemberMenu,
  cihZoneMenu,
  affinityGroupMenu,
  departmentMenu,
  cihAddressMenu,
} from "@/constant/data";

import { inject, onMounted } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

onMounted(() => {
  getChurchAffiliationsData();
});
const id = inject("id");
const store = useStore();
const toast = useToast();
const getChurchAffiliationsData = () => {
  store.dispatch("getChurchAffiliationsById", id.value);
};
const churchAffiliationsDataLoading = computed(
  () => store.state.profile.getChurchAffiliationsDataloading
);

const churchAffiliationsData = computed(
  () => store.state.profile.churchAffiliationsData
);

const success = computed(
  () => store.state.profile.updateChurchAffiliationDatasuccess
);

const schema = yup.object({
  levelOfATS: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
  charteredMember: yup
    .object()
    .shape({
      value: yup.bool(),
      label: yup.string(),
    })
    .nullable(),
  charterMemberNumber: yup.string(),
  cihZone: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
  mountainOfInfluence: yup.string(),
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
  cihAddress: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
});

// const router = useRouter();

// const goToProfile = () => {
//   router.push("/profile");
// };

// const formValues = {
//   levelOfATS: {
//     value: "",
//     label: "",
//   },
//   charteredMember: {
//     value: false,
//     label: "false",
//   },
//   charterMemberNumber: "",
//   cihZone: {
//     value: "",
//     label: "",
//   },
//   mountainOfInfluence: "",
//   affinityGroup: {
//     value: "",
//     label: "",
//   },
//   department: {
//     value: "",
//     label: "",
//   },
//   cihAddress: {
//     value: "",
//     label: "",
//   },
// };

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: churchAffiliationsData.value,
});
// No need to define rules for fields

const { value: levelOfATS, errorMessage: levelOfATSError } =
  useField("levelOfATS");
const { value: charteredMember, errorMessage: charteredMemberError } =
  useField("charteredMember");
const { value: charterMemberNumber, errorMessage: charterMemberNumberError } =
  useField("charterMemberNumber");
const { value: cihZone, errorMessage: cihZoneError } = useField("cihZone");
const { value: mountainOfInfluence, errorMessage: mountainOfInfluenceError } =
  useField("mountainOfInfluence");
const { value: affinityGroup, errorMessage: affinityGroupError } =
  useField("affinityGroup");

const { value: department, errorMessage: departmentError } =
  useField("department");

const { value: cihAddress, errorMessage: cihAddressError } =
  useField("cihAddress");

const prepareDetails = (values, type) => {
  const currentDatetime = new Date();
  const nigerianTime = new Date(currentDatetime.getTime() + 60 * 60 * 1000); // Subtract 1 hour

  const updateObj = {
    createdBy: "string",
    modifiedBy: "string",
    createdAt: "2023-10-31T16:32:14.775Z",
    modifiedAt: nigerianTime,
    id: 0,
    isDeleted: true,
    userId: id.value,
    levelOfATS: String(values.levelOfATS.value),
    charteredMember: values.charteredMember.value,
    charteredMemberNumber: String(values.charterMemberNumber),
    cihZone: values.cihZone.value,
    mountainOfInfluence: values.mountainOfInfluence,
    affinityGroup: values.affinityGroup.value,
    department: values.department.value,
    cihAddress: values.cihAddress.value,
  };
  const createObj = {
    userId: id.value,
    levelOfATS: String(values.levelOfATS.value),
    charteredMember: values.charteredMember.value,
    charteredMemberNumber: String(values.charterMemberNumber),
    cihZone: values.cihZone.value,
    mountainOfInfluence: values.mountainOfInfluence,
    affinityGroup: values.affinityGroup.value,
    department: values.department.value,
    cihAddress: values.cihAddress.value,
  };
  const obj = type == "create" ? createObj : updateObj;
  return obj;
};
const onSubmit = handleSubmit((values) => {
  // console.log("PersonalDetails: " + JSON.stringify(prepareDetails(values)));
  const hasDataError = churchAffiliationsData.value == null;
  if (hasDataError) {
    store.dispatch("createChurchAffiliation", prepareDetails(values, "create"));
  }
  if (!hasDataError) {
    store.dispatch("updateChurchAffiliation", prepareDetails(values, "edit"));
  }
});

watch(churchAffiliationsData, () => {
  setValues(churchAffiliationsData.value);
});

watch(success, () => {
  if (success.value) {
    toast.success("Successful");
  }
});
</script>

<style lang="scss" scoped></style>

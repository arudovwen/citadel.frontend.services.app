<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <ProfileInputSkeleton v-if="churchAffiliationsDataLoading" />

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- <span> zoneObj:{{ zoneObj }}</span> -->
      <!-- <span>zoneOptions:{{ zoneOptions }}</span> -->
      <!-- <span>data:{{ churchAffiliationsData }}</span> -->

      <!-- <span>DepObj: {{ departmentObj }}</span> -->
      <!-- <span>values: {{ values }}</span> -->

      <!-- {{ centerOptions }} -->
      <!-- {{ centersLoading }} -->
      <!-- {{ typeof Number(levelOfATS) }} -->
      <div>
        <Select
          :disabled="isAdmin ? false : true"
          label="Level Of ATS"
          :options="levelOfATSMenu"
          v-model.value="levelOfATS"
          :modelValue="levelOfATS"
          :error="levelOfATSError"
          classInput="!h-[40px]"
        />
      </div>

      <div>
        <Select
          :disabled="isAdmin ? false : true"
          label="Charter Member"
          :options="isCharterMemberMenu"
          v-model.value="charteredMember"
          :modelValue="charteredMember"
          :error="charteredMemberError"
          classInput="!h-[40px]"
        />
      </div>

      <div
        v-if="
          (Number(levelOfATS) >= 2 && charteredMember == true) ||
          charteredMember == 'true'
        "
      >
        <Textinput
          :disabled="isAdmin ? false : true"
          label="Charter Member Number"
          type="number"
          placeholder="Type your charter number"
          name="charteredMemberNumber"
          v-model="charteredMemberNumber"
          :error="charteredMemberNumberError"
          classInput="h-[40px]"
        />
      </div>

      <div>
        <CustomVueSelect
          :disabled="isAdmin ? false : true"
          label="CIH Zone"
          class="min-w-[200px] w-full md:w-auto"
          v-model.value="zoneObj"
          :modelValue="zoneObj"
          :error="cihZoneError"
          :options="zoneOptions"
          placeholder="Select zone"
          name="zone"
        />
      </div>

      <div>
        <CustomVueSelect
          :disabled="centersLoading || !isAdmin"
          :menuLoading="centersLoading"
          label="Center Address"
          class="min-w-[200px] w-full md:w-auto"
          v-model.value="centerObj"
          :modelValue="centerObj"
          :error="cihAddressError"
          :options="centerOptions"
          placeholder="Select center"
          name="CIH Address"
        />
      </div>

      <div>
        <Textinput
          :disabled="isAdmin ? false : true"
          label="Mountain of Evidence"
          type="text"
          placeholder="Type your mountain of evidence"
          name="mountainOfInfluence"
          v-model="mountainOfInfluence"
          :error="mountainOfInfluenceError"
          classInput="h-[40px]"
        />
      </div>

      <div>
        <CustomVueSelect
          :disabled="isAdmin ? false : true"
          label="Affinity Group"
          classInput="!h-[40px]"
          v-model.value="affinityGroupObj"
          :modelValue="affinityGroupObj"
          :error="affinityGroupError"
          :options="affinityGroupOptions"
          placeholder="Select affinity group"
          name="Affinity Group"
        />
      </div>

      <div>
        <CustomVueSelect
          :disabled="isAdmin ? false : true"
          label="Department"
          classInput="!h-[40px]"
          v-model.value="departmentObj"
          :modelValue="departmentObj"
          :error="departmentError"
          :options="departmentOptions"
          placeholder="Select department"
          name="Department"
        />
      </div>
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
import Select from "@/components/Select";
import { computed, watch, ref, onUnmounted } from "vue";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
// import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
import ProfileInputSkeleton from "@/components/Pages/Profile/ProfileInputSkeleton.vue";
// import VueSelect from "@/components/Select/VueSelect";
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
// import { useRouter } from "vue-router";
import { levelOfATSMenu, isCharterMemberMenu } from "@/constant/data";

import { inject, onMounted } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

onMounted(async () => {
  try {
    await getChurchAffiliationsData();
    await getZones();
    // await matchZone();
    await getAffinityGroups();
    // await matchAffinityGroup();
    await getDepartments();
    // await matchDepartment();
  } catch {
    console.log("Error");
  }
});

onUnmounted(() => {
  // store.state.profile.churchAffiliationsData =
});
const id = inject("id");
const isAdmin = inject("isAdmin");
const store = useStore();
const toast = useToast();
const getChurchAffiliationsData = () => {
  store.dispatch("getChurchAffiliationsById", id.value);
};
const centersLoading = computed(() => store.state.center.getcentersloading);
const zoneObj = ref({
  label: "",
  zoneId: "",
});
const centerObj = ref({
  label: "",
  centerId: "",
});

const departmentObj = ref({
  label: "",
  departmentId: "",
});

const affinityGroupObj = ref({
  label: "",
  affinityGroupId: "",
});
const zoneOptions = computed(() =>
  store.state?.zone?.zones.map((i) => {
    return {
      label: i.zoneName,
      zoneId: i.id,
    };
  })
);
const centerOptions = computed(() =>
  store.state?.center?.centers.map((i) => {
    return {
      label: i.centerName,
      centerId: i.id,
    };
  })
);

const departmentOptions = computed(() =>
  store.state?.department?.departments.map((i) => {
    return {
      label: i.departmentName,
      departmentId: i.id,
    };
  })
);

const affinityGroupOptions = computed(() =>
  store.state?.affinityGroup?.affinityGroups.map((i) => {
    return {
      label: i.affinityGroupName,
      affinityGroupId: i.id,
    };
  })
);

const churchAffiliationsDataLoading = computed(
  () => store.state.profile.getChurchAffiliationsDataloading
);

const churchAffiliationsData = computed(
  () => store.state.profile.churchAffiliationsData
);

const success = computed(
  () => store.state.profile.updateChurchAffiliationDataSuccess
);

const schema = yup.object({
  levelOfATS: yup.string(),
  charteredMember: yup.bool(),
  charteredMemberNumber: yup.number().nullable(),
  cihZone: yup.string().required("Zone is required"),
  mountainOfInfluence: yup.string(),
  affinityGroup: yup.string(),
  department: yup.string(),
  cihAddress: yup.string(),
});

const { handleSubmit, setValues, values } = useForm({
  validationSchema: schema,
  initialValues: churchAffiliationsData.value,
});
// No need to define rules for fields

const { value: levelOfATS, errorMessage: levelOfATSError } =
  useField("levelOfATS");
const { value: charteredMember, errorMessage: charteredMemberError } =
  useField("charteredMember");
const {
  value: charteredMemberNumber,
  errorMessage: charteredMemberNumberError,
} = useField("charteredMemberNumber");
const { errorMessage: cihZoneError } = useField("cihZone");
const { value: mountainOfInfluence, errorMessage: mountainOfInfluenceError } =
  useField("mountainOfInfluence");
const { errorMessage: affinityGroupError } = useField("affinityGroup");

const { errorMessage: departmentError } = useField("department");

const { errorMessage: cihAddressError } = useField("cihAddress");

const prepareDetails = (values, type) => {
  const updateObj = {
    id: churchAffiliationsData.value?.id,
    userId: id.value,
    levelOfATS: String(values.levelOfATS),
    charteredMember:
      values.charteredMember == true || values.charteredMember == "true"
        ? true
        : false,
    charteredMemberNumber: String(values.charteredMemberNumber),
    cihZone: values.cihZone,
    mountainOfInfluence: values.mountainOfInfluence,
    affinityGroup: values.affinityGroup,
    department: values.department,
    cihAddress: values.cihAddress,
  };
  const createObj = {
    userId: id.value,
    levelOfATS: String(values.levelOfATS),
    charteredMember:
      values.charteredMember == true || values.charteredMember == "true"
        ? true
        : false,
    charteredMemberNumber: String(values.charteredMemberNumber),
    cihZone: values.cihZone,
    mountainOfInfluence: values.mountainOfInfluence,
    affinityGroup: values.affinityGroup,
    department: values.department,
    cihAddress: values.cihAddress,
  };
  const obj = type == "create" ? createObj : updateObj;
  return obj;
};

const getZones = () => {
  store.dispatch("getZones", { pageNumber: 1, pageSize: 10000 });
};
const getDepartments = () => {
  store.dispatch("getDepartments", { pageNumber: 1, pageSize: 10000 });
};

const getAffinityGroups = () => {
  store.dispatch("getAffinityGroups", { pageNumber: 1, pageSize: 10000 });
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

const matchZone = () => {
  zoneObj.value = zoneOptions.value.find(
    (zone) => zone.label === churchAffiliationsData.value.cihZone
  );

  console.log("zoneObj: " + JSON.stringify(zoneObj.value));
};

const matchCenter = () => {
  centerObj.value =
    centerOptions.value.find(
      (center) => center.label === churchAffiliationsData.value.cihAddress
    ) || centerObj.value;
};

const matchDepartment = () => {
  departmentObj.value = departmentOptions.value.find(
    (department) => department.label === churchAffiliationsData.value.department
  );
};

const matchAffinityGroup = () => {
  affinityGroupObj.value = affinityGroupOptions.value.find(
    (affinityGroup) =>
      affinityGroup.label === churchAffiliationsData.value.affinityGroup
  );
};
watch(zoneOptions, () => {
  matchZone();
});
watch(centerOptions, () => {
  matchCenter();
});
watch(departmentOptions, () => {
  matchDepartment();
});
watch(affinityGroupOptions, () => {
  matchAffinityGroup();
});

watch(churchAffiliationsData, (newValue) => {
  setValues(newValue);
  matchCenter();
  matchZone();
  matchDepartment();
  matchAffinityGroup();
});

watch(zoneObj, (newValue) => {
  setValues({
    ...values,
    cihZone: newValue?.label,
  });
  //reset selected center obj when selected zoneObj changes
  // centerObj.value = {
  //   label: "",
  //   centerId: "",
  // };

  store.dispatch("getAllCenters", { zoneId: newValue?.zoneId });
});
watch(departmentObj, (newValue) => {
  setValues({
    ...values,
    department: newValue?.label,
  });
});
watch(affinityGroupObj, (newValue) => {
  setValues({
    ...values,
    affinityGroup: newValue?.label,
  });
});

watch(centerObj, (newValue) => {
  setValues({
    ...values,
    cihAddress: newValue?.label,
  });
});

watch(success, () => {
  if (success.value) {
    toast.success("Successful");
    getChurchAffiliationsData();
  }
});
</script>

<style lang="scss" scoped></style>

<!-- <template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <ProfileInputSkeleton v-if="churchAffiliationsDataLoading" />

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
     
      <div>
        <Select
          label="Level Of ATS"
          :options="levelOfATSMenu"
          v-model.value="levelOfATS"
          :modelValue="levelOfATS"
          :error="levelOfATSError"
          classInput="!h-[40px]"
        />
      </div>

      <div>
        <Select
          label="Charter Member"
          :options="isCharterMemberMenu"
          v-model.value="charteredMember"
          :modelValue="charteredMember"
          :error="charteredMemberError"
          classInput="!h-[40px]"
        />
      </div>


      <div>
        <Textinput
          label="Charter Member Number"
          type="number"
          placeholder="Type your charter number"
          name="charteredMemberNumber"
          v-model="charteredMemberNumber"
          :error="charteredMemberNumberError"
          classInput="h-[40px]"
        />
      </div>

      <div>
        <CustomVueSelect
          label="CIH Zone"
          class="min-w-[200px] w-full md:w-auto"
          v-model.value="zoneObj"
          :modelValue="zoneObj"
          :error="cihZoneError"
          :options="zoneOptions"
          placeholder="Select zone"
          name="zone"
        />
      </div>

      <div>
        <CustomVueSelect
          :disabled="centersLoading"
          :menuLoading="centersLoading"
          label="CIH Address"
          class="min-w-[200px] w-full md:w-auto"
          v-model.value="centerObj"
          :modelValue="centerObj"
          :error="cihAddressError"
          :options="centerOptions"
          placeholder="Select center"
          name="CIH Address"
        />
      </div>

      <div>
        <Textinput
          label="Mountain of Evidence"
          type="text"
          placeholder="Type your mountain of evidence"
          name="mountainOfInfluence"
          v-model="mountainOfInfluence"
          :error="mountainOfInfluenceError"
          classInput="h-[40px]"
        />
      </div>

      <div>
        <CustomVueSelect
          label="Affinity Group"
          classInput="!h-[40px]"
          v-model.value="affinityGroupObj"
          :modelValue="affinityGroupObj"
          :error="affinityGroupError"
          :options="affinityGroupOptions"
          placeholder="Select affinity group"
          name="Affinity Group"
        />
      </div>

      <div>
        <CustomVueSelect
          label="Department"
          classInput="!h-[40px]"
          v-model.value="departmentObj"
          :modelValue="departmentObj"
          :error="departmentError"
          :options="departmentOptions"
          placeholder="Select department"
          name="Department"
        />
      </div>
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
import Select from "@/components/Select";
import { computed, watch, ref, watchEffect } from "vue";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
// import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
import ProfileInputSkeleton from "@/components/Pages/Profile/ProfileInputSkeleton.vue";
// import VueSelect from "@/components/Select/VueSelect";
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
// import { useRouter } from "vue-router";
import { levelOfATSMenu, isCharterMemberMenu } from "@/constant/data";

import { inject, onMounted } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

onMounted(async () => {
  try {
    await getChurchAffiliationsData();
    await getZones();
    // await matchZone();
    await getAffinityGroups();
    // await matchAffinityGroup();
    await getDepartments();
    // await matchDepartment();
  } catch {
    console.log("Error");
  }
});
const id = inject("id");
const store = useStore();
const toast = useToast();
const getChurchAffiliationsData = () => {
  store.dispatch("getChurchAffiliationsById", id.value);
};

const isCharteredMember = ref(
  computed(() => (values?.charteredMember == "true" ? true : false))
);
const centersLoading = computed(() => store.state.center.getcentersloading);
const zoneObj = ref({
  label: "",
  zoneId: "",
});
const centerObj = ref({
  label: "",
  centerId: "",
});

const departmentObj = ref({
  label: "",
  departmentId: "",
});

const affinityGroupObj = ref({
  label: "",
  affinityGroupId: "",
});
const zoneOptions = computed(() =>
  store.state?.zone?.zones.map((i) => {
    return {
      label: i.zoneName,
      zoneId: i.id,
    };
  })
);
const centerOptions = computed(() =>
  store.state?.center?.centers.map((i) => {
    return {
      label: i.centerName,
      centerId: i.id,
    };
  })
);

const departmentOptions = computed(() =>
  store.state?.department?.departments.map((i) => {
    return {
      label: i.departmentName,
      departmentId: i.id,
    };
  })
);

const affinityGroupOptions = computed(() =>
  store.state?.affinityGroup?.affinityGroups.map((i) => {
    return {
      label: i.affinityGroupName,
      affinityGroupId: i.id,
    };
  })
);

const churchAffiliationsDataLoading = computed(
  () => store.state.profile.getChurchAffiliationsDataloading
);

const churchAffiliationsData = computed(
  () => store.state.profile.churchAffiliationsData
);

const success = computed(
  () => store.state.profile.updateChurchAffiliationDataSuccess
);

const schema = yup.object({
  levelOfATS: yup.string(),
  charteredMember: yup.bool(),
  charteredMemberNumber: yup.number().nullable(),
  cihZone: yup.string().required("Zone is required"),
  mountainOfInfluence: yup.string(),
  affinityGroup: yup.string(),
  department: yup.string(),
  cihAddress: yup.string(),
});

const { handleSubmit, setValues, values } = useForm({
  validationSchema: schema,
  initialValues: churchAffiliationsData.value,
});
// No need to define rules for fields

const { value: levelOfATS, errorMessage: levelOfATSError } =
  useField("levelOfATS");
const { value: charteredMember, errorMessage: charteredMemberError } =
  useField("charteredMember");
const {
  value: charteredMemberNumber,
  errorMessage: charteredMemberNumberError,
} = useField("charteredMemberNumber");
const { errorMessage: cihZoneError } = useField("cihZone");
const { value: mountainOfInfluence, errorMessage: mountainOfInfluenceError } =
  useField("mountainOfInfluence");
const { errorMessage: affinityGroupError } = useField("affinityGroup");

const { errorMessage: departmentError } = useField("department");

const { errorMessage: cihAddressError } = useField("cihAddress");

const prepareDetails = (values, type) => {
  const updateObj = {
    id: churchAffiliationsData.value?.id,
    userId: id.value,
    levelOfATS: String(values.levelOfATS),
    charteredMember:
      values.charteredMember == true || values.charteredMember == "true"
        ? true
        : false,
    charteredMemberNumber: String(values.charteredMemberNumber),
    cihZone: values.cihZone,
    mountainOfInfluence: values.mountainOfInfluence,
    affinityGroup: values.affinityGroup,
    department: values.department,
    cihAddress: values.cihAddress,
  };
  const createObj = {
    userId: id.value,
    levelOfATS: String(values.levelOfATS),
    charteredMember:
      values.charteredMember == true || values.charteredMember == "true"
        ? true
        : false,
    charteredMemberNumber: String(values.charteredMemberNumber),
    cihZone: values.cihZone,
    mountainOfInfluence: values.mountainOfInfluence,
    affinityGroup: values.affinityGroup,
    department: values.department,
    cihAddress: values.cihAddress,
  };
  const obj = type == "create" ? createObj : updateObj;
  return obj;
};

const getZones = () => {
  store.dispatch("getZones", { pageNumber: 1, pageSize: 10000 });
};
const getDepartments = () => {
  store.dispatch("getDepartments", { pageNumber: 1, pageSize: 10000 });
};

const getAffinityGroups = () => {
  store.dispatch("getAffinityGroups", { pageNumber: 1, pageSize: 10000 });
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

const matchZone = () => {
  zoneObj.value = zoneOptions.value.find(
    (zone) => zone.label === churchAffiliationsData.value.cihZone
  );

  console.log("zoneObj: " + JSON.stringify(zoneObj.value));
};

const matchCenter = () => {
  centerObj.value =
    centerOptions.value.find(
      (center) => center.label === churchAffiliationsData.value.cihAddress
    ) || centerObj.value;

  return centerObj.value;
};

const matchDepartment = () => {
  departmentObj.value = departmentOptions.value.find(
    (department) => department.label === churchAffiliationsData.value.department
  );
};

const matchAffinityGroup = () => {
  affinityGroupObj.value = affinityGroupOptions.value.find(
    (affinityGroup) =>
      affinityGroup.label === churchAffiliationsData.value.affinityGroup
  );
};
watchEffect(() => {
  if (zoneOptions.value?.length > 0 && churchAffiliationsData.value !== null) {
    matchZone();
  }
});
watchEffect(async () => {
  if (
    centerOptions.value &&
    centerOptions.value?.length > 0 &&
    churchAffiliationsData.value !== null
  ) {
    const res = await matchCenter();
    console.log("res: " + JSON.stringify(res));
    setValues({
      ...values,
      cihAddress: res?.label,
    });
  }
});

// watch(centerOptions, () => {
//   matchCenter();
// });
watchEffect(() => {
  if (
    departmentOptions.value?.length > 0 &&
    churchAffiliationsData.value !== null
  ) {
    matchDepartment();
  }
});
watchEffect(() => {
  if (
    affinityGroupOptions.value?.length > 0 &&
    churchAffiliationsData.value !== null
  ) {
    matchAffinityGroup();
  }
});

watch(churchAffiliationsData, (newValue) => {
  setValues(newValue);
  matchZone();
  matchCenter();

  matchDepartment();
  matchAffinityGroup();
});

watch(zoneObj, (newValue) => {
  setValues({
    ...values,
    cihZone: newValue?.label,
  });
  //reset selected center obj when selected zoneObj changes
  // centerObj.value = {
  //   label: "",
  //   centerId: "",
  // };

  store.dispatch("getAllCenters", { zoneId: newValue?.zoneId });
});
watch(departmentObj, (newValue) => {
  setValues({
    ...values,
    department: newValue?.label,
  });
});
watch(affinityGroupObj, (newValue) => {
  setValues({
    ...values,
    affinityGroup: newValue?.label,
  });
});

watch(centerObj, (newValue) => {
  setValues({
    ...values,
    cihAddress: newValue?.label,
  });
});

watch(success, () => {
  if (success.value) {
    toast.success("Successful");
  }
});

watch(isCharteredMember, () => {
  // console.log(isCharteredMember.value);
});
</script>

<style lang="scss" scoped></style> -->

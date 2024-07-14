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
      <!-- {{ hasDepartment }} -->
      <!-- <span>CIHROLES: {{ cihRoles }}</span> -->

      <div>
        <Select
          :disabled="
            !state.auth.permissions.includes(
              'CAN_UPDATE_CHURCH_AFFILIATION_MEMBERS'
            )
          "
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
          :disabled="
            !state.auth.permissions.includes(
              'CAN_UPDATE_CHURCH_AFFILIATION_MEMBERS'
            )
          "
          label="Charter Member"
          :options="isCharterMemberMenu"
          v-model.value="charteredMember"
          :modelValue="charteredMember"
          :error="charteredMemberError"
          classInput="!h-[40px]"
        />
      </div>
      <div v-if="charteredMember">
        <CustomVueSelect
          :disabled="
            !state.auth.permissions.includes(
              'CAN_UPDATE_CHURCH_AFFILIATION_MEMBERS'
            )
          "
          label="Charter Member Number"
          :options="charteredMemberNumberMenu"
          v-model.value="charteredMemberNumber"
          :modelValue="charteredMemberNumber"
          :error="charteredMemberNumberError"
          classInput="!h-[40px]"
          placeholder="Search and select"
          :reduce="(option) => option.value"
        />
      </div>

      <!-- <div
        v-if="
          (Number(levelOfATS) >= 2 && charteredMember == true) ||
          charteredMember == 'true'
        "
      >
        <Textinput
          :disabled="
            !state.auth.permissions.includes(
              'CAN_UPDATE_CHURCH_AFFILIATION_MEMBERS'
            )
          "
          label="Charter Member Number"
          type="number"
          placeholder="Type your charter number"
          name="charteredMemberNumber"
          v-model="charteredMemberNumber"
          :error="charteredMemberNumberError"
          classInput="h-[40px]"
        />
      </div> -->

      <div>
        <div v-if="isUserProfile" class="">
          <CustomVueSelect
            :canRequest="isUserProfile"
            :request="requestFnObj('Request to change zone', 'toggleReqZone')"
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
        <div v-else class="">
          <CustomVueSelect
            :canRequest="isUserProfile"
            :request="requestFnObj('Request to change zone', 'toggleReqZone')"
            :disabled="
              !state.auth.permissions.includes(
                'CAN_UPDATE_CHURCH_AFFILIATION_MEMBERS'
              )
            "
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
      </div>

      <div>
        <div v-if="isUserProfile" class="">
          <CustomVueSelect
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
        <div v-else class="">
          <CustomVueSelect
            :disabled="
              centersLoading ||
              !state.auth.permissions.includes(
                'CAN_UPDATE_CHURCH_AFFILIATION_MEMBERS'
              )
            "
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
      </div>

      <div class="hidden">
        <Textinput
          :disabled="
            !state.auth.permissions.includes(
              'CAN_UPDATE_CHURCH_AFFILIATION_MEMBERS'
            )
          "
          label="Mountain of Influence"
          type="text"
          placeholder="Type your mountain of influence"
          name="mountainOfInfluence"
          v-model="mountainOfInfluence"
          :error="mountainOfInfluenceError"
          classInput="h-[40px]"
        />
      </div>

      <div class="relative">
        <!-- <Textinput
          placeholder=""
          :disabled="true"
          label="Affinity Group"
          name="Affinity Group"
          classInput="h-[40px]"
        /> -->

        <FormGroup label="Affinity Group" name="Affinity Group">
          <div
            class="px-3 py-2 min-h-[40px] border bottom-0 left-0 border-gray-200 rounded-[4px] w-full flex flex-wrap gap-3"
          >
            <div
              class="h-[30px] px-2 flex items-center justify-center text-xs rounded-lg bg-gray-100"
              v-for="group in affinityGroup"
              :key="group"
            >
              {{ group }}
            </div>
          </div>
        </FormGroup>
      </div>

      <div className="hidden ">
        <CustomVueSelect
          :request="
            requestFnObj(
              hasDepartment
                ? 'Request to change department'
                : 'Request to join department',
              'toggleReqDepartment'
            )
          "
          :canRequest="!canEditDetails && isUserProfile"
          :disabled="canEditDetails"
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
      <!-- 
      <div>
        <Select
          :disabled="canEditDetails"
          label="CIH Role"
          :options="cihRoles"
          v-model.value="cihRole"
          :modelValue="cihRole"
          :error="cihRoleError"
          classInput="!h-[40px]"
        />
      </div> -->
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
      <div v-if="isUserProfile" class="">
        <Button
          v-if="isUserProfile"
          :isLoading="submitLoading"
          :disabled="!isUserProfile"
          type="submit"
          class="btn btn-primary block w-full text-center"
        >
          Save Changes
        </Button>
      </div>
      <div v-else class="">
        <Button
          v-if="
            state.auth.permissions.includes(
              'CAN_UPDATE_CHURCH_AFFILIATION_MEMBERS'
            )
          "
          :isLoading="submitLoading"
          :disabled="
            !state.auth.permissions.includes(
              'CAN_UPDATE_CHURCH_AFFILIATION_MEMBERS'
            )
          "
          type="submit"
          class="btn btn-primary block w-full text-center"
        >
          Save Changes
        </Button>
      </div>
      <div class="hidden sm:block"></div>
    </div>
    <RequestZone :affiliation="churchAffiliationsData" />
    <RequestGroup :affiliation="churchAffiliationsData" />
    <!-- <RequestDepartment :affiliation="churchAffiliationsData" /> -->
  </form>
</template>

<script setup>
import Button from "@/components/Button";

import Select from "@/components/Select";
import { computed, watch, ref, onUnmounted } from "vue";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import ProfileInputSkeleton from "@/components/Pages/Profile/ProfileInputSkeleton.vue";
import FormGroup from "@/components/FormGroup";
import CustomVueSelect from "@/components/Select/VueSelect.vue";
// import { useRouter } from "vue-router";
import { levelOfATSMenu, isCharterMemberMenu } from "@/constant/data";
import RequestZone from "@/components/Pages/Profile/ChurchAffiliation/RequestZone.vue";
import RequestGroup from "@/components/Pages/Profile/ChurchAffiliation/RequestGroup.vue";
// import RequestDepartment from "@/components/Pages/Profile/ChurchAffiliation/RequestDepartment.vue";
import { inject, onMounted } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

onMounted(async () => {
  try {
    await getChurchAffiliationsData();
    await getZones();
    // await matchZone();
    // await getAffinityGroups();
    // await matchAffinityGroup();
    await getDepartments();
    await getAllCihRoles();
    // await matchDepartment();
  } catch {
    console.log("Error");
  }
});

onUnmounted(() => {
  // store.state.profile.churchAffiliationsData =
});
const store = useStore();
const { state } = store;
const id = inject("id");
const canEditDetails = inject("canEditDetails");
const isUserProfile = inject("isUserProfile");

// const isInspectorate = inject("isInspectorate");
const charteredMemberNumberMenu = computed(() =>
  store.state.department.atsRecords.map((i) => ({
    label: `${i.ats_membership_no} - ${i.ats_original_names}`,
    value: i.ats_membership_no,
  }))
);
const toast = useToast();
const getChurchAffiliationsData = () => {
  store.dispatch("getChurchAffiliationsById", id.value);
  store.dispatch("getAtsMembersRecords", { pageNumber: 1, pageSuze: 150000 });
};
const submitLoading = computed(
  () => store.state.profile.updateChurchAffiliationDataloading
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

// const affinityGroupObj = ref({
//   label: "",
//   affinityGroupId: "",
// });
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

// const cihRoles = computed(() =>
//   store?.state?.profile?.allCihRoles.map((i) => {
//     return {
//       label: i,
//       value: i,
//     };
//   })
// );

const churchAffiliationsDataLoading = computed(
  () => store.state.profile.getChurchAffiliationsDataloading
);

const churchAffiliationsData = computed(
  () => store.state.profile.churchAffiliationsData
);

const hasDepartment = computed(() => {
  return store.state.profile.churchAffiliationsData?.department ? true : false;
});

// const hasAffinityGroup = computed(() => {
//   return store.state.profile.churchAffiliationsData?.affinityGroup
//     ? true
//     : false;
// });

const success = computed(
  () => store.state.profile.updateChurchAffiliationDataSuccess
);

const schema = yup.object({
  levelOfATS: yup.string().nullable(),
  charteredMember: yup.bool().nullable(),
  charteredMemberNumber: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable(),
  cihZone: yup.string().nullable(),
  cihRole: yup.string().nullable(),
  mountainOfInfluence: yup.string().nullable(),
  affinityGroup: yup.array().nullable(),
  department: yup.string().nullable(),
  cihAddress: yup.string().nullable(),
  zoneId: yup.string().nullable(),
  centerId: yup.string().nullable(),
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
const { value: affinityGroup } = useField("affinityGroup");
// const { value: cihRole, errorMessage: cihRoleError } = useField("cihRole");

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
    cihRole: values.cihRole,
    mountainOfInfluence: values.mountainOfInfluence,
    affinityGroup: values.affinityGroup,
    department: values.department ? values.department : "",
    cihAddress: values.cihAddress,
    zoneId: values.zoneId,
    centerId: values.centerId,
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
    cihRole: values.cihRole,
    mountainOfInfluence: values.mountainOfInfluence,
    affinityGroup: values.affinityGroup,
    department: values.department ? values.department : "",
    cihAddress: values.cihAddress,
    zoneId: values.zoneId,
    centerId: values.centerId,
  };
  const obj = type == "create" ? createObj : updateObj;
  return obj;
};

const getZones = () => {
  store.dispatch("getZones", { pageNumber: 1, pageSize: 25000 });
};
const getDepartments = () => {
  store.dispatch("getDepartments", { pageNumber: 1, pageSize: 25000 });
};

const onSubmit = handleSubmit((values) => {
  const shouldCreate =
    churchAffiliationsData.value == null || !churchAffiliationsData?.value?.id;
  if (shouldCreate) {
    store.dispatch("createChurchAffiliation", prepareDetails(values, "create"));
  }
  if (!shouldCreate) {
    store.dispatch("updateChurchAffiliation", prepareDetails(values, "edit"));
  }
});

const getAllCihRoles = () => {
  store.dispatch("getAllCihRoles");
};

const matchZone = () => {
  zoneObj.value = zoneOptions.value.find(
    (zone) => zone.label === churchAffiliationsData.value?.cihZone
  );
};

const matchCenter = () => {
  centerObj.value =
    centerOptions.value.find(
      (center) => center.label === churchAffiliationsData.value?.cihAddress
    ) || centerObj.value;
};

const matchDepartment = () => {
  departmentObj.value = departmentOptions.value.find(
    (department) =>
      department.label === churchAffiliationsData.value?.department
  );
};

// const matchAffinityGroup = () => {
//   affinityGroupObj.value = affinityGroupOptions.value.find(
//     (affinityGroup) =>
//       affinityGroup.label === churchAffiliationsData.value?.affinityGroup
//   );
// };

const requestFnObj = (name, toggle) => {
  return {
    name: name,
    toggle: toggle,
  };
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
// watch(affinityGroupOptions, () => {
//   matchAffinityGroup();
// });
// watch(affinityGroup, () => {
//   console.log("affinityGroup:" + JSON.stringify(affinityGroup.value));
//   if (affinityGroup.value.length > 0) {
//     affinityGroup.value = affinityGroup.value.filter(
//       (item) => item.toLowerCase() !== "none"
//     );
//   }
// });

watch(churchAffiliationsData, (newValue) => {
  setValues(newValue);
  matchCenter();
  matchZone();
  matchDepartment();
  // matchAffinityGroup();
});

watch(zoneObj, (newValue) => {
  setValues({
    ...values,
    cihZone: newValue?.label,
    zoneId: newValue?.zoneId,
  });

  store.dispatch("getAllCenters", { zoneId: newValue?.zoneId });
});
watch(departmentObj, (newValue) => {
  setValues({
    ...values,
    department: newValue?.label,
  });
});
// watch(affinityGroupObj, (newValue) => {
//   setValues({
//     ...values,
//     affinityGroup: newValue?.label,
//   });
// });

watch(centerObj, (newValue) => {
  setValues({
    ...values,
    cihAddress: newValue?.label,
    centerId: newValue?.centerId,
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

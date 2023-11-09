<template>
  <span v-if="profileLoading || profileError !== null"
    ><ProfilePageSkeleton
  /></span>
  <div v-else class="space-y-5 profile-page">
    <div
      class="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]"
    >
      <div
        class="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"
      ></div>
      <div class="profile-box flex-none md:text-start text-center">
        <div class="md:flex items-end md:space-x-6 rtl:space-x-reverse">
          <ProfileAvatar />
          <div class="flex-1">
            <div
              class="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]"
            >
              {{ profileData?.fullName }}
            </div>
            <div class="text-sm font-light text-slate-600 dark:text-slate-400">
              {{ profileData?.userRole }}
            </div>
          </div>
        </div>
      </div>
      <!-- end profile box -->

      <!-- profile info-500 -->
    </div>
    <div class="grid grid-cols-12 gap-6">
      <div class="lg:col-span-4 col-span-12">
        <Card title="Info " className="!h-auto">
          <ul class="list space-y-8">
            <li class="flex space-x-3 rtl:space-x-reverse">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <Icon icon="heroicons:envelope" />
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  EMAIL
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ profileData?.email }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <Icon icon="heroicons:phone-arrow-up-right" />
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  PHONE
                </div>
                <a
                  href="tel:0189749676767"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ profileData?.phoneNumber }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li
              v-if="profileData?.location"
              class="flex space-x-3 rtl:space-x-reverse"
            >
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <Icon icon="heroicons:map" />
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  LOCATION
                </div>
                <div class="text-base text-slate-600 dark:text-slate-50">
                  {{ profileData?.location }}
                </div>
              </div>
            </li>

            <li
              v-if="biodata?.dateOfBirth"
              class="flex space-x-3 rtl:space-x-reverse"
            >
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <Icon icon="heroicons:calendar" />
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  DATE OF BIRTH
                </div>
                <div class="text-base text-slate-600 dark:text-slate-50">
                  {{ moment(biodata?.dateOfBirth).format("ll") }}
                </div>
              </div>
            </li>

            <li
              v-if="biodata?.address"
              class="flex space-x-3 rtl:space-x-reverse"
            >
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <Icon icon="heroicons:map-pin" />
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  ADDRESS
                </div>
                <div class="text-base text-slate-600 dark:text-slate-50">
                  {{ biodata?.address }}
                </div>
              </div>
            </li>

            <li class="flex space-x-3 rtl:space-x-reverse">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <Icon icon="mingcute:department-line" />
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  DEPARTMENT
                </div>
                <div
                  class="flex flex-col text-base text-slate-600 dark:text-slate-50"
                >
                  <span
                    v-if="churchAffiliationsDataLoading && !department"
                    class="animate-pulse h-[16px] w-full bg-slate-600 dark:bg-slate-50"
                  ></span>
                  <span v-if="!churchAffiliationsDataLoading && department">{{
                    department
                  }}</span>
                  <span
                    v-if="!churchAffiliationsDataLoading && !department"
                    @click="toggleReqDepartment(true)"
                    class="cursor-pointer"
                  >
                    Click here to request to join department
                  </span>

                  <span
                    @click="toggleReqDepartment(true)"
                    class="cursor-pointer text-blue-400 hidden"
                  >
                    Request Department
                  </span>
                </div>
              </div>
            </li>

            <!-- end single list -->
          </ul>
        </Card>
      </div>
      <div class="lg:col-span-8 col-span-12">
        <Card title="User Profile"> <Tab /></Card>
      </div>
    </div>

    <RequestDepartment :affiliation="churchAffiliationsData" />
  </div>
</template>

<script setup>
import RequestDepartment from "@/components/Pages/Profile/ChurchAffiliation/RequestDepartment.vue";
import ProfilePageSkeleton from "@/components/Pages/Profile/ProfilePageSkeleton.vue";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import { provide, computed, onMounted, watch } from "vue";
import Tab from "./tabs/index.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import moment from "moment";
import ProfileAvatar from "@/components/Pages/Profile/ProfileAvatar.vue";
// import Modal from "@/components/Modal";

onMounted(() => {
  fetchUser();
  getChurchAffiliationsData();
});
const { state, dispatch } = useStore();
// const isReqDepartmentOpen = computed(() => state.profile.isReqDepartmentOpen);
const toggleReqDepartment = (boolean) => {
  dispatch("toggleReqDepartment", boolean);
};

const route = useRoute();
const userId = computed(() => route.params.userId);
const biodata = computed(() => state.profile.biodata);
console.log(state.auth.accessToken);
// console.log("Member:" + JSON.stringify(state.member.profile));
const profileData = computed(() => state.member.profile);
// const success = computed(() => state.member.profilesuccess);
const profileLoading = computed(() => state.member.profileloading);
const profileError = computed(() => state.member.profileerror);
const churchAffiliationsData = computed(
  () => state.profile.churchAffiliationsData
);
const isMarried = computed(() =>
  state.profile.biodata?.maritalStatus == "Married" ? true : false
);

// const isMarried = ref(false);

const isEmployed = computed(() =>
  state.profile.biodata?.employmentStatus == "Employed" ? true : false
);

const spouseTitle = computed(() =>
  state.profile.biodata?.gender == "Male" ? "Mrs" : "Mr"
);

const spouseGender = computed(() =>
  state.profile.biodata?.gender == "Male" ? "Female" : "Male"
);
const isAdmin = computed(
  () => state.auth.userData.userRole.toLowerCase() === "administrator"
);

const churchAffiliationsDataLoading = computed(
  () => state.profile.getChurchAffiliationsDataloading
);

const department = computed(
  () => state.profile.churchAffiliationsData?.department
);
const getChurchAffiliationsData = () => {
  dispatch("getChurchAffiliationsById", userId.value);
};

const fetchUser = () => {
  dispatch("getUserById", userId.value);
};

watch(userId, () => {
  fetchUser();
});

provide("isMarried", isMarried);
provide("isEmployed", isEmployed);
provide("profileData", profileData);
provide("id", userId);
provide("isAdmin", isAdmin);
provide("spouseTitle", spouseTitle);
provide("spouseGender", spouseGender);
</script>

<style lang="scss" scoped></style>

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
            <div
              class="text-sm font-light text-slate-600 dark:text-slate-400 capitalize flex gap-x-2 items-center"
            >
              {{ profileData?.userRole }}
              <span
                v-if="
                  state.auth.userData.userRole === 'administrator' &&
                  state.auth.userData.id !== userId
                "
                @click="() => $refs.modal.openModal()"
                class="p-1"
              >
                <Icon icon="heroicons:pencil-square"
              /></span>
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

    <RequestDepartment />
    <Modal
      title="Change Role"
      label="Small modal"
      labelClass="btn-primary-600"
      ref="modal"
      sizeClass="max-w-md"
      themeClass="bg-primary-500"
    >
      <div>
        <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
          Are you sure you want to this role?
        </div>
        <Select label="Role" :options="roles" v-model="role" />
      </div>
      <template v-slot:footer>
        <div class="flex gap-x-5">
          <Button
            :disabled="convertloading"
            text="Cancel"
            btnClass="btn-outline-secondary btn-sm"
            @click="modal.closeModal()"
          />
          <Button
            :disabled="convertloading"
            text="Change"
            btnClass="btn-primary btn-sm"
            @click="changeRole"
          />
        </div>
      </template>
    </Modal>
    <RequestDepartment :affiliation="churchAffiliationsData" />
  </div>
</template>

<script setup>
import Button from "@/components/Button";
import Select from "@/components/Select";
import RequestDepartment from "@/components/Pages/Profile/ChurchAffiliation/RequestDepartment.vue";
import ProfilePageSkeleton from "@/components/Pages/Profile/ProfilePageSkeleton.vue";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import { provide, computed, onMounted, watch, ref } from "vue";
import Tab from "./tabs/index.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import moment from "moment";
import Modal from "@/components/Modal/Modal";
import { useToast } from "vue-toastification";
import ProfileAvatar from "@/components/Pages/Profile/ProfileAvatar.vue";
// import Modal from "@/components/Modal";

const { state, dispatch } = useStore();
onMounted(() => {
  fetchUser();
  getChurchAffiliationsData();
  dispatch("getRoles");
});

// const isReqDepartmentOpen = computed(() => state.profile.isReqDepartmentOpen);
const toggleReqDepartment = (boolean) => {
  dispatch("toggleReqDepartment", boolean);
};
const toast = useToast();
const modal = ref(null);
const route = useRoute();
const userId = computed(() => route.params.userId);
const biodata = computed(() => state.profile.biodata);
console.log(state.auth.accessToken);
// console.log("Member:" + JSON.stringify(state.member.profile));
const profileData = computed(() => state.member.profile);
// const success = computed(() => state.member.profilesuccess);
const profileLoading = computed(() => state.member.profileloading);
const profileError = computed(() => state.member.profileerror);
const convertsuccess = computed(() => state.member.convertsuccess);
const convertloading = computed(() => state.member.convertloading);
const roles = computed(() =>
  state.member.roles
    .filter((i) => i.toLowerCase() !== "firsttimers")
    .map((i) => {
      return { value: i.toLowerCase(), label: i };
    })
);
const role = ref("");
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
watch(profileData, () => {
  role.value = profileData?.value?.userRole;
});
watch(convertsuccess, () => {
  if (convertsuccess.value) {
    fetchUser();
    toast.success("Role updated");
  }
});
function changeRole() {
  dispatch("updateRole", {
    userId: profileData.value.id,
    userRole: role.value,
  });
}
provide("isMarried", isMarried);
provide("isEmployed", isEmployed);
provide("profileData", profileData);
provide("id", userId);
provide("isAdmin", isAdmin);
provide("spouseTitle", spouseTitle);
provide("spouseGender", spouseGender);
</script>

<style lang="scss" scoped></style>

<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div>
    <div
      v-if="rolesLoading"
      class="animate-pulse h-40 w-full bg-gray-200 rounded-lg"
    ></div>
    <div v-else class="flex flex-col w-full gap-8">
      <div
        className="flex items-center  gap-[6px] overflow-x-auto border-b-[1px] border-b-[#DDDDDD] "
      >
        <div v-for="nav in navs" class="max-w-max" :key="nav">
          <div
            v-if="nav.isVisible"
            @click="currentNav = nav"
            :class="`${
              currentNav?.name?.toLowerCase() == nav?.name?.toLowerCase()
                ? '!border-slate-900 !text-slate-900'
                : 'border-transparent text-[#727272] '
            },
          'flex cursor-pointer flex-col items-center justify-center text-nowrap border-b-[2px] pb-4 pt-6 font-semibold'`"
          >
            <span className="text-sm">{{ nav?.name }} </span>
          </div>
        </div>
      </div>

      <!-- <div class="">{{ navs }}</div> -->
      <HODRequests
        v-if="currentNav.activeName.toLowerCase() == 'departments'"
      />
      <InspectorateRequests
        v-if="currentNav.activeName.toLowerCase() == 'events'"
      />
      <VenueManagerRequests
        v-if="currentNav.activeName.toLowerCase() == 'venues'"
      />
      <MyRequests v-if="currentNav.activeName.toLowerCase() == 'my requests'" />
    </div>
  </div>
</template>
<script setup>
// import { useToast } from "vue-toastification";

import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

import {
  HODRequests,
  InspectorateRequests,
  VenueManagerRequests,
  MyRequests,
} from "./requestTables";

// const toast = useToast();

onMounted(() => {
  getAuthUsersRoles();
});
const { state, dispatch } = useStore();
const userId = computed(() => state.auth.userData.id);
const rolesLoading = computed(() => state.role.getAuthUserRolesLoading);
const getAuthUsersRoles = () => {
  dispatch("getAuthUserRoles", userId.value);
};
const authUserRoles = computed(() =>
  state?.role?.authUserRoles
    ?.map((i) => {
      return i;
    })
    .join(", ")
);

const isVenueManager = computed(() =>
  authUserRoles?.value?.toLowerCase()?.includes("venue manager")
);
const isHOD = computed(() =>
  authUserRoles?.value?.toLowerCase()?.includes("hod")
);

const isInspectorate = computed(() =>
  authUserRoles?.value?.toLowerCase()?.includes("inspectorate")
);
const navs = computed(() => [
  {
    name: "My Requests",
    isVisible: true,
    activeName: "my requests",
  },
  {
    name: "Departments",
    isVisible: isHOD.value,
    activeName: "departments",
  },
  {
    name: "Events",
    isVisible: isInspectorate.value,
    activeName: "events",
  },
  {
    name: "Venues",
    isVisible: isVenueManager.value,
    activeName: "venues",
  },
]);

const currentNav = ref(navs.value[0]);

// watch(rolesLoading, () => {
//   handleMenu();
// });
</script>
<style lang="scss"></style>

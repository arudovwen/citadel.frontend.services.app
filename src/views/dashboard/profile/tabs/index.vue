<template>
  <div class="flex flex-col">
    <div class="flex overflow-x-auto">
      <div v-for="(item, i) in allButtons" :key="item.id">
        <div v-if="item.title == 'Spouse Details'">
          <div v-if="showMarriedTab">
            <button
              @click="selectTab(item.title)"
              :class="[
                selectedTab == item.title
                  ? 'text-primary-600 before:w-full'
                  : 'text-slate-500 before:w-0 dark:text-slate-300',
              ]"
              class="whitespace-nowrap text-sm font-medium mb-7 capitalize bg-white dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2"
            >
              {{ item.title }}
            </button>
          </div>
        </div>
        <div v-else-if="item.title == 'Children Details'">
          <div v-if="showMarriedTab">
            <button
              @click="selectTab(item.title)"
              :class="[
                selectedTab == item.title
                  ? 'text-primary-600 before:w-full'
                  : 'text-slate-500 before:w-0 dark:text-slate-300',
              ]"
              class="whitespace-nowrap text-sm font-medium mb-7 capitalize bg-white dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2"
            >
              {{ item.title }}
            </button>
          </div>
        </div>

        <div v-else-if="item.title == 'Employer'">
          <div v-if="isEmployed">
            <button
              @click="selectTab(item.title)"
              :class="[
                selectedTab == item.title
                  ? 'text-primary-600 before:w-full'
                  : 'text-slate-500 before:w-0 dark:text-slate-300',
              ]"
              class="whitespace-nowrap text-sm font-medium mb-7 capitalize bg-white dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2"
            >
              {{ item.title }}
            </button>
          </div>
        </div>

        <div v-else>
          <button
            @click="selectTab(item.title)"
            :class="[
              selectedTab == item.title
                ? 'text-primary-600 before:w-full'
                : 'text-slate-500 before:w-0 dark:text-slate-300',
              i == 0 ? 'pl-0' : '',
            ]"
            class="whitespace-nowrap text-sm font-medium mb-7 capitalize bg-white dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2"
          >
            {{ item.title }}
          </button>
        </div>
      </div>
    </div>

    <PersonalInfo v-if="selectedTab == 'Personal Information'" />
    <Qualifications v-if="selectedTab == 'Qualifications'" />
    <Employer v-if="selectedTab == 'Employer'" />
    <SpouseDetails v-if="selectedTab == 'Spouse Details'" />
    <ChildrenDetails v-if="selectedTab == 'Children Details'" />
    <ChurchAffiliations v-if="selectedTab == 'Church Affiliations'" />
    <UserDepartment v-if="selectedTab == 'Departments'" />
  </div>
</template>

<script setup>
import PersonalInfo from "./PersonalInformation.vue";
import Qualifications from "./Qualifications.vue";
import Employer from "./EmployerDetails.vue";
import SpouseDetails from "./SpouseDetails.vue";
import ChildrenDetails from "./ChildrenDetails.vue";
import ChurchAffiliations from "./ChurchAffiliations.vue";
import UserDepartment from "./UserDepartment.vue";
// import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { inject, ref } from "vue";

// const isMarried = inject("isMarried");
// const isEmployed = inject("isEmployed");
// const buttonType = ref("defaultButtons");

const showMarriedTab = inject("showMarriedTab");
const selectedTab = ref("Personal Information");
const isEmployed = inject("isEmployed");

const allButtons = ref([
  {
    id: 1,
    title: "Personal Information",
    isShowing: true,
  },
  {
    id: 2,
    title: "Qualifications",
    isShowing: true,
  },
  {
    id: 3,
    title: "Employer",
    isShowing: true,
  },
  {
    id: 4,
    title: "Spouse Details",
    isShowing: true,
  },
  {
    id: 5,
    title: "Children Details",
    isShowing: true,
  },
  {
    id: 6,
    title: "Church Affiliations",
    isShowing: true,
  },
  {
    id: 7,
    title: "Departments",
    isShowing: true,
  },
]);

const selectTab = (tab) => {
  selectedTab.value = tab;
};
</script>

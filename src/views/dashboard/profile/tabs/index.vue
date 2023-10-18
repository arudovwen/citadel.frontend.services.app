<template>
  <TabGroup>
    <TabList
      class="lg:space-x-2 md:space-x-2 space-x-0 rtl:space-x-reverse flex justify-start overflow-x-auto no-scrollbar"
    >
      <Tab
        v-slot="{ selected }"
        as="template"
        v-for="(item, i) in buttons"
        :key="i"
      >
        <button
          v-if="item.isShowing"
          :class="[
            selected
              ? 'text-primary-600 before:w-full'
              : 'text-slate-500 before:w-0 dark:text-slate-300',
          ]"
          class="whitespace-nowrap text-sm font-medium mb-7 capitalize bg-white dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2"
        >
          {{ item.title }}
        </button>
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <PersonalInfo />
      </TabPanel>
      <TabPanel>
        <Qualifications />
      </TabPanel>
      <TabPanel>
        <Employer />
      </TabPanel>
      <TabPanel>
        <SpouseDetails />
      </TabPanel>
      <TabPanel>
        <ChildrenDetails />
      </TabPanel>
      <TabPanel>
        <ChurchAffiliations />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup>
import PersonalInfo from "./PersonalInformation.vue";
import Qualifications from "./Qualifications.vue";
import Employer from "./EmployerDetails.vue";
import SpouseDetails from "./SpouseDetails.vue";
import ChildrenDetails from "./ChildrenDetails.vue";
import ChurchAffiliations from "./ChurchAffiliations.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { inject } from "vue";

const isMarried = inject("isMarried");
const buttons = [
  {
    title: "Personal Information",
    isShowing: true,
  },
  {
    title: "Qualifications",
    isShowing: true,
  },
  {
    title: "Employer",
    isShowing: true,
  },
  {
    title: "Spouse Details",
    isShowing: isMarried,
  },
  {
    title: "Children Details",
    isShowing: isMarried,
  },
  {
    title: "Church Affiliations",
    isShowing: true,
  },
];
</script>

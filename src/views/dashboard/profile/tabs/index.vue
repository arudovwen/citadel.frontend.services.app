<template>
  <TabGroup>
    <TabList
      class="lg:space-x-2 md:space-x-2 space-x-0 rtl:space-x-reverse flex justify-start overflow-x-auto no-scrollbar"
    >
      <div v-for="(item, i) in buttons" :key="i">
        <Tab v-if="item.isShowing === true" v-slot="{ selected }" as="template">
          <button
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
      </div>
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
      <TabPanel v-if="isMarried === true">
        <SpouseDetails />
      </TabPanel>
      <TabPanel>
        <ChildrenDetails />
      </TabPanel>
      <TabPanel v-if="buttons[5].isShowing === true">
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
import { inject, ref, watch } from "vue";

const isMarried = inject("isMarried");
const isAdmin = inject("isAdmin");
const buttons = ref([
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
    isShowing: false,
  },
  {
    title: "Children Details",
    isShowing: true,
  },
  {
    title: "Church Affiliations",
    isShowing: isAdmin.value,
  },
]);

watch(isMarried, (newValue) => {
  if (newValue === true) {
    buttons.value[3].isShowing = true;
  } else {
    buttons.value[3].isShowing = false;
  }
});
</script>

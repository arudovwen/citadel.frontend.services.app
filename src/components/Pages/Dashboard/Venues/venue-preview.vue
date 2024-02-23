<template>
  <div>
    <!-- <div class="lg:flex justify-between flex-wrap items-center">
      <Breadcrumb />
    </div> -->
    <Card bodyClass="p-0">
      <div
        class="text-slate-900 dark:text-slate-300 font-medium leading-5 text-lg flex flex-col space-y-4 px-6 pt-6 bg-slate-50 dark:bg-slate-800 pb-6 rounded-t-md"
      >
        <p>
          Name:
          <span class="ml-2 text-slate-500 text-base">{{
            venue.venueName
          }}</span>
        </p>
        <!-- <p>
          Description:
          <span class="ml-2 text-slate-500 text-base">{{
            venue.description
          }}</span>
        </p> -->
        <p>
          Capacity:
          <span class="ml-2 text-slate-500 text-base">{{
            venue.capacity
          }}</span>
        </p>
        <p>
          Location:
          <span class="ml-2 text-slate-500 text-base">{{
            venue.location
          }}</span>
        </p>

        <p>
          Status:
          <span class="ml-2 text-slate-500 text-base">{{
            venue.isOnline ? "Available" : "Booked"
          }}</span>
        </p>

        <!-- <p class="flex">
          Accessories:
          <span class="flex flex-col ml-2">
            <ul>
              <li>1. Speakers</li>
              <li>2. Microphones</li>
            </ul>
          </span>
        </p> -->
      </div>

      <div
        class="max-w-[980px] mx-auto shadow-base dark:shadow-none rounded-md overflow-x-auto"
      >
        <TotalTable :accessories="venue?.accessories" />
      </div>
    </Card>
  </div>
</template>
<script setup>
import Card from "@/components/Card";
// import Breadcrumb from "@/components/Breadcrumbs";
// import Icon from "@/components/Icon";
import TotalTable from "./module/TotalTable.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const { state } = useStore();
const venue = computed(() => {
  return state.venue.venue;
});
// const print = () => {
//   window.print();
// };
</script>
<style lang="scss">
.vgt-wrap__actions-footer {
  border: none !important;
}
.invocie-btn {
  @apply hover:bg-slate-900 hover:text-slate-100 dark:hover:bg-slate-600 mr-3 mb-4;
}
@media print {
  .invocie-btn {
    display: none;
  }
  .sidebar-wrapper,
  .app-header,
  .site-footer,
  .shadow-deep {
    @apply hidden;
  }
  .content-wrapper {
    @apply w-full ml-0;
  }
}
</style>

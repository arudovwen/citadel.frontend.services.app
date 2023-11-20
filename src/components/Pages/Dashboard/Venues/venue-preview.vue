<template>
  <div>
    <div class="lg:flex justify-between flex-wrap items-center">
      <Breadcrumb />
      <div class="flex lg:justify-end items-center flex-wrap">
        <button
          class="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900"
        >
          <span class="text-lg"><Icon icon="heroicons:pencil-square" /></span>
          <span>Edit</span>
        </button>
        <button
          type="button"
          @click="print"
          class="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900"
        >
          <span class="text-lg"><Icon icon="heroicons:printer" /></span>
          <span>Print</span>
        </button>
        <button
          class="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900"
        >
          <span class="text-lg"><Icon icon="heroicons:arrow-down-tray" /></span>
          <span>Download</span>
        </button>
        <button
          class="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900"
        >
          <span class="text-lg transform -rotate-45"
            ><Icon icon="heroicons:paper-airplane"
          /></span>
          <span>Send invoice</span>
        </button>
      </div>
    </div>
    <Card bodyClass="p-0">
      <!-- <div
        class="flex items-start justify-between flex-wrap space-y-4 px-6 pt-6 bg-slate-50 dark:bg-slate-800 pb-6 rounded-t-md"
      >
        <div></div>
        <div class="-ml-2">
          <span
            class="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl"
          >
            Capacity:</span
          >

          <div
            class="text-slate-500 dark:text-slate-300 font-normal leading-5 mt-4 text-sm"
          >
            6,000
          </div>
        </div>
        <div>
          <span
            class="block !mt-0 text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl"
          >
            Location:</span
          >

          <div
            class="text-slate-500 dark:text-slate-300 font-normal leading-5 mt-4 text-sm"
          >
            Annette black-500 <br />
            4140 Parker Rd. Allentown, New <br />Mexico 31134
          </div>
        </div>

        <div>
          <span
            class="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl"
          >
            Description:</span
          >

          <div
            class="text-slate-500 dark:text-slate-300 font-normal leading-5 mt-4 text-sm"
          >
            6,000 sitter with air conditioning and large windows
          </div>
        </div>
      </div> -->

      <div
        class="text-slate-900 dark:text-slate-300 font-medium leading-5 text-lg flex flex-col space-y-4 px-6 pt-6 bg-slate-50 dark:bg-slate-800 pb-6 rounded-t-md"
      >
        <p>Name: <span class="text-slate-500 text-base">Solfry arena</span></p>
        <p>
          Description: <span class="text-slate-500 text-base">Cool venue</span>
        </p>
        <p>Capacity: <span class="text-slate-500 text-base">5,000</span></p>
        <p>
          Location: <span class="text-slate-500 text-base">27 almo street</span>
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
        <TotalTable />
      </div>
    </Card>
  </div>
</template>
<script>
import Card from "@/components/Card";
import Breadcrumb from "@/components/Breadcrumbs";
import Icon from "@/components/Icon";
import TotalTable from "./module/TotalTable.vue";
export default {
  components: {
    Card,
    Icon,
    TotalTable,
    Breadcrumb,
  },
  methods: {
    print() {
      window.print();
    },
  },
};
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

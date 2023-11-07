<template>
  <div>
    <div
      class="lg:flex justify-between flex-wrap items-center mb-8"
      v-if="detail"
    >
      <h1 class="text-slate-900 font-semibold text-lg capitalize">
        {{ detail?.firstName }} {{ detail?.middleName }} {{ detail?.surName }}
      </h1>
      <div class="flex lg:justify-end items-center flex-wrap">
        <button
          type="button"
          @click="print"
          class="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900"
        >
          <span class="text-lg"><Icon icon="heroicons:printer" /></span>
          <span>Print</span>
        </button>
        <!-- <button
          class="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900"
        >
          <span class="text-lg"><Icon icon="heroicons:arrow-down-tray" /></span>
          <span>Download</span>
        </button> -->
      </div>
    </div>
    <Card bodyClass="p-6">
      <div class="max-w-[980px] mx-auto my-6 rounded-md overflow-x-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h6 class="text-xs font-semibold text-slate-400">First name</h6>
            <p class="text-base font-semibold text-slate-900">
              {{ detail?.firstName || "-" }}
            </p>
          </div>

          <div>
            <h6 class="text-xs font-semibold text-slate-400">Middle name</h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.middleName || "-" }}
            </p>
          </div>
          <div>
            <h6 class="text-xs font-semibold text-slate-400">Surname</h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.surName || "-" }}
            </p>
          </div>

          <div>
            <h6 class="text-xs font-semibold text-slate-400">Date of birth</h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ moment(detail?.dateOfBirth).format("lll") }}
            </p>
          </div>
          <div class="col-span-1 md:col-span-2">
            <h6 class="text-xs font-semibold text-slate-400">Email</h6>
            <p class="text-base font-semibold text-slate-900">
              {{ detail?.email || "-" }}
            </p>
          </div>

          <div>
            <h6 class="text-xs font-semibold text-slate-400">Gender</h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.gender || "-" }}
            </p>
          </div>
          <div>
            <h6 class="text-xs font-semibold text-slate-400">Phone number</h6>
            <p class="text-base font-semibold text-slate-900">
              {{ detail?.mobile1 || "-" }}
            </p>
          </div>
          <div class="col-span-1 md:col-span-2">
            <h6 class="text-xs font-semibold text-slate-400">
              Residential Address
            </h6>
            <p class="text-base font-semibold text-slate-900">
              {{ detail?.address || "-" }}
            </p>
          </div>
          <div>
            <h6 class="text-xs font-semibold text-slate-400">
              Nearest bus-stop
            </h6>
            <p class="text-base font-semibold text-slate-900">
              {{ detail?.nearestBusStop || "-" }}
            </p>
          </div>
          <div>
            <h6 class="text-xs font-semibold text-slate-400">
              Purpose of visit
            </h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.purposeOfVisit || "-" }}
            </p>
          </div>
          <div>
            <h6 class="text-xs font-semibold text-slate-400">Place of visit</h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.placeOfVisit || "-" }}
            </p>
          </div>
          <div>
            <h6 class="text-xs font-semibold text-slate-400">Date of visit</h6>
            <p class="text-base font-semibold text-slate-900">
              {{ moment(detail?.dateOfVisit).format("lll") }}
            </p>
          </div>
          <div>
            <h6 class="text-xs font-semibold text-slate-400">Country</h6>
            <p class="text-base font-semibold text-slate-90 capitalize">
              {{ detail?.country || "-" }}
            </p>
          </div>
          <div>
            <h6 class="text-xs font-semibold text-slate-400">State</h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.state || "-" }}
            </p>
          </div>

          <div>
            <h6 class="text-xs font-semibold text-slate-400">City</h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.city || "-" }}
            </p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import moment from "moment";
import Card from "@/components/Card";
import Icon from "@/components/Icon";

defineProps(["detail"]);
function print() {
  window.print();
}
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

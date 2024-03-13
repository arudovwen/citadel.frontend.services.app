<template>
  <div>
    <!-- <Card bodyClass="p-6"> -->
    <div class="max-w-[980px] mx-auto my-6 rounded-md overflow-x-auto">
      <div class="grid grid-cols-1 gap-6 mb-10">
        <div>
          <h6 class="text-xs font-semibold text-slate-400">
            Notification type
          </h6>
          <p class="text-base font-semibold text-slate-900">
            {{ detail?.requesterName }}
          </p>
        </div>
        <div>
          <h6 class="text-xs font-semibold text-slate-400">Title</h6>
          <p class="text-base font-semibold text-slate-900">
            {{ detail?.zone }}
          </p>
        </div>
        <div>
          <h6 class="text-xs font-semibold text-slate-400">Message</h6>
          <p class="text-base font-semibold text-slate-900">
            {{ detail?.center }}
          </p>
        </div>

        <div>
          <h6 class="text-xs font-semibold text-slate-400">Scheduled</h6>
          <p class="text-base font-semibold text-slate-900">
            {{ eventsOptions.find((i) => i.value == detail?.eventType)?.label }}
          </p>
        </div>
        <div>
          <h6 class="text-xs font-semibold text-slate-400">
            Schedule date and time
          </h6>
          <p class="text-base font-semibold text-slate-900">
            {{ moment(detail?.eventDate).format("ll") }}
          </p>
        </div>

        <div class="">
          <h6 class="text-xs font-semibold text-slate-400">Status</h6>
          <p class="text-base font-semibold text-slate-900">
            {{
              detail?.status === null
                ? "Pending"
                : detail?.status === false
                ? "Declined"
                : "Approved"
            }}
          </p>
        </div>
        <div>
          <h6 class="text-xs font-semibold text-slate-400">Attachment</h6>
          <p class="text-base font-semibold text-slate-900">
            {{ moment(detail?.eventDate).format("ll") }}
          </p>
        </div>
      </div>
    </div>
    <!-- </Card> -->
  </div>
</template>
<script setup>
import { defineProps } from "vue";
// import Card from "@/components/Card";
import { eventsOptions } from "@/constant/data";
import moment from "moment";

defineProps(["detail"]);
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

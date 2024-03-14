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
            {{ getTextForKey(detail?.notifyType) }}
          </p>
        </div>
        <div>
          <h6 class="text-xs font-semibold text-slate-400">Title</h6>
          <p class="text-base font-semibold text-slate-900">
            {{ detail?.title }}
          </p>
        </div>
        <div>
          <h6 class="text-xs font-semibold text-slate-400">Message</h6>
          <p
            class="text-base font-semibold text-slate-900"
            v-html="detail?.message"
          ></p>
        </div>

        <div>
          <h6 class="text-xs font-semibold text-slate-400">Status</h6>
          <p
            :class="`${
              detail.status === 'sent' || !detail.status
                ? 'text-green-600'
                : 'text-blue-600'
            }`"
            class="text-base font-semibold capitalize"
          >
            {{ detail.status }}
          </p>
        </div>
        <div v-if="detail.status === 'pending'">
          <h6 class="text-xs font-semibold text-slate-400">
            Schedule date and time
          </h6>
          <p class="text-base font-semibold text-slate-900">
            {{ moment(detail?.scheduledDate).format("llll") }}
          </p>
        </div>

        <div v-if="detail.attachments">
          <h6 class="text-xs font-semibold text-slate-400">Attachment</h6>
          <p class="text-base font-semibold text-slate-900"></p>
        </div>
      </div>
    </div>
    <!-- </Card> -->
  </div>
</template>
<script setup>
import { defineProps } from "vue";
// import Card from "@/components/Card";
import moment from "moment";

function getTextForKey(key) {
  const lowerCaseKey = key?.toLowerCase();
  switch (lowerCaseKey) {
    case "none":
      return "None";
    case "eventrejection":
      return "Event Rejection";
    case "eventapproval":
      return "Event Approval";
    case "welcomeemail":
      return "Welcome Email";
    case "departmentapproval":
      return "Department Approval";
    case "departmentrejection":
      return "Department Rejection";
    case "cihcenterzoneapproval":
      return "CIH Center Zone Approval";
    case "cihcenterzonerejection":
      return "CIH Center Zone Rejection";
    case "joindepartmentrequest":
      return "Join Department Request";
    case "cihrolechange":
      return "CIH Role Change";
    case "generalemail":
      return "General Email";
    default:
      return "General Email";
  }
}
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

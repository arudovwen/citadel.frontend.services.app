<template>
  <div>
    <div class="lg:flex justify-between flex-wrap items-center mb-6">
      <h1 class="text-slate-900 font-semibold text-lg">
        {{ props.data.outreachName }}
      </h1>
      <div class="flex lg:justify-end items-center flex-wrap gap-x-3">
        <button @click="handleModal('reportadd')"
          class="outreach-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900">
          <span class="text-lg">
            <Icon icon="iconamoon:sign-plus-thin" />
          </span>
          <span>Add</span>
        </button>
      </div>
    </div>
    <Card bodyClass="p-6">
      <div class="max-w-[980px] mx-auto my-6 rounded-md overflow-x-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h6 class="text-xs font-semibold text-slate-400">Location</h6>
            <p class="text-base font-semibold text-slate-900">
              {{ props.data.locationOfOutreach }}
            </p>
          </div>
          <div>
            <h6 class="text-xs font-semibold text-slate-400">Date</h6>
            <p class="text-base font-semibold text-slate-900">
              {{ new Date(props.data?.dateOfOutreach).toLocaleDateString() }}
            </p>
          </div>

          <div class="col-span-2">
            <h6 class="text-xs font-semibold text-slate-400">Description</h6>
            <p class="text-base font-semibold text-slate-900">
              {{ props.data.description }}
            </p>
          </div>

          <div>
            <h6 class="text-xs font-semibold text-slate-400">Status</h6>
            <p class="text-base font-semibold text-slate-900">
              {{
          props.data.status === true
            ? "approved"
            : props.data.status === false
              ? "rejected"
              : "pending"
        }}
            </p>
          </div>
          <div></div>
          <div v-if="props.data.status === false">
            <h6 class="text-xs font-semibold text-slate-400">Reason for rejection</h6>
            <p class="text-base font-semibold text-slate-900">
              {{ props.data.reason }}
            </p>
          </div>
        </div>
      </div>
    </Card>

    <div v-if="userRole === 'Inspectorate'" class="flex lg:justify-end items-center flex-wrap my-6 gap-x-3">
      <button v-if="props.data.status !== true" type="button" @click="handleModal('approve')"
        class="border outreach-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900">
        <span class="text-lg">
          <Icon icon="codicon:check-all" />
        </span>
        <span>Approve</span>
      </button>
      <button v-if="props.data.status !== false" @click="handleModal('reject')"
        class="border outreach-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900">
        <span class="text-lg">
          <Icon icon="iconamoon:sign-times-thin" />
        </span>
        <span>Decline</span>
      </button>
    </div>

    <ViewReport v-if="!state.profile.getOutreachByIdloading && (props.data.status && report)" :data="report"
      :handleModal="handleModal" :openDeleteModal="openDeleteModal" />
    <div v-if="!state.profile.getOutreachByIdloading && (props.data.status && !report)" class="lg:flex justify-between flex-wrap items-center mb-6">
      <button @click="handleModal('reportadd')"
        class="outreach-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900">
        <span class="text-lg">
          <Icon icon="ant-design:edit-outlined" />
        </span>
        <span>Add Report</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import ViewReport from "./report-preview.vue";
import { defineProps, watch, watchEffect, computed, inject, provide } from "vue";
import { useStore } from "vuex";
import store from "@/store";
import { onMounted } from "vue";
import Modal from "@/components/Modal/Modal";

const { dispatch, state } = useStore();

const deleteReportStatus = computed(() => ({
  loading: state?.profile?.deleteOutreachReportLoading,
  success: state?.profile?.deleteOutreachReportSuccess,
  error: state?.profile?.deleteOutreachReportreachError,
}))

const handleModal = inject("handleModal");
const openDeleteModal = inject("openDeleteModal");

provide("handleModal", () => handleModal)
provide("openDeleteModal", () => openDeleteModal)

const props = defineProps(["data"]);
const userRole = computed(() => {
  return state?.auth?.userData?.userRole;
});
const report = computed(() => state?.profile?.outreachReport);
const reportLoading = computed(() => state?.profile?.getOutreachByIdloading);

watchEffect(props, () => {
  console.log("p", props);
});

watch(deleteReportStatus, () => {
  if (deleteReportStatus.value.success) {
    console.log("completed;")
    dispatch("getOutreachById", { id: props.data.id });
  }
})

onMounted(() => {
  dispatch("getOutreachById", { id: props.data.id });
})


</script>

<style lang="scss">
.vgt-wrap__actions-footer {
  border: none !important;
}

.outreach-btn {
  @apply hover:bg-slate-900 hover:text-slate-100 dark:hover:bg-slate-600;
}

@media print {
  .outreach-btn {
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

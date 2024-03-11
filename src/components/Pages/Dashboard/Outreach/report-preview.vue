<template>
  <div v-if="loading" class="h-16 flex justify-center items-center">
    <Icon icon="mingcute:loading-line" class="spin text-lx"/>
  </div>
  <div v-else class="mt-2">
    <div class="p-6 pt-0">
      <div class="mb-8">
        <h2 class="text-slate-900 font-medium text-base mb-2">
          Activities Summary
        </h2>
        <p>
          {{ report?.outreachOutcome }}
        </p>
      </div>

      <div>
        <div class="">
          <h2 class="text-slate-900 font-medium text-base mb-3">
            Attendance summary
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h6 class="text-xs font-semibold text-slate-400">Total</h6>
              <p class="text-base font-semibold text-slate-900">
                {{ report?.detailOfConverts[0]?.male + report?.detailOfConverts[0]?.female }}
              </p>
            </div>
            <div>
              <h6 class="text-xs font-semibold text-slate-400">Males</h6>
              <p class="text-base font-semibold text-slate-900">
                {{ report?.detailOfConverts[0]?.male }}
              </p>
            </div>
            <div>
              <h6 class="text-xs font-semibold text-slate-400">Females</h6>
              <p class="text-base font-semibold text-slate-900">
                {{ report?.detailOfConverts[0]?.female }}
              </p>
            </div>
          </div>
          <h2 class="text-slate-900 font-medium text-base mb-2">
            Total Converts
          </h2>
          <div class="flex-1 border rounded">
            <div class="flex gap-x-6 border-b px-4 py-2 justify-between">
              <span class="min-w-[150px]">Adults</span>

              <div class="flex gap-x-5 items-center">
                <span class="flex gap-x-3 items-center"><span>{{ report?.detailOfConverts[0]?.adult }}</span></span>
                <!-- <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Males</span>-<span>{{
                      detail?.cihAttendances[0]?.adult
                    }}</span></span
                  >
                  <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Females</span>-<span>4</span></span
                  > -->
              </div>
            </div>
            <div class="flex gap-x-6 border-b px-4 py-2 justify-between">
              <span class="min-w-[150px]">Youths</span>

              <div class="flex gap-x-5 items-center">
                <span class="flex gap-x-3 items-center"><span>{{ report?.detailOfConverts[0]?.youth }}</span></span>
                <!-- <div class="border-l h-4"></div> -->
                <!-- <span class="flex gap-x-3 items-center"
                    ><span>Males</span>-<span>4</span></span
                  >
                  <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Females</span>-<span>4</span></span
                  > -->
              </div>
            </div>
            <div class="flex gap-x-6 border-b px-4 py-2 justify-between">
              <span class="min-w-[150px]">Teenagers</span>

              <div class="flex gap-x-5 items-center">
                <span class="flex gap-x-3 items-center"><span>{{ report?.detailOfConverts[0]?.teenager }}</span></span>
                <!-- <div class="border-l h-4"></div> -->
                <!-- <span class="flex gap-x-3 items-center"
                    ><span>Males</span>-<span>4</span></span
                  >
                  <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Females</span>-<span>4</span></span
                  > -->
              </div>
            </div>
            <div class="flex gap-x-6 border-b px-4 py-2 justify-between">
              <span class="min-w-[150px]">Children</span>

              <div class="flex gap-x-5 items-center">
                <span class="flex gap-x-3 items-center"><span>{{ report?.detailOfConverts[0]?.children }}</span></span>
                <!-- <div class="border-l h-4"></div> -->
                <!-- <span class="flex gap-x-3 items-center"
                    ><span>Males</span>-<span>4</span></span
                  >
                  <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Females</span>-<span>4</span></span
                  > -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal title="Confirm action" label="Small modal" ref="deleteModal" :themeClass="`bg-danger-500`"
      labelClass="btn-outline-dark" sizeClass="max-w-md">
      <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
        Are you sure you want to delete this report?
      </div>
      <template v-slot:footer>
        <div class="flex gap-x-5">
          <Button text="Cancel" @click="$refs.deleteModal.closeModal()" btnClass="btn-outline-secondary btn-sm " />
          <Button text="Delete" :isLoading="deleteReportStatus.loading" btnClass="btn-dark btn-sm bg-danger-500" @click="
    dispatch('deleteOutreachReport', { id: report?.detailOfConverts[0]?.outreachReportId || report?.detailOfConverts[0]?.id })
    " />
        </div>
      </template>
    </Modal>
    <div class="flex flex-row mx-6">
      <span>
        <button @click="handleModal('reportedit')"
          class="outreach-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900">
          <span class="text-lg">
            <Icon icon="ant-design:edit-outlined" />
          </span>
          <span>Edit Report</span>
        </button>
        <button @click="openDeleteModal()"
          class="outreach-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900">
          <span class="text-lg">
            <Icon icon="ant-design:edit-outlined" />
          </span>
          <span>Delete Report</span>
        </button>
      </span>
    </div>
  </div>
</template>
<script setup>
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button";
import { useStore } from "vuex";

const { state, dispatch } = useStore();
import { inject, defineProps, ref, computed, onMounted } from "vue";
import { watch } from "vue";
const print = () => window.print()
const deleteModal = ref(false);
const report = computed(() => state?.profile?.outreachReport);
const loading = computed(() => state?.profile?.getOutreachByIdloading);
const error = computed(() => state?.profile?.getOutreachByIderror);

const props = defineProps(["data", "handleModal", "id"])
const openDeleteModal = () => {
  console.log("heyyyyyyyyyyyyyyYY")
  deleteModal.value.openModal();
}

onMounted(() => {
  console.log("id = ", props)
  dispatch("getOutreachById", { id: props.id });
});

watch(error, () => {
  if(error.value && !loading.value) {
    props.handleModal("reportadd")
  }
})

const outreachreport = computed(() => state?.profile?.outreachReport);

const deleteReportStatus = computed(() => ({
  loading: state?.profile?.deleteOutreachReportLoading,
  success: state?.profile?.deleteOutreachReportSuccess,
  error: state?.profile?.deleteOutreachReportreachError,
}))

watch(deleteReportStatus, () => {
  if (deleteReportStatus.value.success) {
    deleteModal.value.closeModal();
  }
})

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

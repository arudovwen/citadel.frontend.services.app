<template>
  <div v-if="detail">
    <div class="lg:flex justify-between flex-wrap items-center">
      <h1 class="text-slate-900 font-semibold text-lg uppercase">
        {{ detail?.centerName }} CENTER
      </h1>
      <!-- <div class="flex lg:justify-end items-center flex-wrap">
        {{ detail?.centerName }}
      </div> -->
    </div>
    <Card bodyClass="p-6">
      <div class="max-w-[980px] mx-auto my-6 rounded-md overflow-x-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <h6 class="text-xs font-semibold text-slate-400">Activity name</h6>
            <p class="text-base font-semibold text-slate-900">
              {{ detail?.activityName }}
            </p>
          </div>
          <div>
            <h6 class="text-xs font-semibold text-slate-400">Activity venue</h6>
            <p class="text-base font-semibold text-slate-900">
              {{ detail?.activityVenue }}
            </p>
          </div>
          <div>
            <h6 class="text-xs font-semibold text-slate-400">Activity type</h6>
            <p class="text-base font-semibold text-slate-900">
              {{ detail?.activityType }}
            </p>
          </div>
          <div>
            <h6 class="text-xs font-semibold text-slate-400">Activity date</h6>
            <p class="text-base font-semibold text-slate-900">
              {{ moment(detail?.activityDate).format("lll") }}
            </p>
          </div>
          <div>
            <h6 class="text-xs font-semibold text-slate-400">State of flock</h6>
            <p class="text-base font-semibold text-slate-900">
              {{ detail?.stateOfTheFlock }}
            </p>
          </div>

          <div class="col-span-1 md:col-span-2">
            <h6 class="text-xs font-semibold text-slate-400">Summary</h6>
            <p
              class="text-base font-semibold text-slate-900"
              v-html="detail?.summaryOfEvent"
            ></p>
          </div>
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
                  {{ detail?.totalAttendee }}
                </p>
              </div>
              <div>
                <h6 class="text-xs font-semibold text-slate-400">Males</h6>
                <p class="text-base font-semibold text-slate-900">
                  {{ detail?.cihAttendances[0]?.male }}
                </p>
              </div>
              <div>
                <h6 class="text-xs font-semibold text-slate-400">Females</h6>
                <p class="text-base font-semibold text-slate-900">
                  {{ detail?.cihAttendances[0]?.female }}
                </p>
              </div>
            </div>
            <div class="flex-1 border rounded">
              <div class="flex gap-x-6 border-b px-4 py-2 justify-between">
                <span class="min-w-[150px]">Adults</span>

                <div class="flex gap-x-5 items-center">
                  <span class="flex gap-x-3 items-center"
                    ><span>{{ detail?.cihAttendances[0]?.adult }}</span></span
                  >
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
                  <span class="flex gap-x-3 items-center"
                    ><span>{{ detail?.cihAttendances[0]?.youth }}</span></span
                  >
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
                  <span class="flex gap-x-3 items-center"
                    ><span>{{
                      detail?.cihAttendances[0]?.teenager
                    }}</span></span
                  >
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
                  <span class="flex gap-x-3 items-center"
                    ><span>{{
                      detail?.cihAttendances[0]?.children
                    }}</span></span
                  >
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
    </Card>
  </div>
</template>
<script setup>
import Card from "@/components/Card";
import { useStore } from "vuex";
import { computed, defineProps, onMounted } from "vue";
import moment from "moment";

const props = defineProps(["id"]);

const { state, dispatch } = useStore();
const detail = computed(() => state.report.detail);
onMounted(() => {
  dispatch("getActivityReport", { id: props.id });
});
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

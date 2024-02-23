<template>
  <div>
    <Card noborder className="border-none shadow-none" bodyClass="">
      <div class="mx-auto my-6 rounded-md overflow-x-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="col-span-1 md:col-span-2">
            <h6 class="text-xs font-semibold text-slate-400">Venue Name</h6>
            <p class="text-base font-semibold text-slate-900">
              {{ detail?.venueName || "-" }}
            </p>
          </div>

          <div class="col-span-1 md:col-span-2">
            <h6 class="text-xs font-semibold text-slate-400">Date Of Usage</h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ moment(detail?.usageDate).format("ll") }}
            </p>
          </div>

          <div>
            <h6 class="text-xs font-semibold text-slate-400">
              Purpose Of Usage
            </h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.purposeOfUsage || "-" }}
            </p>
          </div>
          <div>
            <h6 class="text-xs font-semibold text-slate-400">Status</h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.status || "Pending" }}
            </p>
          </div>
          <div v-if="detail?.oldCIHCenter" class="">
            <h6 class="text-xs font-semibold text-slate-400">Old CIH Center</h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.oldCIHCenter }}
            </p>
          </div>
          <div v-if="detail?.newCIHCenter" class="">
            <h6 class="text-xs font-semibold text-slate-400">New CIH Center</h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.newCIHCenter }}
            </p>
          </div>
          <div v-if="detail?.oldCIHRole" class="">
            <h6 class="text-xs font-semibold text-slate-400">Old CIH Role</h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.oldCIHRole }}
            </p>
          </div>
          <div v-if="detail?.newCIHRole" class="">
            <h6 class="text-xs font-semibold text-slate-400">New CIH Role</h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.newCIHRole }}
            </p>
          </div>
          <div v-if="detail?.currentRole" class="">
            <h6 class="text-xs font-semibold text-slate-400">Old Role</h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.currentRole }}
            </p>
          </div>
          <div v-if="detail?.newRole" class="">
            <h6 class="text-xs font-semibold text-slate-400">New Role</h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.newRole }}
            </p>
          </div>

          <div v-if="detail?.currentDepartment" class="">
            <h6 class="text-xs font-semibold text-slate-400">
              Current Department
            </h6>
            <p class="text-base font-semibold text-slate-900 capitalize">
              {{ detail?.currentDepartment }}
            </p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
<script setup>
import { defineProps, onMounted } from "vue";
// import { useStore } from "vuex";
import moment from "moment";
import Card from "@/components/Card";

const props = defineProps(["detail"]);
// const { dispatch } = useStore();
// const user = computed(() => state.profile.biodata);
console.log("🚀 ~ file: preview.vue:65 ~ user:", props.detail.userId);
onMounted(() => {
  //   dispatch("getBiodataByUserId", props.detail.userId);
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

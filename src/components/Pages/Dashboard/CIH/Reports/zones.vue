<template>
  <div class="">
    <div v-if="getZonesTotalLoading && zones?.length == 0" class="">
      <EmptyGrid />
    </div>
    <div v-else>
      <div v-if="zones.length">
        <div class="grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 mb-2">
          <Card bodyClass="" v-for="(item, i) in zones" :key="i">
            <div
              class="p-6 cursor-pointer"
              @click="
                () =>
                  router.push(
                    `/cih/reports/centers/${item.id}?name=${item.zoneName}`
                  )
              "
            >
              <!-- header -->
              <header class="flex justify-between items-end">
                <div class="flex space-x-4 items-center">
                  <div class="flex-none">
                    <div
                      class="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal uppercase"
                    >
                      {{ item.zoneName.charAt(0) + item.zoneName.charAt(1) }}
                    </div>
                  </div>
                  <div class="font-medium text-lg leading-6">
                    <div class="dark:text-slate-200 text-slate-900">
                      {{ item.zoneName }}
                    </div>
                  </div>
                </div>
              </header>

              <div class="flex justify-start mt-6">
                <div class="text-left">
                  <span
                    class="inline-flex items-center space-x-1 bg-gray-500 bg-opacity-[0.16] text-gray-500 text-xs font-normal px-2 py-1 rounded-full"
                  >
                    <span> <Icon icon="heroicons-outline:user-group" /></span>
                    <span>{{ item.totalCenters }} centers</span>
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div class="py-4">
          <Pagination
            :total="total"
            :current="query.pageNumber"
            :per-page="query.pageSize"
            :pageRange="5"
            :perPageChanged="perPage"
            @page-changed="query.pageNumber = $event"
            enableSearch
            enableSelect
            :options="options"
          >
            >
          </Pagination>
        </div>
      </div>
      <Empty v-else />
    </div>
  </div>
</template>
<script setup>
import Pagination from "@/components/Pagination";
import EmptyGrid from "@/components/Skeleton/Project-grid.vue";
import Empty from "@/components/Empty";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import { computed, onMounted, ref, watch, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

onMounted(() => {
  getZonesTotal();
});
const { dispatch, state } = useStore();
const router = useRouter();

const zones = computed(() => state.zone.zones);
const total = computed(() => state.zone.total);
const getZonesTotalLoading = computed(() => state.zone.getZonesTotalLoading);
const deleteZoneSuccess = computed(() => state.zone.deleteZoneSuccess);
const addZoneSuccess = computed(() => state.zone.addZoneSuccess);
const updateZoneSuccess = computed(() => state.zone.updateZoneSuccess);
const toast = useToast();
const modal = ref(null);
const detail = ref(null);
const query = reactive({
  pageNumber: 1,
  pageSize: 25,
  sortOrder: null,
  searchParameter: null,
  userId:
    state.auth?.userData?.cihRole?.toLowerCase() === "cihcoordinator"
      ? state.auth?.userData?.id
      : "",
});

const options = [
  {
    value: "5",
    label: "5",
  },
  {
    value: "25",
    label: "25",
  },
  {
    value: "50",
    label: "50",
  },
  {
    value: "75",
    label: "75",
  },
  {
    value: "100",
    label: "100",
  },
];
const getZonesTotal = () => {
  dispatch("getZonesTotal", query);
};

function perPage({ currentPerPage }) {
  query.pageNumber = 1;
  query.pageSize = currentPerPage;
}
watch(deleteZoneSuccess, () => {
  if (deleteZoneSuccess.value) {
    toast.success("Successfully Deleted");
    dispatch("getZonesTotal", query);
    modal.value.closeModal();
  }

  // getAllZones();
});
watch([addZoneSuccess, updateZoneSuccess], () => {
  if (addZoneSuccess.value || updateZoneSuccess.value) {
    dispatch("getZonesTotal", query);
  }

  // getAllZones();
});

// eslint-disable-next-line no-unused-vars
function handleDelete() {
  dispatch("removeZone", detail.value);
}
watch(query, () => {
  dispatch("getZonesTotal", query);
});
</script>
<style lang="scss" scoped>
.date-label {
  @apply text-xs text-slate-400 dark:text-slate-400 mb-1;
}
.date-text {
  @apply text-xs text-slate-600 dark:text-slate-300 font-medium;
}
</style>

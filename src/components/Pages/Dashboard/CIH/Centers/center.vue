<template>
  <div class="">
    <div class="mb-10">
      <Card>
        <!-- <div v-if="statsLoading" class="">loading</div> -->
        <div v-if="statsLoading" class="animate-pulse grid grid-cols-5 gap-x-4">
          <div
            v-for="(item, index) in content"
            :key="item.title"
            :class="colors[index]"
            class="border rounded-lg px-6 py-4 text-gray-600"
          >
            <div class="flex mb-5 gap-x-8">
              <span
                class="font-bold text-lg flex gap-x-8 capitalize w-full justify-between"
                ><span>{{ item?.title }}</span>
                <span class="text-2xl">{{ item?.total }}</span>
              </span>
            </div>
            <div class="flex flex-col text-sm">
              <span class="flex gap-x-3">
                <span>Male<span v-if="item?.males > 1">s</span></span>
                <span>{{ item?.males }}</span></span
              >

              <span class="flex gap-x-3">
                <span>Female<span v-if="item?.females > 1">s</span></span
                ><span>{{ item?.females }}</span>
              </span>
            </div>
          </div>
        </div>
        <div v-else class="grid grid-cols-5 gap-x-4">
          <div
            v-for="(item, index) in CIHStats"
            :key="item.title"
            :class="colors[index]"
            class="border rounded-lg px-6 py-4 text-gray-600"
          >
            <div class="flex mb-5 gap-x-8">
              <span
                class="font-bold text-lg flex gap-x-8 capitalize w-full justify-between"
                ><span>{{ item?.title }}</span>
                <span class="text-2xl">{{ item?.total }}</span>
              </span>
            </div>
            <div class="flex flex-col text-sm">
              <span class="flex gap-x-3">
                <span>Male<span v-if="item?.males > 1">s</span></span>
                <span>{{ item?.males }}</span></span
              >

              <span class="flex gap-x-3">
                <span>Female<span v-if="item?.females > 1">s</span></span
                ><span>{{ item?.females }}</span>
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <Table />
  </div>
</template>
<script setup>
// import Icon from "@/components/Icon";
import Card from "@/components/Card";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Table from "./centerTable.vue";
onMounted(() => {
  dispatch("getCIHStats", route.params.id);
});

const { state, dispatch } = useStore();
const route = useRoute();

const CIHStats = computed(() => {
  let totals = 0;
  let males = 0;
  let females = 0;

  const data = state?.attendance?.CIHStats?.map((item) => {
    return {
      title: item.gender,
      total: item.total,
      males: item.male,
      females: item.female,
    };
  });
  data?.forEach((obj) => {
    totals += obj.total;
    males += obj.males;
    females += obj.females;
  });
  let result = {
    title: "Members",
    total: totals,
    males: males,
    females: females,
  };
  const dataRes = data?.length ? data : [];
  return [result, ...dataRes];
});
const statsLoading = computed(() => state.attendance.getCIHStatsLoading);
const colors = [
  "bg-green-100",
  "bg-yellow-100",
  "bg-blue-100",
  "bg-purple-100",
  "bg-orange-100",
];

const content = [
  {
    title: "members",
    total: "0",
    males: "0",
    females: "0",
  },
  {
    title: "adults",
    total: "0",
    males: "0",
    females: "0",
  },
  {
    title: "youths",
    total: "0",
    males: "0",
    females: "0",
  },
  {
    title: "teenagers",
    total: "0",
    males: "0",
    females: "0",
  },
  {
    title: "children",
    total: "0",
    males: "0",
    females: "0",
  },
];
</script>
<style lang="scss">
.custom-calender {
  .vc-pane-container,
  .vc-pane-layout,
  .vc-container,
  .vc-container * {
    border: none !important;
    font-family: "Inter", sans-serif !important;
    //background: #fafbff !important;
    font-weight: 400;
  }
  .vc-title {
    color: #0f172a !important;
    font-size: 24px !important;
    font-weight: 500 !important;
    margin-bottom: 15px !important;
  }
  .vc-arrow {
    margin-left: 10px !important;
    margin-right: 10px !important;
    color: #0f172a !important;
  }
  .vc-weekday {
    @apply font-normal dark:text-slate-400 text-sm text-slate-600;
  }
  .vc-day {
    @apply text-slate-900 dark:text-white;
  }
  .vc-highlight {
    background-color: #0f172a !important;
  }
}
.dark {
  .custom-calender {
    .vc-title {
      color: #fff !important;
    }
    .vc-arrow {
      color: #fff !important;
    }
  }
  .vc-container,
  .vc-container {
    @apply bg-slate-800;
  }
}
</style>

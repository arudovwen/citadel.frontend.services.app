<template>
  <div>
    <div :class="(firstTimerStatsLoading ? 'animate-pulse' : '', 'mb-10')">
      <!-- {{ firstTimerStats }} -->

      <div
        v-if="firstTimerStats?.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-6 lg:gap-x-8"
      >
        <div v-for="(item, i) in firstTimerStats" :key="i" class="">
          <div
            :class="bgStyles[i]?.bg"
            class="rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]"
          >
            <div class="overlay absolute left-0 top-0 w-full h-full z-[-1]">
              <img
                :src="bgStyles[i]?.img"
                alt=""
                draggable="false"
                class="w-full h-full object-contain"
              />
            </div>
            <div class="flex gap-4 justify-between items-center">
              <span
                class="block mb-6 text-2xl text-slate-900 dark:text-white font-medium"
                >{{ item?.gender }}</span
              >

              <span
                class="block mb-6 text-2xl text-slate-900 dark:text-white font-medium"
                >{{ item?.male + item?.female }}</span
              >
            </div>
            <div class="flex flex-col gap-4">
              <span
                class="block text-sm text-slate-900 dark:text-white font-medium"
                >Males {{ item?.male }}</span
              >
              <span
                class="block mb- text-sm text-slate-900 dark:text-white font-medium mb-6"
                >Females {{ item?.female }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-6 lg:gap-x-8"
      >
        <div
          v-for="(item, i) in defaultStatState"
          :key="i"
          class="animate-pulse"
        >
          <div
            :class="bgStyles[i]?.bg"
            class="rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]"
          >
            <div class="overlay absolute left-0 top-0 w-full h-full z-[-1]">
              <img
                :src="bgStyles[i]?.img"
                alt=""
                draggable="false"
                class="w-full h-full object-contain"
              />
            </div>
            <div class="flex gap-4 justify-between items-center">
              <span
                class="block mb-6 text-2xl text-slate-900 dark:text-white font-medium"
                >{{ item?.gender }}</span
              >

              <span
                class="block mb-6 text-2xl text-slate-900 dark:text-white font-medium"
                >{{ item?.male + item?.female }}</span
              >
            </div>
            <div class="flex flex-col gap-4">
              <span
                class="block text-sm text-slate-900 dark:text-white font-medium"
                >Males {{ item?.male }}</span
              >
              <span
                class="block mb- text-sm text-slate-900 dark:text-white font-medium mb-6"
                >Females {{ item?.female }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <FirstTimers />
  </div>
</template>

<script setup>
import FirstTimers from "./module/table";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

onMounted(() => {
  getFirstTimerStats();
});
const { state, dispatch } = useStore();
const getFirstTimerStats = () => {
  dispatch("getFirstTimerStats");
};

const defaultStatState = [
  { centerId: null, gender: "Adult", total: 0, male: 0, female: 0 },
  { centerId: null, gender: "Youths", total: 0, male: 0, female: 0 },
  { centerId: null, gender: "Teenagers", total: 0, male: 0, female: 0 },
  { centerId: null, gender: "Children", total: 0, male: 0, female: 0 },
];
const firstTimerStats = computed(() => {
  return state.profile.firstTimerStats;
});

const firstTimerStatsLoading = computed(() => {
  return state.profile.firstTimerStatsLoading;
});

const bgStyles = [
  {
    bg: "bg-warning-500",

    img: require("@/assets/images/all-img/shade-1.png"),
  },
  {
    bg: "bg-info-500",

    img: require("@/assets/images/all-img/shade-2.png"),
  },
  {
    bg: "bg-primary-500",

    img: require("@/assets/images/all-img/shade-3.png"),
  },
  {
    bg: "bg-red-400",

    img: require("@/assets/images/all-img/shade-3.png"),
  },
];
</script>

<style lang="scss" scoped></style>

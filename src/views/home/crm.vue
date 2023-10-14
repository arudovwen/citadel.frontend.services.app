<template>
  <div>
    <Breadcrumb />
    <div class="card-auto space-y-5">
      <div class="grid grid-cols-12 gap-5">
        <div class="lg:col-span-8 col-span-12 space-y-5">
          <Card>
            <div class="grid xl:grid-cols-4 lg:grid-cols-2 col-span-1 gap-3">
              <div
                v-for="(item, i) in statistics"
                :key="i"
                :class="item.bg"
                class="rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]"
              >
                <div class="overlay absolute left-0 top-0 w-full h-full z-[-1]">
                  <img
                    :src="item.img"
                    alt=""
                    draggable="false"
                    class="w-full h-full object-contain"
                  />
                </div>
                <span
                  class="block mb-6 text-sm text-slate-900 dark:text-white font-medium"
                  >{{ item.title }}</span
                >
                <span
                  class="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-6"
                  >{{ item.count }}</span
                >
                <div class="flex space-x-2">
                  <div class="flex-none text-xl" :class="item.text">
                    <Icon :icon="item.icon" />
                  </div>
                  <div class="flex-1 text-sm">
                    <span class="block mb-[2px]" :class="item.percentClass">{{
                      item.percent
                    }}</span>
                    <span class="block mb-1 text-slate-600 dark:text-slate-300"
                      >From last week</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <header class="md:flex md:space-y-0 space-y-4">
              <h6 class="flex-1 text-slate-900 dark:text-white capitalize">
                Members distribution by venue
              </h6>
              <div class="flex-none">
                <FromGroup>
                  <flat-pickr
                    class="form-control bg-white"
                    placeholder="Select date range"
                    v-model="rangeDate"
                    :config="{ mode: 'range' }"
                  />
                </FromGroup>
              </div>
            </header>

            <div class="legend-ring">
              <apexchart
                type="bar"
                height="410"
                :options="
                  this.$store.state.isDark
                    ? stackedDark.chartOptions
                    : stacked.chartOptions
                "
                :series="stacked.series"
              />
            </div>
          </Card>
        </div>
        <div class="grid grid-cols-1 lg:col-span-4 col-span-12 space-y-5">
          <Card title="Goals">
            <template #header>
              <DropEvent />
            </template>
            <div class="grid grid-cols-1 gap-y-6">
              <div v-for="(item, i) in progressBackground" :key="i">
                <p class="text-sm mb-1">Goal Title</p>
                <ProgressBar
                  :value="item.value"
                  :barColor="item.barColor"
                  showValue
                  height="h-3"
                />
              </div>
            </div>
          </Card>
          <Card title="Meetings">
            <div class="legend-ring3">Time</div>
          </Card>
          <Card title="Appointments">
            <div class="legend-ring3">Time</div>
          </Card>
        </div>
      </div>
      <Card title="Latest Transaction" noborder>
        <template #header>
          <DropEvent />
        </template>
        <div class="-mx-6">
          <CrmTable />
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "./Analytics-Component/Breadcrumbs";
import Card from "@/components/Card";
import FromGroup from "@/components/FromGroup";
import Icon from "@/components/Icon";
import CrmTable from "./Analytics-Component/CrmTable";
import ProgressBar from "@/components/ProgressBar";

import {
  pieChart,
  pieChartDark,
  stacked,
  stackedDark,
} from "./Analytics-Component/data";
import DropEvent from "./Analytics-Component/DropEvent";

export default {
  components: {
    Card,
    Icon,
    CrmTable,
    DropEvent,
    FromGroup,
    Breadcrumb,
    ProgressBar,
  },
  data() {
    return {
      stacked,
      stackedDark,
      rangeDate: null,
      pieChart,
      pieChartDark,
      statistics: [
        {
          title: "Members",
          count: "354",
          bg: "bg-warning-500",
          text: "text-primary-500",
          percent: "25.67% ",
          icon: "heroicons:arrow-trending-up",
          img: require("@/assets/images/all-img/shade-1.png"),
          percentClass: "text-primary-500",
        },
        {
          title: "Venues ",
          count: "$86,954",

          bg: "bg-info-500",
          text: "text-primary-500",
          percent: "8.67%",
          icon: "heroicons:arrow-trending-up",
          img: require("@/assets/images/all-img/shade-2.png"),
          percentClass: "text-primary-500",
        },
        {
          title: "Outreaches",
          count: "15%",
          bg: "bg-primary-500",
          text: "text-danger-500",
          percent: "1.67%  ",
          icon: "heroicons:arrow-trending-down",
          img: require("@/assets/images/all-img/shade-3.png"),
          percentClass: "text-danger-500",
        },
        {
          title: "Events",
          count: "654",
          bg: "bg-success-500",
          text: "text-primary-500",
          percent: "11.67%  ",
          icon: "heroicons:arrow-trending-up",
          img: require("@/assets/images/all-img/shade-4.png"),
          percentClass: "text-primary-500",
        },
      ],
      Campaigns: [
        {
          name: "Channel",
          value: "roi",
        },
        {
          name: "Email",
          value: "40%",
        },
        {
          name: "Website",
          value: "28%",
        },
        {
          name: "Facebook",
          value: "34%",
        },
        {
          name: "Offline",
          value: "17%",
        },
      ],
      progressDefault: [
        {
          value: 50,
        },
        {
          value: 70,
        },
        {
          value: 80,
        },
      ],
      progressBackground: [
        {
          value: 50,
          barColor: "bg-primary-500",
        },
        {
          value: 70,
          barColor: "bg-success-500",
        },
        {
          value: 80,
          barColor: "bg-info-500",
        },
      ],
      progressHeight: [
        {
          value: 50,
          title: "Progress sm",
          barColor: "bg-primary-500",
          height: "h-1",
        },
        {
          value: 70,
          title: "Progress md",
          barColor: "bg-success-500",
          height: "h-[6px]",
        },
        {
          value: 80,
          title: "Progress lg",
          barColor: "bg-warning-500",
          height: "h-[10px]",
        },

        {
          value: 100,
          title: "Progress xl",
          barColor: "bg-danger-500",
          height: "h-4",
        },
      ],
    };
  },
};
</script>
<style lang=""></style>

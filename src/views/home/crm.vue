<template>
  <div>
    <Breadcrumb />
    <div class="card-auto space-y-5">
      <div class="grid grid-cols-12 gap-5">
        <div class="lg:col-span-8 col-span-12 space-y-5">
          <Card>
            <div class="grid xl:grid-cols-3 lg:grid-cols-2 col-span-1 gap-3">
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
                <!-- <div class="flex space-x-2">
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
                </div> -->
              </div>
            </div>
          </Card>

          <Card title="Recent Reports" noborder>
            <template #header>
              <!-- <DropEvent /> -->
              <span class="cursor-pointer text-xs">View more</span>
            </template>
            <div class="-mx-6">
              <RecentReportsTable />
            </div>
          </Card>
          <Card title="Recent Events" noborder>
            <template #header>
              <!-- <DropEvent /> -->
              <span class="cursor-pointer text-xs">View more</span>
            </template>
            <div class="-mx-6">
              <RecentEventsTable />
            </div>
          </Card>

          <!-- <Card title="Recent Events">
            <template #header>
          
              <span class="cursor-pointer text-xs">View more</span>
            </template>
            <ul class="relative pl-2">
              <li
                v-for="(item, i) in trackingParcel.slice(0, 5)"
                :key="i"
                :class="
                  item.status === 'ok'
                    ? 'before:opacity-100'
                    : ' before:opacity-50'
                "
                class="border-l-2 border-slate-100 dark:border-slate-700 pb-4 last:border-none pl-[22px] relative before:absolute before:left-[-8px] before:top-[0px] before:rounded-full before:w-4 before:h-4 before:bg-slate-900 dark:before:bg-slate-600 before:leading-[2px] before:content-[url('@/assets/images/all-img/ck.svg')]"
              >
                <div class="flex items-center justify-between">
                  <div class="p-[10px] relative top-[-20px]">
                    <h2
                      class="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600"
                    >
                      {{ item.title }}
                    </h2>
                    <p class="text-xs capitalize dark:text-slate-400">
                      {{ item.date }}
                    </p>
                  </div>
                  <span
                    v-if="item?.status"
                    class="text-[#75C599] bg-[#DCF0E5] capitalize rounded-[40px] px-4 py-2 text-sm"
                    >{{ item.status }}</span
                  >
                </div>
              </li>
            </ul>
          </Card> -->
        </div>
        <div class="flex flex-col lg:col-span-4 col-span-12 space-y-5">
          <Card title="Members Distribution">
            <template #header>
              <DistributionType />
            </template>
            <div class="grid grid-cols-1 gap-y-6">
              <div v-for="(item, i) in distributionByAge" :key="i">
                <p class="text-sm mb-1">{{ item.title }}</p>
                <ProgressBar
                  :value="item.value"
                  :barColor="item.barColor"
                  showValue
                  height="h-3"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DistributionType from "@/views/home/Analytics-Component/DistributionType";
import Breadcrumb from "./Analytics-Component/Breadcrumbs";
import Card from "@/components/Card";
// import FormGroup from "@/components/FormGroup";
// import Icon from "@/components/Icon";
// import CrmTable from "./Analytics-Component/CrmTable";
import ProgressBar from "@/components/ProgressBar";

import {
  pieChart,
  pieChartDark,
  stacked,
  stackedDark,
} from "./Analytics-Component/data";
// import DropEvent from "./Analytics-Component/DropEvent";
import { trackingParcel } from "../../constant/data";
import RecentReportsTable from "@/views/home/Analytics-Component/RecentReportsTable";
import RecentEventsTable from "@/views/home/Analytics-Component/RecentEventsTable";

export default {
  components: {
    Card,
    // Icon,
    // CrmTable,
    // DropEvent,
    DistributionType,
    RecentReportsTable,
    RecentEventsTable,
    // FormGroup,
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
      trackingParcel,
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
          title: "Zones",
          count: "14",

          bg: "bg-info-500",
          text: "text-primary-500",
          percent: "8.67%",
          icon: "heroicons:arrow-trending-up",
          img: require("@/assets/images/all-img/shade-2.png"),
          percentClass: "text-primary-500",
        },
        {
          title: "Centers",
          count: "54",
          bg: "bg-primary-500",
          text: "text-danger-500",
          percent: "1.67%  ",
          icon: "heroicons:arrow-trending-down",
          img: require("@/assets/images/all-img/shade-3.png"),
          percentClass: "text-danger-500",
        },
        // {
        //   title: "Events",
        //   count: "654",
        //   bg: "bg-success-500",
        //   text: "text-primary-500",
        //   percent: "11.67%  ",
        //   icon: "heroicons:arrow-trending-up",
        //   img: require("@/assets/images/all-img/shade-4.png"),
        //   percentClass: "text-primary-500",
        // },
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
      distributionByAge: [
        {
          title: "Men",
          value: 50,
          barColor: "bg-primary-500",
        },
        {
          title: "Women",
          value: 70,
          barColor: "bg-success-500",
        },
        {
          title: "Teenagers",
          value: 30,
          barColor: "bg-blue-500",
        },
        {
          title: "Children",
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
          barColor: "bg-blue-500",
          height: "h-[10px]",
        },

        {
          value: 100,
          title: "Progress xl",
          barColor: "bg-danger-500",
          height: "h-4",
        },
      ],
      attributes: [
        {
          key: "today",
          highlight: {
            color: "gray-500",
            fillMode: "solid",
          },

          dates: new Date(),
        },
        {},
      ],
      meets: [
        {
          img: require("@/assets/images/svg/dc.svg"),
          title: "Meeting with client",
          date: "01 Nov 2021",
          meet: "Zoom meeting",
        },
        {
          img: require("@/assets/images/svg/dc.svg"),
          title: "Design meeting (team)",
          date: "01 Nov 2021",
          meet: "Skyp meeting",
        },
        {
          img: require("@/assets/images/svg/dc.svg"),
          title: "Background research",
          date: "01 Nov 2021",
          meet: "Google meeting",
        },
        {
          img: require("@/assets/images/svg/dc.svg"),
          title: "Meeting with client",
          date: "01 Nov 2021",
          meet: "Zoom meeting",
        },
      ],
    };
  },
};
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

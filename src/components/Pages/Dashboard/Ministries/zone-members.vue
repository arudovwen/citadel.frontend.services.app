<template>
  <div class="">
    <div class="mb-10">
      <Card>
        <div class="grid grid-cols-5 gap-x-6">
          <div
            v-for="item in content"
            :key="item.title"
            :class="item.bgClass"
            class="border rounded-lg px-6 py-4 text-gray-600"
          >
            <div class="flex mb-5 gap-x-8">
              <span
                class="font-bold text-lg flex gap-x-8 capitalize w-full justify-between"
                ><span>{{ item.title }}</span>
                <span class="text-2xl">{{ item.total }}</span>
              </span>
            </div>
            <div class="flex flex-col text-sm">
              <span class="flex gap-x-3">
                <span>Male<span v-if="item.males > 1">s</span></span>
                <span>{{ item.males }}</span></span
              >

              <span class="flex gap-x-3">
                <span>Female<span v-if="item.females > 1">s</span></span
                ><span>{{ item.females }}</span>
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
import Table from "./zoneMembersTable.vue";

const content = [
  {
    title: "members",
    total: "5",
    males: "1",
    females: "2",
    bgClass: "bg-green-100",
  },
  {
    title: "adults",
    total: "5",
    males: "1",
    females: "2",
    bgClass: "bg-yellow-100",
  },
  {
    title: "youths",
    total: "5",
    males: "1",
    females: "2",
    bgClass: "bg-blue-100",
  },
  {
    title: "teenagers",
    total: "5",
    males: "1",
    females: "2",
    bgClass: "bg-purple-100",
  },
  {
    title: "children",
    total: "5",
    males: "1",
    females: "2",
    bgClass: "bg-orange-100",
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

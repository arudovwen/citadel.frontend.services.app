<template>
  <div class="">
    <h1 class="text-lg font-semibold mb-6 uppercase">
      {{ detail?.cihAddress }}
    </h1>
    <div class="mb-10">
      <Card>
        <div class="grid grid-cols-5 gap-x-4">
          <div
            v-for="item in content"
            :key="item.title"
            class="border rounded-lg px-4 py-4 bg-gray-100"
          >
            <div class="flex mb-5 gap-x-8">
              <span class="font-bold text-lg flex gap-x-8 capitalize"
                ><span>{{ item.title }}</span>
                <span>{{ item.total }}</span></span
              >
            </div>
            <div class="flex text-sm gap-x-4">
              <span class="flex gap-x-1">
                <span>{{ item.males }}</span
                ><span>Male(s)</span></span
              >
              <div class="h-4 border-l"></div>
              <span class="flex gap-x-1">
                <span>{{ item.females }}</span> <span>Female(s)</span></span
              >
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
import Table from "./centerTable.vue";
import { reactive, onMounted, computed, provide } from "vue";
import { useStore } from "vuex";

const { state, dispatch } = useStore();
// eslint-disable-next-line no-unused-vars
const centerQuery = reactive({
  pageNumber: 1,
  pageSize: 25,
  searchParameter: "",
  userId: state.auth.userData.id,
});
const content = [
  {
    title: "members",
    total: "5",
    males: "1",
    females: "2",
  },
  {
    title: "adults",
    total: "5",
    males: "1",
    females: "2",
  },
  {
    title: "youths",
    total: "5",
    males: "1",
    females: "2",
  },
  {
    title: "teenagers",
    total: "5",
    males: "1",
    females: "2",
  },
  {
    title: "children",
    total: "5",
    males: "1",
    females: "2",
  },
];
const detail = computed(() => state.profile.churchAffiliationsData);
onMounted(() => {
  dispatch("getChurchAffiliationsById", state.auth.userData.id);
});
provide("detail", detail);
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

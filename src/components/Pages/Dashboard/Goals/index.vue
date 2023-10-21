<template>
  <div>
    <div class="flex flex-col md:flex-row justify-between items-center mb-6">
      <div
        class="flex md:mb-0 mb-3 border border-gray-200 rounded-[6px] text-sm overflow-hidden w-full md:w-auto overflow-x-auto"
      >
        <button
          class="px-4 py-2 border-r border-gray-200 last:border-none capitalize min-w-[90px] text-center block w-full"
          :class="activeFilter === n ? 'bg-primary-500 text-white' : ''"
          @click="activeFilter = n"
          v-for="n in filters"
          :key="n"
        >
          {{ n }}
        </button>
      </div>
      <div
        class="flex flex-col md:flex-row justify-end gap-y-4 md:gap-y-0 md:gap-x-4 items-center w-full md:w-auto"
      >
        <VueTailwindDatePicker
          v-model="dateValue"
          :formatter="formatter"
          input-classes="form-control w-full md:w-auto min-w-[250px]"
          placeholder="Select date range"
        />

        <VueSelect
          class="min-w-[200px] w-full md:w-auto"
          v-model="department"
          :options="options"
          placeholder="Filter department"
          name="departments"
        />

        <Button
          icon="heroicons-outline:plus"
          text="Add Goal"
          btnClass="btn-primary dark:bg-slate-800 text-sm font-normal h-10 ml-auto"
          iconClass=" text-lg"
          @click="openGoal"
          :isLoading="store.state.goal.isLoading"
        />
      </div>
    </div>

    <GridSkletion :count="goals.length" v-if="isSkeletion" />

    <Grid v-if="fillter === 'grid' && !isSkeletion" />

    <GoalAddmodal />
    <updateModal />
  </div>
</template>

<script setup>
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import VueSelect from "@/components/Select/VueSelect";
import Button from "@/components/Button";
import GridSkletion from "@/components/Skeleton/Project-grid";
import { computed, ref, watch, onMounted } from "vue";
import GoalAddmodal from "./AddGoal";
import updateModal from "./EditGoal";
import Grid from "./Goals-grid";
import { useStore } from "vuex";

const formatter = ref({
  date: "DD MMM YYYY",
  month: "MMM",
});
const dateValue = ref([]);
const department = ref("");
const options = [
  {
    value: "option2",
    label: "Option 2",
  },
  {
    value: "option3",
    label: "Option 3",
  },
];
const store = useStore();
const filters = ["active", "expired", "pending", "rejected"];
const activeFilter = ref("active");
let fillter = ref("grid");
const openGoal = () => {
  store.dispatch("openGoal");
};

const width = ref(0);
const handleResize = () => {
  width.value = window.innerWidth;
};
onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

const goals = computed(() => store.getters.goals);

const isSkeletion = ref(true);
const isSkeletion2 = ref(null);
setTimeout(() => {
  isSkeletion.value = false;
  isSkeletion2.value = false;
}, 1000);

// watch fillter with switch case
watch(fillter, () => {
  switch (fillter.value) {
    case "grid":
      fillter.value = "grid";
      isSkeletion.value = true;
      setTimeout(() => {
        isSkeletion.value = false;
      }, 1000);

      break;
    case "list":
      fillter.value = "list";
      isSkeletion2.value = true;
      setTimeout(() => {
        isSkeletion2.value = false;
      }, 1000);
      break;
    default:
      fillter.value = "grid";
      break;
  }
});
</script>
<style lang=""></style>

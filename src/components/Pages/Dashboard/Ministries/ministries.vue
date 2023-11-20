<template>
  <div>
    <div
      class="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:justify-between md:items-center mb-6 md:mb-4 w-full md:w-auto"
    >
      <div
        class="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4 items-center w-full md:w-auto"
      >
        <InputGroup
          v-model="query.searchParameter"
          placeholder="Search zone"
          type="search"
          prependIcon="heroicons-outline:search"
          classInput="w-full md:w-auto min-w-[320px] !h-9"
        />

        <Select
          label=""
          :options="filters"
          v-model="query.sortOrder"
          placeholder="Sort by"
          classInput="bg-white !h-9 min-w-[150px]  !min-h-[36px] w-full md:w-auto"
        />
      </div>

      <Button
        v-if="
          state.auth.userData.userRole.toLowerCase() === 'inspectorate' ||
          state.auth.userData.userRole.toLowerCase() === 'administrator'
        "
        icon="heroicons-outline:plus"
        text="Add Ministry"
        btnClass="btn-primary btn-sm dark:bg-slate-800  h-min text-sm font-normal"
        iconClass="text-lg"
        @click="openZone"
        :isLoading="store.state.zone.isLoading"
      />
    </div>
    <GridSkletion :count="zones.length" v-if="isSkeletion" />

    <Grid v-if="fillter === 'grid' && !isSkeletion" />

    <AddModal />
    <EditModal />
  </div>
</template>

<script setup>
import Button from "@/components/Button";
import GridSkletion from "@/components/Skeleton/grid";
import Select from "@/components/Select";
import InputGroup from "@/components/InputGroup";
import { computed, ref, watch, onMounted, reactive, provide } from "vue";
import AddModal from "./ministry-add";
import EditModal from "./ministry-edit";
import Grid from "./ministry-grid";
import { useStore } from "vuex";

const store = useStore();
const { state } = useStore();

const filters = [
  {
    label: "Name",
    value: "zoneName",
  },
  {
    label: "Description",
    value: "description",
  },
];
let fillter = ref("grid");
const openZone = () => {
  store.dispatch("openZone");
};

const width = ref(0);
const handleResize = () => {
  width.value = window.innerWidth;
};
onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});
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
const zones = computed(() => store.getters.zones);

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
provide("query", query);
</script>
<style lang=""></style>

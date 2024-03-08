<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <div class="flex gap-x-3 md:mb-0 mb-3 text-sm">
          <InputGroup
            v-model="query.searchParameter"
            placeholder="Search"
            type="text"
            prependIcon="heroicons-outline:search"
            merged
            classInput="min-w-[220px] !h-9"
          />
        </div>
      </div>

      <AccessoriesTable />
    </Card>
    <!-- <GridSkletion :count="units.length" v-if="isSkeletion" /> -->

    <AddModal />
    <EditModal />
  </div>
</template>

<script setup>
// import GridSkletion from "@/components/Skeleton/grid";
// import Select from "@/components/Select";
import InputGroup from "@/components/InputGroup";
import { computed, ref, watch, onMounted, reactive, provide } from "vue";
import AccessoriesTable from "./audit";
import { useStore } from "vuex";

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});
// eslint-disable-next-line no-unused-vars
const store = useStore();
const { state } = useStore();
const userId = computed(() => state.auth.userData.id);

let fillter = ref("grid");

const width = ref(0);
const handleResize = () => {
  width.value = window.innerWidth;
};

const query = reactive({
  pageNumber: 1,
  pageSize: 25,
  sortOrder: null,
  searchParameter: null,
});
// const units = computed(() => state.unit.units);

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
provide("userId", userId);
</script>
<style lang=""></style>

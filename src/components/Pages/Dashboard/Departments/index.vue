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
          placeholder="Search department "
          type="text"
          prependIcon="heroicons-outline:search"
          merged
          classInput="min-w-[320px] !h-9"
        />

        <Select
          label=""
          :options="filters"
          v-model="query.sortOrder"
          placeholder="Sort by"
          classInput="bg-white !h-9 min-w-[150px] !min-h-auto"
        />
      </div>

      <Button
        v-if="permissions.includes('CAN_CREATE_DEPARTMENT')"
        icon="heroicons-outline:plus"
        text="Add Department"
        btnClass="btn-primary btn-sm dark:bg-slate-800  h-min text-sm font-normal"
        iconClass="text-lg"
        @click="openDepartment"
      />
    </div>
    <GridSkletion :count="projects.length" v-if="isSkeletion" />

    <Grid v-if="fillter === 'grid' && !isSkeletion" />

    <DepartmentAddmodal />
    <UpdateModal />
  </div>
</template>

<script setup>
import Button from "@/components/Button";
import Select from "@/components/Select";
import GridSkletion from "@/components/Skeleton/Project-grid";
import InputGroup from "@/components/InputGroup";
import { computed, ref, watch, onMounted, reactive, provide } from "vue";
import DepartmentAddmodal from "./AddDepartment";
import UpdateModal from "./EditDepartment";
import Grid from "./Departments-grid";
import { useStore } from "vuex";

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});
const store = useStore();
const { state } = useStore();

const filters = [
  {
    label: "Description",
    value: "description",
  },
  {
    label: "Department Code",
    value: "departmentCode",
  },
  {
    label: "Department Hod",
    value: "userId",
  },
  {
    label: "Department Name",
    value: "departmentName",
  },
];

let fillter = ref("grid");
const openDepartment = () => {
  store.dispatch("openDepartment");
};

const width = ref(0);
const handleResize = () => {
  width.value = window.innerWidth;
};

const query = reactive({
  pageNumber: 1,
  pageSize: 25,
  sortOrder: null,
  searchParameter: null,
  userId:
    state.auth.userData.userRole.toLowerCase() === "hod"
      ? state.auth.userData.id
      : "",
});
const projects = computed(() => store.getters.projects);
const permissions = computed(() => state.auth.permissions);
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

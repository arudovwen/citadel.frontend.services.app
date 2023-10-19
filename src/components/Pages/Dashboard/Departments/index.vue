<template>
  <div>
    <div class="flex flex-wrap justify-end items-center mb-4">
      <Button
        icon="heroicons-outline:plus"
        text="Add Department"
        btnClass="btn-primary dark:bg-slate-800  h-min text-sm font-normal"
        iconClass="text-lg"
        @click="openDepartment"
        :isLoading="store.state.project.isLoading"
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
import GridSkletion from "@/components/Skeleton/Project-grid";
import { computed, ref, watch, onMounted } from "vue";
import DepartmentAddmodal from "./AddDepartment";
import UpdateModal from "./EditDepartment";
import Grid from "./Departments-grid";
import { useStore } from "vuex";
const store = useStore();

let fillter = ref("grid");
const openDepartment = () => {
  store.dispatch("openDepartment");
};

const width = ref(0);
const handleResize = () => {
  width.value = window.innerWidth;
};
onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

const projects = computed(() => store.getters.projects);

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

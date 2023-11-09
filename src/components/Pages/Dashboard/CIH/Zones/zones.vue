<template>
  <div>
    <div class="flex justify-space-between items-center mb-4">
      <Button
        v-if="
          store.state.auth.userData.userRole.toLowerCase() === 'inspectorate' ||
          state.auth.userData.userRole.toLowerCase() === 'administrator'
        "
        icon="heroicons-outline:plus"
        text="Add zone"
        btnClass="btn-primary btn-sm dark:bg-slate-800  h-min text-sm font-normal"
        iconClass="text-lg"
        @click="openZone"
        :isLoading="store.state.zone.isLoading"
      />
    </div>
    <GridSkletion :count="zones.length" v-if="isSkeletion" />

    <Grid v-if="fillter === 'grid' && !isSkeletion" />

    <ZoneAddmodal />
    <UpdateModal />
  </div>
</template>

<script setup>
import Button from "@/components/Button";
import GridSkletion from "@/components/Skeleton/grid";
import { computed, ref, watch, onMounted } from "vue";
import ZoneAddmodal from "./AddZone";
import UpdateModal from "./EditZone";
import Grid from "./zones-grid";
import { useStore } from "vuex";

const store = useStore();
const { state } = useStore();

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
</script>
<style lang=""></style>

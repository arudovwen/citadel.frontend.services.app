<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div>
    <div
      className="flex items-center  gap-[32px] overflow-x-auto border-b-[1px] border-b-[#DDDDDD] "
    >
      <div
        v-for="nav in navs"
        @click="currentNav = nav"
        :key="nav"
        :class="
          (`${
            currentNav?.name?.toLowerCase() == nav?.name?.toLowerCase()
              ? 'border-[#222222] text-[#222222] '
              : 'border-transparent text-[#727272] '
          }`,
          'flex cursor-pointer flex-col items-center justify-center text-nowrap border-b-[2px] pb-4 pt-6 font-semibold')
        "
      >
        <span className="text-sm">{{ nav.name }}</span>
      </div>
    </div>

    <div class="">{{ currentNav }}</div>
  </div>
</template>
<script setup>
// import { useToast } from "vue-toastification";

// import { useStore } from "vuex";

import { ref } from "vue";

// const toast = useToast();
// const { state, dispatch } = useStore();
const navs = ref([
  {
    name: "Venue",
  },
  {
    name: "Department",
  },
  {
    name: "Event",
  },
]);
const currentNav = ref(navs.value[0]);
</script>
<style lang="scss"></style>

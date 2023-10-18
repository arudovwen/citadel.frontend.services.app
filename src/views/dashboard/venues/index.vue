<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const addVenue = () => {
  router.push("/add-venue");
};

provide("addVenue", addVenue);
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { provide } from "vue";

const addVenue = () => {
  console.log("Add Venue");
};

provide("addVenue", addVenue);
</script>

<style lang="scss" scoped></style>

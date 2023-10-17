<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const addAppointment = () => {
  router.push("/add-appointment");
};

provide("addAppointment", addAppointment);
</script>

<style lang="scss" scoped></style>

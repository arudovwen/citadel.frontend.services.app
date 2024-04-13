<template>
  <div>
    <export-excel :data="data" worksheet="members" type="csv" :name="name">
      <Button
        icon="clarity:export-line"
        text="CSV"
        btnClass=" btn-outline-secondary mt-2 md:mt-0 w-full text-slate-600 dark:border-slate-700 dark:text-slate-300 font-normal btn-sm "
        iconClass="text-lg"
      />
    </export-excel>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
defineProps({
  data: {
    default: [],
  },
  buttonText: {
    default: "Export",
  },
  name: {
    default: "members.csv",
  },
});
</script>

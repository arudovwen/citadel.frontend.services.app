<template>
  <div class="">
    <div class="rounded-lg bg-white text-gray-900">
      <div
        class="w-full rounded-t-md bg-gray-800 p-4 text-[24px] text-orange-400"
      >
        Form State
      </div>
      <div class="p-4">
        <pre>{{ JSON.stringify(form, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  form: {
    default: {},
  },
});
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <table
      class="bg-slate-50 dark:bg-slate-800 !text-left w-full border-collapse table-fixed border-t border-slate-200 dark:border-slate-700 dark:border"
    >
      <tr>
        <th class="!text-left">
          <span
            class="text-slate-900 dark:text-slate-300 font-medium !py-2 text-base"
            >Accessories</span
          >
        </th>
      </tr>

      <tr
        v-show="accessories?.length"
        v-for="(data, index) in accessories"
        :key="index"
        class="bg-slate-50 border-b border-slate-100 dark:border-slate-700"
      >
        <td class="!text-left !py-2">
          <span class="!py-2 mr-2">{{ index + 1 }}. </span
          >{{ data.accessoryName }}
        </td>
      </tr>

      <div class="mb-4"></div>
    </table>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

defineProps({
  accessories: {
    default: null,
    type: Object,
  },
});
</script>
<style lang="scss" scoped>
th {
  @apply bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 text-left last:text-right;
  > span {
    @apply block px-6 py-5 font-semibold text-sm sm:text-base;
  }
}

td {
  @apply dark:text-slate-300 text-slate-500 text-base  font-normal text-left last:text-right px-6 py-4;
}
</style>

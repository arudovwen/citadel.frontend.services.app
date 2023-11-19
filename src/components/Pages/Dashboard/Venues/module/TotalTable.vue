<template>
  <div>
    <table
      class="!text-left w-full border-collapse table-fixed dark:border-slate-700 dark:border"
    >
      <tr>
        <th class="!text-left">
          <span
            class="text-slate-900 dark:text-slate-300 font-medium leading-5 text-lg"
            >ACCESSORY LIST</span
          >
        </th>
        <!-- <th><span>QTY</span></th> -->
        <!-- <th><span>PRICE</span></th>
        <th><span>TOTAL</span></th> -->
      </tr>

      <tr
        v-show="rows.length"
        v-for="(data, index) in rows"
        :key="index"
        class="bg-slate-50 border-b border-slate-100 dark:border-slate-700"
      >
        <td class="!text-left"><span class=""></span>{{ data.item }}</td>
        <!-- <td>
          {{ data.qty }}
        </td>
        <td>
          {{ data.price }}
        </td>
        <td>
          {{ data.total }}
        </td> -->
      </tr>
    </table>
  </div>
</template>
<script setup>
import { ref } from "vue";
const rows = ref([
  {
    item: "Headphone",
    qty: 2,
    price: "$600.25",
    total: "$1200.50",
  },
  {
    item: "Microphone",
    qty: 2,
    price: "$600.25",
    total: "$1200.50",
  },
  // {
  //   item: "Headphone",
  //   qty: 2,
  //   price: "$600.25",
  //   total: "$1200.50",
  // },
  // {
  //   item: "Headphone",
  //   qty: 2,
  //   price: "$600.25",
  //   total: "$1200.50",
  // },
]);
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

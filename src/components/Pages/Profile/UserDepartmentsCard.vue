<template>
  <div class="grid grid-cols-2 gap-6">
    <Card bodyClass="" v-for="(item, i) in props.departments" :key="i">
      <div class="px-6 pt-6">
        <header class="flex justify-between items-end mb-4">
          <div class="flex space-x-4 items-center">
            <div class="flex-none">
              <div
                class="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal uppercase"
              >
                {{
                  item?.departmentName?.charAt(0) +
                  item?.departmentName?.charAt(1)
                }}
              </div>
            </div>
            <div class="font-medium text-base leading-6">
              <div
                class="dark:text-slate-200 text-slate-900 max-w-[200px] truncate"
              >
                {{ item?.departmentName }} Department
              </div>
            </div>
          </div>
        </header>

        <!-- description -->
        <!-- <div
          class="text-slate-600 dark:text-slate-400 text-sm mb-2 truncate max-w-max"
        >
          Des{{ item.description }}
        </div> -->
      </div>

      <div
        class="flex justify-end px-4 py-2 mt-6 border-t border-gray-100 gap-x-3"
      >
        <button
          class="text-xs text-blue-400 active:scale-95 px-1 py-1 rounded-full"
        >
          <span v-if="!item?.isDefault" class="cursor-pointer"
            >Set as primary</span
          >
          <span v-else-if="item?.isDefault" class="text-gray-500"
            >Primary Department</span
          >
        </button>

        <!-- <button
          @click="actions[1].doit(item)"
          class="text-xs active:scale-95 px-1 py-1 rounded-full"
        >
          Delete
        </button> -->
      </div>
    </Card>
  </div>
</template>

<script setup>
import Card from "@/components/Card";
import { defineProps } from "vue";

const props = defineProps(["departments"]);
</script>

<style lang="scss" scoped></style>

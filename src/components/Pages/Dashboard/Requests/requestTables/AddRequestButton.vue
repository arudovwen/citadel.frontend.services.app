<template>
  <div>
    <Dropdown classMenuItems=" w-[180px] top-[40px]">
      <Button
        icon="heroicons-outline:plus-sm"
        :text="buttonText"
        btnClass=" btn-primary
      font-normal btn-sm "
        iconClass="text-lg"
      />
      <template #menus>
        <MenuItem v-slot="{ active }" v-for="(item, i) in menu" :key="i">
          <div
            type="button"
            :class="`${
              active
                ? 'bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-900 dark:text-slate-300'
                : 'text-slate-600 dark:text-slate-300'
            } `"
            class="inline-flex items-center space-x-2 w-full px-4 py-2 first:rounded-t last:rounded-b font-normal cursor-pointer"
            @click="item.link()"
          >
            <!-- <div class="flex-none text-lg">
            <Icon :icon="item.icon" />
          </div> -->
            <div class="flex-1 text-sm">
              {{ item.label }}
            </div>
          </div>
        </MenuItem>
      </template>
    </Dropdown>
  </div>
</template>

<script setup>
import Dropdown from "@/components/Dropdown";
import { MenuItem } from "@headlessui/vue";
import Button from "@/components/Button";
import { defineProps } from "vue";

defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
  buttonText: {
    type: String,
    default: "Options",
  },
});
</script>

<style lang="scss" scoped></style>

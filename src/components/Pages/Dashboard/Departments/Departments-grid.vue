<template>
  <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
    <Card bodyClass="p-6" v-for="(item, i) in projects" :key="i">
      <!-- header -->
      <header class="flex justify-between items-end">
        <div class="flex space-x-4 items-center">
          <div class="flex-none">
            <div
              class="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize"
            >
              {{ item.name.charAt(0) + item.name.charAt(1) }}
            </div>
          </div>
          <div class="font-medium text-base leading-6">
            <div
              class="dark:text-slate-200 text-slate-900 max-w-[160px] truncate"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div>
          <Dropdown classMenuItems=" w-[130px]">
            <span
              class="text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400"
              ><Icon icon="heroicons-outline:dots-vertical"
            /></span>
            <template v-slot:menus>
              <MenuItem v-for="(mneu, i) in actions" :key="i">
                <div
                  @click="mneu.doit(item)"
                  :class="`
                
                  ${'hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white'}
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center  capitalize `"
                >
                  <span class="text-base"><Icon :icon="mneu.icon" /></span>
                  <span>{{ mneu.name }}</span>
                </div>
              </MenuItem>
            </template>
          </Dropdown>
        </div>
      </header>
      <!-- description -->
      <div class="text-slate-600 dark:text-slate-400 text-sm pt-4 pb-4">
        {{ item.des }}
      </div>

      <!-- assign and time count -->
      <div class="flex justify-end mt-6">
        <!-- assign -->

        <!-- total date -->
        <div class="text-right">
          <span
            class="inline-flex items-center space-x-1 bg-gray-500 bg-opacity-[0.16] text-gray-500 text-xs font-normal px-2 py-1 rounded-full"
          >
            <span> <Icon icon="heroicons-outline:user-group" /></span>
            <span>20 members</span>
          </span>
        </div>
      </div>
    </Card>
  </div>
</template>
<script setup>
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";
import { MenuItem } from "@headlessui/vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();

const projects = computed(() => store.getters.projects);

const actions = ref([
  {
    name: "view",
    icon: "heroicons:eye",
    doit: ({ id }) => {
      router.push(`/departments/view/${id}`);
    },
  },
  {
    name: "Edit",
    icon: "heroicons-outline:pencil-alt",
    doit: (data) => {
      store.dispatch("updateDepartment", data);
    },
  },
  {
    name: "Delete",
    icon: "heroicons-outline:trash",
    doit: (data) => {
      store.dispatch("removeDepartment", data);
    },
  },
]);
</script>
<style lang="scss" scoped>
.date-label {
  @apply text-xs text-slate-400 dark:text-slate-400 mb-1;
}
.date-text {
  @apply text-xs text-slate-600 dark:text-slate-300 font-medium;
}
</style>

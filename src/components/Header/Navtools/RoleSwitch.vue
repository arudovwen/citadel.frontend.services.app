<template>
  <Listbox as="div" v-model="selected">
    <div class="relative">
      <ListboxButton
        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 ring-0 outline-none ring-inset focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
      >
        <span class="block truncate capitalize">{{ selected.label }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <span class="text-base inline-block ml-[10px]"
            ><Icon icon="heroicons-outline:chevron-down"></Icon
          ></span>
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="role in roleOptions"
            :key="role.label"
            :value="role"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-slate-100 ' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <!-- :class="`${
            active
              ? 'bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-900 dark:text-slate-300'
              : 'text-slate-600 dark:text-slate-300'
          } ` -->
              <span
                :class="[
                  selected ? 'font-normal' : 'font-normal',
                  'block truncate',
                ]"
                >{{ role.value }}</span
              >
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import Icon from "@/components/Icon";

import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  // ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const roleOptions = [
  {
    value: "member",
    label: "member",
  },
  {
    value: "inspectorate",
    label: "inspectorate",
  },
  {
    value: "super admin",
    label: "super admin",
  },
];

const selected = ref(roleOptions[0]);
</script>

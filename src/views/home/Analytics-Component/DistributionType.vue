<template>
  <div>
    <div class="flex border border-gray-200 rounded">
      <Button
        text="Age"
        @click="active = 'age'"
        :btnClass="`border-r h-9 py-2 rounded-[0px] flex items-center ${
          active === 'age' ? 'bg-gray-100' : ''
        }`"
      />
      <Button
        text="Gender"
        @click="active = 'gender'"
        :btnClass="`h-9 py-2 flex items-center ${
          active === 'gender' ? 'bg-gray-100' : ''
        }`"
      />
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/Button";
import { ref } from "vue";

const active = ref("age");
</script>

<style lang="scss" scoped></style>

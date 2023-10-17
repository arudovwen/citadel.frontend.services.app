<template>
  <div>
    <Card class="pb-0">
      <div class="flex items-center justify-between mb-6">
        <InputGroup
          v-model="searchText"
          class="max-w-[400px] lg:min-w-[400px]"
          type="text"
          prependIcon="heroicons-outline:search"
          merged
        />

        <Button
          text="Add new"
          icon="heroicons-outline:plus"
          btnClass="btn-primary btn-sm"
          @click="addAppointment"
        />
      </div>

      <AppointmentTable />
    </Card>
  </div>
</template>

<script setup>
import Card from "@/components/Card";
import Button from "@/components/Button";
import InputGroup from "@/components/InputGroup";
import { inject, ref } from "vue";
import AppointmentTable from "./AppointmentTable.vue";

const searchText = ref("");
const addAppointment = inject("addAppointment");
</script>

<style lang="scss" scoped></style>

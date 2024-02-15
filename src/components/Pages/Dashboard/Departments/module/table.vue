<template>
  <div class="bg-white rounded-[10px]">
    <Card noborder>
      <div class="mb-6">
        <AppTabs :tabs="tabs" className="px-5" />
      </div>
      <div class="">
        <ApprovedTable v-if="active === 'approved'" />
        <PendingTable v-if="active === 'pending'" />
        <RejectedTable v-if="active === 'rejected'" />
        <DelistedTable v-if="active === 'delisted'" />
      </div>
    </Card>
  </div>
</template>
<script setup>
import Card from "@/components/Card";
import { ref, provide } from "vue";
import ApprovedTable from "./ApprovedTable";
import PendingTable from "./PendingTable";
import RejectedTable from "./RejectedTable";
import DelistedTable from "./DelistedTable";
import AppTabs from "@/components/Tabs";

const active = ref("approved");
const tabs = [
  {
    title: "approved",
    key: "approved",
  },
  {
    title: "pending",
    key: "pending",
  },

  {
    title: "rejected",
    key: "rejected",
  },
  {
    title: "delisted",
    key: "delisted",
  },
];

provide("active", active);
</script>
<style lang="scss"></style>

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
      <!-- Tablel for export all members -->
      <div class="hidden">
        <v-pdf ref="pdf" :options="pdfOptions" :filename="`${route.params.name}-members.pdf`">
          <div class="">
            <vue-good-table :columns="columns" styleClass="vgt-table" :isLoading="deptloading"
              :rows="allDepartmentMembers || []" :sort-options="{
          enabled: false,
        }">
            </vue-good-table>
          </div>
        </v-pdf>
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
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { watch, computed } from "vue";

const { state, dispatch } = useStore();
const route = useRoute();

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

const columns = [
  {
    label: "First Name",
    field: "firstName",
  },
  {
    label: "Last Name",
    field: "lastName",
  },
  {
    label: "Phone",
    field: "phone",
  },
  {
    label: "Email",
    field: "email",
  },
  {
    label: "Phone",
    field: "phone",
  },
  {
    label: "Gender",
    field: "gender"
  },
  {
    label: "DoB",
    field: "doB",
  },
  {
    label: "Approved",
    field: "status"
  },
  {
    label: "Approval Date",
    field: "approveDate"
  },
]
dispatch('getAllDepartmentMembers', { name: route.params.name });
const allDepartmentMembers = computed(() => state.department.allDepartments)

watch(allDepartmentMembers, () => {
  console.log("a = ", allDepartmentMembers.value);
})

const pdf = ref(null);

const generateReport = () => {
  pdf?.value?.download();
}

const pdfOptions = {
  margin: 10,
  image: {
    type: "jpeg",
    quality: 1,
  },
  html2canvas: { scale: 1 },
  jsPDF: {
    unit: "mm",
    format: "a3",
    orientation: "l",
  },
};

provide("downloadPdf", generateReport)

provide("active", active);
</script>
<style lang="scss"></style>

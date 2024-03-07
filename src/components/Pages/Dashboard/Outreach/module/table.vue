<!-- eslint-disable no-unused-vars -->

<template>
  <div>
    <div v-if="isInspectorate" className="flex items-center border-b-[1px] border-b-[#DDDDDD] overflow-x-auto mb-6">
      <div v-for="tab in tabs" class="max-w-max" :key="tab">
        <div @click="currentTab = tab"
          :class="`${currentTab.toLowerCase() == tab.toLowerCase()
        ? '!border-slate-900 !text-slate-900 mr-6 '
        : 'border-transparent text-[#727272] mr-6 '
      },
          'flex cursor-pointer flex-col items-center justify-center text-nowrap border-b-[2px] pb-4 pt-6 font-semibold'`">
          <span className="text-sm capitalize">{{ tab }} </span>
        </div>
      </div>
    </div>
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <div class="flex gap-x-4 items-center">
          <InputGroup v-model="query.searchParameter" placeholder="Search" type="text"
            prependIcon="heroicons-outline:search" merged classInput="min-w-[220px] !h-9" />

          <VueTailwindDatePicker v-model="query.startDate" :formatter="formatter" input-classes="form-control h-[36px]"
            placeholder="Start date" as-single />
          <VueTailwindDatePicker v-model="query.endDate" :formatter="formatter" input-classes="form-control h-[36px]"
            placeholder="End date" as-single />
        </div>
        <div class="md:flex md:space-x-3 items-center flex-none" :class="window.width < 768 ? 'space-x-rb' : ''">
          <Button
            v-if="(permissions?.includes('CAN_CREATE_OUTREACH') && (currentTab !== 'planned outreach' && currentTab !== 'pending requests'))"
            icon="heroicons-outline:plus-sm" text="Create outreach" btnClass=" btn-primary font-normal btn-sm "
            iconClass="text-lg" @click="
      type = 'add';
    $refs.modalChange.openModal();
    " />
        </div>
      </div>
      <div class="-mx-6">
        <vue-good-table :columns="currentTab === tabs[0] ? approvedRequestcolumns : columns"
          :isLoading="outreachListLoading" mode="remote" styleClass=" vgt-table  centered " :rows="outreachs"
          :sort-options="{
      enabled: false,
    }" :pagination-options="{
      enabled: true,
      perPage: query.pageSize,
    }">
          <template v-slot:table-row="props">
            <span v-if="props.column.field == 'outreachName'" class="font-medium">
              {{ props.row.outreachName }}
            </span>
            <span v-if="props.column.field == 'approval_date'" class="font-medium">
              {{ moment(item?.dateOfBirth).format("ll") }}
            </span>
            <span v-if="props.column.field == 'status'" class="font-medium capitalize">
              <div v-if="props.row.status === true"
                class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-success-500 bg-success-500">
                Approved
              </div>
              <div v-if="props.row.status === false"
                class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-red-500 bg-red-500">
                Declined
              </div>
              <div v-if="props.row.status === null"
                class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-blue-500 bg-blue-500">
                Pending
              </div>
            </span>
            <span v-if="props.column.field == 'action'">
              <Dropdown classMenuItems=" w-[140px]">
                <span class="text-xl">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
                <template v-slot:menus>
                  <MenuItem v-for="(item, i) in filteredActions(actions, props.row)" :key="i">
                  <div @click="() => {
        selectedOutreachId = props.row.id;
        item.doit(item, props.row);
      }
      " :class="` hover:bg-slate-900
                    ${item.name === 'delete'
        ? 'bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white'
        : 'hover:bg-slate-900 hover:text-white'
      }${!props.row.status && ``
      } w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer
                    first:rounded-t last:rounded-b flex space-x-2 items-center`">
                    <span class="text-base">
                      <Icon :icon="item.icon" />
                    </span>
                    <span>{{ item.name }}</span>
                  </div>
                  </MenuItem>
                </template>
              </Dropdown>
            </span>
          </template>

          <template #pagination-bottom="">
            <div class="py-4 px-3">
              <Pagination :total="total" :current="query.pageNumber" :per-page="query.pageSize" :pageRange="pageRange"
                @page-changed="query.pageNumber = $event" :perPageChanged="perPage" enableSearch enableSelect
                :options="options">
                >
              </Pagination>
            </div>
          </template>
        </vue-good-table>
      </div>
    </Card>
  </div>

  <Modal title="Confirm action" label="Small modal"
    :themeClass="`${type === 'approve' ? 'bg-green-500' : 'bg-danger-500'}`" labelClass="btn-outline-dark" ref="modal"
    sizeClass="max-w-md">
    <div v-if="type === 'delete'" class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this request?
    </div>
    <div v-else class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to
      {{ type === "approve" ? "approve" : "reject" }} this request?
    </div>
    <div v-if="type.toLowerCase() === 'reject'">
      <textarea resize="none" v-model="rejectReason" class="px-3 py-3 border border-gray-200 rounded-lg w-full" rows="4"
        placeholder="Provide reason"></textarea>
    </div>
    <span v-if="rejectReasonErr?.length > 0" class="mt-2 text-danger-500 text-xs">
      <!-- <Icon icon="heroicons-outline:information-circle" /> -->
      {{ rejectReasonErr }}
    </span>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button text="Cancel" @click="$refs.modal.closeModal()" btnClass="btn-outline-secondary btn-sm " />
        <Button :disabled="rejectReason.length > 0 && rejectReason.trim().length()" v-if="type === 'delete'"
          text="Delete" :isLoading="deleteReportStatus.loading" :btnClass="`btn-dark btn-sm 
          ${type === 'approve' ? 'bg-green-500' : 'bg-danger-500'}`" @click="
      dispatch('deleteOutreachRequest', {
        id: selectedOutreachId,
      })
      " />
        <Button v-else :text="type === 'approve' ? 'Approve Request' : 'Reject Request'"
          :isLoading="approveOrRejectStatus.loading" :btnClass="`btn-dark btn-sm 
          ${type === 'approve' ? 'bg-green-500' : 'bg-danger-500'}`" @click="() => {
        if (
          rejectReason.length === 0 ||
          rejectReason.trim().length === 0
        ) {
          rejectReasonErr = 'Reason cannot be empty';
          return;
        }
        dispatch('approveOrRejectOutreach', {
          inspectorateId: userId,
          reason: type === 'approve' ? null : rejectReason,
          outreachLogId: selectedOutreachId,
          status: type === 'approve',
        });
      }
      " />
      </div>
    </template>
  </Modal>
  <Modal :handleClose="() => {
        modalChange.value.closeModal();
      }
      " :title="type === 'add'
        ? 'Create outreach'
        : type === 'edit'
          ? 'Edit outreach information'
          : type === 'reportadd'
            ? 'Add Report'
            : type === 'reportedit'
              ? 'Edit Report'
              : selectedOutreachData?.outreachName
      " labelClass="btn-outline-dark" ref="modalChange" sizeClass="max-w-md">
    <AddReport v-if="type === 'reportadd'" :data="selectedOutreachData" />
    <AddRecord v-if="type === 'add'" />
    <EditRecord v-if="type === 'edit'" :data="selectedOutreachData" />
    <ViewRecord v-if="type === 'view'" :data="selectedOutreachData" />
    <EditReport v-if="type === 'reportedit'" :id="selectedOutreachId" :data="selectedOutreachData" />
  </Modal>
</template>

<script setup>
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import Modal from "@/components/Modal/Modal";
import AddRecord from "../member-add.vue";
import EditRecord from "../member-edit.vue";
import ViewRecord from "../member-preview.vue";
import AddReport from "../add-report.vue";
import EditReport from "../edit-report.vue";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import { MenuItem } from "@headlessui/vue";
import { useToast } from "vue-toastification";
import window from "@/mixins/window";
import moment from "moment";
import {
  computed,
  onMounted,
  watch,
  watchEffect,
  reactive,
  ref,
  provide,
} from "vue";
import { useStore } from "vuex";

const { state, dispatch } = useStore();
const toast = useToast();
const rejectReason = ref("");
const rejectReasonErr = ref("");
const permissions = computed(() => state.auth.permissions);
const addsuccess = computed(() => state.profile.addOutreachRequestSuccess);
const addReportSuccess = computed(
  () => state.profile.createOutreachReportSuccess
);
const editsuccess = computed(() => state.profile.editOutreachRequestSuccess);
// const outreachreport = computed(() => state?.profile?.outreachReport);

const tabs = ["planned outreach", "my Outreach", "pending requests"];

const currentTab = ref(tabs[1]);

const formatter = {
  date: "DD MMM YYYY",
  month: "MMM",
};

const isInspectorate = computed(
  () => state.auth.userData.userRole.toLowerCase() === "inspectorate"
);

watch(currentTab, () => {
  query.status =
    currentTab.value === tabs[1]
      ? null
      : currentTab.value === tabs[0]
        ? "approved"
        : "pending";
  query.dateFilter = currentTab.value === tabs[0] ? "dateOfOutreach" : null;
});

watch(rejectReason, () => {
  if (rejectReason.value.length > 0 && rejectReason.value.trim().length())
    rejectReasonErr.value = "";
});

const options = [
  {
    value: "10",
    label: "10",
  },
  {
    value: "25",
    label: "25",
  },
  {
    value: "50",
    label: "50",
  },
  {
    value: "75",
    label: "75",
  },
  {
    value: "100",
    label: "100",
  },
];

const approvedRequestcolumns = [
  {
    label: "Name of Outreach",
    field: "outreachName",
  },
  {
    label: "Outreach Date",
    field: "date",
  },
  {
    label: "Location",
    field: "locationOfOutreach",
  },
  {
    label: "Action",
    field: "action",
  },
];
const columns = [
  {
    label: "Outreach Date",
    field: "date",
  },
  {
    label: "Name of Outreach",
    field: "outreachName",
  },
  {
    label: "Location",
    field: "locationOfOutreach",
  },
  {
    label: "Status",
    field: "status",
  },
  // {
  //   label: "Report Status",
  //   field: "report_added",
  // },
  {
    label: "Action",
    field: "action",
  },
];

const openDeleteModal = (typ) => {
  type.value = typ;
  modal.value.openModal();
};

const handleModal = (typ) => {
  modal.value.closeModal();
  // this.$refs.modalChange.closeModal();
  if (typ === "reject" || typ === "approve") {
    type.value = typ;
    modal.value.openModal();
  } else {
    console.log(typ);
    type.value = typ;

    modalChange.value.openModal();
  }
};

const userId = computed(() => {
  return state?.auth?.userData?.id;
});

const query = reactive({
  dateFilter: null,
  status: null,
  userId: null,
  searchParameter: "",
  startDate: "",
  endDate: "",
  pageNumber: 1,
  pageSize: 10,
});
const type = ref("");

const actions = [
  {
    name: "view",
    icon: "heroicons-outline:eye",
    doit: (data, row) => {
      selectedOutreachId.value = row.id;
      type.value = data.name;
      modalChange.value.openModal();
    },
  },
  {
    name: "edit",
    icon: "heroicons:pencil-square",
    doit: (data, row) => {
      selectedOutreachId.value = row.id;
      type.value = data.name;
      modalChange.value.openModal();
    },
  },
  {
    name: "approve",
    icon: "iconamoon:check-duotone",
    doit: (data, row) => {
      selectedOutreachId.value = row.id;
      type.value = data.name;
      modal.value.openModal();
    },
  },
  {
    name: "reject",
    icon: "iconoir:cancel",
    doit: (data, row) => {
      selectedOutreachId.value = row.id;
      type.value = data.name;
      modal.value.openModal();
    },
  },
  // {
  //   name: "report",
  //   icon: "heroicons-outline:plus-sm",
  //   doit: (data, row) => {
  //     selectedOutreachId.value = row.id;
  //     type.value = "reportadd";
  //     modalChange.value.openModal();
  //   },
  // },
  {
    name: "delete",
    icon: "heroicons-outline:trash",
    doit: (data) => {
      type.value = data.name;
      modal.value.openModal();
    },
  },
];

const modal = ref(null);
const modalChange = ref(null);
// const deleteModal = ref(true);
onMounted(() => {
  dispatch("getAllOutreach", query);
  dispatch("getAllOutreachReport", { query, pageSize: 30000 });
  dispatch("getRoles");
});



const outreachListLoading = computed(
  () => state?.profile?.getAllOutreachloading
);
const outreachs = computed(() => {
  if (state?.profile?.allOutreach?.data) {
    return state?.profile?.allOutreach.data.map((item) => {
      // item.fullName = `${item.firstName}  ${item.surName}`;
      // item.dateOfBirth = item?.dateOfBirth
      //   ? moment(item?.dateOfBirth).format("ll")
      //   : "-";
      // item.department = item?.department ? item?.department : "-";
      item.date = moment(item?.dateOfOutreach).format("ll");
      return item;
    })
    // .filter(item => new Date(item?.dateOfOutreach) > Date.now())
  }
  return [];
});

watch(query, () => {
  dispatch("getAllOutreach", query);
});

const total = computed(() => state.profile.allOutreach?.totalCount);
const editStatus = computed(() => ({
  loading: state?.profile?.editOutreachReportLoading,
  success: state?.profile?.editOutreachReportSuccess,
  error: state?.profile?.editOutreachReportreachError,
}));

const deleteReportStatus = computed(() => ({
  loading:
    state?.profile?.deleteOutreachReportLoading ||
    state?.profile?.deleteOutreachRequestLoading,
  success:
    state?.profile?.deleteOutreachReportSuccess ||
    state?.profile?.deleteOutreachRequestSuccess,
  error:
    state?.profile?.deleteOutreachReportreachError ||
    state?.profile?.deleteOutreachRequestError,
}));

watch([addsuccess], () => {
  if (addsuccess.value === true) {
    modalChange.value.closeModal();
    dispatch("getAllOutreach", query);
    toast.success("Outreach request added");
  }
});

watch([addReportSuccess], () => {
  if (addReportSuccess.value === true) {
    modalChange.value.closeModal();
    dispatch("getAllOutreach", query);
    toast.success("Outreach request added");
  }
});

watch([editsuccess], () => {
  if (editsuccess.value === true) {
    modalChange.value.closeModal();
    dispatch("getAllOutreach", query);
    toast.success("Outreach request updated");
  }
});

watch([deleteReportStatus], () => {
  if (deleteReportStatus.value.success) {
    modalChange.value.closeModal();
    modal.value.closeModal();
    dispatch("getAllOutreach", query);

    toast.success("Outreach request deleted");
  }
});
watch(editStatus, () => {
  if (editStatus.value.success === true) {
    modalChange.value.closeModal();
    dispatch("getAllOutreach", query);
    dispatch("getRoles");
    toast.success("Outreach report updated");
  }
});
function perPage({ currentPerPage }) {
  query.pageNumber = 1;
  query.pageSize = currentPerPage;
}

const selectedOutreachId = ref(null);

watch(selectedOutreachId, () => {
  console.log(selectedOutreachId.value);
});

const selectedOutreachData = computed(() => {
  if (!selectedOutreachId.value) return null;
  const value = outreachs.value.find((i) => i.id === selectedOutreachId.value);
  return value;
});

const filteredActions = (actions, row) => {
  let actions2 = [...actions];
  if (!state.auth?.permissions.includes("CAN_APPROVE_REJECT_OUTREACH")) {
    actions2 = actions2.filter(
      (i) => i.name !== "approve" && i.name !== "reject"
    );
  }

  if (row.status !== null || row.userId !== userId.value) {
    actions2 = actions2.filter((i) => i.name !== "edit");
  }
  if (row.status !== null || row.userId !== userId.value)
    actions2 = actions2.filter((i) => i.name !== "delete");

  if (row.status !== true) {
    actions2 = actions2.filter((i) => i.name !== "report");
  }

  if (row.status === true || row.status === false)
    actions2 = actions2.filter(
      (i) => i.name !== "reject" && i.name !== "approve"
    );

  return actions2;
};

const approveOrRejectStatus = computed(() => ({
  loading: state?.profile?.approveOrRejectOutreachLoading,
  success: state?.profile?.approveOrRejectOutreachSuccess,
  error: state?.profile?.approveOrRejectOutreachError,
}));

const createOutreachReportStatus = computed(() => ({
  loading: state?.profile?.createOutreachReportLoading,
  success: state?.profile?.createOutreachReportSuccess,
  error: state?.profile?.createOutreachReportError,
}));

provide("handleModal", handleModal);
provide("openDeleteModal", openDeleteModal);
provide("createOutreachReportStatus", createOutreachReportStatus);

watch(selectedOutreachData, () => {
  console.log(selectedOutreachData);
});

watch([approveOrRejectStatus], () => {
  rejectReason.value = "";
  rejectReasonErr.value = "";
  if (approveOrRejectStatus.value.success) {
    modal.value.closeModal();
    modalChange.value.closeModal();
    toast.success(
      `Request ${type.value === "approve" ? "approval" : "rejection"
      } was successful`
    );
    dispatch("getAllOutreach", query);
    dispatch("getRoles");
  }
  if (approveOrRejectStatus.value.error) {
    toast.error(
      `Request ${type.value === "approve" ? "approval" : "rejection"} failed`
    );
  }
});

watchEffect(selectedOutreachId, () => {
  selectedOutreachId.value;
  rejectReason.value = "";
  rejectReasonErr.value = "";
  dispatch("getOutreachById", { id: selectedOutreachId.value });
});
</script>

<style lang="scss"></style>

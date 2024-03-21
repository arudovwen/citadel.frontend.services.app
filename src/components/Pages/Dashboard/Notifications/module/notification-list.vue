<template>
  <div>
    <div
      class="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:justify-between md:items-center mb-6 md:mb-4 w-full md:w-auto"
    >
      <div></div>
      <CreateNotification :options="members" @refresh="refresh" />
    </div>

    <div class="">
      <vue-good-table
        :columns="columns"
        styleClass="vgt-table"
        :isLoading="loading"
        :rows="notifications || []"
        :sort-options="{
          enabled: false,
        }"
        :pagination-options="{
          enabled: true,
          perPage: query.pageSize,
        }"
      >
        <template v-slot:table-row="props">
          <span v-if="props.column.field == 'createdAt'" class="">
            {{ moment(props.row.createdAt).format("ll") }}
          </span>
          <span
            v-if="props.column.field == 'message'"
            class="max-w-[300px] truncate block"
          >
            {{ props?.row?.message }}
          </span>
          <span v-if="props.column.field == 'title'"
            >{{ props.row.title || "Notification" }}
          </span>
          <span
            :class="`${
              props.row.status === 'sent' || !props.row.status
                ? 'text-green-600'
                : 'text-blue-600'
            }`"
            v-if="props.column.field == 'status'"
            >{{ props.row.status || "Sent" }}
          </span>
          <span v-if="props.column.field == 'notifyType'"
            >{{ getTextForKey(props.row.notifyType) }}
          </span>
          <span v-if="props.column.field == 'action'">
            <Dropdown classMenuItems=" w-[140px]">
              <span class="text-xl"
                ><Icon icon="heroicons-outline:dots-vertical"
              /></span>
              <template v-slot:menus>
                <MenuItem
                  v-for="(item, i) in filterActions(props.row.status)"
                  :key="i"
                >
                  <div
                    @click="item.doit(props.row)"
                    :class="{
                      'bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white':
                        item.name === 'delete',
                      'hover:bg-slate-900 hover:text-white':
                        item.name !== 'delete',
                    }"
                    class="w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center"
                  >
                    <span class="text-base">
                      <Icon :icon="item.icon" />
                    </span>
                    <span>{{ item.name }}</span>
                  </div>
                </MenuItem>
              </template>
            </Dropdown>
            <!-- <span v-else class="cursor-not-allowed text-xl"
                  ><Icon icon="heroicons-outline:dots-vertical"
                /></span> -->
          </span>
        </template>
        <template #pagination-bottom>
          <div class="py-4 px-3">
            <Pagination
              :total="total"
              :current="query.pageNumber"
              :per-page="query.pageSize"
              :pageRange="5"
              @page-changed="query.pageNumber = $event"
              :perPageChanged="perPage"
              enableSearch
              enableSelect
              :options="options"
            >
              >
            </Pagination>
          </div>
        </template>
      </vue-good-table>
    </div>
  </div>
  <Modal
    title="Delete request"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this request?
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          :disabled="deleteloading"
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm"
          @click="$refs.modal.closeModal()"
        />
        <Button
          text="Delete"
          :isLoading="deleteloading"
          :disabled="deleteloading"
          btnClass="btn-danger btn-sm"
          @click="handleDelete"
        />
      </div>
    </template>
  </Modal>
  <Modal
    :title="
      type === 'add'
        ? 'Request Notification'
        : type === 'edit'
        ? 'Edit Notification'
        : 'Notification detail'
    "
    labelClass="btn-outline-dark"
    ref="modalChange"
    sizeClass="max-w-lg"
  >
    <EditNotification v-if="type === 'edit'" :detail="detail" />
    <ViewNotification v-if="type === 'view'" :detail="detail" />
  </Modal>
</template>

<script setup>
import Button from "@/components/Button";
import Modal from "@/components/Modal/Modal";
import CreateNotification from "../create-notification";
import Dropdown from "@/components/Dropdown";
import Pagination from "@/components/Pagination";
import { useStore } from "vuex";
import { computed, onMounted, reactive, ref } from "vue";
import moment from "moment";
import Icon from "@/components/Icon";
import { MenuItem } from "@headlessui/vue";
import EditNotification from "../member-edit";
import ViewNotification from "../member-preview";

const type = ref(null);
const modalChange = ref(null);
const modal = ref(null);
const { state, dispatch } = useStore();
const query = reactive({
  pageNumber: 1,
  pageSize: 25,
  sortOrder: "",
  searchParameter: "",
  FromDate: "",
  EndDate: "",
  searchParams: "",
});
const memberQuery = reactive({
  pageNumber: 1,
  pageSize: 2500000,
});
onMounted(() => {
  dispatch("getNotifications", query);
  dispatch("getAffiliationByMemberQuery", memberQuery);
});
function refresh() {
  dispatch("getNotifications", query);
}
// const statusText = {
//   none: 0,
//   EventRejection: 1,
//   EventApproval: 2,
//   WelcomeEmail: 3,
//   DepartmentApproval: 4,
//   DepartmentRejection: 5,
//   CIHCenterZoneApproval: 6,
//   CIHCenterZoneRejection: 7,
//   JoinDepartmentRequest: 8,
//   CIHRoleChange: 9,
//   GeneralEmail: 10,
// };

function getTextForKey(key) {
  const lowerCaseKey = key?.toLowerCase();
  switch (lowerCaseKey) {
    case "none":
      return "None";
    case "eventrejection":
      return "Event Rejection";
    case "eventapproval":
      return "Event Approval";
    case "welcomeemail":
      return "Welcome Email";
    case "departmentapproval":
      return "Department Approval";
    case "departmentrejection":
      return "Department Rejection";
    case "cihcenterzoneapproval":
      return "CIH Center Zone Approval";
    case "cihcenterzonerejection":
      return "CIH Center Zone Rejection";
    case "joindepartmentrequest":
      return "Join Department Request";
    case "cihrolechange":
      return "CIH Role Change";
    case "generalemail":
      return "General Email";
    default:
      return "General Email";
  }
}

const members = computed(() =>
  state?.member?.data?.map((i) => {
    return {
      label: `${i.firstName} ${i.surName}`,
      value: i.email,
    };
  })
);
const detail = ref(null);
const notifications = computed(() => state.notification.notifications);
const loading = computed(() => state.notification.getNotificationLoading);
const total = computed(() => state.notification.total);
const options = [
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
// const success = computed(() => state.notification.getNotificationSuccess);
const columns = [
  {
    label: "Date",
    field: "createdAt",
  },

  {
    label: "title",
    field: "title",
  },
  {
    label: "Message",
    field: "message",
  },

  {
    label: "type",
    field: "notifyType",
  },

  {
    label: "status",
    field: "status",
  },
  {
    label: "action",
    field: "action",
  },
];
const actions = [
  {
    name: "view",
    icon: "heroicons-outline:eye",
    doit: (item) => {
      detail.value = item;
      type.value = "view";
      modalChange.value.openModal();
    },
  },
  {
    name: "edit",
    icon: "heroicons-outline:eye",
    doit: (item) => {
      detail.value = item;
      type.value = "edit";
      modalChange.value.openModal();
    },
  },
  {
    name: "delete",
    icon: "heroicons-outline:trash",
    doit: (tempType, item) => {
      detail.value = item;
      modal.value.openModal();
    },
  },
];

function perPage({ currentPerPage }) {
  query.pageNumber = 1;
  query.pageSize = currentPerPage;
}
function filterActions(status) {
  if (status === "sent" || !status) {
    return actions.filter((i) => i.name === "view");
  }
  return actions;
}
</script>
<style lang=""></style>

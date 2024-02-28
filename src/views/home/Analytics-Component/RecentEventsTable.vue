<template>
  <div>
    <vue-good-table
      :columns="columns"
      styleClass=" vgt-table  lesspadding2 centered "
      :rows="eventRequests || []"
      :isLoading="$store.state?.event?.loading"
      :pagination-options="{
        enabled: true,
        perPage: perpage,
      }"
      :sort-options="{
        enabled: false,
      }"
    >
      <template v-slot:table-row="props">
        <span
          v-if="props.column.field == 'eventType'"
          class="text-slate-500 dark:text-slate-400"
        >
          {{
            eventsOptions.find((i) => i.value === props.row.eventType)?.label ||
            "-"
          }}
        </span>
        <span
          v-if="props.column.field == 'createdAt'"
          class="text-slate-500 dark:text-slate-400"
        >
          {{ moment(props.row.createdAt).format("ll") }}
        </span>
        <span
          v-if="props.column.field == 'eventDate'"
          class="text-slate-500 dark:text-slate-400"
        >
          {{ moment(props.row.eventDate).format("ll") }}
        </span>
        <span
          v-if="props.column.field == 'requesterName'"
          class="text-slate-500 dark:text-slate-400"
        >
          <router-link
            class="hover:underline"
            :to="`/profile/${props.row.userId}`"
            >{{ props.row.requesterName }}</router-link
          >
        </span>
        <span v-if="props.column.field == 'status'" class="block w-full">
          <span
            class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
            :class="`${
              props.row.status === true ? 'text-success-500 bg-success-500' : ''
            } 
            ${props.row.status === false ? 'text-red-500 bg-red-500' : ''}
            ${props.row.status === null ? 'text-blue-500 bg-blue-500' : ''}
            
             `"
          >
            {{
              props.row.status === null
                ? "Pending"
                : props.row.status === false
                ? "declined"
                : "Approved"
            }}
          </span>
        </span>
        <span v-if="props.column.field == 'action'">
          <div class="flex space-x-3 justify-start">
            <!-- <Tooltip placement="top" arrow theme="dark">
              <template #button>
                <div class="action-btn">
                  <Icon icon="heroicons:eye" />
                </div>
              </template>
              <span> View</span>
            </Tooltip> -->
            <Tooltip placement="top" arrow theme="dark">
              <template #button>
                <div
                  @click="approveIt('approve', props.row)"
                  class="action-btn"
                >
                  <Icon icon="ph:check" />
                </div>
              </template>
              <span> Approve</span>
            </Tooltip>
            <Tooltip placement="top" arrow theme="dark">
              <template #button>
                <div @click="approveIt('reject', props.row)" class="action-btn">
                  <Icon icon="ph:x-light" />
                </div>
              </template>
              <span> Reject</span>
            </Tooltip>
          </div>
        </span>
      </template>
      <template #pagination-bottom="">
        <div class="py-4 px-3 flex justify-center">
          <!-- <Pagination
              :total="50"
              :current="current"
              :per-page="perpage"
              :pageRange="pageRange"
              @page-changed="current = $event"
              :pageChanged="props.pageChanged"
              :perPageChanged="props.perPageChanged"
            >
              >
            </Pagination> -->
        </div>
      </template>
    </vue-good-table>
  </div>
  <Modal
    title="Confirm action"
    label="Small modal"
    labelClass="btn-outline-dark"
    ref="modalStatus"
    sizeClass="max-w-md"
    :themeClass="`${type === 'approve' ? 'bg-green-500' : 'bg-danger-500'}`"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to {{ type.toLowerCase() }} this request?
    </div>
    <div v-if="type.toLowerCase() === 'reject'">
      <textarea
        resize="none"
        class="px-3 py-3 border border-gray-200 rounded-lg w-full"
        rows="4"
        placeholder="Provide reason"
        v-model="comment"
      ></textarea>
    </div>
    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          :disabled="updateloading"
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm "
          @click="$refs.modalStatus.closeModal()"
        />
        <Button
          :disabled="
            updateloading || (!comment && type.toLowerCase() === 'reject')
          "
          :isLoading="updateloading"
          text="Proceed"
          :btnClass="` btn-sm ${
            type === 'approve' ? 'btn-success' : 'btn-danger'
          }`"
          @click="handleStatus"
        />
      </div>
    </template>
  </Modal>
  <Modal
    :title="'View event'"
    labelClass="btn-outline-dark"
    ref="modalChange"
    sizeClass="max-w-lg"
  >
    <ViewEvent />
  </Modal>
</template>
<script>
import Icon from "@/components/Icon";
import Button from "@/components/Button";

import { eventsOptions } from "@/constant/data";
import moment from "moment";
import { inject, ref, computed, watch } from "vue";
import Tooltip from "@/components/Tooltip";
import Modal from "@/components/Modal/Modal";
import { useStore } from "vuex";
import ViewEvent from "@/components/eventRequestPreview";
import { useToast } from "vue-toastification";

// import Pagination from "@/components/Pagination";
export default {
  components: {
    // Pagination,

    Icon,
    Tooltip,
    Modal,
    ViewEvent,
    Button,
  },
  setup() {
    const { state, dispatch } = useStore();
    const toast = useToast();

    const eventRequests = inject("eventRequests");
    const getAllEvents = inject("getAllEvents");
    const comment = ref("");
    const modalStatus = ref(null);
    const modalChange = ref(null);
    const detail = ref(null);
    const type = ref(null);
    const updateloading = computed(() => state.event.updateloading);
    const updatesuccess = computed(() => state.event.updatesuccess);

    const openModal = () => {
      modalStatus.value.openModal();
    };
    const closeModal = () => {
      modalStatus.value.closeModal();
    };
    const handleStatus = () => {
      const data = {
        approveUserId: state.auth.userData.id,
        reqUserId: detail.value.userId,
        actionId: detail.value.id,
        Comments: comment.value,
        status: type.value === "approve" ? true : false,
      };

      dispatch("updateEventStatus", data);
    };
    const viewIt = (name, request) => {
      type.value = name;
      detail.value = request;

      modalChange.value.openModal();
    };
    const approveIt = (name, request) => {
      type.value = name;
      detail.value = request;
      openModal();
    };
    const rejectIt = (name, request) => {
      type.value = name;
      detail.value = request;
      openModal();
    };
    watch(updatesuccess, () => {
      if (updatesuccess.value) {
        getAllEvents();
        closeModal();
        toast.success("Request updated");
      }
    });
    return {
      eventRequests,
      comment,
      modalStatus,
      openModal,
      closeModal,
      type,
      viewIt,
      handleStatus,
      approveIt,
      rejectIt,
      modalChange,
      updateloading,
    };
  },

  data() {
    return {
      moment,
      eventsOptions,
      current: 1,
      perpage: 10,
      pageRange: 5,
      searchTerm: "",

      options: [
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
      ],
      columns: [
        {
          label: "Request Date",
          field: "createdAt",
        },

        {
          label: "Event Type",
          field: "eventType",
        },
        {
          label: "Requester Name",
          field: "requesterName",
        },

        {
          label: "Event date",
          field: "eventDate",
        },
        {
          label: "Status",
          field: "status",
        },

        {
          label: "Action",
          field: "action",
        },
      ],
      advancedTable: [
        {
          id: 46,
          requesterName: "Inspectorate Kaine",
          requestType: "eventRequest",
          eventType: "babyChristening",
          status: null,
          eventDate: "2024-02-21T12:00:00",
          actionDescription: null,
          userId: "7d6ae16f-d2a7-4b6b-b7ae-eaaa1cdb6321",
          actionDate: "2024-02-21T11:55:15.024715",
          reason: "I just hate it",
          actionByUserId: "7d6ae16f-d2a7-4b6b-b7ae-eaaa1cdb6321",
          actionByName: "Inspectorate Is Kaine",
          zone: null,
          center: null,
          createdAt: "2024-02-20T17:23:13.527964",
        },
        {
          id: 47,
          requesterName: "Inspectorate Kaine",
          requestType: "eventRequest",
          eventType: "specialThanksgiving",
          status: true,
          eventDate: "2024-02-29T12:00:00",
          actionDescription: null,
          userId: "7d6ae16f-d2a7-4b6b-b7ae-eaaa1cdb6321",
          actionDate: "2024-02-21T11:50:26.24478",
          reason: null,
          actionByUserId: "7d6ae16f-d2a7-4b6b-b7ae-eaaa1cdb6321",
          actionByName: "Inspectorate Is Kaine",
          zone: null,
          center: null,
          createdAt: "2024-02-20T17:44:57.696354",
        },
        {
          id: 48,
          requesterName: "Inspectorate Kaine",
          requestType: "eventRequest",
          eventType: "specialThanksgiving",
          status: null,
          eventDate: "2024-02-09T12:00:00",
          actionDescription: null,
          userId: "7d6ae16f-d2a7-4b6b-b7ae-eaaa1cdb6321",
          actionDate: "2024-02-20T18:15:56.288299",
          reason: null,
          actionByUserId: "7d6ae16f-d2a7-4b6b-b7ae-eaaa1cdb6321",
          actionByName: "Inspectorate Is Kaine",
          zone: null,
          center: null,
          createdAt: "2024-02-20T17:45:15.722485",
        },
        {
          id: 50,
          requesterName: "Adeleke Laketu",
          requestType: "eventRequest",
          eventType: "babyChristening",
          status: null,
          eventDate: "2024-02-25T12:00:00",
          actionDescription: null,
          userId: "67a403c1-fafa-485b-9c2d-68c67eda0587",
          actionDate: "2024-02-21T10:44:59.390468",
          reason: null,
          actionByUserId: "67a403c1-fafa-485b-9c2d-68c67eda0587",
          actionByName: "Adeleke  Laketu",
          zone: null,
          center: null,
          createdAt: "2024-02-21T10:33:27.192117",
        },
        {
          id: 51,
          requesterName: "Adeleke Laketu",
          requestType: "eventRequest",
          eventType: "houseWarming",
          status: null,
          eventDate: "2024-02-21T12:00:00",
          actionDescription: null,
          userId: "67a403c1-fafa-485b-9c2d-68c67eda0587",
          actionDate: "2024-02-21T10:45:53.29026",
          reason: null,
          actionByUserId: "67a403c1-fafa-485b-9c2d-68c67eda0587",
          actionByName: "Adeleke  Laketu",
          zone: null,
          center: null,
          createdAt: "2024-02-21T10:45:34.198592",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.action-btn {
  @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
}
</style>

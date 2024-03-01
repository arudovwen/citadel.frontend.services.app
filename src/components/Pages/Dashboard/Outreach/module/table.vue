<template>
  <div>
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
          <Button v-if="permissions?.includes('CAN_CREATE_OUTREACH')" icon="heroicons-outline:plus-sm"
            text="Create outreach" btnClass=" btn-primary font-normal btn-sm " iconClass="text-lg" @click="

              type = 'add';
            $refs.modalChange.openModal();
            " />
        </div>
      </div>
      <div class="-mx-6">
        <vue-good-table :columns="columns" :isLoading="outreachListLoading" mode="remote"
          styleClass=" vgt-table  centered " :rows="outreachs" :sort-options="{
            enabled: false,
          }" :pagination-options="{
  enabled: true,
  perPage: query.pageSize,
}">
          <template v-slot:table-row="props">
            <span v-if="props.column.field == 'outreachName'" class="font-medium lowercase">
              {{ props.row.outreachName }}
            </span>
            <span v-if="props.column.field == 'status'" class="font-medium lowercase">
              <div v-if="props.row.status === true"
                class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-success-500 bg-success-500">
                approved
              </div>
              <div v-if="props.row.status === false"
                class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-red-500 bg-red-500">
                rejected
              </div>
              <div v-if="props.row.status === null"
                class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-blue-500 bg-blue-500">
                pending
              </div>
            </span>

            <span v-if="props.column.field == 'action'">
              <Dropdown classMenuItems=" w-[140px]">
                <span class="text-xl">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
                <template v-slot:menus>
                  <MenuItem v-for="(item, i) in filteredActions(actions, props.row)" :key="i">
                  <div @click="item.doit(item, props.row)" :class="`
                    ${item.name === 'delete'
                      ? 'bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100'
                      : 'hover:bg-slate-900'
                    }${!props.row.status && ``} w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer
                    first:rounded-t last:rounded-b flex space-x-2 items-center hover:text-white`">
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
          <template #pagination-bottom="props">
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
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to {{ type === "approve" ? "approve" : "reject" }} this request?
    </div>
    <!-- <div v-if="type.toLowerCase() === 'reject'">
      <textarea resize="none" v-model="rejectReason" class="px-3 py-3 border border-gray-200 rounded-lg w-full" rows="4"
        placeholder="Provide reason"></textarea>
    </div> -->
    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button text="Cancel" btnClass="btn-outline-secondary btn-sm " />
        <Button text="Proceed" :isLoading="approveOrRejectStatus.loading" :btnClass="`btn-dark btn-sm 
          ${type === 'approve' ? 'bg-green-500' : 'bg-danger-500'}`" @click="dispatch('approveOrRejectOutreach', {
            inspectorateId: userId,
            outreachLogId: selectedOutreachId,
            status: type === 'approve',
          })" />
      </div>
    </template>
  </Modal>
  <Modal :title="type === 'add'
    ? 'Create outreach'
    : type === 'edit'
      ? 'Edit outreach information'
      : type === 'reportadd'
        ? 'Add Report'
        : type === 'reportedit'
          ? 'Edit Report'
          : 'View outreach information'
    " labelClass="btn-outline-dark" ref="modalChange" sizeClass="max-w-3xl">
    <AddRecord v-if="type === 'add'" />
    <EditRecord v-if="type === 'edit'" />
    <ViewRecord v-if="type === 'view'" />
    <AddReport v-if="type === 'reportadd'" />
    <EditReport v-if="type === 'reportedit'" />
  </Modal>
</template>
<script>
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
import { advancedTable } from "@/constant/basic-tablle-data";
import window from "@/mixins/window";
import { computed, onMounted, watch, watchEffect, reactive, ref } from "vue";
import { useStore } from "vuex"


export default {
  mixins: [window],
  components: {
    Pagination,
    InputGroup,
    Dropdown,
    Icon,
    Card,
    MenuItem,
    Button,
    Modal,
    AddRecord,
    EditRecord,
    ViewRecord,
    AddReport,
    EditReport,
    VueTailwindDatePicker,
  },
  provide() {
    return {
      handleModal: this.handleModal,
    };
  },
  data() {
    return {
      advancedTable,
      current: 1,
      pageRange: 5,
      isOpen: false,
      id: null,
      confirmType: "",
      dateValue: null,
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      options: [
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
      ],
      columns: [
        {
          label: "Date",
          field: "date",
        },
        {
          label: "Name",
          field: "outreachName",
        },
        {
          label: "Location",
          field: "locationOfOutreach",
        },

        {
          label: "Description",
          field: "description",
        },

        {
          label: "Status",
          field: "status",
        },
        {
          label: "Report Added",
          field: "report_added",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },

  methods: {
    handleModal(type) {
      this.$refs.modal.closeModal();
      // this.$refs.modalChange.closeModal();
      if (type === "decline" || type === "approve") {
        this.confirmType = type;
        this.$refs.modal.openModal();
      } else {
        type = type;

        this.$refs.modalChange.openModal();
      }
    },

  },
  setup() {
    const { state, dispatch } = useStore();
    const toast = useToast()
    const rejectReason = ref("");
    const permissions = computed(() => state.auth.permissions);
    const addsuccess = computed(() => state.profile.addOutreachRequestSuccess)
    const query = reactive({
      searchParameter: "",
      startDate: "",
      endDate: "",
      pageNumber: 1,
      pageSize: 10,
    });
    const type = ref("");

    const userRole = computed(() => {
      return state?.auth?.userData?.userRole;
    });
    const userId = computed(() => {
      return state?.auth?.userData?.id;
    });

    const actions = [
      {
        name: "view",
        icon: "heroicons-outline:eye",
        doit: (data) => {
          type.value = data.name;
          modalChange.value.openModal();
        },
      },
      {
        name: "edit",
        icon: "heroicons:pencil-square",
        doit: (data) => {
          type.value = data.name;
          modalChange.value.openModal();
        },
      },
      {
        name: "approve",
        icon: "iconamoon:check-duotone",
        doit: (data, row) => {
          selectedOutreachId.value = row.id
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
      {
        name: "delete",
        icon: "heroicons-outline:trash",
        doit: (data) => {
          type.value = data.name;
          modal.value.openModal();
        },
      },
    ]

    const modal = ref(null);
    const modalChange = ref(null);
    onMounted(() => {
      dispatch("getAllOutreach", query);
      dispatch("getRoles");
    });

    const outreachListLoading = computed(() => state?.profile?.getAllOutreachloading);
    const outreachs = computed(() => {
      if (state?.profile?.allOutreach?.data) {
        return state?.profile?.allOutreach.data.map((item) => {
          // item.fullName = `${item.firstName}  ${item.surName}`;
          // item.dateOfBirth = item?.dateOfBirth
          //   ? moment(item?.dateOfBirth).format("ll")
          //   : "-";
          // item.department = item?.department ? item?.department : "-";
          item.date = new Date(item?.dateOfOutreach).toLocaleDateString()
          return item;
        });
      }
      return [];
    });


    watch(query, () => {
      dispatch("getAllOutreach", query);
    })

    const total = computed(() => state.profile.allOutreach?.totalCount);
    watch(addsuccess, () => {
      if (addsuccess.value === true) {
        modalChange.value.closeModal();
        dispatch("getAllOutreach", query);
        dispatch("getRoles");
        toast.success("Outreach request added");
      }
    })
    function perPage({ currentPerPage }) {
      query.pageNumber = 1;
      query.pageSize = currentPerPage;
    }

    const selectedOutreachId = ref(null);

    const filteredActions = (actions, row) => {
      let actions2 = [...actions]
      if (userRole.value !== "Inspectorate") {
        actions2 = actions2.filter(i => i.name !== "approve" && i.name !== "reject");
      }

      if (row.status === true)
        actions2 = actions2.filter(i => i.name !== "approve");

      if (row.status === false)
        actions2 = actions2.filter(i => i.name !== "reject");

      return actions2;
    }

    const approveOrRejectStatus = computed(() => ({
      loading: state?.profile?.approveOrRejectOutreachLoading,
      success: state?.profile?.approveOrRejectOutreachSuccess,
      error: state?.profile?.approveOrRejectOutreachError
    }))

    watch(approveOrRejectStatus, () => {
      if (approveOrRejectStatus.value.success) {
        modal.value.closeModal();
        toast.success(`Request ${type.value === "approve" ? 'approval' : 'rejection'} was successful`)
        dispatch("getAllOutreach", query);
        dispatch("getRoles");
      }
      if (approveOrRejectStatus.value.error) {
        toast.error(`Request ${type.value === "approve" ? 'approval' : 'rejection'} failed`)
      }
    })

    return {
      permissions,
      outreachs,
      modalChange,
      modal,
      query,
      outreachListLoading,
      total,
      perPage,
      actions,
      userRole,
      filteredActions,
      type,
      rejectReason,
      dispatch,
      approveOrRejectStatus,
      userId,
      selectedOutreachId
    };
  },
};
</script>
<style lang="scss"></style>

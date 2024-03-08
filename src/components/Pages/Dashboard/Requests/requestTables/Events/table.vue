<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <div>
          <div class="flex gap-x-4 items-center">
            <InputGroup
              v-model="query.searchParameter"
              placeholder="Search"
              type="text"
              prependIcon="heroicons-outline:search"
              merged
              classInput="min-w-[220px] !h-9"
            />
            <VueTailwindDatePicker
              v-model="query.dateValue"
              :formatter="formatter"
              input-classes="form-control h-[36px] min-w-[250px]"
              placeholder="Filter date range"
            />
            <VueSelect
              class="min-w-[250px] w-full md:w-auto"
              v-model="eventType"
              :options="eventsOption"
              placeholder="Filter type"
              name="filterType"
            />
            <!-- <VueSelect
              class="min-w-[150px] w-full md:w-auto"
              v-model="selectedZone"
              :options="zoneOptions"
              placeholder="Filter zone"
              name="zone"
            /> -->
            <!-- <VueSelect
            class="min-w-[200px] w-full md:w-auto"
            v-model="center"
            :options="zoneOptions"
            placeholder="Filter center"
            name="center"
          /> -->
          </div>
        </div>
        <!-- <div
          v-if="permissions.includes('CAN_CREATE_EVENTS')"
          class="md:flex md:space-x-3 items-center flex-none"
          :class="window.width < 768 ? 'space-x-rb' : ''"
        >
          <Button
            icon="heroicons-outline:plus-sm"
            text="Request Event"
            btnClass=" btn-primary font-normal btn-sm "
            iconClass="text-lg"
            @click="
              () => {
                type = 'add';
                $refs.modalChange.openModal();
              }
            "
          />
        </div> -->
      </div>
      <div class="-mx-6">
        <vue-good-table
          :columns="filteredColumns"
          mode="remote"
          :isLoading="loading"
          styleClass=" vgt-table  centered "
          :rows="events || []"
          :sort-options="{
            enabled: false,
          }"
          :pagination-options="{
            enabled: true,
            perPage: perpage,
          }"
        >
          <template v-slot:table-row="props">
            <span
              v-if="props.column.field == 'eventType'"
              class="text-slate-500 dark:text-slate-400"
            >
              {{
                eventsOption.find((i) => i.value === props.row.eventType)
                  ?.label || "-"
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
                  props.row.status === true
                    ? 'text-success-500 bg-success-500'
                    : ''
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
              <Dropdown classMenuItems=" w-[140px]">
                <span class="text-xl"
                  ><Icon icon="heroicons-outline:dots-vertical"
                /></span>
                <template v-slot:menus>
                  <MenuItem
                    v-for="(item, i) in handleAction(props.row.status)"
                    :key="i"
                  >
                    <div
                      @click="
                        () => {
                          generateAction(item.name, props.row.id).doit(
                            item.name,
                            props.row
                          );
                        }
                      "
                      :class="`
                
                  ${
                    generateAction(item.name, props.row.id).name === 'delete'
                      ? 'bg-danger-500 text-danger-500 bg-opacity-30  hover:bg-opacity-100 hover:text-white'
                      : 'hover:bg-slate-900 hover:text-white'
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center `"
                    >
                      <span class="text-base"
                        ><Icon
                          :icon="generateAction(item.name, props.row.id).icon"
                      /></span>
                      <span>{{
                        generateAction(item.name, props.row.id).name
                      }}</span>
                    </div>
                  </MenuItem>
                </template>
              </Dropdown>
            </span>
          </template>
          <template #pagination-bottom>
            <div class="py-4 px-3">
              <Pagination
                :total="total"
                :current="query.pageNumber"
                :per-page="query.pageSize"
                :pageRange="5"
                :perPageChanged="perPage"
                @page-changed="query.pageNumber = $event"
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
    </Card>
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
        ? 'Request event'
        : type === 'edit'
        ? 'Edit Event'
        : 'View event'
    "
    labelClass="btn-outline-dark"
    ref="modalChange"
    sizeClass="max-w-lg"
  >
    <AddEvent v-if="type === 'add'" />
    <EditEvent v-if="type === 'edit'" :detail="detail" />
    <ViewEvent v-if="type === 'view'" />
  </Modal>
</template>
<script>
import { eventsOptions } from "@/constant/data";

import { onMounted, reactive, watch, computed, ref } from "vue";
import { useStore } from "vuex";
import VueSelect from "@/components/Select/VueSelect";
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal/Modal";
import { MenuItem } from "@headlessui/vue";
import { advancedTable } from "@/constant/basic-tablle-data";
import AddEvent from "./addevent.vue";
import EditEvent from "./editevent.vue";
import ViewEvent from "./preview.vue";
import { debounce } from "lodash";
import { useToast } from "vue-toastification";
// eslint-disable-next-line no-unused-vars
import moment from "moment";
import window from "@/mixins/window";

export default {
  mixins: [window],
  components: {
    AddEvent,
    EditEvent,
    ViewEvent,
    Pagination,
    InputGroup,
    Modal,
    Dropdown,
    Icon,
    Card,
    MenuItem,
    Button,
    VueSelect,
    VueTailwindDatePicker,
  },

  data() {
    return {
      advancedTable,
      comment: "",
      detail: null,
      perpage: 10,
      pageRange: 5,
      searchParameter: "",
      filterType: "",
      type: "",
      id: null,
      filters: ["all", "pending"],
      activeFilter: "",
      dateValue: [],
      center: "",
      zone: "",

      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      actions: [
        {
          name: "approve",
        },
        {
          name: "reject",
        },
      ],
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
    };
  },
  methods: {
    handleAction(status) {
      let newaction = this.actions;

      if (status === true) {
        return newaction.filter((i) => i.name == "view");
      }
      if (status === false) {
        return newaction.filter((i) => i.name === "view");
      }
      return newaction;
    },

    handleDelete() {
      this.$store.dispatch("removeEvent", { id: this.id });
    },
    handleStatus() {
      const data = {
        approveUserId: this.$store.state.auth.userData.id,
        reqUserId: this.detail.userId,
        actionId: this.detail.id,
        Comments: this.comment,
        status: this.type === "approve" ? true : false,
      };

      this.$store.dispatch("updateEventStatus", data);
    },
    generateAction(name, id) {
      this.id = id;

      const actions = {
        // view: {
        //   name: "view",
        //   icon: "heroicons-outline:eye",
        //   doit: () => {
        //     this.$refs.modalChange.openModal();
        //   },
        // },
        approve: {
          name: "approve",
          icon: "ph:check",
          doit: (data, detail) => {
            this.type = data;
            this.detail = detail;
            this.$refs.modalStatus.openModal();
          },
        },
        // edit: {
        //   name: "edit",
        //   icon: "heroicons:pencil-square",
        //   doit: (data, detail) => {
        //     this.type = data;
        //     this.detail = detail;
        //     this.$refs.modalChange.openModal();
        //   },
        // },
        reject: {
          name: "reject",
          icon: "ph:x-light",
          doit: (data, detail) => {
            this.type = data;
            this.detail = detail;
            this.$refs.modalStatus.openModal();
          },
        },
        delete: {
          name: "delete",
          icon: "heroicons-outline:trash",
          doit: () => {
            this.$refs.modal.openModal();
          },
        },
      };

      return actions[name] || null;
    },
  },
  setup() {
    onMounted(() => {
      dispatch("getAffiliationByMemberQuery", memberQuery);
      dispatch("getZones", memberQuery);
      getData();
    });

    const modal = ref(null);
    const modalStatus = ref(null);
    const modalChange = ref(null);
    const selectedZone = ref(null);
    const toast = useToast();
    const { dispatch, state } = useStore();
    const success = computed(() => state.event.addsuccess);
    const updateeventsuccess = computed(() => state.event.updateeventsuccess);
    const loading = computed(() => state.event.loading);
    const updateloading = computed(() => state.event.updateloading);
    const updatesuccess = computed(() => state.event.updatesuccess);
    const permissions = computed(() => state.auth.permissions);

    const total = computed(() => state.event.total);
    const events = computed(() => state.event.events);
    const deleteloading = computed(() => state.event.deleteloading);
    const deletesuccess = computed(() => state.event.deletesuccess);
    const columns = [
      // {
      //   label: "Zone",
      //   field: "zone",
      // },
      // {
      //   label: "Center",
      //   field: "center",
      // },
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
    ];
    const eventsOption = [
      {
        value: "",
        label: "All",
      },
      ...eventsOptions,
    ];
    const eventType = ref("");
    const query = reactive({
      pageNumber: 1,
      pageSize: 25,
      FromDate: "",
      EndDate: "",
      searchParameter: "",
      events: "",
      zone: "",
      UserId:
        state.auth.userData.userRole === "member" ? state.auth.userData.id : "",
    });
    const memberQuery = reactive({
      pageNumber: 1,
      pageSize: 2500000,
    });
    function getData() {
      dispatch(
        state.auth.userData.userRole === "member"
          ? "getEvents"
          : "getAllEvents",
        query
      );
    }

    const zoneOptions = computed(() =>
      state?.zone?.zones?.map((i) => {
        return {
          label: i.zoneName,
          value: i.id,
        };
      })
    );
    const filteredColumns = computed(() => {
      return columns;
    });
    watch(success, () => {
      if (success.value) {
        getData();
        modalChange.value.closeModal();
      }
    });

    watch(updatesuccess, () => {
      if (updatesuccess.value) {
        getData();
        modalStatus.value.closeModal();
        toast.success("Request updated");
      }
    });
    watch(updateeventsuccess, () => {
      if (updateeventsuccess.value) {
        getData();
        modalChange.value.closeModal();
      }
    });
    watch(deletesuccess, () => {
      if (deletesuccess.value) {
        getData();
        modal.value.closeModal();
        toast.success("Event deleted");
      }
    });

    watch(
      () => query.dateValue,
      () => {
        if (query.dateValue.length) {
          query.EndDate = moment(query.dateValue[1]).format(
            "YYYY-MM-DD HH:mm:ss.SSS"
          );
          query.FromDate = moment(query.dateValue[0]).format(
            "YYYY-MM-DD HH:mm:ss.SSS"
          );
        } else {
          query.EndDate = "";
          query.FromDate = "";
        }
      }
    );
    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce(() => {
      getData();
    }, debounceDelay);

    watch(
      () => query.searchParameter,
      () => {
        debouncedSearch();
      }
    );

    watch(eventType, () => {
      if (eventType.value) {
        query.events = eventType.value.value;
      } else {
        query.events = "";
      }
    });
    watch(
      () => [
        query.pageNumber,
        query.events,
        query.pageSize,
        query.FromDate,
        query.EndDate,
        query.zone,
      ],
      () => {
        getData();
      }
    );
    watch(
      () => selectedZone.value,
      () => {
        if (selectedZone.value) {
          query.zone = selectedZone.value.label;
        } else {
          query.zone = "";
        }
      }
    );
    function perPage({ currentPerPage }) {
      query.pageNumber = 1;
      query.pageSize = currentPerPage;
    }
    return {
      zoneOptions,
      modalChange,
      state,
      filteredColumns,
      total,
      events,
      query,
      updateloading,
      moment,
      perPage,
      eventsOption,
      loading,
      deleteloading,
      modalStatus,
      modal,
      eventType,
      selectedZone,
      permissions,
    };
  },
};
</script>
<style lang="scss"></style>

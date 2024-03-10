<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <div>
          <div class="flex gap-x-4 items-center">
            <InputGroup
              v-model="query.searchParams"
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
            <!-- <VueSelect
              class="min-w-[200px] w-full md:w-auto"
              v-model="eventType"
              :options="eventsOption"
              placeholder="Filter type"
              name="filterType"
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
        <div
          v-if="permissions.includes('CAN_CREATE_EVENTS')"
          class="md:flex md:space-x-3 items-center flex-none"
          :class="window.width < 768 ? 'space-x-rb' : ''"
        >
          <!-- <Button
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
          /> -->
        </div>
      </div>
      <div class="-mx-6">
        <vue-good-table
          :columns="columns"
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
              v-if="props.column.field == 'createdBy'"
              class="text-slate-500 dark:text-slate-400"
            >
              {{ moment(props.row.createdBy).format("lll") }}
            </span>

            <span
              v-if="props.column.field == 'actionPerformedBy'"
              class="text-slate-500 dark:text-slate-400"
            >
              <router-link
                class="hover:underline"
                :to="`/profile/${props.row.actionPerformedById}`"
                >{{ props.row.actionPerformedBy }}</router-link
              >
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
</template>
<script>
import { eventsOptions } from "@/constant/data";

import { onMounted, reactive, watch, computed, ref } from "vue";
import { useStore } from "vuex";
import VueSelect from "@/components/Select/VueSelect";
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import Button from "@/components/Button";
import Card from "@/components/Card";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import { advancedTable } from "@/constant/basic-tablle-data";
import { debounce } from "lodash";
import { useToast } from "vue-toastification";
// eslint-disable-next-line no-unused-vars
import moment from "moment";
import window from "@/mixins/window";

export default {
  mixins: [window],
  components: {
    Pagination,
    InputGroup,

    Card,

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
      searchParams: "",
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
          name: "view",
        },
        // {
        //   name: "see reason",
        // },
        {
          name: "edit",
        },
        {
          name: "delete",
        },
      ],
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
    };
  },
  methods: {
    handleAction(status) {
      let newaction = this.actions;

      //handle declined
      if (status === false) {
        return newaction.filter(
          (i) =>
            i.name == "see reason" || i.name == "delete" || i.name == "view"
        );
      }

      // handle pending
      if (status === null) {
        return newaction.filter(
          (i) => i.name == "view" || i.name == "edit" || i.name == "delete"
        );
      }
      //handle approved
      if (status === true) {
        return newaction.filter((i) => i.name == "view" || i.name == "delete");
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
      this.type = name;
      const actions = {
        view: {
          name: "view",
          icon: "heroicons-outline:eye",
          doit: (name, value) => {
            console.log("🚀 ~ generateAction ~ name:", name);
            this.detail = value;
            this.$refs.modalChange.openModal();
          },
        },
        // "see reason": {
        //   name: "see reason",
        //   icon: "heroicons-outline:eye",
        //   doit: (name, value) => {
        //     console.log("🚀 ~ generateAction ~ name:", name);
        //     this.detail = value;
        //     this.$refs.reasonModal.openModal();
        //   },
        // },
        edit: {
          name: "edit",
          icon: "heroicons-outline:edit",
          doit: (name, value) => {
            console.log("🚀 ~ generateAction ~ name:", name);
            this.detail = value;
            this.$refs.modalChange.openModal();
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
      dispatch("getAllAuditLog", memberQuery);
      dispatch("getZones", memberQuery);
      getData();
    });

    const modal = ref(null);
    const modalStatus = ref(null);
    const modalChange = ref(null);
    const reasonModal = ref(null);
    const selectedZone = ref(null);
    const toast = useToast();
    const { dispatch, state } = useStore();
    const success = computed(() => state.event.addsuccess);
    const updateeventsuccess = computed(() => state.event.updateeventsuccess);
    const loading = computed(() => state.profile.getAllAuditLogloading);
    const updateloading = computed(() => state.event.updateloading);
    const updatesuccess = computed(() => state.event.updatesuccess);
    const permissions = computed(() => state.auth.permissions);

    const total = computed(() => state.profile.total);
    const events = computed(() => state.profile.allAuditLog);
    const deleteloading = computed(() => state.event.deleteloading);
    const deletesuccess = computed(() => state.event.deletesuccess);
    const columns = [
      {
        label: "Date",
        field: "createdBy",
      },

      {
        label: "Action",
        field: "actionPerformed",
      },

      {
        label: "Performed by",
        field: "actionPerformedBy",
      },
      {
        label: "Subject",
        field: "actionSubjectName",
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
      pageSize: 10,
      FromDate: "",
      EndDate: "",
      searchParams: "",
      events: "",
      zone: "",
      UserId: state.auth.userData.id,
    });
    const memberQuery = reactive({
      pageNumber: 1,
      pageSize: 15,
    });

    function getData() {
      dispatch("getAllAuditLog", query);
    }

    watch(query, () => console.log(query) )

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
      () => query.searchParams,
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
      columns,
      permissions,
      reasonModal,
    };
  },
};
</script>
<style lang="scss"></style>

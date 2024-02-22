<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <div class="flex gap-x-4">
          <InputGroup
            v-model="query.searchParameter"
            placeholder="Search"
            type="text"
            prependIcon="heroicons-outline:search"
            merged
            classInput="min-w-[220px] !h-9"
          />
          <Select
            label=""
            :options="sortFilters"
            v-model="query.sortOrder"
            placeholder="Sort by"
            classInput="bg-white !h-9 min-w-[150px]  !min-h-[36px]"
          />
          <VueTailwindDatePicker
            v-model="dateValue"
            :formatter="formatter"
            input-classes="form-control h-[36px]"
            placeholder="Select date range"
          />
        </div>
        <div
          class="md:flex md:space-x-3 items-center flex-none"
          :class="window.width < 768 ? 'space-x-rb' : ''"
        >
          <Button
            v-if="active === 'inspection'"
            icon="heroicons-outline:plus-sm"
            text="Add Report"
            btnClass=" btn-primary font-normal btn-sm "
            iconClass="text-lg"
            @click="
              () => {
                type = 'add';
                $refs.modalChange.openModal();
              }
            "
          />
          <!-- v-if="state.auth.userData?.cihRole?.toLowerCase() === 'cihpastor'" -->
          <Button
            v-if="active !== 'inspection'"
            icon="heroicons-outline:plus-sm"
            text="Add Report"
            btnClass=" btn-primary font-normal btn-sm "
            iconClass="text-lg"
            @click="
              () => {
                type = 'add';
                $refs.modalChange.openModal();
              }
            "
          />
          <div
            class="flex border border-gray-200 rounded"
            v-if="
              state.auth.userData.userRole.toLowerCase() === 'inspectorate' ||
              state.auth.userData.userRole.toLowerCase() === 'administrator'
            "
          >
            <Button
              text="Activity reports"
              @click="active = 'activity'"
              :btnClass="`border-r h-9 py-2 rounded-[0px] flex items-center ${
                active === 'activity' ? 'bg-gray-100' : ''
              }`"
            />
            <Button
              text="Inspection reports"
              @click="active = 'inspection'"
              :btnClass="`h-9 py-2 flex items-center ${
                active === 'inspection' ? 'bg-gray-100' : ''
              }`"
            />
          </div>
        </div>
      </div>
      <div class="-mx-6">
        <vue-good-table
          :columns="
            active === 'inspection' ? inspectionColumns : activityColumns
          "
          mode="remote"
          styleClass=" vgt-table  centered "
          :rows="active === 'inspection' ? inspectionsData : reports"
          :sort-options="{
            enabled: false,
          }"
          :pagination-options="{
            enabled: true,
            perPage: perPage,
          }"
          :search-options="{
            enabled: true,
            externalQuery: searchParameter,
          }"
          :select-options="{
            enabled:
              state.auth.userData.userRole.toLowerCase() === 'cihcooordinator',
            selectionInfoClass: 'top-select',
            selectionText:
              'reports selected, Do you wish to send these reports?',
            selectOnCheckboxOnly: true,
            clearSelectionText: 'Clear selection',
          }"
        >
          <template #selected-row-actions>
            <button
              :disabled="loading"
              :isLoading="loading"
              @click="handleReports"
              class="text-[#232322] font-medium"
            >
              Send reports
            </button>
          </template>
          <template v-slot:table-row="props">
            <span
              v-if="props.column.field == 'customer'"
              class="flex items-center"
            >
              <span class="w-7 h-7 rounded-full mr-3 flex-none">
                <img
                  :src="
                    require('@/assets/images/all-img/' +
                      props.row.customer.image)
                  "
                  :alt="props.row.customer.name"
                  class="object-cover w-full h-full rounded-full"
                />
              </span>
              <span
                class="text-sm text-slate-600 dark:text-slate-300 capitalize font-medium"
                >{{ props.row.customer.name }}</span
              >
            </span>
            <span
              v-if="props.column.field == 'totalAttendee'"
              class="font-medium"
            >
              {{ props.row.totalAttendee || "-" }}
            </span>
            <span v-if="props.column.field == 'zoneName'" class="font-medium">
              {{ props.row.zoneName || "-" }}
            </span>
            <span v-if="props.column.field == 'centerName'" class="font-medium">
              {{ props.row.centerName || "-" }}
            </span>
            <span
              v-if="props.column.field == 'activityDate'"
              class="text-slate-500 dark:text-slate-400"
            >
              {{ moment(props.row.activityDate).format("ll") }}
            </span>
            <span
              v-if="props.column.field == 'dateOfInspection'"
              class="text-slate-500 dark:text-slate-400"
            >
              {{ moment(props.row.dateOfInspection).format("ll") }}
            </span>
            <span v-if="props.column.field == 'status'" class="block w-full">
              <span
                class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
                :class="`${
                  props.row.status === 'active'
                    ? 'text-success-500 bg-success-500'
                    : ''
                } 
            ${
              props.row.status === 'inactive'
                ? 'text-warning-500 bg-warning-500'
                : ''
            }
            ${props.row.status === 'pending' ? 'text-blue-500 bg-blue-500' : ''}
            
             `"
              >
                {{ props.row.status }}
              </span>
            </span>
            <span v-if="props.column.field == 'action'">
              <Dropdown classMenuItems=" w-[140px]">
                <span class="text-xl"
                  ><Icon icon="heroicons-outline:dots-vertical"
                /></span>
                <template v-slot:menus>
                  <MenuItem v-for="(item, i) in actions" :key="i">
                    <div
                      @click="generateAction(item.name, props.row.id).doit"
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
    title="Delete report"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this report?
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          :disabled="deletereportloading"
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm"
          @click="$refs.modal.closeModal()"
        />
        <Button
          text="Delete"
          :isLoading="deletereportloading"
          :disabled="deletereportloading"
          btnClass="btn-danger btn-sm"
          @click="handleDelete"
        />
      </div>
    </template>
  </Modal>
  <Modal
    :title="
      type === 'add'
        ? `Create ${active} report`
        : type === 'edit'
        ? 'Edit Report'
        : 'View report'
    "
    labelClass="btn-outline-dark"
    ref="modalChange"
    sizeClass="max-w-3xl"
  >
    <AddReport v-if="type === 'add' && active === 'activity'" />
    <AddInspectionReport v-if="type === 'add' && active === 'inspection'" />
    <EditReport v-if="type === 'edit' && active === 'activity'" :id="id" />
    <EditInspectionReport
      v-if="type === 'edit' && active === 'inspection'"
      :id="id"
    />
    <ViewReport v-if="type === 'view'" :id="id" />
  </Modal>
</template>
<script>
import EditInspectionReport from "@/components/Pages/Dashboard/CIH/Reports/editInspectionReport";
import Select from "@/components/Select";
import { useStore } from "vuex";
import { computed, ref, reactive, watch, onMounted, provide } from "vue";
import moment from "moment";
import VueSelect from "@/components/Select/VueSelect";
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import { useToast } from "vue-toastification";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal/Modal";
import { MenuItem } from "@headlessui/vue";
import { advancedTable } from "@/constant/basic-tablle-data";
import AddReport from "./addreport.vue";
import AddInspectionReport from "./addinspectionreport.vue";
import EditReport from "./editreport.vue";
import ViewReport from "./preview.vue";
import { debounce } from "lodash";
import window from "@/mixins/window";

export default {
  mixins: [window],
  components: {
    AddReport,
    AddInspectionReport,
    EditInspectionReport,
    EditReport,
    ViewReport,
    Pagination,
    InputGroup,
    Modal,
    Dropdown,
    Icon,
    Select,
    Card,
    MenuItem,
    Button,
    // eslint-disable-next-line vue/no-unused-components
    VueSelect,
    VueTailwindDatePicker,
  },

  data() {
    return {
      advancedTable,

      searchParameter: "",
      type: "",
      id: null,
      filters: ["all", "pending"],
      activeFilter: "",
      dateValue: [],
      center: "",
      zone: "",
      membersOptions: [
        { value: "admin", label: "John Snow" },
        { value: "hod", label: "Tony Starke" },
      ],

      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      actions: [
        {
          name: "view",
        },
        {
          name: "edit",
        },
        {
          name: "delete",
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
      activityColumns: [
        {
          label: "Date",
          field: "activityDate",
        },
        {
          label: "Zone",
          field: "zoneName",
        },
        {
          label: "Center",
          field: "centerName",
        },
        {
          label: "Activity Name",
          field: "activityName",
        },
        {
          label: "Activity Type",
          field: "activityType",
        },

        {
          label: "Venue",
          field: "activityVenue",
        },

        {
          label: "Attendees",
          field: "totalAttendee",
        },

        // {
        //   label: "State of flock",
        //   field: "stateOfTheFlock",
        // },

        {
          label: "Action",
          field: "action",
        },
      ],
      inspectionColumns: [
        {
          label: "Date of Inspection",
          field: "dateOfInspection",
        },
        {
          label: "Inspecting Officer",
          field: "inspectionOfficer",
        },
        {
          label: "Center",
          field: "centerName",
        },

        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  methods: {
    handleDelete() {
      this.$store.dispatch("deleteActivityReport", this.id);
    },
    generateAction(name, id) {
      this.id = id;

      const actions = {
        view: {
          name: "view",
          icon: "heroicons-outline:eye",
          doit: () => {
            this.type = name;
            this.$refs.modalChange.openModal();
          },
        },
        edit: {
          name: "edit",
          icon: "heroicons:pencil-square",
          doit: () => {
            this.type = name;
            this.$refs.modalChange.openModal();
          },
        },
        delete: {
          name: "delete",
          icon: "heroicons-outline:trash",
          doit: () => {
            this.type = name;
            this.$refs.modal.openModal();
          },
        },
      };

      return actions[name] || null;
    },
  },
  setup() {
    onMounted(() => {
      dispatch("getZones", { pageNumber: 1, pageSize: 25000 });

      dispatch("getChurchAffiliationsById", state.auth.userData?.id);
    });
    const sortFilters = [
      {
        label: "Default",
        value: "",
      },

      {
        label: "Activity name",
        value: "activityName",
      },

      {
        label: "Activity venue",
        value: "activityVenue",
      },
      {
        label: "Activity type",
        value: "activityType",
      },
      {
        label: "Center name",
        value: "centerName",
      },
      {
        label: "Zone name",
        value: "zoneName",
      },
    ];

    const modalChange = ref(null);
    const modal = ref(null);
    const query = reactive({
      pageNumber: 1,
      pageSize: 25,
      searchParameter: "",
      sortOrder: "",
    });

    const zoneOptions = computed(() =>
      state?.zone?.zones.map((i) => {
        return {
          label: i.zoneName,
          zoneId: i.id,
        };
      })
    );
    const toast = useToast();
    const { state, dispatch } = useStore();
    const success = computed(() => state.report.addsuccess);
    const updatereportsuccess = computed(
      () => state.report.updatereportsuccess
    );
    const getChurchAffiliationsDatasuccess = computed(
      () => state.profile.getChurchAffiliationsDatasuccess
    );
    const loading = computed(() => state.report.loading);
    const total = computed(() => state.report.total);
    const deletereportloading = computed(
      () => state.report.deletereportloading
    );
    const deletereportsuccess = computed(
      () => state.report.deletereportsuccess
    );
    const addAllInspectionSuccess = computed(
      () => state.report.addAllInspectionSuccess
    );
    const reports = computed(() => state.report.data);
    const detail = computed(() => state.profile.churchAffiliationsData);
    const inspectionsData = computed(() => state.report.inspectionsData);
    const active = ref("activity");

    function handleReports() {
      console.log(
        "🚀 ~ file: centers.vue:415 ~ handleReports ~ handleReports:"
      );
    }
    function perPage({ currentPerPage }) {
      query.pageNumber = 1;
      query.pageSize = currentPerPage;
    }
    watch(getChurchAffiliationsDatasuccess, () => {
      if (getChurchAffiliationsDatasuccess.value) {
        dispatch("getActivityReports", {
          ...query,
          CenterName: detail.value?.cihAddress,
          ZoneName: detail?.value?.cihZone,
        });
      }
    });
    watch(active, () => {
      if (active.value == "inspection") {
        dispatch("getInspectionReports", query);
      }
    });

    watch(success, () => {
      if (success.value) {
        dispatch("getActivityReports", {
          ...query,
          CenterName: detail.value?.cihAddress,
          ZoneName: detail?.value?.cihZone,
        });
        toast.success("Report added");
        modalChange.value.closeModal();
      }
    });
    watch(updatereportsuccess, () => {
      if (updatereportsuccess.value) {
        if (active.value.toLowerCase() == "activity") {
          dispatch("getActivityReports", {
            ...query,
            CenterName: detail.value?.cihAddress,
            ZoneName: detail?.value?.cihZone,
          });
        }
        if (active.value.toLowerCase() == "inspection") {
          dispatch("getInspectionReports", query);
        }
        toast.success("Report updated");
        modalChange.value.closeModal();
      }
    });

    watch(deletereportsuccess, () => {
      if (deletereportsuccess.value) {
        dispatch("getActivityReports", {
          ...query,
          CenterName: detail.value?.cihAddress,
          ZoneName: detail?.value?.cihZone,
        });
        toast.success("Report deleted");
        modal.value.closeModal();
      }
    });

    watch(addAllInspectionSuccess, () => {
      if (active.value == "inspection") {
        dispatch("getInspectionReports", query);
        toast.success("Report updated");
        modalChange.value.closeModal();
      }
    });
    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce((searchValue) => {
      dispatch("getAllCentersTotal", { ...query, name: searchValue });
    }, debounceDelay);
    watch(
      () => query.searchParameter,
      () => {
        debouncedSearch(query.searchParameter);
      }
    );
    watch(
      () => [query.pageNumber, query.pageSize, query.sortOrder],
      () => {
        dispatch("getAllCentersTotal", query);
      }
    );

    provide("zoneOptions", zoneOptions);
    provide("detail", detail);
    return {
      state,
      handleReports,
      loading,
      active,
      query,
      perPage,
      modalChange,
      reports,
      inspectionsData,
      moment,
      deletereportloading,
      modal,
      sortFilters,
      total,
      zoneOptions,
    };
  },
};
</script>
<style lang="scss"></style>

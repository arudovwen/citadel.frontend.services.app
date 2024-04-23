<template>
  <div>
    <div>
      <div class="md:flex pb-6 items-center justify-between px-5">
        <div class="flex flex-col md:flex-row rounded-[6px] text-sm overflow-hidden gap-4 mb-4 md:md-0">
          <InputGroup v-model="query.searchParameter" placeholder="Search" type="text"
            prependIcon="heroicons-outline:search" merged classInput="min-w-[220px] !h-9" />
          <Select label="" :options="filters" v-model="query.sortOrder" placeholder="Sort by"
            classInput="bg-white !h-9 min-w-[150px]  !min-h-[36px]" />
        </div>
        <Dropdown classMenuItems=" min-w-[100px]">
          <div class="text-xl">
            <Button icon="clarity:export-line" text="Export"
              btnClass=" btn-outline-secondary mt-2 md:mt-0 w-full text-slate-600 dark:border-slate-700 dark:text-slate-300 font-normal btn-sm "
              iconClass="text-lg" />
          </div>
          <template v-slot:menus>
            <MenuItem>
            <export-excel :data="allDepartmentMembers" worksheet="reports" :fields="filteredMembers"
              :name="`${query.DepartmentName}-members.csv`" type="csv">
              <button class="px-3 py-2 hover:bg-gray-100 w-full text-left whitespace-nowrap text-sm">
                Export csv
              </button>
            </export-excel>
            </MenuItem>
            <MenuItem>
            <button @click="generateReport"
              class="px-3 py-2 hover:bg-gray-100 w-full text-left whitespace-nowrap text-sm">
              Export pdf
            </button>
            </MenuItem>
          </template>
        </Dropdown>
      </div>
      <!-- <div class="flex w-full">{{ members }}</div>
      <div class="flex w-full">{{ $store.state.department.departments }}</div> -->
      <div class="">
        <vue-good-table :columns="columns" styleClass="vgt-table" :isLoading="loading" :rows="members || []"
          :sort-options="{
            enabled: false,
          }" :pagination-options="{
            enabled: true,
            perPage: query.pageSize,
          }">
          <template v-slot:table-row="props">
            <span v-if="props.column.field == 'fullName'" class="font-medium flex items-center gap-x-1">
              <router-link :to="`/profile/${props.row.userId}`" class="hover:underline">
                {{ props.row.fullName }}
              </router-link>
            </span>

            <span v-if="props.column.field == 'actionDate'" class="text-slate-500 dark:text-slate-400">
              {{ moment(props.row.actionDate).format("ll") }}
            </span>
            <span v-if="props.column.field == 'email'" class="font-medium lowercase">
              {{ props.row.email }}
            </span>
            <span v-if="props.column.field == 'status'" class="block w-full">
              <span
                class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-warning-500 bg-warning-500">
                Delisted
              </span>
            </span>
            <span v-if="props.column.field == 'action'">
              <Dropdown classMenuItems=" w-[140px]">
                <span class="text-xl">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
                <template v-slot:menus>
                  <MenuItem v-for="(item, i) in filteredActions" :key="i">
                  <div @click="item.doit(item.name, props.row)" :class="{
            'bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white':
              item.name === 'delete',
            'hover:bg-slate-900 hover:text-white':
              item.name !== 'delete',
          }" class="w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center">
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
              <Pagination :total="total" :current="query.pageNumber" :per-page="query.pageSize" :pageRange="pageRange"
                @page-changed="query.pageNumber = $event" :perPageChanged="perPage" enableSearch enableSelect
                :options="options">
                >
              </Pagination>
            </div>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
  <Modal title="View Reason" label="Small modal" labelClass="btn-outline-primary" ref="reasonModal" sizeClass="max-w-md"
    themeClass="bg-primary-500">
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      {{ reason ? reason : "None" }}
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button text="Close" btnClass="btn-primary btn-sm" @click="$refs.reasonModal.closeModal()" />
      </div>
    </template>
  </Modal>
</template>
<script>
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Select from "@/components/Select";
import Pagination from "@/components/Pagination";
import { MenuItem } from "@headlessui/vue";
import window from "@/mixins/window";
import { useStore } from "vuex";
import { debounce } from "lodash";
import moment from "moment";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import Modal from "@/components/Modal/Modal";

import {
  computed,
  onMounted,
  watch,
  reactive,
  ref,
inject,
  // getCurrentInstance,
} from "vue";

export default {
  mixins: [window],
  components: {
    Pagination,
    Modal,
    // eslint-disable-next-line vue/no-unused-components
    InputGroup,
    Select,
    Dropdown,
    Icon,
    MenuItem,
    Button,
  },
  setup() {
    onMounted(() => {
      dispatch("getDelistedDepartments", query);
      dispatch("getRoles");
      // id.value = getCurrentInstance().data.id;
    });
    const pdfOptions = {
      margin: 10,
      image: {
        type: "jpeg",
        quality: 1,
      },
      html2canvas: { scale: 1 },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "l",
      },
    };
    const exportFilename = "file.pdf";
    const route = useRoute();
    const query = reactive({
      pageNumber: 1,
      pageSize: 25,
      sortOrder: "",
      searchParameter: "",
      DepartmentName: route.params.name,
    });
    const reasonModal = ref(null);
    const { state, dispatch } = useStore();
    const toast = useToast();
    // const id = ref(null);
    const modal = ref(null);
    const modalChange = ref(null);
    const modalStatus = ref(null);
    const filters = [
      {
        label: "Default",
        value: "",
      },

      {
        label: "Name",
        value: "firstName",
      },
    ];
    // none, firstName, userId, surname, department, center, zone, role

    function fetchRecords(page) {
      dispatch("getDelistedDepartments", { ...query, pageNumber: page });
    }

    function perPage({ currentPerPage }) {
      query.pageNumber = 1;
      query.pageSize = currentPerPage;
    }
    const search = ref("");
    const loading = computed(() => state.member.loading);
    const delistLoading = computed(() => state.department.loading);
    const delistSuccess = computed(() => state.department.deletesuccess);
    const members = computed(() => {
      if (state.department.departments) {
        return state?.department?.departments?.map((item) => {
          item.fullName = `${item.firstName} ${item.lastName}`;

          return item;
        });
      }
      return [];
    });
    const total = computed(() => state.profile.total);
    const roles = computed(() => state.profile.roles);
    const addsuccess = computed(() => state.profile.addsuccess);
    const deleteloading = computed(() => state.profile.deleteloading);
    // const deletesuccess = computed(() => state.profile.deletesuccess);
    const allDepartmentMembers = computed(() => state.department.allDepartments)
    const filteredMembers = computed(() => ({
      id: "id",
      gender: "gender",
      phone: "phone",
      "First Name": "firstName",
      "Last Name": "lastName",
      Email: "email",
      "Current Department": "departmentName",
      userId: "id",
      dob: "doB",
    }));
    function handleDelete(id) {
      dispatch("removeMemberFromDepartment", id);
    }

    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce((searchValue) => {
      dispatch("getDelistedDepartments", { ...query, name: searchValue });
    }, debounceDelay);
    watch(addsuccess, () => {
      addsuccess.value && dispatch("getDelistedDepartments", query);
      modalChange.value.closeModal();
    });

    watch(delistSuccess, () => {
      if (delistSuccess.value) {
        dispatch("getDelistedDepartments", query);
        toast.success("Member successfully removed");
        modal.value.closeModal();
      }
    });

    // watch(deletesuccess, () => {
    //   if (deletesuccess.value) {
    //     dispatch("getDelistedDepartments", query);
    //     modalStatus.value.closeModal();
    //   }
    // });

    watch(
      () => query.searchParameter,
      () => {
        debouncedSearch(query.searchParameter);
      }
    );
    watch(
      () => [query.pageNumber, query.pageSize, query.sortOrder],
      () => {
        dispatch("getDelistedDepartments", query);
      }
    );
    const downloadPdf = inject("downloadPdf");
    const generateReport = () => {
      downloadPdf();
    }

    return {
      generateReport,
      query,
      total,
      fetchRecords,
      loading,
      deleteloading,
      members,
      roles,
      search,
      handleDelete,
      filteredMembers,
      allDepartmentMembers,
      modal,
      modalChange,
      modalStatus,
      perPage,
      filters,
      state,
      delistLoading,
      delistSuccess,
      moment,
      reasonModal,
      pdfOptions,
      exportFilename,
    };
  },

  data() {
    return {
      type: "",
      reason: "",
      id: null,
      activeFilter: "all",
      dateValue: null,
      pageRange: 5,
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      actions: [
        {
          name: "view",
          alias: "view reason",
          icon: "heroicons-outline:eye",
          doit: (name, { reason }) => {
            this.type = name;
            this.reason = reason;
            this.$refs.reasonModal.openModal();
            // this.$router.push("/profile/" + userId);
          },
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
      columns: [
        {
          label: "Name",
          field: "fullName",
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
          label: "Status",
          field: "status",
        },
        // {
        //   label: "Reason",
        //   field: "reason",
        // },

        {
          label: "Date",
          field: "actionDate",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  methods: {

  },
  computed: {
    filteredActions() {
      return !this.$store.state.auth.permissions.includes(
        "CAN_UPDATE_DEPARTMENT"
      )
        ? this.actions.filter((i) => i.name.toLowerCase() !== "delete")
        : this.actions;
    },
  },
};
</script>
<style lang="scss"></style>

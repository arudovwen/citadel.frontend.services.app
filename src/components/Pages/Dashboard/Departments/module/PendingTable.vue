<template>
  <div>
    <div>
      <div class="md:flex pb-6 items-center justify-between px-5">
        <div class="flex gap-x-4 rounded text-sm">
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
            :options="filters"
            v-model="query.sortOrder"
            placeholder="Sort by"
            classInput="bg-white !h-9 min-w-[150px]  !min-h-[36px]"
          />
        </div>
        <Button
          icon="clarity:export-line"
          text="Export"
          btnClass=" btn-outline-secondary text-slate-600 dark:border-slate-700 dark:text-slate-300 font-normal btn-sm "
          iconClass="text-lg"
        />
      </div>
      <div class="">
        <vue-good-table
          :columns="columns"
          styleClass="vgt-table"
          :isLoading="deptloading"
          :rows="members || []"
          :sort-options="{
            enabled: false,
          }"
          :pagination-options="{
            enabled: true,
            perPage: query.pageSize,
          }"
        >
          <template v-slot:table-row="props">
            <span
              v-if="props.column.field == 'fullName'"
              class="font-medium flex items-center gap-x-1"
            >
              <router-link
                :to="`/profile/${props.row.id}`"
                class="hover:underline"
              >
                {{ props.row.fullName }}
              </router-link>
            </span>

            <span
              v-if="props.column.field == 'requestDate'"
              class="text-slate-500 dark:text-slate-400"
            >
              {{ moment(props.row.requestDate).format("ll") }}
            </span>
            <span
              v-if="props.column.field == 'email'"
              class="font-medium lowercase"
            >
              {{ props.row.email }}
            </span>
            <span v-if="props.column.field == 'status'" class="block w-full">
              <span
                class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
                :class="`${
                  props.row.status === 'active' ||
                  props.row.statusText === 'approved'
                    ? 'text-success-500 bg-success-500'
                    : ''
                } 
              ${
                props.row.status === 'inactive' ||
                props.row.statusText === 'rejected'
                  ? 'text-warning-500 bg-warning-500'
                  : ''
              }
              ${
                props.row.status === 'pending' ||
                props.row.statusText === 'pending'
                  ? 'text-blue-500 bg-blue-500'
                  : ''
              }
              
               `"
              >
                {{ props.row.statusText }}
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
                :pageRange="pageRange"
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
  </div>
  <Modal
    :title="`${type} request`"
    label="Small modal"
    :labelClass="
      type === 'approve' ? 'btn-outline-success' : 'btn-outline-danger'
    "
    ref="modal"
    sizeClass="max-w-md"
    :themeClass="type === 'approve' ? 'bg-success-500' : 'bg-danger-500'"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to {{ type }} this request?
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
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm "
          @click="$refs.modal.closeModal()"
        />
        <Button
          :isLoading="approveloading"
          :disabled="approveloading"
          text="Proceed"
          :btnClass="
            type === 'approve' ? 'btn-success btn-sm' : 'btn-danger btn-sm'
          "
          @click="handleRequest()"
        />
      </div>
    </template>
  </Modal>

  <Modal
    :title="
      type === 'add'
        ? 'Add member'
        : type === 'edit'
        ? 'Edit member'
        : 'View member'
    "
    labelClass="btn-outline-dark"
    ref="modalChange"
    sizeClass="max-w-3xl"
  >
    <AddRecord v-if="type === 'add'" />
    <EditRecord v-if="type === 'edit'" />
    <ViewRecord v-if="type === 'view'" />
  </Modal>
</template>
<script>
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Select from "@/components/Select";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal/Modal";
import { MenuItem } from "@headlessui/vue";
import AddRecord from "../member-add.vue";
import EditRecord from "../member-edit.vue";
import ViewRecord from "../member-preview.vue";
import window from "@/mixins/window";
import { useStore } from "vuex";
import { debounce } from "lodash";
import moment from "moment";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

import {
  computed,
  onMounted,
  watch,
  reactive,
  ref,
  // getCurrentInstance,
} from "vue";

export default {
  mixins: [window],
  components: {
    AddRecord,
    EditRecord,
    ViewRecord,
    Pagination,
    // eslint-disable-next-line vue/no-unused-components
    InputGroup,
    Select,
    Modal,
    Dropdown,
    Icon,

    MenuItem,
    Button,
  },
  setup() {
    const route = useRoute();
    const query = reactive({
      pageNumber: 1,
      pageSize: 25,
      sortOrder: "",
      searchParameter: "",
      DepartmentName: route.params.name,
    });
    const { state, dispatch } = useStore();
    const toast = useToast();
    const type = ref(null);
    const detail = ref(null);
    const comment = ref("");
    const modal = ref(null);

    const actions = {
      Approve: {
        name: "Approve",
        icon: "ph:check",
        doit: (data) => {
          detail.value = data;
          type.value = "approve";
          modal.value.openModal();
        },
      },
      Reject: {
        name: "Reject",
        icon: "ph:x-light",
        doit: (data) => {
          detail.value = data;
          type.value = "reject";
          modal.value.openModal();
        },
      },
    };
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
    onMounted(() => {
      fetchRecords(1);
      dispatch("getRoles");
    });
    function fetchRecords(page) {
      dispatch("getPendingDepartments", { ...query, pageNumber: page });
    }

    function perPage({ currentPerPage }) {
      query.pageNumber = 1;
      query.pageSize = currentPerPage;
    }
    const search = ref("");
    const success = computed(() => state.request.approvesuccess);
    const approveloading = computed(() => state.request.approveloading);
    const loading = computed(() => state.member.loading);
    const deptloading = computed(() => state.department.loading);
    const members = computed(() =>
      state.department.departments.map((i) => {
        return {
          ...i,
          fullName: `${i.firstName} ${i.lastName}`,
          statusText:
            i.status === null
              ? "pending"
              : i.status === true
              ? "approved"
              : "rejected",
        };
      })
    );
    const total = computed(() => state.profile.total);
    const roles = computed(() => state.profile.roles);

    function handleRequest() {
      dispatch("approveCOD", {
        approveUserId: state.auth.userData.id,
        reqUserId: detail.value.userId,
        actionId: detail.value.id,
        Comments: comment.value,
        status: type.value === "approve" ? true : false,
      });
    }

    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce((searchValue) => {
      dispatch("getPendingDepartments", { ...query, name: searchValue });
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
        dispatch("getPendingDepartments", query);
      }
    );

    watch(success, () => {
      if (success.value) {
        fetchRecords(1);
        modal.value.closeModal();
        if (type.value === "approve") {
          toast.success("Approve Successfully");
        } else {
          toast.success("Request Rejected");
        }
      }
    });

    return {
      query,
      total,
      fetchRecords,
      loading,
      members,
      roles,
      search,
      modal,
      perPage,
      filters,
      state,
      detail,
      comment,
      type,
      handleRequest,
      actions,
      approveloading,
      deptloading,
      moment,
    };
  },

  data() {
    return {
      id: null,
      activeFilter: "all",
      dateValue: null,
      pageRange: 5,
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },

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
          label: "Gender",
          field: "gender",
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
        {
          label: "Date",
          field: "requestDate",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  methods: {
    generateAction(name, id) {
      this.id = id;

      const actions = {
        Approve: {
          name: "Approve",
          icon: "ph:check",
          doit: () => {
            this.type = name;
            this.$refs.modal.openModal();
          },
        },
        Reject: {
          name: "Reject",
          icon: "ph:x-light",
          doit: () => {
            this.type = name;
            this.$refs.modal.openModal();
          },
        },
        view: {
          name: "view",
          icon: "heroicons-outline:eye",
          doit: () => {
            this.$router.push("/members-management/preview/" + id);
          },
        },
      };

      return actions[name] || null;
    },
  },
  computed: {
    filteredActions() {
      return this.$store.state.auth.userData.userRole !== "administrator" &&
        this.$store.state.auth.userData.userRole !== "hod"
        ? this.actions.filter((i) => i.name.toLowerCase() !== "delete")
        : this.actions;
    },
  },
};
</script>
<style lang="scss"></style>

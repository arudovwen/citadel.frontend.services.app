<template>
  <div>
    <div class="md:flex pb-6 items-center justify-between px-5">
      <div class="flex gap-x-4 rounded text-sm">
        <InputGroup
          v-model="query.searchParameter"
          placeholder="Search"
          type="text"
          prependIcon="heroicons-outline:search"
          merged
          classInput="min-w-[220px] !h-9 border border-gray-200"
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
            v-if="props.column.field == 'approveDate'"
            class="text-slate-500 dark:text-slate-400"
          >
            {{ moment(props.row.approveDate).format("ll") }}
          </span>
          <span
            v-if="props.column.field == 'doB'"
            class="text-slate-500 dark:text-slate-400"
          >
            {{ moment(props.row.doB).format("ll") }}
          </span>
          <span
            v-if="props.column.field == 'email'"
            class="font-medium lowercase"
          >
            {{ props.row.email }}
          </span>
          <span v-if="props.column.field == 'status'" class="block w-full">
            <span
              class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-success-500 bg-success-500"
            >
              Approved
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
  <Modal
    title="Delist member"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delist this member from department?
    </div>
    <div class="w-full flex flex-col">
      <textarea
        resize="none"
        class="px-3 py-3 border border-gray-200 rounded-lg w-full"
        rows="4"
        placeholder="Provide reason"
        v-model="reason"
      ></textarea>
      <span v-if="reasonErr?.length > 0" class="mt-2 text-danger-500 text-xs">
        <!-- <Icon icon="heroicons-outline:information-circle" /> -->
        {{ reasonErr }}
      </span>
    </div>
    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm "
          @click="$refs.modal.closeModal()"
        />
        <Button
          :isLoading="delistLoading"
          :disabled="delistLoading"
          text="Proceed"
          btnClass="btn-danger btn-sm"
          @click="handleDelist()"
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
// import { useField, useForm } from "vee-validate";
// import * as yup from "yup";

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
    onMounted(() => {
      dispatch("getApprovedDepartments", query);
      dispatch("getRoles");
      // id.value = getCurrentInstance().data.id;
    });
    function fetchRecords(page) {
      dispatch("getApprovedDepartments", { ...query, pageNumber: page });
    }

    function perPage({ currentPerPage }) {
      query.pageNumber = 1;
      query.pageSize = currentPerPage;
    }
    const search = ref("");
    const loading = computed(() => state.member.loading);
    const delistLoading = computed(() => state.department.loading);
    const delistSuccess = computed(() => state.department.deletesuccess);
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
    const addsuccess = computed(() => state.profile.addsuccess);
    const deleteloading = computed(() => state.profile.deleteloading);
    // const deletesuccess = computed(() => state.profile.deletesuccess);

    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce((searchValue) => {
      dispatch("getApprovedDepartments", { ...query, name: searchValue });
    }, debounceDelay);
    watch(addsuccess, () => {
      addsuccess.value && dispatch("getApprovedDepartments", query);
      modalChange.value.closeModal();
    });

    watch(delistSuccess, () => {
      if (delistSuccess.value) {
        dispatch("getApprovedDepartments", query);
        toast.success("Member successfully removed");
        modal.value.closeModal();
      }
    });

    // watch(deletesuccess, () => {
    //   if (deletesuccess.value) {
    //     dispatch("getApprovedDepartments", query);
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
        dispatch("getApprovedDepartments", query);
      }
    );
    return {
      query,
      total,
      fetchRecords,
      loading,
      deleteloading,
      members,
      roles,
      search,

      modal,
      modalChange,
      modalStatus,
      perPage,
      filters,
      state,
      delistLoading,
      delistSuccess,
      deptloading,
      moment,
    };
  },

  data() {
    return {
      type: "",
      id: null,
      activeFilter: "all",
      dateValue: null,
      pageRange: 5,
      reason: "",
      reasonErr: "",
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      actions: [
        {
          name: "view",
          icon: "heroicons-outline:eye",
          doit: ({ userId }) => {
            this.$router.push("/profile/" + userId);
          },
        },

        {
          name: "delist",
          icon: "heroicons-outline:trash",
          doit: ({ userId }) => {
            this.id = userId;

            this.$refs.modal.openModal();
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
          label: "Dob",
          field: "doB",
        },
        {
          label: "Status",
          field: "status",
        },
        {
          label: "Approval Date",
          field: "approveDate",
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
        view: {
          name: "view",
          icon: "heroicons-outline:eye",
          doit: () => {
            this.$router.push("/members-management/preview/" + id);
          },
        },

        delist: {
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
    handleDelist() {
      if (this.reason?.length == 0) {
        this.reasonErr = "Reason is a required field";
        return;
      }
      this.$store.dispatch("removeMemberFromDepartment", {
        reason: this.reason,
        userId: this.id,
        hodUserId: this.$store.state.auth.userData.id,
        departmentId: this.$route.params.id,
      });
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
  watch: {
    reason() {
      if (this.reason?.length > 0) {
        this.reasonErr = "";
      }
    },
  },
};
</script>
<style lang="scss"></style>

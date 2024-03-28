<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <InputGroup
          v-model="search"
          placeholder="Search"
          type="text"
          prependIcon="heroicons-outline:search"
          merged
          classInput="min-w-[220px] !h-9 "
        />
        <div class="md:flex md:space-x-3 items-center flex-none">
          <export-excel
            :data="members"
            type="csv"
            worksheet="Users"
            name="users.csv"
          >
            <Button
              icon="clarity:export-line"
              text="Export"
              btnClass=" btn-outline-secondary text-slate-600 dark:border-slate-700 dark:text-slate-300 font-normal btn-sm w-full mt-2 md:mt-0"
              iconClass="text-lg"
            />
          </export-excel>
          <!-- icon="heroicons-outline:plus-sm" -->

          <Button
            text="Roles"
            btnClass=" btn-primary font-normal btn-sm w-full mt-2 md:mt-0"
            iconClass="text-lg"
            @click="
              () => {
                $router.push('/roles-management');
                // $store.dispatch('openRoleModal');
              }
            "
          />
          <Button
            class="hidden"
            v-if="permissions.includes('CAN_CREATE_USER_MANAGEMENT')"
            icon="ri:user-add-line"
            text="Add user"
            btnClass=" btn-primary
          font-normal btn-sm "
            iconClass="text-lg"
            @click="
              () => {
                type = 'add';
                $refs.modalChange.openModal();
              }
            "
          />
        </div>
      </div>
      <div class="-mx-6">
        <vue-good-table
          :columns="columns"
          mode="remote"
          styleClass="vgt-table"
          :isLoading="loading"
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
            <span v-if="props.column.field == 'statusText'">
              <span
                :class="`whitespace-nowrap text-[12.5px] rounded-full px-3 py-1 ${
                  props?.row?.statusText?.toLowerCase() === 'pendingactivation'
                    ? 'text-gray-700 bg-gray-100'
                    : props?.row?.statusText?.toLowerCase() === 'active'
                    ? 'text-green-700 bg-green-100'
                    : 'text-red-700 bg-red-100'
                }`"
                >{{
                  props?.row?.statusText?.toLowerCase() === "pendingactivation"
                    ? "Pending"
                    : props?.row?.statusText
                }}</span
              >
            </span>
            <span
              v-if="props.column.field == 'emailAddress'"
              class="font-medium lowercase"
            >
              {{ props.row.emailAddress }}
            </span>
            <span v-if="props.column.field == 'action'">
              <Dropdown classMenuItems=" w-[160px]">
                <span class="text-xl"
                  ><Icon icon="heroicons-outline:dots-vertical"
                /></span>
                <template v-slot:menus>
                  <!-- <span>dd</span> -->
                  <MenuItem
                    v-for="(item, i) in handleActions(
                      props?.row?.statusText?.toLowerCase()
                    )"
                    :key="i"
                  >
                    <div
                      @click="
                        generateAction(
                          item?.name?.toLowerCase(),
                          props.row.userId
                        ).doit
                      "
                      :class="`
                
                  ${
                    item.name === 'delete'
                      ? 'bg-danger-500 text-danger-500 bg-opacity-30  hover:bg-opacity-100 hover:text-white'
                      : 'hover:bg-slate-900 hover:text-white'
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center `"
                    >
                      <span class="text-base"
                        ><Icon
                          :icon="
                            generateAction(item.name, props.row.userId).icon
                          "
                      /></span>
                      <span>{{
                        generateAction(item.name, props.row.userId).name
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
    </Card>
  </div>
  <Modal
    title="Confirm action"
    label="Small modal"
    labelClass="btn-outline-dark"
    ref="modalStatus"
    sizeClass="max-w-md"
    :themeClass="`${type === 'enlist' ? 'bg-green-500' : 'bg-danger-500'}`"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to {{ type.toLowerCase() }} this member?
    </div>
    <div v-if="type.toLowerCase() === 'delete'">
      <textarea
        resize="none"
        class="px-3 py-3 border border-gray-200 rounded-lg w-full"
        rows="4"
        placeholder="Provide reason"
        v-model="reason"
      ></textarea>
    </div>
    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          :disabled="deleteloading"
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm "
          @click="$refs.modalStatus.closeModal()"
        />
        <Button
          :disabled="deleteloading || !reason"
          :isLoading="deleteloading"
          text="Proceed"
          :btnClass="` btn-sm ${
            type === 'enlist' ? 'btn-success' : 'btn-danger'
          }`"
          @click="handleStatus"
        />
      </div>
    </template>
  </Modal>

  <Modal
    title="Delete Member"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this member?
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
      type === 'add' ? 'Add user' : type === 'edit' ? 'Edit user' : 'View user'
    "
    labelClass="btn-outline-dark"
    ref="modalChange"
    sizeClass="max-w-md"
  >
    <AddRecord v-if="type === 'add'" />
    <EditRecord v-if="type === 'edit'" />
    <ViewRecord v-if="type === 'view'" />
  </Modal>
  <Modal
    :title="type"
    label="Small modal"
    :labelClass="`${
      type === 'assign role' ? 'btn-primary-600' : 'btn-outline-danger'
    }`"
    ref="roleModalChange"
    sizeClass="max-w-md"
    :themeClass="`${
      type === 'assign role' ? 'bg-primary-500' : 'bg-danger-500'
    }`"
  >
    <div>
      <AssignRole
        v-if="type === 'assign role'"
        :userId="id"
        :closeModal="closeRoleModalChange"
      />
      <RemoveRole
        v-if="type === 'remove role'"
        :userId="id"
        :closeModal="closeRoleModalChange"
      />
    </div>
  </Modal>
  <RolesModal />
</template>
<script>
import RolesModal from "@/views/roles/RolesModal";
import AssignRole from "@/components/Pages/Dashboard/Members/assign-role.vue";
import RemoveRole from "@/components/Pages/Dashboard/Members/remove-role.vue";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal/Modal";
import { MenuItem } from "@headlessui/vue";
import { membersTable } from "@/constant/basic-tablle-data";
import AddRecord from "../user-add.vue";
import EditRecord from "../member-edit.vue";
import ViewRecord from "../member-preview.vue";
import moment from "moment";
import { useStore } from "vuex";
import { debounce } from "lodash";
import {
  computed,
  onMounted,
  watch,
  reactive,
  ref,
  getCurrentInstance,
} from "vue";
import window from "@/mixins/window";
import { useToast } from "vue-toastification";

export default {
  mixins: [window],
  components: {
    AddRecord,
    EditRecord,
    ViewRecord,
    AssignRole,
    RemoveRole,
    Pagination,
    InputGroup,
    RolesModal,
    Modal,
    Dropdown,
    Icon,
    Card,
    MenuItem,
    Button,
  },

  data() {
    return {
      membersTable,
      current: 1,
      perpage: 10,
      pageRange: 5,
      searchTerm: "",
      type: "",
      id: null,
      filters: ["all", "pending"],
      activeFilter: "",
      dateValue: null,
      reason: "",
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
          name: "enlist",
        },

        {
          name: "assign role",
        },
        {
          name: "remove role",
        },
        {
          name: "delete",
        },
      ],
      options: [
        {
          value: "5",
          label: "5",
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
          label: "Name",
          field: "fullName",
        },
        {
          label: "Email",
          field: "emailAddress",
        },

        {
          label: "Phone",
          field: "mobileNo",
        },
        // {
        //   label: "Gender",
        //   field: "gender",
        // },

        // {
        //   label: "DOB",
        //   field: "dob",
        // },

        // {
        //   label: "Department",
        //   field: "department",
        // },
        {
          label: "Status",
          field: "statusText",
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
      this.$store.dispatch("disableUser", this.id);
    },
    generateAction(name, id) {
      this.id = id;

      const actions = {
        view: {
          name: "view",
          icon: "heroicons-outline:eye",
          doit: () => {
            // store.dispatch("getUserById", id);
            this.$router.push("/profile/" + id);
          },
        },
        edit: {
          name: "edit",
          icon: "heroicons:pencil-square",
          doit: () => {
            // store.dispatch("getUserById", id);
            this.$router.push("/profile/" + id);
          },
        },
        delete: {
          name: "delete",
          icon: "heroicons-outline:trash",
          doit: () => {
            this.type = name;
            this.$refs.modalStatus.openModal();
          },
        },
        enlist: {
          name: "enlist",
          icon: "heroicons-outline:plus",
          doit: () => {
            this.type = name;
            this.$refs.modalStatus.openModal();
          },
        },
        "assign role": {
          name: "assign role",
          icon: "heroicons-outline:user-plus",
          doit: () => {
            this.type = name;
            this.$refs.roleModalChange.openModal();
          },
        },
        "remove role": {
          name: "remove role",
          icon: "heroicons-outline:minus",
          doit: () => {
            this.type = name;
            this.$refs.roleModalChange.openModal();
          },
        },
      };

      return actions[name] || null;
    },
    handleStatus() {
      if (this.type === "enlist") {
        this.$store.dispatch("enableUser", this.id);
      } else {
        this.$store.dispatch("disableUser", this.id);
      }
    },
    handleActions(value) {
      if (value === "active") {
        return this.actions.filter((i) => i.name !== "enlist");
      }
      if (value === "deactivated") {
        return this.actions.filter((i) => i.name !== "delete");
      }
      if (value === "pendingactivation") {
        return this.actions.filter(
          (i) => i.name !== "delete" && i.name !== "approve"
        );
      }
      return value;
    },
  },
  setup() {
    const id = ref(null);
    const toast = useToast();
    const modal = ref(null);
    const modalChange = ref(null);
    const roleModalChange = ref(null);
    const modalStatus = ref(null);
    const permissions = computed(() => state.auth.permissions);
    const query = reactive({
      pageNumber: 1,
      pageSize: 25,
      name: "",
    });
    const closeRoleModalChange = () => {
      roleModalChange.value.closeModal();
    };
    const { state, dispatch } = useStore();
    onMounted(() => {
      dispatch("getUsers", query);
      // dispatch("getAdminRoles");
      id.value = getCurrentInstance().data.id;
    });
    function fetchRecords(page) {
      dispatch("getUsers", { ...query, pageNumber: page });
    }

    function perPage({ currentPerPage }) {
      query.pageNumber = 1;
      query.pageSize = currentPerPage;
    }

    const search = ref("");
    const loading = computed(() => state.member.loading);
    const members = computed(() => {
      if (state?.member?.data) {
        return state?.member?.data.map((item) => {
          item.dob = item?.dob ? moment(item?.dob).format("ll") : "-";
          item.department = item?.department ? item?.department : "-";

          return item;
        });
      }
      return [];
    });
    const total = computed(() => state.member.total);
    const roles = computed(() => state.member.roles);
    const addsuccess = computed(() => state.member.addsuccess);
    const deleteloading = computed(() => state.member.deleteloading);
    const deletesuccess = computed(() => state.member.deletesuccess);

    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce((searchValue) => {
      dispatch("getUsers", { ...query, name: searchValue });
    }, debounceDelay);
    watch(addsuccess, () => {
      if (addsuccess.value) {
        dispatch("getUsers", query);
        modalChange.value.closeModal();
      }
    });

    watch(deletesuccess, () => {
      if (deletesuccess.value) {
        toast.success("Member deleteed");
        dispatch("getUsers", query);
        modalStatus.value.closeModal();
      }
    });

    watch(search, () => {
      debouncedSearch(search.value);
    });
    watch(
      () => [query.pageNumber, query.pageSize],
      () => {
        dispatch("getUsers", query);
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
      roleModalChange,
      closeRoleModalChange,
      modalStatus,
      perPage,
      state,
      permissions,
    };
  },
};
</script>
<style lang="scss"></style>

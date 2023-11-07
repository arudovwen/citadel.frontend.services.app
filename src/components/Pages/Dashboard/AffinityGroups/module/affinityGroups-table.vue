<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <div class="flex rounded-[6px] text-sm overflow-hidden gap-x-4">
          <InputGroup
            v-model="search"
            placeholder="Search"
            type="text"
            prependIcon="heroicons-outline:search"
            merged
            classInput="min-w-[220px] !h-9"
          />

          <VueTailwindDatePicker
            v-model="dateValue"
            :formatter="formatter"
            input-classes="form-control hidden h-[36px]"
            placeholder="Select date"
            as-single
          />
        </div>
        <div
          class="md:flex md:space-x-3 items-center flex-none"
          :class="window.width < 768 ? 'space-x-rb' : ''"
        >
          <Button
            icon="ri:user-add-line"
            text="Add Affinity Group"
            btnClass=" btn-primary font-normal btn-sm "
            iconClass="text-lg"
            @click="
              () => {
                type = 'add';
                openModal();
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
          :rows="affinityGroups || []"
          :sort-options="{
            enabled: false,
          }"
          :pagination-options="{
            enabled: true,
            perPage: query.pageSize,
          }"
        >
          <template v-slot:table-row="props">
            <span v-if="props.column.field == 'action'">
              <Dropdown classMenuItems=" w-[140px]">
                <span class="text-xl"
                  ><Icon icon="heroicons-outline:dots-vertical"
                /></span>
                <template v-slot:menus>
                  <!-- {{ props.row }} -->
                  <MenuItem v-for="(item, i) in actions" :key="i">
                    <div
                      @click="
                        generateAction(item.name.toLowerCase(), props.row).doit
                      "
                      :class="`
                
                  ${
                    item.name === 'delist'
                      ? 'bg-danger-500 text-danger-500 bg-opacity-30  hover:bg-opacity-100 hover:text-white'
                      : 'hover:bg-slate-900 hover:text-white'
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center `"
                    >
                      <span class="text-base"
                        ><Icon
                          :icon="generateAction(item.name, props.row).icon"
                      /></span>
                      <span>{{
                        generateAction(item.name, props.row).name
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
  <!-- <Modal
    title="Confirm action"
    label="Small modal"
    labelClass="btn-outline-dark"
    ref="modalStatus"
    sizeClass="max-w-md"
    :themeClass="`${type === 'approve' ? 'bg-green-500' : 'bg-danger-500'}`"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to {{ type.toLowerCase() }} this member?
    </div>
    <div v-if="type.toLowerCase() === 'delist'">
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
          :disabled="deleteLoading"
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm "
          @click="toggleDeleteModal(false)"
        />
        <Button
          :disabled="deleteLoading"
          text="Proceed"
          :btnClass="` btn-sm ${
            type === 'approve' ? 'btn-success' : 'btn-danger'
          }`"
          @click="handleStatus"
        />
      </div>
    </template>
  </Modal> -->

  <Modal
    :activeModal="$store.state.affinityGroup.deleteModal"
    @close="toggleDeleteModal(false)"
    title="Delete Affinity Group"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="deleteModal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this affinity group?
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          :disabled="deleteLoading"
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm"
          @click="toggleDeleteModal(false)"
        />
        <Button
          text="Delete"
          :disabled="deleteLoading"
          btnClass="btn-danger btn-sm"
          @click="handleDelete"
        />
      </div>
    </template>
  </Modal>
  <Modal
    :activeModal="$store.state.affinityGroup.modal"
    @close="closeModal"
    :title="
      type === 'add'
        ? 'Add Affinity Group'
        : type === 'edit'
        ? 'Edit Affinity Group'
        : 'View Affinity Group'
    "
    labelClass="btn-outline-dark"
    sizeClass="max-w-md"
  >
    <AddRecord v-if="type === 'add'" />
    <EditRecord v-if="type === 'edit'" />
    <ViewRecord v-if="type === 'view'" />
  </Modal>
</template>
<script>
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";
import { MenuItem } from "@headlessui/vue";
// import { affinityGroups } from "@/constant/c";
import AddRecord from "../affinityGroup-add.vue";
import EditRecord from "../affinityGroup-edit.vue";
import ViewRecord from "../affinityGroup-preview.vue";
// import moment from "moment";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

// import { debounce } from "lodash";
import {
  computed,
  onMounted,
  // watch,
  reactive,
  ref,
  watch,
} from "vue";
import window from "@/mixins/window";
// import store from "@/store";

export default {
  mixins: [window],
  components: {
    AddRecord,
    EditRecord,
    ViewRecord,
    Pagination,
    InputGroup,
    Modal,
    Dropdown,
    Icon,
    Card,
    MenuItem,
    Button,
    VueTailwindDatePicker,
  },

  data() {
    return {
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
        // {
        //   name: "view",
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
          label: "Group Name",
          field: "affinityGroupName",
        },
        {
          label: "Group Code",
          field: "affinityGroupCode",
        },
        {
          label: "Description",
          field: "description",
        },
        {
          label: "Date Created",
          field: "createdAt",
        },
        {
          label: "Date Modified",
          field: "modifiedAt",
        },

        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  methods: {
    openModal() {
      this.$store.dispatch("openModal");
    },
    closeModal() {
      this.$store.dispatch("closeModal");
    },

    toggleDeleteModal(boolean) {
      this.$store.dispatch("setDeleteModal", boolean);
    },

    generateAction(name, group) {
      this.id = group?.id;

      const actions = {
        edit: {
          name: "edit",
          icon: "heroicons:pencil-square",
          doit: () => {
            this.$store.dispatch("setSelectedGroupToEdit", group);
            this.type = "edit";
            this.openModal();
          },
        },
        delete: {
          name: "delete",
          icon: "heroicons-outline:trash",
          doit: () => {
            this.type = name;
            this.toggleDeleteModal(true);
          },
        },
      };

      return actions[name] || null;
    },
    handleStatus() {
      if (this.type === "approve") {
        this.$store.dispatch("enableUser", this.id);
      } else {
        this.$store.dispatch("disableUser", this.id);
      }
    },
    handleDelete() {
      this.$store.dispatch("deleteAffinityGroup", this.id);
    },
    // handleActions(value) {
    //   if (value === "active") {
    //     return this.actions.filter((i) => i.name !== "approve");
    //   }
    //   if (value === "delist") {
    //     return this.actions.filter((i) => i.name !== "delist");
    //   }
    //   if (value === "pendingactivation") {
    //     return this.actions.filter(
    //       (i) => i.name !== "delist" && i.name !== "approve"
    //     );
    //   }
    //   return value;
    // },
  },
  setup() {
    onMounted(() => {
      getAllAffinityGroups();
    });
    const { state, dispatch } = useStore();
    const total = ref(10000);
    const deleteLoading = ref(false);
    const deleteAffinityGroupSuccess = computed(
      () => state.affinityGroup.deleteAffinityGroupSuccess
    );
    const toast = useToast();

    const modal = ref(null);
    const deleteModal = ref(null);
    const modalChange = ref(null);
    const modalStatus = ref(null);
    const query = reactive({
      pageNumber: 1,
      pageSize: 10,
      searchParameter: "",
      sortOrder: "",
    });
    const search = ref("");
    const loading = computed(
      () => state.affinityGroup.getAffinityGroupsLoading
    );
    const affinityGroups = computed(() => {
      return state.affinityGroup.affinityGroups;
    });

    const getAllAffinityGroups = () => {
      dispatch("getAffinityGroups", { ...query });
    };

    // function fetchRecords(page) {
    //   dispatch("getUsers", { ...query, pageNumber: page });
    // }

    function perPage({ currentPerPage }) {
      query.pageNumber = 1;
      query.pageSize = currentPerPage;
    }
    watch(deleteAffinityGroupSuccess, () => {
      if (deleteAffinityGroupSuccess.value) {
        dispatch("setDeleteModal", false);
        toast.success("Successfully deleted");
        dispatch("getAffinityGroups");
      }
    });
    watch(
      () => [query.pageNumber, query.pageSize],
      () => {
        dispatch("getAffinityGroups", query);
      }
    );
    return {
      query,
      total,
      // fetchRecords,
      deleteModal,
      loading,
      deleteLoading,
      affinityGroups,
      search,

      modal,
      modalChange,
      modalStatus,
      perPage,
    };
  },
};
</script>
<style lang="scss"></style>

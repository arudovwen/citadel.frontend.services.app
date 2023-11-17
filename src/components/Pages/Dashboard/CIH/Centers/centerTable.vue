<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <div class="">
          <InputGroup
            v-model="query.searchParameter"
            placeholder="Search"
            type="text"
            prependIcon="heroicons-outline:search"
            merged
            classInput="min-w-[220px] !h-9"
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
            <span
              v-if="props.column.field == 'email'"
              class="font-medium lowercase"
            >
              {{ props.row.email }}
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
                      :class="`
                
                  ${
                    item.name === 'delete'
                      ? 'bg-danger-500 text-danger-500 bg-opacity-30  hover:bg-opacity-100 hover:text-white'
                      : 'hover:bg-slate-900 hover:text-white'
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center `"
                    >
                      <span class="text-base"><Icon :icon="item.icon" /></span>
                      <span>{{ item.name }}</span>
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
    ref="modal"
    sizeClass="max-w-md"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure about this action?
    </div>
    <div v-if="type.toLowerCase() === 'delist'">
      <textarea
        resize="none"
        class="px-3 py-3 border border-gray-200 rounded-lg w-full"
        rows="4"
        placeholder="Provide reason"
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
          text="Proceed"
          btnClass="btn-dark btn-sm"
          @click="$refs.modal.closeModal()"
        />
      </div>
    </template>
  </Modal>
</template>
<script>
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal/Modal";
import { MenuItem } from "@headlessui/vue";
import { membersTable } from "@/constant/basic-tablle-data";
import moment from "moment";
import { useStore } from "vuex";
import { debounce } from "lodash";
import { computed, onMounted, watch, reactive, ref } from "vue";
import window from "@/mixins/window";
import { useToast } from "vue-toastification";
// import store from "@/store";

export default {
  mixins: [window],
  components: {
    Pagination,
    InputGroup,
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
          icon: "heroicons-outline:eye",
          doit: ({ userId }) => {
            this.$router.push("/profile/" + userId);
          },
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
          field: "email",
        },

        {
          label: "Phone",
          field: "mobile1",
        },
        {
          label: "Gender",
          field: "gender",
        },
        // {
        //   label: "Role",
        //   field: "role",
        // },
        {
          label: "DOB",
          field: "dateOfBirth",
        },

        // {
        //   label: "Department",
        //   field: "department",
        // },
        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  methods: {
    handleActions(value) {
      if (value === "active") {
        return this.actions.filter((i) => i.name !== "approve");
      }
      if (value === "delete") {
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
    const modal = ref(null);
    const modalChange = ref(null);
    const modalStatus = ref(null);
    const query = reactive({
      pageNumber: 1,
      pageSize: 25,
      searchParameter: "",
      isFirstTimer: false,
    });
    const toast = useToast();
    const { state, dispatch } = useStore();
    onMounted(() => {
      dispatch("getAllBiodata", query);
      dispatch("getRoles");
    });
    function fetchRecords(page) {
      dispatch("getAllBiodata", { ...query, pageNumber: page });
    }

    function perPage({ currentPerPage }) {
      query.pageNumber = 1;
      query.pageSize = currentPerPage;
    }
    const search = ref("");
    const loading = computed(() => state.profile.loading);
    const members = computed(() => {
      if (state?.profile?.allbiodata) {
        return state?.profile?.allbiodata.map((item) => {
          item.fullName = `${item.firstName} ${item.surName}`;
          item.dateOfBirth = item?.dateOfBirth
            ? moment(item?.dateOfBirth).format("ll")
            : "-";
          item.department = item?.department ? item?.department : "-";

          return item;
        });
      }
      return [];
    });
    const total = computed(() => state.profile.total);
    const roles = computed(() => state.profile.roles);
    const addsuccess = computed(() => state.profile.profileCreated);
    const deleteloading = computed(() => state.profile.deleteloading);
    const deletesuccess = computed(() => state.profile.deletesuccess);

    function handleDelete(id) {
      dispatch("deleteBiodata", id);
    }

    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce((searchValue) => {
      dispatch("getAllBiodata", { ...query, searchParameter: searchValue });
    }, debounceDelay);
    watch(addsuccess, () => {
      addsuccess.value && dispatch("getAllBiodata", query);
      modalChange.value.closeModal();
    });

    watch(deletesuccess, () => {
      if (deletesuccess.value) {
        dispatch("getAllBiodata", query);
        toast.success("Mmeber deleted");
        modal.value.closeModal();
      }
    });

    watch(search, () => {
      debouncedSearch(search.value);
    });
    watch(
      () => [query.pageNumber, query.pageSize],
      () => {
        dispatch("getAllBiodata", query);
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
      handleDelete,
      modal,
      modalChange,
      modalStatus,
      perPage,
      state,
    };
  },
};
</script>
<style lang="scss"></style>

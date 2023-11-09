<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <div class="flex gap-x-3">
          <div
            v-if="state.auth.userData.userRole.toLowerCase() === 'hod'"
            class="flex md:mb-0 mb-3 border border-gray-200 rounded text-sm"
          >
            <button
              class="px-4 py-2 border-r border-gray-200 last:border-none capitalize min-w-[90px] text-center"
              :class="activeFilter === n ? 'bg-gray-100' : ''"
              @click="activeFilter = n"
              v-for="n in filters"
              :key="n"
            >
              {{ n }}
            </button>
          </div>
          <InputGroup
            v-model="query.searchParameter"
            placeholder="Search"
            type="text"
            prependIcon="heroicons-outline:search"
            merged
            classInput="min-w-[220px] !h-9"
          />
        </div>
        <div
          class="md:flex md:space-x-3 items-center flex-none"
          :class="window.width < 768 ? 'space-x-rb' : ''"
        >
          <VueTailwindDatePicker
            v-model="dateValue"
            :formatter="formatter"
            input-classes="form-control h-[36px]"
            placeholder="Select date"
            as-single
          />
          <Button
            icon="clarity:export-line"
            text="Export"
            btnClass=" btn-outline-secondary text-slate-600 dark:border-slate-700 dark:text-slate-300 font-normal btn-sm "
            iconClass="text-lg"
          />
          <!-- <Button
            icon="ri:user-add-line"
            text="Add Member"
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
            <span v-if="props.column.field == 'order'" class="font-medium">
              {{ "#" + props.row.order }}
            </span>
            <span
              v-if="props.column.field == 'date'"
              class="text-slate-500 dark:text-slate-400"
            >
              {{ props.row.date }}
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
                  <MenuItem v-for="(item, i) in filteredActions" :key="i">
                    <div
                      @click="item.doit(item.name)"
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
      Are you sure you want to {{ type }} this department?
    </div>
    <div v-if="type.toLowerCase() === 'reject'">
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
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
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
import {
  computed,
  onMounted,
  watch,
  reactive,
  ref,
  getCurrentInstance,
} from "vue";

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
      type: "",
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
          name: "Approve",
          icon: "ph:check",
          doit: (name) => {
            this.type = name;
            this.$refs.modal.openModal();
          },
        },
        {
          name: "Reject",
          icon: "ph:x-light",
          doit: (name) => {
            this.type = name;
            this.$refs.modal.openModal();
          },
        },
        {
          name: "view",
          icon: "heroicons-outline:eye",
          doit: (name) => {
            this.type = name;
            this.$refs.modalChange.openModal();
          },
        },

        {
          name: "delete",
          icon: "heroicons-outline:trash",
          doit: (name) => {
            this.type = name;
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
          field: "mobile1",
        },

        {
          label: "Email",
          field: "email",
        },
        {
          label: "Dob",
          field: "dateOfBirth",
        },
        // {
        //   label: "Status",
        //   field: "status",
        // },
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
        edit: {
          name: "edit",
          icon: "heroicons:pencil-square",
          doit: () => {
            this.$router.push("/members-management/edit/" + id);
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
  computed: {
    filteredActions() {
      return this.activeFilter === "all"
        ? this.actions.filter(
            (i) =>
              i.name.toLowerCase() !== "approve" &&
              i.name.toLowerCase() !== "reject"
          )
        : this.actions;
    },
  },
  setup() {
    const route = useRoute();
    const query = reactive({
      pageNumber: 1,
      pageSize: 10,
      sortOrder: "",
      searchParameter: "",
      department: route.params.name,
    });
    const { state, dispatch } = useStore();
    dispatch("getAffiliationByMemberQuery", query);
    const id = ref(null);
    const modal = ref(null);
    const modalChange = ref(null);
    const modalStatus = ref(null);
    const filters = computed(() => {
      if (state.auth.userData.userRole.toLowerCase() === "hod") {
        return ["all", "pending"];
      } else {
        return ["all"];
      }
    });
    onMounted(() => {
      dispatch("getAffiliationByMemberQuery", query);
      dispatch("getRoles");
      id.value = getCurrentInstance().data.id;
    });
    function fetchRecords(page) {
      dispatch("getAffiliationByMemberQuery", { ...query, pageNumber: page });
    }

    function perPage({ currentPerPage }) {
      query.pageNumber = 1;
      query.pageSize = currentPerPage;
    }
    const search = ref("");
    const loading = computed(() => state.member.loading);
    const members = computed(() => {
      if (state?.member?.data) {
        return state?.member?.data?.map((item) => {
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
    const addsuccess = computed(() => state.profile.addsuccess);
    const deleteloading = computed(() => state.profile.deleteloading);
    const deletesuccess = computed(() => state.profile.deletesuccess);

    function handleDelete() {
      dispatch("disableUser", id.value);
    }

    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce((searchValue) => {
      dispatch("getAffiliationByMemberQuery", { ...query, name: searchValue });
    }, debounceDelay);
    watch(addsuccess, () => {
      addsuccess.value && dispatch("getAffiliationByMemberQuery", query);
      modalChange.value.closeModal();
    });

    watch(deletesuccess, () => {
      if (deletesuccess.value) {
        dispatch("getAffiliationByMemberQuery", query);
        modalStatus.value.closeModal();
      }
    });

    watch(
      () => query.searchParameter,
      () => {
        debouncedSearch(query.searchParameter);
      }
    );
    watch(
      () => [query.pageNumber, query.pageSize],
      () => {
        dispatch("getAffiliationByMemberQuery", query);
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
      filters,
      state,
    };
  },
};
</script>
<style lang="scss"></style>

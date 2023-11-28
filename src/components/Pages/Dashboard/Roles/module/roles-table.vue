<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 justify-between items-center">
        <div
          class="md:flex md:space-x-3 items-center flex-none"
          :class="window.width < 768 ? 'space-x-rb' : ''"
        >
          <InputGroup
            v-model="query.searchParameter"
            placeholder="Search"
            type="text"
            prependIcon="heroicons-outline:search"
            merged
            classInput="min-w-[220px] !h-9"
          />

          <!-- <VueTailwindDatePicker
            v-model="dateValue"
            :formatter="formatter"
            input-classes="form-control h-[36px]"
            placeholder="Select date"
            as-single
          /> -->
        </div>
        <div
          class="md:flex md:space-x-3 items-center flex-none"
          :class="window.width < 768 ? 'space-x-rb' : ''"
        >
          <Button
            icon="heroicons-outline:plus-sm"
            text="Add Role"
            btnClass="
          btn-primary font-normal btn-sm "
            iconClass="text-lg"
            @click="
              () => {
                type = 'add';
                $store.dispatch('openRoleModal');
              }
            "
          />
        </div>
      </div>

      <div class="-mx-6">
        <vue-good-table
          :columns="columns"
          :isLoading="loading"
          mode="remote"
          styleClass="vgt-table"
          :rows="roles || []"
          :sort-options="{
            enabled: false,
          }"
          :pagination-options="{
            enabled: true,
            perPage: query.pageSize,
          }"
        >
          <template v-slot:table-row="props">
            <span v-if="props.column.field == 'name'" class="flex items-center">
              <span
                :class="
                  props.row.isOnline === true
                    ? 'text-slate-600'
                    : 'text-slate-300'
                "
                class="text-sm dark:text-slate-300 capitalize font-medium"
                >{{ props.row.roleName }}</span
              >
            </span>
            <span
              v-if="props.column.field == 'capacity'"
              class="flex items-center"
            >
              <span
                :class="
                  props.row.isOnline === true
                    ? 'text-slate-600'
                    : 'text-slate-300'
                "
                class="text-sm dark:text-slate-300 capitalize font-medium"
                >{{ props.row.capacity }}</span
              >
            </span>

            <span
              v-if="props.column.field == 'description'"
              class="flex items-center"
            >
              <span
                :class="
                  props.row.isOnline === true
                    ? 'text-slate-600'
                    : 'text-slate-300'
                "
                class="text-sm dark:text-slate-300 capitalize font-medium"
                >{{ props.row.description }}</span
              >
            </span>
            <span
              v-if="props.column.field == 'location'"
              class="flex items-center"
            >
              <span
                :class="
                  props.row.isOnline === true
                    ? 'text-slate-600'
                    : 'text-slate-300'
                "
                class="text-sm dark:text-slate-300 capitalize font-medium"
                >{{ props.row.location }}</span
              >
            </span>

            <span v-if="props.column.field == 'action'">
              <Dropdown classMenuItems="w-[140px]">
                <span class="text-xl">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
                <template v-slot:menus>
                  <MenuItem v-for="(item, i) in actions" :key="i">
                    <div
                      @click="item.doit(item.name, props.row)"
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
    title="Delete Role"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this role?
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm"
          @click="$refs.modal.closeModal()"
        />
        <Button
          :isLoading="deleteRoleLoading"
          :disabled="deleteRoleLoading"
          text="Delete"
          btnClass="btn-danger btn-sm"
          @click="handleDelete(id)"
        />
      </div>
    </template>
  </Modal>
  <ModalCrud
    :activeModal="$store.state.role.modal"
    @close="$store.dispatch('closeRoleModal')"
    centered
    :title="
      type === 'add' ? 'Add Role' : type === 'edit' ? 'Edit Role' : 'View Role'
    "
    labelClass="btn-outline-dark"
    sizeClass="max-w-3xl"
  >
    <AddRole v-if="type === 'add'" />
    <EditRole v-if="type === 'edit'" />
    <ViewRole v-if="type === 'view'" />
  </ModalCrud>
</template>
<script>
// import VueTailwindDatePicker from "vue-tailwind-datepicker";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import { MenuItem } from "@headlessui/vue";
import window from "@/mixins/window";
import ModalCrud from "@/components/Modal";
import Modal from "@/components/Modal/Modal";
import AddRole from "../role-add.vue";
import EditRole from "../role-edit.vue";
import ViewRole from "../role-preview.vue";
import { useStore } from "vuex";
import { debounce } from "lodash";
import { useToast } from "vue-toastification";
import { provide, computed, reactive, onMounted, watch, ref } from "vue";
export default {
  mixins: [window],
  components: {
    ModalCrud,
    AddRole,
    EditRole,
    ViewRole,
    Modal,
    Pagination,
    InputGroup,
    Dropdown,
    Icon,
    Card,
    MenuItem,
    Button,
    // VueTailwindDatePicker,
  },
  setup() {
    onMounted(() => {
      // getRoles();
      getModules();
      getPermissions();
    });
    const { state, dispatch } = useStore();
    const userId = computed(() => state.auth.userData.id);
    const loading = computed(() => state.role.getRoleLoading);
    const toast = useToast();
    const total = computed(() => state.venue.total);

    const deleteRoleLoading = computed(() => state.role.deleteRoleLoading);
    const deleteRoleSuccess = computed(() => state.role.deleteRoleSuccess);
    const modal = ref();
    const query = reactive({
      pageNumber: 1,
      pageSize: 10000,
    });

    const roles = computed(() => {
      return state.role.roles;
    });

    const accessories = computed(() => state.accessory.accessories);

    const getRoles = () => {
      dispatch("getRoles", query);
    };
    const getPermissions = () => {
      dispatch("getPermissions", { pageNumber: 1, pageSize: 10000 });
    };

    const getModules = () => {
      dispatch("getModules", { pageNumber: 1, pageSize: 10000 });
    };

    function perPage({ currentPerPage }) {
      query.pageNumber = 1;
      query.pageSize = currentPerPage;
    }
    const debounceDelay = 800;
    const debouncedSearch = debounce(() => {
      getRoles();
    }, debounceDelay);

    function handleDelete(id) {
      dispatch("deleteRole", id);
    }

    watch(deleteRoleSuccess, () => {
      if (deleteRoleSuccess.value) {
        dispatch("getRoles", query);
        toast.success("Role deleted");
        modal.value.closeModal();
      }
    });

    watch(
      () => query.searchParameter,
      () => {
        debouncedSearch();
      }
    );

    watch(
      () => [query.pageNumber, query.pageSize],
      () => {
        getRoles();
      }
    );

    provide("userId", userId);
    provide("query", query);
    provide("accessories", accessories);

    return {
      total,
      perPage,
      roles,
      query,
      loading,
      handleDelete,
      modal,
      deleteRoleLoading,
    };
  },

  data() {
    return {
      current: 1,
      perpage: 10,
      pageRange: 5,
      searchTerm: "",
      isOpen: false,
      id: null,
      type: "view",
      dateValue: null,
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      actions: [
        {
          name: "view",
          icon: "heroicons-outline:eye",
          doit: (name, role) => {
            this.type = name;
            this.$store.dispatch("openRoleModal", role);
            this.$store.dispatch("getRoleById", role.id);
          },
        },
        {
          name: "edit",
          icon: "heroicons:pencil-square",
          doit: (name, role) => {
            this.type = name;
            this.$store.dispatch("openRoleModal", role);
            this.$store.dispatch("getRoleById", role.id);
          },
        },
        {
          name: "delete",
          icon: "heroicons-outline:trash",
          doit: (name, { id }) => {
            this.id = id;
            // console.log(name);
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
          field: "name",
        },
        {
          label: "Capacity",
          field: "capacity",
        },
        {
          label: "Description",
          field: "description",
        },

        // {
        //   label: "Accessories",
        //   field: "accessories",
        // },

        {
          label: "Status",
          field: "status",
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
            this.type = "edit";
            this.$refs.modalChange.openModal();
          },
        },
        Delist: {
          name: "Delist",
          icon: "ph:x-light",
          doit: () => {
            this.$router.push("/members-management/add");
          },
        },
        view: {
          name: "view",
          icon: "heroicons-outline:eye",
          doit: (name) => {
            this.type = name;
            this.$refs.modalChange.openModal();
          },
        },
        edit: {
          name: "edit",
          icon: "heroicons:pencil-square",
          doit: (name) => {
            this.type = name;
            this.$refs.modalChange.openModal();
          },
        },
        delete: {
          name: "delete",
          icon: "heroicons-outline:trash",
          doit: (name) => {
            this.type = name;
            this.$refs.modal.openModal();
          },
        },
      };

      return actions[name] || null;
    },
  },
};
</script>
<style lang="scss"></style>

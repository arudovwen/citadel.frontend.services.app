<!-- eslint-disable no-unused-vars -->
<template>
  <div>
    <!-- {{ query }}{{ zoneObj }} -->
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <div class="md:flex gap-x-4 rounded text-sm">
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
            classInput="bg-white !h-9 min-w-[150px] mt-2 md:mt-0 !min-h-[36px]"
          />
        </div>
        <div
          class="md:flex md:space-x-3 items-center flex-none"
          :class="window.width < 768 ? 'space-x-rb' : ''"
        >
          <router-link
            :to="`/cih/zones/zone-members/${route.params.zoneId}?name=${route.query.name}`"
          >
            <Button
              text="View all members in this zone"
              btnClass=" btn-dark font-normal btn-sm w-full mt-2 md:mt-0"
              iconClass="text-lg"
            />
          </router-link>
          <div class="flex justify-between w-full box-border mt-2 md:mt-0">
            <Button
              v-if="permissions.includes('CAN_CREATE_CENTERS')"
              icon="mdi:house-group-add"
              text="Add center"
              btnClass=" btn-primary font-normal btn-sm "
              iconClass="text-lg"
              @click="
                () => {
                  type = 'add';
                  $refs.modalChange.openModal();
                }
              "
            />
            <export-excel
              :data="centers || []"
              worksheet="centers"
              :name="`${route.query.name}-centers.csv`"
              type="csv"
            >
              <Button
                icon="clarity:export-line"
                text="Export"
                btnClass=" btn-outline-secondary text-slate-600 dark:border-slate-700 dark:text-slate-300 font-normal btn-sm md:ml-4"
                iconClass="text-lg"
              />
            </export-excel>
          </div>
        </div>
      </div>
      <div class="-mx-6">
        <vue-good-table
          :columns="columns"
          mode="remote"
          styleClass=" vgt-table  centered "
          :rows="centers"
          :sort-options="{
            enabled: false,
          }"
          :pagination-options="{
            enabled: false,
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
            <span v-if="props.column.field == 'centerName'" class="font-medium">
              <router-link
                class="hover:underline"
                :to="`/cih/zones/center/${props.row.id}?name=${props.row.centerName}`"
              >
                {{ props.row.centerName }}
              </router-link>
            </span>
            <span
              v-if="props.column.field == 'date'"
              class="text-slate-500 dark:text-slate-400"
            >
              {{ props.row.date }}
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
              <Dropdown classMenuItems=" w-[160px]">
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
        </vue-good-table>
      </div>
    </Card>
  </div>

  <Modal
    title="Delete Center"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this center?
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
      type === 'add'
        ? 'Add center'
        : type === 'edit'
        ? 'Edit center'
        : 'View center'
    "
    labelClass="btn-outline-dark"
    ref="modalChange"
    sizeClass="max-w-md"
  >
    <AddRecord v-if="type === 'add'" />
    <EditRecord v-if="type === 'edit'" />
  </Modal>
</template>
<script>
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Select from "@/components/Select";
import Modal from "@/components/Modal/Modal";
import { MenuItem } from "@headlessui/vue";
import { advancedTable } from "@/constant/basic-tablle-data";
import AddRecord from "../center-add.vue";
import EditRecord from "../edit-center.vue";
import window from "@/mixins/window";
import { useStore } from "vuex";
import { debounce } from "lodash";
import moment from "moment";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";

import {
  provide,
  ref,
  computed,
  watch,
  reactive,
  getCurrentInstance,
  onMounted,
} from "vue";

export default {
  mixins: [window],
  components: {
    AddRecord,
    EditRecord,
    Select,
    InputGroup,
    Modal,
    Dropdown,
    Icon,
    Card,
    MenuItem,
    Button,
    // eslint-disable-next-line vue/no-unused-components
    VueTailwindDatePicker,
  },

  setup() {
    const route = useRoute();
    const permissions = computed(() => state.auth.permissions);
    const filters = [
      {
        label: "Default",
        value: "",
      },

      {
        label: "Name",
        value: "centerName",
      },

      {
        label: "Location",
        value: "description",
      },
    ];
    onMounted(() => {
      dispatch("getAllCentersTotal", query);
      dispatch("getZones", { pageNumber: 1, pageSize: 25000 });
      dispatch("getUsers", { pageSize: 250000, pageNumber: 1 });
      id.value = getCurrentInstance().data.id;
    });
    const membersOptions = computed(() =>
      state?.member?.data.map((i) => {
        return {
          label: i.fullName,
          value: i.userId,
        };
      })
    );
    const { state, dispatch } = useStore();
    const toast = useToast();
    const deleteCenterSuccess = computed(
      () => state.center.deleteCenterSuccess
    );
    const zoneObj = ref({
      label: "",
      zoneId: "",
    });
    const zone = ref("");

    const initialValue = {
      pageNumber: 1,
      pageSize: 25,
      name: "",
      searchParameter: "",
      zoneId: route.params.zoneId,
      sortOrder: "",
    };
    // const zoneId = computed(() => zone.value.zoneId);
    const query = reactive({
      ...initialValue,
    });

    const id = ref(null);

    const zoneOptions = computed(() =>
      state?.zone?.zones.map((i) => {
        return {
          label: i.zoneName,
          zoneId: i.id,
        };
      })
    );
    const modal = ref(null);
    const modalChange = ref(null);
    const closeModal = () => modalChange.value.closeModal();
    const closeDeleteModal = () => modal.value.closeModal();

    const loading = computed(() => state.center.loading);
    const centers = computed(() =>
      state.center.centers.map((i) => {
        i.createdAt = moment(i.createdAt).format("ll");
        i.location = i.description ? i.description : "-";
        i.zone = zoneOptions?.value?.find(
          (b) => b?.zoneId === i?.zoneId
        )?.label;
        i.total = i.total ? i.total : 0;
        i.cordinator = i?.userId
          ? membersOptions?.value?.find((b) => b?.value === i?.userId)?.label
          : "-";
        return i;
      })
    );
    const total = computed(() => state.center.total);
    const updatesuccess = computed(() => state.center.updateCenterSuccess);
    const addsuccess = computed(() => state.center.addCenterSuccess);
    const deleteloading = computed(() => state.center.deleteCenterLoading);
    const deletesuccess = computed(() => state.center.deleteCenterSuccess);

    provide("closeModal", closeModal);
    // eslint-disable-next-line no-unused-vars
    function handleDelete() {
      dispatch("deleteCenter", state.center.deleteId);
    }

    watch(deleteCenterSuccess, () => {
      if (deleteCenterSuccess.value) {
        console.log("SuccessfullyDeleted");
        closeDeleteModal();
        toast.success("Successfully Deleted");
        dispatch("getAllCentersTotal", query);
      }
    });
    function perPage({ currentPerPage }) {
      query.pageNumber = 1;
      query.pageSize = currentPerPage;
    }
    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce((searchValue) => {
      dispatch("getAllCentersTotal", { ...query, name: searchValue });
    }, debounceDelay);
    watch(addsuccess, () => {
      addsuccess.value && dispatch("getAllCentersTotal", query);
      modalChange.value.closeModal();
    });
    watch(updatesuccess, () => {
      updatesuccess.value && dispatch("getAllCentersTotal", query);
    });

    watch(deletesuccess, () => {
      if (deletesuccess.value) {
        dispatch("getAllCentersTotal", query);
        modal.value.closeModal();
      }
    });

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
    watch(zoneObj, (newValue) => {
      query.zoneId = newValue.zoneId;
    });
    watch(
      () => query.zoneId,
      () => {
        dispatch("getAllCentersTotal", query);
      }
    );
    provide("closeModal", closeModal);
    provide("zoneOptions", zoneOptions);
    // provide("initialValue", initialValue);
    provide("query", query);

    return {
      // zoneId,
      route,
      zone,
      zoneObj,
      zoneOptions,
      modal,
      modalChange,
      centers,
      loading,
      total,
      query,
      perPage,
      deleteloading,
      handleDelete,
      filters,
      permissions,
    };
  },

  data() {
    return {
      advancedTable,
      current: 1,
      perpage: 10,
      pageRange: 5,
      searchParameter: "",
      type: "",
      id: null,
      reason: "",
      activeFilter: "all",
      dateValue: null,
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      // zone: "",
      // zoneOptions: [
      //   {
      //     value: "option2",
      //     label: "Zone 1",
      //   },
      //   {
      //     value: "option3",
      //     label: "Zone 2",
      //   },
      // ],
      center: "",
      centerOptions: [
        {
          value: "option2",
          label: "Center 1",
        },
        {
          value: "option3",
          label: "Center 2",
        },
      ],
      // provide: {
      //   // Provide a method
      //   closeModal: () => this.$refs.Modal.closeModal(),
      // },
      actions: [
        {
          name: "view members",
          icon: "heroicons-outline:eye",
          doit: (name, { id, centerName }) => {
            this.type = name;
            this.$router.push(`/cih/zones/center/${id}?name=${centerName}`);
          },
        },
        {
          name: "edit",
          icon: "heroicons:pencil-square",
          doit: (name, data) => {
            this.type = name;
            this.$refs.modalChange.openModal();
            this.$store.dispatch("setCenterToUpdate", data);
          },
        },

        {
          name: "delete",
          icon: "heroicons-outline:trash",
          doit: (name, { id }) => {
            this.type = name;
            this.$refs.modal.openModal();
            this.$store.dispatch("setDeleteId", id);
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
        // {
        //   label: "Date created",
        //   field: "createdAt",
        // },
        {
          label: "Center Name",
          field: "centerName",
        },

        {
          label: "Total members",
          field: "totalmembers",
        },

        {
          label: "Location",
          field: "location",
        },

        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  methods: {
    handleStatus() {
      if (this.type === "approve") {
        this.$store.dispatch("enableUser", this.id);
      } else {
        this.$store.dispatch("disableUser", this.id);
      }
    },
    handleActions(value) {
      if (value === "active") {
        return this.actions.filter((i) => i.name.toLowerCase() !== "approve");
      }
      if (value === "delist") {
        return this.actions.filter((i) => i.name.toLowerCase() !== "delist");
      }
      if (value === "pendingactivation") {
        return this.actions.filter(
          (i) =>
            i.name.toLowerCase() !== "delist" &&
            i.name.toLowerCase() !== "approve"
        );
      }
      return value;
    },
  },
  computed: {
    filteredActions() {
      return this.activeFilter === "all"
        ? this.actions.filter(
            (i) =>
              i.name.toLowerCase() !== "approve" &&
              i.name.toLowerCase() !== "delist"
          )
        : this.actions;
    },
  },
};
</script>
<style lang="scss"></style>

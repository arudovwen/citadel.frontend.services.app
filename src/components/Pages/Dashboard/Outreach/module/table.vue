<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <div class="flex gap-x-4 items-center">
          <InputGroup v-model="query.searchParameter" placeholder="Search" type="text"
            prependIcon="heroicons-outline:search" merged classInput="min-w-[220px] !h-9" />

          <VueTailwindDatePicker v-model="query.startDate" :formatter="formatter" input-classes="form-control h-[36px]"
            placeholder="Start date" as-single />
          <VueTailwindDatePicker v-model="query.endDate" :formatter="formatter" input-classes="form-control h-[36px]"
            placeholder="End date" as-single />
        </div>
        <div class="md:flex md:space-x-3 items-center flex-none" :class="window.width < 768 ? 'space-x-rb' : ''">
          <Button v-if="permissions?.includes('CAN_CREATE_OUTREACH')" icon="heroicons-outline:plus-sm"
            text="Create outreach" btnClass=" btn-primary font-normal btn-sm " iconClass="text-lg" @click="

              type = 'add';
            $refs.modalChange.openModal();
            " />
        </div>
      </div>
      <div class="-mx-6">
        <vue-good-table :columns="columns" :isLoading="outreachListLoading" mode="remote" styleClass=" vgt-table  centered "
          :rows="outreachs" :sort-options="{
            enabled: false,
          }" :pagination-options="{
  enabled: true,
  perPage: query.pageSize,
}">
          <template v-slot:table-row="props">
            <span v-if="props.column.field == 'customer'" class="flex items-center">
              <span class="w-7 h-7 rounded-full mr-3 flex-none">
                <img :src="require('@/assets/images/all-img/' +
                  props.row.customer.image)
                  " :alt="props.row.customer.name" class="object-cover w-full h-full rounded-full" />
              </span>
              <span class="text-sm text-slate-600 dark:text-slate-300 capitalize font-medium">{{ props.row.customer.name
              }}</span>
            </span>
            <span v-if="props.column.field == 'order'" class="font-medium">
              {{ "#" + props.row.order }}
            </span>
            <span v-if="props.column.field == 'date'" class="text-slate-500 dark:text-slate-400">
              {{ props.row.date }}
            </span>
            <span v-if="props.column.field == 'status'" class="block w-full">
              <span class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25" :class="`${props.row.status === 'active'
                ? 'text-success-500 bg-success-500'
                : ''
                } 
                                                                                                                                                                                                                                                                        ${props.row.status === 'inactive'
                  ? 'text-warning-500 bg-warning-500'
                  : ''
                }
                                                                                                                                                                                                                                                                        ${props.row.status === 'pending' ? 'text-blue-500 bg-blue-500' : ''}
            
             `">
                {{ props.row.status }}
              </span>
            </span>
            <span v-if="props.column.field == 'action'">
              <Dropdown classMenuItems=" w-[140px]">
                <span class="text-xl">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
                <template v-slot:menus>
                  <MenuItem v-for="(item, i) in actions" :key="i">
                  <div @click="item.doit(item)"
                    :class="`
                
                  ${item.name === 'delete'
                        ? 'bg-danger-500 text-danger-500 bg-opacity-30  hover:bg-opacity-100 hover:text-white'
                        : 'hover:bg-slate-900 hover:text-white'
                      }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center `">
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
          <template #pagination-bottom="props">
            <div class="py-4 px-3">
              <Pagination :total="total" :current="query.pageNumber" :per-page="query.pageSize" :pageRange="pageRange"
                @page-changed="query.pageNumber = $event" :perPageChanged="perPage" enableSearch
                enableSelect :options="options">
                >
              </Pagination>
            </div>
          </template>
        </vue-good-table>
      </div>
    </Card>
  </div>

  <Modal title="Confirm action" label="Small modal" labelClass="btn-outline-dark" ref="modal" sizeClass="max-w-md">
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure about this action?
    </div>
    <div v-if="type.toLowerCase() === 'decline'">
      <textarea resize="none" class="px-3 py-3 border border-gray-200 rounded-lg w-full" rows="4"
        placeholder="Provide reason"></textarea>
    </div>
    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button text="Cancel" btnClass="btn-outline-secondary btn-sm " @click="$refs.modal.closeModal()" />
        <Button text="Proceed" btnClass="btn-dark btn-sm" @click="$refs.modal.closeModal()" />
      </div>
    </template>
  </Modal>
  <Modal :title="type === 'add'
    ? 'Create outreach'
    : type === 'edit'
      ? 'Edit outreach information'
      : type === 'reportadd'
        ? 'Add Report'
        : type === 'reportedit'
          ? 'Edit Report'
          : 'View outreach information'
    " labelClass="btn-outline-dark" ref="modalChange" sizeClass="max-w-3xl">
    <AddRecord v-if="type === 'add'" />
    <EditRecord v-if="type === 'edit'" />
    <ViewRecord v-if="type === 'view'" />
    <AddReport v-if="type === 'reportadd'" />
    <EditReport v-if="type === 'reportedit'" />
  </Modal>
</template>
<script>
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import Modal from "@/components/Modal/Modal";
import AddRecord from "../member-add.vue";
import EditRecord from "../member-edit.vue";
import ViewRecord from "../member-preview.vue";
import AddReport from "../add-report.vue";
import EditReport from "../edit-report.vue";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import { MenuItem } from "@headlessui/vue";
import { useToast } from "vue-toastification";
import { advancedTable } from "@/constant/basic-tablle-data";
import window from "@/mixins/window";
import { computed, onMounted, watch, reactive, ref } from "vue";
import { useStore } from "vuex"


export default {
  mixins: [window],
  components: {
    Pagination,
    InputGroup,
    Dropdown,
    Icon,
    Card,
    MenuItem,
    Button,
    Modal,
    AddRecord,
    EditRecord,
    ViewRecord,
    AddReport,
    EditReport,
    VueTailwindDatePicker,
  },
  provide() {
    return {
      handleModal: this.handleModal,
    };
  },
  data() {
    return {
      advancedTable,
      current: 1,
      pageRange: 5,
      isOpen: false,
      id: null,
      confirmType: "",
      type: "",
      dateValue: null,
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      actions: [
        {
          name: "view",
          icon: "heroicons-outline:eye",
          doit: (data) => {
            this.type = data.name;
            this.$refs.modalChange.openModal();
          },
        },
        {
          name: "edit",
          icon: "heroicons:pencil-square",
          doit: (data) => {
            this.type = data.name;
            this.$refs.modalChange.openModal();
          },
        },
        {
          name: "delete",
          icon: "heroicons-outline:trash",
          doit: (data) => {
            this.type = data.name;
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
          label: "Date",
          field: "date",
        },
        {
          label: "Name",
          field: "outreachName",
        },
        {
          label: "Location",
          field: "locationOfOutreach",
        },

        {
          label: "Description",
          field: "description",
        },

        {
          label: "Status",
          field: "status",
        },
        {
          label: "Report Added",
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
    handleModal(type) {
      this.$refs.modal.closeModal();
      // this.$refs.modalChange.closeModal();
      if (type === "decline" || type === "approve") {
        this.confirmType = type;
        this.$refs.modal.openModal();
      } else {
        this.type = type;

        this.$refs.modalChange.openModal();
      }
    },

  },
  setup() {
    const { state, dispatch } = useStore();
    const toast = useToast()
    const permissions = computed(() => state.auth.permissions);
    const addsuccess = computed(() => state.profile.addOutreachRequestSuccess)
    const query = reactive({
      searchParameter: "",
      startDate: "",
      endDate: "",
      pageNumber: 1,
      pageSize: 5,
    });

    const modal = ref(null);
    const modalChange = ref(null);
    onMounted(() => {
      dispatch("getAllOutreach", query);
      dispatch("getRoles");
    });

    const outreachListLoading = computed(() => state?.profile?.getAllOutreachloading);
    const outreachs = computed(() => {
      if (state?.profile?.allOutreach?.data) {
        return state?.profile?.allOutreach.data.map((item) => {
          // item.fullName = `${item.firstName}  ${item.surName}`;
          // item.dateOfBirth = item?.dateOfBirth
          //   ? moment(item?.dateOfBirth).format("ll")
          //   : "-";
          // item.department = item?.department ? item?.department : "-";
          item.date = new Date(item?.dateOfOutreach).toLocaleDateString()
          return item;
        });
      }
      return [];
    });


    watch(query, () => {
      dispatch("getAllOutreach", query);
    })

    watch(outreachListLoading, () => {
      console.log("outreachListLoadng == ", outreachListLoading.value)
    })
    const total = computed(() => state.profile.allOutreach?.totalCount);
    watch(addsuccess, () => {
      if (addsuccess.value === true) {
        modalChange.value.closeModal();
        dispatch("getAllOutreach", query);
        dispatch("getRoles");
        toast.success("Outreach request added");
      }
    })
    function perPage({ currentPerPage }) {
      query.pageNumber = 1;
      query.pageSize = currentPerPage;
    }

    watch(
      query.pageSize,
      () => {
        console.log(query.pageSize)
      }
    );
    return {
      permissions,
      outreachs,
      modalChange,
      modal,
      query,
      outreachListLoading,
      total,
      perPage
    };
  },
};
</script>
<style lang="scss"></style>

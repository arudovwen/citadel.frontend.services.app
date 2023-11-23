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

          <VueTailwindDatePicker
            v-model="dateValue"
            :formatter="formatter"
            input-classes="form-control h-[36px]"
            placeholder="Select date"
            as-single
          />
        </div>
        <div
          class="md:flex md:space-x-3 items-center flex-none"
          :class="window.width < 768 ? 'space-x-rb' : ''"
        >
          <Button
            icon="heroicons-outline:plus-sm"
            text="Add Venue"
            btnClass="
          btn-primary font-normal btn-sm "
            iconClass="text-lg"
            @click="
              () => {
                type = 'add';
                $store.dispatch('openVenueModal');
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
          styleClass=" vgt-table  centered "
          :rows="venues || []"
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
                class="text-sm text-slate-600 dark:text-slate-300 capitalize font-medium"
                >{{ props.row.venueName }}</span
              >
            </span>

            <!-- <span
              v-if="props.column.field == 'accessories'"
              class="text-slate-500 dark:text-slate-300 text"
            >
              <ol>
                <li v-for="item in props.row.accessories" :key="item.id">
                  {{ item.name }}
                </li>
              </ol>
            </span> -->

            <span v-if="props.column.field == 'status'" class="block w-full">
              <span
                class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
                :class="`${
                  props.row.isOnline === true
                    ? 'text-success-500 bg-success-500'
                    : ''
                } 
              ${
                props.row.isOnline === false
                  ? 'text-warning-500 bg-warning-500'
                  : ''
              }
            
              
               `"
              >
                <span>{{
                  props.row?.isOnline === true ? "Available" : "Booked"
                }}</span>
              </span>
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
          <template #pagination-bottom="props">
            <div class="py-4 px-3">
              <Pagination
                :total="50"
                :current="current"
                :per-page="perpage"
                :pageRange="pageRange"
                @page-changed="current = $event"
                :pageChanged="props.pageChanged"
                :perPageChanged="props.perPageChanged"
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
    title="Delete Venue"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this venue?
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm"
          @click="$refs.modal.closeModal()"
        />
        <Button
          text="Delete"
          btnClass="btn-danger btn-sm"
          @click="$refs.modal.closeModal()"
        />
      </div>
    </template>
  </Modal>
  <ModalCrud
    :activeModal="$store.state.venue.modal"
    @close="$store.dispatch('closeVenueModal')"
    centered
    :title="
      type === 'add'
        ? 'Add Venue'
        : type === 'edit'
        ? 'Edit Venue'
        : 'View Venue'
    "
    labelClass="btn-outline-dark"
    sizeClass="max-w-3xl"
  >
    <AddVenue v-if="type === 'add'" />
    <EditVenue v-if="type === 'edit'" />
    <ViewVenue v-if="type === 'view'" />
  </ModalCrud>
</template>
<script>
import VueTailwindDatePicker from "vue-tailwind-datepicker";
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
import AddVenue from "../venue-add.vue";
import EditVenue from "../venue-edit.vue";
import ViewVenue from "../venue-preview.vue";
import { useStore } from "vuex";
import { debounce } from "lodash";
import { provide, computed, reactive, onMounted, watch } from "vue";
export default {
  mixins: [window],
  components: {
    ModalCrud,
    AddVenue,
    EditVenue,
    ViewVenue,
    Modal,
    Pagination,
    InputGroup,
    Dropdown,
    Icon,
    Card,
    MenuItem,
    Button,
    VueTailwindDatePicker,
  },
  setup() {
    onMounted(() => {
      getVenues();
    });
    const { state, dispatch } = useStore();
    const userId = computed(() => state.auth.userData.id);
    const loading = computed(() => state.venue.getVenueLoading);
    const query = reactive({
      pageNumber: 1,
      pageSize: 25,
      searchParameter: "",
      sortOrder: "",
    });

    const venues = computed(() => {
      return state.venue.venues;
    });

    const getVenues = () => {
      dispatch("getVenues", query);
    };
    const debounceDelay = 800;
    const debouncedSearch = debounce(() => {
      getVenues();
    }, debounceDelay);

    watch(
      () => query.searchParameter,
      () => {
        debouncedSearch();
      }
    );

    watch(
      () => [query.pageNumber, query.pageSize],
      () => {
        getVenues();
      }
    );

    provide("userId", userId);
    provide("query", query);

    return {
      venues,
      query,
      loading,
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
          doit: (name, venue) => {
            this.type = name;
            this.$store.dispatch("openVenueModal", venue);
            // console.log(venue);
          },
        },
        {
          name: "edit",
          icon: "heroicons:pencil-square",
          doit: (name, venue) => {
            this.type = name;
            this.$store.dispatch("openVenueModal", venue);
          },
        },
        {
          name: "delete",
          icon: "heroicons-outline:trash",
          doit: (name) => {
            this.type = name;
            this.$store.dispatch("openVenueModal");
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

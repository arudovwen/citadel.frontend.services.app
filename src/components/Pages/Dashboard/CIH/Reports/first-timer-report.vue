<!-- eslint-disable no-unused-vars -->
<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 justify-between items-center">
        <div class="md:flex md:space-x-3 items-center flex-none">
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
            :options="roleFilters"
            v-model="query.sortOrder"
            placeholder="Sort by"
            classInput="bg-white !h-9 min-w-[150px] !min-h-auto"
          />
        </div>
        <div class="md:flex md:space-x-3 items-center flex-none">
          <export-excel
            :data="reports"
            worksheet="First timers"
            name="firsttimers.xls"
          >
            <Button
              icon="clarity:export-line"
              text="Export"
              btnClass=" btn-outline-secondary text-slate-600 dark:border-slate-700 dark:text-slate-300 font-normal btn-sm "
              iconClass="text-lg"
            />
          </export-excel>
        </div>
      </div>
      <!-- <pre class="">
        {{ reports }}
      </pre> -->
      <div class="-mx-6">
        <vue-good-table
          ref="mytable"
          :columns="columns"
          mode="remote"
          styleClass="vgt-table"
          :isLoading="loading"
          :rows="reports || []"
          :sort-options="{
            enabled: false,
          }"
          :pagination-options="{
            enabled: true,
            perPage: query.pageSize,
          }"
          :select-options="{
            enabled: false,
            selectionInfoClass: 'top-select',
            selectionText:
              'first timers selected, Do you wish to upgrade all these first timers?',
            selectOnCheckboxOnly: true,
            clearSelectionText: 'Clear selection',
          }"
        >
          <template v-slot:table-row="props">
            <span
              v-if="props.column.field == 'fullName'"
              class="flex items-center"
            >
              <span
                class="text-sm text-slate-600 dark:text-slate-300 capitalize font-medium hover:underline"
                ><router-link :to="`/profile/${props.row.userId}`">{{
                  props.row.fullName
                }}</router-link></span
              >
            </span>
            <span v-if="props.column.field == 'order'" class="font-medium">
              {{ "#" + props.row.order }}
            </span>
            <span
              v-if="props.column.field == 'email'"
              class="font-medium lowercase"
            >
              {{ props.row.email }}
            </span>
            <span
              v-if="props.column.field == 'reportDate'"
              class="text-slate-500 dark:text-slate-400"
            >
              {{ moment(props.row.reportDate).format("ll") }}
            </span>
            <span v-if="props.column.field == 'status'" class="block w-full">
              <span
                class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
                :class="{
                  'text-success-500 bg-success-500':
                    props.row.status === 'active',
                  'text-warning-500 bg-warning-500':
                    props.row.status === 'inactive',
                  'text-blue-500 bg-blue-500': props.row.status === 'pending',
                }"
              >
                {{ props.row.status }}
              </span>
            </span>

            <span v-if="props.column.field == 'action'">
              <Dropdown classMenuItems="w-[170px]">
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
                :total="total"
                :current="query.pageNumber"
                :per-page="query.pageSize"
                :pageRange="pageRange"
                @page-changed="query.pageNumber = $event"
                :pageChanged="perPage"
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
    <Modal
      :title="`${report.fullName}'s Report`"
      labelClass="btn-outline-dark"
      ref="modal"
      sizeClass="max-w-lg"
    >
      <div class="flex items-start justify-start w-full min-h-[300px]">
        <div v-html="report.report"></div>
      </div>
      <!-- <FormGroup
        label="First timer report"
        name="summary"
        :error="summaryError"
      >
        <ckeditor
          disabled
          :editor="editor"
          v-model="report.report"
          :config="editorConfig"
        ></ckeditor>
      </FormGroup> -->
    </Modal>
  </div>
</template>

<script setup>
import Modal from "@/components/Modal/Modal";
import Select from "@/components/Select";
// import VueTailwindDatePicker from "vue-tailwind-datepicker";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import { MenuItem } from "@headlessui/vue";
import { useRoute } from "vue-router";
import moment from "moment";
import { useStore } from "vuex";
import { debounce } from "lodash";
import { computed, onMounted, watch, reactive, ref } from "vue";
import { roleFilters } from "@/constant/data";
// import FormGroup from "@/components/FormGroup";

// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const route = useRoute();
const { id } = route.params;
onMounted(() => {
  // dispatch("getAllBiodata", query);

  dispatch("getAllFollowupReportById", { id });
  dispatch("getRoles");
});
const { state, dispatch } = useStore();
// const permissions = computed(() => state.auth.permissions);
// const userId = computed(() => state.auth.userData.id);
const query = reactive({
  pageNumber: 1,
  pageSize: 25,
  searchParameter: "",
});

// const editor = ClassicEditor;

// const editorConfig = {
//   toolbar: {
//     items: [
//       "undo",
//       "redo",
//       "|",
//       "heading",
//       "|",
//       "bold",
//       "italic",
//       "|",
//       "link",

//       "insertTable",

//       "|",
//       "bulletedList",
//       "numberedList",
//       "outdent",
//       "indent",
//     ],
//   },
// };

// const reportQuery = reactive({
//   userId:
// });

const pageRange = ref(5);
const detail = ref(null);
const type = ref("");
const modal = ref(null);
const mytable = ref(null);
const report = ref("");
const loading = computed(() => state?.report?.getallloading);
const reports = computed(() => {
  return state?.report?.data;
  // return [
  //   {
  //     reportDate: "2024-02-26T00:00:00",
  //     reportSender: "Kaine Duru",
  //     report: "He is doing well",
  //     firstTimer: "Bolaji Akinfenwa",
  //   },
  // ];
});
const total = computed(() => state.profile.total);
const actions = ref([
  {
    name: "view report",
    icon: "heroicons-outline:eye",
    doit: (name, data) => {
      type.value = name;
      detail.value = data;
      report.value = detail.value;
      modal.value.openModal();
    },
  },
]);

const options = ref([
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
]);

const columns = ref([
  {
    label: "Report Date",
    field: "reportDate",
  },
  {
    label: "Report Sender",
    field: "createdBy",
  },
  // {
  //   label: "First Timer",
  //   field: "fullName",
  // },

  {
    label: "Action",
    field: "action",
  },
]);

function perPage({ currentPerPage }) {
  query.pageNumber = 1;
  query.pageSize = currentPerPage;
}

const debounceDelay = 800;
const debouncedSearch = debounce((searchValue) => {
  dispatch("getAllBiodata", { ...query, name: searchValue });
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
    dispatch("getAllBiodata", query);
  }
);
</script>
<style lang="scss"></style>

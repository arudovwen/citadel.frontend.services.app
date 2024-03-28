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
            :data="members"
            worksheet="First timers"
            name="firsttimers.csv"
            type="csv"
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
      <div class="-mx-6">
        <vue-good-table
          ref="mytable"
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
          :select-options="{
            enabled: false,
            selectionInfoClass: 'top-select',
            selectionText:
              'first timers selected, Do you wish to upgrade all these first timers?',
            selectOnCheckboxOnly: true,
            clearSelectionText: 'Clear selection',
          }"
          @on-selected-rows-change="selectionChanged"
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
              v-if="props.column.field == 'date'"
              class="text-slate-500 dark:text-slate-400"
            >
              {{ props.row.date }}
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
              <div
                @click="
                  router.push(
                    `/cih/reports/followup/${props.row.id}/${props.row.fullName}`
                  )
                "
                class="text-sm cursor-pointer hover:underline"
              >
                <span>view reports</span>
              </div>
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
  </div>
</template>

<script setup>
import Select from "@/components/Select";
// import VueTailwindDatePicker from "vue-tailwind-datepicker";
import Button from "@/components/Button";
import Card from "@/components/Card";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";

import moment from "moment";
import { useStore } from "vuex";
import { debounce } from "lodash";
import { computed, onMounted, watch, reactive, ref } from "vue";
import { roleFilters } from "@/constant/data";
import { useRouter } from "vue-router";

onMounted(() => {
  dispatch("getAllBiodata", query);
  dispatch("getRoles");
});
const { state, dispatch } = useStore();
// const permissions = computed(() => state.auth.permissions);
const router = useRouter();
const query = reactive({
  pageNumber: 1,
  pageSize: 25,
  searchParameter: "",
  sortOrder: "",
  isFirstTimer: true,
});

const pageRange = ref(5);
const mytable = ref(null);
// const dateValue = ref(null);
// upgradeToMember
// const formatter = ref({
//   date: "DD MMM YYYY",
//   month: "MMM",
// });

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

  {
    label: "DOB",
    field: "dateOfBirth",
  },

  {
    label: "Action",
    field: "action",
  },
]);

function selectionChanged(val) {
  console.log("🚀 ~ file: table.vue:385 ~ selectionChanged ~ val:", val);
}

const loading = computed(() => state.profile.loading);
const members = computed(() => {
  if (state?.profile?.allbiodata) {
    return state?.profile?.allbiodata.map((item) => {
      item.fullName = `${item.firstName} ${item.surName}`;
      item.dateOfBirth = item?.dateOfBirth
        ? moment(item?.dateOfBirth).format("ll")
        : "-";

      item.phone = item.phone ? item.phone : "-";

      return item;
    });
  }
  return [];
});
const total = computed(() => state.profile.total);

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

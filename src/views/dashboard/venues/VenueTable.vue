<template>
  <div>
    <!-- <Card title="" noborder> -->
    <div class="-mx-6">
      <vue-good-table
        :columns="columns"
        styleClass=" vgt-table centered  lesspadding2 table-head "
        :rows="venueTable"
        :pagination-options="{
          enabled: true,
          perPage: perpage,
        }"
        :sort-options="{
          enabled: false,
        }"
        :search-options="{
          //   enabled: true,
          externalQuery: searchTerm,
        }"
        :select-options="{
          enabled: false,
          selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
          selectioninfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectinfo: true, // disable the select info-500 panel on top
          selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
        }"
      >
        <template v-slot:table-row="props">
          <span v-if="props.column.field == 'customer'" class="flex">
            <span class="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
              <img
                :src="props.row.customer.image"
                :alt="props.row.customer.name"
                class="object-cover w-full h-full rounded-full"
              />
            </span>
            <span
              class="text-sm text-slate-600 dark:text-slate-300 capitalize"
              >{{ props.row.customer.name }}</span
            >
          </span>
          <span v-if="props.column.field == 'order'">
            {{ "#" + props.row.order }}
          </span>
          <span
            v-if="props.column.field == 'date'"
            class="text-slate-500 dark:text-slate-300"
          >
            {{ props.row.date }}
          </span>
          <span
            v-if="props.column.field == 'accessories'"
            class="text-slate-500 dark:text-slate-300 text"
          >
            <ol>
              <li v-for="item in props.row.accessories" :key="item.id">
                {{ item.name }}
              </li>
            </ol>
          </span>

          <span v-if="props.column.field == 'status'" class="block w-full">
            <span
              class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
              :class="`${
                props.row.status === 'Available'
                  ? 'text-success-500 bg-success-500'
                  : ''
              } 
              ${
                props.row.status === 'due'
                  ? 'text-warning-500 bg-warning-500'
                  : ''
              }
              ${
                props.row.status === 'Booked'
                  ? 'text-danger-500 bg-danger-500'
                  : ''
              }
              
               `"
            >
              <span>{{ props.row.status }}</span>
            </span>
          </span>
          <span v-if="props.column.field == 'action'">
            <div class="flex space-x-3 rtl:space-x-reverse justify-center">
              <Tooltip placement="top" arrow theme="dark">
                <template #button>
                  <div class="action-btn">
                    <Icon icon="heroicons:eye" />
                  </div>
                </template>
                <span> View</span>
              </Tooltip>
              <Tooltip placement="top" arrow theme="dark">
                <template #button>
                  <div
                    @click="$router.push(`/edit-venue/${props.row.id}`)"
                    class="action-btn"
                  >
                    <Icon icon="heroicons:pencil-square" />
                  </div>
                </template>
                <span> Edit</span>
              </Tooltip>
              <Tooltip placement="top" arrow theme="danger-500">
                <template #button>
                  <!-- <div class="action-btn">
                    <Icon icon="heroicons:trash" />
                  </div> -->

                  <TableDeleteModal
                    :id="props.row.id"
                    @deleteItem="deleteVenue"
                    :activeModal="openDelete"
                    title="Delete Venue"
                    label="Default modal"
                    labelClass="h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded"
                    ref="modal3"
                  >
                    <h4
                      class="font-medium text-center text-lg mb-3 text-slate-900"
                    >
                      Are you sure you want to delete this venue?
                    </h4>
                  </TableDeleteModal>
                </template>

                <span>Delete</span>
              </Tooltip>
            </div>
          </span>
        </template>
        <template #pagination-bottom="props">
          <div class="py-4 px-3 flex justify-center">
            <Pagination
              :total="50"
              :current="current"
              :per-page="perpage"
              :pageRange="pageRange"
              @page-changed="current = $event"
              :pageChanged="props.pageChanged"
              :perPageChanged="props.perPageChanged"
            >
              >
            </Pagination>
          </div>
        </template>
      </vue-good-table>
    </div>
    <!-- </Card> -->
  </div>
</template>
<script setup>
// import Card from "@/components/Card";
import { ref } from "vue";
import TableDeleteModal from "./TableDeleteModal.vue";
import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";
import Pagination from "@/components/Pagination";
import { venueTable } from "../../../constant/basic-tablle-data";
const current = 1;
const perpage = 10;
const pageRange = 5;
const searchTerm = "";
const openDelete = ref(false);

// const toggleDelete = () => {
//   openDelete.value = !openDelete.value;
// };

//
// const options = [
//   {
//     value: "1",
//     label: "1",
//   },
//   {
//     value: "3",
//     label: "3",
//   },
//   {
//     value: "5",
//     label: "5",
//   },
// ];
const columns = [
  {
    label: "Id",
    field: "id",
  },
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

  {
    label: "Accessories",
    field: "accessories",
  },

  {
    label: "Status",
    field: "status",
  },
  {
    label: "Action",
    field: "action",
  },
];

const deleteVenue = (id) => {
  console.log(id);
};
</script>
<style lang="scss" scoped>
.action-btn {
  @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
}
</style>

<template>
  <div>
    <vue-good-table
      :columns="columns"
      styleClass=" vgt-table  lesspadding2 centered "
      :rows="advancedTable"
      :pagination-options="{
        enabled: true,
        perPage: perpage,
      }"
      :sort-options="{
        enabled: false,
      }"
    >
      <template v-slot:table-row="props">
        <span
          v-if="props.column.field == 'activityDate'"
          class="text-slate-500 dark:text-slate-400 whitespace-nowrap"
        >
          {{ moment(props.row.activityDate).format("ll") }}
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
        <span v-if="props.column.field == 'status'" class="block w-full">
          <span
            class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
            :class="`${
              props.row.status === 'paid'
                ? 'text-success-500 bg-success-500'
                : ''
            } 
              ${
                props.row.status === 'due'
                  ? 'text-warning-500 bg-warning-500'
                  : ''
              }
              ${
                props.row.status === 'cancled'
                  ? 'text-danger-500 bg-danger-500'
                  : ''
              }
              
               `"
          >
            {{ props.row.status }}
          </span>
        </span>
        <span v-if="props.column.field == 'action'">
          <div class="flex space-x-3 justify-start">
            <Tooltip placement="top" arrow theme="dark">
              <template #button>
                <div class="action-btn">
                  <Icon icon="heroicons:eye" />
                </div>
              </template>
              <span> View</span>
            </Tooltip>
          </div>
        </span>
      </template>
      <template #pagination-bottom="">
        <div class="py-4 px-3 flex justify-center">
          <!-- <Pagination
              :total="50"
              :current="current"
              :per-page="perpage"
              :pageRange="pageRange"
              @page-changed="current = $event"
              :pageChanged="props.pageChanged"
              :perPageChanged="props.perPageChanged"
            >
              >
            </Pagination> -->
        </div>
      </template>
    </vue-good-table>
  </div>
</template>
<script>
import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";
import moment from "moment";

// import Pagination from "@/components/Pagination";
export default {
  components: {
    // Pagination,
    Icon,
    Tooltip,
  },

  data() {
    return {
      moment,
      current: 1,
      perpage: 10,
      pageRange: 5,
      searchTerm: "",

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
          field: "activityDate",
        },
        {
          label: "Zone",
          field: "zoneName",
        },
        {
          label: "Center",
          field: "centerName",
        },
        {
          label: "Activity Name",
          field: "activityName",
        },
        {
          label: "Activity Type",
          field: "activityType",
        },

        {
          label: "Venue",
          field: "activityVenue",
        },

        {
          label: "Attendees",
          field: "totalAttendee",
        },

        // {
        //   label: "State of flock",
        //   field: "stateOfTheFlock",
        // },

        {
          label: "Action",
          field: "action",
        },
      ],
      advancedTable: [
        {
          activityName: "meh",
          activityVenue: "Lekki",
          totalAttendee: 180,
          summaryOfEvent: "<p>3asx</p>",
          stateOfTheFlock: "sdas",
          activityType: "as",
          activityDate: "2024-02-24T00:00:00",
          zoneName: "Lekki Zone",
          centerName: "Radiant",
          zoneId: 7,
          centerId: 2,
          id: 14,
          createdBy: null,
          modifiedBy: null,
        },
        {
          activityName: "fellowship",
          activityVenue: "church hall",
          totalAttendee: 10,
          summaryOfEvent: "stable",
          stateOfTheFlock: "satisfactory",
          activityType: "string",
          activityDate: "2024-02-22T18:24:38.896",
          zoneName: "Lekki Zone",
          centerName: "Radiant",
          zoneId: 7,
          centerId: 2,
          id: 13,
          createdBy: null,
          modifiedBy: null,
        },
        {
          activityName: "sds",
          activityVenue: "sdcsdxx",
          totalAttendee: 8,
          summaryOfEvent: "<p>2adsc</p>",
          stateOfTheFlock: "22",
          activityType: "adcsds",
          activityDate: "2024-02-23T00:00:00",
          zoneName: "Lekki Zone",
          centerName: "Radiant",
          zoneId: 7,
          centerId: 2,
          id: 11,
          createdBy: null,
          modifiedBy: null,
        },
        {
          activityName: "first",
          activityVenue: "sdfcad",
          totalAttendee: 14,
          summaryOfEvent: "<p>stuff</p>",
          stateOfTheFlock: "adcad",
          activityType: "adwd",
          activityDate: "2024-02-23T00:00:00",
          zoneName: "Lekki Zone",
          centerName: "Radiant",
          zoneId: 7,
          centerId: 2,
          id: 10,
          createdBy: null,
          modifiedBy: null,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.action-btn {
  @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
}
</style>

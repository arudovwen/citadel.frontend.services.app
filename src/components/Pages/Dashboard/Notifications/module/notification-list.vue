<template>
  <div>
    <div
      class="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:justify-between md:items-center mb-6 md:mb-4 w-full md:w-auto"
    >
      <div></div>
      <CreateNotification />
    </div>

    <div class="">
      <vue-good-table
        :columns="columns"
        styleClass="vgt-table"
        :isLoading="loading"
        :rows="notifications || []"
        :sort-options="{
          enabled: false,
        }"
        :pagination-options="{
          enabled: true,
          perPage: query.pageSize,
        }"
      >
        <template v-slot:table-row="props">
          <span v-if="props.column.field == 'createdAt'" class="">
            {{ moment(props.row.createdAt).format("ll") }}
          </span>
          <span
            v-html="props?.row?.message"
            v-if="props.column.field == 'message'"
            class="max-w-[200px]"
          >
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
            <!-- <span v-else class="cursor-not-allowed text-xl"
                  ><Icon icon="heroicons-outline:dots-vertical"
                /></span> -->
          </span>
        </template>
        <template #pagination-bottom>
          <div class="py-4 px-3">
            <Pagination
              :total="total"
              :current="query.pageNumber"
              :per-page="query.pageSize"
              :pageRange="5"
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
  </div>
</template>

<script setup>
import CreateNotification from "../create-notification";
import Dropdown from "@/components/Dropdown";
import Pagination from "@/components/Pagination";
import { useStore } from "vuex";
import { computed, onMounted, reactive } from "vue";
import moment from "moment";
import Icon from "@/components/Icon";
import { MenuItem } from "@headlessui/vue";

const { state, dispatch } = useStore();
const query = reactive({
  pageNumber: 1,
  pageSize: 25,
  sortOrder: "",
  searchParameter: "",
  FromDate: "",
  EndDate: "",
  searchParams: "",
});
onMounted(() => {
  dispatch("getNotifications", query);
});
const notifications = computed(() => state.notification.notifications);
const loading = computed(() => state.notification.getNotificationLoading);
const total = computed(() => state.profile.total);
const options = [
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
];
// const success = computed(() => state.notification.getNotificationSuccess);
const columns = [
  {
    label: "Date",
    field: "createdAt",
  },

  {
    label: "Message title",
    field: "message",
  },

  {
    label: "type",
    field: "notifyType",
  },

  {
    label: "status",
    field: "status",
  },
  {
    label: "action",
    field: "action",
  },
];
const actions = [
  {
    name: "view",
    icon: "heroicons-outline:eye",
    doit: () => {},
  },
  {
    name: "edit",
    icon: "heroicons-outline:eye",
    doit: () => {},
  },
  {
    name: "delete",
    icon: "heroicons-outline:trash",
    doit: () => {},
  },
];

function perPage({ currentPerPage }) {
  query.pageNumber = 1;
  query.pageSize = currentPerPage;
}
</script>
<style lang=""></style>

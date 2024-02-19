<template>
  <div class="mx-6">
    <div v-if="getAccessoriesLoading && accessories?.length == 0" class="">
      <EmptyGrid />
    </div>
    <div v-else>
      <div v-if="accessories.length">
        <div class="-mx-6">
          <vue-good-table
            :columns="columns"
            mode="remote"
            styleClass="vgt-table"
            :isLoading="loading"
            :rows="accessories || []"
            :sort-options="{
              enabled: false,
            }"
            :pagination-options="{
              enabled: true,
              perPage: query.pageSize,
            }"
          >
            <template v-slot:table-row="props">
              <span v-if="props.column.field == 'action'" class="flex gap-x-2">
                <span
                  class="cursor-pointer text-lg p-1"
                  @click="actions[0].doit(props.row)"
                >
                  <Icon icon="fa-solid:edit"
                /></span>
                <span
                  class="cursor-pointer text-lg p-1"
                  @click="actions[1].doit(props.row)"
                >
                  <Icon icon="heroicons-outline:trash"
                /></span>
              </span>
            </template>
            <template #pagination-bottom>
              <div class="py-4 px-3">
                <Pagination
                  :total="total"
                  :current="query.pageNumber"
                  :per-page="query.pageSize"
                  :pageRange="5"
                  :perPageChanged="perPage"
                  @page-changed="query.pageNumber = $event"
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
      <Empty v-else />
    </div>
  </div>
  <Modal
    title="Delete Accessory"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this accessory?
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm"
          @click="$refs.modal.closeModal()"
        />
        <Button
          :isLoading="deleteAccessoryLoading"
          :disabled="deleteAccessoryLoading"
          text="Delete"
          btnClass="btn-danger btn-sm"
          @click="deleteAccessory"
        />
      </div>
    </template>
  </Modal>
</template>
<script setup>
import Pagination from "@/components/Pagination";
import EmptyGrid from "@/components/Skeleton/Project-grid.vue";
import Empty from "@/components/Empty";
import Button from "@/components/Button";
// import Card from "@/components/Card";
// import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";
// import { MenuItem } from "@headlessui/vue";
import Modal from "@/components/Modal/Modal";
import { computed, onMounted, ref, watch, inject } from "vue";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

onMounted(() => {
  getAccessories();
  // dispatch("getAffiliationByMemberQuery", {
  //   pageSize: 250000,
  //   pageNumber: 1,
  //   searchParameter: "",
  // });
});
const { dispatch, state } = useStore();
// const router = useRouter();

const accessories = computed(() => state.accessory.accessories);
const total = computed(() => state.accessory.total);
const getAccessoriesLoading = computed(
  () => state.accessory.getAccessoriesLoading
);
const deleteAccessorySuccess = computed(
  () => state.accessory.deleteAccessorySuccess
);
const deleteAccessoryLoading = computed(
  () => state.accessory.deleteAccessoryLoading
);

const addAccessorySuccess = computed(() => state.accessory.addAccessorySuccess);
const updateAccessorySuccess = computed(
  () => state.accessory.updateAccessorySuccess
);

const toast = useToast();
const modal = ref(null);
const detail = ref(null);
const query = inject("query");
const actions = ref([
  {
    name: "edit",
    icon: "heroicons-outline:pencil-alt",
    doit: (data) => {
      dispatch("openAccessoryEditModal", data);
    },
  },
  {
    name: "delete",
    icon: "heroicons-outline:trash",
    doit: (data) => {
      detail.value = data;
      modal.value.openModal();
    },
  },
]);

const columns = [
  {
    label: "Name",
    field: "accessoryName",
  },

  // {
  //   label: "Type",
  //   field: "type",
  // },

  {
    label: "Description",
    field: "description",
  },

  {
    label: "Action",
    field: "action",
  },
];

const options = [
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
];
const getAccessories = () => {
  dispatch("getAccessories", query);
};

const deleteAccessory = () => {
  dispatch("deleteAccessory", detail.value.id);
};
function perPage({ currentPerPage }) {
  query.pageNumber = 1;
  query.pageSize = currentPerPage;
}
watch(deleteAccessorySuccess, () => {
  if (deleteAccessorySuccess.value) {
    toast.success("Successfully Deleted");
    dispatch("getAccessories", query);
    modal.value.closeModal();
  }

  // getAllaccessories();
});
watch([addAccessorySuccess, updateAccessorySuccess], () => {
  if (addAccessorySuccess.value || updateAccessorySuccess.value) {
    dispatch("getAccessories", query);
  }

  // getAllaccessories();
});
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars

watch(query, () => {
  dispatch("getAccessories", query);
});
</script>
<style lang="scss" scoped>
.date-label {
  @apply text-xs text-slate-400 dark:text-slate-400 mb-1;
}
.date-text {
  @apply text-xs text-slate-600 dark:text-slate-300 font-medium;
}
</style>

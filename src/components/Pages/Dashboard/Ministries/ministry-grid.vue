<template>
  <div class="">
    <div v-if="getMinistriesLoading && ministries?.length == 0" class="">
      <EmptyGrid />
    </div>
    <div v-else>
      <div v-if="ministries.length">
        <div class="grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 mb-2">
          <Card bodyClass="" v-for="(item, i) in ministries" :key="i">
            <div
              class="px-6 pt-6 cursor-pointer"
              @click="() => router.push(`#`)"
            >
              <!-- header -->
              <header class="flex justify-between items-end mb-6">
                <div class="flex space-x-4 items-center">
                  <div class="flex-none">
                    <div
                      class="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal uppercase"
                    >
                      {{
                        item.ministryName.charAt(0) +
                        item.ministryName.charAt(1)
                      }}
                    </div>
                  </div>
                  <div class="font-medium text-lg leading-6">
                    <div class="dark:text-slate-200 text-slate-900">
                      {{ item.ministryName }}
                    </div>
                  </div>
                </div>
              </header>
              <div
                class="text-slate-600 dark:text-slate-400 text-xs font-medium mb-2"
              >
                <span>Description</span>:
                <span class="font-medium capitalize">{{
                  item.description || "none"
                }}</span>
              </div>
              <!-- <div class="flex justify-start">
                <div class="text-left">
                  <span
                    class="inline-flex items-center space-x-1 bg-gray-400 bg-opacity-[0.16] text-gray-500 text-[11px] font-normal px-2 py-1 rounded-full"
                  >
                    <span> <Icon icon="heroicons-outline:user-group" /></span>
                    <span>{{ item?.totalCenters }} centers</span>
                  </span>
                </div>
              </div> -->
            </div>
            <div
              v-if="canEdit"
              class="flex justify-end px-4 py-2 mt-6 border-t border-gray-200 gap-x-3"
            >
              <button
                @click="actions[0].doit(item)"
                class="text-xs active:scale-95 px-1 py-1 rounded-full"
              >
                Edit
              </button>
              <button
                @click="actions[1].doit(item)"
                class="text-xs active:scale-95 px-1 py-1 rounded-full"
              >
                Delete
              </button>
            </div>
          </Card>
        </div>
        <div class="py-4">
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
      </div>
      <Empty v-else />
    </div>
  </div>
  <Modal
    title="Delete Ministry"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this ministry?
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm"
          @click="$refs.modal.closeModal()"
        />
        <Button
          :isLoading="deleteMinistryLoading"
          :disabled="deleteMinistryLoading"
          text="Delete"
          btnClass="btn-danger btn-sm"
          @click="deleteMinistry"
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
import Card from "@/components/Card";
// import Dropdown from "@/components/Dropdown";
// import Icon from "@/components/Icon";
// import { MenuItem } from "@headlessui/vue";
import Modal from "@/components/Modal/Modal";
import { computed, onMounted, ref, watch, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

onMounted(() => {
  getMinistries();
  dispatch("getAffiliationByMemberQuery", {
    pageSize: 250000,
    pageNumber: 1,
    searchParameter: "",
  });
});
const { dispatch, state } = useStore();
const router = useRouter();
const canEdit = computed(
  () => state.auth.userData.userRole.toLowerCase() === "administrator"
);
const ministries = computed(() => state.ministry.ministries);
const total = computed(() => state.ministry.total);
const getMinistriesLoading = computed(
  () => state.ministry.getMinistriesLoading
);
const deleteMinistrySuccess = computed(
  () => state.ministry.deleteMinistrySuccess
);
const deleteMinistryLoading = computed(
  () => state.ministry.deleteMinistryLoading
);
const addMinistrySuccess = computed(() => state.ministry.addMinistrySuccess);
const updateMinistrySuccess = computed(
  () => state.ministry.updateMinistrySuccess
);
// const membersOptions = computed(() =>
//   state?.member?.data?.map((i) => {
//     return {
//       label: `${i.firstName} ${i.surName}`,
//       value: i.userId,
//     };
//   })
// );
const toast = useToast();
const modal = ref(null);
const detail = ref(null);
const query = inject("query");
const actions = ref([
  {
    name: "edit",
    icon: "heroicons-outline:pencil-alt",
    doit: (data) => {
      dispatch("openMinistryEditModal", data);
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
const getMinistries = () => {
  dispatch("getMinistries", query);
};

const deleteMinistry = () => {
  dispatch("deleteMinistry", detail.value.id);
};
function perPage({ currentPerPage }) {
  query.pageNumber = 1;
  query.pageSize = currentPerPage;
}
watch(deleteMinistrySuccess, () => {
  if (deleteMinistrySuccess.value) {
    toast.success("Successfully Deleted");
    dispatch("getMinistries", query);
    modal.value.closeModal();
  }

  // getAllministries();
});
watch([addMinistrySuccess, updateMinistrySuccess], () => {
  if (addMinistrySuccess.value || updateMinistrySuccess.value) {
    dispatch("getMinistries", query);
  }

  // getAllministries();
});
// eslint-disable-next-line no-unused-vars
// function handleCoordinator(id) {
//   if (!id) return "n/a";
//   const result = membersOptions?.value?.find((i) => i.value === id);
//   return result?.label;
// }
// eslint-disable-next-line no-unused-vars
function handleDelete() {
  dispatch("removeministry", detail.value);
}
watch(query, () => {
  dispatch("getMinistries", query);
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

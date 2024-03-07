<template>
  <div class="">
    <div v-if="getMOIsLoading && mois?.length == 0" class="">
      <EmptyGrid />
    </div>
    <div v-else>
      <div v-if="mois.length">
        <div class="grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 mb-2">
          <Card bodyClass="" v-for="(item, i) in mois" :key="i">
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
                        item.mountainOfInfluenceName.charAt(0) +
                        item.mountainOfInfluenceName.charAt(1)
                      }}
                    </div>
                  </div>
                  <div class="font-medium text-lg leading-6">
                    <div class="capitalize dark:text-slate-200 text-slate-900">
                      {{ item.mountainOfInfluenceName }}
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
            </div>
            <div
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
    title="Delete Mountain of Influence"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this mountain of influence?
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm"
          @click="$refs.modal.closeModal()"
        />
        <Button
          :isLoading="deleteMOILoading"
          :disabled="deleteMOILoading"
          text="Delete"
          btnClass="btn-danger btn-sm"
          @click="deleteMOI"
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
  getMOIs();
  // dispatch("getAffiliationByMemberQuery", {
  //   pageSize: 250000,
  //   pageNumber: 1,
  //   searchParameter: "",
  // });
});
const { dispatch, state } = useStore();
const router = useRouter();

const mois = computed(() => state.moi.mois);
const total = computed(() => state.moi.total);
const getMOIsLoading = computed(() => state.moi.getMOIsLoading);
const deleteMOISuccess = computed(() => state.moi.deleteMOISuccess);
const deleteMOILoading = computed(() => state.moi.deleteMOILoading);
const addMOISuccess = computed(() => state.moi.addMOISuccess);
const updateMOISuccess = computed(() => state.moi.updateMOISuccess);
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
      dispatch("openMOIEditModal", data);
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
const getMOIs = () => {
  dispatch("getMOIs", query);
};

const deleteMOI = () => {
  dispatch("deleteMOI", detail.value.id);
};
function perPage({ currentPerPage }) {
  query.pageNumber = 1;
  query.pageSize = currentPerPage;
}
watch(deleteMOISuccess, () => {
  if (deleteMOISuccess.value) {
    toast.success("Successfully Deleted");
    dispatch("getMOIs", query);
    modal.value.closeModal();
  }

  // getAllMOIs();
});
watch([addMOISuccess, updateMOISuccess], () => {
  if (addMOISuccess.value || updateMOISuccess.value) {
    dispatch("getMOIs", query);
  }

  // getAllZones();
});
// eslint-disable-next-line no-unused-vars
// function handleCoordinator(id) {
//   if (!id) return "n/a";
//   const result = membersOptions?.value?.find((i) => i.value === id);
//   return result?.label;
// }
// eslint-disable-next-line no-unused-vars
function handleDelete() {
  dispatch("removeZone", detail.value);
}
watch(query, () => {
  dispatch("getMOIs", query);
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

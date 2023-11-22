<template>
  <div className="">
    <div
      v-if="departments.length"
      class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-6"
    >
      <Card bodyClass="" v-for="(item, i) in departments" :key="i">
        <router-link
          :to="`/departments/view/${item?.departmentName}/${item.id}`"
          class="flex-1"
        >
          <div
            class="px-6 pt-6"
            :class="
              state.auth.userData.userRole.toLowerCase() === 'administrator'
                ? ''
                : 'pb-6'
            "
          >
            <header class="flex justify-between items-end mb-4">
              <div class="flex space-x-4 items-center">
                <div class="flex-none">
                  <div
                    class="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal uppercase"
                  >
                    {{
                      item?.departmentName?.charAt(0) +
                      item?.departmentName?.charAt(1)
                    }}
                  </div>
                </div>
                <div class="font-medium text-base leading-6">
                  <div
                    class="dark:text-slate-200 text-slate-900 max-w-[200px] truncate"
                  >
                    {{ item?.departmentName }} Department
                  </div>
                </div>
              </div>
            </header>

            <!-- description -->
            <div
              class="text-slate-600 dark:text-slate-400 text-sm mb-2 truncate max-w-max"
            >
              {{ item.description }}
            </div>
            <div class="text-slate-600 dark:text-slate-400 text-xs font-medium">
              <span>HOD</span>:
              <span class="font-medium">{{ handleHod(item.userId) }}</span>
            </div>
            <div class="flex justify-start mt-5">
              <div class="text-right">
                <span
                  class="inline-flex items-center space-x-1 bg-gray-400 bg-opacity-[0.16] text-gray-500 text-[11px] font-normal px-2 py-1 rounded-full"
                >
                  <span> <Icon icon="heroicons-outline:user-group" /></span>
                  <span>{{ item.totalMembers }} members</span>
                </span>
              </div>
            </div>
          </div>
        </router-link>

        <div
          v-if="state.auth.userData.userRole.toLowerCase() === 'administrator'"
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
    <Empty v-if="!departments.length" />
    <div class="py-4" v-if="departments.length">
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

  <Modal
    title="Delete Department"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this department?
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          text="Cancel"
          :disabled="loading"
          btnClass="btn-outline-secondary btn-sm"
          @click="$refs.modal.closeModal()"
        />
        <Button
          :disabled="loading"
          :isLoading="loading"
          text="Delete"
          btnClass="btn-danger btn-sm"
          @click="handleDelete"
        />
      </div>
    </template>
  </Modal>
</template>
<script setup>
import Pagination from "@/components/Pagination";
import { useToast } from "vue-toastification";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal/Modal";
import Empty from "@/components/Empty";
import { debounce } from "lodash";

import { computed, ref, onMounted, inject, watch, provide } from "vue";
import { useStore } from "vuex";

onMounted(() => {
  dispatch("getDepartmentsTotal", query);
  dispatch("getAffiliationByMemberQuery", {
    pageSize: 250000,
    pageNumber: 1,
    searchParameter: "",
    role: "",
  });
});
const toast = useToast();
const { state, dispatch } = useStore();
const total = computed(() => state.department.total);
const loading = computed(() => state.department.loading);
const success = computed(() => state.department.addsuccess);
const deletesuccess = computed(() => state.department.deletesuccess);
const updatesuccess = computed(() => state.department.updatesuccess);
const departments = computed(() => state.department.departments);
const membersOptions = computed(() =>
  state?.member?.data.map((i) => {
    return {
      label: `${i.firstName} ${i.surName}`,
      value: i.userId,
    };
  })
);
const modal = ref(null);
const detail = ref(null);
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
const actions = ref([
  {
    name: "edit",
    icon: "heroicons-outline:pencil-alt",
    doit: (data) => {
      dispatch("updateDepartment", data);
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
const query = inject("query");

// eslint-disable-next-line no-unused-vars
function handleDelete() {
  dispatch("removeDepartment", detail.value.id);
}

// Define a debounce delay (e.g., 500 milliseconds)
const debounceDelay = 800;
const debouncedSearch = debounce(() => {
  dispatch("getDepartmentsTotal", query);
}, debounceDelay);

watch(
  () => query.searchParameter,
  () => {
    debouncedSearch();
  }
);
watch(
  () => [query.pageNumber, query.sortOrder, query.pageSize],
  () => {
    dispatch("getDepartmentsTotal", query);
  }
);
function perPage({ currentPerPage }) {
  query.pageNumber = 1;
  query.pageSize = currentPerPage;
}
function handleSuccess() {
  dispatch("getDepartmentsTotal", query);
  modal.value.closeModal();
}

function handleHod(id) {
  if (!id) return "n/a";
  const result = membersOptions.value.find((i) => i.value === id);
  return result?.label;
}
watch(updatesuccess, handleSuccess);
watch(success, handleSuccess);

watch(deletesuccess, () => {
  if (deletesuccess.value) {
    dispatch("getDepartmentsTotal", query);
    modal.value.closeModal();
    toast.success("Department removed");
  }
});

provide("membersOptions", membersOptions);
</script>
<style lang="scss" scoped>
.date-label {
  @apply text-xs text-slate-400 dark:text-slate-400 mb-1;
}
.date-text {
  @apply text-xs text-slate-600 dark:text-slate-300 font-medium;
}
</style>

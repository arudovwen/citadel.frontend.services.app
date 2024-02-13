<template>
  <div class="grid grid-cols-2 gap-6">
    <div class="col-span-2">
      <div v-if="departments?.length > 0" bodyClass="p-0 mt-4">
        <header class="px-4 pt-4 pb-3 mb-3">
          <h5 class="card-title mb-0 !text-[18px]">Departments</h5>
        </header>
        <vue-good-table
          :columns="columns"
          :rows="departments"
          styleClass="vgt-table"
          :sort-options="{
            enabled: false,
          }"
        >
          <template v-slot:table-row="props">
            <span
              v-if="props.column.field == 'isPrimaryDepartment'"
              class="text-slate-500 dark:text-slate-300"
            >
              <button
                class="text-xs text-blue-400 active:scale-95 px-1 py-1 rounded-full"
              >
                <span
                  @click="openModal(props.row)"
                  v-if="!props?.row?.isDefault"
                  class="cursor-pointer"
                  >Set as primary</span
                >
                <span v-else-if="props?.row?.isDefault" class="text-gray-500"
                  >Primary Department</span
                >
              </button>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <Modal
      title="Delete Member"
      label="Small modal"
      labelClass="btn-outline-dark"
      ref="setDefaultModal"
      sizeClass="max-w-md"
      themeClass="bg-primary-500"
    >
      <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
        Are you sure you want to set this department as default?
      </div>

      <template v-slot:footer>
        <div class="flex gap-x-5">
          <Button
            :disabled="setPrimaryLoading"
            text="Cancel"
            btnClass="btn-outline-secondary btn-sm"
            @click="$refs.setDefaultModal.closeModal()"
          />
          <Button
            text="Confirm"
            :isLoading="setPrimaryLoading"
            :disabled="setPrimaryLoading"
            btnClass="btn-dark btn-sm"
            @click="setPrimaryDepartment"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { defineProps, ref, computed, watch, inject } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button";

defineProps({
  departments: {
    type: Array,
    default: null,
  },
  columns: {
    type: Array,
    default: null,
  },
});

const { dispatch, state } = useStore();
const setPrimaryLoading = computed(() => state.department.setPrimaryLoading);
const setPrimarySuccess = computed(() => state.department.setPrimarySuccess);
const toast = useToast();
const selectedDepartment = ref(null);
const getAllUserDepartment = inject("getAllUserDepartment");
const id = inject("id");

const setDefaultModal = ref(null);
const setPrimaryDepartment = () => {
  dispatch("setPrimaryDepartment", selectedDepartment.value);
};

const openModal = (department) => {
  selectedDepartment.value = {
    departmentName: department.departmentName,
    userId: id.value,
  };
  setDefaultModal.value.openModal();
};

watch(setPrimarySuccess, () => {
  toast.success("Successfully set default department");
  getAllUserDepartment();
  setDefaultModal.value.closeModal();
});
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <span
          @click="$router.push('/users-management')"
          class="flex items-center gap-2 cursor-pointer"
        >
          <Icon icon="heroicons-outline:arrow-left" />

          Back</span
        >

        <!-- <div class="flex rounded-[6px] text-sm overflow-hidden gap-x-4"></div> -->
        <div
          class="md:flex md:space-x-3 items-center flex-none"
          :class="window.width < 768 ? 'space-x-rb' : ''"
        >
          <Button
            icon="ri:user-add-line"
            text="Add role"
            btnClass=" btn-primary font-normal btn-sm "
            iconClass="text-lg"
            @click="
              () => {
                type = 'add';
                $store.dispatch('openRoleModal');
              }
            "
          />
        </div>
      </div>
      <div class="-mx-6">
        <vue-good-table
          :columns="columns"
          mode="remote"
          styleClass="vgt-table"
          :isLoading="loading"
          :rows="roles || []"
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
                @click="openEdit(props.row)"
              >
                <Icon icon="fa-solid:edit"
              /></span>
              <span
                class="cursor-pointer text-lg p-1"
                @click="openDelete(props.row.id)"
              >
                <Icon icon="heroicons-outline:trash"
              /></span>
            </span>
          </template>
          <template #pagination-bottom>
            <div class="py-4 px-3">
              <!-- <Pagination
                :total="total"
                :current="query.pageNumber"
                :per-page="query.pageSize"
                :pageRange="pageRange"
                @page-changed="query.pageNumber = $event"
                :perPageChanged="perPage"
                enableSearch
                enableSelect
                :options="options"
              >
                >
              </Pagination> -->
            </div>
          </template>
        </vue-good-table>
      </div>
    </Card>
    <div v-if="state.role.roleModal">
      <RolesModal />
    </div>
    <div v-if="state.role.roleEditModal">
      <UpdateRoleModal :detail="detail" />
    </div>
    <Modal
      title="Delete Role"
      label="Small modal"
      labelClass="btn-outline-danger"
      ref="modal"
      sizeClass="max-w-md"
      themeClass="bg-danger-500"
    >
      <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
        Are you sure you want to delete this role?
      </div>

      <template v-slot:footer>
        <div class="flex gap-x-5">
          <Button
            :disabled="deleteLoading"
            text="Cancel"
            btnClass="btn-outline-secondary btn-sm"
            @click="$refs.modal.closeModal()"
          />
          <Button
            text="Delete"
            :disabled="deleteLoading"
            :isLoading="deleteLoading"
            btnClass="btn-danger btn-sm"
            @click="handleDelete()"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script setup>
import Icon from "@/components/Icon";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { ref, reactive, onMounted, computed, watch } from "vue";
import window from "@/mixins/window";
import RolesModal from "@/views/roles/RolesModal";
import UpdateRoleModal from "@/views/roles/UpdateRoleModal";
import Modal from "@/components/Modal/Modal";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
// import Icon from "@/components/Icon";

// import Pagination from "@/components/Pagination";

onMounted(() => {
  getRolesList();
});
const { state, dispatch } = useStore();
const toast = useToast();
const loading = ref(state.role.getRoleLoading);
const selectedId = ref("");
const deleteLoading = computed(() => state.role.deleteRoleLoading);
const deleteSuccess = computed(() => state.role.deleteRoleSuccess);
const deleteRoleError = computed(() => state.role.deleteRoleError);
const roles = computed(() => {
  const list = state?.role?.roles?.map((role) => {
    return {
      name: role.roleName,
      normalizedName: role.normalizedName,
      id: role.roleId,
    };
  });

  return list;
});
const modal = ref(null);

const detail = ref(null);
const type = ref("add");
const query = reactive({
  pageNumber: 1,
  pageSize: 25,
  searchParameter: "",
  isFirstTimer: false,
  sortOrder: "",
});
const columns = [
  {
    label: "Name",
    field: "name",
  },
  {
    label: "Normalized name",
    field: "normalizedName",
  },
  {
    label: "Action",
    field: "action",
  },
];

const getRolesList = () => {
  dispatch("getRolesList");
};
const openDelete = (id) => {
  selectedId.value = id;
  modal.value.openModal();
};
const openEdit = (val) => {
  detail.value = val;
  dispatch("openEditRoleModal", true);
};
const handleDelete = () => {
  dispatch("deleteRolesFromList", selectedId.value);
};

watch(deleteSuccess, () => {
  if (deleteSuccess.value) {
    toast.success("Role deleted");
    getRolesList();
    modal.value.closeModal();
  }
});

watch(deleteRoleError, () => {
  if (deleteRoleError.value) {
    modal.value.closeModal();
  }
});
</script>

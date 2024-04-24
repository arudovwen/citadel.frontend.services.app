<template>
  <div class="flex flex-col">
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to assign this role fhgfg?
      <!-- <p>{{ userId }}</p>
      <p>{{ inspectorateId }}</p> -->
    </div>
    <!-- {{ role }} -->
    <Select label="Role" :options="isCIH ? cihRoles : roles" v-model="role" />
    <!-- <span>UserId: {{ userId }}</span> -->
    <div class="flex gap-x-5 justify-end mt-4">
      <Button
        :disabled="false"
        text="Cancel"
        btnClass="btn-outline-secondary btn-sm"
        @click="modal.closeModal()"
      />
      <Button
        :disabled="assignLoading"
        :isLoading="assignLoading"
        text="Confirm"
        btnClass="btn-primary btn-sm"
        @click="assignRole"
      />
    </div>
  </div>
</template>

<script setup>
import Select from "@/components/Select";
import Button from "@/components/Button";
import { useStore } from "vuex";
import { computed, onMounted, ref, watch, defineProps, reactive } from "vue";
import { useToast } from "vue-toastification";

// defineProps({
//   userId: {
//     default: "",
//     type: String,
//   },
// });
const props = defineProps(["userId", "closeModal", "isCIH", "refetch"]);

const toast = useToast();

onMounted(() => {
  getAllCihRoles();
  dispatch("getRolesList");
});

const { dispatch, state } = useStore();
const inspectorId = computed(() => state.auth.userData.id);
// const userId = computed(() => "");
const assignLoading = computed(() => state.role.setPermissionsLoading);
const assignSuccess = computed(() => state.role.setPermissionsSuccess);
const assignError = computed(() => state.role.setPermissionsError);
const query = reactive({
  pageNumber: 1,
  pageSize: 25,
  name: "",
});
const role = ref("");
const roles = computed(() =>
  state.role.roles
    .filter(
      (i) =>
        i?.name?.toLowerCase() !== "firsttimers" &&
        i?.name?.toLowerCase() !== "cihcoordinator"
    )
    .map((i) => {
      return {
        value: i?.roleId,
        label: i?.roleName,
      };
    })
);
// const cihRoles = computed(() =>
//   state.role.roles
//     .filter((i) => i?.roleName?.toLowerCase().includes("cih"))
//     .map((i) => {
//       return {
//         value: i?.roleId,
//         label: i?.roleName,
//       };
//     })
// );
const cihRoles = computed(() =>
  state?.profile?.allCihRoles
    .filter((i) => i?.toLowerCase() !== "cihcoordinator")
    .map((i) => {
      return {
        label: i,
        value: i,
      };
    })
);

const getAllCihRoles = () => {
  if (props.isCIH) {
    dispatch("getAllCihRoles");
  }
};
function assignRole() {
  if (props.isCIH) {
    dispatch("assignCIHRoleByInspectorate", {
      userId: props.userId,
      inspectorId: inspectorId.value,
      cihRole: role.value,
    });
    return;
  }

  dispatch("assignRoleWithPermissions", {
    userId: props.userId,
    roleId: role.value,
  });
}

watch(assignSuccess, () => {
  if (assignSuccess.value) {
    toast.success("Role updated");
    if (props.isCIH) {
      props.refetch ? props.refetch() : () => {};
    } else {
      dispatch("getUsers", query);
    }

    props.closeModal();
  }
});
watch(assignError, () => {
  if (assignError.value) {
    props.closeModal();
    // close the modal
    // modal.value.closeModal();
  }
});
</script>

<style lang="scss" scoped></style>

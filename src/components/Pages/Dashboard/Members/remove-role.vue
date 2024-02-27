<template>
  <div class="flex flex-col">
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to remove role from this user?
    </div>
    <Select v-if="!isCIH" label="Role" :options="roleOptions" v-model="role" />
    <!-- <span>UserId: {{ userId }}</span> -->
    <div class="flex gap-x-5 justify-end mt-4">
      <Button
        :disabled="false"
        text="Cancel"
        btnClass="btn-outline-secondary btn-sm"
        @click="closeModal()"
      />
      <Button
        :disabled="removeLoading"
        :isLoading="removeLoading"
        text="Confirm"
        btnClass="btn-danger btn-sm"
        @click="removeRole"
      />
    </div>
  </div>
</template>

<script setup>
import Select from "@/components/Select";
import Button from "@/components/Button";
import { useStore } from "vuex";
import { computed, onMounted, ref, watch, defineProps } from "vue";
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
  dispatch("getAuthUserRoles", props.userId);
  dispatch("getRolesList");
});

const { dispatch, state } = useStore();
const inspectorId = computed(() => state.auth.userData.id);

// const userId = computed(() => "");
const removeLoading = computed(() => state.role.setPermissionsLoading);
const removeSuccess = computed(() => state.role.setPermissionsSuccess);
const removeError = computed(() => state.role.setPermissionsError);
const role = ref("");
const allroles = computed(() =>
  state.role.roles
    .filter((i) => i?.name?.toLowerCase() !== "firsttimers")
    .map((i) => {
      return {
        value: i?.roleId,
        label: i?.roleName,
      };
    })
);
const roles = computed(() => state?.role?.authUserRoles);

const roleOptions = computed(() =>
  allroles.value.filter((i) => roles.value.includes(i.label))
);
console.log("🚀 ~ roleOptions:", roleOptions.value);
function removeRole() {
  if (props.isCIH) {
    dispatch("removeCIHRoleByInspectorate", {
      userId: props.userId,
      inspectorId: inspectorId.value,
      cihRole: "none",
    });
    return;
  }
  dispatch("removeRoleFromPermissions", {
    userId: props.userId,
    roleId: role.value,
  });
}

watch(removeSuccess, () => {
  if (removeSuccess.value) {
    if (props.isCIH) {
      props.refetch ? props.refetch() : () => {};
    }

    toast.success("Role updated");
    props.closeModal();
  }
});
watch(removeError, () => {
  if (removeError.value) {
    props.closeModal();
    // close the modal
    // modal.value.closeModal();
  }
});
</script>

<style lang="scss" scoped></style>

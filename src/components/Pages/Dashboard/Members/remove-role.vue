<template>
  <div class="flex flex-col">
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to remove role from this user?
    </div>
    <Select label="Role" :options="roles" v-model="role" />
    <!-- <span>UserId: {{ userId }}</span> -->
    <div class="flex gap-x-5 justify-end mt-4">
      <Button
        :disabled="false"
        text="Cancel"
        btnClass="btn-outline-secondary btn-sm"
        @click="modal.closeModal()"
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
const props = defineProps(["userId", "closeModal"]);

const toast = useToast();

onMounted(() => {
  dispatch("getAuthUserRoles", props.userId);
});

const { dispatch, state } = useStore();
// const userId = computed(() => "");
const removeLoading = computed(() => state.role.setPermissionsLoading);
const removeSuccess = computed(() => state.role.setPermissionsSuccess);
const removeError = computed(() => state.role.setPermissionsError);
const role = ref("");
const roles = computed(() =>
  state?.role?.authUserRoles?.map((i) => {
    return {
      value: i,
      label: i,
    };
  })
);
function removeRole() {
  dispatch("removeRoleFromPermissions", {
    userId: props.userId,
    roleId: role.value,
  });
}

watch(removeSuccess, () => {
  if (removeSuccess.value) {
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

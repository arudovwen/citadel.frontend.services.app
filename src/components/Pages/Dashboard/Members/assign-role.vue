<template>
  <div class="flex flex-col">
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to assign this role?
    </div>
    <Select label="Role" :options="roles" v-model="role" />
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
import { computed, onMounted, ref, watch, defineProps } from "vue";
import { useToast } from "vue-toastification";

// defineProps({
//   userId: {
//     default: "",
//     type: String,
//   },
// });
const props = defineProps(["userId"]);

const toast = useToast();

onMounted(() => {
  dispatch("getRolesList");
});

const { dispatch, state } = useStore();
// const userId = computed(() => "");
const assignLoading = computed(() => state.role.setPermissionsLoading);
const assignSuccess = computed(() => state.role.setPermissionsSuccess);

const role = ref("");
const roles = computed(() =>
  state.role.roles
    .filter((i) => i?.name?.toLowerCase() !== "firsttimers")
    .map((i) => {
      return {
        value: i?.id,
        label: i?.name,
      };
    })
);
function assignRole() {
  dispatch("assignRoleWithPermissions", {
    userId: props.userId,
    roleId: role.value,
  });
}

watch(assignSuccess, () => {
  if (assignSuccess.value) {
    toast.success("Role updated");
    // close the modal
    // modal.value.closeModal();
  }
});
</script>

<style lang="scss" scoped></style>

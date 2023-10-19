<template>
  <div class="modal-groups">
    <Modal
      title="Confirm action"
      label="Small modal"
      labelClass="btn-outline-dark"
      ref="modal"
      sizeClass="max-w-md"
      :activeModal="activeModal"
    >
      <div class="text-base text-slate-600 dark:text-slate-300">
        Are you sure about this action?
      </div>
      <template v-slot:footer>
        <div class="flex gap-x-5">
          <Button
            text="Cancel"
            btnClass="btn-outline-secondary btn-sm "
            @click="$refs.modal.closeModal()"
          />
          <Button
            text="Proceed"
            btnClass="btn-dark btn-sm"
            @click="$refs.modal.closeModal()"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import Button from "@/components/Button";
import Modal from "@/components/Modal/Modal";

defineProps(["activeModal"]);
</script>
<style lang=""></style>

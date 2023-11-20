<template>
  <div>
    <div
      class="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:justify-between md:items-center mb-6 md:mb-4 w-full md:w-auto"
    >
      <div></div>
      <Button
        v-if="authUser"
        icon="heroicons-outline:plus"
        text="Send Notification"
        btnClass="btn-primary btn-sm dark:bg-slate-800  h-min text-sm font-normal"
        iconClass="text-lg"
        @click="openNotification"
        :isLoading="false"
      />
    </div>
    <Card bodyClass="px-6 ">
      <Menu as="div" class="-mx-6">
        <div
          class="flex justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-600"
        >
          <div
            class="text-sm text-slate-800 dark:text-slate-200 font-medium leading-6"
          >
            All Notifications
          </div>
        </div>
        <MenuItem
          v-slot="{ active }"
          v-for="(item, i) in notifications"
          :key="i"
        >
          <div
            :class="`${
              active
                ? 'bg-slate-100 dark:bg-slate-600 dark:bg-opacity-70 text-slate-800'
                : 'text-slate-600 dark:text-slate-300'
            } block w-full px-4 py-2 text-sm mb-2 last:mb-0 cursor-pointer`"
          >
            <div class="flex text-left">
              <!-- <div class="flex-none mr-3">
                <div class="h-8 w-8 bg-white rounded-full">
                  <img
                    :src="item.image"
                    alt=""
                    :class="`${
                      active ? ' border-white' : ' border-transparent'
                    } block w-full h-full object-cover rounded-full border`"
                  />
                </div>
              </div> -->
              <div class="flex-1">
                <div
                  :class="`${
                    active
                      ? 'text-slate-600 dark:text-slate-300'
                      : ' text-slate-600 dark:text-slate-300'
                  } text-sm`"
                >
                  {{ item.title }}
                </div>
                <div
                  :class="`${
                    active
                      ? 'text-[#68768A] dark:text-slate-200'
                      : ' text-slate-600 dark:text-slate-300'
                  } text-xs leading-4`"
                >
                  {{ item.desc }}
                </div>
                <div class="text-secondary-500 dark:text-slate-400 text-xs">
                  3 min ago
                </div>
              </div>
              <div class="flex-0" v-if="item.unread">
                <span
                  class="h-[10px] w-[10px] bg-danger-500 border border-white rounded-full inline-block"
                >
                </span>
              </div>
            </div>
          </div>
        </MenuItem>
      </Menu>
    </Card>

    <Modal
      :activeModal="isCreateOpen"
      @close="toggleCreateModal"
      title="Send Notification"
      centered
    >
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div class="grid grid-cols-1 gap-5">
          <FormGroup label="Date" name="d1">
            <flat-pickr
              v-model="date"
              class="form-control"
              id="d1"
              placeholder="yyyy, dd M"
              :error="dateError"
            />
          </FormGroup>
          <Textinput
            label="Title"
            type="text"
            placeholder="Title"
            name="title"
            v-model.trim="title"
            :error="titleError"
          />
          <div class="assagin space-y-4">
            <Textarea
              label="Description"
              placeholder=" description"
              v-model="description"
              :error="descriptionError"
            />
          </div>

          <Fileinput @change="onFileSelected" multiple name="multipule" />
          <!-- <span>files: {{ files }}</span> -->
          <div class="text-right">
            <Button
              :isLoading="loading"
              :disabled="loading"
              text="Add ministry"
              btnClass="btn-dark"
            ></Button>
          </div>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import Fileinput from "@/components/Fileinput";
import Modal from "@/components/Modal";
import FormGroup from "@/components/FormGroup";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import { MenuItem, Menu } from "@headlessui/vue";
import { notifications } from "@/constant/data";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { useStore } from "vuex";
import { computed, ref } from "vue";

const { state } = useStore();
const isCreateOpen = ref(false);
const loading = ref(false);
const files = ref(null);
const authUser = computed(() => {
  return (
    state.auth.userData.userRole.toLowerCase() === "inspectorate" ||
    state.auth.userData.userRole.toLowerCase() === "administrator"
  );
});
const onFileSelected = async (e) => {
  files.value = e.target.files;
};
const schema = yup.object({
  title: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  date: yup.string(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: title, errorMessage: titleError } = useField("title");
const { value: description, errorMessage: descriptionError } =
  useField("description");
const { value: date, errorMessage: dateError } = useField("date");

const onSubmit = handleSubmit((values) => {
  console.log(JSON.stringify({ ...values, files: files.value }));
  toggleCreateModal();
  // dispatch("addZone", values);
});

const toggleCreateModal = () => {
  isCreateOpen.value = !isCreateOpen.value;
};
const openNotification = () => {
  toggleCreateModal();
  console.log("Create notification");
};
</script>
<style lang=""></style>

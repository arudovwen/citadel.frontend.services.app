<template>
  <div>
    <Modal
      :activeModal="store.state.zone.editModal"
      @close="closeEditModal"
      title="Update Zone"
      centered
    >
      <form @submit.prevent="updateZone" class="space-y-4">
        <Textinput
          label="title"
          type="text"
          placeholder="Task Name"
          name="title"
          v-model.trim="store.state.zone.editName"
        />
        <div class="assagin space-y-4">
          <!-- <div class="grid lg:grid-cols-2 gap-4 grid-cols-1">
            <FormGroup label="Start Date" name="d1">
              <flat-pickr
                v-model="store.state.zone.editStartDate"
                class="form-control"
                id="d1"
                placeholder="yyyy, dd M"
                :config="{
                  altInput: true,
                  altFormat: 'F j, Y',
                  dateFormat: 'Y-m-d',
                }"
              />
            </FormGroup>
            <FormGroup label="End Date" name="d2">
              <flat-pickr
                v-model="store.state.zone.editEndDate"
                class="form-control"
                id="d2"
                placeholder="yyyy, dd M"
                :config="{
                  altInput: true,
                  altFormat: 'F j, Y',
                  dateFormat: 'Y-m-d',
                }"
              />
            </FormGroup>
          </div>
          <VueSelect label="Assignee">
            <vSelect
              :options="assignOption"
              label="title"
              v-model="store.state.zone.editassignto"
              multiple
            >
              <template #option="{ title, image }">
                <span class="flex items-center space-x-4">
                  <div class="flex-none">
                    <div class="h-7 w-7 rounded-full">
                      <img
                        :src="image"
                        alt=""
                        class="w-full h-full rounded-full"
                      />
                    </div>
                  </div>
                  <span class="flex-1">{{ title }}</span>
                </span>
              </template>
              <template #selected-option="{ title, image }">
                <span class="flex items-center space-x-4">
                  <div class="flex-none">
                    <div class="h-7 w-7 rounded-full">
                      <img
                        :src="image"
                        alt=""
                        class="w-full h-full rounded-full"
                      />
                    </div>
                  </div>
                  <span class="flex-1">{{ title }}</span>
                </span>
              </template>
            </vSelect>
          </VueSelect>

          <VueSelect label="Zone category"
            ><vSelect
              :options="zoneCatagory"
              v-model="store.state.zone.editcta"
              multiple
          /></VueSelect> -->
          <Textarea
            label="Description"
            placeholder="Description"
            v-model="store.state.zone.editdesc"
          />
        </div>

        <div class="text-right">
          <Button
            text="Update"
            btnClass="btn-dark"
            :isDisabled="!isFromValid"
          ></Button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import Button from "@/components/Button";
// import FormGroup from "@/components/FormGroup";
import Modal from "@/components/Modal";
// import VueSelect from "@/components/Select/VueSelect";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import { useForm } from "vee-validate";
import { computed } from "vue";
// import vSelect from "vue-select";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
// import { assignOption, zoneCatagory } from "@/constant/data";

let store = useStore();

const { handleSubmit } = useForm();

const toast = useToast();

const isFromValid = computed(() => {
  return (
    store.state.zone.editName.length > 0 &&
    store.state.zone.editassignto &&
    store.state.zone.editcta &&
    store.state.zone.editStartDate &&
    store.state.zone.editEndDate &&
    store.state.zone.editdesc
  );
});

const updateZone = handleSubmit(() => {
  if (isFromValid.value) {
    store.dispatch("updateZone", {
      id: store.state.zone.editId,
      name: store.state.zone.editName,
      des: store.state.zone.editdesc,
      assignto: store.state.zone.editassignto,
      catagory: store.state.zone.editcta,
      startDate: store.state.zone.editStartDate,
      endDate: store.state.zone.editEndDate,
      progress: 60,
    });
    store.state.zone.editModal = false;
    toast.success -
      500("Task updated", {
        timeout: 2000,
      });
  }
});

const closeEditModal = () => {
  store.dispatch("closeEditModal");
};
</script>
<style lang=""></style>

<template>
  <div>
    <Modal
      :activeModal="store.state.goal.addmodal"
      @close="closeModal"
      title="Create Goal"
      centered
      sizeClass="max-w-sm"
    >
      <form @submit.prevent="addGoal" class="space-y-4">
        <Textinput
          label="title"
          type="text"
          placeholder="Title of goal"
          name="title"
          v-model.trim="newTodoText"
          :error="newtodoError"
        />
        <div class="assagin space-y-4">
          <div class="grid gap-4 grid-cols-1">
            <FormGroup label="Date" name="d1" :error="errorstartDate">
              <flat-pickr
                v-model="startDate"
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
            <FormGroup label="Achievement Date" name="d2" :error="errorendDate">
              <flat-pickr
                v-model="endDate"
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
            <FormGroup>
              <div class="gap-x-4 flex items-end justify-between">
                <div class="flex-1">
                  <Textinput
                    label="Goal KPI"
                    type="text"
                    placeholder="Type here"
                    name="emil"
                    v-model="item"
                    classInput="h-[40px] w-full"
                  />
                </div>

                <div
                  @click="pushItem(item)"
                  class="rounded px-4 btn-primary btn-sm h-[40px] flex items-center justify-center gap-2"
                >
                  <Icon icon="heroicons-outline:plus" />
                </div>
              </div>

              <div class="mt-7">
                <ol>
                  <li
                    class="text-sm mb-2"
                    v-for="(item, idx) in listOfItems"
                    :key="item"
                  >
                    <div class="flex items-center justify-between gap-4">
                      <span> {{ item }}</span>
                      <div
                        @click="removeItem(idx)"
                        class="inline-flex items-center justify-center text-danger-500"
                      >
                        <Icon icon="heroicons-outline:trash" class="text-xs" />
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </FormGroup>
          </div>
        </div>

        <div class="text-right mt-8">
          <Button text="Add goal" btnClass="btn-dark"></Button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import Icon from "@/components/Icon";
import { ref, reactive } from "vue";
import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup";
import Modal from "@/components/Modal";
import Textinput from "@/components/Textinput";
import { v4 as uuidv4 } from "uuid";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import * as yup from "yup";
let store = useStore();

const item = ref("");
const schema = yup.object({
  title: yup.string().required("Title is required"),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
  listOfItems: yup.array(),
});

const formData = reactive({
  title: "",
  startDate: "",
  endDate: "",
  listOfItems: [],
});
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formData,
});
const { value: newTodoText, errorMessage: newtodoError } =
  useField("newTodoText");
const { value: startDate, errorMessage: errorstartDate } =
  useField("startDate");
const { value: endDate, errorMessage: errorendDate } = useField("endDate");
const { value: listOfItems } = useField("listOfItems");

const pushItem = (accessory) => {
  if (accessory.length > 0) {
    listOfItems.value.push(accessory);
    item.value = "";
  }
};

const removeItem = (idx) => {
  console.log(idx);
  listOfItems.value.splice(idx, 1);
};

const addGoal = handleSubmit(() => {
  store.dispatch("addGoal", {
    id: uuidv4(),
    name: newTodoText.value,

    startDate: startDate.value,
    endDate: endDate.value,
  });
});

const closeModal = () => {
  store.dispatch("closeModal");
};
</script>
<style lang=""></style>

<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <div class="flex md:mb-0 mb-3 border border-gray-200 rounded text-sm">
          <span
            class="px-4 py-2 border-r border-gray-200 last:border-none capitalize min-w-[90px] text-center"
            :class="activeFilter === n ? 'bg-gray-100' : ''"
            @click="activeFilter = n"
            v-for="n in filters"
            :key="n"
            >{{ n }}</span
          >
        </div>
        <div
          class="md:flex md:space-x-3 items-center flex-none"
          :class="window.width < 768 ? 'space-x-rb' : ''"
        >
          <InputGroup
            v-model="searchTerm"
            placeholder="Search"
            type="text"
            prependIcon="heroicons-outline:search"
            merged
          />
          <Button
            icon="heroicons-outline:calendar"
            text="Select date"
            btnClass=" btn-outline-secondary dark:border-slate-700  text-slate-600 btn-sm font-normal dark:text-slate-300 "
            iconClass="text-lg"
          />
          <Button
            icon="heroicons-outline:filter"
            text="Filter"
            btnClass=" btn-outline-secondary text-slate-600 dark:border-slate-700 dark:text-slate-300 font-normal btn-sm "
            iconClass="text-lg"
          />
          <Button
            icon="heroicons-outline:plus-sm"
            text="Add Member"
            btnClass=" btn-primary font-normal btn-sm "
            iconClass="text-lg"
            link="member-add"
          />
        </div>
      </div>
      <div class="-mx-6">
        <vue-good-table
          :columns="columns"
          styleClass=" vgt-table  centered "
          :rows="advancedTable"
          :sort-options="{
            enabled: false,
          }"
          :pagination-options="{
            enabled: true,
            perPage: perpage,
          }"
          :search-options="{
            enabled: true,
            externalQuery: searchTerm,
          }"
          :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
            selectioninfoClass: 'table-input-checkbox',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectinfo: true, // disable the select info-500 panel on top
            selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
          }"
        >
          <template v-slot:table-row="props">
            <span
              v-if="props.column.field == 'customer'"
              class="flex items-center"
            >
              <span class="w-7 h-7 rounded-full mr-3 flex-none">
                <img
                  :src="
                    require('@/assets/images/all-img/' +
                      props.row.customer.image)
                  "
                  :alt="props.row.customer.name"
                  class="object-cover w-full h-full rounded-full"
                />
              </span>
              <span
                class="text-sm text-slate-600 dark:text-slate-300 capitalize font-medium"
                >{{ props.row.customer.name }}</span
              >
            </span>
            <span v-if="props.column.field == 'order'" class="font-medium">
              {{ "#" + props.row.order }}
            </span>
            <span
              v-if="props.column.field == 'date'"
              class="text-slate-500 dark:text-slate-400"
            >
              {{ props.row.date }}
            </span>
            <span v-if="props.column.field == 'status'" class="block w-full">
              <span
                class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
                :class="`${
                  props.row.status === 'active'
                    ? 'text-success-500 bg-success-500'
                    : ''
                } 
            ${
              props.row.status === 'inactive'
                ? 'text-warning-500 bg-warning-500'
                : ''
            }
            ${props.row.status === 'pending' ? 'text-blue-500 bg-blue-500' : ''}
            
             `"
              >
                {{ props.row.status }}
              </span>
            </span>
            <span v-if="props.column.field == 'action'">
              <Dropdown classMenuItems=" w-[140px]">
                <span class="text-xl"
                  ><Icon icon="heroicons-outline:dots-vertical"
                /></span>
                <template v-slot:menus>
                  <MenuItem v-for="(item, i) in actions" :key="i">
                    <div
                      @click="generateAction(item.name, props.row.id).doit"
                      :class="`
                
                  ${
                    generateAction(item.name, props.row.id).name === 'delete'
                      ? 'bg-danger-500 text-danger-500 bg-opacity-30  hover:bg-opacity-100 hover:text-white'
                      : 'hover:bg-slate-900 hover:text-white'
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center `"
                    >
                      <span class="text-base"
                        ><Icon
                          :icon="generateAction(item.name, props.row.id).icon"
                      /></span>
                      <span>{{
                        generateAction(item.name, props.row.id).name
                      }}</span>
                    </div>
                  </MenuItem>
                </template>
              </Dropdown>
            </span>
          </template>
          <template #pagination-bottom="props">
            <div class="py-4 px-3">
              <Pagination
                :total="50"
                :current="current"
                :per-page="perpage"
                :pageRange="pageRange"
                @page-changed="current = $event"
                :pageChanged="props.pageChanged"
                :perPageChanged="props.perPageChanged"
                enableSearch
                enableSelect
                :options="options"
              >
                >
              </Pagination>
            </div>
          </template>
        </vue-good-table>
      </div>
    </Card>
  </div>
  <Modal
    title="Confirm action"
    label="Small modal"
    labelClass="btn-outline-dark"
    ref="modal"
    sizeClass="max-w-md"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure about this action?
    </div>
    <div v-if="type.toLowerCase() === 'delist'">
      <textarea
        resize="none"
        class="px-3 py-3 border border-gray-200 rounded-lg w-full"
        rows="4"
        placeholder="Provide reason"
      ></textarea>
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
</template>
<script>
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal/Modal";
import { MenuItem } from "@headlessui/vue";
import { advancedTable } from "@/constant/basic-tablle-data";
import window from "@/mixins/window";
export default {
  mixins: [window],
  components: {
    Pagination,
    InputGroup,
    Modal,
    Dropdown,
    Icon,
    Card,
    MenuItem,
    Button,
  },

  data() {
    return {
      advancedTable,
      current: 1,
      perpage: 10,
      pageRange: 5,
      searchTerm: "",
      type: "",
      id: null,
      filters: ["all", "pending"],
      activeFilter: "",
      actions: [
        {
          name: "Approve",
        },
        {
          name: "Delist",
        },
        {
          name: "view",
        },
        {
          name: "edit",
        },
        {
          name: "delete",
        },
      ],
      options: [
        {
          value: "1",
          label: "1",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "5",
          label: "5",
        },
      ],
      columns: [
        {
          label: "Id",
          field: "id",
        },
        {
          label: "Date",
          field: "date",
        },
        {
          label: "Name",
          field: "name",
        },

        {
          label: "Gender",
          field: "gender",
        },

        {
          label: "Phone",
          field: "phone",
        },

        {
          label: "Email",
          field: "email",
        },
        {
          label: "Address",
          field: "address",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  methods: {
    generateAction(name, id) {
      this.id = id;

      const actions = {
        view: {
          name: "view",
          icon: "heroicons-outline:eye",
          doit: () => {
            this.$router.push("/members-management/preview/" + id);
          },
        },
        edit: {
          name: "edit",
          icon: "heroicons:pencil-square",
          doit: () => {
            this.$router.push("/members-management/edit/" + id);
          },
        },
        delete: {
          name: "delete",
          icon: "heroicons-outline:trash",
          doit: () => {
            this.type = name;
            this.$refs.modal.openModal();
          },
        },
      };

      return actions[name] || null;
    },
  },
};
</script>
<style lang="scss"></style>

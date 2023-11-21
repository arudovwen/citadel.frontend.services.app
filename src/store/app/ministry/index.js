// import { v4 as uuidv4 } from "uuid";
import { useToast } from "vue-toastification";
import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";
const toast = useToast();
export default {
  state: {
    isLoading: null,
    //create
    addModal: false,
    addMinistryLoading: false,
    addMinistrySuccess: false,
    addMinistryError: null,

    //edit
    editModal: false,
    updateMinistryLoading: false,
    updateMinistrySuccess: false,
    updateMinistryError: null,
    //read
    getMinistriesLoading: false,
    getMinistriesSuccess: false,
    getMinistriesError: null,
    //delete
    deleteMinistryLoading: false,
    deleteMinistrySuccess: false,
    deleteMinistryError: null,
    ministry: null,

    ministries: [],
    total: 0,
  },
  getters: {},
  mutations: {
    addMinistryBegin(state) {
      state.addMinistryLoading = true;
      state.addMinistrySuccess = false;
      state.addMinistryError = null;
    },

    addMinistrySuccess(state) {
      state.addMinistryLoading = false;
      state.addMinistrySuccess = true;
    },

    addMinistryError(state, err) {
      state.addMinistryLoading = false;
      state.addMinistrySuccess = false;
      state.addMinistryError = err;
    },

    getMinistriesBegin(state) {
      state.getMinistriesLoading = true;
      state.getMinistriesSuccess = false;
      state.getMinistriesError = null;
    },
    getMinistriesSuccess(state, { data, totalCount }) {
      state.getMinistriesLoading = false;
      state.getMinistriesSuccess = true;
      state.getMinistriesError = null;
      state.ministries = data;
      state.total = totalCount;
    },
    getMinistriesError(state, err) {
      state.getMinistriesLoading = false;
      state.getMinistriesSuccess = false;
      state.getMinistriesError = err;
    },

    updateMinistryBegin(state) {
      state.updateMinistryLoading = true;
      state.updateMinistrySuccess = false;
      state.updateMinistryError = null;
    },
    updateMinistrySuccess(state) {
      state.updateMinistryLoading = false;
      state.updateMinistrySuccess = true;
      state.updateMinistryError = null;
    },
    updateMinistryError(state, err) {
      state.updateMinistryLoading = false;
      state.updateMinistrySuccess = false;
      state.updateMinistryError = err;
    },
    deleteMinistryBegin(state) {
      state.deleteMinistryLoading = true;
      state.deleteMinistrySuccess = false;
      state.deleteMinistryError = null;
    },
    deleteMinistrySuccess(state) {
      state.deleteMinistryLoading = false;
      state.deleteMinistrySuccess = true;
      state.deleteMinistryError = null;
    },
    deleteMinistryError(state, err) {
      state.deleteMinistryLoading = false;
      state.deleteMinistrySuccess = false;
      state.deleteMinistryError = err;
    },

    //

    // removeMinistry
    removeMinistry(state, data) {
      state.Ministrys = state.Ministrys.filter((item) => item.id !== data.id);
      toast.error("Ministry Removed", {
        timeout: 2000,
      });
    },
    // updateMinistry
    updateMinistry(state, data) {
      state.Ministrys.findIndex((item) => {
        if (item.id === data.id) {
          // store data
          state.editId = data.id;
          state.editName = data.name;
          state.editassignto = data.assignto;
          state.editStartDate = data.startDate;
          state.editEndDate = data.endDate;
          state.editcta = data.category;
          state.editdesc = data.des;

          // set data to data
          item.name = data.name;
          item.des = data.des;
          item.startDate = data.startDate;
          item.endDate = data.endDate;
          item.assignto = data.assignto;
          item.progress = data.progress;
          item.category = data.category;
        }
      });
      state.editModal = true;
    },
    //open edit Ministry
    openEditModal(state, data) {
      state.editModal = true;
      state.Ministry = data;
    },

    // toggleAddMinistry
    toggleAddMinistry(state) {
      state.addModal = !state.addModal;
    },
    // closeModal
    closeModal(state) {
      state.addModal = false;
    },
    // closeEditModal
    closeEditModal(state) {
      state.editModal = false;
    },
  },
  actions: {
    async addMinistry({ commit }, data) {
      try {
        commit("addMinistryBegin");
        const response = await DataService.post(urls.CREATE_MINISTRY, data);

        if (response.status === 200) {
          commit("addMinistrySuccess");
        }
      } catch (err) {
        commit("addMinistryError", err);
      }
    },
    async getMinistries({ commit }, data) {
      try {
        commit("getMinistriesBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_MINISTRIES}?${new URLSearchParams(cleanObject(data))}`
        );

        if (response.status === 200) {
          commit("getMinistriesSuccess", response.data);
        }
      } catch (err) {
        commit("getMinistriesError", err);
      }
    },
    async getMinistriesTotal({ commit }, data) {
      try {
        commit("getMinistriesBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_MinistryS_TOTAL}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );

        if (response.status === 200) {
          commit("getMinistriesSuccess", response.data);
        }
      } catch (err) {
        commit("getMinistriesError", err);
      }
    },
    async updateMinistry({ commit }, data) {
      try {
        commit("updateMinistryBegin");
        const response = await DataService.put(urls.UPDATE_Ministry, data);

        if (response.status === 200) {
          commit("updateMinistrySuccess", response.data.data);
        }
      } catch (err) {
        commit("updateMinistryError", err);
      }
    },

    async deleteMinistry({ commit }, id) {
      try {
        commit("deleteMinistryBegin");
        const response = await DataService.delete(
          `${urls.DELETE_Ministry}?id=${id}`
        );

        if (response.status === 200) {
          commit("deleteMinistrySuccess", response.data.data);
        }
      } catch (err) {
        commit("deleteMinistryError", err);
      }
    },
    // removeMinistry
    removeMinistry({ commit }, data) {
      commit("removeMinistry", data);
    },
    // updateMinistry

    //open edit modal
    openEditModal({ commit }, data) {
      commit("openEditModal", data);
    },
    // eopen Ministry
    toggleAddMinistry({ commit }) {
      commit("toggleAddMinistry");
      console.log("toggled");
    },

    closeModal({ commit }) {
      commit("closeModal");
    },
    // closeEditModal
    closeEditModal({ commit }) {
      commit("closeEditModal");
    },
  },
};

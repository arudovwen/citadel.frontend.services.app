// // import { v4 as uuidv4 } from "uuid";
// import { useToast } from "vue-toastification";
import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";
// const toast = useToast();
export default {
  state: {
    isLoading: null,
    //create
    addModal: false,
    addAccessoryLoading: false,
    addAccessorySuccess: false,
    addAccessoryError: null,

    //edit
    editModal: false,
    updateAccessoryLoading: false,
    updateAccessorySuccess: false,
    updateAccessoryError: null,
    //read
    getAccessoryLoading: false,
    getAccessorySuccess: false,
    getAccessoryError: null,
    //delete
    deleteAccessoryLoading: false,
    deleteAccessorySuccess: false,
    deleteAccessoryError: null,
    accessory: null,

    accessories: [],
    total: 0,
  },
  getters: {},
  mutations: {
    addAccessoryBegin(state) {
      state.addAccessoryLoading = true;
      state.addAccessorySuccess = false;
      state.addAccessoryError = null;
    },

    addAccessorySuccess(state) {
      state.addAccessoryLoading = false;
      state.addAccessorySuccess = true;
      state.addAccessoryError = null;
    },

    addAccessoryError(state, err) {
      state.addAccessoryLoading = false;
      state.addAccessorySuccess = false;
      state.addAccessoryError = err;
    },

    getAccessoriesBegin(state) {
      state.getAccessoriesLoading = true;
      state.getAccessoriesSuccess = false;
      state.getAccessoriesError = null;
    },
    getAccessoriesSuccess(state, { data, totalCount }) {
      state.getAccessoriesLoading = false;
      state.getAccessoriesSuccess = true;
      state.getAccessoriesError = null;
      state.accessories = data;
      state.total = totalCount;
    },
    getAccessoriesError(state, err) {
      state.getAccessoriesLoading = false;
      state.getAccessoriesSuccess = false;
      state.getAccessoriesError = err;
    },

    updateAccessoryBegin(state) {
      state.updateAccessoryLoading = true;
      state.updateAccessorySuccess = false;
      state.updateAccessoryError = null;
    },
    updateAccessorySuccess(state) {
      state.updateAccessoryLoading = false;
      state.updateAccessorySuccess = true;
      state.updateAccessoryError = null;
    },
    updateAccessoryError(state, err) {
      state.updateAccessoryLoading = false;
      state.updateAccessorySuccess = false;
      state.updateAccessoryError = err;
    },
    deleteAccessoryBegin(state) {
      state.deleteAccessoryLoading = true;
      state.deleteAccessorySuccess = false;
      state.deleteAccessoryError = null;
    },
    deleteAccessorySuccess(state) {
      state.deleteAccessoryLoading = false;
      state.deleteAccessorySuccess = true;
      state.deleteAccessoryError = null;
    },
    deleteAccessoryError(state, err) {
      state.deleteAccessoryLoading = false;
      state.deleteAccessorySuccess = false;
      state.deleteAccessoryError = err;
    },

    //open edit Accessory
    openAccessoryEditModal(state, data) {
      state.editModal = true;
      state.accessory = data;
    },

    // toggleAddAccessory
    toggleAddAccessory(state) {
      state.addModal = !state.addModal;
    },
    // closeAddAccessoryModal
    closeAddAccessoryModal(state) {
      state.addModal = false;
    },
    // closeAccessoryEditModal
    closeAccessoryEditModal(state) {
      state.editModal = false;
    },
  },
  actions: {
    async addAccessory({ commit }, data) {
      try {
        commit("addAccessoryBegin");
        const response = await DataService.post(urls.CREATE_ACCESSORY, data);

        if (response.status === 200) {
          commit("addAccessorySuccess");
        }
      } catch (err) {
        commit("addAccessoryError", err);
      }
    },
    async getAccessories({ commit }, data) {
      try {
        commit("getAccessoriesBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_ACCESSORIES}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );

        if (response.status === 200) {
          commit("getAccessoriesSuccess", response.data);
        }
      } catch (err) {
        commit("getAccessoriesError", err);
      }
    },

    async updateAccessory({ commit }, data) {
      try {
        commit("updateAccessoryBegin");
        const response = await DataService.put(urls.UPDATE_ACCESSORY, data);

        if (response.status === 200) {
          commit("updateAccessorySuccess", response.data.data);
        }
      } catch (err) {
        commit("updateAccessoryError", err);
      }
    },

    async deleteAccessory({ commit }, id) {
      try {
        commit("deleteAccessoryBegin");
        const response = await DataService.delete(
          `${urls.DELETE_ACCESSORY}?id=${id}`
        );

        if (response.status === 200) {
          commit("deleteAccessorySuccess", response.data.data);
        }
      } catch (err) {
        commit("deleteAccessoryError", err);
      }
    },
    // removeAccessory
    removeAccessory({ commit }, data) {
      commit("removeAccessory", data);
    },
    // updateAccessory

    //open edit modal
    openAccessoryEditModal({ commit }, data) {
      commit("openAccessoryEditModal", data);
    },
    // eopen Accessory
    toggleAddAccessory({ commit }) {
      commit("toggleAddAccessory");
    },

    closeAddAccessoryModal({ commit }) {
      commit("closeAddAccessoryModal");
    },
    // closeAccessoryEditModal
    closeAccessoryEditModal({ commit }) {
      commit("closeAccessoryEditModal");
    },
  },
};

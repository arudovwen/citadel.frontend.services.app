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
    addUnitLoading: false,
    addUnitSuccess: false,
    addUnitError: null,

    //edit
    editModal: false,
    updateUnitLoading: false,
    updateUnitSuccess: false,
    updateUnitError: null,
    //read
    getUnitLoading: false,
    getUnitSuccess: false,
    getUnitError: null,
    //delete
    deleteUnitLoading: false,
    deleteUnitSuccess: false,
    deleteUnitError: null,
    unit: null,

    units: [],
    total: 0,
  },
  getters: {},
  mutations: {
    addUnitBegin(state) {
      state.addUnitLoading = true;
      state.addUnitSuccess = false;
      state.addUnitError = null;
    },

    addUnitSuccess(state) {
      state.addUnitLoading = false;
      state.addUnitSuccess = true;
    },

    addUnitError(state, err) {
      state.addUnitLoading = false;
      state.addUnitSuccess = false;
      state.addUnitError = err;
    },

    getUnitsBegin(state) {
      state.getUnitsLoading = true;
      state.getUnitsSuccess = false;
      state.getUnitsError = null;
    },
    getUnitsSuccess(state, { data, totalCount }) {
      state.getUnitsLoading = false;
      state.getUnitsSuccess = true;
      state.getUnitsError = null;
      state.units = data;
      state.total = totalCount;
    },
    getUnitsError(state, err) {
      state.getUnitsLoading = false;
      state.getUnitsSuccess = false;
      state.getUnitsError = err;
    },

    updateUnitBegin(state) {
      state.updateUnitLoading = true;
      state.updateUnitSuccess = false;
      state.updateUnitError = null;
    },
    updateUnitSuccess(state) {
      state.updateUnitLoading = false;
      state.updateUnitSuccess = true;
      state.updateUnitError = null;
    },
    updateUnitError(state, err) {
      state.updateUnitLoading = false;
      state.updateUnitSuccess = false;
      state.updateUnitError = err;
    },
    deleteUnitBegin(state) {
      state.deleteUnitLoading = true;
      state.deleteUnitSuccess = false;
      state.deleteUnitError = null;
    },
    deleteUnitSuccess(state) {
      state.deleteUnitLoading = false;
      state.deleteUnitSuccess = true;
      state.deleteUnitError = null;
    },
    deleteUnitError(state, err) {
      state.deleteUnitLoading = false;
      state.deleteUnitSuccess = false;
      state.deleteUnitError = err;
    },

    //open edit Unit
    openUnitEditModal(state, data) {
      state.editModal = true;
      state.unit = data;
    },

    // toggleAddUnit
    toggleAddUnit(state) {
      state.addModal = !state.addModal;
    },
    // closeAddUnitModal
    closeAddUnitModal(state) {
      state.addModal = false;
    },
    // closeUnitEditModal
    closeUnitEditModal(state) {
      state.editModal = false;
    },
  },
  actions: {
    async addUnit({ commit }, data) {
      try {
        commit("addUnitBegin");
        const response = await DataService.post(urls.CREATE_UNIT, data);

        if (response.status === 200) {
          commit("addUnitSuccess");
        }
      } catch (err) {
        commit("addUnitError", err);
      }
    },
    async getUnits({ commit }, data) {
      try {
        commit("getUnitsBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_UNITS}?${new URLSearchParams(cleanObject(data))}`
        );

        if (response.status === 200) {
          commit("getUnitsSuccess", response.data);
        }
      } catch (err) {
        commit("getUnitsError", err);
      }
    },
    // async getUnitsTotal({ commit }, data) {
    //   try {
    //     commit("getUnitsBegin");
    //     const response = await DataService.get(
    //       `${urls.GET_ALL_Units_TOTAL}?${new URLSearchParams(cleanObject(data))}`
    //     );

    //     if (response.status === 200) {
    //       commit("getUnitsSuccess", response.data);
    //     }
    //   } catch (err) {
    //     commit("getUnitsError", err);
    //   }
    // },
    async updateUnit({ commit }, data) {
      try {
        commit("updateUnitBegin");
        const response = await DataService.put(urls.UPDATE_UNIT, data);

        if (response.status === 200) {
          commit("updateUnitSuccess", response.data.data);
        }
      } catch (err) {
        commit("updateUnitError", err);
      }
    },

    async deleteUnit({ commit }, id) {
      try {
        commit("deleteUnitBegin");
        const response = await DataService.delete(
          `${urls.DELETE_UNIT}?id=${id}`
        );

        if (response.status === 200) {
          commit("deleteUnitSuccess", response.data.data);
        }
      } catch (err) {
        commit("deleteUnitError", err);
      }
    },
    // removeUnit
    removeUnit({ commit }, data) {
      commit("removeUnit", data);
    },
    // updateUnit

    //open edit modal
    openUnitEditModal({ commit }, data) {
      commit("openUnitEditModal", data);
    },
    // eopen Unit
    toggleAddUnit({ commit }) {
      commit("toggleAddUnit");
    },

    closeAddUnitModal({ commit }) {
      commit("closeAddUnitModal");
    },
    // closeUnitEditModal
    closeUnitEditModal({ commit }) {
      commit("closeUnitEditModal");
    },
  },
};

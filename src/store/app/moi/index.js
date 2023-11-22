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
    addMOILoading: false,
    addMOISuccess: false,
    addMOIError: null,

    //edit
    editModal: false,
    updateMOILoading: false,
    updateMOISuccess: false,
    updateMOIError: null,
    //read
    getMOILoading: false,
    getMOISuccess: false,
    getMOIError: null,
    //delete
    deleteMOILoading: false,
    deleteMOISuccess: false,
    deleteMOIError: null,
    moi: null,

    mois: [],
    total: 0,
  },
  getters: {},
  mutations: {
    addMOIBegin(state) {
      state.addMOILoading = true;
      state.addMOISuccess = false;
      state.addMOIError = null;
    },

    addMOISuccess(state) {
      state.addMOILoading = false;
      state.addMOISuccess = true;
    },

    addMOIError(state, err) {
      state.addMOILoading = false;
      state.addMOISuccess = false;
      state.addMOIError = err;
    },

    getMOIsBegin(state) {
      state.getMOIsLoading = true;
      state.getMOIsSuccess = false;
      state.getMOIsError = null;
    },
    getMOIsSuccess(state, { data, totalCount }) {
      state.getMOIsLoading = false;
      state.getMOIsSuccess = true;
      state.getMOIsError = null;
      state.mois = data;
      state.total = totalCount;
    },
    getMOIsError(state, err) {
      state.getMOIsLoading = false;
      state.getMOIsSuccess = false;
      state.getMOIsError = err;
    },

    updateMOIBegin(state) {
      state.updateMOILoading = true;
      state.updateMOISuccess = false;
      state.updateMOIError = null;
    },
    updateMOISuccess(state) {
      state.updateMOILoading = false;
      state.updateMOISuccess = true;
      state.updateMOIError = null;
    },
    updateMOIError(state, err) {
      state.updateMOILoading = false;
      state.updateMOISuccess = false;
      state.updateMOIError = err;
    },
    deleteMOIBegin(state) {
      state.deleteMOILoading = true;
      state.deleteMOISuccess = false;
      state.deleteMOIError = null;
    },
    deleteMOISuccess(state) {
      state.deleteMOILoading = false;
      state.deleteMOISuccess = true;
      state.deleteMOIError = null;
    },
    deleteMOIError(state, err) {
      state.deleteMOILoading = false;
      state.deleteMOISuccess = false;
      state.deleteMOIError = err;
    },

    //open edit MOI
    openMOIEditModal(state, data) {
      state.editModal = true;
      state.moi = data;
    },

    // toggleAddMOI
    toggleAddMOI(state) {
      state.addModal = !state.addModal;
    },
    // closeModal
    closeModal(state) {
      state.addModal = false;
    },
    // closeMOIEditModal
    closeMOIEditModal(state) {
      state.editModal = false;
    },
  },
  actions: {
    async addMOI({ commit }, data) {
      try {
        commit("addMOIBegin");
        const response = await DataService.post(urls.CREATE_MOI, data);

        if (response.status === 200) {
          commit("addMOISuccess");
        }
      } catch (err) {
        commit("addMOIError", err);
      }
    },
    async getMOIs({ commit }, data) {
      try {
        commit("getMOIsBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_MOIS}?${new URLSearchParams(cleanObject(data))}`
        );

        if (response.status === 200) {
          commit("getMOIsSuccess", response.data);
        }
      } catch (err) {
        commit("getMOIsError", err);
      }
    },
    // async getMOIsTotal({ commit }, data) {
    //   try {
    //     commit("getMOIsBegin");
    //     const response = await DataService.get(
    //       `${urls.GET_ALL_MOIs_TOTAL}?${new URLSearchParams(cleanObject(data))}`
    //     );

    //     if (response.status === 200) {
    //       commit("getMOIsSuccess", response.data);
    //     }
    //   } catch (err) {
    //     commit("getMOIsError", err);
    //   }
    // },
    async updateMOI({ commit }, data) {
      try {
        commit("updateMOIBegin");
        const response = await DataService.put(urls.UPDATE_MOI, data);

        if (response.status === 200) {
          commit("updateMOISuccess", response.data.data);
        }
      } catch (err) {
        commit("updateMOIError", err);
      }
    },

    async deleteMOI({ commit }, id) {
      try {
        commit("deleteMOIBegin");
        const response = await DataService.delete(
          `${urls.DELETE_MOI}?id=${id}`
        );

        if (response.status === 200) {
          commit("deleteMOISuccess", response.data.data);
        }
      } catch (err) {
        commit("deleteMOIError", err);
      }
    },
    // removeMOI
    removeMOI({ commit }, data) {
      commit("removeMOI", data);
    },
    // updateMOI

    //open edit modal
    openMOIEditModal({ commit }, data) {
      commit("openMOIEditModal", data);
    },
    // eopen MOI
    toggleAddMOI({ commit }) {
      commit("toggleAddMOI");
      console.log("toggled");
    },

    closeModal({ commit }) {
      commit("closeModal");
    },
    // closeMOIEditModal
    closeMOIEditModal({ commit }) {
      commit("closeMOIEditModal");
    },
  },
};

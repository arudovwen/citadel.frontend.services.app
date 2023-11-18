import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";

export default {
  state: {
    data: [],
    total: 0,
    getallloading: false,
    getallsuccess: false,
    getallerror: null,
    approveloading: false,
    approvesuccess: false,
    approveerror: null,
  },
  getters: {},
  mutations: {
    getAllBegin(state) {
      state.getallloading = true;
      state.getallsuccess = false;
      state.getallerror = null;
    },
    getAllSuccess(state, { data, totalCount }) {
      state.getallloading = false;
      state.getallsuccess = true;
      state.getallerror = null;
      state.data = data;
      state.total = totalCount;
    },
    getAllError(state, err) {
      state.getallloading = false;
      state.getallsuccess = false;
      state.getallerror = err;
    },
    approveBegin(state) {
      state.approveloading = true;
      state.approvesuccess = false;
      state.approveerror = null;
    },
    approveSuccess(state) {
      state.approveloading = false;
      state.approvesuccess = true;
      state.approveerror = null;
    },
    approveError(state, err) {
      state.approveloading = false;
      state.approvesuccess = false;
      state.approveerror = err;
    },

    deleteBegin(state) {
      state.deleteloading = true;
      state.error = null;
      state.deletesuccess = false;
    },
    deleteSuccess(state) {
      state.deleteloading = false;
      state.deletesuccess = true;
    },
    deleteErr(state, err) {
      state.deleteloading = false;
      state.error = err;
      state.deletesuccess = false;
    },
  },
  actions: {
    async getAllHodReports({ commit }, data) {
      try {
        commit("getAllBegin");
        const response = await DataService.get(
          `${urls.GET_REPORT}?${new URLSearchParams(cleanObject(data))}`
        );
        if (response.status === 200) {
          commit("getAllSuccess", response.data);
        }
      } catch (err) {
        commit("getAllErr", err);
      }
    },
    async getAllInspectorateReports({ commit }, data) {
      try {
        commit("getAllBegin");
        const response = await DataService.get(
          `${urls.GET_INSPECTORATE_REPORT}?${new URLSearchParams(data)}`
        );
        if (response.status === 200) {
          commit("getAllSuccess", response.data);
        }
      } catch (err) {
        commit("getAllErr", err);
      }
    },
    async approveCOD({ commit }, data) {
      try {
        commit("approveBegin");
        const response = await DataService.put(
          `${urls.APPROVE_CHANGE_OF_DEPARTMENT}?${new URLSearchParams(data)}`
        );
        if (response.status === 200) {
          commit("approveSuccess");
        }
      } catch (err) {
        commit("approveErr", err);
      }
    },
    async approveCOZ({ commit }, data) {
      try {
        commit("approveBegin");
        const response = await DataService.put(
          `${urls.APPROVE_CHANGE_OF_ZONE}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("approveSuccess");
        }
      } catch (err) {
        commit("approveErr", err);
      }
    },
  },
};

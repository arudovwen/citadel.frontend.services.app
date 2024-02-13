import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";

export default {
  state: {
    data: [],
    total: 0,
    reports: [],
    detail: null,
    loading: false,
    addsuccess: false,
    error: null,
    getallloading: false,
    getallsuccess: false,
    getallerror: null,
    approveloading: false,
    approvesuccess: false,
    approveerror: null,
    getreportLoading: false,
    getreportSuccess: false,
    getreportError: null,
    updatereportLoading: false,
    updatereportsuccess: false,
    updatereportError: null,
    deletereportLoading: false,
    deletereportuccess: false,
    deletereportError: null,
  },
  getters: {},
  mutations: {
    addBegin(state) {
      state.loading = true;
      state.error = null;
      state.addsuccess = false;
    },
    addSuccess(state) {
      state.loading = false;
      state.addsuccess = true;
      state.error = null;
    },
    addErr(state, err) {
      state.loading = false;
      state.error = err;
      state.addsuccess = false;
    },
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
    getReportBegin(state) {
      state.getreportloading = true;
      state.getreportsuccess = false;
      state.getreporterror = null;
    },
    getReportSuccess(state, data) {
      state.getreportloading = false;
      state.getreportsuccess = true;
      state.getreporterror = null;
      state.detail = data;
    },
    getReportError(state, err) {
      state.getreportloading = false;
      state.getreportsuccess = false;
      state.getreporterror = err;
    },

    updateReportBegin(state) {
      state.updatereportloading = true;
      state.updatereportsuccess = false;
      state.updatereporterror = null;
    },
    updateReportSuccess(state) {
      state.updatereportloading = false;
      state.updatereportsuccess = true;
      state.updatereporterror = null;
    },
    updateReportError(state, err) {
      state.updatereportloading = false;
      state.updatereportsuccess = false;
      state.updatereporterror = err;
    },
    deleteReportBegin(state) {
      state.deletereportloading = true;
      state.deletereportsuccess = false;
      state.deletereporterror = null;
    },
    deleteReportSuccess(state) {
      state.deletereportloading = false;
      state.deletereportsuccess = true;
      state.deletereporterror = null;
    },
    deleteReportError(state, err) {
      state.deletereportloading = false;
      state.deletereportsuccess = false;
      state.deletereporterror = err;
    },
  },
  actions: {
    async addActivityReport({ commit }, data) {
      try {
        commit("addBegin");
        const response = await DataService.post(
          `${urls.CREATE_ACTIVITY_REPORT}`,
          data
        );
        if (response.status === 200) {
          commit("addSuccess");
        }
      } catch (err) {
        commit("addErr", err);
      }
    },
    async updateActivityReport({ commit }, data) {
      try {
        commit("updateReportBegin");
        const response = await DataService.put(
          `${urls.UPDATE_ACTIVITY_REPORT}`,
          data
        );
        if (response.status === 200) {
          commit("updateReportSuccess");
        }
      } catch (err) {
        commit("updateReportErr", err);
      }
    },

    async getActivityReports({ commit }, data) {
      try {
        commit("getAllBegin");
        const response = await DataService.get(
          `${urls.GET_ACTIVITY_REPORTS}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("getAllSuccess", response.data);
        }
      } catch (err) {
        commit("getAllErr", err);
      }
    },
    async getActivityReport({ commit }, data) {
      try {
        commit("getReportBegin");
        const response = await DataService.get(
          `${urls.GET_ACTIVITY_REPORT}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("getReportSuccess", response.data.data);
        }
      } catch (err) {
        commit("getReportErr", err);
      }
    },
    async deleteActivityReport({ commit }, id) {
      try {
        commit("deleteZoneBegin");
        const response = await DataService.delete(
          `${urls.DELETE_ACTIVITY_REPORT}?id=${id}`
        );

        if (response.status === 200) {
          commit("deleteZoneSuccess", response.data.data);
        }
      } catch (err) {
        commit("deleteZoneError", err);
      }
    },

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
    // async approveCOD({ commit }, data) {
    //   try {
    //     commit("approveBegin");
    //     const response = await DataService.put(
    //       `${urls.APPROVE_CHANGE_OF_DEPARTMENT}?${new URLSearchParams(data)}`
    //     );
    //     if (response.status === 200) {
    //       commit("approveSuccess");
    //     }
    //   } catch (err) {
    //     commit("approveErr", err);
    //   }
    // },
    async approveCOZ({ commit }, data) {
      try {
        commit("approveBegin");
        const response = await DataService.put(
          `${urls.APPROVE_CHANGE_OF_report}?${new URLSearchParams(
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

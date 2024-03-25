import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";

export default {
  state: {
    data: [],
    inspectionsData: [],
    total: 0,
    reports: [],
    detail: null,
    inspectionReport: null,
    loading: false,
    addsuccess: false,
    error: null,
    getallloading: false,
    getallsuccess: false,
    getallerror: null,
    getAllInspectionLoading: false,
    getAllInspectionSuccess: false,
    getAllInspectionError: null,
    addAllInspectionLoading: false,
    addAllInspectionSuccess: false,
    addAllInspectionError: null,
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
    addFollowupLoading: false,
    addFollowupSuccess: false,
    addFollowupError: null,
  },
  getters: {},
  mutations: {
    addFollowupBegin(state) {
      state.addFollowupLoading = true;
      state.addFollowupError = null;
      state.addFollowupSuccess = false;
    },
    addFollowupSuccess(state) {
      state.addFollowupLoading = false;
      state.addFollowupSuccess = true;
      state.addFollowupError = null;
    },
    addFollowupError(state, err) {
      state.addFollowupLoading = false;
      state.addFollowupError = err;
      state.addFollowupSuccess = false;
    },
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
      state.data = data || [];
      state.total = totalCount;
    },
    getAllError(state, err) {
      state.getallloading = false;
      state.getallsuccess = false;
      state.getallerror = err;
    },
    getAllInspectionBegin(state) {
      state.getAllInspectionLoading = true;
      state.getAllInspectionSuccess = false;
      state.getAllInspectionError = null;
    },
    getAllInspectionSuccess(state, { data, totalCount }) {
      state.getAllInspectionLoading = false;
      state.getAllInspectionSuccess = true;
      state.getAllInspectionError = null;
      state.inspectionsData = data;
      state.total = totalCount;
    },
    getAllInspectionError(state, err) {
      state.getAllInspectionLoading = false;
      state.getAllInspectionSuccess = false;
      state.getAllInspectionError = err;
    },
    addAllInspectionBegin(state) {
      state.addAllInspectionLoading = true;
      state.addAllInspectionSuccess = false;
      state.addAllInspectionError = null;
    },
    addAllInspectionSuccess(state) {
      state.addAllInspectionLoading = false;
      state.addAllInspectionSuccess = true;
      state.addAllInspectionError = null;
    },
    addAllInspectionError(state, err) {
      state.addAllInspectionLoading = false;
      state.addAllInspectionSuccess = false;
      state.addAllInspectionError = err;
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
    async addFollowupReport({ commit }, data) {
      try {
        commit("addFollowupBegin");
        console.log("Payload: " + JSON.stringify(data));
        const response = await DataService.post(
          `${urls.CREATE_FOLLOW_UP_REPORT}`,
          data
        );
        if (response.status === 200) {
          commit("addFollowupSuccess");
        }
      } catch (err) {
        commit("addFollowupError", err);
      }
    },

    async getAllFollowupReport({ commit }, data) {
      try {
        commit("getAllBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_FOLLOW_UP_REPORT}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("getAllSuccess", response.data);
        }
      } catch (err) {
        commit("getAllError", err);
      }
    },
    async getAllFollowupReportById({ commit }, data) {
      try {
        commit("getAllBegin");
        const response = await DataService.get(
          `${urls.GET_FOLLOW_UP_REPORT_BY_ID}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("getAllSuccess", response.data);
        }
      } catch (err) {
        commit("getAllError", err);
      }
    },
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
    async addInspectionReport({ commit }, data) {
      try {
        commit("addAllInspectionBegin");
        const response = await DataService.post(
          `${urls.CREATE_INSPECTION_REPORT}`,
          data
        );
        if (response.status === 200) {
          commit("addAllInspectionSuccess");
        }
      } catch (err) {
        commit("addAllInspectionError", err);
      }
    },
    async updateInspectionReport({ commit }, data) {
      try {
        commit("updateReportBegin");
        const response = await DataService.put(
          `${urls.UPDATE_INSPECTION_REPORT}`,
          data
        );
        if (response.status === 200) {
          commit("updateReportSuccess");
        }
      } catch (err) {
        commit("updateReportErr", err);
      }
    },
    async getInspectionReports({ commit }, data) {
      try {
        commit("getAllInspectionBegin");
        const response = await DataService.get(
          `${urls.GET_INSPECTION_REPORTS}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("getAllInspectionSuccess", response.data);
        }
      } catch (err) {
        commit("getAllInspectionError", err);
      }
    },
    async getInspectionReport({ commit }, data) {
      try {
        commit("getReportBegin");
        const response = await DataService.get(
          `${urls.GET_INSPECTION_REPORT}?${new URLSearchParams(
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
        if (response.status === 204) {
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
    async deleteCIHReport({ commit }, { type, id }) {
      try {
        commit("deleteReportBegin");
        const response = await DataService.delete(
          `${
            type == "activity"
              ? urls.DELETE_ACTIVITY_REPORT
              : urls.DELETE_INSPECTION_REPORT
          }?id=${id}`
        );

        if (response.status === 200) {
          commit("deleteReportSuccess", response.data.data);
        }
      } catch (err) {
        commit("deleteReportError", err);
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

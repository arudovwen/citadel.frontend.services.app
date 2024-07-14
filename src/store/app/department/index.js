import { useToast } from "vue-toastification";
import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";

const toast = useToast();
export default {
  state: {
    getDeptSuccess: false,
    getDeptError: null,
    getDeptLoading: false,
    addmodal: false,
    total: 0,
    loading: false,
    isLoading: null,
    fetchsuccess: false,
    deletesuccess: false,
    getsuccess: false,
    addsuccess: false,
    updatesuccess: false,
    // for edit
    editModal: false,
    editName: "",
    editassignto: null,
    editStartDate: null,
    editEndDate: null,
    editcta: null,
    editId: null,
    editdesc: null,
    setPrimaryLoading: false,
    setPrimaryError: null,
    setPrimarySuccess: false,
    department: null,
    departments: [],
    userDepartments: [],
    atsloading: false,
    atssuccess: false,
    atsRecords: [],
    atserror: false,
  },
  getters: {
    departments: (state) => state.departments,
  },
  mutations: {
    getDeptBegin(state) {
      state.getDeptLoading = true;
      state.getDeptError = null;
      state.getDeptSuccess = false;
    },
    getDeptSuccess(state, { data }) {
      state.getDeptLoading = false;
      state.getDeptSuccess = true;
      state.userDepartments = data;
      // state.total = totalCount;
    },
    getDeptErr(state, err) {
      state.getDeptLoading = false;
      state.getDeptError = err;
      state.getDeptSuccess = false;
    },
    fetchBegin(state) {
      state.loading = true;
      state.error = null;
      state.fetchsuccess = false;
      state.departments = [];
    },
    fetchSuccess(state, { data, totalCount }) {
      state.loading = false;
      state.success = true;
      state.departments = data ? data : [];
      state.total = totalCount;
    },
    fetchErr(state, err) {
      state.loading = false;
      state.error = err;
      state.success = false;
    },
    atsBegin(state) {
      state.atsloading = true;
      state.atserror = null;
      state.atssuccess = false;
      state.atsRecords = [];
    },
    atsSuccess(state, { data, totalCount }) {
      state.atsloading = false;
      state.atssuccess = true;
      state.atsRecords = data ? data : [];
      state.total = totalCount;
    },
    atsErr(state, err) {
      state.latsoading = false;
      state.atserror = err;
      state.atssuccess = false;
    },
    fetchAllBegin(state) {
      // state.loading = true;
      state.error = null;
      state.fetchsuccess = false;
      state.departments = [];
    },
    fetchAllErr(state, err) {
      state.loading = false;
      state.error = err;
      state.success = false;
    },
    fetchAllSuccess(state, { data }) {
      state.allDepartments = data ? data : [];
    },
    updateBegin(state) {
      state.loading = true;
      state.error = null;
      state.updatesuccess = false;
    },
    updateSuccess(state) {
      state.loading = false;
      state.updatesuccess = true;
    },
    updateErr(state, err) {
      state.loading = false;
      state.error = err;
      state.updatesuccess = false;
    },
    deleteBegin(state) {
      state.loading = true;
      state.error = null;
      state.deletesuccess = false;
    },
    deleteSuccess(state) {
      state.loading = false;
      state.deletesuccess = true;
    },
    deleteErr(state, err) {
      state.loading = false;
      state.error = err;
      state.deletesuccess = false;
    },
    addBegin(state) {
      state.loading = true;
      state.error = null;
      state.addsuccess = false;
    },
    addSuccess(state) {
      state.loading = false;
      state.addsuccess = true;
    },
    addErr(state, err) {
      state.loading = false;
      state.error = err;
      state.addsuccess = false;
    },
    setPrimaryBegin(state) {
      state.setPrimaryLoading = true;
      state.setPrimaryError = null;
      state.setPrimarySuccess = false;
    },
    setPrimarySuccess(state) {
      state.setPrimaryLoading = false;
      state.setPrimarySuccess = true;
    },
    setPrimaryError(state, err) {
      state.setPrimaryLoading = false;
      state.setPrimaryError = err;
      state.setPrimarySuccess = false;
    },

    //
    addDepartment(state, data) {
      state.isLoading = true;

      setTimeout(() => {
        state.departments.unshift(data);
        state.isLoading = false;
        toast.success -
          500("Department added", {
            timeout: 2000,
          });
      }, 1500);
      state.addmodal = false;
    },
    // removeDepartment
    removeDepartment(state, data) {
      state.departments = state.departments.filter(
        (item) => item.id !== data.id
      );
      toast.error("Department Removed", {
        timeout: 2000,
      });
    },
    // updateDepartment
    updateDepartment(state, data) {
      state.department = data;
      state.editModal = true;
    },
    // openDepartment
    openDepartment(state) {
      state.addmodal = true;
    },
    // closeModal
    closeModal(state) {
      state.addmodal = false;
    },
    // closeEditModal
    closeEditModal(state) {
      state.editModal = false;
    },
  },
  actions: {
    async getDepartmentByUserId({ commit }, id) {
      try {
        commit("getDeptBegin");
        const response = await DataService.get(
          `${urls.GET_LOGGEDIN_USER_DEPARTMENT}?id=${id}`
        );
        if (response.status === 200) {
          commit("getDeptSuccess", response.data);
        }
      } catch (err) {
        commit("getDeptErr", err);
      }
    },
    async getDepartments({ commit }, data) {
      try {
        commit("fetchBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_DEPARTMENT}?${new URLSearchParams(cleanObject(data))}`
        );
        if (response.status === 200) {
          commit("fetchSuccess", response.data);
        }
      } catch (err) {
        commit("fetchErr", err);
      }
    },

    async getAllDepartmentMembers({ commit }, data) {
      try {
        commit("fetchAllBegin");
        const response = await DataService.get(
          `${urls.GET_DEPARTMENT_MEMBERS}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("fetchAllSuccess", response.data);
        }
      } catch (err) {
        commit("fetchAllErr", err);
      }
    },

    async getApprovedDepartments({ commit }, data) {
      try {
        commit("fetchBegin");
        const response = await DataService.get(
          `${urls.GET_APPROVED_DEPARTMENT_MEMBERS}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("fetchSuccess", response.data);
        }
      } catch (err) {
        commit("fetchErr", err);
      }
    },
    async getRejectedDepartments({ commit }, data) {
      try {
        commit("fetchBegin");
        const response = await DataService.get(
          `${urls.GET_REJECTED_DEPARTMENT_REQUESTS}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("fetchSuccess", response.data);
        }
      } catch (err) {
        commit("fetchErr", err);
      }
    },
    async getPendingDepartments({ commit }, data) {
      try {
        commit("fetchBegin");
        const response = await DataService.get(
          `${urls.GET_PENDING_DEPARTMENT_REQUESTS}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("fetchSuccess", response.data);
        }
      } catch (err) {
        commit("fetchErr", err);
      }
    },
    async getDelistedDepartments({ commit }, data) {
      try {
        commit("fetchBegin");
        const response = await DataService.get(
          `${urls.GET_DELISTED_DEPARTMENT_REQUESTS}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("fetchSuccess", response.data);
        }
      } catch (err) {
        commit("fetchErr", err);
      }
    },
    async getAtsMembersRecords({ commit }, data) {
      try {
        commit("atsBegin");
        const response = await DataService.get(
          `${urls.GET_MEMBER_ATS}?${new URLSearchParams(cleanObject(data))}`
        );
        if (response.status === 200) {
          commit("atsSuccess", response.data);
        }
      } catch (err) {
        commit("atsErr", err);
      }
    },
    async getDepartmentsTotal({ commit }, data) {
      try {
        commit("fetchBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_DEPARTMENT_TOTAL}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("fetchSuccess", response.data);
        }
      } catch (err) {
        commit("fetchErr", err);
      }
    },

    async getDepartmentById({ commit }, id) {
      try {
        commit("getBegin");
        const response = await DataService.get(
          `${urls.GET_DEPARTMENT_BY_ID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getSuccess", response.data.data);
        }
      } catch (err) {
        commit("getErr", err);
      }
    },
    async addDepartment({ commit }, data) {
      try {
        commit("addBegin");
        const response = await DataService.post(urls.CREATE_DEPARTMENT, data);
        if (response.status === 200) {
          commit("addSuccess");
        }
      } catch (err) {
        commit("addErr", err);
      }
    },
    async setPrimaryDepartment({ commit }, { userId, departmentName }) {
      try {
        commit("setPrimaryBegin");
        const response = await DataService.put(
          `${urls.SET_PRIMARY_DEPARTMENT}?UserId=${userId}&DepartmentName=${departmentName}`,
          {}
        );
        if (response.status === 200) {
          commit("setPrimarySuccess");
        }
      } catch (err) {
        commit("setPrimaryError", err);
      }
    },

    // removeDepartment
    async removeDepartment({ commit }, id) {
      try {
        commit("deleteBegin");
        const response = await DataService.delete(
          `${urls.DELETE_DEPARTMENT}?id=${id}`
        );
        if (response.status === 200) {
          commit("deleteSuccess");
        }
      } catch (err) {
        commit("deleteErr", err);
      }
    },
    async removeMemberFromDepartment({ commit }, data) {
      try {
        commit("deleteBegin");
        const response = await DataService.delete(
          `${urls.DELIST_MEMBER_FROM_DEPT}?${new URLSearchParams(data)}`
        );
        if (response.status === 200) {
          commit("deleteSuccess");
        }
      } catch (err) {
        commit("deleteErr", err);
      }
    },
    async delistMemberFromDepartment({ commit }, data) {
      try {
        commit("deleteBegin");
        const response = await DataService.put(
          `${urls.DELIST_MEMBER_FROM_DEPT}?${new URLSearchParams(data)}`,
          data
        );
        if (response.status === 200) {
          commit("deleteSuccess");
        }
      } catch (err) {
        commit("deleteErr", err);
      }
    },

    async editDepartment({ commit }, data) {
      try {
        commit("updateBegin");
        const response = await DataService.put(
          `${urls.UPDATE_DEPARTMENT}`,
          data
        );
        if (response.status === 200) {
          commit("updateSuccess");
        }
      } catch (err) {
        commit("updateErr", err);
      }
    },
    // updateDepartment
    updateDepartment({ commit }, data) {
      commit("updateDepartment", data);
    },
    // eopen department
    openDepartment({ commit }) {
      commit("openDepartment");
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

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
    modal: false,
    addRoleLoading: false,
    addRoleSuccess: false,
    addRoleError: null,

    //edit
    editModal: false,
    updateRoleLoading: false,
    updateRoleSuccess: false,
    updateRoleError: null,
    //read
    getRolesLoading: false,
    getRolesSuccess: false,
    getRolesError: null,
    //read by id
    getRoleByIdLoading: false,
    getRoleByIdSuccess: false,
    getRoleByIdError: null,

    //read modules
    getModulesLoading: false,
    getModulesSuccess: false,
    getModulesError: null,
    //delete
    deleteRoleLoading: false,
    deleteRoleSuccess: false,
    deleteRoleError: null,
    role: null,

    roles: [],
    modules: [],
    total: 0,
  },
  getters: {},
  mutations: {
    addRoleBegin(state) {
      state.addRoleLoading = true;
      state.addRoleSuccess = false;
      state.addRoleError = null;
    },

    addRoleSuccess(state) {
      state.addRoleLoading = false;
      state.addRoleSuccess = true;
    },

    addRoleError(state, err) {
      state.addRoleLoading = false;
      state.addRoleSuccess = false;
      state.addRoleError = err;
    },

    getRolesBegin(state) {
      state.getRolesLoading = true;
      state.getRolesSuccess = false;
      state.getRolesError = null;
    },
    getRolesSuccess(state, { data, totalCount }) {
      state.getRolesLoading = false;
      state.getRolesSuccess = true;
      state.getRolesError = null;
      state.roles = data;
      state.total = totalCount;
    },
    getRolesError(state, err) {
      state.getRolesLoading = false;
      state.getRolesSuccess = false;
      state.getRolesError = err;
    },
    getModulesBegin(state) {
      state.getModulesLoading = true;
      state.getModulesSuccess = false;
      state.getModulesError = null;
    },
    getModulesSuccess(state, { data, totalCount }) {
      state.getModulesLoading = false;
      state.getModulesSuccess = true;
      state.getModulesError = null;
      state.modules = data;
      state.total = totalCount;
    },
    getModulesError(state, err) {
      state.getModulesLoading = false;
      state.getModulesSuccess = false;
      state.getModulesError = err;
    },

    getRoleByIdBegin(state) {
      state.getRoleByIdLoading = true;
      state.getRoleByIdSuccess = false;
      state.getRoleByIdError = null;
    },
    getRoleByIdSuccess(state, data) {
      state.getRoleByIdLoading = false;
      state.getRoleByIdSuccess = true;
      state.getRoleByIdError = null;
      state.role = { ...state.role, ...data };
    },
    getRoleByIdError(state, err) {
      state.getRoleByIdLoading = false;
      state.getRoleByIdSuccess = false;
      state.getRoleByIdError = err;
    },

    updateRoleBegin(state) {
      state.updateRoleLoading = true;
      state.updateRoleSuccess = false;
      state.updateRoleError = null;
    },
    updateRoleSuccess(state) {
      state.updateRoleLoading = false;
      state.updateRoleSuccess = true;
      state.updateRoleError = null;
    },
    updateRoleError(state, err) {
      state.updateRoleLoading = false;
      state.updateRoleSuccess = false;
      state.updateRoleError = err;
    },
    deleteRoleBegin(state) {
      state.deleteRoleLoading = true;
      state.deleteRoleSuccess = false;
      state.deleteRoleError = null;
    },
    deleteRoleSuccess(state) {
      state.deleteRoleLoading = false;
      state.deleteRoleSuccess = true;
      state.deleteRoleError = null;
    },
    deleteRoleError(state, err) {
      state.deleteRoleLoading = false;
      state.deleteRoleSuccess = false;
      state.deleteRoleError = err;
    },

    //open edit Role
    openRoleEditModal(state, data) {
      state.editModal = true;
      state.role = data;
    },

    // openVenueModal
    openRoleModal(state, data) {
      state.role = data;
      state.modal = true;
    },
    // closeRoleModal
    closeRoleModal(state) {
      state.modal = false;
    },
    // closeRoleEditModal
    closeRoleEditModal(state) {
      state.editModal = false;
    },
  },
  actions: {
    async addRole({ commit }, data) {
      try {
        commit("addRoleBegin");
        const response = await DataService.post(urls.CREATE_Role, data);

        if (response.status === 200) {
          commit("addRoleSuccess");
        }
      } catch (err) {
        commit("addRoleError", err);
      }
    },
    async getRoles({ commit }, data) {
      try {
        commit("getRolesBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_RoleS}?${new URLSearchParams(cleanObject(data))}`
        );

        if (response.status === 200) {
          commit("getRolesSuccess", response.data);
        }
      } catch (err) {
        commit("getRolesError", err);
      }
    },
    async getModules({ commit }, data) {
      try {
        commit("getModulesBegin");
        const response = await DataService.get(
          `${urls.GET_MODULES}?${new URLSearchParams(cleanObject(data))}`
        );

        if (response.status === 200) {
          commit("getModulesSuccess", response.data);
        }
      } catch (err) {
        commit("getModulesError", err);
      }
    },

    async getRoleById({ commit }, id) {
      try {
        commit("getRoleByIdBegin");
        const response = await DataService.get(
          `${urls.GET_Role_BY_ID}?id=${id}`
        );

        if (response.status === 200) {
          commit("getRoleByIdSuccess", response.data.data);
        }
      } catch (err) {
        commit("getRoleByIdError", err);
      }
    },

    async updateRole({ commit }, data) {
      try {
        commit("updateRoleBegin");
        const response = await DataService.put(urls.UPDATE_Role, data);

        if (response.status === 200) {
          commit("updateRoleSuccess", response.data.data);
        }
      } catch (err) {
        commit("updateRoleError", err);
      }
    },

    async deleteRole({ commit }, id) {
      try {
        commit("deleteRoleBegin");
        const response = await DataService.delete(
          `${urls.DELETE_Role}?id=${id}`
        );

        if (response.status === 200) {
          commit("deleteRoleSuccess", response.data.data);
        }
      } catch (err) {
        commit("deleteRoleError", err);
      }
    },
    // removeRole
    async removeRole({ commit }, id) {
      try {
        commit("deleteBegin");
        const response = await DataService.delete(
          `${urls.DELETE_Role}?id=${id}`
        );
        if (response.status === 200) {
          commit("deleteSuccess");
        }
      } catch (err) {
        commit("deleteErr", err);
      }
    },
    async editRole({ commit }, data) {
      try {
        commit("updateBegin");
        const response = await DataService.put(`${urls.UPDATE_Role}`, data);
        if (response.status === 200) {
          commit("updateSuccess");
        }
      } catch (err) {
        commit("updateErr", err);
      }
    },
    // updateRole

    //open edit modal
    openRoleEditModal({ commit }, data) {
      commit("openRoleEditModal", data);
    },
    // eopen Role
    openRoleModal({ commit }, data = null) {
      commit("openRoleModal", data);
    },

    closeRoleModal({ commit }) {
      commit("closeRoleModal");
    },
    // closeRoleEditModal
    closeRoleEditModal({ commit }) {
      commit("closeRoleEditModal");
    },
  },
};

// import { v4 as uuidv4 } from "uuid";
// import { useToast } from "vue-toastification";
import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
// import { cleanObject } from "@/util/cleanObject";
// const toast = useToast();
export default {
  state: {
    roleModal: false,
    roleEditModal: false,
    addRoleLoading: false,
    addRoleSuccess: false,
    addRoleError: null,
    getRoleLoading: false,
    getRoleSuccess: false,
    getRoleError: null,
    getAuthUserRolesLoading: false,
    getAuthUserRolesSuccess: false,
    getAuthUserRolesError: null,
    getLoggedInUserRolesLoading: false,
    getLoggedInUserRolesSuccess: false,
    getLoggedInUserRolesError: null,
    getModulesLoading: false,
    getModulesSuccess: false,
    getModulesError: null,
    getPermissionsLoading: false,
    getPermissionsSuccess: false,
    getPermissionsError: null,
    getRolePermissionsLoading: false,
    getRolePermissionsSuccess: false,
    getRolePermissionsError: null,
    setPermissionsLoading: false,
    setPermissionsSuccess: false,
    setPermissionsError: null,
    editRoleLoading: false,
    editRoleSuccess: false,
    editRoleError: null,
    deleteRoleLoading: false,
    deleteRoleSuccess: false,
    deleteRoleError: null,
    role: null,
    roles: [],
    modules: [],
    permissions: [],
    rolepermissions: [],
    authUserRoles: [],
    loggedInUserRoles: [],
    total: 0,
  },
  getters: {
    roles: (state) => state.roles,
  },
  mutations: {
    getLoggedInUserRolesBegin(state) {
      state.getLoggedInUserRolesLoading = true;
      state.getLoggedInUserRolesSuccess = false;
      state.getLoggedInUserRolesError = null;
    },

    getLoggedInUserRolesSuccess(state, data) {
      state.getLoggedInUserRolesLoading = false;
      state.getLoggedInUserRolesSuccess = true;

      state.loggedInUserRoles = data;
    },

    getLoggedInUserRolesError(state, err) {
      state.getLoggedInUserRolesLoading = false;
      state.getLoggedInUserRolesSuccess = false;
      state.getLoggedInUserRolesError = err;
    },
    getAuthUserRolesBegin(state) {
      state.getAuthUserRolesLoading = true;
      state.getAuthUserRolesSuccess = false;
      state.getAuthUserRolesError = null;
    },

    getAuthUserRolesSuccess(state, data) {
      state.getAuthUserRolesLoading = false;
      state.getAuthUserRolesSuccess = true;

      state.authUserRoles = data;
    },

    getAuthUserRolesError(state, err) {
      state.getAuthUserRolesLoading = false;
      state.getAuthUserRolesSuccess = false;
      state.getAuthUserRolesError = err;
    },
    getRoleBegin(state) {
      state.getRoleLoading = true;
      state.getRoleSuccess = false;
      state.getRoleError = null;
    },

    getRoleSuccess(state, data) {
      state.getRoleLoading = false;
      state.getRoleSuccess = true;
      state.roles = data;
    },

    getRoleError(state, err) {
      state.getRoleLoading = false;
      state.getRoleSuccess = false;
      state.getRoleError = err;
    },
    deleteRoleBegin(state) {
      state.deleteRoleLoading = true;
      state.deleteRoleSuccess = false;
      state.deleteRoleError = null;
    },

    deleteRoleSuccess(state) {
      state.deleteRoleLoading = false;
      state.deleteRoleSuccess = true;
    },

    deleteRoleError(state, err) {
      state.deleteRoleLoading = false;
      state.deleteRoleSuccess = false;
      state.deleteRoleError = err;
    },
    getModulesBegin(state) {
      state.getModulesLoading = true;
      state.getModulesSuccess = false;
      state.getModulesError = null;
    },

    getModulesSuccess(state, data) {
      state.getModulesLoading = false;
      state.getModulesSuccess = true;
      state.modules = data?.data;
    },

    getModulesError(state, err) {
      state.getModulesLoading = false;
      state.getModulesSuccess = false;
      state.getModulesError = err;
    },
    getPermissionsBegin(state) {
      state.getPermissionsLoading = true;
      state.getPermissionsSuccess = false;
      state.getPermissionsError = null;
    },

    getPermissionsSuccess(state, data) {
      state.getPermissionsLoading = false;
      state.getPermissionsSuccess = true;
      state.permissions = data?.data;
    },

    getPermissionsError(state, err) {
      state.getPermissionsLoading = false;
      state.getPermissionsSuccess = false;
      state.getPermissionsError = err;
    },
    getRolePermissionsBegin(state) {
      state.getRolePermissionsLoading = true;
      state.getRolePermissionsSuccess = false;
      state.getRolePermissionsError = null;
    },

    getRolePermissionsSuccess(state, data) {
      state.getRolePermissionsLoading = false;
      state.getRolePermissionsSuccess = true;
      state.rolepermissions = data;
    },

    getRolePermissionsError(state, err) {
      state.getRolePermissionsLoading = false;
      state.getRolePermissionsSuccess = false;
      state.getRolePermissionsError = err;
    },
    setPermissionsBegin(state) {
      state.setPermissionsLoading = true;
      state.setPermissionsSuccess = false;
      state.setPermissionsError = null;
    },

    setPermissionsSuccess(state) {
      state.setPermissionsLoading = false;
      state.setPermissionsSuccess = true;
    },

    setPermissionsError(state, err) {
      state.setPermissionsLoading = false;
      state.setPermissionsSuccess = false;
      state.setPermissionsError = err;
    },
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

    editRoleBegin(state) {
      state.editRoleLoading = true;
      state.editRoleSuccess = false;
      state.editRoleError = null;
    },

    editRoleSuccess(state) {
      state.editRoleLoading = false;
      state.editRoleSuccess = true;
    },

    editRoleError(state, err) {
      state.editRoleLoading = false;
      state.editRoleSuccess = false;
      state.editRoleError = err;
    },

    openRoleModal(state, data) {
      state.roleModal = true;
      state.role = data;
    },

    closeRoleModal(state) {
      state.roleModal = false;
    },

    openEditRoleModal(state, data) {
      state.roleEditModal = true;
      state.role = data;
    },

    closeEditRoleModal(state) {
      state.roleEditModal = false;
    },
  },
  actions: {
    async addRole({ commit }, data) {
      try {
        commit("addRoleBegin");
        const response = await DataService.post(
          urls.CREATE_ROLE_WITH_PERMISSIONS,
          data
        );

        if (response.status === 200) {
          commit("addRoleSuccess");
        }
      } catch (err) {
        commit("addRoleError", err);
      }
    },
    async updateRolePermissions({ commit }, data) {
      try {
        commit("addRoleBegin");
        const response = await DataService.put(
          urls.UPDATE_ROLE_WITH_PERMISSIONS,
          data
        );

        if (response.status === 200) {
          commit("addRoleSuccess");
        }
      } catch (err) {
        commit("addRoleError", err);
      }
    },
    async getRolesList({ commit }) {
      try {
        commit("getRoleBegin");
        const response = await DataService.get(`${urls.GET_PLATFORM_ROLES}`);

        if (response.status === 200) {
          commit("getRoleSuccess", response.data);
        }
      } catch (err) {
        commit("getRoleError", err);
      }
    },
    async getRolePermissionsList({ commit }, RoleId) {
      try {
        commit("getRolePermissionsBegin");
        const response = await DataService.get(
          `${urls.GET_PLATFORM_ROLE_PERMISSIONS}?RoleId=${RoleId}`
        );

        if (response.status === 200) {
          commit("getRolePermissionsSuccess", response.data);
        }
      } catch (err) {
        commit("getRolePermissionsError", err);
      }
    },

    async getAuthUserRoles({ commit }, userId) {
      try {
        commit("getAuthUserRolesBegin");
        const response = await DataService.get(
          `${urls.GET_AUTH_USER_ROLES}?UserId=${userId}`
        );

        if (response.status === 200) {
          commit("getAuthUserRolesSuccess", response.data);
        }
      } catch (err) {
        commit("getAuthUserRolesError", err);
      }
    },
    async getLoggedInUserRoles({ commit }, userId) {
      try {
        commit("getLoggedInUserRolesBegin");
        const response = await DataService.get(
          `${urls.GET_AUTH_USER_ROLES}?UserId=${userId}`
        );

        if (response.status === 200) {
          commit("getLoggedInUserRolesSuccess", response.data);
        }
      } catch (err) {
        commit("getLoggedInUserRolesError", err);
      }
    },

    async deleteRolesFromList({ commit }, id) {
      try {
        commit("deleteRoleBegin");
        const response = await DataService.delete(
          `${urls.REMOVE_ROLE_FROM_PLATFORM}?RoleId=${id}`
        );

        if (response.status === 200) {
          commit("deleteRoleSuccess", response.data);
        }
      } catch (err) {
        commit("deleteRoleError", err);
      }
    },

    async getModulesList({ commit }) {
      try {
        commit("getModulesBegin");
        const response = await DataService.get(`${urls.GET_PLATFORM_MODULES}`);

        if (response.status === 200) {
          commit("getModulesSuccess", response.data);
        }
      } catch (err) {
        commit("getModulesError", err);
      }
    },
    async getPermissionsList({ commit }) {
      try {
        commit("getPermissionsBegin");
        const response = await DataService.get(
          `${urls.GET_PLATFORM_PERMISSIONS}`
        );

        if (response.status === 200) {
          commit("getPermissionsSuccess", response.data);
        }
      } catch (err) {
        commit("getPermissionsError", err);
      }
    },

    async assignRoleWithPermissions({ commit }, data) {
      try {
        commit("setPermissionsBegin");
        const response = await DataService.post(
          `${urls.ASSIGN_PERMISSIONS_TO_USERS}?RoleId=${data.roleId}&UserId=${data.userId}`,
          data
        );

        if (response.status === 200) {
          commit("setPermissionsSuccess");
        }
      } catch (err) {
        commit("setPermissionsError", err);
      }
    },

    async assignCIHRoleByInspectorate({ commit }, data) {
      try {
        commit("setPermissionsBegin");
        const response = await DataService.put(
          `${urls.ASSIGN_CIHROLE_TO_USER}?userId=${data.userId}&InspectorId=${data.inspectorId}&cihRole=${data.cihRole}`,
          data
        );

        if (response.status === 200) {
          commit("setPermissionsSuccess");
        }
      } catch (err) {
        commit("setPermissionsError", err);
      }
    },
    async removeCIHRoleByInspectorate({ commit }, data) {
      try {
        commit("setPermissionsBegin");
        const response = await DataService.put(
          `${urls.ASSIGN_CIHROLE_TO_USER}?userId=${data.userId}&InspectorId=${data.inspectorId}&cihRole=${data.cihRole}`,
          data
        );

        if (response.status === 200) {
          commit("setPermissionsSuccess");
        }
      } catch (err) {
        commit("setPermissionsError", err);
      }
    },
    async removeRoleFromPermissions({ commit }, data) {
      try {
        commit("setPermissionsBegin");
        const response = await DataService.delete(
          `${urls.REMOVE_PERMISSION_FROM_USER}?RoleId=${data.roleId}&UserId=${data.userId}`,
          data
        );

        if (response.status === 200) {
          commit("setPermissionsSuccess");
        }
      } catch (err) {
        commit("setPermissionsError", err);
      }
    },

    async deleteRole({ commit }, id) {
      try {
        commit("deleteZoneBegin");
        const response = await DataService.delete(
          `${urls.DELETE_ZONE}?id=${id}`
        );

        if (response.status === 200) {
          commit("deleteZoneSuccess", response.data.data);
        }
      } catch (err) {
        commit("deleteZoneError", err);
      }
    },

    //open edit modal
    openRoleModal({ commit }, data) {
      commit("openRoleModal", data);
    },
    // eopen zone
    openZone({ commit }) {
      commit("openZone");
    },

    closeRoleModal({ commit }) {
      commit("closeRoleModal");
    },
    //open edit modal
    openEditRoleModal({ commit }, data) {
      commit("openEditRoleModal", data);
    },

    closeEditRoleModal({ commit }) {
      commit("closeEditRoleModal");
    },
  },
};

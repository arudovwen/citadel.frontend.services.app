// import { v4 as uuidv4 } from "uuid";
import { useToast } from "vue-toastification";
import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";
const toast = useToast();
export default {
  state: {
    addmodal: false,
    total: 0,
    isLoading: null,
    // for edit
    modal: false,
    deleteModal: false,
    editName: "",
    editassignto: null,
    editStartDate: null,
    editEndDate: null,
    editcta: null,
    editId: null,
    editdesc: null,
    addAffinityGroupLoading: false,
    addAffinityGroupSuccess: false,
    addAffinityGroupError: null,
    getAffinityGroupsLoading: false,
    getAffinityGroupsSuccess: false,
    getAffinityGroupsError: null,
    updateAffinityGroupLoading: false,
    updateAffinityGroupSuccess: false,
    updateAffinityGroupError: null,
    deleteAffinityGroupLoading: false,
    deleteAffinityGroupSuccess: false,
    deleteAffinityGroupError: null,
    affinityGroup: null,

    resetSuccess(state) {
      state.addAffinityGroupSuccess = false;
      state.getAffinityGroupsSuccess = false;
      state.updateAffinityGroupSuccess = false;
      state.deleteAffinityGroupSuccess = false;
    },

    affinityGroups: [],
    selectedGroupToEdit: null,
  },
  getters: {
    affinityGroups: (state) => state.affinityGroups,
  },
  mutations: {
    setDeleteModal(state, boolean) {
      state.deleteModal = boolean;
    },
    setSelectedGroupToEdit(
      state,
      {
        id,
        userId,
        affinityGroupName,
        affinityGroupCode,
        description,
        startAge,
        endAge,
      }
    ) {
      state.selectedGroupToEdit = {
        id,
        userId,
        affinityGroupName,
        affinityGroupCode,
        description,
        startAge,
        endAge,
      };
    },
    addAffinityGroupBegin(state) {
      state.addAffinityGroupLoading = true;
      state.addAffinityGroupSuccess = false;
      state.addAffinityGroupError = null;
    },

    addAffinityGroupSuccess(state) {
      state.addAffinityGroupLoading = false;
      state.addAffinityGroupSuccess = true;
    },

    addAffinityGroupError(state, err) {
      state.addAffinityGroupLoading = false;
      state.addAffinityGroupSuccess = false;
      state.addAffinityGroupError = err;
    },

    getAffinityGroupsBegin(state) {
      state.getAffinityGroupsLoading = true;
      state.getAffinityGroupsSuccess = false;
      state.getAffinityGroupsError = null;
    },
    getAffinityGroupsSuccess(state, { data, totalCount }) {
      state.getAffinityGroupsLoading = false;
      state.getAffinityGroupsSuccess = true;
      state.getAffinityGroupsError = null;
      state.affinityGroups = data;
      state.total = totalCount;
    },
    getAffinityGroupsError(state, err) {
      state.getAffinityGroupsLoading = false;
      state.getAffinityGroupsSuccess = false;
      state.getAffinityGroupsError = err;
    },

    updateAffinityGroupBegin(state) {
      state.updateAffinityGroupLoading = true;
      state.updateAffinityGroupSuccess = false;
      state.updateAffinityGroupError = null;
    },
    updateAffinityGroupSuccess(state) {
      state.updateAffinityGroupLoading = false;
      state.updateAffinityGroupSuccess = true;
      state.updateAffinityGroupError = null;
    },
    updateAffinityGroupError(state, err) {
      state.updateAffinityGroupLoading = false;
      state.updateAffinityGroupSuccess = false;
      state.updateAffinityGroupError = err;
    },
    deleteAffinityGroupBegin(state) {
      state.deleteAffinityGroupLoading = true;
      state.deleteAffinityGroupSuccess = false;
      state.deleteAffinityGroupError = null;
    },
    deleteAffinityGroupSuccess(state) {
      state.deleteAffinityGroupLoading = false;
      state.deleteAffinityGroupSuccess = true;
      state.deleteAffinityGroupError = null;
    },
    deleteAffinityGroupError(state, err) {
      state.deleteAffinityGroupLoading = false;
      state.deleteAffinityGroupSuccess = false;
      state.deleteAffinityGroupError = err;
    },

    //

    // removeAffinityGroup
    removeAffinityGroup(state, data) {
      state.affinityGroups = state.affinityGroups.filter(
        (item) => item.id !== data.id
      );
      toast.error("AffinityGroup Removed", {
        timeout: 2000,
      });
    },
    // updateAffinityGroup
    updateAffinityGroup(state, data) {
      state.affinityGroups.findIndex((item) => {
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
      state.modal = true;
    },
    //open edit affinityGroup
    openModal(state, data) {
      state.modal = true;
      state.affinityGroup = data;
    },

    // openAffinityGroup
    openAffinityGroup(state) {
      state.addmodal = true;
    },
    // closeModal

    // closeModal
    closeModal(state) {
      state.modal = false;
    },
  },
  actions: {
    async addAffinityGroup({ commit }, data) {
      try {
        commit("addAffinityGroupBegin");
        const response = await DataService.post(
          urls.CREATE_AFFINITY_GROUP,
          data
        );

        if (response.status === 200) {
          commit("addAffinityGroupSuccess");
        }
      } catch (err) {
        commit("addAffinityGroupError", err);
      }
    },
    async getAffinityGroups({ commit }, data) {
      try {
        commit("getAffinityGroupsBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_AFFINITY_GROUPS}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );

        if (response.status === 200) {
          commit("getAffinityGroupsSuccess", response.data);
        }
      } catch (err) {
        commit("getAffinityGroupsError", err);
      }
    },
    async updateAffinityGroup({ commit }, data) {
      try {
        commit("updateAffinityGroupBegin");
        const response = await DataService.put(
          urls.UPDATE_AFFINITY_GROUP,
          data
        );

        if (response.status === 200) {
          commit("updateAffinityGroupSuccess", response.data.data);
        }
      } catch (err) {
        commit("updateAffinityGroupError", err);
      }
    },

    async deleteAffinityGroup({ commit }, id) {
      try {
        commit("deleteAffinityGroupBegin");
        const response = await DataService.delete(
          `${urls.DELETE_AFFINITY_GROUP}?id=${id}`
        );

        if (response.status === 200) {
          commit("deleteAffinityGroupSuccess", response.data.data);
        }
      } catch (err) {
        commit("deleteAffinityGroupError", err);
      }
    },
    // removeAffinityGroup
    removeAffinityGroup({ commit }, data) {
      commit("removeAffinityGroup", data);
    },
    // updateAffinityGroup

    //open edit modal

    // eopen AffinityGroup
    openAffinityGroup({ commit }) {
      commit("openAffinityGroup");
    },

    openModal({ commit }, data) {
      commit("openModal", data);
    },

    closeModal({ commit }) {
      commit("closeModal");
    },

    setSelectedGroupToEdit({ commit }, data) {
      commit("setSelectedGroupToEdit", data);
    },
    resetSuccess({ commit }) {
      commit("resetSuccess");
    },
    setDeleteModal({ commit }, boolean) {
      commit("setDeleteModal", boolean);
    },
  },
};

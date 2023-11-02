import { v4 as uuidv4 } from "uuid";
import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
  state: {
    addmodal: false,
    isLoading: null,
    // for edit
    editModal: false,
    editName: "",
    editassignto: null,
    editStartDate: null,
    editEndDate: null,
    editcta: null,
    editId: null,
    editdesc: null,

    addCenterLoading: false,
    addCenterSuccess: false,
    addCenterError: null,
    getCentersLoading: false,
    getCentersSuccess: false,
    getCentersError: null,
    updateCenterLoading: false,
    updateCenterSuccess: false,
    updateCenterError: null,
    deleteCenterLoading: false,
    deleteCenterSuccess: false,
    deleteCenterError: null,

    centers: [
      {
        id: uuidv4(),
        assignto: [
          {
            image: require("@/assets/images/avatar/av-1.svg"),
            title: "Mahedi Amin",
          },
          {
            image: require("@/assets/images/avatar/av-2.svg"),
            title: "Sovo Haldar",
          },
          {
            image: require("@/assets/images/avatar/av-2.svg"),
            title: "Rakibul Islam",
          },
        ],
        name: "Welfare",
        des: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
        startDate: "2022-10-03",
        endDate: "2022-10-06",
        progress: 75,
        category: [
          {
            value: "team",
            label: "team",
          },
          {
            value: "low",
            label: "low",
          },
        ],
      },
      {
        id: uuidv4(),
        assignto: [
          {
            image: require("@/assets/images/avatar/av-1.svg"),
            title: "Mahedi Amin",
          },
          {
            image: require("@/assets/images/avatar/av-2.svg"),
            title: "Sovo Haldar",
          },
          {
            image: require("@/assets/images/avatar/av-2.svg"),
            title: "Rakibul Islam",
          },
        ],
        name: "Sanitation ",
        des: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
        startDate: "2022-10-03",
        endDate: "2022-10-10",
        progress: 50,

        category: [
          {
            value: "team",
            label: "team",
          },
          {
            value: "low",
            label: "low",
          },
        ],
      },
    ],
  },
  getters: {
    centers: (state) => state.centers,
  },
  mutations: {
    //
    addCenterBegin(state) {
      state.addCenterLoading = true;
      state.addCenterSuccess = false;
      state.addCenterError = null;
    },

    addCenterSuccess(state) {
      state.addCenterLoading = false;
      state.addCenterSuccess = true;
    },

    addCenterError(state, err) {
      state.addCenterLoading = false;
      state.addCenterSuccess = false;
      state.addCenterError = err;
    },

    getCentersBegin(state) {
      state.getCentersLoading = true;
      state.getCentersSuccess = false;
      state.getCentersError = null;
    },
    getCentersSuccess(state, data) {
      state.getCentersLoading = false;
      state.getCentersSuccess = true;
      state.getCentersError = null;
      state.Centers = data;
    },
    getCentersError(state, err) {
      state.getCentersLoading = false;
      state.getCentersSuccess = false;
      state.getCentersError = err;
    },

    updateCenterBegin(state) {
      state.updateCenterLoading = true;
      state.updateCenterSuccess = false;
      state.updateCenterError = null;
    },
    updateCenterSuccess(state) {
      state.updateCenterLoading = false;
      state.updateCenterSuccess = true;
      state.updateCenterError = null;
    },
    updateCenterError(state, err) {
      state.updateCenterLoading = false;
      state.updateCenterSuccess = false;
      state.updateCenterError = err;
    },
    deleteCenterBegin(state) {
      state.deleteCenterLoading = true;
      state.deleteCenterSuccess = false;
      state.deleteCenterError = null;
    },
    deleteCenterSuccess(state) {
      state.deleteCenterLoading = false;
      state.deleteCenterSuccess = true;
      state.deleteCenterError = null;
    },
    deleteCenterError(state, err) {
      state.deleteCenterLoading = false;
      state.deleteCenterSuccess = false;
      state.deleteCenterError = err;
    },
    // removeCenter
    removeCenter(state, data) {
      state.centers = state.centers.filter((item) => item.id !== data.id);
      toast.error("Center Removed", {
        timeout: 2000,
      });
    },
    // updateCenter
    updateCenter(state, data) {
      state.centers.findIndex((item) => {
        if (item.id === data.id) {
          // store data
          state.editId = data.id;
          state.editName = data.name;
          state.editassignto = data.assignto;
          state.editStartDate = data.startDate;
          state.editEndDate = data.endDate;
          state.editcta = data.category;
          state.editdesc = data.des;
          state.editModal = !state.editModal;
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
    },
    // openCenter
    openCenter(state) {
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
    //create center
    async addCenter({ commit }, data) {
      try {
        commit("addCenterBegin");
        const response = await DataService.post(urls.CREATE_CENTER, data);

        if (response.status === 200) {
          commit("addCenterSuccess");
        }
      } catch (err) {
        commit("addCenterError", err);
      }
    },
    //get center
    async getCenters({ commit }) {
      try {
        commit("getCentersBegin");
        const response = await DataService.get(urls.GET_ALL_CENTERS);

        if (response.status === 200) {
          commit("getCentersSuccess", response.data.data);
        }
      } catch (err) {
        commit("getCentersError", err);
      }
    },
    //edit center
    async updateCenter({ commit }, data) {
      try {
        commit("updateCenterBegin");
        const response = await DataService.put(urls.UPDATE_CENTER, data);

        if (response.status === 200) {
          commit("updateCenterSuccess", response.data.data);
        }
      } catch (err) {
        commit("updateCenterError", err);
      }
    },
    //delete center
    async deleteCenter({ commit }, id) {
      try {
        commit("deleteCenterBegin");
        const response = await DataService.delete(
          `${urls.DELETE_CENTER}?id=${id}`
        );

        if (response.status === 200) {
          commit("deleteCenterSuccess", response.data.data);
        }
      } catch (err) {
        commit("deleteCenterError", err);
      }
    },
    // removeCenter
    removeCenter({ commit }, data) {
      commit("removeCenter", data);
    },
    // updateCenter
    // openECenter({ commit }, data) {
    //   commit("updateCenter", data);
    // },
    // eopen center
    openCenter({ commit }) {
      commit("openCenter");
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

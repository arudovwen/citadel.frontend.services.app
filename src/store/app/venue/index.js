import { v4 as uuidv4 } from "uuid";
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

    venues: [
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
    venues: (state) => state.venues,
  },
  mutations: {
    //
    addVenue(state, data) {
      state.isLoading = true;

      setTimeout(() => {
        state.venues.unshift(data);
        state.isLoading = false;
        toast.success -
          500("Venue added", {
            timeout: 2000,
          });
      }, 1500);
      state.addmodal = false;
    },
    // removeVenue
    removeVenue(state, data) {
      state.venues = state.venues.filter((item) => item.id !== data.id);
      toast.error("Venue Removed", {
        timeout: 2000,
      });
    },
    // updateVenue
    updateVenue(state, data) {
      state.venues.findIndex((item) => {
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
    // openVenue
    openVenue(state) {
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
    addVenue({ commit }, data) {
      commit("addVenue", data);
    },
    // removeVenue
    removeVenue({ commit }, data) {
      commit("removeVenue", data);
    },
    // updateVenue
    updateVenue({ commit }, data) {
      commit("updateVenue", data);
    },
    // eopen venue
    openVenue({ commit }) {
      commit("openVenue");
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

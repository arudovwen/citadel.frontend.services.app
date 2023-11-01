import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
export default {
  state: {
    //personal Info

    //post methods
    biodata: null,
    creatingProfile: false,
    profileCreated: false,
    createProfileError: null,

    updateQualificationDataloading: false,
    updateQualificationDatasuccess: false,
    updateQualificationDataerror: null,

    updateEmployerDataloading: false,
    updateEmployerDatasuccess: false,
    updateEmployerDataerror: null,

    updateSpouseDataloading: false,
    updateSpouseDatasuccess: false,
    updateSpouseDataerror: null,

    updateChildrenDataloading: false,
    updateChildrenDatasuccess: false,
    updateChildrenDataerror: null,

    updateChurchAffiliationDataloading: false,
    updateChurchAffiliationDatasuccess: false,
    updateChurchAffiliationDataerror: null,

    //get
    getBiodataloading: false,
    getBiodatasuccess: false,
    getBiodataerror: null,
    childrensData: null,
    getChildrensDataloading: false,
    getChildrensDatasuccess: false,
    getChildrensDataerror: null,
    spouseData: null,
    getSpouseDataloading: false,
    getSpouseDatasuccess: false,
    getSpouseDataerror: null,
    employerData: null,
    getEmployerDataloading: false,
    getEmployerDatasuccess: false,
    getEmployerDataerror: null,
    qualificationData: null,
    getQualificationDataloading: false,
    getQualificationDatasuccess: false,
    getQualificationDataerror: null,
    churchAffiliationsData: null,
    getChurchAffiliationsDataloading: false,
    getChurchAffiliationsDatasuccess: false,
    getChurchAffiliationsDataerror: null,
  },
  getters: {
    creatingProfile(state) {
      return state.creatingProfile;
    },
    profileCreated(state) {
      return state.profileCreated;
    },
    createProfileError(state) {
      return state.createProfileError;
    },
  },
  mutations: {
    //post
    creatingProfile(state) {
      state.creatingProfile = true;
      state.profileCreated = false;
      state.createProfileError = false;
    },
    profileCreated(state) {
      state.creatingProfile = false;
      state.profileCreated = true;
      state.createProfileError = false;
    },
    createProfileError(state, err) {
      state.creatingProfile = false;
      state.profileCreated = false;
      state.createProfileError = err;
    },

    updateQualificationDataBegin(state) {
      state.updateQualificationDataloading = true;
      state.updateQualificationDatasuccess = false;
      state.updateQualificationDataerror = null;
    },

    updateQualificationDataSuccess(state) {
      state.updateQualificationDataloading = false;
      state.updateQualificationDatasuccess = true;
    },

    updateQualificationDataErr(state, err) {
      state.updateQualificationDataloading = false;
      state.updateQualificationDataerror = err;
      state.updateQualificationDatasuccess = false;
    },
    updateEmployerDataBegin(state) {
      state.updateEmployerDataloading = true;
      state.updateEmployerDatasuccess = false;
      state.updateEmployerDataerror = null;
    },

    updateEmployerDataSuccess(state) {
      state.updateEmployerDataloading = false;
      state.updateEmployerDatasuccess = true;
    },

    updateEmployerDataErr(state, err) {
      state.updateEmployerDataloading = false;
      state.updateEmployerDataerror = err;
      state.updateEmployerDatasuccess = false;
    },

    updateSpouseDataBegin(state) {
      state.updateSpouseDataloading = true;
      state.updateSpouseDatasuccess = false;
      state.updateSpouseDataerror = null;
    },

    updateSpouseDataSuccess(state) {
      state.updateSpouseDataloading = false;
      state.updateSpouseDatasuccess = true;
    },

    updateSpouseDataErr(state, err) {
      state.updateSpouseDataloading = false;
      state.updateSpouseDataerror = err;
      state.updateSpouseDatasuccess = false;
    },

    updateChildrenDataBegin(state) {
      state.updateChildrenDataloading = true;
      state.updateChildrenDatasuccess = false;
      state.updateChildrenDataerror = null;
    },

    updateChildrenDataSuccess(state) {
      state.updateChildrenDataloading = false;
      state.updateChildrenDatasuccess = true;
    },

    updateChildrenDataErr(state, err) {
      state.updateChildrenDataloading = false;
      state.updateChildrenDataerror = err;
      state.updateChildrenDatasuccess = false;
    },

    updateChurchAffiliationDataBegin(state) {
      state.updateChurchAffiliationDataloading = true;
      state.updateChurchAffiliationDatasuccess = false;
      state.updateChurchAffiliationDataerror = null;
    },

    updateChurchAffiliationDataSuccess(state) {
      state.updateChurchAffiliationDataloading = false;
      state.updateChurchAffiliationDatasuccess = true;
    },

    updateChurchAffiliationDataErr(state, err) {
      state.updateChurchAffiliationDataloading = false;
      state.updateChurchAffiliationDataerror = err;
      state.updateChurchAffiliationDatasuccess = false;
    },

    //get
    getBiodataBegin(state) {
      state.getBiodataloading = true;
      state.getBiodatasuccess = false;
      state.getBiodataerror = null;
    },

    getBiodataSuccess(state, data) {
      state.getBiodataloading = false;
      state.getBiodatasuccess = true;
      state.biodata = data;
    },

    getBiodataErr(state, err) {
      state.getBiodataloading = false;
      state.getBiodataerror = err;
      state.getBiodatasuccess = false;
    },

    getChildrensDataBegin(state) {
      state.getChildrensDataloading = true;
      state.getChildrensDatasuccess = false;
      state.getChildrensDataerror = null;
    },

    getChildrensDataSuccess(state, data) {
      state.getChildrensDataloading = false;
      state.getChildrensDatasuccess = true;
      state.childrensData = data;
    },

    getChildrensDataErr(state, err) {
      state.getChildrensDataloading = false;
      state.getChildrensDataerror = err;
      state.getChildrensDatasuccess = false;
    },

    getSpouseDataBegin(state) {
      state.getSpouseDataloading = true;
      state.getSpouseDatasuccess = false;
      state.getSpouseDataerror = null;
    },

    getSpouseDataSuccess(state, data) {
      state.getSpouseDataloading = false;
      state.getSpouseDatasuccess = true;
      state.spouseData = data;
    },

    getSpouseDataErr(state, err) {
      state.getSpouseDataloading = false;
      state.getSpouseDataerror = err;
      state.getSpouseDatasuccess = false;
    },
    getEmployerDataBegin(state) {
      state.getEmployerDataloading = true;
      state.getEmployerDatasuccess = false;
      state.getEmployerDataerror = null;
    },

    getEmployerDataSuccess(state, data) {
      state.getEmployerDataloading = false;
      state.getEmployerDatasuccess = true;
      state.employerData = data;
    },

    getEmployerDataErr(state, err) {
      state.getEmployerDataloading = false;
      state.getEmployerDataerror = err;
      state.getEmployerDatasuccess = false;
    },
    getQualificationDataBegin(state) {
      state.getQualificationDataloading = true;
      state.getQualificationDatasuccess = false;
      state.getQualificationDataerror = null;
    },

    getQualificationDataSuccess(state, data) {
      state.getQualificationDataloading = false;
      state.getQualificationDatasuccess = true;
      state.qualificationData = data;
    },

    getQualificationDataErr(state, err) {
      state.getQualificationDataloading = false;
      state.getQualificationDataerror = err;
      state.getQualificationDatasuccess = false;
    },

    getChurchAffiliationsDataBegin(state) {
      state.getChurchAffiliationsDataloading = true;
      state.getChurchAffiliationsDatasuccess = false;
      state.getChurchAffiliationsDataerror = null;
    },

    getChurchAffiliationsDataSuccess(state, data) {
      state.getChurchAffiliationsDataloading = false;
      state.getChurchAffiliationsDatasuccess = true;
      state.churchAffiliationsData = data;
    },

    getChurchAffiliationsDataErr(state, err) {
      state.getChurchAffiliationsDataloading = false;
      state.getChurchAffiliationsDataerror = err;
      state.getChurchAffiliationsDatasuccess = false;
    },
  },
  actions: {
    //post
    async createProfile({ commit }, data) {
      try {
        commit("creatingProfile");
        const response = await DataService.post(urls.CREATE_BIODATA, data);
        if (response.status === 200) {
          commit("profileCreated");
          console.log("SuccessResponse:" + response);
        }
      } catch (err) {
        commit("createProfileError", err);
      }
    },

    async updateProfile({ commit }, data) {
      try {
        commit("creatingProfile");
        const response = await DataService.post(urls.UPDATE_BIODATA, data);
        if (response.status === 200) {
          commit("profileCreated");
          console.log("SuccessResponse:" + response);
        }
      } catch (err) {
        commit("createProfileError", err);
      }
    },
    async updateQualification({ commit }, data) {
      try {
        commit("updateQualificationDataBegin");
        const response = await DataService.post(
          urls.UPDATE_QUALIFICATION,
          data
        );

        if (response.status === 200) {
          commit("updateQualificationDatasuccess");
        }
      } catch (err) {
        commit("updateQualificationDataerror", err);
      }
    },

    async updateEmployer({ commit }, data) {
      try {
        commit("updateEmployerDataBegin");
        const response = await DataService.post(urls.UPDATE_EMPLOYER, data);

        if (response.status === 200) {
          commit("updateEmployerDatasuccess");
        }
      } catch (err) {
        commit("updateEmployerDataerror", err);
      }
    },
    async createSpouse({ commit }, data) {
      try {
        commit("updateSpouseDataBegin");
        const response = await DataService.post(
          urls.CREATE_SPOUSE_DETAIL,
          data
        );

        if (response.status === 200) {
          commit("updateSpouseDatasuccess");
        }
      } catch (err) {
        commit("updateSpouseDataerror", err);
      }
    },

    async updateSpouse({ commit }, data) {
      try {
        commit("updateSpouseDataBegin");
        const response = await DataService.post(
          urls.UPDATE_SPOUSE_DETAIL,
          data
        );

        if (response.status === 200) {
          commit("updateSpouseDatasuccess");
        }
      } catch (err) {
        commit("updateSpouseDataerror", err);
      }
    },
    async updateChildren({ commit }, data) {
      try {
        commit("updateChildrenDataBegin");
        const response = await DataService.post(
          urls.UPDATE_CHILDREN_DETAIL,
          data
        );

        if (response.status === 200) {
          commit("updateChildrenDatasuccess");
        }
      } catch (err) {
        commit("updateChildrenDataerror", err);
      }
    },
    async createChurchAffiliation({ commit }, data) {
      try {
        commit("updateChurchAffiliationDataBegin");
        const response = await DataService.post(
          urls.CREATE_CHURCH_AFFILIATION,
          data
        );

        if (response.status === 200) {
          commit("updateChurchAffiliationDatasuccess");
        }
      } catch (err) {
        commit("updateChurchAffiliationDataerror", err);
      }
    },
    async updateChurchAffiliation({ commit }, data) {
      try {
        commit("updateChurchAffiliationDataBegin");
        const response = await DataService.post(
          urls.UPDATE_CHURCH_AFFILIATION,
          data
        );

        if (response.status === 200) {
          commit("updateChurchAffiliationDatasuccess");
        }
      } catch (err) {
        commit("updateChurchAffiliationDataerror", err);
      }
    },

    //get
    async getBiodataByUserId({ commit }, id) {
      try {
        commit("getBiodataBegin");
        const response = await DataService.get(
          `${urls.GET_BIODATA_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getBiodataSuccess", response.data.data);
        }
      } catch (err) {
        console.log("getBiodataErr", JSON.stringify(err));
        commit("getBiodataErr", err);
      }
    },

    async getChildrenDetailById({ commit }, id) {
      try {
        commit("getChildrensDataBegin");
        const response = await DataService.get(
          `${urls.GET_CHILDREN_DETAIL_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getChildrensDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getChildrensDataErr", err);
      }
    },

    async getSpouseDetailById({ commit }, id) {
      try {
        commit("getSpouseDataBegin");
        const response = await DataService.get(
          `${urls.GET_SPOUSE_DETAIL_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getSpouseDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getSpouseDataErr", err);
      }
    },
    async getEmployerDetailById({ commit }, id) {
      try {
        commit("getEmployerDataBegin");
        const response = await DataService.get(
          `${urls.GET_EMPLOYER_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getEmployerDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getEmployerDataErr", err);
      }
    },

    async getChurchAffiliationsById({ commit }, id) {
      try {
        commit("getChurchAffiliationsDataBegin");
        const response = await DataService.get(
          `${urls.GET_CHURCH_AFFILIATION_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getChurchAffiliationsDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getChurchAffiliationsDataErr", err);
      }
    },

    async getQualificationsById({ commit }, id) {
      try {
        commit("getQualificationDataBegin");
        const response = await DataService.get(
          `${urls.GET_QUALIFICATION_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getQualificationDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getQualificationDataErr", err);
      }
    },
  },
};

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

    createQualificationDataloading: false,
    createQualificationDatasuccess: false,
    createQualificationDataerror: null,

    createEmployerDataloading: false,
    createEmployerDatasuccess: false,
    createEmployerDataerror: null,

    createSpouseDataloading: false,
    createSpouseDatasuccess: false,
    createSpouseDataerror: null,

    createChildrenDataloading: false,
    createChildrenDatasuccess: false,
    createChildrenDataerror: null,

    createChurchAffiliationDataloading: false,
    createChurchAffiliationDatasuccess: false,
    createChurchAffiliationDataerror: null,

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

    createQualificationDataBegin(state) {
      state.createQualificationDataloading = true;
      state.createQualificationDatasuccess = false;
      state.createQualificationDataerror = null;
    },

    createQualificationDataSuccess(state) {
      state.createQualificationDataloading = false;
      state.createQualificationDatasuccess = true;
    },

    createQualificationDataErr(state, err) {
      state.createQualificationDataloading = false;
      state.createQualificationDataerror = err;
      state.createQualificationDatasuccess = false;
    },
    createEmployerDataBegin(state) {
      state.createEmployerDataloading = true;
      state.createEmployerDatasuccess = false;
      state.createEmployerDataerror = null;
    },

    createEmployerDataSuccess(state) {
      state.createEmployerDataloading = false;
      state.createEmployerDatasuccess = true;
    },

    createEmployerDataErr(state, err) {
      state.createEmployerDataloading = false;
      state.createEmployerDataerror = err;
      state.createEmployerDatasuccess = false;
    },

    createSpouseDataBegin(state) {
      state.createSpouseDataloading = true;
      state.createSpouseDatasuccess = false;
      state.createSpouseDataerror = null;
    },

    createSpouseDataSuccess(state) {
      state.createSpouseDataloading = false;
      state.createSpouseDatasuccess = true;
    },

    createSpouseDataErr(state, err) {
      state.createSpouseDataloading = false;
      state.createSpouseDataerror = err;
      state.createSpouseDatasuccess = false;
    },

    createChildrenDataBegin(state) {
      state.createChildrenDataloading = true;
      state.createChildrenDatasuccess = false;
      state.createChildrenDataerror = null;
    },

    createChildrenDataSuccess(state) {
      state.createChildrenDataloading = false;
      state.createChildrenDatasuccess = true;
    },

    createChildrenDataErr(state, err) {
      state.createChildrenDataloading = false;
      state.createChildrenDataerror = err;
      state.createChildrenDatasuccess = false;
    },

    createChurchAffiliationDataBegin(state) {
      state.createChurchAffiliationDataloading = true;
      state.createChurchAffiliationDatasuccess = false;
      state.createChurchAffiliationDataerror = null;
    },

    createChurchAffiliationDataSuccess(state) {
      state.createChurchAffiliationDataloading = false;
      state.createChurchAffiliationDatasuccess = true;
    },

    createChurchAffiliationDataErr(state, err) {
      state.createChurchAffiliationDataloading = false;
      state.createChurchAffiliationDataerror = err;
      state.createChurchAffiliationDatasuccess = false;
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
    async createQualification({ commit }, data) {
      try {
        commit("createQualificationDataBegin");
        const response = await DataService.post(
          urls.CREATE_QUALIFICATION,
          data
        );

        if (response.status === 200) {
          commit("createQualificationDatasuccess");
        }
      } catch (err) {
        commit("createQualificationDataerror", err);
      }
    },

    async createEmployer({ commit }, data) {
      try {
        commit("createEmployerDataBegin");
        const response = await DataService.post(urls.CREATE_EMPLOYER, data);

        if (response.status === 200) {
          commit("createEmployerDatasuccess");
        }
      } catch (err) {
        commit("createEmployerDataerror", err);
      }
    },

    async createSpouse({ commit }, data) {
      try {
        commit("createSpouseDataBegin");
        const response = await DataService.post(
          urls.CREATE_SPOUSE_DETAIL,
          data
        );

        if (response.status === 200) {
          commit("createSpouseDatasuccess");
        }
      } catch (err) {
        commit("createSpouseDataerror", err);
      }
    },
    async createChildren({ commit }, data) {
      try {
        commit("createChildrenDataBegin");
        const response = await DataService.post(
          urls.CREATE_CHILDREN_DETAIL,
          data
        );

        if (response.status === 200) {
          commit("createChildrenDatasuccess");
        }
      } catch (err) {
        commit("createChildrenDataerror", err);
      }
    },
    async createChurchAffiliation({ commit }, data) {
      try {
        commit("createChurchAffiliationDataBegin");
        const response = await DataService.post(
          urls.CREATE_CHURCH_AFFILIATION,
          data
        );

        if (response.status === 200) {
          commit("createChurchAffiliationDatasuccess");
        }
      } catch (err) {
        commit("createChurchAffiliationDataerror", err);
      }
    },

    //get
    async getBiodataById({ commit }, id) {
      try {
        commit("getBiodataBegin");
        const response = await DataService.get(
          `${urls.GET_BIODATA_BY_ID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getBiodataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getBiodataErr", err);
      }
    },

    async getChildrenDetailById({ commit }, id) {
      try {
        commit("getChildrensDataBegin");
        const response = await DataService.get(
          `${urls.GET_CHILDREN_DETAIL_BY_ID}?id=${id}`
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
          `${urls.GET_SPOUSE_DETAIL_BY_ID}?id=${id}`
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
          `${urls.GET_EMPLOYER_BY_ID}?id=${id}`
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
          `${urls.GET_CHURCH_AFFILIATION_BY_ID}?id=${id}`
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
          `${urls.GET_QUALIFICATION_BY_ID}?id=${id}`
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

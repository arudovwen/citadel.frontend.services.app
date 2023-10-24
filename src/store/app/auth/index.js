import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";

function getRedirectFrom(url) {
  try {
    // Create a URL object from the input URL
    const parsedUrl = new URL(url);

    // Get the query parameters as a URLSearchParams object
    const queryParams = parsedUrl.searchParams;

    // Get the value of the 'redirect_from' parameter
    const redirectFrom = queryParams.get("redirect_from");

    return redirectFrom;
  } catch (error) {
    // Handle invalid URL or other errors
    console.error("Error parsing URL:", error);
    return null;
  }
}
export default {
  state: {
    error: null,
    signupsuccess: false,
    loginsuccess: false,
    logoutsuccess: false,
    resetsuccess: false,
    forgotsuccess: false,
    validendsuccess: false,
    validinitsuccess: false,
    loading: null,
    accessToken: localStorage.getItem("accessToken") || null,
    avatar: localStorage.getItem("avatar") || null,
    userData: JSON.parse(localStorage.getItem("userData")) || null,

    // for edit
  },
  getters: {
    appointments: (state) => state.appointments,
  },
  mutations: {
    loginBegin(state) {
      state.loading = true;
      state.error = null;
      state.loginsuccess = false;
    },
    loginSuccess(state, data) {
      state.loading = false;
      state.loginsuccess = true;
      state.login = data;
      state.accessToken = data;
    },
    loginErr(state, err) {
      state.loading = false;
      state.error = err;
      state.accessToken = null;
      state.loginsuccess = false;
    },
    logoutBegin(state) {
      state.loading = true;
      state.error = null;
      state.logoutsuccess = false;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.login = false;
      state.accessToken = null;
      state.logoutsuccess = true;
    },
    logoutErr(state, err) {
      state.loading = false;
      state.error = err;
      state.logoutsuccess = false;
    },
    signupBegin(state) {
      state.loading = true;
      state.error = null;
      state.signupsuccess = false;
    },
    signupSuccess(state) {
      state.loading = false;
      state.signupsuccess = true;
    },
    signupErr(state, err) {
      state.loading = false;
      state.error = err;
      state.signnupsuccess = false;
    },

    validateInitiateBegin(state) {
      state.loading = true;
      state.error = null;
      state.validinitsuccess = false;
    },
    validateInitiateSuccess(state, data) {
      state.loading = false;
      state.validinitsuccess = true;
      state.token = data;
    },
    validateInitiateErr(state, err) {
      state.loading = false;
      state.error = err;
      state.validinitsuccess = false;
    },

    validatEndBegin(state) {
      state.loading = true;
      state.error = null;
      state.validendsuccess = false;
    },
    validateEndSuccess(state, data) {
      state.loading = false;
      state.validendsuccess = true;
      state.token = data;
    },
    validateEndErr(state, err) {
      state.loading = false;
      state.error = err;
      state.validendsuccess = false;
    },

    forgotBegin(state) {
      state.loading = true;
      state.error = null;
      state.forgotsuccess = false;
    },
    forgotSuccess(state, data) {
      state.loading = false;
      state.forgotsuccess = true;
      state.token = data;
    },
    forgotErr(state, err) {
      state.loading = false;
      state.error = err;
      state.forgotsuccess = false;
    },
    resetBegin(state) {
      state.loading = true;
      state.error = null;
      state.resetsuccess = false;
    },
    resetSuccess(state) {
      state.loading = false;
      state.resetsuccess = true;
    },
    resetErr(state, err) {
      state.loading = false;
      state.error = err;
      state.resetsuccess = false;
    },
  },
  actions: {
    async login({ commit }, data) {
      try {
        commit("loginBegin");
        const response = await DataService.post(urls.LOGIN, data);

        if (response.status === 200) {
          const accessToken = response.data.data.token;
          const userData = response.data.data.user;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userData", JSON.stringify(userData));
          commit("loginSuccess", accessToken);
        }
      } catch (err) {
        commit("loginErr", err);
      }
    },
    async logOut({ commit }) {
      try {
        commit("logoutBegin");
        localStorage.clear();

        if (getRedirectFrom(window.location.search)) {
          window.location.href = getRedirectFrom(window.location.search);
        } else {
          window.location.href = "/";
        }
      } catch (err) {
        console.error("Logout Error:", err);
        commit("logoutErr", err.response.data.message);
      }
    },
    async signup({ commit }, data) {
      try {
        commit("signupBegin");
        const response = await DataService.post(urls.SIGN_UP_USER, data);

        if (response.status === 200) {
          commit("signupSuccess");
        }
      } catch (err) {
        commit("signupErr", err);
      }
    },
    async validateEmailInitiate({ commit }, data) {
      try {
        commit("validateInitiateBegin");
        const response = await DataService.post(
          urls.VALIDATE_EMAIL_INITIATE,
          data
        );
        if (response.status === 200) {
          commit("validateInitiateSuccess", response.data.message);
        }
      } catch (err) {
        commit("validateInitiateErr", err);
      }
    },
    async validateEmailComplete({ commit }, data) {
      try {
        commit("validateEndBegin");
        const response = await DataService.post(
          urls.VALIDATE_EMAIL_COMPLETE,
          data
        );

        if (response.status === 200) {
          commit("validateEndSuccess");
        }
      } catch (err) {
        commit("validateEndErr", err);
      }
    },
    async forgotPassword({ commit }, data) {
      try {
        commit("forgotBegin");
        const response = await DataService.post(
          urls.CHANGE_PASSWORD_INITIATE,
          data
        );

        if (response.status === 200) {
          commit("forgotSuccess", response.data.message);
        }
      } catch (err) {
        commit("forgotErr", err);
      }
    },
    async resetPassword({ commit }, data) {
      try {
        commit("resetBegin");
        const response = await DataService.post(
          urls.CHANGE_PASSWORD_COMPLETE,
          data
        );

        if (response.status === 200) {
          commit("resetSuccess");
        }
      } catch (err) {
        commit("resetErr", err);
      }
    },
  },
};

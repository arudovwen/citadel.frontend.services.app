import { createRouter, createWebHistory } from "vue-router";
import ProfileIndex from "@/views/dashboard/profile/index.vue";
import MembersIndex from "@/views/dashboard/members/index.vue";
import VenuesIndex from "@/views/dashboard/venues/index.vue";
import AppointmentsIndex from "@/views/dashboard/appointments/index.vue";

function guard(to, from, next) {
  if (localStorage.activeUser) {
    next();
  } else next({ name: "Login" });
}
const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/auth/login/index.vue"),
  },
  {
    path: "/register",
    name: "reg",
    component: () => import("@/views/auth/register"),
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("@/views/auth/forgot-password.vue"),
  },
  {
    path: "/email-verify",
    name: "email-verify",
    component: () => import("@/views/auth/email-authenticate.vue"),
  },
  {
    path: "/privacy",
    name: "privacy",
    component: () => import("@/views/privacy.vue"),
  },
  {
    path: "/terms",
    name: "terms",
    component: () => import("@/views/terms.vue"),
  },
  {
    path: "/",
    name: "Layout",
    redirect: "/home",
    component: () => import("@/Layout/index.vue"),
    beforeEnter: guard,
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/index.vue"),
      },
      {
        path: "/overview",
        name: "overview",
        component: () => import("@/views/home/crm.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "/profile",
        name: "profile",
        component: ProfileIndex,
        // children: [
        //   {
        //     path: "",
        //     name: "Personal Information",
        //     component: () => import("@/views/profile/PersonalInfo.vue"),
        //   },
        // ],
      },
      {
        path: "/members",
        name: "members",
        component: MembersIndex,
      },
      {
        path: "/venues",
        name: "venues",
        component: VenuesIndex,
        children: [
          {
            path: "",
            name: "venue-list",
            component: () => import("@/views/dashboard/venues/VenueList.vue"),
          },
          {
            path: "/add-venue",
            name: "add venue",
            component: () => import("@/views/dashboard/venues/AddVenue.vue"),
          },
          {
            path: "/edit-venue/:id",
            name: "edit venue",
            component: () => import("@/views/dashboard/venues/AddVenue.vue"),
          },
        ],
      },
      {
        path: "/appointments",
        name: "appointments",
        component: AppointmentsIndex,
        children: [
          {
            path: "",
            name: "appointment-list",
            component: () =>
              import("@/views/dashboard/appointments/AppointmentList.vue"),
          },
          {
            path: "/add-appointment",
            name: "add appointment",
            component: () =>
              import("@/views/dashboard/appointments/AddAppointment.vue"),
          },
          {
            path: "/edit-appointment/:id",
            name: "edit appointment",
            component: () =>
              import("@/views/dashboard/appointments/AddAppointment.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
router.beforeEach((to, from, next) => {
  const titleText = to.name;
  const words = titleText.split(" ");
  const wordslength = words.length;
  for (let i = 0; i < wordslength; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  document.title = "Citadel  - " + words;
  next();
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;

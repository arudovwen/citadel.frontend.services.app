import { createRouter, createWebHistory } from "vue-router";
import { useToast } from "vue-toastification";
import store from "@/store";
import ProfileIndex from "@/views/dashboard/profile/index.vue";
// import MembersIndex from "@/views/dashboard/members/index.vue";
import VenuesIndex from "@/views/dashboard/venues/index.vue";
import AppointmentsIndex from "@/views/dashboard/appointments/index.vue";
import AffinityGroupsIndex from "@/views/dashboard/affinityGroups/index.vue";
import MinistriesIndex from "@/views/dashboard/ministries/index.vue";
import UnitsIndex from "@/views/dashboard/units/index.vue";
import AccessoriesIndex from "@/components/Pages/Dashboard/Accessories/index.vue";
import AuditIndex from "@/components/Pages/Dashboard/Audit/index.vue";

import SpecialUnitsIndex from "@/views/dashboard/special-units/index.vue";
// import MountainOfInfluenceIndex from "@/views/dashboard/mountain-of-influence/index.vue";
import "vue-toastification/dist/index.css";

const toast = useToast();
console.log("🚀 ~ toast:", toast);

function guard(to, from, next) {
  if (store.state.auth.accessToken) {
    next();
  } else next({ name: "Login" });
}
function guardAuth(to, from, next) {
  if (store.state.auth.accessToken) {
    next({ name: "overview" });
  } else next();
}
const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/auth/login/index.vue"),
    meta: { auth: true },
    beforeEnter: guardAuth,
  },
  {
    path: "/register",
    name: "reg",
    component: () => import("@/views/auth/register"),
    meta: { auth: true },
    beforeEnter: guardAuth,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("@/views/auth/forgot-password.vue"),
    meta: { auth: true },
    beforeEnter: guardAuth,
  },
  {
    path: "/reset-password/:email",
    name: "reset-password",
    component: () => import("@/views/auth/reset-password.vue"),
    meta: { auth: true },
    beforeEnter: guardAuth,
  },
  {
    path: "/email-verify/:email",
    name: "email-verify",
    component: () => import("@/views/auth/email-authenticate.vue"),
    meta: { auth: true },
    beforeEnter: guardAuth,
  },
  {
    path: "/verify/:email/:type",
    name: "verify",
    component: () => import("@/views/auth/verify.vue"),
    meta: { auth: true },
    beforeEnter: guardAuth,
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
    meta: { auth: false },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/index.vue"),
        meta: {
          roles: "",
          subroles: ["cihpastor", "cihcoordinator"],
        },
      },
      {
        path: "/overview",
        name: "overview",
        component: () => import("@/views/home/crm.vue"),
        meta: {
          hide: true,
          activeName: "overview",
          roles: "",
          subroles: ["cihpastor", "cihcoordinator"],
        },
      },
      {
        path: "/profile/:userId",
        name: "profile",
        component: ProfileIndex,
        meta: {
          roles: "",
          subroles: ["cihpastor", "cihcoordinator"],

          activeName: "profile",
        },
      },
      {
        path: "/members-management",
        name: "members management",
        component: () => import("@/components/Pages/Dashboard/Members"),
        meta: {
          activeName: "members-management",
          roles: "CAN_VIEW_MEMBERS",
          subroles: [],
        },
      },
      {
        path: "/roles-management",
        name: "Roles",
        component: () => import("@/views/roles/index.vue"),
        meta: {
          // auth: true,
          activeName: "roles-management",
          roles: "",
          subroles: [],
        },

        // beforeEnter: guardAuth,
      },
      {
        path: "/users-management",
        name: "users management",
        component: () => import("@/components/Pages/Dashboard/Members/users"),
        meta: {
          activeName: "users-management",
          roles: "CAN_VIEW_USER_MANAGEMENT",
          subroles: [],
        },
      },
      {
        path: "/demise",
        name: "Demise ",
        component: () =>
          import("@/components/Pages/Dashboard/Demise/index.vue"),
        meta: {
          activeName: "demise",
          roles: "CAN_UPDATE_DEMISE_MEMBERS",
          subroles: [],
        },
        children: [
          {
            path: "",
            name: "Archived users",
            component: () =>
              import("@/components/Pages/Dashboard/Demise/Demise.vue"),
            meta: {
              activeName: "demise",
              // roles: "CAN_UPDATE_DEMISE_MEMBERS",
              subroles: [],
            },
          },
        ],
      },
      {
        path: "/affinity-groups",
        name: "affinity-groups",
        component: AffinityGroupsIndex,
        meta: {
          roles: "CAN_VIEW_AFFINITYGROUPS",
          subroles: [],
        },
        children: [
          {
            path: "",
            name: "affinity-groups",
            component: () =>
              import("@/components/Pages/Dashboard/AffinityGroups"),
            meta: {
              activeName: "affinity-groups",
            },
          },
        ],
      },
      {
        path: "/ministries",
        name: "ministries",
        component: MinistriesIndex,
        meta: {
          roles: "",
          subroles: [],
        },
        children: [
          {
            path: "",
            name: "ministries",
            component: () =>
              import("@/components/Pages/Dashboard/Ministries/ministries"),
            meta: {
              activeName: "ministries",
            },
          },
        ],
      },

      {
        path: "/accessories",
        name: "accessories",
        component: AccessoriesIndex,
        meta: {
          roles: "CAN_VIEW_ACCESSORIES",
          subroles: [],
        },
        children: [
          {
            path: "",
            name: "accessories",
            component: () =>
              import(
                "@/components/Pages/Dashboard/Accessories/accessories.vue"
              ),
            meta: {
              activeName: "accessories",
            },
          },
        ],
      },
      {
        path: "/audit-logs",
        name: "audit logs",
        component: AuditIndex,
        meta: {
          roles: "CAN_VIEW_AUDIT_REPORT",
          subroles: [],
        },
        children: [
          {
            path: "",
            name: "audits logs",
            component: () =>
              import("@/components/Pages/Dashboard/Audit/audits.vue"),
            meta: {
              activeName: "audits",
            },
          },
        ],
      },
      {
        path: "/units",
        name: "units",
        component: UnitsIndex,
        meta: {
          roles: "CAN_VIEW_UNITS",
          subroles: [],
        },
        children: [
          {
            path: "",
            name: "units",
            component: () => import("@/components/Pages/Dashboard/Units/units"),
            meta: {
              activeName: "units",
            },
          },
        ],
      },
      {
        path: "/special-unit",
        name: "special unitz",
        component: SpecialUnitsIndex,
        meta: {
          roles: "",
          subroles: [],
        },
        children: [
          {
            path: "",
            name: "special units",
            component: () =>
              import("@/components/Pages/Dashboard/SpecialUnits/special-units"),
            meta: {
              activeName: "special-unit",
            },
          },
        ],
      },

      // {
      //   path: "/mountain-of-influence",
      //   name: "mountain of influence",
      //   component: MountainOfInfluenceIndex,
      //   meta: {
      //      roles: "",
      //     subroles: [],
      //   },
      //   children: [
      //     {
      //       path: "",
      //       name: "mountain of influence",
      //       component: () =>
      //         import(
      //           "@/components/Pages/Dashboard/MountainOfInfluence/moi.vue"
      //         ),
      //       meta: {
      //         activeName: "mountain-of-influence",
      //       },
      //     },
      //   ],
      // },
      {
        path: "/departments",
        name: "departments",
        component: () => import("@/views/dashboard/departments/index.vue"),
        children: [
          {
            path: "",
            name: "departments",
            component: () => import("@/components/Pages/Dashboard/Departments"),
            meta: {
              activeName: "departments",
            },
          },
          {
            path: "view/:name/:id/:hodid",
            name: "department",

            component: () =>
              import("@/components/Pages/Dashboard/Departments/department.vue"),
            meta: {
              activeName: "departments",
              groupParent: {
                name: "Departments",
                url: "/departments",
              },
            },
          },
        ],
        meta: {
          roles: "CAN_VIEW_DEPARTMENT",
          subroles: [],
        },
      },

      {
        path: "/first-timers",
        name: "first timers",
        component: () => import("@/views/dashboard/first-timers/index.vue"),
        children: [
          {
            path: "",
            name: "first timers",
            component: () => import("@/components/Pages/Dashboard/FirstTimers"),
            meta: {
              activeName: "first-timers",
            },
          },
        ],
        meta: {
          roles: "CAN_VIEW_FIRSTTIMERS",
          subroles: [],
        },
      },
      {
        path: "/cih",
        name: "Church in house",
        component: () => import("@/views/dashboard/cih/index.vue"),
        children: [
          {
            path: "zones",
            name: "CIH Zones",
            component: () => import("@/components/Pages/Dashboard/CIH/Zones"),
            meta: {
              activeName: "cih management",
              roles: "",
              subroles: ["cihcoordinator"],
            },
            children: [
              {
                path: "",
                name: "Zones",

                component: () =>
                  import("@/components/Pages/Dashboard/CIH/Zones/zones"),
              },
              {
                path: "view-centers/:zoneId",
                name: "Centers",

                component: () =>
                  import("@/components/Pages/Dashboard/CIH/Zones/zone.vue"),
                meta: {
                  activeName: "cih management",
                  groupParent: {
                    name: "CIH Zones",
                    url: "/cih/zones",
                  },
                  roles: "",
                },
              },
              {
                path: "zone-members/:id",
                name: "Zone members",

                component: () =>
                  import(
                    "@/components/Pages/Dashboard/CIH/Zones/zone-members.vue"
                  ),
                meta: {
                  activeName: "cih management",
                  groupParent: {
                    name: "CIH Zones",
                    url: "/cih/zones",
                  },
                },
              },
              {
                path: "center/:id",
                name: "CIH Zone Center",
                component: () =>
                  import("@/components/Pages/Dashboard/CIH/Centers/center"),
                meta: {
                  activeName: "cih management",
                  groupParent: {
                    name: "CIH Zones",
                    url: "/cih/zones",
                  },
                },
              },
            ],
          },

          {
            path: "centers",
            name: "CIH Centers",
            component: () => import("@/components/Pages/Dashboard/CIH/Centers"),
            meta: {
              activeName: "cih management",
              roles: "",
              subroles: ["cihcoordinator", "cihpastor"],
            },
            children: [
              {
                path: "",
                name: "CIH Centers",
                component: () =>
                  import("@/components/Pages/Dashboard/CIH/Centers/centers"),
                meta: {
                  activeName: "cih management",
                  roles: "",
                  subroles: ["cihcoordinator", "cihpastor"],
                },
              },
              {
                path: "center",
                name: "CIH Center",
                component: () =>
                  import("@/components/Pages/Dashboard/CIH/Centers/centers"),
                meta: {
                  activeName: "cih management",
                },
              },
              {
                path: "center/:id",
                name: "CIH Center",
                component: () =>
                  import("@/components/Pages/Dashboard/CIH/Centers/center"),
                meta: {
                  activeName: "cih management",

                  groupParent: {
                    name: "CIH Centers",
                    url: "/cih/centers",
                  },
                },
              },
            ],
          },
          {
            path: "center",
            name: "Center",
            component: () =>
              import("@/components/Pages/Dashboard/CIH/Center/center"),
            meta: {
              activeName: "cih management",
              groupParent: {
                name: "Center",
                url: "/cih/center",
              },
              roles: "",
              subroles: ["cihpastor", "cihcoordinator"],
            },
          },
          {
            path: "reports",
            name: "CIH Reports",
            component: () => import("@/views/dashboard/cih/reports"),
            meta: {
              activeName: "cih management",
              roles: "",
              subroles: ["cihcoordinator", "cihpastor"],
            },
            children: [
              {
                path: "centers",
                name: "Report",
                component: () =>
                  import("@/components/Pages/Dashboard/CIH/Reports/centers"),
                meta: {
                  activeName: "reports",
                  groupParent: {
                    name: "Report Centers",
                    url: "/cih/reports/centers",
                  },
                },
              },
              {
                path: "centers/:zoneId/:name",
                name: "Reports",
                component: () =>
                  import("@/components/Pages/Dashboard/CIH/Reports/centers"),
                meta: {
                  activeName: "reports",
                  groupParent: {
                    name: "Zones",
                    url: "/cih/reports/zones",
                  },
                },
              },
              {
                path: "zones",
                name: "Zones Report",
                component: () =>
                  import("@/components/Pages/Dashboard/CIH/Reports/zones"),
                meta: {
                  activeName: "reports",
                  roles: "",
                  groupParent: {
                    name: "Reports",
                    url: "/cih/reports/zones",
                  },
                },
              },
              {
                path: "followup",
                name: "First timers list",
                component: () =>
                  import("@/components/Pages/Dashboard/CIH/Reports/followup"),
                meta: {
                  activeName: "reports",
                  roles: "",
                  groupParent: {
                    name: "Reports",
                    url: "/cih/reports/followup",
                  },
                },
              },
              {
                path: "followup/:id/:name",
                name: "Followup Report",
                component: () =>
                  import(
                    "@/components/Pages/Dashboard/CIH/Reports/first-timer-report"
                  ),
                meta: {
                  activeName: "reports",
                  roles: "",
                  groupParent: {
                    name: "Follow-up Reports",
                    url: "/cih/reports/followup",
                  },
                },
              },
            ],
          },
          // {
          //   path: "events",
          //   name: "Events",
          //   component: () => import("@/components/Pages/Dashboard/CIH/Events"),
          //   meta: {
          //     activeName: "cih management",
          //     roles: ["administrator", "inspectorate", "accreditor"],
          //     subroles: ["cihcoordinator", "cihpastor"],
          //   },
          // },
        ],
        meta: {
          roles: "CAN_VIEW_CIH_MANAGEMENT",
          subroles: ["cihcoordinator", "cihpastor"],
        },
      },
      {
        path: "/requests",
        name: "Requests",
        component: () => import("@/views/dashboard/requests/index.vue"),
        children: [
          {
            path: "",
            name: "Requests",
            component: () =>
              import("@/components/Pages/Dashboard/Requests/requests-page"),
            meta: {
              activeName: "requests",
              // roles: "CAN_VIEW_REQUESTS",
            },
          },
          // {
          //   path: "center",
          //   name: "Center requests",
          //   component: () =>
          //     import("@/components/Pages/Dashboard/Requests/table"),
          //   meta: {
          //     activeName: "requests",
          //   },
          // },
          // {
          //   path: "affinity-group",
          //   name: "Affinity Group requests",
          //   component: () =>
          //     import("@/components/Pages/Dashboard/Requests/table"),
          //   meta: {
          //     activeName: "requests",
          //   },
          // },
          // {
          //   path: "department",
          //   name: "Department requests",
          //   component: () =>
          //     import("@/components/Pages/Dashboard/Requests/table"),
          //   meta: {
          //     activeName: "requests",
          //   },
          // },
        ],
        meta: {
          roles: "",
          subroles: [],
        },
      },
      {
        path: "/outreach",
        name: "outreach",
        component: () => import("@/views/dashboard/outreach/index.vue"),
        children: [
          {
            path: "",
            name: "outreach",
            component: () => import("@/components/Pages/Dashboard/Outreach"),
            meta: {
              activeName: "outreach",
            },
          },
        ],
        meta: {
          roles: "CAN_VIEW_OUTREACH",
          subroles: [],
        },
      },
      {
        path: "/attendance",
        name: "attendance",
        component: () => import("@/views/dashboard/attendance/index.vue"),
        children: [
          {
            path: "",
            name: "attendance",
            component: () => import("@/components/Pages/Dashboard/Members"),
            meta: {
              activeName: "attendance",
              roles: "CAN_VIEW_ATTENDANCE",
            },
          },
        ],
        meta: {
          roles: "CAN_VIEW_ATTENDANCE",
          subroles: [],
        },
      },
      {
        path: "/goals",
        name: "goals",
        component: () => import("@/views/dashboard/goals/index.vue"),
        children: [
          {
            path: "",
            name: "goals",
            component: () => import("@/components/Pages/Dashboard/Goals"),
            meta: {
              activeName: "goals",
            },
          },
        ],
        meta: {
          roles: "CAN_VIEW_GOALS",
          subroles: [],
        },
      },
      {
        path: "/meetings",
        name: "meetings",
        component: () => import("@/views/dashboard/meetings/index.vue"),
        children: [
          {
            path: "",
            name: "meetings",
            component: () => import("@/components/Pages/Dashboard/Meetings"),
            meta: {
              activeName: "meetings",
            },
          },
        ],
        meta: {
          roles: "CAN_VIEW_MEETINGS",
          subroles: [],
        },
      },
      // {
      //   path: "/events",
      //   name: "events",
      //   component: () => import("@/views/dashboard/events/index.vue"),
      //   children: [
      //     {
      //       path: "",
      //       name: "events",
      //       component: () => import("@/components/Pages/Dashboard/Events"),
      //       meta: {
      //         activeName: "events",
      //       },
      //     },
      //   ],
      //   meta: {
      //     roles: "CAN_VIEW_EVENTS",
      //   },
      // },
      {
        path: "/notifications",
        name: "notifications",
        component: () => import("@/views/dashboard/notifications/index.vue"),
        children: [
          {
            path: "",
            name: "notifications",
            component: () =>
              import("@/components/Pages/Dashboard/Notifications"),
            meta: {
              activeName: "notifications",
            },
          },
        ],
        meta: {
          roles: "CAN_VIEW_NOTIFICATIONS",
          subroles: [],
        },
      },
      {
        path: "/appointments",
        name: "appointments",
        component: AppointmentsIndex,
        children: [
          {
            path: "",
            name: "appointments",
            component: () =>
              import("@/components/Pages/Dashboard/Appointments"),
            meta: {
              activeName: "appointments",
            },
          },
        ],
        meta: {
          roles: "CAN_VIEW_APPOITMENT",
          subroles: [],
        },
      },
      {
        path: "/venue-management",
        name: "venue-management",
        component: VenuesIndex,
        children: [
          {
            path: "",
            name: "venue-management",
            component: () => import("@/components/Pages/Dashboard/Venues"),
            meta: {
              activeName: "venue-management",
            },
          },
        ],
        meta: {
          roles: "CAN_VIEW_VENUES",
          subroles: [],
        },
      },
      // {
      //   path: "/venue-management",
      //   name: "venue-management",
      //   meta: {
      //     activeName: "venue-management",
      //   },
      //   component: VenuesIndex,
      //   children: [
      //     {
      //       path: "",
      //       name: "venue-list",
      //       meta: {
      //         activeName: "venue-management",
      //       },
      //       component: () => import("@/views/dashboard/venues/VenueList.vue"),
      //     },
      //     {
      //       path: "/add-venue",
      //       meta: {
      //         activeName: "venue-management",
      //       },
      //       name: "add venue",
      //       component: () => import("@/views/dashboard/venues/AddVenue.vue"),
      //     },
      //     {
      //       path: "/edit-venue/:id",
      //       name: "edit venue",
      //       meta: {
      //         activeName: "venue-management",
      //       },
      //       component: () => import("@/views/dashboard/venues/AddVenue.vue"),
      //     },
      //   ],
      // },
      // {
      //   path: "/appointments",
      //   name: "appointments",
      //   component: AppointmentsIndex,
      //   meta: {
      //     activeName: "appointments",
      //   },
      //   children: [
      //     {
      //       path: "",
      //       name: "appointment-list",
      //       meta: {
      //         activeName: "appointments",
      //       },
      //       component: () =>
      //         import("@/views/dashboard/appointments/AppointmentList.vue"),
      //     },
      //     {
      //       path: "/add-appointment",
      //       name: "add appointment",
      //       meta: {
      //         activeName: "appointments",
      //       },
      //       component: () =>
      //         import("@/views/dashboard/appointments/AddAppointment.vue"),
      //     },
      //     {
      //       path: "/edit-appointment/:id",
      //       name: "edit appointment",
      //       meta: {
      //         activeName: "appointments",
      //       },
      //       component: () =>
      //         import("@/views/dashboard/appointments/AddAppointment.vue"),
      //     },
      //   ],
      // },
    ],
  },
  //ends here
  {
    path: "/:catchAll(.*)",
    name: "Not found",
    component: () =>
      import(/* webpackChunkName: "notfound" */ "../views/NotFound"),
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
  if (!titleText) return next();
  const words = titleText.split(" ");
  const wordslength = words.length;
  for (let i = 0; i < wordslength; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  document.title = "Citadel  - " + words;

  if (store.state.auth.accessToken) {
    if (
      store?.state?.auth?.permissions?.includes(to?.meta?.roles) ||
      !to?.meta?.roles
    ) {
      next();
    } else {
      toast.error("You are not authorised");
      next({ name: "overview" });
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;

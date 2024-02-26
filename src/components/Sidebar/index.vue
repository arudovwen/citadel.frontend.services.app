<template>
  <div :class="this.$store.state.semidark ? 'dark' : ''">
    <div
      :class="`sidebar-wrapper bg-white dark:bg-slate-800    ${
        this.$store.state.skin === 'bordered'
          ? 'border-r border-gray-5002 dark:border-slate-700'
          : 'shadow-base'
      }   ${
        this.$store.state.sidebarCollasp ? this.closeClass : this.openClass
      } 
      
      `"
    >
      <!-- @mouseenter="this.$store.state.sidebarCollasp = false"
      @mouseleave="this.$store.state.sidebarCollasp = true" -->
      <div
        :class="`logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] py-6  sticky top-0   px-4  ${
          this.$store.state.sidebarCollasp ? this.closeClass : this.openClass
        } ${
          this.$store.state.skin === 'bordered'
            ? ' border-b border-r border-gray-5002 dark:border-slate-700'
            : ' border-none'
        }`"
      >
        <router-link
          :to="{ name: 'overview' }"
          v-if="!this.$store.state.sidebarCollasp"
        >
          <img
            src="@/assets/images/logo/logo.png"
            alt=""
            class="w-[150px]"
            v-if="!this.$store.state.isDark && !this.$store.state.semidark"
          />

          <img
            src="@/assets/images/logo/logo.png"
            class="w-[150px]"
            alt=""
            v-if="this.$store.state.isDark || this.$store.state.semidark"
          />
        </router-link>
        <router-link
          :to="{ name: 'home' }"
          v-if="this.$store.state.sidebarCollasp"
        >
          <img
            src="@/assets/images/logo/icon.png"
            alt=""
            v-if="!this.$store.state.isDark && !this.$store.state.semidark"
          />
          <img
            src="@/assets/images/logo/icon.png"
            alt=""
            v-if="this.$store.state.isDark || this.$store.state.semidark"
          />
        </router-link>
        <span
          class="cursor-pointer text-slate-900 dark:text-white text-2xl"
          v-if="!this.$store.state.sidebarCollasp"
          @click="
            this.$store.state.sidebarCollasp = !this.$store.state.sidebarCollasp
          "
          ><Icon icon="heroicons-outline:menu-alt-3"
        /></span>
      </div>
      <div
        class="h-[60px] absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none"
        :class="[shadowbase ? ' opacity-100' : ' opacity-0']"
      ></div>

      <SimpleBar
        class="sidebar-menu px-4 pb-[7rem] h-[calc(100%-80px)]"
        @created="
          (instance) => {
            simplebarInstance = instance;
          }
        "
      >
        <!-- <span>insp: {{ permissions }}</span> -->
        <!-- <span>{{ cihRole }}</span> -->
        <Navmenu :items="menuLink" />
      </SimpleBar>
    </div>
  </div>
</template>
<script>
import { Icon } from "@iconify/vue";
import { defineComponent, computed } from "vue";
import { menuItems } from "../../constant/data";
import Navmenu from "./Navmenu";
import { gsap } from "gsap";
import { SimpleBar } from "simplebar-vue3";
import { ref, onMounted, inject, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Icon,
    Navmenu,
    SimpleBar,
  },
  data() {
    return {
      menuItems,
      openClass: "w-[248px]",
      closeClass: "w-[72px] close_sidebar",
    };
  },

  setup() {
    onMounted(() => {
      simplebarInstance.value
        .getScrollElement()
        .addEventListener("scroll", () => {
          if (simplebarInstance.value.getScrollElement().scrollTop > 50) {
            simplebarInstance.value.getScrollElement().classList.add("scroll");
            shadowbase.value = true;
          } else {
            simplebarInstance.value
              .getScrollElement()
              .classList.remove("scroll");
            shadowbase.value = false;
          }
        });
    });

    const { state } = useStore();
    const shadowbase = ref(false);
    const simplebarInstance = ref(null);
    const authChurchAffiliation = inject("authChurchAffiliation");
    const cihRole = computed(() => authChurchAffiliation.value?.cihRole);
    const centerId = computed(() => authChurchAffiliation.value?.centerId);
    // const zoneId = computed(() => authChurchAffiliation.value?.zoneId);

    const permissions = computed(() => state.auth.permissions);
    // const likelyInspectorate = computed(() =>
    //   permissions.value.includes("CAN_VIEW_ALL_ZONES")
    // );

    // const likelyCoordinator = computed(
    //   () =>
    //     !likelyInspectorate.value &&
    //     permissions.value.includes("CAN_VIEW_ZONES") &&
    //     cihRole.value?.toLowerCase() == "cihcoordinator" &&
    //     zoneId.value
    // );

    const isCihPastor = computed(
      () => cihRole.value?.toLowerCase() == "cihpastor" && centerId.value
    );
    const canViewZone = computed(
      () =>
        permissions.value.includes("CAN_VIEW_ZONES") ||
        permissions.value.includes("CAN_VIEW_ALL_ZONES")
    );
    const canViewAllZones = computed(
      () =>
        permissions.value.includes("CAN_VIEW_ZONES") &&
        permissions.value.includes("CAN_VIEW_ALL_ZONES")
    );
    const canViewMyZone = computed(
      () =>
        permissions.value.includes("CAN_VIEW_ZONES") &&
        !permissions.value.includes("CAN_VIEW_ALL_ZONES")
    );
    const canViewOneCenter = computed(
      () =>
        permissions.value.includes("CAN_VIEW_CENTERS") &&
        !permissions.value.includes("CAN_VIEW_ALL_CENTERS")
    );

    const menuLink = computed(() => {
      // eslint-disable-next-line no-unused-vars
      let newItems;
      const filteredItems = menuItems
        .slice(1)
        .filter((i) => permissions.value.includes(i.roles) || !i.roles);
      //filter menuitems and put it into new items
      newItems = filteredItems;
      // if (likelyInspectorate.value) {
      newItems = filteredItems.map((i) => {
        if (i.title.toLowerCase() === "cih management") {
          let routes = [];
          if (canViewZone.value) {
            routes.push(i.zoneRoute);
            routes.push(i.zoneReportRoutes);
          }
          if (canViewOneCenter.value || isCihPastor) {
            routes.push(i.centerRoute);
          }

          if (canViewAllZones.value) {
            routes.push(i.centersRoute);
          }

          if (canViewMyZone.value || canViewOneCenter.value) {
            routes.push(i.centerReportRoutes);
          }
          // if (canViewZone.value) {
          //   routes.push(i.zoneRoute);
          // }

          i.child = routes;
        }
        return i;
      });
      // return [menuItems[0], ...newItems];
      // }
      // if (likelyCoordinator.value) {
      //   newItems = filteredItems.map((i) => {
      //     if (i.title.toLowerCase() === "cih management") {
      //       i.child = i.coordinatorRoutes;
      //     }
      //     return i;
      //   });
      //   return [menuItems[0], ...newItems];
      // }
      // if (likelyCihPastor.value) {
      //   newItems = filteredItems.map((i) => {
      //     if (i.title.toLowerCase() === "cih management") {
      //       i.child = i.cihPastorRoutes;
      //     }
      //     return i;
      //   });
      //   return [menuItems[0], ...newItems];
      // }

      return [menuItems[0], ...newItems];
    });

    const enterWidget = (el) => {
      gsap.fromTo(
        el,
        { x: 0, opacity: 0, scale: 0.5 },
        { x: 0, opacity: 1, duration: 0.3, scale: 1 }
      );
    };
    const leaveWidget = (el) => {
      gsap.fromTo(
        el,
        { x: 0, opacity: 1, scale: 1 },
        { x: 0, opacity: 0, duration: 0.3, scale: 0.5 }
      );
    };

    watch(authChurchAffiliation, () => {
      console.log(
        "authChurchAffiliation: " + JSON.stringify(authChurchAffiliation.value)
      );
    });

    return {
      menuLink,
      enterWidget,
      leaveWidget,
      simplebarInstance,
      shadowbase,
      // likelyInspectorate,
      // likelyCoordinator,
      permissions,
      cihRole,
    };
  },
});
</script>
<style lang="scss">
// .sidebar-wrapper {
//   @apply fixed left-0 top-0   h-screen   z-[999];
// }
.sidebar-wrapper {
  @apply fixed ltr:left-0 rtl:right-0 top-0   h-screen   z-[999];
  transition: width 0.2s cubic-bezier(0.39, 0.575, 0.565, 1);
  will-change: width;
}
// .close_sidebar.sidebar-wrapper {
//   @apply absolute bottom-0 h-full;
// }

.nav-shadow {
  background: linear-gradient(
    rgb(255, 255, 255) 5%,
    rgba(255, 255, 255, 75%) 45%,
    rgba(255, 255, 255, 20%) 80%,
    transparent
  );
}
.dark {
  .nav-shadow {
    background: linear-gradient(
      rgba(#1e293b, 100%) 5%,
      rgba(#1e293b, 75%) 45%,
      rgba(#1e293b, 20%) 80%,
      transparent
    );
  }
}
</style>

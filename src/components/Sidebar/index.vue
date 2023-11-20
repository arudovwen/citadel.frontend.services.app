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
        class="sidebar-menu px-4 h-[calc(100%-80px)]"
        @created="
          (instance) => {
            simplebarInstance = instance;
          }
        "
      >
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
import { ref, onMounted } from "vue";
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
    const { state } = useStore();
    const shadowbase = ref(false);
    const simplebarInstance = ref(null);
    const menuLink = computed(() => {
      // eslint-disable-next-line no-unused-vars
      let newItems;
      const filteredItems = menuItems
        .slice(1)
        .filter(
          (i) =>
            i.roles.includes(state.auth.userData.userRole?.toLowerCase()) ||
            i.subroles.includes(state.auth.userData?.cihRole?.toLowerCase())
        );
      newItems = filteredItems;
      if (
        state.auth.userData.userRole.toLowerCase() === "administrator" ||
        state.auth.userData.userRole.toLowerCase() === "inspectorate"
      ) {
        newItems = filteredItems.map((i) => {
          if (i.title.toLowerCase() === "cih management") {
            i.child = i.child.filter(
              (j) =>
                j.childtitle.toLowerCase() !== "centers" &&
                j.childtitle.toLowerCase() !== "center" &&
                j.for?.toLowerCase() !== "ordinary"
            );
          }
          return i;
        });
        return [menuItems[0], ...newItems];
      } else if (
        state.auth.userData?.cihRole?.toLowerCase() === "cihcoordinator"
      ) {
        newItems = filteredItems.map((i) => {
          if (i.title.toLowerCase() === "cih management") {
            i.child = i.child.filter(
              (j) =>
                j.childtitle.toLowerCase() !== "centers" &&
                j.childtitle.toLowerCase() !== "center" &&
                j.for?.toLowerCase() !== "ordinary"
            );
          }
          return i;
        });
        return [menuItems[0], ...newItems];
      } else if (state.auth.userData?.cihRole?.toLowerCase() === "cihpastor") {
        newItems = filteredItems.map((i) => {
          if (i.title.toLowerCase() === "cih management") {
            i.child = i.child.filter(
              (j) =>
                j.childtitle.toLowerCase() !== "zones" &&
                j.childtitle.toLowerCase() !== "centers" &&
                j.for?.toLowerCase() !== "admin"
            );
          }
          return i;
        });
        return [menuItems[0], ...newItems];
      }
      return [menuItems[0], ...newItems];
    });
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

    return {
      menuLink,
      enterWidget,
      leaveWidget,
      simplebarInstance,
      shadowbase,
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

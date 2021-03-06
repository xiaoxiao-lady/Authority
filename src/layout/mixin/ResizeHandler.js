import store from "@/store";
import { mobileWidth } from "utils/constant";

const { body } = document;

export default {
  watch: {
    $route(route) {
      if (store.getters.device == "mobile" && store.getters.sidebar.opened) {
        store.dispatch("app/closeSideBar", { withoutAnimation: false });
      }
    },
  },
  beforeMount() {
    window.addEventListener("resize", this.$resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$resizeHandler);
  },
  methods: {
    /**
     * @description: 
     */
    $isMobile() {
      const rect = body.getBoundingClientRect();
      const {width}=rect;
      return width - 1 < mobileWidth;
    },
    /**
     * @description: 
     */
    $resizeHandler() {
      if (!document.hidden) {
        const isMobile=this.$isMobile();
        store.dispatch('app/toggleDevice',isMobile?'mobile':'pc');
        if (isMobile) {
          store.dispatch("app/closeSidebar", { withoutAnimation: true });
        }
      }
    },
  },
};

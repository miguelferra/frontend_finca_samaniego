import { createApp } from "vue";
import bulmaToast from "bulma-toast";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@fortawesome/fontawesome-free/css/all.min.css";

const app = createApp(App);

const showToast = (message, type) => {
  bulmaToast.toast({
    message,
    type,
    duration: 2600,
    position: "top-center",
    dismissible: true,
    pauseOnHover: true,
    closeOnClick: true,
  });
};

app.config.globalProperties.$toast = {
  success(message) {
    showToast(message, "is-success");
  },
  info(message) {
    showToast(message, "is-info");
  },
  warning(message) {
    showToast(message, "is-warning");
  },
};

app.use(store).use(router).mount("#app");

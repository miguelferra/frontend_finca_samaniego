import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import CategoryView from "../views/CategoryView.vue";
import ContactView from "../views/ContactView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Inicio | Finca Samaniego",
    },
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      title: "Sobre Nosotros | Finca Samaniego",
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
    meta: {
      title: "Contacto | Finca Samaniego",
    },
  },
  {
    path: "/productos",
    name: "AllProducts",
    component: () => import("@/views/AllProductsView.vue"),
    meta: {
      title: "Productos | Finca Samaniego",
    },
  },
  {
    path: "/:category_slug/:product_slug",
    name: "Product",
    component: ProductView,
  },
  {
    path: "/:category_slug",
    name: "Category",
    component: CategoryView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return {
        el: to.hash,
        top: 96,
        behavior: "smooth",
      };
    }

    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.fullPath !== from.fullPath) {
    store.commit("setLoading", true);
  }

  next();
});

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = to.meta.title;
  }

  window.requestAnimationFrame(() => {
    store.commit("setLoading", false);
  });
});

router.onError(() => {
  store.commit("setLoading", false);
});

export default router;

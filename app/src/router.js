import Vue from "vue";
import Router from "vue-router";
import Products from "./views/Products.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "products",
      component: Products
    },
    {
      path: "/basket",
      name: "basket",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Basket.vue")
    }
  ]
});

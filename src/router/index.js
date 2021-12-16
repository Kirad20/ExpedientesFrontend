import { route } from 'quasar/wrappers'
import {createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import auth from 'src/api/auth'
import { Notify } from 'quasar'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    console.log("rol",to.name =="nuevo-expediente" && (!auth.isAdmin() || !auth.isUser()));
  // Redireccionar si esta logueado
  if (to.name === 'login' && auth.getToken()) {
    console.log("1");
    return next({
      name: 'buscar-expediente',
    })

    //the route requires authentication
  }
  if (to.meta.authRequired) {
    if (!auth.getToken()) {
      return next({
        name: 'login',
      })
    }
    if (to.name === "Usuarios"=== true && !auth.isAdmin()) {
      Notify.create({
        message: 'No tiene permisos para acceder a esta sección',
        type: 'negative',
        icon: 'warning'
      })
      return next({
        name: 'buscar-expediente',
      })
    }
  }
  return next();
  });

  return Router
})

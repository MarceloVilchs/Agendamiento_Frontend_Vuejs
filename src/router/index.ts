import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainBase from '../views/MainBase.vue'
import MainInicio from '../views/Inicio/MainInicio.vue'
import CRUDView from '../views/CRUDView.vue'
import createAccount from '../views/createAccount.vue'
import listarCita from '../views/listarCita.vue'
import Agendamiento from '../views/Agendamiento.vue'
import resumenCita from '../views/resumenCita.vue'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: MainBase,
    children: [
      {
        path: '/home/inicio',
        name: 'MainInicio',
        component: MainInicio
      },
      { /* Se agrega la ruta de la nueva vista */
        path: '/home/inicio/crud',
        name: 'CRUDView',
        component: CRUDView
      },
      {
        path: '/home/inicio/CrearCuenta',
        name: 'createAccount',
        component: createAccount
      },
      {
        path: '/home/inicio/Agendamiento',
        name: 'Agendamiento',
        component: Agendamiento
      },
      {
        path: '/home/inicio/Resumen',
        name: 'resumenCita',
        component: resumenCita
      },
      {
        path: '/home/inicio/ListarCita',
        name: 'listarCita',
        component: listarCita
      },
    ] 
  }
]

const router = new VueRouter({
  routes
})

export default router

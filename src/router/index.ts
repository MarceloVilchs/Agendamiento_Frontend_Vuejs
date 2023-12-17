import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainBase from '../views/MainBase.vue'
import MainInicio from '../views/Inicio/MainInicio.vue'
import CRUDView from '../views/CRUDView.vue'
import createAccount from '../views/createAccount.vue'
import listarCita from '../views/listarCita.vue'
import Agendamiento from '../views/Agendamiento.vue'
import resumenCita from '../views/resumenCita.vue'
import CalendarioHora from '../views/CalendarioHora.vue'



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
      { 
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
        path: '/home/inicio/agendamiento',
        name: 'Agendamiento',
        component: Agendamiento,
        
      },
      {
        path: '/home/inicio/resumen',
        name: 'resumenCita',
        component: resumenCita,
        
      },
      {
        path: '/home/inicio/listarCita',
        name: 'listarCita',
        component: listarCita, 
      },
      {
        path: '/home/inicio/CalendarioHora',
        name: 'CalendarioHora',
        component: CalendarioHora, 
        props: true // Permite pasar props a través de la ruta
      },
    ] 
  }
]

const router = new VueRouter({
  routes
})

export default router

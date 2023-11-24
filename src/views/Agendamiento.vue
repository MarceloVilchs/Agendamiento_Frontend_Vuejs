<template>
    <div class="container">
      <h1 class="text-center" style="color: white; background-color: rgb(79, 235, 162);">
        Agendamiento de Citas
      </h1>
  
      <!-- Sección de Datos del Paciente -->
      <div class="datos-paciente-container">
        <h2>Datos del Paciente</h2>
  
        <!-- Formulario -->
        <form @submit.prevent="mostrarResumen ">
          <!-- Campos del Formulario -->
          <div class="form-group">
            <label for="email">Email:</label>
            <div class="input-container">
              <input type="email" v-model="cita.email" placeholder="correo@gmail.com" required />
            </div>
          </div>
  
          <div class="form-group">
                    <label for="name">Nombre:</label>
                    <div class="input-container">
                        <input type="text" v-model="cita.name" required />
                    </div>
                </div>


                <div class="form-group">
                    <label for="last_name">Apellido:</label>
                    <div class="input-container">
                        <input type="text" v-model="cita.last_name" required />
                    </div>
                </div>

                <div class="form-group">
                    <label for="last_name2">Apellido:</label>
                    <div class="input-container">
                        <input type="text" v-model="cita.last_name2" required />
                    </div>
                </div>

                <div class="form-group">
                    <label for="fecha">Fecha:</label>
                    <div class="input-container">
                        <input type="text" v-model="cita.fecha" required />
                    </div>
                </div>

                <div class="form-group">
                    <label for="phone">Teléfono:</label>
                    <div class="input-container">
                        <input type="text" v-model="cita.phone" required />
                    </div>
                </div>

                <div class="form-group">
                    <label for="hora">Hora:</label>
                    <div class="input-container">
                        <input type="text" v-model="cita.hora" required />
                    </div>
                </div>

                <div class="form-group">
                    <label for="estado_pago">Estado Pago:</label>
                    <div class="input-container">
                        <input type="text" v-model="cita.estado_pago" required />
                    </div>
                </div>
  
          <div class="button-container">
            <button class="mt-10" style="background-color: rgb(85, 250, 173);" type="button" @click="irAtras">
              Atrás
            </button>
            <button class="mt-10" style="background-color: rgb(85, 250, 173);" type="submit" @click="mostrarResumen">
              Siguiente
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VueRouter, { RouteConfig } from "vue-router";
Vue.use(VueRouter);


interface Cita {
  email: string;
  name: string;
  last_name: string;
  last_name2: string;
  fecha: string;
  phone: string;
  hora: string;
  estado_pago: string;
}

@Component({
  name: "Agendamiento",
})
export default class Agendamiento extends Vue {
  cita: Cita = {
    email: "",
    name: "",
    last_name: "",
    last_name2: "",
    fecha: "",
    phone: "",
    hora: "",
    estado_pago: "",
  };

  mostrarResumen() {
    // Navegar a la ruta del resumen
    this.$router.push({ name: "resumenCita" });
  }

  irAtras() {
    // Lógica para ir atrás si es necesario
  }
}
</script>

<style scoped>
/* Estilos según sea necesario */
</style>
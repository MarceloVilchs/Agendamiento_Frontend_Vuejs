<template>
  <div class="container">
    <h1 class="text-center" style="color: white; background-color: rgb(79, 235, 162);">
      Agendamiento de Citas
    </h1>

    <!-- Sección de Datos del Paciente -->
    <div class="datos-paciente-container">
      <h2>Datos del Paciente</h2>

      <!-- Formulario -->
      <form @submit.prevent="mostrarResumen">
        <!-- Campos del Formulario -->
        <div class="form-group">
          <label for="email" class="text-left">Email:</label>
          <div class="input-container text-right">
            <input type="email" v-model="cita.email" placeholder="correo@gmail.com" required class="elevation-1"/>
          </div>
        </div>

        <div class="form-group">
          <label for="name" class="text-left">Nombre:</label>
          <div class="input-container text-right">
            <input type="text" v-model="cita.name" required class="elevation-1"/>
          </div>
        </div>

        <div class="form-group">
          <label for="last_name" class="text-left">Apellido(P):</label>
          <div class="input-container text-right">
            <input type="text" v-model="cita.last_name" required class="elevation-1"/>
          </div>
        </div>

        <div class="form-group">
          <label for="last_name2" class="text-left">Apellido(M):</label>
          <div class="input-container text-right">
            <input type="text" v-model="cita.last_name2" required class="elevation-1"/>
          </div>
        </div>

        <div class="form-group">
          <label for="fecha" class="text-left">Fecha:</label>
          <div class="input-container text-right">
            <input type="text" v-model="cita.fecha" required class="elevation-1"/>
          </div>
        </div>

        <div class="form-group">
          <label for="phone" class="text-left">Teléfono:</label>
          <div class="input-container text-right">
            <input type="text" v-model="cita.phone" required class="elevation-1"/>
          </div>
        </div>

        <div class="form-group">
          <label for="hora" class="text-left">Hora:</label>
          <div class="input-container text-right">
            <input type="text" v-model="cita.hora" required class="elevation-1"/>
          </div>
        </div>

        <div class="form-group">
          <label for="estado_pago" class="text-left">Estado Pago:</label>
          <div class="input-container text-right">
            <input type="text" v-model="cita.estado_pago" required class="elevation-1"/>
          </div>
        </div>

        <div class="button-container">
          <button class="mt-10  btn-secondary btn-lg rounded-pill text-white btn-grande" @click="irAtras">
            <b>Atrás</b>
          </button>
          <button class="mt-10  btn-primary btn-lg rounded-pill text-white btn-grande" type="submit">
            <b>Siguiente</b>
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Route } from "vue-router";
import resumenCita from "./resumenCita.vue";

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
    // Navegar a la ruta del resumen y pasar cita como prop
    this.$router.push({ name: 'resumenCita', params: { cita: this.cita } })
      .catch((err: any) => {
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
      });
  }

  irAtras() {
    // Navegar a la ruta de inicio
    this.$router.push({ name: 'MainInicio' })
      .catch((err: any) => {
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
      });
  }
}
</script>

<style scoped>
/* Estilos según sea necesario */
.button-container {
  display: flex;
  justify-content: space-between;
}

/* Cambiar el color del texto a blanco para los botones */
.text-white {
  color: white;
}

/* Aplicar color de fondo verde a los botones */
.btn-secondary {
  background-color: rgb(85, 250, 173);
}

.btn-grande {
  font-size: 20px; /* Ajusta el tamaño de las Letras */
  padding: 15px 20px; /* Ajusta el relleno (padding) según sea necesario */
}
.btn-primary {
  background-color: rgb(85, 250, 173);
}

.form-group {
  display: flex;
  justify-content: space-between;
  align-items: baseline; /* Alinear las etiquetas y los campos en la base */
}
</style>
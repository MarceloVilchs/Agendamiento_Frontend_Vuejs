<template>
    <div class="container">
      <h1 class="text-center" style="color: white; background-color: rgb(79, 235, 162);">
        Resumen de Cita
      </h1>
  
      <!-- Sección de Resumen de Datos del Paciente -->
      <div class="datos-paciente-container">
        <h2>Resumen de Datos del Paciente</h2>
        
        <!-- Mostrar los datos del paciente -->
        <div class="form">
          <div class="form-group">
            <label>Email:</label>
            <div class="input-container">{{ cita.email }}</div>
          </div>
  
          <div class="form-group">
            <label>Nombre:</label>
            <div class="input-container">{{ cita.name }}</div>
          </div>
  
          <div class="form-group">
            <label>Apellido:</label>
            <div class="input-container">{{ cita.last_name }}</div>
          </div>
  
          <div class="form-group">
            <label>Apellido:</label>
            <div class="input-container">{{ cita.last_name2 }}</div>
          </div>
  
          <div class="form-group">
            <label>Fecha:</label>
            <div class="input-container">{{ cita.fecha }}</div>
          </div>
  
          <div class="form-group">
            <label>Teléfono:</label>
            <div class="input-container">{{ cita.phone }}</div>
          </div>
  
          <div class="form-group">
            <label>Hora:</label>
            <div class="input-container">{{ cita.hora }}</div>
          </div>
          <button class="mt-10" style="background-color: rgb(85, 250, 173);" @click="agendarCita" type="button">
            Agendar Cita
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import axios, { AxiosRequestConfig } from "axios";
  
  @Component({
    name: "resumen-cita",
  })
  export default class ResumenCita extends Vue {
    // Propiedad para recibir los datos de la cita desde el componente padre
    cita: any = {};
  
    // Método para manejar el evento de clic en el botón Agendar
    agendarCita() {
      // Realiza la solicitud POST con los datos de la cita
      let dt = JSON.stringify(this.cita);
  
      let config: AxiosRequestConfig = {
        method: "post",
        url: process.env.VUE_APP_API + "/usuarioFormulario/usuarioFormularioP",
        data: dt,
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
          "Content-Type": "application/json",
        },
      };
  
      axios(config)
        .then((response) => {
          // Manejo de respuesta exitosa
          console.log("Respuesta del servidor:", response.data);
          // Puedes realizar acciones adicionales aquí según la respuesta del servidor
        })
        .catch((error) => {
          // Manejo de error
          if (error.response) {
            // El servidor respondió con un código de estado diferente de 2xx
            console.error("Error de respuesta del servidor:", error.response.data);
            console.error("Código de estado:", error.response.status);
          } else if (error.request) {
            // La solicitud se hizo pero no se recibió respuesta
            console.error("No se recibió respuesta del servidor");
          } else {
            // Ocurrió un error durante la configuración de la solicitud
            console.error("Error al configurar la solicitud:", error.message);
          }
        })
        .finally(() => {
          // Esta parte se ejecutará siempre, independientemente de si la solicitud fue exitosa o falló
          console.log("Solicitud completada");
        });
    }
  }
  </script>
  
  <style scoped>
  /* Agrega estilos según sea necesario */
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .datos-paciente-container {
    margin: 20px;
  }
  
  .form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  
  .input-container {
    flex: 1;
    margin-left: 10px; /* Espacio entre etiqueta y campo de entrada */
  }
  </style>
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
          <label>Apellido P:</label>
          <div class="input-container">{{ cita.last_name }}</div>
        </div>

        <div class="form-group">
          <label>Apellido M:</label>
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

        <div class="form-group">
          <label>estado_pago:</label>
          <div class="input-container">{{ cita.estado_pago }}</div>
        </div>

        <button class="mt-10 text-white btn-primary btn-lg rounded-pill btn-grande"  @click="agendarCita" type="button">
          <b>Agendar Cita</b>
        </button>
        <button class="mt-10 text-white btn-primary  rounded-pill btn-grande"  @click="irAtras" type="button">
          <b>Atrás</b>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios, { AxiosRequestConfig } from "axios";

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
  name: "resumen-cita",
})


export default class ResumenCita extends Vue {
  // Propiedad para recibir los datos de la cita desde el componente padre
  cita: Cita = this.$route.params.cita || {
    email: "",
    name: "",
    last_name: "",
    last_name2: "",
    fecha: "",
    phone: "",
    hora: "",
    estado_pago: "",
  };

  
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

  irAtras() {
    // Navegar a la ruta de inicio
    this.$router.push({ name: 'Agendamiento' })
      .catch((err: any) => {
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
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

 /* Tamaño del boton y letras */
 .btn-grande {
  font-size: 20px; /* Ajusta el tamaño de las Letras */
  padding: 15px 20px; /* Ajusta el relleno (padding) según sea necesario */
}

/* Cambiar el color del texto a blanco para los botones */
.text-white {
  color: white;
}

.btn-primary {
  background-color: rgb(85, 250, 173);
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

<template>
  <div class="container">
    <h1 class="text-center" style="color: white; background-color: rgb(79, 235, 162);">
      Resumen de Cita
    </h1>

    <!-- Sección de Resumen de Datos del Paciente -->
    <div class="datos-paciente-container">
      <h2>Datos del Paciente</h2>

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

        <!-- Sección para mostrar la fecha en ResumenCita.vue -->
        <div class="form-group">
          <label for="fecha">Fecha:</label>
          <div class="input-container">{{ formatoFecha }}</div>
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

                      <!-- Sección para mostrar mensaje después del registro exitoso -->
        <v-dialog v-model="exitDialog" persistent max-width="600">
            <v-card>
              <v-card-title>¡Cita agendada!</v-card-title>
              <v-card-text>
                <p>¡La cita se ha agendado con exito!</p>
                <p>Presione "Citas" si quiere ver el listado de sus citas o inicio si quiere volver al menu principal</p>
              </v-card-text>
              <v-card-actions>
                <button class="mt-10 text-white btn-primary btn-lg rounded-pill btn-grande"  @click="verListado">
                  <b>Citas</b>
                </button>

                <button class="mt-10 text-white btn-primary btn-lg rounded-pill btn-grande"  @click="irAInicio">
                  <b>Inicio</b>
                </button>
              </v-card-actions>
            </v-card>
          </v-dialog>



        <button class="mt-10 text-white btn-primary  rounded-pill"  @click="irAtras" type="button">
          <b>Atrás</b>
        </button>

        <!-- Sección para mostrar mensaje de error -->
        <v-dialog v-model="showDialog">
          <v-card>
            <v-card-title>Error</v-card-title>
            <v-card-text>
              Ha ocurrido un error. Por favor, inténtelo de nuevo.
            </v-card-text>
            <v-card-actions>
              <button class="mt-10 text-white btn-secondary btn-lg rounded-pill btn-grande" @click="showDialog = false">
                <b>Aceptar</b>
              </button>
            </v-card-actions>
          </v-card>
        </v-dialog>


      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios, { AxiosRequestConfig } from "axios";

interface Cita {
  // Tipo de tus datos del formulario
  email: string;
  name: string;
  last_name: string;
  last_name2: string;
  fecha: Date | null;
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
    fecha: new Date(),
    phone: "",
    hora: "",
    estado_pago: "",
  };

  exitDialog: boolean = false;
  showDialog: boolean = false;

  // Propiedad computada para formatear la fecha de manera legible
// Modifica la propiedad computada formatoFecha en resumenCita
// Asumiendo que 'this.cita.fecha' es una instancia de Date válida
get formatoFecha(): string {
  console.log("Fecha antes de formatear:", this.cita.fecha);

  const fecha = new Date(this.cita.fecha);

  if (!isNaN(fecha.getTime())) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', options);

    console.log("Fecha formateada:", fechaFormateada);
    return fechaFormateada;
  }

  console.error("Fecha no válida");
  return "Fecha no válida";
}




  // Método para manejar el evento de clic en el botón Agendar
  agendarCita() {
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
        console.log("Respuesta del servidor:", response.data);
        this.exitDialog = true;
      })
      .catch((error) => {
        console.error("Error:", error);
        // Mostrar diálogo de error
        this.showDialog = true;
      })
      .finally(() => {
        console.log("Solicitud completada");
      });
  }

  irAtras() {
    // Navegar a la ruta de inicio
    this.$router.push({ name: "Agendamiento" }).catch((err: any) => {
      if (err.name !== "NavigationDuplicated") {
        throw err;
      }
    });
  }

  public irAInicio() {
    // Navegar a la ruta de inicio
    this.$router.push({ name: "MainInicio" }).catch((err: any) => {
      if (err.name !== "NavigationDuplicated") {
        throw err;
      }
    });
  }

  public verListado() {
    // Navegar a la ruta de inicio
    this.$router.push({ name: "listarCita" }).catch((err: any) => {
      if (err.name !== "NavigationDuplicated") {
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

/* Tamaño del botón y letras */
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
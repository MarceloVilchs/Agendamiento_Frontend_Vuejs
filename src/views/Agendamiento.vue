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
          <label for="phone" class="text-left">Teléfono:</label>
          <div class="input-container text-right">
            <input type="text" v-model="cita.phone" required class="elevation-1"/>
          </div>
        </div>

            <!-- Sección para seleccionar fecha y hora -->
            <div class="form-group button-center">
          <label for="fecha" class="text-left">Fecha</label>
          <div class="input-container">
            <button class="mt-5  btn-verHoras text-white rounded-pill btn-lg" @click="abrirDialogo">Ver horas</button>
          </div>
        </div>


            <div class="button-container">
        <button class="mt-10 btn-secondary btn-lg rounded-pill text-white btn-grande" @click="irAtras">
          <b>Atrás</b>
        </button>
        <button class="mt-10 btn-primary btn-lg rounded-pill text-white btn-grande" @click="mostrarResumen">
          <b>Siguiente</b>
        </button>
      </div>

            <!-- Diálogo para mostrar CalendarioHora -->
            <v-dialog v-model="verFecha" max-width="600">
              <CalendarioHora :horasDisponibles="horasDisponibles" @fecha-seleccionada="seleccionarFecha" @hora-seleccionada="seleccionarHora" />
              <v-btn @click="cerrarDialogo">Confirmar</v-btn>
            </v-dialog>


      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { v4 as uuidv4 } from "uuid";
import CalendarioHora from "../views/CalendarioHora.vue"; // Ajusta la ruta según la ubicación de tu componente


interface Cita {
  email: string;
  name: string;
  last_name: string;
  last_name2: string;
  fecha: Date;
  phone: string;
  hora: string;
  estado_pago: string;
}

@Component({
  name: "Agendamiento",
  components: {
    CalendarioHora,
  },
})


export default class Agendamiento extends Vue {
  cita: Cita = { // Genera un _id único
    email: "",
    name: "",
    last_name: "",
    last_name2: "",
    fecha: new Date(),
    phone: "",
    hora: "",
    estado_pago: "Por Pagar",
  };

  horasDisponibles: string[] = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30"];
  verFecha: boolean = false;

  mostrarResumen() {
    // Validar que todos los campos necesarios estén completos antes de navegar
    if (!this.cita.email || !this.cita.name || !this.cita.last_name || !this.cita.last_name2 || !this.cita.phone || !this.cita.estado_pago || !this.cita.fecha || !this.cita.hora) {
      console.error("Completa todos los campos antes de continuar");
      // Puedes mostrar un mensaje de error al usuario si algún campo falta
      return;
    }

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

  seleccionarFecha(fecha: Date) {
    // Asignar la fecha formateada
    this.cita.fecha = fecha;
    console.log("Fecha seleccionada en Agendamiento:", this.cita.fecha);
  }

  seleccionarHora(hora: string) {
    this.cita.hora = hora;
  }

//Dialogo para abrir componente CalendarioHora
  abrirDialogo() {
    this.verFecha = true;
  }

  cerrarDialogo() {
    this.verFecha = false;
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

.btn-verHoras {
  background-color: rgb(85, 250, 173);
  font-size: 20px; /* Ajusta el tamaño de las Letras */
  padding: 5px 20px; /* Ajusta el relleno (padding) según sea necesario */
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

.btn-confirmars {
  background-color: rgb(14, 14, 248);
  color: white;
}
</style>
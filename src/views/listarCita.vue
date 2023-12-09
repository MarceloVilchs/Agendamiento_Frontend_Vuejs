<template>
    <div>
      <h1 class="text-center" style="color: white; background-color: rgb(79, 235, 162);">
        Listado de Citas Médicas
      </h1>
  
      <!-- Mostrar información de las citas -->
      <div v-for="cita in citas" :key="cita.name" class="cita-container">
        <!-- Información de la cita -->
        <div class="cita-info">
          <div class="info-group"><strong>Nombre Paciente</strong><br />{{ cita.name }}</div>
          <div class="info-group"><strong>Correo</strong> <br />{{ cita.email }}</div>
          <div class="info-group"><strong>Teléfono</strong> <br />{{ cita.phone }}</div>
          <div class="info-group"><strong>Fecha</strong> <br />{{ cita.fecha }}</div>
          <div class="info-group"><strong>Hora</strong> <br />{{ cita.hora }}</div>
          <div class="info-group"><strong>Estado de pago</strong><br /> {{ cita.estado_pago }}</div>
        </div>
  
        <!-- Botones al lado izquierdo -->
        <div class="cita-buttons">
          <button @click="pagarOnline(cita.name)" class="custom-btn" id="pagarBtn">
            Pagar Online
          </button>
          <button @click="editarCita(cita.name)" class="custom-btn" id="editarBtn">
            Editar
          </button>
  
          <!-- Agrega este log para verificar el ID de la cita -->
          <button @click="showCitaId(cita)" class="custom-btn" id="eliminarBtn">
            {{ cita.eliminacionEnProgreso ? 'Eliminando...' : 'Eliminar Cita' }}
            </button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from "axios";
  import { Vue, Component } from 'vue-property-decorator';
  
  @Component({
  name: "listar-cita",
})

  export default class ListarCita extends Vue {
    citas: any[] = [];
  
    mounted() {
      this.fetchCitas();
    }
  
    async fetchCitas() {
      try {
        const response = await fetch("http://localhost:8000/usuarioFormulario/usuarioFormulario/GET", {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        });
  
        const data = await response.json();
  
        // No formatear la fecha, dejarla como está en el formato original
        this.citas = data;
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    }
  
    public deleteCita(name: string) {
  try {
    const cita = this.citas.find(c => c.name === name);
    if (!cita) {
      console.error("Cita no encontrada para el nombre:", name);
      return;
    }

    cita.eliminacionEnProgreso = true;

    const config = {
      method: 'delete',
      url: `http://localhost:8000/usuarioFormulario/usuarioFormulario?name=${name}`,
      headers: {
        Authorization: `Bearer ${this.$store.state.token}`,
      },
    };

    axios(config)
      .then(response => {
        console.log(response.data.message);
        this.fetchCitas();
      })
      .catch(error => {
        console.error("Error al eliminar la cita:", error);

        // Agrega esta parte para obtener más detalles sobre el error
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
          console.error('Código de estado HTTP:', error.response.status);
        } else if (error.request) {
          console.error('No se recibió respuesta del servidor');
        } else {
          console.error('Error durante la solicitud:', error.message);
        }
      })
      .finally(() => {
        cita.eliminacionEnProgreso = false;
      });
  } catch (error) {
    console.error("Error al eliminar la cita:", error);
  }
}



    pagarOnline(citaId) {
      console.log(`Pagar Online - Cita name: ${citaId}`);
    }
  
    editarCita(citaId) {
      console.log(`Editar - Cita name: ${citaId}`);
    }

showCitaId(cita: Cita) {
    // Verificar si el nombre de la cita está definido
    if (cita && 'name' in cita && cita.name) {
      console.log('Nombre de la Cita:', cita.name);
      this.deleteCita(cita.name);
    } else {
      console.error('Error: Nombre de la cita no definido');
    }
  }
  }
  </script>
  
  
  <style scoped>
  /* Estilos opcionales para el diseño */
  .cita-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    border: 1px solid #000000;
    padding: 20px;
    margin-bottom: 10px;
    width: 100%; /* Asegura que el contenedor ocupe todo el ancho */
  }
  
  .info-group {
    flex: 0 0 calc(33.33% - 10px); /* 33.33% de ancho para cada grupo, ajusta según sea necesario */
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box; /* Evita que el margen afecte el ancho real */
  }
  
  .cita-info {
    display: flex;
    flex-wrap: wrap;
    /* Ajusta según sea necesario para el espacio entre las filas */
    margin-bottom: 10px;
  }
  
  .custom-btn {
    border-radius: 20px;
    border: 2px solid;
    padding: 10px 20px;
    margin-bottom: 10px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    /* Agregar transición a color de fondo */
  }
  
  .custom-btn:hover {
    background-color: #4caf50;
    /* Cambiar el color de fondo al pasar el ratón */
  }
  
  .cita-buttons {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Alinear botones a la izquierda */
    /* Cambiar a columna para ordenar los botones verticalmente */
  }
  </style>
  

<template>
    
    <div>
      <h1 class="text-center" style="color: white; background-color: rgb(79, 235, 162);">
        Listado de Citas Médicas
      </h1>
  
      <!-- Mostrar información de las citas -->
      <div v-for="cita in citas" :key="cita._id" class="cita-container">
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
            <button @click="cancelarCita(cita._id)" class="custom-btn" id="cancelarBtn" :disabled="cita.cancellationInProgress" >
                {{ cita.cancellationInProgress ? 'Cancelando...' : 'Cancelar Cita' }}
            </button>

        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
import { ObjectId } from "bson";
import axios from "axios";
  
  export default {
    data() {
      return {
        citas: [], // Aquí se almacenarán las citas obtenidas del servidor
      };
    },
    mounted() {
      // Llamada al método GET para obtener las citas
      this.fetchCitas();
    },
    methods: {


      // Método GET para obtener las citas de la base de datos
      async fetchCitas() {
        try {
          // Realizar la llamada al endpoint para obtener las citas
          const response = await fetch("http://localhost:8000/usuarioFormulario/usuarioFormulario/GET", {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        });
        const data = await response.json();
          // Asignar las citas a la propiedad citas
          this.citas = data;
        } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    },



     //Método DELETE para borrar la cita de la base de datos
     async cancelarCita(cita) {
      try {
        // Obtener el ID de la cita del objeto cita
        const citaId = cita._id;

        // Verificar si el ID de la cita es válido
        if (!cita || !cita._id) {
      console.error("Cita no válida o sin ID");
      return;
    }
    

        // Configuración para la solicitud DELETE
        const config = {
          method: 'DELETE',
          url: `http://localhost:8000/usuarioFormulario/usuarioFormulario/${citaId}`,
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        };

        // Realizar la solicitud DELETE
        const response = await axios(config);

        if (response.status === 200) {
          console.log(`Cita ID ${citaId} cancelada con éxito.`);
          // Actualizar la lista de citas después de la cancelación
          this.fetchCitas();
        } else {
          console.error(`Error al cancelar la cita ID ${citaId}: ${response.statusText}`);
          // Restaurar el estado en caso de error
          this.citas = this.citas.map((c) => ({ ...c, cancellationInProgress: false }));
        }
      } catch (error) {
        console.error("Error al cancelar la cita:", error);
        // Restaurar el estado en caso de error
        this.citas = this.citas.map((c) => ({ ...c, cancellationInProgress: false }));
      }
    },

      pagarOnline(name) {
        console.log(`Pagar Online - Cita ID: ${name}`);
      },
      editarCita(name) {
        console.log(`Editar - Cita ID: ${name}`);
      },

    },
  };
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
  
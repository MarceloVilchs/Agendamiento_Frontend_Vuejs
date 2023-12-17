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

        <!-- Boton para editar -->
        <button @click="openEditHoraDialog(cita)" class="custom-btn" id="editarBtn">
          Editar
        </button>

        <!-- boton para eliminar cita -->
        <button @click="showConfirmationDialog(cita)" class="custom-btn" id="eliminarBtn">
          {{ cita.eliminacionEnProgreso ? 'Eliminando...' : 'Eliminar Cita' }}
        </button>
      </div>
    </div>

<!-- Cuadro de diálogo de edición -->
<div v-if="showDialogEdit" class="dialog-container">
  <!-- Campos de edición -->
  <div class="edit-field">
    <label for="edit-name">Nombre:</label>
    <input v-model="citaToEdit.name" id="edit-name" class="edit-input" placeholder="Nombre" />
  </div>
  <div class="edit-field">
    <label for="edit-last-name">Apellido:</label>
    <input v-model="citaToEdit.last_name" id="edit-last-name" class="edit-input" placeholder="Apellido" />
  </div>
  <div class="edit-field">
    <label for="edit-last-name2">Apellido materno:</label>
    <input v-model="citaToEdit.last_name2" id="edit-last-name2" class="edit-input" placeholder="Apellido materno" />
  </div>
  <div class="edit-field">
    <label for="edit-email">Correo Electrónico:</label>
    <input v-model="citaToEdit.email" id="edit-email" class="edit-input" placeholder="Correo Electrónico" />
  </div>
  <div class="edit-field">
    <label for="edit-phone">Teléfono:</label>
    <input v-model="citaToEdit.phone" id="edit-phone" class="edit-input" placeholder="Teléfono" />
  </div>

  <!-- Botones de acción -->
  <div class="edit-buttons">
    <button class="save-btn" @click="editarCita">Guardar</button>
    <button class="cancel-btn" @click="cerrarDialogoEdicion">Cancelar</button>
  </div>
</div>


    <!-- Cuadro de diálogo de confirmación -->
    <div v-if="showDialog" class="dialog-container">
      <p>
        {{ citaToDelete ? '¿Estás seguro de eliminar esta cita?' : '¿Estás seguro de editar esta cita?' }}
      </p>
      <button v-if="citaToDelete" @click="confirmDeleteCita" class="confirm-btn">Sí, eliminar</button>
      <button @click="cancelDeleteCita" class="cancel-btn">Cancelar</button>

    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'ListarCita',
  components: {
  },
})

export default class ListarCita extends Vue {
  citas: any[] = [];
  showDialog: boolean = false;
  citaToDelete: any | null = null;
  citaToEdit: any | null = null;
  verFecha: boolean = false;
  showDialogEdit: boolean = false;




  mounted() {
    this.fetchCitas();
  }
  /*---------------------------------------------------*/

  /*----------- METODO GET ---------------*/
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

  /*---------------------------------------------------*/

  /*--------- METODO DELETE ------------*/
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
  /*---------------------------------------------------*/

  /*--------- METODO PUT ------------*/

  // Método para guardar los cambios en la cita
  editarCita() {
  // Validar la cita editada
  if (!this.validarCita(this.citaToEdit)) {
    // Muestra un mensaje al usuario indicando que los datos no son válidos
    console.error('Los datos de la cita no son válidos');
    return;
  }

  // Realiza la lógica para actualizar la cita en la base de datos
  const nombreUsuario = this.citaToEdit.name; // Nombre del usuario que se está editando

  // Construir el objeto de datos a enviar en la solicitud PUT
  const data = {
    name: this.citaToEdit.name,
    last_name: this.citaToEdit.last_name,
    last_name2: this.citaToEdit.last_name2,
    email: this.citaToEdit.email,
    phone: this.citaToEdit.phone,
    // Agrega otros campos según sea necesario
  };

  const url = `http://localhost:8000/usuarioFormulario/usuarioFormulario/PUT?nombre=${nombreUsuario}`;
  const params = { nombre: nombreUsuario };
  const headers = {
    Authorization: `Bearer ${this.$store.state.token}`,
    'Content-Type': 'application/json',
  };

  axios.put(url, data, { params, headers })
    .then(response => {
      console.log('Cita actualizada exitosamente:', response.data.message);

      // Puedes realizar acciones adicionales después de la actualización

      // Después de guardar, cierra el diálogo
      this.cerrarDialogoEdicion();
    })
    .catch(error => {
      console.error('Error al actualizar la cita:', error);

      // Muestra errores específicos o un mensaje genérico al usuario
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
        console.error('Código de estado HTTP:', error.response.status);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor');
      } else {
        console.error('Error durante la solicitud:', error.message);
      }

      // Si necesitas revertir los cambios en la interfaz, puedes hacerlo aquí
    });
}



validarCita(cita: any): boolean {
  // Agrega lógica de validación según tus necesidades
  // Por ejemplo, verifica que los campos obligatorios estén presentes y tengan datos válidos

  if (!cita || !cita.name || !cita.email || !cita.phone) {
    return false;
  }

  return true;
}

openEditHoraDialog(cita: any) {
  if (cita) {
    this.showDialogEdit = true;
    this.citaToEdit = cita;
  }
}

  // Método para cerrar el diálogo de edición
  cerrarDialogoEdicion() {
    this.showDialogEdit = false;
    this.citaToEdit = null;
  }  
  /*---------------------------------------------------*/

  pagarOnline(citaId) {
    console.log(`Pagar Online - Cita name: ${citaId}`);
  }

  /*          cuadros de dialogo DELETE                        */

  // Método para mostrar el cuadro de diálogo de confirmación
  showConfirmationDialog(cita: any) {
    this.showDialog = true;
    this.citaToDelete = cita;
  }

  // Método para confirmar la eliminación
  confirmDeleteCita() {
    if (this.citaToDelete) {
      this.deleteCita(this.citaToDelete.name);
      this.citaToDelete = null;
    }
    this.showDialog = false;
  }

  // Método para cancelar la eliminación
  cancelDeleteCita() {
    this.showDialog = false;
    this.citaToDelete = null;
  }

  /*          cuadros de dialogo PUT                     */


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
  width: 100%;
  /* Asegura que el contenedor ocupe todo el ancho */
}

.info-group {
  flex: 0 0 calc(33.33% - 10px);
  /* 33.33% de ancho para cada grupo, ajusta según sea necesario */
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  /* Evita que el margen afecte el ancho real */
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
  align-items: flex-start;
  /* Alinear botones a la izquierda */
  /* Cambiar a columna para ordenar los botones verticalmente */
}


/*Dialogo de confirmacion en la eliminacion de datos*/
.dialog-container {
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.confirm-btn {
  cursor: pointer;
  padding: 10px 20px;
  margin: 0 10px;
  background-color: red;
  color: white;
  /* Cambia el color del texto */
}

.cancel-btn {
  cursor: pointer;
  padding: 10px 20px;
  margin: 0 10px;
  background-color: grey;
  color: white;
  /* Cambia el color del texto */}
 /* Ajustes de estilo para el cuadro de diálogo de edición */
.edit-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.edit-field label {
  font-weight: bold;
  margin-bottom: 5px;
}

/* Alinea el texto de los campos a la derecha */
.edit-field input {
  text-align: right;
}

/* Estilo específico para los campos de edición */
.edit-field input {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  margin-top: 5px;
  font-size: 14px;
}

/* Alinea los botones al final con espacio entre ellos */
.edit-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

/* Estilo para el botón Guardar */
.save-btn {
  background-color: #3498db; /* Azul */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-btn:hover {
  background-color: #2980b9; /* Cambio de color al pasar el ratón */
}

/* Estilo para el botón Cancelar */
.cancel-btn {
  background-color: #95a5a6; /* Gris */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-btn:hover {
  background-color: #7f8c8d; /* Cambio de color al pasar el ratón */
}
</style>
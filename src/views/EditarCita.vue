<template>
    <div class="editar-cita-dialog">
      <h2>Editar Cita</h2>
  
      <!-- Campos de edición -->
      <label for="nombre">Nombre:</label>
      <input v-model="citaEditada.name" type="text" id="nombre" />
  
      <label for="telefono">Teléfono:</label>
      <input v-model="citaEditada.phone" type="text" id="telefono" />
  
      <label for="email">Correo:</label>
      <input v-model="citaEditada.email" type="text" id="email" />
  
      <!-- Otros campos según tu estructura de datos -->
  
      <!-- Botones -->
      <button @click="guardarEdicion">Guardar</button>
      <button @click="cerrarDialogo">Cancelar</button>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      dialogoEdicion: Boolean,
      citaEditada: Object,
    },
    data() {
      return {
        // Se utiliza una copia de la cita para no modificar la original directamente
        citaEditada: { ...this.citaEditada },
      };
    },
    methods: {
      guardarEdicion() {
        // Emitir el evento para indicar que se deben guardar los cambios
        this.$emit('guardar-cambios', this.citaEditada);
  
        // Cerrar el diálogo después de guardar los cambios
        this.$emit('cerrar');
      },
      cerrarDialogo() {
        // Emitir el evento para indicar que se debe cerrar el diálogo sin guardar cambios
        this.$emit('cerrar');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para el diálogo de edición */
  .editar-cita-dialog {
    /* Agrega estilos según tus preferencias */
  }
  </style>
  
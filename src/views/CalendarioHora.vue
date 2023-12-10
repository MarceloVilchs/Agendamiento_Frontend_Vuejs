<template>
  <div class="calendario-hora-container">
    <!-- Mostrar el calendario -->
    <v-date-picker v-model="fechaSeleccionada" @input="cambiarFecha"></v-date-picker>

    <!-- Mostrar cuadro con horas disponibles -->
    <div class="horas-container">
      <div class="horas-titulo">Horas Disponibles</div>
      <div v-for="hora in horasDisponibles" :key="hora">
        <button @click="seleccionarHora(hora)" :disabled="horaSeleccionada === hora">
          {{ hora }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { VDatePicker } from "vuetify/lib";

@Component({
  components: {
    VDatePicker,
  },
  name: "CalendarioHora",
})
export default class CalendarioHora extends Vue {
  @Prop({ default: [] }) horasDisponibles!: string[];

  // Define la propiedad fechaSeleccionada
  fechaSeleccionada: string | null = null;
  horaSeleccionada: string | null = null;

  // Usa la decorador @Watch para detectar cambios en fechaSeleccionada
  @Watch('fechaSeleccionada')
  onFechaSeleccionadaChanged(newDate: string, oldDate: string) {
    this.cambiarFecha();
  }

  cambiarFecha() {
    if (this.fechaSeleccionada) {
      this.$emit("fecha-seleccionada", this.fechaSeleccionada);
    } else {
      console.error('Fecha seleccionada no válida');
      this.$emit("fecha-seleccionada-error", 'Fecha seleccionada no válida');
    }

    this.horaSeleccionada = null;
  }

  seleccionarHora(hora: string) {
    this.$emit("hora-seleccionada", hora);
    this.horaSeleccionada = hora;
  }
}
</script>

<style scoped>
.calendario-hora-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: white;
}

.horas-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.horas-titulo {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.horas-container button {
  background-color: rgb(85, 250, 173);
  color: white;
  padding: 8px;
  cursor: pointer;
}

.horas-container button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>
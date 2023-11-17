<template>
    <div>
        <h1 class="text-center"  style="color: white; background-color: rgb(79, 235, 162);">Listado de Citas Médicas</h1>

        <!-- Mostrar información de las citas -->
        <div v-for="cita in citas" :key="cita.id" class="cita-container">
            <!-- Información de la cita -->
            <div class="cita-info">
                <div class="info-group"><strong>Nombre Paciente</strong><br />{{ cita.nombre }}</div>
                <div class="info-group"><strong>Correo</strong> <br />{{ cita.correo }}</div>
                <div class="info-group"><strong>Teléfono</strong> <br />{{ cita.telefono }}</div>
                <div class="info-group"><strong>Fecha</strong> <br />{{ cita.fecha }}</div>
                <div class="info-group"><strong>Hora</strong> <br />{{ cita.hora }}</div>
                <div class="info-group"><strong>Estado de pago</strong><br /> {{ cita.pago }}</div>
            </div>

            <!-- Botones al lado izquierdo -->
            <div class="cita-buttons">
                <button @click="pagarOnline(cita.nombre)" class="custom-btn" id="pagarBtn">
                    Pagar Online
                </button>
                <button @click="editarCita(cita.nombre)" class="custom-btn" id="editarBtn">
                    Editar
                </button>
                <button @click="cancelarCita(cita.nombre)" class="custom-btn" id="cancelarBtn">
                    Cancelar Cita
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
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
        // Método para obtener las citas del servidor (simulado aquí)
        fetchCitas() {
            // Simulación de datos de ejemplo
            const citasEjemplo = [
                { fecha: '2023-11-05', hora: '15:30', pago: 'Por Pagar', nombre: 'Juan Perez Carcamo', telefono: 987654321, correo: 'juan@gmail.com' },
                { fecha: '2023-11-05', hora: '15:30', pago: 'Por Pagar', nombre: 'María Lopez Rodriguez', telefono: 987654321, correo: 'maria@gmail.com' },
            ];
            this.citas = citasEjemplo;
        },
        pagarOnline(nombre) {
            console.log(`Pagar Online - Cita ID: ${nombre}`);
        },
        editarCita(nombre) {
            console.log(`Editar - Cita ID: ${nombre}`);
        },
        cancelarCita(nombre) {
            console.log(`Cancelar Cita - Cita ID: ${nombre}`);
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
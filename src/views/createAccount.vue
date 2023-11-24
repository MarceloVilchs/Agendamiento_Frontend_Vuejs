<template>
  <div class="form-container">
    <v-row justify="center" class="text-center">
      <v-col col="12" sm="6" md="6">
        <h1>Registro de cuenta</h1>
        <form @submit.prevent="registerAccount">
          <div class="form-group mt-10 text-right mx-auto">
            <label for="email" class="custom-label text-left">Correo electrónico: </label>
            <input type="email" id="email" v-model="formData.email" placeholder="correo@gmail.com" required
              class="elevation-1">
          </div>

          <div class="form-group mt-5 text-right mx-auto">
            <label for="pass_" class="custom-label text-left">Contraseña: </label>
            <input type="password" id="pass_" v-model="formData.pass_" required class="elevation-1">
          </div>

          <div class="form-group mt-5 text-right mx-auto">
            <label for="pass_confirm" class="custom-label text-left">Confirmar Contraseña: </label>
            <input type="password" id="pass_confirm" v-model="formData.pass_confirm" required class="elevation-1">
          </div>

          <h2 class="mt-10">Datos Personales</h2>

          <div class="form-group mt-5 text-right mx-auto">
            <label for="name" class="custom-label text-left">Nombre: </label>
            <input type="text" id="name" v-model="formData.name" placeholder="Nombre" required class="elevation-1">
          </div>

          <div class="form-group mt-5 text-right mx-auto">
            <label for="last_name" class="custom-label text-left">Apellido Paterno: </label>
            <input type="text" id="last_name" v-model="formData.last_name" placeholder="Apellido Paterno" required
              class="elevation-1">
          </div>

          <div class="form-group mt-5 text-right mx-auto">
            <label for="last_name2" class="custom-label text-left">Apellido Materno: </label>
            <input type="text" id="last_name2" v-model="formData.last_name2" placeholder="Apellido Materno" required
              class="elevation-1">
          </div>

          <div class="form-group mt-5 text-right mx-auto">
            <label for="run" class="custom-label text-left">RUT: </label>
            <input type="text" id="run" v-model="formData.run" placeholder="12345678-9" required class="elevation-1">
          </div>

          <div class="form-group mt-5 text-right mx-auto">
            <label for="phone" class="custom-label text-left">Teléfono Celular: </label>
            <input type="text" id="phone" v-model="formData.phone" placeholder="987654321" required class="elevation-1">
          </div>

          <div class="form-group mt-5 text-right mx-auto">
            <label for="phone2" class="custom-label text-left">Teléfono Fijo: </label>
            <input type="text" id="phone2" v-model="formData.phone2" placeholder="XX1234567" class="elevation-1">
          </div>

          <v-btn class="mt-10" style="background-color: rgb(85, 250, 173);" type="submit">
            Registrar
          </v-btn>

          <v-dialog v-model="showDialog">
            <v-card>
              <v-card-title>Contraseñas no coinciden</v-card-title>
              <v-card-text>
                Las contraseñas que ingresaste no coinciden. Por favor, corrige la contraseña.
              </v-card-text>
              <v-card-actions>
                <v-btn @click="showDialog = false">Aceptar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </form>
      </v-col>
    </v-row>
  </div>
</template>
  
<style>
.custom-label {
  margin-bottom: 10px;
  padding-right: 300px;
}

.form-container {
  display: flex;
  justify-content: center;
  max-width: 600px;
  /* Ajusta el ancho máximo según sea necesario */
  margin: 0 auto;
  /* Centra el contenedor */
}

.form-group {
  width: 100%;
  max-width: 400px;
  /* Ajusta según sea necesario */
  margin: 0 auto;
  /* Centra el formulario */
}

.elevation-1 {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
  


<script lang="ts">
import axios, { AxiosRequestConfig } from "axios";
import { Vue, Component } from "vue-property-decorator";


interface FormData {
  email: string;
  pass_: string;
  pass_confirm: string;
  name: string;
  last_name: string;
  last_name2: string;
  run: string;
  phone: string;
  phone2: string;
}

@Component({
  name: "registros",
})
export default class createAccount extends Vue {
  formData: FormData = {
    email: "",
    pass_: "",
    pass_confirm: "",
    name: "",
    last_name: "",
    last_name2: "",
    run: "",
    phone: "",
    phone2: "",
  };

  showDialog: boolean = false;

  mounted(): void {
    this.postData(); // Llamada al método postData
  }

  public registerAccount() {
    // Código del método registerAccount...
    let dt = JSON.stringify(this.formData);

    let config: AxiosRequestConfig = { // Definición de la variable config
      method: "post",
      url: process.env.VUE_APP_API + "/createAccount/createAccount1",
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

  private postData(): void {
    // Aquí puedes realizar acciones en el método postData
  }
}
</script>
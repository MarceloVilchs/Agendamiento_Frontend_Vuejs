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
            <label for="phone2" class="custom-label text-left">Teléfono Fijo (OPCIONAL): </label>
            <input type="text" id="phone2" v-model="formData.phone2" placeholder="XX1234567" class="elevation-1">
          </div>

          <button class="mt-10 text-white btn-register btn-lg rounded-pill btn-grande"  type="submit">
            <b>Registrar</b>
          </button>

              <!-- Sección para mostrar mensaje después del registro exitoso -->
              <v-dialog v-model="exitDialog" persistent max-width="600">
            <v-card>
              <v-card-title>Registro Exitoso</v-card-title>
              <v-card-text>
                <p>¡Registrado con éxito!</p>
              </v-card-text>
              <v-card-actions>
                <button class="mt-10 text-white btn-primary btn-lg rounded-pill btn-grande"  @click="irAInicio">
                  <b>Aceptar</b>
                </button>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="showDialog" persistent max-width="600">
            <v-card>

              <v-card-title>Contraseñas no coinciden</v-card-title>
              <v-card-text>
                Las contraseñas que ingresaste no coinciden. Por favor, corrige la contraseña.
              </v-card-text>

              <v-card-actions>
                <button class="mt-10 text-white btn-secondary btn-lg rounded-pill btn-grande"  @click="showDialog = false">
                  <b>Aceptar</b>
                </button>
              </v-card-actions>

              
            </v-card>
          </v-dialog>
        </form>
      </v-col>
    </v-row>
  </div>
</template>
  

<script lang="ts">
import axios, { AxiosRequestConfig } from "axios";
import { Vue, Component } from "vue-property-decorator";
import * as bcrypt from "bcrypt"; // Importa bcrypt


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
  exitDialog: boolean = false;

  public async registerAccount() {
    try {
      // Verificar si las contraseñas coinciden
      if (this.formData.pass_ !== this.formData.pass_confirm) {
        // Mostrar el diálogo si las contraseñas no coinciden
        this.showDialog = true;
        return;
      }


      // Realizar el registro y manejar la respuesta exitosa
      await this.postData();
      
      // Registro exitoso
      this.exitDialog = true;
    } catch (error) {
      // Manejar errores en la solicitud
      console.error("Error en el registro:", error);
    }
  }


  public irAInicio() {
    // Navegar a la ruta de inicio
    this.$router.push({ name: 'MainInicio' })
      .catch((err: any) => {
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
      });
  }

  private postData(): Promise<void> {
    // Devolver una promesa desde el método
    return new Promise<void>(async (resolve, reject) => {
      try {
        // Tu lógica de envío de datos con axios aquí
        let dt = JSON.stringify(this.formData);

        let config: AxiosRequestConfig = {
          method: "post",
          url: process.env.VUE_APP_API + "/createAccount/createAccount1",
          data: dt,
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
            "Content-Type": "application/json",
          },
        };

        await axios(config);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
</script>


/* Estilos destinado a la interfaz */
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

 /* Tamaño del boton y letras */
.btn-grande {
  font-size: 20px; /* Ajusta el tamaño de las Letras */
  padding: 15px 20px; /* Ajusta el relleno (padding) según sea necesario */
}

/* Cambiar el color del texto a blanco para los botones */
.text-white {
  color: white;
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

.btn-primary {
  background-color: rgb(85, 250, 173);
}

.btn-secondary {
  background-color: rgb(85, 250, 173);
}

.btn-register {
  background-color: rgb(85, 250, 173);
}
</style>
  

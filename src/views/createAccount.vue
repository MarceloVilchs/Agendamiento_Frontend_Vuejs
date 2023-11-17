<template>
	<v-row justify="center" class="text-center">
		<v-col col="12" sm="6" md="6">
			<h1>Registro de cuenta</h1>
			<form @submit.prevent="register">
				<!-- Correo electrónico -->
				<div class="form-group mt-10 text-right mx-auto">
					<label for="email" class="custom-label text-left">Correo electrónico: </label>
					<input type="email" id="email" v-model="formData.email" placeholder="correo@gmail.com" required
						class="elevation-1">
				</div>

				<!-- Contraseña -->
				<div class="form-group mt-5 text-right mx-auto">
					<label for="pass" class="custom-label text-left">Contraseña: </label>
					<input type="password" id="pass" v-model="formData.pass" required class="elevation-1">
				</div>

				<div class="form-group mt-5 text-right mx-auto">
					<label for="pass_confirm" class="custom-label text-left">Confirmar Contraseña: </label>
					<input type="password" id="pass_confirm" v-model="formData.pass_confirm" required class="elevation-1">
				</div>


				<h2 class="mt-10">Datos Personales</h2>

				<!-- Nombre -->
				<div class="form-group mt-5 text-right mx-auto">
					<label for="name" class="custom-label text-left">Nombre: </label>
					<input type="text" id="name" v-model="formData.name" placeholder="Nombre" required class="elevation-1">
				</div>

				<!-- Apellido Paterno -->
				<div class="form-group mt-5 text-right mx-auto">
					<label for="last_name" class="custom-label text-left">Apellido Paterno: </label>
					<input type="text" id="last_name" v-model="formData.last_name" placeholder="Apellido Paterno" required
						class="elevation-1">
				</div>

				<!-- Apellido Materno -->
				<div class="form-group mt-5 text-right mx-auto">
					<label for="last_name2" class="custom-label text-left">Apellido Materno: </label>
					<input type="text" id="last_name2" v-model="formData.last_name2" placeholder="Apellido Materno" required
						class="elevation-1">
				</div>

				<!-- RUT -->
				<div class="form-group mt-5 text-right mx-auto">
					<label for="run" class="custom-label text-left">RUT: </label>
					<input type="text" id="run" v-model="formData.run" placeholder="12345678-9" required
						class="elevation-1">
				</div>

				<!-- Teléfono Celular -->
				<div class="form-group mt-5 text-right mx-auto">
					<label for="phone" class="custom-label text-left">Teléfono Celular: </label>
					<input type="text" id="phone" v-model="formData.phone" placeholder="987654321" required
						class="elevation-1">
				</div>

				<!-- Teléfono Fijo -->
				<div class="form-group mt-5 text-right mx-auto">
					<label for="phone2" class="custom-label text-left">Teléfono Fijo: </label>
					<input type="text" id="phone2" v-model="formData.phone2" placeholder="XX1234567" class="elevation-1">
				</div>

				<!-- Botón de Registro -->
				<v-btn class="mt-10" style="background-color: rgb(85, 250, 173);" type="submit">Registrar</v-btn>

				<!-- Dialogo sobre que las contraseñas coinciden -->
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
</template>
  

  
<style>
.custom-label {
	margin-bottom: 10px;
	/* Ajusta el valor según la separación deseada */
	padding-right: 300px;
	/* Espacio entre el texto y el campo de entrada */

}
</style>

<script>
export default {
	data() {
		return {
			formData: {
				email: '',
				pass: '',
				pass_confirm: '',
				name: '',
				last_name: '',
				last_name2: '',
				run: '',
				phone: '',
				phone2: '',

			},
			passwordsDoNotMatch: false,
			showDialog: false, // Variable para controlar el diálogo modal
		};
	},

	methods: {
		//Aca se verifica si las contraseñas se repiten 
		checkPasswords() {
			// Aquí comprobamos si las contraseñas coinciden
			if (this.formData.pass !== this.formData.pass_confirm) {
				this.passwordsDoNotMatch = true;
				this.showDialog = true; // Mostrar el diálogo
			} else {
				this.passwordsDoNotMatch = false;
				// Continuar con el registro si las contraseñas coinciden
				this.register();
			}
		},

		register() {
			// Aquí puedes agregar la lógica para enviar el correo electrónico al servidor
			// y realizar validaciones adicionales si es necesario.
			if (this.formData.pass !== this.formData.pass_confirm) {
				this.passwordsDoNotMatch = true;
				return; // Detenemos el registro
			}

		}



	}
};

</script>
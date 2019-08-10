<template>
	<div class="d-flex justify-content-center align-items-center">
		<div class="col-12 col-lg-5">
			<form @submit.prevent="singUp">
				<div class="form-group">
					<b>Sign UP</b>
				</div>
				<div class="form-group">
					<input type="text" name="name" placeholder="Name" class="form-control" v-model="form.name">
				</div>
				<div class="form-group">
					<input type="text" name="email" placeholder="E-mail" class="form-control" v-model="form.email">
				</div>
				<div class="form-group">
					<input type="password" name="password" placeholder="Password" class="form-control" v-model="form.password">
				</div>
				<div class="form-group">
					Al you ready have an account? <router-link to="/">Sign In</router-link>
				</div>
				<div class="form-group">
					<button class="btn btn-primary">Sign In</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				form: {
					name: null,
					email: null,
					password: null
				}
			}
		},

		methods: {
			singUp() {
				axios.post('http://localhost:3000/api/user/sign_up', {
					name: this.form.name,
					email: this.form.email,
					password: this.form.password
				})
				.then(response => {
					this.$router.replace('/');
				})
				.catch(err => {
					console.log(err)
				});
			}
		}
	}
</script>
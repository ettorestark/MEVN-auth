<template>
	<div class="d-flex justify-content-center align-items-center">
		<div class="col-12 col-lg-5">
			<form @submit.prevent="signIn">
				<div class="form-group">
					<b>Sign In</b>
				</div>
				<div class="form-group">
					<input type="text" name="email" placeholder="E-mail" class="form-control" v-model="form.email">
				</div>
				<div class="form-group">
					<input type="password" name="password" placeholder="Password" class="form-control" v-model="form.password">
				</div>
				<div class="form-group">
					You don't have an account? <router-link to="/sign_up">Sign Up</router-link>
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
					email: null,
					password: null
				}
			}
		},

		methods: {
			signIn() {
				axios.post('http://localhost:3000/api/user/sign_in', {
					email: this.form.email,
					password: this.form.password
				})
				.then(response => {
					console.log(response.data.token);
				})
				.catch(err => {
					console.log(err)
				});
			}
		}
	}
</script>
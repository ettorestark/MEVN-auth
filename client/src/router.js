import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: () => import('./views/SignIn.vue')
		},
		{
			path: '/sign_up',
			component: () => import('./views/SignUp.vue')
		}
	]
})

export default router;
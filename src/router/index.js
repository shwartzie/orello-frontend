import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import boards from '../views/boards.vue'
import aboutPage from '../views/about-page.vue'
import boardPreview from '../components/board-preview.vue'
const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: homePage
		},
		{
			path: '/about',
			name: 'about',
			component: aboutPage
		},
		{
			path: '/board/:id',
			name: 'board-preview',
			component: boardPreview
		},
		{
			path: '/boards',
			name: 'boards',
			component: boards
		}
		// {
		//   path: '/login',
		//   name: 'loginSignup',
		//   component: loginSignup
		// },
		// {
		//   path: '/user/:id',
		//   name: 'user-details',
		//   component: userDetails
		// }
		// {
		//   path: '/toy/:id',
		//   name: 'toy-details',
		//   component:toyDetails,
		// },
		// {
		//   path: '/toy/edit/:id?',
		//   name: 'toy-edit',
		//   component: toyEdit,
		// },
	]
})

export default router

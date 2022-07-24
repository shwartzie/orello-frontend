import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import boards from '../views/boards.vue'
import aboutPage from '../views/about-page.vue'
import signup from '../views/signup.vue'
import login from '../views/login.vue'
import boardPreview from '../views/board-preview.vue'
import taskModal from '../components/task-cmps/task-modal.vue'

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
			path: '/board/:_id',
			name: 'board-preview',
			component: boardPreview,
			children: [
				{
					path: 'group/:groupId/task/:id',
					component: taskModal
				}
			]
		},
		{
			path: '/boards',
			name: 'boards',
			component: boards
		},
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/signup',
			name: 'signup',
			component: signup
		}
		// {
		// 	path: 'board/task/:id/:title',
		// 	name: 'taskModal',
		// 	component: taskModal
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

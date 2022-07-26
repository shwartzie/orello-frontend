import { createStore } from 'vuex'
import {boardStore} from './modules/board.module'
import {userStore} from './modules/user.module.js'

// create a store instance
export const store = createStore({
	strict: true,
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		boardStore,
		userStore
	}
})

export default store

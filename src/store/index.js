import { createStore } from 'vuex'
import {boardStore} from './modules/board.module'

// create a store instance
export const store = createStore({
	strict: true,
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		boardStore
	}
})

export default store

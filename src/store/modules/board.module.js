import { boardService } from '../../services/board.service'
import { utilService } from '../../services/util.service'
export const boardStore = {
	strict: true,
	state: {
		boards: boardService.query(),
		currBoard: null,
		staticBoardsToShow: boardService.getStaticBoards(),
		group: null,
		task: null
	},
	getters: {
		boards(state) {
			return state.boards
		},
		currBoard(state) {
			return state.currBoard
		},
		group(state) {
			return state.group
		},
		task(state) {
			return state.task
		},
		staticBoardsToShow(state) {
			return state.staticBoardsToShow
		},
		async viewedBoards(state) {
			const boards = await state.boards
			const viewedBoards = boards.filter(board => board.isRecentlyViewed)
			return viewedBoards
		}
	},
	mutations: {
		setCurrBoard(state, { board }) {
			console.log(board)

			state.currBoard = board
		},
		setBoards(state, { viewedBoards }) {
			state.boards = viewedBoards
		},
		updateStarredBoard(state, { starredStatus }) {
			state.currBoard.isStarred = starredStatus
		},
		addGroup(state, { currBoard, group }) {
			currBoard.groups.push(group)
			state.currBoard = currBoard
		},
		addTask(state, { currBoard }) {
			
			state.currBoard = currBoard
		},
		updateTask(state, { currBoard }) {
			state.currBoard = currBoard
		},

		setCurrTask(state, taskToAdd) {
			state.task = taskToAdd
		},
		setCurrGroup(state, currGroup) {
			state.group = currGroup
		}
	},
	actions: {
		async setBoardById({ commit }, _id) {
			const board = await boardService.getBoardById(_id)
			commit({ type: 'setCurrBoard', board })
		},
		async setCurrBoard({ commit }, { board }) {
			debugger
			await boardService.add(board)
			commit({ type: 'setCurrBoard', board })
		},
		async setTaskById({ commit, state }, id) {
			const currBoard = state.currBoard
			const task = await boardService.getTaskById(id, currBoard)
		},

		async setBoards({ commit }, { viewedBoards, board }) {
			if (!viewedBoards.includes(board)) {
				board.isRecentlyViewed = true
				const updatedBoard = await boardService.add(board)
				viewedBoards.unshift(updatedBoard)
			}
			if (viewedBoards.length === 4) {
				viewedBoards.pop()
			}
			commit({ type: 'setBoards', viewedBoards })
		},
		async setBoard({ commit }, { board, starredStatus }) {
			await boardService.add({ ...board }, starredStatus)
			commit({ type: 'updateStarredBoard', starredStatus })
		},
		async addGroup({ commit }, { currBoard, group }) {
			const board = JSON.parse(JSON.stringify(currBoard))
			board.groups.push(group)
			await boardService.add(board)
			commit({ type: 'addGroup', currBoard, group })
		},

		async updateGroup({ commit }, { currBoard, currGroup, taskToAdd }) {
			const board = JSON.parse(JSON.stringify(currBoard))
			board.groups.push(currGroup)

			await boardService.add(board)
			commit({ type: 'addGroup', currBoard, group })
		},
		async addTask({ commit }, { currBoard, currGroup, taskTitle }) {
			currBoard.groups.forEach(group => {
				if (group.id === currGroup.id) {
					group.tasks.push({
						id: utilService.makeId(),
						title: taskTitle
					})
				}
			})
			currGroup.tasks.push({
				id: utilService.makeId(),
				title: taskTitle
			})
			currBoard.groups.forEach(group => {
				if (group.id === currGroup.id) {
					group = currGroup
				}
			})
			await boardService.add(currBoard)
			commit({ type: 'addTask', currBoard})
		},

		async updateTask({ commit }, { currBoard, currGroup }) {
			currBoard.groups.forEach((group, idx) => {
				if (group.id === currGroup.id) {
					currBoard.groups[idx] = currGroup
				}
			})
			console.log('currGroup:', currGroup)
			await boardService.add(currBoard)
			commit({ type: 'updateTask', currBoard })
		}
	},
	modules: {}
}

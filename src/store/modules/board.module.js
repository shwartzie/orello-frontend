import { boardService } from '../../services/board.service'
import { utilService } from '../../services/util.service'

export const boardStore = {
	strict: true,
	state: {
		boards: boardService.query(),
		currBoard: null,
		staticBoardsToShow: boardService.getStaticBoards(),
		activities:[],
	},
	getters: {
		boards(state) {
			return state.boards
		},
		currBoard(state) {
			return state.currBoard
		},
		staticBoardsToShow(state) {
			return state.staticBoardsToShow
		},
		async viewedBoards(state) {
			const boards = await state.boards
			const viewedBoards = boards.filter(board => board.isRecentlyViewed)
			return viewedBoards
		},
		activities(state){
			return state.activities
		}
	},
	mutations: {
		setCurrBoard(state, { board }) {
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

	},
	actions: {
		async setBoardById({ commit }, _id) {
			const board = await boardService.getBoardById(_id)
			commit({ type: 'setCurrBoard', board })
		},
		async setCurrBoard({ commit }, { board }) {
			commit({ type: 'setCurrBoard', board })
			await boardService.add(board)
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
			const activity=utilService.getActivity("add Group",currGroup)
			currBoard.activities.push(activity)
			await boardService.add(board)
			commit({ type: 'addGroup', currBoard, group })
		},

		async updateGroup({ commit }, { currBoard, currGroup, taskToAdd }) {
			const board = JSON.parse(JSON.stringify(currBoard))
			board.groups.push(currGroup)
			const activity=utilService.getActivity("update Group",currGroup)
			currBoard.activities.push(activity)
			await boardService.add(board)
			commit({ type: 'addGroup', currBoard, group })
		},
		async addTask({ commit }, { currBoard, currGroup, taskToAdd: {title, createdAt} }) {
			const task = {
				id: utilService.makeId(),
				title,
				createdAt
			}

			currGroup.tasks.push(task)

			const idx = currBoard.groups.findIndex(group => group.id === currGroup.id)

			if(idx > -1) {
				currBoard.groups[idx] = currGroup
			}
			const activity=utilService.getActivity("add task",title)
			currBoard.activities.push(activity)
			await boardService.add(currBoard)
			commit({ type: 'addTask', currBoard })
		},

		async updateTask({ commit }, { currBoard, currGroup, taskToAdd }) {
			const idx = currBoard.groups.findIndex(group => group.id === currGroup.id)
			if(idx > -1) {
				currBoard.groups[idx] = currGroup
				const activity = utilService.getActivity("update Task",taskToAdd.title)
				currBoard.activities.push(activity)
			}
			await boardService.add(currBoard)
			commit({ type: 'updateTask', currBoard })
		}
	},
	modules: {}
}

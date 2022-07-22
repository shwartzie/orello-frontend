import { boardService } from '../../services/board.service'
import { utilService } from '../../services/util.service'
export const boardStore = {
	strict: true,
	state: {
		boards: boardService.query(),
		currBoard: null,
		staticBoardsToShow: boardService.getStaticBoards()
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
		addTask(state, { currBoard, currGroup, taskToAdd }) {
			currGroup.tasks.push({
				id: utilService.makeId(),
				title: taskToAdd
			})
			//seprate funciton?
			currBoard.groups.forEach(group => {
				if (group.id === currGroup.id) {
					group = currGroup
				}
			})
			state.currBoard = currBoard
		},
		updateTask(state, { board, currGroup, taskToAdd }) {
			console.log(
				'board',
				board,
				'\ncurrGroup',
				currGroup,
				'\ntaskToAdd',
				taskToAdd
			)
			currGroup.tasks.forEach(task => {
				if (task.id === taskToAdd.id) {
					task = taskToAdd
					console.log('entered task and changed')
				}
			})
			board.groups.forEach(group => {
				if (group.id === currGroup.id) {
					group = currGroup
					console.log('entered group and changed')
				}
			})
			console.log(
				'board',
				board,
				'\ncurrGroup',
				currGroup,
				'\ntaskToAdd',
				taskToAdd
			)
			state.currBoard = board
		}
	},
	actions: {
		async setBoardById({ commit }, _id) {
			const board = await boardService.getBoardById(_id)
			commit({ type: 'setCurrBoard', board })
		},
		async setCurrBoard({ commit }, { board }) {
			// console.log('groups[0].tasks', board.groups[0].tasks)
			// console.log('groups[1].tasks', board.groups[1].tasks)
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
		//ask roni if you can delete it
		async updateGroups({ commit }, { updatedGroups }) {
			const board = JSON.parse(JSON.stringify(currBoard))
			board.groups.push(group)
			await boardService.add(board)
			commit({ type: 'addGroup', currBoard, updatedGroups })
		},
		async updateGroup({ commit }, { currBoard, currGroup, taskToAdd }) {
			const board = JSON.parse(JSON.stringify(currBoard))
			board.groups.push(group)
			await boardService.add(board)
			commit({ type: 'addGroup', currBoard, group })
		},
		async addTask({ commit }, { currBoard, currGroup, taskToAdd }) {
			const board = JSON.parse(JSON.stringify(currBoard))
			board.groups.forEach(group => {
				if (group.id === currGroup.id) {
					group.tasks.push({
						id: utilService.makeId(),
						title: taskToAdd
					})
				}
			})
			await boardService.add(board)
			commit({ type: 'addTask', board, currGroup, taskToAdd })
		},
		async updateTask({ commit }, { currBoard, currGroup, taskToAdd }) {
			const board = JSON.parse(JSON.stringify(currBoard))
			currGroup.tasks.forEach(task => {
				if (task.id === taskToAdd.id) {
					task = taskToAdd
					console.log('action changhed', task, taskToAdd)
				}
			})
			board.groups.forEach(group => {
				if (group.id === currGroup.id) {
					group = currGroup
					console.log('entered group and changed', board.groups)
				}
			})
			await boardService.add(board)
			commit({ type: 'updateTask', board, currGroup, taskToAdd })
		}
	},
	modules: {}
}

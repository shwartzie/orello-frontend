import { boardService } from '../../services/board.service'
import { userService } from '../../services/user.service'
import { utilService } from '../../services/util.service'
export const boardStore = {
	strict: true,
	state: {
		boards: [],
		currBoard: null,
		activities: []
	},
	getters: {
		boards(state) {
			return state.boards
		},
		currBoard(state) {
			return state.currBoard
		},
		activities(state) {
			return state.activities
		}
	},
	mutations: {
		setCurrBoard(state, { board }) {
			state.currBoard = board
		},
		setBoards(state, { boards }) {
			state.boards = boards
		},
		addGroup(state, { board }) {
			state.currBoard = board
		},
		addTask(state, { currBoard }) {
			state.currBoard = currBoard
		},
		updateTask(state, { currBoard }) {
			state.currBoard = currBoard
		},
		updateBoardsOnStarred(state, { boardIdx, board }) {
			state.boards[boardIdx] = board
		}
	},
	actions: {
		async onStarredUpdateBoards({ commit, state }, { board }) {
			const boardIdx = state.boards.findIndex(
				currBoard => currBoard._id === board._id
			)
			if (boardIdx === -1) {
				return
			}
			await boardService.save(board)
			commit({ type: 'updateBoardsOnStarred', boardIdx, board })
			commit({ type: 'setCurrBoard', board })
		},
		async createBoardFromTempalate({ commit }, _id) {
			const board = await boardService.createTemplateBoard(_id)
			commit({ type: 'setCurrBoard', board })
		},
		async loadBoards(context) {
			try {
				const boards = await boardService.query()
				context.commit({ type: 'setBoards', boards })
			} catch (err) {
				throw err
			}
		},
		async setBoardById({ commit }, _id) {
			const board = await boardService.getBoardById(_id)
			commit({ type: 'setCurrBoard', board })
		},
		async setCurrBoard({ commit }, { board }) {
			commit({ type: 'setCurrBoard', board })
			await boardService.save(board)
		},

		async onJoinBoard({ commit }, { board }) {
			try {
				const user = userService.getLoggedinUser()
				const boardMember = board.members.find(
					member => member._id === user._id
				)
				if (user && !boardMember) {
					board.members.push(user)
				}
				board.isRecentlyViewed = true
				await boardService.save(board)
				commit({ type: 'setCurrBoard', board })
			} catch (err) {
				console.error('boardstore: Error in setting Viewed Boards', err)
			}
		},
		async updateBoard({ commit }, { currBoard }) {
			try {
				const board = JSON.parse(JSON.stringify(currBoard))
				await boardService.save(board)
			} catch (err) {
				console.error('boardstore: Error in setting Viewed Boards', err)
			}
		},
		async setBoard({ commit }, { currBoard }) {
			try {
				const board = currBoard
				await boardService.save(board)
				commit({ type: 'setCurrBoard', board })
			} catch (err) {
				console.err('could not save board ', err)
			}
		},
		async addGroup({ commit }, { currBoard, currGroup: group, idx }) {
			const board = JSON.parse(JSON.stringify(currBoard))
			const user = userService.getLoggedinUser()
			const currGroup = JSON.parse(JSON.stringify(group))
			if (idx >= 0) {
				currGroup.id = utilService.makeId()
				board.groups.splice(idx, 0, currGroup)
			} else {
				board.groups.push(currGroup)
			}
			board.activities.unshift({
				byMember: user,
				createdAt: Date.now(),
				txt: `added a new group named ${currGroup.title}`
			})
			await boardService.save(board)
			commit({ type: 'addGroup', board, currGroup })
		},

		async updateGroup({ commit }, { currBoard, currGroup }) {
			const board = JSON.parse(JSON.stringify(currBoard))
			const group = JSON.parse(JSON.stringify(currGroup))
			const groupIdx = board.groups.findIndex(
				currentGroup => currentGroup.id === group.id
			)
			if (groupIdx > -1) {
				board.groups[groupIdx] = group
				await boardService.save(board)
				commit({ type: 'addGroup', board, group })
			}
		},

		async addTask(
			{ commit },
			{ currBoard, currGroup, taskToAdd: { title, createdAt } }
		) {
			const user = userService.getLoggedinUser()
			const taskActivity = utilService.getActivity('created this task', user)
			const task = {
				id: utilService.makeId(),
				title,
				createdAt,
				activities: [taskActivity]
			}

			currGroup.tasks.push(task)

			const idx = currBoard.groups.findIndex(group => group.id === currGroup.id)

			if (idx > -1) {
				currBoard.groups[idx] = currGroup
			}
			const activity = utilService.getActivity('add task', title, user)
			currBoard.activities.unshift(activity)
			await boardService.save(currBoard)
			commit({ type: 'addTask', currBoard })
		},

		async updateTask({ commit }, { currBoard, currGroup, taskToAdd }) {
			const idx = currBoard.groups.findIndex(group => group.id === currGroup.id)
			if (idx > -1) {
				const user = userService.getLoggedinUser()
				const activity = utilService.getActivity(
					'update Task',
					taskToAdd.title,
					user
				)
				currBoard.activities.unshift(activity)
				currBoard.groups[idx] = currGroup
			}

			await boardService.save(currBoard)
			commit({ type: 'updateTask', currBoard })
		},

		async onAddMemberToTask(
			{ commit },
			{ currBoard, currGroup, taskToAdd, member }
		) {
			const { tasks } = currGroup
			const taskMemberIdx = taskToAdd.members.findIndex(
				currMember => currMember._id === member._id
			)
			if (taskMemberIdx > -1) {
				console.log('removing..')
				taskToAdd.members.splice(taskMemberIdx, 1)
			} else {
				taskToAdd.members.push(member)
				console.log('taskToAdd:', taskToAdd)
			}

			const taskIdx = tasks.findIndex(task => task.id === taskToAdd.id)
			currGroup.tasks[taskIdx] = taskToAdd

			const index = currBoard.groups.findIndex(
				group => group.id === currGroup.id
			)
			currBoard.groups[index] = currGroup

			await boardService.save(currBoard)
			commit({ type: 'updateTask', currBoard })
		}
	},
	modules: {}
}

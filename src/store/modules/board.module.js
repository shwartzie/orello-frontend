import { boardService } from '../../services/board.service'
import { userService } from '../../services/user.service'
import { utilService } from '../../services/util.service'
import { socketService } from '../../services/socket.service'
export const boardStore = {
	strict: true,
	state: {
		boards: [],
		currBoard: null,
		activities: [],
		originalBoard: null,
		filterBy: null
	},
	getters: {
		boards(state) {
			return state.boards
		},
		currBoard(state) {
			if (!state.filterBy) {
				return state.currBoard
			}
			const { members, labels } = state.filterBy
			const board = JSON.parse(JSON.stringify(state.currBoard))
			board.groups = board.groups.filter(group => {
				group.tasks = group.tasks.filter(task => {
					let hasMember = true
					let hasLabel = true

					if (members && members.length) {
						hasMember = task.members.some(member => members.includes(member._id))
					}


					if (labels && labels.length) {
						hasLabel = task.labels && task.labels.some(label => labels.includes(label.id))
					}
					return hasMember && hasLabel
				})
				return group.tasks.length > 0
			})
			return board
		},
		activities(state) {
			return state.activities
		},
		currBoardColor(state) {
			return state.currBoard?.style?.background?.color || '026aa7'
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
		},
		setStarredBoard(state, { status }) {

			state.currBoard.isStarred = status
		},
		updateBoardMembers(state, { board, user }) {
			const boardMember = board.members.find(member => member._id === user._id)
			if (user && !boardMember) {
				board.members.push(user)
			}
			state.currBoard = board
		},
		setFilterBy(state, { filterBy }) {
			state.filterBy = filterBy
		},
		// setNewBoardTitle(state, { board, }) {
		// 	state.currBoard = board
		// }
		setFilteredBoard(state, { currBoard }) {
			state.currBoard = currBoard
		}
	},
	actions: {
		// async filterTaskBy({ commit, state }, { currBoard, filterBy, filterFunc }) {
		// 	currBoard.groups = currBoard.groups.filter(group => {
		// 		group.tasks = group.tasks.filter(task => {
		// 			return filterFunc(task, filterBy)
		// 		})
		// 		return group.tasks.length > 0
		// 	})
		// 	commit({ type: 'setFilteredBoard', currBoard })
		// },

		async updateTaskDateStatus(
			{ commit, state },
			{ groupId, taskToAdd, status }
		) {
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			let currGroup = currBoard.groups.find(group => group.id === groupId)
			const { tasks } = currGroup
			const tasksIdx = tasks.findIndex(task => task.id === taskToAdd.id)
			if (tasksIdx > -1) {
				taskToAdd.status = status
				currGroup.tasks[tasksIdx] = taskToAdd
				const groupIdx = currBoard.groups.findIndex(
					group => group.id === currGroup.id
				)
				if (groupIdx > -1) {
					const user = userService.getLoggedinUser()
					currBoard.groups[groupIdx] = currGroup
					const activity = utilService.getActivity(
						`Added Due Date task named ${taskToAdd.title}`,
						user
					)
					if (currBoard.activities.length >= 50) {
						currBoard.activities.pop()
					}
					currBoard.activities.unshift(activity)
					await boardService.save(currBoard)
					socketService.emit('updateDate', currBoard)
					commit({ type: 'updateTask', currBoard })
				}
			}
		},
		async updateTaskDueDates(
			{ commit, state },
			{ groupId, taskToAdd, startingDate, dueDate }
		) {
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			let currGroup = currBoard.groups.find(group => group.id === groupId)
			const { tasks } = currGroup
			const tasksIdx = tasks.findIndex(task => task.id === taskToAdd.id)
			if (tasksIdx > -1) {
				taskToAdd.dueDate = dueDate
				taskToAdd.startingDate = startingDate
				currGroup.tasks[tasksIdx] = taskToAdd

				const groupIdx = currBoard.groups.findIndex(
					group => group.id === currGroup.id
				)
				if (groupIdx > -1) {
					const user = userService.getLoggedinUser()
					currBoard.groups[groupIdx] = currGroup
					const activity = utilService.getActivity(
						`Added Due Date task named ${taskToAdd.title}`,
						user
					)
					if (currBoard.activities.length >= 50) {
						currBoard.activities.pop()
					}
					currBoard.activities.unshift(activity)
					await boardService.save(currBoard)
					socketService.emit('updateDate', currBoard)
					commit({ type: 'updateTask', currBoard })
				}
			}
		},
		async onStarredUpdateBoards({ commit, state }, { starredStatus }) {
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			currBoard.isStarred = starredStatus
			const boardIdx = state.boards.findIndex(
				board => board._id === currBoard._id
			)
			if (boardIdx === -1) {
				return
			}
			await boardService.save(currBoard)
			socketService.emit('updateStarred', currBoard)

			commit({ type: 'updateBoardsOnStarred', boardIdx, board:currBoard })
			return currBoard
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
			return board
		},
		async onDeleteTask({commit, state}, {groupId, task}) {
			console.log('groupId:',groupId);
			console.log('task:',task);
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			let currGroup = currBoard.groups.find(group => group.id === groupId)
			const taskIdx = currGroup.tasks.findIndex((currTask) => currTask.id === task.id)
            currGroup.tasks.splice(taskIdx, 1)
            const groupIdx = currBoard.groups.findIndex((group) => group.id === currGroup.id)
            currBoard.groups.splice(groupIdx, 1, currGroup)
			await boardService.save(currBoard)
			commit({type: 'setCurrBoard', board:currBoard})
		},
		async setCurrBoard({ commit }, { board }) {
			// const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			// let currGroup = currBoard.groups.find(group => group.id === groupId)
			commit({ type: 'setCurrBoard', board })
			await boardService.save(board)
			socketService.emit('updateGroups', board)
		},
		async onGoToBoard({ commit, state }, { currBoard }) {
			const board = JSON.parse(JSON.stringify(currBoard))
			const boardIdx = state.boards.findIndex(
				currBoard => currBoard._id === board._id
			)
			if (boardIdx === -1) {
				return
			}
			if (!board.isRecentlyViewed) {
				board.isRecentlyViewed = true
			}
			commit({ type: 'updateBoardsOnStarred', boardIdx, board })
			commit({ type: 'setCurrBoard', board })
			await boardService.save(board)
		},

		async onJoinBoard({ commit,state }) {
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			try {
				const user = userService.getLoggedinUser()
				const boardMember = currBoard.members.find(
					member => member._id === user._id
				)
				if (user && !boardMember) {
					currBoard.members.push(user)
				}
				const activity = utilService.getActivity(`joined bored`, user)
				if (currBoard.activities.length >= 50) {
					currBoard.activities.pop()
				}
				currBoard.activities.unshift(activity)
				await boardService.save(currBoard)
				commit({ type: 'setCurrBoard', board:currBoard })
			} catch (err) {
				console.error('boardstore: Error in setting Viewed Boards', err)
			}
		},
		async updateBoard({ commit,state }, { currBoard }) {
			// const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			// let currGroup = currBoard.groups.find(group => group.id === groupId)
			try {
				const board = JSON.parse(JSON.stringify(currBoard))
				await boardService.save(board)
				commit({ type: 'setCurrBoard', board })
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
				console.error('could not save board ', err)
			}
		},
		async addGroup({ commit }, { currBoard, currGroup: group, idx }) {
			const board = JSON.parse(JSON.stringify(currBoard))
			const user = userService.getLoggedinUser()
			const currGroup = JSON.parse(JSON.stringify(group))
			if (idx > -1) {
				currGroup.id = utilService.makeId(10)
				const updatedTasks = currGroup.tasks.map((task, idx) => {
					task.id = utilService.makeId()
					return task
				})
				currGroup.tasks = updatedTasks
				board.groups.splice(idx, 0, currGroup)
			} else {
				currGroup.id = utilService.makeId(10)
				board.groups.push(currGroup)
			}
			if (board.activities.length >= 50) {
				board.activities.pop()
			}
			const activity = utilService.getActivity(
				`added group named ${board.title}`,
				user
			)
			board.activities.unshift(activity)
			await boardService.save(board)

			socketService.emit('updateGroupsOnAdd', board)

			commit({ type: 'addGroup', board })
		},

		async updateGroup({ commit }, { currBoard, currGroup }) {
			const board = JSON.parse(JSON.stringify(currBoard))
			const group = JSON.parse(JSON.stringify(currGroup))
			const user = userService.getLoggedinUser()
			const groupIdx = board.groups.findIndex(
				currentGroup => currentGroup.id === group.id
			)
			const activity = utilService.getActivity(
				`updated group ${currGroup.title}`,
				user
			)
			if (board.activities.length >= 50) {
				board.activities.pop()
			}
			board.activities.unshift(activity)
			if (groupIdx > -1) {
				board.groups[groupIdx] = group
				await boardService.save(board)
				commit({ type: 'addGroup', board, group })
			}
		},

		async addTask({ commit }, { currBoard, currGroup, taskToAdd: { title } }) {
			const user = userService.getLoggedinUser()
			// const taskActivity = utilService.getActivity('created this task', user)
			const task = {
				id: utilService.makeId(),
				title,
				createdAt: Date.now(),
				activities: [
					{
						byUser: user,
						txt: `create this task in ${currGroup.title}`,
						createdAt: Date.now()
					}
				],
				members: []
			}

			currGroup.tasks.push(task)

			const idx = currBoard.groups.findIndex(group => group.id === currGroup.id)

			if (idx > -1) {
				currBoard.groups[idx] = currGroup
			}
			const activity = utilService.getActivity(
				`added a task named ${task.title}`,
				user
			)
			if (currBoard.activities.length >= 50) {
				currBoard.activities.pop()
			}
			currBoard.activities.unshift(activity)
			await boardService.save(currBoard)
			commit({ type: 'addTask', currBoard })
		},

		async updateTask({ commit }, { currBoard, currGroup, taskToAdd }) {
			const idx = currBoard.groups.findIndex(group => group.id === currGroup.id)
			if (idx > -1) {
				const user = userService.getLoggedinUser()
				currBoard.groups[idx] = currGroup
				const activity = utilService.getActivity(
					`updated task named ${taskToAdd.title}`,
					user
				)
				if (currBoard.activities.length >= 50) {
					currBoard.activities.pop()
				}
				currBoard.activities.unshift(activity)
				await boardService.save(currBoard)
				socketService.emit('onAddLabels', currBoard)
				commit({ type: 'updateTask', currBoard })
			}
		},
		async updateTaskCover({ commit }, { currBoard, currGroup, taskToAdd }) {
			const idx = currBoard.groups.findIndex(group => group.id === currGroup.id)
			if (idx > -1) {
				const user = userService.getLoggedinUser()
				currBoard.groups[idx] = currGroup
				const activity = utilService.getActivity(
					`updated task named ${taskToAdd.title}`,
					user
				)
				if (currBoard.activities.length >= 50) {
					currBoard.activities.pop()
				}
				currBoard.activities.unshift(activity)
				await boardService.save(currBoard)
				socketService.emit('updateTaskCover', currBoard)
				commit({ type: 'updateTask', currBoard })
			}
		},
		async addTaskAttachment({ commit }, { currBoard, currGroup, taskToAdd }) {
			const idx = currBoard.groups.findIndex(group => group.id === currGroup.id)
			if (idx > -1) {
				const user = userService.getLoggedinUser()
				currBoard.groups[idx] = currGroup
				const activity = utilService.getActivity(
					`updated task named ${taskToAdd.title}`,
					user
				)
				if (currBoard.activities.length >= 50) {
					currBoard.activities.pop()
				}
				currBoard.activities.unshift(activity)
				await boardService.save(currBoard)
				socketService.emit('updateTaskAttachment', currBoard)
				commit({ type: 'updateTask', currBoard })
			}
		},
		async updateTaskChecklist({ commit }, { currBoard, currGroup, taskToAdd }) {
			const idx = currBoard.groups.findIndex(group => group.id === currGroup.id)
			if (idx > -1) {
				const user = userService.getLoggedinUser()
				currBoard.groups[idx] = currGroup
				const activity = utilService.getActivity(
					`updated task named ${taskToAdd.title}`,
					user
				)
				if (currBoard.activities.length >= 50) {
					currBoard.activities.pop()
				}
				currBoard.activities.unshift(activity)
				await boardService.save(currBoard)
				socketService.emit('onAddChecklist', currBoard)
				commit({ type: 'updateTask', currBoard })
			}
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
				taskToAdd.members.splice(taskMemberIdx, 1)
			} else {
				taskToAdd.members.push(member)
			}

			const taskIdx = tasks.findIndex(task => task.id === taskToAdd.id)
			currGroup.tasks[taskIdx] = taskToAdd

			const index = currBoard.groups.findIndex(
				group => group.id === currGroup.id
			)
			currBoard.groups[index] = currGroup
			const activity = utilService.getActivity(
				`joined task named ${taskToAdd.title}`,
				member
			)
			if (currBoard.activities.length >= 50) {
				currBoard.activities.pop()
			}
			currBoard.activities.unshift(activity)
			await boardService.save(currBoard)
			socketService.emit('onJoinToTask', currBoard)
			commit({ type: 'updateTask', currBoard })
		}
	},
	modules: {}
}

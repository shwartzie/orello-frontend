import { boardService } from '../../services/board.service'
import { userService } from '../../services/user.service'
import { utilService } from '../../services/util.service'
import { socketService } from '../../services/socket.service'
import { applyDrag } from '../../services/drag-and-drop.service.js'

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
						hasMember = task.members.some(member =>
							members.includes(member._id)
						)
					}

					if (labels && labels.length) {
						hasLabel =
							task.labels &&
							task.labels.some(label => labels.includes(label.id))
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
		async onUpdateGroups({ commit, state }, { groupId, dropResult }) {
			const { removedIndex, addedIndex, payload } = dropResult
			const { title } = payload
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			const group = currBoard.groups.find(currGroup => currGroup.id === groupId)
			const groupIdx = currBoard.groups.indexOf(group)
			group.tasks = applyDrag(group.tasks, dropResult)
			currBoard.groups.splice(groupIdx, 1, group)
			group.draggedTo = group.draggedFrom = false
			if (addedIndex >= 0 && removedIndex === null) {
				group.draggedTo = true
			} else if (removedIndex >= 0 && addedIndex === null) {
				group.draggedFrom = true
			}
			if (group.draggedFrom) {
				const activity = utilService.getActivity(
					'removed task from',
					title,
					group
				)
				currBoard.activities.unshift(activity)
			} else if (group.draggedTo) {
				const activity = utilService.getActivity('added task to', title, group)
				currBoard.activities.unshift(activity)
			}
			commit({ type: 'setCurrBoard', board: currBoard })
			await boardService.save(currBoard)
			socketService.emit('updateGroups', currBoard)
		},
		async onDropGroups({ commit, state }, { dropResult }) {
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			const backupBoard = JSON.parse(JSON.stringify(state.currBoard))
			const updatedGroups = applyDrag(currBoard.groups, dropResult)
			currBoard.groups = updatedGroups
			commit({ type: 'setCurrBoard', board: currBoard })
			socketService.emit('updateGroups', currBoard)
			try {
				await boardService.save(currBoard)
			} catch (err) {
				console.error('Had Problem Draggin Groups Or Tasks:', err)
				commit({ type: 'setCurrBoard', board: backupBoard })
				socketService.emit('updateGroups', backupBoard)
			}
		},
		async createBoardFromTemplate({ commit, state }) {
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			currBoard.isStatic = false
			delete currBoard._id
			//need to fix
			// const board = await boardService.save(currBoard)
			commit({ type: 'setCurrBoard', board })
		},
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

			commit({ type: 'updateBoardsOnStarred', boardIdx, board: currBoard })
			return currBoard
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
		async onDeleteTask({ commit, state }, { groupId, task }) {
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			const currGroup = currBoard.groups.find(group => group.id === groupId)
			const taskIdx = currGroup.tasks.findIndex(
				currTask => currTask.id === task.id
			)
			currGroup.tasks.splice(taskIdx, 1)
			const groupIdx = currBoard.groups.findIndex(
				group => group.id === currGroup.id
			)
			currBoard.groups.splice(groupIdx, 1, currGroup)
			await boardService.save(currBoard)
			commit({ type: 'setCurrBoard', board: currBoard })
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
		async onJoinBoard({ commit, state }) {
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
				commit({ type: 'setCurrBoard', board: currBoard })
			} catch (err) {
				console.error('boardstore: Error in setting Viewed Boards', err)
			}
		},
		async updateBoard({ commit, state }, { currBoard }) {
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
				await boardService.save(currBoard)
				commit({ type: 'setCurrBoard', board: currBoard })
			} catch (err) {
				console.error('could not save board ', err)
			}
		},
		async addGroup({ commit, state }, { group, idx }) {
			const board = JSON.parse(JSON.stringify(state.currBoard))
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
			if (board.activities.length >= 25) {
				board.activities.pop()
			}
			const activity = utilService.getActivity(
				`added group named ${board.title}`,
				user
			)
			board.activities.unshift(activity)
			await boardService.save(board)

			socketService.emit('updateGroupsOnAdd', board)

			commit({ type: 'setCurrBoard', board })
		},
		async updateGroupOnChangeTitle({ commit, state }, { groupId, title }) {
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			const currGroup = currBoard.groups.find(group => group.id === groupId)
			const groupIdx = currBoard.groups.indexOf(currGroup)
			const user = userService.getLoggedinUser()
			const activity = utilService.getActivity(`updated group ${title}`, user)

			currGroup.title = title
			if (currBoard.activities.length >= 25) {
				currBoard.activities.pop()
			}
			currBoard.activities.unshift(activity)
			if (groupIdx > -1) {
				currBoard.groups[groupIdx] = currGroup
				await boardService.save(currBoard)
				commit({ type: 'setCurrBoard', board: currBoard })
			}
		},
		async addTask({ commit, state }, { groupId, taskToAdd: { title } }) {
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			const user = userService.getLoggedinUser()
			const currGroup = currBoard.groups.find(group => group.id === groupId)
			const task = {
				id: utilService.makeId(),
				title,
				createdAt: Date.now(),
				activities: [
					{
						byUser: user,
						txt: `create this task in ${title}`,
						createdAt: Date.now()
					}
				],
				members: []
			}

			currGroup.tasks.push(task)

			const groupIdx = currBoard.groups.findIndex(
				group => group.id === currGroup.id
			)

			if (groupIdx > -1) {
				currBoard.groups[groupIdx] = currGroup
			}
			const activity = utilService.getActivity(
				`added a task named ${title}`,
				user
			)
			if (currBoard.activities.length >= 25) {
				currBoard.activities.pop()
			}
			currBoard.activities.unshift(activity)
			await boardService.save(currBoard)
			commit({ type: 'setCurrBoard', board: currBoard })
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
				if (currBoard.activities.length >= 25) {
					currBoard.activities.pop()
				}
				currBoard.activities.unshift(activity)
				await boardService.save(currBoard)
				socketService.emit('onAddLabels', currBoard)
				commit({ type: 'updateTask', currBoard })
			}
		},
		async onAddLabel({ commit, state }, { groupId, taskId, label }) {
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			const currGroup = currBoard.groups.find(group => group.id === groupId)
			const taskToAdd = currGroup.tasks.find(task => task.id === taskId)
			const user = userService.getLoggedinUser()
			const { tasks, title: groupTitle } = currGroup
			const { title: taskTitle } = taskToAdd
			if (!taskToAdd.labels) {
				taskToAdd.labels = []
			}
			const labelIdx = taskToAdd.labels.findIndex(
				currLabel => currLabel.id == label.id
			)
			const tasksIdx = tasks.findIndex(task => task.id === taskToAdd.id)

			if (labelIdx === -1) {
				taskToAdd.labels.push(label)
			} else {
				taskToAdd.labels.splice(labelIdx, 1)
			}
			taskToAdd.activities.unshift({
				byUser: user,
				txt: `added label in ${taskTitle} in ${groupTitle}`,
				createdAt: Date.now()
			})
			if(taskToAdd.activities.length>10){
				taskToAdd.activities.pop()
			}

			currGroup.tasks[tasksIdx] = taskToAdd
			await boardService.save(currBoard)
			commit({ type: 'setCurrBoard', board: currBoard })
			socketService.emit('onAddLabels', currBoard)
		},
		async onAddComment({ commit, state }, { groupId, taskId, comment }) {
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			const currGroup = currBoard.groups.find(group => group.id === groupId)
			const taskToAdd = currGroup.tasks.find(task => task.id === taskId)
			const { tasks } = currGroup
			const tasksIdx = tasks.findIndex(task => task.id === taskToAdd.id)
			const user = userService.getLoggedinUser()
			taskToAdd.activities.unshift({
				byUser: user,
				txt: `${comment} `,
				createdAt: Date.now(),
				type: 'comment'
			})
			if(taskToAdd.activities.length>10){
				taskToAdd.activities.pop()
			}
			currGroup.tasks[tasksIdx] = taskToAdd
			await boardService.save(currBoard)
			commit({ type: 'setCurrBoard', board: currBoard })
		},
		async onUpdateTask(
			{ commit, state },
			{ groupId, taskId, prop, entity, txt }
		) {
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			const backupBoard = JSON.parse(JSON.stringify(state.currBoard))
			const groupIdx = currBoard.groups.findIndex(group => group.id === groupId)
			if (groupIdx === -1) return

			const currGroup = currBoard.groups[groupIdx]
			const taskIdx = currGroup.tasks.findIndex(task => task.id === taskId)
			if (taskIdx === -1) return
			// Getting the task pointer
			const task = currBoard.groups[groupIdx].tasks[taskIdx]
			task[prop] = entity // updating it's prop

			//Activity mangement
			const user = userService.getLoggedinUser()
			task.activities.unshift({
				byUser: user,
				txt: `${txt} in ${task.title} in ${currGroup.title}`,
				createdAt: Date.now()
			})
			if(taskToAdd.activities.length>10){
				taskToAdd.activities.pop()
			}
			const activity = utilService.getActivity(
				`Updated task named ${task.title}`,
				user
			)
			if (currBoard.activities.length >= 25) {
				currBoard.activities.pop()
			}
			currBoard.activities.unshift(activity)
			//Optimistic Mutation
			commit({ type: 'updateTask', currBoard })
			try {
				await boardService.save(currBoard)
				socketService.emit('onUpdateTask', currBoard)
			} catch (err) {
				console.error('Had Problem Updating Tasks:', err)
				commit({ type: 'updateTask', currBoard: backupBoard })
			}
		},
		async addTaskAttachment(
			{ commit, state },
			{ groupId, taskId, attachment }
		) {
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			const currGroup = currBoard.groups.find(group => group.id === groupId)
			const taskToAdd = currGroup.tasks.find(task => task.id === taskId)
			const { tasks, title: groupTitle } = currGroup
			const { title: taskTitle } = taskToAdd
			const user = userService.getLoggedinUser()
			const groupIdx = currBoard.groups.findIndex(
				group => group.id === currGroup.id
			)
			if (groupIdx > -1) {
				if (!taskToAdd.attachments) {
					taskToAdd.attachments = []
				}
				taskToAdd.attachments.push(attachment)
				const taskIdx = tasks.findIndex(task => task.id === taskToAdd.id)
				currGroup.tasks.splice(taskIdx, 1, taskToAdd)

				taskToAdd.activities.unshift({
					byUser: user,
					txt: `added Attachment in ${taskTitle} in ${groupTitle}`,
					createdAt: Date.now()
				})
				if(taskToAdd.activities.length>10){
					taskToAdd.activities.pop()
				}
				currBoard.groups[groupIdx] = currGroup
				const activity = utilService.getActivity(
					`updated task named ${taskToAdd.title}`,
					user
				)
				if (currBoard.activities.length >= 25) {
					currBoard.activities.pop()
				}
				currBoard.activities.unshift(activity)
				await boardService.save(currBoard)
				socketService.emit('updateTaskAttachment', currBoard)
				commit({ type: 'updateTask', currBoard })
			}
		},
		async updateTaskChecklist({ commit, state }, { currGroup, taskToAdd }) {
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			const groupIdx = currBoard.groups.findIndex(
				group => group.id === currGroup.id
			)
			if (groupIdx > -1) {
				const user = userService.getLoggedinUser()
				currBoard.groups[groupIdx] = currGroup
				const activity = utilService.getActivity(
					`updated task named ${taskToAdd.title}`,
					user
				)
				if (currBoard.activities.length >= 25) {
					currBoard.activities.pop()
				}
				currBoard.activities.unshift(activity)
				await boardService.save(currBoard)
				socketService.emit('onAddChecklist', currBoard)
				commit({ type: 'updateTask', currBoard })
			}
		},
		async onAddMemberToTask({ commit, state }, { groupId, taskId, member }) {
			const currBoard = JSON.parse(JSON.stringify(state.currBoard))
			const currGroup = currBoard.groups.find(group => group.id === groupId)
			const taskToAdd = currGroup.tasks.find(task => task.id === taskId)
			const { tasks, title: groupTitle } = currGroup
			const { title: taskTitle } = taskToAdd
			const taskMemberIdx = taskToAdd.members.findIndex(
				currMember => currMember._id === member._id
			)
			if (taskMemberIdx > -1) {
				taskToAdd.members.splice(taskMemberIdx, 1)
			} else {
				taskToAdd.members.push(member)
			}
			taskToAdd.activities.unshift({
				byUser: member,
				txt: `joined in ${taskTitle} in ${groupTitle}`,
				createdAt: Date.now()
			})
			if(taskToAdd.activities.length>10){
				taskToAdd.activities.pop()
			}

			const taskIdx = tasks.findIndex(task => task.id === taskToAdd.id)
			currGroup.tasks[taskIdx] = taskToAdd

			const groupIdx = currBoard.groups.findIndex(
				group => group.id === currGroup.id
			)
			currBoard.groups[groupIdx] = currGroup
			const activity = utilService.getActivity(
				`joined task named ${taskTitle}`,
				member
			)
			if (currBoard.activities.length >= 25) {
				currBoard.activities.pop()
			}
			currBoard.activities.unshift(activity)
			await boardService.save(currBoard)
			socketService.emit('onJoinToTask', currBoard)
			commit({ type: 'setCurrBoard', board: currBoard })
		}
	}
}

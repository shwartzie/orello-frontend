import { boardService } from "../../services/board.service"
import { userService } from "../../services/user.service"
import { utilService } from "../../services/util.service"
import { userService } from "../../services/user.service.js"
export const boardStore = {
    strict: true,
    state: {
        boards: [],
        currBoard: null,
        activities: [],
    },
    getters: {
        boards(state) {
            return state.boards
        },
        currBoard(state) {
            return state.currBoard
        },
        // viewedBoards(state) {
        //     const boards = state.boards
        //     const viewedBoards = boards.filter(
        //         (board) => board.isRecentlyViewed
        //     )
        //     return viewedBoards
        // },
        activities(state) {
            return state.activities
        },
    },
    mutations: {
        setCurrBoard(state, { board }) {
            state.currBoard = board
        },
        setBoards(state, { boards }) {
            state.boards = boards
        },
        updateStarredBoard(state, { starredStatus }) {
            state.currBoard.isStarred = starredStatus
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
    },
    actions: {
        async loadBoards(context) {
            try {
				const boards = await boardService.query()
                context.commit({ type: "setBoards", boards })
            } catch (err) {
                console.log("boardstore: Error in loadboards", err)
                throw err
            }
        },
        async setBoardById({ commit }, _id) {
            const board = await boardService.getBoardById(_id)
            commit({ type: "setCurrBoard", board })
        },
        async setCurrBoard({ commit }, { board }) {
            commit({ type: "setCurrBoard", board })
            await boardService.add(board)
        },

        async updateBoard({ commit }, { board }) {
            // try {
            //     if (!viewedBoards.includes(board)) {
            // 		board.isRecentlyViewed = true
            // 		const updatedBoard = await boardService.add(board)
            // 		viewedBoards.unshift(updatedBoard)
            // 	}
            // 	if (viewedBoards.length === 4) {
            // 		viewedBoards.pop()
            // 	}
            // 	commit({ type: 'setBoards', viewedBoards })
            // } catch (err) {
            //     console.log('boardstore: Error in setting Viewed Boards', err)
            //     throw err
            // }
            try {
				const currBoard = JSON.parse(JSON.stringify(board))
                const user = userService.getLoggedinUser()
                if(user) {
                    currBoard.members.push(user)
                }
                console.log('user:',user);
				currBoard.isRecentlyViewed = true
                const boards = await boardService.add(currBoard)
                commit({ type: "setBoards", boards})
            } catch (err) {
                console.error("boardstore: Error in setting Viewed Boards", err)
            }
        },
        async setBoard({ commit }, { board, starredStatus }) {
            await boardService.add({ ...board }, starredStatus)
            commit({ type: "updateStarredBoard", starredStatus })
        },
        async addGroup({ commit }, { currBoard, group }) {
			try {
				const board = JSON.parse(JSON.stringify(currBoard))
				board.groups.push(group)
                const user=userService.getLoggedinUser()
				const activity = utilService.getActivity("add Group", group,user)
				board.activities.push(activity)
				await boardService.add(board)
				commit({ type: "addGroup", board, group })
			} catch(err) {
				console.error('HAD ISSUES ADDING TASK INSIDE A GROUP:', err)
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
            const user=userService.getLoggedinUser()
			const activity=utilService.getActivity("add Group",group,user)
			board.activities.unshift(activity)
			await boardService.add(board)
			commit({ type: 'addGroup', board, group })
		},

		async updateGroup({ commit }, { currBoard, currGroup, taskToAdd }) {
			const board = JSON.parse(JSON.stringify(currBoard))
			board.groups.push(currGroup)
            const user=userService.getLoggedinUser()
			const activity=utilService.getActivity("update Group",currGroup,user)
			board.activities.unshift(activity)
			await boardService.add(board)
			commit({ type: 'addGroup', board, group })
		},
		async addTask({ commit }, { currBoard, currGroup, taskToAdd: {title, createdAt} }) {
			const task = {
				id: utilService.makeId(),
				title,
				createdAt
			}

            currGroup.tasks.push(task)

            const idx = currBoard.groups.findIndex(
                (group) => group.id === currGroup.id
            )

			if(idx > -1) {
				currBoard.groups[idx] = currGroup
			}
            const user=userService.getLoggedinUser()
			const activity=utilService.getActivity("add task",title,user)
			currBoard.activities.unshift(activity)
			await boardService.add(currBoard)
			commit({ type: 'addTask', currBoard })
		},

		async updateTask({ commit }, { currBoard, currGroup, taskToAdd }) {
			const idx = currBoard.groups.findIndex(group => group.id === currGroup.id)
			if(idx > -1) {
				currBoard.groups[idx] = currGroup
                const user=userService.getLoggedinUser()
				const activity = utilService.getActivity("update Task",taskToAdd.title,user)
				currBoard.activities.unshift(activity)
			}
			await boardService.add(currBoard)
			commit({ type: 'updateTask', currBoard })
		}
	},
	modules: {}
}

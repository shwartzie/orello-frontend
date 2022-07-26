import { boardService } from "../../services/board.service"
import { userService } from "../../services/user.service"
import { utilService } from "../../services/util.service"
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
            await boardService.save(board)
        },

        async updateBoard({ commit }, { board }) {
            // try {
            //     if (!viewedBoards.includes(board)) {
            // 		board.isRecentlyViewed = true
            // 		const updatedBoard = await boardService.save(board)
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
                if (user) {
                    if (!currBoard.members.includes(user)) {
                        currBoard.members.push(user)
                    }
                }
                currBoard.isRecentlyViewed = true
                const boards = await boardService.save(currBoard)
                commit({ type: "setBoards", boards })
            } catch (err) {
                console.error("boardstore: Error in setting Viewed Boards", err)
            }
        },
        async setBoard({ commit }, { currBoard, starredStatus }) {
            await boardService.save(currBoard, starredStatus)
            const board = currBoard
            commit({ type: "setCurrBoard", board })
        },
		async addGroup({ commit }, { currBoard, currGroup,idx }) {
            const board = JSON.parse(JSON.stringify(currBoard))
            const user=userService.getLoggedinUser()
            console.log(currGroup);
            if (idx >=0) {
                board.groups.splice(idx,0,currGroup)
            }else{
			board.groups.push(currGroup)
            }
            board.activities.unshift({
                byMember:user,
                createdAt: Date.now(),
                txt:`added a new group named ${currGroup.title}`
            })
			await boardService.save(board)
			commit({ type: 'addGroup', board, currGroup })
		},

		async updateGroup({ commit }, { currBoard, currGroup, taskToAdd }) {
			const board = JSON.parse(JSON.stringify(currBoard))
			board.groups.push(currGroup)
            const user=userService.getLoggedinUser()
			const activity=utilService.getActivity("update Group",currGroup,user)
			board.activities.unshift(activity)
			await boardService.save(board)
			commit({ type: 'addGroup', board, group })
		},

		async addTask({ commit }, { currBoard, currGroup, taskToAdd: {title, createdAt} }) {
            const user=userService.getLoggedinUser()
			const Taskactivity=utilService.getActivity("created this task",title,currGroup,user)
			const task = {
				id: utilService.makeId(),
				title,
				createdAt,
                activities:[Taskactivity]
			}

            currGroup.tasks.push(task)

            const idx = currBoard.groups.findIndex(
                (group) => group.id === currGroup.id
            )

            if (idx > -1) {
                currBoard.groups[idx] = currGroup
            }
            const activity = utilService.getActivity("add task", title, user)
            currBoard.activities.unshift(activity)
            await boardService.save(currBoard)
            commit({ type: "addTask", currBoard })
        },

        async updateTask({ commit }, { currBoard, currGroup, taskToAdd, joined}) {
            const idx = currBoard.groups.findIndex(
                (group) => group.id === currGroup.id
            )
            if (idx > -1) {
                const user = userService.getLoggedinUser()
                
                if(user && joined) {
                    taskToAdd.members.push(user)
                }
                const activity = utilService.getActivity(
                    "update Task",
                    taskToAdd.title,
                    user
                )
                currBoard.activities.unshift(activity)
                currBoard.groups[idx] = currGroup
            }
            await boardService.save(currBoard)
            commit({ type: "updateTask", currBoard })
        },
    },
    modules: {},
}

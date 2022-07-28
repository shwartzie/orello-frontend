import { boardService } from "../../services/board.service"
import { userService } from "../../services/user.service"
import { utilService } from "../../services/util.service"
import { socketService } from "../../services/socket.service"
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
			console.log('board.title:',board.title);
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
            const boardMember = board.members.find(
                (member) => member._id === user._id
            )
            if (user && !boardMember) {
                board.members.push(user)
            }
            state.currBoard = board
        },
        // setNewBoardTitle(state, { board, }) {
        // 	state.currBoard = board
        // }
    },
    actions: {
        async onStarredUpdateBoards({ commit, state }, { board }) {
            const boardIdx = state.boards.findIndex(
                (currBoard) => currBoard._id === board._id
            )
            if (boardIdx === -1) {
                return
            }
            await boardService.save(board)
            console.log("UPDATED STAR")
            socketService.emit("updateStarred", board)

            commit({ type: "updateBoardsOnStarred", boardIdx, board })
            return board
        },
        async createBoardFromTempalate({ commit }, _id) {
            const board = await boardService.createTemplateBoard(_id)
            commit({ type: "setCurrBoard", board })
        },
        async loadBoards(context) {
            try {
                const boards = await boardService.query()
                context.commit({ type: "setBoards", boards })
            } catch (err) {
                throw err
            }
        },
        async setBoardById({ commit }, _id) {
            const board = await boardService.getBoardById(_id)
            commit({ type: "setCurrBoard", board })
            return board
        },
        async setCurrBoard({ commit }, { board }) {
            commit({ type: "setCurrBoard", board })
            await boardService.save(board)
        },
        async onGoToBoard({ commit, state }, { currBoard }) {
            const board = JSON.parse(JSON.stringify(currBoard))
            const boardIdx = state.boards.findIndex(
                (currBoard) => currBoard._id === board._id
            )
            if (boardIdx === -1) {
                return
            }
            if (!board.isRecentlyViewed) {
                board.isRecentlyViewed = true
            }
            commit({ type: "updateBoardsOnStarred", boardIdx, board })
            commit({ type: "setCurrBoard", board })
            await boardService.save(board)
        },

        async onJoinBoard({ commit }, { board }) {
            try {
                const user = userService.getLoggedinUser()
                const boardMember = board.members.find(
                    (member) => member._id === user._id
                )
                if (user && !boardMember) {
                    board.members.push(user)
                }
                const activity = utilService.getActivity(`joined bored`, user)
                board.activities.unshift(activity)
                socketService.emit("updateJoined", board)
                await boardService.save(board)
                commit({ type: "setCurrBoard", board })
            } catch (err) {
                console.error("boardstore: Error in setting Viewed Boards", err)
            }
        },
        async updateBoard({ commit }, { currBoard }) {
            try {
                const board = JSON.parse(JSON.stringify(currBoard))
                await boardService.save(board)
                commit({ type: "setCurrBoard", board })
            } catch (err) {
                console.error("boardstore: Error in setting Viewed Boards", err)
            }
        },
        async setBoard({ commit }, { currBoard }) {
            try {
                const board = currBoard
                await boardService.save(board)
                socketService.emit("updateBoardTitle", board)
                commit({ type: "setCurrBoard", board })
            } catch (err) {
                console.err("could not save board ", err)
            }
        },
        async addGroup({ commit }, { currBoard, currGroup: group, idx }) {
            const board = JSON.parse(JSON.stringify(currBoard))
            const user = userService.getLoggedinUser()
            const currGroup = JSON.parse(JSON.stringify(group))
            if (idx > -1) {
                currGroup.id = utilService.makeId()
                const updatedTasks = currGroup.tasks.map((task, idx) => {
                    task.id = utilService.makeId()
                    return task
                })
                currGroup.tasks = updatedTasks
                board.groups.splice(idx, 0, currGroup)
            } else {
                board.groups.push(currGroup)
            }
            const activity = utilService.getActivity(
                `added group named ${currGroup.title}`,
                user
            )
            board.activities.unshift(activity)
            await boardService.save(board)
            commit({ type: "addGroup", board, currGroup })
        },

        async updateGroup({ commit }, { currBoard, currGroup }) {
            const board = JSON.parse(JSON.stringify(currBoard))
            const group = JSON.parse(JSON.stringify(currGroup))
            const groupIdx = board.groups.findIndex(
                (currentGroup) => currentGroup.id === group.id
            )
            const activity = utilService.getActivity(
                `updated group ${currGroup.title}`,
                user
            )
            board.activities.unshift(activity)
            if (groupIdx > -1) {
                board.groups[groupIdx] = group
                await boardService.save(board)
                commit({ type: "addGroup", board, group })
            }
        },

        async addTask(
            { commit },
            { currBoard, currGroup, taskToAdd: { title } }
        ) {
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
                        createdAt: Date.now(),
                    },
                ],
                members: [],
            }

            currGroup.tasks.push(task)

            const idx = currBoard.groups.findIndex(
                (group) => group.id === currGroup.id
            )

            if (idx > -1) {
                currBoard.groups[idx] = currGroup
            }
            const activity = utilService.getActivity(
                `added a task named ${task.title}`,
                user
            )
            currBoard.activities.unshift(activity)
            await boardService.save(currBoard)
            commit({ type: "addTask", currBoard })
        },

        async updateTask({ commit }, { currBoard, currGroup, taskToAdd }) {
            const idx = currBoard.groups.findIndex(
                (group) => group.id === currGroup.id
            )
            if (idx > -1) {
                const user = userService.getLoggedinUser()
                currBoard.groups[idx] = currGroup
                const activity = utilService.getActivity(
                    `updated task named ${taskToAdd.title}`,
                    user
                )
                currBoard.activities.unshift(activity)
                await boardService.save(currBoard)
				socketService.emit("onAddLabels", currBoard)
                commit({ type: "updateTask", currBoard })
            }
        },
		async updateTaskChecklist({ commit }, { currBoard, currGroup, taskToAdd }) {
            const idx = currBoard.groups.findIndex(
                (group) => group.id === currGroup.id
            )
            if (idx > -1) {
                const user = userService.getLoggedinUser()
                currBoard.groups[idx] = currGroup
                const activity = utilService.getActivity(
                    `updated task named ${taskToAdd.title}`,
                    user
                )
                currBoard.activities.unshift(activity)
                await boardService.save(currBoard)
				socketService.emit("onAddChecklist", currBoard)
				console.log('store update')
                commit({ type: "updateTask", currBoard })
            }
        },

        async onAddMemberToTask(
            { commit },
            { currBoard, currGroup, taskToAdd, member }
        ) {
            const { tasks } = currGroup
            const taskMemberIdx = taskToAdd.members.findIndex(
                (currMember) => currMember._id === member._id
            )
            if (taskMemberIdx > -1) {
                taskToAdd.members.splice(taskMemberIdx, 1)
            } else {
                taskToAdd.members.push(member)
            }

            const taskIdx = tasks.findIndex((task) => task.id === taskToAdd.id)
            currGroup.tasks[taskIdx] = taskToAdd

            const index = currBoard.groups.findIndex(
                (group) => group.id === currGroup.id
            )
            currBoard.groups[index] = currGroup
            const activity = utilService.getActivity(
                `joined task named ${taskToAdd}`,
                member
            )
            currBoard.activities.unshift(activity)
            await boardService.save(currBoard)
			socketService.emit("onJoinToTask", currBoard)
            commit({ type: "updateTask", currBoard })
        },


		
    },
    modules: {},
}

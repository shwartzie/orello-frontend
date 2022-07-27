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
        },
        async setCurrBoard({ commit }, { board }) {
            commit({ type: "setCurrBoard", board })
            await boardService.save(board)
        },

        async updateBoard({ commit }, { board }) {
            try {
                const user = userService.getLoggedinUser()
                if (user && !board.members.includes(user)) {
                    board.members.push(user)
                }
                board.isRecentlyViewed = true
                await boardService.save(board)
                commit({ type: "setCurrBoard", board })
            } catch (err) {
                console.error("boardstore: Error in setting Viewed Boards", err)
            }
        },
        async updateBoard({ commit,state }, { currBoard }) {
            try {
                const board = JSON.parse(JSON.stringify(currBoard))
                await boardService.save(board)
                if(state.currBoard._id===board._id){
                    console.log('same board');
                    commit({ type: "setCurrBoard", board })
                }
            } catch (err) {
                console.error("boardstore: Error in setting Viewed Boards", err)
            }
        },
        async setBoard({ commit }, { currBoard }) {
            const board = await boardService.save(currBoard)
            commit({ type: "setCurrBoard", board })
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
                txt: `added a new group named ${currGroup.title}`,
            })
            await boardService.save(board)
            commit({ type: "addGroup", board, currGroup })
        },

        async updateGroup({ commit }, { currBoard, currGroup, taskToAdd }) {
            const board = JSON.parse(JSON.stringify(currBoard))
            board.groups.push(currGroup)
            const user = userService.getLoggedinUser()
            const activity = utilService.getActivity(
                "update Group",
                currGroup,
                user
            )
            board.activities.unshift(activity)
            await boardService.save(board)
            commit({ type: "addGroup", board, group })
        },

        async addTask(
            { commit },
            { currBoard, currGroup, taskToAdd: { title, createdAt } }
        ) {
            const user = userService.getLoggedinUser()
            const taskActivity = utilService.getActivity(
                "created this task",
                user
            )
            const task = {
                id: utilService.makeId(),
                title,
                createdAt,
                activities: [taskActivity],
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

        async updateTask({ commit }, { currBoard, currGroup, taskToAdd }) {
            const idx = currBoard.groups.findIndex(
                (group) => group.id === currGroup.id
            )
            if (idx > -1) {
                const user = userService.getLoggedinUser()
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

        async onAddMemberToTask(
            { commit },
            { currBoard, currGroup, taskToAdd, member }
        ) {
            const { tasks } = currGroup

            if (!taskToAdd.members) {
                taskToAdd.members = []
            }
            const idx = taskToAdd.members.findIndex(
                (currMember) => currMember._id === member._id
            )
            if (idx > -1) {
                member.isJoined = false
                taskToAdd.members.splice(idx, 1)
            } else {
                member.isJoined = true
                taskToAdd.members.push(member)
            }

            const taskIdx = tasks.findIndex((task) => task.id === taskToAdd.id)
            currGroup.tasks[taskIdx] = taskToAdd

            const index = currBoard.groups.findIndex(
                (group) => group.id === currGroup.id
            )
            currBoard.groups[index] = currGroup

            await boardService.save(currBoard)
            commit({ type: "updateTask", currBoard })
            return member
        },
    },
    modules: {},
}

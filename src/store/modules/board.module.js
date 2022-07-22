import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
export const boardStore = {
    strict: true,
    state: {
        boards: boardService.query(),
        currBoard: null,
        staticBoardsToShow: boardService.getStaticBoards(),
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
            const viewedBoards = boards.filter(
                (board) => board.isRecentlyViewed
            )
            return viewedBoards
        },
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
                title: taskToAdd,
            })
            //seprate funciton?
            currBoard.groups.forEach((group) => {
                if (group.id === currGroup.id) {
                    group = currGroup
                }
            })
            state.currBoard = currBoard
        },
<<<<<<< HEAD
        updateTask(state, { board, group, taskToAdd }) {
            group.tasks.forEach((task)=>{
				if(task.id===taskToAdd.id){
					task=taskToAdd		
					console.log('entered task and changed');
			}
			})
            board.groups.forEach((grp) => {
				if (grp.id === group.id) {
					grp=group
					console.log('entered group and changed');
                }
            });
			console.log('board',board,'\ncurrGroup',group,'\ntaskToAdd',taskToAdd);
            state.currBoard = board;
=======
        updateTask(state, { currBoard }) {
			console.log(currBoard)
            state.currBoard = currBoard
        },
    },
    actions: {
        async setBoardById({ commit }, _id) {
            const board = await boardService.getBoardById(_id)
            commit({ type: "setCurrBoard", board })
        },
        async setCurrBoard({ commit }, { board }) {
            await boardService.add(board)
            commit({ type: "setCurrBoard", board })
        },
        async setTaskById({ commit, state }, id) {
            const currBoard = state.currBoard
            const task = await boardService.getTaskById(id, currBoard)
>>>>>>> 9687c97a8f2e6551874b5be158711e10edacc095
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
            commit({ type: "setBoards", viewedBoards })
        },
        async setBoard({ commit }, { board, starredStatus }) {
            await boardService.add({ ...board }, starredStatus)
            commit({ type: "updateStarredBoard", starredStatus })
        },
        async addGroup({ commit }, { currBoard, group }) {
            const board = JSON.parse(JSON.stringify(currBoard))
            board.groups.push(group)
            await boardService.add(board)
            commit({ type: "addGroup", currBoard, group })
        },
        //ask roni if you can delete it
        async updateGroups({ commit }, { updatedGroups }) {
            const board = JSON.parse(JSON.stringify(currBoard))
            board.groups.push(group)
            await boardService.add(board)
            commit({ type: "addGroup", currBoard, updatedGroups })
        },
        async updateGroup({ commit }, { currBoard, currGroup, taskToAdd }) {
            const board = JSON.parse(JSON.stringify(currBoard))
            board.groups.push(group)
            await boardService.add(board)
            commit({ type: "addGroup", currBoard, group })
        },
        async addTask({ commit }, { currBoard, currGroup, taskToAdd }) {
            const board = JSON.parse(JSON.stringify(currBoard))
            board.groups.forEach((group) => {
                if (group.id === currGroup.id) {
                    group.tasks.push({
                        id: utilService.makeId(),
                        title: taskToAdd,
                    })
                }
            })
            await boardService.add(board)
            commit({ type: "addTask", board, currGroup, taskToAdd })
        },
        async updateTask({ commit }, { currBoard, currGroup, taskToAdd }) {
<<<<<<< HEAD
            const board = JSON.parse(JSON.stringify(currBoard))
			const group= JSON.parse(JSON.stringify(currGroup))
			group.tasks.forEach((task)=>{
				if(task.id===taskToAdd.id){
					task=taskToAdd
				}
			})
			board.groups.forEach((grp) => {
				if (grp.id === group.id) {
					grp=group
                }
            })

            await boardService.add(board);
            commit({ type: "updateTask", board, group, taskToAdd });
=======
            currGroup.tasks.forEach((task, idx) => {
                if (task.id === taskToAdd.id) {
                    currGroup.tasks[idx] = taskToAdd
                }
            })

            currBoard.groups.forEach((group, idx) => {
                if (group.id === currGroup.id) {
                    currBoard.groups[idx] = currGroup
                }
            })
			
            await boardService.add(currBoard)
            commit({ type: "updateTask", currBoard })
>>>>>>> 9687c97a8f2e6551874b5be158711e10edacc095
        },
    },
    modules: {},
}

import { boardService } from "../../services/board.service"
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
        setBoard(state, { starredStatus }) {
            state.currBoard.isStarred = starredStatus
        }
    },
    actions: {
        async setBoardById({ commit }, _id) {
            const board = await boardService.getBoardById(_id)
            commit({ type: "setCurrBoard", board })
        },
        async setTaskById({ commit ,state}, id) {
            const currBoard=state.currBoard
            const task = await boardService.getTaskById(id , currBoard)
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
        async setBoard({commit}, {board, starredStatus}) {
            commit({type: 'setBoard', starredStatus})
            await boardService.add({...board}, starredStatus)
        }
    },
    modules: {},
}

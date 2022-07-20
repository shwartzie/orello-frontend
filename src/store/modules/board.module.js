import { boardService } from "../../services/board.service"
// create a store instance
export const boardStore = {
    strict: true,
    state: {
        boards: boardService.getBoards(),
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
    },
    actions: {
        async setBoardById({ commit }, _id) {
            const board = await boardService.getBoardById(_id)
            commit({ type: "setCurrBoard", board })
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
    },
    modules: {},
}

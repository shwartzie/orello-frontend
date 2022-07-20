import { boardService } from "../../services/board.service"
// create a store instance
export const boardStore = {
    strict: true,
    state: {
        boards: boardService.getBoards(),
        currBoard: null,
        staticBoardsToShow: boardService.getStaticBoards(),
        viewedBoards: boardService.getViewedBoards(),
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
        viewedBoards(state) {
            return state.viewedBoards
        },
    },
    mutations: {
        setCurrBoard(state, { board }) {
            state.currBoard = board
        },
        setViewedBoards(state, { viewedBoards }) {
            state.viewedBoards = viewedBoards
            console.log("state.viewedBoards:", viewedBoards)
        },
    },
    actions: {
        async setBoardById({ commit }, _id) {
            const board = await boardService.getBoardById(_id)
            commit({ type: "setCurrBoard", board })
        },

        async setViewedBoards({ commit }, { viewedBoards, board }) {
            if (viewedBoards.length === 4) {
                viewedBoards.pop()
            }
            if (!viewedBoards.includes(board)) {
                viewedBoards.unshift(board)
            } else {
                const idx = viewedBoards.findIndex(
                    (board, idx) => viewedBoards[idx] === board
                )
                board.isStatic = true
                viewedBoards[idx].isStatic = true
            }
            await boardService.addViewedBoard(board)
            commit({ type: "setViewedBoards", viewedBoards })
        },
    },
    modules: {},
}

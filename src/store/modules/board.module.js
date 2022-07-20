import { boardService } from "../../services/board.service"

// create a store instance
export const boardStore = {
    strict: true,
    state: {
        boards: boardService.getBoards(),
        currBoard: null,
    },
    getters: {
        currBoard(state) {
            return state.currBoard
        },
    },
    mutations: {
        setCurrBoard(state, { board }) {
            state.currBoard = board
        },
    },
    actions: {
        async setBoardById({ commit }, _id) {
            const board = await boardService.getBoardById(_id)
            console.log(board);
            commit({ type: "setCurrBoard", board })
        },
    },
    modules: {},
}

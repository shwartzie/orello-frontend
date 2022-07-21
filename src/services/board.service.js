export const boardService = {
    getBoards,
    getBoardById,
    getStaticBoards,
    add
}
import { utilService } from "../services/util.service"

import { storageService } from "./storage-service.js"
const STORAGE_BOARDS_KEY = "boardsDB"
async function getBoards() {
    if (!localStorage.getItem(STORAGE_BOARDS_KEY)) {
        console.log('creating static boards...')
        const boards = _createStaticBoards()
        localStorage.setItem(STORAGE_BOARDS_KEY, JSON.stringify(boards))
        return boards
    }
    return Promise.resolve(JSON.parse(localStorage.getItem(STORAGE_BOARDS_KEY)))
}

async function getBoardById({ _id },status) {
    const boards = await getBoards()
    const currBoard = boards.find((board) => _id === board._id)
    return currBoard
}

async function getStaticBoards() {
    if(!localStorage.getItem(STORAGE_BOARDS_KEY)) {
        return _createStaticBoards()
    }
    console.log('getting boards...')
    return JSON.parse(localStorage.getItem(STORAGE_BOARDS_KEY))
}

function _createStaticBoards() {
    const boards = []
    for (let i = 0; i < 4; i++) {
        boards.push({
            _id: utilService.makeId(),
            title: "Robot dev proj",
            archivedAt: 1589983468418,
            createdAt: 1589983468418,
            isStatic: Math.random() > 0.5,
            isStarred: false,
            createdBy: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img",
            },
            style: {
                backgroundImg: "https://wallpapercave.com/wp/wp4676582.jpg",
            },

            labels: [
                {
                    id: "l101",
                    title: "Done",
                    color: "#61bd4f",
                },
                {
                    id: "l102",
                    title: "Progress",
                    color: "#61bd33",
                },
            ],
            members: [
                {
                    _id: "u101",
                    fullname: "Tal Tarablus",
                    imgUrl: "https://www.google.com",
                },
            ],
            groups: [
                {
                    id: "g101",
                    title: "Group 1",
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: "c101",
                            title: "Replace logo",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                    ],
                    style: {},
                },
                {
                    id: "g101",
                    title: "Group 1",
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: "c101",
                            title: "Replace logo",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                    ],
                    style: {},
                },
                {
                    id: "g101",
                    title: "Group 1",
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: "c101",
                            title: "Replace logo",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                    ],
                    style: {},
                },
                {
                    id: "g101",
                    title: "Group 1",
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: "c101",
                            title: "Replace logo",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                    ],
                    style: {},
                },
                {
                    id: "g101",
                    title: "Group 1",
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: "c101",
                            title: "Replace logo",
                        },
                        {
                            id: "c101",
                            title: "Replace logo",
                        },
                        {
                            id: "c101",
                            title: "Replace logo",
                        },
                        {
                            id: "c101",
                            title: "Replace logo",
                        },
                        {
                            id: "c101",
                            title: "Replace logo",
                        },
                        {
                            id: "c101",
                            title: "Replace logo",
                        },
                        {
                            id: "c101",
                            title: "Replace logo",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                    ],
                    style: {},
                },
                {
                    id: "g101",
                    title: "Group 1",
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: "c101",
                            title: "Replace logo",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                    ],
                    style: {},
                },
                {
                    id: "g101",
                    title: "Group 1",
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: "c101",
                            title: "Replace logo",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                    ],
                    style: {},
                },
                {
                    id: "g101",
                    title: "Group 1",
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: "c101",
                            title: "Replace logo",
                        },
                        {
                            id: "c102",
                            title: "Add Samples",
                        },
                    ],
                    style: {},
                },
                {
                    id: "g102",
                    title: "Group 2",
                    tasks: [
                        {
                            id: "c103",
                            title: "Do that",
                            archivedAt: 1589983468418,
                        },
                        {
                            id: "c104",
                            title: "Help me",
                            status: "in-progress",
                            description: "description",
                            comments: [
                                {
                                    id: "ZdPnm",
                                    txt: "also @yaronb please CR this",
                                    createdAt: 1590999817436,
                                    byMember: {
                                        _id: "u101",
                                        fullname: "Tal Tarablus",
                                        imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
                                    },
                                },
                            ],
                            checklists: [
                                {
                                    id: "YEhmF",
                                    title: "Checklist",
                                    todos: [
                                        {
                                            id: "212jX",
                                            title: "To Do 1",
                                            isDone: false,
                                        },
                                    ],
                                },
                            ],
                            memberIds: ["u101"],
                            labelIds: ["l101", "l102"],
                            createdAt: 1590999730348,
                            dueDate: 16156215211,
                            byMember: {
                                _id: "u101",
                                username: "Tal",
                                fullname: "Tal Tarablus",
                                imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
                            },
                            style: {
                                bgColor: "#26de81",
                            },
                            attachments: [{
                                url: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
                            }],
                        },
                    ],
                    style: {},
                },
                {
                    id: "g102",
                    title: "Group 2",
                    tasks: [
                        {
                            id: "c103",
                            title: "Do that",
                            archivedAt: 1589983468418,
                        },
                        {
                            id: "c104",
                            title: "Help me",
                            status: "in-progress",
                            description: "description",
                            comments: [
                                {
                                    id: "ZdPnm",
                                    txt: "also @yaronb please CR this",
                                    createdAt: 1590999817436,
                                    byMember: {
                                        _id: "u101",
                                        fullname: "Tal Tarablus",
                                        imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
                                    },
                                },
                            ],
                            checklists: [
                                {
                                    id: "YEhmF",
                                    title: "Checklist",
                                    todos: [
                                        {
                                            id: "212jX",
                                            title: "To Do 1",
                                            isDone: false,
                                        },
                                    ],
                                },
                            ],
                            memberIds: ["u101"],
                            labelIds: ["l101", "l102"],
                            createdAt: 1590999730348,
                            dueDate: 16156215211,
                            byMember: {
                                _id: "u101",
                                username: "Tal",
                                fullname: "Tal Tarablus",
                                imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
                            },
                            style: {
                                bgColor: "#26de81",
                            },
                            attachments: {
                                url: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
                            },
                        },
                    ],
                    style: {},
                },
            ],
            activities: [
                {
                    id: "a101",
                    txt: "Changed Color",
                    createdAt: 154514,
                    byMember: {
                        _id: "u101",
                        fullname: "Abi Abambi",
                        imgUrl: "http://some-img",
                    },
                    task: {
                        id: "c101",
                        title: "Replace Logo",
                    },
                },
            ],
            cmpsOrder: ["status-picker", "member-picker", "date-picker"],
        })
    }
    localStorage.setItem(STORAGE_BOARDS_KEY, JSON.stringify(boards))
    return boards
}

async function add(board) {
    return board._id
        ? await storageService.put(STORAGE_BOARDS_KEY, board)
        : await storageService.post(STORAGE_BOARDS_KEY, board)
}



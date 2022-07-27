export const boardService = {
	query,
	save,
	remove,
	getBoardById,
	getTaskById,
	getEmptyBoard,
	getEmptyGroup
}
import { utilService } from '../services/util.service'

import { storageService } from './storage-service.js'

import { httpService } from './http.service.js'
const STORAGE_BOARDS_KEY = 'boardsDB'

// async function query() {
// 	if (!localStorage.getItem(STORAGE_BOARDS_KEY)) {
// 		// console.log('creating static boards...')
// 		const boards = _createStaticBoards()
// 		localStorage.setItem(STORAGE_BOARDS_KEY, JSON.stringify(boards))
// 		return boards
// 	}
// 	return Promise.resolve(JSON.parse(localStorage.getItem(STORAGE_BOARDS_KEY)))
// }
async function query(filterBy) {
	const queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`
	return httpService.get(`board${queryStr}`)
}

async function getBoardById({ _id }, status) {
	const boards = await query()
	const currBoard = boards.find(board => _id === board._id)
	return currBoard
}
async function getTaskById({ id, currBoard }, status) {
	const currTask = currBoard.find(group => {
		group.find(task => {
			return task.id === id
		})
	})
	return currTask
}

function _createStaticBoards() {
	const boards = []
	for (let i = 0; i < 4; i++) {
		boards.push({
			title: 'Robot dev proj',
			archivedAt: 1589983468418,
			createdAt: 1589983468418,
			isStatic: false,
			isStarred: false,
			createdBy: {
				fullname: 'Abi Abambi',
				imgUrl: 'http://some-img'
			},
			style: {
				backgroundImg: 'https://wallpapercave.com/wp/wp4676582.jpg'
			},

			labels: [
				{
					id: 'r101',
					title: 'Done',
					color: '#61bd4f'
				},
				{
					id: 'r102',
					title: 'Progress',
					color: '#61bd33'
				}
			],
			members: [],
			groups: [
				{
					id: 'q101',
					title: 'Group 1',
					archivedAt: 1589983468418,
					type: 'container',
					tasks: [
						{
							id: 'k101',
							title: 'Replace logo',
							members: [],
							type: 'draggable',
							createdAt: null,
							dueDate: null
						},
						{
							id: 'k102',
							title: 'Add Samples',
							members: [],
							type: 'draggable',
							createdAt: null,
							dueDate: null
						}
					],
					style: {}
				},
				{
					id: 'q102',
					title: 'Group title',
					archivedAt: 1589983468418,
					type: 'container',
					tasks: [
						{
							id: 'k103',
							title: 'try to find a reason to live',
							members: [],
							type: 'draggable',
							description: '',
							createdAt: null,
							dueDate: null
						},
						{
							id: 'k104',
							title: 'learn css',
							members: [],
							type: 'draggable',
							description: '',
							createdAt: null,
							dueDate: null
						}
					],
					style: {}
				},
				{
					id: 'q103',
					title: 'more demo',
					archivedAt: 1589983468418,
					type: 'container',
					tasks: [
						{
							id: 'k104',
							title: 'save tasks',
							type: 'draggable',
							description: '',
							createdAt: null,
							dueDate: null,
							members: []
						},
						{
							id: 'k105',
							title: 'add labels',
							type: 'draggable',
							description: '',
							createdAt: null,
							dueDate: null,
							members: []
						},
						{
							id: 'k106',
							title: 'fix modal',
							type: 'draggable',
							description: '',
							createdAt: null,
							dueDate: null,
							members: []
						},
						{
							id: 'k107',
							title: 'fix dnd',
							type: 'draggable',
							description: '',
							createdAt: null,
							dueDate: null,
							members: []
						},
						{
							id: 'k108',
							title: 'more modals',
							type: 'draggable',
							description: '',
							createdAt: null,
							dueDate: null,
							members: []
						},
						{
							id: 'k109',
							title: 'change font',
							type: 'draggable',
							description: '',
							createdAt: null,
							dueDate: null,
							members: []
						},
						{
							id: 'k110',
							title: 'more logos',
							type: 'draggable',
							description: '',
							createdAt: null,
							dueDate: null,
							members: []
						},
						{
							id: 'k111',
							title: 'eat healthy',
							type: 'draggable',
							description: '',
							createdAt: null,
							dueDate: null,
							members: []
						},
						{
							id: 'k112',
							title: 'workout',
							type: 'draggable',
							description: '',
							createdAt: null,
							dueDate: null,
							members: []
						}
					],
					style: {}
				},
				{
					id: 'q104',
					title: 'bootcamp',
					archivedAt: 1589983468418,
					type: 'container',
					tasks: [
						{
							id: 't101',
							title: 'Do it',
							archivedAt: 1589983468418,
							members: [],
							type: 'draggable',
							description: '',
							createdAt: 1590999730348,
							dueDate: 16156215211
						},
						{
							id: 't102',
							title: 'Help me',
							status: 'in-progress',
							members: [],
							description: 'description',
							comments: [
								{
									id: 'ZdPnm',
									txt: 'also @yaronb please CR this',
									createdAt: 1590999817436,
									byMember: {
										fullname: 'Tal Tarablus',
										imgUrl:
											'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg'
									}
								}
							],
							checklists: [
								{
									id: 'YEhmF',
									title: 'Checklist',
									todos: [
										{
											id: '212jX',
											title: 'To Do 1',
											isDone: false
										}
									]
								}
							],
							memberIds: [],
							// labelIds: [utilService.makeId(), utilService.makeId()],
							createdAt: 1590999730348,
							dueDate: 16156215211,
							byMember: {
								username: '',
								fullname: '',
								imgUrl:
									'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg'
								// imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
							},
							style: {
								bgColor: '#26de81'
							},
							attachments: [
								{
									url: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg'
									// url: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
								}
							]
						}
					],
					style: {}
				}
			],
			activities: [
				{
					id: 'h101',
					txt: 'Changed Color',
					createdAt: 154514,
					byMember: {
						fullname: 'Abi Abambi',
						imgUrl:
							'https://img.wattpad.com/9dda3d8b28299a6ac4c869f6e3aa0aff07072bda/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f52307167515137696151504368673d3d2d31362e3136326663353239613562623265313636333431383937303230352e6a7067?s=fit&w=720&h=720'
					},
					task: 'Replace Logo'
				}
			],
			cmpsOrder: ['status-picker', 'member-picker', 'date-picker']
		})
	}
	localStorage.setItem(STORAGE_BOARDS_KEY, JSON.stringify(boards))
	return boards
}

async function remove(boardId) {
	await httpService.delete(`board/${boardId}`)
	boardChannel.postMessage({ type: 'removeBoard', boardId })
}
async function save(board) {
	console.log('board:', board)
	if (!board._id) {
		const addedBoard = await httpService.post(`board`, board)
		return addedBoard
		// boardChannel.postMessage({type: 'addBoard', board: addedBoard})
	}
	const updatedBoard = await httpService.put(`board/:${board._id}`, board)
	// boardChannel.postMessage({type: 'updateBoard', board: updatedBoard})
	return updatedBoard
}

function getEmptyBoard() {
	return {
		title: 'Robot dev proj',
		archivedAt: null,
		createdAt: Date.now(),
		isStatic: false,
		isStarred: false,
		createdBy: {
			_id: utilService.makeId(),
			fullname: '',
			imgUrl: ''
		},
		style: {
			//GENERATE RANDOM IMAGE/ IMAGE USER PICKED
			backgroundImg: 'https://wallpapercave.com/wp/wp4676582.jpg'
		},
		groups: [],
		labels: [
			{
				id: utilService.makeId(),
				title: '',
				color: '#61bd4f'
			},
			{
				id: utilService.makeId(),
				title: '',
				color: '#61bd33'
			}
		],
		members: [],
		activities: [
			{
				id: utilService.makeId(),
				txt: 'Changed Color',
				createdAt: 154514,
				byMember: {
					_id: utilService.makeId(),
					fullname: 'Abi Abambi',
					imgUrl: 'http://some-img'
				},
				task: {
					id: utilService.makeId(),
					title: 'Replace Logo'
				}
			}
		],
		cmpsOrder: ['status-picker', 'member-picker', 'date-picker']
	}
}

function getEmptyGroup() {
	return {
		id: 'f103',
		title: 'bootcamp',
		archivedAt: null,
		type: 'container',
		tasks: [
			{
				id: 't102',
				title: '',
				status: '',
				members: [],
				description: '',
				comments: [
					{
						id: 'ZdPnm',
						txt: 'also @yaronb please CR this',
						createdAt: null,
						byMember: {
							fullname: '',
							imgUrl: ''
						}
					}
				],
				checklists: [
					{
						id: 'YEhmF',
						title: 'Checklist',
						todos: [
							{
								id: '212jX',
								title: 'To Do 1',
								isDone: false
							}
						]
					}
				],
				memberIds: [],
				createdAt: null,
				dueDate: null,
				byMember: {
					username: '',
					fullname: '',
					imgUrl: ''
				},
				style: {
					bgColor: ''
				},
				attachments: [
					{
						url: ''
					}
				]
			}
		],
		style: {}
	}
}

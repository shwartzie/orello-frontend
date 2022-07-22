export const boardService = {
	query,
	getBoardById,
	getStaticBoards,
	add,
	getTaskById,
	remove,
	getEmptyBoard,
	getEmptyGroup
}
import { utilService } from '../services/util.service'

import { storageService } from './storage-service.js'
const STORAGE_BOARDS_KEY = 'boardsDB'
async function query() {
	if (!localStorage.getItem(STORAGE_BOARDS_KEY)) {
		console.log('creating static boards...')
		const boards = _createStaticBoards()
		localStorage.setItem(STORAGE_BOARDS_KEY, JSON.stringify(boards))
		return boards
	}
	return Promise.resolve(JSON.parse(localStorage.getItem(STORAGE_BOARDS_KEY)))
}

async function getBoardById({ _id }, status) {
	const boards = await query()
	const currBoard = boards.find(board => _id === board._id)
	return currBoard
}
async function getTaskById({ id, currBoard }, status) {
	console.log(currBoard)
	const currTask = currBoard.find(group => {
		console.log(group)
		group.find(task => {
			return task.id === id
		})
	})
	return currTask
}

async function getStaticBoards() {
	if (!localStorage.getItem(STORAGE_BOARDS_KEY)) {
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
			title: 'Robot dev proj',
			archivedAt: 1589983468418,
			createdAt: 1589983468418,
			isStatic: Math.random() > 0.5,
			isStarred: false,
			createdBy: {
				_id: utilService.makeId(),
				fullname: 'Abi Abambi',
				imgUrl: 'http://some-img'
			},
			style: {
				backgroundImg: 'https://wallpapercave.com/wp/wp4676582.jpg'
			},

			labels: [
				{
					id: utilService.makeId(),
					title: 'Done',
					color: '#61bd4f'
				},
				{
					id: utilService.makeId(),
					title: 'Progress',
					color: '#61bd33'
				}
			],
			members: [
				{
					_id: utilService.makeId(),
					fullname: 'Tal Tarablus',
					imgUrl: 'https://www.google.com'
				}
			],
			groups: [
				{
					id: utilService.makeId(),
					title: 'Group 1',
					archivedAt: 1589983468418,
					tasks: [
						{
							id: utilService.makeId(),
							title: 'Replace logo'
						},
						{
							id: utilService.makeId(),
							title: 'Add Samples'
						}
					],
					style: {}
				},
				{
					id: utilService.makeId(),
					title: 'Group title',
					archivedAt: 1589983468418,
					tasks: [
						{
							id: utilService.makeId(),
							title: 'try to find a reason to live'
						},
						{
							id: utilService.makeId(),
							title: 'learn css'
						}
					],
					style: {}
				},
				{
					id: utilService.makeId(),
					title: 'Group 3',
					archivedAt: 1589983468418,
					tasks: [
						{
							id: utilService.makeId(),
							title: 'logo'
						},
						{
							id: utilService.makeId(),
							title: 'title'
						}
					],
					style: {}
				},
				{
					id: utilService.makeId(),
					title: 'homework',
					archivedAt: 1589983468418,
					tasks: [
						{
							id: utilService.makeId(),
							title: 'Replace pc'
						},
						{
							id: utilService.makeId(),
							title: 'Add title'
						}
					],
					style: {}
				},
				{
					id: utilService.makeId(),
					title: 'more demo',
					archivedAt: 1589983468418,
					tasks: [
						{
							id: utilService.makeId(),
							title: 'add tasks'
						},
						{
							id: utilService.makeId(),
							title: 'add labels'
						},
						{
							id: utilService.makeId(),
							title: 'fix modal'
						},
						{
							id: utilService.makeId(),
							title: 'fix dnd'
						},
						{
							id: utilService.makeId(),
							title: 'more modals'
						},
						{
							id: utilService.makeId(),
							title: 'change font'
						},
						{
							id: utilService.makeId(),
							title: 'more logos'
						},
						{
							id: utilService.makeId(),
							title: 'eat healthy'
						},
						{
							id: utilService.makeId(),
							title: 'workout'
						},
						{
							id: utilService.makeId(),
							title: 'more coding'
						},
						{
							id: utilService.makeId(),
							title: 'some cooking'
						},
						{
							id: utilService.makeId(),
							title: 'Add Samples'
						},
						{
							id: utilService.makeId(),
							title: 'more Samples'
						},
						{
							id: utilService.makeId(),
							title: 'cool tricks'
						},
						{
							id: utilService.makeId(),
							title: 'clean house'
						},
					],
					style: {}
				},
				{
					id: utilService.makeId(),
					title: 'Group 1',
					archivedAt: 1589983468418,
					tasks: [
						{
							id: utilService.makeId(),
							title: 'fix pc'
						},
						{
							id: utilService.makeId(),
							title: 'eat sugar'
						}
					],
					style: {}
				},
				{
					id: utilService.makeId(),
					title: 'home tasks',
					archivedAt: 1589983468418,
					tasks: [
						{
							id: utilService.makeId(),
							title: 'clean room'
						},
						{
							id: utilService.makeId(),
							title: 'buy tp'
						}
					],
					style: {}
				},
				{
					id: utilService.makeId(),
					title: 'notes',
					archivedAt: 1589983468418,
					tasks: [
						{
							id: utilService.makeId(),
							title: 'buy birthday gifts'
						},
						{
							id: utilService.makeId(),
							title: 'buy cookies'
						}
					],
					style: {}
				},
				{
					id: utilService.makeId(),
					title: 'bootcamp',
					tasks: [
						{
							id: utilService.makeId(),
							title: 'Do it',
							archivedAt: 1589983468418
						},
						{
							id: utilService.makeId(),
							title: 'Help me',
							status: 'in-progress',
							description: 'description',
							comments: [
								{
									id: 'ZdPnm',
									txt: 'also @yaronb please CR this',
									createdAt: 1590999817436,
									byMember: {
										_id: utilService.makeId(),
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
							memberIds: [utilService.makeId()],
							// labelIds: [utilService.makeId(), utilService.makeId()],
							createdAt: 1590999730348,
							dueDate: 16156215211,
							byMember: {
								_id: utilService.makeId(),
								username: 'Tal',
								fullname: 'Tal Tarablus',
								imgUrl:
									'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg'
							},
							style: {
								bgColor: '#26de81'
							},
							attachments: [
								{
									url: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg'
								}
							]
						}
					],
					style: {}
				},
				{
					id: utilService.makeId(),
					title: 'Group 2',
					tasks: [
						{
							id: utilService.makeId(),
							title: 'Do that',
							archivedAt: 1589983468418
						},
						{
							id: utilService.makeId(),
							title: 'Help me',
							status: 'in-progress',
							description: 'description',
							comments: [
								{
									id: 'ZdPnm',
									txt: 'also @yaronb please CR this',
									createdAt: 1590999817436,
									byMember: {
										_id: utilService.makeId(),
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
							memberIds: [utilService.makeId()],
							labelIds: [utilService.makeId(), utilService.makeId()],
							createdAt: 1590999730348,
							dueDate: 16156215211,
							byMember: {
								_id: utilService.makeId(),
								username: 'Tal',
								fullname: 'Tal Tarablus',
								imgUrl:
									'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg'
							},
							style: {
								bgColor: '#26de81'
							},
							attachments: {
								url: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg'
							}
						}
					],
					style: {}
				}
			],
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
		})
	}
	localStorage.setItem(STORAGE_BOARDS_KEY, JSON.stringify(boards))
	return boards
}

async function add(board, isStarred) {
    if(!isStarred || isStarred) {
        board.isStarred = isStarred
    }
    return board._id
        ? await storageService.put(STORAGE_BOARDS_KEY, board)
        : await storageService.post(STORAGE_BOARDS_KEY, board)
}

function remove(id) {
	return storageService.remove(KEY, id)
}

function getEmptyBoard() {
	return {
		_id: utilService.makeId(),
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
		members: [
			{
				//CHANGE TO USER NAME AND ADD HIS PROFILE IMAGE
				_id: utilService.makeId(),
				fullname: 'Tal Tarablus',
				imgUrl: 'https://www.google.com'
			}
		],
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
		id: utilService.makeId(),
		title: '',
		archivedAt: null,
		tasks: [
			{
				id: utilService.makeId(),
				title: ''
			},
			{
				id: utilService.makeId(),
				title: ''
			}
		],
		style: {}
	}
}

export const applyDrag = (arr, dragResult) => {
	const { removedIndex, addedIndex, payload } = dragResult
	if (removedIndex === null && addedIndex === null) return arr
	const result = [...arr]
	let itemToAdd = payload
	if (removedIndex !== null) {
		itemToAdd = result.splice(removedIndex, 1)[0]
	}
	if (addedIndex !== null) {
		result.splice(addedIndex, 0, itemToAdd)
	}
	return result
}

// export const applyDrag = (arr, dragResult) => {
// 	// console.log('arr', arr)
// 	// console.log('dragResult', dragResult)
// 	const { removedIndex, addedIndex, payload } = dragResult
// 	console.log('removedIndex', removedIndex)
// 	console.log('addedIndex', addedIndex)
// 	if (removedIndex === null && addedIndex === null) return arr

// 	const result = JSON.parse(JSON.stringify(arr))
// 	let itemToAdd = payload
// 	// debugger
// 	if (removedIndex !== null) {
// 		itemToAdd = result.splice(removedIndex, 1)[0]
// 	}

// 	if (addedIndex !== null) {
// 		result.splice(addedIndex, 0, itemToAdd)
// 	}

// 	return result
// }

// export const applyDrag2 = (arr, dragResult) => {
// 	// console.log('arr', arr)
// 	// console.log('dragResult', dragResult)
// 	const { removedIndex, addedIndex, payload } = dragResult
// 	console.log('removedIndex', removedIndex)
// 	console.log('addedIndex', addedIndex)
// 	if (removedIndex === null && addedIndex === null) return arr

// 	const result = JSON.parse(JSON.stringify(arr))
// 	let itemToAdd = payload
// 	// debugger
// 	if (removedIndex !== null) {
// 		itemToAdd = result.splice(removedIndex, 1)[0]
// 	}

// 	if (addedIndex !== null) {
// 		result.splice(addedIndex, 0, itemToAdd)
// 	}

// 	return result
// }

export const generateItems = (count, creator) => {
	const result = []
	for (let i = 0; i < count; i++) {
		result.push(creator(i))
	}
	return result
}

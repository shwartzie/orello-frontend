import axios from 'axios'

export const unsplashService = {
	getImgs,
	searchImgs
}

const ACCESS_KEY = 'nONtg_Q1o98_DbjK3btbpEvFlGDY3jfoAQjR41gFBjY'

async function getImgs() {
	try {
		const { data } = await axios.get(
			'https://api.unsplash.com/photos/?per_page=30&client_id=' + ACCESS_KEY
		)
		console.log(data)
		return destructImgs(data)
	} catch (err) {
		console.error('Error in fetching images 🤕', err)
		// return err
	}
}

function destructImgs(data) {
	return data.map(
		({ user: { name }, urls: { regular: full, thumb }, color }) => ({
			name,
			full,
			thumb,
			color
		})
	)
}

async function searchImgs(params) {
	console.log('getting imgs from unsplash')
	try {
		const {
			data: { results }
		} = await axios.get('https://api.unsplash.com/search/photos?per_page=30', {
			params: { query: params },
			headers: {
				Authorization: 'Client-ID ' + ACCESS_KEY
			}
		})
		return destructImgs(results)
	} catch (err) {
		console.error('Error in fetching images 🤕', err)
	}
}

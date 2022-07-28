import axios from 'axios'

export const unsplashService = {
	getImgs
}

const ACCESS_KEY = 'nONtg_Q1o98_DbjK3btbpEvFlGDY3jfoAQjR41gFBjY'

async function getImgs() {
	console.log('getting imgs from unsplash')
	try {
		const { data } = await axios.get(
			'https://api.unsplash.com/photos/?per_page=30&client_id=' + ACCESS_KEY
		)
		return destructImgs(data)
	} catch (err) {
		console.error('Error in fetching images 🤕', err)
		// return err
	}
}

function destructImgs(data) {
	return data.map(({ user: { name }, urls: { full, thumb }, color }) => ({
		user: { name },
		urls: { full, thumb },
		color
	}))
}

// async function onSearchSubmit(term) {
//         const response = await axios.get('https://api.unsplash.com/search/photos', {
//             params: { query: term},
//             headers: {
//                 Authorization: 'Client-ID YOUR_ACCESS_KEY'
//             }
//         })

//         console.log(response);
//     }

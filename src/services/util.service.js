import moment from 'moment'

export const utilService = {
	delay,
	getRandomInt,
	makeId,
	getActivity,
	getTimestamp,
	debounce,
	filterArray,
	getGuest
}
function getGuest() {
	return {
		_id: utilService.makeId(10),
		fullname: 'Guest',
		username: 'Guest',
		imgUrl: 'https://cdn2.iconfinder.com/data/icons/audio-16/96/user_avatar_profile_login_button_account_member-512.png',
	}
}
function delay(ms = 1500) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}
function filterArray(arr, filterBy) {
	return arr?.some(item => {
		if (item._id) {
			return item._id === filterBy._id
		}

		if (item.id) {
			return item.id === filterBy.id
		}
	})
}

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
	var txt = ''
	var possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (var i = 0; i < length; i++) {
		txt += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return txt
}

function getActivity(activity, user) {
	return {
		id: makeId(),
		txt: activity,
		createdAt: Date.now(),
		byMember: user
	}
}

function getTimestamp(timestamp) {
	var currDate = moment(timestamp).fromNow()
	return currDate
}

function debounce(func, timeout = 300) {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}

function timeAgo(ms = new Date()) {
	const date = ms instanceof Date ? ms : new Date(ms)
	const formatter = new Intl.RelativeTimeFormat('en')
	const ranges = {
		years: 3600 * 24 * 365,
		months: 3600 * 24 * 30,
		weeks: 3600 * 24 * 7,
		days: 3600 * 24,
		hours: 3600,
		minutes: 60,
		seconds: 1
	}

	const secondsElapsed = (date.getTime() - Date.now()) / 1000
	for (let key in ranges) {
		if (ranges[key] < Math.abs(secondsElapsed)) {
			const delta = secondsElapsed / ranges[key]
			let time = formatter.format(Math.round(delta), key)
			if (time.includes('in')) {
				time = time.replace('in ', '')
				time = time.replace('ago', '')
				time += ' ago'
			}
			return time //? time : 'Just now'
		}
	}
}

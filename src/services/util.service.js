import moment from "moment"

export const utilService = {
    delay,
    getRandomInt,
    makeId,
    getActivity,
    getTimestamp,
}

function delay(ms = 1500) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
    var txt = ""
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getActivity(activity, task,group=null,byMember) {
    let txt=''
    if(group){
        txt=`${activity} ${task.title}`
    }else{
        txt=activity
    }
    return {
        id: makeId(),
        txt: activity,
        createdAt: Date.now(),
        byMember,
        task,
    }
}

function getTimestamp(timestamp) {
    var currDate = moment(timestamp).fromNow()
    return currDate
}

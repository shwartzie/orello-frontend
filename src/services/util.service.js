export const utilService = {
    delay,
    getRandomInt,
    makeId,
    getActivity,
};

function delay(ms = 1500) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
    var txt = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getActivity(activity, task) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;

    return {
        id: makeId(),
        txt: activity,
        createdAt: formattedToday,
        byMember: {
            _id: utilService.makeId(),
            fullname: "Roni Shwarzman",
            imgUrl: "src/assets/images/my-profile-pic.jpg",
        },
        task,
    };
}

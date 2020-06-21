const db = require('../db/db')


//get all shows
getAllshows = async () => {
    try {
        let response = db.any("SELECT * from shows")
        return response
    } catch (error) {
        console.log("error", error)
    };
}

//get shows by id
getShowByid = async (id) => {
    try {
        let response = db.one("SELECT * from shows WHERE id = $1", [id])
        return response
    } catch (error) {
        console.log("error", error)
    };
}

//post show
addNewShow = async () => {
    try {
    let insertQuery = db.none("INSERT into shows (title, img_url, genre_id) VALUES($1,$2, $3)")
    } catch (error) {
        console.log("error", error)
    };
}

//get all shows for specific genre_id
getShowsByGenreid = async (genre_id) => {
    try {
        let response = db.any("SELECT * from shows WHERE genre_id = $1", [genre_id])
        return response
    } catch (error) {
        console.log("error", error)
    };
}

//get all shows for specific user_id
getShowsByUserid = async (user_id) => {
    try {
        let response = db.any("SELECT * from shows WHERE user_id = $1", [user_id])
        return response
    } catch (error) {
        console.log("error", error)
    };
}

module.exports = {
    getAllshows,
    getShowByid,
    getShowsByGenreid,
    getShowsByUserid
}

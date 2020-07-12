const db = require('../db/db')


//get all shows
getAllshows = async () => {
    try {
        let response = db.any("SELECT shows.id, title, img_url, genre_name FROM shows JOIN genres ON shows.genre_id = genres.id")
        // let response = db.any(`SELECT shows.id, title, img_url, genre_name, username FROM shows 
        // JOIN genres ON shows.genre_id = genres.id 
        // JOIN shows_users ON shows.id = shows_users.show_id
        // JOIN users ON shows_users.user_id = users.id`)
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
addNewShow = async (title, img_url, genre_id) => {
    try {
    const insertQuery =`INSERT into shows (title, img_url, genre_id) VALUES($1,$2,$3)`
    let response = await db.none(insertQuery, [title, img_url, genre_id])
    // console.log("help", response)
    return response
    } catch (error) {
        console.log("error", error)
    };
}

//get all shows for specific genre_id
getShowsByGenreid = async (genre_id) => {
    try {
        let response = await db.any("SELECT * from shows WHERE genre_id = $1", [genre_id])
        // console.log("here", response)
        return response
    } catch (error) {
        console.log("error", error)
    };
}

//get all shows for specific user_id
getShowsByUserid = async (user_id) => {
    try {
        let response = await db.any(`SELECT shows.id, title, img_url, genre_name, user_id, username, avatar_url 
                                   FROM shows 
                                   JOIN genres ON shows.genre_id = genres.id
                                   JOIN shows_users ON shows.id = shows_users.show_id 
                                   JOIN users ON shows_users.user_id = users.id 
                                   WHERE user_id = $1
                                   GROUP BY shows.id, shows_users.user_id, users.username, users.avatar_url, genres.genre_name`, [user_id])
        return response
    } catch (error) {
        console.log("error", error)
    };
}

//get users watching shows
getUserWatchingShow = async () => {
    try{
        let response = await db.any(`SELECT username, title 
                                     FROM shows 
                                     JOIN shows_users 
                                     ON shows.id = shows_users.show_id 
                                     JOIN users 
                                     ON shows_users.user_id = users.id`)
              return response                          
        }catch (error) {
        console.log("error", error)
    };
}

module.exports = {
    getAllshows,
    getShowByid,
    getShowsByGenreid,
    getShowsByUserid,
    addNewShow,
    getUserWatchingShow
}

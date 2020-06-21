const db = require('../db/db')

//get all users
getAllUsers = async () => {
    try {
        let response = db.any("SELECT * from users")
        return response
    } catch (error) {
        console.log("error", error)
    }
}

//get single user by id
getUserByid = async (id) => {
    try {
        let response = db.one("SELECT * from users WHERE id = $1", [id])
        return response
    } catch (error) {
        console.log("error", error)
    };
}

//post user
addNewUser = async (username, avatar_url) => {
    try {
        const insertQuery = `INSERT into users(username, avatar_url) VALUES($1,$2)`
        let response = await db.any(insertQuery, [username,avatar_url])
        return response
    } catch (error) {
        console.log("error", error)
    };
}


module.exports = {
    getAllUsers,
    getUserByid,
    addNewUser
}
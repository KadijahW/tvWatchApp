const db = require('../db/db')


//get all comments
getAllComments = async () => {
    try {
        let response = db.any("SELECT * from comments")
        return response
    } catch (error) {
        console.log("error", error)
    };
}

//post a comment
addNewComment = async (user_id, comment_body) => {
    try {
    const insertQuery = `INSERT into comments(user_id, comment_body) VALUES($1,$2)`
    let response = await db.any(insertQuery,[user_id, comment_body])
    return response
    } catch (error) {
        console.log("error", error)
    };
}

module.exports ={
getAllComments,
addNewComment
}
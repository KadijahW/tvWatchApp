const db = require('../db/db')



//get all comments for specific show_id
getAllComments = async (show_id) => {
    try{
        let response = await db.any(`SELECT comments.id, comment_body, username, show_id FROM comments 
        JOIN users ON comments.user_id = users.id 
        WHERE show_id = $1`, [show_id])
        console.log(response)
        return response
    }catch(error){
        console.log('err', error)
    }
}

//post a comment
addNewComment = async (user_id, comment_body, show_id) => {
    try {
    const insertQuery = `INSERT into comments(user_id, comment_body, show_id) VALUES($1,$2, $3) RETURNING *`
    let response = await db.one(insertQuery,[user_id, comment_body, show_id])

    return response
    } catch (error) {
        console.log("error", error)
    };
}

//get comment by id
getCommentById = async (id) => {
    try{
        let response = await db.one(`SELECT comments.id, comment_body, username FROM comments JOIN users ON comments.user_id = users.id
                        WHERE comments.id = $1`, [id])
            return response
    }catch(error){
        console.log("error", error)
    };
}

module.exports ={
getAllComments,
addNewComment, 
getCommentById
}
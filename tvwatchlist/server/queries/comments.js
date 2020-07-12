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
    const insertQuery = `INSERT into comments(user_id, comment_body, show_id) VALUES($1,$2, $3)`
    let response = await db.none(insertQuery,[user_id, comment_body, show_id])
    return response
    } catch (error) {
        console.log("error", error)
    };
}

module.exports ={
getAllComments,
addNewComment, 
// comments
}
const express = require('express');
const router = express.Router();
const commentQueries = require('../queries/comments');



//get all comments for specific show
router.get('/show/:show_id', async(req, res) => {
    const show_id = req.params.show_id;
    try{
        const comments = await commentQueries.getAllComments(show_id)
        res.json({
            payload: comments,
            message: "Success"
        })
    }catch(error){
        res.status(500).json({
            payload: null,
            message: 'failed',
        });
    }
})

//add comment
router.post('/', async (req, res) => {
    const {
        user_id,
        comment_body,
        show_id
    } = req.body
    try {
        const newComment = await commentQueries.addNewComment(user_id, comment_body, show_id)
        res.json({
            payload: newComment,
            message: 'added comment'
        })
    } catch (error) {
        res.status(500).json({
            payload: null,
            message: 'failed',
        });
    }
})

module.exports = router;
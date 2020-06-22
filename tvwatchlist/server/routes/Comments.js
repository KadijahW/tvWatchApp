const express = require('express');
const router = express.Router();
const commentQueries = require('../queries/comments');


router.get('/', async (req, res) => {
    try{
        let response = await commentQueries.comments()
        res.json({
            payload: response,
            message: "all comments retrieved"
        })
    }catch(error){
        res.status(500).json({
            payload: null,
            message: 'failed retrieving comments',
        });
    }
})

//get all comments for specific show
router.get('/show/:show_id', async (req, res) => {
const { show_id } = req.params.show_id
// console.log("here", show_id)
    try {
        let comments = await commentQueries.getAllComments(show_id)
        res.json({
            payload: comments,
            message: "all comments retrieved"
        })
    } catch (error) {
        res.status(500).json({
            payload: null,
            message: 'failed retrieving comments',
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
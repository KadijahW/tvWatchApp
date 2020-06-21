const express = require('express');
const router = express.Router();
const commentQueries = require('../queries/comment');


//get all comments
router.get('/', async (req, res) => {
    try {
        let comments = await commentQueries.getAllComments()
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
    const {user_id, comment_body} = req.body
        try {
        const newComment = await commentQueries.addNewComment(user_id, comment_body)
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
const express = require('express');
const router = express.Router();
const showQueries = require('../queries/shows');


//get all shows
router.get('/', async (req, res) => {
    try {
        let shows = await showQueries.getAllshows()
        res.json({
            payload: shows,
            message: "all shows"
        })
    } catch (error) {
        res.status(500).json({
            payload: null,
            message: 'failed retrieving show',
        });
    }
})
//get shows by id
router.get('users/:id', async (req, res) => {
    const user_id = req.params.user_id;
    try {
        let show = await showQueries.getShowByid(user_id)
        console.log(show)
        res.json({
            payload: show,
            message: 'retrieved show'
        })
    } catch (error) {
        res.status(500).json({
            payload: null,
            message: 'failed retrieving show',
        });
    }
})

//post show
router.post('/', async (req, res) => {
    const {
        title,
        img_url,
        genre_id
    } = req.body
    try {
        let newShow = await showQueries.addNewShow(title, img_url, genre_id)
        console.log(newShow)
        res.json({
            payload: newShow,
            message: 'added show'
        })
    } catch (error) {
        res.status(500).json({
            payload: null,
            message: 'failed retrieving shows',
        });
    }
})

//get show for specific genre_id
router.get('/genre/:genre_id', async (req, res) => {
    const genre_id = req.params.genre_id;
    // console.log("hello", genre_id)
    try {
        let shows = await showQueries.getShowsByGenreid(genre_id)
        res.json({
            payload: shows,
            message: 'retrieved shows'
        })
    } catch (error) {
        res.status(500).json({
            payload: null,
            message: 'failed retrieving shows',
        });
    }
})

//get shows for specific user_id
router.get('/user/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    try {
        let show = await showQueries.getShowsByUserid(user_id)
        // console.log(show)
        res.json({
            payload: show,
            message: 'retrieved show'
        })
    } catch (error) {
        res.status(500).json({
            payload: null,
            message: 'failed retrieving show',
        });
    }
})

module.exports = router;
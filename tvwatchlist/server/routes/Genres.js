const express = require('express');
const router = express.Router();
const genresQueries = require('../queries/genres');

//get all genres
router.get('/', async (req, res) => {
    try {
        let genres = await genresQueries.getAllGenres()
        res.json({
            payload: genres,
            message: "all genres retrieved"
        })
    } catch (error) {
        res.status(500).json({
            payload: null,
            message: 'failed retrieving genres',
        });
    }
})

router.post('/', async (req, res) => {
    const { genre_name } = req.body
    try {
        const newGenre = await genresQueries.addNewGenre(genre_name)
        res.json({
            payload: newGenre,
            message: "added genre"
        })
    } catch (error) {
        res.status(500).json({
            payload: null,
            message: 'failed posting genre',
        });
    }
})

module.exports = router;
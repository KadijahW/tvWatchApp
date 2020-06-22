const express = require('express');
const router = express.Router();
const userQueries = require('../queries/users');


//get all users
router.get('/', async (req, res) => {
    try {
        let users = await userQueries.getAllUsers()
        res.json({
            payload: users,
            message: "all users retrieved"
        })
    } catch (error) {
        res.status(500).json({
            payload: null,
            message: 'failed retrieving users',
        });
    }
})

//get single user by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let user = await userQueries.getUserByid(id)
        res.json({
            payload: user,
            message: 'retrieved user'
        })
    } catch (error) {
        res.status(500).json({
            payload: null,
            message: 'failed retrieving users',
        });
    }
})

//add new user
router.post('/', async (req, res) => {
    const {
        username,
        avatar_url
    } = req.body
    try {
        let newUser = await userQueries.addNewUser(username, avatar_url)
        res.json({
            payload: newUser,
            message: 'added user'
        })
    } catch (error) {
        res.status(500).json({
            payload: null,
            message: 'failed',
        });
    }
})

module.exports = router;
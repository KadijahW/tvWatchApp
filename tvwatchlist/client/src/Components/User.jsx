import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Profile from './Profile'
import './CSS/Users.css'


class User extends React.Component {
    constructor() {
        super()
        this.state = {
            loggedInUser: 1,
            users: [],
            username: false
        }
    }

    async componentDidMount() {
        try {
            let url = "http://localhost:3010/users"
            let res = await axios.get(url)
            console.log(res.data.payload)
            this.setState({
                users: res.data.payload
            })
        } catch (error) {
            console.log(error)
        }
    }
    handleChange = (e) => {
        this.setState({
            username: true
        })
    }
    render() {
        const { users, username} = this.state;
        if (!username) {
            let userArr = users.map(user => {
                return (
                    <div className="container">
                        <div className="userInfo">
                            <Link to={`/users/${user.id}`} onClick={this.handleChange} > <p className="username">{user.username}</p> </Link>
                            <img className="picture" src={user.avatar_url} key={user.id} alt="profilePicture" />
                        </div>
                    </div>
                )
            })
            return userArr
        } else {
            return (
                <div>
                    <Profile />
                </div>
            )
        }

    }
}

export default User;
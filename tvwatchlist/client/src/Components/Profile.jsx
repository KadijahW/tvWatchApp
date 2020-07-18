import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './CSS/Profile.css'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.match.params.id,
            shows: [],
            username: '',
            avatar_url: ''
        }
    }
    componentDidMount() {
        this.getUserShows()
    }

    getUserShows = async () => {
        const {user_id} = this.state
        console.log(user_id)
        let userURL = `http://localhost:3010/shows/user/${user_id}`
        let res = await axios.get(userURL)
        console.log(res.data.payload[0])
        this.setState({
            shows: res.data.payload,
            username: res.data.payload[0].username,
            avatar_url: res.data.payload[0].avatar_url
        })
    }

    render() {

        const { shows, username, avatar_url } = this.state

        let usersShows = shows.map(show => {
            return (
                    <div className="show">
                        <Link className="showTitle" to={`/shows/${show.id}`}><h3>{show.title}</h3></Link>
                        <h4 className="showGenre">{show.genre_name}</h4>
                        <img className="showCover" key={show.id} src={show.img_url} alt={show.title} />
                    </div>
            )
        })
       
            return (
                <div className="userShow">
                    <div className="user">
                        <h1>{username}</h1> 
                        <img className="userImage" src={avatar_url} alt="profile" key={avatar_url} />
                    </div>
                    <div className="shows">
                   {usersShows}
                    </div>

                </div>
            )
        }
}


export default Profile;
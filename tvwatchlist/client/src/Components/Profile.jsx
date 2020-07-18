import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './CSS/Profile.css'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.match.params.user_id,
            shows: [],
        }
    }
    componentDidMount() {
        this.getUserShows()
    }

    getUserShows = async () => {
        const {user_id} = this.state
        let userURL = `http://localhost:3010/shows/user/${user_id}`
        let res = await axios.get(userURL)
        // console.log(res.data.payload)
        this.setState({
            shows: res.data.payload
        })
    }

    render() {
        const { shows } = this.state
        for (const el of shows) {
            let name = el.username
            let profile = el.avatar_url
            return (
                <div className="userShow">
                    <div className="user">
                        <h1>{name}</h1>
                        <img className="userImage" src={profile} alt="profile" key={name} />
                    </div>
                    <div className="shows">
                        {shows.map(show => {
                            return (
                                    <div className="show">
                                        <Link className="showTitle" to={`/shows/${show.id}`}><h3>{show.title}</h3></Link>
                                        <h4 className="showGenre">{show.genre_name}</h4>
                                        <img className="showCover" key={show.id} src={show.img_url} alt={show.title} />
                                    </div>
                            )
                        })}
                    </div>

                </div>
            )
        }
        return (<> </>)
    }
}


export default Profile;
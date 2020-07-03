import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: this.props.match.params.id,
            users: this.props,
            userId: "",
            shows: [],
            id: 0,
            imgFile: null,
            imgURL: "",
            title: "",
            genre: ""
        }
    }
    componentDidMount() {
        this.getUserShows()
    }

    getUserShows = async () => {
        const userId = this.props.match.params.id
        let userURL = `http://localhost:3010/shows/user/${userId}`
        let res = await axios.get(userURL)
        // console.log(res.data.payload)
        this.setState({
            shows: res.data.payload
        })
    }

    render() {
        const { shows, users } = this.state
        for (const el of users) {
            console.log(el)
            let name = el.username
            let profile = el.avatar_url
            return (
                <div id="user">
                    <div id="user">
                        <h1>{name}</h1>
                        <img id="userImage" src={profile} alt="profile" key={name} />
                    </div>


                    <div id="shows">
                        {shows.map(show => {
                            return (
                                <div className="show">
                                    <Link id="showTitle" to={"/shows"}><h3>{show.title}</h3></Link>
                                    <h4 id="showGenre">{show.genre_name}</h4>
                                    <img id="showCover" key={show.id} src={show.img_url} alt={show.id} />
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
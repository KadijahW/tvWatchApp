import React from 'react'
import axios from 'axios'
import './CSS/Shows.css'
import { Link } from 'react-router-dom'

class Shows extends React.Component {
    constructor() {
        super()
        this.state = {
            shows: [],
            watchers: []
        }
    }

    componentDidMount() {
        this.getShows()
    }

    getShows = async () => {
        let allShows = `http://localhost:3010/shows`
        let res = await axios.get(allShows)
        this.setState({
            shows: res.data.payload
        })
    }

    getUsersWatchingShow = async () => {
        const {show_id} = this.state
        let users = `http://localhost:3010/shows/watchers/${show_id}`
        let res = await axios.get(users)
        console.log(res.data.payload)
        this.setState({
            watchers: res.data.payload
        })
    }


    render() {
        const { shows, watchers } = this.state

        const showsArr = shows.map(show => {
            return (
                <div className="allShows">
                    <Link to={`/shows/${show.id}`}><h2>{show.title}</h2></Link>
                    <h4>{show.genre_name}</h4>
                    <img className="shows_img" key={show.id} src={show.img_url} alt={show.title} />
                </div>
            )
        })

        const userWatching =  watchers.map(el => {
            return(
                    JSON.parse(JSON.stringify(el.username))
            )
        })
        const displayUsers = userWatching.join(', ')

        return (
            <div className="showDiv">
                <ul>
                  {showsArr}
                </ul>

            </div>

        )
    }
}

export default Shows;
import React from 'react'
import axios from 'axios'
import './CSS/Shows.css'

class Shows extends React.Component {
    constructor(){
        super()
        this.state = {
            shows: []
        }
    }

    componentDidMount(){
        this.getShows()
    }

    getShows = async () => {
        let allShows = `http://localhost:3010/shows`
        let res = await axios.get(allShows)

        console.log(res.data.payload)
        this.setState({
            shows: res.data.payload
        })
    }

    render(){
        const {shows} = this.state
        return(
            <div>
                {shows.map(show => {
                    return (
                        <div className="allShows">
                            <h2>{show.title}</h2>
                            <h4>{show.genre_name}</h4>
                            <img className ="shows_img" key = {show.id} src={show.img_url} alt={show.title}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Shows;
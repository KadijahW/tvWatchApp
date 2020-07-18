import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


class addShow extends React.Component {
    constructor() {
        super()
        this.state = {
            user_id: 4,
            genres: [],
            shows: [],
            img_url: '',
            title: '',
            genre_id: 0,
            show_id: 0
        }
    }
    componentDidMount() {
        this.getShows();
        this.getGenres();
    }

    getShows = async () => {
        let allShows = `http://localhost:3010/shows`
        let res = await axios.get(allShows)
        // console.log(res.data.payload)
        this.setState({
            shows: res.data.payload
        })
    }

    getGenres = async () => {
        let allGenres = `http://localhost:3010/genres`
        let res = await axios.get(allGenres)
        // console.log(res.data.payload)
        this.setState({
            genres: res.data.payload
        })
    }


    addNewShow = async (e) => {
        const { img_url, title, genre_id, userId } = this.state
        if (img_url !== '' && title !== '' && genre_id !== 0) {
            let newShow = `http://localhost:3010/shows`
            await axios.post(newShow, { userId, img_url, title, genre_id })
        }
    }

    addToWatching = async (e) => {
        e.preventDefault()
        const {user_id, show_id } = this.state
        const newToUserList = {
            user_id,
            show_id,
        }
        if(show_id !== 0){
            let addShow = `http://localhost:3010/shows/user/${show_id}`
            await axios.post(addShow, newToUserList)
        }
    }

    handleImageURL = async (e) => {
        this.setState({
            img_url: e.target.value
        })
    }

    handleTitle = async (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleGenre = async (e) => {
        this.setState({
            genre_id: e.target.value
        })
    }

    handleShow = async (e) => {
        this.setState({
            show_id: e.target.value
        })
    }

    render() {
        const { shows, genres} = this.state
        return (
            <div>
                <h1>Add Show</h1>
                <form className='startWatching' onSubmit={this.addToWatching}>
                    <h3>Start Watching Show</h3>
                    <div>
                        <select onChange={this.handleShow}>
                            <option>---All Shows---</option>
                            {shows.map(show => {
                                return (
                                    <option value={show.id}>{show.title}</option>
                                )
                            })}
                        </select>
                        <br></br>
                        <button>Start Watching</button>
                    </div>
                </form>

                <h1>Or add new show</h1>
                <form className='addShow' onSubmit={this.addNewShow}>
                    <label htmlFor='img_url'>Show Image URL</label>
                    <br></br>
                    <input value={this.img_url} name='img_url' type='text' placeholder='url' onChange={this.handleImageURL}></input>
                    <br></br>
                    <label htmlFor='title'>title</label>
                    <br></br>
                    <input value={this.title}  name='title' type='text' placeholder='name' onChange={this.handleTitle}></input>
                    <br></br>
                    <select onChange={this.handleGenre}>
                        <option>---Select Genre---</option>
                        {genres.map(genre => {
                            return (
                                <option value={genre.id}>{genre.genre_name}</option>
                            )
                        })}
                    </select>
                    <br></br>
                    <button>ADD</button>
                </form>
            </div>
        )
    }

}

export default addShow;
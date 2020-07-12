import React from 'react'
import axios from 'axios'


class ShowsProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            show: {},
            comments:[]
        }
    }

    componentDidMount() {
        this.getShow();
        this.getComments();
    }

    getShow = async () => {
        const { id } = this.state
        let showURL = `http://localhost:3010/shows/${id}`
        let res = await axios.get(showURL)
        console.log(res.data.payload)
        this.setState({
            show: res.data.payload
        })
    }

    getComments = async () => {
        const { id } = this.state
        console.log(id)
        let commentURL = `http://localhost:3010/comments/show/${id}`
        let res = await axios.get(commentURL)
        console.log(res)
        this.setState({
            comments: res.data.payload
        })
    }

    render() {
        const { show, comments } = this.state
        return (
            <div>
                <h4>{show.title}</h4>
                <img src={show.img_url} key={show.id} alt={show.title} />
                <h5>{show.genre_name}</h5>
                <p> Watched By:</p>
                <form className='addComment' onSubmit={this.addNewComment}>
                    <input name='comments' type='text' placeholder='Add Comment' onChange={this.handleComment}></input>
                    <button>Add</button>
                </form>
                
            </div>
        )
    }
}

export default ShowsProfile;
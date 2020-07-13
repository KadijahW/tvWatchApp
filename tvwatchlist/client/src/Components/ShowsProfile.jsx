import React from 'react'
import axios from 'axios'


class ShowsProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show_id: this.props.match.params.show_id,
            show: {},
            comments: [],
            userId: 1,
            comment_body: ''
        }
    }

    componentDidMount() {
        this.getShow();
    }

    getShow = async () => {
        const { show_id } = this.state
        let showURL = `http://localhost:3010/shows/${show_id}`
        let res = await axios.get(showURL)
        this.setState({
            show: res.data.payload
        })
        this.getComments();
    }

    getComments = async () => {
        const { show_id } = this.state
        let commentURL = `http://localhost:3010/comments/show/${show_id}`
        let res = await axios.get(commentURL)
        console.log(res.data.payload)
        this.setState({
            comments: res.data.payload
        })
    }

    addNewComment = async () => {
        const { comment_body, userId, show_id } = this.state
        if(comment_body !== ''){
            let newComment = `http:localhost:3010/comment/`
            await axios.post(newComment, {comment_body, userId, show_id})
        }
    }

    handleComment= async (e) => {
        // e.preventDefault()
        this.setState({
            comment_body: e.target.value
        })
    }

    render() {
        const { show, comments } = this.state
        let commentInfo = comments.map(el => {
            return(
                <div className='commentDiv'>
                    <h5>{el.username}</h5>
                    <p>{el.comment_body}</p>
                </div>
            )
        })
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
                {commentInfo}
            </div>
        )
    }
}

export default ShowsProfile;
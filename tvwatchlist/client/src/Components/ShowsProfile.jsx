import React from 'react'
import axios from 'axios'
import './CSS/ShowsProfile.css'


class ShowsProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: 4,
            show_id: this.props.match.params.show_id,
            show: {},
            comments: [],
            comment_body: '',
            watchers: []
        }
    }

    componentDidMount() {
        this.getShow();
        this.getUsersWatchingShow();
    }

    getUsersWatchingShow = async () => {
        const {show_id} = this.state
        let users = `http://localhost:3010/shows/watchers/${show_id}`
        let res = await axios.get(users)
        // console.log(res.data.payload)

        this.setState({
            watchers: res.data.payload
        })
    }

    getShow = async () => {
        const { show_id } = this.state
        let showURL = `http://localhost:3010/shows/${show_id}`
        let res = await axios.get(showURL)
        // console.log(res.data.payload)
        this.setState({
            show: res.data.payload
        })
        this.getComments();
    }

    getComments = async () => {
        const { show_id } = this.state
        let commentURL = `http://localhost:3010/comments/show/${show_id}`
        let res = await axios.get(commentURL)
        // console.log(res.data.payload)
        this.setState({
            comments: res.data.payload
        })
    }

    addNewComment = async () => {
        const { comment_body, show_id, user_id } = this.state
        let comment = {
            comment_body, 
            user_id, 
            show_id
        }
        if(comment_body !== ''){
            let newComment = `http://localhost:3010/comments/`
            let res = await axios.post(newComment, comment)
            this.postComment(res.data.payload)
        }
    }

    postComment = async (comment) => {
        const{comments} = this.state
        let commentCopy = [...comments]
        commentCopy.push(comment)
        this.setState ({
            comments: commentCopy
        })
    }

    handleComment= async (e) => {
        this.setState({
            comment_body: e.target.value
        })
    }

    render() {
        const { show, comments, watchers } = this.state
        let commentInfo = comments.map(el => {
            return(
                <div className='commentDiv'>
                    <h5>{el.username}</h5>
                    <p>{el.comment_body}</p>
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
            <div>
                <div className='showInfo'>
                <h4>{show.title}</h4>
                <img className='showImg' src={show.img_url} key={show.title} alt={show.title} />
                <h5>{show.genre_name}</h5>
                </div>
                
                <div className="watchers">
                <span>Watched By:  </span> {displayUsers}
                </div>
    
                <form className='showComments' onSubmit={this.addNewComment}>
                <input className='commentInput' type='text' placeholder='Add Comment' onChange={this.handleComment}></input> 
                <button>Add</button>
                <ul className='userComment'>
                {commentInfo}
                </ul>
                </form>
            </div>
      )
    }
}

export default ShowsProfile;
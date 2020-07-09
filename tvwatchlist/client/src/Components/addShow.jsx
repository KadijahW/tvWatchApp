import React from 'react'


class addShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: this.props.match.params.id,
        }
    }
    render() {
        return (
            <div>
                <form>
                    
                </form>
            </div>
        )
    }

}

export default addShow;
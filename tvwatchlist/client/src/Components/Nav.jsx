import React from 'react'
import {Link} from 'react-router-dom'
import './CSS/Nav.css'

const Nav = () => {
return(
<div className='Nav'>
<h1 className='title'>Watch Tv App</h1>
    <nav>
     
            <Link to ="/">Home</Link>
            <Link to ="/users">Users</Link>
            <Link to ="/shows">Shows</Link>
            <Link to ="/addShow">addShow</Link>
            <Link to ="/about">About</Link>
    </nav>

</div>
)
}

export default Nav;
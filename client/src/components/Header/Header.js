import React from 'react'
import './Header.css';

function Header() {
    const toHome = () => {
        window.location.href = "/";
    }

    return (
        <div className="header-container">
            <h1 onClick={() => toHome()}>Welcome to DUM Academy</h1>
            <h2><a href="/">Home</a> \\ <a href="/about">About</a> \\ <a href="/references">References</a> \\ <a href="http://github.com/azhhng/social-robots">Github</a></h2>
        </div>
    )
}

export default Header
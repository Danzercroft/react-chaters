import React, { Component } from 'react'
import HomeNav from './HomeNav'

export class Home extends Component {
    render() {
        return (
            <div className="fullDiv">
                <HomeNav/>
                <div className="intro">
                    <div className="hero-centre">
                    <h1>Chaters</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home

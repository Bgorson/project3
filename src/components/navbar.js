import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Route, Link } from 'react-router-dom'

import '../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
        this.routeChange = this.routeChange.bind(this);
    }
    routeChange() {
        let path = "/";
        this.props.history.push(path)
    }
    //function for when the logout button is pressed
    logout(event) {
        event.preventDefault()
        console.log('logging out')
        //makes Axios post to /logout route 
        axios.post('/user/logout').then(response => {
          console.log("this is the data",response.data)
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null,
            })
          }
        }).catch(error => {
            console.log('Logout error')
        }).then( ()=> this.routeChange()
        )

      }

    render() {
        //loggin is set to property of login status
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
        return (
            <div>

                <header className="navbar App-header" id="nav-container">
                    <div className="col-4" >
                    {/* checks if user is logged in and changes nav links to reflect status */}
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span className="text-secondary">logout</span></Link>

                            </section>
                        ) : (
                                <section className="navbar-section">
                                {/* Matches links to app Routes */}
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">home</span>
                                        </Link>
                                    {/* <Link to="/login" className="btn btn-link text-secondary">
                                    <span className="text-secondary">login</span>
				</Link>
                                    <Link to="/signup" className="btn btn-link">
                                    <span className="text-secondary">sign up</span>
				</Link> */}
                                </section>
                            )}

                    </div>
                   
            
                    
                </header>
            </div>

        );

    }
}

export default withRouter(Navbar)
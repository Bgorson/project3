import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'

import logo from '../images/logo.svg'


import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import './login.css';


class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null,
            stats:null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username,
                        stat:response.data.stat
                    })
                    // update the state to redirect to home
                    // this.setState({
                    //     redirectTo: '/main'
                    // })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <img src={logo} className="wildlyfe-logo" alt="wildlyfe" />
                    <h2>WILDLYFE</h2>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="username"></label>
                            </div>
                           <div className="col-3 col-mr-auto">
                            <TextField
                                id="username-input"
                                label="username"
                                type="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                margin="normal"
                            />
                           </div>


                        </div>
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="password"></label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <TextField
                                id="password-input"
                                label="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                value={this.state.password}
                                onChange={this.handleChange}
                                />
                            </div>

                        </div>
                        <div className="form-group ">
                            <div className="col-7"></div>
                            <Button
                                variant="contained" color="primary"
                               
                                onClick={this.handleSubmit}
                                type="submit">Login
                            </Button>

                            <Button variant="contained" color="primary">    
                                <Link to="/signup" className="btn btn-link">
                                    Sign Up 
				                </Link>
                            </Button>    
                        </div>
                    </form>
                </div>
            )
        }
    }
}
 
export default Login;
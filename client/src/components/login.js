import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logo from '../images/logo.svg'
import './login.css';
import '../components/loginModal/modal.css';

// material-ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from './loginModal/modal'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null,
            stats:null,
            show:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    showModal =() => {
        this.setState({ show:true})
    }
    hideModal =()=> {
        this.setState({show:false})
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
                    this.setState({
                        redirectTo: '/main',
                    })
                }
            }).catch(error => {
                if(error){
                    this.showModal()
                }
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
                        <Modal show={this.state.show} handleClose={this.hideModal}>
                        <p>Log-in Error. Please check username/password</p>
                        </Modal>

                    <img src={logo} className="wildlyfe-logo" alt="wildlyfe" />
                    <h2>WILDLYFE</h2>
                    <form className="login-input">
                        <div className="form-group">
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
                        <div className="form-group">
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
                        <div className="form-group ">
                            <Button
                                className="btn-buttons"
                                variant="contained" 
                                color="primary"
                                onClick={this.handleSubmit}
                                type="submit">Login
                            </Button>

                            <Button 
                                className="btn-buttons"
                                variant="contained" 
                                color="primary">    
                                    <Link 
                                        to="/signup" 
                                    >
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
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

// material-ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			stat: {'strength':100, 'magic':100, 'hp':200, "agility":100},
			confirmPassword: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}
	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/user/', {
			username: this.state.username,
			password: this.state.password,
			stat:this.state.stat,
			ratio: {
				win:0,
				lose:0
			}
		})
			.then(response => {
				console.log("post response",response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.props.signUp({
						username:response.data.username,
						loggedIn:true
					})
					this.setState({ //redirect to avatar creation page
						redirectTo: "/petChoice",
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


	render() {
			//if the redirect state is filled, go to it
			if (this.state.redirectTo) {
				return <Redirect to={{ pathname: this.state.redirectTo }} />
			} else {
		return (
			<div className="SignupForm">
				<h2>Sign up</h2>
				<form className="signup-form">
					<div className="form-group">	
						<TextField 
							className="form-input"
							type="text"
							id="username"
							label="username"
							name="username"
							placeholder="username"
							value={this.state.username}
							onChange={this.handleChange}
							margin="normal"
						/>
						</div>
					<div className="form-group">
						<TextField
							className="form-input"
							placeholder="password"
							type="password"
							label="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
							margin="normal"
						/>
					</div>
					<div className="form-group">
						<Button 
							variant="contained" 
							color="primary"
							onClick={this.handleSubmit}
							type="submit" 
							>
							Sign up
						</Button>
					</div>
				</form>
			</div>
		)}
	}
}

export default Signup

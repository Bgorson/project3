import React, { Component } from 'react';
import axios from 'axios'

class PetChoice extends Component {

    constructor() {
		super()
		this.state = {
			petName: 'fluffy',
			petType: 'dog',
			petColor: 'white',
			petAccess: 'bandana'

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
		axios.post('/pets/', {
			petname: this.state.petName,
			petType: this.state.petType,
			petColor:this.state.Color,
			petAccess: this.state.Access
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('you chosen your pet')
					this.setState({ //redirect to login page
						redirectTo: '/main'
					})
				} else {
					console.log('err')
				}
			}).catch(error => {
				console.log('selection error: ')
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
        <form className="form-horizontal">
            <div className="form-group">
                <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="username"></label>
                </div>
                <div className="col-3 col-mr-auto">
                    <input className="form-input"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="password"></label>
                </div>
                <div className="col-3 col-mr-auto">
                    <input className="form-input"
                        placeholder="password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
            <div className="form-group ">
                <div className="col-7"></div>
                <button
                    className="btn btn-primary col-1 col-mr-auto"
                    onClick={this.handleSubmit}
                    type="submit"
                >Sign up</button>
            </div>
        </form>
    </div>

)
        }
}
}
    



export default PetChoice;
// import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import axios from 'axios'

// class LoginForm extends Component {
//     constructor() {
//         super()
//         //creates state to be able to post on submit
//         this.state = {
//             username: '',
//             password: '',
//             stats:[],
//             redirectTo: null
//         }
//         this.handleSubmit = this.handleSubmit.bind(this)
//         this.handleChange = this.handleChange.bind(this)
  
//     }
//     //update state with value of text boxes depending on user or password
//     handleChange(event) {
//         this.setState({
//             [event.target.name]: event.target.value
//         })
//     }
//     handleSignup(){
//         this.setState({
//             redirectTo: '/signup'
//         })
//     }
//     handleSubmit(event) {
//         event.preventDefault()
//         console.log('handleSubmit')

//         axios
//             .post('/user/login', {
//                 username: this.state.username,
//                 password: this.state.password
//             })
//             .then(response => {
//                 console.log('login response: ')
//                 console.log(response)
//                 if (response.status === 200) {
//                     // update App.js state
//                     this.props.updateUser({
//                         loggedIn: true,
//                         username: response.data.username
//                     })
//                     // update the state to redirect to home
//                     this.setState({
//                         redirectTo: '/'
//                     })
//                 }
//             }).catch(error => {
//                 console.log('login error: ')
//                 console.log(error);
                
//             })
//     }

//     render() {
//         //if the redirect state is filled, go to it
//         if (this.state.redirectTo) {
//             return <Redirect to={{ pathname: this.state.redirectTo }} />
//         } else {
//             return (
//                 <div>
//                     <h2>Login</h2>
//                     <form className="form-horizontal">
//                         <div className="form-group">
//                             <div className="col-1 col-ml-auto">
//                                 <label className="form-label" htmlFor="username"></label>
//                             </div>
//                             <div className="col-3 col-mr-auto">
//                                 <input className="form-input"
//                                     type="text"
//                                     id="username"
//                                     name="username"
//                                     placeholder="username"
//                                     value={this.state.username}
//                                     onChange={this.handleChange}
//                                 />
//                             </div>
//                         </div>
//                         <div className="form-group">
//                             <div className="col-1 col-ml-auto">
//                                 <label className="form-label" htmlFor="password"></label>
//                             </div>
//                             <div className="col-3 col-mr-auto">
//                                 <input className="form-input"
//                                     placeholder="password"
//                                     type="password"
//                                     name="password"
//                                     value={this.state.password}
//                                     onChange={this.handleChange}
//                                 />
//                             </div>
//                         </div>
//                         <div className="form-group ">
//                             <div className="col-7"></div>
//                             <button
//                                 className="btn btn-primary col-1 col-mr-auto"
                               
//                                 onClick={this.handleSubmit}
//                                 type="submit">Login</button>

//                                 <button
//                                 className="btn btn-primary col-1 col-mr-auto"
                
//                                 onClick={this.handleSignup}
//                                 type="submit">Signup</button>
//                         </div>
//                     </form>
//                 </div>
//             )
//         }
//     }
// }

// export default LoginForm

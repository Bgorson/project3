import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
// material-ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from './loginModal/modal'
import { Redirect } from 'react-router-dom'

// css styles
import './pet.css';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 400,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });

class PetChoice extends Component {

    constructor() {
		super()
		this.state = {
            redirectTo: false,
			petName: '',
			petType: '',
			petColor: '',
			petAccess: ''

		}
        this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
    }
    
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		})
    }
    showModal =(modalText) => {
        this.setState({ 
			show:true,
			modalMessage:modalText
		})
    }
    hideModal =()=> {
        this.setState({show:false})
    }
    handleSubmit(event) {
		event.preventDefault()
        if (this.state.petName === "" || this.state.petType=== "" || this.state.petColor==="" || this.state.petAccess===""){
            console.log("missing info")
            this.showModal("Please fill out the entire form and create a companion.")
            return null
        }
		//request to server to add a pet to user
            console.log("posting")
            axios.post('/pets/'+this.props.userName, {
			petname: this.state.petName,
			petType: this.state.petType,
			petColor:this.state.petColor,
			petAccess: this.state.petAccess
		})
			console.log('you chosen your pet')
			this.setState({ //redirect to login page
						redirectTo: '/story'
			})
		} 

    
    render() {
        const { classes } = this.props;
        //if the redirect state is filled, go to it
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        } else {
return (
    <div className="petSelect">

    <h2>PET SELECTION {this.props.userName}</h2>
    <form className="petForm">
        <FormControl className={classes.formControl}>
        <TextField
                id="petname-input"
                label="pet name"
                type="petname"
                name="petName"
                value={this.state.petName}
                onChange={this.handleChange}
                margin="normal"
        />
        </FormControl>
        <FormControl className={classes.formControl}>
                <InputLabel htmlFor="pet-type">type</InputLabel> 
                <Select
                    value={this.state.petType}
                    onChange={this.handleChange}
                    inputProps={{
                    name: 'petType',
                    id: 'type-pet',
                    }}
                >
                    <MenuItem value='dog'>dog</MenuItem>
                    <MenuItem value='cat'>cat</MenuItem>
                </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="pet-color">color</InputLabel> 
                <Select
                    value={this.state.petColor}
                    onChange={this.handleChange}
                    inputProps={{
                    name: 'petColor',
                    id: 'color-pet',
                    }}
                >
                    <MenuItem value='white'>white</MenuItem>
                    <MenuItem value='orange'>orange</MenuItem>
                </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="pet-access">accessory</InputLabel> 
                <Select
                    value={this.state.petAccess}
                    onChange={this.handleChange}
                    inputProps={{
                    name: 'petAccess',
                    id: 'access-pet',
                    }}
                >
                    <MenuItem value='bandana'>bandanda</MenuItem>
                    <MenuItem value='bell'>bell</MenuItem>
                </Select>
        </FormControl> 
        <Button variant="contained" color="primary" onClick={this.handleSubmit}>    
            {/* <Link to="/story" className="btn btn-link">
                Confirm
            </Link> */}
            Confirm
        </Button>   
    </form>
        <Modal show={this.state.show} handleClose={this.hideModal}>
            <p>{this.state.modalMessage}</p>
        </Modal>
</div>

)
    }
}
}

PetChoice.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(PetChoice);
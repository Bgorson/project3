import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
// material-ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// css styles
import './pet.css';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });

class PetChoice extends Component {

    constructor() {
		super()
		this.state = {
            redirectTo: null,
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
    handleSubmit(event) {
		event.preventDefault()

		//request to server to add a pet to user
		axios.post('/pets/'+this.props.userName, {
			petname: this.state.petName,
			petType: this.state.petType,
			petColor:this.state.petColor,
			petAccess: this.state.petAccess
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
        const { classes } = this.props;
        //if the redirect state is filled, go to it
        if (this.state.redirectTo) {
            return <Link to={this.state.redirectTo} />
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
            <Link to="/main" className="btn btn-link">
                Confirm
            </Link>
        </Button>   
    </form>
</div>

)
    }
}
}

PetChoice.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(PetChoice);
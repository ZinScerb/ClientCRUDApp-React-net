import React, { Component } from 'react';
import ClientDataService from '../services/client.service.js';
import PropTypes from "prop-types";
import './Form.style.css';

export default class ClientForm extends Component { 
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            errors: {},
            Name: '',
            Email: '',
            Birthdate: '',
            Gender: '',
            edit: false
        }
    }

    componentDidMount() {
        if (typeof (this.props.clientId) != "undefined") {
            ClientDataService.get(this.props.clientId).then(response => {
                this.setState({
                    Name: response.data.name,
                    Email: response.data.email,
                    Birthdate: this.formatDate(response.data.birthdate),
                    Gender: response.data.gender,
                    edit: true
                });
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    formatDate(objectDate) {
        let date = new Date(objectDate);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const joined = [year, month, day].join('-');

        return joined;

    }

    validateForm(formData) {
        const validationErrors = {};

        if (!formData.Name) {
            validationErrors.name = "Name is required";
        }

        if (!formData.Email) {
            validationErrors.email = "Email is required";
        }

        if (!formData.Birthdate) {
            validationErrors.date = "Birthdate is required";
        }

        this.setState({ errors: validationErrors });
        if (Object.keys(validationErrors).length === 0) {
            return true;
        }

        return false;
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }   

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            Name: this.state.Name,
            Email: this.state.Email,
            Birthdate: this.state.Birthdate,
            Gender: Number(this.state.Gender)
        };

        if (!this.validateForm(obj)) {
            return;
        }

        if (this.state.edit) {
            obj['ClientID'] = this.props.clientId;
            ClientDataService.update(this.props.clientId, obj).then(res => {
                history.back();
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            ClientDataService.create(obj).then(res => {
                history.back();
            }).catch(function (error) {
                console.log(error);
            });
        }             

        this.setState({
            FullName: "",
            Address: "",
            Age: 0,
            Gender: '',
            edit: false
        })
    }

    render() {
        const {
            Name,
            Email,
            Birthdate,
            Gender,
            errors,
            edit
        } = this.state;

        let btnMsg = edit ? "Update client" : "Create client";

        return (
            <div className="formDiv">
                <h3>Add new Client</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name: </label>
                        <input type="text" className="form-control"
                            name="Name"
                            value={Name}
                            onChange={this.onChange}
                        />
                        {errors.name && <span className="text-danger">{errors.name}</span>} 
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email: </label>
                        <input type="email" className="form-control"
                            name="Email"
                            value={Email}
                            onChange={this.onChange}
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}  
                    </div>
                    <div className="form-group">
                        <label className="form-label">Birthdate: </label>
                        <input type="date" className="form-control"
                            name="Birthdate"
                            value={Birthdate}
                            onChange={this.onChange}
                        />
                        {errors.date && <span className="text-danger">{errors.date}</span>}  
                    </div>
                    <div className="form-group">
                        <label className="form-label">Gender: </label>
                        <select
                            className="form-select"
                            name="Gender"
                            required
                            value={Gender}
                            onChange={this.onChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="1">Female</option>
                            <option value="0">Male</option>
                        </select>                       
                    </div>
                    <div className="form-group">
                        <input type="submit" value={btnMsg} className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

ClientForm.propTypes = {
    clientId: PropTypes.Number
};

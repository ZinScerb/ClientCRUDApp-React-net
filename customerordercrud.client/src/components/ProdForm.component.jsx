import React, { Component } from 'react';
import ProdDataService from '../services/product.service.js';
import './Form.style.css';

export default class ProdForm extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.state = {
            errors: {},
            Code: '',
            Title: '',
            Price: null,
            edit: false
        }
    }

    componentDidMount() {
        if (typeof (this.props.ProdId) !== "undefined") {
            ProdDataService.get(this.props.ProdId).then(response => {
                this.setState({
                    Code: response.data.code,
                    Title: response.data.title,
                    Price: response.data.price,
                    edit: true
                });
            }).catch(function (error) {
                console.log(error);
            });
        }        
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    validateForm(formData) {
        const validationErrors = {};

        if (!formData.Code) {
            validationErrors.code = "Product code is required";
        }

        if (!formData.Title) {
            validationErrors.title = "Product title is required";
        }  

        if (!formData.Price || formData.Price <= 0) {
            validationErrors.price = "Product price is required";
        }

        this.setState({ errors: validationErrors });
        if (Object.keys(validationErrors).length === 0) {
            return true;
        }

        return false;

    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            Code: this.state.Code,
            Title: this.state.Title,
            Price: Number(this.state.Price)
        };

        if (!this.validateForm(obj)) {
            return;
        }

        if (this.state.edit) {
            obj['productID'] = Number(this.props.ProdId);
            ProdDataService.update(this.props.ProdId, obj).then(res => {
                history.back();
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            ProdDataService.create(obj).then(res => {
                history.back();
            }).catch(function (error) {
                console.log(error);
            });
        }       

        this.setState({
            Code: '',
            Title: '',
            Price: null,
            edit: false
        })
    }

    render() {
        const {
            Code, Title, Price, errors, edit
        } = this.state;

        let btnMsg = edit ? "Update product" : "Create product";

        return (
            <div className="formDiv">
                <h3>Add New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="form-label">Code: </label>
                        <input type="text" className="form-control"
                            name="Code"
                            value={Code}
                            onChange={this.onChange}
                        />
                        {errors.code && <span className="text-danger">{errors.code}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Title: </label>
                        <input type="text" className="form-control"
                            name="Title"
                            value={Title}
                            onChange={this.onChange}
                        />
                        {errors.title && <span className="text-danger">{errors.title}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Price: </label>
                        <input type="number" step=".01" className="form-control"
                            name="Price"
                            value={Price}
                            onChange={this.onChange}
                        />
                        {errors.price && <span className="text-danger">{errors.price}</span>}
                    </div>                   
                    <div className="form-group">
                        <input type="submit" value={btnMsg} className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
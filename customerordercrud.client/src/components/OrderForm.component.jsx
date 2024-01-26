import React, { Component } from 'react';
import ProdDataService from '../services/product.service.js';
import ClientDataService from '../services/client.service.js';
import OrderDataService from '../services/order.service.js';
import PropTypes from "prop-types";
import './Form.style.css';

class OrderForm extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            errors: {},
            persons: [],
            products: [],
            Client: null,
            Product: null,
            Quantity: 1,
            Status: null,
            edit: false
        }
    }

    componentDidMount() {
        if (typeof (this.props.orderID) != "undefined") {
            OrderDataService.get(this.props.orderID).then(response => {
                this.setState({
                    Client: response.data.orderID,
                    Product: response.data.productID,
                    Quantity: response.data.quantity,
                    Status: response.data.status,
                    edit: true
                });
            }).catch(function (error) {
                console.log(error);
            });
        }  
                
        ClientDataService.getAll().then(response => {
            this.setState({ persons: response.data });
        }).catch(function (error) {
            console.log(error);
        });

        ProdDataService.getAll().then(response => {
            this.setState({ products: response.data });
        }).catch(function (error) {
            console.log(error);
        });        
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    validateForm(formData) {
        const validationErrors = {};

        if (!formData.clientID) {
            validationErrors.client = "Choose client";
        }

        if (!formData.productID) {
            validationErrors.prod = "Choose order product";
        }

        if (!formData.quantity) {
            validationErrors.qty = "Input valid quantity";
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
            clientID: Number(this.state.Client),
            productID: Number(this.state.Product),
            quantity: Number(this.state.Quantity),
            status: Number(this.state.Status)
        };

        if (!this.validateForm(obj)) {
            return;
        }

        if (this.state.edit) {
            obj['OrderID'] = this.props.orderID;
            OrderDataService.update(this.props.orderID, obj).then(res => {
                history.back();
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            OrderDataService.create(obj).then(res => {
                history.back();
            }).catch(function (error) {
                console.log(error);
            });
        }

        this.setState({
            Client: null,
            Product: null,
            Amount: 0,
            Status: null,
            edit: false
        })
    }

    render() {
        const {
            Client, Product, Quantity, Status, errors, edit
        } = this.state;

        let btnMsg = edit ? "Update order" : "Create order";

        return (
            <div className="formDiv">
                <h3>Create New Order</h3>
                <form onSubmit={this.onSubmit} noValidate>
                    <div className="form-group">
                        <label className="form-label">Client: </label>
                        <select
                            className="form-select"
                            name="Client"
                            value={Client}
                            onChange={this.onChange}
                        >
                            <option value="">Select Client</option>
                            {this.state.persons.map(c =>
                                <option key={c.clientID} value={c.clientID}>{c.name}</option>
                            )}; 
                        </select>
                        {errors.client && <span className="text-danger">{errors.client}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label ">Product: </label>
                        <select
                            className="form-select"
                            name="Product"
                            value={Product}
                            onChange={this.onChange}
                        >
                            <option value="">Select Product</option>
                            {this.state.products.map(c =>
                                <option key={c.productID} value={c.productID}>{c.title}</option>
                            )};                            
                        </select>
                        {errors.prod && <span className="text-danger">{errors.prod}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Quantity: </label>
                        <input type="number" min="1" step="1" className="form-control"
                            name="Quantity"
                            value={Quantity}
                            onChange={this.onChange}
                        />
                        {errors.qty && <span className="text-danger">{errors.qty}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Status: </label>
                        <select
                            className="form-select"
                            name="Status"
                            value={Status} 
                            onChange={this.onChange} 
                        >
                            <option value="0">Created</option>
                            <option value="1">Paid</option>
                            <option value="2">Delivered</option>
                        </select>
                        {errors.status && <span className="text-danger">{errors.status}</span>}
                    </div>
                    <div className="form-group">
                        <input type="submit" value={btnMsg} className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

OrderForm.propTypes = {
    orderID: PropTypes.Number
};

export default OrderForm;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ClientDataService from '../services/client.service.js';
import OrderDataService from '../services/order.service.js';
import PropTypes from "prop-types";
import './Form.style.css'

const GENDER = { 0: 'Male', 1: 'Female' };
const STATUS = { 0: 'Created', 1: 'Paid', 2:'Delivered' };
class TableRow extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteOrder = this.handleDeleteOrder.bind(this);
        this.handleDeleteClient = this.handleDeleteClient.bind(this);
    }

    handleDeleteOrder() {
        OrderDataService.delete(this.props.obj.orderID).then(response => {
            window.location.reload()
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleDeleteClient() {
        ClientDataService.delete(this.props.obj.clientID).then(response => {
            window.location.reload()
        }).catch(function (error) {
            console.log(error);
        });
    }    

    render() {
        const {
            obj
        } = this.props;

        if (this.props.type === "Order") {
            return (
                <tr>
                    <td>{obj.orderID}</td>
                    <td>{obj.clientName}</td>
                    <td>{obj.product}</td>
                    <td>{obj.quantity}</td>
                    <td>{obj.price}</td>
                    <td>{(Number(obj.price) * Number(obj.quantity)) || 0 }</td>
                    <td>{STATUS[obj.status]}</td>
                    <td className="buttonCell">
                        <div>
                            <Link to={"/editOrder/" + this.props.obj.orderID} className="btn btn-primary">Edit</Link>
                            <button onClick={this.handleDeleteOrder} className="btn btn-danger">Delete</button>
                        </div>
                    </td>
                </tr>
            );    
        }

        const averageOrderAmount = (obj.total / obj.orderCount).toFixed(2);

        return (
            <tr>
                <td>{obj.clientID}</td>
                <td>{obj.name}</td>
                <td>{obj.email}</td>
                <td>{GENDER[obj.gender]}</td>
                <td>{new Date(obj.birthDate).toLocaleDateString()}</td>
                <td>{obj.orderCount}</td>
                <td>{Number(averageOrderAmount) || 0}</td>
                <td className="buttonCell">
                    <div>
                        <Link to={"/editClient/" + this.props.obj.clientID} className="btn btn-primary">Edit</Link>
                        <button onClick={this.handleDeleteClient} className="btn btn-danger">Delete</button>
                    </div>
                </td>
            </tr>

        );
    }
}

TableRow.propTypes = {
    obj: PropTypes.object,
    type: PropTypes.string
}

export default TableRow;
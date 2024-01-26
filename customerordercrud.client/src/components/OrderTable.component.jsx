import React, { Component } from 'react';
import TableRow from './TableRow.component';
import OrderDataService from '../services/order.service.js';
import { Link } from "react-router-dom";

export default class OrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = { orders: [] };
    }

    componentDidMount() {
        OrderDataService.getOrderDetails().then(response => {
            console.log(response.data);
            this.setState({ orders: response.data });
        }).catch(function (error) {
            console.log(error);
        });
    }

    tabRow() {
        return this.state.orders.map(function (object, i) {
            return <TableRow obj={object} key={i} type={"Order"} />;
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Order List</h2>
                <div>
                    <Link to="/createOrder">
                        <button className="btn btn-primary">Create Order</button>
                    </Link>
                </div>
                <br></br>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Client Name</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}

                   
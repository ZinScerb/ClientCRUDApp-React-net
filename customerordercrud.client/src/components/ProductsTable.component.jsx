import React, { Component } from 'react';
import ProdTabRow from './ProdTabRow.component';
import ProdDataService from '../services/product.service.js';
import { Link } from "react-router-dom";

export default class ProductsTable extends Component {
    constructor(props) {
        super(props);
        this.state = { products: [] };
    }

    componentDidMount() {
        ProdDataService.getAll().then(response => {
            console.log(response.data);
            this.setState({ products: response.data });
        }).catch(function (error) {
            console.log(error);
        });
    }

    tabRow() {
        return this.state.products.map(function (object, i) {
            return <ProdTabRow obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Product List</h2>
                <div>
                    <Link to="/createProduct">
                        <button className="btn btn-primary">Add Product</button>
                    </Link>
                </div>
                <br></br>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
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
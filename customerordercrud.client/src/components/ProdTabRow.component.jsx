import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import ProdDataService from '../services/product.service.js';

class ProdTabRow extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        ProdDataService.delete(this.props.obj.productID).then(response => {
            window.location.reload()
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let {
            productID, code, title, price
        } = this.props.obj;

        return (
            <tr>
                <td>{ productID }</td>
                <td>{ code }</td>
                <td>{ title }</td>
                <td>{price}  </td>
                <td className="buttonCell">
                    <div>
                        <Link to={"/editProduct/" + productID} className="btn btn-primary">Edit</Link>
                        <button onClick={this.handleDelete} className="btn btn-danger">Delete</button>
                    </div>
                </td>                
            </tr>

        );
    }
}

ProdTabRow.propTypes = {
    obj: PropTypes.obj
};


export default ProdTabRow;
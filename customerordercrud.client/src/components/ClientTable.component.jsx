import React, { Component } from 'react';
import TableRow from './TableRow.component';
import ClientDataService from '../services/client.service.js';
import { Link } from "react-router-dom";

export default class ClientTable extends Component {
    constructor(props) {
        super(props);
        this.state = { persons: [] };
    }

    componentDidMount() {
        ClientDataService.getDetailed().then(response => {
            this.setState({ persons: response.data });
        }).catch(function (error) {
            console.log(error);
        });
    }

    tabRow() {
        return this.state.persons.map(function (object, i) {
            return <TableRow obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Client List</h2>
                <div>
                    <Link to="/createClient">
                        <button className="btn btn-primary">Add Client</button>
                    </Link>
                </div>
                <br></br>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>E-mail</th>
                            <th>Gender</th>
                            <th>Birthdate</th>
                            <th>Number of orders</th>
                            <th>Average order amount</th>
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
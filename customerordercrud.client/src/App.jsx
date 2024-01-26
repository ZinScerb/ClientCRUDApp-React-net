import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import ClientForm from './components/ClientForm.component';
import ClientTable from './components/ClientTable.component';
import ProductsTable from './components/ProductsTable.component';
import ProdForm from './components/ProdForm.component';
import EditForm from './components/EditForm.component';
import OrderForm from './components/OrderForm.component';
import OrderTable from './components/OrderTable.component';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand navbar-light bg-light">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/clients'} className="nav-link">Clients</Link>
                                </li>                                
                                <li className="nav-item">
                                    <Link to={'/products'} className="nav-link">Products</Link>
                                </li>                                
                                <li className="nav-item">
                                    <Link to={'/orders'} className="nav-link">Orders</Link>
                                </li>                                
                            </ul>
                        </div>
                    </nav>
                    <Routes>
                        <Route path='/createClient' element={<ClientForm />} />
                        <Route path='/clients' element={<ClientTable />} />
                        <Route path='/editClient/:id' element={<EditForm type="Client" /> } />
                        <Route path='/products' element={<ProductsTable />} />
                        <Route path='/createProduct' element={<ProdForm />} />
                        <Route path='/editProduct/:id' element={<EditForm type="Product" />} />
                        <Route path='/orders' element={<OrderTable /> } />
                        <Route path='/createOrder' element={<OrderForm />} />
                        <Route path='/editOrder/:id' element={<EditForm type="Order" />} />
                     </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
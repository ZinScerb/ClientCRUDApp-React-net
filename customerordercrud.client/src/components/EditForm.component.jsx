import React from 'react';
import { useParams } from "react-router-dom";
import ClientForm from './ClientForm.component';
import ProdForm from './ProdForm.component';
import OrderForm from './OrderForm.component';

const EditForm = (props) => { 
    const { id } = useParams();

    switch (props.type) {
        case 'Client':
            return <ClientForm clientId={ id } />;
        case 'Product':
            return <ProdForm ProdId={id} />;
        case 'Order':
            return <OrderForm orderID={id} />;
        default:
            return <div>Error: Invalid form</div>;
    }
}

export default EditForm;
import React, { Component } from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import SalesTransactionsList from '../../POS-Components/sales-transactions-list/index'

import './index.css'


class SalesTransaction extends Component {
    render() {
        return (
            <div className='sell-transaction'>
                    <Row>
                        <Col md={12}>
                            <SalesTransactionsList />
                        </Col>
                    </Row>
            </div>
        );
    }
}

export default SalesTransaction;
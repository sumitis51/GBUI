import React from 'react'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

import './summary.css'
import HeaderPanels from './HeaderPanels'
import ProposalSummary from './Summary'
import PaymentSummary from './Payment'

class Summary extends React.Component {

    render() {
        return (
            <div className="parent-div-proposal-summary-motor">

                {/* Subheader */}
                <div className="sub-header mui--hidden-xs mui--hidden-sm">
                    <div class="mui-panel mui--z3" style={{ background: '#9c0f46', marginBottom: '0px' }}>
                        <ul>
                            <li>Car</li>
                            <li>Bike</li>
                            <li>Health</li>
                        </ul>
                    </div>
                </div>
 
                {/* Body content with margin on desktop */}

                <div className="proposal-summary-body">
                    <p className="back-proposal-link">
                        <img alt='motor' src="/assets/back.png" />
                        &nbsp;BACK TO PROPOSAL FORM
                    </p>

                    <p className="proposal-summary-heading">Proposal Summary</p>

                    {/* Header Panels */}
                    <HeaderPanels />

                    {/* Steppers heading */}
                    <div className="stepper-headings">
                        <p className="active-success">Fill Details</p>
                        <p>Review & Pay</p>
                        <p className="disable">View Policy</p>
                    </div>
                    <p className="small-guide-line">
                        Just fill in the proposal form and we’ll setup your policy purchase
                    </p>

                    {/* Here divide in two columns */}
                    <Row>
                        <Col md="8">
                            <ProposalSummary />
                        </Col>
                        <Col md="4">
                            <PaymentSummary />
                        </Col>
                    </Row>

                    <Row className="partners">
                        <Col md="1" sm="7" xs="7">
                            <img
                                src="/assets/irdai.jpeg"
                                alt="irdai"
                                width="55"
                                height="55"/>
                            <p className="licenced_no">LICENSED No.<br/>123243567yterwq</p>
                        </Col>
                        <Col md="2" sm="5" xs="5">
                            <div className="rectangle"></div>
                            <div className="rectangle"></div>
                            <p style={{marginLeft: '30px'}}>SECURE</p>
                        </Col>
                        <Col md="5" sm="12" xs="12" className="networks">
                            {new Array(7).fill(0,0).map(item => 
                                <div className="rectangle"></div>    
                            )}
                            <p style={{marginLeft: '8.3rem', display: 'block'}}>PAYMENT NETWORK</p>
                        </Col>
                    </Row>

                </div>
            </div>
        )
    }
}

export default Summary
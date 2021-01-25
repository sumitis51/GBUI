import React from 'react'
import Panel from 'muicss/lib/react/panel'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

import './panels.css'

class HeaderPanels extends React.Component {

    render() {
        return (
            <div className="header-panels-parent">
                <Row className="mui--hidden-xs mui--hidden-sm">
                    <Col md="4">
                        <Panel>
                            <p className="carname-heading">
                                Your Car
                            </p>
                            <p className="edit-carname-text">Edit</p>
                            <img alt='motor'
                                src="/assets/Maruti-Suzuki-New-Ertiga-Exterior-131063.jpg"
                                width="76"
                                height="34"
                                style={{ verticalAlign: 'middle' }} />
                            <p className="car-specifications">
                                <span>
                                    MH-02-AJ-1234, Hyundai i10 1.2 Era
                                </span><br />
                                <span>
                                    Petrol 1197 + Externally fitted CNG, 2013
                                </span>
                            </p>
                        </Panel>
                    </Col>
                    <Col md="4">
                        <Panel>
                            <p className="carname-heading">
                                Policy
                            </p>
                            <p className="edit-carname-text">Edit</p>
                            <img alt='motor'
                                src="/assets/Maruti-Suzuki-New-Ertiga-Exterior-131063.jpg"
                                width="76"
                                height="34"
                                style={{ verticalAlign: 'middle' }} />
                            <p className="car-specifications">
                                <span>
                                    Policy expired 90 days back,
                                </span><br />
                                <span>
                                    NCB: 50%
                                </span>
                            </p>
                        </Panel>
                    </Col>
                    <Col md="4">
                        <Panel>
                            <p className="carname-heading">
                                Reg. Details
                            </p>
                            <p className="edit-carname-text">Edit</p>
                            {/* <img alt='motor'
                                src="/assets/Maruti-Suzuki-New-Ertiga-Exterior-131063.jpg"
                                width="76"
                                height="34"
                                style={{ verticalAlign: 'middle' }} /> */}
                            <p className="car-specifications" style={{marginLeft: '15px'}}>
                                <span>
                                    Registration : 01/10/2014 
                                </span><br />
                                <span>
                                    Manufacturing Detail: Dec,2013
                                </span>
                            </p>
                        </Panel>
                    </Col>
                </Row>

                {/* Display on mobile view */}
                <Panel style={{paddingBottom: '0px'}} className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                    <p className="link-1-p">
                        Your Car:MH-02-AJ-1234, Navi Mumbai, Hyundai i10 1.2 Era Petrol, 2014.
                        <span className="edit-1-p">Edit</span>
                    </p>
                    <p className="link-1-p">
                        Policy:Past policy expired, before 90 days
                        <span className="edit-1-p">Edit</span>
                    </p>
                    <p className="link-1-p" style={{borderBottom: 'none'}}>
                        Reg. Detail:01/10/2014 
                        <span className="edit-1-p">Edit</span>
                    </p>
                </Panel>
            </div>
        )
    }
}

export default HeaderPanels
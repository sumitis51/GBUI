import React from 'react'
import Panel from 'muicss/lib/react/panel'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

import './summary.css'

class ProposalSummary extends React.Component {

    render() {
        return (
            <div className="parent-proposal-summary-panel">
                <Panel>
                    <h3 className="car-owner-heading">
                        Car Owner’s Details
                        <span className="sub-heading-edit">
                            Edit
                        </span>
                    </h3>
                    <hr style={{ margin: '18px 0px' }} />

                    <Row className="mui--hidden-xs mui--hidden-sm">
                        <Col md="4">
                            <p className="grey-heading">Company Owned:</p>
                            <p className="black-value">Yes</p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">Full Name:</p>
                            <p className="black-value">John Doe</p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">Phone Number:</p>
                            <p className="black-value">+91-9968872607</p>
                        </Col>
                    </Row>
                    <Row className="row mui--hidden-xs mui--hidden-sm">
                        <Col md="4">
                            <p className="grey-heading">GST Number:</p>
                            <p className="black-value">sfnefijbwrubvv1234</p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">Email Name:</p>
                            <p className="black-value">john.doe@groupbima.com</p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">Aadhar Card:</p>
                            <p className="black-value">1234567890091</p>
                        </Col>
                    </Row>
                    {/* For Mobile View */}
                    {/* Table */}
                    <table className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                        <tbody>
                            <tr>
                                <td>
                                    Company Owned:
                                </td>
                                <td>
                                    Yes
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    GST Number:
                                </td>
                                <td>
                                    1234567789012
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Full Name:
                                </td>
                                <td>
                                    John Doe
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Email Id:
                                </td>
                                <td>
                                    john.doe@groupbima.com
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Phone Number:
                                </td>
                                <td>
                                    +91-9968872607
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <hr className="hr-divider" />

                    {/* Personal Details */}
                    <h3 className="car-owner-heading">
                        Personal Details
                        <span className="sub-heading-edit">
                            Edit
                        </span>
                    </h3>
                    <hr style={{ margin: '18px 0px' }} />

                    <Row className="mui--hidden-xs mui--hidden-sm">
                        <Col md="4">
                            <p className="grey-heading">Gender:</p>
                            <p className="black-value">Male</p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">Date Of Birth:</p>
                            <p className="black-value">15th Mar 1994</p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">Nominee Age:</p>
                            <p className="black-value">47</p>
                        </Col>
                    </Row>
                    <Row className="row mui--hidden-xs mui--hidden-sm">
                        <Col md="4">
                            <p className="grey-heading">Married:</p>
                            <p className="black-value">Yes</p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">Nominee Name:</p>
                            <p className="black-value">Anjani Sharma</p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">Nominee Relation:</p>
                            <p className="black-value">Mother</p>
                        </Col>
                    </Row>
                    {/* For Mobile View */}
                    {/* Table */}
                    <table className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                        <tbody>
                            <tr>
                                <td>
                                    Gender:
                                </td>
                                <td>
                                    Male
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Married:
                                </td>
                                <td>
                                    Yes
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Your DOB:
                                </td>
                                <td>
                                    15-Mar-1994
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Nominee Name:
                                </td>
                                <td>
                                    Anjani Sharma
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Nominee Age:
                                </td>
                                <td>
                                    47
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Nominee Relation:
                                </td>
                                <td>
                                    Mother
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />

                    <Row className="row mui--hidden-xs mui--hidden-sm">
                        <Col md="4">
                            <p className="grey-heading">Address:</p>
                            <p className="black-value" style={{ lineHeight: 'normal' }}>
                                Something something something Something
                                something something Something something something
                                something something something something
                            </p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">Pincode:</p>
                            <p className="black-value">282001</p><br />
                            <p className="grey-heading">City:</p>
                            <p className="black-value">Agra</p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">State:</p>
                            <p className="black-value">Uttar Pradesh</p>
                        </Col>
                    </Row>

                    {/* For Mobile View */}
                    {/* Table */}
                    <table className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                        <tbody>
                            <tr>
                                <td>
                                    Communication Address:
                                </td>
                                <td>
                                    91 Ullrich Walks Suite 111
                                    91 Ullrich Walks Suite 11191
                                    Ullrich Walks Suite 111
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Pincode:
                                </td>
                                <td>
                                    282001
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    City:
                                </td>
                                <td>
                                    Agra
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    State:
                                </td>
                                <td>
                                    Uttar Pradesh
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <hr className="divider-hr" />

                    {/* Previous Policy Details */}
                    <h3 className="car-owner-heading">
                        Previous Policy Details
                        <span className="sub-heading-edit">
                            Edit
                        </span>
                    </h3>
                    <hr style={{ margin: '18px 0px' }} />

                    <Row className="mui--hidden-xs mui--hidden-sm">
                        <Col md="4">
                            <p className="grey-heading">Previous Insurer Name:</p>
                            <p className="black-value">Kotak Insurer</p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">Previous Policy Type:</p>
                            <p className="black-value">Comprehensive Plan</p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">NCB%:</p>
                            <p className="black-value">20%</p>
                        </Col>
                    </Row>
                    <Row className="row mui--hidden-xs mui--hidden-sm">
                        <Col md="4">
                            <p className="grey-heading">Previous Policy Number:</p>
                            <p className="black-value">1234567890987654</p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">Previous Insurance Expiry Date:</p>
                            <p className="black-value">Anjani Sharma</p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">Ownership Changed in last 12 months:</p>
                            <p className="black-value">No</p>
                        </Col>
                    </Row>
                    {/* For Mobile View */}
                    {/* Table */}
                    <table className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                        <tbody>
                            <tr>
                                <td>
                                    Previous Insurer Name:
                                </td>
                                <td>
                                    Kotak General Insurance
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Previous Policy Number:
                                </td>
                                <td>
                                    1234567890987
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    YPrevious Policy Type:
                                </td>
                                <td>
                                    Comprehensive Plan
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Previous Insurance Expiry Date:
                                </td>
                                <td>
                                    12-Mov-2018
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    NCB%:
                                </td>
                                <td>
                                    20%
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Ownership Changed in last 12 months:
                                </td>
                                <td>
                                    Yes
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <hr className="divider-hr" />

                    {/* Previous Policy Details */}
                    <h3 className="car-owner-heading">
                        Vehicle Details
                        <span className="sub-heading-edit">
                            Edit
                        </span>
                    </h3>
                    <hr style={{ margin: '18px 0px' }} />

                    <Row className="mui--hidden-xs mui--hidden-sm">
                        <Col md="4">
                            <p className="grey-heading">Registration Number</p>
                            <p className="black-value">UP 80 AJ 1234</p><br />
                            <p className="grey-heading">Car on Loan</p>
                            <p className="black-value">Bank Name</p><br />
                            <p className="grey-heading">Cover Value(IDV)</p>
                            <p className="black-value">Rs. 1234567</p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">Engine Number</p>
                            <p className="black-value">1234567890123456</p><br />
                            <p className="grey-heading">Chasis Number</p>
                            <p className="black-value">1234567890123456</p>
                        </Col>
                        <Col md="4">
                            <p className="grey-heading">Vehicle Registration Date</p>
                            <p className="black-value">12-Mar-2018</p><br />
                            <p className="grey-heading">Vehicle Manufacturing Month and Year</p>
                            <p className="black-value">Jan-2018</p>
                        </Col>
                    </Row>

                    {/* For Mobile View */}
                    {/* Table */}
                    <table className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                        <tbody>
                            <tr>
                                <td>
                                    Registration Number
                                </td>
                                <td>
                                    MH01 AJ 1234
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Car on loan:
                                </td>
                                <td>
                                    Bank Name
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Cover Value(IDV):
                                </td>
                                <td>
                                    Rs. 1234567
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Engine Number:
                                </td>
                                <td>
                                    1234567890123456
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Chasis Number:
                                </td>
                                <td>
                                    1234567890123456
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Vehicle Reg. Date
                                </td>
                                <td>
                                    12-Mar-2018
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Vehicle Manufacturing<br/>
                                    Month and Year:
                                </td>
                                <td>
                                    Jan-2018
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </Panel>
            </div>
        )
    }
}


export default ProposalSummary
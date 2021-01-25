import React from 'react'
import Panel from 'muicss/lib/react/panel'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import StarRate from '@material-ui/icons/StarRate'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'

import './payment.css'


const styles = {
    root: {
        color: 'black',
        '&$checked': {
            color: '#0da176',
        },
    },
    checked: {},
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#0da176',
        '&:hover': {
            backgroundColor: '#0da176',
        },
        padding: '10px 60px',
        margin: '0 0 1rem 0'
    },
};


class Payment extends React.Component {

    state = {
        checkedG: true
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="payment-summary-div">
                <Panel>
                    {/* Insurer details for desktop */}
                    <Row className="mui--hidden-xs mui--hidden-sm">
                        <Col md="3" sm="12" xs="12">
                            <img src="/assets/aegon.png"  alt="insurer" />
                        </Col>
                        <Col md="5" lg="5" sm="12" xs="12">
                            <p className="insurer-name">
                                Bajaj Allianz car<br/> policy package
                            </p>
                            <p className="rating-text">
                                Customers Rating:
                                <span> 4.7</span>
                                <StarRate style={{ marginBottom: '-8px', color: '#efce4a' }} />
                            </p>
                            <p className="rating-text" style={{ marginTop: '4px' }}>
                                GB Rating:
                                <span> 4.7</span>
                                <StarRate style={{ marginBottom: '-8px', color: '#efce4a' }} />
                            </p>
                        </Col>
                        <Col md="4">
                            <p className="plain-details-heading">Plan Details</p>
                            <p className="total-premium">Total Premium</p>
                            <p className="payment">Rs. 1,143<span>/month</span></p>
                            <p className="gb-message">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;~10% insurer
                                <br />
                                increased the price
                            </p>
                        </Col>
                    </Row>

                    {/* Insurer Details for Mobile */}
                    <Row className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                        <Col sm="8" xs="8">
                            <img src="/assets/aegon.png" alt="insurer"/>
                            <p className="insurer-name">
                                Bajaj Allianz car policy package
                            </p>
                            <p className="plain-details-heading" style={{float: 'left'}}>Plan Details</p>
                        </Col>
                        <Col sm="4" xs="4">
                            <p className="payment">Rs. 1,143<span>/month</span></p>
                            <p className="gb-message">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;~10% insurer
                                <br />
                                increased the price
                            </p>
                        </Col>
                    </Row>

                    <hr />

                    {/* AddOn's div */}
                    <div className="addons">
                        <h3 className="addons-heading">ADD ONS</h3>

                        {/* Text */}
                        {new Array(4).fill(0, 0).map(item =>
                            <div>
                                <p className="addon-name">Some really long  add on name</p>
                                <p className="dots"></p>
                                <p className="price">Rs. 4,546 </p>
                            </div>
                        )}

                    </div>

                    {/* Premium div */}
                    <div className="addons">
                        <h3 className="addons-heading">Premium</h3>

                        {/* Package Premium */}
                        <div>
                            {/* <p className="package-premium">Packagae Premium</p> */}
                            <p className="dots-premium-package"></p>
                            {/* <p className="price">Rs. 4,546 </p> */}
                        </div>

                        {/* GST */}
                        <div>
                            <p className="gst">GST@18%</p>
                            <p className="dots-gst"></p>
                            <p className="price">Rs. 4,546 </p>
                        </div>

                        {/* Total Premium */}
                        <div>
                            <p className="total-premium-next">Total Premium</p>
                            <p className="dots-total"></p>
                            <p className="price">Rs. 4,546/month</p>
                        </div>
                    </div>

                    <p className="full-premium">Full Premium Breakup</p>

                    <hr />

                    {/* Table */}
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    Coverage Type
                                </td>
                                <td>
                                    Comprehensive Cover
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Your Car
                                </td>
                                <td>
                                    MH-02-AJ-1234, Navi Mumbai,
                                    Hyundai i10 1.2 Era Petrol, 2014.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    NCB % :
                                </td>
                                <td>
                                    20%
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Reg. Date:
                                </td>
                                <td>
                                    01/10/2014
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    IDV:
                                </td>
                                <td>
                                    Rs. 12345678
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Policy Start Date:
                                </td>
                                <td>
                                    dd/mm/yyyy
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="final-summary-div">
                        <p className="final-summary">
                            3 Add-ons, 2 Additional Cover and 1 Discount applied <span className="edit">Edit</span>
                        </p>
                        <p className="v_e_action">
                            View or Edit
                        </p>
                    </div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.checkedG}
                                value="checkedG"
                                classes={{
                                    root: classes.root,
                                    checked: classes.checked,
                                }}
                            />
                        }
                        label="Declaration of Using Groupbima platform"
                    />
                    <Button
                        className={classNames(classes.buttonRoot3)}
                        fullWidth>Payment</Button>
                </Panel>
            </div>
        )
    }
}

Payment.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Payment);
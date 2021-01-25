import React from 'react'
import Panel from 'muicss/lib/react/panel'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import TextField from '@material-ui/core/TextField'

import './payment.css'

const styles = theme => ({
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#0da176',
        '&:hover': {
            backgroundColor: '#0da176',
        },
        padding: '10px 60px',
        margin: '0.5rem 0 0rem 0'
    },
    button: {
        color: '#0da176',
        backgroundColor: '#ffffff',
        border: '1px solid #0da176',
        '&:hover': {
            backgroundColor: '#ffffff',
        },
        padding: '10px 60px',
        margin: '0.5rem 0 0rem 0'
    },
});

class PaymentDetails extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className="parent-div-payment-details">
                <Panel>
                    <div className="premium-div">
                        <p className="total-heading">Total Premium</p>
                        <p className="amount">
                            Rs. 1,143<span>/month</span>
                        </p>
                    </div>
                    <hr className="hr-ln" />

                    {/* Addons */}
                    <div className="addons">
                        <h3 className="addons-heading">ADD ONS</h3>
                        <Row>
                            <Col md="9">
                                <p className="addon-text">Some really long  add on nameSome really long  add on name</p>
                                <p className="addon-text">Some really long  add on nameSome really long  add on name</p>
                                <p className="addon-text">Some really long  add on nameSome really long  add on name</p>
                                <p className="addon-text">Some really long  add on nameSome really long  add on name</p>

                            </Col>
                            <Col md="3">
                                <p className="addon-amount">Rs. 4,546 </p>
                                <p className="addon-amount">Rs. 4,546 </p>
                                <p className="addon-amount">Rs. 4,546 </p>
                                <p className="addon-amount">Rs. 4,546 </p>
                            </Col>
                        </Row>
                    </div>
                    {/* Premium */}
                    <div className="premium">
                        <h3 className="premium-heading">PREMIUM</h3>
                        <Row>
                            <Col md="8">
                                <p className="premium-text">Packagae Premium</p>
                                <p className="premium-text">GST@18%</p>
                                <p className="premium-text">Total Premium</p>
                            </Col>
                            <Col md="4">
                                <p className="premium-amount">Rs. 4,546 </p>
                                <p className="premium-amount">Rs. 4,546 </p>
                                <p className="premium-amount">
                                    <span className="amount">
                                        Rs. 4,546/
                                        <span>
                                            month
                                        </span>
                                    </span>
                                </p>
                            </Col>
                        </Row>
                        <p className="full-premium-breakup">Full Premium Breakup</p>
                    </div>
                    <hr className="hr-ln" />
                    <div className="trial">
                        <h3 className="trial-heading">14 Days free period</h3>
                        <p>
                            We promise to refund a 100% of your money if you are
                            not happy with our service or feel that you've the wrong policy.
                            So don't worry and get insured with ease and confidence.
                        </p>
                        <p className="refund-policy">Read our Refund Policy</p>
                    </div>
                    {/* Buy policy button */}
                    <Button
                        className={classNames(classes.buttonRoot3)}
                        fullWidth>Buy Policy</Button>
                </Panel>

                {/* Panel Get Assistant */}
                <Panel style={{ marginTop: '15px', marginRight: '10px' }}>
                            <p>Get Assistance offline</p>
                            <p className="text-get-asistance-offline">We would be happy to assist you
                                in any way you need. We'll help you through the whole process
                                without breaking a sweat.
                            </p>
                            <Row>
                                <Col md="6">
                                    <div style={{ textAlign: 'center' }}>
                                        <img src="/assets/Group 696.svg" alt="meet in person" style={{ width: '60px' }} />
                                        <p className="meet-in-person-quote-car">Meet in person</p>
                                    </div>
                                </Col>
                                <Col md="6" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <img src="/assets/Group 698.svg" alt="get a call" style={{ width: '60px' }} />
                                        <p className="meet-in-person-quote-car">Get a call back</p>
                                    </div>
                                </Col>
                            </Row>
                        </Panel>

                        {/* Get updates */}
                        <Panel style={{ marginTop: '15px', marginRight: '10px' }}>
                            <p>Get updates on policy</p>
                            <p className="text-get-asistance-offline">Save all your search results.
                             Make your account and get other benefits and high quality service as well.
                            </p>
                            <Row>
                                <Col md="12">
                                    <TextField label="Name" margin="dense" fullWidth />
                                    <TextField label="Mobile Number" margin="dense" fullWidth />
                                    <Button fullWidth variant="outlined"  className={classes.button}>Get Updates</Button>
                                </Col>
                            </Row>
                        </Panel>
                
            </div>
        )
    }
}

PaymentDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaymentDetails)
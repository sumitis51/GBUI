import React from 'react'
import Panel from 'muicss/lib/react/panel'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
// import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import constants from '../../../constants/appConstants.json'

import './payment.css'
import PremiumBreakup from '../../PremiumBreakupPopUp/index';
import RefundPolicy from '../RefundPolicy'


const styles = theme => ({
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '10px 60px',
        margin: '0.5rem 0 0rem 0'
    },
    button: {
        width: '100%',
        color: '#ea0b4b',
        backgroundColor: '#ffffff',
        border: '1px solid #ea0b4b',
        '&:hover': {
            backgroundColor: '#ffffff',
        },
        padding: '10px 60px',
        margin: '0.5rem 0 0rem 0'
    },
});

class PaymentDetails extends React.Component {
    PremiumBreakup = () => {
        this.props.onSelectPremium(true, 'PREMIUM_BREAKUP')
    }
    state = {
        consent: false,
        selectedPlan: {},
        refundPolicyOpen: false
    }
    handleChangeCheckbox = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    }
    refundPolicyClose = () => {
        this.setState({ refundPolicyOpen: false })
    }


    render() {

        const { classes } = this.props;
        return (
            <div className="parent-div-payment-details">
                <Panel>
                    <div className="premium-div">

                        <Row>
                            <Col md="3">
                                <img src={`${constants.mediaBucketURL}/${this.props.currentPlan ? this.props.currentPlan.insurerLogo : ''}`} alt="plan-logo" />
                            </Col>
                            <Col md="5">
                                <p className="package-name">
                                    <p>{this.props.currentPlan.planName}</p>
                                </p>
                                {/* <p className="customer-rating">
                                        Customers Rating:
                                <span className="rating-value">4.7</span>
                                        <StarRate style={{ marginBottom: '-8px', color: "#efce4a" }} />
                                    </p>
                                    <p className="gb-rating">
                                        GB Rating: <span>4.7</span>
                                        <StarRate style={{ marginBottom: '-8px', color: '#efce4a' }} />
                                    </p> */}
                            </Col>
                            <Col md="4">

                                <p className="total-heading">Total Premium</p>
                                <p className="amount">

                                    Rs. {this.props.currentPlan ? this.props.currentPlan.totalPremium : 'NA'}<span>/year</span>
                                </p>
                            </Col>
                        </Row>
                    </div>
                    <hr className="hr-ln" />

                    {/* Addons */}
                    <div className="addons">
                        {this.props.currentPlan.addOns && this.props.currentPlan.addOns.length > 0 &&
                            (<h3 className="addons-heading">
                                Add - Ons
                                    </h3>)
                        }
                        {this.props.currentPlan.addOns ? this.props.currentPlan.addOns.map((item, index) =>
                            item.checked ? (<div key={index}>
                                {item.checked && <Row>
                                    <Col md="9">
                                        <p className="addon-text">{item.name}</p>
                                    </Col>
                                    <Col md="3">
                                        <p className="addon-amount">Rs. {item.amount} </p>
                                    </Col>
                                </Row>

                                }</div>) : '') : console.log(this.props.currentPlan, 'From Payment')}


                    </div>
                    {/* Premium */}
                    <div className="premium">
                        <h3 className="premium-heading">PREMIUM</h3>
                        <Row>
                            <Col md="8">
                                <p className="premium-text">Base Premium</p>
                                <p className="premium-text">Package Premium</p>
                                <p className="premium-text">GST@18%</p>
                                <p className="premium-text">Total Premium</p>
                            </Col>
                            <Col md="4">
                                <p className="premium-amount">Rs. {this.props.currentPlan ? this.props.currentPlan.basePremium : 'NA'} </p>
                                <p className="premium-amount">Rs. {this.props.currentPlan ? this.props.currentPlan.premium : 'NA'} </p>
                                <p className="premium-amount">Rs. {this.props.currentPlan ? this.props.currentPlan.gst : 'NA'} </p>
                                <p className="premium-amount">
                                    <span className="amount">
                                        Rs. {this.props.currentPlan ? this.props.currentPlan.totalPremium : 'NA'}/
                                        <span>
                                            year
                                        </span>
                                    </span>
                                </p>
                            </Col>
                        </Row>
                        <p className="full-premium-breakup" onClick={this.PremiumBreakup}>Full Premium Breakup</p>
                        {this.props.model_id === 'PREMIUM_BREAKUP' ?
                            <PremiumBreakup closeMethod={(value) => () => { this.setState({ PremiumBreakup: value }) }} plan={this.props.currentPlan ? { ...this.props.currentPlan } : {}} /> : null
                        }
                    </div>
                    <hr className="hr-ln" />
                    <div className="trial">
                        <h3 className="trial-heading">15 Days free period</h3>
                        <p>
                            You will be allowed a period of 15 days from the date of receipt of the Policy document to review the terms and conditions of the Policy and to return the same if not acceptable.
                        </p>
                        <p className="refund-policy" onClick={() => { this.setState({ refundPolicyOpen: true }) }}>Read our Refund Policy</p>
                    </div>

                    <Link to={{ pathname: `/proposal-form-health`, state: { insurer: this.props.currentPlan } }}>
                        <Button
                            className={classNames(classes.buttonRoot3)}
                            fullWidth>Buy Policy</Button>
                    </Link>
                </Panel>

                {/* Panel Get Assistant  */}
                {/* <Panel style={{ marginTop: '15px', marginRight: '10px' }}> */}
                {/* <p>Get Assistance offline</p> 
                    <p className="text-get-asistance-offline">We would be happy to assist you
                        in any way you need. We'll help you through the whole process
                        without breaking a sweat.
                            </p>
                    <Row>
                        <Col md={12}>
                            <Button fullWidth variant="outlined" className={classes.button}>Call me back</Button>
                        </Col>
                    </Row> */}
                {/* </Panel>  */}

                {/* Get updates  */}
                {/* <Panel style={{ marginTop: '15px', marginRight: '10px', marginBottom: '-17px' }}> */}
                {/* <p>Get updates on policy</p>
                    <p className="text-get-asistance-offline">Save all your search results.
                     Make your account and get other benefits and high quality service as well.
                    </p> 

                    <Row>
                        <Col md="12">
                            <TextField label="Name" margin="dense" fullWidth />
                            <TextField label="Mobile Number" margin="dense" fullWidth />
                            <div className='div-margin'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.consent}
                                            onChange={this.handleChangeCheckbox}
                                            value={this.state.consent}
                                            name="consent"
                                        />
                                    }
                                    label="I agree to receive notifications(calls & sms) from Groupbima."
                                />
                            </div>
                        </Col>
                        <Col md={12}><Button disabled={!this.state.consent} fullWidth variant="outlined" className={classes.button}>Get Updates</Button></Col>
                    </Row> */}
                {/* </Panel> */}
                <RefundPolicy refundPolicyOpen={this.state.refundPolicyOpen} refundPolicyClose={this.refundPolicyClose} />
            </div>
        )
    }
}

PaymentDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        premiumBreakup: state.popup.premium_breakup_modal,
        model_id: state.popup.model_id,
        currentPlan: state.currentPlan.details ? { ...state.currentPlan.details } : {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectPremium: (premium, model_id) => dispatch({ type: 'PREMIUM_BREAKUP_MODAL', premium, model_id }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PaymentDetails))
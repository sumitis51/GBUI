import React from 'react'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import { connect } from 'react-redux'
import Panel from 'muicss/lib/react/panel'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import './proposal-form.css'
import HeaderPanels from '../Proposal_Summary_Motor/HeaderPanels'
import OwnerDetails from './OwnerDetails'
import PersonalDetails from './PersonalDetails'
import PreviousPolicyDetails from './PreviousPolicyDetails'
import VehicleDetails from './VehicleDetails'
import PaymentDetails from './PaymentDetails'

const styles = theme => ({
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#0da176',
        '&:hover': {
            backgroundColor: '#0da176',
        },
        padding: '15px 10px'
    }
})
class ProposalFormMotor extends React.Component {

    state = {
        step: 0,
    }

    componentWillMount() {
        this.props.setStep(0)
    }

    render() {
        const {classes} = this.props;
        return (
            <div className="parent-proposal-from-motor">

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

                {/* Content body */}
                <div className="proposal-form-body">

                    {/* BAck to quotes link */}
                    <div className="back-link">
                        <img alt='back' src="/assets/back.png" /> &nbsp;
                        BACK TO QUOTES
                    </div>

                    {/* Car quote details heading */}
                    <h3 className="car-quote-details-heading">Car Quote Detail</h3>
                    {/* Header Panels */}
                    <HeaderPanels />

                    {/* Steppers heading */}
                    <div className="stepper-headings">
                        <p className={"active-success"}>Fill Details</p>
                        <p className={"disable"}>Review & Pay</p>
                        <p className={"disable"}>View Policy</p>
                    </div>
                    <p className="small-guide-line">
                        Just fill in the proposal form and we’ll setup your policy purchase
                    </p>

                    {/* Divide the columns */}
                    <Row>
                        <Col md="8">
                            {/* Owner Details */}
                            <OwnerDetails
                                step={this.props.step} />

                            {/* Personal Details */}
                            <PersonalDetails step={this.props.step} />

                            {/* Previous Policy Details */}
                            <PreviousPolicyDetails step={this.props.step} />

                            {/* Vehicle Details */}
                            <VehicleDetails step={this.props.step} />

                            <Row className="partners">
                                <Col md="1" sm="7" xs="7">
                                    <img
                                        src="/assets/irdai.jpeg"
                                        alt="irdai"
                                        width="55"
                                        height="55" />
                                    <p className="licenced_no">LICENSED No.<br />123243567yterwq</p>
                                </Col>
                                <Col md="2" sm="5" xs="5">
                                    <div className="rectangle"></div>
                                    <div className="rectangle"></div>
                                    <p style={{ marginLeft: '30px' }}>SECURE</p>
                                </Col>
                                <Col md="6" sm="12" xs="12" className="networks">
                                    {new Array(6).fill(0, 0).map(item =>
                                        <div className="rectangle"></div>
                                    )}
                                    <p style={{ marginLeft: '8.3rem', display: 'block' }}>PAYMENT NETWORK</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="4">
                            <div className="mui--hidden-xs mui--hidden-sm"><PaymentDetails /></div>
                            <Panel className="mui--hidden-lg mui--hidden-md mui--hidden-xl">
                                <p className="total-premium-heading">Total Premium <span>Full Premium Breakup</span></p>
                                <p className="details-addon">Details & Add-Ons <KeyboardArrowUp style={{ marginBottom: '-8px' }} /></p>
                                <Row>
                                    <Col sm="7" xs="7">
                                        <p className="amount-year">Rs. 6,778<sup>/Year</sup></p>
                                        <p className="cover-value">Cover Value: Rs. 5,08,900</p>
                                    </Col>
                                    <Col sm="5" xs="5">
                                        {/* Buy policy button */}
                                        <Button
                                            className={classNames(classes.buttonRoot3)}>Buy Policy</Button>
                                    </Col>
                                </Row>
                            </Panel>
                        </Col>
                    </Row>



                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    step: state.proposal_form_motor.step
})

const mapDispatchToProps = dispatch => ({
    setStep: (step) => dispatch({ type: 'SET_STEP', step })
})
ProposalFormMotor.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProposalFormMotor))
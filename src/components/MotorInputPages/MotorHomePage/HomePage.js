import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';
import Popup from '../../Popup/Popup';
import './HomePage.css';
import { connect } from 'react-redux';
import Policydialog from '../../CarPolicyPopup/PolicyDialog';

import CommercialDetails from '../CommercialDetails/index'

const styles = {
    textField: {
        width: '100%',
        paddingTop: '7px',
    },
    label: {
        fontSize: '14px',
        textAlign: 'left',
        fontFamily: 'Nunito',
        color: '#000000',
    },
    root: {
        color: '#000000',
        '&$checked': {
            color: green[500],
        },
    },
    checked: {},
};

class HomePage extends Component {
    state = {
        car_type: 'Personal Car',
        open: false,
        commercial_component: false, // because by default is Personal Car
    };

    handleChange = event => {
        this.setState({ car_type: event.target.value });
        /**
         * If Commercial vehicle then dispatch for commercial vehicle action as true
         */
        if (event.target.value === 'Commercial Car')
            this.props.commercial_vehicle_action(true);
        else
            this.props.commercial_vehicle_action(false);
    };

    handleSubmit() {
            // this.state.selectedValue === 'Personal Car' &&
            this.props.onShowPopUp();
            this.props.onPopUpTextShow();
            this.props.onPopMobileValue(0);
            this.props.onPopUpForgotHide(); // hide popup properties for forgot registartion
            this.props.pop_bought_new_car(false); // hide popup properties for bought new car
    }


    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider>
                <div className='HomePage'>
                    <Container fluid={true} className='HomePageContainer'>
                        <Row>
                            <Col md={12} sm={12} xs={12}>
                                <div className='insurance'>
                                    Insurance, fast and painless
                                </div>
                                <div className='insuranceType'>
                                    Select the type of insurance to want to explore today
                                </div>
                            </Col>
                        </Row>

                        <Row className='HomePageRow'>
                            <Col md='6' className='mui--hidden-xs mui--hidden-sm' >
                                <img src="assets/CarInsurance/carInsurance.svg" className='HomePagePic' alt='HomePagePic' />
                            </Col>
                            <Col md='6' xs={12}>
                                <Row >
                                    <Col md='2' xs={2}>
                                        <div className='insuranceOption' style={{ borderBottom: 'solid 2px #940016' }}>Car</div>
                                    </Col>
                                    <Col md='2' xs={2}>
                                        <div className='insuranceOption'>Bike</div>
                                    </Col>
                                    <Col md='2' xs={2}>
                                        <div className='insuranceOption'>Health</div>
                                    </Col>
                                    <Col md='3' xs={4}>
                                        <div className='insuranceOption' style={{ textAlign: 'center' }}>Term Life</div>
                                    </Col>
                                    <Col md='2' xs={2}>
                                        <div className='insuranceOption'>PA</div>
                                    </Col>
                                    <Col md='12' className='newCarRow'>
                                        Got a new car? Want to get a new policy? Get car insurance here.
                                    </Col>

                                </Row>
                                <Row>
                                    <Col xl='3' lg='4' md='4' xs="6" className='radioControl'>
                                        <Popup show={this.props.ctr} />
                                        <FormControlLabel
                                            classes={{
                                                label: classes.label,
                                            }}
                                            value="Personal Car"
                                            control={<Radio
                                                checked={this.state.car_type === 'Personal Car'}
                                                onChange={this.handleChange}
                                                value="Personal Car"
                                                name="car_type"
                                                classes={{
                                                    root: classes.root,
                                                    checked: classes.checked,
                                                }}
                                            />}
                                            label="Personal Car"
                                        />
                                    </Col>
                                    <Col xl='3' lg='4' md='5' xs="6" className='radioControl'>
                                        <FormControlLabel
                                            classes={{
                                                label: classes.label,
                                            }}
                                            value="Commercial Car"
                                            control={<Radio
                                                checked={this.state.car_type === 'Commercial Car'}
                                                onChange={this.handleChange}
                                                value="Commercial Car"
                                                name="car_type"
                                                classes={{
                                                    root: classes.root,
                                                    checked: classes.checked,
                                                }}
                                            />}
                                            label="Commercial Car"
                                        />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md='8' xs='12'>
                                        <TextField
                                            className={classes.textField}
                                            id="standard-name"
                                            placeholder="Vechile Registration Number"
                                            value={this.state.name}
                                        />
                                        <Row>
                                            <Col md='7' xs='7' sm='6'>
                                                <div className='underText' style={{ textAlign: 'left', cursor: 'pointer' }}
                                                    onClick={() => {
                                                        this.props.onShowPopUp();
                                                        this.props.onPopUpForgot();
                                                        this.props.onPopMobileValue(0);
                                                        this.props.pop_bought_new_car(false);
                                                    }}>
                                                    Forgot Registration Number?
                                                </div>
                                            </Col>
                                            <Col md='5' xs='5' sm='6'>
                                                <div className='underText' style={{ textAlign: 'right', cursor: 'pointer' }}
                                                    onClick={() => {
                                                        this.props.onShowPopUp();
                                                        this.props.pop_bought_new_car(true);
                                                        this.props.onPopUpForgotHide();
                                                        this.props.onPopUpTextHide();
                                                        this.props.onPopMobileValue(0);
                                                    }}>
                                                    Bought a New Car?
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md='4' xs='12'>
                                        {this.state.car_type === 'Personal Car'?
                                            <ButtonLightSuccess onClick={this.handleSubmit.bind(this)} Text="Submit" smallWidth={true} />:
                                            <ButtonLightSuccess onClick={() => {this.setState({commercial_component: true})}} Text="Submit" smallWidth={true} />
                                        }
                                        {}
                                    </Col>
                                    <Col xs='12' className='mui--visible-xs-block mui--visible-sm-block' >
                                        <img src="assets/CarInsurance/carInsurance.svg" className='HomePagePic' alt='HomePagePic' />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {this.props.policy &&
                            <Policydialog />
                        }
                        {this.state.commercial_component &&
                            <CommercialDetails />
                        }
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        ctr: state.popup.show_stepper_popup,
        policy: state.popup.popup_policy_show,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onShowPopUp: () => dispatch({ type: 'POPUP_STEPPER_SHOW' }),
        onShowpolicyPopUp: () => dispatch({ type: 'POPUP_POLICY_SHOW' }),
        onPopUpTextShow: () => dispatch({ type: 'POPUP_TEXT_SHOW' }),
        onPopUpTextHide: () => dispatch({ type: 'POPUP_TEXT_HIDE' }),
        onPopUpForgot: () => dispatch({ type: 'POPUP_FORGOT_SHOW' }),
        onPopUpForgotHide: () => dispatch({ type: 'POPUP_FORGOT_HIDE' }),
        onPopMobileValue:(value) => dispatch({type:'POPUP_MOBILE_VALUE_INCREASE', value}),
        pop_bought_new_car:(bought_car) => dispatch({type:'BOUGHT_NEW_CAR_POPUP', bought_car}),
        commercial_vehicle_action:(commercial_vehicle) => dispatch({type: 'COMMERCIAL_VEHICLE', commercial_vehicle})
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomePage));
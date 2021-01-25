import React from 'react'
import Container from 'muicss/lib/react/container'
import Panel from 'muicss/lib/react/panel'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';

import axios from 'axios';
import constants from '../../constants/appConstants.json'
import './forgot-password.css'

const styles = theme => ({
    snack:{
        marginTop:'6rem'
    },
    cssLabel: {
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        color: 'rgba(170, 170, 170, 0.54)',
        '&$cssFocused': {
            color: 'rgba(0,0,0,.87)',
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: 'rgba(0,0,0,.87)',
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: 'rgba(0,0,0,.87)',
        },
    },
    errored: {
    },
    backdrop: {
        backgroundColor: "transparent"
    },
    inputLabel: {
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        color: '#aaaaaa'
    },
    margin: {
        maxWidth: '330px'
    },
    cssRoot: {
        color: theme.palette.getContrastText('#ea0b4b'),
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        maxWidth: '330px',
        textTransform: 'capitalize'
    },
});

class ForgotPassword extends React.Component {

    state = {
        openSnack:false,
        email: '',
        phone: '',
        isEmail: true,
        email_or_phone: '',
        isError: false,
        init: true,
        errorMessage:''
    }

    handleChange = (event) => {
        // Here check for validity
        const isValid = this.checkValidity(event.target.value, {required: true, isEmailOrPhone: true})
        this.setState({email_or_phone: event.target.value, isError: isValid, init: false})
        // console.log(isValid)

    }

    handleFormSubmit = (event) => {
        // Handle form submission
        event.preventDefault()
        const value = this.state.email_or_phone
        let url = ''
        // Check for email or phone
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //eslint-disable-line
        if ((re.test(String(value).toLowerCase()))) {
            url = `${constants.apiRootURL}/forgot?email=${value}`
        } else {
            url = `${constants.apiRootURL}/forgot?mobile=${value}`
        }
        
        axios.post(url)
            .then(response => {
                
                if (response.status === 500) {
                    // Here redirect to error page
                    this.props.history.push('/500')
                } else if (response.status === 200) {
                    console.log(response)
                    this.props.history.push('/otp-verification', {value})
                }
            }).catch(error => {
                if (error.response.status === 400) {
                    this.setState({
                        openSnack:true,
                        errorMessage:error.response.data
                    })
                }
                if (error.response.status === 401) {
                    localStorage.clear();
                    this.props.onAuthFail()
                    this.props.history.push('/login-customer')
                }
                if (error.response.status === 403) {
                    this.setState({
                        openSnack:true,
                        errorMessage: error.response.data
                    }) 
                    // this.props.history.push('/500')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
    }

    // Check validity
    checkValidity(value, rules) {
        let isValid = true
        if (!rules) {
            return true
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isEmailOrPhone) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //eslint-disable-line
            isValid = (re.test(String(value).toLowerCase()) && isValid) || (/^\d{10}$/.test(value) && isValid)
        }

        return isValid;
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="forgot-password-parent">
                <Container className="mui--hidden-sm mui--hidden-xs">
                    <Panel className="panel-forgot">
                        <Snackbar
                            className={classes.snack}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                            }}
                            open={this.state.openSnack}
                            ContentProps={{
                            'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{this.state.errorMessage}</span>}
                        />
                        <Row>
                            <Col md="7" sm="12" className="img-side">
                                <h4 className="gbui-h4 text-center forgot-h4">Forgot Password?</h4>
                                <div className="forgot-password-img">
                                    <img src="/assets/forgot.svg" alt="forgot-password" />
                                </div>
                            </Col>
                            <Col md="5" sm="12">
                                <h5 className="gbui-h5 text-center right-forgot-h5">Forgot Password</h5>
                                <p className="gbui-menu-bar-2 note-right text-center">
                                   Forgot your password? We will take care of your Password &amp; Health Insurance.</p>
                                <div className="forgot-password-form text-center">
                                    <form onSubmit={this.handleFormSubmit}>
                                        {/* Input field for phone or email */}
                                        <FormControl className={classes.margin} fullWidth>
                                            <InputLabel
                                                htmlFor="email_or_phone"
                                                classes={{
                                                    root: classes.cssLabel,
                                                    focused: classes.cssFocused,
                                                    error: classes.errored
                                                }}
                                                style={{ color: !this.state.isError && !this.state.init ? 'red' : '' }}
                                            >
                                                Email Id or Phone Number
                                            </InputLabel>
                                            <Input
                                                id="email_or_phone"
                                                classes={{
                                                    underline: classes.cssUnderline,
                                                    // label:classes.inputLabel
                                                }}
                                                value={this.state.email_or_phone}
                                                // label="Name"
                                                fullWidth={true}
                                                required={true}
                                                error={!this.state.isError && !this.state.init}
                                                onChange={this.handleChange}
                                                onBlur={this.checkValidity}
                                            />
                                        </FormControl>
                                        {(!this.state.isError && !this.state.init) && <p style={{color: 'red', float: 'left', marginLeft: '3.5rem'}}>Please enter valid email or phone</p>}
                                        <div className="submit-button">
                                            <Button
                                                variant="contained"
                                                className={classNames(classes.cssRoot)}
                                                fullWidth
                                                disabled={!this.state.isError}
                                                type="submit"
                                            >
                                                submit
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </Panel>
                </Container>
                <div className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                    <h5 className="gbui-h5 text-center">Forgot your password? Don’t worry!!</h5>
                    <p className="gbui-menu-bar-2 note-right text-center">We will take care of your Password and Health Insurance.</p>
                    <div className="forgot-password-form text-center">
                        <form onSubmit={this.handleFormSubmit}>
                            {/* Input field for phone or email */}
                            <FormControl className={classes.margin} fullWidth>
                                <InputLabel
                                    htmlFor="email_or_phone"
                                    classes={{
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                        error: classes.errored
                                    }}
                                    style={{ color: !this.state.isError && !this.state.init ? 'red' : '' }}
                                >
                                    Email Id or Phone Number
                                            </InputLabel>
                                <Input
                                    id="email_or_phone"
                                    classes={{
                                        underline: classes.cssUnderline,
                                        // label:classes.inputLabel
                                    }}
                                    value={this.state.email_or_phone}
                                    // label="Name"
                                    fullWidth={true}
                                    required={true}
                                    error={!this.state.isError && !this.state.init}
                                    onChange={this.handleChange}
                                    onBlur={this.checkValidity}
                                />
                            </FormControl>
                            {(!this.state.isError && !this.state.init) && <p style={{color: 'red', float: 'left'}}>Please enter valid email or phone</p>}
                            <div className="submit-button">
                                <Button
                                    variant="contained"
                                    className={classNames(classes.cssRoot)}
                                    fullWidth
                                    disabled={!this.state.isError}
                                    type="submit"
                                >
                                    submit
                                            </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

ForgotPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForgotPassword)
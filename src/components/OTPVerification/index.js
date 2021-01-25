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
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';

import constants from '../../constants/appConstants.json'
import './otp-verify.css'

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
    cssRoot: {
        color: theme.palette.getContrastText('#ea0b4b'),
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        textTransform: 'capitalize'
    },
});

class OTPVerify extends React.Component {

    state = {
        openSnack:false,
        otp: '',
        isError: false,
        init: true,
        email_or_phone: '',
        time: 59
    }

    handleChange = (event) => {
        // handle value change
        // this.setState({ email_or_phone: event.target.value })
        const isValid = this.checkValidity(event.target.value, { required: true, length: true })
        this.setState({ otp: event.target.value, isError: isValid, init: false })

    }

    handleFormSubmit = (e) => {
        // Handle form submission
        e.preventDefault()

        const { email_or_phone, otp } = this.state
        const value = email_or_phone
        let url = ''
        // Check for email or phone
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //eslint-disable-line
        if ((re.test(String(value).toLowerCase()))) {
            url = `${constants.apiRootURL}/verify-otp?email=${value}&otp=${otp}`
        } else {
            url = `${constants.apiRootURL}/verify-otp?mobile=${value}&otp=${otp}`
        }

        // const params = {
        //     headers: {
        //       Authorization: 'Bearer ' + token //the token is a variable which holds the token
        //     }
        // }

        const vm = this
        axios.post(url)
            .then(response => {

                if (response.status === 500) {
                    // Here redirect to error page
                    this.props.history.push('/500')
                } else if (response.status === 200) {
                    console.log(response)
                    vm.props.history.push('/reset-password', { token: response.data })
                }
            }).catch(error => {
                if (error.response.status === 400) {
                    this.setState({
                        openSnack:true
                    })
                }
                if (error.response.status === 401) {
                    localStorage.clear();
                    this.props.onAuthFail()
                    this.props.history.push('/login-customer')
                }
                if (error.response.status === 403) {
                    this.props.history.push('/500')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
    }

    checkValidity(value, rules) {
        let isValid = true
        if (!rules) {
            return true
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.length) {
            const vLength = value.trim().length

            isValid = (vLength === 6) && isValid
        }

        return isValid;
    }

    componentWillMount() {
        console.log(this.props.location)
        const { value } = this.props.location.state
        !value ? this.props.history.push('/notfound') : this.setState({ email_or_phone: value })
    }
    componentDidMount() {
        this.handleTimer()
    }

    handleEditDetails = () => {
        this.props.history.push('/forgot-password')
    }

    handleResendPassword = () => {
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
                    alert('OTP Resend done!')
                    this.setState({time: 55})
                    this.handleTimer()
                }
            }).catch(error => {
                if (error.response.status === 400) {
                    this.setState({
                        openSnack:true
                    })
                }
                if (error.response.status === 401) {
                    localStorage.clear();
                    this.props.onAuthFail()
                    this.props.history.push('/login-customer')
                }
                if (error.response.status === 403) {
                    this.props.history.push('/500')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
    }

    handleTimer() {
        const x = setInterval(() => {
            let time = this.state.time
            if(time === 0) {
                clearInterval(x)
            } else {
                this.setState({time: --time})
            }
            
        }, 1000)
    }

    render() {
        const { classes } = this.props
        const { email_or_phone, time } = this.state
        return (
            <div className="otp-verify-parent">
                <Container className="mui--hidden-sm mui--hidden-xs">
                    <Panel className="panel-forgot">
                        <Row>
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
                                message={<span id="message-id">Something Went Wrong!</span>}
                            />
                            <Col md="7" sm="12" className="img-side">
                                <h4 className="gbui-h4 text-center forgot-h4">Verify it’s you!!</h4>
                                <div className="forgot-password-img">
                                    <img src="/assets/otp.svg" alt="forgot-password" />
                                </div>
                            </Col>
                            <Col md="5" sm="12" style={{ padding: '25px' }}>
                                <h5 className="gbui-h5 text-center right-forgot-h5">Verification Code</h5>
                                <p className="gbui-menu-bar-2 note-right text-center">
                                    Please type the verification code sent to
                                    <span style={{ color: '#000000' }}>
                                        “{email_or_phone}”
                                    </span>
                                </p>
                                <p className="gbui-body-1 text-center light-gb2">
                                    Entered wrong details?
                                    <span
                                        style={{ color: '#ea0b4b', cursor: 'pointer' }}
                                        onClick={this.handleEditDetails}>
                                        Edit
                                    </span>
                                </p>
                                <div className="forgot-password-form text-center">
                                    <form onSubmit={this.handleFormSubmit}>
                                        {/* Input field for OTP */}
                                        <FormControl className={classes.margin} fullWidth>
                                            <InputLabel
                                                htmlFor="otp"
                                                classes={{
                                                    root: classes.cssLabel,
                                                    focused: classes.cssFocused,
                                                    error: classes.errored
                                                }}
                                                style={{ color: !this.state.isError && !this.state.init ? 'red' : '' }}
                                            >
                                                OTP
                                            </InputLabel>
                                            <Input
                                                id="otp"
                                                classes={{
                                                    underline: classes.cssUnderline,
                                                    // label:classes.inputLabel
                                                }}
                                                value={this.state.otp}
                                                // label="Name"
                                                fullWidth={true}
                                                required={true}
                                                error={!this.state.isError && !this.state.init}
                                                onChange={this.handleChange}
                                                onBlur={this.checkValidity}
                                                name="otp"
                                            />
                                        </FormControl>
                                        {
                                            (!this.state.isError && !this.state.init) &&
                                            <p style={{ color: 'red', float: 'left' }}>Please enter a valid otp</p>
                                        }
                                        <div className="submit-button">
                                            <Button
                                                variant="contained"
                                                className={classNames(classes.cssRoot)}
                                                fullWidth
                                                disabled={!this.state.isError && !this.state.init}
                                                type="submit"
                                            >
                                                Confirm
                                            </Button>
                                        </div>
                                        <p className="gbui-body-1  light-gb2" style={{ textAlign: 'center', margin: '1rem 0rem' }}>
                                            Didn’t receive the code?&nbsp;
                                            <Button disabled = {time > 0} ><span
                                                style={{ color: '#ea0b4b', cursor: 'pointer', textTransform: 'capitalize' }}
                                                onClick={this.handleResendPassword}>
                                                Resend
                                            </span></Button>
                                        </p>
                                        <p className="gbui-body-1  light-gb2" style={{ color: '#ea0b4b', textAlign: 'center', margin: '1rem 0rem' }}>
                                            00:{time} Secs
                                        </p>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </Panel>
                </Container>
                <div className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ padding: '15px' }}>
                    <h5 className="gbui-h5 text-center">Verification Code</h5>
                    <p className="gbui-menu-bar-2 note-right text-center">
                        Please type the verification code sent to <span style={{ color: '#000000' }}>“{email_or_phone}”</span>
                    </p>
                    <p className="gbui-body-1 text-center light-gb2">
                        Entered wrong details?
                                    <span style={{ color: '#ea0b4b', cursor: 'pointer' }}
                                        onClick={this.handleEditDetails}>
                                        Edit
                                    </span>
                    </p>
                    <div className="forgot-password-form text-center">
                        <form onSubmit={this.handleFormSubmit}>
                            {/* Input field for phone or email */}
                            <FormControl className={classes.margin} fullWidth>
                                <InputLabel
                                    htmlFor="otp"
                                    classes={{
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                        error: classes.errored
                                    }}
                                    style={{ color: !this.state.isError && !this.state.init ? 'red' : '' }}
                                >
                                    OTP
                                            </InputLabel>
                                <Input
                                    id="otp"
                                    classes={{
                                        underline: classes.cssUnderline,
                                        // label:classes.inputLabel
                                    }}
                                    value={this.state.otp}
                                    // label="Name"
                                    fullWidth={true}
                                    required={true}
                                    error={!this.state.isError && !this.state.init}
                                    onChange={this.handleChange}
                                    onBlur={this.checkValidity}
                                    name="otp"
                                />
                            </FormControl>
                            {
                                (!this.state.isError && !this.state.init) &&
                                <p style={{ color: 'red', float: 'left' }}>Please enter a valid otp</p>
                            }
                            <div className="submit-button">
                                <Button
                                    variant="contained"
                                    className={classNames(classes.cssRoot)}
                                    fullWidth
                                    disabled={!this.state.isError && !this.state.init}
                                    type="submit"
                                >
                                    Confirm
                                            </Button>
                            </div>
                            <p className="gbui-body-1  light-gb2" style={{ textAlign: 'center', margin: '1rem 0rem' }}>
                                Didn’t receive the code?&nbsp;
                                            <Button disabled={time > 0} ><span
                                    style={{ color: '#ea0b4b', cursor: 'pointer', textTransform: 'capitalize' }}
                                    onClick={this.handleResendPassword}>
                                    Resend
                                            </span></Button>
                            </p>
                            <p className="gbui-body-1  light-gb2" style={{ color: '#ea0b4b', textAlign: 'center', margin: '1rem 0rem' }}>
                                00:{time} Secs
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

OTPVerify.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OTPVerify)
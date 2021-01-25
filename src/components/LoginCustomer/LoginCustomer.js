import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Link } from 'react-router-dom';
import './LoginCustomer.css';
import Card from '@material-ui/core/Card';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import axios from 'axios';
import { connect } from 'react-redux';
import appConstants from '../../constants/appConstants.json'
// import { createBrowserHistory } from "history";
import { withRouter } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'


// const history = createBrowserHistory();
import constants from '../../constants/appConstants.json'

const styles = theme => ({
    snack:{
        marginTop:'6rem'
    },
})

class LoginCustomer extends Component {
    componentWillMount() {
        const vm = this;
        this.props.onCurrentComponent('loginCustomer.json');
        axios.get('/assets/json/loginCustomer.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
                // console.log(error);
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

    getProfileDetails() {

        const token = localStorage.getItem("token")
        const params = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }
        const vm = this;

        axios.get(`${constants.apiRootURL}/secure/myaccount`, params)
            .then(response => {
                console.log(response)
                const status = response.status
                if (status === 200) {
                    this.props.onAuthSuccessUSER(response.data.name)
                    localStorage.setItem("username", response.data.name)
                }
            }).catch(error => {
                // console.log(error.response, 'From 500')
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

    state = {
        openSnack:false,
        password: '',
        loginForm: {
            email_or_phone: {
                value: '',
                validation: {
                    required: true,
                    isEmailOrPhone: true
                },
                valid: false,
                touched: false
            },
            password: {
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            otp: {
                value: '',
                validation: {
                    required: true,
                    length: 6
                },
                valid: false,
                touched: false
            }
        },
        passwordFormIsValid: false,
        otpFormIsValid: false,
        showOTP: false,
        showSnack: false,
        snackStatus: '',
    }

    // Method to check validity
    checkValidity(value, rules) {
        let isValid = true
        if (!rules) {
            return true
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.length) {
            isValid = value.length === 6 && isValid;
        }

        if (rules.isEmailOrPhone) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //eslint-disable-line
            isValid = (re.test(String(value).toLowerCase()) && isValid) || (/^\d{10}$/.test(value) && isValid)
        }

        return isValid;
    }
    handleLoginByOtp = () => {
        if (!this.props.loginByOtp) {
            this.setState({ showOTP: false })
        }
        this.props.onLoginByOtp(!this.props.loginByOtp);

    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    // Handle input change

    inputChangedHandler = (event) => {
        const updatedLoginForm = {
            ...this.state.loginForm
        }

        const updatedFormElement = {
            ...updatedLoginForm[event.target.name]
        }

        updatedFormElement.value = event.target.value
        updatedFormElement.touched = true
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedLoginForm[event.target.name] = updatedFormElement

        let otpFormIsValid = true
        let passwordFormIsValid = true
        for (let inputIdentifier in updatedLoginForm) {
            if (this.props.loginByOtp && inputIdentifier !== "password")
                otpFormIsValid = updatedLoginForm[inputIdentifier].valid && otpFormIsValid
            else if (!this.loginByOtp && inputIdentifier !== "otp")
                passwordFormIsValid = updatedLoginForm[inputIdentifier].valid && passwordFormIsValid
        }
        this.props.loginByOtp ? this.setState(
            {
                loginForm: updatedLoginForm,
                otpFormIsValid: otpFormIsValid
            }
        ) : this.setState(
            {
                loginForm: updatedLoginForm,
                passwordFormIsValid: passwordFormIsValid
            }
        )
    }

    getProfileDetails() {

        const token = localStorage.getItem("token")
        const params = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }
        const vm = this;

        axios.get(`${constants.apiRootURL}/secure/myaccount`, params)
            .then(response => {
                console.log(response)
                const status = response.status
                if (status === 200) {
                    this.props.onAuthSuccessUSER(response.data.name)
                    localStorage.setItem("username", response.data.name)
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




    submitHandlerPassword = (event) => {
        this.props.onAuth('7500931003', 'abhi@123');
        // check if email or phone
        let data = {};
        const vm = this;

        if (/^\d{10}$/.test(this.state.loginForm.email_or_phone.value)) {
            data = {
                mobile: vm.state.loginForm.email_or_phone.value,
                password: vm.state.loginForm.password.value
            }
        } else {
            data = {
                email: vm.state.loginForm.email_or_phone.value,
                password: vm.state.loginForm.password.value
            }
        }
        axios.post(`${appConstants.apiRootURL}/login`, data)
            .then(response => {
                vm.props.onAuthSuccess(response.data)
                localStorage.setItem('token', response.data)

                //Redirect to myAccount
                vm.props.history.push('/dashboard-customer')
                this.getProfileDetails()
            })
            .catch(error => {
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
                    vm.setState({ snackStatus: error.response.data })
                    vm.handleCloseSnack()
                    // this.props.history.push('/500')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
    }
    submitHandlerOTP = () => {
        this.props.onAuth('7500931003', 'abhi@123')
        console.log('verify otp')
        // ....
        const vm = this;
        if (/^\d{10}$/.test(this.state.loginForm.email_or_phone.value)) {
            axios.post(`${appConstants.apiRootURL}/login-with-otp?mobile=${vm.state.loginForm.email_or_phone.value}&otp=${vm.state.loginForm.otp.value}`)
                .then((response) => {
                    this.props.onAuthSuccess(response.data)

                    localStorage.setItem('token', response.data)

                    // Redirect to myaccount route
                    //history.push('/my-account')
                    vm.props.history.push('/my-account')
                    this.getProfileDetails()
                })
                .catch((error) => {
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
                        vm.setState({ snackStatus: error.response.data })
                        vm.handleCloseSnack()
                        this.props.history.push('/500')
                    }
                    if (error.response.status === 500) {
                        this.props.history.push('/500')
                    }
                })
        } else {
            axios.post(`${appConstants.apiRootURL}/login-with-otp?email=${vm.state.loginForm.email_or_phone.value}&otp=${vm.state.loginForm.otp.value}`)
                .then((response) => {
                    this.props.onAuthSuccess(response.data)
                    localStorage.setItem('token', response.data)

                    // Redirect to myaccount route
                    //history.push('/my-account')
                    vm.props.history.push('/my-account')
                })
                .catch((error) => {
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
                        vm.setState({ snackStatus: error.response.data })
                        vm.handleCloseSnack()
                        this.props.history.push('/500')
                    }
                    if (error.response.status === 500) {
                        this.props.history.push('/500')
                    }
                })
        }
    }

    generateOTP = () => {
        //....
        const vm = this;

        if (/^\d{10}$/.test(this.state.loginForm.email_or_phone.value)) {
            axios.post(`${appConstants.apiRootURL}/otp?mobile=${vm.state.loginForm.email_or_phone.value}`)
                .then((response) => {
                    console.log(response.data)
                    vm.setState({ showOTP: true })
                })
                .catch((error) => {
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
                    vm.setState({ snackStatus: error.response.data })
                    vm.handleCloseSnack()
                    this.props.history.push('/500')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
        } else {
            axios.post(`${appConstants.apiRootURL}/otp?email=${vm.state.loginForm.email_or_phone.value}`)
                .then((response) => {
                    console.log(response.data)
                    vm.setState({ showOTP: true })
                })
                .catch((error) => {
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
                    vm.setState({ snackStatus: error.response.data })
                    vm.handleCloseSnack()
                    this.props.history.push('/500')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
        }
    }

    // Handle Snack Bar
    handleCloseSnack = () => {
        this.setState({ showSnack: !this.state.showSnack })
    }
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider>
                <div className='Login'>
                    <Container fluid={true}>
                        <Card>
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
                                <Col md={7} className="mui--hidden-xs mui--hidden-sm">
                                    <div className='firstCard'>
                                        <Row>
                                            <Col md={12}>
                                                <div className='welcome'>
                                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerWelcomeCardText1 : ''}
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <div className='welcome'>
                                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerWelcomeCardText2 : ''}
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <img src="assets/login.svg" className='loginPic' alt='Login' />
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col md={5} xs={12}>

                                    <Col md={12}>
                                        <div className='title'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerHeadingText : ''}</div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='account'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerPLeaseLoginToAccountText : ''}</div>
                                    </Col>
                                    {!this.props.loginByOtp && <div><Col md={12} sm={12} xs={12}>
                                        <FormControl fullWidth={true} className='textField'>
                                            <InputLabel
                                                htmlFor="adornment-password"
                                                error={!this.state.loginForm.email_or_phone.valid && this.state.loginForm.email_or_phone.touched}>
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerInputField1LabelPhoneNumber : ''}
                                            </InputLabel>
                                            <Input
                                                type="text"
                                                name="email_or_phone"
                                                value={this.state.loginForm.email_or_phone.value}
                                                onChange={this.inputChangedHandler}
                                                error={!this.state.loginForm.email_or_phone.valid && this.state.loginForm.email_or_phone.touched} />
                                        </FormControl>
                                        {(!this.state.loginForm.email_or_phone.valid && this.state.loginForm.email_or_phone.touched) && <p style={{ color: 'red', float: 'left' }}>Please eneter a valid email or phone</p>}
                                    </Col>
                                        <Col md={12} sm={12} xs={12}>
                                            {this.props.loginByOtp ?
                                                <div><FormControl fullWidth={true} className='textField'>
                                                    <InputLabel
                                                        htmlFor="adornment-password"
                                                        error={!this.state.loginForm.otp.valid && this.state.loginForm.otp.touched}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerInputField2LabelOtp : ''}</InputLabel>
                                                    <Input
                                                        id="adornment-password"
                                                        type={this.state.showPassword ? 'text' : 'password'}
                                                        value={this.state.loginForm.otp.value}
                                                        onChange={this.inputChangedHandler}
                                                        name="otp"
                                                        error={!this.state.loginForm.otp.valid && this.state.loginForm.otp.touched}
                                                    />
                                                </FormControl>
                                                    {(!this.state.loginForm.otp.valid && this.state.loginForm.otp.touched) && <p>Enter a valid otp</p>}</div> :
                                                <div><FormControl fullWidth={true} className='textField'>
                                                    <InputLabel
                                                        htmlFor="adornment-password"
                                                        error={!this.state.loginForm.password.valid && this.state.loginForm.password.touched}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerInputField2LabelPassword : ''}</InputLabel>
                                                    <Input
                                                        id="adornment-password"
                                                        type={this.state.showPassword ? 'text' : 'password'}
                                                        name="password"
                                                        value={this.state.loginForm.password.value}
                                                        onChange={this.inputChangedHandler}
                                                        error={!this.state.loginForm.password.valid && this.state.loginForm.password.touched}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="Toggle password visibility"
                                                                    onClick={this.handleClickShowPassword}
                                                                >
                                                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                                    {(!this.state.loginForm.password.valid && this.state.loginForm.password.touched) && <p style={{ color: 'red', float: 'left' }}>Password is required</p>}</div>}
                                        </Col>
                                        <Col md={7} sm={6} xs={6}>
                                            <div className='forgot'>
                                                <Link to="/forgot-password" style={{ color: '#333333' }}>
                                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerForgotPasswordText : ''}
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col md={5} sm={6} xs={6}>
                                            <div className='otp' onClick={this.handleLoginByOtp}>
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerLoginByOtpText : ''}
                                            </div>
                                        </Col>
                                        <Col md={12} sm={12}>
                                            {!this.props.loginByOtp ? <ButtonLightSuccess
                                                Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerLoginText : ''} fullWarningPink={true}
                                                onClick={this.submitHandlerPassword} disabled={!this.state.passwordFormIsValid} /> :
                                                <ButtonLightSuccess
                                                    Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerLoginText : ''} fullWarningPink={true}
                                                    onClick={this.submitHandlerOTP} disabled={!this.state.otpFormIsValid} />
                                            }
                                            <div className='terms'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerByLoggingInText : ''}
 
                                                <Link to="/TnC" style={{ color: '#333333' }}><span className='termSpan'>
                                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerTnC : ''}</span></Link>  and &nbsp;
                                                     <Link to="/privacy-policy" style={{ color: '#333333' }}><span className='termSpan'>
                                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerPrivacyPolicyText : ''}</span></Link>
                                            </div>
                                        </Col></div>}

                                    {/* Here for OTP */}
                                    {this.props.loginByOtp && <div><Col md={12} sm={12} xs={12}>
                                        {true && <div><FormControl fullWidth={true} className='textField'>
                                            <InputLabel
                                                htmlFor="adornment-password"
                                                error={!this.state.loginForm.email_or_phone.valid && this.state.loginForm.email_or_phone.touched}>
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerInputField1LabelPhoneNumber : ''}
                                            </InputLabel>
                                            <Input
                                                type="text"
                                                name="email_or_phone"
                                                value={this.state.loginForm.email_or_phone.value}
                                                onChange={this.inputChangedHandler}
                                                error={!this.state.loginForm.email_or_phone.valid && this.state.loginForm.email_or_phone.touched} />
                                        </FormControl>
                                            {(!this.state.loginForm.email_or_phone.valid && this.state.loginForm.email_or_phone.touched) && <p style={{ color: 'red', float: 'left' }}>Please eneter a valid email or phone</p>}</div>}
                                    </Col>
                                        <Col md={12} sm={12} xs={12}>
                                            {this.state.showOTP && <div><FormControl fullWidth={true} className='textField'>
                                                <InputLabel
                                                    htmlFor="adornment-password"
                                                    error={!this.state.loginForm.otp.valid && this.state.loginForm.otp.touched}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerInputField2LabelOtp : ''}</InputLabel>
                                                <Input
                                                    id="adornment-password"
                                                    type={this.state.showPassword ? 'text' : 'password'}
                                                    value={this.state.loginForm.otp.value}
                                                    onChange={this.inputChangedHandler}
                                                    name="otp"
                                                    error={!this.state.loginForm.otp.valid && this.state.loginForm.otp.touched}
                                                />
                                            </FormControl>
                                                {(!this.state.loginForm.otp.valid && this.state.loginForm.otp.touched) && <p>Enter a valid otp</p>}</div>}
                                        </Col>
                                        <Col md={7} sm={6} xs={6}>
                                            <div className='forgot'>
                                                <Link to="/forgot-password" style={{ color: '#333333' }}>
                                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerForgotPasswordText : ''}
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col md={5} sm={6} xs={6}>
                                            {!this.props.loginByOtp ? <div className='otp' onClick={this.handleLoginByOtp}>
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerLoginByOtpText : ''}
                                            </div> : <div className='otp' onClick={this.handleLoginByOtp}>
                                                    Login by Password ?
                                            </div>}
                                        </Col>
                                        {/* <Col md={12} sm={12}>
                                            {!this.state.showOTP ? <ButtonLightSuccess
                                                Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerLoginText : ''} fullWidth={true}
                                                onClick={this.generateOTP} disabled={!this.state.loginForm.email_or_phone.valid} /> :
                                                <ButtonLightSuccess
                                                    Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerLoginText : ''} fullWidth={true}
                                                    onClick={this.submitHandlerOTP} disabled={!this.state.otpFormIsValid} />
                                            }
                                            <div className='terms'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerByLoggingInText : ''}

                                                <Link to="/TnC" style={{ color: '#333333' }}><span className='termSpan'>
                                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerTnCAndPrivacyPolicyText : ''}</span></Link>
                                            </div>
                                        </Col> */}
                                        <Col md={12} sm={12}>
                                            {!this.state.showOTP ? <ButtonLightSuccess
                                                Text={'Generate OTP'} fullWarningPink={true}
                                                onClick={this.generateOTP} disabled={!this.state.loginForm.email_or_phone.valid} /> :
                                                <ButtonLightSuccess
                                                    Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerLoginText : ''} fullWarningPink={true}
                                                    onClick={this.submitHandlerOTP} disabled={!this.state.otpFormIsValid} />
                                            }
                                            <div className='terms'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerByLoggingInText : ''}
 
                                             <Link to="/TnC" style={{ color: '#333333' }}><span className='termSpan'>
                                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerTnC : ''}</span></Link> 
                                                    <Link to="/privacy-policy" style={{ color: '#333333' }}><span className='termSpan'>
                                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginCustomerPrivacyPolicyText : ''}</span></Link>
                                            </div>
                                        </Col>
                                    </div>}

                                </Col>
                            </Row>
                        </Card>
                    </Container>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.state.showSnack}
                        autoHideDuration={6000}
                        onClose={this.handleCloseSnack}
                        style={{ marginBlockStart: '3rem' }}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.snackStatus}</span>}
                        action={[
                            // <Button key="undo" color="secondary" size="small" onClick={this.handleCloseSnack}>
                            //     UNDO
                            // </Button>,
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className=""
                                onClick={this.handleCloseSnack}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}

LoginCustomer.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    CurrentLanguage: state.language.current_language,
    FetchedLanguage: state.language.lang_data,
    loginByOtp: state.loginCustomer.login_by_otp
});

const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
    onLoginByOtp: (value) => dispatch({ type: 'LOGIN_BY_OTP', value }),
    onAuth: (email, password) => dispatch({ type: 'AUTH_START', email, password }),
    onAuthFail: () => dispatch({ type: 'AUTH_FAIL' }),
    onAuthSuccess: (data) => dispatch({ type: 'AUTH_SUCCESS', data }),
    onAuthSuccessUSER: (username) => dispatch({ type: 'SET_USER', username })
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(LoginCustomer)));
import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import './MyAccount.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess';
import axios from 'axios';
import { connect } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment';
import Drawer from '../Shared/Drawer/index';
import MyAccountChangePopup from './MyAccountChangePopup/index';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import constants from '../../constants/appConstants.json'
import Rightcard from '../Help/feedbackRatings/index'


const styles = theme => ({
    snack:{
        marginTop:'6rem'
    },
})
class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSnack:false,
            openSuccessSnack:false,
           
            Edit: false,
            Income: '',
            profileData: {},
            changePassword:{
                currentPassword: {
                    value: '',
                    rules: {
                        isRequired: true
                    },
                    isValid: false,
                    touched: false
                },
                newPassword1: {
                    value: '',
                    rules: {
                        isRequired: true,
                        isPassword: true
                    },
                    isValid: false,
                    touched: false
                },
                newPassword2: {
                    value: '',
                    rules: {
                        isRequired: true,
                        isPassword: true
                    },
                    isValid: false,
                    touched: false
                },
            },
            changePasswordInvalid:false,
            profileForm: {
                Name: {
                    value: '',
                    rules: {
                        isRequired: true
                    },
                    isValid: true
                },
                DateOfBirth: {
                    value: '',
                    rules: {
                        isRequired: true,
                        maxDate:true
                    },
                    isValid: true
                },
                email: {
                    value: '',
                    rules: {
                        isRequired: true,
                        isEmail: true
                    },
                    isValid: true
                },
                mobile: {
                    value: '',
                    rules: {
                        isRequired: true,
                        isMobile: true
                    },
                    isValid: true
                },
                Address: {
                    value: '',
                    rules: {
                        isRequired: true
                    },
                    isValid: true
                },
                CityPincode: {
                    value: '',
                    rules: {
                        isRequired: true
                    },
                    isValid: true
                },
                state: {
                    value: '',
                    rules: {
                        isRequired: true
                    },
                    isValid: true
                },
                maritalStatus: {
                    value: '',
                    rules: {
                        isRequired: true
                    },
                    isValid: true
                },
                Income: {
                    value: '',
                    rules: {
                        isRequired: true,
                        minRange: 100000,
                        maxRange: 100000000,
                        minLength: 6,
                        maxLength: 9
                    },
                    isValid: true,
                    message: 'Please enter valid income amount/year'
                },
                totalPolicy :{
                    value:'',
                    rules: {
                        isRequired: true
                    },
                    isValid: true
                },
                duePolicy :{
                    value:'',
                    rules: {
                        isRequired: true
                    },
                    isValid: true
                }
            },
            formIsValid: false,
            showSnack: false,
            otpSource: '',
            obj: {},
            otp: '',
            enterOTP: false,
            otpError: false,
            otpDisabled: true,
            otpTouched: false,
            updateMessage: ''
        }
    }

    handleChangeMyAccountDetails = () => {
        const { profileForm } = this.state
        const profileData = this.state.profileData
        const obj = {}
        if(profileData.mobile !== profileForm.mobile.value) {
            obj.mobile = profileForm.mobile.value
        }
        if(profileData.email !== profileForm.email.value) {
            obj.email = profileForm.email.value
        }
        // const obj = {
        //     // address: profileForm.Address.value,
        //     // income: profileForm.Income.value,
        //     // maritalStatus: profileForm.maritalStatus.value,
        //     mobile: profileForm.mobile.value,
        //     // pincodeCity: profileForm.CityPincode.value,
        //     // state: profileForm.state.value,
        //     email: profileForm.email.value,
        //     // mobile: profileForm.mobile.value
        // }
        if(obj.email || obj.mobile) {
            this.setState({obj})
            this.updateAccount(obj)
        } else {
            this.setState({Edit: false})
        }
        
    }

    updateAccount(obj) {
        const vm = this
        const token = localStorage.getItem("token")
        const params = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }
        axios.post(`${constants.apiRootURL}/secure/update-myaccount`, obj, params)
            .then(response => {
                console.log(response)
                if(response.status === 202) {
                    // this.verifyOtp()
                    this.setState({enterOTP: true})
                } else {
                    this.getProfileDetails()
                    this.setState({showSnack: !this.state.showSnack, snackStatus: response.data, Edit: false})
                }
                
            }).catch(error => {
                if (error.response.status === 400) {
                    console.log(error)
                    this.setState({
                        openSnack:true,
                        updateMessage: error.response.data
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
    // Verify OTP
    verifyOtp = () =>  {
        this.setState({otpDisabled: true})
        const vm =this;
        const {obj} = this.state
        const token = localStorage.getItem("token")
        const params = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }

        axios.post(`${constants.apiRootURL}/secure/verify-otp/${this.state.otp}`, obj, params)
            .then(response => {
                // alert('Successfully updated')
                // this.props.onMyAccountChangePopupShow()
                this.getProfileDetails()
                
                console.log(response)
                this.setState({showSnack: !this.state.showSnack, snackStatus: response.data, Edit: false, enterOTP: false,otpDisabled: false})
            }).catch(error => {
                if (error.response.status === 400) {
                    this.setState({
                        openSnack:true,
                        otpDisabled: false
                    })
                }
                if (error.response.status === 401) {
                    localStorage.clear();
                    this.props.onAuthFail()
                    this.props.history.push('/login-customer')
                }
                if (error.response.status === 403) {
                    // this.props.history.push('/500')

                    this.setState({otpDisabled: false, otpError: false})
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
    }
    handleClose = () => {
        this.setState({enterOTP: false})
    }

    handleCloseSnack = () => {
        this.setState({showSnack : !this.state.showSnack})
    }

    handleClickChangePassword = () => {
        this.props.onChangePasswordShow();
    }

    handleClickMyAccount = () => {
        this.props.onChangePasswordHide();
    }

    handleClickEdit = () => {
        this.setState({
            Edit: true
        })
    }

    handleChange = prop => event => {
        const profileForm = this.state.profileForm
        const value = event.target.value
        profileForm[prop].value = value
        let formIsValid = true;
        profileForm[prop].isValid = this.checkValidity(value, profileForm[prop].rules)
        for (let name in profileForm) {
            formIsValid = profileForm[name].isValid && formIsValid
        }
        this.setState({ profileForm,formIsValid })
    };
    handleChangeOTP = event => {
        const value = event.target.value;
        let isValid = true;
        isValid = isValid && value.trim() !== ''
        isValid = isValid && value.length === 6
        isValid = isValid && !isNaN(value)
        if(isValid) {
            this.setState({otpDisabled: false})
        }
        this.setState({otp: value, otpError: isValid, otpTouched: true})
    }


    handleChangePassword = name => event =>{
        const updatedChangePassword = {
          ...this.state.changePassword
        }

        const updatedChangePasswordElement = {
            ...updatedChangePassword[name]
        }
        
        updatedChangePasswordElement.value = event.target.value
        updatedChangePasswordElement.isValid = this.checkValidity(updatedChangePasswordElement.value, updatedChangePasswordElement.rules)
        updatedChangePasswordElement.touched = true
        updatedChangePassword[name] = updatedChangePasswordElement
        let formIsValid = true;
        for (let name in updatedChangePassword) {
            formIsValid = updatedChangePassword[name].isValid && formIsValid
            console.log(name,updatedChangePassword[name].isValid,formIsValid,'formIsValid')
        }
        if(event.target.value.length <= 16) {
            this.setState({ changePassword: updatedChangePassword, changePasswordInvalid: formIsValid });
        }
    };

    handleResetPassword = () =>{
        const oldPassword = this.state.changePassword.currentPassword.value
        const newPassword = this.state.changePassword.newPassword1.value
        const token = localStorage.getItem("token")
        const params = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }
        const obj = {}

        axios.post(`${constants.apiRootURL}/secure/change-password/${oldPassword}/${newPassword}`,obj, params)
            .then(response => { 
                this.setState({
                    openSuccessSnack:true
                })
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


    getInsurerAge = (date) =>{
        let b =  moment(date,"YYYY-MM-DD");
        let a =  moment();

        let years = a.diff(b,'year');
        b.add(years,'years')

        // let months = a.diff(b,'months');
        // b.add(months,'months')

        // let days = a.diff(b,'days');
        // b.add(days,'days')
        let  ageText = years
        // ${months} months,${days} days`
            return ageText
    }
    
    checkValidity(value, rules) {
        let isValid = true;

        if (rules.isRequired) {
            isValid = value.trim() !== '' && isValid
        }

        if(rules.isEmail) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //eslint-disable-line
            isValid = (re.test(String(value).toLowerCase()) && isValid)
        }
        if (rules.isMobile) {
            isValid = (/^\d{10}$/.test(value) && isValid)
        }
        if(rules.maxDate){
           isValid=value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/)  && isValid
        }
        if(rules.isPassword) {
            const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            isValid = regex.test(value) && isValid
        }
        if(rules.minRange) {
            isValid = Number(value) >= rules.minRange && isValid
        } if(rules.maxRange) {
            isValid = Number(value) <= rules.maxRange && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid
    }

    componentWillMount() {
        const vm = this;
        this.props.onCurrentComponent('MyAccount.json');
        axios.get('/assets/json/MyAccount.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
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
        this.props.onChangePasswordHide();

        // Here call get profile details
        this.getProfileDetails()
    }

    // Get profile details
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
                    vm.initProfileForm(response.data)
                } else if (status === 500) {

                    vm.props.history.push('/500')
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
    // Set values
    initProfileForm(data) {
        const profileForm = this.state.profileForm
        profileForm.Name.value = data.name
        profileForm.DateOfBirth.value = data.dateOfBirth
        profileForm.email.value = data.email
        profileForm.mobile.value = data.mobile
        profileForm.Income.value = data.income
        profileForm.maritalStatus.value = data.maritalStatus
        profileForm.state.value = data.state
        profileForm.CityPincode.value = data.pincodeCity
        profileForm.Address.value = data.address
        profileForm.totalPolicy.value = data.totalPolicy
        profileForm.duePolicy.value = data.duePolicy
       
        this.setState({ profileForm, profileData: data })
    }
    handleSubmitProfile = (e) => {
        e.preventDefault()
    }
    handleUploadImage = () =>{
       document.getElementById('uploadImage').click();
    }
    handleUpdateSnack = () => {
        this.setState({openSnack: false})
    }
    render() {
        const { classes } = this.props;
        const { Name, DateOfBirth, email, mobile, Address, CityPincode, state, maritalStatus, Income, totalPolicy, duePolicy } = this.state.profileForm
        return (
            <MuiThemeProvider>
                <div className='MyAccount'>
                    <Container fluid={true}>
                        <Row>
                            <Snackbar
                                className={classes.snack}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                                }}
                                autoHideDuration={3000}
                                open={this.state.openSnack}
                                ContentProps={{
                                'aria-describedby': 'message-id',
                                }}
                                onClose= {this.handleUpdateSnack}
                                message={<span id="message-id">{this.state.updateMessage}</span>}
                            />
                             <Snackbar
                                autoHideDuration={6000}
                                className={classes.snack}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                                }}
                                open={this.state.openSuccessSnack}
                                ContentProps={{
                                'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">Password Updated Successfully!</span>}
                            />
                            <Col md={2}>
                                <div className='mui--hidden-xs mui--hidden-sm'><Drawer authenticate={true} variant="permanent" totalPolicy = {totalPolicy.value} duePolicy = {duePolicy.value}  /></div>
                            </Col>
                            <Col md={10} className='rightpanel'>
                            <Col md={8} xs={12} className='MyAccountContainer'>
                                <div className='MyAccountChangePasswordHeader'>
                                    <Row>
                                        <Col md={3} xs={5}>
                                            {this.props.changePassword ?
                                                <div onClick={this.handleClickMyAccount} className='MyAccount'>
                                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.ChangePasswordMyAccountHeading : ''}
                                                </div> :
                                                <div onClick={this.handleClickMyAccount} className='MyAccountText'>
                                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.MyAccountMyAccountHeading : ''}
                                                </div>
                                            }
                                        </Col>
                                        <Col md={6} xs={7}>
                                            {this.props.changePassword ?
                                                <div onClick={this.handleClickChangePassword} className='ChangePassword'>
                                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.ChangePasswordChangePasswordHeading : ''}
                                                </div> :
                                                <div onClick={this.handleClickChangePassword} className='ChangePasswordContainer'>
                                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.MyAccountChangePasswordHeading : ''}
                                                </div>}
                                        </Col>
                                        <Col md={12} xs={12}>   
                                            {/* <Col md={2} xs={3} className='left-column'>
                                                <div className='imageUser'>
                                                <Avatar alt="Dada Saheb" src="/assets/HomePage/DS.jpg" style={{ width: '61px', height: '61px' }} />
                                                </div>
                                            </Col>
                                            <Col md={3} xs={6}  className='right-column'>
                                              <div className='upload-btn'>
                                                   <ButtonLightSuccess Text='Upload Picture' fullPinkContent={true} onClick={this.handleUploadImage}/>
                                                   <input id='uploadImage' style={{display:'none'}} type="file" name="pic" accept="image/*"  />
                                                    <div className='max-size'>JPG, GIF or PNG. Max size of 800K</div>
                                              </div>
                                            </Col> */}
                                        </Col>
                                    </Row>
                                </div>
                                {this.props.changePassword ?
                                    <div className='changePasswordPanel'>
                                        <Row>
                                            <Col md={6}>
                                                <div className='LeftFieldContainer'>
                                                    <FormControl fullWidth>
                                                        <InputLabel>{this.props.FetchedLanguage ? this.props.FetchedLanguage.CurrentPasswordLabel : ''}</InputLabel>
                                                        <Input type='password'
                                                            value={this.state.changePassword.currentPassword.value}
                                                            onChange={this.handleChangePassword('currentPassword')}
                                                            error={!this.state.changePassword.currentPassword.isValid
                                                                && this.state.changePassword.currentPassword.touched}
                                                        />
                                                    </FormControl>
                                                    
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <div className='LeftFieldContainer'>
                                                    <FormControl fullWidth>
                                                        <InputLabel htmlFor="component-simple">{this.props.FetchedLanguage ? this.props.FetchedLanguage.NewPasswordLabel : ''}</InputLabel>
                                                        <Input type='password'
                                                            aria-haspopup="true"
                                                            id="standard-password-input"
                                                            value={this.state.changePassword.newPassword1.value}
                                                            onChange={this.handleChangePassword('newPassword1')}
                                                            error={!this.state.changePassword.newPassword1.isValid
                                                                && this.state.changePassword.newPassword1.touched}
                                                        />
                                                    </FormControl>
                                                    {!this.state.changePassword.newPassword1.isValid
                                                                && this.state.changePassword.newPassword1.touched && <p style={{color: 'red'}}>
                                                                Please Enter a valid password with following:<br/>
                                                                <ol>
                                                                    <li>Atleast 1 capital letter</li>
                                                                    <li>Atleast 1 special character</li>
                                                                    <li>Atleas 1 number</li>
                                                                    <li>Min. 8 characters and Max. 16 characters</li>
                                                                </ol>
                                                            </p>}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <div className='LeftFieldContainer'>
                                                    <FormControl fullWidth>
                                                        <InputLabel htmlFor="component-simple">{this.props.FetchedLanguage ? this.props.FetchedLanguage.confirmNewPasswordLabel : ''}</InputLabel>
                                                        <Input type='password'
                                                            aria-haspopup="true"
                                                            id="standard-password-input"
                                                            value={this.state.changePassword.newPassword2.value}
                                                            onChange={this.handleChangePassword('newPassword2')}
                                                            error={!this.state.changePassword.newPassword2.isValid
                                                                && this.state.changePassword.newPassword2.touched}
                                                        />
                                                    </FormControl>
                                                    {!this.state.changePassword.newPassword2.isValid
                                                                && this.state.changePassword.newPassword2.touched && <p style={{color: 'red'}}>
                                                                Please Enter a valid password with following:<br/>
                                                                <ol>
                                                                    <li>Atleast 1 capital letter</li>
                                                                    <li>Atleast 1 special character</li>
                                                                    <li>Atleas 1 number</li>
                                                                    <li>Min. 8 characters and Max. 16 characters</li>
                                                                </ol>
                                                            </p>}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6} xs={12}>
                                                {this.props.MyAccountChangePopup &&
                                                    <MyAccountChangePopup />}
                                                <div className='SavePasswordButton'>
                                                    <ButtonLightSuccess onClick={this.handleResetPassword}   disabled={!this.state.changePasswordInvalid}
                                                    Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.ChangePasswordButtonTextSave : ''} 
                                                     midWarningPink={true} />
                                                </div>
                                            </Col>
                                            <Col className='mui--visible-xs-block' xs={12}>
                                                <div className='ChatDiv'>
                                                    <i class="material-icons" style={{ color: 'white', fontSize: '2rem', marginLeft: '0px', marginTop: '13px' }}>
                                                        chat_bubble
                                                    </i>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div> :
                                    <div>
                                        <form onSubmit={this.handleSubmitProfile}>
                                            <Col md={6}>
                                                <div className='LeftFieldContainer'>
                                                    <FormControl fullWidth>
                                                        <InputLabel
                                                            htmlFor="component-simple"
                                                            style={{ color: `${Name.isValid ? '' : 'red'}` }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.MyAccountTextFieldLabelName : ''}</InputLabel>
                                                        <Input
                                                            aria-haspopup="true"
                                                            id="component-simple"
                                                            value={Name.value}
                                                            error={!Name.isValid}
                                                        // onChange={this.state.Edit && this.handleChange('Name')}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='RightFieldContainer'>
                                                    <FormControl fullWidth>
                                                        <InputLabel
                                                            htmlFor="component-simple"
                                                            style={{ color: `${DateOfBirth.isValid ? '' : 'red'}` }}
                                                        >{this.props.FetchedLanguage ? this.props.FetchedLanguage.MyAccountTextFieldLabelDateofBirth : ''}</InputLabel>
                                                        <Input
                                                            aria-haspopup="true"
                                                            id="component-simple"
                                                            value={DateOfBirth.value}
                                                            onChange={this.state.Edit && this.handleChange('DateOfBirth')}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            // onChange={this.state.Edit && this.handleChange('DateOfBirth')}
                                                            error={!DateOfBirth.isValid}
                                                            disabled
                                                        />
                                                    </FormControl>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='LeftFieldContainer'>
                                                    <FormControl fullWidth>
                                                        <InputLabel
                                                            htmlFor="component-simple"
                                                            style={{ color: `${email.isValid ? '' : 'red'}` }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.MyAccountTextFieldLabelEmailId : ''}</InputLabel>
                                                        <Input
                                                            aria-haspopup="true"
                                                            id="component-simple"
                                                            value={email.value}
                                                            onChange={this.state.Edit && this.handleChange('email')}
                                                            error={!email.isValid}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='RightFieldContainer'>
                                                    <FormControl fullWidth>
                                                        <InputLabel
                                                            htmlFor="component-simple"
                                                            style={{ color: `${mobile.isValid ? '' : 'red'}` }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.MyAccountTextFieldLabelMobileNumber : ''}</InputLabel>
                                                        <Input
                                                            aria-haspopup="true"
                                                            id="component-simple"
                                                            value={mobile.value}
                                                            inputProps={{maxLength:10}}
                                                            onChange={this.state.Edit && this.handleChange('mobile')}
                                                            error={!mobile.isValid}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </Col>
                                            <Col md={7}>
                                                <div className='LeftFieldContainer'>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            id="outlined-name"
                                                            label="Communication Address"
                                                            margin="normal"
                                                            variant="outlined"
                                                            multiline
                                                            rows="4"
                                                            value={Address.value}
                                                            onChange={this.state.Edit && this.handleChange('Address')}
                                                            error={!Address.isValid}
                                                            disabled
                                                        />
                                                    </FormControl>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='LeftFieldContainer'>
                                                    <FormControl fullWidth>
                                                        <InputLabel
                                                            htmlFor="component-simple"
                                                            style={{ color: `${CityPincode.isValid ? '' : 'red'}` }}>Pincode and City</InputLabel>
                                                        <Input
                                                            aria-haspopup="true"
                                                            id="component-simple"
                                                            value={CityPincode.value}
                                                            endAdornment={this.state.Edit && <InputAdornment position="end"><img src='assets/MyAccountEdit/location.svg' alt='location'></img></InputAdornment>}
                                                            onChange={this.state.Edit && this.handleChange('CityPincode')}
                                                            error={!CityPincode.isValid}
                                                            disabled
                                                        />
                                                    </FormControl>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='RightFieldContainer'>
                                                    {true &&
                                                        <FormControl fullWidth>
                                                            <InputLabel htmlFor="component-simple">{this.props.FetchedLanguage ? this.props.FetchedLanguage.MyAccountTextFieldLabelState : ''}</InputLabel>
                                                            <Input
                                                                aria-haspopup="true"
                                                                id="component-simple"
                                                                value={state.value}
                                                                disabled
                                                            />
                                                        </FormControl>}
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='LeftFieldContainer'>
                                                    <FormControl fullWidth>
                                                        <InputLabel
                                                            htmlFor="component-simple"
                                                            style={{ color: `${maritalStatus.isValid ? '' : 'red'}` }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.MyAccountTextFieldLabelMaritalStatus : ''}</InputLabel>
                                                        <Input
                                                            aria-haspopup="true"
                                                            id="component-simple"
                                                            value={maritalStatus.value}
                                                            onChange={this.state.Edit && this.handleChange('maritalStatus')}
                                                            error={!maritalStatus.isValid}
                                                            disabled
                                                        />
                                                    </FormControl>
                                                </div>
                                            </Col>
                                            {/* <Col md={6}>
                                                <div className='RightFieldContainer'>
                                                <FormControl fullWidth>
                                                        <InputLabel
                                                            htmlFor="Income"
                                                            style={{ color: `${Income.isValid ? '' : 'red'}` }}>Income</InputLabel>
                                                        <Input
                                                            aria-haspopup="true"
                                                            id="Income"
                                                            value={Income.value}
                                                            onChange={this.state.Edit && this.handleChange('Income')}
                                                            error={!Income.isValid}
                                                        />
                                                    </FormControl>
                                                    {!Income.isValid && <p style={{color: 'red', textAlign: 'left'}}>{Income.message}</p>}
                                                </div>
                                            </Col> */}
                                        </form>
                                        {this.state.Edit ?
                                            <div className="button_account_row">
                                                <Col md={6} xs={6}>
                                                    <div className='CancelButton'>
                                                        <ButtonLightSuccess onClick={() => {this.initProfileForm(this.state.profileData);this.setState({Edit: false});}} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.MyAccountEditButtonTextCancel : ''} midPinkContent={true} />
                                                    </div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    {this.props.MyAccountChangePopup &&
                                                        <MyAccountChangePopup
                                                            otpSource={this.state.otpSource}
                                                            verifyOtp={(otp) => {this.verifyOtp(otp)}}/>}
                                                    <div className='ButtonSave'>
                                                        <ButtonLightSuccess
                                                        disabled={!this.state.formIsValid}
                                                            onClick={this.handleChangeMyAccountDetails}
                                                            Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.MyAccountEditButtonTextSave : ''}
                                                            midWarningPink={true}
                                                        />
                                                    </div>
                                                </Col></div> :
                                            <Col md={12}>
                                                <div className='EditDetailButton'>
                                                    <ButtonLightSuccess  Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.MyAccountButtonTextEdit : ''} onClick={this.handleClickEdit} midWarningPink={true} />
                                                </div>
                                            </Col>}

                                        <Col className='mui--visible-xs-block' xs={12}>
                                            <div className='ChatDiv'>
                                                <i class="material-icons" style={{ color: 'white', fontSize: '2rem', marginTop: '13px', marginLeft: '0px' }}>
                                                    chat_bubble
                                                </i>
                                            </div>
                                        </Col>
                                    </div>}
                            </Col>
                            <Col md={4} className='rightcard'>
                                    <Rightcard />
                                </Col>
                            </Col>
                            {/* <Col md={1} className='mui--hidden-xs'>
                                <div className='ChatDiv'>
                                    <i class="material-icons" style={{ color: 'white', fontSize: '2rem', marginTop: '13px' }}>
                                        chat_bubble
                                        </i>
                                </div>
                            </Col> */}
                        </Row>
                    </Container>
                    <Dialog
                      open={this.state.enterOTP}
                      onClose={this.handleClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">Verify OTP</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Please Enter the OTP
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="otp-my-account"
                          label="OTP"
                          type="text"
                          name="otp"
                          error={!this.state.otpError && this.state.otpTouched}
                          fullWidth
                          onChange={this.handleChangeOTP}
                        />
                        {(!this.state.otpError && this.state.otpTouched) && <p style={{color: 'red'}}>Please enter valid otp</p>}
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={this.verifyOtp} disabled={!this.state.otpError || this.state.otpDisabled} color="primary">
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.state.showSnack}
                        autoHideDuration={6000}
                        onClose={this.handleCloseSnack}
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
            </MuiThemeProvider >
        )
    }
}


MyAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    CurrentLanguage: state.language.current_language,
    FetchedLanguage: state.language.lang_data,
    changePassword: state.MyAccount.change_password_open,
    MyAccountChangePopup: state.MyAccount.my_account_change_popup
});

const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
    onChangePasswordShow: () => dispatch({ type: 'CHANGE_PASSWORD_SHOW' }),
    onChangePasswordHide: () => dispatch({ type: 'CHANGE_PASSWORD_HIDE' }),
    onMyAccountChangePopupShow: () => dispatch({ type: 'MY_ACCOUNT_CHANGE_POPUP_SHOW' }),
    onAuthFail: () => dispatch({ type: 'AUTH_FAIL' }),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyAccount));
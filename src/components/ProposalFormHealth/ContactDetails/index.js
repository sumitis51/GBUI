import React from 'react'
import Panel from 'muicss/lib/react/panel'
import { connect } from 'react-redux'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import axios from 'axios'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { Link } from 'react-router-dom'
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import './vehicle.css'
import constants from '../../../constants/appConstants.json';
import MenuItem from '@material-ui/core/MenuItem';
// import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';



const styles = theme => ({
    snack: {
        marginTop: '6rem'
    },
    root1: {
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
    },
    buttonProgress: {
        color: '#ffffff',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    snackbar: {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        marginBottom: 0
    },
    group: {
        margin: 0,
    },
    root: {
        color: 'black',
        '&$checked': {
            color: '#ea0b4b !important',
        },
    },
    checked: {},
    label: {
        color: '#000000',
        fontFamily: 'Source Sans Pro',
        fontSize: '12px',
        margin: '0px'
    },
    label2: {
        color: '#aaaaaa',
        fontFamily: 'Source Sans Pro',
        fontSize: '15px',
        margin: '0px'
    },
    focused_label: {
        color: '#ea0b4b !important'
    },
    text_field: {
        color: 'black',
        display: 'block',
        marginTop: '0px',
        marginLeft: '8px'
    },
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '12px 36px',
        marginTop: '1rem'
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        flexBasis: 200,
    },
    buttonN: {
        color: 'white',
        textTransform: 'capitalize',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        whiteSpace: 'nowrap'
    },
    buttonRootContent: {
        fontFamily: 'Nunito',
        fontSize: '14px',
        textAlign: 'center',
        color: '#ea0b4b',
        border: '1px solid #ea0b4b',
        backgroundColor: '#ffffff'
    }
});


class Contact extends React.Component {

    state = {
        invalidOtp: '',
        openSnack: false,
        loading: false,
        success: false,
        sucessbar: false,
        showPassword: false,
        passwordDialog: false,
        tempOTP: '',
        password: '',
        otpId: '',
        proposerId: '',
        leadId: '',
        vehicle_flag_init: true,
        contactForm: {
            communicationAddress: {
                value: '',
                validation: {
                    required: true,
                    isValidateAddress: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please enter valid address'
            },
            pincode: {
                value: '',
                validation: {
                    required: true,
                    isPincode: true
                },
                valid: false,
                touched: false,
                message: 'Please enter valid pincode'
            },
            city: {
                value: '',
                validation: {
                    required: true,
                    isCharacter: true
                },
                valid: false,
                touched: false,
                message: 'Please select city'
            },
            cityArea: {
                value: '',
                validation: {
                    required: true,
                    isCharacter: true
                },
                valid: false,
                touched: false,
                message: 'Please select city area'
            },
            state: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                message: 'Please select state'
            },
            tehsil: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: true,
                message: 'Please select Tehsil'
            },
            email: {
                value: '',
                validation: {
                    required: true,
                    isValidateEmail: true,
                    isUniqueEmailMobile: true
                },
                valid: false,
                touched: false,
                message: 'Please enter valid email id'
            },
            phone: {
                value: '',
                validation: {
                    isPhone: true
                },
                valid: true,
                touched: true,
                message: 'Please enter valid Phone Number'
            },
            std: {
                value: '',
                validation: {
                    required: false,
                    isNumber: true
                },
                valid: true,
                touched: false,
                message: 'Please enter valid STD code'
            },
            mobile: {
                value: '',
                validation: {
                    required: true,
                    isNumber: true,
                    isStartNumber: true,
                    minLength: 10,
                    maxLength: 10,
                    isUniqueEmailMobile: true
                },
                valid: false,
                touched: false,
                message: 'Please enter valid Mobile Number'
            }
        },
        tehsilList: [],
        cityList: [],
        cityAreaList: [],
        showTehsil: false,
        isPasswordValid: false,
        isPasswordTouched: false,
        formIsValid: false,
        otpDialog: false,
        proposalDecline: false,
        showSnack: false,
        seconds: 59,
        otpFlag: '',
        proposalDeclineInsurer: false,
        disableCreatePassword: false,
        showUniqueErrorMessage: true,
        emlMblMsg: true,
        showCtState: false
    }
    handleChangeInfo = name => event => {
        const value = event.target.value;
        if (name === 'password') {
            let isValid = true;
            const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            regex.test(value) ? isValid = true : isValid = false
            this.setState({ isPasswordValid: isValid, isPasswordTouched: true })
            if (value.length <= 16) {
                this.setState({
                    [name]: event.target.value
                });
            }
        } else if (name === 'tempOTP') {
            if (value.length <= 6) {
                if (event.target.value.match(/^\d+$/)) {
                    this.setState({
                        [name]: event.target.value
                    });
                } else if (event.target.value === '') {
                    this.setState({
                        [name]: event.target.value
                    });
                } else {

                }
            }
        } else {

        }


    }

    handleChange = name => event => {
        if (name === 'std' || name === 'phone') {
            if (!event.target.value.match(/^[0-9]*$/)) {
                return 0;
            }
        }
        const updatedProposalForm = {
            ...this.state.contactForm
        }
        const updatedFormElement = {
            ...updatedProposalForm[name]
        }
        if (name === 'state') {
            updatedProposalForm['city'].value = ''
            updatedProposalForm['city'].touched = false
            updatedProposalForm['city'].valid = false
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, name)
        updatedFormElement.touched = true
        updatedProposalForm[name] = updatedFormElement;
        let formIsValid = true;
        for (let name in updatedProposalForm) {
            formIsValid = updatedProposalForm[name].valid && formIsValid
            console.log(formIsValid, name, 'updatedProposalForm[name].valid')
        }
        this.setState({ contactForm: updatedProposalForm, formIsValid: formIsValid });
        const contactDetails = {
            communicationAddress: updatedProposalForm.communicationAddress.value,
            pincode: updatedProposalForm.pincode.value ? updatedProposalForm.pincode.value : '',
            city: updatedProposalForm.city.value ? updatedProposalForm.city.value : '',
            state: updatedProposalForm.state.value ? updatedProposalForm.state.value : '',
            mobile: updatedProposalForm.mobile.value ? updatedProposalForm.mobile.value : '',
            phone: updatedProposalForm.phone.value ? updatedProposalForm.phone.value : '',
            email: updatedProposalForm.email.value ? updatedProposalForm.email.value : '',
            std: updatedProposalForm.std.value ? updatedProposalForm.std.value : '',
            tehsil: updatedProposalForm.tehsil.value ? updatedProposalForm.tehsil.value : '',
            cityArea: updatedProposalForm.cityArea.value ? updatedProposalForm.cityArea.value : ''
        }
        localStorage.setItem("contactDetails", JSON.stringify(contactDetails))
        if (name === 'pincode') {
            this.getTehsilList(event.target.value)
        }

        if(name === 'city') {
            this.getCityArea(event.target.value)
        }

        if(name === 'cityArea'){
            this.setState({formIsValid : true})
        }
    };


    getCityArea(cityID) {
        axios.get(`${constants.apiRootURL}/starhealth/area-details/${this.state.contactForm.pincode.value}/${cityID}`)
        .then(res => {
            this.setState({ cityAreaList : res.data, formIsValid : true})
        })
    }

    getTehsilList(pincode) {
        if (pincode.length === 6) {
            if (this.props.willDisplayStarHealthCityArea) {
                axios.get(`${constants.apiRootURL}/starhealth/city-details/${pincode}`)
                    .then(res => {
                        this.setState({ cityList: res.data })
                    })
            } else {
                axios.get(`${constants.apiRootURL}/proposer/city-state?pincode=${pincode}`)
                    .then(res => {
                        const { contactForm } = this.state;
                        contactForm.city.value = res.data.city;
                        contactForm.city.valid = true;
                        contactForm.state.value = res.data.state;
                        contactForm.state.valid = true;
                        this.setState({ tehsilList: res.data.tehsils, showTehsil: true, showCtState: true, contactForm })
                    })
            }
        }
    }

    // Check email mobile combination
    isMobileEmailExist(mobile, email) {
        // const {contactForm} = this.state;
        if (mobile.length === 10) {
            axios.get(`${constants.apiRootURL}/proposer/is-mobile-email-unique?mobile=${mobile}&email=${email}`)
                .then((resp) => {
                    this.setState({ emlMblMsg: resp.data })
                }).catch(error => {
                    console.log(error)
                })
        } else {
            this.setState({ emlMblMsg: false })
        }

        // if(contactForm.email.valid && contactForm.mobile.valid) {

        // } else {
        //     this.setState({emlMblMsg: false})
        // }

    }

    checkValidity(value, rules, name) {
        let isValid = true;
        if (rules.isStartNumber) {
            isValid = value.trim().match(/^[6789]\d{9}$/) && isValid
        }
        if (rules.isNumber) {
            isValid = value.match(/^[0-9]*$/) && isValid
        }
        if (rules.isPincode) {
            isValid = value.match(/^[1-9][0-9]{5}$/) && isValid
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.isValidateAddress) {
            isValid = value.match(/^[a-zA-Z0-9\s,./-]{1,150}$/) && isValid
        }
        if (rules.isValidateEmail) {
            isValid = value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i) && value.length >= 9 && isValid;
            // isValid = ((value.match(/\./g) || []).length <=2 && (value.match(/@/g) || []).length <=1 && (value.match(/_/g) || []).length <=1 && (value.match(/-/g) || []).length <=1) && isValid
            // console.log((value.match(/\./g) || []).length,(value.match(/./g) || []).length <=2, (value.match(/@/g) || []).length <=1 , (value.match(/_/g) || []).length <=1 , (value.match(/-/g) || []).length <=1, "pppppppppppppppp")
        }
        if (rules.required && rules.isCharacter) {
            isValid = value.match(/^([a-zA-Z ]){2,30}$/) && isValid
        }
        if (rules.required && rules.isNumber) {
            isValid = value.trim() !== '' && value.trim().match(/^\d+$/) && isValid
        }
        if (rules.shouldAcceptAlphaNumericCharactersOnly) {
            isValid = value.match(/^[a-zA-Z0-9_]+$/) && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isUniqueEmailMobile) {
            let emlMblMsg = false
            if (name === 'mobile')
                this.isMobileEmailExist(value, this.state.contactForm.email.value)

            else
                this.isMobileEmailExist(this.state.contactForm.mobile.value, value)

        }
        // if(rules.isNumber) {
        //     isValid = value.trim().match(/^\d+$/) && isValid
        // }
        // if(rules.isPhone) {
        //     isValid = value !== '' ? !isNaN(value) : true
        // }
        return isValid
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

                const status = response.status
                if (status === 200) {
                    localStorage.setItem("username", response.data.name)
                    this.props.onAuthSuccessUSER(response.data.name)

                } else if (status === 500) {

                    vm.props.history.push('/500')
                }
            }).catch(error => {
                if (error.response.status === 400) {
                    this.setState({
                        openSnack: true
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
    handleCreatePassword = () => {
        let data = {
            leadId: this.state.leadId,
            password: this.state.password,
            EditNumber: false
        }
        this.setState({ disableCreatePassword: true })
        const vm = this;
        axios.post(`${constants.apiRootURL}/proposer/create-password`, data)
            .then(res => {
                this.setState({
                    passwordDialog: false,
                    disableCreatePassword: false
                })
                if (process.env.REACT_APP_PROFILE === 'POM') {
                    vm.props.onAuthSuccess(res.data)
                    localStorage.setItem('token', res.data.accessToken)
                    this.getProfileDetails()
                }
                localStorage.setItem("proposerId", res.data.proposerId)
                if (res.status === 202) {
                    this.props.setStep(8); this.setState({ otpDialog: false });
                    const premiumDetails = {
                        premiumAmount: res.data.premiumAmount,
                        serviceTax: res.data.serviceTax,
                        premiumWithServiceTax: res.data.premiumWithServiceTax,
                        proposerId: res.data.proposerId
                    }
                    this.props.onPremiumFetch(premiumDetails)
                    this.props.loadProposalSummary(true)
                    this.props.paymentButtonHide(false)
                    if (res.data.policyStatus === 'Decline') {
                        this.setState({
                            proposerId: res.data.proposerId,
                            proposalDecline: true
                        })
                    } else if (res.data.eligibleForPremedical) {
                        this.props.paymentButtonHide(true)
                        localStorage.setItem("proposerId", res.data.proposerId)
                        this.setState({
                            proposerId: res.data.proposerId,
                            proposalDecline: false
                        })
                        let data = res.data
                        data.postPay = true
                        this.props.history.push('/pre-medical-required', data)
                    }
                } else if (res.status === 201) {
                    this.setState({
                        proposerId: res.data.proposerId,
                        proposalDecline: true
                    })
                    this.props.paymentButtonHide(true)
                }
            }).catch(error => {
                if (error.response.status === 417) {
                    // this.props.history.push('/500')
                    this.setState({
                        showSnack: true,
                        passwordDialog: false,
                        disableCreatePassword: false
                    })
                }
                if (error.response.status === 400) {
                    // this.props.history.push('/500')
                    this.setState({ proposalDeclineInsurer: true, passwordDialog: false, disableCreatePassword: false })
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

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };



    handleSubmitOtp = () => {
        this.props.dialogueClose(true)
        this.setState({
            success: false,
            loading: true,
        })
        let mobileNumber = this.state.contactForm.mobile.value;
        let Otp = this.state.tempOTP
        let data = {
            "otpId": this.state.otpId,
            "mobile": mobileNumber,
            "otp": Otp
        };
        axios.post(`${constants.apiRootURL}/proposer/verify-otp`, data)
            .then(res => {
                this.props.loadProposalSummary(true)
                this.setState({
                    otpDialog: false,
                    EditNumber: false,
                })
                this.props.setStep(8)
                if (res.status === 200) {
                    this.setState({
                        loading: false,
                        success: true,
                        otpDialog: false,
                        passwordDialog: true
                    })

                }
                if (res.status === 202) {
                    this.props.paymentButtonHide(true)
                    this.setState({
                        loading: false,
                        success: true,
                        proposerId: res.data.proposerId,
                    })
                    const premiumDetails = {
                        premiumAmount: res.data.premiumAmount,
                        serviceTax: res.data.serviceTax,
                        premiumWithServiceTax: res.data.premiumWithServiceTax,
                        proposerId: res.data.proposerId
                    }
                    this.props.onPremiumFetch(premiumDetails)
                    localStorage.setItem("proposerId", res.data.proposerId)
                    if (process.env.REACT_APP_PROFILE === 'POM') {
                        this.props.onAuthSuccess(res.data.accessToken)
                        localStorage.setItem('token', res.data.accessToken)
                        this.getProfileDetails()
                    }
                    if (res.data.policyStatus === 'Decline') {
                        this.setState({
                            proposerId: res.data.proposerId,
                            proposalDecline: true
                        })
                    } else if (res.data.eligibleForPremedical) {
                        this.setState({
                            proposerId: res.data.proposerId,
                            proposalDecline: false
                        })
                        let data = res.data
                        data.postPay = true
                        this.props.history.push('/pre-medical-required', data)
                    }


                } else if (res.status === 201) {
                    this.setState({
                        loading: false,
                        success: true,
                    })
                    if (process.env.REACT_APP_PROFILE === 'POM') {
                        localStorage.setItem('token', res.data.accessToken)
                        this.props.onAuthSuccess(res.data.accessToken)
                    }
                    this.props.paymentButtonHide(true)
                    this.setState({
                        proposerId: res.data.proposerId,
                        proposalDecline: true
                    })




                }

            })
            .catch(error => {

                if (error.response.status === 400) {
                    // this.props.history.push('/500')
                    this.setState({
                        proposalDeclineInsurer: true,
                        otpDialog: false,
                        loading: false,
                        success: true
                    })
                }
                if (error.response.status === 417) {
                    // this.props.history.push('/500')
                    this.setState({
                        showSnack: true,
                        otpDialog: false,
                        loading: false,
                        success: true
                    })
                }
                if (error.response.status === 401) {
                    localStorage.clear();
                    this.props.onAuthFail()
                    this.props.history.push('/login-customer')
                }
                if (error.response.status === 403) {
                    this.setState({
                        invalidOtp: 'Invalid OTP',
                        loading: false,
                        success: true,
                    })
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
        this.props.setStep(6)
        this.props.paymentButtonHide(false)
        this.setState({
            tempOTP: ''
        })
    }
    handlecontinue = () => {
        let contactDetails = {
            communicationAddress: this.state.contactForm.communicationAddress.value,
            pincode: this.state.contactForm.pincode.value,
            city: this.state.contactForm.city.value,
            state: this.state.contactForm.state.value,
            mobile: this.state.contactForm.mobile.value,
            phone: this.state.contactForm.phone.value,
            email: this.state.contactForm.email.value,
            std: this.state.contactForm.std.value,
        }
        if (this.props.willDisplayStarHealthCityArea) {
            contactDetails.starHealthAreaId = this.state.contactForm.cityArea.value
        }else if(this.props.willDisplayTehsil) {
            contactDetails.tehsil = this.state.contactForm.tehsil.value
        }
        let healthData = this.props.proposalFormDataHealth;
        healthData.insurerId = this.props.insurer && this.props.insurer.insurerId
        healthData.insurerName = this.props.insurer && this.props.insurer.insurerName
        healthData.insurerPlanId = this.props.insurer && this.props.insurer.insurerPlanId
        healthData.planCode = this.props.insurer && this.props.insurer.planCode
        healthData.planName = this.props.insurer && this.props.insurer.planName
        healthData.sumInsured = this.props.insurer && this.props.insurer.sumInsured
        healthData.proposerName = this.props.proposalFormDataHealth && this.props.proposalFormDataHealth.proposersName
        healthData.dateOfBirth = this.props.proposalFormDataHealth && this.props.proposalFormDataHealth.dob
        healthData.income = Number(this.props.proposalFormDataHealth.income)
        let insuredMembers = []
        // eslint-disable-next-line
        healthData.insuredMembersList.map(member => {
            let mem = member;
            mem.height = Number(`${member.heightFeet}.${member.heightInches}`)
            mem.heightInches = Number(member.heightInches)
            insuredMembers.push(mem)
        })
        healthData.insuredMembersList = insuredMembers
        healthData.addOns = this.props.currentPlan.addOns ? this.props.currentPlan.addOns : []
        healthData.insurerPlanCode = this.props.currentPlan.insurerPlanCode
        healthData.insurerProductCode = this.props.currentPlan.insurerProductCode
        healthData.insurerPlanName = this.props.currentPlan.insurerPlanName
        healthData.insurerProductName = this.props.currentPlan.insurerProductName
        healthData.gst = Number(this.props.currentPlan.gst)
        healthData.premium = Number(this.props.currentPlan.premium)
        healthData.totalPremium = Number(this.props.currentPlan.totalPremium)
        healthData.ageBand = this.props.currentPlan.ageBand
        healthData.roomWaiverPremium = this.props.currentPlan.roomWaiverPremium
        healthData.doubleSumInsuredPremium = this.props.currentPlan.doubleSumInsuredPremium
        healthData.deductibleAmount = this.props.currentPlan.deductibleAmount


        // alert(this.props.insurer.insurerId)
        const ContactData = {
            ...healthData,
            ...contactDetails
        }
        console.log(ContactData, "sumantContactData")
        this.props.loadProposalFormHealth(ContactData)
        axios.post(`${constants.apiRootURL}/proposer/buy-policy`, ContactData)
            .then(res => {
                this.setState({
                    otpId: res.data.otpId,
                    leadId: res.data.leadId,
                    // EditNumber: false
                })

            })
            .catch(error => {
                if (error.response.status === 400) {
                    // this.props.history.push('/500')
                    this.setState({ proposalDeclineInsurer: true })
                }
                if (error.response.status === 417) {
                    // this.props.history.push('/500')
                    this.setState({ showSnack: true })
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
    handleCloseSnack = () => {
        this.setState({ showSnack: !this.state.showSnack })
    }
    handleClose = () => {
        this.setState({ otpDialog: false, })
        this.props.setStep(6)
    }
    handleCloseEdit = () => {
        this.setState({ EditNumber: false })
        // this.props.setStep(6)
    }
    componentDidMount() {
        const autoFilledContactForm = this.state.contactForm
        autoFilledContactForm.mobile.value = this.props.inputformdata && this.props.inputformdata.phone
        autoFilledContactForm.mobile.valid = true
        autoFilledContactForm.mobile.touched = true
        this.setState({ proposerForm: autoFilledContactForm, formIsValid: false })
        this.loadLocalstate()
        this.isMobileEmailExist(autoFilledContactForm.mobile.value, this.state.contactForm.email.value)
    }
    loadLocalstate() {
        const dataL = JSON.parse(localStorage.getItem("contactDetails"))
        const data = dataL ? dataL : {}
        let contactForm = this.state.contactForm

        if (data.communicationAddress) {
            contactForm.communicationAddress.value = data.communicationAddress
            contactForm.communicationAddress.valid = true
            contactForm.communicationAddress.touched = true
        }

        if (data.pincode) {
            contactForm.pincode.value = data.pincode
            contactForm.pincode.valid = true
            contactForm.pincode.touched = true
            this.getTehsilList(data.pincode)
        } else {
            contactForm.pincode.value = this.props.inputformdata.selfPincode
            contactForm.pincode.valid = true
            contactForm.pincode.touched = true
            this.getTehsilList(this.props.inputformdata.selfPincode)
        }

        if (data.city) {
            contactForm.city.value = data.city
            contactForm.city.valid = true
            contactForm.city.touched = true
        }

        if (data.state) {
            contactForm.state.valid = true
            contactForm.state.value = data.state
            contactForm.state.touched = true
        }


        if (data.email) {
            contactForm.email.value = data.email
            contactForm.email.valid = true
            contactForm.email.touched = true
        }

        if (data.tehsil) {
            contactForm.tehsil.value = data.tehsil
            contactForm.tehsil.valid = true
            contactForm.tehsil.touched = true
        }


        if (data.std) {
            contactForm.std.valid = true
            contactForm.std.value = data.std
            contactForm.std.touched = true
        }

        if (data.phone) {
            contactForm.phone.value = data.phone
            contactForm.phone.valid = true
            contactForm.phone.touched = true
        }
        // if(!this.props.willDisplayTehsil) {
        if (!this.props.willDisplayTehsil) {
            contactForm.tehsil.value = data.tehsil
            contactForm.tehsil.valid = true
            contactForm.tehsil.touched = true
        }

        if (data.cityArea) {
            contactForm.cityArea.value = data.cityArea
            contactForm.cityArea.valid = true
            contactForm.cityArea.touched = true
        }

        if (!this.props.willDisplayStarHealthCityArea) {
            contactForm.cityArea.value = data.cityArea
            contactForm.cityArea.valid = true
            contactForm.cityArea.touched = true
        }
        // debugger

        let formIsValid = true;
        for (let name in contactForm) {
            formIsValid = contactForm[name].valid && formIsValid
        }
        // debugger
        this.setState({ contactForm, formIsValid });


        const ContactData = {
            ...this.props.proposalFormDataHealth,
            ...data
        }
        this.props.loadProposalFormHealth(ContactData)
        this.isMobileEmailExist(this.state.contactForm.mobile.value, contactForm.email.value)
    }

    uploadData() {
        if (this.props.isProposalSummary) {
            const data = this.props.proposalFormDataHealth
            let contactForm = this.state.contactForm

            contactForm.communicationAddress.value = data.communicationAddress
            contactForm.communicationAddress.valid = true
            contactForm.communicationAddress.touched = true

            contactForm.pincode.value = data.pincode
            contactForm.pincode.valid = true
            contactForm.pincode.touched = true
            this.getTehsilList(data.pincode)

            contactForm.city.value = data.city
            contactForm.city.valid = true
            contactForm.city.touched = true

            contactForm.state.valid = true
            contactForm.state.value = data.state
            contactForm.state.touched = true

            contactForm.mobile.value = data.mobile
            contactForm.mobile.valid = true
            contactForm.mobile.touched = true

            contactForm.email.value = data.email
            contactForm.email.valid = true
            contactForm.email.touched = true

            contactForm.std.valid = true
            contactForm.std.value = data.std
            contactForm.std.touched = true

            contactForm.phone.value = data.phone
            contactForm.phone.valid = true
            contactForm.phone.touched = true


            if (!this.props.willDisplayTehsil) {
                contactForm.tehsil.value = data.tehsil
                contactForm.tehsil.valid = true
                contactForm.tehsil.touched = true
            } else if (data.tehsil) {
                contactForm.tehsil.value = data.tehsil
                contactForm.tehsil.valid = true
                contactForm.tehsil.touched = true
            }
            
            if (!this.props.willDisplayStarHealthCityArea) {
                contactForm.cityArea.value = data.cityArea
                contactForm.cityArea.valid = true
                contactForm.cityArea.touched = true
            }else if (data.cityArea) {
                contactForm.cityArea.value = data.cityArea
                contactForm.cityArea.valid = true
                contactForm.cityArea.touched = true
            }

            let formIsValid = true;
            for (let name in contactForm) {
                formIsValid = contactForm[name].valid && formIsValid
                console.log(name, formIsValid, contactForm[name].valid, "sumantkumar")

            }
            this.setState({ contactForm, formIsValid });
        }
    }
    getCountdown = () => {
        const { seconds } = this.state;
        if (seconds > 0) {
            this.setState({ seconds: seconds - 1 });
        } else {
            clearInterval(this.interval)
            this.setState({ otpFlag: false })
        }
    }
    handleResendOtp = () => {

        const resendDetail = {
            leadId: this.state.leadId,
            mobile: this.state.contactForm.mobile.value
        }
        axios.post(`${constants.apiRootURL}/proposer/resend-otp`, resendDetail)
            .then(res => {
                console.log(res)
                this.setState({
                    otpId: res.data.otpId
                })

            }).catch(error => {
                console.log(error)
            })
        this.interval = setInterval(this.getCountdown, 1000)
        this.setState({ otpFlag: true, seconds: 59 })
    }
    componentDidUpdate(prevProps) {
        let contactForm = this.state.contactForm
        if (prevProps.willDisplayTehsil !== this.props.willDisplayTehsil) {
            if (this.props.willDisplayTehsil) {
                const data = this.props.proposalFormDataHealth
                contactForm.tehsil.value = data.tehsil
                contactForm.tehsil.valid = false
                contactForm.tehsil.touched = false
            } else {
                contactForm.tehsil.value = ''
                contactForm.tehsil.valid = true
                contactForm.tehsil.touched = true
            }
            let formIsValid = true;
            for (let name in contactForm) {
                formIsValid = contactForm[name].valid && formIsValid
                console.log(name, formIsValid, contactForm[name].valid, "sumantkumar")

            }
            this.setState({ contactForm, formIsValid });
        }

        if (prevProps.willDisplayStarHealthCityArea !== this.props.willDisplayStarHealthCityArea) {
            if (this.props.willDisplayStarHealthCityArea) {
                const data = this.props.proposalFormDataHealth
                this.getTehsilList(data.pincode)
                contactForm.cityArea.value = data.cityArea
                contactForm.cityArea.valid = false
                contactForm.cityArea.touched = false
            } else {
                contactForm.cityArea.value = ''
                contactForm.cityArea.valid = true
                contactForm.cityArea.touched = true
            }
            let formIsValid = true;
            for (let name in contactForm) {
                formIsValid = contactForm[name].valid && formIsValid
                console.log(name, formIsValid, contactForm[name].valid, "sumantkumar")

            }
            this.setState({ contactForm, formIsValid });
        }
    }
    render() {
        const { loading, success, contactForm } = this.state;
        const { classes, fullScreen } = this.props;
        const buttonClassname = classNames({ [classes.buttonSuccess]: success });
        const contact = this.props.proposalFormDataHealth
        return (
            <div className="vehicle-detail-parent">
                <Panel>
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
                    {(this.props.step < 6 && this.state.vehicle_flag_init) &&
                        <Row>
                            <Col md="11" sm="10" xs="10">
                                <p className="step-details">Step 5 of {this.props.totalSteps}</p>
                                <p className="step-name">Contact Details</p>
                            </Col>
                            <Col md="1" sm="2" xs="2">
                                {this.props.step < 7 &&
                                    <p
                                        className="edit"
                                    /*onClick={() => { this.props.setStep(6) }}*/>Edit</p>
                                }
                            </Col>
                        </Row>
                    }

                    {(this.props.step === 6) &&
                        <div className="form-vehicle-details">
                            <h3 className="personal-details-heading">Contact Details
                                <p
                                    className="gbui-body-3 otp-send-purp disp-inline">
                                    We’ll send you OTP on this number for verification purpose
                                </p>
                            </h3>
                            <p className="step-detail-success">Step 7 of {this.props.totalSteps}</p>
                            <hr />
                            <form noValidate autoComplete={false} style={{ marginRight: window.innerWidth < 768 ? '10px' : '' }}>
                                <Row>
                                    <Col md="5">
                                        {/* Communication Address */}
                                        <FormLabel className="address-label">Communication Address</FormLabel>
                                        <FormControl className="comm_address" fullWidth>
                                            <TextField
                                                id="address"
                                                label=""
                                                value={this.state.contactForm.communicationAddress.value}
                                                onChange={this.handleChange('communicationAddress')}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="communicationAddress"
                                                margin="normal"
                                                fullWidth
                                                rows="5"
                                                multiline
                                                variant="outlined"
                                                required={true}
                                                inputProps={{ maxLength: 150 }}
                                                error={!this.state.contactForm.communicationAddress.valid
                                                    && this.state.contactForm.communicationAddress.touched}
                                            />
                                            <p className="error">{(!this.state.contactForm.communicationAddress.valid
                                                && this.state.contactForm.communicationAddress.touched) && this.state.contactForm.communicationAddress.errorMessage}</p>
                                        </FormControl>

                                        {/* Pincode */}
                                        <FormControl className="contact_pincode" >
                                            <TextField
                                                id="pincode"
                                                label="Pincode"
                                                value={this.state.contactForm.pincode.value}
                                                onChange={this.handleChange('pincode')}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="pincode"
                                                margin="dense"
                                                required={true}
                                                error={!this.state.contactForm.pincode.valid
                                                    && this.state.contactForm.pincode.touched}
                                            />
                                        </FormControl>
                                        {(!this.state.contactForm.pincode.valid
                                            && this.state.contactForm.pincode.touched) && <p className="error">{contactForm.pincode.message}</p>}
                                        {/* City */}
                                        {!this.props.willDisplayStarHealthCityArea && this.state.showCtState && <FormControl className="contact_city">
                                            <TextField
                                                id="city"
                                                label="City"
                                                value={this.state.contactForm.city.value}
                                                onChange={this.handleChange('city')}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="city"
                                                margin="dense"
                                                required={true}
                                                error={!this.state.contactForm.city.valid
                                                    && this.state.contactForm.city.touched}
                                                disabled
                                            />
                                        </FormControl>}
                                        {this.props.willDisplayStarHealthCityArea &&
                                            <FormControl  className="contact_city" fullWidth>
                                                <InputLabel shrink htmlFor="tehsil">City*</InputLabel>
                                                <NativeSelect
                                                    inputProps={{
                                                        name: 'city',
                                                        id: 'city-native-helper',
                                                    }}
                                                    value={this.state.contactForm.city.value}
                                                    onChange={this.handleChange('city')}
                                                    input={<Input name="city" id="city-native-label-placeholder" />}
                                                    style={{ width: '287px' }}
                                                >
                                                    <option value="">Select City</option>
                                                    {this.state.cityList.map(item =>
                                                        <option value={item.cityId}>{item.cityName}</option>
                                                    )}
                                                </NativeSelect>
                                            </FormControl>
                                        }
                                        {this.props.willDisplayStarHealthCityArea &&
                                            <FormControl fullWidth>
                                            <InputLabel shrink htmlFor="tehsil">Area*</InputLabel>
                                            <NativeSelect
                                                inputProps={{
                                                    name: 'cityArea',
                                                    id: 'cityArea-native-helper',
                                                }}
                                                value={this.state.contactForm.cityArea.value}
                                                onChange={this.handleChange('cityArea')}
                                                input={<Input name="cityArea" id="cityArea-native-label-placeholder" />}
                                                style={{ width: '287px' }}
                                            >
                                                <option value="">Select Area</option>
                                                {this.state.cityAreaList.map(item =>
                                                    <option value={item.areaId}>{item.areaName}</option>
                                                )}
                                            </NativeSelect>
                                        </FormControl>
                                        }   
                                        {/* Tehsil */}
                                        {(this.props.willDisplayTehsil) && <FormControl
                                            fullWidth>
                                            <InputLabel shrink htmlFor="tehsil">Tehsil*</InputLabel>
                                            <NativeSelect
                                                inputProps={{
                                                    name: 'tehsil',
                                                    id: 'tehsil-native-helper',
                                                }}
                                                value={this.state.contactForm.tehsil.value}
                                                onChange={this.handleChange('tehsil')}
                                                input={<Input name="tehsil" id="tehsil-native-label-placeholder" />}
                                                style={{ width: '287px' }}
                                            >
                                                <option value="">Select Tehsil</option>
                                                {this.state.tehsilList.map(item =>
                                                    <option value={item}>{item}</option>
                                                )}
                                            </NativeSelect>
                                            {(!contactForm.tehsil.valid && contactForm.tehsil.touched) && <p className="error">{contactForm.tehsil.message}</p>}
                                        </FormControl>}

                                        {/* State */}
                                        {this.state.showCtState && <FormControl className="contact_state" style={{ width: '124px', display: 'block' }}>
                                            <TextField
                                                id="state"
                                                label="State"
                                                value={this.state.contactForm.state.value}
                                                onChange={this.handleChange('state')}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="state"
                                                margin="dense"
                                                required={true}
                                                error={!this.state.contactForm.state.valid
                                                    && this.state.contactForm.state.touched}
                                                disabled
                                            />
                                        </FormControl>}

                                    </Col>
                                    <Col md="1"></Col>
                                    <Col md="5">
                                        {/* Mobile Number */}
                                        <FormControl className="contact_mobile" fullWidth>
                                            <TextField
                                                id="email"
                                                label="Mobile Number"
                                                value={this.state.contactForm.mobile.value}
                                                onChange={this.handleChange('mobile')}
                                                inputProps={{ maxLength: 10 }}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="mobile"
                                                margin="normal"
                                                fullWidth
                                                required={true}
                                                error={!this.state.contactForm.mobile.valid
                                                    && this.state.contactForm.mobile.touched}
                                                startAdornment={<InputAdornment disableTypography={true}
                                                    classes={{ root: classes.adornment }} position="start">+91</InputAdornment>}
                                            />
                                            <p style={{ color: '#ea0b4b' }} >{this.state.contactForm.mobile.touched ? !this.state.contactForm.mobile.valid && contactForm.mobile.message : null}</p>
                                        </FormControl>
                                        <p className="gbui-body-3 otp-send-purp">
                                            We’ll send you OTP on this number for verification purpose
                                        </p>
                                        {/* Email Address */}
                                        <FormControl className="contact_email" fullWidth>
                                            <TextField
                                                id="email"
                                                label="Email Address"
                                                value={this.state.contactForm.email.value}
                                                onChange={this.handleChange('email')}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="email"
                                                margin="normal"
                                                fullWidth
                                                required={true}
                                                inputProps={{ maxLength: 75, minLength: 9 }}
                                                error={!this.state.contactForm.email.valid
                                                    && this.state.contactForm.email.touched}
                                            />
                                            <p style={{ color: '#ea0b4b' }} >{this.state.contactForm.email.touched ?
                                                !this.state.contactForm.email.valid
                                                && contactForm.email.message : null}</p>
                                            {!this.state.emlMblMsg && <p style={{ color: '#ea0b4b' }} h={this.state.emlMblMsg}>Please enter a unique combination of mobile/email</p>}
                                        </FormControl>
                                        <Col className="contact_std" md={6}>
                                            {/* STD Code */}
                                            <FormControl fullWidth>
                                                <TextField
                                                    id="std"
                                                    label="STD Code"
                                                    value={this.state.contactForm.std.value}
                                                    pattern="\d*"
                                                    onChange={this.handleChange('std')}
                                                    classes={{
                                                        root: classes.text_field
                                                    }}
                                                    inputProps={{ maxLength: 5, minLength: 2, pattern: "\d*" }}
                                                    name="std"
                                                    margin="normal"
                                                    fullWidth
                                                // required={true}
                                                // error={!this.state.contactForm.std.valid
                                                //     && this.state.contactForm.std.touched}
                                                />
                                            </FormControl>
                                            {(!contactForm.std.valid && contactForm.std.touched) && <p className="error">{contactForm.std.message}</p>}
                                        </Col>
                                        <Col className="contact_phone" md={6}>
                                            {/* Phone Number */}
                                            <FormControl fullWidth>
                                                <TextField
                                                    id="phone"
                                                    label="Phone Number"
                                                    value={this.state.contactForm.phone.value}
                                                    onChange={this.handleChange('phone')}

                                                    classes={{
                                                        root: classes.text_field
                                                    }}
                                                    name="phone"
                                                    inputProps={{ maxLength: 8, minLength: 7 }}
                                                    margin="normal"
                                                    fullWidth
                                                    // required={true}
                                                    error={!contactForm.phone.valid
                                                        && contactForm.phone.touched}
                                                />
                                                {/* <p style={{color:'#ea0b4b'}}>{!this.state.contactForm.phone.valid &&'Please enter numeric digits'}</p>    */}
                                            </FormControl>
                                            {(!contactForm.phone.valid && contactForm.phone.touched) && <p className="error">{contactForm.phone.message}</p>}
                                        </Col>
                                    </Col>
                                </Row>
                            </form>
                            {/* // Button next */}
                            <div className="button-next">
                                <Button disabled={!this.state.emlMblMsg || !this.state.formIsValid}
                                    className={[classNames(classes.buttonRoot3), "contact_submit"].join(" ")}
                                    onClick={() => { this.props.setStep(7); this.setState({ otpDialog: true }); this.handlecontinue(); }}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    }

                    {/* Now show form details */}
                    {this.props.step > 6 &&
                        <div className="personal-show-details">
                            <Row>
                                <Col md="11" sm="10" xs="10">
                                    <h3 className="step-detail">Step 7 of {this.props.totalSteps}</h3>
                                    <h3 className="personal-heading">Contact Details</h3>
                                </Col>
                                <Col md="1" sm="2" xs="2">
                                    {this.props.step < 7 &&
                                        <h3
                                            className="edit"
                                            onClick={() => { this.props.setStep(6); this.uploadData() }}>Edit</h3>
                                    }
                                </Col>
                            </Row>
                            <div className="mui--hidden-xs mui--hidden-sm"><hr /></div>
                            <div className="mui--hidden-lg mui--hidden-xl mui--hidden-md"><hr style={{ marginTop: '-2px' }} /></div>

                            {/* Here details of filled elements */}
                            <div className="desktop-data mui--hidden-sm mui--hidden-xs">
                                <Row>
                                    <Col md="4">
                                        <p className="key-name">Communication Address:</p>
                                        <p className="key-value">{contact.communicationAddress}</p>
                                    </Col>
                                    <Col md="4">
                                        <p className="key-name">Pincode:</p>
                                        <p className="key-value">{contact.pincode}</p>
                                        <p className="key-name">City:</p>
                                        <p className="key-value">{contact.city}</p>
                                        <p className="key-name">State:</p>
                                        <p className="key-value">{contact.state}</p>
                                    </Col>
                                    <Col md="4">
                                        <p className="key-name">Mobile Number:</p>
                                        <p className="key-value">{contact.mobile}</p>
                                        <p className="key-name">Email Id:</p>
                                        <p className="key-value">{contact.email}</p>
                                        <p className="key-name">Phone Number:</p>
                                        <p className="key-value">{contact.std} {contact.phone}</p>
                                    </Col>
                                </Row>

                            </div>
                            {/* For Mobile View */}
                            {/* Table */}
                            <table className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                                <tbody>
                                    <tr>
                                        <td>
                                            Communication Address:
                                </td>
                                        <td>
                                            {contact.communicationAddress}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Pincode:
                                </td>
                                        <td>
                                            {contact.pincode}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            City:
                                </td>
                                        <td>
                                            {contact.city}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            State:
                                </td>
                                        <td>
                                            {contact.state}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Mobile:
                                </td>
                                        <td>
                                            {contact.mobile}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Email:
                                </td>
                                        <td>
                                            {contact.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Phone:
                                </td>
                                        <td>
                                            {contact.std} {contact.phone}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                </Panel>

                {/* OTP Verification Dialog */}
                <Dialog
                    maxWidth="md"
                    fullWidth={true}
                    open={this.state.otpDialog}
                    // onClose={() => { this.setState({ otpDialog: false }) }}
                    aria-labelledby="max-width-dialog-title"
                >

                    <div className="dialog-tabs-input-form-health-div">
                        <div className='close-model-icon'>
                            <i onClick={this.handleClose} class="material-icons" style={{ float: 'right', cursor: 'pointer' }}>
                                close
</i>
                        </div>
                    </div>          <p
                        className="gbui-h5 otp-modal-heading">Verify your OTP</p>
                    <DialogContent style={{ textAlign: 'center' }}>
                        <p
                            className="gbui-body-1 otp-modal-sub-heading">
                            Please share the OTP you have recieved on &nbsp;
                            <span
                                style={{ color: '#000000' }}>
                                {this.state.contactForm.mobile.value}
                            </span>
                            <p onClick={() => { this.setState({ EditNumber: true, otpDialog: false, invalidOtp: '' }) }} className="gbui-body-2" style={{ color: '#ea0b4b', display: 'inline', marginLeft: '2px', cursor: 'pointer' }}>Edit</p>
                        </p>
                        {/* Mobile Number */}
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <FormControl style={{ width: '200px' }}>
                                <TextField
                                    id="otp"
                                    label="One time Password(OTP)"
                                    value={this.state.tempOTP}
                                    onChange={this.handleChangeInfo('tempOTP')}
                                    classes={{
                                        root: classes.text_field
                                    }}
                                    name="tempOTP"
                                    margin="normal"
                                    required={true}
                                    fullWidth
                                    type="text"
                                    helperText={this.state.invalidOtp}
                                    error={this.state.invalidOtp}
                                />
                            </FormControl>

                        </div>
                        <div className={classes.root1}>
                            <div className={classes.wrapper}>
                                <Button disabled={!this.state.tempOTP}
                                    className={classNames(classes.buttonRoot3, classes.buttonClassname)}
                                    onClick={() => { this.props.setStep(7); this.handleSubmitOtp(); }}>
                                    Submit
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                        </div>
                        <p className="gbui-caption-1" style={{ marginTop: '5px', color: '#ea0b4b' }}>
                            <span style={{ color: '#333333' }}>Didn’t receive the code?</span>
                            {this.state.otpFlag ? <span style={{ cursor: 'text', color: 'grey' }}>
                                Resend OTP</span> : <span style={{ cursor: 'pointer', color: '#ea0b4b' }}
                                    onClick={this.handleResendOtp}> Resend OTP</span>}</p>
                        <p className="gbui-caption-1" style={{ color: '#ea0b4b' }} >{this.state.seconds} Secs</p>
                    </DialogContent>

                </Dialog>

                {/* password Dialog */}
                <Dialog
                    maxWidth="md"
                    fullWidth={true}
                    open={this.state.passwordDialog}
                    onClose={() => { this.setState({ passwordDialog: false }) }}
                    aria-labelledby="max-width-dialog-title"
                >
                    <p
                        className="gbui-h5 otp-modal-heading">We are making E-account for you</p>
                    <DialogContent style={{ textAlign: 'center' }}>
                        <p
                            className="gbui-body-1 otp-modal-sub-heading">
                            So please enter password for your choice
                        </p>
                        {/* Password */}
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <FormControl className={classNames(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="adornment-password">Create your Password</InputLabel>
                                <Input
                                    id="adornment-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    error={!this.state.isPasswordValid && this.state.isPasswordTouched}
                                    onChange={this.handleChangeInfo('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            {(!this.state.isPasswordValid && this.state.isPasswordTouched) &&
                                <p style={{ color: 'red' }}>
                                    Password should be atleast 1 capital letter, 1 special character, 1 number & min. 8 and max. 16 characters.
                                </p>}
                        </div>
                        <Button
                            className={classNames(classes.buttonRoot3)}
                            disabled={(!this.state.isPasswordValid && this.state.isPasswordTouched) || this.state.disableCreatePassword}
                            onClick={() => { this.handleCreatePassword() }}>
                            Submit
                            </Button>
                    </DialogContent>
                </Dialog>
                <Dialog
                    fullScreen={fullScreen}
                    fullWidth={fullScreen}
                    open={this.state.proposalDecline}
                    // onClose={this.handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    {/* <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle> */}
                    <DialogContent>
                        {/* <DialogContentText>
                                You can set my maximum width and whether to adapt or not.
                            </DialogContentText> */}
                        <p className="gbui-h5"
                            style={{ textAlign: 'center' }}>
                            ALERT
                            {/* <img
                                src="/assets/cancel.svg"
                                alt="cancel"
                                style={{ float: 'right', cursor: 'pointer' }} /> */}
                        </p>
                        <div style={{ textAlign: 'center', }}>

                            <img src="/assets/decline-proposer.svg" alt="decline proposer" style={{ marginTop: '66px' }} />
                            <p className="gbui-button-1" style={{ marginTop: '50px' }}>
                                Sorry!! Unfortunately, this plan does not support your medical declarations. Don’t worry!
                                We have got a lot of other plans you can look at.
                                </p>
                            <div style={{ marginTop: '68px' }}>
                                <Link to="/quote-listing-health">
                                    <Button className={classes.buttonN}>
                                        Try other plans
                                    </Button>
                                </Link>

                            </div>
                        </div>
                    </DialogContent>
                    {/* <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions> */}
                </Dialog>

                {/* Cancel policy */}
                <Dialog
                    fullScreen={fullScreen}
                    fullWidth={fullScreen}
                    open={this.state.proposalDeclineInsurer}
                    // onClose={this.handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    {/* <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle> */}
                    <DialogContent>
                        {/* <DialogContentText>
                                You can set my maximum width and whether to adapt or not.
                            </DialogContentText> */}
                        <p className="gbui-h5"
                            style={{ textAlign: 'center' }}>
                            ALERT
                            {/* <img
                                src="/assets/cancel.svg"
                                alt="cancel"
                                style={{ float: 'right', cursor: 'pointer' }} /> */}
                        </p>
                        <div style={{ textAlign: 'center', }}>

                            <img src="/assets/decline-proposer.svg" alt="decline proposer" style={{ marginTop: '66px' }} />
                            <p className="gbui-button-1" style={{ marginTop: '50px' }}>
                                Sorry! Due to insurer terms & conditions this policy can not be issued to you. Don’t worry!
                                We have got a lot of other plans you can look at.
                                </p>
                            <div style={{ marginTop: '68px' }}>
                                <Link to="/quote-listing-health">
                                    <Button className={classes.buttonN}>
                                        Try other plans
                                    </Button>
                                </Link>

                            </div>
                        </div>
                    </DialogContent>
                    {/* <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions> */}
                </Dialog>

                {/* edit mobile number dialog */}

                <Dialog
                    maxWidth="md"
                    fullWidth={true}
                    open={this.state.EditNumber}
                    //    onClose={() => { this.setState({ EditNumber: false }) }}
                    aria-labelledby="max-width-dialog-title"
                >
                    <div className="dialog-tabs-input-form-health-div">
                        <div className='close-model-icon'>
                            <i onClick={this.handleCloseEdit} class="material-icons" style={{ float: 'right', cursor: 'pointer' }}>
                                close
                            </i>
                        </div>
                    </div>
                    <p className="gbui-h5 otp-modal-heading">Edit your mobile number</p>
                    <DialogContent style={{ textAlign: 'center' }}>
                        {/* Mobile Number */}
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <FormControl style={{ width: '300px' }} fullWidth>
                                <TextField
                                    id="mobile"
                                    label="Mobile Number"
                                    value={this.state.contactForm.mobile.value}
                                    onChange={this.handleChange('mobile')}
                                    classes={{
                                        root: classes.text_field
                                    }}
                                    name="mobileNumber"
                                    margin="normal"
                                    fullWidth
                                    required={true}
                                    error={!this.state.contactForm.mobile.valid
                                        && this.state.contactForm.mobile.touched}
                                />
                            </FormControl>

                        </div>
                        {/* password */}
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <FormControl style={{ width: '300px' }} fullWidth>
                                <TextField
                                    id="otp2"
                                    label="One time Password(OTP)"
                                    value={this.state.tempOTP}
                                    onChange={this.handleChangeInfo('tempOTP')}
                                    classes={{
                                        root: classes.text_field
                                    }}
                                    name="tempOTP2"
                                    margin="normal"
                                    required={true}
                                    fullWidth
                                    helperText={this.state.invalidOtp}
                                    error={this.state.invalidOtp}
                                />
                            </FormControl>
                            <Button className={classNames(classes.buttonRootContent)} onClick={this.handlecontinue}>
                                Get OTP
                            </Button>
                        </div>
                        <div className={classes.root1}>
                            <div className={classes.wrapper}>
                                <Button disabled={!this.state.tempOTP} className={classNames(classes.buttonRoot3)} onClick={this.handleSubmitOtp}>
                                    Submit
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                        </div>
                    </DialogContent>

                </Dialog>



                {/* {this.state.sucessbar &&
                    <Row>
                        <Col md={12}>
                            <SnackbarContent
                                className={classes.snackbar}
                                message={
                                    'You have suceessfully verfied your details.'
                                }
                            />
                        </Col>
                    </Row>} */}
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
                    message={<span id="message-id">Something went wrong</span>}
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
        )
    }
}

const mapStateToProps = state => ({
    step: state.proposal_form_motor.stepH,
    proposalFormDataHealth: state.proposalFormHealth.proposalFormHealthData,
    currentPlan: state.currentPlan.details,
    inputformdata: state.inputFormHealth.inputFormHealthData

})

const mapDispatchToProps = dispatch => ({
    setStep: step => dispatch({ type: 'SET_STEP_H', step }),
    loadProposalFormHealth: (data) => dispatch({ type: 'PROPOSAL_FORM_HEALTH', data }),
    onAuth: (email, password) => dispatch({ type: 'AUTH_START', email, password }),
    onAuthFail: () => dispatch({ type: 'AUTH_FAIL' }),
    onAuthSuccess: (data) => dispatch({ type: 'AUTH_SUCCESS', data }),
    onPremiumFetch: (data) => dispatch({ type: 'PREMIUM_DETAILS', data }),
    onAuthSuccessUSER: (username) => dispatch({ type: 'SET_USER', username }),
})
Contact.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};
export default withMobileDialog()(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Contact)))
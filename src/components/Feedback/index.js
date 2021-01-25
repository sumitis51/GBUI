import React from 'react';
import './feedback.css'
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import axios from 'axios';
import { connect } from 'react-redux';
import NativeSelect from '@material-ui/core/NativeSelect';
import Container from 'muicss/lib/react/container';
import Snackbar from '@material-ui/core/Snackbar';

import {Helmet} from "react-helmet";
import constants from '../../constants/appConstants.json'

import LeftPanel from '../ConnectWithUs/LeftPanel/index'

const styles = theme => ({
    root: {
        color: '#ea0b4b',
        '&$checked': {
            color: '#ea0b4b',
        },
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    checked: {},
    snack:{
        marginTop:'6rem'
    },
});
class Feedback extends React.Component {
    state = {
        feedbackSnack:false,
        openSnack:false,
        age: '',
        policy: '',
        query1: '',
        query2: '',
        views: '',
        via_policy_no: false,
        via_email_phn: true,
        via_anonymous: false,
        isPhone_Number: true,
        form_share_via_email: false,
        form_share_via_policy: false,
        form_share_anonymous: false,
        feedback_via_em_ph: {
            ph_or_em: {
                value: '',
                what_is_it: '',
                validation: {
                    isRequired: true,
                    ph_or_em: true,
                },
                valid: true,
            },
            policy: {
                value: '',
                validation: {
                    isRequired: true,
                },
            },
        },
        feedback_via_policy_no: {
            policy_no: {
                value: '',
                validation: {
                    isRequired: true,
                },
                valid: true,
            }
        },
        feedback_anonymously: {
            product: {
                value: '',
                validation: {
                    isRequired: true,
                },
                valid: true,
            },
        },
        setPage: '/feedback',
        loadingBtn : false,
        btnHide:true,
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.isRequired) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.ph_or_em) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
            isValid = ((/^\d+$/.test(value) ? value.length === 10 : false) || re.test(value)) && isValid;
            // check for number or email
            if (isValid) {
                this.setState({ isPhone_Number: /^\d+$/.test(value) });
            }
        }
        return isValid;
    }
    handleChangeRoute = name => event => {
        if (name === "age") {
            this.props.history && this.props.history.push(event.target.value);
        }
    }
    handleChange = event => {
        const updatedForm = {
            ...this.state.feedback_via_em_ph
        };
        const updatedFormElement = {
            ...updatedForm[event.target.name]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[event.target.name] = updatedFormElement;
        this.setState({ feedback_via_em_ph: updatedForm });
    };

    /* For Share feedback via policy number */
    handleChange2 = event => {
        const updatedForm = {
            ...this.state.feedback_via_policy_no
        };
        const updatedFormElement = {
            ...updatedForm[event.target.name]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[event.target.name] = updatedFormElement;
        this.setState({ feedback_via_policy_no: updatedForm });
        // console.log(event.target.value);
    };

    /* For Share feedback via policy number */
    handleChange3 = event => {
        const updatedForm = {
            ...this.state.feedback_anonymously
        };
        const updatedFormElement = {
            ...updatedForm[event.target.name]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[event.target.name] = updatedFormElement;
        this.setState({ feedback_anonymously: updatedForm });
        // console.log(event.target.value);
    };




    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    componentDidMount() {
        const vm = this;
        this.props.onCurrentComponent('Feedback.json');
        axios.get('/assets/json/Feedback.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
                console.log(error);
            })
        window.onclick = function (event) {
            if (!event.target.matches('.dropbtn')) {

                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }
    }
    componentWillUnmount() {
        window.onClick = null;
    }

    handleChangeRadio = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    OnShareYourViews = (event) =>{
        this.setState({
            shareYourViews: event.target.value
        })
    }

    onHandleSubmitMobile = () => {
        let mobileOrEmail = this.state.feedback_via_em_ph.ph_or_em.value
        axios.get(`${constants.apiRootURL}/connect-with-us/policy-info?mobileOrEmail=${mobileOrEmail}`)
        .then(response => {
            this.setState({
                fullName:response.data[0].name,
                phoneNumber:response.data[0].mobile,
                emailId:response.data[0].email,
                policyDetails:response.data,
                btnHide:false
            })
        }).catch(error => {
            this.setState({btnHide:true})
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

    OnSubmitFeedback = () => {
        let body = {
                "policyNo":this.state.feedback_via_em_ph.policy.value,
                "name":this.state.fullName,
                "email":this.state.emailId,
                "mobile":this.state.phoneNumber,
                "feedbackPurpose":this.state.purpose_feedback,
                "question1":this.state.query1,
                "question2":this.state.query2,
                "shareYourViews":this.state.shareYourViews
        }
        this.setState({ loadingBtn:true})
        axios.post(`${constants.apiRootURL}/connect-with-us/feedback`,body)
        .then(response => {
            if (response.status === 200){
                this.setState({
                    feedbackSnack:true,
                    loadingBtn:false
                })
            }
        }).catch(error => {
            this.setState({ loadingBtn:false})
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

    OnSubmitFeedbackViaPolicyNumber = () => {
        let body = {
                "policyNo":this.state.feedback_via_policy_no.policy_no.value,
                "name":this.state.fullName,
                "email":this.state.emailId,
                "mobile":this.state.phoneNumber,
                "feedbackPurpose":this.state.purpose_feedback,
                "question1":this.state.query1,
                "question2":this.state.query2,
                "shareYourViews":this.state.shareYourViews
          }
          this.setState({ loadingBtn:true})
        axios.post(`${constants.apiRootURL}/connect-with-us/feedback`,body)
        .then(response => {
            if (response.status === 200){
                this.setState({
                    feedbackSnack:true,
                    loadingBtn:false
                })
            }
        }).catch(error => {
            this.setState({ loadingBtn:false})
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

    handleChangeAnonymous = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    ToGetPolicyInfo = () =>{
        axios.get(`${constants.apiRootURL}/connect-with-us/policy-info/${this.state.feedback_via_policy_no.policy_no.value}`)
        .then(response => {
            this.setState({
                fullName:response.data.name,
                emailId:response.data.email,
                phoneNumber:response.data.mobile,
                feedback_via_policy_no: {
                    policy_no: {
                        value:  response.data.policyNo,
                        validation: {
                            isRequired: true,
                        },
                        valid: true,
                    }
                },
                btnHide:false
            })
        }).catch(error => {
            this.setState({  btnHide:true})
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

    handleDropDown() {
        console.log(document.getElementById("myDropdown").classList.toggle("show"));
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleNavChange = (event) => {
        this.setState({
            setPage: event.target.value
        })
        this.props.history.push(event.target.value);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className='feedback'>
                  <Snackbar
                  className={classes.snack}
                  anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                  }}
                  open={this.state.feedbackSnack}
                  onClose={() => this.setState({feedbackSnack:false})}
                  ContentProps={{
                  'aria-describedby': 'message-id',
                  }}
                  message={<span id="message-id">"Your Feedback request has been accepted"</span>}
              />
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
                <Helmet>
                    <title>Customer's Feedback on Health Insurance Service and plans</title>
                    <meta name="description" content="We welcome all the feedback from our existing customers about our health insurance plans &amp; services, which will guide us to serve more better in the future."/>
                </Helmet>
                <Container fluid={true} className='connect-container'>
                    <Row>
                        <Col md="3" className="contact-hidden-sm mui--hidden-xs">
                            <LeftPanel parentComponent='feedback' />
                        </Col>
                        <Col md="9" sm="12" xs="12" className="righ_contact_col" style={{ padding: 0 }}>
                            <div className='connect-dropdown mui--visible-xs-block mui--visible-sm-block'>
                                <Col xs={12} >
                                    <div className='mobile_select_menu margin1' >
                                        <Select className="mobile_select"
                                            onChange={this.handleNavChange}
                                            value={this.state.setPage}
                                        >
                                            <MenuItem value="/connect-with-us">Contact Us</MenuItem>
                                            <MenuItem value="/feedback">Share your Feedback</MenuItem>
                                            <MenuItem value="/complaints-grievances">Complains &amp; Grievances</MenuItem>

                                        </Select>
                                    </div>
                                </Col>
                            </div>
                            <div className="connect-with-us-container-image">
                                <img alt='connect-with-us' className='connect-with-us-image mui--hidden-xs mui--hidden-sm' src='/assets/feedback.jpg' />
                                <img alt='connect-with-us' className='connect-with-us-image mui--visible-xs-block' src='/assets/feedback_mobile.jpg' />
                                <div className="centered-text-feedback gbui-h5">We are thankful for customers who complain.As we still have the opportunity to make them happy.
                                </div>
                            </div>
                            {this.state.via_email_phn &&
                                <div className="contact_recommend_other_div">
                                    <h3 className="feedback_share">
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackSubHeadingPleaseShareYourRegisteredIdText : ''}
                                    </h3>
                                    <Col md="5">
                                        <FormControl
                                            fullWidth
                                            margin="dense"
                                            error={!this.state.feedback_via_em_ph.ph_or_em.valid}
                                            aria-describedby="reg_phn_email_error_text">
                                            <InputLabel
                                                htmlFor="email_phone">{this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackInputLabelRegisteredPhone : ''}</InputLabel>
                                            <Input
                                                id="email_phone"
                                                name="ph_or_em"
                                                onChange={this.handleChange}
                                                onBlur={this.handleChange} />
                                            {!this.state.feedback_via_em_ph.ph_or_em.valid &&
                                                <FormHelperText id="reg_phn_email_error_text">{this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackInputLabelHelperTextErrorMessagePleaseInputValidId : ''}</FormHelperText>}
                                        </FormControl>
                                        <p className="sfa">
                                            <span
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    this.setState({
                                                        via_email_phn: false,
                                                        via_anonymous: true,
                                                        via_policy_no: false,
                                                        form_share_via_email: false,
                                                        form_share_via_policy: false,
                                                        form_share_anonymous: false,
                                                    })
                                                }}>
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackUnderInputLinkShareFeedbackAnonymously : ''}
                                            </span>
                                            <span
                                                className="fvpn"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    this.setState({
                                                        via_email_phn: false,
                                                        via_anonymous: false,
                                                        via_policy_no: true,
                                                        form_share_via_email: false,
                                                        form_share_via_policy: false,
                                                        form_share_anonymous: false,
                                                    })
                                                }}>
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackUnderInputLinkFeedbackViaPolicyNumber : ''}
                                            </span>
                                        </p>
                                    </Col>
                                    <Col md="3">
                                        <div className="feedback_em_ph_btn_div"> 
                                        {this.state.btnHide ? 
                                            <ButtonLightSuccess disabled={! this.state.feedback_via_em_ph.ph_or_em.value} contentPink={true} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackButtonTextSubmit1 : ''} onClick={() => { this.onHandleSubmitMobile();this.setState({ form_share_via_email: true }); }} /> : null
                                        }
                                        </div>
                                    </Col>
                                    {this.state.form_share_via_email &&
                                        <div>
                                            <Col md={12}></Col>
                                            <Col md="3">
                                               <TextField
                                                    id="standard-number"
                                                    label={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackInputLabelFullName : ''}
                                                    value={this.state.fullName}
                                                    fullWidth
                                                    type="text"
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    margin="normal"
                                                />
                                            </Col>
                                            <Col md="3">
                                                {!this.state.isPhone_Number &&
                                                    <TextField
                                                        margin="normal"
                                                        value={this.state.phoneNumber}
                                                        label={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackInputLabelPhoneNumber : ''}
                                                        fullWidth 
                                                        InputLabelProps={{
                                                        shrink: true,
                                                        }} />
                                                }
                                                {this.state.isPhone_Number &&
                                                    <TextField
                                                        margin="normal"
                                                        value={this.state.emailId}
                                                        label={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackInputLabelEmailId : ''}
                                                        fullWidth 
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            }} />
                                                }
                                            </Col>
                                            <Col md="3">
                                                <FormControl fullWidth margin="dense">
                                                    <InputLabel htmlFor="select-policy">Select Policy</InputLabel>
                                                    <Select
                                                        value={this.state.feedback_via_em_ph.policy.value}
                                                        onChange={this.handleChange}
                                                        inputProps={{
                                                            name: 'policy',
                                                            id: 'select-policy',
                                                        }}
                                                    >
                                                        {this.state.policyDetails &&  this.state.policyDetails.map(policy =>
                                                            <MenuItem value={policy.policyNo}>{policy.policyNo}</MenuItem>
                                                        )}
                                                    </Select>
                                                </FormControl>
                                            </Col>
                                            <div className="poyf-1">
                                            <Col md={12} xs={12}>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">{this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackInputLabelPurposeOfYourFeedback : ''}</FormLabel>
                                                    <RadioGroup
                                                        name="purpose_feedback"
                                                        value={this.state.purpose_feedback}
                                                        onChange={this.handleChangeRadio}
                                                        row
                                                    >
                                                        <FormControlLabel value="buy" control={
                                                            <Radio classes={{
                                                                root: classes.root,
                                                                checked: classes.checked,
                                                            }} />
                                                        } label={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackRadioInputLabelBuy : ''} />
                                                        <FormControlLabel value="claim" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackRadioInputLabelClaim : ''} />
                                                        <FormControlLabel value="renew" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedBackRadioInputLabelRenew : ''} />
                                                        <FormControlLabel value="policy_servicing" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedBackRadioInputLabelPolicyServicing : ''} />
                                                    </RadioGroup>
                                                </FormControl>
                                                <div className="feedback_heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackSubheadingFeedback : ''}</div>
                                            </Col>
                                            </div>
                                             <Col md={12}>
                                            <div className="feedback_div">
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">{this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackInputLabelQuestion1 : ''}</FormLabel>
                                                    <RadioGroup
                                                        name="query1"
                                                        value={this.state.query1}
                                                        onChange={this.handleChangeRadio}
                                                        row
                                                    >
                                                        <FormControlLabel value="yes" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackRadioInputAnswer1LabelYes : ''} />
                                                        <FormControlLabel value="no" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackRadioInputAnswer1LabelNo : ''} />
                                                    </RadioGroup>
                                                </FormControl>
                                                <br />
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">{this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackInputLabelQuestion2 : ''}</FormLabel>
                                                    <RadioGroup
                                                        name="query2"
                                                        value={this.state.query2}
                                                        onChange={this.handleChangeRadio}
                                                        row
                                                    >
                                                        <FormControlLabel value="A small amount of effort" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackRadioInputAnswer2LabelOption1 : ''} />
                                                        <FormControlLabel value="An usual amount of effort " control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackRadioInputAnswer2LabelOption2 : ''} />
                                                        <FormControlLabel value="A lot of effort" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackRadioInputAnswer2LabelOption3 : ''} />
                                                    </RadioGroup>
                                                </FormControl><br />
                                                <h3 className="syv_heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackTextAriaLabelShareYourViews : ''}</h3>
                                                <Row>
                                                    <Col md="8">
                                                        <textarea rows="9" style={{ width: '100%', borderRadius: '4px' }} value={this.state.shareYourViews} onChange={this.OnShareYourViews}></textarea>
                                                        <div className="mui--hidden-md mui--hidden-lg mui--hidden-xl button_submit_feedback" >
                                                            { this.state.loadingBtn ? <div className="loading"></div> : null}
                                                            <ButtonLightSuccess contentPink={true} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackButtonTextSubmit2 : ''} />
                                                        </div>
                                                        <div className="mui--hidden-sm mui--hidden-xs button_submit_feedback" >
                                                        { this.state.loadingBtn ? <div className="loading"></div> : null}
                                                            <ButtonLightSuccess contentPink={true} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackButtonTextSubmit2 : ''} 
                                                              onClick={this.OnSubmitFeedback}/>
                                                        </div>

                                                    </Col>
                                                </Row>
                                            </div>
                                            </Col>
                                        </div>
                                    }
                                </div>
                            }

                            {/* For Feedback via policy no.*/}
                            {this.state.via_policy_no &&
                                <div className="contact_recommend_other_div">
                                    <h3 className="feedback_share">
                                        Please share your policy number we’ll automatically fetch your details
                                </h3>
                                    <Col md="5">
                                        <FormControl
                                            fullWidth
                                            margin="dense"
                                            error={!this.state.feedback_via_policy_no.policy_no.valid}
                                            aria-describedby="policy_no_error_text">
                                            <InputLabel
                                                htmlFor="policy_no">Registered Policy Number</InputLabel>
                                            <Input
                                                value={this.state.policyNo}
                                                id="policy_no"
                                                value={this.state.feedback_via_policy_no.policy_no.value}
                                                name="policy_no"
                                                onChange={this.handleChange2}
                                                onBlur={this.handleChange2} />
                                            {!this.state.feedback_via_policy_no.policy_no.valid &&
                                                <FormHelperText id="policy_no_error_text">Please enter a valid policy number</FormHelperText>}
                                        </FormControl>
                                        <p className="sfa">
                                            <span
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    this.setState({
                                                        via_email_phn: true,
                                                        via_anonymous: false,
                                                        via_policy_no: false,
                                                        form_share_via_email: false,
                                                        form_share_via_policy: false,
                                                        form_share_anonymous: false,
                                                    })
                                                }}>
                                                Feedback via Phone/Email
                                            </span>
                                            <span
                                                className="fvpn"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    this.setState({
                                                        via_email_phn: false,
                                                        via_anonymous: true,
                                                        via_policy_no: false,
                                                        form_share_via_email: false,
                                                        form_share_via_policy: false,
                                                        form_share_anonymous: false,
                                                    })
                                                }}>
                                                Share feedback anonmously
                                            </span>
                                        </p>
                                    </Col>
                                    <Col md="3">
                                        <div className="feedback_em_ph_btn_div">
                                            { this.state.btnHide ? 
                                            <ButtonLightSuccess contentPink={true} Text="Submit" disabled={! this.state.feedback_via_policy_no.policy_no.value}
                                             onClick={() => { this.setState({ form_share_via_policy: true });this.ToGetPolicyInfo();}} />
                                             : null }
                                        </div>
                                    </Col>
                                    <Col md={12}></Col>
                                    {this.state.form_share_via_policy &&
                                        <div className="form_share_via_email">
                                            {/* <Col md={12}> */}
                                            <Col md="3">
                                                <TextField
                                                    value={this.state.fullName}
                                                     InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    margin="normal"
                                                    label="Full Name"
                                                    fullWidth />
                                            </Col>
                                            <Col md="3">
                                                <TextField
                                                    value={this.state.emailId}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    margin="normal"
                                                    label="Email Id"
                                                    fullWidth />
                                            </Col>
                                            <Col md="3">
                                                <TextField
                                                    value={this.state.phoneNumber}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    margin="normal"
                                                    label="Phone Number"
                                                    fullWidth />
                                            </Col>
                                            {/* </Col> */}
                                            <div className="poyf-1">
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">Purpose Of Your Feedback</FormLabel>
                                                    <RadioGroup
                                                        aria-label="Purpose Of Your Feedback"
                                                        name="purpose_feedback"
                                                        value={this.state.purpose_feedback}
                                                        onChange={this.handleChangeRadio}
                                                        row
                                                    >
                                                        <FormControlLabel value="buy" control={
                                                            <Radio classes={{
                                                                root: classes.root,
                                                                checked: classes.checked,
                                                            }} />
                                                        } label="Buy" />
                                                        <FormControlLabel value="claim" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label="Claim" />
                                                        <FormControlLabel value="renew" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label="Renew" />
                                                        <FormControlLabel value="policy_servicing" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label="Policy Servicing" />
                                                    </RadioGroup>
                                                </FormControl>
                                                <div className="feedback_heading-2">Feedback</div>
                                            </div>
                                            <div className="feedback_div">
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">Question 1: Did we meet your expectations?</FormLabel>
                                                    <RadioGroup
                                                        aria-label="Question 1: Did we meet your expectations?"
                                                        name="query1"
                                                        value={this.state.query1}
                                                        onChange={this.handleChangeRadio}
                                                        row
                                                    >
                                                        <FormControlLabel value="yes" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label="Yes" />
                                                        <FormControlLabel value="no" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label="No" />
                                                    </RadioGroup>
                                                </FormControl>
                                                <br />
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">Question 2: How much effort did you personally have to put forth to handle your request?</FormLabel>
                                                    <RadioGroup
                                                        aria-label="Question 2: How much effort did you personally have to put forth to handle your request?"
                                                        name="query2"
                                                        value={this.state.query2}
                                                        onChange={this.handleChangeRadio}
                                                        row
                                                    >
                                                        <FormControlLabel value="option1" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label="A small amount of effort" />
                                                        <FormControlLabel value="option2" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label="An usual amount of effort" />
                                                        <FormControlLabel value="option3" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label=" A lot of effort" />
                                                    </RadioGroup>
                                                </FormControl><br />
                                                <h3 className="syv_heading">Share your views</h3>
                                                <Row>
                                                    <Col md="8">
                                                        <textarea rows="9" style={{ width: '100%', borderRadius: '4px' }} value={this.state.shareYourViews} onChange={this.OnShareYourViews}></textarea>
                                                        <div className="mui--hidden-md mui--hidden-lg mui--hidden-xl button_submit_feedback" >
                                                        { this.state.loadingBtn ? <div className="loading"></div> : null}
                                                            <ButtonLightSuccess contentPink={true} Text="Submit" onClick={() => this.OnSubmitFeedbackViaPolicyNumber()} />
                                                        </div>
                                                        <div className="mui--hidden-sm mui--hidden-xs button_submit_feedback" >
                                                        { this.state.loadingBtn ? <div className="loading"></div> : null}
                                                            <ButtonLightSuccess contentPink={true} Text="Submit"  onClick={() => this.OnSubmitFeedbackViaPolicyNumber()}/>
                                                        </div>

                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }

                            {/* For Feedback anonymously*/}
                            {this.state.via_anonymous &&
                                <div className="contact_recommend_other_div">
                                    <h3 className="feedback_share">
                                        It seems you want to share your feedback anonmously..
                                </h3>
                                    {
                                        <div className="form_share_via_email">
                                            <Col md="5">
                                                    <TextField
                                                        id="standard-number"
                                                        name='fullName'
                                                        label={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackInputLabelFullName : ''}
                                                        value={this.state.fullName}
                                                        onChange={this.handleChangeAnonymous}
                                                        fullWidth
                                                        type="text"
                                                        InputLabelProps={{
                                                        shrink: true,
                                                        }}
                                                        margin="normal"
                                                    />
                                                {/* <TextField
                                                    margin="dense"
                                                    label="Full Name"
                                                    fullWidth /> */}
                                                <p className="sfa">
                                                    <span
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => {
                                                            this.setState({
                                                                via_email_phn: true,
                                                                via_anonymous: false,
                                                                via_policy_no: false,
                                                                form_share_via_email: false,
                                                                form_share_via_policy: false,
                                                                form_share_anonymous: false,
                                                            })
                                                        }}>
                                                        Feedback via Phone/Email
                                                    </span>
                                                    <span
                                                        className="fvpn"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => {
                                                            this.setState({
                                                                via_email_phn: false,
                                                                via_anonymous: false,
                                                                via_policy_no: true,
                                                                form_share_via_email: false,
                                                                form_share_via_policy: false,
                                                                form_share_anonymous: false,
                                                            })
                                                        }}>
                                                        Feedback via policy number
                                                    </span>
                                                </p>
                                            </Col>
                                            <Col md="2">
                                                <TextField
                                                    margin="normal"
                                                    name='phoneNumber'
                                                    onChange={this.handleChangeAnonymous}
                                                    value={this.state.phoneNumber}
                                                    label={this.props.FetchedLanguage ? this.props.FetchedLanguage.FeedbackInputLabelPhoneNumber : ''}
                                                    fullWidth 
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }} />
                                            </Col>
                                            <Col md={12}>
                                                <div className="poyf">
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend">Purpose Of Your Feedback</FormLabel>
                                                        <RadioGroup
                                                            aria-label="Purpose Of Your Feedback"
                                                            name="purpose_feedback"
                                                            onChange={this.handleChangeRadio}
                                                            value={this.state.purpose_feedback}
                                                            row
                                                        >
                                                            <FormControlLabel value="buy" control={
                                                                <Radio classes={{
                                                                    root: classes.root,
                                                                    checked: classes.checked,
                                                                }} />
                                                            } label="Buy" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                            </Col>
                                            <Col md={12} style={{ padding: 0 }}>
                                                <div className="feedback_div">
                                                    <div className="feedback_heading">Feedback</div>
                                                    <br></br>
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend">Question 1: Did we meet your expectations?</FormLabel>
                                                        <RadioGroup
                                                            aria-label="Question 1: Did we meet your expectations?"
                                                            name="query1"
                                                            onChange={this.handleChangeRadio}
                                                            value={this.state.query1}
                                                            row
                                                        >
                                                            <FormControlLabel value="yes" control={<Radio classes={{
                                                                root: classes.root,
                                                                checked: classes.checked,
                                                            }} />} label="Yes" />
                                                            <FormControlLabel value="no" control={<Radio classes={{
                                                                root: classes.root,
                                                                checked: classes.checked,
                                                            }} />} label="No" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <br />
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend">Question 2: How much effort did you personally have to put forth to handle your request?</FormLabel>
                                                        <RadioGroup
                                                            aria-label="Question 2: How much effort did you personally have to put forth to handle your request?"
                                                            name="query2"
                                                            onChange={this.handleChangeRadio}
                                                            value={this.state.query2}
                                                            row
                                                        >
                                                            <FormControlLabel value="A small amount of effort" control={<Radio classes={{
                                                                root: classes.root,
                                                                checked: classes.checked,
                                                            }} />} label="A small amount of effort" />
                                                            <FormControlLabel value="An usual amount of effort" control={<Radio classes={{
                                                                root: classes.root,
                                                                checked: classes.checked,
                                                            }} />} label="An usual amount of effort" />
                                                            <FormControlLabel value="A lot of effort" control={<Radio classes={{
                                                                root: classes.root,
                                                                checked: classes.checked,
                                                            }} />} label="A lot of effort" />
                                                        </RadioGroup>
                                                    </FormControl><br />
                                                    <h3 className="syv_heading">Share your views</h3>

                                                    <Col md="8">
                                                        <textarea rows="9" style={{ width: '100%', borderRadius: '4px' }} value={this.state.shareYourViews} onChange={this.OnShareYourViews}></textarea>
                                                        <div className="mui--hidden-md mui--hidden-lg mui--hidden-xl button_submit_feedback" >
                                                        { this.state.loadingBtn ? <div className="loading"></div> : null}
                                                            <ButtonLightSuccess contentPink={true} Text="Submit" onClick={this.OnSubmitFeedback}/>
                                                        </div>
                                                        <div className="mui--hidden-sm mui--hidden-xs button_submit_feedback" >
                                                             { this.state.loadingBtn ? <div className="loading"></div> : null}
                                                            <ButtonLightSuccess contentPink={true} Text="Submit" onClick={this.OnSubmitFeedback}/>
                                                        </div>

                                                    </Col>
                                                </div>
                                            </Col>
                                        </div>
                                    }
                                </div>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
Feedback.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    CurrentLanguage: state.language.current_language,
    FetchedLanguage: state.language.lang_data,
});

const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Feedback))

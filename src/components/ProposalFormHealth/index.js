import React from 'react';
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import { connect } from 'react-redux'
import Panel from 'muicss/lib/react/panel'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import './proposal-form.css'
import HeaderPanels from '../Health-Quotes/PanelsHeaderHealth'
import ProposerDetails from './ProposerDetails'
import InsuredMembers from './InsuredMembers'
import Nominee from './Nominee'
import Contact from './ContactDetails'
import PaymentDetails from './PaymentDetails'
import PreviousInsurer from './PreviousInsurer'
import Pathlab from './Pathlab/index'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index'
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import constants from '../../constants/appConstants.json'
import MedicalHistory from './MedicalHistory'
import GeneralQuestions from './GeneralQuestions'
import _ from 'lodash'
import Snackbar from '@material-ui/core/Snackbar';
import Sticky from 'react-stickynode';

import PremiumBreakup from '../PremiumBreakupPopUp/index';

const styles = theme => ({
    snack: {
        marginTop: '6rem'
    },
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '15px 10px'
    },
    checkbox: {
        padding: '12px 10px 12px 28px',
        '&$checked': {
            color: '#ea0b4b',
        },
    },
    checked: {},
})
class ProposalFormHealth extends React.Component {
    state = {
        mobileAddOnDetails: false,
        openSnack: false,
        dialogueClose: false,
        step: 0,
        groupbimaPlatform: false,
        occupation: '',
        gender: '',
        relation: '',
        nomineeRelation: '',
        maritalStatus: '',
        salutation: '',
        stateList: '',
        preExistingDisease: {},
        policyTenure: 0,
        isProposalSummary: false,
        Questiondata: [],
        medicalHistory: [],
        GeneralQuestions: [],
        generalHistory: [],
        medicalHistoryMember: 'no',
        totalSteps: 7,
        willDisplayTehsil: false,
        loading: false,
        hideBuyButton: false,
        datePickers: [],
        education: {},
        textlimit: 0,
        footerid: 0,
        willDisplayStarHealthCityArea: false


    }

    PremiumBreakup = () => {
        this.props.onSelectPremium(true, 'PREMIUM_BREAKUP')
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    callloadFunWithLocal(crntPlan, inputForm) {
        const ageList = []
        inputForm.familyDetails.map(item => ageList.push(item.age))
        const data = {
            insurerId: crntPlan.insurerId,
            planCode: crntPlan.planCode,
            ageList
        }
        let params = {}
        if(token) {
            params = {
                headers: {
                    Authorization: `Bearer ${token}` //the token is a variable which holds the token
                }
            }
        }
        const token = localStorage.getItem('token')
        
        axios.post(`${constants.apiRootURL}/proposer/codes`, data, params)
            .then(res => {
                this.setState({
                    ...this.state,
                    occupation: res.data.occupation,
                    relation: res.data.relation,
                    gender: res.data.gender,
                    nomineeRelation: res.data.nomineeRelation,
                    maritalStatus: res.data.maritalStatus,
                    salutation: res.data.salutation,
                    stateList: res.data.stateList,
                    preExistingDisease: res.data.preExistingDiseaseCode,
                    datePickers: res.data.datePickers,
                    willDisplayTehsil: res.data.willDisplayTehsil,
                    education: res.data.education,
                    textlimit: res.data.validation.address.limit,
                    willDisplayStarHealthCityArea: res.data.willDisplayStarHealthCityArea
                })

                this.props.setMaritalStatusCodes(res.data.maritalStatus)
            })
            .catch(error => {
                console.log(error)
                if (error.response) {
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
                }

            })
        if (!this.props.history.location.state.proposalSummary) {
            const currentPlan = crntPlan
            const premiumDetails = {
                basePremium: currentPlan.basePremium,
                premiumAmount: currentPlan.premium,
                serviceTax: currentPlan.gst,
                premiumWithServiceTax: currentPlan.totalPremium
            }
            this.props.onPremiumFetch(premiumDetails)
        }

        axios.get(`${constants.apiRootURL}/proposer/policy-term/${crntPlan.insurerPlanId}`, params)
            .then(res => {
                this.setState({
                    ...this.state,
                    policyTenure: res.data
                })
            })
            .catch(error => {
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
        return true
    }
    callloadFun() {
        const token = localStorage.getItem('token')
        let params;
        if(token) {
        params = {
            headers: {
                Authorization: `Bearer ${token}` //the token is a variable which holds the token
            }
        }
    }
        axios.get(`${constants.apiRootURL}/proposer/policy-term/${this.props.currentPlan.insurerPlanId}`, params)
            .then(res => {
                this.setState({
                    ...this.state,
                    policyTenure: res.data
                })
            })
            .catch(error => {
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
        const ageList = []
        const inputForm = this.props.inputFormHealthData
        inputForm.familyDetails.map(item => ageList.push(item.age))
        const data = {
            insurerId: this.props.currentPlan.insurerId,
            planCode: this.props.currentPlan.planCode,
            ageList
        }
        axios.post(`${constants.apiRootURL}/proposer/codes`, data, {}, params)
            .then(res => {
                this.setState({
                    ...this.state,
                    occupation: res.data.occupation,
                    relation: res.data.relation,
                    gender: res.data.gender,
                    nomineeRelation: res.data.nomineeRelation,
                    maritalStatus: res.data.maritalStatus,
                    salutation: res.data.salutation,
                    stateList: res.data.stateList,
                    preExistingDisease: res.data.preExistingDiseaseCode,
                    willDisplayTehsil: res.data.willDisplayTehsil,
                    datePickers: res.data.datePickers,
                    education: res.data.education,
                    textlimit: res.data.validation.address.limit,
                    willDisplayStarHealthCityArea: res.data.willDisplayStarHealthCityArea
                })
                this.props.setMaritalStatusCodes(res.data.maritalStatus)
            })
            .catch(error => {
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
        if (!this.props.history.location.state.proposalSummary) {
            const currentPlan = this.props.currentPlan
            const premiumDetails = {
                basePremium: currentPlan.basePremium,
                premiumAmount: currentPlan.premium,
                serviceTax: currentPlan.gst,
                premiumWithServiceTax: currentPlan.totalPremium
            }
            this.props.onPremiumFetch(premiumDetails)
        }
        return true
    }

    componentWillMount() {
        console.log(this.props.history.location.state, 'props vvvvvvv')
        if (!this.props.history.location.state.proposalSummary) {
            localStorage.removeItem("proposerId")
        }
        const inputForm = JSON.parse(localStorage.getItem("inputForm"))
        const currentPlan = JSON.parse(localStorage.getItem("currentPlan"))
        // Check for Input Form Details of Health, if not then redirect to inputForm Health
        if (this.props.inputFormHealthData && this.props.inputFormHealthData.familyDetails) {
            if (this.props.location.state.proposalSummary ? this.props.history.location.state.proposalSummary : false) {
                this.setState({ isProposalSummary: this.props.history.location.state.proposalSummary })
                this.props.setStep(7)
            } else {
                this.props.setStep(0)
            }
            this.callloadFun()
            if (!this.props.location.state.proposalSummary) {
                this.getMedicalQuestions()
            }
        } else if (inputForm && currentPlan) {
            this.setState({ isProposalSummary: false })
            this.props.setStep(0)
            this.props.loadInputFormHealth(inputForm)
            this.props.setCurrentPlan(currentPlan)
            this.callloadFunWithLocal(currentPlan, inputForm)
            if (!this.props.location.state.proposalSummary) {
                this.getMedicalQuestionsLocal(inputForm, currentPlan)
            }
        } else {
            this.props.history.push("/")
        }
        if (this.props.location.state.proposalSummary) {
            // Load from local
            const generalHistory = JSON.parse(localStorage.getItem('generalHistory'))
            const generalQuestions = JSON.parse(localStorage.getItem('generalQuestions'))
            const medicalHistory = JSON.parse(localStorage.getItem('medicalHistory'))
            const medicalQuestions = JSON.parse(localStorage.getItem('medicalQuestions'))
            this.setState({
                medicalHistory,
                generalHistory,
                Questiondata: medicalQuestions,
                GeneralQuestions: generalQuestions
            })
        }

    }
    getMedicalQuestions() {
        const token = localStorage.getItem('token')
        const params = {
            headers: {
                Authorization: `Bearer ${token}` //the token is a variable which holds the token
            }
        }
        const vm = this;
        axios.get(`${constants.apiRootURL}/proposer/questions/${this.props.currentPlan.insurerId}/${this.props.currentPlan.planCode}`, {}, params)
            .then(res => {
                const medicalHistory = []
                const generalHistory = []
                this.props.inputFormHealthData.familyDetails.map(item => {
                    medicalHistory.push(_.cloneDeep(res.data.medicalHistoryQuestions))
                    generalHistory.push(_.cloneDeep(res.data.generalQuestions))
                }
                )
                this.setState({ medicalHistory, generalHistory })
                vm.setState({
                    Questiondata: res.data.medicalHistoryQuestions,
                    GeneralQuestions: res.data.generalQuestions
                })
            })
            .catch(error => {
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
                    this.props.history.push('/')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
    }
    getMedicalQuestionsLocal(inputForm, currentPlan) {
        const vm = this;
        const token = localStorage.getItem('token')
        const params = {
            headers: {
                Authorization: `Bearer ${token}` //the token is a variable which holds the token
            }
        }
        axios.get(`${constants.apiRootURL}/proposer/questions/${currentPlan.insurerId}/${currentPlan.planCode}`, {}, params)
            .then(res => {
                const medicalHistory = []
                const generalHistory = []
                inputForm.familyDetails.map(item => {
                    medicalHistory.push(_.cloneDeep(res.data.medicalHistoryQuestions))
                    generalHistory.push(_.cloneDeep(res.data.generalQuestions))
                }
                )
                this.setState({ medicalHistory, generalHistory })
                vm.setState({
                    Questiondata: res.data.medicalHistoryQuestions,
                    GeneralQuestions: res.data.generalQuestions
                })
            })
            .catch(error => {
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
                    this.props.history.push('/')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
    }
    handlePaymentRequest = () => {

        const proposerId = localStorage.getItem("proposerId")
        // const token=localStorage.getItem('token')
        // const params = {
        //     headers: {
        //         Authorization: `Bearer ${token}` //the token is a variable which holds the token
        //     }
        // }

        console.log(this.props.currentPlan.insurerId, 'this.props.currentPlan.insurerId')
        const url = `${constants.apiRootURL}/payment?proposalFormId=${this.props.premium ? proposerId : ''}&insurer=${this.props.currentPlan.insurerId}&identity=${localStorage.getItem('token')}`
        // localStorage.removeItem("proposerId")
        window.location = url
    }
    componentDidMount() {

        window.addEventListener("scroll", this.scrollWindow)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollWindow);
    }
    scrollWindow = () => {
        let footerid = document.querySelector('#footer_main_here')
        footerid && (footerid = footerid.offsetTop)
        this.setState({ footerid })
        }
        
    render() {
        const { classes } = this.props;
        const { footerid, willDisplayStarHealthCityArea } = this.state;

        return (
            <div className="parent-proposal-from-motor">
                {/* Content body */}
                {this.state.mobileAddOnDetails ?
                    <div>
                        <div className='mobileAddOnDetails'>
                            <Row>
                                <Col xs={12}>
                                    {/* BACK TO PROPOSAL FORM link */}
                                    <div className="back-link" onClick={() => this.setState({ mobileAddOnDetails: false })}>
                                        <img
                                            alt='back' src="/assets/back.png" />
                                        &nbsp;
                                        BACK TO PROPOSAL FORM
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <div className='plan-details gbui-label-2'>Plan Details</div>
                                </Col>
                            </Row>
                        </div>
                        <div className='mobileAddOnDetails-2' style={{ backgroundColor: '#ffffff',padding:'12px'}}>
                            <Row>
                                <Col xs={12}>
                                    {/* BACK TO PROPOSAL FORM link */}
                                    <div className="back-link" onClick={() => this.setState({ mobileAddOnDetails: false })}>
                                        <img
                                            alt='back' src="/assets/back.png" />
                                        &nbsp;
                                        BACK TO PROPOSAL FORM
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <img src={`${constants.mediaBucketURL}/${this.props.currentPlan && this.props.currentPlan.insurerLogo}`} alt="insurer" />
                                </Col>
                                <Col xs={12}>
                                    <p className="package-name gbui-body-1">
                                        {this.props.currentPlan && this.props.currentPlan.planName}
                                    </p>
                                    <p
                                        className="plan-details gbui-caption-1" style={{ color: '#ea0b4b' }}
                                        onClick={() => { this.Coverage(); this.props.history.push("/health-quotes", { insurer: this.props.currentPlan }) }}>Plan Details</p>
                                    <p>
                                        <hr />
                                    </p>
                                </Col>
                                <Col xs={12}>
                                    <div className="addon-heading gbui-body-2" style={{ fontWeight: 'bold' }}>POLICY TENURE</div>
                                </Col>
                                <Col xs={6}>
                                    <p className="addon-name gbui-body-1">Policy Term</p>
                                </Col>
                                <Col xs={6}>
                                    <p className="addon-price gbui-body-1" style={{ textAlign: 'right' }}>1 Year</p>
                                </Col>
                                <Col xs={12}>
                                    <div className="addon-heading gbui-body-2" style={{ fontWeight: 'bold' }}>ADD ONS</div>
                                </Col>
                                <Col xs={12}>
                                    <div className="addon-div">
                                        {(this.props.currentPlan && this.props.currentPlan.addOns) ? <React.Fragment>
                                            {this.props.currentPlan.addOns.map(adn =>
                                                adn.checked && <Row>
                                                    <Col xs="6">
                                                        <p className="addon-name gbui-body-1">{adn.name}</p>
                                                    </Col>
                                                    <Col xs="6">
                                                        <p className="addon-price gbui-menu-bar-2" style={{ fontWeight: 'bold', textAlign: 'right' }}>Rs. {adn.amount} </p>
                                                    </Col>
                                                </Row>
                                            )}
                                        </React.Fragment> : ''}
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <div className="addon-heading gbui-body-2" style={{ fontWeight: 'bold' }}>PREMIUM</div>
                                </Col>
                                <Col xs={12}>
                                    <Row>
                                        <Col xs="6">
                                            {!this.props.isProposalSummary && <React.Fragment>
                                                <p className="premium-name gbui-body-1" style={{ color: '#000000' }}>Base Premium</p>
                                                <p className="premium-name gbui-body-1" style={{ color: '#000000' }}>Package Premium</p>
                                                <p className="premium-name gbui-body-1" style={{ color: '#000000' }}>GST@18%</p>
                                            </React.Fragment>
                                            }
                                            <p className="premium-name gbui-body-1">Total Premium</p>
                                        </Col>
                                        <Col xs="6">
                                            {!this.props.isProposalSummary && <React.Fragment><p className="premium-price gbui-menu-bar-2"
                                                style={{ fontWeight: 'bold', textAlign: 'right' }}>Rs. {this.props.premium ? this.props.premium.basePremium : 'NA'} </p>
                                                <p className="premium-price gbui-menu-bar-2"
                                                    style={{ fontWeight: 'bold', textAlign: 'right' }}>Rs. {this.props.premium ? Math.round(this.props.premium.premiumAmount) : 'NA'} </p>
                                                <p className="premium-price gbui-menu-bar-2"
                                                    style={{ fontWeight: 'bold', textAlign: 'right' }}>Rs. {this.props.premium ? Math.round(this.props.premium.serviceTax) : 'NA'} </p>
                                            </React.Fragment>}
                                            <p className="premium-price gbui-menu-bar-2" style={{ textAlign: 'right' }}><span
                                                style={{ fontWeight: 'bold' }}>Rs. {this.props.premium ? this.props.premium.premiumWithServiceTax : 'NA'}<span>/year</span></span> </p>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12}>
                                    <p style={{ float: 'right', color: '#ea0b4b' }} className="total-premium-heading"><span onClick={this.PremiumBreakup}>Full Premium Breakup</span></p>
                                    {this.props.model_id === 'PREMIUM_BREAKUP' ?
                                        <PremiumBreakup closeMethod={(value) => () => { this.setState({ PremiumBreakup: value }) }} plan={this.props.currentPlan ? { ...this.props.currentPlan } : {}} /> : null
                                    }
                                </Col>
                                <Col xs={12}>
                                    <hr />
                                </Col>
                                <Col xs={5}>
                                    <p className="cover-type-heading" style={{ color: '#000000' }}>Coverage Type:</p>
                                    <p className="cover-type-heading" style={{ color: '#000000' }}>Cover Value:</p>
                                    <p className="cover-type-heading" style={{ color: '#000000' }}>Policy Term :</p>
                                    <p className="cover-type-heading" style={{ color: '#000000' }}>Existing Disease after:</p>
                                    <p className="cover-type-heading" style={{ color: '#000000' }}>No Claim Bonus:</p>
                                    <p className="cover-type-heading" style={{ color: '#000000' }}>Medical Test Required:</p>
                                </Col>
                                <Col xs={7}>
                                    <p className="cover-type-value" style={{ textAlign: 'right' }}>{this.props.currentPlan && this.props.currentPlan.coverageType}</p>
                                    <p className="cover-type-value" style={{ textAlign: 'right' }}>Rs {this.props.currentPlan && this.props.currentPlan.sumInsured || "NA"}</p>
                                    <p className="cover-type-value" style={{ textAlign: 'right' }}>1 year</p>
                                    <p className="cover-type-value" style={{ textAlign: 'right' }}>{this.props.currentPlan && this.props.currentPlan.preExistingDisease}</p>
                                    <p className="cover-type-value" style={{ textAlign: 'right' }}>{this.props.currentPlan && this.props.currentPlan.noClaimBonus || 'NA'}</p>
                                    <p className="cover-type-value" style={{ textAlign: 'right' }}>{this.props.currentPlan && this.props.currentPlan.medicalTestRequired || 'NA'}</p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    :
                    <div className="proposal-form-body">
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

                        {/* BAck to quotes link */}
                        <div className="back-link">
                            <Link to="/quote-listing-health"><img
                                alt='back' src="/assets/back.png" /></Link>
                            &nbsp;
                           BACK TO QUOTES
                    </div>

                        {/* Car quote details heading */}
                        <h3 className="car-quote-details-heading">Proposal Form</h3>
                        {/* Header Panels */}
                        <HeaderPanels history={this.props.history} />

                        {/* Steppers heading */}
                        <div className="stepper-headings">
                            <p className={"active-success"}>Fill Details</p>
                            <p className={"disable"}>Review &amp; Pay</p>
                            <p className={"disable"}>View Policy</p>
                        </div>
                        <p className="small-guide-line">
                            Just fill in the proposal form and we’ll setup your policy purchase
                    </p>

                        {/* Divide the columns */}
                         
                        <div className="rightPanel">
                            
                            <div className="mui--hidden-xs mui--hidden-sm" style={{ backgroundColor: '#ffffff', padding: '20px 0px' }}>
                                <Sticky enabled={true} top={50}
                                    bottomBoundary={footerid}
                                >
                                    <React.Fragment>
                                        <div className="sticky-width-payment">
                                            <PaymentDetails
                                                history={this.props.history}
                                                loading={this.state.loading}
                                                isProposalSummary={this.state.isProposalSummary}


                                            />
                                            <div style={{ margin: '10px 0px' }}><Divider /></div>
                                            {((this.props.step >= 5 && this.state.hideBuyButton) || this.state.isProposalSummary) && <div><div>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                classes={{ root: classes.checkbox, checked: classes.checked, }}
                                                                checked={this.state.groupbimaPlatform}
                                                                onChange={this.handleChange('groupbimaPlatform')}
                                                                value="false" />
                                                        }
                                                        label="I agree to the Terms & Conditions of the policy. Also I agree to receive notifications(calls, sms & emails) from Groupbima."
                                                    />
                                                </FormGroup>
                                            </div>
                                                <div style={{ padding: '0px 15px' }}>
                                                    <ButtonLightSuccess
                                                        style={{ display: 'inline' }}
                                                        fullWarningPink={true}
                                                        Text='Proceed to Payment'
                                                        onClick={this.handlePaymentRequest}
                                                        disabled={!this.state.groupbimaPlatform || !this.state.dialogueClose} />
                                                </div>
                                            </div>}
                                            <br /><br />
                                        </div>
                                    </React.Fragment>
                                </Sticky>
                            </div>
                            </div>
                            <div className="leftPanel">
                            
                                {/* Owner Details */}
                                <ProposerDetails
                                    gender={this.state.gender}
                                    salutation={this.state.salutation}
                                    proffession={this.state.occupation}
                                    maritalStatus={this.state.maritalStatus}
                                    policyTenure={this.state.policyTenure}
                                    step={this.props.step}
                                    datePickers={this.state.datePickers}
                                    isProposalSummary={this.state.isProposalSummary}
                                    totalSteps={this.state.totalSteps}
                                    education={this.state.education} />

                                {/* Personal Details */}
                                <InsuredMembers
                                    step={this.props.step}
                                    preExistingDisease={this.state.preExistingDisease}
                                    salutation={this.state.salutation}
                                    proffession={this.state.occupation}
                                    gender={this.state.gender}
                                    relation={this.state.relation}
                                    maritalStatus={this.state.maritalStatus}
                                    insurer={this.props.currentPlan}
                                    datePickers={this.state.datePickers}
                                    isProposalSummary={this.state.isProposalSummary}
                                    totalSteps={this.state.totalSteps}
                                    textlimit={this.state.textlimit}
                                />

                                <GeneralQuestions
                                    step={this.props.step}
                                    isProposalSummary={this.state.isProposalSummary}
                                    Questiondata={this.state.GeneralQuestions}
                                    medicalHistory={this.state.generalHistory}
                                    onUpdateQuestion={(GeneralQuestions) => { this.setState({ GeneralQuestions }) }}
                                    onUpdateMedicalHistory={(generalHistory) => { this.setState({ generalHistory }) }}
                                    isMedicalHistory={(medicalHistoryMember) => { this.setState({ medicalHistoryMember }) }}
                                    totalSteps={this.state.totalSteps}
                                    onLoading={(loading) => { this.setState({ loading }); this.forceUpdate() }}
                                    loading={this.state.loading} />
 
                                {/*this.state.medicalHistoryMember === "yes" */ true && <MedicalHistory
                                    step={this.props.step}
                                    isProposalSummary={this.state.isProposalSummary}
                                    Questiondata={this.state.Questiondata}
                                    medicalHistory={this.state.medicalHistory}
                                    onUpdateQuestion={(Questiondata) => { this.setState({ Questiondata }) }}
                                    onUpdateMedicalHistory={(medicalHistory) => { this.setState({ medicalHistory }) }}
                                    totalSteps={this.state.totalSteps} />}
                                {/* Previous Policy Details */}
                                <Nominee
                                    step={this.props.step}
                                    nomineeRelation={this.state.nomineeRelation}
                                    isProposalSummary={this.state.isProposalSummary}
                                    totalSteps={this.state.totalSteps} />

                                {/* Previous Insurer Details */}
                                {this.props.currentPlan.showPreviuousInsurance && <PreviousInsurer
                                    step={this.props.step}
                                    isProposalSummary={this.state.isProposalSummary}
                                    totalSteps={this.state.totalSteps} />}

                                {/* Vehicle Details */}
                                <Contact
                                    dialogueClose={(value) => this.setState({ dialogueClose: value })}
                                    step={this.props.step}
                                    // eligibleForPremedical={(value) => {this.setState({eligible:value}); console.log(value,'value')}}
                                    history={this.props.history}
                                    stateList={this.state.stateList}
                                    insurer={this.props.currentPlan}
                                    isProposalSummary={this.state.isProposalSummary}
                                    totalSteps={this.state.totalSteps}
                                    paymentButtonHide={(value) => this.setState({ hideBuyButton: value })}
                                    willDisplayTehsil={this.state.willDisplayTehsil}
                                    loadProposalSummary={(isProposalSummary) => this.setState({ isProposalSummary })}
                                    textlimit={this.state.textlimit}
                                    willDisplayStarHealthCityArea={willDisplayStarHealthCityArea}
                                />
                                {/* Pathology Details */}
                                {this.state.isProposalSummary &&
                                    <Pathlab
                                        dialogueClose={(value) => this.setState({ dialogueClose: value })}
                                        step={this.props.step}
                                        premedical={this.props.history.location.state}
                                        totalSteps={this.state.totalSteps}
                                    />
                                }
                                {this.state.isProposalSummary &&
                                <div  className='panel-div mui--visible-xs-block mui--visible-sm-block'>
                                     <div className="details-addon" style={{margin:'20px 0px'}}>Details & Add-Ons <KeyboardArrowUp style={{ marginBottom: '-8px' }} 
                                        onClick={()=> {this.setState({mobileAddOnDetails:true}); window.scrollTo(0, 0);}}/>
                                    </div>
                    
                                     <FormGroup className='formgb'>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    classes={{ root: classes.checkbox, checked: classes.checked, }}
                                                    checked={this.state.groupbimaPlatform}
                                                    onChange={this.handleChange('groupbimaPlatform')}
                                                    value="false" />
                                            }
                                            label="I agree to the Terms & Conditions of the policy. Also I agree to receive notifications(calls, sms & emails) from Groupbima."
                                        />
                                    </FormGroup>
                                    <ButtonLightSuccess
                                        style={{ display: 'inline' }}
                                        smallWarningPink={true}
                                        Text='Confirm and Next'
                                        onClick={this.handlePaymentRequest}
                                        disabled={!this.state.groupbimaPlatform || !this.state.dialogueClose} />
                                </div>}
                             
                            </div>
                           
                       
                    </div>}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    premiumBreakup: state.popup.premium_breakup_modal,
    model_id: state.popup.model_id,
    step: state.proposal_form_motor.stepH,
    inputFormHealthData: state.inputFormHealth.inputFormHealthData,
    premium: state.premium.details ? state.premium.details : {},
    currentPlan: state.currentPlan.details ? state.currentPlan.details : {}
})

const mapDispatchToProps = dispatch => ({
    onSelectPremium: (premium, model_id) => dispatch({ type: 'PREMIUM_BREAKUP_MODAL', premium, model_id }),
    setStep: (step) => dispatch({ type: 'SET_STEP_H', step }),
    onPremiumFetch: (data) => dispatch({ type: 'PREMIUM_DETAILS', data }),
    loadInputFormHealth: (data) => dispatch({ type: 'INPUT_FORM_HEALTH', data }),
    setCurrentPlan: (plan) => dispatch({ type: 'CURRENT_PLAN', plan }),
    setMaritalStatusCodes: (data) => dispatch({ type: 'MARITAL_STATUS_CODES', data })
})
ProposalFormHealth.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProposalFormHealth))
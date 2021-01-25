import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import './index.css';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess';
import axios from 'axios';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import classNames from 'classnames';
import Drawer from '../Shared/Drawer/index';
import Divider from '@material-ui/core/Divider';
import constants from '../../constants/appConstants.json'
import MemberDetails from '../Pre-medical-required/Member-details-model/index'
import Rightcard from '../Help/feedbackRatings/index'
import Snackbar from '@material-ui/core/Snackbar';


const styles = theme => ({
    snack: {
        marginTop: '6rem'
    },
    card: {
        minWidth: 275,
    },
    CardContent: {
        padding: '16px 8px',
    },
    fabMedical: {
        backgroundColor: '#ea0b4b',
        height: '26px',
        minHeight: '26px',
        fontFamily: 'Nunito',
        fontSize: '12px',
        textTransform: 'capitalize',
        color: '#ffffff',
        outline: '#ffffff',
        '&:hover': {
            backgroundColor: '#ea0b4b',
            outline: '#ffffff',
        },
    },
    fab: {
        backgroundColor: '#0da176',
        top: 'auto',
        right: 10,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#0da176',
        },
    },
    fab1: {
        backgroundColor: '#0da176',
        top: 'auto',
        right: 10,
        bottom: '16rem',
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#0da176',
        },
    },
    fab2: {
        backgroundColor: '#0da176',
        top: 'auto',
        right: 10,
        bottom: '11rem',
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#0da176',
        },
    },
    fab3: {
        backgroundColor: '#0da176',
        top: 'auto',
        right: 10,
        bottom: '6rem',
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#0da176',
        },
    },
    fabClose: {
        backgroundColor: '#878787',
        top: 'auto',
        right: 10,
        bottom: 0,
        left: 'auto',
        marginBottom: '1rem',
        position: 'fixed', '&:hover': {
            backgroundColor: '#878787',
        },
    },
    panel: {
        marginTop: '3rem',
        marginLeft: '1rem',
        marginBottom: '1rem',
        borderRadius: '2px',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
    },
    panel2: {
        marginTop: '0rem',
        marginLeft: '1rem',
        marginBottom: '1rem',
        borderRadius: '2px',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
    },
    Typography: {
        fontFamily: 'Nunito',
        fontSize: '14px',
        fontWeight: '600',
        color: '#000000',
    },
    panelSummary: {
        padding: '0 24px 0 12px',
        display: 'inline-block'
    },
    heading: {
        fontFamily: 'Nunito',
        fontSize: '16px',
        color: '#ffffff',
    },
    expensionPanelMember: {
        boxShadow: 'none'
    },
    memberPanelSummary: {
        padding: '0',
    },
    memberPanelDetails: {
        margin: '0px'
    }
});



class TrackYourPolicyStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSnack: false,
            proposalform: {},
            showFab: false,
            mobileView: false,
            policyDetails: {},
            MemberData: {},
            InsuredMemberDetails: {},

        }
    }
    showFab = () => {
        this.setState({
            showFab: true
        })
    }
    hideFab = () => {
        this.setState({
            showFab: false
        })
    }

    viewDetailsPanel = (panelId) => {
        this.setState({
            expanded: panelId
        })
    }

    hideDetailsPanel = (panelId) => {
        this.setState({
            expanded: !panelId
        })
    }
    componentWillMount() {
        let token = localStorage.getItem('token')
        let config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        axios.get(`${constants.apiRootURL}/secure/track-your-policy`, config)
            .then(response => {
                this.setState({
                    policyDetails: response.data,
                })
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
        axios.get(`${constants.apiRootURL}/secure/member-details/`, config)
            .then(response => {
                this.setState({
                    MemberData: response.data,
                    InsuredMemberDetails: response.data.insuredMembersList,
                })
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
        axios.get(`${constants.apiRootURL}/secure/my-proposal-form`, config)
            .then(response => {
                this.setState({
                    proposalform: response.data
                })
                this.setState({
                    MemberData: response.data,
                    InsuredMemberDetails: response.data.insuredMembersList,
                })
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

        const vm = this;
        this.props.onCurrentComponent('TrackYourPolicy.json');
        axios.get('/assets/json/TrackYourPolicy.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {

            })
        if (window.innerWidth <= 544) {
            this.setState({ mobileView: true })
        }
        window.addEventListener("resize", () => {
            if (window.innerWidth <= 544) {
                vm.setState({
                    mobileView: true
                })
            }
            else {
                vm.setState({ mobileView: false })
            }
        });
    }
    OnHandleMedicalTestRecord = () => {
        let token = localStorage.getItem('token')
        const vm = this;
        let config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        axios.get(`${constants.apiRootURL}/secure/my-medical-test-record`, config)
            .then(response => {
                //    this.setState({
                //     policyDetails:response.data
                //    })

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

    onClickMemberDetails = () => {
        this.props.onMemberDetails(true);
        this.setState({ proposalModal: true })
    }


    makePayment = () => {
        // this.props.onMakePaymentShow();
    }
    statusOnMobile = (index) => {
        this.setState({ 
            statusOnMobile: true ,
            mobilePanelId: index
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider>
                <div className='PolicyStatusContainer'>
                    <Container fluid={true}>
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
                            <Col md={2} lg={2} className='mui--hidden-xs mui--hidden-sm'>
                                <Drawer variant="permanent" authenticate={true} />
                            </Col>
                            <Col md={10} >
                                <Col md={8} lg={8} xs={12} className='insurancePolicyContainer'>
                                    {this.state.proposalModal &&
                                        <MemberDetails
                                            proposalform={this.state.proposalform}
                                            history={this.props.history}
                                            open={this.state.proposalModal}
                                            InsuredMemberDetails={this.state.InsuredMemberDetails}
                                            MemberData={this.state.MemberData} />
                                    }


                                    {/*  track your policy status  (Mobile-View)*/}

                                    <Col md={8} xs={5} className='mui--hidden-xs'>
                                        <div className='Policy'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.TrackYourPolicyPolicyStatusHeading : ''}</div>
                                    </Col>
                                    {!this.state.policyDetails.length > 0 ?
                                        <Col md={12} xs={12} >
                                            <div className="AddFamilyDetails">
                                                <img src="assets/addMember.svg" className='AddVehicleDetailsPic' alt='AddVehicleDetails' />
                                                <div className='NoFamily'>No policy available for the tracking</div>
                                            </div>
                                        </Col>
                                        : <div>
                                            {this.state.mobileView && <div>
                                                <Col xs={12} className='mui--visible-xs-block' style={{padding:'0'}}>
                                                    <Col xs={12}><div className="PolicyStatus" onClick={() => this.setState({mobileView:false,MakePaymentShow:false})}>Policy Status</div></Col>
                                                    {this.state.policyDetails.map((policyDetails, index) =>
                                                        <div>
                                                            <Col xs={12}>
                                                                {(!this.props.MakePaymentShow && !this.state.statusOnMobile) &&
                                                                    <Card className={classNames(classes.card, 'insuranceCard')}>
                                                                        <CardContent className={classes.CardContent}>
                                                                            <Typography className={classes.Typography}>
                                                                                Pre-medical checkup for health {policyDetails.premedicalCheckupFor}
                                                                            </Typography>
                                                                            <div className='statusText'>Status: Medical check-up {policyDetails.status}</div>
                                                                            {(policyDetails.status === 'ACCEPTED') &&
                                                                                <div className='checkDetails'>
                                                                                    <ButtonLightSuccess onClick={this.statusOnMobile} Text='Check all details and Pay' smallWarningPink={true} />
                                                                                </div>
                                                                            }
                                                                            {(policyDetails.status === 'PENDING' || policyDetails.status === 'ASSIGNED' ||
                                                                                policyDetails.status === 'SCHEDULED' || policyDetails.status === 'TEST_COMPLETED') &&
                                                                                <div className='checkDetails'>
                                                                                    <ButtonLightSuccess onClick={() => this.statusOnMobile(index)} Text='Check all details' fullPinkContent={true} />
                                                                                </div>
                                                                            }
                                                                        </CardContent>
                                                                    </Card>}
                                                            </Col>
                                                            {!this.props.MakePaymentShow && this.state.statusOnMobile && <div>
                                                                {(policyDetails.status === 'TEST_COMPLETED') &&
                                                                    <Col xs={12}>
                                                                        <div className="premedical-done">
                                                                            Your premedical check up has been done but the decision on Policy Issuance is pending from Insurance Company.
                                                                        </div>
                                                                    </Col>}
                                                                <Col xs={12}>
                                                                    <Col xs={4} className='member-column'><div className="LeftCol">{this.props.FetchedLanguage ? this.props.FetchedLanguage.TrackYourPolicyStatusHeading : ''}</div></Col>
                                                                    <Col xs={8} className='member-column'><div className="RightCol" style={{ color: '#333333' }}>{policyDetails.status}</div></Col>
                                                                    {(policyDetails.status === 'TEST_COMPLETED') && <div>
                                                                        <Col xs={8} className='member-column'><div className="LeftCol">Medical Test Completed on</div></Col>
                                                                        <Col xs={4} className='member-column'><div className="RightCol">12 Mar 2019</div></Col>
                                                                    </div>}
                                                                    {(policyDetails.status === 'ACCEPTED') && <div>
                                                                        <Col xs={8} className='member-column'><div className="LeftCol">Medical Test Accepted On</div></Col>
                                                                        <Col xs={4} className='member-column'><div className="RightCol">12 Mar 2019</div></Col>
                                                                    </div>}
                                                                    {(policyDetails.status === 'REJECTED') && <div>
                                                                        <Col xs={8} className='member-column'><div className="LeftCol">Medical Test Rejected On</div></Col>
                                                                        <Col xs={4} className='member-column'><div className="RightCol">12 Mar 2019</div></Col>
                                                                    </div>}
                                                                    <Col xs={5} className='member-column'><div className="LeftCol">Transaction Number</div></Col>
                                                                    <Col xs={7} className='member-column'><div className="RightCol">{policyDetails.transactionNo}</div></Col>
                                                                    <Col xs={6} className='member-column'><div className="LeftCol">Proposal Form</div></Col>
                                                                    <Col xs={6} className='member-column'><div className="RightCol" style={{ color: '#ea0b4b' }}
                                                                        onClick={this.onClickMemberDetails}>See your proposal form</div></Col>
                                                                    {(policyDetails.status === 'ACCEPTED' || policyDetails.status === 'REJECTED') && <div>
                                                                        <Row className='member-column'>
                                                                            <Col xs={4}><div className="LeftCol">Insurer</div></Col>
                                                                            <Col xs={8}><div className="RightCol">{policyDetails.insurerName}</div></Col>
                                                                        </Row>
                                                                        <Row className='member-column'>
                                                                            <Col xs={4}><div className="LeftCol">Plan Name</div></Col>
                                                                            <Col xs={8}><div className="RightCol">{policyDetails.planName}</div></Col>
                                                                        </Row>
                                                                        <Row className='member-column'>
                                                                            <Col xs={4}><div className="LeftCol">Medical Test Record</div></Col>
                                                                            <Col xs={8}><div className="RightCol" style={{ color: '#ea0b4b' }} onClick={this.OnHandleMedicalTestRecord}>See medical test record</div></Col>
                                                                        </Row>
                                                                        <Row className='member-column'>
                                                                            <Col xs={4}><div className="LeftCol">Premium Amount(including GST)</div></Col>
                                                                            <Col xs={8}><div className="RightCol">Rs. {policyDetails.premium}
                                                                        {/* <div style={{ fontFamily: 'Source Sans Pro', fontSize: '8px', color: '#940016' }}>10% insurer increased the price</div> */}
                                                                            </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>}
                                                                    {/* {(this.state.policyDetails.status === 'ACCEPTED') && <div>
                                                                        <Col xs={12} className='member-column'>
                                                                            <div className="premedical-done" style={{ fontSize: '16px' }}>
                                                                                There is some loading charges for your policy so please pay to proceed
                                                                                    </div>
                                                                        </Col>
                                                                        <Col xs={12} className='member-column'>
                                                                            <div className='make-payment-button'>
                                                                                <ButtonLightSuccess Text='Make Payment' midWarningPink={true} />
                                                                            </div>
                                                                        </Col>
                                                                    </div>} */}
                                                                    {(policyDetails.status === 'REJECTED') && <div>
                                                                        <Col xs={12} className='member-column'>
                                                                            <div className="premedical-done" style={{ fontSize: '16px' }}>
                                                                                Your premedical checkup has been rejected by the insurance company.
                                                                                The policy amount will be refunded in 24 hrs in the same account through which payment was initiated.
                                                                            </div>
                                                                        </Col>
                                                                    </div>}

                                                                    {(policyDetails.status === 'PENDING' || policyDetails.status === 'ASSIGNED' ||
                                                                        policyDetails.status === 'SCHEDULED' || policyDetails.status === 'TEST_COMPLETED') &&
                                                                        <Col xs={12} className='member-column'><div className="medical-required">Medical Test Required</div></Col>
                                                                    }
                                                                </Col>
                                                                <Col xs={12}>
                                                                    {(policyDetails.status === 'PENDING' || policyDetails.status === 'ASSIGNED' ||
                                                                        policyDetails.status === 'SCHEDULED' || policyDetails.status === 'TEST_COMPLETED') && <div>
                                                                            <Col xs={12} className='member-column'>
                                                                                {policyDetails.medicalTestRequiredFor.map((member, index) =>
                                                                                    <ExpansionPanel className={classNames(classes.expensionPanelMember)} expanded={this.state.expanded === index}>
                                                                                        <ExpansionPanelSummary classes={{ root: classes.memberPanelSummary, content: classes.memberPanelDetails }}>
                                                                                            <Col xs={12} className='member-column member-details'>
                                                                                                <Col xs={6} className='member-column member-details'><div className="member">Member {index + 1}</div></Col>
                                                                                                <Col xs={6} className='member-column member-details'><div className="member-name">{member.memberName}</div></Col>
                                                                                                {!(this.state.expanded === index) && <Col md={12} className='member-column member-details'><div className="view-detail"
                                                                                                onClick={() => this.viewDetailsPanel(index)}>View in Detail</div></Col>}                                                                                                <Col xs={12} className='member-column member-details'><Divider /></Col>
                                                                                            </Col>
                                                                                        </ExpansionPanelSummary>
                                                                                        <ExpansionPanelDetails className={classes.memberPanelSummary}>
                                                                                            <Col xs={12} className='member-column member-details'>
                                                                                                {(policyDetails.status === 'PENDING' || policyDetails.status === 'ASSIGNED' ||
                                                                                                    policyDetails.status === 'SCHEDULED') && <div>
                                                                                                        <Col xs={6} className='member-column member-details'><div className="member">Name</div></Col>
                                                                                                        <Col xs={6} className='member-column member-details'><div className="member-name">{member.memberName}</div></Col>
                                                                                                        <Col xs={6} className='member-column member-details'><div className="member">Status</div></Col>
                                                                                                        <Col xs={6} className='member-column member-details'><div className="member-name">{member.status}</div></Col>
                                                                                                        <Col xs={3} className='member-column member-details'><div className="member">Medical Test Required</div></Col>
                                                                                                        <Col xs={9} className='member-column member-details'>
                                                                                                            {member.premedicalTests.map((test) =>
                                                                                                                <div className="member-name">{test}</div>
                                                                                                            )}
                                                                                                        </Col>
                                                                                                        <Col xs={6} className='member-column member-details'><div className="member">Gender</div></Col>
                                                                                                        <Col xs={6} className='member-column member-details'><div className="member-name">{member.gender}</div></Col>
                                                                                                        <Col xs={6} className='member-column member-details'><div className="member">Pincode</div></Col>
                                                                                                        <Col xs={6} className='member-column member-details'><div className="member-name">{member.pincode}</div></Col>
                                                                                                    </div>}
                                                                                                {(policyDetails.status === 'ASSIGNED' || policyDetails.status === 'SCHEDULED') && <div>
                                                                                                    <Col xs={6} className='member-column member-details'><div className="member">Pathlab Name</div></Col>
                                                                                                    <Col xs={6} className='member-column member-details'><div className="member-name">{member.pathLabName}</div></Col>
                                                                                                    <Col xs={6} className='member-column member-details'><div className="member">Address</div></Col>
                                                                                                    <Col xs={6} className='member-column member-details'><div className="member-name">{member.pathLabAddress}</div></Col>
                                                                                                    <Col xs={6} className='member-column member-details'><div className="member">Phone</div></Col>
                                                                                                    <Col xs={6} className='member-column member-details'><div className="member-name">{member.pathLabPhone}</div></Col>
                                                                                                </div>
                                                                                                }
                                                                                                {(policyDetails.status === 'SCHEDULED' || policyDetails.status === 'ACCEPTED') && <div>
                                                                                                    <Col xs={6} className='member-column member-details'><div className="member">Appointment Date</div></Col>
                                                                                                    <Col xs={6} className='member-column member-details'><div className="member-name">13 Mar 2019</div></Col>
                                                                                                    <Col xs={6} className='member-column member-details'><div className="member">Appointment Time</div></Col>
                                                                                                    <Col xs={6} className='member-column member-details'><div className="member-name">12:00 PM</div></Col>
                                                                                                </div>
                                                                                                }
                                                                                                   {(this.state.expanded === index) && <Col md={12} className='member-column member-details'><div className="view-detail"
                                                                                            onClick={() => this.hideDetailsPanel(index)}>View Less Details</div></Col>}
                                                                                            </Col>
                                                                                        </ExpansionPanelDetails>
                                                                                    </ExpansionPanel>
                                                                                )}
                                                                            </Col>
                                                                        </div>}
                                                                </Col>
                                                            </div>}
                                                        </div>)}
                                                </Col>
                                            </div>}
                                            {/*  track your policy status  (Mobile-View)*/}



                                            {/* if track your policy status  (Desktop-View)*/}
                                            {!this.props.mobileView || this.props.MakePaymentShow ?
                                                <Col md={12} className='mui--hidden-xs mui--hidden-sm'>
                                                    {this.state.policyDetails.map(policyDetails =>
                                                        <ExpansionPanel defaultExpanded className='expandedPanel mui--hidden-xs'>
                                                            <ExpansionPanelSummary style={{ display: 'inlineBlock' }}
                                                                className={classNames('panelSummary', 'mui--hidden-xs', 'mui--hidden-sm')}
                                                                expandIcon={<ExpandMoreIcon />}>
                                                                <Typography className={classes.Typography}>Pre-medical checkup for health {policyDetails.premedicalCheckupFor}</Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails className='expandedPanelDetails' style={{ display: 'block' }}>
                                                                <Row >
                                                                    {(policyDetails.status === 'TEST_COMPLETED') &&
                                                                        <Col md={12}>
                                                                            <div className="premedical-done">
                                                                                Your premedical check up has been done but the decision on Policy Issuance is pending from Insurance Company.
                                                                            </div>
                                                                        </Col>
                                                                    }
                                                                    <Col md={12} className='member-column member-details'>
                                                                        <Col md={6} className='member-column '>
                                                                            <div className="member">Status</div>
                                                                            <div className="member">Transaction Number</div>
                                                                            <div className="member">Proposal Form</div>
                                                                            {(policyDetails.status === 'ACCEPTED' || policyDetails.status === 'REJECTED') && <div>
                                                                                <div className="member">Insurer</div>
                                                                                <div className="member">Plan Name</div>
                                                                                <div className="member">Medical Test Record</div>
                                                                                <div className="member">Premium Amount(including GST)</div>
                                                                            </div>}
                                                                        </Col>
                                                                        <Col md={6} className='member-column '>
                                                                            <div className="member-name">{policyDetails.status}</div>
                                                                            <div className="member-name">{policyDetails.transactionNo}</div>
                                                                            <div className="member-name" style={{ color: '#ea0b4b' }} onClick={this.onClickMemberDetails}>See your proposal form</div>
                                                                            {(policyDetails.status === 'ACCEPTED' || policyDetails.status === 'REJECTED') && <div>
                                                                                <div className="member-name">{policyDetails.insurerName}</div>
                                                                                <div className="member-name">{policyDetails.planName}</div>
                                                                                <div className="member-name" style={{ color: '#ea0b4b' }} onClick={this.OnHandleMedicalTestRecord}>See medical test record</div>
                                                                                <div className="member-name">Rs. {policyDetails.premium}
                                                                                    {/* <div style={{ fontFamily: 'Source Sans Pro', fontSize: '10px', color: '#940016' }}>10% insurer increased the price</div> */}
                                                                                </div>
                                                                            </div>}
                                                                        </Col>
                                                                        {/* <Col md={12}>
                                                                            {(policyDetails.status === 'ACCEPTED') && <div>
                                                                            <Col md={12} className='member-column'>
                                                                                <div className="premedical-done" style={{ fontSize: '16px' }}>
                                                                                    There is some loading charges for your policy so please pay to proceed
                                                                                    </div>
                                                                            </Col>
                                                                            <Col md={12} className='member-column' style={{textAlign:'-webkit-center'}}>
                                                                                <div className='make-payment-button'>
                                                                                    <ButtonLightSuccess Text='Make Payment' midWarningPink={true} />
                                                                                </div>
                                                                            </Col>
                                                                        </div>}
                                                                    </Col> */}
                                                                    </Col>
                                                                    {policyDetails.medicalTestRequiredFor &&
                                                                        <Col md={12} className='member-column'><div className="medical-required">Medical Test Required</div></Col>}
                                                                    {/* members-info */}
                                                                    <Col md={12} className='member-column'>
                                                                        {policyDetails.medicalTestRequiredFor ? policyDetails.medicalTestRequiredFor.map((member, index) =>
                                                                            <ExpansionPanel className={classNames(classes.expensionPanelMember)} expanded={this.state.expanded === index}>
                                                                                <ExpansionPanelSummary classes={{ root: classes.memberPanelSummary, content: classes.memberPanelDetails }}>
                                                                                    <Col md={12} className='member-column member-details'>
                                                                                        <Col md={6} className='member-column member-details'><div className="member">Member {index + 1}</div></Col>
                                                                                        <Col md={6} className='member-column member-details'><div className="member-name">{member.memberName}</div></Col>
                                                                                        {!(this.state.expanded === index) && <Col md={12} className='member-column member-details'><div className="view-detail"
                                                                                            onClick={() => this.viewDetailsPanel(index)}>View in Detail</div></Col>}
                                                                                        <Col md={12} className='member-column member-details'><Divider /></Col>
                                                                                    </Col>
                                                                                </ExpansionPanelSummary>
                                                                                <ExpansionPanelDetails className={classes.memberPanelSummary}>
                                                                                    <Col md={12} className='member-column member-details'>
                                                                                        {(policyDetails.status === 'PENDING' || policyDetails.status === 'ASSIGNED' ||
                                                                                            policyDetails.status === 'SCHEDULED') && <div>
                                                                                                <Col md={6} className='member-column member-details'><div className="member">Name</div></Col>
                                                                                                <Col md={6} className='member-column member-details'><div className="member-name">{member.memberName}</div></Col>
                                                                                                <Col md={6} className='member-column member-details'><div className="member">Status</div></Col>
                                                                                                <Col md={6} className='member-column member-details'><div className="member-name">{member.status}</div></Col>
                                                                                                <Col md={3} className='member-column member-details'><div className="member">Medical Test Required</div></Col>
                                                                                                <Col md={9} className='member-column member-details'>
                                                                                                    {member.premedicalTests.map((test) =>
                                                                                                        <div className="member-name">{test}</div>
                                                                                                    )}
                                                                                                </Col>
                                                                                                <Col md={6} className='member-column member-details'><div className="member">Gender</div></Col>
                                                                                                <Col md={6} className='member-column member-details'><div className="member-name">{member.gender}</div></Col>
                                                                                                <Col md={6} className='member-column member-details'><div className="member">Pincode</div></Col>
                                                                                                <Col md={6} className='member-column member-details'><div className="member-name">{member.pincode}</div></Col>
                                                                                            </div>}
                                                                                        {(policyDetails.status === 'ASSIGNED' || policyDetails.status === 'SCHEDULED') && <div>
                                                                                            <Col md={3} className='member-column member-details'><div className="member">Pathlab Name</div></Col>
                                                                                            <Col md={9} className='member-column member-details'><div className="member-name">{member.pathLabName}</div></Col>
                                                                                            <Col md={6} className='member-column member-details'><div className="member">Address</div></Col>
                                                                                            <Col md={6} className='member-column member-details'><div className="member-name">{member.pathLabAddress}</div></Col>
                                                                                            {member.pathLabPhone !== null && <div>
                                                                                                <Col md={6} className='member-column member-details'><div className="member">Phone</div></Col>
                                                                                                <Col md={6} className='member-column member-details'><div className="member-name">{member.pathLabPhone}</div></Col>
                                                                                            </div>}
                                                                                        </div>}
                                                                                        {(policyDetails.status === 'SCHEDULED' || policyDetails.status === 'ACCEPTED') && <div>
                                                                                            <Col md={6} className='member-column member-details'><div className="member">Appointment Date</div></Col>
                                                                                            <Col md={6} className='member-column member-details'><div className="member-name">13 Mar 2019</div></Col>
                                                                                            <Col md={6} className='member-column member-details'><div className="member">Appointment Time</div></Col>
                                                                                            <Col md={6} className='member-column member-details'><div className="member-name">12:00 PM</div></Col>
                                                                                        </div>}
                                                                                        {(this.state.expanded === index) && <Col md={12} className='member-column member-details'><div className="view-detail"
                                                                                            onClick={() => this.hideDetailsPanel(index)}>View Less Details</div></Col>}
                                                                                    </Col>
                                                                                </ExpansionPanelDetails>
                                                                            </ExpansionPanel>
                                                                        ) : null}
                                                                    </Col>


                                                                    {/* {(this.state.policyDetails.status === 'TEST_COMPLETED') && <div>
                                                        <Col md={6} className='member-column'><div className="LeftCol">Medical Test Completed on</div></Col>
                                                        <Col md={6} className='member-column'><div className="RightCol">12 Mar 2019</div></Col>
                                                    </div>}
                                                    {(this.state.policyDetails.status === 'ACCEPTED') && <div>
                                                        <Col md={6} className='member-column'><div className="LeftCol">Medical Test Accepted on</div></Col>
                                                        <Col md={6} className='member-column'><div className="RightCol">12 Mar 2019</div></Col>
                                                    </div>}
                                                    {(this.state.policyDetails.status === 'REJECTED') && <div>
                                                        <Col md={6} className='member-column'><div className="LeftCol">Medical Test Rejected on</div></Col>
                                                        <Col md={6} className='member-column'><div className="RightCol">12 Mar 2019</div></Col>
                                                    </div>}
                                                    {(this.state.policyDetails.status === 'ACCEPTED' || this.state.policyDetails.status === 'REJECTED') && <div>
                                                        <Col md={6} className='member-column'><div className="LeftCol">Insurer</div></Col>
                                                        <Col md={6} className='member-column'><div className="RightCol">Bharti AXA</div></Col>
                                                        <Col md={6} className='member-column'><div className="LeftCol">Plan Name</div></Col>
                                                        <Col md={6} className='member-column'><div className="RightCol">Bharti AXA some poliy name</div></Col>
                                                        <Col md={6} className='member-column'><div className="LeftCol">Medical Test Record</div></Col>
                                                        <Col md={6} className='member-column'><div className="RightCol" style={{ color: '#ea0b4b' }} onClick={this.OnHandleMedicalTestRecord}>See medical test record</div></Col>
                                                        <Col md={6} className='member-column'><div className="LeftCol">Premium Amount(including GST)</div></Col>
                                                        <Col md={6} className='member-column'><div className="RightCol">Rs. 12345
                                                                <div style={{ fontFamily: 'Source Sans Pro', fontSize: '10px', color: '#940016' }}>10% insurer increased the price</div>
                                                        </div>
                                                        </Col>
                                                    </div>}
                                                    {(this.state.policyDetails.status === 'TEST_COMPLETED') &&
                                                        <Col md={12}>
                                                            <div className="premedical-done">
                                                                Your premedical check up has been done but the decision on Policy Issuance is pending from Insurance Company.
                                                            </div>
                                                        </Col>
                                                    }
                                                    {(this.state.policyDetails.status === 'ACCEPTED') && <div>
                                                        <Col md={12} className='member-column'>
                                                            <div className="premedical-done" style={{ fontSize: '16px' }}>
                                                                There is some loading charges for your policy so please pay to proceed
                                                                </div>
                                                        </Col>
                                                        <Col md={12} className='member-column'>
                                                            <div className='make-payment-button'>
                                                                <ButtonLightSuccess Text='Make Payment' midWarningPink={true} />
                                                            </div>
                                                        </Col>
                                                    </div>}
                                                    {(this.state.policyDetails.status === 'REJECTED') && <div>
                                                    <Col xs={12} className='member-column'>
                                                        <div className="premedical-done" style={{ fontSize: '16px' }}>
                                                            Your premedical checkup has been rejected by the insurance company.
                                                            The policy amount will be refunded in 24 hrs in the same account through which payment was initiated.
                                                        </div>
                                                    </Col>
                                                </div>}
                                                    {(this.state.policyDetails.status === 'PENDING' || this.state.policyDetails.status === 'ASSIGNED' ||
                                                        this.state.policyDetails.status === 'SCHEDULED' || this.state.policyDetails.status === 'TEST_COMPLETED') &&
                                                        <Col md={12} className='member-column'><div className="medical-required">Medical Test Required</div></Col>
                                                    }

                                                    {(this.state.policyDetails.status === 'PENDING' || this.state.policyDetails.status === 'ASSIGNED' ||
                                                        this.state.policyDetails.status === 'SCHEDULED' || this.state.policyDetails.status === 'TEST_COMPLETED') && <div>
                                                            <Col md={12} className='member-column'>
                                                                {this.state.policyDetails.medicalTestRequiredFor ? this.state.policyDetails.medicalTestRequiredFor.map((member, index) =>
                                                                    <ExpansionPanel className={classNames(classes.expensionPanelMember)}>
                                                                        <ExpansionPanelSummary classes={{ root: classes.memberPanelSummary, content: classes.memberPanelDetails }}>
                                                                            <Col md={12} className='member-column member-details'>
                                                                                <Col md={6} className='member-column member-details'><div className="member">Member {index + 1}</div></Col>
                                                                                <Col md={6} className='member-column member-details'><div className="member-name">{member.memberName}</div></Col>
                                                                                <Col md={12} className='member-column member-details'><div className="view-detail">View in Detail</div></Col>
                                                                                <Col md={12} className='member-column member-details'><Divider /></Col>
                                                                            </Col>
                                                                        </ExpansionPanelSummary>
                                                                        <ExpansionPanelDetails className={classes.memberPanelSummary}>
                                                                            <Col md={12} className='member-column member-details'>
                                                                                {(this.state.policyDetails.status === 'PENDING' || this.state.policyDetails.status === 'ASSIGNED' ||
                                                                                    this.state.policyDetails.status === 'SCHEDULED') && <div>
                                                                                        <Col md={6} className='member-column member-details'><div className="member">Name</div></Col>
                                                                                        <Col md={6} className='member-column member-details'><div className="member-name">{member.memberName}</div></Col>
                                                                                        <Col md={6} className='member-column member-details'><div className="member">Status</div></Col>
                                                                                        <Col md={6} className='member-column member-details'><div className="member-name">{member.status}</div></Col>
                                                                                        <Col md={3} className='member-column member-details'><div className="member">Medical Test Required</div></Col>
                                                                                        <Col md={9} className='member-column member-details'>
                                                                                        {member.premedicalTests.map((test) =>
                                                                                            <div className="member-name">{test}</div>

                                                                                        )}
                                                                                        </Col>
                                                                                        <Col md={6} className='member-column member-details'><div className="member">Gender</div></Col>
                                                                                        <Col md={6} className='member-column member-details'><div className="member-name">{member.gender}</div></Col>
                                                                                        <Col md={6} className='member-column member-details'><div className="member">Pincode</div></Col>
                                                                                        <Col md={6} className='member-column member-details'><div className="member-name">{member.pincode}</div></Col>
                                                                                    </div>}
                                                                                {(this.state.policyDetails.status === 'ASSIGNED' || this.state.policyDetails.status === 'SCHEDULED') && <div>
                                                                                    <Col md={3} className='member-column member-details'><div className="member">Pathlab Name</div></Col>
                                                                                    <Col md={9} className='member-column member-details'><div className="member-name">{member.pathLabName}</div></Col>
                                                                                    <Col md={6} className='member-column member-details'><div className="member">Address</div></Col>
                                                                                    <Col md={6} className='member-column member-details'><div className="member-name">{member.pathLabAddress}</div></Col>
                                                                                    {member.pathLabPhone !== null && <div>
                                                                                        <Col md={6} className='member-column member-details'><div className="member">Phone</div></Col>
                                                                                        <Col md={6} className='member-column member-details'><div className="member-name">{member.pathLabPhone}</div></Col>
                                                                                    </div>}
                                                                                </div>}
                                                                                {(this.state.policyDetails.status === 'SCHEDULED' || this.state.policyDetails.status === 'ACCEPTED') && <div>
                                                                                    <Col md={6} className='member-column member-details'><div className="member">Appointment Date</div></Col>
                                                                                    <Col md={6} className='member-column member-details'><div className="member-name">13 Mar 2019</div></Col>
                                                                                    <Col md={6} className='member-column member-details'><div className="member">Appointment Time</div></Col>
                                                                                    <Col md={6} className='member-column member-details'><div className="member-name">12:00 PM</div></Col>
                                                                                </div>}
                                                                            </Col>
                                                                        </ExpansionPanelDetails>
                                                                    </ExpansionPanel>
                                                                ) : null}
                                                            </Col>
                                                           
                                                        </div>} */}
                                                                </Row>
                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>)}
                                                    </Col>
                                                : null}
                                        </div>}
                                </Col>
                                <Col md={4} xs={12} className='rightcard' >
                                    <Rightcard />
                                </Col>
                            </Col>

                        </Row>

                        {/* if track your policy status  (Desktop-View)*/}
                    </Container>
                    {/* {!this.props.MakePaymentShow && <div>
                        {!this.state.showFab &&
                            <Fab onClick={this.showFab} aria-label="Add" className={classes.fab}>
                                <img class="group-chat" src='/assets/groupChat.svg' alt='group-chat' />
                            </Fab>}
                        {this.state.showFab && <div>
                            <div className='chat'>
                                <Fab onClick={this.showFab} aria-label="Add" className={classes.fab1}>
                                    <img class="faq" src='/assets/faq.svg' alt='faq' />
                                </Fab>
                            </div>
                            <div className='chat'>
                                <Fab onClick={this.showFab} aria-label="Add" className={classes.fab2}>
                                    <img class="chat" src='/assets/chat.svg' alt='chat' />
                                </Fab>
                            </div>
                            <div className='chat'>
                                <Fab onClick={this.showFab} aria-label="Add" className={classes.fab3}>
                                    <img class="call" src='/assets/call.svg' alt='call' />
                                </Fab>
                            </div>
                            <div className='chat'>
                                <Fab onClick={this.hideFab} aria-label="Add" className={classes.fabClose}>
                                    <i class="material-icons" style={{ color: '#ffffff' }}>
                                        close
                                    </i>
                                </Fab>
                            </div>
                        </div>
                        }
                    </div>} */}
                </div>
            </MuiThemeProvider>
        )
    }
}

TrackYourPolicyStatus.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    CurrentLanguage: state.language.current_language,
    FetchedLanguage: state.language.lang_data,
    MakePaymentShow: state.AddVehicleDetail.make_payment_show,
});

const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
    onMakePaymentShow: () => dispatch({ type: 'MAKEPAYMENT_SHOW' }),
    onMemberDetails: (member) => dispatch({ type: 'MEMBER_DETAIL_VISIBLE', member }),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TrackYourPolicyStatus));
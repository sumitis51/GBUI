import React, { Component, Fragment } from 'react'
import Paper from '@material-ui/core/Paper';
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rightcard from '../Help/feedbackRatings/index'
import Drawer from '../Shared/Drawer/index';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import './index.css'
import Button from '@material-ui/core/Button';
import PremiumBreakup from '../PremiumBreakupPopUp/index';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import constants from '../../constants/appConstants.json'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NetworkHospitals from '../QuoteListingHealth/pathlab-view-modal/index'
import Snackbar from '@material-ui/core/Snackbar';




const styles = theme => ({
    snack:{
        marginTop:'6rem'
    },
    papers: {
        padding: '1rem',
    },
    contentBtn: {
        backgroundColor: '#ffffff',
        color: '#ea0b4b',
        fontSize: '14px',
        border: '1px solid #ea0b4b',
        fontFamily: 'Nunito',
        textTransform: 'Capitalize'
    },
    filledBtn: {
        backgroundColor: '#ea0b4b',
        color: '#ffffff',
        fontSize: '14px',
        fontFamily: 'Nunito',
        textTransform: 'Capitalize',
        minWidth: 112
    },
    tabRoot: {
        minWidth: '12.5%',
    },
    tabLabel: {
        fontSize: '16px',
        color: '#333333',
        fontFamily: 'Nunito',
        textTransform: 'capitalize',
    },
    tabsIndicator: {
        backgroundColor: '#ea0b4b',
    },
});


const RawHTML = ({ children, className = "" }) =>
    <div className={className}
        dangerouslySetInnerHTML={{ __html: children }} />

class customerDashboard extends Component {
    state = {
        //    page :  dashboard,memberDetails,policyDetails
        page: 'dashboard',
        openSnack:false,
        premedicalStatus: '',
        policyDetails: {},
        policyDescription: {},
        keyFeatureDeatils: [],
        MemberData: {},
        insurerData: [],
        memberDetails: {},
        value: 0,
        listTab: 0,
        NetworkHospitals: false,
        tabValues: [
            { id: 0, value: 'Self' },
            { id: 1, value: 'Spouse' },
            { id: 2, value: 'Son:18yrs' },
            { id: 3, value: 'Son:21yrs' },
            { id: 4, value: 'Father' },
            { id: 5, value: 'Mother' },
            { id: 6, value: 'Father in Law' },
            { id: 7, value: 'Mother in Law' }
        ],
        memberDetails2: [],
        memberDetails: [
            {
                key: 'city',
                value: 'Member name',
                display: 'Name:'
            },
            {
                key: 'relationship',
                value: 'Self',
                display: 'Relationship:'
            },
            {
                key: 'height',
                value: '5 ft 9 inch',
                display: 'Height:'
            },
            {
                key: 'gender',
                value: 'Male',
                display: 'Gender:'
            },
            {
                key: 'dob',
                value: '15-Mar-1994',
                display: 'Date of Birth(DOB):'
            },
            {
                key: 'weight:',
                value: '75 Kgs',
                display: 'Weight:'
            },
        ],
        personalHabits: [
            {
                key: 'sleeping',
                value: '7-8 Hours',
                display: 'Sleeping hours(in a day):'
            },
            {
                key: 'walking',
                value: '6kms ',
                display: 'Kms you walk(in a day):'
            },
            {
                key: 'smoke',
                value: '7 units daily from sept, 2008 ',
                display: 'Smoke(in a day):'
            },
            {
                key: 'alchoholic',
                value: '60 ml weekly from sept, 2008',
                display: 'Alcohol(in a day):'
            },
        ],
        NomineeDetails: [
            {
                key: 'relationToNominee',
                value: 'Member name',
                display: 'Relationship to Nominee:'
            },
            {
                key: 'nameOfNominee',
                value: 'Member Name',
                display: 'Name of Nominee:'
            },
        ],
        PreviosInsurerDetails: [
            {
                key: 'previousInsurer',
                value: 'Yes',
                display: 'Previous Insurance?'
            },
            {
                key: 'previousInsurerName',
                value: 'Kotak Insurance',
                display: 'Previous Insurer Name:'
            },
            {
                key: 'previousPOlicyNumber',
                value: '123456789098765432',
                display: 'Previous Policy Number:'
            },
        ],
        contactDetails: [
            {
                key: 'communicationAddress',
                value: 'Something something something Something something something Something something something something something something something',
                display: 'Communication Address:'
            },
            {
                key: 'pinCode',
                value: '282001',
                display: 'Pincode:'
            },
            {
                key: 'mobile',
                value: '9876543210',
                display: 'Mobile Number:'
            },
            {
                key: 'city',
                value: 'Agra',
                display: 'City:'
            },
            {
                key: 'email',
                value: 'johndoe@email.com',
                display: 'Email Id:'
            },
            {
                key: 'state',
                value: 'Uttar Pradesh',
                display: 'State:'
            },
            {
                key: 'phone',
                value: '0562-2234111',
                display: 'Phone Number:'
            },
        ],
        policyDetails2: [
            {
                key: 'policyNumber',
                value: '-',
                display: 'Policy number :',
                css: {}
            },
            {
                key: 'policyPurchaseDate',
                value: '31 Dec 2018',
                display: 'Policy Purchase Date:',
                css: {}
            },
            {
                key: 'policyStartDate',
                value: '-',
                display: 'Policy Start Date:',
                css: {}
            },
            {
                key: 'policyEndDate',
                value: '-',
                display: 'Policy End Date:',
                css: {}
            },
            {
                key: 'policyTerm',
                value: '-',
                display: 'Policy Term',
                css: {}
            },
            {
                key: 'existingDiseaseAfter',
                value: '4 Years',
                display: 'Existing Disease after',
                css: {}
            },
            {
                key: 'roomRentEligibility',
                value: 'Rs. 3000/- limit',
                display: 'Room Rent Eligibility',
                css: {}
            },
            {
                key: 'noClaimBonus',
                value: '2 Lacs in 5 years',
                display: 'No Claim Bonus',
                css: {}
            },
            {
                key: 'premium',
                value: '₹ 4,414',
                display: 'Premium/Lac of SI',
                css: {}
            },
        ],
        keyFeature: [
            {
                key: 'hospitalization',
                value: 'Some awesome content here which describe heading.',
                display: 'Hospitalization',
            },
            {
                key: 'dayCare',
                value: 'Some awesome content here which describe heading.',
                display: 'Day Care Treatment Expenses',
            },
            {
                key: 'organDonor',
                value: 'Some awesome content here which describe heading.',
                display: ' Organ Donor Benefit',
                css: {}
            },
        ],
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    editPremiumBreakup = () => {
        this.props.onSelectPremium(true, 'cashless_hospital')
    }
    PremiumBreakup = () => {
        this.props.onSelectPremium(true, 'PREMIUM_BREAKUP')
    }
    handleClickPolicyDetails = (Id) => {
        this.setState({ 
            page: 'policyDetails',
            policyId:Id 
        })

        let token = localStorage.getItem('token')
        let config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        let policyId = Id
        axios.get(`${constants.apiRootURL}/secure/policy-details/${policyId}`, config)
        .then(response => {
            console.log(response.data.planDetails,'respone')
            this.setState({
                policyDetails: response.data.planDetails,
                keyFeatureDeatils: response.data.planDetails.keyFeatureList,
                premedicalStatus: response.data.premedicalStatus,
                policyDescription: response.data.policyDescription
                // MemberData: response.data
            })
            console.log(response.data)
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

    handleClickMemberDetails = (Id) => {
        this.setState({ 
            page: 'memberDetails' ,
            policyId:Id
        })

        let policyId = Id
        let token = localStorage.getItem('token')
        let config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        axios.get(`${constants.apiRootURL}/secure/member-details/${policyId}`, config)
        .then(response => {
            this.setState({
                InsuredMemberDetails: response.data.insuredMembersList,
                MemberData: response.data
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
    componentWillMount() {
        let token = localStorage.getItem('token')
        let config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        axios.get(`${constants.apiRootURL}/secure/my-policy`, config)
            .then(response => {               
                this.setState({
                    insurerData: response.data,
                })
            }).catch(error => {
                console.log(error,'error')
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
    render() {
        const { classes } = this.props;
        return (
            <div className='dashboard'>
                <Row className='dashboard-container'>
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
                    <Col md={2}>
                        <div className='mui--hidden-xs mui--hidden-sm'><Drawer variant="permanent" authenticate={true} /></div>
                    </Col>

                    {/* dashboard customer */}

                    {this.state.page === 'dashboard' &&
                        <Col md={10} className='dashboard-mid-container'>
                            <Col md={8}>
                                {/* <div class="md-stepper-horizontal orange">
                                    <div class="md-step active">
                                        <div class="md-step-circle"><span>1</span></div>
                                        <div class="md-step-title">Raised</div>
                                        <div class="md-step-bar-left"></div>
                                        <div class="md-step-bar-right"></div>
                                    </div>
                                    <div class="md-step active">
                                        <div class="md-step-circle"><span>2</span></div>
                                        <div class="md-step-title">Improved</div>

                                        <div class="md-step-bar-left"></div>
                                        <div class="md-step-bar-right"></div>
                                    </div>
                                    <div class="md-step active">
                                        <div class="md-step-circle"><span>3</span></div>
                                        <div class="md-step-title">Accept/Reject</div>
                                        <div class="md-step-bar-left"></div>
                                        <div class="md-step-bar-right"></div>
                                    </div>

                                </div> */}
                                <div className='policies gbui-menu-bar-1'>My Policies</div>
                                {this.state.insurerData ? this.state.insurerData.map(insurer => {
                                    return (
                                        <div className='policy-card'>
                                            <Paper className={classes.papers}>
                                                <Row>
                                                    <Col md={2}>
                                                        <div className='insurer-image'>
                                                            <img className='insurer' alt='insurer' src={`${constants.mediaBucketURL}/${insurer.insurerLogo}`} />
                                                        </div>
                                                    </Col>
                                                    <Col md={5}>
                                                        <div className='insurer-name gbui-subtitle-2'>
                                                            {insurer.planName}
                                                        </div>
                                                        {/* <div className='gb-rating gbui-caption-3' style={{ display: 'inline' }}>GB Rating:
                                                           <span style={{ display: 'inline', color: '#000000' }}>{insurer.gbRating}</span>
                                                            <i class="material-icons" style={{ display: 'inline', fontSize: '10px', color: '#efce4a' }}>
                                                                star_rate
                                                            </i>
                                                        </div> */}
                                                    </Col>
                                                    <Col md={5} className='btn-column'>
                                                        <div className='fab-yellow'>{insurer.policyStatus}</div>
                                                        {insurer.policyStatus === 'ACCEPTED' ?
                                                            <div className='track-policy-btn'>
                                                                <Button variant="outlined" className={classes.contentBtn}  > Download</Button>
                                                            </div>
                                                            :
                                                            <div className='track-policy-btn'>
                                                                <Link to='/track-your-policy'><Button variant="outlined" className={classes.contentBtn} onClick={() => { this.setState({ page: 'policyDetails' }) }} > Track Policy</Button></Link>
                                                            </div>}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={3}>
                                                        <div onClick={() => this.handleClickPolicyDetails(insurer.policyId)}
                                                            className='policy-link gbui-body-1' >Policy Details</div>
                                                    </Col>
                                                    <Col md={2} className='cover-column'>
                                                        <div className='policy-cover gbui-overline-1'>Hospitilization Cover</div>
                                                        <div className='cover-value gbui-subtitle-2'>₹ {insurer.sumInsured}</div>
                                                    </Col>
                                                    <Col md={2} className='cover-column'>
                                                        <div className='policy-cover gbui-overline-1'>Premium(Yearly)</div>
                                                        <div className='cover-value gbui-subtitle-2'>₹ {insurer.premium}</div>
                                                    </Col>
                                                    <Col md={2}>
                                                        <div >
                                                            <div
                                                                className='policy-cover gbui-overline-1'>Member Insured</div>
                                                            <div
                                                                className='cover-value gbui-subtitle-2' style={{ color: '#ea0b4b' }}
                                                                style={{ cursor: 'pointer' }} onClick={() => this.handleClickMemberDetails(insurer.policyId)} 
                                                                 >{insurer.noOfMembers} Members</div>
                                                        </div>
                                                    </Col>
                                                    <Col md={3} className='btn-column'>
                                                        <div className='help-btn'>
                                                            <Link to='/help'><Button variant="contained" className={classes.filledBtn} > Help</Button></Link>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Paper>
                                        </div>
                                    )
                                }) : "No Policies Found"}
                            </Col>
                            <Col md={4} className='right-column'>
                                <Rightcard />
                            </Col>
                        </Col>}
                    {/* member details */}
                    {
                        this.state.page === 'memberDetails' &&
                        <Col md={10} className='member-column'>
                            <Col md={12} xs={12}>
                                <i onClick={() => { this.setState({ page: 'dashboard' }) }} class="material-icons" style={{ color: '#ea0b4b', display: 'inline', verticalAlign: 'middle' }}>
                                    arrow_back
                                </i><div className='back gbui-body-2'>BACK TO DASHBOARD</div>
                            </Col>
                            <Col md={12} xs={12}>
                                <div className='policy-detail gbui-h6'>Member Details</div>
                            </Col>
                            <Col md={10} xs={12} className='policy-column'>
                                <div className='policy-card'>
                                    <Paper square={true} className={classes.papers}>
                                        <Row>
                                            <Col md={2} xs={4}>
                                                <div className='insurer-image'>
                                                    <img className='insurer' alt='insurer' src={`${constants.mediaBucketURL}/${this.state.MemberData.insurerLogo}`} />
                                                </div>
                                            </Col>
                                            <Col md={2} xs={8}>
                                                <div className='insurer-name gbui-subtitle-2'>
                                                    {this.state.MemberData.insurerName}
                                                </div>
                                                {/* <div className='gb-rating gbui-label-1  mui--visible-xs-block'>Customers/GB Rating:
                                                    <span style={{ color: '#000000' }}>4.6/4.7
                                                       <i class="material-icons" style={{ fontSize: '12px', color: '#efce4a' }}>
                                                            star_rate
                                                        </i>
                                                    </span>
                                                </div> */}
                                            </Col>
                                            <Col md={6} xs={12} className='btn-column-2'>
                                                <div className='fab-yellow' style={{ verticalAlign: 'inherit' }}>{this.state.MemberData.premedicalStatus}
                                                </div>
                                                <div className='track-policy-btn mui--hidden-xs'>
                                                    <Button variant="outlined" className={classes.contentBtn} 
                                                     onClick={() => this.handleClickPolicyDetails(this.state.policyId)}
                                                      >Policy Details</Button>
                                                </div>
                                            </Col>
                                            <Col md={2} className='btn-column-3 mui--hidden-xs'>
                                                <div className='help-btn-2'>
                                                    <Button variant="contained" className={classes.filledBtn}> Help</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Paper>
                                    <Paper square={true} className={classes.papers}>
                                        <Row className='member-row'>
                                            <Col md={6} xs={6}>
                                                <div className='insured-member gbui-h7'>Insured Members</div>
                                            </Col>
                                            <Col md={6} xs={6}>
                                                <Link to={{ pathname: '/proposal-pdf', state: this.state.MemberData }}><div className='download-link gbui-subtitle-3'>Download proposal form</div></Link>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='tab-div'>
                                                    <Tabs value={this.state.value} onChange={this.handleChange}
                                                        classes={{ root: classes.tabRoot, indicator: classes.tabsIndicator }}
                                                    >
                                                        {this.state.InsuredMemberDetails &&  this.state.InsuredMemberDetails.map(item => {
                                                            return (
                                                                <Tab classes={{ label: classes.tabLabel }} label={item.relationship} />
                                                            )
                                                        })}
                                                    </Tabs>
                                                </div>
                                            </Col>

                                            {this.state.InsuredMemberDetails && this.state.InsuredMemberDetails.map((item, index) =>
                                                index === this.state.value ?


                                                    <Col md={12} lg={12}>
                                                        <Col md={4} xs={12}>
                                                            <Col md={12} xs={6} className='policy-column'>
                                                                <div className='memberdetails gbui-button-1'>Member Name</div>
                                                            </Col>
                                                            <Col md={12} xs={6} className='policy-column'>
                                                                <div className='memberdetails-value gbui-subtitle-1'>{item.memberName}</div>
                                                            </Col>
                                                        </Col>
                                                        <Col md={4} xs={12}>
                                                            <Col md={12} xs={6} className='policy-column'>
                                                                <div className='memberdetails gbui-button-1'>Relationship</div>
                                                            </Col>
                                                            <Col md={12} xs={6} className='policy-column'>
                                                                <div className='memberdetails-value gbui-subtitle-1'>{item.relationship}</div>
                                                            </Col>
                                                        </Col>
                                                        <Col md={4} xs={12}>
                                                            <Col md={12} xs={6} className='policy-column'>
                                                                <div className='memberdetails gbui-button-1'>Height</div>
                                                            </Col>
                                                            <Col md={12} xs={6} className='policy-column'>
                                                                <div className='memberdetails-value gbui-subtitle-1'>{item.height}</div>
                                                            </Col>
                                                        </Col>
                                                        <Col md={4} xs={12}>
                                                            <Col md={12} xs={6} className='policy-column'>
                                                                <div className='memberdetails gbui-button-1'>Gender</div>
                                                            </Col>
                                                            <Col md={12} xs={6} className='policy-column'>
                                                                <div className='memberdetails-value gbui-subtitle-1'>{item.gender}</div>
                                                            </Col>
                                                        </Col>
                                                        <Col md={4} xs={12}>
                                                            <Col md={12} xs={6} className='policy-column'>
                                                                <div className='memberdetails gbui-button-1'>Marital Status</div>
                                                            </Col>
                                                            <Col md={12} xs={6} className='policy-column'>
                                                                <div className='memberdetails-value gbui-subtitle-1'>{item.maritalStatus}</div>
                                                            </Col>
                                                        </Col>
                                                        <Col md={4} xs={12}>
                                                            <Col md={12} xs={6} className='policy-column'>
                                                                <div className='memberdetails gbui-button-1'>Date of Birth(DOB):</div>
                                                            </Col>
                                                            <Col md={12} xs={6} className='policy-column'>
                                                                <div className='memberdetails-value gbui-subtitle-1'>{item.dateOfBirth}</div>
                                                            </Col>
                                                        </Col>
                                                        <Col md={4} xs={12}>
                                                            <Col md={12} xs={6} className='policy-column'>
                                                                <div className='memberdetails gbui-button-1'>Weight:</div>
                                                            </Col>
                                                            <Col md={12} xs={6} className='policy-column'>
                                                                <div className='memberdetails-value gbui-subtitle-1'>{item.weight}</div>
                                                            </Col>
                                                        </Col>
                                                    </Col>
                                                    : null


                                            )}
                                        </Row>
                                        <Row>
                                            <Col md={12} xs={12}>
                                                <Divider />
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='insured-member gbui-h7'>Nominee</div>
                                            </Col>
                                            <Col md={8} style={{ padding: '0px' }} xs={12}>
                                                <Col md={6} xs={12}>
                                                    <Col md={12} xs={6} className='policy-column'>
                                                        <div className='memberdetails gbui-button-1'>Relationship to Nominee:</div>
                                                    </Col>
                                                    <Col md={12} xs={6} className='policy-column'>
                                                        <div className='memberdetails-value gbui-subtitle-1'>{this.state.MemberData.relationshipToNominee}</div>
                                                    </Col>
                                                </Col>
                                                <Col md={6} xs={12}>
                                                    <Col md={12} xs={6} className='policy-column'>
                                                        <div className='memberdetails gbui-button-1'>Name of Nominee:</div>
                                                    </Col>
                                                    <Col md={12} xs={6} className='policy-column'>
                                                        <div className='memberdetails-value gbui-subtitle-1'>{this.state.MemberData.nomineeName}</div>
                                                    </Col>
                                                </Col>
                                            </Col>

                                            <Col md={12}>
                                                <Divider />
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='insured-member gbui-h7'>Previous Insurer Details</div>
                                            </Col>
                                            <Col md={4} xs={12}>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails gbui-button-1'>Previous Insurance?</div>
                                                </Col>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails-value gbui-subtitle-1'>{this.state.MemberData.hasPreviuousInsurance ? 'Yes' : 'No'}</div>
                                                </Col>
                                            </Col>
                                            <Col md={4} xs={12}>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails gbui-button-1'>Previous Insurer Name:</div>
                                                </Col>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails-value gbui-subtitle-1'>{this.state.MemberData.hasPreviuousInsurance ? this.state.MemberData.previousInsurerName : 'NA'}</div>
                                                </Col>
                                            </Col>
                                            <Col md={4} xs={12}>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails gbui-button-1'>Previous Policy Number:</div>
                                                </Col>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails-value gbui-subtitle-1'>{this.state.MemberData.hasPreviuousInsurance ? this.state.MemberData.previousPolicyNumber : 'NA'}</div>
                                                </Col>
                                            </Col>

                                            <Col md={12} xs={12}>
                                                <Divider />
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='insured-member gbui-h7'>Contact Details</div>
                                            </Col>
                                            <Col md={4} xs={12}>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails gbui-button-1'>Communication Address:</div>
                                                </Col>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails-value gbui-subtitle-1'>{this.state.MemberData.communicationAddress}</div>
                                                </Col>
                                            </Col>
                                            <Col md={4} xs={12}>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails gbui-button-1'>Pincode:</div>
                                                </Col>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails-value gbui-subtitle-1'>{this.state.MemberData.pincode}</div>
                                                </Col>
                                            </Col>
                                            <Col md={4} xs={12}>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails gbui-button-1'>Mobile Number:</div>
                                                </Col>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails-value gbui-subtitle-1'>{this.state.MemberData.mobile}</div>
                                                </Col>
                                            </Col>
                                            <Col md={4} xs={12}>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails gbui-button-1'>City:</div>
                                                </Col>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails-value gbui-subtitle-1'>{this.state.MemberData.city}</div>
                                                </Col>
                                            </Col>
                                            <Col md={4} xs={12}>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails gbui-button-1'>Email Id:</div>
                                                </Col>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails-value gbui-subtitle-1'>{this.state.MemberData.email}</div>
                                                </Col>
                                            </Col>
                                            <Col md={4} xs={12}>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails gbui-button-1'>State:</div>
                                                </Col>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails-value gbui-subtitle-1'>{this.state.MemberData.state}</div>
                                                </Col>
                                            </Col>
                                            <Col md={4} xs={12}>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails gbui-button-1'>Phone Number:</div>
                                                </Col>
                                                <Col md={12} xs={6} className='policy-column'>
                                                    <div className='memberdetails-value gbui-subtitle-1'>{this.state.MemberData.phone}</div>
                                                </Col>
                                            </Col>

                                            <Col xs={6} className='mui--visible-xs-block'>
                                                <div className='track-policy-btn'>
                                                    <Button variant="outlined" className={classes.contentBtn} onClick={() => { this.setState({ page: 'dashboard' }) }} >
                                                    </Button>
                                                </div>
                                            </Col>
                                            <Col xs={6} className='mui--visible-xs-block'>
                                                <div className='track-policy-btn2'>
                                                    <Button variant="contained" className={classes.filledBtn}> Download Policy</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Paper>
                                </div>
                            </Col>
                        </Col>
                    }
                    {/* policy details */}
                    {
                        this.state.page === 'policyDetails' &&
                        <Col md={10} xs={12} className='member-column' key={1}>
                            <Col md={12} xs={12}>
                                <i onClick={() => { this.setState({ page: 'dashboard' }) }} class="material-icons" style={{ color: '#ea0b4b', display: 'inline', verticalAlign: 'middle' }}>
                                    arrow_back
                                </i><div className='back gbui-body-2'>BACK TO DASHBOARD</div>
                            </Col>
                            <Col md={12} xs={12}>
                                <div className='policy-detail gbui-h6'>Policy Details</div>
                            </Col>
                            <Col md={10} xs={12} className='policy-column'>
                                <div className='policy-card'>
                                    <Paper square={true} className={classes.papers}>
                                        <Row>
                                            <Col md={2} xs={3}>
                                                <div className='insurer-image'>
                                                    <img className='insurer' alt='insurer' src={`${constants.mediaBucketURL}/${this.state.policyDetails.insurerLogo}`} />
                                                </div>
                                            </Col>
                                            <Col md={3} xs={9}>
                                                <div className='insurer-name gbui-subtitle-2'>
                                                    {this.state.policyDetails.planName}  
                                                </div>
                                                {/* <div className='gb-rating gbui-label-1  mui--visible-xs-block'>Customers/GB Rating:
                                                    <span style={{ color: '#000000' }}>4.6/4.7
                                                       <i class="material-icons" style={{ fontSize: '12px', color: '#efce4a' }}>
                                                            star_rate
                                                        </i>
                                                    </span>
                                                </div> */}
                                            </Col>
                                            <div className='track-policy-btn mui--hidden-xs'>
                                                <Col md={5} className='btn-column-2 '>
                                                    <div className='fab-yellow' style={{ verticalAlign: 'inherit' }}> {this.state.premedicalStatus}
                                                    </div>
                                                    <div className='track-policy-btn'>
                                                        <Button variant="outlined" className={classes.contentBtn}
                                                            onClick={() => this.handleClickMemberDetails(this.state.policyId)}>Member Details</Button>
                                                    </div>
                                                </Col>
                                                <Col md={2} className='btn-column-3 mui--hidden-xs'>
                                                    <div className='help-btn-2'>
                                                        <Link to='/help'><Button variant="contained" className={classes.filledBtn} > Help</Button></Link>
                                                    </div>
                                                </Col>
                                                <Col md={12} className='policy-row'>
                                                    <Divider />
                                                </Col>
                                            </div>
                                        </Row>
                                        <Row className='policy-row'>
                                            <Col md={6} xs={12}>
                                                <Col md={6} xs={12} className='policy-column-2'>
                                                    <Col md={12} xs={6} className='policy-column-2'>
                                                        {/* <div className='rating gbui-body-2'>Customers Rating:<span style={{ color: '#000000' }}>{this.state.policyDetails.customerRating}</span>
                                                            <i class="material-icons" style={{ display: 'inline', fontSize: '10px', color: '#efce4a', marginLeft: '10px' }}>
                                                                star_rate
                                                                        </i>
                                                            <i class="material-icons"  style={{ display: 'inline', fontSize: '10px', color: '#aaaaaa',marginLeft:'5px' }}>
                                                                help
                                                            </i>
                                                        </div> */}
                                                    </Col>
                                                    <Col md={12} xs={6} className='policy-column-2'>
                                                        <div className='rating gbui-body-1 left-column'>Coverage  Type</div>
                                                    </Col>
                                                    <Col md={12} xs={6} className='policy-column-2'>
                                                        <div className='rating gbui-body-1'>Cover Value <i class="material-icons" style={{ display: 'inline', fontSize: '12px', color: '#aaaaaa', marginLeft: '5px' }}>
                                                            help
                                                        </i></div>
                                                    </Col>
                                                    <div className='rating gbui-body-1 left-column' onClick={this.editPremiumBreakup}>Cashless Hospital at <span style={{ fontSize: '18px', color: '#ea0b4b' }}>{this.state.policyDetails.pinCode}</span></div>
                                                    <div className='rating gbui-body-1' style={{ color: '#ea0b4b' }} onClick={this.PremiumBreakup}>Plan Coverage</div>
                                                    {this.props.model_id === 'cashless_hospital' ?
                                                        <PremiumBreakup closeMethod={(value) => () => { this.setState({ PremiumBreakup: value }) }} isDashboard={true} plan={this.state.policyDetails} model_id={'cashless_hospital'} /> : null
                                                    }
                                                    {this.props.model_id === 'PREMIUM_BREAKUP' ?
                                                        <PremiumBreakup closeMethod={(value) => () => { this.setState({ PremiumBreakup: value }) }} isDashboard={true} plan={this.state.policyDetails} model_id={'PREMIUM_BREAKUP'} /> : null
                                                    }

                                                </Col>
                                                <Col md={6}>
                                                    {/* <div className='rating gbui-body-2'>GB Rating:<span style={{ color: '#000000' }}>{this.state.policyDetails.gbRating}</span>
                                                        <i class="material-icons" style={{ display: 'inline', fontSize: '10px', color: '#efce4a', marginLeft: '10px' }}>
                                                            star_rate
                                                                    </i>
                                                        <i class="material-icons"  style={{ display: 'inline', fontSize: '10px', color: '#aaaaaa',marginLeft:'5px' }}>
                                                                        help
                                                                    </i>
                                                    </div> */}
                                                    <div className='base-plan gbui-body-1'>{this.state.policyDetails.coverageType}</div>
                                                    <div className='base-plan gbui-body-1'>{this.state.policyDetails.sumInsured}</div>
                                                    <div className='gbui-h7' style={{ color: '#ea0b4b' }}>{this.state.policyDetails.hospitalsNearYou}</div>
                                                </Col>
                                            </Col>
                                            <Col md={6} className='rightmost-column'>
                                                <Col md={6}>
                                                    <div className='rating gbui-body-1'>Policy number :</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='base-plan gbui-body-1' style={{ textAlign: 'right' }}>{this.state.policyDetails ? this.state.policyDetails.policyNumber : 'NA'}</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='rating gbui-body-1'>Policy Purchase Date:</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='base-plan gbui-body-1' style={{ textAlign: 'right' }}>{this.state.policyDetails ? this.state.policyDetails.policyPurchaseDate : 'NA'}</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='rating gbui-body-1'>Policy Start Date:</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='base-plan gbui-body-1' style={{ textAlign: 'right' }}>{this.state.policyDetails ? this.state.policyDetails.policyStartDate : 'NA'}</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='rating gbui-body-1'>Policy End Date:</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='base-plan gbui-body-1' style={{ textAlign: 'right' }}>{this.state.policyDetails ? this.state.policyDetails.policyEndDate : 'NA'}</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='rating gbui-body-1'>Policy Term</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='base-plan gbui-body-1' style={{ textAlign: 'right' }}>{this.state.policyDetails ? this.state.policyDetails.maxPolicyTerm : 'NA'}</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='rating gbui-body-1'>Existing Disease after</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='base-plan gbui-body-1' style={{ textAlign: 'right' }}>{this.state.policyDetails ? this.state.policyDetails.preExistingDisease : 'NA'}</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='rating gbui-body-1'>Room Rent Eligibility</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='base-plan gbui-body-1' style={{ textAlign: 'right' }}>{this.state.policyDetails ? this.state.policyDetails.roomRentEligibility : 'NA'}</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='rating gbui-body-1'>No Claim Bonus</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='base-plan gbui-body-1' style={{ textAlign: 'right' }}>{this.state.policyDetails ? (this.state.policyDetails.noClaimBonus === '' ? '-' : this.state.policyDetails.noClaimBonus) : 'NA'}</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='rating gbui-body-1'>Premium/Lac of SI</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='base-plan gbui-body-1' style={{ textAlign: 'right' }}>{this.state.policyDetails ? this.state.policyDetails.premiumPerLacOfSI : 'NA'}</div>
                                                </Col>

                                            </Col>
                                            <Col md={12}>
                                                <div className='key-feature gbui-h6' style={{ fontWeight: '600' }}>Key Feature</div>
                                            </Col>
                                            {this.state.policyDetails.keyFeatureList && this.state.policyDetails.keyFeatureList.map(item =>
                                                <Col md={4}>
                                                    <div className='gbui-subtitle-3 key-feature'>
                                                        {item.featureName}
                                                    </div>
                                                    <div className='gbui-subtitle-3 key-feature'>
                                                        {item.featureDescription}
                                                    </div>
                                                </Col>
                                            )}
                                            <Col md={12}>
                                                <div className='feature-link gbui-button-1'
                                                    onClick={() => {
                                                        window.scrollTo({ left: 0, top: document.getElementById('keyFeatures').offsetTop - 30, behavior: 'smooth' })
                                                    }}
                                                >See More Features</div>
                                            </Col>
                                            {/* <Col md={12}>
                                                <div className='key-feature gbui-h6' style={{ fontWeight: '600' }}>Add - Ons</div>
                                            </Col>
                                            <div className='addon-card'>
                                                <Col md={4}>
                                                    <Paper className={classes.papers}>
                                                        <Row>
                                                            <Col md={12}>
                                                                <div className='name-add-on gbui-subtitle-3'>Some pretty long add-on name 1 <i class="material-icons" style={{ display: 'inline', fontSize: '10px', color: '#aaaaaa', marginLeft: '5px' }}>
                                                                    help
                                                                </i></div>
                                                                <Divider />
                                                                <div className='gbui-button-1 benefits'>Benefits</div>
                                                                <div className='gbui-button-1 benefits'>Won't it make sense to have just. There two terms policy Term.</div>

                                                                <Divider />
                                                            </Col>
                                                            <Col md={6}>
                                                                <div className='price gbui-menu-bar-1'>Rs. 48</div>
                                                            </Col>
                                                            <Col md={6}>
                                                                <div className='checkbox-div'>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={this.state.checkedA}
                                                                                onChange={this.handleChange}
                                                                                value="checkedA"
                                                                            />
                                                                        }
                                                                        label="Bought"
                                                                        labelPlacement="start"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Paper>
                                                </Col>
                                                <Col md={4}>
                                                    <Paper className={classes.papers}>
                                                        <Row>
                                                            <Col md={12}>
                                                                <div className='name-add-on gbui-subtitle-3'>Some pretty long add-on name 1 <i class="material-icons" style={{ display: 'inline', fontSize: '10px', color: '#aaaaaa', marginLeft: '5px' }}>
                                                                    help
                                                                </i></div>
                                                                <Divider />
                                                                <div className='gbui-button-1 benefits'>Benefits</div>
                                                                <div className='gbui-button-1 benefits'>Won't it make sense to have just. There two terms policy Term.</div>

                                                                <Divider />
                                                            </Col>
                                                            <Col md={6}>
                                                                <div className='price gbui-menu-bar-1'>Rs. 48</div>
                                                            </Col>
                                                            <Col md={6}>
                                                                <div className='checkbox-div'>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={this.state.checkedA}
                                                                                onChange={this.handleChange}
                                                                                value="checkedA"
                                                                            />
                                                                        }
                                                                        label="Bought"
                                                                        labelPlacement="start"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Paper>
                                                </Col>
                                                <Col md={4}>
                                                    <Paper className={classes.papers}>
                                                        <Row>
                                                            <Col md={12}>
                                                                <div className='name-add-on gbui-subtitle-3'>Some pretty long add-on name 1 <i class="material-icons" style={{ display: 'inline', fontSize: '10px', color: '#aaaaaa', marginLeft: '5px' }}>
                                                                    help
                                                                </i></div>
                                                                <Divider />
                                                                <div className='gbui-button-1 benefits'>Benefits</div>
                                                                <div className='gbui-button-1 benefits'>Won't it make sense to have just. There two terms policy Term.</div>

                                                                <Divider />
                                                            </Col>
                                                            <Col md={6}>
                                                                <div className='price gbui-menu-bar-1'>Rs. 48</div>
                                                            </Col>
                                                            <Col md={6}>
                                                                <div className='checkbox-div'>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={this.state.checkedA}
                                                                                onChange={this.handleChange}
                                                                                value="checkedA"
                                                                            />
                                                                        }
                                                                        label="Bought"
                                                                        labelPlacement="start"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Paper>
                                                </Col>
                                            </div> */}
                                            <Col md={12}>
                                                <div className='key-feature gbui-h6' style={{ fontWeight: '600' }}>Policy Description</div>
                                            </Col>
                                            <Col md={12}>
                                                <div className='ribbon'>
                                                    <ul>
                                                        <li className={this.state.listTab === 0 ? "active" : "nactive"}
                                                            onClick={() => { this.setState({ listTab: 0 }) }}>Benefits & Features</li>
                                                        <li className={this.state.listTab === 1 ? "active" : "nactive"}
                                                            onClick={() => { this.setState({ listTab: 1 }) }}>Policy Conditions</li>
                                                        <li className={this.state.listTab === 2 ? "active" : "nactive"}
                                                            onClick={() => { this.setState({ listTab: 2 }) }}>Other Details</li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            {this.state.listTab === 0 && <div>
                                                {/* <Col md={12}>
                                                    <div id='keyFeatures' className='key-benefit-heading gbui-h7'>Policy Features</div>
                                                </Col> */}
                                                <Col md={12}>
                                                    <div className='key-benefit-heading gbui-subtitle-1' id='keyFeatures'>
                                                        <Col md={12}>
                                                            <div className='gbui-subtitle-3 key-feature'>
                                                                <RawHTML>{this.state.policyDescription.benefitsAndFeatures}</RawHTML>
                                                            </div>
                                                        </Col>
                                                    </div>
                                                </Col>
                                            </div>}
                                            {this.state.listTab === 1 && <div>
                                                <Col md={12}>
                                                    <div className='gbui-subtitle-3 key-feature'>
                                                        <RawHTML>{this.state.policyDescription.policyConditions}</RawHTML>
                                                    </div>

                                                </Col>
                                            </div>
                                            }
                                            {this.state.listTab === 2 && <div>
                                                <Col md={12}>
                                                    <div className='gbui-subtitle-3 key-feature'>
                                                        <RawHTML>{this.state.policyDescription.otherDetails}</RawHTML>
                                                    </div>
                                                </Col>
                                            </div>}

                                            <Col md={12}>
                                                <Divider />
                                            </Col>
                                            <Col md={12}>
                                                <div className='key-benefit-heading gbui-subtitle-1'>
                                                    DISCLAIMER
                                              </div>
                                            </Col>
                                            <Col md={12}>
                                                <div className='key-benefit-heading gbui-subtitle-1'>
                                                    {this.state.policyDescription ? this.state.policyDescription.disclaimer : 'NA'}
                                                    <a style={{ color: '#ea0b4b' }} href={`${constants.mediaBucketURL}/${this.state.policyDetails.policyBrochure}`} target="_blank">
                                                        <span >Policy Brochure</span></a><span style={{ margin: '0px 5px' }}>&</span>
                                                    <a style={{ color: '#ea0b4b' }} href={`${constants.mediaBucketURL}/${this.state.policyDetails.policyWording}`} target="_blank"><span> TnC</span></a>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Paper>
                                </div>
                            </Col>
                        </Col>
                    }
                </Row>
            </div >
        )
    }
}

customerDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        premiumBreakup: state.popup.premium_breakup_modal,
        model_id: state.popup.model_id,
        currentPlan: state.currentPlan.details ? state.currentPlan.details : {},
        healthTab: state.GroupHealthTabs.value,
        inputFormDataHealth: state.inputFormHealth.inputFormHealthData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectPremium: (premium, model_id) => dispatch({ type: 'PREMIUM_BREAKUP_MODAL', premium, model_id }),
        setCurrentPlan: (plan) => dispatch({ type: 'CURRENT_PLAN', plan }),
        onPremiumFetch: (data) => dispatch({ type: 'PREMIUM_DETAILS', data })
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(customerDashboard));

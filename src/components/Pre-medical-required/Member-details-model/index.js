import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { MuiThemeProvider } from '@material-ui/core/styles'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Divider from '@material-ui/core/Divider'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import * as moment from 'moment';


import './index.css'


const styles = theme => ({
    root: {
        padding: '0 24px 0px ',
    },
    tab: {
        fontFamily: 'Nunito',
        fontSize: '16px',
        minWidth: '15%',
        minHeight: 40,
    },
    tabsIndicator: {
        backgroundColor: '#ea0b4b',
    },
    radio: {
        color: '#000000',
        '&$checked': {
            color: '#ea0b4b',
        },
    },
    checked: {},
    label: {
        color: '#000000',
        fontFamily: 'Nunito',
        fontSize: '16px',
        textTransform: 'capitalize',
        '&$selected': {
            color: '#ea0b4b',
        },
    },
    selected: {},
});


class MemberDetails extends Component {
    constructor(props) {
        super();
        this.state = {
            value: 0,
            proposalForm: {}
        }
    }
    handleClose = () => {
        this.props.onMemberDetails(false)
    };

    handleAgeCalculation = (date) =>{
        let b =  moment(date,"YYYY-MM-DD");
        let a =  moment();

        let years = a.diff(b,'year');
        b.add(years,'years')
        console.log(years,'years')

        let months = a.diff(b,'months');
        b.add(months,'months')

        let days = a.diff(b,'days');
        b.add(days,'days')
        let  ageText = `${years} years,${months} months,${days} days`
            
        return ageText;
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.proposalForm !== prevProps.proposalForm) {
            this.props.proposalForm.length > 0 && 
                this.setState({
                    proposalForm:this.props.proposalform
                })
        }
      }


    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { fullScreen, classes } = this.props;
        const { value } = this.state;
        // To maintain the same order for tab members and also to show only those members which are eligible for premedical
        const members = []
        this.props.InsuredMemberDetails ?  this.props.InsuredMemberDetails.map((item) =>{
            members.push(item)
        })
        :
            this.props.premedical.premedicalRequiredFor.map(prf => {
                this.props.proposalForm.insuredMembersList ? this.props.proposalForm.insuredMembersList.map((item, index) => {
                    prf.relationship === item.relationship ? members.push(item) : ''
                }) :'' 
            })
        // this.getProposerDetails()
        return (
            <MuiThemeProvider>
                <Dialog className="member-details"
                    open={this.props.member}
                    onClose={() => { this.props.onMemberDetails(false) }}
                    maxWidth="md"
                    fullScreen={fullScreen}
                    aria-labelledby="simple-dialog-title">
                    <DialogContent className='dialogue-content'>
                        <Row>{this.props.MemberData ?
                            <Col md={12} xs={10}><div className='heading'>Proposal Form</div></Col>:
                            <Col md={12} xs={10}><div className='heading'>Member Details</div></Col>}
                            <Col xs={2} className='mui--visible-xs-block'><i onClick={this.handleClose} class="material-icons">close</i></Col>
                        </Row>
                        {/* <Row>
                            <Col md={12}>
                                <Divider />
                            </Col>
                            <Col md={5} xs={12} className='member-container'>
                               <Col md={12} xs={10}><div className='sub-heading'>Proposal Details</div></Col>
                            </Col>
                           <Col md={12}>
                                <Divider />
                            </Col>
                        </Row> */}
                        {/* <Row className='content-row'> */}
                            {/* <Col md={5} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Insurer Name</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.insurerName}</Col>
                            </Col>
                            <Col md={4} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Plan Name</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.planName}</Col>
                            </Col>
                            <Col md={3} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Sum Insured</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.sumInsured}</Col>
                            </Col>
                            <Col md={5} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Premium Amount (Inclusive of GST):</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.gst}</Col>
                            </Col> */}
                            {/* <Col md={4} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Proposal Reference No.</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.gst}</Col>
                            </Col> */}
                            {/* <Col md={3} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Date and Time of Proposal</Col>
                                <Col md={12} xs={6} className='member-info'>{item.weight} Kgs</Col>
                            </Col> */}
                            {/* <Col md={5} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Policy No. </Col>
                                <Col md={12} xs={6} className='member-info'>{item.weight} Kgs</Col>
                            </Col>
                            <Col md={4} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Date and Time of Policy Purchase </Col>
                                <Col md={12} xs={6} className='member-info'>{item.weight} Kgs</Col>
                            </Col> */}
                        {/* </Row>
                        <Row>
                            <Col md={12}>
                                <Divider />
                            </Col>
                            <Col md={5} xs={12} className='member-container'>
                               <Col md={12} xs={10}><div className='sub-heading'>Proposer Details</div></Col>
                            </Col>
                           <Col md={12}>
                                <Divider />
                            </Col>
                        </Row> */}
                        {/* <Row className='content-row'>
                            <Col md={5} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Proposer’s Name:</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.proposerName}</Col>
                            </Col>
                            <Col md={4} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Gender:</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.gender}</Col>
                            </Col>
                            <Col md={3} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Educational Qualification:</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.educationQualification}</Col>
                            </Col>
                            <Col md={5} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Profession:</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.profession}</Col>
                            </Col>
                            <Col md={4} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Marital Status:</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.maritalStatus}</Col>
                            </Col>
                            <Col md={3} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Income:</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.income}</Col>
                            </Col>
                            <Col md={5} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Date of Birth(DOB):</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.dateOfBirth}</Col>
                            </Col>
                            <Col md={4} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>PAN Card</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.panCard}</Col>
                            </Col>
                            <Col md={3} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Nationality:</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.nationality}</Col>
                            </Col>
                            <Col md={5} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Policy Tenure:</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.tenure}</Col>
                            </Col> */}
                            {/* <Col md={3} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Discount:</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.tenure}</Col>
                            </Col> */}
                        {/* </Row> */}
                        {/* <Row>
                            <Col md={12}>
                                <Divider />
                            </Col>
                            <Col md={5} xs={12} className='member-container'>
                               <Col md={12} xs={10}><div className='sub-heading'>Nominee Details</div></Col>
                            </Col>
                           <Col md={12}>
                                <Divider />
                            </Col>
                        </Row>
                        <Row className='content-row'>
                            <Col md={5} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Relationship to Nominee:</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.relationshipToNominee}</Col>
                            </Col>
                            <Col md={4} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Name of Nominee:</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.nomineeName}</Col>
                            </Col>
                            <Col md={3} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Age:</Col>
                                <Col md={12} xs={6} className='member-info'>{this.handleAgeCalculation(this.state.proposalForm.dateOfBirth)}</Col>
                            </Col>
                        </Row> */}
                        {/* <Row>
                            <Col md={12}>
                                <Divider />
                            </Col>
                            <Col md={5} xs={12} className='member-container'>
                               <Col md={12} xs={10}><div className='sub-heading'>Previous Insurer Details</div></Col>
                            </Col>
                           <Col md={12}>
                                <Divider />
                            </Col>
                        </Row>
                        <Row className='content-row'>
                            <Col md={5} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Previous Insurance?</Col>
                                <Col md={12} xs={6} className='member-info'>{this.state.proposalForm.hasPreviuousInsurance === true ? 'Yes' :'No' }</Col>
                            </Col>
                            {this.state.proposalForm.previousPolicyNumber === true && <div>
                            <Col md={4} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Previous Insurer Name:</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.previousInsurerName}</Col>
                            </Col>
                            <Col md={3} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Previous Policy Number:</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.previousPolicyNumber}</Col>
                            </Col>
                            <Col md={5} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Claim in previous policy</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.claim}</Col>
                            </Col> */}
                            {/* <Col md={4} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Number of Claims</Col>
                            </Col> */}
                            {/* <Col md={3} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Sum Insured</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.sumInsured}</Col>
                            </Col>
                            <Col md={5} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Policy Start date</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.policyStartDate}</Col>
                            </Col>
                            <Col md={4} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Policy End date</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.policyEndDate}</Col>
                            </Col>
                            </div>} */}
                            {/* <Col md={3} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Nationality:</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.nationality}</Col>
                            </Col>
                            <Col md={5} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Policy Tenure:</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.tenure}</Col>
                            </Col>
                            <Col md={4} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>PAN Card</Col>
                                <Col md={12} xs={6} className='member-info'>{ this.state.proposalForm.panCard}</Col>
                            </Col> */}
                            {/* <Col md={3} xs={12} className='member-container'>
                                <Col md={12} xs={6} className='member'>Discount:</Col>
                            </Col> */}
                        {/* </Row> */}
                        <Row>
                            <Col md={12}>
                                <Divider />
                            </Col>
                            <Col md={5} xs={12} className='member-container'>
                               <Col md={12} xs={10}><div className='sub-heading'>Insured Members</div></Col>
                            </Col>
                           <Col md={12}>
                                <Divider />
                            </Col>
                        </Row>
                        <Tabs classes={{ root: classes.tab, indicator: classes.tabsIndicator }}
                            scrollable value={value} onChange={this.handleChange}>
                            {this.props.InsuredMemberDetails && this.props.InsuredMemberDetails.map(item =>
                                <Tab classes={{ root: classes.tab, label: classes.label }} label={item.relationship} />)
                            }
                            {this.props.premedical && this.props.premedical.premedicalRequiredFor.map(item =>
                                <Tab classes={{ root: classes.tab, label: classes.label }} label={item.relationship} />)
                            }
                        </Tabs>

                        {members.map((item, index) => 
                            <div>{
                                <div>
                                    {value === index &&

                                        <Row className='content-row'>
                                            <Col md={5} xs={12} className='member-container'>
                                                <Col md={12} xs={6} className='member'>Name:</Col> 
                                                <Col md={12} xs={6} className='member-info'>{item.salutation+ ' ' +item.firstName+ ' ' +item.lastName}</Col>
                                            </Col>
                                            <Col md={4} xs={12} className='member-container'>
                                                <Col md={12} xs={6} className='member'>Relationship:</Col>
                                                <Col md={12} xs={6} className='member-info'>{item.relationship}</Col>
                                            </Col>
                                            <Col md={3} xs={12} className='member-container'>
                                                <Col md={12} xs={6} className='member'>Height:</Col>
                                                <Col md={12} xs={6} className='member-info'>{item.height}</Col>
                                            </Col>
                                            <Col md={5} xs={12} className='member-container'>
                                                <Col md={12} xs={6} className='member'>Gender:</Col>
                                                <Col md={12} xs={6} className='member-info'>{item.gender ? item.gender :'NA' }</Col>
                                            </Col>
                                            <Col md={4} xs={12} className='member-container'>
                                                <Col md={12} xs={6} className='member'>Date of Birth(DOB):</Col>
                                                <Col md={12} xs={6} className='member-info'>{item.dateOfBirth}</Col>
                                            </Col>
                                            <Col md={3} xs={12} className='member-container'>
                                                <Col md={12} xs={6} className='member'>Weight:</Col>
                                                <Col md={12} xs={6} className='member-info'>{item.weight} Kgs</Col>
                                            </Col>
                                            <Col md={5} xs={12} className='member-container'>
                                                <Col md={12} xs={6} className='member'>Nationality:</Col>
                                                <Col md={12} xs={6} className='member-info'>{item.nationality}</Col>
                                            </Col>
                                            <Col md={4} xs={12} className='member-container'>
                                                <Col md={12} xs={6} className='member'>Profession:</Col>
                                                <Col md={12} xs={6} className='member-info'>{item.profession}</Col>
                                            </Col>
                                            <Col md={3} xs={12} className='member-container'>
                                                <Col md={12} xs={6} className='member'>Marital Status:</Col>
                                                <Col md={12} xs={6} className='member-info'>{item.maritalStatus}</Col>
                                            </Col>
                                            {/* <Col md={5} xs={12} className='member-container'>
                                                <Col md={12} xs={6} className='member'>Pincode:</Col>
                                                <Col md={12} xs={6} className='member-info'>{item.insuredMemberAddress.pincode}</Col>
                                            </Col>
                                            <Col md={4} xs={12} className='member-container'>
                                                <Col md={12} xs={6} className='member'>Address:</Col>
                                                <Col md={12} xs={6} className='member-info'>{item.insuredMemberAddress.address}</Col>
                                            </Col> */}
                                            <Col md={12} xs={12}>
                                                    <Divider light />
                                            </Col>
                                            <Col md={12} xs={12} className='member-container'>
                                                <div className='member-habbit'>General Medical Questions</div>
                                            </Col>
                                            <Col md={12} xs={10} className='member-container'>
                                                <div className='answer'>To ensure smooth claims please answer these questions properly</div>
                                            </Col>
                                            <Col xs={2} className='mui--visible-xs-block'>
                                                <i class="material-icons" style={{ diplay: 'inline', fontSize: '15px' }}>help</i>
                                            </Col>
                                            {item.medicalHistory.generalQuestions ? item.medicalHistory.generalQuestions.map((mh, ind) => <div>
                                                <Col md={8} xs={12} className='member-container'>
                                                    <div className='question'>
                                                        Q{ind}. {mh.question}
                                                    </div>
                                                </Col>
                                                <Col md={4} xs={12} className='member-container'>
                                                    <FormControlLabel
                                                        classes={{
                                                            label: classes.label,
                                                        }}
                                                        value={mh.value ? "Yes" : "No"}
                                                        control={<Radio
                                                            checked
                                                            value={mh.value ? "Yes" : "No"}
                                                            name="car_type"
                                                            classes={{
                                                                root: classes.radio,
                                                                checked: classes.checked,
                                                            }}
                                                        />}
                                                        label={mh.value ? "Yes" : "No"}
                                                    />
                                                </Col>
                                            </div>) : ''}
                                        </Row>}
                                </div>
                            }</div>
                        )}
                        {/* {value === 0 && <div>

                            <Row className='content-row'>
                                <Col md={5} xs={12} className='member-container'>
                                    <Col md={12} xs={6} className='member'>Name:</Col>
                                    <Col md={12} xs={6} className='member-info'>Member name</Col>
                                </Col>
                                <Col md={4} xs={12} className='member-container'>
                                    <Col md={12} xs={6} className='member'>Relationship:</Col>
                                    <Col md={12} xs={6} className='member-info'>Self</Col>
                                </Col>
                                <Col md={3} xs={12} className='member-container'>
                                    <Col md={12} xs={6} className='member'>Height:</Col>
                                    <Col md={12} xs={6} className='member-info'>5 ft 9 inch</Col>
                                </Col>
                                <Col md={5} xs={12} className='member-container'>
                                    <Col md={12} xs={6} className='member'>Gender:</Col>
                                    <Col md={12} xs={6} className='member-info'>Male</Col>
                                </Col>
                                <Col md={4} xs={12} className='member-container'>
                                    <Col md={12} xs={6} className='member'>Date of Birth(DOB):</Col>
                                    <Col md={12} xs={6} className='member-info'>15-Mar-1994</Col>
                                </Col>
                                <Col md={3} xs={12} className='member-container'>
                                    <Col md={12} xs={6} className='member'>Weight:</Col>
                                    <Col md={12} xs={6} className='member-info'>75 Kgs</Col>
                                </Col>
                               
                                <Col md={12} className='member-container'>
                                    <Col md={12} xs={12} className='member-habbit'>Personal Habit</Col>
                                </Col>
                                <Col md={6} xs={12} className='member-container'>
                                    <Col md={12} xs={6} className='day-info'>Sleeping hours(in a day):</Col>
                                    <Col md={12} xs={6} className='member-info'>7-8 Hours</Col>
                                </Col>
                                <Col md={6} xs={12} className='member-container'>
                                    <Col md={12} xs={6} className='day-info'>Kms you walk(in a day):</Col>
                                    <Col md={12} xs={6} className='member-info'>6kms</Col>
                                </Col>
                                <Col md={6} xs={12} className='member-container'>
                                    <Col md={12} xs={6} className='day-info'>Smoke(in a day):</Col>
                                    <Col md={12} xs={6} className='member-info'>7 units daily from sept, 2008</Col>
                                </Col>
                                <Col md={6} className='member-container'>
                                    <Col md={12} xs={6} className='day-info'>Alcohol(in a day):</Col>
                                    <Col md={12} xs={6} className='member-info'>60 ml weekly from sept, 2008</Col>
                                </Col>
                                <Col md={12} xs={12}>
                                    <Divider light />
                                </Col>
                                <Col md={12} xs={12} className='member-container'>
                                    <div className='member-habbit'>Any Medical History</div>
                                </Col>
                                <Col md={12} xs={10} className='member-container'>
                                    <div className='answer'>To ensure smooth claims please answer these questions properly</div>
                                </Col>
                                <Col xs={2} className='mui--visible-xs-block'>
                                    <i class="material-icons" style={{ diplay: 'inline', fontSize: '15px' }}>help</i>
                                </Col>
                                <Col md={8} xs={12} className='member-container'>
                                    <div className='question'>
                                        Q1. Is the applicant currently suffering from any symptom(s)
                                         or complaint(s) persisting from more than five consecutive
                                         days for which he/she has not consulted a doctor?
                                    </div>
                                </Col>
                                <Col md={4} xs={12} className='member-container'>
                                    <FormControlLabel
                                        classes={{
                                            label: classes.label,
                                        }}
                                        value="Yes"
                                        control={<Radio
                                            checked
                                            value="Yes"
                                            name="car_type"
                                            classes={{
                                                root: classes.radio,
                                                checked: classes.checked,
                                            }}
                                        />}
                                        label="Yes"
                                    />
                                </Col>
                                <Col md={7} xs={9} className='member-container'>
                                    <div className='hypertension'>Hypertension / High Blood Pressure
                                     <i class="material-icons" style={{ display: 'inline', fontSize: '15px' }}>help</i>
                                    </div>
                                    <div className='exiting'>Exiting Since:</div>
                                </Col>
                                <Col md={5} xs={3} className='member-container'>
                                    <div className='year'>2017</div>
                                </Col>
                                <Col md={7} xs={9} className='member-container'>
                                    <div className='hypertension'>Hypertension / High Blood Pressure
                                      <i class="material-icons" style={{ display: 'inline', fontSize: '15px' }}>help</i>
                                    </div>
                                    <div className='exiting'>Exiting Since:</div>
                                </Col>
                                <Col md={5} xs={3} className='member-container'>
                                    <div className='year'>2017</div>
                                </Col>
                                <Col md={7} xs={9} className='member-container'>
                                    <div className='hypertension'>Hypertension / High Blood Pressure
                                      <i class="material-icons" style={{ display: 'inline', fontSize: '15px' }}>help</i>
                                    </div>
                                    <div className='exiting'>Exiting Since:</div>
                                </Col>
                                <Col md={5} xs={3} className='member-container'>
                                    <div className='year'>2017</div>
                                </Col>
                                <Col md={7} xs={9} className='member-container'>
                                    <div className='hypertension'>Hypertension / High Blood Pressure
                                       <i class="material-icons" style={{ display: 'inline', fontSize: '15px' }}>help</i>
                                    </div>
                                    <div className='exiting'>Exiting Since:</div>
                                </Col>
                                <Col md={5} xs={3} className='member-container'>
                                    <div className='year'>2017</div>
                                </Col>
                                <Col md={7} xs={9} className='member-container'>
                                    <div className='hypertension'>Hypertension / High Blood Pressure
                                      <i class="material-icons" style={{ display: 'inline', fontSize: '15px' }}>help</i>
                                    </div>
                                    <div className='exiting'>Exiting Since:</div>
                                </Col>
                                <Col md={5} xs={3} className='member-container'>
                                    <div className='year'>2017</div>
                                </Col>
                                <Col md={7} xs={9} className='member-container'>
                                    <div className='hypertension'>Hypertension / High Blood Pressure
                                      <i class="material-icons" style={{ display: 'inline', fontSize: '15px' }}>help</i>
                                    </div>
                                    <div className='exiting'>Exiting Since:</div>
                                </Col>
                                <Col md={5} xs={3} className='member-container'>
                                    <div className='year'>2017</div>
                                </Col>
                                <Col md={7} xs={9} className='member-container'>
                                    <div className='hypertension'>Hypertension / High Blood Pressure
                                      <i class="material-icons" style={{ display: 'inline', fontSize: '15px' }}>help</i>
                                    </div>
                                    <div className='exiting'>Exiting Since:</div>
                                </Col>
                                <Col md={5} xs={3} className='member-container'>
                                    <div className='year'>2017</div>
                                </Col>
                                <Col md={8} xs={12} className='member-container'>
                                    <div className='question'>
                                        Q1. Is the applicant currently suffering from any symptom(s)
                                            or complaint(s) persisting from more than five consecutive
                                            days for which he/she has not consulted a doctor?
                                    </div>
                                </Col>
                                <Col md={4} xs={12} className='member-container'>
                                    <FormControlLabel
                                        classes={{
                                            label: classes.label,
                                        }}
                                        value="No"
                                        control={<Radio
                                            checked
                                            value="No"
                                            name="car_type"
                                            classes={{
                                                root: classes.radio,
                                                checked: classes.checked,
                                            }}
                                        />}
                                        label="No"
                                    />
                                </Col>
                                <Col md={8} xs={12} className='member-container'>
                                    <div className='question'>
                                        Q1. Is the applicant currently suffering from any symptom(s)
                                            or complaint(s) persisting from more than five consecutive
                                            days for which he/she has not consulted a doctor?
                                    </div>
                                </Col>
                                <Col md={4} xs={12} className='member-container'>
                                    <FormControlLabel
                                        classes={{
                                            label: classes.label,
                                        }}
                                        value="No"
                                        control={<Radio
                                            checked
                                            value="No"
                                            name="car_type"
                                            classes={{
                                                root: classes.radio,
                                                checked: classes.checked,
                                            }}
                                        />}
                                        label="No"
                                    />
                                </Col>
                                <Col md={8} xs={12} className='member-container'>
                                    <div className='question'>
                                        Q1. Is the applicant currently suffering from any symptom(s)
                                            or complaint(s) persisting from more than five consecutive
                                            days for which he/she has not consulted a doctor?
                                    </div>
                                </Col>
                                <Col md={4} xs={12} className='member-container'>
                                    <FormControlLabel
                                        classes={{
                                            label: classes.label,
                                        }}
                                        value="No"
                                        control={<Radio
                                            checked
                                            value="No"
                                            name="car_type"
                                            classes={{
                                                root: classes.radio,
                                                checked: classes.checked,
                                            }}
                                        />}
                                        label="No"
                                    />
                                </Col>
                                <Col md={8} xs={12} className='member-container'>
                                    <div className='question'>
                                        Q1. Is the applicant currently suffering from any symptom(s)
                                            or complaint(s) persisting from more than five consecutive
                                            days for which he/she has not consulted a doctor?
                                    </div>
                                </Col>
                                <Col md={4} xs={12} className='member-container'>
                                    <FormControlLabel
                                        classes={{
                                            label: classes.label,
                                        }}
                                        value="No"
                                        control={<Radio
                                            checked
                                            value="No"
                                            name="car_type"
                                            classes={{
                                                root: classes.radio,
                                                checked: classes.checked,
                                            }}
                                        />}
                                        label="No"
                                    />
                                </Col>
                            </Row>
                        </div>}
                        {value === 1 && <div>Item Two</div>}
                        {value === 2 && <div>Item Three</div>}
                        {value === 3 && <div>Item four</div>}
                        {value === 4 && <div>Item five</div >}
                        {value === 5 && <div>Item six</div>} */}

                    </DialogContent>
                </Dialog>
            </MuiThemeProvider>
        );
    }
}

MemberDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

const mapStateToProps = state => {
    return {
        member: state.popup.member_detail_visible
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onMemberDetails: (member) => dispatch({ type: 'MEMBER_DETAIL_VISIBLE', member }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)((withMobileDialog({ breakpoint: 'xs' })(withStyles(styles, { withTheme: true })(MemberDetails))))
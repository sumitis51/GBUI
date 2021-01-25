import React, { Component, Fragment } from 'react'
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Container from 'muicss/lib/react/container'
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import './index.css'

const styles = theme => ({
    formControl: {
        margin: 0,
        marginBottom: 0
    },
    root: {
        color: 'black',
        '&$checked': {
            color: '#0da176 !important',
        },
        margin: 0
    },
    label:{
        fontSize:'14px',
        FontFamily:'Source Sans Pro',
        color:'#000000'
    }
})



class ProposalPdf extends Component {
    state = {
        memberData:{},
        insurerDetails: [
            {
                key: 'insurerName',
                value: 'Future Generali',
                display: 'Insurer Name'
            },
            {
                key: 'planName',
                value: 'Vital',
                display: 'Plan Name:'
            },
            {
                key: 'sumInsured',
                value: '3 Lacs',
                display: 'Sum Insured:'
            },
            {
                key: 'Premium',
                value: 'Rs 10000',
                display: 'Premium Amount (Inclusive of GST):'
            },
            {
                key: 'reference',
                value: 'AQWEDCFT1234567',
                display: 'Proposal Reference No.'
            },
            {
                key: 'dateTime1',
                value: '21/Jan/2018, 21:30',
                display: 'Date and Time of Proposal'
            },
            {
                key: 'policyNumber',
                value: '123456789087654321',
                display: 'Policy No.'
            },
            {
                key: 'dateTime2',
                value: '21/Jan/2018, 21:30',
                display: 'Date and Time of Policy Purchase'
            },
        ],
        proposerDetails: [
            {
                key: 'proposerName',
                value: 'Mr. Arpit Sharma',
                display: 'Proposer’s Name:'
            },
            {
                key: 'gender',
                value: 'Male',
                display: 'Gender:'
            },
            {
                key: 'qualification',
                value: 'Vital',
                display: 'B.Tech'
            },
            {
                key: 'Profession',
                value: 'Engineer',
                display: 'Profession:'
            },
            {
                key: 'maritalStatus',
                value: 'Married',
                display: 'Marital Status:'
            },
            {
                key: 'income',
                value: '-  Lacs to - Lacs',
                display: 'Income:'
            },
            {
                key: 'dob',
                value: '15-Mar-1994',
                display: 'Date of Birth(DOB):'
            },
            {
                key: 'panCard',
                value: 'ASDFRE1234',
                display: 'PAN Card'
            },
            {
                key: 'nationality',
                value: 'Indian',
                display: 'Nationality:'
            },
            {
                key: 'policyTenure',
                value: '2 Years',
                display: 'Policy Tenure:'
            },
            {
                key: 'discount',
                value: '20%',
                display: 'Discount:'
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
            {
                key: 'age',
                value: '45',
                display: 'Age:'
            }
        ],
        PreviosPolicyDetails: [
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
            {
                key: 'previousPOlicyClaim',
                value: 'yes',
                display: 'Claim in previous policy'
            },
            {
                key: 'NoOfClaims',
                value: '1',
                display: 'Number of Claims'
            },
            {
                key: 'sumInsured',
                value: 'Rs. 123456',
                display: 'Sum Insured'
            },
            {
                key: 'policyStartDate',
                value: '21/04/2017',
                display: 'Policy Start Date:',
            },
            {
                key: 'policyEndDate',
                value: '21/04/2017',
                display: 'Policy End Date:',
            },
        ],
        insuredMembers: [
            {
                key: 'name',
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
            {
                key: 'Profession',
                value: 'Engineer',
                display: 'Profession:'
            },
            {
                key: 'nationality',
                value: 'Indian',
                display: 'Nationality:'
            },
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
        medicalQuestions:[
            {
                id:'0',
                value:'Is the person already have Health Total policy of Future Generali?'
            },
            {
                id:'1',
                value:'Is the person in good health and free from physical and mental disease or infirmity or medical complaints or deformity?'
            },
            {
                id:'2',
                value:'Is the person have at present or in the past had any health complaints, signs or symptoms, or were taking treatment or were hospitalized for any illness?		'
            },
            {
                id:'3',
                value:'Is the person at present or in the past met with any accident / injury or were hospitalized or taking treatment for any accident injury?'
            },
            {
                id:'4',
                value:'Is the person undergone any surgery in the past or going for any planned surgery at present / recent future?'
            },
            {
                id:'5',
                value:'Is the person Indian resident?'
            },
            {
                id:'6',
                value:'Whether any Health Insurance Policy has been declined?'
            },
        ]
    }
    myFunction(){
        window.print();
    }
    componentWillMount(){
        this.setState({
            memberData:this.props.history.location.state,
        })
        console.log(this.props.history.location.state)
    }
    render() {
        const { classes } = this.props
         var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        return (
            <div className='proposal-pdf'>
                <Container fluid={true}>
                    <div className='proposal-pdf-container'>
                            <Row>
                                <Col md={3} xs={3}>
                                    <img className='GBlogo1' src="/assets/logo.svg" alt="GB Logo" />
                                    <img className='GBlogo2' hspace='14px' src="/assets/logotext.svg" alt="GB Logo" />
                                </Col>
                                <Col md={6} xs={6}>
                                    <div className='proposal-form-heading gbui-menu-bar-1'>PROPOSAL FORM</div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <Divider />
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='main-heading gbui-subtitle-3'>Insurer Details</div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <Divider />
                                </Col>
                                {/* <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Insurer Name</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>Future Generali</div>
                                    </Col>
                                </Col> */}
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Plan Name:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{this.state.memberData.planName}</div>
                                    </Col>
                                </Col>
                                {/* <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Sum Insured:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col> */}
                                {/* <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Premium Amount (Inclusive of GST):</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Proposal Reference No.</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Date and Time of Proposal</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Policy No.</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Date and Time of Policy Purchase</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col> */}
                                <Col md={12}>
                                    <Divider />
                                </Col>
                                <Col md={12}>
                                    <div className='main-heading gbui-subtitle-3'>Proposal Details</div>
                                </Col>
                                {this.state.memberData.insuredMembersList.map(item =>
                                <div>
                                <Col md={12}>
                                    <Divider />
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Proposer’s Name:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{item.memberName}</div>
                                    </Col>
                                </Col>
                                {/* <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Gender:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{item.gender}</div>
                                    </Col>
                                </Col> */}
                                {/* <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Educational Qualification:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Profession:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Marital Status:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Income:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>Na</div>
                                    </Col>
                                </Col> */}
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Date of Birth(DOB):</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{item.dateOfBirth}</div>
                                    </Col>
                                </Col>
                                {/* <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>PAN Card</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Nationality:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Policy Tenure:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col> */}
                                </div>
                                )}
                                {/* <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Discount:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{this.state.memberData.planName}</div>
                                    </Col>
                                </Col> */}
                                <Col md={12}>
                                    <Divider />
                                </Col>
                                <Col md={12}>
                                    <div className='main-heading gbui-subtitle-3'>Nominee Details</div>
                                </Col>
                                <Col md={12}>
                                    <Divider />
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Relationship to Nominee:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{this.state.memberData.relationshipToNominee}</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Name of Nominee:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{this.state.memberData.nomineeName}</div>
                                    </Col>
                                </Col>
                                {/* <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Age:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col> */}
                                <Col md={12}>
                                    <Divider />
                                </Col>
                                <Col md={12}>
                                    <div className='main-heading gbui-subtitle-3'>Previous Insurer Details</div>
                                </Col>
                                <Col md={12}>
                                    <Divider />
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Previous Insurance?</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{this.state.memberData.hasPreviuousInsurance === true ? 'Yes' :'NO'}</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Previous Insurer Name:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{this.state.memberData.previousInsurerName}</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Previous Policy Number:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{this.state.memberData.previousPolicyNumber}</div>
                                    </Col>
                                </Col>
                                {/* <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Claim in previous policy</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Number of Claims</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Sum Insured</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Policy Start Date:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Policy End Date:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col> */}
                                <Col md={12}>
                                    <Divider />
                                </Col>
                                {/* <Col md={2}>
                                    <div className='gbui-caption-1 below-text'>Page 1 of 10</div>
                                </Col> */}
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div className='proposal-form-heading gbui-menu-bar-1'>Insured Members</div>
                                </Col>
                                <Col md={12}>
                                    <Divider />
                                </Col>
                                {this.state.memberData.insuredMembersList.map(item =><div>
                                <Col md={12}>
                                    <div className='main-heading gbui-subtitle-1' style={{ color: '#ea0b4b' }}>{item.relationship}</div>
                                </Col>
                                <Col md={12} xs={12} style={{padding:'px'}}>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Name:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{item.memberName}</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Relationship:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{item.relationship}</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Height:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{item.height}</div>
                                    </Col>
                                </Col>
                                {/* <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Gender:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{item.gender}</div>
                                    </Col>
                                </Col> */}
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Date of Birth(DOB):</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{item.dateOfBirth}</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Weight:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{item.weight}</div>
                                    </Col>
                                </Col>
                                {/* <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Profession:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Nationality:</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>NA</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Sleeping hours(in a day):</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{item.sleepingHourInADay}</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Kms you walk(in a day):</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{item.walkingInADay}</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Smoke(in a day):</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{item.smokeUnitInADay}</div>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='key gbui-body-2'>Alcohol(in a day):</div>
                                    </Col>
                                    <Col md={12} xs={6} className='policy-column'>
                                        <div className='value gbui-body-1'>{item.alcoholInADay}</div>
                                    </Col>
                                </Col> */}
                                </Col></div>)}
                                <Col md={12}>
                                    <Divider />
                                </Col>
                                {/* <Col md={12}>
                                    <div className='proposal-form-heading gbui-menu-bar-1'>Medical History</div>
                                </Col>
                                <Col md={12}>
                                    <div className='ensure-claim gbui-body-1'>
                                        To ensure smooth claims please answer these questions properly
                                </div>
                                </Col>
                                {this.state.medicalQuestions.map((item,index) => {
                                    return(
                                        <Fragment>
                                             <Col md="8">
                                                <p className="medical-query gbui-body-2">
                                                    Q{index +1}.{item.value}
                                                </p>
                                            </Col>
                                            <Col md="3">
                                                <FormControl className={classes.formControl} fullWidth>
                                                    <RadioGroup
                                                        aria-label="Medical History"
                                                        name="medicalHistory"
                                                        className={classes.group}
                                                        row
                                                    >
                                                        <FormControlLabel classes={{label:classes.label}} value="no" name="NoRadio" control={<Radio checked={true} classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label="No" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Col>
                                        </Fragment>
                                    )})} */}
                                <Col md={12}>
                                    <Divider />
                                </Col>
                                <Col md={2}>
                                    <div className='gbui-caption-3 below-text'>Proposal reference no.: 987654321asdfg</div>
                                </Col>
                                <Col md={8}>
                                    <div className='gbui-caption-2 below-text midtext'>
                                        THE COMPANY OR INSURER WILL NOT BE ON RISK UNTIL THE PROPOSAL HAS BEEN ACCEPTED BY THE INSURER AND
                                        COMMUNICATIO N OF THE ACCEPTANCE HAS BEEN MADE TO THE PROPOSER IN WRITING ON RECEIVING FULL
                                        PAYMENT OF PREMIUM.
                                </div>
                                </Col>
                                <Col md={2} xs={2}><div className='below-text'><button onClick={this.myFunction}>Print</button></div></Col>

                                {/* <Col md={2}>
                                    <div className='gbui-caption-1 below-text'>Page 1 of 1</div>
                                </Col> */}
                            </Row>
                    </div>
                </Container>
            </div>
        )
    }
}

ProposalPdf.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ProposalPdf)
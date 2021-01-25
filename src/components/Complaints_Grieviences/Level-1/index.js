import React from 'react'
import './level1.css'
import Row from 'muicss/lib/react/row';
import Snackbar from '@material-ui/core/Snackbar';
import Col from 'muicss/lib/react/col';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import green from '@material-ui/core/colors/green';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import axios from 'axios';
import { connect } from 'react-redux';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';

import constants from '../../../constants/appConstants.json'

const styles = {
    snack: {
        marginTop: '6rem'
    },
    root: {
        color: green[600],
        '&$checked': {
            color: green[500],
        },

    },
    errorMessage1: {
        backgroundColor: '#ea0b4b'
    },
    checked: {},
};
class Level1 extends React.Component {
    componentDidMount() {
        const vm = this;
        this.props.onCurrentComponent('Level1SubmittingComplaintFirstTime.json');
        axios.get('/assets/json/Level1SubmittingComplaintFirstTime.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {

            })
    }

    state = {
        openSnack: false,
        complaint_relate: '',
        complaint_type: '',
        show_additional: false,
        complaintRelatedTo: [
            {
                id: 0,
                value: 'buying',
                display: 'Buying'
            },
            {
                id: 1,
                value: 'PolicyIssuance',
                display: 'Policy Issuance'
            },
            {
                id: 2,
                value: 'claimsManagement',
                display: 'Claims Management'
            },
            {
                id: 3,
                value: 'policyManagement',
                display: 'Policy Management'
            },

            {
                id: 4,
                value: 'refund',
                display: 'Refund'
            },
            {
                id: 5,
                value: 'renewal',
                display: 'Renewal'
            },
            {
                id: 6,
                value: 'other',
                display: 'other'
            },

        ],
        TypeofComplaintBuying: [

            {
                id: 0,
                value: 'preMedical',
                display: 'Pre-Medical Related'
            },
            {
                id: 1,
                value: 'paymentIssues',
                display: 'Payment Issue'
            },


            {
                id: 2,
                value: 'counterOffer',
                display: 'Counter Offer Related'
            },
            {
                id: 3,
                value: 'Misbehaviour',
                display: 'Misbehaviour by IA'
            },
            {
                id: 4,
                value: 'Misinformed',
                display: 'Misinformed by IA'
            },
            {
                id: 5,
                value: 'MisappropriationPOS',
                display: 'POS Misappropriation'
            },
            {
                id: 6,
                value: 'MisbehaviourPOS',
                display: 'Misbehaviour by POS'
            },
            {
                id: 7,
                value: 'MisinformedPOS',
                display: 'Misinformed by POS'
            },
            {
                id: 8,
                value: 'Contactable/Responding',
                display: 'POS Not Contactable/Responding'
            },
            {
                id: 9,
                value: 'CommittmentNot',
                display: 'Offered Committment Not Fullfilled'
            },
            {
                id: 10,
                value: 'others',
                display: 'Others'
            },

        ],
        TypeofComplaintPolicyIssuance: [
            {
                id: 0,
                value: 'policyNotIssued',
                display: 'Policy Not issued'
            },
            {
                id: 1,
                value: 'HardCopyNotReceived',
                display: 'Hard Copy of Policy Not Received'
            },
            {
                id: 2,
                value: 'SoftCopyNotReceived',
                display: 'Soft Copy of Policy Not Received'
            },
            {
                id: 3,
                value: 'HealthCard',
                display: 'Health Card/E-Card Related '
            },
            {
                id: 4,
                value: 'incorrectPolicy',
                display: 'Incorrect Policy'
            },
            // {
            //     id: 5,
            //     value: 'informationRelated',
            //     display: 'Information Related'
            // },
            {
                id: 5,
                value: 'Others',
                display: 'Others'
            },
        ],
        TypeofComplaintClaimsManagement: [
            {
                id: 0,
                value: 'delayInClaim',
                display: 'Delay in Claim Settlement'
            },
            {
                id: 1,
                value: 'documentsRelated',
                display: 'Documents Related'

            },
            {
                id: 2,
                value: 'paymentRelated',
                display: 'Payment Related'
            },
            {
                id: 3,
                value: 'repudiation',
                display: 'Repudiation/Rejection of Claim'
            },
            {
                id: 4,
                value: 'unsatisfactory',
                display: 'Unsatisfactory/Incorrect Settlement Amount'
            },


            {
                id: 5,
                value: 'tpaRelated',
                display: 'TPA related'
            },
            {
                id: 6,
                value: 'others',
                display: 'Others'
            },
        ],
        TypeofComplaintpolicyManagement: [
            {
                id: 0,
                value: 'changesInPolicy',
                display: 'Changes Required in Policy'
            },
            {
                id: 1,
                value: 'additionInsured',
                display: 'Addition of Insured Member'
            },
            {
                id: 2,
                value: 'addressChange',
                display: 'Address Change'
            },
            {
                id: 3,
                value: 'changeInAge',
                display: 'Change in Age/ Date of Birth of Insured Member'
            },
            {
                id: 4,
                value: 'changeInPrevious',
                display: 'Change in Previous Policy Details'
            },
            {
                id: 5,
                value: 'contactDetails',
                display: 'Contact Details Change/Update'
            },
            {
                id: 6,
                value: 'correctionRelationship',
                display: 'Correction of Relationship'
            },
            {
                id: 7,
                value: 'deletionInsured',
                display: 'Deletion of Insured Member'
            },
            {
                id: 8,
                value: 'nameCorrection',
                display: 'Name Correction/Change'
            },
            {
                id: 9,
                value: 'nomineeDetails',
                display: 'Nominee Details Change/Update'
            },
            {
                id: 10,
                value: 'rectificationGender',
                display: 'Rectification in Gender of the Proposer/ Insured Person'
            },
            {
                id: 11,
                value: 'endorsementNotReceived',
                display: 'Endorsement Not Received'
            },
            {
                id: 12,
                value: 'incorrectEndorsementIssued',
                display: 'Incorrect Endorsement Issued'
            },
            {
                id: 13,
                value: 'incorrectEndorsementPremiumDebited',
                display: 'Incorrect Endorsement Premium Debited'
            },
            {
                id: 14,
                value: 'annualHealthCheckUpRelated',
                display: 'Annual Health Check Up Related'
            },
            {
                id: 15,
                value: 'policyCancellation',
                display: 'Policy Cancellation'
            },
            {
                id: 16,
                value: 'others',
                display: 'Others'
            },
        ],
        TypeofComplaintRefund: [
            {
                id: 0,
                value: 'delayInClaim',
                display: 'Refund Not Received'
            },
            {
                id: 1,
                value: 'renewalConditions',
                display: 'Cheque Issued Not Received'
            },
            {
                id: 2,
                value: 'renewalNotice',
                display: 'Dispute on Refunded Amount'
            },
            {
                id: 3,
                value: 'documentsRelated',
                display: 'Documents Related'
            },
            {
                id: 4,
                value: 'Others',
                display: 'Others'
            },
        ],
        TypeofComplaintRenewal: [
            {
                id: 0,
                value: 'renewalNotice',
                display: 'Renewal Notice Not Received'
            },
            {
                id: 1,
                value: 'delayRenewal',
                display: 'Delay in Renewal'
            },
            {
                id: 2,
                value: 'renewalNotDebited',
                display: 'Renewal Premium Not Debited'
            },
            {
                id: 3,
                value: 'renewalPremiumRelated',
                display: 'Renewal Premium Related'
            },
            {
                id: 4,
                value: 'renewalConditionsRelated',
                display: 'Renewal Conditions Related'
            },
            {
                id: 5,
                value: 'revivalLapsedPolicy',
                display: 'Revival of Lapsed Policy'
            },
            {
                id: 6,
                value: 'denialRenewal',
                display: 'Denial of Renewal'
            },
            {
                id: 7,
                value: 'Portability',
                display: 'Portability'
            },

            {
                id: 8,
                value: 'Others',
                display: 'Others'
            },
        ],
        TypeofOtherComplaint: [
            {
                id: 0,
                value: 'callBack',
                display: 'Call Back'
            },
            {
                id: 1,
                value: 'technicalTrobuleshooting',
                display: 'Technical Trobuleshooting'
            },
            {
                id: 2,
                value: 'Others',
                display: 'Others'
            },
        ],
        policies: [],
        policyNumber: '',
        complaint_relate: '',
        complaint_type: '',
        customerName: '',
        mobile: '',
        email: '',
        consent: false,
        complaints: '',
        submitCheck: true,
        submittextfield: true,
        errorMessage: false,
        isFormValid: false,
    };

    handleChange = name => event => {
        let isValid=false;
        if (name === 'policyNumber') {
            const currentPol = this.state.policies.filter(pol => pol.policyNo === event.target.value)[0]
            this.setState({ customerName: currentPol.name, email: currentPol.email, mobile: currentPol.mobile })

        }
        this.setState({
            [name]: event.target.value
        })
        if ([name] == 'complaints' && event.target.value.length > 0) {
            this.setState({ submittextfield: false })

        } else {
            this.setState({ submittextfield: true })
        }
        if ([name] == 'consent' && event.target.value == 'true') {
            this.setState({ submitCheck: false, consent: false })
        } else {
            this.setState({ submitCheck: true, consent: true })
        }
    }
    componentWillMount() {
        this.getPolicyNumbers()
    }
    getPolicyNumbers() {
        const token = localStorage.getItem("token")
        const params = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }
        const vm = this;
        axios.get(`${constants.apiRootURL}/secure/policy-info`, params)
            .then(response => {
                this.setState({
                    policies: response.data
                })
            }).catch(error => {
                if (error.response.status === 400) {
                    this.setState({
                        openSnack: true
                    })
                }
                // if (error.response.status === 401) {
                //     localStorage.clear();
                //     this.props.onAuthFail()
                //     this.props.history.push('/login-customer')
                // }
                if (error.response.status === 403) {
                    this.props.history.push('/500')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })

    }

    saveLevel1 = () => {
        const token = localStorage.getItem("token")
        const params = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }
        const vm = this;
        const { policyNumber, complaint_relate, complaint_type, customerName, mobile, email, complaints } = this.state
        const data = {
            "policyNo": policyNumber,
            "complaintRelatedTo": complaint_relate,
            "typeOfComplaint": complaint_type,
            "customerName": customerName,
            "mobile": mobile,
            "email": email,
            "complaints": complaints
        }
        axios.post(`${constants.apiRootURL}/secure/complaint-level1`, data, params)
            .then(response => {
                alert(response.data)
                this.setState({ show_additional: false })
            }).catch(error => {
                if (error.response.status === 400) {
                    this.setState({
                        openSnack: true
                    })
                }
                // if (error.response.status === 401) {
                //     localStorage.clear();
                //     this.props.onAuthFail()
                //     this.props.history.push('/login-customer')
                // }
                if (error.response.status === 403) {
                    this.props.history.push('/500')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })

    }

    handleError = () => {
        const token = localStorage.getItem("token")
        if (token) {
            if (!this.state.policyNumber && !this.state.complaint_relate) {
                this.setState({ errorMessage: !this.state.errorMessage })

            }
            if (!this.state.complaint_type) {
                this.setState({ errorMessage: !this.state.errorMessage })
            }
            if (this.state.policyNumber && this.state.complaint_relate && this.state.complaint_type) {
                this.setState(
                    { show_additional: true })
            }
        }
      else {
        if (!this.state.complaint_type) {
            this.setState({ errorMessage: !this.state.errorMessage })
        }
        if ( this.state.complaint_relate && this.state.complaint_type) {
            this.setState(
                { show_additional: true })
        }
    }
    }


    render() {
        const { classes } = this.props

        return (
            <div style={{ paddingTop: '3rem' }}>
                <div className="mui-container">
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
                    <h3 className="level_1_heading">
                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.Level1SubmittingAComplaintForTheFirstTime : ''}
                    </h3>
                    <h3 className="level_1_heading_2">
                        Please fill the form to submit your request/complaint.
                    </h3>
                    <Row>
                        <Col md="4">
                            {this.state.policies.length > 0 && <FormControl fullWidth >
                                <NativeSelect required
                                    value={this.state.policyNumber}
                                    onChange={this.handleChange('policyNumber')}
                                    input={<Input name="age" id="age-native-label-placeholder" />}
                                >
                                    <option value={""}>{'Select Policy No'}</option>
                                    {this.state.policies.map(pol =>
                                        <option value={pol.policyNo}>{pol.policyNo}</option>
                                    )}


                                </NativeSelect>
                            </FormControl>}
                            <FormControl fullWidth margin="dense">
                                <InputLabel htmlFor="complaint_relate_level1">{this.props.FetchedLanguage ? this.props.FetchedLanguage.Level1InputLabelComplaintRelatedTo : ''}</InputLabel>
                                <Select
                                    value={this.state.complaint_relate}
                                    onChange={this.handleChange('complaint_relate')}
                                    inputProps={{
                                        name: 'complaint_relate',
                                        id: 'complaint_relate_level1',
                                    }}
                                >
                                    {this.state.complaintRelatedTo.map(item => {
                                        return (
                                            <MenuItem value={item.value}>{item.display}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel htmlFor="type_complaint_level1">{this.props.FetchedLanguage ? this.props.FetchedLanguage.Level1InputLabelTypeOfComplaint : ''}</InputLabel>
                                <Select
                                    onChange={this.handleChange('complaint_type')}
                                    value={this.state.complaint_type}
                                    inputProps={{
                                        name: 'complaint_type',
                                        id: 'type_complaint_level1',
                                    }}
                                >
                                    {this.state.complaint_relate === 'buying' &&
                                        this.state.TypeofComplaintBuying.map(item => {
                                            return (
                                                <MenuItem value={item.value}>{item.display}</MenuItem>
                                            )
                                        })}
                                    {this.state.complaint_relate === 'PolicyIssuance' &&
                                        this.state.TypeofComplaintPolicyIssuance.map(item => {
                                            return (
                                                <MenuItem value={item.value}>{item.display}</MenuItem>
                                            )
                                        })}
                                    {this.state.complaint_relate === 'claimsManagement' &&
                                        this.state.TypeofComplaintClaimsManagement.map(item => {
                                            return (
                                                <MenuItem value={item.value}>{item.display}</MenuItem>
                                            )
                                        })}

                                    {this.state.complaint_relate === 'policyManagement' &&
                                        this.state.TypeofComplaintpolicyManagement.map(item => {
                                            return (
                                                <MenuItem value={item.value}>{item.display}</MenuItem>
                                            )
                                        })}
                                    {this.state.complaint_relate === 'refund' &&
                                        this.state.TypeofComplaintRefund.map(item => {
                                            return (
                                                <MenuItem value={item.value}>{item.display}</MenuItem>
                                            )
                                        })}
                                    {this.state.complaint_relate === 'renewal' &&
                                        this.state.TypeofComplaintRenewal.map(item => {
                                            return (
                                                <MenuItem value={item.value}>{item.display}</MenuItem>
                                            )
                                        })}
                                    {this.state.complaint_relate === 'other' &&
                                        this.state.TypeofOtherComplaint.map(item => {
                                            return (
                                                <MenuItem value={item.value}>{item.display}</MenuItem>
                                            )
                                        })}
                                </Select>
                            </FormControl>
                        </Col>
                    </Row>
                    {!this.state.show_additional &&
                        <Row>
                            <Col md="5">
                                <div className="submit_1_level_1 mui--hidden-xs mui--hidden-sm">
                                    <ButtonLightSuccess fullWarningPink={true} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level1ButtonTextSubmit : ''} onClick={this.handleError}

                                    />
                                </div>
                                <div className="submit_1_level_2 mui--hidden-md mui--hidden-lg mui--hidden-xl">
                                    <ButtonLightSuccess fullWarningPink={true} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level1ButtonTextSubmit : ''} fullWidth={true} onClick={this.handleError}
                                    />


                                </div>
                            </Col>
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                open={this.state.errorMessage && !this.state.complaint_type}
                                autoHideDuration={4000}
                                // onClose={handleClose}


                                ContentProps={{
                                    classes: {
                                        root: classes.errorMessage1
                                    }
                                }}
                                message={<span id="message-id">please select Type of complaint</span>}
                            />

                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                open={this.state.errorMessage && !this.state.complaint_relate}
                                autoHideDuration={6000}
                                // onClose={handleClose}


                                ContentProps={{
                                    classes: {
                                        root: classes.errorMessage1
                                    }
                                }}
                                message={<span id="message-id">please select complaint related</span>}
                            />
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                open={this.state.errorMessage && !this.state.policyNumber}
                                autoHideDuration={3000}
                                // onClose={handleClose}


                                ContentProps={{
                                    classes: {
                                        root: classes.errorMessage1
                                    }
                                }}
                                message={<span id="message-id">please select policy number</span>}
                            />
                        </Row>
                    }
                    {this.state.show_additional &&

                        <div className="additional_level_1">
                            <h3 className="adtnl_details">{this.props.FetchedLanguage ? this.props.FetchedLanguage.Level1HeadingAdditionalDetail : ''}</h3>
                            <Row>
                                <Col md="4">
                                    <TextField
                                        label={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level1InputLabelCustomerName : ''}
                                        margin="dense"
                                        onChange={this.handleChange('customerName')}
                                        value={this.state.customerName}
                                        fullWidth />
                                    <TextField
                                        label={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level1InputLabelPhoneNumber : ''}
                                        margin="dense"
                                        onChange={this.handleChange('mobile')}
                                        value={this.state.mobile}
                                        fullWidth />
                                    <TextField
                                        label={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level1InputLabelEmailId : ''}
                                        margin="dense"
                                        value={this.state.email}
                                        onChange={this.handleChange('email')}
                                        fullWidth />
                                </Col>
                            </Row>
                            <h3 className="f_c_heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.Level1HeadingFeedbackComplaints : ''}</h3>
                            <Row>
                                <Col md="9">
                                    <textarea required
                                        rows="9"
                                        style={{
                                            width: '100%',
                                            borderRadius: '4px'
                                        }}
                                        value={this.state.complaints}
                                        onChange={this.handleChange('complaints')}></textarea>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                onChange={this.handleChange('consent')}
                                                value={this.state.consent}
                                                name='consent'
                                            />
                                        }
                                        label={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level1InputCheckboxLabel : ''}
                                    />
                                    <div className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
                                        <ButtonLightSuccess fullWarningPink={true} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level1ButtonTextSubmit : ''}
                                            onClick={this.saveLevel1}
                                            fullWidth={true} />
                                    </div>
                                    <div className="mui--hidden-sm mui--hidden-xs" style={{ float: 'right', marginTop: '1rem', marginBottom: '3rem' }}>
                                        <ButtonLightSuccess
                                            disabled={this.state.submitCheck && this.state.submittextfield}
                                            fullWarningPink={true} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level1ButtonTextSubmit : ''}
                                            onClick={this.saveLevel1} />
                                    </div>

                                </Col>
                            </Row>
                        </div>

                    }
                </div>
            </div>
        )
    }
}

Level1.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    CurrentLanguage: state.language.current_language,
    FetchedLanguage: state.language.lang_data,
    isAuthenticated: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
    // onAuth: (email, password) => dispatch({ type: 'AUTH_START', email, password }),
    // onAuthFail: () => dispatch({ type: 'AUTH_FAIL' }),
    // onAuthSuccess: (data) => dispatch({ type: 'AUTH_SUCCESS', data }),
    // onAuthSuccessUSER: (username) => dispatch({ type: 'SET_USER', username })
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Level1));
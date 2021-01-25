import React from 'react'
import Panel from 'muicss/lib/react/panel'
import { connect } from 'react-redux'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import './vehicle.css'

const styles = theme => ({
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
    }
});


class PreviousInsurer extends React.Component {

    state = {
        vehicle_flag_init: true,
        policyForm: {
            previousInsurance: {
                value: 'false',
                validation: {
                    required: true,
                },
                valid: true,
                touched: false
            },
            claim: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            previousInsurerName: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            numberOfClaims: {
                value: 1,
                validation: {
                    required: false,
                },
                valid: true,
                touched: false
            },
            policyStartDate: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            policyEndDate: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            previousPolicyNumber: {
                value: '',
                validation: {
                    required: true,
                    shouldAcceptAlphaNumericCharactersOnly: true
                },
                valid: false,
                touched: false
            },
            prevSumInsured: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }
        },
        insurers: [
            { id: '#', label: 'Previous Insurer Name' },
            { id: 0, label: 'Acko General Insurance Ltd.', value: 'Acko General Insurance Ltd.' },
            { id: 1, label: 'Aditya Birla Health Insurance Co. Ltd.', value: 'Aditya Birla Health Insurance Co. Ltd.' },
            { id: 3, label: 'Agriculture Insurance Company of India Ltd.', value: 'Agriculture Insurance Company of India Ltd.' },
            { id: 4, label: 'Apollo Munich Health Insurance Co. Ltd', value: 'Apollo Munich Health Insurance Co. Ltd' },
            { id: 5, label: 'Bajaj Allianz Allianz General Insurance Co. Ltd', value: 'Bajaj Allianz Allianz General Insurance Co. Ltd' },
            { id: 6, label: 'Bharti AXA General Insurance Co. Ltd.', value: 'Bharti AXA General Insurance Co. Ltd.' },
            { id: 7, label: 'Cholamandalam MS General Insurance Co. Ltd.', value: 'Cholamandalam MS General Insurance Co. Ltd.' },
            { id: 8, label: 'CIGNA TTK Health Insurance Co. Ltd.', value: 'CIGNA TTK Health Insurance Co. Ltd.' },
            { id: 9, label: 'DHFL General Insurance Ltd.', value: 'DHFL General Insurance Ltd.' },
            { id: 10, label: 'Edelweiss General Insurance Co. Ltd.', value: 'Edelweiss General Insurance Co. Ltd.' },
            { id: 11, label: 'ECGC Ltd.', value: 'ECGC Ltd.' },
            { id: 12, label: 'Future Generali India Insurance Co. Ltd.', value: 'Future Generali India Insurance Co. Ltd.' },
            { id: 13, label: 'Go Digit General Insurance Ltd', value: 'Go Digit General Insurance Ltd' },
            { id: 14, label: 'HDFC ERGO General Insurance Co.Ltd.', value: 'HDFC ERGO General Insurance Co.Ltd.' },
            { id: 15, label: 'ICICI LOMBARD General Insurance Co. Ltd.', value: 'ICICI LOMBARD General Insurance Co. Ltd.' },
            { id: 16, label: 'IFFCO TOKIO General Insurance Co. Ltd.', value: 'IFFCO TOKIO General Insurance Co. Ltd.' },
            { id: 17, label: 'Kotak Mahindra General Insurance Co. Ltd.', value: 'Kotak Mahindra General Insurance Co. Ltd.' },
            { id: 18, label: 'Liberty General Insurance Ltd.', value: 'Liberty General Insurance Ltd.' },
            { id: 19, label: 'Magma HDI General Insurance Co. Ltd.', value: 'Magma HDI General Insurance Co. Ltd.' },
            { id: 20, label: 'Max Bupa Health Insurance Co. Ltd', value: 'Max Bupa Health Insurance Co. Ltd' },
            { id: 21, label: 'National Insurance Co. Ltd.', value: 'National Insurance Co. Ltd.' },
            { id: 22, label: 'Raheja QBE General Insurance Co. Ltd.', value: 'Raheja QBE General Insurance Co. Ltd.' },
            { id: 23, label: 'Reliance General Insurance Co.Ltd', value: 'Reliance General Insurance Co.Ltd' },
            { id: 24, label: 'Reliance Health Insurance Ltd.', value: 'Reliance Health Insurance Ltd.' },
            { id: 25, label: 'Religare Health Insurance Co. Ltd', value: 'Religare Health Insurance Co. Ltd' },
            { id: 26, label: 'Royal Sundaram General Insurance Co. Ltd.', value: 'Royal Sundaram General Insurance Co. Ltd.' },
            { id: 27, label: 'SBI General Insurance Co. Ltd.', value: 'SBI General Insurance Co. Ltd.' },
            { id: 28, label: 'Shriram General Insurance Co. Ltd.', value: 'Shriram General Insurance Co. Ltd.' },
            { id: 29, label: 'Star Health & Allied Insurance Co.Ltd.', value: 'Star Health & Allied Insurance Co.Ltd.' },
            { id: 30, label: 'Tata AIG General Insurance Co. Ltd.', value: 'Tata AIG General Insurance Co. Ltd.' },
            { id: 31, label: 'The New India Assurance Co. Ltd', value: 'The New India Assurance Co. Ltd' },
            { id: 32, label: 'United India Insurance Co. Ltd.', value: 'United India Insurance Co. Ltd.' },
            { id: 33, label: 'Universal Sompo General Insurance Co. Ltd.', value: 'Universal Sompo General Insurance Co. Ltd.' },
        ],
        formIsValid: false,
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (rules.shouldAcceptAlphaNumericCharactersOnly) {
            isValid = value.match(/^[a-zA-Z0-9_]+$/) && isValid
        }
        return isValid
    }
    handleChange = name => event => {
        if(name === 'prevSumInsured') {
            if (event.target.value.length >9)
                return
        }
        const updatedProposalForm = {
            ...this.state.policyForm
        }
        const updatedFormElement = {
            ...updatedProposalForm[name]
        }

        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)

        updatedFormElement.touched = true
        updatedProposalForm[name] = updatedFormElement;

        let formIsValid = true;
        if (name === 'previousInsurance') {
            if (event.target.value === 'false') {
                formIsValid = true;
            } else {
                for (let name in updatedProposalForm) {
                    if(name === 'noOfClaims') {
                        if(updatedFormElement['claim'].value === 'true') {
                            formIsValid = updatedProposalForm[name].valid && formIsValid
                        } else {
                            formIsValid = true && formIsValid
                        }
                    } else {
                        formIsValid = updatedProposalForm[name].valid && formIsValid
                    }
                }
            }
        } else {            
            for (let name in updatedProposalForm) {
                if(name === 'noOfClaims') {
                    if(updatedFormElement['claim'].value === 'true') {
                        formIsValid = updatedProposalForm[name].valid && formIsValid
                    } else {
                        formIsValid = true && formIsValid
                    }
                } else {
                    formIsValid = updatedProposalForm[name].valid && formIsValid
                }
                
            }
        }


        this.setState({ policyForm: updatedProposalForm, formIsValid: formIsValid });

        const previouPolicyDetails = {
            hasPreviuousInsurance: updatedProposalForm.previousInsurance.value ? updatedProposalForm.previousInsurance.value : '',
            previousInsurerName: updatedProposalForm.previousInsurerName.value ? updatedProposalForm.previousInsurerName.value : '',
            previousPolicyNumber: updatedProposalForm.previousPolicyNumber.value ? updatedProposalForm.previousPolicyNumber.value : '',
            prevSumInsured: updatedProposalForm.prevSumInsured.value ? updatedProposalForm.prevSumInsured.value : '',
            policyStartDate: updatedProposalForm.policyStartDate.value ? updatedProposalForm.policyStartDate.value : '',
            policyEndDate: updatedProposalForm.policyEndDate.value ? updatedProposalForm.policyEndDate.value : '',
            claim: updatedProposalForm.claim.value ? updatedProposalForm.claim.value : '',
            noOfClaims: updatedProposalForm.numberOfClaims.value ? updatedProposalForm.numberOfClaims.value : ''
        }
        localStorage.setItem("prevInsurer", JSON.stringify(previouPolicyDetails))
    };

    handleContinueContact = () => {
        const previouPolicyDetails = {
            hasPreviuousInsurance: this.state.policyForm.previousInsurance.value,
            previousInsurerName: this.state.policyForm.previousInsurerName.value,
            previousPolicyNumber: this.state.policyForm.previousPolicyNumber.value,
            prevSumInsured: this.state.policyForm.prevSumInsured.value,
            policyStartDate: this.state.policyForm.policyStartDate.value,
            policyEndDate: this.state.policyForm.policyEndDate.value,
            claim: this.state.policyForm.claim.value,
            noOfClaims: this.state.policyForm.numberOfClaims.value
        }
        const PreviousPolicyData = {
            ...this.props.proposalFormDataHealth,
            ...previouPolicyDetails
        };
        this.props.loadProposalFormHealth(PreviousPolicyData);
    }

    componentDidMount() {
        this.loadLocalData()
    }

    loadLocalData() {
        const policyDataL = JSON.parse(localStorage.getItem("prevInsurer"))
        const policyData = policyDataL ? policyDataL : {}
        let policyForm = this.state.policyForm
        if (policyData.hasPreviuousInsurance) {
            policyForm.previousInsurance.value = policyData.hasPreviuousInsurance
            policyForm.previousInsurance.valid = true
            policyForm.previousInsurance.touched = true
        }


        if (policyData.previousInsurerName) {
            policyForm.previousInsurerName.value = policyData.previousInsurerName
            policyForm.previousInsurerName.valid = true
            policyForm.previousInsurerName.touched = true
        }

        if (policyData.previousPolicyNumber) {
            policyForm.previousPolicyNumber.value = policyData.previousPolicyNumber
            policyForm.previousPolicyNumber.valid = true
            policyForm.previousPolicyNumber.touched = true
        }
        if (policyData.prevSumInsured) {
            policyForm.prevSumInsured.value = policyData.prevSumInsured
            policyForm.prevSumInsured.valid = true
            policyForm.prevSumInsured.touched = true
        }

        if (policyData.policyStartDate) {
            policyForm.policyStartDate.value = policyData.policyStartDate
            policyForm.policyStartDate.valid = true
            policyForm.policyStartDate.touched = true
        }

        if (policyData.policyEndDate) {
            policyForm.policyEndDate.value = policyData.policyEndDate
            policyForm.policyEndDate.valid = true
            policyForm.policyEndDate.touched = true
        }
        if (policyData.claim) {
            policyForm.claim.value = policyData.claim
            policyForm.claim.valid = true
            policyForm.claim.touched = true
        }

        if (policyData.noOfClaims) {
            policyForm.numberOfClaims.value = policyData.noOfClaims
            policyForm.numberOfClaims.valid = true
            policyForm.numberOfClaims.touched = true
        }
        let formIsValid = true;
        if (policyData.hasPreviuousInsurance === "true") {
            for (let name in policyForm) {
                formIsValid = policyForm[name].valid && formIsValid

            }
        }

        this.setState({ policyForm: policyForm, formIsValid });
        const PreviousPolicyData = {
            ...this.props.proposalFormDataHealth,
            ...policyData
        };
        this.props.loadProposalFormHealth(PreviousPolicyData);
    }

    uploadData() {
        if (this.props.isProposalSummary) {
            const policyData = this.props.proposalFormDataHealth
            let policyForm = this.state.policyForm
            policyForm.previousInsurance.value = policyData.hasPreviuousInsurance
            policyForm.previousInsurance.valid = true
            policyForm.previousInsurance.touched = true

            policyForm.previousInsurerName.value = policyData.previousInsurerName
            policyForm.previousInsurerName.valid = true
            policyForm.previousInsurerName.touched = true

            policyForm.previousPolicyNumber.value = policyData.previousPolicyNumber
            policyForm.previousPolicyNumber.valid = true
            policyForm.previousPolicyNumber.touched = true

            policyForm.prevSumInsured.value = policyData.prevSumInsured
            policyForm.prevSumInsured.valid = true
            policyForm.prevSumInsured.touched = true

            policyForm.policyStartDate.value = policyData.policyStartDate
            policyForm.policyStartDate.valid = true
            policyForm.policyStartDate.touched = true

            policyForm.policyEndDate.value = policyData.policyEndDate
            policyForm.policyEndDate.valid = true
            policyForm.policyEndDate.touched = true

            policyForm.claim.value = policyForm.claim
            policyForm.claim.valid = true
            policyForm.claim.touched = true

            policyForm.numberOfClaims.value = policyData.noOfClaims
            policyForm.numberOfClaims.valid = true
            policyForm.numberOfClaims.touched = true

            let formIsValid = true;
            for (let name in policyForm) {
                formIsValid = policyForm[name].valid && formIsValid

            }
            this.setState({ policyForm: policyForm, formIsValid });
        }
    }
    render() {
        const { classes } = this.props;
        const formData = this.props.proposalFormDataHealth
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();
        
        if (dd < 10) {
          dd = "0" + dd;
        }
        
        if (mm < 10) {
          mm = "0" + mm;
        }
        
        today = yyyy + "-" + mm + "-" + dd;
        return (
            <div className="vehicle-detail-parent">
                <Panel>
                    {(this.props.step < 5 && this.state.vehicle_flag_init) &&
                        <Row>
                            <Col md="11" sm="10" xs="10">
                                <p className="step-details">Step 6 of {this.props.totalSteps}</p>
                                <p className="step-name">Previous Insurer Details</p>
                            </Col>
                            <Col md="1" sm="2" xs="2">
                                <p
                                    className="edit"
                                    /*onClick={() => { this.props.setStep(3) }}*/>Edit</p>
                            </Col>
                        </Row>
                    }

                    {(this.props.step === 5) &&
                        <div className="form-vehicle-details">
                            <h3 className="personal-details-heading">Previous Insurer Details</h3>
                            <p className="step-detail-success">Step 6 of {this.props.totalSteps}</p>
                            <hr />
                            <form noValidate autoComplete={false} style={{ marginRight: window.innerWidth < 768 ? '0' : '' }}>
                                <Row>
                                    <Col md="5">
                                        <FormControl className={[classes.formControl, "previous_radiobtns"].join(" ")} margin="dense"
                                            error={!this.state.policyForm.previousInsurance.valid
                                                && this.state.policyForm.previousInsurance.touched} fullWidth>
                                            <FormLabel
                                                component="legend"
                                                classes={{
                                                    root: classes.label2,
                                                    focused: classes.focused_label
                                                }}>Previous Insurance?</FormLabel>
                                            <RadioGroup
                                                aria-label="Previous Insurance?"
                                                name="previousInsurance"
                                                required={true}
                                                className={classes.group}
                                                value={this.state.policyForm.previousInsurance.value}
                                                onChange={this.handleChange('previousInsurance')}
                                                row
                                            >
                                                <FormControlLabel value="true" control={<Radio classes={{
                                                    root: classes.root,
                                                    checked: classes.checked,
                                                }} />} label="Yes" />
                                                <FormControlLabel value="false" control={<Radio classes={{
                                                    root: classes.root,
                                                    checked: classes.checked,
                                                }} />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                        {/* Previous Policy Number */}
                                        {this.state.policyForm.previousInsurance.value === 'true' &&
                                            <div>
                                                <FormControl className="previousPolicy" fullWidth>
                                                    <TextField
                                                        required={true}
                                                        id="previousPolicyNumber"
                                                        label="Previous Policy Number"
                                                        value={this.state.policyForm.previousPolicyNumber.value}
                                                        onChange={this.handleChange('previousPolicyNumber')}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="previousPolicyNumber"
                                                        margin="normal"
                                                        fullWidth
                                                        error={!this.state.policyForm.previousPolicyNumber.valid
                                                            && this.state.policyForm.previousPolicyNumber.touched}
                                                    />
                                                </FormControl>
                                                <FormControl margin="dense"
                                                    error={!this.state.policyForm.claim.valid
                                                        && this.state.policyForm.claim.touched} fullWidth>
                                                    <FormLabel
                                                        component="legend"
                                                        classes={{
                                                            root: classes.label2,
                                                            focused: classes.focused_label
                                                        }}>Claim in previous policy</FormLabel>
                                                    <RadioGroup
                                                        aria-label="Previous Insurance?"
                                                        name="claim"
                                                        required={true}
                                                        className={classes.group}
                                                        value={this.state.policyForm.claim.value}
                                                        onChange={this.handleChange('claim')}
                                                        row
                                                    >
                                                        <FormControlLabel value="true" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label="Yes" />
                                                        <FormControlLabel value="false" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label="No" />
                                                    </RadioGroup>
                                                </FormControl>

                                                <FormControl className="policyStartDate" fullWidth
                                                    required>
                                                    <TextField
                                                        required={true}
                                                        id="date"
                                                        type="date"
                                                        // defaultValue="2017-05-24"
                                                        InputProps={{ inputProps:{max:today}}}
                                                        defaultValue={today}
                                                        label="Policy Start date"
                                                        error={!this.state.policyForm.policyStartDate.valid
                                                            && this.state.policyForm.policyStartDate.touched}
                                                        value={this.state.policyForm.policyStartDate.value}
                                                        onChange={this.handleChange('policyStartDate')}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="dob"
                                                        maxLength='1'
                                                        margin="normal"
                                                        fullWidth
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </FormControl></div>}
                                    </Col>
                                    <Col md="1"></Col>
                                    <Col md="5">



                                        <div className="previous_insurerAlign">
                                            {this.state.policyForm.previousInsurance.value === 'true' && <div>
                                                <FormControl fullWidth className="prev-insurer-name">
                                                    <TextField
                                                        required={true}
                                                        id="previousInsurerName"
                                                        select
                                                        label=""
                                                        className={classes.textField}
                                                        value={this.state.policyForm.previousInsurerName.value}
                                                        onChange={this.handleChange('previousInsurerName')}
                                                        SelectProps={{
                                                            native: true,
                                                            MenuProps: {
                                                                className: classes.menu,
                                                            },
                                                        }}
                                                        helperText=""
                                                        margin="dense"
                                                        name="previousInsurerName"
                                                        fullWidth
                                                        error={!this.state.policyForm.previousInsurerName.valid
                                                            && this.state.policyForm.previousInsurerName.touched}
                                                    >
                                                        {this.state.insurers.map((option, index) => (
                                                            index === 0 ? <option key={option.value} value={''} >
                                                                {option.label}
                                                            </option> : <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                        ))}
                                                    </TextField>
                                                </FormControl>
                                                <FormControl className="sum_assured" fullWidth>
                                                    
                                                    <TextField
                                                        required={true}
                                                        type="number"
                                                        id="prevSumInsured"
                                                        label="Sum Insured"
                                                        value={this.state.policyForm.prevSumInsured.value}
                                                        onChange={this.handleChange('prevSumInsured')}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="prevSumInsured"
                                                        margin="normal"
                                                        inputProps={{ max: 999999999 }}
                                                        fullWidth
                                                        error={!this.state.policyForm.prevSumInsured.valid
                                                            && this.state.policyForm.prevSumInsured.touched}
                                                    />
                                                </FormControl>
                                                {this.state.policyForm.claim.value === 'true' && <FormControl required
                                                    error={!this.state.policyForm.numberOfClaims.valid
                                                        && this.state.policyForm.numberOfClaims.touched}
                                                    className={[classes.formControl, "number_claims"]} fullWidth>
                                                    <InputLabel htmlFor="numberOfClaims" >Number of claims</InputLabel>
                                                    <Select name="numberOfClaims"
                                                        // value={this.state.proposerDetails.nationality}
                                                        value={this.state.policyForm.numberOfClaims.value}
                                                        onChange={this.handleChange('numberOfClaims')}
                                                        disabled={this.state.policyForm.claim.value == "true" ? false : true}
                                                        inputProps={{
                                                            name: 'numberOfClaims',
                                                            id: 'numberOfClaims',
                                                        }}

                                                    >
                                                        {new Array(20).fill(0, 0).map((i, index) =>
                                                            <MenuItem value={index + 1} >{index + 1}</MenuItem>
                                                        )}
                                                    </Select>
                                                </FormControl>}
                                                <FormControl  className="policy_end_date" fullWidth
                                                    required>
                                                    <TextField
                                                        required={true}
                                                        id="date"
                                                        type="date"
                                                        // defaultValue="2017-05-24"
                                                        InputProps={{ inputProps:{max:today}}}
                                                        // defaultValue="2019-01-01"
                                                        defaultValue={today}
                                                       
                                                        label="Policy End Date"
                                                        error={!this.state.policyForm.policyEndDate.valid
                                                            && this.state.policyForm.policyEndDate.touched}
                                                        value={this.state.policyForm.policyEndDate.value}
                                                        onChange={this.handleChange('policyEndDate')}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="dob"
                                                        maxLength='1'
                                                        margin="normal"
                                                        fullWidth
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </FormControl> </div>}
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                            {/* // Button next */}
                            <div className="button-next">
                                <Button disabled={!this.state.formIsValid}
                                    className={classNames(classes.buttonRoot3)}
                                    onClick={() => { this.props.setStep(6); this.handleContinueContact(); }}>
                                    Continue to Contact Detail
                                </Button>
                            </div>
                        </div>
                    }
                    {/* Now show form details */}
                    {this.props.step > 5 &&
                        <div className="personal-show-details">
                            <Row>
                                <Col md="11" sm="10" xs="10">
                                    <h3 className="step-detail">Step 6 of {this.props.totalSteps}</h3>
                                    <h3 className="personal-heading">Previous Insurer Details</h3>
                                </Col>
                                <Col md="1" sm="2" xs="2">
                                {this.props.step < 7 &&
                                    <h3
                                        className="edit"
                                        onClick={() => { this.props.setStep(5); this.uploadData() }}>Edit</h3>
                                }
                                </Col>
                            </Row>
                            <div className="mui--hidden-xs mui--hidden-sm"><hr /></div>
                            <div className="mui--hidden-lg mui--hidden-xl mui--hidden-md"><hr style={{ marginTop: '-2px' }} /></div>

                            {/* Here details of filled elements */}
                            <div className="desktop-data mui--hidden-sm mui--hidden-xs">
                                <Row>
                                    <Col md="4">
                                        <p className="key-name">Previous Insurance?</p>
                                        <p className="key-value">{formData.hasPreviuousInsurance === "true" ? 'Yes' : 'No'}</p>
                                    </Col>
                                    {formData.hasPreviuousInsurance === 'true' &&<React.Fragment><Col md="4">
                                        <p className="key-name">Previous Insurer Name:</p>
                                        <p className="key-value">{formData.previousInsurerName}</p>
                                    </Col>
                                    <Col md="4">
                                        <p className="key-name">Previous Policy Number:</p>
                                        <p className="key-value">{formData.previousPolicyNumber}</p>
                                    </Col></React.Fragment>}
                                </Row>
                                {formData.hasPreviuousInsurance === 'true' && <React.Fragment><Row>
                                    <Col md="4">
                                        <p className="key-name">Claims?</p>
                                        <p className="key-value">{formData.claim === "true" ? 'Yes' : 'No'}</p>
                                    </Col>
                                    {formData.claim === "true" && <Col md="4" style={{ marginBottom: '17px', marginTop: '-5px' }}>
                                        <p className="key-name">No Of Claims:</p>
                                        <p className="key-value">{formData.noOfClaims}</p>
                                    </Col>}
                                    <Col md="4">
                                        <p className="key-name">Policy Start Date:</p>
                                        <p className="key-value">{formData.policyStartDate}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <p className="key-name">Policy end Date:</p>
                                        <p className="key-value">{formData.policyEndDate}</p>
                                    </Col>
                                </Row></React.Fragment>}

                            </div>
                            {/* For Mobile View */}
                            {/* Table */}
                            <table className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                                <tbody>
                                    <tr>
                                        <td>
                                            Previous Insurance?
                                        </td>
                                        <td>
                                            {formData.hasPreviuousInsurance === 'true' ? 'Yes' : 'No'}
                                        </td>
                                    </tr>
                                    {formData.hasPreviuousInsurance === 'true' && <React.Fragment><tr>
                                        <td>
                                            Previous Insurer Name:
                                </td>
                                        <td>
                                            {formData.previousInsurerName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Previous Policy Number:
                                </td>
                                        <td>
                                            {formData.previousPolicyNumber}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Claims?
                                        </td>
                                        <td>
                                            {formData.claim ? 'Yes' : 'No'}
                                        </td>
                                    </tr>
                                    {formData.claim === "true" && <tr>
                                        <td>
                                            No Of Claims?
                                        </td>
                                        <td>
                                            {formData.noOfClaims}
                                        </td>
                                    </tr>}
                                    <tr>
                                        <td>
                                            Polic Start Date
                                        </td>
                                        <td>
                                            {formData.policyStartDate}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Policy End Date
                                        </td>
                                        <td>
                                            {formData.policyEndDate}
                                        </td>
                                    </tr></React.Fragment>}
                                </tbody>
                            </table>
                        </div>
                    }
                </Panel>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    step: state.proposal_form_motor.stepH,
    proposalFormDataHealth: state.proposalFormHealth.proposalFormHealthData
})

const mapDispatchToProps = dispatch => ({
    setStep: step => dispatch({ type: 'SET_STEP_H', step }),
    loadProposalFormHealth: (data) => dispatch({ type: 'PROPOSAL_FORM_HEALTH', data })
})
PreviousInsurer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PreviousInsurer))
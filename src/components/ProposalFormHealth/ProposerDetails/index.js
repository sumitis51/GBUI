import React, { Fragment } from 'react'
import Panel from 'muicss/lib/react/panel'
import { connect } from 'react-redux'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import NumberFormat from 'react-number-format';
import * as moment from 'moment';
import './owner.css'

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
});

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};


class ProposerDetails extends React.Component {
    state = {
        proposerForm: {
            salutation: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                message: 'Please select Salutation'
            },
            firstName: {
                value: '',
                validation: {
                    required: true,
                    shouldAcceptCharactersOnly: true,
                    minLength: 2
                },
                valid: false,
                touched: false,
                message: 'Please enter only alphabets & minimum length of 2'
            },
            lastName: {
                value: '',
                validation: {
                    required: true,
                    shouldAcceptCharactersOnly: true,
                    minLength: 2
                },
                valid: false,
                touched: false,
                message: 'Please enter only alphabets & minimum length of 2'
            },
            qualification: {
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: true,
                message: 'Please select education qualification'
            },
            maritalStatus: {
                value: '',
                validation: {
                    required: true,
                    checkLegalMarriage: true
                },
                valid: false,
                touched: false,
                message: 'Please select Marital Status'
            },
            dob: {
                value: '',
                validation: {
                    required: true,
                    maxDate: false,
                    validDOB: true,
                    checkLegalMarriage: true
                },
                valid: false,
                touched: false,
                message: 'Please select correct DOB'

            },
            profession: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                message: 'Please select Profession'
            },
            tenure: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                message: 'Please select Policy Tenure'
            },
            nationality: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                // touched: false
            },
            income: {
                value: '',
                validation: {
                    required: true,
                    minRange: 100000,
                    maxRange: 100000000,
                    minLength: 6,
                    maxLength: 9
                },
                valid: false,
                touched: false,
                message: 'Please enter the valid income'
            },
            pancard: {
                value: '',
                validation: {
                    required: true,
                    pancard: true
                },
                valid: false,
                touched: false,
                message: 'Please enter a valid PAN card no.'
            },
        },
        qualification: [
            { value: '10', label: '10th' },
            { value: '12', label: '12th' },
            { value: 'UG', label: 'Graduation' },
            { value: 'PG', label: 'PostGraduation' },
        ],
        nations: [
            { value: 'Indian', label: 'Indian' },
        ],
        policyTenure1: [
            { value: 1, label: '1 year' },
        ],
        policyTenure2: [
            { value: 1, label: '1' },
            { value: 2, label: '2' },
        ],
        policyTenure3: [
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
        ],
        formIsValid: false,
        isOnlyMarried: false,
        isLegalMarriageError: false,
        leageAge: 21
    }
    componentDidMount() {
        const autoFilledProposerForm = this.state.proposerForm
        // Fill First Name
        autoFilledProposerForm.firstName.value = this.props.inputformdata && this.props.inputformdata.firstName
        autoFilledProposerForm.firstName.valid = true
        autoFilledProposerForm.firstName.touched = true
        // Fill Last Name
        autoFilledProposerForm.lastName.value = this.props.inputformdata && this.props.inputformdata.lastName
        autoFilledProposerForm.lastName.valid = true
        autoFilledProposerForm.lastName.touched = true
        this.setState({ proposerForm: autoFilledProposerForm, formIsValid: false })
        this.loadLocalData() // From local Storage

    }

    setAutoSalutation() {
        const formData = this.state.proposerForm
        // Look for salutation
        const salutations = this.props.salutation
        const gender = this.props.inputformdata.gender
        if (gender === 'M') {
            Object.keys(this.props.salutation).map(key => {

                console.log(key.toLowerCase(), salutations[key])
                if (key.toLowerCase() === 'mr') {
                    formData.salutation.value = salutations[key]
                    formData.salutation.valid = true
                    formData.salutation.touched = true
                }
            })
        } else if (gender === 'F') {
            Object.keys(salutations).map(key => {
                if (key.toLowerCase() === 'ms') {
                    formData.salutation.value = salutations[key]
                    formData.salutation.valid = true
                    formData.salutation.touched = true
                }
            })
        }
        this.setState({ formData })

    }
    setMaritalstatus() {
        const formData = this.state.proposerForm
        const formMembers = this.props.formMembers
        if ((formMembers.self && formMembers.spouse) || (!formMembers.self && formMembers.spouse)) {
            const maritalStatusList = this.props.maritalStatus
            Object.keys(maritalStatusList).map(key => {
                if (key === 'Married') {
                    formData.maritalStatus.value = maritalStatusList[key]
                    formData.maritalStatus.valid = true
                    formData.maritalStatus.touched = true
                }
            })
            this.setState({ proposerForm: formData, isOnlyMarried: true })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.salutation !== this.props.salutation) {
            this.setAutoSalutation()
        }
        // Now check for marital status
        if (prevProps.maritalStatus !== this.props.maritalStatus) {
            this.setMaritalstatus()
        }
        if (prevProps.datePickers !== this.props.datePickers) {
            const formData = this.state.proposerForm

            formData.dob.valid = this.checkValidity(formData.dob.value, formData.dob.validation)
            let formIsValid = true
            for (let name in formData) {
                formData[name].valid = this.checkValidity(formData[name].value, formData[name].validation)
                formIsValid = formData[name].valid && formIsValid
            }
            this.setState({ proposerForm: formData, formIsValid })
        }
    }
    minDOB = () => {
        let rtrnText = '';

        if (this.props.datePickers[0]) {
            rtrnText = this.props.datePickers[0].fromDate
        } else {
            console.log(this.props)
        }
        return rtrnText
    }
    maxDOB = () => {

        let rtrnText = '';
        if (this.props.datePickers[0]) {
            rtrnText = this.props.datePickers[0].toDate
        } else {
            console.log(this.props)
        }
        return rtrnText
    }
    loadLocalData = () => {
        let healthData = JSON.parse(localStorage.getItem("proposerDetails"))
        healthData = healthData ? healthData : {}
        let formData = this.state.proposerForm
        if (healthData) {

            if (healthData.salutation) {
                formData.salutation.value = healthData.salutation
                formData.salutation.valid = true
                formData.salutation.touched = true
            }
            if (healthData.dob) {
                formData.dob.value = healthData.dob
                formData.dob.valid = true
                formData.dob.touched = true
            }
            if (healthData.nationality) {
                formData.nationality.value = healthData.nationality
                formData.nationality.valid = true
                formData.nationality.touched = true
            }
            if (healthData.profession) {
                formData.profession.value = healthData.profession
                formData.profession.valid = true
                formData.profession.touched = true
            }
            if (healthData.income) {
                formData.income.value = healthData.income
                formData.income.valid = true
                formData.income.touched = true
            }
            if (healthData.maritalStatus) {
                formData.maritalStatus.value = healthData.maritalStatus
                formData.maritalStatus.valid = true
                formData.maritalStatus.touched = true
            }

            if (healthData.pancard) {
                formData.pancard.value = healthData.pancard,
                    formData.pancard.valid = true
                formData.pancard.touched = true
            }
            if (healthData.qualification) {
                formData.qualification.value = healthData.qualification
                formData.qualification.valid = true
                formData.qualification.touched = true
            }
            if (healthData.tenure) {
                formData.tenure.value = healthData.tenure
                formData.tenure.valid = true
                formData.tenure.touched = true
            }

            this.setState({ proposerForm: formData })

        }


        if (this.props.inputformdata.formMembers.self) {
            const self = this.props.inputformdata.familyDetails.filter(item => item.member === 'self')[0]
            // let formData = this.state.proposerForm
            const today = new Date()
            const dobToSet = `${today.getFullYear() - self.age}-01-01`
            formData.dob.value = dobToSet
            formData.dob.valid = true
            formData.dob.touched = true


            this.setState({ proposerForm: formData })
        }

        let formIsValid = true
        for (let name in formData) {
            console.log(formData[name].value, formData[name].valid, name, this.minDOB(), this.maxDOB(), 'Hello')
            formData[name].valid = this.checkValidity(formData[name].value, formData[name].validation)
            formIsValid = formData[name].valid && formIsValid

        }
        this.setState({ formIsValid })
    }
    uploadProposalForm() {
        if (this.props.isProposalSummary) {
            const healthData = this.props.proposalFormDataHealth
            let formData = this.state.proposerForm
            formData.salutation.value = healthData.salutation
            formData.salutation.valid = true
            formData.salutation.touched = true
            // Splitting first and last name
            // First NAme
            formData.firstName.value = healthData.firstName
            formData.firstName.valid = true
            formData.firstName.touched = true
            // Last NAme
            formData.lastName.value = healthData.lastName
            formData.lastName.valid = true
            formData.lastName.touched = true

            formData.dob.value = healthData.dob
            formData.dob.valid = true
            formData.dob.touched = true
            formData.nationality.value = healthData.nationality
            formData.nationality.valid = true
            formData.nationality.touched = true
            // formData.gender.value = this.props.inputformdata.gender
            // formData.gender.valid = true
            // formData.gender.touched = true
            formData.profession.value = healthData.profession
            formData.profession.valid = true
            formData.profession.touched = true
            formData.income.value = healthData.income
            formData.income.valid = true
            formData.income.touched = true
            formData.maritalStatus.value = healthData.maritalStatus
            formData.maritalStatus.valid = true
            formData.maritalStatus.touched = true

            formData.pancard.value = healthData.pancard,
                formData.pancard.valid = true
            formData.pancard.touched = true
            formData.qualification.value = healthData.qualification
            formData.qualification.valid = true
            formData.qualification.touched = true
            formData.tenure.value = healthData.tenure
            formData.tenure.valid = true
            formData.tenure.touched = true
            this.setState({ proposerForm: formData, formIsValid: true })
        }
    }

    checkValidity(value, rules, name) {
        let isValid = true;
        if (rules.required) {
            if (isNaN(value)) {
                isValid = value.trim() !== '' && isValid
            } else {
                isValid = value > 0 && isValid
            }

        }
        if (rules.shouldAcceptCharactersOnly) {
            isValid = /*value.trim().split(" ").length > 1 && */ value.trim().match(/^[a-zA-Z ]+$/) && isValid
        }
        if (rules.minRange) {
            isValid = Number(value) >= rules.minRange && isValid
        } if (rules.maxRange) {
            isValid = Number(value) <= rules.maxRange && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.pancard) {
            return isValid = value.match(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/) && isValid
        }
        if (rules.validDOB) {
            // alert(this.maxDOB()+" middle  "+ this.minDOB()+ "  "+ value)
            const minDob = this.minDOB()
            const maxDob = this.maxDOB()
            if (this.props.formMembers.self && minDob !== '' && maxDob !== '' && value) {
                try {
                    const range = moment(new Date(value)).isBetween(new Date(minDob), new Date(maxDob)) || moment(new Date(value)).isSame(minDob)
                    isValid = range && isValid
                } catch (error) {
                    console.log(error)
                }

            } else {
                const date = new Date(value)
                isValid = new Date().getFullYear() - date.getFullYear() >= 18 && isValid
            }

        }
        if (rules.maxDate) {
            const maritalStatus = this.props.maritalStatus
            const gender = this.props.gender
            let ageLimit = 18
            for (let key in maritalStatus) {
                if (key === 'Married' && gender.Male == 'M') {
                    if (maritalStatus[key] === this.state.proposerForm.maritalStatus.value &&
                        gender.Male == this.props.inputformdata.gender) {
                        ageLimit = 21
                    }
                }
            }

        }
        if (rules.checkLegalMarriage) {
            console.log(this.props)
            const gender = this.props.gender
            let dob, maritalStatus, ageLimit;
            if (name === 'maritalStatus') {
                dob = this.state.proposerForm.dob.value
                maritalStatus = value
                // const maritalStatusList = this.props.maritalStatus
                // for (let key in maritalStatusList) {
                //     if (key === 'Married' && gender.Male == 'M') {
                //         if (maritalStatus[key] === this.state.proposerForm.maritalStatus.value &&
                //             gender.Male == this.props.inputformdata.gender) {
                //             ageLimit = 21
                //         }
                //     } else if (key === 'Married' && gender.Female == 'F') {
                //         if (maritalStatus[key] === this.state.proposerForm.maritalStatus.value &&
                //             gender.Female == this.props.inputformdata.gender) {
                //             ageLimit = 18
                //         } 
                //     }
                // }
                // if(new Date(dob).getDate() < ageLimit) {
                //     isValid = false
                // }

            } else if (name === 'dob') {
                maritalStatus = this.state.proposerForm.maritalStatus.value
                dob = value

            }
            if (maritalStatus && dob) {
                const maritalStatusList = this.props.maritalStatus

                for (let key in maritalStatusList) {
                    if (key === 'Married' && gender.Male == 'M') {
                        if (maritalStatusList[key] === maritalStatus &&
                            gender.Male == this.props.inputformdata.gender) {
                            ageLimit = 21
                            if ((new Date().getFullYear() - new Date(dob).getFullYear()) < ageLimit) {
                                isValid = false
                                this.setState({ leageAge: ageLimit, isLegalMarriageError: true })
                            }
                        } else {
                            this.setState({ leageAge: ageLimit, isLegalMarriageError: false })
                        }
                        console.log(maritalStatusList[key], maritalStatus, gender.Male, this.props.inputformdata.gender)
                    } else if (key === 'Married' && gender.Female == 'F') {
                        if (maritalStatusList[key] === maritalStatus &&
                            gender.Female == this.props.inputformdata.gender) {
                            ageLimit = 18
                            if ((new Date().getFullYear() - new Date(dob).getFullYear()) < ageLimit) {
                                isValid = false
                                this.setState({ leageAge: ageLimit, isLegalMarriageError: true })
                            }
                        } else {
                            this.setState({ leageAge: ageLimit, isLegalMarriageError: false })
                        }
                    }
                }


            }
        }
        return isValid
    }
    handleChange = name => event => {
        if (name === 'income') {
            if (event.target.value.match(/^\d+$/)) {
                if (!event.target.value.match(/^[1-9]/)) {
                    return 0
                }
            }else if(event.target.value === ''){
                ;
            } else {
                return;
            }
        }
        const updatedProposalForm = {
            ...this.state.proposerForm
        }
        const updatedFormElement = {
            ...updatedProposalForm[name]
        }
        updatedFormElement.value = event.target.value
        const valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, name)

        updatedFormElement.valid = valid
        updatedFormElement.touched = true
        updatedProposalForm[name] = updatedFormElement;
        let formIsValid = true;
        for (let name in updatedProposalForm) {

            formIsValid = updatedProposalForm[name].valid && formIsValid
        }
        if (valid) {
            let phdata = this.props.proposalFormDataHealth ? this.props.proposalFormDataHealth : {}
            phdata[name] = event.target.value
            this.props.loadProposalFormHealth(phdata)
            localStorage.setItem("proposerDetails", JSON.stringify(phdata))
        }
        this.setState({ proposerForm: updatedProposalForm, formIsValid: formIsValid });
    };

    // Create Family Details based on step 1

    createProposerDetail = () => {


        const proposerDetails = {
            insurerId: 111,
            // proposersName: this.state.proposerForm.proposersName.value,
            firstName: this.state.proposerForm.firstName.value,
            lastName: this.state.proposerForm.lastName.value,
            dob: this.state.proposerForm.dob.value,
            nationality: this.state.proposerForm.nationality.value,
            gender: this.props.inputformdata.gender,
            profession: this.state.proposerForm.profession.value,
            income: this.state.proposerForm.income.value,
            maritalStatus: this.state.proposerForm.maritalStatus.value,
            salutation: this.state.proposerForm.salutation.value,
            pancard: this.state.proposerForm.pancard.value,
            educationQualification: this.state.proposerForm.qualification.value,
            tenure: this.state.proposerForm.tenure.value
            // insuredMembersList: arr
        }
        this.props.loadProposalFormHealth(proposerDetails);
        if (!this.props.isProposalSummary) {
            let arr = [];
            if (this.props.inputformdata) {
                let index = 0;
                for (let i in this.props.inputformdata.familyDetails) {

                    let obj = {
                        id: index,
                        memberName: '',
                    }
                    obj.relationship = i.member;
                    arr.push(obj)
                    index++
                }

            }
            this.props.ProposalFormHealthMember({ insuredMembersList: arr })
        }
        this.props.setStep(1)
        localStorage.setItem("proposerDetails", JSON.stringify(proposerDetails))
    }
    render() {

        const { classes } = this.props;
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
        const minDOB = () => {

            return this.props.datePickers[0] ? this.props.datePickers[0].fromDate : ''
        }
        const maxDOB = () => {
            return this.props.datePickers[0] ? this.props.datePickers[0].toDate : ''
        }
        const proposerForm = this.state.proposerForm
        return (
            <div className="owner-detail-parent">
                <Panel>
                    {this.props.step === 0 &&
                        <div className="show-form">
                            <h3 className="owner-details-heading">Proposer Details</h3>
                            <p className="step-detail-success">Step 1 of {this.props.totalSteps}</p>
                            <hr />
                            <form noValidate autoComplete="off" style={{ marginRight: window.innerWidth < 768 ? '' : '' }}>
                                <Row>
                                    <Col md="5" xs={12} className='salutation-block'>
                                        <Col md={4} xs={12} className="salution">
                                            {/* Salutation */}
                                            <FormControl required
                                                error={!this.state.proposerForm.salutation.valid
                                                    && this.state.proposerForm.salutation.touched}
                                                fullWidth>
                                                <InputLabel htmlFor="salutation">Salutation</InputLabel>
                                                <Select name="salutation"
                                                    // value={this.state.proposerDetails.profession}
                                                    value={this.state.proposerForm.salutation.value}
                                                    onChange={this.handleChange('salutation')}
                                                    inputProps={{
                                                        name: 'salutation',
                                                        id: 'salutation',
                                                    }}
                                                >

                                                    {this.props.salutation && Object.keys(this.props.salutation).map(key => { return <MenuItem value={this.props.salutation[key]}>{key}</MenuItem> }
                                                    )}
                                                </Select>
                                                {(!proposerForm.salutation.valid
                                                    && proposerForm.salutation.touched) && <p className="error">
                                                        {proposerForm.salutation.message}
                                                    </p>}
                                            </FormControl>
                                        </Col>
                                        <Col md={8} xs={12} className="row_line">
                                            {/* Proposer's Name */}
                                            <FormControl fullWidth>
                                                <TextField
                                                    id="standard-required"
                                                    label="First Name"
                                                    value={this.state.proposerForm.firstName.value}
                                                    onChange={this.handleChange('firstName')}
                                                    classes={{
                                                        root: classes.text_field
                                                    }}
                                                    name="firstName"
                                                    required={true}
                                                    error={!this.state.proposerForm.firstName.valid
                                                        && this.state.proposerForm.firstName.touched}
                                                    helperText={this.state.errorProposerNameMessage}
                                                    margin="normal"
                                                    fullWidth
                                                    inputProps={{ maxLength: 35 }}
                                                />
                                                <p style={{ color: 'red' }} >{this.state.proposerForm.firstName.touched ?
                                                    !this.state.proposerForm.firstName.valid
                                                    && proposerForm.firstName.message : null}</p>
                                            </FormControl>
                                        </Col>

                                        {/* Proposer's Name */}
                                        <FormControl fullWidth className="row_line">
                                            <TextField
                                                id="standard-required"
                                                label="Last Name"

                                                value={this.state.proposerForm.lastName.value}
                                                onChange={this.handleChange('lastName')}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="lastName"
                                                required={true}
                                                error={!this.state.proposerForm.lastName.valid
                                                    && this.state.proposerForm.lastName.touched}
                                                helperText={this.state.errorProposerNameMessage}
                                                margin="normal"
                                                fullWidth
                                                inputProps={{ maxLength: 35 }}
                                            />
                                            <p style={{ color: 'red' }} >{this.state.proposerForm.lastName.touched ?
                                                !this.state.proposerForm.lastName.valid
                                                && proposerForm.lastName.message : null}</p>
                                        </FormControl>

                                        <FormControl className="row_line"
                                            fullWidth style={{ marginLeft: '8px', marginBottom: '18px' }}>
                                            <InputLabel htmlFor="qualification">Educational Qualification*</InputLabel>
                                            <Select name="qualification"
                                                value={this.state.proposerForm.qualification.value}
                                                onChange={this.handleChange('qualification')}
                                                inputProps={{
                                                    name: 'qualification',
                                                    id: 'qualification',
                                                }}
                                            // error={/*(!proposerForm.qualification.valid
                                            // && proposerForm.qualification.touched)*/}
                                            >
                                                {Object.keys(this.props.education).map((option) => (
                                                    <MenuItem value={this.props.education[option]}>{option}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {/* {(!proposerForm.qualification.valid
                                                    && proposerForm.qualification.touched) && <p className="error">
                                                    {proposerForm.qualification.message}
                                                    </p>} */}


                                        {/* DOB */}
                                        <FormControl fullWidth className="row_line"
                                            required>
                                            <TextField
                                                required={true}
                                                id="date"
                                                type="date"
                                                // InputProps={{ inputProps:{max:current_date}}}
                                                InputProps={{ inputProps: { max: maxDOB(), min: minDOB() } }}
                                                // defaultValue="2019-01-01"
                                                defaultValue={today}
                                                label="Date of Birth(DOB)"

                                                value={this.state.proposerForm.dob.value}
                                                helperText={this.state.errorDobMessage}
                                                onChange={this.handleChange('dob')}
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


                                            <p className="error" >{this.state.proposerForm.dob.touched ? !this.state.proposerForm.dob.valid && proposerForm.dob.message : null}</p>
                                        </FormControl>
                                        {/* Nationality */}
                                        <FormControl required
                                            error={!this.state.proposerForm.nationality.valid
                                                && this.state.proposerForm.nationality.touched}
                                            className={[classes.formControl, "nationality_row"].join(" ")} fullWidth >
                                            <InputLabel htmlFor="nationality">Nationality</InputLabel>
                                            <Select name="nationality"
                                                value={this.state.proposerForm.nationality.value}
                                                onChange={this.handleChange('nationality')}
                                                inputProps={{
                                                    name: 'nationality',
                                                    id: 'nationality',
                                                }}
                                            >
                                                {this.state.nations.map((option) => (
                                                    <MenuItem value={option.value}>{option.label}</MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>{this.state.errorNationalityMessage}</FormHelperText>
                                        </FormControl>

                                        {/* Tenure */}
                                        <FormControl required
                                            error={!this.state.proposerForm.tenure.valid
                                                && this.state.proposerForm.tenure.touched}
                                            className={[classes.formControl, "tenure_row"].join(" ")} fullWidth style={{ marginTop: '-15px' }}>
                                            <InputLabel htmlFor="tenure">Policy Tenure</InputLabel>
                                            <Select name="tenure"
                                                value={this.state.proposerForm.tenure.value}
                                                onChange={this.handleChange('tenure')}
                                                inputProps={{
                                                    name: 'tenure',
                                                    id: 'tenure',
                                                }}

                                            >
                                                {this.props.policyTenure === 1 && this.state.policyTenure1.map((option) => (
                                                    <MenuItem value={option.value}>{option.label}</MenuItem>
                                                ))}
                                                }
                                                {this.props.policyTenure === 2 && this.state.policyTenure2.map((option) => (
                                                    <MenuItem value={option.value}>{option.label}</MenuItem>
                                                ))}
                                                }
                                                {this.props.policyTenure === 3 && this.state.policyTenure3.map((option) => (
                                                    <MenuItem value={option.value}>{option.label}</MenuItem>
                                                ))}
                                                }
                                            </Select>
                                            {/* <FormHelperText>{this.state.errorNationalityMessage}</FormHelperText> */}
                                            {(!proposerForm.tenure.valid
                                                && proposerForm.tenure.touched) && <p className="error">{proposerForm.tenure.message}</p>}
                                        </FormControl>
                                    </Col>
                                    <Col md="1" xs={12}></Col>
                                    <Col md="5" xs={12}>
                                        {/* Gender */}

                                        {/* <FormControl required
                                            error={!this.state.proposerForm.gender.valid
                                                && this.state.proposerForm.gender.touched}
                                        >
                                            <FormLabel
                                                component="legend"
                                                classes={{
                                                    root: classes.label,
                                                    focused: classes.focused_label
                                                }}>Gender</FormLabel>
                                            <RadioGroup
                                                aria-label="Gender"
                                                name="gender"
                                                className={classes.group}
                                                value={this.state.proposerForm.gender.value}
                                                onChange={this.handleChange('gender')}
                                                row
                                            >
                                                {Object.keys(this.props.gender).map(key => {
                                                    return <FormControlLabel value={this.props.gender[key]} control={<Radio classes={{
                                                        root: classes.root,
                                                        checked: classes.checked,
                                                    }} />} label={key} />
                                                })}
                                            </RadioGroup>
                                            <FormHelperText>{this.state.errorGenderMessage}</FormHelperText>
                                        </FormControl> */}
                                        {/* Profession */}
                                        <FormControl required className="row_line"
                                            error={!this.state.proposerForm.profession.valid
                                                && this.state.proposerForm.profession.touched}
                                            fullWidth style={{ marginLeft: '8px', marginBottom: '15px' }}>
                                            <InputLabel htmlFor="profession">Profession</InputLabel>
                                            <Select name="profession"
                                                value={this.state.proposerForm.profession.value}
                                                onChange={this.handleChange('profession')}
                                                inputProps={{
                                                    name: 'profession',
                                                    id: 'profession',
                                                }}
                                            >
                                                {Object.keys(this.props.proffession).map(key => { return <MenuItem value={this.props.proffession[key]}>{key}</MenuItem> }
                                                )}
                                            </Select>
                                            {/* <FormHelperText>{this.state.errorProfessionMessage}</FormHelperText> */}
                                            {(!proposerForm.profession.valid
                                                && proposerForm.profession.touched) && <p className="error">{proposerForm.profession.message}</p>}
                                        </FormControl>

                                        {/* Income */}
                                        <FormControl fullWidth required className="row_line" >
                                            <TextField
                                                label="Income Per Annum"
                                                value={this.state.proposerForm.income.value}
                                                onChange={this.handleChange('income')}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                id="formatted-numberformat-input"
                                                type="text"
                                                name='income'
                                                required={true}
                                                error={!this.state.proposerForm.income.valid
                                                    && this.state.proposerForm.income.touched}
                                                helperText={this.state.errorIncomeMessage}
                                                margin="normal"
                                                fullWidth
                                            />
                                            <p className="error" >{this.state.proposerForm.income.touched ?
                                                !this.state.proposerForm.income.valid
                                                && proposerForm.income.message : null}</p>
                                        </FormControl>
                                        <FormControl className="row_line" fullWidth>
                                            <TextField
                                                id="standard-required"
                                                label="PAN Card"
                                                inputProps={{ maxLength: 10 }}
                                                value={this.state.proposerForm.pancard.value}
                                                onChange={this.handleChange('pancard')}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="pancard"
                                                required={true}
                                                error={!this.state.proposerForm.pancard.valid
                                                    && this.state.proposerForm.pancard.touched}
                                                helperText={this.state.errorProposerNameMessage}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </FormControl>
                                        {(!this.state.proposerForm.pancard.valid
                                            && this.state.proposerForm.pancard.touched) && <p style={{ color: 'red' }}>{this.state.proposerForm.pancard.message}</p>}

                                        {/* Marital Status */}
                                        <FormControl required  
                                            error={!this.state.proposerForm.maritalStatus.valid
                                                && this.state.proposerForm.maritalStatus.touched}
                                            className={[classes.formControl, "row_line"].join(" ")} style={{ marginTop: '16px', marginBottom: '-25px' }}
                                            disabled={this.state.isOnlyMarried}>
                                            <FormLabel
                                                component="legend"
                                                classes={{
                                                    root: classes.label,
                                                    focused: classes.focused_label
                                                }}>Marital Status</FormLabel>
                                            <RadioGroup
                                                aria-label="Married"
                                                name="maritalStatus"
                                                className={classes.group}
                                                value={this.state.proposerForm.maritalStatus.value}
                                                onChange={this.handleChange('maritalStatus')}
                                                error={
                                                    this.state.isLegalMarriageError}
                                                row
                                                disabled={this.state.isOnlyMarried}
                                            >
                                                {Object.keys(this.props.maritalStatus || []).map(key => {
                                                    return <FormControlLabel value={this.props.maritalStatus[key]} control={<Radio classes={{
                                                        root: classes.root,
                                                        checked: classes.checked,
                                                    }} />} label={key} />
                                                })}
                                            </RadioGroup>
                                            {/* <FormHelperText>{this.state.errorMaritalStatusMessage}</FormHelperText> */}
                                            {/* {!this.state.proposerForm.maritalStatus.valid && <p style={{color: 'red'}}>{this.state.proposerForm.maritalStatus.message}</p>} */}
                                            {/* {(!proposerForm.maritalStatus.valid
                                                    /*&& proposerForm.maritalStatus.touched*//*) && <p className="error">{proposerForm.maritalStatus.message} </p>} */}
                                            {this.state.isLegalMarriageError && <p className="error">Legal marriage age is {this.state.leageAge} </p>}

                                        </FormControl>
                                    </Col>
                                </Row>
                            </form>

                            {/* Button Next details */}
                            <div className="button-next">
                                <Button disabled={!this.state.formIsValid}
                                    className={classNames(classes.buttonRoot3)}
                                    onClick={() => { this.createProposerDetail(); }}>
                                    Continue to Insured Members
                        </Button>
                            </div>
                        </div>
                    }

                    {/* Here show details after form filled */}
                    {this.props.step > 0 &&
                        <div className="owner_show_details">
                            <Row>
                                <Col md="11" sm="10" xs="10">
                                    <h3 className="step-detail">Step 1 of {this.props.totalSteps}</h3>
                                    <h3 className="owners-heading">Proposer Details</h3>
                                </Col>
                                <Col md="1" sm="2" xs="2">
                                    {this.props.step < 7 &&
                                        <h3
                                            className="edit"
                                            onClick={() => { this.props.setStep(0); this.uploadProposalForm() }}>Edit</h3>
                                    }
                                </Col>
                            </Row>
                            <div className="mui--hidden-xs mui--hidden-sm"><hr /></div>
                            <div className="mui--hidden-lg mui--hidden-xl mui--hidden-md"><hr style={{ marginTop: '-2px' }} /></div>
                            {/* Here details of filled elements */}
                            <div className="desktop-data mui--hidden-sm mui--hidden-xs">
                                <Row>
                                    <Col md="4">
                                        <p className="key-name">Proposer's Name:</p>
                                        <p className="key-value">
                                            {Object.keys(this.props.salutation)[Object.values(this.props.salutation).indexOf(this.props.proposalFormDataHealth.salutation)]}
                                            {` ${this.props.proposalFormDataHealth.firstName} ${this.props.proposalFormDataHealth.lastName}`}
                                        </p>
                                    </Col>
                                    <Col md="4">
                                        <p className="key-name">Date of Birth(DOB):</p>
                                        <p className="key-value">{this.props.proposalFormDataHealth.dob}</p>
                                    </Col>
                                    <Col md="4">
                                        <p className="key-name">Nationality:</p>
                                        <p className="key-value">{this.props.proposalFormDataHealth.nationality}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    {/* <Col md="4">
                                        <p className="key-name">Gender:</p>
                                        <p className="key-value">
                                            {Object.keys(this.props.gender)[Object.values(this.props.gender)
                                                .indexOf(this.props.proposalFormDataHealth.gender)]}
                                        </p>
                                    </Col> */}
                                    <Col md="4">
                                        <p className="key-name">Profession:</p>
                                        <p className="key-value">{this.props.proposalFormDataHealth.profession}</p>
                                    </Col>
                                    <Col md="4">
                                        <p className="key-name">Income:</p>
                                        <p className="key-value">{this.props.proposalFormDataHealth.income}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <p className="key-name">Marital Status:</p>
                                        <p className="key-value">
                                            {Object.keys(this.props.maritalStatus)[Object.values(this.props.maritalStatus)
                                                .indexOf(this.props.proposalFormDataHealth.maritalStatus)]}
                                        </p>
                                    </Col>
                                    <Col md="4">
                                        <p className="key-name">PAN card:</p>
                                        <p className="key-value" maxlength="10">
                                            {this.props.proposalFormDataHealth.pancard}
                                        </p>
                                    </Col>
                                    <Col md="4">
                                        <p className="key-name">Qualification:</p>
                                        <p className="key-value">
                                            {this.props.proposalFormDataHealth.educationQualification && Object.keys(this.props.education).filter(key => this.props.education[key] === this.props.proposalFormDataHealth.educationQualification)[0]}
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <p className="key-name">Policy Tenure:</p>
                                        <p className="key-value">{this.props.proposalFormDataHealth.tenure} Year</p>
                                    </Col>
                                </Row>
                            </div>
                            {/* Mobile view */}
                            <div className="mui--hidden-lg mui--hidden-md mui--hidden-xl">
                                <table className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                                    <tbody>
                                        <tr>
                                            <td>
                                                Proposer's Name:
                                            </td>
                                            <td>
                                                {`${Object.keys(this.props.salutation)[Object.values(this.props.salutation)
                                                    .indexOf(this.props.proposalFormDataHealth.salutation)]} 
                                                    ${this.props.proposalFormDataHealth.firstName} ${this.props.proposalFormDataHealth.lastName}`}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Date of Birth(DOB):
                                            </td>
                                            <td>
                                                {this.props.proposalFormDataHealth.dob}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Nationality:
                                            </td>
                                            <td>
                                                {this.props.proposalFormDataHealth.nationality}
                                            </td>
                                        </tr>
                                        {/* <tr>
                                            <td>
                                                Gender:
                                            </td>
                                            <td>
                                                {Object.keys(this.props.gender)[Object.values(this.props.gender)
                                                    .indexOf(this.props.proposalFormDataHealth.gender)]}
                                            </td>
                                        </tr> */}
                                        <tr>
                                            <td>
                                                Profession:
                                            </td>
                                            <td>
                                                {this.props.proposalFormDataHealth.profession}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Income:
                                            </td>
                                            <td>
                                                {this.props.proposalFormDataHealth.income}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Marital Status:
                                            </td>
                                            <td>
                                                {Object.keys(this.props.maritalStatus)[Object.values(this.props.maritalStatus)
                                                    .indexOf(this.props.proposalFormDataHealth.maritalStatus)]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                PAN Card:
                                            </td>
                                            <td>
                                                {this.props.proposalFormDataHealth.pancard}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Qualification:
                                            </td>
                                            <td>
                                                {this.props.proposalFormDataHealth.educationQualification && Object.keys(this.props.education).filter(key => this.props.education[key] === this.props.proposalFormDataHealth.educationQualification)[0]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Tenure:
                                            </td>
                                            <td>
                                                {this.props.proposalFormDataHealth.tenure} Year
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </Panel>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    step: state.proposal_form_motor.stepH,
    proposalFormDataHealth: state.proposalFormHealth.proposalFormHealthData,
    inputformdata: state.inputFormHealth.inputFormHealthData,
    formMembers: state.inputFormHealth.inputFormHealthData.formMembers,
    formDetails: state.inputFormHealth.inputFormHealthData.familyDetails,
    activeTab: state.proposalFormHealth.insuredMemberTabValue,
})

const mapDispatchToProps = dispatch => ({
    setStep: step => dispatch({ type: 'SET_STEP_H', step }),
    loadProposalFormHealth: (data) => dispatch({ type: 'PROPOSAL_FORM_HEALTH', data }),
    ProposalFormHealthMember: (value) => dispatch({ type: 'PROPOSAL_FORM_HEALTH_MEMBER', value })
})

ProposerDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProposerDetails))
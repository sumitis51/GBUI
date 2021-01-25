import React from 'react'
import Panel from 'muicss/lib/react/panel'
import { connect } from 'react-redux'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import FormControl from '@material-ui/core/FormControl'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import './previous.css'


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
        color: '#000000',
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


class Nominee extends React.Component {

    state = {
        nomineeForm: {
            relationshipToNominee: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                message: 'Please select Nominee Relationship'
            },
            // nomineeName: {
            //     value: '',
            //     validation: {
            //         required: true,
            //         shouldAcceptCharactersOnly: true
            //     },
            //     valid: false,
            //     touched: false
            // },
            nomineeFirstName: {
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
            nomineeLastName: {
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
            age: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                message: 'Please select Nominee Age'
            },
        },
        prev_flag_init: true,
        formIsValid: false,
        relation: [
            { value: 'Spouse', label: 'Spouse' },
            { value: 'Son', label: 'Son' },
            { value: 'Daughter', label: 'Daughter' },
            { value: 'Mother', label: 'Mother' },
            { value: 'Father', label: 'Father' },
            { value: 'Father in law', label: 'Father in law' },
            { value: 'Mother in law', label: 'Mother in law' },
        ],
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.shouldAcceptCharactersOnly) {
            isValid = /*value.trim().split(" ").length > 1 &&*/ value.trim().match(/^[a-zA-Z ]+$/) && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        return isValid
    }

    handleChange = name => event => {
        const updatedProposalForm = {
            ...this.state.nomineeForm
        }
        const updatedFormElement = {
            ...updatedProposalForm[name]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedProposalForm[name] = updatedFormElement;
        let formIsValid = true;
        for (let name in updatedProposalForm) {
            formIsValid = updatedProposalForm[name].valid && formIsValid

        }

        this.setState({ nomineeForm: updatedProposalForm, formIsValid: formIsValid });
    };
    handleContinue = () => {
        const nomineeDetails = {
            // nomineeName: this.state.nomineeForm.nomineeName.value,
            nomineeFirstName: this.state.nomineeForm.nomineeFirstName.value,
            nomineeLastName: this.state.nomineeForm.nomineeLastName.value,
            relationshipToNominee: this.state.nomineeForm.relationshipToNominee.value,
            nomineeAge: this.state.nomineeForm.age.value
        }
        const NomineeData = {
            ...this.props.proposalFormDataHealth,
            ...nomineeDetails
        };
        localStorage.setItem("nominee", JSON.stringify(nomineeDetails))
        this.props.loadProposalFormHealth(NomineeData);
    }
    componentDidMount() {
        this.loadLocalSate()
    }

    loadLocalSate() {
        const dataL = JSON.parse(localStorage.getItem("nominee"))
        const data = dataL ? dataL : {}
        let nomineeForm = this.state.nomineeForm

        if (data.nomineeFirstName) {
            nomineeForm.nomineeFirstName.valid = true
            nomineeForm.nomineeFirstName.value = data.nomineeFirstName
            nomineeForm.nomineeFirstName.touched = true
        }

        if (data.nomineeLastName) {
            nomineeForm.nomineeLastName.valid = true
            nomineeForm.nomineeLastName.value = data.nomineeLastName
            nomineeForm.nomineeLastName.touched = true
        }

        if (data.relationshipToNominee) {
            nomineeForm.relationshipToNominee.value = data.relationshipToNominee
            nomineeForm.relationshipToNominee.valid = true
            nomineeForm.relationshipToNominee.touched = true
        }

        if (data.nomineeAge) {
            nomineeForm.age.valid = true
            nomineeForm.age.value = data.nomineeAge
            nomineeForm.age.touched = true
        }

        let formIsValid = true;
        for (let name in nomineeForm) {
            formIsValid = nomineeForm[name].valid && formIsValid

        }
        this.setState({ nomineeForm, formIsValid });
        const NomineeData = {
            ...this.props.proposalFormDataHealth,
            ...data
        };
        this.props.loadProposalFormHealth(NomineeData);
    }

    uploadData() {
        const data = this.props.proposalFormDataHealth
        if (this.props.isProposalSummary) {
            let nomineeForm = this.state.nomineeForm
            // First Name
            nomineeForm.nomineeFirstName.valid = true
            nomineeForm.nomineeFirstName.value = data.nomineeFirstName
            nomineeForm.nomineeFirstName.touched = true

            // Last Name
            nomineeForm.nomineeLastName.valid = true
            nomineeForm.nomineeLastName.value = data.nomineeLastName
            nomineeForm.nomineeLastName.touched = true

            nomineeForm.relationshipToNominee.value = data.relationshipToNominee
            nomineeForm.relationshipToNominee.valid = true
            nomineeForm.relationshipToNominee.touched = true

            nomineeForm.age.valid = true
            nomineeForm.age.value = data.nomineeAge
            nomineeForm.age.touched = true

            let formIsValid = true;
            for (let name in nomineeForm) {
                formIsValid = nomineeForm[name].valid && formIsValid

            }
            this.setState({ nomineeForm, formIsValid });
        }

    }
    render() {
        const { classes } = this.props;
        const { nomineeForm } = this.state
        return (
            <div className="previous-policy-detail-parent">
                <Panel>
                    {true &&
                        <div className="prev-show-form">
                            {(this.props.step < 4 && this.state.prev_flag_init) &&
                                <Row>
                                    <Col md="11" sm="10" xs="10">
                                        <p className="step-details">Step 5 of {this.props.totalSteps}</p>
                                        <p className="step-name">Nominee</p>
                                    </Col>
                                    <Col md="1" sm="2" xs="2">
                                        <p className="edit">Edit</p>
                                    </Col>
                                </Row>
                            }

                            {(this.props.step === 4) &&
                                <div className="form-personal-details">
                                    <h3 className="personal-details-heading">Nominee</h3>
                                    <p className="step-detail-success">Step 5 of {this.props.totalSteps}</p>
                                    <hr />
                                    <form noValidate autoComplete={false} style={{ marginRight: window.innerWidth < 768 ? '0' : '' }}>
                                        <Row>
                                            <Col md="5">

                                                {/* Previous Policy Number */}
                                                <FormControl className="relationship_select"
                                                    error={!this.state.nomineeForm.relationshipToNominee.valid
                                                        && this.state.nomineeForm.relationshipToNominee.touched}
                                                    fullWidth>
                                                    <InputLabel shrink htmlFor="Relationship">Relationship*</InputLabel>
                                                    <NativeSelect
                                                        value={this.state.nomineeForm.relationshipToNominee.value}
                                                        onChange={this.handleChange('relationshipToNominee')}
                                                        input={<Input name="relationshipToNominee" id="relationship-native-label-placeholder" />}
                                                      
                                                    >
                                                        <option value="" selected>Select Relationship</option>
                                                        {Object.keys(this.props.nomineeRelation).map(key =>
                                                            <option value={this.props.nomineeRelation[key]}>{key}</option>
                                                        )}
                                                    </NativeSelect>
                                                </FormControl>
                                                {(!this.state.nomineeForm.relationshipToNominee.valid
                                                    && this.state.nomineeForm.relationshipToNominee.touched) && <p className="error">{nomineeForm.relationshipToNominee.message}</p>}
                                                <FormControl
                                                    className="relationship_select"
                                                    error={!this.state.nomineeForm.age.valid
                                                        && this.state.nomineeForm.age.touched}
                                                    fullWidth>
                                                    <InputLabel shrink htmlFor="Relationship">Age*</InputLabel>
                                                    <NativeSelect
                                                        value={this.state.nomineeForm.age.value}
                                                        onChange={this.handleChange('age')}
                                                        input={<Input name="age" id="relationship-native-label-placeholder" />}
                                                     
                                                    >
                                                        <option value="">Select age</option>
                                                        {new Array(101).fill(0, 18).map((i, index) =>
                                                            <option value={index}>{index}</option>
                                                        )}
                                                        {/* <option value="value1">value1</option>
                                                     <option value="value2">value2</option> */}
                                                        {/* {Object.keys(this.props.nomineeRelation).map(key => 
                                                         <option value={this.props.nomineeRelation[key]}>{key}</option>
                                                        )} */}
                                                    </NativeSelect>
                                                </FormControl>
                                                {(!this.state.nomineeForm.age.valid
                                                    && this.state.nomineeForm.age.touched) && <p className="error">{nomineeForm.age.message}</p>}
                                            </Col>
                                            <Col md="1" className=" mui--hidden-sm"></Col>
                                            <Col md="5" className="nominee_name">
                                                {/* Previous Insurer expiry date */}
                                                <FormControl fullWidth>
                                                    <TextField
                                                        id="FirstnameOfNominee"
                                                        label="First Name of Nominee"
                                                        value={this.state.nomineeForm.nomineeFirstName.value}
                                                        onChange={this.handleChange('nomineeFirstName')}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="nomineeFirstName"
                                                        margin="normal"
                                                        fullWidth
                                                        required={true}
                                                        error={!this.state.nomineeForm.nomineeFirstName.valid
                                                            && this.state.nomineeForm.nomineeFirstName.touched}
                                                        inputProps={{ maxLength: 35 }}
                                                    />
                                                </FormControl>
                                                {!this.state.nomineeForm.nomineeFirstName.valid && <p style={{ color: 'red' }}>{this.state.nomineeForm.nomineeFirstName.message}</p>}
                                                <FormControl fullWidth>
                                                    <TextField
                                                        id="LastnameOfNominee"
                                                        label="Last Name of Nominee"
                                                        value={this.state.nomineeForm.nomineeLastName.value}
                                                        onChange={this.handleChange('nomineeLastName')}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="nomineeLastName"
                                                        margin="normal"
                                                        fullWidth
                                                        required={true}
                                                        error={!this.state.nomineeForm.nomineeLastName.valid
                                                            && this.state.nomineeForm.nomineeLastName.touched}
                                                        inputProps={{ maxLength: 35 }}
                                                    />
                                                </FormControl>
                                                {!this.state.nomineeForm.nomineeLastName.valid && <p style={{ color: 'red' }}>{this.state.nomineeForm.nomineeLastName.message}</p>}
                                            </Col>

                                        </Row>
                                    </form>
                                    {/* // Button next */}
                                    <div className="button-next">
                                        <Button disabled={!this.state.formIsValid}
                                            className={[classNames(classes.buttonRoot3), "button_nominee"].join(" ")}
                                            onClick={() => {
                                                this.props.setStep(this.props.currentPlan.showPreviuousInsurance ? 5 : 6);
                                                // this.setState({ prev_flag_init: false });
                                                this.handleContinue();
                                            }}>
                                            Save &amp; Continue to {this.props.currentPlan.showPreviuousInsurance ? 'Previous Insurer Detail' : 'Contact Details'}
                                        </Button>
                                    </div>
                                </div>
                            }
                        </div>
                    }

                    {/* show details here */}
                    {this.props.step > 4 && <div className="previous-show-details">
                        <Row>
                            <Col md="11" sm="10" xs="10">
                                <h3 className="step-detail">Step 5 of {this.props.totalSteps}</h3>
                                <h3 className="personal-heading">Nominee</h3>
                            </Col>
                            <Col md="1" sm="2" xs="2">
                                {this.props.step < 7 &&
                                    <h3
                                        className="edit"
                                        onClick={() => { this.props.setStep(4); this.uploadData() }}>Edit</h3>
                                }
                            </Col>
                        </Row>
                        <hr />
                        <div className="desktop-data mui--hidden-xs mui--hidden-sm">
                            <Row>
                                <Col md="4">
                                    <p className="key-name">Relationship to Nominee:</p>
                                    <p className="key-value">
                                        {Object.keys(this.props.nomineeRelation)[Object.values(this.props.nomineeRelation).indexOf(this.props.proposalFormDataHealth.relationshipToNominee)]}
                                    </p>
                                </Col>
                                <Col md="4">
                                    <p className="key-name">Age of Nominee:</p>
                                    <p className="key-value">{this.props.proposalFormDataHealth.nomineeAge}</p>
                                </Col>
                                <Col md="4">
                                    <p className="key-name">Name of Nominee:</p>
                                    <p className="key-value" style={{ textOverflow: 'wrap' }}>{`${this.props.proposalFormDataHealth.nomineeFirstName} ${this.props.proposalFormDataHealth.nomineeLastName}`}</p>
                                </Col>

                            </Row>
                        </div>
                        {/* For Mobile View */}
                        {/* Table */}
                        <table className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                            <tbody>
                                <tr>
                                    <td>
                                        Relationship to Nominee:
                                </td>
                                    <td>
                                        {Object.keys(this.props.nomineeRelation)[Object.values(this.props.nomineeRelation).indexOf(this.props.proposalFormDataHealth.relationshipToNominee)]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Age of Nominee:
                                </td>
                                    <td>
                                        {this.props.proposalFormDataHealth.nomineeAge}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Name of Nominee:
                                </td>
                                    <td>
                                        {`${this.props.proposalFormDataHealth.nomineeFirstName} ${this.props.proposalFormDataHealth.nomineeLastName}`}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>}
                </Panel>
            </div>
        )
    }
}

Nominee.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    step: state.proposal_form_motor.stepH,
    proposalFormDataHealth: state.proposalFormHealth.proposalFormHealthData,
    currentPlan: state.currentPlan.details ? state.currentPlan.details : {}
})

const mapDispatchToProps = dispatch => ({
    setStep: step => dispatch({ type: 'SET_STEP_H', step }),
    loadProposalFormHealth: (data) => dispatch({ type: 'PROPOSAL_FORM_HEALTH', data })
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Nominee))
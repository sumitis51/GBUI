import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import green from '@material-ui/core/colors/green';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import InputAdornment from '@material-ui/core/InputAdornment';

import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    margin: {
        marginTop: '1rem'
    },
    formControl: {
        margin: theme.spacing.unit,
        marginBottom: '0'
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
        marginBottom: '0'
    },
    radio: {
        marginRight: '1.5rem',
        marginLeft: '0rem'
    },
    formControlLabel:{
        label:{
            color: '#808080',
            fontFamily: 'Source Sans Pro',
            fontSize: '14px'
        }
    },
    consentlabel:{
        fontFamily: 'Helvetica',
        fontSize: '10px',
        color: '#808080',
    },
    checkboxConcent: {
        '&$checked': {
            color: '#ea0b4b'
        },
    },
    checked: {},
    cssLabel: {
        color: '#aaaaaa',
        fontFamily: 'Source Sans Pro',
        fontSize: '14px',
        '&$cssFocused': {
            color: green[500],
        },
    },
    cssLabelN: {
        color: '#aaaaaa',
        fontFamily: 'Source Sans Pro',
        fontSize: '14px',
        '&$cssFocused': {
            color: '#aaaaaa',
        },
    },
    cssFocused: {},
    cssUnderlineN: {
        '&:after': {
            borderBottomColor: '#808080',
        },
    },
    dialogRoot: {
        padding: '0px !important',
    },
    formControlTable: {
        marginBottom: theme.spacing.unit * 0
    },
    selectRoot: {
        color: 'rgba(170, 170, 170, 0.54)',
        fontFamily: 'Source Sans Pro',
        '&$focused': {
            color: 'rgba(170, 170, 170, 0.54)'
        }
    },
    selectFocused: {
        color: 'rgba(170, 170, 170, 0.54)',
    },
    bar1: {
        backgroundColor: '#0da176',
        height: '2px'
    },
    bar2: {
        backgroundColor: '#808080',
        height: '2px'
    },
    paperScroll: {
        overflowX: 'hidden'
    },
    adornment:{
        fontSize:'18px',
        marginBottom: '2px'
    }
});
class Diseases extends React.Component {

    state = {
        consent:false,
        valid:false,
        personalDetail: {
            fontFamily: 'Source Sans Pro',
            fontSize: '12px',
            color: '#000000',
            margin:'17px 0px'
        },
        incomeItems: [
            { key: 'Up to 3 lacs', value: 300000 },
            { key: '3 to 5 lacs', value: 500000 },
            { key: '5 to 7 lacs', value: 700000 },
            { key: '7 to 10 lacs', value: 1000000},
            { key: '10 to 15 lacs', value: 1500000 },
            { key: '15 lacs+', value: 1500001 }
        ],
        personalDetailsForm:{
            income:{
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            selfPincode:{
                value: '',
                validation: {
                    required: true,
                    isNumber:true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            parentPincode:{
                value: '',
                validation: {
                    required: true,
                    isNumber:true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: true,
                touched: false
            },
            inLawPincode:{
                value: '',
                validation: {
                    required: true,
                    isNumber:true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: true,
                touched: false
            },
            // name:{
            //     value: '',
            //     validation: {
            //         required: true,
            //         isCharacter:true,
            //     },
            //     valid: false,
            //     touched: false
            // },
            firstName:{
                value: '',
                validation: {
                    required: true,
                    isCharacter:true,
                },
                valid: false,
                touched: false
            },
            lastName:{
                value: '',
                validation: {
                    required: true,
                    isCharacter:true,
                },
                valid: false,
                touched: false
            },
            phone:{
                value: '',
                validation: {
                    required: true,
                    isNumber:true,
                    minLength: 10,
                    maxLength: 10
                },
                valid: false,
                touched: false
            }
        },
    };

    
    handleSubmitPersonalDetails = name => event => {
        const updatedPersonalDetailsForm = {
            ...this.state.personalDetailsForm,
        }
        const updatedFormElement = {
            ...updatedPersonalDetailsForm[name]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidityFields(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedPersonalDetailsForm[name] = updatedFormElement;
        let formIsValid = true;
        for (let name in updatedPersonalDetailsForm) {
            formIsValid = updatedPersonalDetailsForm[name].valid && formIsValid
            console.log(updatedPersonalDetailsForm[name],name,formIsValid)
        }
        // console.log('formIsValid1', formIsValid)
        this.setState({ personalDetailsForm: updatedPersonalDetailsForm});
        this.props.valid(formIsValid)
        let inputFormHealth = this.props.inputFormHealthData
        inputFormHealth.gender = this.props.gender;
        if (event.target.name === 'income') {
            inputFormHealth.income = event.target.value
        }
        else if (event.target.name === 'firstName') inputFormHealth.firstName = event.target.value
        else if (event.target.name === 'lastName') inputFormHealth.lastName = event.target.value
        else if (event.target.name === 'selfPincode') inputFormHealth.selfPincode = event.target.value
        else if (event.target.name === 'parentPincode') inputFormHealth.parentPincode = event.target.value
        else if (event.target.name === 'inLawPincode') inputFormHealth.inLawPincode = event.target.value
        else if (event.target.name === 'phone') inputFormHealth.phone = event.target.value
        this.props.loadInputFormHealth(inputFormHealth)
    };

    checkValidityFields = (value, rules) => {
        let isValid = true;
        if (rules.required && rules.isCharacter) {
             isValid = /*value.trim().split(" ").length > 1 &&*/ value.trim().match(/^[a-zA-Z ]+$/) && isValid
        }
        if (rules.required && rules.isNumber) {
            isValid = value.trim() !== '' && value.trim().match(/^\d+$/) && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        } 
        return isValid
    }

    

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        if(event.target.checked){
            this.props.consent(true)
        }else{
            this.props.consent(false)
        }
        
    };

    // Get Pincode using Geocode...
    getLocation = () => {
        const vm = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${'AIzaSyDzn5koL2GVQnaNLiVRwZdtkheMMmqIIqA'}`)
                    .then(resp => {
                        const results = resp.data.results

                        const pinString = results[0].formatted_address.split(',')[results[0].formatted_address.split(',').length - 2].trim().split(' ')
                        // console.log(pinString)
                        const {personalDetailsForm} = this.state
                        personalDetailsForm.selfPincode.value = pinString[pinString.length - 1]
                        personalDetailsForm.selfPincode.valid = true
                        personalDetailsForm.selfPincode.touched = true
                        vm.setState({ personalDetailsForm })
                        let inputFormHealth = this.props.inputFormHealthData

                        inputFormHealth.selfPincode = pinString[pinString.length - 1]
                        vm.props.loadInputFormHealth(inputFormHealth)

                    }).catch(error => {
                        console.error(error)
                    })
            })
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    }
   
    componentDidMount=()=> {
       
        if ( this.props.inputFormHealthData) {
            const {personalDetailsForm}  = this.state
                const inputFormData = this.props.inputFormHealthData
              
                // Income
                personalDetailsForm.income.value = inputFormData.income
                personalDetailsForm.income.valid = true
                personalDetailsForm.income.touched = true
                // Self Pincode
                personalDetailsForm.selfPincode.value = inputFormData.selfPincode
                personalDetailsForm.selfPincode.valid = true
                personalDetailsForm.selfPincode.touched = true
                // Parents Pincode 
                personalDetailsForm.parentPincode.value = inputFormData.parentPincode
                personalDetailsForm.parentPincode.valid = true
                personalDetailsForm.parentPincode.touched = true
                // In Laws pincode
                personalDetailsForm.inLawPincode.value = inputFormData.inLawPincode
                personalDetailsForm.inLawPincode.valid = true
                personalDetailsForm.inLawPincode.touched = true
                // First Name
                personalDetailsForm.firstName.value = inputFormData.firstName
                personalDetailsForm.firstName.valid = true
                personalDetailsForm.firstName.touched = true
                // Last Name
                personalDetailsForm.lastName.value = inputFormData.lastName
                personalDetailsForm.lastName.valid = true
                personalDetailsForm.lastName.touched = true
                // Phone
                personalDetailsForm.phone.value = inputFormData.phone
                personalDetailsForm.phone.valid = true
                personalDetailsForm.phone.touched = true
            this.setState({
                income: this.props.inputFormHealthData.income,
                selfPincode: this.props.inputFormHealthData.selfPincode,
                inLawPincode: this.props.inputFormHealthData.inLawPincode,
                parentPincode: this.props.inputFormHealthData.parentPincode,
                // name: this.props.inputFormHealthData.name,
                firstName: this.props.inputFormHealthData.firstName,
                lastName: this.props.inputFormHealthData.lastName,
                phone: this.props.inputFormHealthData.phone,
                personalDetailsForm,
                formIsValid: true
            })
        }
        this.props.consent(this.state.consent)
        this.props.valid(this.state.valid)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="age-details-parent-div-input-form-health">
                <h3 className="who-would-heading-select-members">
                    Share your personal detail
                </h3>
                <FormControl fullWidth required margin="dense"
                      error={!this.state.personalDetailsForm.income.valid
                        && this.state.personalDetailsForm.income.touched}>
                    <InputLabel
                       htmlFor="custom-css-input"
                       FormLabelClasses={{
                           root: classes.cssLabelN,
                           focused: classes.cssFocused,
                       }}
                         >Your Income</InputLabel>
                    <Select
                        value={this.state.personalDetailsForm.income.value}
                        onChange={this.handleSubmitPersonalDetails('income')}
                        inputProps={{
                            name: 'income',
                            id: 'income',
                        }}
                    >
                        {this.state.incomeItems.map(item => <MenuItem value={item.value}>{item.key}</MenuItem>)}
                    </Select>
                </FormControl>
                {this.props.inputFormHealthData.formMembers.self && 
                        <FormControl className={classes.margin} required margin="dense" fullWidth
                             error={!this.state.personalDetailsForm.selfPincode.valid
                                && this.state.personalDetailsForm.selfPincode.touched}>
                            <InputLabel
                                htmlFor="custom-css-input"
                                FormLabelClasses={{
                                    root: classes.cssLabelN,
                                    focused: classes.cssFocused,
                                }}
                            >
                                Your Pincode
                            </InputLabel>
                            <Input
                                id="custom-css-input"
                                classes={{
                                    underline: classes.cssUnderlineN,
                                }}
                                fullWidth
                                name="selfPincode"
                                onChange={this.handleSubmitPersonalDetails('selfPincode')}
                                value={this.state.personalDetailsForm.selfPincode.value}
                                endAdornment={<InputAdornment position="end">
                                      <img
                                        src="/assets/ic-my-location-24-px.svg"
                                        width="20"
                                        height="20" className="pincode-svg" alt="location"
                                        onClick={this.getLocation} />
                                </InputAdornment>}
                            />
                        </FormControl>}
                {(this.props.inputFormHealthData.formMembers.father || this.props.inputFormHealthData.formMembers.mother) && 
                   <FormControl className={classes.margin} margin="dense" fullWidth>
                    <InputLabel
                        htmlFor="custom-css-input"
                        FormLabelClasses={{
                            root: classes.cssLabelN,
                            focused: classes.cssFocused,
                        }}
                    >
                        Your Parents Pincode
                    </InputLabel>
                    <Input
                        id="custom-css-input"
                        classes={{
                            underline: classes.cssUnderlineN,
                        }}
                        fullWidth
                        onChange={this.handleSubmitPersonalDetails('parentPincode')}
                        value={this.state.personalDetailsForm.parentPincode.value}
                        name="parentPincode"
                    />
                </FormControl>}
                {(this.props.inputFormHealthData.formMembers.father_in_law || this.props.inputFormHealthData.formMembers.mother_in_law) && 
                   <FormControl className={classes.margin} margin="dense" fullWidth>
                    <InputLabel
                        htmlFor="custom-css-input"
                        FormLabelClasses={{
                            root: classes.cssLabelN,
                            focused: classes.cssFocused,
                        }}
                    >
                        Your In Laws Pincode
                    </InputLabel>
                    <Input
                        id="custom-css-input"
                        classes={{
                            underline: classes.cssUnderlineN,
                        }}
                        fullWidth
                        onChange={this.handleSubmitPersonalDetails('inLawPincode')}
                        value={this.state.personalDetailsForm.inLawPincode.value}
                        name="inLawPincode"

                    />
                </FormControl>}

                <div  style={this.state.personalDetail}>Please share your contact details , we will not spam you</div>
                <FormControl required className={classes.margin} margin="dense" fullWidth
                      error={!this.state.personalDetailsForm.firstName.valid
                        && this.state.personalDetailsForm.firstName.touched}>
                    <InputLabel
                        htmlFor="custom-css-input"
                        FormLabelClasses={{
                            root: classes.cssLabelN,
                            focused: classes.cssFocused,
                        }}
                    >
                      First  Name
                    </InputLabel>
                    <Input
                        id="custom-css-input"
                        classes={{
                            underline: classes.cssUnderlineN,
                        }}
                        fullWidth
                        onChange={this.handleSubmitPersonalDetails('firstName')}
                        name="firstName"
                        value={this.state.personalDetailsForm.firstName.value}
                        inputProps={{ maxLength: 35 }}
                    />
                </FormControl>
                <FormControl required className={classes.margin} margin="dense" fullWidth
                      error={!this.state.personalDetailsForm.lastName.valid
                        && this.state.personalDetailsForm.lastName.touched}>
                    <InputLabel
                        htmlFor="custom-css-input"
                        FormLabelClasses={{
                            root: classes.cssLabelN,
                            focused: classes.cssFocused,
                        }}
                    >
                      Last Name
                    </InputLabel>
                    <Input
                        id="custom-css-input"
                        classes={{
                            underline: classes.cssUnderlineN,
                        }}
                        fullWidth
                        onChange={this.handleSubmitPersonalDetails('lastName')}
                        name="lastName"
                        value={this.state.personalDetailsForm.lastName.value}
                        inputProps={{ maxLength: 35 }}
                    />
                </FormControl>
                <FormControl required className={classes.margin} margin="dense" fullWidth
                       error={!this.state.personalDetailsForm.phone.valid
                        && this.state.personalDetailsForm.phone.touched}>
                    <InputLabel
                        htmlFor="custom-css-input"
                        FormLabelClasses={{
                            root: classes.cssLabelN,
                            focused: classes.cssFocused,
                        }}
                    >
                        Phone Number
                    </InputLabel>
                    <Input
                        id="custom-css-input"
                        classes={{
                            underline: classes.cssUnderlineN,
                        }}
                        fullWidth
                        onChange={this.handleSubmitPersonalDetails('phone')}
                        name="phone"
                        value={this.state.personalDetailsForm.phone.value}
                        startAdornment={<InputAdornment disableTypography={true} 
                        classes={{root:classes.adornment}} position="start">+91</InputAdornment>}
                    />
                </FormControl>
                <FormControlLabel
                    control={
                        <Checkbox className={{root:classes.checkboxConcent}}
                        onChange={this.handleChange('consent')}
                        value={this.state.consent}
                        />
                    }
                    label="I agree to GroupBima contacting me on the given phone number as any such contact attempt will be ‘Transactional’ as per the TRAI guidelines."
                    classes={{label:classes.consentlabel}}
                    />
            </div>
        )
    }
}

Diseases.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    inputFormHealthData: state.inputFormHealth.inputFormHealthData
})

const mapDispatchToProps = dispatch => ({
    loadInputFormHealth: data => dispatch({ type: 'INPUT_FORM_HEALTH', data })
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Diseases))
import React from 'react'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import axios from 'axios'
import Input from '@material-ui/core/Input'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { Link } from 'react-router-dom'
import withMobileDialog from '@material-ui/core/withMobileDialog';

import constants from '../../../../constants/appConstants.json'
import './form.css'
import moment from 'moment';



const styles = theme => ({
    formControl: {
        margin: 0,
        marginBottom: 0
    },
    formControlSelect: {
        margin: 6,
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
        margin: 0
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
    labelFrm: {
        marginRight: '10px'
    },
    buttonN: {
        color: 'white',
        textTransform: 'capitalize',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        whiteSpace: 'nowrap'
    },
});
class FormInsured extends React.Component {
    state = {
        nations: [
            { value: 'Indian', label: 'Indian' },
        ],
        data: [],
        memberName: '',
        profession: '',
        relationship: '',
        height: 0,
        heightFeet: 0,
        heightInches: 0,
        weight: 78.6,
        // gender: '',
        dateOfBirth: '',
        sleepingHourInADay: '',
        walkingInADay: '',
        alchohal: [{
            alcoholInADay: '',
            frequency: '',
            startedFromMonth: '',
            startedFromYear: '',
        }],
        smoking: [{
            smokeUnitInADay: '',
            frequency: '',
            startedFromMonth: '',
            startedFromYear: '',
        }],
        medicalHistoryMember: '',
        medicalHistory: [],
        Questiondata: [],
        insuredMembersList: [],
        insuredForm: {
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
            profession: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                message: 'Please select Profession'
            },
            nationality: {
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                message: 'Please select Nationality'
            },
            preExistingDisease: {
                value: [],
                validation: {

                },
                valid: true,
                touched: false
            },
            dateOfBirth: {
                value: '',
                validation: {
                    required: true,
                    maxDate: true,
                    checkLegalMarriage: true,
                    validDOB: true
                },
                valid: false,
                touched: false,
                message: 'Please select correct DOB'
            },
            walkingInADay: {
                value: '',
                validation: {
                    required: false,
                },
                valid: true,
                touched: false
            },
            sleepingHourInADay: {
                value: '',
                validation: {
                    required: false,
                },
                valid: true,
                touched: false
            },
            heightFeet: {
                value: 0,
                validation: {
                    required: true,
                    isNumber: true
                },
                valid: false,
                touched: false,
                message: 'Please select Height'
            },
            weight: {
                value: 0,
                validation: {
                    required: true,
                    isNumber: true
                },
                valid: false,
                touched: false,
                message: 'Please select Weight'
            },
            heightInches: {
                value: 0,
                validation: {
                    required: true,
                    isNumber: true
                },
                valid: false,
                touched: false,
                message: 'Please select inch'
            },
            address: {
                value: '',
                validation: {
                    required: true,
                    isValidateAddress:true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please enter valid address' 
            },
            pincode: {
                value: '',
                validation: {
                    required: true,
                    isPincode: true
                },
                valid: false,
                touched: false,
                message: 'Please enter valid Pincode'
            },
        },
        formIsValid: false,
        feets: [
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
            { value: 4, label: 4 },
            { value: 5, label: 5 },
            { value: 6, label: 6 },
            { value: 7, label: 7 },
            { value: 8, label: 8 },

        ],
        inches: [
            { value: 0, label: "0" },
            { value: 1, label: "1" },
            { value: 2, label: "2" },
            { value: 3, label: "3" },
            { value: 4, label: "4" },
            { value: 5, label: "5" },
            { value: 6, label: "6" },
            { value: 7, label: '7' },
            { value: 8, label: '8' },
            { value: 9, label: '9' },
            { value: 10, label: '10' },
            { value: 11, label: '11' }
        ],
        weights: [
            { value: 30, label: 3 },
            { value: 40, label: 4 },
            { value: 50, label: 5 },
            { value: 60, label: 6 },
            { value: 70, label: 7 },
            { value: 80, label: 8 },
            { value: 90, label: 9 }
        ],
        relation: [
            { value: 'Spouse', label: 'Spouse' },
            { value: 'Son', label: 'Son' },
            { value: 'Daughter', label: 'Daughter' },
            { value: 'Mother', label: 'Mother' },
            { value: 'Father', label: 'Father' },
            { value: 'Father in law', label: 'Father in law' },
            { value: 'Mother in law', label: 'Mother in law' },
        ],
        Qustionvalue: 'no',
        self: false,
        mayIncreaseError: true,
        isLegalMarriageError: false,
        genders: [
            {key:'self', value: ''},
            {key:'spouse', value: ''},
            {key: 'son', value: 'Male'},
            {key:'daughter', value: 'Female'},
            {key:'father', value: 'Male'},
            {key:'mother', value: 'Female'},
            {key:'father_in_law', value: 'Male'},
            {key:'mother_in_law', value: 'Female'}
        ],
        legalMarriageAge: '',
        showSpouseFGMessage: false,
        isOnlyMarried: false
    }
    shouldNotChangeDob = (inputFormDob, enterFormDob) => {
        let isValid = true;
        if (inputFormDob === enterFormDob) {
            this.setState({ mayIncreaseError: true })

        } else {
            this.setState({ mayIncreaseError: false })

        }
    }
    minDOB = () => {
        return this.props.datePickers[this.props.activeTab] ? this.props.datePickers[this.props.activeTab].fromDate : ''
    }
    maxDOB = () => {
        return this.props.datePickers[this.props.activeTab] ? this.props.datePickers[this.props.activeTab].toDate: ''
    }
    checkValidity(value, rules, name) {
        let isValid = true;
        if(rules.required) {
            if(isNaN(value))
                isValid = value.trim() && isValid
            else
                isValid = value > 0 && isValid
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.isPincode){
            isValid = value.match(/^[1-9][0-9]{5}$/) && isValid
        }
        if(rules.isValidateAddress){
            isValid= value.match(/^[a-zA-Z0-9\s,./-]{1,150}$/) &&  isValid
            // let regCheck = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi
            // isValid= !value.match(regCheck) &&  isValid
            }
            if (rules.shouldAcceptCharactersOnly) {
                isValid = /*value.trim().split(" ").length > 1 &&*/ value.trim().match(/^[a-zA-Z ]+$/) && isValid
            }
        if(rules.validDOB) {
            const range = moment(value).isBetween(new Date(this.minDOB()), new Date(this.maxDOB())) || moment(value).isSame(this.minDOB())
            // alert(moment(value).isSame(this.minDOB())+"  "+ this.minDOB()+ "  "+ value)
            isValid = range&& isValid
        }
        if (rules.checkLegalMarriage) {
            // const genderList = this.props.gender
            const maritalStatusList = this.props.maritalStatus
           
            if (name === "dateOfBirth") {
                // handle according to dob
                let gender = ''
                if(this.props.formDetails[this.props.activeTab].member === 'self') {
                    gender = this.props.proposalFormDataHealth.gender === 'M' ? 'Male' : 'Female'
                } else if(this.props.formDetails[this.props.activeTab].member === 'spouse') {
                    gender = this.props.proposalFormDataHealth.gender === 'M' ? 'Female' : 'Male'
                } else {
                    gender = this.state.genders.filter(gndr => this.props.formDetails[this.props.activeTab].member.indexOf(gndr.key) !== -1)[0].value
                }
                console.log(gender)
                // alert('gender')
                
                const maritalStatus = this.state.insuredForm.maritalStatus.value
                const time = new Date(value)
                let proposalYear = time.getFullYear()
                const date = new Date();
                const year = date.getFullYear();
                const currentAge = this.props.formDetails[this.props.activeTab].age
                const genderKey = gender
                const maritalStatusKey = Object.keys(maritalStatusList).filter(item => maritalStatusList[item] === maritalStatus)[0]
                if (genderKey === 'Male' && maritalStatusKey === 'Married') {
                    // isValid = year - proposalYear >= 21 && isValid
                    this.setState({ isLegalMarriageError: !(year - proposalYear >= 21 && isValid), legalMarriageAge: 21 })
                } else if (genderKey === 'Female' && maritalStatusKey === 'Married') {
                    // isValid = year - proposalYear >= 18 && isValid
                    this.setState({ isLegalMarriageError: !(year - proposalYear >= 18 && isValid), legalMarriageAge: 18 })
                } else {
                    this.setState({ isLegalMarriageError: false })
                }
            } else if (name === "gender") {
                let gender = ''
                if(this.props.formDetails[this.props.activeTab].member === 'self') {
                    gender = this.props.proposalFormDataHealth.gender === 'M' ? 'Male' : 'Female'
                } else if(this.props.formDetails[this.props.activeTab].member === 'spouse') {
                    gender = this.props.proposalFormDataHealth.gender === 'M' ? 'Female' : 'Male'
                } else {
                    gender = this.state.genders.filter(gndr => this.props.formDetails[this.props.activeTab].member.indexOf(gndr.key) !== -1)[0].value
                }
                const maritalStatus = this.state.insuredForm.maritalStatus.value
                const time = new Date(this.state.insuredForm.dateOfBirth.value)
                let proposalYear = time.getFullYear()
                const date = new Date();
                const year = date.getFullYear();
                const genderKey = gender
                const maritalStatusKey = Object.keys(maritalStatusList).filter(item => maritalStatusList[item] === maritalStatus)[0]
                if (genderKey === 'Male' && maritalStatusKey === 'Married') {
                    // isValid = year - proposalYear >= 21 && isValid
                    this.setState({ isLegalMarriageError: !(year - proposalYear >= 21 && isValid), legalMarriageAge: 21 })
                } else if (genderKey === 'Female' && maritalStatusKey === 'Married') {
                    // isValid = year - proposalYear >= 18 && isValid
                    this.setState({ isLegalMarriageError: !(year - proposalYear >= 18 && isValid), legalMarriageAge: 18 })
                } else {
                    this.setState({ isLegalMarriageError: false })
                }
            } else if (name === "maritalStatus") {
                let gender = ''
                if(this.props.formDetails[this.props.activeTab].member === 'self') {
                    gender = this.props.proposalFormDataHealth.gender === 'M' ? 'Male' : 'Female'
                } else if(this.props.formDetails[this.props.activeTab].member === 'spouse') {
                    gender = this.props.proposalFormDataHealth.gender === 'M' ? 'Female' : 'Male'
                } else {
                    gender = this.state.genders.filter(gndr => this.props.formDetails[this.props.activeTab].member.indexOf(gndr.key) !== -1)[0].value
                }
                const maritalStatus = value
                const time = new Date(this.state.insuredForm.dateOfBirth.value)
                let proposalYear = time.getFullYear()
                const date = new Date();
                const year = date.getFullYear();
                const genderKey = gender
                const maritalStatusKey = Object.keys(maritalStatusList).filter(item => maritalStatusList[item] === maritalStatus)[0]
                if (genderKey === 'Male' && maritalStatusKey === 'Married') {
                    // isValid = year - proposalYear >= 21 && isValid
                    this.setState({ isLegalMarriageError: !(year - proposalYear >= 21 && isValid), legalMarriageAge: 21 })
                } else if (genderKey === 'Female' && maritalStatusKey === 'Married') {
                    // isValid = year - proposalYear >= 18 && isValid
                    this.setState({ isLegalMarriageError: !(year - proposalYear >= 18 && isValid), legalMarriageAge: 18 })
                } else {
                    this.setState({ isLegalMarriageError: false })
                }
                // this.checkFGSpouseCond()
            }
        }
        if ((name === 'heightInches') && (value == '0')) {
            isValid = true
        }
        if (rules.shouldAcceptCharactersOnly) {
            isValid = /*value.trim().split(" ").length > 1 &&*/ value.trim().match(/^[a-zA-Z ]+$/) && isValid
        }
        return isValid
    }
    checkFGSpouseCond(maritalStatusKey) {
        if(maritalStatusKey === 'Married' && !this.props.formMembers.spouse && this.props.currentPlan.insurerId === 555) {
            // this.setState({showSpouseFGMessage: true})
            this.props.selfSpouseFGAlert(true)
        } else {
            this.props.selfSpouseFGAlert(false)
        }
    }
    uploadLocalData() {
        const members = JSON.parse(localStorage.getItem("insuredMembers"))
        let member = members ? members.insuredMembersList[this.props.activeTab] : undefined
        const insuredForm = this.state.insuredForm
        const maritalStatusList = this.props.maritalStatus
        if (this.props.formMembers.self && this.props.activeTab === 0 && member) {
            const proposer = this.props.proposalFormDataHealth
            const insuredForm = this.state.insuredForm
            let insuredMembersDetail = this.props.proposalFormHealthMemberData

            insuredForm.salutation.value = proposer.salutation
            insuredMembersDetail[this.props.activeTab]['salutation'] = proposer.salutation
            member.salutation = proposer.salutation
            insuredForm.salutation.valid = true
            insuredForm.salutation.touched = true

            // First Name
            insuredForm.firstName.value = proposer.firstName
            insuredMembersDetail[this.props.activeTab]['firstName'] = proposer.firstName
            member.firstName = proposer.firstName
            insuredForm.firstName.valid = true
            insuredForm.firstName.touched = true

            // Last Name
            insuredForm.lastName.value = proposer.lastName
            insuredMembersDetail[this.props.activeTab]['lastName'] = proposer.lastName
            member.lastName = proposer.lastName
            insuredForm.lastName.valid = true
            insuredForm.lastName.touched = true

            // insuredForm.gender.value = proposer.gender
            // insuredMembersDetail[this.props.activeTab]['gender'] = proposer.gender
            // member.gender = proposer.gender
            // insuredForm.gender.valid = true
            // insuredForm.gender.touched = true
            
            insuredForm.maritalStatus.value = proposer.maritalStatus
            insuredMembersDetail[this.props.activeTab]['maritalStatus'] = proposer.maritalStatus
            member.maritalStatus = proposer.maritalStatus
            insuredForm.maritalStatus.valid = true
            insuredForm.maritalStatus.touched = true
            const maritalStatusKey = Object.keys(maritalStatusList).filter(item => maritalStatusList[item] === proposer.maritalStatus)[0]
            this.checkFGSpouseCond(maritalStatusKey)

            insuredForm.dateOfBirth.value = proposer.dob
            insuredMembersDetail[this.props.activeTab]['dateOfBirth'] = proposer.dob
            member.dateOfBirth = proposer.dob
            insuredForm.dateOfBirth.valid = true
            insuredForm.dateOfBirth.touched = true

            insuredForm.profession.value = proposer.profession
            insuredMembersDetail[this.props.activeTab]['profession'] = proposer.profession
            member.profession = proposer.profession
            insuredForm.profession.valid = true
            insuredForm.profession.touched = true

            insuredForm.nationality.value = proposer.nationality
            insuredMembersDetail[this.props.activeTab]['nationality'] = proposer.nationality
            member.nationality = proposer.nationality
            insuredForm.nationality.valid = true
            insuredForm.nationality.touched = true

            // insuredForm.address.value = proposer.address
            // insuredMembersDetail[this.props.activeTab]['insuredMemberAddress'] ? insuredMembersDetail[this.props.activeTab]['insuredMemberAddress']['address'] = proposer.address : false
            // member.address = proposer.address
            // insuredForm.address.valid = true
            // insuredForm.address.touched = true

            insuredForm.pincode.value = this.props.inputFormHealth.selfPincode
            insuredMembersDetail[this.props.activeTab]['insuredMemberAddress'] ? insuredMembersDetail[this.props.activeTab]['insuredMemberAddress']['pincode'] = proposer.pincode : false
            member.pincode = this.props.inputFormHealth.selfPincode
            insuredForm.pincode.valid = true
            insuredForm.pincode.touched = true
            this.props.loadProposalFormHealth({
                ...this.props.proposalFormDataHealth,
                insuredMembersList: insuredMembersDetail
            });
        }


        if (member) {
            if (member.salutation) {
                insuredForm.salutation.value = member.salutation
                insuredForm.salutation.valid = true
                insuredForm.salutation.touched = true
            }
            // First Name
            if (member.firstName) {
                insuredForm.firstName.value = member.firstName
                insuredForm.firstName.valid = true
                insuredForm.firstName.touched = true
            }
            // Last NAme
            if (member.lastName) {
                insuredForm.lastName.value = member.lastName
                insuredForm.lastName.valid = true
                insuredForm.lastName.touched = true
            }
            if (member.maritalStatus) {
                insuredForm.maritalStatus.value = member.maritalStatus
                insuredForm.maritalStatus.valid = true
                insuredForm.maritalStatus.touched = true
                const maritalStatusKey = Object.keys(maritalStatusList).filter(item => maritalStatusList[item] === member.maritalStatus)[0]
                this.checkFGSpouseCond(maritalStatusKey)
            }
            if (member.dateOfBirth) {
                insuredForm.dateOfBirth.value = this.minDOB()
                insuredForm.dateOfBirth.valid = true
                insuredForm.dateOfBirth.touched = true
            } else {
                insuredForm.dateOfBirth.value = this.minDOB()
                insuredForm.dateOfBirth.valid = true
                insuredForm.dateOfBirth.touched = true
            }
            if (member.heightFeet) {
                insuredForm.heightFeet.value = member.heightFeet
                insuredForm.heightFeet.valid = true
                insuredForm.heightFeet.touched = true
            }
            if (member.heightInches) {
                insuredForm.heightInches.value = member.heightInches
                insuredForm.heightInches.valid = true
                insuredForm.heightInches.touched = true
            }
            if (member.weight) {
                insuredForm.weight.value = member.weight
                insuredForm.weight.valid = true
                insuredForm.weight.touched = true
            }
            if (member.profession) {
                insuredForm.profession.value = member.profession
                insuredForm.profession.valid = true
                insuredForm.profession.touched = true
            }
            if (member.salutation) {
                insuredForm.salutation.value = member.salutation
                insuredForm.salutation.valid = true
                insuredForm.salutation.touched = true
            }
            if (member.nationality) {
                insuredForm.nationality.value = member.nationality
                insuredForm.nationality.valid = true
                insuredForm.nationality.touched = true
            }

            if (member.preExistingDisease) {
                insuredForm.preExistingDisease.value = member.preExistingDisease
                insuredForm.preExistingDisease.valid = true
                insuredForm.preExistingDisease.touched = true
            }
            if (member.sleepingHourInADay) {
                insuredForm.sleepingHourInADay.value = member.sleepingHourInADay
                insuredForm.sleepingHourInADay.valid = true
                insuredForm.sleepingHourInADay.touched = true
            }
            if (member.walkingInADay) {
                insuredForm.walkingInADay.value = member.walkingInADay
                insuredForm.walkingInADay.valid = true
                insuredForm.walkingInADay.touched = true
            }
            if (member.insuredMemberAddress) {
                if(member.insuredMemberAddress.address) {
                    insuredForm.address.value = member.insuredMemberAddress.address
                    insuredForm.address.valid = true
                    insuredForm.address.touched = true
                }
                if (member.insuredMemberAddress.pincode) {
                    insuredForm.pincode.value = member.insuredMemberAddress.pincode
                    insuredForm.pincode.valid = true
                    insuredForm.pincode.touched = true
                } else {
                    insuredForm.pincode.value = this.props.inputFormHealth.selfPincode
                    insuredForm.pincode.valid = true
                    insuredForm.pincode.touched = true
                }
                
            } else {
                insuredForm.pincode.value = this.props.inputFormHealth.selfPincode
                insuredForm.pincode.valid = true
                insuredForm.pincode.touched = true
            }
            let formIsValid = true
            for (let name in insuredForm) {
                console.log(insuredForm[name].valid, insuredForm[name].value)
                formIsValid = insuredForm[name].valid && formIsValid
            }
            console.log(formIsValid)
            let insuredMembersDetail = this.props.proposalFormHealthMemberData
            member.isValid = formIsValid
            insuredMembersDetail[this.props.activeTab] = member
            this.setState({ formIsValid, insuredForm })
            // let valid = true
            // insuredMembersDetail.map(item => {
            //     valid = item.isValid && valid
            // })
            // this.props.formIsValid(valid)

            this.props.loadProposalFormHealth({
                ...this.props.proposalFormDataHealth,
                insuredMembersList: insuredMembersDetail
            });
        }
        // alert(member.dob, this.props.activeTab)
        if ((member && !member.dateOfBirth) && this.props.activeTab !== 0) {
            // alert("HELLO")
            let member = this.props.formDetails[this.props.activeTab]
            const insuredForm = this.state.insuredForm
            insuredForm.dateOfBirth.value = this.minDOB()
            insuredForm.dateOfBirth.valid = true
            insuredForm.dateOfBirth.touched = true
            this.setState({ insuredForm })
        }
        if (member && !member.salutation && this.props.activeTab !== 0) {
            // let member = this.props.formDetails[this.props.activeTab]

            // const age = member.age
            // const todayYear = new Date().getFullYear()
            // const dobToSet = `${todayYear - age}-01-01`
            const insuredForm = this.state.insuredForm
            insuredForm.dateOfBirth.value = this.minDOB()
            insuredForm.dateOfBirth.valid = true
            insuredForm.dateOfBirth.touched = true
            insuredForm.pincode.value = this.props.inputFormHealth.selfPincode
            insuredForm.pincode.valid = true
            insuredForm.pincode.touched = true
            this.setState({ insuredForm })
            // Set salutation
            this.setAutoSalutation()
        }
        if (!member && (this.props.formMembers.self && this.props.activeTab === 0)) {
            const proposer = this.props.proposalFormDataHealth
            // Set dob
            insuredForm.dateOfBirth.value = proposer.dob
            insuredForm.dateOfBirth.valid = true
            insuredForm.dateOfBirth.touched = true
            // Set salutation

            insuredForm.salutation.value = proposer.salutation
            insuredForm.salutation.valid = true
            insuredForm.salutation.touched = true

            // Set First Name
            insuredForm.firstName.value = proposer.firstName
            insuredForm.firstName.valid = true
            insuredForm.firstName.touched = true

            // Set Last Name
            insuredForm.lastName.value = proposer.lastName
            insuredForm.lastName.valid = true
            insuredForm.lastName.touched = true

            // Set Gender
            // insuredForm.gender.value = proposer.gender
            // insuredForm.gender.valid = true
            // insuredForm.gender.touched = true
            // Set Marital Status
            insuredForm.maritalStatus.value = proposer.maritalStatus
            insuredForm.maritalStatus.valid = true
            insuredForm.maritalStatus.touched = true
            const maritalStatusKey = Object.keys(maritalStatusList).filter(item => maritalStatusList[item] === proposer.maritalStatus)[0]
            this.checkFGSpouseCond(maritalStatusKey)
            
            // Set pincode
            insuredForm.pincode.value = this.props.inputFormHealth.selfPincode
            insuredForm.pincode.valid = true
            insuredForm.pincode.touched = true

            // Set profession
            insuredForm.profession.value = proposer.profession
            insuredForm.profession.valid = true
            insuredForm.profession.touched = true


            this.setState({ insuredForm })
        }
        if(this.props.formMembers.self && this.props.activeTab === 0) {
            const proposer = this.props.proposalFormDataHealth
            // Set dob
            insuredForm.dateOfBirth.value = proposer.dob
            insuredForm.dateOfBirth.valid = true
            insuredForm.dateOfBirth.touched = true
            this.setState({ insuredForm })
        }
        let formIsValid = true
        for (let name in insuredForm) {
            insuredForm[name].valid = this.checkValidity(insuredForm[name].value, insuredForm[name].validation, name)
            console.log(insuredForm[name].value, insuredForm[name].valid)
            formIsValid = insuredForm[name].valid && formIsValid
        }
        this.setState({ formIsValid, insuredForm })
        this.props.formIsValid(formIsValid)
    }
    setAutoSalutation() {
        // alert('hello')
        const formData = this.state.insuredForm
        // Look for salutation
        const salutations = this.props.salutation
        console.log(salutations)
        let gender = ''
                if(this.props.formDetails[this.props.activeTab].member === 'self') {
                    gender = this.props.proposalFormDataHealth.gender === 'M' ? 'Male' : 'Female'
                } else if(this.props.formDetails[this.props.activeTab].member === 'spouse') {
                    gender = this.props.proposalFormDataHealth.gender === 'M' ? 'Female' : 'Male'
                } else {
                    gender = this.state.genders.filter(gndr => this.props.formDetails[this.props.activeTab].member.indexOf(gndr.key) !== -1)[0].value
                }
        if(gender === 'Male' || gender === 'M') {
            Object.keys(this.props.salutation).map(key => {

                console.log(key.toLowerCase(), salutations[key])
                if(key.toLowerCase() === 'mr') {
                    formData.salutation.value = salutations[key]
                    formData.salutation.valid = true
                    formData.salutation.touched = true
                }
            })
        } else if( gender === 'Female' || gender === 'F') {
            Object.keys(salutations).map(key => {
                if(key.toLowerCase() ==='ms') {
                    formData.salutation.value = salutations[key]
                    formData.salutation.valid = true
                    formData.salutation.touched = true
                }
            })
        }
        this.setState({insuredForm :formData})

    }
    setMaritalstatus() {
        const formData = this.state.insuredForm
        const formMembers = this.props.formMembers
        if(this.props.formDetails[this.props.activeTab].member === 'self' || this.props.formDetails[this.props.activeTab].member === 'spouse') {
            if((formMembers.self && formMembers.spouse) || (!formMembers.self && formMembers.spouse)) {
                const maritalStatusList = this.props.maritalStatus
                Object.keys(maritalStatusList).map(key => {
                    if(key === 'Married') {
                        formData.maritalStatus.value = maritalStatusList[key]
                        formData.maritalStatus.valid = true
                        formData.maritalStatus.touched = true
                    }
                })
                this.setState({insuredForm:formData, isOnlyMarried: true})
            }
        }
        
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.datePickers !== this.props.datePickers) {
            
            const insuredForm = this.state.insuredForm
            insuredForm.dateOfBirth.value = this.minDOB()
            insuredForm.dateOfBirth.valid =  this.checkValidity(insuredForm.dateOfBirth.value, insuredForm.dateOfBirth.validation)
            this.setState({insuredForm})
        }
        // if(prevProps.maritalStatus !== this.props.maritalStatus) {
        //     this.setMaritalstatus()
        // }
        if(prevProps.activeTab !== this.props.activeTab) {}

    }
    handleChangeQuestions = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }
    handleChange = name => event => {
        const updatedProposalForm = {
            ...this.state.insuredForm,
        }
        const updatedFormElement = {
            ...updatedProposalForm[name]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, name)
        updatedFormElement.touched = true
        updatedProposalForm[name] = updatedFormElement;
        let formIsValid = true;
        for (let name in updatedProposalForm) {
            formIsValid = updatedProposalForm[name].valid && formIsValid
            console.log(name, formIsValid)
        }
        
        this.setState({ insuredForm: updatedProposalForm, formIsValid: formIsValid });
        this.setState({ [name]: event.target.value })

        let insuredMembersDetail = this.props.proposalFormHealthMemberData
        if (event.target.name === 'address') {
            if (insuredMembersDetail[this.props.activeTab]['insuredMemberAddress']) {
                insuredMembersDetail[this.props.activeTab]['insuredMemberAddress']['address'] = event.target.value
            } else {
                insuredMembersDetail[this.props.activeTab]['insuredMemberAddress'] = {}
                insuredMembersDetail[this.props.activeTab]['insuredMemberAddress']['address'] = event.target.value
            }
            insuredMembersDetail[this.props.activeTab].isValid = formIsValid
        } else if (event.target.name === 'pincode') {
            if (insuredMembersDetail[this.props.activeTab]['insuredMemberAddress']) {
                insuredMembersDetail[this.props.activeTab]['insuredMemberAddress']['pincode'] = event.target.value
            } else {
                insuredMembersDetail[this.props.activeTab]['insuredMemberAddress'] = {}
                insuredMembersDetail[this.props.activeTab]['insuredMemberAddress']['pincode'] = event.target.value
            }
            insuredMembersDetail[this.props.activeTab].isValid = formIsValid
        } else {
            insuredMembersDetail[this.props.activeTab][name] = event.target.value
            insuredMembersDetail[this.props.activeTab].isValid = formIsValid
        }

        if (event.target.name === 'heightFeet') {
            let height = `${event.target.value}.${insuredMembersDetail[this.props.activeTab].heightInches !== undefined ?
                insuredMembersDetail[this.props.activeTab].heightInches : 0}`
            insuredMembersDetail[this.props.activeTab]['height'] = height
        }
        else if (event.target.name === 'heightInches') {
            let height = `${insuredMembersDetail[this.props.activeTab].heightFeet !== undefined ?
                insuredMembersDetail[this.props.activeTab].heightFeet : 0}.${event.target.value}`
            insuredMembersDetail[this.props.activeTab]['height'] = height
        }

        // Set each value
        const member = insuredMembersDetail[this.props.activeTab]
        member.dateOfBirth = updatedProposalForm.dateOfBirth.value
        member.salutation = updatedProposalForm.salutation.value
        // member.memberName = updatedProposalForm.memberName.value
        member.firstName = updatedProposalForm.firstName.value
        member.lastName = updatedProposalForm.lastName.value
        // member.gender = updatedProposalForm.gender.value
        member.maritalStatus = updatedProposalForm.maritalStatus.value
        member.relationship = this.props.formDetails[this.props.activeTab].memberCode
        member.profession = updatedProposalForm.profession.value
        member.nationality = updatedProposalForm.nationality.value
        member.heightInches = Number(updatedProposalForm.heightInches.value)
        member.insuredMemberAddress = {
            address: updatedProposalForm.address.value,
            pincode: updatedProposalForm.pincode.value
        }

        insuredMembersDetail[this.props.activeTab] = member
        const load = {
            ...this.props.proposalFormDataHealth,
            insuredMembersList: insuredMembersDetail
        }
        // let valid = true
        // insuredMembersDetail.map(item => {
        //     valid = item.isValid && valid
        // })
        
        this.props.formIsValid(formIsValid)
        localStorage.setItem("insuredMembers", JSON.stringify(load))
        this.props.loadProposalFormHealth(load);
    };
   

    

    componentDidMount() {
        // this.props.selfSpouseFGAlert(false)
        // this.uploadState()
        this.uploadLocalData()
        axios.get(`${constants.apiRootURL}/proposer/questions/${this.props.insurerId}/${this.props.currentPlan.planCode}`)
            .then(res => {
                console.log('questions', res.data)
                this.setState({
                    Questiondata: res.data
                })
            })
        this.setMaritalstatus()
        if(this.props.activeTab !== 0) {
            const insuredForm = this.state.insuredForm
            insuredForm.dateOfBirth.value = this.minDOB()
            insuredForm.dateOfBirth.valid =  this.checkValidity(insuredForm.dateOfBirth.value, insuredForm.dateOfBirth.validation)
            this.setState({insuredForm})
        }
    }


    render() {
        const { classes, fullScreen } = this.props;
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
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
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };

        const minDOB = () => {
            // return returnDate
            return this.props.datePickers[this.props.activeTab] ? this.props.datePickers[this.props.activeTab].fromDate : ''
        }
        const maxDOB = () => {
            // return returnDate
            return this.props.datePickers[this.props.activeTab] ? this.props.datePickers[this.props.activeTab].toDate : ''
        }

        const {insuredForm} = this.state

        return (
            <div className="form-insured-parent-div">
                <form noValidate autoComplete="rutjfkde" >
                    <Row>
                        <Col md="6">
                        <Row>
                            <Col md={4}>
                                <FormControl required
                                    error={!this.state.insuredForm.salutation.valid
                                        && this.state.insuredForm.salutation.touched}
                                    fullWidth>
                                    <InputLabel htmlFor="salutation">Salutation</InputLabel>
                                    <Select name="salutation"
                                        value={this.state.insuredForm.salutation.value} onChange={this.handleChange('salutation')}
                                        inputProps={{
                                            name: 'salutation',
                                            id: 'salutation',
                                        }}
                                    >
                                        {Object.keys(this.props.salutation).map(key => { return <MenuItem value={this.props.salutation[key]}>{key}</MenuItem> }
                                        )}
                                    </Select>
                                </FormControl>
                                {(!this.state.insuredForm.salutation.valid
                                        && this.state.insuredForm.salutation.touched) && <p className="error">{insuredForm.salutation.message}</p>}
                            </Col>
                            {/* Name */}
                            <Col md={8}>
                                <FormControl margin="dense" fullWidth style={{ marginTop: '-6px' }}>
                                    <TextField
                                        fullWidth
                                        value={this.state.insuredForm.firstName.value}
                                        onChange={this.handleChange('firstName')}
                                        error={!this.state.insuredForm.firstName.valid
                                            && this.state.insuredForm.firstName.touched}
                                        name="firstName"
                                        inputProps={{ maxLength: 35, autocomplete:"rutjfkde" }}
                                        label="First Name*"
                                        margin="dense" />

                                    {this.state.insuredForm.firstName.touched ? !this.state.insuredForm.firstName.valid && <p className="error">{insuredForm.firstName.message}</p> : null}
                                </FormControl>
                            </Col>
                            </Row>
                            <FormControl margin="dense" fullWidth style={{ marginTop: '-6px' }}>
                                    <TextField
                                        fullWidth
                                        value={this.state.insuredForm.lastName.value}
                                        onChange={this.handleChange('lastName')}
                                        error={!this.state.insuredForm.lastName.valid
                                            && this.state.insuredForm.lastName.touched}
                                        name="lastName"
                                        label="Last Name*"
                                        inputProps={{ maxLength: 35, autocomplete:"rutjfkde" }}
                                        margin="dense" />

                                    {this.state.insuredForm.lastName.touched ? !this.state.insuredForm.lastName.valid && <p className="error">{insuredForm.lastName.message}</p> : null}
                                </FormControl>

                            <FormControl
                                error={!this.state.insuredForm.maritalStatus.valid
                                    && this.state.insuredForm.maritalStatus.touched}
                                className={classes.formControl} fullWidth
                                disabled={this.state.isOnlyMarried}>
                                <FormLabel
                                    component="legend"
                                    classes={{
                                        root: classes.label,
                                        focused: classes.focused_label
                                    }}>Marital Status*</FormLabel>
                                <RadioGroup
                                    aria-label="maritalStatus"
                                    name="maritalStatus"
                                    className={classes.group}
                                    value={this.state.insuredForm.maritalStatus.value}
                                    onChange={this.handleChange('maritalStatus')}
                                    row
                                >
                                    {Object.keys(this.props.maritalStatus).map(key => {
                                        return <FormControlLabel value={this.props.maritalStatus[key]} control={<Radio classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }} />} label={key} />
                                    })}
                                </RadioGroup>
                                <p></p>
                                <p style={{ color: '#ea0b4b' }} >{/*this.state.insuredForm.dateOfBirth.touched ? !this.state.insuredForm.dateOfBirth.valid */
                                    this.state.isLegalMarriageError && `Legal marriage age is ${this.state.legalMarriageAge}`}</p>
                                {/* {!this.state.insuredForm.maritalStatus.valid && <p>{this.state.insuredForm.maritalStatus.message}</p>} */}
                            </FormControl>

                            <FormControl required
                                error={!this.state.insuredForm.profession.valid
                                    && this.state.insuredForm.profession.touched}
                                fullWidth style={{ marginTop: '4px', marginBottom: '-14px' }}>
                                <InputLabel htmlFor="profession">Profession</InputLabel>
                                <Select name="profession"
                                    // value={this.state.proposerDetails.profession}
                                    value={this.state.insuredForm.profession.value}
                                    onChange={this.handleChange('profession')}
                                    inputProps={{
                                        name: 'profession',
                                        id: 'profession',
                                    }}
                                >
                                    <MenuItem value={''}>Select Profession</MenuItem>
                                    {Object.keys(this.props.proffession).map(key => { return <MenuItem value={this.props.proffession[key]}>{key}</MenuItem> }
                                    )}
                                </Select>
                            </FormControl>
                            {(!this.state.insuredForm.profession.valid
                                    && this.state.insuredForm.profession.touched) && <p className="error">{insuredForm.profession.message}</p>}
                            <FormControl margin="dense" fullWidth>
                                <TextField
                                    fullWidth
                                    value={this.state.insuredForm.pincode.value}
                                    onChange={this.handleChange('pincode')}
                                    error={!this.state.insuredForm.pincode.valid
                                        && this.state.insuredForm.pincode.touched}
                                    name="pincode"
                                    label="Pincode*"
                                    inputProps={{autocomplete:"rutjfkde"}}
                                    margin="dense" />
                            </FormControl>
                            {(!this.state.insuredForm.pincode.valid
                                        && this.state.insuredForm.pincode.touched) && <p className="error">{insuredForm.pincode.message}</p>}
                        </Col>
                        <Col md="6">
                            {/* Date of Birth(DOB)*/}
                            <FormControl fullWidth margin="dense" style={{ marginTop: '-7px', marginBottom: '16px' }}>
                                <TextField id="date"
                                    type="date"
                                    fullWidth
                                    // defaultValue="2019-01-01"
                                    defaultValue={minDOB()}
                                    value={this.state.insuredForm.dateOfBirth.value}
                                    // InputProps={{ inputProps:{max:current_date}}}
                                    InputProps={{ inputProps: { max: maxDOB(), min: minDOB() } }}
                                    onChange={this.handleChange('dateOfBirth')}
                                    error={!this.state.insuredForm.dateOfBirth.valid
                                    && this.state.insuredForm.dateOfBirth.touched/*this.state.isLegalMarriageError*/}
                                    name="dateOfBirth"
                                    margin="dense"
                                    maxLength='1'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Date of Birth(DOB)"
                                    disabled={this.props.activeTab === 0 && this.props.formMembers.self} />
                                    {!insuredForm.dateOfBirth.valid && <p className="error">{insuredForm.dateOfBirth.message}</p>}
                                {!this.state.mayIncreaseError ? <p style={{ color: '#ea0b4b' }}>Change in age may increase policy Value</p> : null}
                            </FormControl>

                            {/* Height*/}
                            <FormControl
                                error={!this.state.insuredForm.heightFeet.valid
                                    && this.state.insuredForm.heightFeet.touched}
                                className={classes.formControl}>
                                <InputLabel htmlFor="heightFt">Height*</InputLabel>
                                <Select
                                    value={this.state.insuredForm.heightFeet.value}
                                    onChange={this.handleChange('heightFeet')}
                                    inputProps={{
                                        name: 'heightFeet',
                                        id: 'heightFt',
                                    }}
                                    style={{ width: '127px' }}

                                >
                                    <MenuItem value={''}>Select feet</MenuItem>
                                    {this.state.feets.map((option) => (
                                        <MenuItem value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <p style={{ display: 'inline-block', marginTop: '1.4rem', marginLeft: '0.2rem', marginRight: '1rem' }}>ft</p>
                            {/* Height Inches*/}

                            <FormControl
                                className={classes.formControl}>
                                <InputLabel htmlFor="heightIn"></InputLabel>

                                <Select
                                    value={this.state.insuredForm.heightInches.value}
                                    onChange={this.handleChange('heightInches')}
                                    inputProps={{
                                        name: 'heightInches',
                                        id: 'heightIn',
                                    }}
                                    input={<Input name="heightIn" id="heightIn" />}
                                    style={{ width: '127px' }}

                                >
                                    <MenuItem value={''}>Select inches</MenuItem>

                                    {this.state.inches.map((option, index) =>
                                        <MenuItem key={index} value={`${option.value}`}>{option.label}</MenuItem>
                                    )}
                                </Select>

                            </FormControl>
                            <p style={{ display: 'inline-block', marginTop: '1.4rem', marginLeft: '0.2rem' }}>inch</p>
                            {(!insuredForm.heightFeet.valid && insuredForm.heightFeet.touched) && <p className="error">{insuredForm.heightFeet.message}</p>}
                            {(!insuredForm.heightInches.valid && insuredForm.heightInches.touched) && <p className="error">{insuredForm.heightInches.message}</p>}
                            {/* Weight*/}
                            <FormControl
                                error={!this.state.insuredForm.weight.valid
                                    && this.state.insuredForm.weight.touched}
                                className={classes.formControl} style={{ marginTop: '10px' }}>
                                <InputLabel shrink htmlFor="weightFt">Weight*</InputLabel>
                                <Select
                                    value={this.state.insuredForm.weight.value}
                                    onChange={this.handleChange('weight')}
                                    inputProps={{
                                        name: 'weight',
                                        id: 'weight',
                                    }}
                                    style={{ width: '287px' }}

                                >
                                    <MenuItem value={''}>{'Select Weight'}</MenuItem>
                                    {new Array(150).fill(0, 0).map((i, index) =>
                                        <MenuItem value={index + 1}>{index + 1}</MenuItem>
                                    )}
                                </Select>

                            </FormControl>
                            <p style={{ display: 'inline-block', marginTop: '1.4rem', marginLeft: '0.2rem' }}>kgs</p>
                            {(!this.state.insuredForm.weight.valid
                                    && this.state.insuredForm.weight.touched) && <p className="error">{insuredForm.weight.message}</p>}
                            {/* Nationality */}
                            <FormControl required
                                error={!this.state.insuredForm.nationality.valid
                                    && this.state.insuredForm.nationality.touched}
                                className={classes.formControl} fullWidth style={{ marginTop: '15px' }}>
                                <InputLabel htmlFor="nationality">Nationality</InputLabel>

                                <Select name="nationality"
                                    // value={this.state.proposerDetails.nationality}
                                    value={this.state.insuredForm.nationality.value}
                                    onChange={this.handleChange('nationality')}
                                    inputProps={{
                                        name: 'nationality',
                                        id: 'nationality',
                                    }}

                                >
                                    <MenuItem value={''}>{'Select Nationality'}</MenuItem>
                                    {this.state.nations.map((option) => (
                                        <MenuItem value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {(!this.state.insuredForm.nationality.valid
                                    && this.state.insuredForm.nationality.touched) && <p className="error">{insuredForm.nationality.value}</p>}
                            {/* pre existing diseas */}
                            {this.props.preExistingDisease && <FormControl
                                className={classes.formControl} fullWidth>
                                <InputLabel htmlFor="select-multiple">PreExistingDiseas</InputLabel>
                                <Select name="preExistingDisease"
                                    multiple
                                    input={<Input id="select-multiple" />}
                                    MenuProps={MenuProps}
                                    value={this.state.insuredForm.preExistingDisease.value}
                                    onChange={this.handleChange('preExistingDisease')}
                                    inputProps={{
                                        name: 'preExistingDisease',
                                        id: 'preExistingDisease',
                                    }}

                                >
                                    {Object.keys(this.props.preExistingDisease).map(key => { return <MenuItem key={key} value={this.props.preExistingDisease[key]}>{key}</MenuItem> }
                                    )}
                                </Select>
                            </FormControl>}
                            <FormControl margin="dense" fullWidth>
                                <TextField
                                    fullWidth
                                    value={this.state.insuredForm.address.value}
                                    onChange={this.handleChange('address')}
                                    error={!this.state.insuredForm.address.valid
                                        && this.state.insuredForm.address.touched}
                                    name="address"
                                    label="Address"
                                    inputProps={{ maxLength:150, autocomplete:"rutjfkde" }}
                                    margin="dense" />
                                    {(!this.state.insuredForm.address.valid
                                        && this.state.insuredForm.address.touched) && <p className="error">{insuredForm.address.errorMessage}</p>}
                            </FormControl>
                        </Col>
                    </Row>
                    {/* <hr style={{ margin: '1rem -15px' }} /> */}

                    <Row>

                    </Row>

                </form>
                {this.props.showSpouseFGMessage && <Dialog
                    fullScreen={fullScreen}
                    fullWidth={fullScreen}
                    open={this.props.showSpouseFGMessage}
                    // onClose={this.handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    {/* <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle> */}
                    <DialogContent>
                        {/* <DialogContentText>
                                You can set my maximum width and whether to adapt or not.
                            </DialogContentText> */}
                        <p className="gbui-h5"
                            style={{ textAlign: 'center' }}>
                            ALERT
                            {/* <img
                                src="/assets/cancel.svg"
                                alt="cancel"
                                style={{ float: 'right', cursor: 'pointer' }} /> */}
                        </p>
                        <div style={{ textAlign: 'center', }}>

                            <img src="/assets/decline-proposer.svg" alt="decline proposer" style={{ marginTop: '66px' }} />
                            <p className="gbui-button-1" style={{ marginTop: '50px' }}>
                                Sorry! As per insurer guidelines both self & spouse have to be covered for buying the policy.
                                Please add your spouse or try other plans.
                                </p>
                            <div style={{ marginTop: '68px' }}>
                                <Link to="/quote-listing-health">
                                    <Button className={classes.buttonN}>
                                        Try other plans
                                    </Button>
                                </Link>
                                <Button
                                    className={classes.buttonN}
                                    style={{marginLeft: '4px'}}
                                    onClick={() => {this.props.selfSpouseFGAlert(false);
                                     (window.innerWidth < 768)? document.getElementById("unique-edit-members-2nd").click():
                                     document.getElementById("unique-edit-members-1st").click();}}>
                                    Add Member
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                    </Dialog>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    proposalFormDataHealth: state.proposalFormHealth.proposalFormHealthData,
    activeTab: state.proposalFormHealth.insuredMemberTabValue,
    proposalFormHealthMemberData: state.proposalFormHealth.insuredMembersDetail.insuredMembersList,
    formMembers: state.inputFormHealth.inputFormHealthData.formMembers,
    formDetails: state.inputFormHealth.inputFormHealthData.familyDetails,
    currentPlan: state.currentPlan.details ? state.currentPlan.details : {},
    inputFormHealth: state.inputFormHealth.inputFormHealthData,
    showSpouseFGMessage: state.selfSpouseFGAValidation.selfSpouseFGAlert
})

const mapDispatchToProps = dispatch => ({
    setStep: step => dispatch({ type: 'SET_STEP_H', step }),
    loadProposalFormHealth: (data) => dispatch({ type: 'PROPOSAL_FORM_HEALTH', data }),
    selfSpouseFGAlert: (data) => dispatch({ type: 'SELF_SPOUSE_FG_ALERT', data }),
    insuredMemberTabValue: (value) => dispatch({ type: 'INSURED_MEMBER_TAB_VALUE', value }),
    ProposalFormHealthMember: (value) => dispatch({ type: 'PROPOSAL_FORM_HEALTH_MEMBER', value })
})

FormInsured.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired
};
export default withMobileDialog()(connect(mapStateToProps, mapDispatchToProps)((withStyles(styles)(FormInsured))))
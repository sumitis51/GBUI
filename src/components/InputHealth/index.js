import React from 'react'
import './input-health.css'
import SelectMembers from './Mobile/SelectMembers/index'
import AgeDetails from './Mobile/AgeDetails/index'
import Diseases from './Mobile/Diseases/index'
import PersonalDetails from './Mobile/PersonalDetails/index'
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import axios from 'axios';
import { connect } from 'react-redux'
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import NativeSelect from '@material-ui/core/NativeSelect';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => ({
    root: {
        display: 'flex',
    },
    margin: {
        marginTop: '1rem'
    },
    labelColor:{
    color:'#ea0b4b'
    },
    formControl: {
        margin: theme.spacing.unit,
        marginBottom: '0'
    },
    snakbarError:{
        backgroundColor:'#ea0b4b !important'
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
        marginBottom: '0'
    },
    radio: {
        marginRight: '1.5rem',
        marginLeft: '0rem'
    },
    label: {
        color: '#808080',
        fontFamily: 'Source Sans Pro',
        fontSize: '14px'
    },
    rootRadio: {
        color: '#ea0b4b',
        '&$checked': {
            color: '#ea0b4b',
        },
    },
    checkboxRoot: {
        color: '#000000',
        fontFamily:'Source Sans Pro',
        fontSize:'14px',
        '&$checked': {
            color: '#ea0b4b'
        },
    },
    typography:{
        color: '#000000',
        fontFamily:'Source Sans Pro',
        fontSize:'14px',
    },
    consentlabel: {
        fontFamily: 'Helvetica',
        fontSize: '10px',
        color: '#808080',
    },
    checkboxConcent: {
        '&$checked': {
            color: '#ea0b4b'
        },
    },
    checkedCheckbox: {
        color: '#ea0b4b',
        backgroundColor: '#ea0b4b'
    },
    checked: {},
    cssLabel: {
        color: '#aaaaaa',
        fontFamily: 'Source Sans Pro',
        fontSize: '14px',
        '&$cssFocused': {
            color: '#ea0b4b',
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
    cssUnderline: {
        '&:after': {
            borderBottomColor: '#ea0b4b',
        },
    },
    cssUnderlineN: {
        '&:after': {
            borderBottomColor: '#ea0b4b',
        },
    },
    button: {
        color: '#ea0b4b',
        background: '#ffffff',
        fontFamily:'Nunito',
        '&:hover': {
            backgroundColor: '#f6f6f6',
            border: '1px solid #ea0b4b'
        },
        border: '1px solid #ea0b4b',
        padding: '5px 29px',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    buttonLeftUnderlined: {
        color: '#ea0b4b',
        background: '#ffffff',
        fontFamily:'Nunito',
        '&:hover': {
            backgroundColor: '#f6f6f6',
            border: '1px solid #ea0b4b'
        },
        float:'right',
        border: '1px solid #ea0b4b',
        padding: '5px 29px',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    cssOutlinedInput: {
        color: '#000000',
        '&$cssFocused $notchedOutline': {
            borderWidth: "1px",
            borderColor: "red"
        },
      }, 
       notchedOutline: { 
           color: 'red',
           '&:after': {
            borderBottomColor: 'green',
          },
          '&$cssFocused': {
            color: 'green',
          },
      },
    buttonRootRight: {
        color: '#ffffff',
        backgroundColor: '#ea0b4b',
        fontFamily:'Nunito',
        '&:hover': {
            backgroundColor: '#ea0b4b',

        },
        float:'right',
        padding: '6px 29px',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    buttonRootLeft: {
        color: '#ffffff',
        backgroundColor: '#ea0b4b',
        fontFamily:'Nunito',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        float:'left',
        padding: '6px 32px',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    buttonRoot: {
        color: '#ffffff',
        backgroundColor: '#ea0b4b',
        fontFamily:'Nunito',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '6px 32px',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    buttonRootMob:{
        color: '#ffffff',
        backgroundColor: '#ea0b4b',
        fontFamily:'Nunito',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '6px 78px',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        textTransform:'capitalize'
    },
    buttonRootRightMobGetQuotes: {
        color: '#ffffff',
        backgroundColor: '#ea0b4b',
        fontFamily:'Nunito',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        float:'right',
        padding: '9px 18px',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    dialogRoot: {
        padding: '0px !important',
    },
    formControlTable: {
        marginBottom: theme.spacing.unit*0
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
        backgroundColor: '#ea0b4b',
        height: '2px'
    },
    bar2: {
        backgroundColor: '#808080',
        height: '2px'
    },
    paperScroll: {
        overflowX: 'hidden'
    },
    adornment: {
        fontSize: '18px',
        marginBottom: '2px'
    }
});

class InputHealth extends React.Component {
    state = {
        consent:false,
        valid : false,
        consentMob:false,
        active_step: 1,
        gender: '',
        open: false,
        openFull: false,
        son: false,
        noOfSon: 1,
        noOfDaughter: 1,
        spouse: false,
        self: false,
        daughter: false,
        mother: false,
        father: false,
        mother_in_law: false,
        father_in_law: false,
        income: '',
        pincode: '',
        parentsPincode: '',
        inLawsPincode: '',
        name: '',
        phone: '',
        formIsValid: false,
        personalDetailsForm: {
            income: {
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
                    isNumber: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            parentsPincode:{
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
            inLawsPincode:{
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
            //         isCharacter: true,
            //     },
            //     valid: false,
            //     touched: false
            // },
            firstName:{
                value: '',
                validation: {
                    required: true,
                    isCharacter: true,
                    minLength: 2
                },
                valid: false,
                touched: false
            },
            lastName:{
                value: '',
                validation: {
                    required: true,
                    isCharacter: true,
                    minLength: 2
                },
                valid: false,
                touched: false
            },
            phone: {
                value: '',
                validation: {
                    required: true,
                    isNumber: true,
                    isStartNumber: true,
                    minLength: 10,
                    maxLength: 10
                },
                valid: false,
                touched: false
            }
        },
        candidates: [
            "Self",
            "Spouse",
            "Son",
            "Daughter",
            "Father",
            "Mother",
            "Mother in law",
            "Father in law"
        ],
        tabContent: {
            padding: '0px 90px'
        },
        step_mob: 1,
        errorMessage: '',
        error: false,
        maxChildLimit: 8,
        formData: {
            familyDetails: [],
            income: '',
            gender: ''
        },
        incomeItems: [
            { key: 'Up to 3 lacs', value: 300000 },
            { key: '3 to 5 lacs', value: 500000 },
            { key: '5 to 7 lacs', value: 700000 },
            { key: '7 to 10 lacs', value: 1000000 },
            { key: '10 to 15 lacs', value: 1500000 },
            { key: '15 lacs+', value: 1500001 }
        ],
        ageItems: new Array(93).fill(0, 0),
        ageItemsChild:[
            { key: 0, value: 0, display: '<1 Month' },
            { key: 1, value: 0.08, display: '1 Month' },
            { key: 2, value: 0.16, display: '2 Months' },
            { key: 3, value: 0.25, display: '3 Months' },
            { key: 4, value: 0.33, display: '4 Months' },
            { key: 5, value: 0.41, display: '5 Months' },
            { key: 6, value: 0.5, display: '6 Months' },
            { key: 7, value: 0.58, display: '7 Months' },
            { key: 8, value: 0.66, display: '8 Months' },
            { key: 9, value: 0.75, display: '9 Months' },
            { key: 10, value: 0.83, display: '10 Months' },
            { key: 11, value: 0.91, display: '11 Months' },
            { key: 13, value: 1, display: '1 Year' },
            { key: 14, value: 2, display: '2 Years' },
            { key: 15, value: 3, display: '3 Years' },
            { key: 16, value: 4, display: '4 Years' },
            { key: 17, value: 5, display: '5 Years' },
            { key: 18, value: 6, display: '6 Years' },
            { key: 19, value: 7, display: '7 Years' },
            { key: 20, value: 8, display: '8 Years' },
            { key: 21, value: 9, display: '9 Years' },
            { key: 22, value: 10, display: '10 Years' },
            { key: 23, value: 11, display: '11 Years' },
            { key: 24, value: 12, display: '12 Years' },
            { key: 25, value: 13, display: '13 Years' },
            { key: 26, value: 14, display: '14 Years' },
            { key: 27, value: 15, display: '15 Years' },
            { key: 28, value: 16, display: '16 Years' },
            { key: 29, value: 17, display: '17 Years' },
            { key: 30, value: 18, display: '18 Years' },
            { key: 31, value: 19, display: '19 Years' },
            { key: 32, value: 20, display: '20 Years' },
            { key: 32, value: 21, display: '21 Years' },
            { key: 33, value: 22, display: '22 Years' },
            { key: 34, value: 23, display: '23 Years' },
            { key: 35, value: 24, display: '24 Years' },
        ],
       
        windowWidth: window.innerWidth,
        diseaseValue: [
            {
                id: 0,
                value: 'DBTS',
            },
            {
                id: 1,
                value: 'TNSN',
            },
            {
                id: 2,
                value: 'LPDM',
            },
            {
                id: 3,
                value: 'ASTM',
            },
            {
                id: 4,
                value: 'NCRN',
            },
        ],
        ErrorMessage: false,
       ageErrorMessage:false,
       isAgeValid: false

    };

    componentWillMount() {
        // console.log(this.props,'props')
        if (this.props) {
            this.setState({
                gender:this.props.gender
            })
            if(this.props.step){
                this.setState({
                    open: this.props.inputFormOpen,
                    active_step: this.props.step,
                    self:this.props.member,
                    step_mob:this.props.step
                })
                this.createFamilyDetailsFromHomepage()

            } else {
                this.setState({
                    open: this.props.inputFormOpen,
            })}
        }
    }
    handleClickOpen = () => {
        this.setState({ open: true, active_step: 1, tabContent: { padding: '0px 90px' } });
        setTimeout(() => {
            document.getElementsByTagName("BODY")[0].style.paddingRight = "0";
        }, 0);
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ ErrorMessage: false });
    };
    handleClickOpenFull = () => {
        this.setState({ openFull: true, step_mob: 1 });
        // setTimeout(() => {
        //     document.getElementsByTagName("BODY")[0].style.paddingRight = "0";
        // }, 0);
    };

    // To close dialog on desktop width
    handleClose = () => {
        this.props.inputFormOpen(false)
    };

    // To clos Dialog on mobile width
    handleCloseFull = () => {
        this.props.inputFormOpenMobile(false)
        this.setState({step_mob: 1 });
    };

    // Handle Checkbox input
    handleChange = name => event => {
        if(name == "son") {
            if(event.target.checked === true){
            this.setState({noOfSon:1})
         } else {
            this.setState({noOfSon:null})
         }       
        }
        if(name == "daughter") {
            if(event.target.checked === true){
            this.setState({noOfDaughter:1})
         } else {
            this.setState({noOfDaughter:null})
         }       
        }
        this.setState({ [name]: event.target.checked })
    };
    // Create Family Details from Homepage

    createFamilyDetailsFromHomepage = () => {
        const vm = this;
        let familyDetails = [];
        const dss = this.state.diseaseValue;
        // Go for self
        let age = '';
        let diseases = [];
        vm.state.formData.familyDetails.map((item, index) => {
            if (item.member === 'self') {
                age = item.age
                diseases = item.diseases
            }
            return true
        })

        if (diseases.length < 1) {
            new Array(5).fill(0, 0).map((i, index) => {
                return diseases.push({ name: dss[index].value, value: false })
            })
        }
        familyDetails.push({
            member: 'self',
            age: age,
            diseases: diseases,
            label: 'Self',
            memberCode: 'S'
        })
        let formData = this.state.formData
        formData.familyDetails = familyDetails
        this.setState({ formData: formData })
    }

    // Create Family Details based on step 1

    createFamilyDetails = () => {
        const vm = this;
        let familyDetails = [];
        const dss = this.state.diseaseValue;
        if (this.state.self) {
            // Go for self
            let age = 18;
            let diseases = [];
            vm.state.formData.familyDetails.map((item, index) => {
                if (item.member === 'self') {
                    age = item.age
                    diseases = item.diseases
                }
                return true
            })

            if (diseases.length < 1) {
                new Array(5).fill(0, 0).map((i, index) => {
                    return diseases.push({ name: dss[index].value, value: false })
                })
            }
            familyDetails.push({
                member: 'self',
                age: age,
                diseases: diseases,
                label: 'Self',
                memberCode: 'S'
            })
        }
        if (this.state.spouse) {
            // Go fo spouse
            let age = 18;
            let diseases = [];
            vm.state.formData.familyDetails.map((item) => {
                if (item.member === 'spouse') {
                    age = item.age
                    diseases = item.diseases
                }
                return true
            })
            if (diseases.length < 1) {
                new Array(5).fill(0, 0).map((i, index) => {
                    return diseases.push({ name: dss[index].value, value: false })
                })
            }
            familyDetails.push({
                member: 'spouse',
                age: age,
                diseases: diseases,
                label: 'Spouse',
                memberCode: 'SP'
            })
        }
        if (this.state.son) {
            // Go for son
            new Array(this.state.noOfSon).fill(0, 0).map((i, index) => {
                let age = 0.08;
                let diseases = [];
                vm.state.formData.familyDetails.map((item) => {
                    if (item.member === `son-${index + 1}`) {
                        age = item.age
                        diseases = item.diseases
                    }
                    return true
                })

                if (diseases.length < 1) {
                    new Array(5).fill(0, 0).map((i, index) => {
                        return diseases.push({ name: dss[index].value, value: false })
                    })
                }
                familyDetails.push({
                    member: `son-${index + 1}`,
                    age: age,
                    diseases: diseases,
                    label: `Son ${index + 1}`,
                    memberCode: 'SN'
                })
                return true
            })
        }
        if (this.state.daughter) {
            // Go for daughter
            new Array(this.state.noOfDaughter).fill(0, 0).map((i, index) => {
                let age = 0.08;
                let diseases = [];
                vm.state.formData.familyDetails.map((item) => {
                    if (item.member === `daughter-${index + 1}`) {
                        age = item.age
                        diseases = item.diseases
                    }
                    return true
                })

                if (diseases.length < 1) {
                    new Array(5).fill(0, 0).map((i, index) => {
                        return diseases.push({ name: dss[index].value, value: false })
                    })
                }
                familyDetails.push({
                    member: `daughter-${index + 1}`,
                    age: age,
                    diseases: diseases,
                    label: `Daughter ${index + 1}`,
                    memberCode: 'DG'
                })
                return true
            })
        }
        if (this.state.father) {
            // Go for father
            let age = 36;
            let diseases = [];
            vm.state.formData.familyDetails.map((item) => {
                if (item.member === 'father') {
                    age = item.age
                    diseases = item.diseases
                }
                return true
            })
            if (diseases.length < 1) {
                new Array(5).fill(0, 0).map((i, index) => {
                    return diseases.push({ name: dss[index].value, value: false })
                })
            }
            familyDetails.push({
                member: 'father',
                age: age,
                diseases: diseases,
                label: 'Father',
                memberCode: 'FT'
            })
        }

        if (this.state.mother) {
            // Go fo mother
            let age = 36;
            let diseases = [];
            vm.state.formData.familyDetails.map((item) => {
                if (item.member === 'mother') {
                    age = item.age
                    diseases = item.diseases
                }
                return true
            })

            if (diseases.length < 1) {
                new Array(5).fill(0, 0).map((i, index) => {
                    return diseases.push({ name: dss[index].value, value: false })
                })
            }
            familyDetails.push({
                member: 'mother',
                age: age,
                diseases: diseases,
                label: 'Mother',
                memberCode: 'MT'
            })
        }

        if (this.state.father_in_law) {
            // Go for father in law
            let age = 36;
            let diseases = [];
            vm.state.formData.familyDetails.map((item) => {
                if (item.member === 'father_in_law') {
                    age = item.age
                    diseases = item.diseases
                }
                return true
            })
            if (diseases.length < 1) {
                new Array(5).fill(0, 0).map((i, index) => {
                    return diseases.push({ name: dss[index].value, value: false })
                })
            }
            familyDetails.push({
                member: 'father_in_law',
                age: age,
                diseases: diseases,
                label: 'Father in law',
                memberCode: 'FTL'
            })
        }
        if (this.state.mother_in_law) {
            // Go for mother in law
            let age = 36;
            let diseases = [];
            vm.state.formData.familyDetails.map((item) => {
                if (item.member === 'mother_in_law') {
                    age = item.age
                    diseases = item.diseases
                }
                return true
            })

            if (diseases.length < 1) {
                new Array(5).fill(0, 0).map((i, index) => {
                    return diseases.push({ name: dss[index].value, value: false })
                })
            }
            familyDetails.push({
                member: 'mother_in_law',
                age: age,
                diseases: diseases,
                label: 'Mother in law',
                memberCode: 'MTL'
            })
        }

        let formData = this.state.formData
        formData.familyDetails = familyDetails
        this.setState({ formData: formData })
    }

    // Create Family Details on mobile view directly handling redux values
    createFamilyDetailsMob = () => {
        const vm = this;
        let familyDetails = [];
        const dss = this.state.diseaseValue;
        const { self, spouse, daughter, son, noOfSon, noOfDaughter, mother, father, mother_in_law, father_in_law } = this.props.inputFormDataHealth.formMembers
        if (self) {
            // Go for self
            let age = 18;
            let diseases = [];
            vm.props.inputFormDataHealth.familyDetails.map((item, index) => {
                if (item.member === 'self') {
                    age = item.age
                    diseases = item.diseases

                }
                return true
            })

            if (diseases.length < 1) {
                new Array(5).fill(0, 0).map((i, index) => {

                    return diseases.push({ name: dss[index].value, value: false })
                })
            }
            familyDetails.push({
                member: 'self',
                age: age,
                diseases: diseases,
                label: 'Self',
                memberCode: 'S'
            })
        }

        if (spouse) {
            // Go fo spouse
            let age = 18;
            let diseases = [];
            vm.props.inputFormDataHealth.familyDetails.map((item) => {
                if (item.member === 'spouse') {
                    age = item.age
                    diseases = item.diseases
                }
                return true
            })
            if (diseases.length < 1) {
                new Array(5).fill(0, 0).map((i, index) => {
                    return diseases.push({ name: dss[index].value, value: false })
                })
            }
            familyDetails.push({
                member: 'spouse',
                age: age,
                diseases: diseases,
                label: 'Spouse',
                memberCode: 'SP'
            })
        }
        if (son) {
            // Go for son
            new Array(noOfSon).fill(0, 0).map((i, index) => {
                let age = 0.08;
                let diseases = [];
                this.props.inputFormDataHealth.familyDetails.map((item) => {
                    if (item.member === `son-${index + 1}`) {
                        age = item.age
                        diseases = item.diseases
                    }
                    return true
                })

                if (diseases.length < 1) {
                    new Array(5).fill(0, 0).map((i, index) => {
                        return diseases.push({ name: dss[index].value, value: false })
                    })
                }
                familyDetails.push({
                    member: `son-${index + 1}`,
                    age: age,
                    diseases: diseases,
                    label: `Son ${index + 1}`,
                    memberCode: 'SN'
                })
                return true
            })
        }
        if (daughter) {
            // Go for daughter
            new Array(noOfDaughter).fill(0, 0).map((i, index) => {
                let age = 0.08;
                let diseases = [];
                vm.props.inputFormDataHealth.familyDetails.map((item) => {
                    if (item.member === `daughter-${index + 1}`) {
                        age = item.age
                        diseases = item.diseases
                    }
                    return true
                })

                if (diseases.length < 1) {
                    new Array(5).fill(0, 0).map((i, index) => {
                        return diseases.push({ name: dss[index].value, value: false })
                    })
                }
                familyDetails.push({
                    member: `daughter-${index + 1}`,
                    age: age,
                    diseases: diseases,
                    label: `Daughter ${index + 1}`,
                    memberCode: 'DG'
                })
                return true
            })
        }


        if (father) {
            // Go for father
            let age = 36;
            let diseases = [];
            vm.props.inputFormDataHealth.familyDetails.map((item) => {
                if (item.member === 'father') {
                    age = item.age
                    diseases = item.diseases
                }
                return true
            })
            if (diseases.length < 1) {
                new Array(5).fill(0, 0).map((i, index) => {
                    return diseases.push({ name: dss[index].value, value: false })
                })
            }
            familyDetails.push({
                member: 'father',
                age: age,
                diseases: diseases,
                label: 'Father',
                memberCode: 'FT'
            })
        }
        if (mother) {
            // Go fo mother
            let age = 36;
            let diseases = [];
            vm.props.inputFormDataHealth.familyDetails.map((item) => {
                if (item.member === 'mother') {
                    age = item.age
                    diseases = item.diseases
                }
                return true
            })

            if (diseases.length < 1) {
                new Array(5).fill(0, 0).map((i, index) => {
                    return diseases.push({ name: dss[index].value, value: false })
                })
            }
            familyDetails.push({
                member: 'mother',
                age: age,
                diseases: diseases,
                label: 'Mother',
                memberCode: 'MT'
            })
        }

        if (father_in_law) {
            // Go for father in law
            let age = 36;
            let diseases = [];
            vm.props.inputFormDataHealth.familyDetails.map((item) => {
                if (item.member === 'father_in_law') {
                    age = item.age
                    diseases = item.diseases
                }
                return true
            })
            if (diseases.length < 1) {
                new Array(5).fill(0, 0).map((i, index) => {
                    return diseases.push({ name: dss[index].value, value: false })
                })
            }
            familyDetails.push({
                member: 'father_in_law',
                age: age,
                diseases: diseases,
                label: 'Father in law',
                memberCode: 'FTL'
            })
        }
        if (mother_in_law) {
            // Go for mother in law
            let age = 36;
            let diseases = [];
            vm.props.inputFormDataHealth.familyDetails.map((item) => {
                if (item.member === 'mother_in_law') {
                    age = item.age
                    diseases = item.diseases
                }
                return true
            })

            if (diseases.length < 1) {
                new Array(5).fill(0, 0).map((i, index) => {
                    return diseases.push({ name: dss[index].value, value: false })
                })
            }
            familyDetails.push({
                member: 'mother_in_law',
                age: age,
                diseases: diseases,
                label: 'Mother in law',
                memberCode: 'MTL'
            })
        }
        let formData = this.props.inputFormDataHealth
        formData.familyDetails = familyDetails
        this.props.loadInputFormHealth(formData)

        // Here change step to next
        if (this.checkValidityMob(this.state.step_mob)) { this.setState({ step_mob: 2, tabContent: { padding: '0px 90px' } }) }
    }
    // Check validity mobile view
    checkValidityMob = (step) => {

        if (step === 1) {
            const { son, spouse, mother, self, daughter, father, mother_in_law, father_in_law, noOfSon, noOfDaughter } = this.props.inputFormDataHealth.formMembers
            const dis = self ||
                spouse ||
                (son && noOfSon > 0) ||
                (daughter && noOfDaughter > 0) ||
                mother ||
                father ||
                father_in_law ||
                mother_in_law
            return dis
        } else if (step === 2) {
            // check for age of all
            let flag = false;
            this.props.inputFormDataHealth.familyDetails.map(item => {
                flag = item.age === '' ? true : false
                return true
            })
            return flag
        }
        return false
    }

    // Get Pincode using Geocode...
    getLocation = () => {
        const vm = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${'AIzaSyDzn5koL2GVQnaNLiVRwZdtkheMMmqIIqA'}`)
                    .then(resp => {
                        const results = resp.data.results

                        const pinString = results[0].formatted_address.split(',')[results[0].formatted_address.split(',').length - 2].trim().split(' ')
                        const {personalDetailsForm} = this.state
                        personalDetailsForm.selfPincode.value = pinString[pinString.length - 1]
                        personalDetailsForm.selfPincode.valid = true
                        personalDetailsForm.selfPincode.touched = true
                        vm.setState({ personalDetailsForm })
                        // vm.setState({ pincode: pinString[pinString.length - 1] })

                    }).catch(error => {
                        console.error(error)
                    })
            })
        } else {
            alert("Geolocation is not supported by this browser.")
        }
        return true
    }


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
            console.log(updatedPersonalDetailsForm[name], name, formIsValid)
        }
        // console.log('formIsValid1', formIsValid)
        this.setState({ personalDetailsForm: updatedPersonalDetailsForm, formIsValid: formIsValid});
    };

    checkValidityFields = (value, rules) => {
        let isValid = true;
        if (rules.isStartNumber) {
            isValid = value.trim().match(/^[6789]\d{9}$/) && isValid
        }
        if (rules.required && rules.isCharacter) {
             isValid = /*value.trim().split(" ").length > 1 && */value.trim().match(/^[a-zA-Z ]+$/) && isValid
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


    // Handle othe input fields
    handleInput = event => {
        const vm = this;
        this.setState({ [event.target.name]: event.target.value })
        return true
        // else if (event.target.name === 'gender') {
        //     this.setState({
        //         gender: event.target.value
        //     })
        //     let genderData = { 
        //         'gender':event.target.value
        //     }
        //     this.props.loadInputFormHealth(genderData)
        // }
    }

    // Handle Age
    handleAge = (event, memberCode) => {
        let formData = this.state.formData;
        // formData.familyDetails[event.target.name] = event.target.value
          
        const validChildAge = () => {
            // const parentsList = formData.familyDetails.filter(m => m.memberCode === 'S' || m.memberCode === 'SP' || m.memberCode === 'FT' || m.memberCode === 'MT');
            const parentsList = formData.familyDetails.filter(m => m.memberCode === 'S' || m.memberCode === 'SP');
            const getMaxParentAge = () => {
                return Math.min(...parentsList.map(m => m.age))
            }
            // debugger;
            if (parentsList.length == 0 || getMaxParentAge() -18 >= event.target.value) {
                this.setState({ ageErrorMessage: false })
                return true
            }
            this.setState({ ageErrorMessage: true })
            setTimeout(() => {
                this.setState({ ageErrorMessage: false })
            }, 2000)
            return ;
            
        }
      if((memberCode === 'DG' || memberCode === 'SN') &&  !validChildAge()){
           return
       }
      if((memberCode === 'S' || memberCode === 'SP')){
           const ageL = formData.familyDetails.filter(item => item.age && (item.memberCode === 'DG' || item.memberCode === 'SN')).length
        //    debugger;
           if(ageL > 0) {
                const parentsList = formData.familyDetails.filter(m => m.memberCode === 'S' || m.memberCode === 'SP');
                const getMaxParentAge = () => {
                    return Math.min(...parentsList.map(m => m.age))
                }
                let valid = true
                if(parentsList.length === 0)
                    // Do nothing
                    this.setState({ ageErrorMessage: false })
                else {
                    formData.familyDetails.map(item => {
                        if((item.memberCode === 'SN' || item.memberCode === 'DG') && item.age) {
                            valid = event.target.value - 18 >= item.age && valid
                        }
                    })
                    if(!valid) {
                        this.setState({ ageErrorMessage: true })
                        setTimeout(() => {
                            this.setState({ ageErrorMessage: false })
                        }, 2000)
                        return valid
                    }
                        
                }
           }
           
        
    }

       const validateParentAge=()=>{
        const parentsAgeList = formData.familyDetails.filter(m => m.memberCode === 'S' || m.memberCode === 'SP');
        const getMaxParentAgeList = () => {
            return Math.min(...parentsAgeList.map(m => m.age))
        }
        if(parentsAgeList.length == 0 || getMaxParentAgeList()+18<= event.target.value){
            this.setState({ ageErrorMessage: false })
            return true
        }
        return this.setState({ ageErrorMessage: true })
        }

        if(memberCode =='MT'  && !validateParentAge()){
            return
        }
       
       if(memberCode =='FT'  && !validateParentAge()){
           return
       }
       if(memberCode =='FTL'  && !validateParentAge()){
        return
        }
        if(memberCode =='MTL'  && !validateParentAge()){
            return
            }
      formData.familyDetails.map((item, index) => {
            if (item.member === event.target.name)
          
         { 
     formData.familyDetails[index].age = event.target.value
        return true
         }
        })  
        
        let isValid = true;
        formData.familyDetails.map((item,index) => {
            isValid = isValid && item.age !== ""
        })
        this.setState({ formData: formData,  isAgeValid: isValid})
        return true
    }
    validateAge() {
        let formData = this.state.formData;
        let isValid = true;
        formData.familyDetails.map((item,index) => {
            isValid = isValid && item.age !== ""
        })
        this.setState({ isAgeValid: isValid})
    }
    // Handle Diseases
    handleDiseases = itemName => event => {
        let formData = this.state.formData
        // formData.familyDetails[event.target.name] = event.target.checked
        formData.familyDetails.map((item, index) => {
            if (item.member === itemName) {
                item.diseases.map((dis, ind) => {
                    if (dis.name === event.target.name) {
                        formData.familyDetails[index].diseases[ind].value = event.target.checked
                        const filteredDesease = formData.familyDetails.filter((familyMember) =>{
                            const familyMembers =  familyMember.diseases.filter((item) =>{
                                return item.value === true;
                            }).length
                            return familyMembers
                        })
                        if(filteredDesease.length > 0){
                            this.setState({
                                nextButtonBig:true
                            })
                        }else{
                            this.setState({
                                nextButtonBig:false
                            })
                        }
                    }
                    return true
                })
            }
            return true
        })
        this.setState({ formData: formData })
        // console.log(this.props.inputFormDataHealth.familyDetails)
        return true
    }

    // handleClose=()=>{
    //     open=false
    // }
    // Check Validity for steps

    checkValidity = step => {
        const vm = this;
        if (step === 1) {
            const { son, spouse, mother, self, daughter, father, mother_in_law, father_in_law, noOfSon, noOfDaughter } = this.state;
            
            return self ||
                spouse ||
                (son && noOfSon > 0 ) ||
                (daughter && noOfDaughter > 0 ) ||
                mother ||
                father ||
                father_in_law ||
                mother_in_law

        } else if (step === 2) {
            // check for age of all
            let flag = false;
            vm.state.formData.familyDetails.map(item => {
                flag = (item.age === '' ? true : false) && flag
                return true
            })
            return flag
        }
        return false
    }



    // To handle padding when dialog box opens up
    handlePadding() {
        this.state.active_step === 4 ? this.setState({
            tabContent: {
                padding: '0px'
            }
        }) : this.setState({
            tabContent: {
                padding: '0px 90px'
            }
        })
    }

    // Handle Submit of get quotes

    handleSubmit = () => {
        this.props.selfSpouseFGAlert(false)
        const vm = this;
        const obj = vm.state.formData;

        obj.income = vm.state.personalDetailsForm.income.value;
        obj.selfPincode = vm.state.personalDetailsForm.selfPincode.value;
           if(vm.state.personalDetailsForm.parentPincode){
            obj.parentPincode = vm.state.personalDetailsForm.parentPincode.value;
         }
         if(vm.state.personalDetailsForm.inLawPincode){
            obj.inLawPincode = vm.state.personalDetailsForm.inLawPincode.value;
         }
        // obj.name = vm.state.personalDetailsForm.name.value;
        obj.firstName = vm.state.personalDetailsForm.firstName.value;
        obj.lastName = vm.state.personalDetailsForm.lastName.value;
        obj.phone = vm.state.personalDetailsForm.phone.value;
        obj.gender = vm.props.gender;
        // console.log(obj.gender,vm.state.gender)
        obj.formMembers = {
            son: this.state.son,
            daughter: this.state.daughter,
            noOfSon: this.state.noOfSon,
            noOfDaughter: this.state.noOfDaughter,
            mother: this.state.mother,
            father: this.state.father,
            mother_in_law: this.state.mother_in_law,
            father_in_law: this.state.father_in_law,
            self: this.state.self,
            spouse: this.state.spouse
        }

        // Set Redux State of Input Form Health details
        vm.props.loadInputFormHealth(obj)

        // Set Input Form Data to localStorage
        localStorage.setItem("inputForm", JSON.stringify(obj));

        this.handleClose();
        
        if(window.location.pathname === '/quote-listing-health'){
            if(this.props.getQuotes !== undefined){
                this.props.getQuotes();
            }
            console.log(window.location.pathname,'window.location.pathname')
        }else {
            this.props.history.push({pathname:'/quote-listing-health',state:{previousPath:window.location.pathname}})
        }
    }

    handleSubmitMob = () => {
        // this.setState({ step_mob: 4 })

        // Save input From Data to localStorage
        localStorage.setItem("inputForm", JSON.stringify(this.props.inputFormDataHealth))
        this.props.inputFormOpenMobile(false)        
        if(window.location.pathname === '/quote-listing-health'){
            if(this.props.getQuotes !== undefined){
                this.props.getQuotes();
            }
            console.log(window.location.pathname,'window.location.pathname')
        }else {
            this.props.history.push('/quote-listing-health')
        }
    }

    componentDidMount() {
        this.perfomrOnMount()
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.open !== this.props.open && this.props.headerPanels) {
            
            if(!prevProps.open) {
                this.perfomrOnMount()
            }
            // alert('hhhhh')
        }
        // alert(nextProps)
    }
    perfomrOnMount() {
       
        if (this.props && this.props.step && this.props.inputFormDataHealth) {
           
            // Set state based on redux state
            // this.props.inputFormDataHealth.familyDetails.map()
            if (window.innerWidth > 768) {
                const {personalDetailsForm}  = this.state
                const inputFormData = this.props.inputFormDataHealth
                // Income
                personalDetailsForm.income.value = inputFormData.income
                personalDetailsForm.income.valid = true
                personalDetailsForm.income.touched = true
                // Self Pincode
                personalDetailsForm.selfPincode.value = inputFormData.selfPincode
                personalDetailsForm.selfPincode.valid = true
                personalDetailsForm.selfPincode.touched = true
                // Parents Pincode 
                personalDetailsForm.parentsPincode.value = inputFormData.parentPincode
                personalDetailsForm.parentsPincode.valid = true
                personalDetailsForm.parentsPincode.touched = true
                // In Laws pincode
                personalDetailsForm.inLawsPincode.value = inputFormData.inLawPincode
                personalDetailsForm.inLawsPincode.valid = true
                personalDetailsForm.inLawsPincode.touched = true
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
                    son: this.props.inputFormDataHealth.formMembers.son,
                    noOfSon: this.props.inputFormDataHealth.formMembers.noOfSon,
                    noOfDaughter: this.props.inputFormDataHealth.formMembers.noOfDaughter,
                    daughter: this.props.inputFormDataHealth.formMembers.daughter,
                    self: this.props.inputFormDataHealth.formMembers.self,
                    spouse: this.props.inputFormDataHealth.formMembers.spouse,
                    mother: this.props.inputFormDataHealth.formMembers.mother,
                    father: this.props.inputFormDataHealth.formMembers.father,
                    mother_in_law: this.props.inputFormDataHealth.formMembers.mother_in_law,
                    father_in_law: this.props.inputFormDataHealth.formMembers.father_in_law,
                    income: this.props.inputFormDataHealth.income,
                    selfPincode: this.props.inputFormDataHealth.selfPincode,
                    parentsPincode: this.props.inputFormDataHealth.parentPincode,
                    inLawsPincode: this.props.inputFormDataHealth.inLawPincode,
                    firstName: this.props.inputFormDataHealth.firstName,
                    lastName: this.props.inputFormDataHealth.lastName,
                    phone: this.props.inputFormDataHealth.phone,
                    formData: { familyDetails: JSON.parse(localStorage.getItem("inputForm")).familyDetails },
                    active_step: this.props.location ? this.props.location.state.step : this.props.step,
                    open: true,
                    personalDetailsForm,
                    gender: this.props.gender,
                    formIsValid: true
                    // tabContent: { padding: this.props.location.state.step < 4 ? '0px 90px' : '0px' }
                })

                setTimeout(() => {
                    document.getElementsByTagName("BODY")[0].style.paddingRight = "0";
                }, 0);
            } else {
                // here for mobile view
                this.setState({ openFull: true, step_mob: this.props.location ? this.props.location.state.activeStep:this.props.step });
            }
            this.validateAge()

        }
    }
   
    
    render() {
        const { classes } = this.props;
       
        const { son, spouse, mother, self, daughter, father, mother_in_law, father_in_law } = this.state;
        let myArray = this.state.formData.familyDetails;
        let arrayPassed = false;
if(myArray.length > 0 ) {
        for (var i = 0; i < myArray.length; i++) {
          if (myArray[i].age) {
            arrayPassed = false;
          } else {
            arrayPassed = true;
          }
        }
    }
       let ageValid = arrayPassed;
        return (
            <div className="input-form-health-parent-div">

                {/* Dialog code for desktop version */}
                <div className="mui--hidden-xs mui--hidden-sm">

                    <Dialog
                        open={this.props.open}
                        TransitionComponent={Transition}
                        keepMounted
                        scroll="paper"
                        // onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        maxWidth="false"
                    >
                        <DialogContent classes={{
                            root: classes.dialogRoot
                        }}>
                            <DialogContentText id="alert-dialog-slide-description">
                                {/* here code for tabs */}

                                <div className="dialog-tabs-input-form-health-div">
                                    <div className='close-model-icon'>
                                        <i onClick={this.handleClose} class="material-icons" style={{  float: 'right', cursor: 'pointer' }}>
                                            close
                                        </i>
                                    </div>
                                    <ul>
                                        <li className={this.state.active_step >= 1 ? `health-li-active  ${this.state.active_step>1?"arrow-right": ""}` : ""}>
                                            Select Members &nbsp;
                                        {/* {this.state.active_step > 1 &&
                                                <span
                                                    style={{ fontSize: '10px', color: '#ea0b4b', cursor: 'pointer' }}
                                                    onClick={() => { this.setState({ active_step: 1 }) }}
                                                >Edit</span>
                                            } */}
                                        </li>
                                        <li className={this.state.active_step >= 2 ? `health-li-active  ${this.state.active_step>2?"arrow-right": ""}` : ""}>
                                            Age of Members
                                        {/* {this.state.active_step > 2 &&
                                                <span
                                                    style={{ fontSize: '10px', color: '#ea0b4b', cursor: 'pointer' }}
                                                    onClick={() => { this.setState({ active_step: 2 }) }}
                                                >Edit</span>
                                            } */}
                                        </li>
                                        <li className={this.state.active_step >= 3 ?`health-li-active  ${this.state.active_step>3?"arrow-right": ""}` : ""}>
                                            Medical Details
                                        {/* {this.state.active_step > 3 &&
                                                <span
                                                    style={{ fontSize: '10px', color: '#ea0b4b', cursor: 'pointer' }}
                                                    onClick={() => { this.setState({ active_step: 3 }) }}
                                                >Edit</span>
                                            } */}
                                        </li>
                                        <li className={this.state.active_step >= 4 ? `health-li-active  ${this.state.active_step>4?"arrow-right": ""}` : ""}>Personal Details</li>
                                    </ul>
                                </div>

                                {/* Contetn for tab */}
                                <div className="tab-content-div" style={this.state.tabContent}>

                                    {this.state.active_step === 1 &&
                                        <div id="tab-1">
                                            <h3 className="tab-1-input-form-health-text">Select Family Members you want to cover</h3>
                                            {/* <p className="tab-1-input-form-sub-heading-line">Select those people for whom you want to do insurance</p> */}
                                            {/* Here are checkboxex */}
                                            <FormControl component="fieldset" className={classes.formControl}>
                                                <FormGroup>
                                                    <tr>
                                                        <td>

                                                            <FormControlLabel
                                                                classes={{
                                                                    label:classes.typography
                                                                }}
                                                                control={
                                                                    <Checkbox
                                                                        checked={self}
                                                                        onChange={this.handleChange('self')}
                                                                        value="S"
                                                                        classes={{
                                                                            root: classes.checkboxRoot,
                                                                            checked: classes.checked,
                                                                        }} />
                                                                }
                                                                label="Self"
                                                            />
                                                        </td>
                                                    </tr>
                                                    <FormControlLabel
                                                        classes={{
                                                            label:classes.typography
                                                        }}
                                                        control={
                                                            <Checkbox
                                                                checked={spouse}
                                                                onChange={this.handleChange('spouse')}
                                                                value="SP"
                                                                classes={{
                                                                    root: classes.checkboxRoot,
                                                                    checked: classes.checked
                                                                }} />
                                                        }
                                                        label="Spouse"
                                                    />
                                                    <tr>
                                                        <td>

                                                            <FormControlLabel
                                                                classes={{
                                                                    label:classes.typography
                                                                }}
                                                                control={
                                                                    <Checkbox
                                                                        checked={son}
                                                                        disabled={this.state.noOfDaughter > 3}
                                                                        onChange={this.handleChange('son')}
                                                                        value="SN"
                                                                        classes={{
                                                                            root: classes.checkboxRoot,
                                                                            checked: classes.checked
                                                                        }} />
                                                                }
                                                                label="Son"
                                                            />
                                                        </td>
                                                        {this.state.son &&
                                                            <td>
                                                                <button
                                                                    style={
                                                                        {
                                                                            background: '#fff',
                                                                            borderColor: '#333',
                                                                            color: '#333',
                                                                            marginLeft: '5rem'
                                                                        }}
                                                                    onClick={() => {
                                                                        let { noOfSon, noOfDaughter } = this.state;
                                                                        if (noOfSon > 1)
                                                                            noOfSon === 1 ? this.setState({ noOfSon: --noOfSon, son: false }) : this.setState({ noOfSon: --noOfSon })
                                                                        else
                                                                            this.setState({ son: false,noOfSon:1 })
                                                                    }}
                                                                    disabled={!this.state.noOfSon > 0}>&ndash;</button>
                                                                <input
                                                                    style={
                                                                        {
                                                                            background: '#fff',
                                                                            borderColor: '#333',
                                                                            color: '#333',
                                                                            width: '25px',
                                                                            borderLeft: 'none',
                                                                            borderRight: 'none',
                                                                            textAlign: 'center'
                                                                        }}
                                                                    value={this.state.noOfSon}
                                                                    disabled={false}
                                                                    name="noOfSon"
                                                                    onChange={(event) => {
                                                                        let noOfSon = event.target.value;
                                                                        if (noOfSon > 0 && noOfSon <= this.state.maxChildLimit)
                                                                            this.setState({ noOfSon: event.target.value })
                                                                        else if (noOfSon > this.state.maxChildLimit)
                                                                            this.setState({ noOfSon: this.state.noOfSon })
                                                                        else
                                                                            this.setState({ son: false, noOfSon: null })
                                                                    }} />
                                                                <button
                                                                    style={
                                                                        {
                                                                            background: '#fff',
                                                                            borderColor: '#333',
                                                                            color: '#333'
                                                                        }}
                                                                    onClick={() => {
                                                                        let { noOfSon, noOfDaughter, daughter } = this.state;
                                                                        if(daughter) {
                                                                            if ((noOfSon + noOfDaughter) < 4)
                                                                            this.setState({ noOfSon: ++noOfSon, son: true })
                                                                        } else {
                                                                            if (noOfSon < 4)
                                                                            this.setState({ noOfSon: ++noOfSon, son: true })
                                                                        }
                                                                      
                                                                    }}>+</button>
                                                            </td>}
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <FormControlLabel
                                                               classes={{
                                                                label:classes.typography
                                                               }}
                                                                control={
                                                                    <Checkbox
                                                                        checked={daughter}
                                                                        onChange={this.handleChange('daughter')}
                                                                        disabled={this.state.noOfSon > 3}
                                                                        value="DG"
                                                                        classes={{
                                                                            root: classes.checkboxRoot,
                                                                            checked: classes.checked
                                                                        }} />
                                                                }
                                                                label="Daughter"
                                                            />
                                                        </td>
                                                        {this.state.daughter &&
                                                            <td>
                                                                <   button
                                                                    style={
                                                                        {
                                                                            background: '#fff',
                                                                            borderColor: '#333',
                                                                            color: '#333',
                                                                            marginLeft: '3rem'
                                                                        }}
                                                                    onClick={() => {
                                                                        let { noOfDaughter } = this.state;
                                                                        if (noOfDaughter > 1)
                                                                            noOfDaughter === 1 ? this.setState({ noOfDaughter: --noOfDaughter, daughter: false }) : this.setState({ noOfDaughter: --noOfDaughter })
                                                                        else
                                                                            this.setState({ daughter: false,noOfDaughter:1 })
                                                                    }}
                                                                    disabled={!this.state.noOfDaughter > 0}>&ndash;</button>
                                                                <input
                                                                    style={
                                                                        {
                                                                            background: '#fff',
                                                                            borderColor: '#333',
                                                                            color: '#333',
                                                                            width: '25px',
                                                                            borderLeft: 'none',
                                                                            borderRight: 'none',
                                                                            textAlign: 'center'
                                                                        }}
                                                                    value={this.state.noOfDaughter}
                                                                    disabled={false}
                                                                    name="noOfDaughter"
                                                                    onChange={(event) => {
                                                                        let noOfDaughter = event.target.value;
                                                                        if ((noOfDaughter > 0) && (noOfDaughter <= this.state.maxChildLimit)) { this.setState({ noOfDaughter: event.target.value }) }
                                                                        else if (noOfDaughter > this.state.maxChildLimit) { this.setState({ noOfDaughter: this.state.noOfDaughter }) }
                                                                        else { this.setState({ noOfDaughter: null }) }
                                                                        return true
                                                                    }} />
                                                                <button
                                                                    style={
                                                                        {
                                                                            background: '#fff',
                                                                            borderColor: '#333',
                                                                            color: '#333'
                                                                        }}
                                                                    onClick={() => {
                                                                        let { noOfDaughter, noOfSon, son } = this.state;
                                                                        if(son) {
                                                                        if ((noOfSon + noOfDaughter) < 4)
                                                                            this.setState({ noOfDaughter: ++noOfDaughter, daughter: true })
                                                                        } else {
                                                                            if (noOfDaughter < 4)
                                                                            this.setState({ noOfDaughter: ++noOfDaughter, daughter: true }) 
                                                                        }
                                                                    }}>+</button>
                                                            </td>}
                                                    </tr>
                                                    <FormControlLabel
                                                       classes={{
                                                        label:classes.typography
                                                       }}
                                                        control={
                                                            <Checkbox
                                                                checked={mother}
                                                                onChange={this.handleChange('mother')}
                                                                value="MT"
                                                                classes={{
                                                                    root: classes.checkboxRoot,
                                                                    checked: classes.checked
                                                                }}
                                                            />
                                                        }
                                                        label="Mother"
                                                    />
                                                    <FormControlLabel
                                                        classes={{
                                                            label:classes.typography
                                                        }}
                                                        control={
                                                            <Checkbox
                                                                checked={father}
                                                                onChange={this.handleChange('father')}
                                                                value="FT"
                                                                classes={{
                                                                    root: classes.checkboxRoot,
                                                                    checked: classes.checked
                                                                }}
                                                            />
                                                        }
                                                        label="Father"
                                                    />
                                                    <FormControlLabel
                                                         classes={{
                                                            label:classes.typography
                                                        }}
                                                        control={
                                                            <Checkbox
                                                                checked={mother_in_law}
                                                                onChange={this.handleChange('mother_in_law')}
                                                                value="MTL"
                                                                classes={{
                                                                    root: classes.checkboxRoot,
                                                                    checked: classes.checked
                                                                }}
                                                            />
                                                        }
                                                        label="Mother-in-law"
                                                    />
                                                    <FormControlLabel
                                                        classes={{
                                                            label:classes.typography
                                                        }}
                                                        control={
                                                            <Checkbox
                                                                checked={father_in_law}
                                                                onChange={this.handleChange('father_in_law')}
                                                                value="FTL"
                                                                classes={{
                                                                    root: classes.checkboxRoot,
                                                                    checked: classes.checked
                                                                }}
                                                            />
                                                        }
                                                        label="Father-in-law"
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                            {/* <Snackbar 
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                                open={(this.state.son ||this.state.daughter) && (!this.state.self && !this.state.spouse)}
                                                autoHideDuration={6000}
                                                
                                                 ContentProps={{
                                                    classes: {
                                                        root: classes.snakbarError
                                                    }
                                                }}
                                                message={<span >Please Select Self or Spouse !</span>}
                                               
                                            /> */}
                                            <div className="action-input-form-health" style={{ textAlign: 'center', marginBottom: '15px' }}>
                                                <Button 
                                                    className={classNames(classes.buttonRoot)}
                                                    onClick={() => {
                                                        if (this.checkValidity(1)) {

                                                            this.setState({ active_step: 2, tabContent: { padding: '0px 90px' } })
                                                            this.createFamilyDetails()
                                                        }
                                                        else
                                                            this.setState({ error: true })

                                                    }}
                                                    disabled={!this.checkValidity(1)}>Next <i class="material-icons" style={{ marginLeft: '3px' }}>
                                                        arrow_right_alt
                                                    </i></Button>
                                            </div>
                                        </div>
                                    }
                                    {this.state.active_step === 2 &&
                                        <div id="tab-2">
                                            <div className="tab-2-div-content">
                                                <h3 className="what-is-age-health-heading"> Add Age of each member</h3>
                                                <div className="table-input-form-health-div-tab-2">
                                                    <Row>
                                                        <Col md="3"></Col>
                                                        <Col md="5">
                                                            <table style={{ width: '100%' }}>
                                                                <tr>
                                                                    <th>Members</th>
                                                                    <th>Age</th>
                                                                </tr>
                                                                {/* Dynamically generate rows for age */}
                                                                {
                                                                    this.state.formData.familyDetails.map((item) =>
                                                                    <tr>
                                                                        <td>{item.label}</td>
                                                                        <td className="display_grid">
                                                                            <FormControl className={classes.formControlTable}>
                                                                                <InputLabel htmlFor="age-simple" className="age_simple">Select Age</InputLabel>
                                                                              
                                                                                <Select
                                                                                    value={item.age}
                                                                                    onChange={(e)=> this.handleAge(e, item.memberCode)}
                                                                                    inputProps={{
                                                                                        name: `${item.member}`,
                                                                                        id: "age-simple"
                                                                                    }}
                                                                                >
                                                                                }
                                                                           
                                                                                    {item.label.indexOf("Son") !== -1 ||
                                                                                        item.label.indexOf("Daughter") !== -1
                                                                                        ? this.state.ageItemsChild.map(
                                                                                            (i, index) =>(
                                                                                                <MenuItem className={classes.formControlAge} value={i.value}>
                                                                                                    {i.display} &nbsp;
                                                                                            </MenuItem>
                                                                                            
                                                                                            )
                                                                                            
                                                                                        ) 
                                                                                        : this.state.ageItems.map(
                                                                                            (i, index) => (
                                                                                                <MenuItem value={index+18}>
                                                                                                    {index+18} &nbsp; Years
                                                                                            </MenuItem>
                                                                                           
                                                                                            )
                                                                                        )}
                                                                                    }
                                                                                    </Select>
                                                                                {/* <Select native
                                                                                    value={item.age}
                                                                                    onChange={this.handleAge}
                                                                                    inputProps={{
                                                                                        name: `${item.member}`,
                                                                                        id: 'age-simple',
                                                                                    }}
                                                                                >
                                                                                    <option value="" />
                                                                                    {this.state.ageItems.map((i, index) =>
                                                                                        <option value={index + 1}>{index + 1}</option>
                                                                                    )}
                                                                                </Select> */}
                                                                                <Snackbar
                                                                                anchorOrigin={{
                                                                                    vertical: 'bottom', horizontal: 'center'
                                                                                }}
                                                                                open={this.state.ageErrorMessage}
                                                                                autoHideDuration={6000}
                                                                                
                                                                                ContentProps={{
                                                                                    classes: {
                                                                                        root: classes.snakbarError
                                                                                    }
                                                                                }}
                                                                                 message={<span>Age gap between parent and child should be 18 years. </span>}
                                                                                
                                                                            />
                                                                            </FormControl>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </table>
                                                            <Col md="12">
                                                                <div className="add-member-div-input-form-health">
                                                                    <p className="link-add-member"  onClick={() =>this.setState({ active_step: 1})}
                                                                     style={{cursor:'pointer'}}>+ Add Member</p><br />
                                                                </div>
                                                            </Col>
                                                            <div className="actions">
                                                                <Row>
                                                                    <Col md="6">
                                                                        <Button variant="outlined"
                                                                            className={classNames(classes.button)}
                                                                            onClick={() => { this.setState({ active_step: 1, tabContent: { padding: '0px 90px' } }) }}>
                                                                            <img src='/assets/arrow_red_copy.svg' alt="material-icons" 
                                                                            style={{marginRight:'10px'}}/>
                                                                               Back </Button>
                                                                    </Col>
                                                                    <Col md="6">
                                                                        <Button variant="contained"
                                                                            className={classNames(classes.buttonRootRight)}
                                                                            onClick={() => { this.setState({ active_step: 3, tabContent: { padding: '0px 90px' } }) }}
                                                                            disabled={!this.state.isAgeValid || ageValid}>Next<i class="material-icons"style={{marginLeft:'10px'}}>
                                                                                arrow_right_alt
                                                                            </i></Button>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {this.state.active_step === 3 &&
                                        <div id="tab-3">
                                            <div className="tab-3-content">
                                                <h3 className="desease-heading"> Any Pre Existing Disease?</h3>
                                                <div className="tab-3-table">
                                                    <table style={{ width: '100%' }}>
                                                        <tr>
                                                            <th>Members</th>
                                                            <th>Diabetes</th>
                                                            <th>Hypertension</th>
                                                            <th>Hyperlipidaemia</th>
                                                            <th>Asthma</th>
                                                            <th> Non Chronic</th>
                                                        </tr>
                                                        {
                                                            this.state.formData.familyDetails.map((item) =>
                                                                <tr>
                                                                    <td>{item.label}</td>
                                                                    {new Array(5).fill(0, 0).map((disease, index) =>

                                                                        <td>
                                                                            <FormControlLabel
                                                                                className={classes.formControlTable}
                                                                                control={
                                                                                    <Checkbox
                                                                                        checked={item.diseases[index].value}
                                                                                        onChange={this.handleDiseases(item.member)}
                                                                                        value={item.diseases[index].name}
                                                                                        name={`${item.diseases[index].name}`}
                                                                                        classes={{
                                                                                            root: classes.checkboxRoot,
                                                                                            checked: classes.checked
                                                                                        }} />
                                                                                }
                                                                                label=""
                                                                            />
                                                                        </td>
                                                                    )}

                                                                </tr>


                                                            )}
                                                    </table>
                                                    {/* <div className="add-member-div-input-form-health">
                                                        <p className="link-add-member">+ADD MEMEBER</p>
                                                    </div> */}
                                                    <br /><br />
                                                    <div className="actions">
                                                            <Row>
                                                            <Col md="3"></Col>
                                                            <Col md="3">
                                                                <Button variant="outlined"
                                                                    className={classNames(classes.button)}
                                                                    onClick={() => { this.setState({ active_step: 2, tabContent: { padding: '0px 90px' } }) }}>
                                                                    <img src='/assets/arrow_red_copy.svg' alt="material-icons" 
                                                                            style={{marginRight:'10px'}}/>Back</Button>
                                                            </Col>
                                                            <Col md="3">
                                                                { 
                                                                   this.state.nextButtonBig ?
                                                                <Button variant="contained"
                                                                    className={classNames(classes.buttonRootRight)}
                                                                    onClick={() => { this.setState({ active_step: 4, tabContent: { padding: '0px' } }) }}>Next
                                                                     <i class="material-icons"  style={{marginRight:'10px'}}>
                                                                        arrow_right_alt
                                                                    </i></Button>:
                                                                <Button variant="contained"
                                                                className={classNames(classes.buttonRootRight)}
                                                                onClick={() => { this.setState({ active_step: 4, tabContent: { padding: '0px' } }) }}>Skip
                                                                <i class="material-icons"  style={{marginLeft:'14px'}}>
                                                                    arrow_right_alt
                                                                </i></Button>}
                                                            </Col>
                                                            <Col md="3"></Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {/*  tab 4 */}
                                    {this.state.active_step === 4 &&
                                        <div className="tab-4">
                                            <div className="tab-4-div-content">
                                                <Row>
                                                    {/* <Col md="4" >
                                                        <div className="content-div">
                                                            <img
                                                                src="/assets/arrow-back.svg"
                                                                alt="back arrow for tab"
                                                                style={{ verticalAlign: 'middle', cursor: 'pointer' }}
                                                                onClick={() => { this.setState({ active_step: 3, tabContent: { padding: '0px 90px' } }) }} />&nbsp;&nbsp;
                                                        <p className="your-details-heading">Your Details</p>
                                                        </div>
                                                        <div style={{ textAlign: 'center', marginTop: '15px' }}>
                                                            <img src="/assets/undraw-group-selfie-ijc-6 (1).svg" alt="health" />
                                                        </div>
                                                        <div className="members-details-div">
                                                            <p>
                                                                {this.state.formData.familyDetails.map((item, index, vm = this) =>
                                                                    <span>{item.label}, {item.age}: {item.diseases.map((disease, ind) => disease.value ? `${disease.name} ${ind !== 4 ? ',' : ''}` : '')}<br /></span>
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="button-outline">
                                                            <Button
                                                                className={classNames(classes.buttonEdit)}
                                                                fullWidth
                                                                onClick={() => { this.setState({ active_step: 3, tabContent: { padding: '0px 90px' } }) }}>Edit Details</Button>
                                                        </div>
                                                    </Col> */}
                                                    <Col md="8">
                                                        <div className="div-content-col-8">
                                                            <h3 className="personal-details-heading">Share your personal details</h3>
                                                            <div className="form-presonal-details">
                                                                <Row>
                                                                    <Col md="11">
                                                                        <Row>
                                                                            <Col md="5" style={{marginTop:'-10px'}}>
                                                                                <FormControl required fullWidth margin="dense" className={classes.margin}
                                                                                    error={!this.state.personalDetailsForm.income.valid
                                                                                        && this.state.personalDetailsForm.income.touched}>
                                                                                    <InputLabel
                                                                                        FormLabelClasses={{
                                                                                            root: classes.cssLabelN,
                                                                                            focused: classes.cssFocused,
                                                                                        }} 
                                                                                        htmlFor="custom-css-input">Your Income</InputLabel> 
                                                                                    <Select
                                                                                        value={this.state.personalDetailsForm.income.value}
                                                                                        onChange={this.handleSubmitPersonalDetails('income')}
                                                                                        inputProps={{
                                                                                            name: 'income',
                                                                                            id: 'income',
                                                                                           
                                                                                        }}
                                                                                      
                                                                                    >
                                                                                    {/* <TextField
                                                                                    id="standard-select-currency"
                                                                                    select
                                                                                    label="Your Income"
                                                                                    className={classes.textField}
                                                                                    value={this.state.personalDetailsForm.income.value}
                                                                                    onChange={this.handleSubmitPersonalDetails('income')}
                                                                                    InputProps={{
                                                                                        classes: {
                                                                                          root: classes.cssOutlinedInput,
                                                                                          focused: classes.cssFocused,
                                                                                          notchedOutline: classes.notchedOutline,
                                                                                        },
                                                                                      }}
                                                                                    // helperText="Please select your currency"
                                                                                    margin="normal"
                                                                                >
                                                                                    {this.state.incomeItems.map(income => <MenuItem value={income.value}>{income.key}</MenuItem>)}

                                                                                     </TextField> */}
                                                                            
                                                                                        {this.state.incomeItems.map(income => <MenuItem value={income.value}>{income.key}</MenuItem>)}
                                                                                       
                                                                                    </Select>
                                                                                </FormControl>
                                                                            </Col>
                                                                            <Col md="1"></Col>
                                                                            <Col md="6">
                                                                                <Row>
                                                                                    <Col md="10">
                                                                                        <FormControl required className={classes.margin} margin="dense" fullWidth
                                                                                        style={{marginTop:'6px'}}
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
                                                                                                classes={{
                                                                                                    underline: classes.cssUnderlineN,
                                                                                                }}
                                                                                                fullWidth
                                                                                                name="selfPincode"
                                                                                                onChange={this.handleSubmitPersonalDetails('selfPincode')}
                                                                                                value={this.state.personalDetailsForm.selfPincode.value}
                                                                                                inputProps={{maxLength:6}}
                                                                                            />
                                                                                        </FormControl>
                                                                                    </Col>
                                                                                    <Col md="1" style={{ padding: '0px'}}>
                                                                                        <img
                                                                                            src="/assets/ic-my-location-24-px.svg"
                                                                                            width="20"
                                                                                            height="20" className="pincode-svg" alt="location"
                                                                                            onClick={this.getLocation} />
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            {(this.state.mother || this.state.father) && <Col md="5">
                                                                                <FormControl required className={classes.margin} margin="dense" fullWidth
                                                                                     error={!this.state.personalDetailsForm.parentsPincode.valid
                                                                                        && this.state.personalDetailsForm.parentsPincode.touched}>
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
                                                                                        classes={{
                                                                                            underline: classes.cssUnderlineN,
                                                                                        }}
                                                                                        fullWidth
                                                                                        name="parentsPincode"
                                                                                        inputProps={{maxLength:6}}
                                                                                        onChange={this.handleSubmitPersonalDetails('parentsPincode')}
                                                                                        value={this.state.personalDetailsForm.parentsPincode.value}
                                                                                    />
                                                                                </FormControl>
                                                                            </Col>}
                                                                            <Col md="1"></Col>
                                                                            {(this.state.mother_in_law || this.state.father_in_law) && <Col md="5">
                                                                                <FormControl required className={classes.margin} margin="dense" fullWidth
                                                                                     error={!this.state.personalDetailsForm.inLawsPincode.valid
                                                                                        && this.state.personalDetailsForm.inLawsPincode.touched}>
                                                                                    <InputLabel
                                                                                        htmlFor="custom-css-input"
                                                                                        FormLabelClasses={{
                                                                                            root: classes.cssLabelN,
                                                                                            focused: classes.cssFocused,
                                                                                        }}
                                                                                    >
                                                                                        Your In-laws Pincode
                                                                                </InputLabel>
                                                                                    <Input
                                                                                        classes={{
                                                                                            underline: classes.cssUnderlineN,
                                                                                        }}
                                                                                        fullWidth
                                                                                        onChange={this.handleSubmitPersonalDetails('inLawsPincode')}
                                                                                        inputProps={{maxLength:6}}
                                                                                        value={this.state.personalDetailsForm.inLawsPincode.value}
                                                                                        name="inLawsPincode"
                                                                                    />
                                                                                </FormControl>
                                                                            </Col>}
                                                                        </Row>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            {/* <hr style={{ marginLeft: '-3.5rem', marginTop: '1rem' }} /> */}
                                                            <div className="below-hr-form">
                                                                <p className="share-details">Please share your contact details , we will not spam you</p>
                                                                <Row>
                                                                    <Col md="7">
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
                                                                               First Name
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
                                                                    </Col>
                                                                    <Col md="7">
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
                                                                    </Col>
                                                                    <Col md="7">
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
                                                                            
                                                                                id="simple-start-adornment"
                                                                               inputProps={{maxLength:10}}
                                                                               
                                                                                classes={{
                                                                                    underline: classes.cssUnderlineN,
                                                                                }}
                                                                                fullWidth
                                                                                onChange={this.handleSubmitPersonalDetails('phone')}
                                                                                name="phone"
                                                                                value={this.state.personalDetailsForm.phone.value}
                                                                                startAdornment={<InputAdornment disableTypography={true}
                                                                                    classes={{ root: classes.adornment }} position="start">+91</InputAdornment>}
                                                                            />
                                                               {this.state.personalDetailsForm.phone.touched?!this.state.personalDetailsForm.phone.valid &&
                                                               <p style={{color:'#ea0b4b'}}>Please enter valid Mobile Number</p>:null}
                                                                        </FormControl>
                                                                        </Col>
                                                                </Row>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md="12">
                                                     <div style={{textAlign:'center',margin:'0.5rem 0rem'}}>    
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox className={{ root: classes.checkboxConcent }}
                                                                    onChange={this.handleChange('consent')}
                                                                    value={this.state.consent}
                                                                    name='consent'
                                                                />
                                                            }
                                                            label="I agree to GroupBima contacting me on the given phone number as any such contact attempt will be ‘Transactional’ as per the TRAI guidelines."
                                                            classes={{ label: classes.consentlabel }}
                                                        />
                                                        <div className="actions">
                                                            <Row>
                                                                <Col md="6">
                                                                    <Button variant="outlined"
                                                                        className={classNames(classes.buttonLeftUnderlined)}
                                                                        onClick={() => { this.setState({ active_step: 3, tabContent: { padding: '0px 90px' } }) }}>
                                                                        <img src='/assets/arrow_red_copy.svg' alt="back_icon" style={{marginRight:'10px'}}/>
                                                                          
                                                                        Back</Button>
                                                                </Col>
                                                                <Col md="6">
                                                                    <Button variant="contained"
                                                                         disabled={!this.state.consent || !this.state.formIsValid}
                                                                        className={classNames(classes.buttonRootLeft)}
                                                                        onClick={this.handleSubmit}>Get Quotes
                                                                        <i class="material-icons" style={{marginLeft:'11px'}}>
                                                                            arrow_right_alt
                                                                        </i></Button>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        </div>
                                                </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    }
                                </div>

                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Dialog full height and widh for mobile version */}
                {/* open={this.props.inputFormOpen}
                        TransitionComponent={Transition}
                        keepMounted
                        scroll="paper"
                        onClose={this.handleClose} */}

                <div className="mui--visible-xs-block mui--visible-sm-block">
                    <Dialog
                        fullScreen
                        open={this.props.inputFormOpenMobile}
                        onClose={this.handleCloseFull}
                        TransitionComponent={Transition}
                        classes={{
                            paperScrollPaper: classes.paperScroll
                        }}
                    >
                        {/* Tabs for mobile view */}
                        <div className="tabs-mobile-input-form-health">
                            <div
                                style={{ margin: '4px 0px' }}>
                                <p>Members</p>
                                <p>Medical Detail</p>
                                <p>Personal Details</p>
                            </div>
                            <LinearProgress
                                color="primary"
                                variant="determinate"
                                value={this.state.step_mob * 25}
                                classes={{
                                    bar1Determinate: classes.bar1,
                                    root: classes.bar2
                                }}
                            />
                        </div>

                        {/* div's for tab content */}

                        <div className="tab-mobile-content">
                            {/* Step-1 */}
                            {this.state.step_mob === 1 &&
                                <div className="tab-mob-1">
                                    {/* BAck arrow and title div */}
                                    <div className="navigation-div">
                                        <img 
                                            src="/assets/arrow-back (1).svg"
                                            alt="back button svg"
                                            style={
                                                {
                                                    float: 'left',
                                                    verticalAlign: 'middle',
                                                    width: '15px',
                                                    height: '15px'
                                                }
                                            }
                                            onClick={() => { this.props.inputFormOpenMobile(false) }} />
                                        <p className="tab-content-mob-heading"> Select Members</p>
                                    </div>
                                    {/* Here child component */}
                                    <SelectMembers  />

                                    {/* Next step button */}
                                    <div className="action-input-form-health" style={{ textAlign: 'center', marginBottom: '15px' }}>
                                        <Button
                                            className={classNames(classes.buttonRootMob)}
                                            onClick={() => {
                                                this.createFamilyDetailsMob()
                                            }} 
                                            // disabled = {true}
                                        >Next <i class="material-icons" style={{margin:'0px 10px'}}>arrow_right_alt</i>
                                        </Button>
                                    </div>
                                </div>
                            }

                            {/* Step-2 */}
                            {this.state.step_mob === 2 &&
                                <div className="tab-mob-2">
                                    {/* BAck arrow and title div */}
                                    <div className="navigation-div">
                                        <img
                                            src="/assets/arrow-back (1).svg"
                                            alt="back button svg"
                                            style={
                                                {
                                                    float: 'left',
                                                    verticalAlign: 'middle',
                                                    width: '15px',
                                                    height: '15px'
                                                }
                                            }
                                            onClick={() => { this.props.inputFormOpenMobile(false) }} />
                                        <p className="tab-content-mob-heading"> Age details</p>
                                    </div>
                                    {/* Here child component */}
                                    <AgeDetails />

                                    {/* Next step button */}
                                    <div className="actions">
                                        <Row style={{
                                            margin: '0px'
                                        }}>
                                            <Col sm="6" xs="6" style={{ padding: '0px' }}>
                                                <Button style={{padding:'5px 45px'}}
                                                    className={classNames(classes.button)}
                                                    onClick={() => { this.setState({ step_mob: 1 }) }}> <img src='/assets/arrow_red_copy.svg' alt="material-icons" 
                                                    style={{marginRight:'10px'}}/>
                                                    Back</Button>
                                            </Col>
                                            <Col sm="6" xs="6" style={{ padding: '0px' }}>
                                                <Button style={{padding:'6px 39px'}}
                                                    className={classNames(classes.buttonRootRight)}
                                                    onClick={() => {
                                                        if (!this.checkValidityMob(2)) this.setState({ step_mob: 3 })
                                                    }}>Next <i class="material-icons" style={{margin:'0px 10px'}}>
                                                        arrow_right_alt
                                                    </i></Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            }
                            {/* Step-3 */}
                            {this.state.step_mob === 3 &&
                                <div className="tab-mob-3">
                                    {/* Back arrow and title div */}
                                    <div className="navigation-div">
                                        <img
                                            src="/assets/arrow-back (1).svg"
                                            alt="back button svg"
                                            style={
                                                {
                                                    float: 'left',
                                                    verticalAlign: 'middle',
                                                    width: '15px',
                                                    height: '15px'
                                                }
                                            }
                                            onClick={() => { this.props.inputFormOpenMobile(false) }} />
                                        <p className="tab-content-mob-heading"> Select Diseases (if any)</p>
                                    </div>
                                    {/* Here child component */}
                                    <Diseases nextButton={(value) => this.setState({nextButton:value})} />

                                    {/* Next step button */}
                                    <div className="actions">
                                        <Row style={{
                                            margin: '0px'
                                        }}>
                                            <Col sm="6" xs="6" style={{ padding: '0px' }}>
                                                <Button style={{padding:'5px 45px'}}
                                                    className={classNames(classes.button)}
                                                    onClick={() => { this.setState({ step_mob: 2 }) }}>
                                                    <img src='/assets/arrow_red_copy.svg' alt="material-icons" 
                                                                            style={{marginRight:'10px'}}/>Back</Button>
                                            </Col>
                                            <Col sm="6" xs="6" style={{ padding: '0px' }}>
                                            {this.state.nextButton ?
                                                <Button style={{padding:'6px 42px', minWidth: '167px'}}
                                                className={classNames(classes.buttonRootRight)}
                                                onClick={() => { this.setState({ step_mob: 4 }) }}>Next<i class="material-icons"
                                                    style={{margin:'0px 10px'}}>
                                                    arrow_right_alt 
                                                </i></Button>:
                                                <Button style={{padding:'6px 42px', minWidth: '167px'}}
                                                className={classNames(classes.buttonRootRight)}
                                                    onClick={() => { this.setState({ step_mob: 4 }) }}>Skip<i class="material-icons"
                                                    style={{margin:'0px 10px'}}>
                                                        arrow_right_alt
                                                </i></Button>
                                            }
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            }

                            {/* Step-4 */}
                            {this.state.step_mob === 4 &&
                                <div className="tab-mob-4">
                                    {/* Back arrow and title div */}
                                    <div className="navigation-div">
                                        <img
                                            src="/assets/arrow-back (1).svg"
                                            alt="back button svg"
                                            style={
                                                {
                                                    float: 'left',
                                                    verticalAlign: 'middle',
                                                    width: '15px',
                                                    height: '15px'
                                                }
                                            }
                                            onClick={() => { this.props.inputFormOpenMobile(false) }} />
                                        <p className="tab-content-mob-heading"> Personal Details</p>
                                    </div>
                                    {/* Here child component */}
                                    
                                    <PersonalDetails consent={(value) => this.setState({consentMob:value})}
                                          valid={(value) => this.setState({valid:value})} gender={this.props.gender}/>

                                    {/* Next step button */}
                                    <div className="actions">
                                        <Row style={{
                                            margin: '0px'
                                        }}>
                                            <Col sm="6" xs="6" style={{ padding: '0px' }}>
                                                <Button style={{padding:'5px 45px'}}
                                                    className={classNames(classes.button)}
                                                    onClick={() => { this.setState({ step_mob: 3 }) }}>
                                                    <img src='/assets/arrow_red_copy.svg' alt="material-icons" 
                                                                            style={{marginRight:'10px'}}/>Back</Button>
                                            </Col>
                                            <Col sm="6" xs="6" style={{ padding: '0px' }}>
                                                <Button style={{padding:'6px 24px'}} disabled={!this.state.consentMob && !this.state.valid}
                                                    className={classNames(classes.buttonRootRightMobGetQuotes)}
                                                    onClick={this.handleSubmitMob}>Get Quotes<i class="material-icons">
                                                        arrow_right_alt
                                                    </i></Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    {/* <div className="actions" style={{ marginLeft: '0px', marginRight: '15px', marginTop: '2rem' }}>
                                        <Button
                                            className={classNames(classes.buttonRoot4)}
                                            onClick={this.handleSubmitMob}
                                            fullWidth>Get Quotes</Button>
                                    </div> */}
                                </div>
                            }
                        </div>
                    </Dialog>

                </div>
            </div>
        )
    }
}

InputHealth.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    loadInputFormHealth: (data) => dispatch({ type: 'INPUT_FORM_HEALTH', data }),
    selfSpouseFGAlert: (data) => dispatch({ type: 'SELF_SPOUSE_FG_ALERT', data }),
})

const mapStateToProps = state => ({
    inputFormDataHealth: state.inputFormHealth.inputFormHealthData
})

export default ((connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InputHealth))))

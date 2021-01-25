import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { MuiThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';
import NativeSelect from '@material-ui/core/NativeSelect';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import constants from '../../../constants/appConstants.json'
import * as moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';




import './index.css';

const styles = theme => ({
    snack:{
        marginTop:'6rem'
    },
    formControl: {
        margin: '5px 0px',
    },
});

class AddFamilyMemberPopup extends Component {
    constructor(props) {
        super();
        this.state = {
            openSnack:false,
            succcessMessage: false,
            insuranceName:'',
            status:'',
            familyForm:{
                previousPolicyExpiryDate:{
                    value:'',
                    rules: {},
                    isValid:true
                },
                previousPolicyNumber:{
                    value:'',
                    rules: {},
                       isValid:true
                },
                relation: {
                    value: '',
                    rules: {
                        isRequired: true,
                    },
                    isValid: false,
                    touched: false
                },
                name: {
                value: '',
                rules: {
                    shouldAcceptCharactersOnly: true,
                    isRequired: true,
                },
                isValid: false,
                touched: false
            },
            dateOfBirth: {
                value: '',
                rules: {
                    maxDate:true,
                    isRequired: false,
                },
                isValid: false,
                touched: false
            },
                // dateOfBirth: new Date(''),
                
        },
        formIsValid: false
       
    }
    }
    componentWillMount() {
         let familyFormData=this.state.familyForm
        if (this.props.familyMemberDetails) {
            // let dateUpdated =  moment(this.props.familyMemberDetails.dateOfBirth).format("YYYY-MM-DD")
          
            familyFormData.name.value = this.props.inputformdata && this.props.inputformdata.name
            familyFormData.name.isValid = true
           
            familyFormData.dateOfBirth.value = this.props.familyMemberDetails.dateOfBirth
            familyFormData.dateOfBirth.isValid = true
           
            familyFormData.relation.value = this.props.familyMemberDetails.relationship
            familyFormData.relation.isValid = true      
            this.setState({
                familyForm:familyFormData, formIsValid: true
                // relation: this.props.familyMemberDetails.relationship,
                // name: this.props.familyMemberDetails.name,
                // dateOfBirth: dateUpdated,
                // previousPolicy: this.props.familyMemberDetails.previousPolicy,
                // previousPolicyExpiryDate: this.props.familyMemberDetails.previousPolicyExpiryDate,
            })
        }
    }

    handleSuccessMessage = () => {
        const vm = this;
        let token = localStorage.getItem('token')
        if (this.props.familyMemberDetails) {
            //  let dateUpdated =  moment(this.state.dateOfBirth).format("DD-MM-YYYY")
            let config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            let EditFamilyMember = {
                familyMemberId: this.props.familyMemberDetails.familyMemberId,
                name: this.state.familyForm.name.value,
                relationship: this.state.familyForm.relation.value,
                insuranceName: this.state.insuranceName,
                dateOfBirth: this.state.familyForm.dateOfBirth.value,
                status: this.state.status,
                previousPolicyNumber: this.state.familyForm.previousPolicyNumber.value,
                previousPolicyExpiryDate: this.state.familyForm.previousPolicyExpiryDate.value,
                familyMemberType: this.props.familyMemberDetails.familyMemberType
            }
            axios.post(`${constants.apiRootURL}/secure/edit-member`, EditFamilyMember, config)
                .then(response => {
                  
                    axios.get(`${constants.apiRootURL}/secure/family`, config)
                    .then(response => {
                       
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
                    this.props.onClose(false)
                }).catch(error => {
                  
                    if (error.response.status === 401) {
                        localStorage.clear();
                        this.props.onAuthFail()
                        this.props.history.push('/login-customer')
                    }
                    else if (error.response.status === 500) {
                        this.props.history.push('/500')
                    }
                })
        }
        else {
            // let dateUpdated =  moment(this.state.dateOfBirth).format("DD-MM-YYYY")
            let AddFamilyMember = [{
                name: this.state.familyForm.name.value,
                relationship: this.state.familyForm.relation.value,
                dateOfBirth:  this.state.familyForm.dateOfBirth.value,
                previousPolicyNumber: this.state.familyForm.previousPolicyNumber.value,
                previousPolicyExpiryDate: this.state.familyForm.previousPolicyExpiryDate.value

            }]
            let config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            axios.post(`${constants.apiRootURL}/secure/add-member`, AddFamilyMember, config)
                .then(response => {
                   
                    axios.get(`${constants.apiRootURL}/secure/family`, config)
                    .then(response => {
                       
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
                this.handleClose()
        }
        //window.location.reload();
        // this.setState({
        //     succcessMessage: true
        // })
    }

    handleClose = () => {
        if (this.props.onClose) {
            this.props.onClose(false)
        } else {
            this.props.onAddFamilyMemberForm();
        }
    }
     
    handleChange = name => event => {
        const familyForm = this.state.familyForm
        const value = event.target.value
        familyForm[name].value = value
        let formIsValid = true;
        familyForm[name].isValid = this.checkValidity(value, familyForm[name].rules)
        for (let name in familyForm) {
          
            formIsValid = familyForm[name].isValid && formIsValid
          
           
        }
      
       
        this.setState({familyForm,formIsValid:formIsValid });
    };
    getFamilyAge = (date) =>{
        let b =  moment(date,"DD-MM-YYYY");
        let a =  moment();

        let years = a.diff(b,'year');
        b.add(years,'years')

        let months = a.diff(b,'months');
        b.add(months,'months')

        let days = a.diff(b,'days');
        b.add(days,'days')
        let  ageText = `${years} years,${months} months,${days} days`
            
        return ageText;
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (rules.isRequired) {
            isValid =value.trim() !== '' && isValid
        }
        if (rules.shouldAcceptCharactersOnly) {
            isValid = value.trim().match(/^[a-zA-Z ]+$/) && isValid
        }
        if(rules.maxDate){
            var CurrentDate = new Date();        
let dd = String(CurrentDate.getDate())
let mm = String(CurrentDate.getMonth())
let yyyy = CurrentDate.getFullYear();

CurrentDate = yyyy + '-' + mm + '-' + dd;
           return isValid=value.match(/((([12]\d{3})(-(0[1-9]|1[0-2]))*)(-(0[1-9]|[12]\d|3[01]))*)/)
            && value<=CurrentDate && isValid
        }

        return isValid
    }

    render() {
        // const ITEM_HEIGHT = 48;
        // const ITEM_PADDING_TOP = 8;
        // const MenuProps = {
        //     PaperProps: {
        //         style: {
        //             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        //             width: 250,
        //         },
        //     },
        // };
        // const previousPolicy = [
        //     'Health',
        // ];
        // function getStyles(previousPolicy, that) {
        //     return {
        //         fontWeight:
        //             that.state.previousPolicy.indexOf(previousPolicy) === -1
        //                 ? that.props.theme.typography.fontWeightRegular
        //                 : that.props.theme.typography.fontWeightMedium,
        //     };
        // }
        const { fullScreen, classes } = this.props;
        return (
            <div>
                <MuiThemeProvider>
                    <Dialog open={this.props.open ? this.props.open :
                        this.props.AddFamilyMemberForm}
                        key={this.props.familyMemberDetails ? this.props.key : 1}
                        onClose={this.handleClose}
                        maxWidth="md"
                        fullScreen={fullScreen}
                        aria-labelledby="simple-dialog-title">
                        <DialogContent >
                            {/* {this.state.succcessMessage && <Row>
                                <Col md={12}>
                                    <div className='succcessMessage'><div className='successText' style={{ color: '#ffffff' }}>You have suceessfully added your family member</div></div>
                                </Col>
                            </Row>} */}
                            <Row>
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
                                <Col md={12} style={{ textAlign: 'center' }}>
                                    <div className='AddFamilyMemberHeading'>
                                        {this.props.MainHeading ? this.props.MainHeading : 'Add Family Member'}
                                    </div>
                                    <div className='close' >
                                        <i onClick={this.handleClose} class="material-icons" style={{ float: 'right', marginRight: '1rem', cursor: 'pointer' }}>
                                            close
                                        </i>
                                    </div>
                                </Col>
                                <Col md={6} >
                                    <Col md={12}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            {this.props.familyMemberDetails ? null
                                                : <InputLabel htmlFor="relation-native-simple">Relation</InputLabel>}
                                            <NativeSelect
                                                onChange={this.handleChange('relation')}
                                                inputProps={{
                                                    name: 'age',
                                                    id: 'age-native-simple',
                                                }}
                                                input={<Input name="relation" id="relation-native-label-placeholder" />}
                                                error={!this.state.familyForm.relation.isValid}
                                            >
                                               {this.props.relations && Object.keys(this.props.relations).map(key => 
                                                    <option value={this.props.relations[key]}>{key}</option>
                                                )}
                                            </NativeSelect>
                                        </FormControl>
                                    </Col>
                                    <Col md={12}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="dateOfBirth"
                                                label="Date of birth"
                                                type="date"
                                               
                                                value={this.state.familyForm.dateOfBirth.value}
                                                onChange={this.handleChange('dateOfBirth')}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                error={!this.state.familyForm.dateOfBirth.isValid}
                                            />
                                        </FormControl>
                                    </Col>
                                    <Col md={12}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="LifeExpDate"
                                                label="policy expiring date"
                                                type="date"
                                                value={this.state.familyForm.previousPolicyExpiryDate.value}
                                                onChange={this.handleChange('previousPolicyExpiryDate')}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                               
                                            />
                                        </FormControl>
                                    </Col>
                                </Col>
                                <Col md={6}>
                                    <Col md={12}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <InputLabel htmlFor="component-simple">Name</InputLabel>
                                            <Input
                                                value={this.state.familyForm.name.value}
                                                aria-haspopup="true"
                                                id="component-simple"
                                                onChange={this.handleChange('name')} 
                                                error={!this.state.familyForm.name.isValid}
                                                />
                                        </FormControl>
                                    </Col>
                                    <Col md={12}>
                                        {/* <FormControl fullWidth className={classes.formControl}>
                                            <InputLabel htmlFor="select-multiple">Any Previous Policy</InputLabel>
                                            <Select
                                                multiple
                                                value={this.state.previousPolicy}
                                                onChange={this.handleChange('previousPolicy')}
                                                input={<Input id="select-multiple" />}
                                                MenuProps={MenuProps}
                                            >
                                                {previousPolicy.map(name => (
                                                <MenuItem key={name} value={name} style={getStyles(name, this)}>
                                                    {name}
                                                </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl> */}
                                        <FormControl fullWidth className={classes.formControl}>
                                            <InputLabel htmlFor="relation-native-simple">Any Previous Policy</InputLabel>
                                            <Input
                                                value={this.state.familyForm.previousPolicyNumber.value}
                                                aria-haspopup="true"
                                                id="component-simple"
                                                onChange={this.handleChange('previousPolicyNumber')} />
                                        </FormControl>
                                    </Col>
                                </Col>
                                <Col md={12} style={{ textAlign: 'center' }}>
                                    <div className='SaveButton'>
                                        <ButtonLightSuccess disabled={!this.state.formIsValid} Text='Save' onClick={this.handleSuccessMessage} fullWarningPink={true} />
                                    </div>
                                </Col>
                            </Row>
                        </DialogContent>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        )
    }
}



AddFamilyMemberPopup.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
    return {
        AddFamilyMemberForm: state.AddFamilyMember.add_family_member_form_open,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddFamilyMemberForm: (value) => dispatch({ type: 'AddFamilyMemberForm_HIDE', value }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog({ breakpoint: 'xs' })(withStyles(styles, { withTheme: true })(AddFamilyMemberPopup)));

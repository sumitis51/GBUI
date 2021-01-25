import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import classNames from 'classnames';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import './Policydialog.css';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import green from '@material-ui/core/colors/green';




const styles = theme => ({
    root: {
        justifyContent: 'center',
        color: '#000000',
        '&$checked': {
            color: green[500],
        },
    },
    checked: {},
    label: {
        fontSize: '12px',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    dialog: {
        root: {
            paddingTop: '0px'
        }
    }
});

class policyDialog extends Component {
    constructor(props) {
        super();
        this.state = {
            open: true,
            age: '',
            name: 'hai',
            labelWidth: 0,
            selectedValue: 'a',
        };
    }

    

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ selectedValue: event.target.value });
    };
    handleClose(){
        this.setState({
            open:false
        })
    }
    render() {
        const { fullScreen } = this.props;
        const { classes} = this.props;
        return (
            <Dialog
                fullScreen={fullScreen}
                className={classNames(classes.root, 'dialogBox')}
                open={this.state.open}
                onClose={this.handleClose}
                maxWidth="lg"
                aria-labelledby="form-dialog-title"
            >
                <DialogContent style={{ padding: '0px' }}>
                    <Row className='contentRow'>
                        <Col md={5} className='leftContainer mui--hidden-xs mui--hidden-sm'>
                            <Col md={2}>
                                <div className='arrow' style={{cursor: 'pointer'}}>
                                    <img
                                        src="assets/CarInsurance/arrowBack.svg"
                                        alt='arrow'
                                        onClick={this.props.popupHide} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className='yourCar'>Your Car</div>
                            </Col>
                            <div className='carPic'><img src="assets/CarInsurance/car.png" alt='car' /></div>
                            <div className='carInformation'>MH-02-AJ-1234,</div>
                            <div className='carInformation' style={{ fontWeight: '600' }}>Hyundai i10 </div>
                            <div className='carInformation'>1.2 Era Petrol 1197 +</div>
                            <div className='carInformation'>Externally fitted CNG,</div>
                            <div className='carInformation'>2013</div>
                            <div className='editButton'>
                                <ButtonLightSuccess
                                    Text="Edit car details"
                                    fullContent={true}
                                    onClick={() => {this.props.onShowPopUp(); this.props.popupHide();}}
                                     />
                            </div>
                        </Col>
                        <Col md={7} xs={12} className='rightContainer'>
                            <div className='arrowRight mui--visible-xs-block' style={{cursor: 'pointer'}}><img src="assets/CarInsurance/arrowBack.svg" onClick={() => {this.props.onShowPopUp(); this.props.popupHide();this.props.onPopupValueDecrease(0);}} alt='arrow' />
                                <div className='userInfo mui--visible-xs-block'>CAR NAME MODEL PETROL + CNG CAR YEAR
                            </div></div>
                            <div className='policyDetail'>Share your policy details</div>
                            <Col md={6} xs={12}>
                                <FormControl fullWidth={true} className={classes.formControl}>
                                    <InputLabel style={{ fontSize: '12px' }} classname={classes.label} htmlFor="age-simple">Previous Policy Status</InputLabel>
                                    <Select
                                        value={this.state.age}
                                        onChange={this.handleChange}
                                        autoWidth={false}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}
                                    >
                                        <MenuItem value={10}>Expired W/N 90 days</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Col>
                            <Col md={6} xs={12}>
                                <div className='status'>Claim Raised in Previous Policy</div>
                                <Col md={6} xs={3}>
                                    <FormControlLabel
                                        classes={{
                                            label: classes.label,
                                        }}
                                        value="Yes"
                                        control={<Radio
                                            checked={this.state.selectedValue === 'a'}
                                            onChange={this.handleChange}
                                            value="a"
                                            name="radio-button-demo"
                                            classes={{
                                                root: classes.root,
                                                checked: classes.checked,
                                            }}
                                        />}
                                        label="Yes"
                                    />
                                </Col>
                                <Col md={6} xs={3}>
                                    <FormControlLabel
                                        classes={{
                                            label: classes.label,
                                        }}
                                        value="No"
                                        control={<Radio
                                            checked={this.state.selectedValue === 'b'}
                                            onChange={this.handleChange}
                                            value="b"
                                            name="radio-button-demo"
                                            classes={{
                                                root: classes.root,
                                                checked: classes.checked,
                                            }}
                                        />}
                                        label="No"
                                    />
                                </Col>
                            </Col>
                            <FormControl fullWidth={true} className={classes.formControl}>
                                <InputLabel style={{ fontSize: '12px' }} classname={classes.label} htmlFor="age-simple">NCB Percentage</InputLabel>
                                <Select
                                    value={this.state.age}
                                    onChange={this.handleChange}
                                    autoWidth={false}
                                    inputProps={{
                                        name: 'age',
                                        id: 'age-simple',
                                    }}
                                >
                                    <MenuItem value={10}>50%</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <div className='contactDetail'>Please share your contact details , we will not spam you</div>
                            <TextField fullWidth={true}
                                className={classes.textField}
                                id="standard-name"
                                label="Name"
                            />
                            <TextField fullWidth={true}
                                className={classes.textField}
                                id="standard-name"
                                label="Phone Number"
                            />
                            <div className='QuoteButton'>
                                <ButtonLightSuccess onClick={() => {this.props.popupHide();this.props.onPopupValueDecrease(1);}} Text="Get Quotes" fullWidth={true} />
                            </div>
                        </Col>
                    </Row>
                </DialogContent>
            </Dialog>
        )
    }

}


policyDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};
const mapStateToProps = state => {
   
    return {
        mobilePopupShow: state.popup.popup_mobile_value_1,
        policy: state.popup.popup_policy_show,
    };
};

const mapDispatchToProps = dispatch => {
    return {
      onPopupValueDecrease:(value) => dispatch({ type: 'POPUP_MOBILE_VALUE_DECREASE', value}),
      popupHide:() => dispatch({ type: 'POPUP_POLICY_HIDE'}),
      onShowPopUp: () => dispatch({ type: 'POPUP_STEPPER_SHOW' })
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog({ breakpoint: 'xs' })(withStyles(styles)(policyDialog)));

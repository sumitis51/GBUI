import React, { Component } from 'react'
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import axios from 'axios';
import { connect } from 'react-redux'
import '../input-health.css'
import InputHealthChildDialogue from '../index'


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
        '&$checked': {
            color: '#ea0b4b'
        },
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
    buttonRoot: {
        color: '#ffffff',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '10px 60px'
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
    buttonRoot2: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '10px 50px',
        margin: '0.8rem'
    },
    buttonRoot4: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '10px 50px',
        margin: '0px'
    },
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '10px 60px',
        margin: '1rem'
    },
    buttonRootGet: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '10px 18px',
        margin: '1rem'
    },
    button: {
        color: '#ea0b4b',
        background: '#ffffff',
        '&:hover': {
            backgroundColor: '#f6f6f6',
            border: '1px solid #ea0b4b'
        },
        border: '1px solid #ea0b4b',
        padding: '10px 50px',
        margin: '0.8rem'
    },
    buttonEdit: {
        color: '#ea0b4b',
        background: '#ffffff',
        '&:hover': {
            backgroundColor: '#f6f6f6',
            border: '1px solid #ea0b4b'
        },
        border: '1px solid #ea0b4b',
        padding: '10px 20px',
        margin: '0.8rem'
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
        backgroundColor: '#ea0b4b',
        height: '2px'
    },
    bar2: {
        backgroundColor: '#808080',
        height: '2px'
    },
    paperScroll: {
        overflowX: 'hidden'
    }
});

class InputHealthParent extends Component {
    state = {
        gender: '',
        open:false
    }

      // Handle othe input fields
    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value })
        return true
    }
    openDialog = () => {
        this.setState({ open: true})
    }
    render() {
        const { classes } = this.props;
        return (
            <div className="input-form-health-parent-div">
                <div className="body-contetnt-input-form-health">
                    <div className="insurance-fast-painless-heading-health">Insurance, fast and painless</div>
                    <p className="sub-heading-input-form-health">Select the type of insurance to want to explore today </p>

                    <div className="container" style={{ marginTop: '30px' }}>
                        <Row>
                            <Col md="5" className="mui--hidden-xs mui--hidden-sm">
                                <img src="/assets/insuranceHome.svg" alt="forever-health-plan" />
                            </Col>
                            <Col md="7">
                                <div className="tab-items-input-form-health">
                                    <ul>
                                        {/* <li>Car</li>
                                    <li>Bike</li> */}
                                        <li className="active-li">Health</li>
                                        {/* <li>Term Life</li>
                                    <li>PA</li> */}
                                    </ul>
                                </div>
                                <div className="health-form-col-sub-heading-div">
                                    <h3 className="health-form-col-sub-heading-heading">Best Health Insurance plans. Customized for you.</h3>
                                    <div className="health-form-input-field-radio-div">
                                        <FormControl component="fieldset" className={classes.formControl} row>
                                            <RadioGroup
                                                aria-label="Gender"
                                                name="gender"
                                                className={classes.group}
                                                value={this.state.gender}
                                                row
                                            >
                                                <FormControlLabel
                                                    control={<div />}
                                                    label="You are?"
                                                    labelPlacement="start"
                                                    classes={{
                                                        root: classes.radio,
                                                        label: classes.label
                                                    }}
                                                />
                                                <FormControlLabel
                                                    value="M"
                                                    control={<Radio classes={{
                                                        root: classes.rootRadio,
                                                        checked: classes.checked,
                                                    }} color="primary" />}
                                                    inputProps={{
                                                        name: 'gender',
                                                        id: 'gender',
                                                    }}
                                                    label="Male"
                                                    onClick={this.handleInput}
                                                />
                                                <FormControlLabel
                                                    value="F"
                                                    control={<Radio classes={{
                                                        root: classes.rootRadio,
                                                        checked: classes.checked,
                                                    }} color="primary" />}
                                                    label="Female"
                                                    inputProps={{
                                                        name: 'gender',
                                                        id: 'gender',
                                                    }}
                                                    onClick={this.handleInput}
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                        {/* input field */}
                                        <div className="form-insurance-input-health">
                                            <Row>
                                                <Col md="8">
                                                    <FormControl className={classes.margin} margin="dense" fullWidth>
                                                        <InputLabel
                                                            htmlFor="custom-css-input"
                                                            FormLabelClasses={{
                                                                root: classes.cssLabel,
                                                                focused: classes.cssFocused,
                                                            }}
                                                        >
                                                            For whom you want to take insurance
                                                </InputLabel>
                                                        <Input
                                                            id="custom-css-input"
                                                            classes={{
                                                                underline: classes.cssUnderline,
                                                            }}
                                                            fullWidth
                                                        />
                                                    </FormControl>
                                                </Col>
                                                <Col md="3" >
                                                    <div className="mui--hidden-xs mui--hidden-sm">
                                                        <Button
                                                            className={classNames(classes.buttonRoot)}
                                                            onClick={this.openDialog}
                                                            disabled={!this.state.gender}>Submit</Button>


                                                    </div>
                                                    <div className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ margin: '25px 0px' }}>
                                                        <Button
                                                            className={classNames(classes.buttonRoot)}
                                                            onClick={() => {this.setState({openDialogMobile:true})}}
                                                            disabled={!this.state.gender}
                                                            fullWidth>Submit</Button>
                                                    </div>
                                                    {/*this.state.open*/ true &&
                                                    <div className='mui--hidden-xs mui--hidden-sm'>
                                                    <InputHealthChildDialogue history={this.props.history} gender={this.state.gender} open={this.state.open}  inputFormOpen={(value) => this.setState({open:value})} />
                                                    </div>}
                                                    {this.state.openDialogMobile  &&
                                                    <div className='mui--visible-xs-block  mui--visible-sm-block'>
                                                    <InputHealthChildDialogue history={this.props.history} gender={this.state.gender}  inputFormOpenMobile={(value) => this.setState({open:value})} />
                                                    </div>}
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col
                                md="5"
                                className="mui--hidden-xl mui--hidden-md mui--hidden-lg"
                                style={{ margin: '15px 0px' }}>
                                <img
                                    src="/assets/undraw-forever-5-ag-7 (1).svg"
                                    alt="forever-health-plan"
                                    style={{ width: '100%', height: 'auto' }} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

InputHealthParent.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    loadInputFormHealth: (data) => dispatch({ type: 'INPUT_FORM_HEALTH', data })
})

const mapStateToProps = state => ({
    inputFormDataHealth: state.inputFormHealth.inputFormHealthData
})

export default (connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InputHealthParent)))


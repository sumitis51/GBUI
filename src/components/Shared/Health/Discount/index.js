import React from 'react'
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import black from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import withMobileDialog from '@material-ui/core/withMobileDialog';
// import constants from '../../../constants/appConstants.json'
import { connect } from 'react-redux'



import './discount.css'


const styles = theme => ({
    formControl: {
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing.unit,
    },
    rootRadio: {
        color: '#0da176',
        '&$checked': {
            color: '#0da176',
        },
    },
    checked: {},
    helpIcon: {
        marginRight: '1rem'
    },
    helpIconM: {
        float: 'right'
    },
    formLabel: {
        marginTop: '1rem'
    },
    cssRoot: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        textTransform: 'capitalize',
        padding: '0px 10px'
    },
    fixApplyButton: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 1000,
        padding: '8px',
        borderTop: '1px solid rgba(0, 0, 0, 0.5)',
        marginLeft: '-14px'
    }

});
const theme = createMuiTheme({
    palette: {
        primary: black,
    },
    typography: { useNextVariants: true },
});

class GetDiscount extends React.Component {
    state = {
        open: false,
        fullWidth: true,
        professionList: [
            { name: 'Doctor', value: 'doctor' },
            { name: 'Chartered Accountant', value: 'chartered accountant' },
            { name: 'Engineer', value: 'engineer' },
            { name: 'Educator (College Professor or School Teacher)', value: 'educator' },
            { name: 'Defense Serviceman', value: 'defense serviceman' },
            { name: 'Scientist', value: 'scientist' },
        ],
        insurerList: [
            { name: 'Raheja', value: 'raheja' },
            { name: 'Bharti', value: 'chartered accountant' },
            { name: 'Feature Generally', value: 'engineer' },
            { name: 'SBI', value: 'educator' }
        ],
        habitList: [
            { name: 'Sleeping Hours', value: 'Sleeping Hours' },
            { name: 'Kms you walk(in a day)', value: 'Kms you walk(in a day)' },
            { name: 'Consume alcohol', value: 'Consume alcohol' },
            { name: 'Smoke', value: 'smoke' }
        ],
        coPayList: [
            { name: 'No Co-Pay', value: 'No Co-Pay' },
            { name: 'Less than 10%', value: '10' },
            { name: 'Less than 20%', value: '20' }
        ],
        termList: [
            { name: '1 year', value: '1' },
            { name: '2 years', value: '2' },
            { name: '3 years', value: '3' },
            { name: '4 years', value: '4' },
        ],
        discountForm: {
            profession: {
                value: 'engineer',
                rules: {
                    isRequired: true
                }
            },
            bodyMassIndex: {
                value: 'yes',
                rules: {
                    isRequired: true,
                }
            },
            height: {
                value: '',
                rules: {
                    isRequired: true
                }
            },
            weight: {
                value: '',
                rules: {
                    isRequired: true
                }
            },
            prevHealthPolicy: {
                value: 'yes',
                rules: {
                    isRequired: true
                }
            },
            prevInsurer: {
                value: '',
                rules: {
                    isRequired: true
                }
            },
            prevPolicyNo: {
                value: '',
                rules: {
                    isRequired: true
                }
            },
            claimPrevPolicy: {
                value: '',
                rules: {
                    isRequired: true
                }
            },
            presonalHabbit: {
                value: '',
                rules: {
                    isRequired: true
                }
            },
            coPay: {
                value: '-1',
                isRequired: true,
            },
            termDiscount: {
                value: '',
                isRequired: true
            }

        }
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    // Set values
    handleChange = (event) => {
        const formData = this.state.discountForm;
        formData[event.target.name].value = event.target.value;
        this.setState({ discountForm: formData })
    }

    componentWillMount() {
    }

    render() {
        const { classes } = this.props;
        const { fullScreen } = this.props;
        return (

            <React.Fragment>
                <div className="get-discount-popup">
                    <Dialog
                        fullScreen={fullScreen}
                        maxWidth={'md'}
                        open={this.props.open}
                        onClose={this.handleClose}
                    >
                        <DialogContent style={{paddingTop: window.innerWidth < 768? '0px': ''}}>

                            <div className={`${window.innerWidth < 768 ? 'sticky-discount-dialog-head' : ''}`}>
                                {window.innerWidth < 768 && <img
                                    src="/assets/cancel.svg"
                                    alt="close"
                                    style={{ float: 'right', cursor: 'pointer' }}
                                    onClick={this.props.close} />}
                                <div className={`${window.innerWidth < 768 ? 'gbui-h7' : 'gbui-h5'} success-gb text-centerD`}>
                                    {window.innerWidth > 767 && <img
                                        src="/assets/cancel.svg"
                                        alt="close"
                                        style={{ float: 'left', cursor: 'pointer' }}
                                        onClick={this.props.close} />}
                                    Get a discount on the policies you’re viewing right now!

                            </div>
                                <div className={`light-gb ${window.innerWidth < 768 ? 'gbui-body-2' : 'gbui-body-1'} text-centerD`}>
                                    Answer these questions and we’ll do our best to reduce  your premium.
                            </div>
                                <hr />
                            </div>

                            <form noValidate className="get-discount-table-form">

                                <Row>
                                    <Col
                                        sm="12"
                                        md="7">
                                        <p className={`${classes.formLabel} gbui-body-1`}>
                                            {window.innerWidth > 767 && <img src="/assets/help.svg" className={classes.helpIcon} alt="help" />}
                                            Whats your profession?
                                            {window.innerWidth < 768 && <img src="/assets/help.svg" className={classes.helpIconM} alt="help" />}
                                        </p>
                                    </Col>
                                    <Col
                                        sm="12"
                                        md="5">
                                        <FormControl className={classes.formControl} fullWidth>
                                            {/* <InputLabel htmlFor="max-width">maxWidth</InputLabel> */}
                                            <Select
                                                value={this.state.discountForm.profession.value}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'profession',
                                                    id: 'profession',
                                                }}
                                            >
                                                {this.state.professionList.map(item => <MenuItem value={item.value}>{item.name}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="7">
                                        <p className={`${classes.formLabel} gbui-body-1`}>
                                            {window.innerWidth > 767 && <img src="/assets/help.svg" className={classes.helpIcon} alt="help" />}
                                            Apply for Body Mass Index?
                                            {window.innerWidth < 768 && <img src="/assets/help.svg" className={classes.helpIconM} alt="help" />}
                                        </p>
                                    </Col>
                                    <Col sm="12" md="5">
                                        <FormControl component="fieldset" className={classes.formControl} row>
                                            <RadioGroup
                                                aria-label="Body Mass Index"
                                                name="bodyMassIndex"
                                                className={classes.group}
                                                value={this.state.discountForm.bodyMassIndex.value}
                                                row
                                            >
                                                <FormControlLabel
                                                    value="yes"
                                                    control={<Radio classes={{
                                                        root: classes.rootRadio,
                                                        checked: classes.checked,
                                                    }} color="primary" />}
                                                    label="Yes"
                                                    onClick={this.handleChange}
                                                />
                                                <FormControlLabel
                                                    value="no"
                                                    control={<Radio classes={{
                                                        root: classes.rootRadio,
                                                        checked: classes.checked,
                                                    }} color="primary" />}
                                                    label="No"
                                                    onClick={this.handleChange}
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="7">
                                        <p className={`${classes.formLabel} gbui-body-1`}>
                                            {window.innerWidth > 767 && <img src="/assets/help.svg" className={classes.helpIcon} alt="help" />}
                                            Enter your Height
                                            {window.innerWidth < 768 && <img src="/assets/help.svg" className={classes.helpIconM} alt="help" />}
                                        </p>
                                    </Col>
                                    <Col sm="12" md="5">
                                        <MuiThemeProvider theme={theme}>
                                            <TextField
                                                className={classes.margin}
                                                label="Enter Height"
                                                id="height-discount-dialog"
                                                name="height"
                                                value={this.state.discountForm.height.value}
                                                onChange={this.handleChange}
                                                fullWidth
                                            />
                                        </MuiThemeProvider>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="7">
                                        <p className={`${classes.formLabel} gbui-body-1`}>
                                            {window.innerWidth > 767 && <img src="/assets/help.svg" className={classes.helpIcon} alt="help" />}
                                            Enter your Weight
                                            {window.innerWidth < 768 && <img src="/assets/help.svg" className={classes.helpIconM} alt="help" />}
                                        </p>

                                    </Col>
                                    <Col sm="12" md="5">
                                        <MuiThemeProvider theme={theme}>
                                            <TextField
                                                className={classes.margin}
                                                label="Enter Weight"
                                                id="weight-discount-dialog"
                                                name="weight"
                                                value={this.state.discountForm.weight.value}
                                                onChange={this.handleChange}
                                                fullWidth
                                            />
                                        </MuiThemeProvider>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="7">
                                        <p className={`${classes.formLabel} gbui-body-1`}>
                                            {window.innerWidth > 767 && <img src="/assets/help.svg" className={classes.helpIcon} alt="help" />}
                                            Any running health insurance policy or had any health insurance policy?
                                            {window.innerWidth < 768 && <img src="/assets/help.svg" className={classes.helpIconM} alt="help" />}
                                        </p>

                                    </Col>
                                    <Col sm="12" md="5">
                                        <FormControl component="fieldset" className={classes.formControl} row>
                                            <RadioGroup
                                                aria-label="Previous Policy"
                                                name="prevHealthPolicy"
                                                className={classes.group}
                                                value={this.state.discountForm.prevHealthPolicy.value}
                                                row
                                            >
                                                <FormControlLabel
                                                    value="yes"
                                                    control={<Radio classes={{
                                                        root: classes.rootRadio,
                                                        checked: classes.checked,
                                                    }} color="primary" />}
                                                    label="Yes"
                                                    onClick={this.handleChange}
                                                />
                                                <FormControlLabel
                                                    value="no"
                                                    control={<Radio classes={{
                                                        root: classes.rootRadio,
                                                        checked: classes.checked,
                                                    }} color="primary" />}
                                                    label="No"
                                                    onClick={this.handleChange}
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Col>
                                </Row>
                                {this.state.discountForm.prevHealthPolicy.value === 'yes' &&
                                    <Row>
                                        <Col sm="12" md="7">
                                            <p className={`${classes.formLabel} gbui-body-1`}>
                                                {window.innerWidth > 767 && <img src="/assets/help.svg" className={classes.helpIcon} alt="help" />}
                                                Name of the running or previous Insurer
                                                {window.innerWidth < 768 && <img src="/assets/help.svg" className={classes.helpIconM} alt="help" />}
                                            </p>
                                        </Col>
                                        <Col sm="12" md="5">
                                            <FormControl className={classes.formControl} fullWidth>
                                                {/* <InputLabel htmlFor="max-width">maxWidth</InputLabel> */}
                                                <Select
                                                    value={this.state.discountForm.prevInsurer.value}
                                                    onChange={this.handleChange}
                                                    inputProps={{
                                                        name: 'prevInsurer',
                                                        id: 'prevInsurer',
                                                    }}
                                                >
                                                    {this.state.insurerList.map(item => <MenuItem value={item.value}>{item.name}</MenuItem>)}
                                                </Select>
                                            </FormControl>
                                        </Col>
                                    </Row>
                                }
                                {this.state.discountForm.prevHealthPolicy.value === 'yes' &&
                                    <Row>
                                        <Col sm="12" md="7">
                                            <p className={`${classes.formLabel} gbui-body-1`}>
                                                {window.innerWidth > 767 && <img src="/assets/help.svg" className={classes.helpIcon} alt="help" />}
                                                Running or Previous Policy Number
                                                {window.innerWidth < 768 && <img src="/assets/help.svg" className={classes.helpIconM} alt="help" />}
                                            </p>
                                        </Col>
                                        <Col sm="12" md="5">
                                            <MuiThemeProvider theme={theme}>
                                                <TextField
                                                    className={classes.margin}
                                                    label="Enter policy number"
                                                    id="policy-discount-dialog"
                                                    name="prevPolicyNo"
                                                    value={this.state.discountForm.prevPolicyNo.value}
                                                    onChange={this.handleChange}
                                                    fullWidth
                                                />
                                            </MuiThemeProvider>
                                        </Col>
                                    </Row>}
                                <Row>
                                    <Col sm="12" md="7">
                                        <p className={`${classes.formLabel} gbui-body-1`}>
                                            {window.innerWidth > 767 && <img src="/assets/help.svg" className={classes.helpIcon} alt="help" />}
                                            Any Claim raised in previous policy
                                            {window.innerWidth < 768 && <img src="/assets/help.svg" className={classes.helpIconM} alt="help" />}
                                        </p>

                                    </Col>
                                    <Col sm="12" md="5">
                                        <FormControl component="fieldset" className={classes.formControl} row>
                                            <RadioGroup
                                                aria-label="Claim Raised"
                                                name="claimPrevPolicy"
                                                className={classes.group}
                                                value={this.state.discountForm.claimPrevPolicy.value}
                                                row
                                            >
                                                <FormControlLabel
                                                    value="yes"
                                                    control={<Radio classes={{
                                                        root: classes.rootRadio,
                                                        checked: classes.checked,
                                                    }} color="primary" />}
                                                    label="Yes"
                                                    onClick={this.handleChange}
                                                />
                                                <FormControlLabel
                                                    value="no"
                                                    control={<Radio classes={{
                                                        root: classes.rootRadio,
                                                        checked: classes.checked,
                                                    }} color="primary" />}
                                                    label="No"
                                                    onClick={this.handleChange}
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="7">
                                        <p className={`${classes.formLabel} gbui-body-1`}>
                                            {window.innerWidth > 767 && <img src="/assets/help.svg" className={classes.helpIcon} alt="help" />}
                                            Any personal habit
                                            {window.innerWidth < 768 && <img src="/assets/help.svg" className={classes.helpIconM} alt="help" />}
                                        </p>

                                    </Col>
                                    <Col sm="12" md="5">
                                        <FormControl className={classes.formControl} fullWidth>
                                            {/* <InputLabel htmlFor="max-width">maxWidth</InputLabel> */}
                                            <Select
                                                value={this.state.discountForm.presonalHabbit.value}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'presonalHabbit',
                                                    id: 'presonalHabbit',
                                                }}
                                            >
                                                {this.state.habitList.map(item => <MenuItem value={item.value}>{item.name}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="7" sm="12">
                                        <p className={`${classes.formLabel} gbui-body-1`}>
                                            {window.innerWidth > 767 && <img src="/assets/help.svg" className={classes.helpIcon} alt="help" />}
                                            Apply for Co-Pay Discount?
                                            {window.innerWidth < 768 && <img src="/assets/help.svg" className={classes.helpIconM} alt="help" />}
                                        </p>

                                    </Col>
                                    <Col md="5" sm="12">
                                        <FormControl className={classes.formControl} fullWidth>
                                            {/* <InputLabel htmlFor="max-width">maxWidth</InputLabel> */}
                                            <Select
                                                value={this.state.discountForm.coPay.value}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'coPay',
                                                    id: 'coPay',
                                                }}
                                            >
                                                {this.state.coPayList.map(item => <MenuItem value={item.value}>{item.name}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="7" sm="12">
                                        <p className={`${classes.formLabel} gbui-body-1`}>
                                            {window.innerWidth > 767 && <img src="/assets/help.svg" className={classes.helpIcon} alt="help" />}
                                            Policy Term Discount?<br />
                                            <p className={` success-gb gbui-caption-3`} style={{ marginLeft: window.innerWidth > 767 ? '1.7rem' : 'none' }}>
                                                You can avail discount by increasing your term period
                                                    </p>
                                            {window.innerWidth < 768 && <img src="/assets/help.svg" className={classes.helpIconM} alt="help" />}
                                        </p>

                                    </Col>
                                    <Col md="5" sm="12">
                                        <FormControl className={classes.formControl} fullWidth>
                                            {/* <InputLabel htmlFor="max-width">maxWidth</InputLabel> */}
                                            <Select
                                                value={this.state.discountForm.termDiscount.value}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'termDiscount',
                                                    id: 'termDiscount',
                                                }}
                                            >
                                                {this.state.termList.map(item => <MenuItem value={item.value}>{item.name}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Col>
                                </Row>
                                {window.innerWidth < 768 && <div><br/><br/><br/></div>}


                                <div style={{ textAlign: 'center', width: '100%', }} className={window.innerWidth < 768 ? classes.fixApplyButton: ''}>
                                    <Button 
                                        variant="contained"
                                        className={classNames(classes.cssRoot)}>Apply Discount
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </React.Fragment >

        )
    }
}

GetDiscount.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    inputFormHealthData: state.inputFormHealth.inputFormHealthData,
})

export default connect(mapStateToProps)(withStyles(styles)(withMobileDialog()(GetDiscount)));
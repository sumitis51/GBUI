import React from 'react'
import Panel from 'muicss/lib/react/panel'
import { connect } from 'react-redux'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import CalendarToday from '@material-ui/icons/CalendarToday'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'

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
            color: '#0da176 !important',
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
        color: '#0da176 !important'
    },
    text_field: {
        color: 'black',
        display: 'block',
        marginTop: '0px',
        marginLeft: '8px'
    },
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#0da176',
        '&:hover': {
            backgroundColor: '#0da176',
        },
        padding: '12px 36px',
        marginTop: '1rem'
    }
});


class VehicleDetails extends React.Component {

    state = {
        reg_no: '',
        car_on_loan: 'yes',
        loan_provider: '',
        cover_value: '',
        engine_no: '',
        chaisis_no: '',
        reg_date: '',
        manufacturing_month_year: '',
        vehicle_flag_init: true,
        insurer_names: [
            { label: 'Loan Provider', value: '' },
            { label: 'Name 1', value: '1' },
            { label: 'Name 2', value: '2' },
            { label: 'Name 3', value: '3' }
        ],
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        if (this.state.vehicle_flag_init) this.setState({ vehicle_flag_init: false })
    };
    render() {
        const { classes } = this.props;
        return (
            <div className="vehicle-detail-parent">
                <Panel>
                    {(this.props.step < 3 && this.state.vehicle_flag_init) &&
                        <Row>
                            <Col md="11">
                                <p className="step-details">Step 4 of 4</p>
                                <p className="step-name">Previous Policy Details</p>
                            </Col>
                            <Col md="1">
                                <p className="edit">Edit</p>
                            </Col>
                        </Row>
                    }

                    {(this.props.step === 3) &&
                        <div className="form-vehicle-details">
                            <h3 className="personal-details-heading">Previous Policy Details</h3>
                            <p className="step-detail-success">Step 3 of 4</p>
                            <hr />
                            <form noValidate autoComplete={false} style={{marginRight: window.innerWidth < 768? '10px':'' }}>
                                <Row>
                                    <Col md="5">
                                        {/* Vehicle Registration Number */}
                                        <FormControl fullWidth>
                                            <TextField
                                                id="reg_no"
                                                label="Registration Number"
                                                value={this.state.reg_no}
                                                onChange={this.handleChange}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="reg_no"
                                                margin="normal"
                                                fullWidth
                                            />
                                        </FormControl>
                                        {/* Car on Loan */}
                                        <FormControl className={classes.formControl} margin="dense">
                                            <FormLabel
                                                component="legend"
                                                classes={{
                                                    root: classes.label2,
                                                    focused: classes.focused_label
                                                }}>Car on Loan</FormLabel>
                                            <RadioGroup
                                                aria-label="Car on Loan"
                                                name="car_on_loan"
                                                className={classes.group}
                                                value={this.state.car_on_loan}
                                                onChange={this.handleChange}
                                                row
                                            >
                                                <FormControlLabel value="yes" control={<Radio classes={{
                                                    root: classes.root,
                                                    checked: classes.checked,
                                                }} />} label="Yes" />
                                                <FormControlLabel value="no" control={<Radio classes={{
                                                    root: classes.root,
                                                    checked: classes.checked,
                                                }} />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                        {/* Loan Provider */}
                                        <FormControl className="loan_provider">
                                            <TextField
                                                id="loan_provider"
                                                select
                                                label=""
                                                className={classes.textField}
                                                value={this.state.loan_provider}
                                                onChange={this.handleChange}
                                                SelectProps={{
                                                    native: true,
                                                    MenuProps: {
                                                        className: classes.menu,
                                                    },
                                                }}
                                                helperText=""
                                                margin="dense"
                                                name="loan_provider"
                                                fullWidth
                                            >
                                                {this.state.insurer_names.map((option, index) => (
                                                    index === 0 ? <option key={option.value} value={option.value} disabled>
                                                        {option.label}
                                                    </option> : <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                ))}
                                            </TextField>
                                        </FormControl>
                                        {/* Cover Value */}
                                        <FormControl fullWidth>
                                            <TextField
                                                id="cover_value"
                                                label="Cover Value(IDV)"
                                                value={this.state.cover_value}
                                                onChange={this.handleChange}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="cover_value"
                                                margin="normal"
                                                fullWidth
                                                helperText="Cover Value between Rs. 123456 to Rs. 1234567"
                                            />
                                        </FormControl>
                                    </Col>
                                    <Col md="1"></Col>
                                    <Col md="5">
                                        {/* Engine Number */}
                                        <FormControl fullWidth>
                                            <TextField
                                                id="engine_no"
                                                label="Engine Number"
                                                value={this.state.engine_no}
                                                onChange={this.handleChange}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="engine_no"
                                                margin="normal"
                                                fullWidth
                                                helperText=""
                                            />
                                        </FormControl>
                                        {/* Chaisis Number */}
                                        <FormControl fullWidth>
                                            <TextField
                                                id="chaisis_no"
                                                label="Chaisis Number"
                                                value={this.state.chaisis_no}
                                                onChange={this.handleChange}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="chaisis_no"
                                                margin="normal"
                                                fullWidth
                                                helperText=""
                                            />
                                        </FormControl>
                                        {/* Vehicle Reg Date */}
                                        <FormControl className={classNames(classes.margin, classes.textField)} style={{marginLeft: '6px'}} fullWidth>
                                            <InputLabel htmlFor="reg_date">Vehicle Registration Date</InputLabel>
                                            <Input
                                                id="reg_date"
                                                value={this.state.reg_date}
                                                onChange={this.handleChange}
                                                name="reg_date"
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="Toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                        >
                                                          <CalendarToday />   
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                fullWidth
                                            />
                                        </FormControl>
                                        {/* Vehicle Manufacturing year and month */}
                                        <FormControl className={classNames(classes.margin, classes.textField)} style={{marginLeft: '6px'}} fullWidth>
                                            <InputLabel htmlFor="manufacturing_month_year">Vehicle Manufacturing Month & Year</InputLabel>
                                            <Input
                                                id="manufacturing_month_year"
                                                value={this.state.manufacturing_month_year}
                                                onChange={this.handleChange}
                                                name="manufacturing_month_year"
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="Toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                        >
                                                          <CalendarToday />   
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                fullWidth
                                            />
                                        </FormControl>
                                    </Col>
                                </Row>
                            </form>
                            {/* // Button next */}
                            <div className="button-next">
                                <Button
                                    className={classNames(classes.buttonRoot3)}>
                                    Submit
                            </Button>
                            </div>
                        </div>
                    }
                </Panel>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    step: state.proposal_form_motor.step
})

const mapDispatchToProps = dispatch => ({
    setStep: step => dispatch({ type: 'SET_STEP', step })
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VehicleDetails))
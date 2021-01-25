import React from 'react'
import Panel from 'muicss/lib/react/panel'
import { connect } from 'react-redux'
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
import Button from '@material-ui/core/Button'
import classNames from 'classnames'

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
class OwnerDetails extends React.Component {

    state = {
        company_owned: 'yes',
        gst_number: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        email_id: '',
        phone: '',
        adhar_no: ''
    }


    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const { classes } = this.props;
        return (
            <div className="owner-detail-parent">
                <Panel>
                    {this.props.step === 0 &&
                        <div className="show-form">
                            <h3 className="owner-details-heading">Car Owner’s Details</h3>
                            <p className="step-detail-success">Step 1 of 4</p>
                            <hr />
                            <form noValidate autoComplete="off" style={{ marginRight: window.innerWidth < 768 ? '10px' : '' }}>
                                <Row>
                                    <Col md="5">
                                        <FormControl className={classes.formControl} fullWidth>
                                            <FormLabel
                                                component="legend"
                                                classes={{
                                                    root: classes.label,
                                                    focused: classes.focused_label
                                                }}>Company Owned</FormLabel>
                                            <RadioGroup
                                                aria-label="Company Owned"
                                                name="company_owned"
                                                className={classes.group}
                                                value={this.state.company_owned}
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
                                        {/* GST NUMBER */}
                                        <FormControl fullWidth>
                                            <TextField
                                                id="gst_number"
                                                label="GST Number"
                                                value={this.state.gst_number}
                                                onChange={this.handleChange}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="gst_number"
                                                margin="normal"
                                                fullWidth
                                            />
                                        </FormControl>
                                        {/* First name */}
                                        <FormControl className={window.innerWidth > 767 ? "fixed-width-fn" : ""} fullWidth={window.innerWidth < 768}>
                                            <TextField
                                                id="first_name"
                                                label="First Name"
                                                value={this.state.first_name}
                                                onChange={this.handleChange}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="first_name"
                                                margin="dense"
                                                fullWidth={window.innerWidth < 768}
                                            />
                                        </FormControl>
                                        {/* Middle name */}
                                        <FormControl className={window.innerWidth > 767 ? "fixed-width-mn" : ""} fullWidth={window.innerWidth < 768}>
                                            <TextField
                                                id="middle_name"
                                                label="Middle Name"
                                                value={this.state.middle_name}
                                                onChange={this.handleChange}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="middle_name"
                                                margin="dense"
                                                fullWidth={window.innerWidth < 768}
                                            />
                                        </FormControl>
                                        {/* First name */}
                                        <FormControl className={window.innerWidth > 767 ? "fixed-width-ln" : ""} fullWidth={window.innerWidth < 768}>
                                            <TextField
                                                id="last_name"
                                                label="Last Name"
                                                value={this.state.last_name}
                                                onChange={this.handleChange}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="last_name"
                                                margin="dense"
                                                fullWidth={window.innerWidth < 768}
                                            />
                                        </FormControl>
                                    </Col>
                                    <Col md="1"></Col>
                                    <Col md="5">
                                        {/* Email Id */}
                                        <FormControl fullWidth>
                                            <TextField
                                                id="email_id"
                                                label="Email Id"
                                                value={this.state.email_id}
                                                onChange={this.handleChange}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="email_id"
                                                margin="normal"
                                                fullWidth
                                            />
                                        </FormControl>
                                        {/* Phone Number */}
                                        <FormControl fullWidth>
                                            <TextField
                                                id="phone"
                                                label="phone"
                                                value={this.state.phone}
                                                onChange={this.handleChange}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="phone"
                                                margin="normal"
                                                fullWidth
                                            />
                                        </FormControl>
                                        {/* Adhar Card Number */}
                                        <FormControl fullWidth>
                                            <TextField
                                                id="adhar_no"
                                                label="adhar_no"
                                                value={this.state.adhar_no}
                                                onChange={this.handleChange}
                                                classes={{
                                                    root: classes.text_field
                                                }}
                                                name="adhar_no"
                                                margin="normal"
                                                fullWidth
                                            />
                                        </FormControl>
                                    </Col>
                                </Row>
                            </form>

                            {/* Button Next details */}
                            <div className="button-next">
                                <Button
                                    className={classNames(classes.buttonRoot3)}
                                    onClick={() => { this.props.setStep(1); }}>
                                    Continue to Personal Detail
                        </Button>
                            </div>
                        </div>
                    }

                    {/* Here show details after form filled */}
                    {this.props.step > 0 &&
                        <div className="owner_show_details">
                            <Row>
                                <Col md="11" sm="10" xs="10">
                                    <h3 className="step-detail">Step 1 of 4</h3>
                                    <h3 className="owners-heading">Car Owner’s Details</h3>
                                </Col>
                                <Col md="1" sm="2" xs="2">
                                    <h3
                                        className="edit"
                                        onClick={() => { this.props.setStep(0) }}>Edit</h3>
                                </Col>
                            </Row>
                            <div className="mui--hidden-xs mui--hidden-sm"><hr /></div>
                            <div className="mui--hidden-lg mui--hidden-xl mui--hidden-md"><hr style={{ marginTop: '-2px' }} /></div>

                            {/* Here details of filled elements */}
                            <div className="desktop-data mui--hidden-sm mui--hidden-xs">
                                <Row>
                                    <Col md="4">
                                        <p className="key-name">Company Owned:</p>
                                        <p className="key-value">{this.state.company_owned}</p>
                                    </Col>
                                    <Col md="4">
                                        <p className="key-name">Full Name:</p>
                                        <p className="key-value">{`${this.state.first_name} ${this.state.middle_name} ${this.state.last_name}`}</p>
                                    </Col>
                                    <Col md="4">
                                        <p className="key-name">Phone Number:</p>
                                        <p className="key-value">{this.state.phone}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <p className="key-name">GST Number:</p>
                                        <p className="key-value">{this.state.gst_number}</p>
                                    </Col>
                                    <Col md="4">
                                        <p className="key-name">Email Name:</p>
                                        <p className="key-value">{this.state.email_id}</p>
                                    </Col>
                                    <Col md="4">
                                        <p className="key-name">Aadhar Card:</p>
                                        <p className="key-value">{this.state.adhar_no}</p>
                                    </Col>
                                </Row>
                            </div>
                            {/* Mobile view */}
                            <div className="mui--hidden-lg mui--hidden-md mui--hidden-xl">
                                <table className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                                    <tbody>
                                        <tr>
                                            <td>
                                                Company Owned:
                                            </td>
                                            <td>
                                                {this.state.company_owned}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                GST Number:
                                            </td>
                                            <td>
                                                {this.state.gst_number}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Full Name:
                                            </td>
                                            <td>
                                                {`${this.state.first_name} ${this.state.middle_name} ${this.state.last_name}`}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Email Id:
                                            </td>
                                            <td>
                                                {this.state.email_id}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Phone Number:
                                            </td>
                                            <td>
                                                {this.state.phone}
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
    step: state.proposal_form_motor.step
})

const mapDispatchToProps = dispatch => ({
    setStep: step => dispatch({ type: 'SET_STEP', step })
})

OwnerDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OwnerDetails))
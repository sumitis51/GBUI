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
        color: '#000000',
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


class PreviousPolicyDetails extends React.Component {

    state = {
        prev_insurer_name: '',
        prev_policy_no: '',
        prev_policy_type: '',
        prev_insurer_expiry_date: '',
        ncb: '',
        ownership_change: 'yes',
        insurer_names: [
            { label: 'Previous Insurer Name', value: '' },
            { label: 'Name 1', value: '1' },
            { label: 'Name 2', value: '2' },
            { label: 'Name 3', value: '3' }
        ],
        ncb_items: [
            { label: 'NCB%', value: '' },
            { label: '20%', value: '20' },
            { label: '30%', value: '30' },
            { label: '50%', value: '50' }
        ],
        prev_flag_init: true,
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        if (this.state.prev_flag_init) this.setState({ prev_flag_init: false })
    };

    render() {
        const { classes } = this.props;
        return (
            <div className="previous-policy-detail-parent">
                <Panel>
                    {this.props.step < 3 &&
                        <div className="prev-show-form">
                            {(this.props.step < 2 && this.state.prev_flag_init) &&
                                <Row>
                                    <Col md="11">
                                        <p className="step-details">Step 3 of 4</p>
                                        <p className="step-name">Previous Policy Details</p>
                                    </Col>
                                    <Col md="1">
                                        <p className="edit">Edit</p>
                                    </Col>
                                </Row>
                            }

                            {(this.props.step === 2) &&
                                <div className="form-personal-details">
                                    <h3 className="personal-details-heading">Previous Policy Details</h3>
                                    <p className="step-detail-success">Step 3 of 4</p>
                                    <hr />
                                    <form noValidate autoComplete={false} style={{ marginRight: window.innerWidth < 768 ? '10px' : '' }}>
                                        <Row>
                                            <Col md="5">
                                                {/* Previous Insurer Name */}
                                                <FormControl fullWidth className="prev-insurer-name">
                                                    <TextField
                                                        id="prev_insurer_name"
                                                        select
                                                        label=""
                                                        className={classes.textField}
                                                        value={this.state.prev_insurer_name}
                                                        onChange={this.handleChange}
                                                        SelectProps={{
                                                            native: true,
                                                            MenuProps: {
                                                                className: classes.menu,
                                                            },
                                                        }}
                                                        helperText=""
                                                        margin="dense"
                                                        name="prev_insurer_name"
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
                                                {/* Previous Policy Number */}
                                                <FormControl fullWidth>
                                                    <TextField
                                                        id="prev_policy_no"
                                                        label="Previous Policy Number"
                                                        value={this.state.prev_policy_no}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="prev_policy_no"
                                                        margin="normal"
                                                        fullWidth
                                                    />
                                                </FormControl>
                                                {/* Previous Policy type */}
                                                <FormControl fullWidth>
                                                    <TextField
                                                        id="prev_policy_type"
                                                        label="Previous Policy Type"
                                                        value={this.state.prev_policy_type}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="prev_policy_type"
                                                        margin="normal"
                                                        fullWidth
                                                    />
                                                </FormControl>
                                            </Col>
                                            <Col md="1"></Col>
                                            <Col md="5">
                                                {/* Previous Insurer expiry date */}
                                                <FormControl fullWidth>
                                                    <TextField
                                                        id="prev_insurer_expiry_date"
                                                        label="Previous Insurance Expiry Date"
                                                        value={this.state.prev_insurer_expiry_date}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="prev_insurer_expiry_date"
                                                        margin="normal"
                                                        fullWidth
                                                    />
                                                </FormControl>
                                                {/* NCB% */}
                                                <FormControl fullWidth className="prev-insurer-name">
                                                    <TextField
                                                        id="ncb"
                                                        select
                                                        label=""
                                                        className={classes.textField}
                                                        value={this.state.ncb}
                                                        onChange={this.handleChange}
                                                        SelectProps={{
                                                            native: true,
                                                            MenuProps: {
                                                                className: classes.menu,
                                                            },
                                                        }}
                                                        helperText=""
                                                        margin="dense"
                                                        name="ncb"
                                                        fullWidth
                                                    >
                                                        {this.state.ncb_items.map((option, index) => (
                                                            index === 0 ? <option key={option.value} value={option.value} disabled>
                                                                {option.label}
                                                            </option> : <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                        ))}
                                                    </TextField>
                                                </FormControl>
                                                {/* Ownership changed */}
                                                <FormControl className={classes.formControl} margin="dense" fullWidth>
                                                    <FormLabel
                                                        component="legend"
                                                        classes={{
                                                            root: classes.label2,
                                                            focused: classes.focused_label
                                                        }}>Ownership Changed in last 12 months</FormLabel>
                                                    <RadioGroup
                                                        aria-label="Ownership Changed in last 12 months"
                                                        name="ownership_change"
                                                        className={classes.group}
                                                        value={this.state.ownership_change}
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
                                            </Col>
                                        </Row>
                                    </form>
                                    {/* // Button next */}
                                    <div className="button-next">
                                        <Button
                                            className={classNames(classes.buttonRoot3)}
                                            onClick={() => {
                                                this.props.setStep(3);
                                                this.setState({ prev_flag_init: false })
                                            }}>
                                            Continue to Vehicle Detail
                                        </Button>
                                    </div>
                                </div>
                            }
                        </div>
                    }

                    {/* show details here */}
                    {this.props.step > 2 && <div className="previous-show-details">
                        <Row>
                            <Col md="11" sm="10" xs="10">
                                <h3 className="step-detail">Step 3 of 4</h3>
                                <h3 className="personal-heading">Previous Policy Details</h3>
                            </Col>
                            <Col md="1" sm="2" xs="2">
                                <h3
                                    className="edit"
                                    onClick={() => { this.props.setStep(2) }}>Edit</h3>
                            </Col>
                        </Row>
                        <hr />
                        <div className="desktop-data mui--hidden-xs mui--hidden-sm">
                            <Row>
                                <Col md="4">
                                    <p className="key-name">Previous Insurer Name:</p>
                                    <p className="key-value">{this.state.prev_insurer_name}</p>
                                    <p className="key-name">Previous Policy Number:</p>
                                    <p className="key-value">{this.state.prev_policy_no}</p>
                                </Col>
                                <Col md="4">
                                    <p className="key-name">Previous Policy Type:</p>
                                    <p className="key-value">{this.state.prev_policy_type}</p>
                                    <p className="key-name">Previous Insurance Expiry Date:</p>
                                    <p className="key-value">{this.state.prev_insurer_expiry_date}</p>
                                </Col>
                                <Col md="4">
                                    <p className="key-name">NCB%:</p>
                                    <p className="key-value">{this.state.ncb}</p>
                                    <p className="key-name">Ownership Changed in last 12 months:</p>
                                    <p className="key-value">{this.state.ownership_change}</p>
                                </Col>
                            </Row>
                        </div>
                        {/* For Mobile View */}
                        {/* Table */}
                        <table className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                            <tbody>
                                <tr>
                                    <td>
                                        Previous Insurer Name:
                                </td>
                                    <td>
                                        {this.state.prev_insurer_name}
                                </td>
                                </tr>
                                <tr>
                                    <td>
                                        Previous Policy Number:
                                </td>
                                    <td>
                                        {this.state.prev_policy_no}
                                </td>
                                </tr>
                                <tr>
                                    <td>
                                        Previous Policy Type:
                                </td>
                                    <td>
                                        {this.state.prev_policy_type}
                                </td>
                                </tr>
                                <tr>
                                    <td>
                                        Previous Insurance Expiry Date:
                                </td>
                                    <td>
                                        {this.state.prev_insurer_expiry_date}
                                </td>
                                </tr>
                                <tr>
                                    <td>
                                        NCB%:
                                </td>
                                    <td>
                                        {this.state.ncb}
                                </td>
                                </tr>
                                <tr>
                                    <td>
                                        Ownership Changed in last 12 months:
                                </td>
                                    <td>
                                        {this.state.ownership_change}
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

PreviousPolicyDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    step: state.proposal_form_motor.step
})

const mapDispatchToProps = dispatch => ({
    setStep: step => dispatch({ type: 'SET_STEP', step })
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PreviousPolicyDetails))
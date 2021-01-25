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

import './personal.css'


const styles = theme => ({
    formControl: {
        margin: 0,
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
    },
    labelFrm: {
        marginRight: '10px'
    }
});
class PersonalDetails extends React.Component {

    state = {
        gender: 'male',
        married: 'yes',
        dob: '',
        address: '',
        nominee_name: '',
        nominee_age: '',
        nominee_relation: '',
        pincode: '',
        city: '',
        state: '',
        relations: [
            { label: 'Nominee Relation', value: '' },
            { label: 'Relation 1', value: '1' },
            { label: 'Relation 2', value: '2' },
            { label: 'Relation 3', value: '3' }
        ],
        personal_flag_init: true,

    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        if (this.state.personal_flag_init) this.setState({ personal_flag_init: false })
    };

    render() {
        const { classes } = this.props;
        return (
            <div className="personal-detail-parent">
                <Panel>
                    {this.props.step < 4 &&
                        <div className="show-from">
                            {(this.props.step < 1 && this.state.personal_flag_init) &&
                                <Row>
                                    <Col md="11">
                                        <p className="step-details">Step 2 of 4</p>
                                        <p className="step-name">Personal Details</p>
                                    </Col>
                                    <Col md="1">
                                        <p className="edit">Edit</p>
                                    </Col>
                                </Row>
                            }
                            {(this.props.step === 1) &&
                                <div className="form-personal-details">
                                    <h3 className="personal-details-heading">Personal Details</h3>
                                    <p className="step-detail-success">Step 2 of 4</p>
                                    <hr />
                                    <form noValidate autoComplete={false} className="mui--hidden-xs mui--hidden-sm" style={{ marginRight: window.innerWidth < 768 ? '10px' : '' }}>
                                        <Row>
                                            <Col md="5" sm="12" xs="12">
                                                {/* Gender */}
                                                <FormControl className={classes.formControl}>
                                                    <FormLabel
                                                        component="legend"
                                                        classes={{
                                                            root: classes.label,
                                                            focused: classes.focused_label
                                                        }}>Gender</FormLabel>
                                                    <RadioGroup
                                                        aria-label="Gender"
                                                        name="gender"
                                                        className={classes.group}
                                                        value={this.state.gender}
                                                        onChange={this.handleChange}
                                                        row
                                                    >
                                                        <FormControlLabel value="male" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label="Male" />
                                                        <FormControlLabel value="female" control={<Radio classes={{
                                                            root: classes.root,
                                                            checked: classes.checked,
                                                        }} />} label="Female" />
                                                    </RadioGroup>
                                                </FormControl>
                                                {/* Married */}
                                                <FormControl className={classes.formControl} style={{ borderLeft: '1px solid #333', paddingLeft: '15px' }}>
                                                    <FormLabel
                                                        component="legend"
                                                        classes={{
                                                            root: classes.label,
                                                            focused: classes.focused_label
                                                        }}>Married</FormLabel>
                                                    <RadioGroup
                                                        aria-label="Married"
                                                        name="married"
                                                        className={classes.group}
                                                        value={this.state.married}
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
                                                {/* DOB */}
                                                <FormControl fullWidth>
                                                    <TextField
                                                        id="dob"
                                                        label="Your Date of Birth"
                                                        value={this.state.dob}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="dob"
                                                        margin="normal"
                                                        fullWidth
                                                    />
                                                </FormControl>

                                                {/* Communication Address */}
                                                <FormLabel className="address-label">Communication Address</FormLabel>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        id="dob"
                                                        label=""
                                                        value={this.state.address}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="dob"
                                                        margin="normal"
                                                        fullWidth
                                                        rows="5"
                                                        multiline
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </Col>
                                            <Col md="1"></Col>
                                            <Col md="5">
                                                {/* Nominee NAme */}
                                                <FormControl fullWidth>
                                                    <TextField
                                                        id="nominee_name"
                                                        label="Nominee Name"
                                                        value={this.state.nominee_name}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="nominee_name"
                                                        margin="normal"
                                                        fullWidth
                                                    />
                                                </FormControl>
                                                {/* Nominee Age */}
                                                <FormControl fullWidth>
                                                    <TextField
                                                        id="nominee_age"
                                                        label="Nominee Age"
                                                        value={this.state.nominee_age}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="nominee_age"
                                                        margin="normal"
                                                        fullWidth
                                                    />
                                                </FormControl>
                                                {/* Nominee Relation */}
                                                <FormControl fullWidth className="nominee-relation">
                                                    <TextField
                                                        id="nominee_relation"
                                                        select
                                                        label=""
                                                        className={classes.textField}
                                                        value={this.state.nominee_relation}
                                                        onChange={this.handleChange}
                                                        SelectProps={{
                                                            native: true,
                                                            MenuProps: {
                                                                className: classes.menu,
                                                            },
                                                        }}
                                                        helperText=""
                                                        margin="dense"
                                                        name="nominee_relation"
                                                        fullWidth
                                                    >
                                                        {this.state.relations.map((option, index) => (
                                                            index === 0 ? <option key={option.value} value={option.value} disabled>
                                                                {option.label}
                                                            </option> : <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                        ))}
                                                    </TextField>
                                                </FormControl>

                                                {/* Pincode */}
                                                <FormControl style={{ width: '124px' }}>
                                                    <TextField
                                                        id="pincode"
                                                        label="Pincode"
                                                        value={this.state.pincode}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="pincode"
                                                        margin="dense"
                                                    />
                                                </FormControl>
                                                {/* Middle name */}
                                                <FormControl style={{ float: 'right', width: ' 124px' }}>
                                                    <TextField
                                                        id="city"
                                                        label="City"
                                                        value={this.state.city}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="city"
                                                        margin="dense"
                                                    />
                                                </FormControl>
                                                {/* First name */}
                                                <FormControl style={{ width: '124px', display: 'block' }}>
                                                    <TextField
                                                        id="state"
                                                        label="State"
                                                        value={this.state.state}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="state"
                                                        margin="dense"
                                                    />
                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </form>
                                    {/* For Mobile View */}
                                    <form noValidate autoComplete={false} className="mui--hidden-lg mui--hidden-md mui--hidden-xl" style={{ marginRight: window.innerWidth < 768 ? '10px' : '' }}>
                                        <Row>
                                            <Col sm="12" xs="12">
                                                <Row style={{ marginLeft: '0px' }}>
                                                    <Col sm="6" xs="6" style={{ padding: '0px', paddingLeft: '0px' }}>
                                                        {/* Gender */}
                                                        <FormControl className={classes.formControl}>
                                                            <FormLabel
                                                                component="legend"
                                                                classes={{
                                                                    root: classes.label,
                                                                    focused: classes.focused_label
                                                                }}>Gender</FormLabel>
                                                            <RadioGroup
                                                                aria-label="Gender"
                                                                name="gender"
                                                                className={classes.group}
                                                                value={this.state.gender}
                                                                onChange={this.handleChange}
                                                                row
                                                            >
                                                                <FormControlLabel classes={{ root: classes.labelFrm }} value="male" control={<Radio classes={{
                                                                    root: classes.root,
                                                                    checked: classes.checked,
                                                                }} />} label="Male" />
                                                                <FormControlLabel classes={{ root: classes.labelFrm }} value="female" control={<Radio classes={{
                                                                    root: classes.root,
                                                                    checked: classes.checked,
                                                                }} />} label="Female" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Col>
                                                    <Col sm="6" xs="6" style={{ padding: '0px' }}>
                                                        {/* Married */}
                                                        <FormControl className={classes.formControl} style={{ borderLeft: '1px solid #333', paddingLeft: '15px' }}>
                                                            <FormLabel
                                                                component="legend"
                                                                classes={{
                                                                    root: classes.label,
                                                                    focused: classes.focused_label
                                                                }}>Married</FormLabel>
                                                            <RadioGroup
                                                                aria-label="Married"
                                                                name="married"
                                                                className={classes.group}
                                                                value={this.state.married}
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
                                                {/* DOB */}
                                                <FormControl fullWidth>
                                                    <TextField
                                                        id="dob"
                                                        label="Your Date of Birth"
                                                        value={this.state.dob}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="dob"
                                                        margin="normal"
                                                        fullWidth
                                                    />
                                                </FormControl>
                                                {/* Nominee NAme */}
                                                <FormControl fullWidth>
                                                    <TextField
                                                        id="nominee_name"
                                                        label="Nominee Name"
                                                        value={this.state.nominee_name}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="nominee_name"
                                                        margin="normal"
                                                        fullWidth
                                                    />
                                                </FormControl>
                                                {/* Nominee Age */}
                                                <FormControl fullWidth>
                                                    <TextField
                                                        id="nominee_age"
                                                        label="Nominee Age"
                                                        value={this.state.nominee_age}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="nominee_age"
                                                        margin="normal"
                                                        fullWidth
                                                    />
                                                </FormControl>
                                                {/* Nominee Relation */}
                                                <FormControl fullWidth className="nominee-relation">
                                                    <TextField
                                                        id="nominee_relation"
                                                        select
                                                        label=""
                                                        className={classes.textField}
                                                        value={this.state.nominee_relation}
                                                        onChange={this.handleChange}
                                                        SelectProps={{
                                                            native: true,
                                                            MenuProps: {
                                                                className: classes.menu,
                                                            },
                                                        }}
                                                        helperText=""
                                                        margin="dense"
                                                        name="nominee_relation"
                                                        fullWidth
                                                    >
                                                        {this.state.relations.map((option, index) => (
                                                            index === 0 ? <option key={option.value} value={option.value} disabled>
                                                                {option.label}
                                                            </option> : <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                        ))}
                                                    </TextField>
                                                </FormControl>

                                                {/* Communication Address */}
                                                <FormLabel className="address-label">Communication Address</FormLabel>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        id="dob"
                                                        label=""
                                                        value={this.state.address}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="dob"
                                                        margin="normal"
                                                        fullWidth
                                                        rows="5"
                                                        multiline
                                                        variant="outlined"
                                                    />
                                                </FormControl>
                                            </Col>
                                            <Col md="1"></Col>
                                            <Col md="5">


                                                {/* Pincode */}
                                                <FormControl style={{ width: '124px' }}>
                                                    <TextField
                                                        id="pincode"
                                                        label="Pincode"
                                                        value={this.state.pincode}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="pincode"
                                                        margin="dense"
                                                    />
                                                </FormControl>
                                                {/* Middle name */}
                                                <FormControl style={{ float: 'right', width: ' 124px' }}>
                                                    <TextField
                                                        id="city"
                                                        label="City"
                                                        value={this.state.city}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="city"
                                                        margin="dense"
                                                    />
                                                </FormControl>
                                                {/* First name */}
                                                <FormControl style={{ width: '124px', display: 'block' }}>
                                                    <TextField
                                                        id="state"
                                                        label="State"
                                                        value={this.state.state}
                                                        onChange={this.handleChange}
                                                        classes={{
                                                            root: classes.text_field
                                                        }}
                                                        name="state"
                                                        margin="dense"
                                                    />
                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </form>

                                    {/* // Button next */}
                                    <div className="button-next">
                                        <Button
                                            className={classNames(classes.buttonRoot3)}
                                            onClick={() => {
                                                this.props.setStep(2);
                                                this.setState({ personal_flag_init: false })
                                            }}>
                                            Continue to Previous Policy Detail
                                </Button>
                                    </div>
                                </div>
                            }

                            {/* Now show form details */}
                            {this.props.step > 1 &&
                                <div className="personal-show-details">
                                    <Row>
                                        <Col md="11" sm="10" xs="10">
                                            <h3 className="step-detail">Step 2 of 4</h3>
                                            <h3 className="personal-heading">Personal Details</h3>
                                        </Col>
                                        <Col md="1" sm="2" xs="2">
                                            <h3
                                                className="edit"
                                                onClick={() => { this.props.setStep(1) }}>Edit</h3>
                                        </Col>
                                    </Row>
                                    <div className="mui--hidden-xs mui--hidden-sm"><hr /></div>
                                    <div className="mui--hidden-lg mui--hidden-xl mui--hidden-md"><hr style={{ marginTop: '-2px' }} /></div>

                                    {/* Here details of filled elements */}
                                    <div className="desktop-data mui--hidden-sm mui--hidden-xs">
                                        <Row>
                                            <Col md="4">
                                                <p className="key-name">Gender:</p>
                                                <p className="key-value">{this.state.gender}</p>
                                            </Col>
                                            <Col md="4">
                                                <p className="key-name">Date of Birth:</p>
                                                <p className="key-value">{this.state.dob}</p>
                                            </Col>
                                            <Col md="4">
                                                <p className="key-name">Nominee Age:</p>
                                                <p className="key-value">{this.state.nominee_age}</p>
                                            </Col>
                                        </Row>
                                        {/* Second row */}
                                        <Row>
                                            <Col md="4">
                                                <p className="key-name">Married:</p>
                                                <p className="key-value">{this.state.married}</p>
                                            </Col>
                                            <Col md="4">
                                                <p className="key-name">Nominee Name:</p>
                                                <p className="key-value">{this.state.nominee_name}</p>
                                            </Col>
                                            <Col md="4">
                                                <p className="key-name">Nominee Relation:</p>
                                                <p className="key-value">{this.state.nominee_relation}</p>
                                            </Col>
                                        </Row>

                                        <hr />
                                        {/* third row */}
                                        <Row>
                                            <Col md="4">
                                                <p className="key-name">Address:</p>
                                                <p className="key-value">{this.state.address}</p>
                                            </Col>
                                            <Col md="4">
                                                <p className="key-name">Pincode:</p>
                                                <p className="key-value">{this.state.pincode}</p>

                                                <p className="key-name">City:</p>
                                                <p className="key-value">{this.state.city}</p>
                                            </Col>
                                            <Col md="4">
                                                <p className="key-name">State:</p>
                                                <p className="key-value">{this.state.state}</p>
                                            </Col>
                                        </Row>

                                    </div>
                                    {/* For Mobile View */}
                                    {/* Table */}
                                    <table className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Gender:
                                </td>
                                                <td>
                                                    {this.state.gender}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Married:
                                </td>
                                                <td>
                                                    {this.state.married}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Your DOB:
                                </td>
                                                <td>
                                                    {this.state.dob}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Nominee Name:
                                </td>
                                                <td>
                                                    {this.state.nominee_name}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Nominee Age:
                                </td>
                                                <td>
                                                    {this.state.nominee_age}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Nominee Relation:
                                </td>
                                                <td>
                                                    {this.state.nominee_relation}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr />
                                    {/* For Mobile View */}
                                    {/* Table */}
                                    <table className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Communication Address:
                                </td>
                                                <td>
                                                    {this.state.address}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Pincode:
                                </td>
                                                <td>
                                                    {this.state.pincode}
                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    City:
                                </td>
                                                <td>
                                                    {this.state.city}
                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    State:
                                </td>
                                                <td>
                                                    {this.state.state}
                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    }
                </Panel>
            </div>
        )
    }
}

PersonalDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    step: state.proposal_form_motor.step
})

const mapDispatchToProps = dispatch => ({
    setStep: step => dispatch({ type: 'SET_STEP', step })
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PersonalDetails))
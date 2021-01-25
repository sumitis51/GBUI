import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'



const styles = theme => ({
    formControl: {
        margin: `${theme.spacing.unit * 2}px 0px`,
    },
    group: {
        margin: `0px 0`,
    },
    radio: {
        color: '#000000',
        '&$checked': {
            color: '#0da176',
        },
    },
    checked: {},
    label: {
        fontSize: '12px',
        fontFamily: 'Source Sans Pro',
        color: 'rgba(170, 170, 170, 0.54)'
    },
    input_label_root: {
        fontFamily: 'Source Sans Pro',
        color: 'rgba(170, 170, 170, 0.54)',
        fontSize: '16px'
    },
    root_input: {
        color: '#000000',
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        '&$focused': {
            color: '#000000'
        }
    },
    focused_input: {},
    focused: {
        fontFamily: 'Source Sans Pro',
        color: 'rgba(170, 170, 170, 0.54)',
        fontSize: '12px'
    },
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#0da176',
        '&:hover': {
            backgroundColor: '#0da176',
        },
        padding: '10px 60px',
        margin: '0 0 1rem 0'
    },
})
class Servicing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            policy: 'CAR - 8UW34567823566',
            serviceType: 'Policy Servicing',
            claim_request: 'Intimitation'
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.value);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="parent-id-servicing">
                <Row>
                    <Col md="4">
                        <form noValidate autoComplete="off">
                            <FormControl
                                className={classes.formControl}
                                fullWidth
                                margin="none">
                                <InputLabel
                                    htmlFor="email_or_phone"
                                    classes={{
                                        root: classes.input_label_root,
                                        focused: classes.focused,

                                    }}>
                                    Registered Phone Number/ Email Id
                                                </InputLabel>
                                <Input
                                    id="email_or_phone"
                                    value={'9876543210'}
                                    classes={{
                                        root: classes.root_input,
                                    }} />
                            </FormControl>

                            {/* Select policy */}
                            <FormControl
                                className={classes.formControl}
                                fullWidth
                                margin="none">
                                <InputLabel
                                    htmlFor="select-policy"
                                    classes={{
                                        root: classes.input_label_root,
                                        focused: classes.focused,

                                    }}>
                                    Select Policy
                                                </InputLabel>
                                <Select
                                    value={this.state.policy}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'policy',
                                        id: 'select-policy',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'CAR - 8UW34567823566'}>CAR - 8UW34567823566</MenuItem>
                                    <MenuItem value={'CAR - 8UW34567823567'}>CAR - 8UW34567823567</MenuItem>
                                    <MenuItem value={'CAR - 8UW34567823569'}>CAR - 8UW34567823569</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Type of service request */}
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend" classes={{
                                    root: classes.label
                                }}>Type of service request</FormLabel>
                                <RadioGroup
                                    aria-label="Type of Service Request"
                                    name="serviceType"
                                    className={classes.group}
                                    value={this.state.serviceType}
                                    onChange={this.handleChange}
                                    row
                                >
                                    <FormControlLabel
                                        value="Policy Servicing"
                                        control={<Radio classes={{
                                            root: classes.radio,
                                            checked: classes.checked,
                                        }} />}
                                        label="Policy Servicing" />
                                    <FormControlLabel
                                        value="Claim"
                                        control={<Radio classes={{
                                            root: classes.radio,
                                            checked: classes.checked,
                                        }} />}
                                        label="Claim" />
                                    <FormControlLabel
                                        value="Renewal"
                                        control={<Radio classes={{
                                            root: classes.radio,
                                            checked: classes.checked,
                                        }} />}
                                        label="Renewal" />
                                </RadioGroup>
                            </FormControl>

                            {/* Claim request type */}
                            <FormControl
                                className={classes.formControl}
                                fullWidth
                                margin="none">
                                <InputLabel
                                    htmlFor="claim-request"
                                    classes={{
                                        root: classes.input_label_root,
                                        focused: classes.focused,

                                    }}>
                                    Claim Request Type
                                                </InputLabel>
                                <Select
                                    value={this.state.claim_request}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'claim_request',
                                        id: 'claim-request',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Intimitation'}>Intimitation</MenuItem>
                                    <MenuItem value={'CAR - 8UW34567823567'}>CAR - 8UW34567823567</MenuItem>
                                    <MenuItem value={'CAR - 8UW34567823569'}>CAR - 8UW34567823569</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        {/* Textarea */}
                        <FormControl
                            className={classes.formControl}
                            fullWidth
                            margin="none">
                            <p className="share_details">Share request details</p>
                            <TextField
                                id="outlined-multiline-static"
                                label=""
                                multiline
                                rows="4"
                                defaultValue=""
                                margin="normal"
                                variant="outlined"
                                fullWidth

                            />
                        </FormControl>

                        <div className="servicing-submit-button-right mui--hidden-xs mui--hidden-sm">
                            <Button
                                className={classNames(classes.buttonRoot3)}
                            >Submit</Button>
                        </div>
                        <div className="servicing-submit-button-right mui--hidden-md mui--hidden-lg mui--hidden-xl">
                            <Button
                                className={classNames(classes.buttonRoot3)}
                                fullWidth
                            >Submit</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}


Servicing.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Servicing)
import React from 'react'
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import classNames from 'classnames'

const styles = theme => ({
    root: {
        color: 'black',
        '&$checked': {
            color: '#0da176',
        },
    },
    formControl: {
        margin: `${theme.spacing.unit * 2}px 0px`,
    },
    formControlT: {
        margin: `0 0 ${theme.spacing.unit * 2}px  0px`,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    checked: {},
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#0da176',
        '&:hover': {
            backgroundColor: '#0da176',
        },
        padding: '10px 60px',
        margin: '0 0 1rem 0'
    },
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
});


class Feedback extends React.Component {

    state = {
        purpose_feedback: 'buy',
        policy: 'CAR - 8UW34567823566'
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.value);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="feedback-parent-div-help">
                <Row>
                    <Col md="4">
                        <div>
                            <FormControl
                                className={classes.formControlT}
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
                        </div>
                    </Col>
                </Row>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Purpose Of Your Feedback</FormLabel>
                    <RadioGroup
                        aria-label="Purpose Of Your Feedback"
                        name="purpose_feedback"
                        value={this.state.purpose_feedback}
                        onChange={this.handleChange}
                        row
                    >
                   
                        <FormControlLabel value="buy" control={
                            <Radio classes={{
                                root: classes.root,
                                checked: classes.checked,
                            }} />
                        } label="Buy" />
                        <FormControlLabel value="claim" control={<Radio classes={{
                            root: classes.root,
                            checked: classes.checked,
                        }} />} label="Claim" />
                        <FormControlLabel value="renew" control={<Radio classes={{
                            root: classes.root,
                            checked: classes.checked,
                        }} />} label="Renew" />
                        <FormControlLabel value="policy_servicing" control={<Radio classes={{
                            root: classes.root,
                            checked: classes.checked,
                        }} />} label="Policy Servicing" />
                       
                    </RadioGroup>
                </FormControl>
                <div className="feedback_div">
                    <h3 className="feedback_heading">Feedback</h3>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Question 1: Lorem ipsum lorem ipsum lorem ipsum lorem ipsum.</FormLabel>
                        <RadioGroup
                            aria-label="Question 1: Lorem ipsum lorem ipsum lorem ipsum lorem ipsum."
                            name="query1"
                            value={this.state.query1}
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
                    <br />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Question 2: Lorem ipsum lorem ipsum lorem ipsum lorem ipsum.</FormLabel>
                        <RadioGroup
                            aria-label="Question 2: Lorem ipsum lorem ipsum lorem ipsum lorem ipsum."
                            name="query2"
                            value={this.state.query2}
                            onChange={this.handleChange}
                            row
                        >
                            <FormControlLabel value="option1" control={<Radio classes={{
                                root: classes.root,
                                checked: classes.checked,
                            }} />} label="Option 1" />
                            <FormControlLabel value="option2" control={<Radio classes={{
                                root: classes.root,
                                checked: classes.checked,
                            }} />} label="Option 2" />
                            <FormControlLabel value="option3" control={<Radio classes={{
                                root: classes.root,
                                checked: classes.checked,
                            }} />} label="Option 3" />
                        </RadioGroup>
                    </FormControl><br />
                </div>
                <h3 className="syv_heading">Share your views</h3>
                <Row>
                    <Col md="8">
                        <textarea rows="9" style={{ width: '100%', borderRadius: '4px' }}></textarea>
                        <div className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
                            <Button
                                className={classNames(classes.buttonRoot3)}
                                fullWidth
                            >Submit</Button>
                        </div>
                        <div className="mui--hidden-sm mui--hidden-xs" style={{ float: 'right', marginTop: '1rem', marginBottom: '3rem' }}>
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

Feedback.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Feedback)
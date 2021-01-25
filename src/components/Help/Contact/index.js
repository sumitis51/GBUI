import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'

import './contact.css'


const styles = theme => ({
    formControl: {
        margin: `${theme.spacing.unit * 2}px 0px`,
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
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#0da176',
        '&:hover': {
            backgroundColor: '#0da176',
        },
        padding: '10px 60px',
        margin: '0 0 1rem 0'
    },
    buttonRoot: {
        color: '#0da176',
        background: '#ffffff',
        '&:hover': {
            backgroundColor: '#f6f6f6',
            border: '1px solid #0da176'
        },
        border: '1px solid #0da176',
        padding: '12px 20px',
        margin: '0.8rem 0'
    }
})


class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: 'English'
        };
    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.value);
    }


    render() {
        const { classes } = this.props;
        return (
            <div className="parent-div-contatc-help">

                {/* Form fields */}
                <Row>
                    <Col md="4">
                        {/* Headings */}
                        <h3 className="get-a-call-back-help">Get a call back</h3>

                        <h3 className="avrg-wait-time-help">
                            Average wait time:  <span className="time-aplha-numeric-help"> 7 Mins</span>
                        </h3>

                        <form noValidate autoComplete="off">
                            {/* Select Language */}
                            <FormControl
                                className={classes.formControl}
                                fullWidth
                                margin="none">
                                <InputLabel
                                    htmlFor="select-language"
                                    classes={{
                                        root: classes.input_label_root,
                                        focused: classes.focused,

                                    }}>
                                    Language
                                </InputLabel>
                                <Select
                                    value={this.state.language}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'language',
                                        id: 'select-labguage',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'English'}>English</MenuItem>
                                    <MenuItem value={'Hindi'}>Hindi</MenuItem>
                                    <MenuItem value={'Marathi'}>Marathi</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Phone Number */}
                            <FormControl
                                className={classes.formControl}
                                fullWidth
                                margin="none">
                                <InputLabel
                                    htmlFor="phone"
                                    classes={{
                                        root: classes.input_label_root,
                                        focused: classes.focused,

                                    }}>
                                    Phone Number
                                </InputLabel>
                                <Input
                                    id="phone"
                                    value={'9876543210'}
                                    classes={{
                                        root: classes.root_input,
                                    }} />
                            </FormControl>

                            {/* Submit button full width */}
                            <Button
                                className={classNames(classes.buttonRoot3)}
                                fullWidth
                            >Submit</Button>
                        </form>
                    </Col>

                    {/* Just for gap b/w columns */}
                    <Col md="1"></Col>

                    {/* Column for contact details */}
                    <Col md="3">
                        <h3 className="want-contact-us-help">Want to contact us</h3>

                        {/* HElpline number */}
                        <div className="helpline-div-help">
                            <p className="toll-free-helpline-help">1800 324 0987</p>
                            <p className="toll-free-helpline-help-text">Helpline (Toll-free)</p>
                        </div>

                        {/* Helpline email */}
                        <div className="helpline-div-help">
                            <p className="toll-free-helpline-help">
                            connect@groupbima.com
                            </p>
                            <p className="toll-free-helpline-help-text">
                                Customer Query, Claims &amp; Policy Servicing
                            </p>
                        </div>

                        <h3 className="direct-chat-heading-help">Want to have direct chat with us</h3>

                        {/* Buttons */}
                        <Button
                            className={classNames(classes.buttonRoot)}
                            fullWidth
                        >Meet in person</Button>
                        <Button
                            className={classNames(classes.buttonRoot)}
                            fullWidth
                        >Chat</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

Contact.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact)
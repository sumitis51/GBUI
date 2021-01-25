import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const styles = {
    root: {
        color: '#000000',
        '&$checked': {
            color: '#0da176',
        }
    },
    checked: {},
    formLabel: {
        fontFamily: 'Source Sans Pro',
        fontSize: '14px',
        color: '#000000'
    },
    cssLabelN: {
        color: '#aaaaaa',
        fontFamily: 'Source Sans Pro',
        fontSize: '14px',
        '&$cssFocused': {
            color: '#aaaaaa',
        },
    },
    formControl: {
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: '#0da176',
        },
    },
    cssUnderlineN: {
        '&:after': {
            borderBottomColor: '#0da176',
        },
    },
    margin: {
        margin: '1rem 5rem 0rem -1rem'
    }
};

class PolicyDetails extends React.Component {

    state = {
        selectedValue: 'Yes'
    };


    handleChange = event => {
        this.setState({ selectedValue: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className="car-details-parent-div">
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td>
                                <p className="heading mtop2">Previous Policy Status</p>
                            </td>
                            <td>
                                {/* here */}
                                <FormControl className={classes.formControl} margin="normal" style={{ width: '250px' }}>
                                    <InputLabel
                                        htmlFor="custom-css-input"
                                        FormLabelClasses={{
                                            root: classes.cssLabelN,
                                            focused: classes.cssFocused,
                                        }}
                                    >
                                        Expired W/N 90 days
                                </InputLabel>
                                    <Input
                                        id="custom-css-input"
                                        classes={{
                                            underline: classes.cssUnderlineN,
                                        }}
                                    />
                                </FormControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="heading mtop2">Claim raised in<br />previous policy</p>
                            </td>
                            <td>
                                <FormControl className={classes.formControl} row>
                                    <RadioGroup
                                        aria-label="Vehicle"
                                        name="vehicleType"
                                        value={this.state.selectedValue}
                                        onChange={this.handleChange}
                                        row
                                    >
                                        <FormControlLabel
                                            value="Yes"
                                            control={<Radio
                                                classes={{
                                                    root: classes.root,
                                                    checked: classes.checked,
                                                }}
                                                row
                                            />}
                                            label="Yes"
                                            classes={{
                                                label: classes.formLabel,
                                                root: classes.margin
                                            }} />

                                        <FormControlLabel
                                            value="No"
                                            control={<Radio
                                                classes={{
                                                    root: classes.root,
                                                    checked: classes.checked,
                                                }}
                                                row
                                            />}
                                            label="No"
                                            classes={{
                                                label: classes.formLabel,
                                                root: classes.margin
                                            }} />
                                    </RadioGroup>
                                </FormControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="heading mtop2">NCB Percentage</p>
                            </td>
                            <td>
                                {/* here */}
                                <FormControl className={classes.formControl} style={{ width: '250px' }} margin="dense">
                                    <InputLabel
                                        classes={{
                                            root: classes.selectRoot,
                                        }} htmlFor="age-simple">50%</InputLabel>
                                    <Select
                                        value={this.state.age}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}
                                        classes={{
                                            root: classes.selectRoot
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}


PolicyDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PolicyDetails);
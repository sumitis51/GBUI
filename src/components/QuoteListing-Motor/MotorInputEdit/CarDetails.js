import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import './car-details.css'



const styles = {
    root: {
        color: '#000000',
        '&$checked': {
            color: '#0da176',
        },
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
};


class CarDetails extends React.Component {

    state = {
        selectedValue: 'personal'
    };


    handleChange = event => {
        this.setState({ selectedValue: event.target.value });
    };

    render() {

        const { classes } = this.props;


        return (
            <div className="car-details-parent-div">
                <table style={{ width: '100%' }}>
                    <tr>
                        <td>
                            <p className="heading">Vehicle Type</p>
                        </td>
                        <td>
                            <FormControl>
                                <RadioGroup
                                    aria-label="Vehicle"
                                    name="vehicleType"
                                    value={this.state.selectedValue}
                                    onChange={this.handleChange}
                                    row={window.innerWidth <= 767? false: true}
                                >
                                    <FormControlLabel
                                        value="personal"
                                        control={<Radio
                                            classes={{
                                                root: classes.root,
                                                checked: classes.checked,
                                            }}
                                            row
                                        />}
                                        label="Personal Car"
                                        classes={{
                                            label: classes.formLabel
                                        }} />

                                    <FormControlLabel
                                        value="commercial"
                                        control={<Radio
                                            classes={{
                                                root: classes.root,
                                                checked: classes.checked,
                                            }}
                                            row
                                        />}
                                        label="Commercial Car"
                                        classes={{
                                            label: classes.formLabel
                                        }} />
                                </RadioGroup>
                            </FormControl>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className="heading mtop">Car</p>
                        </td>
                        <td>
                            <FormControl className={classes.formControl} margin="normal" style={{width: '250px'}}>
                                <InputLabel
                                    htmlFor="custom-css-input"
                                    FormLabelClasses={{
                                        root: classes.cssLabelN,
                                        focused: classes.cssFocused,
                                    }}
                                >
                                    Car Name
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
                            <p className="heading mtop">Fuel</p>
                        </td>
                        <td>
                            <FormControl className={classes.formControl}  margin="normal" style={{width: '250px'}}>
                                <InputLabel
                                    htmlFor="custom-css-input"
                                    FormLabelClasses={{
                                        root: classes.cssLabelN,
                                        focused: classes.cssFocused,
                                    }}
                                >
                                    Petrol + CNG External Fitted
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
                            <p className="heading mtop">Kit Value</p>
                        </td>
                        <td>
                            <FormControl className={classes.formControl}  margin="normal" style={{width: '250px'}}>
                                <InputLabel
                                    htmlFor="custom-css-input"
                                    FormLabelClasses={{
                                        root: classes.cssLabelN,
                                        focused: classes.cssFocused,
                                    }}
                                >
                                    Rs 12345
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
                            <p className="heading mtop">Model</p>
                        </td>
                        <td>
                            <FormControl className={classes.formControl}  margin="normal" style={{width: '250px'}}>
                                <InputLabel
                                    htmlFor="custom-css-input"
                                    FormLabelClasses={{
                                        root: classes.cssLabelN,
                                        focused: classes.cssFocused,
                                    }}
                                >
                                    LXi
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
                            <p className="heading mtop">Sitting Capacity</p>
                        </td>
                        <td>
                            <FormControl className={classes.formControl}  margin="normal" style={{width: '250px'}}>
                                <InputLabel
                                    htmlFor="custom-css-input"
                                    FormLabelClasses={{
                                        root: classes.cssLabelN,
                                        focused: classes.cssFocused,
                                    }}
                                >
                                    4
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
                            <p className="heading mtop">Usage of Vehicle</p>
                        </td>
                        <td>
                            <FormControl className={classes.formControl}  margin="normal" style={{width: '250px'}}>
                                <InputLabel
                                    htmlFor="custom-css-input"
                                    FormLabelClasses={{
                                        root: classes.cssLabelN,
                                        focused: classes.cssFocused,
                                    }}
                                >
                                    Taxi
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
                </table>
            </div>
        )
    }
}

CarDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CarDetails);
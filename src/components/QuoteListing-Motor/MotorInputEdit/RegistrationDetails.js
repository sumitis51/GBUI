import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import CalendarToday from '@material-ui/icons/CalendarToday';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing.unit*4,
    },
    withoutLabel: {
      marginTop: theme.spacing.unit * 3,
    },
    textField: {
      flexBasis: 200,
    },
  });

class RegistrationDetails extends React.Component {
    
    render() {
        const { classes } = this.props;
        return (
            <div className="car-details-parent-div">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <p className="heading mtop2">Registration Date</p>
                            </td>
                            <td>
                                <FormControl className={classNames(classes.margin, classes.textField)}>

                                    <Input
                                        id="adornment-password"
                                        type="date"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Calendar View"
                                                >
                                                    <CalendarToday />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="heading mtop2">Manufacturing Date<br/>& Month</p>
                            </td>
                            <td>
                                <FormControl className={classNames(classes.margin, classes.textField)}  style={{ width: '150px' }} margin="dense">
                                    <InputLabel
                                        classes={{
                                            root: classes.selectRoot,
                                        }} htmlFor="age-simple">Month</InputLabel>
                                    <Select
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
                                <FormControl className={classNames(classes.margin, classes.textField)} style={{ width: '150px' }} margin="dense">
                                    <InputLabel
                                        classes={{
                                            root: classes.selectRoot,
                                        }} htmlFor="age-simple">Year</InputLabel>
                                    <Select
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

RegistrationDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(RegistrationDetails);
import React from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import green from '@material-ui/core/colors/green';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    margin: {
        marginTop: '1rem'
    },
    formControl: {
        margin: theme.spacing.unit,
        marginBottom: '0'
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
        marginBottom: '0'
    },
    label: {
        color: '#808080',
        fontFamily: 'Source Sans Pro',
        fontSize: '14px',
    },
    checkboxRoot: {
        color: '#000000',
        '&$checked': {
            color: green[500]
        },
    },
    checkedCheckbox: {
        color: green[500],
        backgroundColor: green[500]
    },
    checked: {},
    buttonRoot: {
        color: 'white',
        backgroundColor: '#0da176',
        '&:hover': {
            backgroundColor: '#0da176',
        },
        padding: '10px 60px'
    },
    labelCheckbox: {
        color: '#000000',
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        margin: '0px'
    },
    formControlTabl: {
        marginBottom: '7px'
    }
});
class AgeDetails extends React.Component {

    state = {
        familyDetails: [],
        ageItems: new Array(83).fill(0, 0), 
        ageItemsChild:[
            { key: 0, value: 0, display: '<1 Month' },
            { key: 1, value: 0.08, display: '1 Month' },
            { key: 2, value: 0.16, display: '2 Months' },
            { key: 3, value: 0.25, display: '3 Months' },
            { key: 4, value: 0.33, display: '4 Months' },
            { key: 5, value: 0.41, display: '5 Months' },
            { key: 6, value: 0.5, display: '6 Months' },
            { key: 7, value: 0.58, display: '7 Months' },
            { key: 8, value: 0.66, display: '8 Months' },
            { key: 9, value: 0.75, display: '9 Months' },
            { key: 10, value: 0.83, display: '10 Months' },
            { key: 11, value: 0.91, display: '11 Months' },
            { key: 13, value: 1, display: '1 Year' },
            { key: 14, value: 2, display: '2 Years' },
            { key: 15, value: 3, display: '3 Years' },
            { key: 16, value: 4, display: '4 Years' },
            { key: 17, value: 5, display: '5 Years' },
            { key: 18, value: 6, display: '6 Years' },
            { key: 19, value: 7, display: '7 Years' },
            { key: 20, value: 8, display: '8 Years' },
            { key: 21, value: 9, display: '9 Years' },
            { key: 22, value: 10, display: '10 Years' },
            { key: 23, value: 11, display: '11 Years' },
            { key: 24, value: 12, display: '12 Years' },
            { key: 25, value: 13, display: '13 Years' },
            { key: 26, value: 14, display: '14 Years' },
            { key: 27, value: 15, display: '15 Years' },
            { key: 28, value: 16, display: '16 Years' },
            { key: 29, value: 17, display: '17 Years' },
            { key: 30, value: 18, display: '18 Years' },
            { key: 31, value: 19, display: '19 Years' },
            { key: 32, value: 20, display: '20 Years' },
            { key: 32, value: 21, display: '21 Years' },
            { key: 33, value: 22, display: '22 Years' },
            { key: 34, value: 23, display: '23 Years' },
            { key: 35, value: 24, display: '24 Years' },
        ],
    };

    // Handle Age
    handleAge = event => {
        let familyDetails = this.state.familyDetails
        familyDetails.map((item, index) => {
            if (item.member === event.target.name)
                familyDetails[index].age = event.target.value
                return true
        })
        this.setState({familyDetails: familyDetails})
        let formData = this.props.inputFormHealthData
        formData.familyDetails = familyDetails

        this.props.loadInputFormHealth(formData)
    }

    componentWillMount() {
        this.setState({ familyDetails: this.props.inputFormHealthData && this.props.inputFormHealthData.familyDetails })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="age-details-parent-div-input-form-health">
                <h3 className="who-would-heading-select-members">Add Age of each member</h3>
                <div className="table-input-form-health-div-tab-2" style={{ marginTop: '1.5rem' }}>
                    <Row>
                        <Col md="5">
                            <table style={{ width: '100%' }}>
                                <tr>
                                    <th>Members</th>
                                    <th>Age</th>
                                </tr>
                                {/* Dynamically generate rows for age */}
                                {this.state.familyDetails && this.state.familyDetails.map((item) =>
                                    <tr>
                                        <td>{item.label}</td>
                                        <td>
                                            <FormControl className={classes.formControlTable} style={{marginBottom: '7px'}}>
                                                {/* <InputLabel htmlFor="age-simple">Age</InputLabel> */}
                                                <Select
                                                    value={item.age}
                                                    onChange={this.handleAge}
                                                    inputProps={{
                                                        name: `${item.member}`,
                                                        id: 'age-simple',
                                                    }}
                                                >
                                                 {item.label.indexOf("Son") !== -1 ||
                                                    item.label.indexOf("Daughter") !== -1
                                                        ? this.state.ageItemsChild.map(
                                                            (i, index) => (
                                                            <MenuItem className={classes.formControlAge}  value={i.value}>
                                                                {i.display}&nbsp; 
                                                            </MenuItem>
                                                            )
                                                        )
                                                        : this.state.ageItems.map(
                                                            (i, index) => (
                                                            <MenuItem value={index + 18}>
                                                                {index + 18}&nbsp; years
                                                            </MenuItem>
                                                            )
                                                        )}
                                                    {/* {this.state.ageItems.map((i, index) =>
                                                        <MenuItem value={index + 1}>{index + 1}</MenuItem>
                                                    )} */}
                                                </Select>
                                            </FormControl>
                                        </td>
                                    </tr>
                                )}
                            </table>
                            <div className="add-member-div-input-form-health">
                                <p className="link-add-member" style={{ marginRight: '4px' }}></p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

AgeDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    loadInputFormHealth: data => dispatch({ type: 'INPUT_FORM_HEALTH', data })
})

const mapStateToProps = state => ({
    inputFormHealthData: state.inputFormHealth.inputFormHealthData
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AgeDetails))
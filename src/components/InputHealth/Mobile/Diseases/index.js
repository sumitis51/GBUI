import React from 'react'
import './index.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
            color: '#ea0b4b'
        },
    },
    checkedCheckbox: {
        color: '#ea0b4b',
        backgroundColor: '#ea0b4b'
    },
    checked: {},
    buttonRoot: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '10px 60px'
    },
    labelCheckbox: {
        color: '#000000',
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        margin: '0px'
    },
    formControlTable: {
        margin: '0px'
    }
});
class Diseases extends React.Component {

    state = {
        familyDetails: []
    };
    handleDiseases = itemName => event => {
        let familyDetails = this.state.familyDetails

        // formData.familyDetails[event.target.name] = event.target.checked

        familyDetails.map((item, index) => {
            if (item.member === itemName) {
                item.diseases.map((dis, ind) => {
                    if (dis.name === event.target.name) {
                        familyDetails[index].diseases[ind].value = event.target.checked
                        this.props.nextButton(event.target.checked)
                    }
                    return true
                })
            }
           return true
        })


        this.setState({ familyDetails: familyDetails })

        let inputHealthData = this.props.inputFormHealthData

        inputHealthData.familyDetails = familyDetails

        this.props.loadInputFormHealth(inputHealthData)
    }
    componentWillMount() {
        this.setState({ familyDetails: this.props.inputFormHealthData.familyDetails })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="age-details-parent-div-input-form-health">
                <h3 className="who-would-heading-select-members">
                Any Pre Existing Disease?
                </h3>
                <div className="tab-3-table">
                    <table style={{ width: '100%' }}>
                        <tr>
                            <th>Members</th>
                            <th>Diabetes</th>
                            <th>Hypertension</th>
                            <th>Hyperlipidaemia</th>
                            <th>Asthma</th>
                            <th> Non Chronic</th>
                        </tr>
                        {
                            this.state.familyDetails.map((item) =>
                                <tr>
                                    <td>{item.label}</td>
                                    {new Array(5).fill(0, 0).map((disease, index) =>

                                        <td>
                                            <FormControlLabel
                                                className={classes.formControlTable}
                                                control={
                                                    <Checkbox
                                                        checked={item.diseases[index].value}
                                                        onChange={this.handleDiseases(item.member)}
                                                        value={item.diseases[index].name}
                                                        name={`${item.diseases[index].name}`}
                                                        classes={{
                                                            root: classes.checkboxRoot,
                                                            checked: classes.checked
                                                        }} />
                                                }
                                                label=""
                                            />
                                        </td>
                                    )}

                                </tr>


                            )}
                    </table>
                    <br /><br />
                </div>
            </div>
        )
    }
}

Diseases.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapdispatchToProps = dispatch => ({
    loadInputFormHealth: data => dispatch({type: 'INPUT_FORM_HEALTH', data})
})

const mapStateToProps = state => ({
    inputFormHealthData: state.inputFormHealth.inputFormHealthData
})

export default connect(mapStateToProps, mapdispatchToProps)( withStyles(styles)(Diseases))
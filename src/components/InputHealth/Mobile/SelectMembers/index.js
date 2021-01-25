import React from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import green from '@material-ui/core/colors/green';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { connect } from 'react-redux'

const styles = theme => ({
    root: {
        display: 'flex',
    },
    margin: {
        marginTop: '1rem'
    },
    formControlLabel: {
        marginBottom: '0'
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
    typography: {
        color: '#000000',
        fontFamily: 'Source Sans Pro',
        fontSize: '14px',
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
});
class SelectMembers extends React.Component {

    state = {
        active_step: 1,
        value: 'male',
        open: false,
        openFull: false,
        formMembers: {
            son: false,
            noOfSon: 1,
            noOfDaughter: 1,
            spouse: false,
            self: false,
            daughter: false,
            mother: false,
            father: false,
            mother_in_law: false,
            father_in_law: false,
        },
        noOfSon: 0,
        noOfDaughter: 0,
        candidates: [
            "Self",
            "Spouse",
            "Son",
            "Daughter",
            "Father",
            "Mother",
            "Mother in law",
            "Father in law"
        ],
        tabContent: {
            padding: '0px 90px'
        },
        maxChildLimit: 8
    };
    // Handle checkbox input
    handleChange = name => event => {
        let formData = this.state.formMembers
        formData[name] = event.target.checked
        this.setState({ formMembers: formData });
        let inputFormData = this.props.inputFormData !== undefined ? this.props.inputFormData : { familyDetails: [] };
        inputFormData.formMembers = formData
        this.props.loadInputFormHealth(inputFormData)
    };

    componentDidMount() {
        this.props.inputFormData !== undefined ? this.setState({ formMembers: this.props.inputFormData.formMembers }) : this.props.loadInputFormHealth({ formMembers: this.state.formMembers, familyDetails: [] })
        console.log(this.state.formMembers)
    }


    render() {
        const { classes } = this.props;
        const { son, spouse, mother, self, daughter, father, mother_in_law, father_in_law } = this.state.formMembers;
        return (
            <div className="select-members-parent-div-input-form-health">
                <h3 className="who-would-heading-select-members">Select Family Members you want to cover</h3>
                <div className="select-members-div-content">
                    {/* Here are checkboxex */}
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormGroup>
                            <tr>
                                <td>
                                    <FormControlLabel
                                        classes={{
                                            root: classes.formControlLabel,
                                            label: classes.typography
                                        }}
                                        control={
                                            <Checkbox
                                                checked={self}
                                                onChange={this.handleChange('self')}
                                                value="self"
                                                classes={{
                                                    root: classes.checkboxRoot,
                                                    checked: classes.checked
                                                }} />
                                        }
                                        label="Self"
                                        classes={{
                                            label: classes.labelCheckbox
                                        }}
                                    />
                                </td>
                            </tr>
                            <FormControlLabel
                                classes={{
                                    root: classes.formControlLabel,
                                    label: classes.typography
                                }}
                                control={
                                    <Checkbox
                                        checked={spouse}
                                        onChange={this.handleChange('spouse')}
                                        value="spouse"
                                        classes={{
                                            root: classes.checkboxRoot,
                                            checked: classes.checked
                                        }} />
                                }
                                label="Spouse"
                                classes={{
                                    label: classes.labelCheckbox
                                }}
                            />
                            <tr>
                                <td>

                                    <FormControlLabel classes={{
                                        root: classes.formControlLabel,
                                        label: classes.typography
                                    }}
                                        control={
                                            <Checkbox
                                                checked={son}
                                                disabled={this.state.formMembers.noOfDaughter > 3}
                                                onChange={this.handleChange('son')}
                                                value="son"
                                                classes={{
                                                    root: classes.checkboxRoot,
                                                    checked: classes.checked
                                                }} />
                                        }
                                        label="Son"
                                        classes={{
                                            label: classes.labelCheckbox
                                        }}
                                    />
                                </td>
                                {son &&
                                    <td>
                                        <button
                                            style={
                                                {
                                                    background: '#fff',
                                                    borderColor: '#333',
                                                    color: '#333',
                                                    marginLeft: '5.2rem'
                                                }}
                                            onClick={() => {
                                                const vm = this;
                                                let { noOfSon } = this.state.formMembers;
                                                if (noOfSon > 1) {
                                                    if (noOfSon === 1) {
                                                        let formData = vm.state.formMembers
                                                        formData['noOfSon'] = --noOfSon
                                                        formData['son'] = false
                                                        vm.setState({ formMembers: formData })

                                                        this.setState({ noOfSon: --noOfSon, son: false })
                                                    } else {

                                                        // this.setState({ noOfSon: --noOfSon })
                                                        let formData = vm.state.formMembers
                                                        formData['noOfSon'] = --noOfSon
                                                        vm.setState({ formMembers: formData })

                                                    }
                                                }
                                                else {
                                                    // this.setState({ son: false })
                                                    let formData = this.state.formMembers
                                                    formData['son'] = false
                                                    formData['noOfSon'] = 1
                                                    this.setState({ formMembers: formData })
                                                }

                                                let inputFormData = this.props.inputFormData !== undefined ? this.props.inputFormData : {};
                                                inputFormData.formMembers = this.state.formMembers
                                                this.props.loadInputFormHealth(inputFormData)
                                            }}
                                            disabled={!this.state.formMembers.noOfSon > 0}>&ndash;</button>
                                        <input
                                            style={
                                                {
                                                    background: '#fff',
                                                    borderColor: '#333',
                                                    color: '#333',
                                                    width: '25px',
                                                    borderLeft: 'none',
                                                    borderRight: 'none',
                                                    textAlign: 'center'
                                                }}
                                            value={this.state.formMembers.noOfSon}
                                            disabled={false}
                                            name="noOfSon"
                                            onChange={(event) => {
                                                let noOfSon = event.target.value;
                                                if (noOfSon > 0 && noOfSon <= this.state.maxChildLimit) {
                                                    let formData = this.state.formMembers
                                                    formData['noOfSon'] = event.target.value
                                                    this.setState({ formMembers: formData })
                                                    // this.setState({ noOfSon: event.target.value })
                                                }
                                                else if (noOfSon > this.state.maxChildLimit) {
                                                    let formData = this.state.formMembers
                                                    formData['noOfSon'] = this.state.formMembers.noOfSon
                                                    this.setState({ formMembers: formData })
                                                    // this.setState({ noOfSon: this.state.formMembers.noOfSon })
                                                }
                                                else {
                                                    // this.setState({ son: false, noOfSon: null })
                                                    let formData = this.state.formMembers
                                                    formData['noOfSon'] = null
                                                    formData['son'] = false
                                                    this.setState({ formMembers: formData })
                                                }
                                                let inputFormData = this.props.inputFormData !== undefined ? this.props.inputFormData : {};
                                                inputFormData.formMembers = this.state.formMembers
                                                this.props.loadInputFormHealth(inputFormData)
                                            }} />
                                        <button
                                            style={
                                                {
                                                    background: '#fff',
                                                    borderColor: '#333',
                                                    color: '#333'
                                                }}
                                            onClick={() => {
                                                let { noOfSon, noOfDaughter } = this.state.formMembers;
                                                if (daughter) {
                                                    if ((noOfSon + noOfDaughter) < 4) {
                                                        // this.setState({ noOfSon: ++noOfSon, son: true })
                                                        let formData = this.state.formMembers
                                                        formData['noOfSon'] = ++noOfSon
                                                        formData['son'] = true
                                                        this.setState({ formMembers: formData })
                                                    }
                                                } else {
                                                    if ((noOfSon) < 4) {
                                                        // this.setState({ noOfSon: ++noOfSon, son: true })
                                                        let formData = this.state.formMembers
                                                        formData['noOfSon'] = ++noOfSon
                                                        formData['son'] = true
                                                        this.setState({ formMembers: formData })
                                                    }

                                                }
                                                let inputFormData = this.props.inputFormData !== undefined ? this.props.inputFormData : {};
                                                inputFormData.formMembers = this.state.formMembers
                                                this.props.loadInputFormHealth(inputFormData)
                                            }}>+</button>
                                    </td>}
                            </tr>
                            <tr>
                                <td>

                                    <FormControlLabel classes={{
                                        root: classes.formControlLabel,
                                        label: classes.typography
                                    }}
                                        control={
                                            <Checkbox
                                                checked={daughter}
                                                onChange={this.handleChange('daughter')}
                                                disabled={this.state.formMembers.noOfSon > 3}
                                                value="daughter"
                                                classes={{
                                                    root: classes.checkboxRoot,
                                                    checked: classes.checked
                                                }} />
                                        }
                                        label="Daughter"
                                        classes={{
                                            label: classes.labelCheckbox
                                        }}
                                    />
                                </td>
                                {daughter &&
                                    <td>
                                        <button
                                            style={
                                                {
                                                    background: '#fff',
                                                    borderColor: '#333',
                                                    color: '#333',
                                                    marginLeft: '3rem'
                                                }}
                                            onClick={() => {
                                                const vm = this;
                                                let { noOfDaughter } = this.state.formMembers;
                                                if (noOfDaughter > 1) {
                                                    if (noOfDaughter === 1) {
                                                        let formData = vm.state.formMembers
                                                        formData['noOfDaughter'] = --noOfDaughter
                                                        formData['daughter'] = false
                                                        vm.setState({ formMembers: formData })

                                                        // this.setState({ noOfSon: --noOfSon, son: false })
                                                    } else {

                                                        // this.setState({ noOfSon: --noOfSon })
                                                        let formData = vm.state.formMembers
                                                        formData['noOfDaughter'] = --noOfDaughter
                                                        vm.setState({ formMembers: formData })

                                                    }
                                                }
                                                else {
                                                    // this.setState({ son: false })
                                                    let formData = this.state.formMembers
                                                    formData['daughter'] = false
                                                    this.setState({ formMembers: formData })
                                                }
                                                let inputFormData = this.props.inputFormData !== undefined ? this.props.inputFormData : {};
                                                inputFormData.formMembers = this.state.formMembers
                                                this.props.loadInputFormHealth(inputFormData)
                                            }}
                                            disabled={!this.state.formMembers.noOfDaughter > 0}>&ndash;</button>
                                        <input
                                            style={
                                                {
                                                    background: '#fff',
                                                    borderColor: '#333',
                                                    color: '#333',
                                                    width: '25px',
                                                    borderLeft: 'none',
                                                    borderRight: 'none',
                                                    textAlign: 'center'
                                                }}
                                            value={this.state.formMembers.noOfDaughter}
                                            disabled={false}
                                            name="noOfDaughter"
                                            onChange={(event) => {
                                                let noOfDaughter = event.target.value;
                                                if (noOfDaughter > 0 && noOfDaughter <= this.state.maxChildLimit) {
                                                    let formData = this.state.formMembers
                                                    formData['daughter'] = event.target.value
                                                    this.setState({ formMembers: formData })
                                                    // this.setState({ noOfSon: event.target.value })
                                                }
                                                else if (noOfDaughter > this.state.maxChildLimit) {
                                                    let formData = this.state.formMembers
                                                    formData['daughter'] = this.state.formMembers.noOfDaughter
                                                    this.setState({ formMembers: formData })
                                                    // this.setState({ noOfSon: this.state.formMembers.noOfSon })
                                                }
                                                else {
                                                    // this.setState({ son: false, noOfSon: null })
                                                    let formData = this.state.formMembers
                                                    formData['noOfDaughter'] = null
                                                    formData['daughter'] = false
                                                    formData['daughter'] = 1
                                                    this.setState({ formMembers: formData })
                                                }
                                                let inputFormData = this.props.inputFormData !== undefined ? this.props.inputFormData : {};
                                                inputFormData.formMembers = this.state.formMembers
                                                this.props.loadInputFormHealth(inputFormData)
                                            }} />
                                        <button
                                            style={
                                                {
                                                    background: '#fff',
                                                    borderColor: '#333',
                                                    color: '#333'
                                                }}
                                            onClick={() => {
                                                let { noOfDaughter, noOfSon } = this.state.formMembers;
                                                if (son) {
                                                    if ((noOfSon + noOfDaughter) < 4) {
                                                        // this.setState({ noOfDaughter: ++noOfDaughter, daughter: true })
                                                        let formData = this.state.formMembers
                                                        formData['noOfDaughter'] = ++noOfDaughter
                                                        formData['daughter'] = true
                                                        this.setState({ formMembers: formData })
                                                    }
                                                } else {
                                                    if ((noOfDaughter) < 4) {
                                                        // this.setState({ noOfDaughter: ++noOfDaughter, daughter: true })
                                                        let formData = this.state.formMembers
                                                        formData['noOfDaughter'] = ++noOfDaughter
                                                        formData['daughter'] = true
                                                        this.setState({ formMembers: formData })
                                                    }
                                                }
                                                let inputFormData = this.props.inputFormData !== undefined ? this.props.inputFormData : {};
                                                inputFormData.formMembers = this.state.formMembers
                                                this.props.loadInputFormHealth(inputFormData)
                                            }
                                            }>+</button>
                                    </td>}
                            </tr>
                            <FormControlLabel classes={{
                                root: classes.formControlLabel,
                                label: classes.typography
                            }}
                                control={
                                    <Checkbox
                                        checked={mother}
                                        onChange={this.handleChange('mother')}
                                        value="mother"
                                        classes={{
                                            root: classes.checkboxRoot,
                                            checked: classes.checked
                                        }}
                                    />
                                }
                                label="Mother"
                                classes={{
                                    label: classes.labelCheckbox
                                }}
                            />
                            <FormControlLabel classes={{
                                root: classes.formControlLabel,
                                label: classes.typography
                            }}
                                control={
                                    <Checkbox
                                        checked={father}
                                        onChange={this.handleChange('father')}
                                        value="father"
                                        classes={{
                                            root: classes.checkboxRoot,
                                            checked: classes.checked
                                        }}
                                    />
                                }
                                label="Father"
                                classes={{
                                    label: classes.labelCheckbox
                                }}
                            />
                            <FormControlLabel classes={{
                                root: classes.formControlLabel,
                                label: classes.typography
                            }}
                                control={
                                    <Checkbox
                                        checked={mother_in_law}
                                        onChange={this.handleChange('mother_in_law')}
                                        value="mother_in_law"
                                        classes={{
                                            root: classes.checkboxRoot,
                                            checked: classes.checked
                                        }}
                                    />
                                }
                                label="Mother-in-law"
                                classes={{
                                    label: classes.labelCheckbox
                                }}
                            />
                            <FormControlLabel classes={{
                                root: classes.formControlLabel,
                                label: classes.typography
                            }}
                                control={
                                    <Checkbox
                                        checked={father_in_law}
                                        onChange={this.handleChange('father_in_law')}
                                        value="father_in_law"
                                        classes={{
                                            root: classes.checkboxRoot,
                                            checked: classes.checked
                                        }}
                                    />
                                }
                                label="Father-in-law"
                                classes={{
                                    label: classes.labelCheckbox
                                }}
                            />
                        </FormGroup>
                    </FormControl>
                </div>
            </div>
        )
    }
}

SelectMembers.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    loadInputFormHealth: data => dispatch({ type: 'INPUT_FORM_HEALTH', data })
})

const mapStateToProps = state => {
    return {
        inputFormData: state.inputFormHealth.inputFormHealthData
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectMembers))
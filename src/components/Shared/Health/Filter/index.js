import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { connect } from 'react-redux'
import axios from 'axios';
import constants from '../../../../constants/appConstants.json'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';

const styles = theme => ({
    formControl: {
        minWidth: 120,
        display: 'inline-grid'
    },
    formControlLabel: {
        marginTop: theme.spacing.unit,
    },
    rootRadio: {
        color: '#333',
        '&$checked': {
            color: '#ea0b4b',
        },
    },
    checked: {},
    helpIcon: {
        marginRight: '1rem'
    },
    helpIconM: {
        float: 'right'
    },
    formLabel: {
        marginTop: '1rem'
    },
    cssRoot: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        textTransform: 'capitalize',
        padding: '6px 46px'
    },
    filterApply: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        textTransform: 'capitalize',
        padding: '6px 84px'
    },
    fixApplyButton: {
        bottom: 0,
        position: 'fixed',
        backgroundColor: 'white',
        zIndex: 1000,
        padding: '8px',
        borderTop: '1px solid rgba(0, 0, 0, 0.5)',
        marginLeft: '-14px'
    }

});

class Filter extends React.Component {
    state = {
        open: false,
        fullWidth: true,
        renderInfo: [
            {
                labelName: 'Plan',
                radioList: [
                    { name: 'Base Plans', value: 'BASE' },
                    { name: 'Top-up Plans', value: 'TOP_UP' },
                    { name: 'Base with Maternity', value: 'BASE_MATERNITY' },
                    { name: 'Critical Illness', value: 'CRITICAL_ILLNESS' }
                ],
                keyName: 'planType'
            },
            {
                labelName: 'Room Rent',
                radioList: [
                    { name: 'No-limit', value: 'no limit' },
                    { name: 'At least private room', value: 'private' }
                ],
                keyName: 'roomRent'
            },
            {
                labelName: 'Pre-existing Disease Covered After?',
                radioList: [
                    { name: '1 Year', value: '1 Year' },
                    { name: '2 Years', value: '2 Year' },
                    { name: '3 Years', value: '3 Year' },
                    { name: '4 Years', value: '4 Year' },
                ],
                keyName: 'preExistingDisease'
            },
            {
                labelName: 'Plan benefits.',
                radioList: [
                    { name: 'Maternity Cover', value: 'Maternity Cover' },
                    { name: 'Restoration', value: 'Restoration Benefits' },
                ],
                keyName: 'planBenefits'
            },
            {
                labelName: 'Co-pay',
                radioList: [
                    { name: 'No Co-pay', value: '0' },
                    { name: 'Less than 10%', value: '10' },
                    { name: 'Less than 20%', value: '20' },
                    { name: ' Less than 30%', value: '30' },
                    { name: ' Less than 40%', value: '40' }
                ],
                keyName: 'coPay'
            }
        ],

        filterForm: {
            planType: {
                value: '',
                rules: {
                    isRequired: false,
                }
            },
            roomRent: {
                value: '',
                rules: {
                    isRequired: false
                }
            },
            preExistingDisease: {
                value: '',
                rules: {
                    isRequired: false
                }
            },
            planBenefits: {
                value: {},
                rules: {
                    isRequired: false
                }
            },
            coPay: {
                value: "-1",
                rules: {
                    isRequired: false
                }
            }
        }

    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    // Set values
    handleChange = (event) => {

        const formData = this.state.filterForm;
        formData[event.target.name].value = event.target.value;
        this.setState({ filterForm: formData })
        return true
    }

    handleCheckBoxChange = (event) => {
        const formData = this.state.filterForm;
        formData[event.target.name].value = { ...formData[event.target.name].value, [event.target.value]: event.target.checked }
        this.setState({ filterForm: formData })

        return true
    }

    getFilteredQuotes = () => {
        let healthQuoteInputFormData;
        const vm = this;
        let planBenefits = this.state.filterForm.planBenefits.value
        healthQuoteInputFormData = {
            healthQuoteInputForm: this.props.inputFormHealthData,
            sort: vm.props.sort,
            modifyCover: vm.props.modifyCover,
            filter: {
                planType: vm.state.filterForm.planType.value,
                roomRent: vm.state.filterForm.roomRent.value,
                preExistingDisease: vm.state.filterForm.preExistingDisease.value,
                // planBenefits: vm.state.filterForm.planBenefits.value,
                planBenefits: planBenefits,
                coPay: Number(vm.state.filterForm.coPay.value),
                flag: true
            }
        }
        axios.post(`${constants.apiRootURL}/health-quotes/operation`, healthQuoteInputFormData)
            .then(response => {

                this.props.triggerQuoteUpdate(response.data)
                this.props.filterData(healthQuoteInputFormData.filter)
                vm.props.close();
            }).catch(error => {

                vm.props.close();
            })
        return true
    }
    clearFilter = () => {
        const { filterForm } = this.state
        for (let key in filterForm) {
            filterForm[key].value = ''
        }
        this.setState(prevstate => ({
            ...prevstate,
            filterForm: {
                ...prevstate.filterForm, 
                coPay: {
                    value: "-1"
                },
                planBenefits: {  value: {}
                }
            }
        }))

    }

    render() {

        const { classes } = this.props;
        const { fullScreen } = this.props;
        return (

            <React.Fragment>
                <div className="get-discount-popup">
                    <Dialog
                        fullScreen={fullScreen}
                        maxWidth={'md'}
                        open={this.props.open}
                        onClose={this.handleClose}
                    >
                        <DialogContent style={{ paddingTop: window.innerWidth < 768 ? '0px' : '' }}>

                            <div className={`${window.innerWidth < 768 ? 'sticky-discount-dialog-head' : ''}`}>
                                {window.innerWidth < 768 && <img
                                    src="/assets/cancel.svg"
                                    alt="close"
                                    style={{ float: 'right', cursor: 'pointer' }}
                                    onClick={this.props.close} />}
                                <div className={`${window.innerWidth < 768 ? 'gbui-h7' : 'gbui-h5'} success-gb text-centerD`}>
                                    {window.innerWidth > 767 && <img
                                        src="/assets/cancel.svg"
                                        alt="close"
                                        style={{ float: 'right', cursor: 'pointer' }}
                                        onClick={this.props.close} />}
                                    Filter your quotes

                                </div>
                                <div className={`light-gb ${window.innerWidth < 768 ? 'gbui-body-2' : 'gbui-body-1'} text-centerD`}>
                                    Let us know what you need and we will help you in finding the best insurance for you.
                                </div>
                                <hr />
                            </div>

                            <form noValidate className="get-discount-table-form">

                                {/* Plan type */}

                                {this.state.renderInfo.map((item, index) =>
                                    <div className="filter-plan-div" style={{ display: 'grid' }}>
                                        <p className="gbui-h7 success-gb">{`${index + 1}. ${item.labelName}`}</p>

                                        <FormControl component="fieldset" className={classes.formControl} row>

                                            <RadioGroup
                                                aria-label={item.keyName}
                                                name={item.keyName}
                                                className={classes.group}
                                                value={this.state.filterForm[item.keyName].value}
                                                onChange={this.handleChange}
                                                row
                                            >
                                                {item.labelName != 'Plan benefits.' && item.radioList.map(radio =>

                                                    <FormControlLabel
                                                        value={radio.value}
                                                        control={<Radio classes={{
                                                            root: classes.rootRadio,
                                                            checked: classes.checked,
                                                        }} color="primary" />}
                                                        label={radio.name}
                                                    />
                                                )}

                                            </RadioGroup>

                                        </FormControl>

                                        <FormGroup>
                                            <FormControl component="fieldset" className={classes.formControl} row>
                                                {item.labelName == 'Plan benefits.' && item.radioList.map(radio =>

                                                    <FormControlLabel
                                                        control={<Checkbox checked={this.state.filterForm[item.keyName].value[radio.value]}
                                                            onChange={this.handleCheckBoxChange}
                                                            value={radio.value}
                                                            aria-label={item.keyName}
                                                            name={item.keyName}

                                                        />}
                                                        label={
                                                            radio.name}
                                                    />)}

                                            </FormControl>
                                        </FormGroup>
                                    </div>
                                )}

                                <div class="mui--hidden-xs mui--hidden-sm" style={{ textAlign: 'center', width: '100%', }}>
                                    <Button onClick={this.clearFilter}
                                        variant="contained"
                                        className={classNames(classes.cssRoot)}>Clear</Button> &nbsp;&nbsp;
                                    <Button onClick={this.getFilteredQuotes}
                                        variant="contained"
                                        className={classNames(classes.cssRoot)}>Apply</Button>
                                </div>
                                <div class="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ textAlign: 'center', width: '100%', }}>
                                    <Button onClick={this.clearFilter}
                                        variant="contained"
                                        className={classNames(classes.filterApply)}>Clear</Button> &nbsp;&nbsp;
                                    <Button onClick={this.getFilteredQuotes}
                                        variant="contained"
                                        className={classNames(classes.filterApply)}>Apply</Button>
                                </div>


                                <br /><br />
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </React.Fragment >

        )
    }
}

Filter.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    inputFormHealthData: state.inputFormHealth.inputFormHealthData,
})

export default connect(mapStateToProps)(withStyles(styles)(withMobileDialog()(Filter)));

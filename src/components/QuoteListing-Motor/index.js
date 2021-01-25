import React from 'react'
import './quote-listing-motor.css'
import Header from '../AlternateBuyerJourney/Header'
import PolicyDetails from './MotorInputEdit/PolicyDetails'
import CarDetails from './MotorInputEdit/CarDetails'
import RegistrationDetails from './MotorInputEdit/RegistrationDetails'

import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Panel from 'muicss/lib/react/panel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import StarRate from '@material-ui/icons/StarRate';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import Slider from '@material-ui/lab/Slider'


import AdditionCoverDialog from './Dialogs/additionalCover'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => ({
    root: {
        display: 'flex',
    },
    margin: {
        margin: '4px',
    },
    cssRoot: {
        color: 'black',
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: 'white',
        },
        textTransform: 'capitalize',
        padding: '0px 10px'
    },
    formGroup: {
        display: 'block',
        marginTop: '32px'
    },
    formGroup1: {
        display: 'inline',
        fontSize: '10px'
    },
    formGroupL: {
        fontSize: '10px'
    },
    button: {
        color: '#0da176',
        background: '#ffffff',
        '&:hover': {
            backgroundColor: '#f6f6f6',
            border: '1px solid #0da176'
        },
        border: '1px solid #0da176',
        marginTop: '12px',
        textTransform: 'lowercase'
    },
    paperScroll: {
        // overflowX: 'auto'
    },
    buttonEdit: {
        color: '#0da176',
        background: '#ffffff',
        '&:hover': {
            backgroundColor: '#f6f6f6',
            border: '1px solid #0da176'
        },
        border: '1px solid #0da176',
        padding: '10px 40px',
        margin: '0.8rem'
    },
    radio_root: {
        color: 'black',
        '&$checked': {
            color: '#0da176',
        },
    },
    checked: {},
    label: {
        color: '#9c0f46',
        fontSize: '13px',
        fontFamily: 'Nunito',
        fontWeight: 'bold',
    },
    slider: {
        padding: '22px 0px',
    },
    sliderRoot: {
        background: '#0da176'
    },
});
class QuoteListMotor extends React.Component {

    state = {
        open: false,
        active_step: 1,
        iconWidth: 0,
        fullWidth: false,
        sortBy: [
            'Premium Low to High',
            'Premium High to Low',
            'IDV- High to Low',
            'IDV- Low to High',
            'Rating- High to Low',
            'Most Relevant',
            'Claim Settled %- High to Low',
            'Value for money',
            'Coverage',
            'Servicing',
            'Best Product'
        ],
        sort_by_menu: false, // Show or hide sort by filter menu
        sortByFilterMenu: '', // Hold current value for sort by premium filter
        cover_type: 'comprehensive cover',
        cover_type_menu: false, // Show or hide cover type menu
        openAdditionCover: false
    }
    handleClickOpen = (step_value) => {
        const vm = this;
        this.setState({ open: true, active_step: step_value });
        setTimeout(() => {
            console.log(document.getElementsByClassName('tabs-input-motor-edit')[0].clientWidth);
            const width = window.innerWidth; //eslint-disable
            vm.setState({ iconWidth: width });
            console.log(width);
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleAdditionClose = () => {
        this.setState({openAdditionCover: false})
    }
    handleSortByFilter = (event) => {
        this.setState({
            sortByFilterMenu: event.target.attributes['value'].value,
            sort_by_menu: false
        })
    }
    componentDidMount() {
        if (window.innerWidth <= 767)
            this.setState({ fullWidth: true });
        else
            this.setState({ fullWidth: false });
        const vm = this;
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 767)
                vm.setState({ fullWidth: true });
            else
                vm.setState({ fullWidth: false });
        });
    }
    render() {
        const { classes } = this.props;
        return (

            <div className="quote-list-motor-parent">
                {/* Header */}
                <div className="mui--hidden-sm mui--hidden-xs">
                    <Header />
                </div>

                {/* HEader for editing mortor details like make model, policy or registration */}
                <div class="mui-panel panel-edit-quote-motor-links">
                    <Row className="padding-left-quote">
                        <Col md="5">
                            <p className="padding-text-edit-quote-motor">
                                MH-02-AJ-1234, Navi Mumbai, Hyundai i10 1.2 Era Petrol, 2014 &nbsp;&nbsp;
                                <span
                                    className="edit-quote-motor-text-success"
                                    onClick={() => { this.handleClickOpen(1) }}>Edit</span>
                            </p>
                        </Col>
                        <Col md="3" className="border-left-text-edit-quote-motor">
                            <p className="padding-text-edit-quote-motor">
                                Past policy expired, before 90 days &nbsp;&nbsp;
                                <span
                                    className="edit-quote-motor-text-success"
                                    onClick={() => { this.handleClickOpen(2) }}>Edit</span>
                            </p>
                        </Col>
                        <Col md="4" className="border-left-text-edit-quote-motor">
                            <p className="padding-text-edit-quote-motor padding-text-edit-quote-motor-last">
                                Registration : 01/10/2014  &nbsp;&nbsp;
                                <span
                                    className="edit-quote-motor-text-success"
                                    onClick={() => { this.handleClickOpen(3) }}>Edit</span>
                            </p>
                        </Col>
                    </Row>
                </div>

                {/* Row for dividing */}
                <Row>
                    <Col lg="9">
                        {/* Div for body contents */}

                        <div className="body-content-quote-motor">
                            <div className="mui-container-fluid">
                                <Row>
                                    <Col md="9">
                                        <div className="heading-body-and-results-text-div">
                                            <p className="heading-body-quote-motor mui--hidden-xs mui--hidden-sm">Car Insurance Plans</p>
                                            <p className="heading-body-results-text-quote-motor">Showing 4 Plans | GST Included</p>

                                        </div>
                                    </Col>
                                    <Col md="3">
                                    </Col>
                                </Row>
                            </div>

                            {/* Sort div */}

                            <div className="sort-filter-motor-quote-div">
                                <div className="mui-container-fluid">
                                    <Row>
                                        <Col md="2" lg="1" xs="4">
                                            <div className="premium-filter-dropdown">
                                                <div
                                                    className="sort-by-filter-text-div"
                                                    onClick={() => {
                                                        const vm = this;
                                                        this.setState({ sort_by_menu: !vm.state.sort_by_menu });
                                                    }}>
                                                    <p>Sort by</p>
                                                    <p className="sort-by-text-quote-motor">Premium <img src="/assets/Group 1911 (1).svg" alt="sort" style={{ width: '20px', display: 'inline' }} /></p>
                                                </div>
                                                {/* Dropdown menu */}
                                                {this.state.sort_by_menu &&
                                                    <div className="dropdown-content-fliter">
                                                        {this.state.sortBy.map((item, index) =>
                                                            <p value={index} onClick={this.handleSortByFilter} className={index === 0 ? "selected" : "item"}>{item}</p>
                                                        )}
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="2" lg="5" xs="8" className="border-left-text-edit-quote-motor">
                                            <div className="cover-type-dropdown">
                                                <div
                                                    className="cover-type-value-div-quote-motor"
                                                    onClick={() => {
                                                        const vm = this;
                                                        this.setState({cover_type_menu: !vm.state.cover_type_menu})
                                                    }}>
                                                    <p className="label-cover-type-quote-motor p-motor-quote">Cover type and value (IDV)</p>
                                                    <p className="cover-type-value-quote-list-motor">
                                                        Comprehensive Cover of ₹ 5,45,002 &nbsp;
                                                    </p>
                                                </div>
                                                {/* Menu content */}
                                                {this.state.cover_type_menu &&
                                                    <div className="cover-type-dropdown-menu-content">
                                                    {/* Cover type radio button */}
                                                    <FormControl component="fieldset" className={classes.formControl}>
                                                        <FormLabel component="legend" className={classes.label}>Cover Type</FormLabel>
                                                        <RadioGroup
                                                            aria-label="Cover Type"
                                                            name="cover_type"
                                                            className={classes.group}
                                                            value={this.state.cover_type}
                                                            onChange={this.handleChange}
                                                        >
                                                            <FormControlLabel
                                                                value="comprehensive cover"
                                                                control={<Radio classes={{
                                                                    root: classes.radio_root,
                                                                    checked: classes.checked,
                                                                }} />}
                                                                label="Comprehensive cover" />
                                                            <FormHelperText style={{ marginTop: '-1rem', marginLeft: '2rem' }}>(Own damage + 3rd party cover)</FormHelperText>
                                                            <FormControlLabel
                                                                value="3rd party"
                                                                control={<Radio classes={{
                                                                    root: classes.root,
                                                                    checked: classes.checked,
                                                                }} />} label="3rd party cover only" />
                                                        </RadioGroup>
                                                    </FormControl>

                                                    {/* Cover Value */}
                                                    <FormControl component="fieldset" className={classes.formControl}>
                                                        <FormLabel component="legend" className={classes.label}>Cover Value (IDV)</FormLabel>
                                                        <RadioGroup
                                                            aria-label="Cover Value (IDV)"
                                                            name="cover_type"
                                                            className={classes.group}
                                                            value={"lowest"}
                                                            onChange={this.handleChange}
                                                        >
                                                            <FormControlLabel
                                                                value="lowest"
                                                                control={<Radio classes={{
                                                                    root: classes.radio_root,
                                                                    checked: classes.checked,
                                                                }} />}
                                                                label="Lowest Possible" />
                                                            {/* <FormHelperText style={{marginTop: '-1rem', marginLeft: '2rem'}}>(Own damage + 3rd party cover)</FormHelperText> */}
                                                            <FormControlLabel
                                                                value="recommended"
                                                                control={<Radio classes={{
                                                                    root: classes.root,
                                                                    checked: classes.checked,
                                                                }} />} label="Recommended" />
                                                            <FormControlLabel
                                                                value="own"
                                                                control={<Radio classes={{
                                                                    root: classes.root,
                                                                    checked: classes.checked,
                                                                }} />} label="Set your own IDV" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <p className="current-amount">Rs. 5,08,900</p>
                                                    <Slider
                                                        classes={{ container: classes.slider, trackBefore: classes.sliderRoot, thumb: classes.sliderRoot }}
                                                        value={50}
                                                        aria-labelledby="label"
                                                    />
                                                    <p className="minValue">Rs. 1,00,999</p>
                                                    <p className="maxValue">Rs. 5,08,900</p>
                                                </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="8" lg="6" xs="12">
                                            <Button variant="contained"
                                                className={classNames(classes.margin, classes.cssRoot)}
                                                onClick={() => {this.setState({openAdditionCover: true})}}>Additional Covers</Button>
                                            <Button variant="contained" className={classNames(classes.margin, classes.cssRoot)}>Discounts</Button>
                                            <Button variant="contained" className={classNames(classes.margin, classes.cssRoot)}>Add-Ons</Button>
                                        </Col>
                                    </Row>
                                </div>
                                {/* fields header div */}
                                <div className="mui-container-fluid">
                                    <div className="fields-header-div-quote-motor">
                                        <Row className="row">
                                            <Col md="2" className="mui--hidden-xs mui--hidden-sm">
                                                <p className="field-item">Insurer</p>
                                            </Col>
                                            <Col md="2" xs="4">
                                                <p className="field-item">IDV (₹)</p>
                                            </Col>
                                            <Col md="2" xs="4">
                                                <p className="field-item">Claims</p>
                                            </Col>
                                            <Col md="2" xs="4">
                                                <p className="field-item">Cashless</p>
                                            </Col>
                                            <Col md="2" className="mui--hidden-xs mui--hidden-sm">
                                                <p className="field-item">Add-Ons</p>
                                            </Col>
                                            <Col md="2" className="mui--hidden-xs mui--hidden-sm">
                                                <p className="field-item">Premium</p>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>

                                {/* Plans Card */}
                                <div className="mui-container-fluid insurer-detail-container-quote-motor">
                                    <p className="compr-plans-quote-motor">Comprehensive Plans <span className="counts-quote-motor">(3)</span></p>
                                    {/* Card-1 */}
                                    <Panel>
                                        <Row className="border-sm-row-quote-motor">
                                            <Col md="2" sm="2" xs="3">
                                                <div className="logo-insurer-div-quote-car">
                                                    <img src="/assets/aegon.png" alt="insurer" className="insurer-image" />
                                                    <FormGroup row className={classNames(classes.formGroup, 'mui--hidden-sm mui--hidden-xs')}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    value="checkedA"
                                                                />
                                                            }
                                                            label="Add to compare"
                                                        />
                                                    </FormGroup>
                                                </div>
                                            </Col>
                                            <Col md="8" xs="6" className="col-insurer-desc-quote-motor">
                                                <div className="insurer-desc-quote-car-div">
                                                    <p className="insurer-desc-quote-car-heading">
                                                        Reliance private car package policy
                                                        <p style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '14px' }} className="mui--hidden-xs mui--hidden-sm">
                                                            <img src="/assets/pdf-file-symbol.svg" alt="pdf" style={{ width: '20px', height: '20px' }} />Policy Brochure
                                                        </p>
                                                    </p>
                                                    <p className="reviews-insurer-quote-car">
                                                        4.6
                                                        <StarRate style={{ marginBottom: '-6px', fontSize: '18px', color: '#efce4a' }} />

                                                    </p>
                                                    <div className="row-insurer-desc-quote-car-div mui--hidden-sm mui--hidden-xs">
                                                        <Row>
                                                            <Col md="3">
                                                                <p className="amount-insurer down-padding">₹ 1,03,309</p>
                                                            </Col>
                                                            <Col md="3" className="border-left">
                                                                <p className="percentage-insurer down-padding">98.2%</p>
                                                            </Col>
                                                            <Col md="3" className="border-left">
                                                                <p className="garages-insurer">garages near you</p>
                                                                <p className="number-garage-insurer down-padding-new">7</p>
                                                            </Col>
                                                            <Col md="3" className="border-left">
                                                                <table style={{ width: '100%' }}>
                                                                    <tr>
                                                                        <td>
                                                                            <p>Zero Depriciation</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className="success">Free</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p>Daily Allowance</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className="danger">NA</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p>Loss of personal belongings</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className="success">₹ 172</p>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <p className="show-all">Show all <img src="/assets/ic_keyboard_arrow_down_24px.svg" alt="arrow down" style={{ width: '10px' }} /></p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md="2" xs="3" className="col-buy-plan-quote-motor">
                                                <Panel className="panel-car-insurer-plan">
                                                    <p className="buy-plain">Buy Plan</p>
                                                    <p className="amount">₹ 1,143 <span>/ month</span></p>
                                                </Panel>
                                                <p className="plain-details-car-insurer-text mui--hidden-sm mui--hidden-xs">
                                                    Plan Details
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ borderBottom: '1px solid rgb(112,112,112, 0.3)', padding: '6px' }}>
                                            <Col xs="4" sm="4">
                                                <p className="sm-amount-insurer-car-quote">₹ 1,03,309</p>
                                            </Col>
                                            <Col xs="4" sm="4" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                <p className="sm-percent-insurer-car-quote">98.2%</p>
                                            </Col>
                                            <Col xs="4" sm="4" className="" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                <p className="sm-no-garage-insurer-car-quote">47</p>
                                                <p className="sm-garage-text-insurer-car-quote">garages near you</p>
                                            </Col>
                                        </Row>
                                        <div className="mui--hidden-lg mui--hidden-md mui--hidden-xl">
                                            <FormGroup row classes={{
                                                root: classes.formGroup1
                                            }}>
                                                <FormControlLabel
                                                    classes={{
                                                        label: classes.formGroupL
                                                    }}
                                                    control={
                                                        <Checkbox
                                                            value="checkedA"
                                                        />
                                                    }
                                                    label="Add to compare"
                                                />
                                            </FormGroup>
                                            <p style={{ display: 'inline', marginLeft: '0px' }}>
                                                <img src="/assets/pdf-file-symbol.svg" alt="pdf-file" style={{ width: '20px', height: '20px' }} />Policy Brochure
                                        </p>
                                            <p className="plain-details-car-insurer-text" style={{ display: 'inline', paddingTop: '18px' }}>
                                                Plan Details
                                        </p>
                                        </div>
                                        <div className="panel-bottom-actions-div">
                                            <p style={{ padding: '6px 12px' }}><img src="/assets/checked-symbol-grn.svg" alt="checked" width="15" /> &nbsp;80% advance cash</p>
                                            <p style={{ padding: '6px 12px' }}><img src="/assets/checked-symbol-grn.svg" alt="checked" width="15" /> &nbsp;Pick Up & Drop with 6 months repair warranty</p>
                                        </div>
                                    </Panel>
                                    {/* Card-1 */}
                                    <Panel>
                                        <Row className="border-sm-row-quote-motor">
                                            <Col md="2" sm="2" xs="3">
                                                <div className="logo-insurer-div-quote-car">
                                                    <img src="/assets/aegon.png" alt="insurer" className="insurer-image" />
                                                    <FormGroup row className={classNames(classes.formGroup, 'mui--hidden-sm mui--hidden-xs')}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    value="checkedA"
                                                                />
                                                            }
                                                            label="Add to compare"
                                                        />
                                                    </FormGroup>
                                                </div>
                                            </Col>
                                            <Col md="8" xs="6" className="col-insurer-desc-quote-motor">
                                                <div className="insurer-desc-quote-car-div">
                                                    <p className="insurer-desc-quote-car-heading">
                                                        Reliance private car package policy
                                                        <p style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '14px' }} className="mui--hidden-xs mui--hidden-sm">
                                                            <img src="/assets/pdf-file-symbol.svg" alt="pdf" style={{ width: '20px', height: '20px' }} />Policy Brochure
                                                        </p>
                                                    </p>
                                                    <p className="reviews-insurer-quote-car">
                                                        4.6
                                                        <StarRate style={{ marginBottom: '-6px', fontSize: '18px', color: '#efce4a' }} />

                                                    </p>
                                                    <div className="row-insurer-desc-quote-car-div mui--hidden-sm mui--hidden-xs">
                                                        <Row>
                                                            <Col md="3">
                                                                <p className="amount-insurer down-padding">₹ 1,03,309</p>
                                                            </Col>
                                                            <Col md="3" className="border-left">
                                                                <p className="percentage-insurer down-padding">98.2%</p>
                                                            </Col>
                                                            <Col md="3" className="border-left">
                                                                <p className="garages-insurer">garages near you</p>
                                                                <p className="number-garage-insurer down-padding-new">7</p>
                                                            </Col>
                                                            <Col md="3" className="border-left">
                                                                <table style={{ width: '100%' }}>
                                                                    <tr>
                                                                        <td>
                                                                            <p>Zero Depriciation</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className="success">Free</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p>Daily Allowance</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className="danger">NA</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p>Loss of personal belongings</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className="success">₹ 172</p>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <p className="show-all">Show all <img src="/assets/ic_keyboard_arrow_down_24px.svg" alt="arrow-down" style={{ width: '10px' }} /></p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md="2" xs="3" className="col-buy-plan-quote-motor">
                                                <Panel className="panel-car-insurer-plan">
                                                    <p className="buy-plain">Buy Plan</p>
                                                    <p className="amount">₹ 1,143 <span>/ month</span></p>
                                                </Panel>
                                                <p className="plain-details-car-insurer-text mui--hidden-sm mui--hidden-xs">
                                                    Plan Details
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ borderBottom: '1px solid rgb(112,112,112, 0.3)', padding: '6px' }}>
                                            <Col xs="4" sm="4">
                                                <p className="sm-amount-insurer-car-quote">₹ 1,03,309</p>
                                            </Col>
                                            <Col xs="4" sm="4" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                <p className="sm-percent-insurer-car-quote">98.2%</p>
                                            </Col>
                                            <Col xs="4" sm="4" className="" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                <p className="sm-no-garage-insurer-car-quote">47</p>
                                                <p className="sm-garage-text-insurer-car-quote">garages near you</p>
                                            </Col>
                                        </Row>
                                        <div className="mui--hidden-lg mui--hidden-md mui--hidden-xl">
                                            <FormGroup row classes={{
                                                root: classes.formGroup1
                                            }}>
                                                <FormControlLabel
                                                    classes={{
                                                        label: classes.formGroupL
                                                    }}
                                                    control={
                                                        <Checkbox
                                                            value="checkedA"
                                                        />
                                                    }
                                                    label="Add to compare"
                                                />
                                            </FormGroup>
                                            <p style={{ display: 'inline', marginLeft: '0px' }}>
                                                <img src="/assets/pdf-file-symbol.svg" alt="pdf" style={{ width: '20px', height: '20px' }} />Policy Brochure
                                        </p>
                                            <p className="plain-details-car-insurer-text" style={{ display: 'inline', paddingTop: '18px' }}>
                                                Plan Details
                                        </p>
                                        </div>
                                        <div className="panel-bottom-actions-div">
                                            <p style={{ padding: '6px 12px' }}><img src="/assets/checked-symbol-grn.svg" alt="checked" width="15" /> &nbsp;80% advance cash</p>
                                            <p style={{ padding: '6px 12px' }}><img src="/assets/checked-symbol-grn.svg" alt="checked" width="15" /> &nbsp;Pick Up & Drop with 6 months repair warranty</p>
                                        </div>
                                    </Panel>
                                    {/* Card 3 */}
                                    {/* Card-1 */}
                                    <Panel>
                                        <Row className="border-sm-row-quote-motor">
                                            <Col md="2" sm="2" xs="3">
                                                <div className="logo-insurer-div-quote-car">
                                                    <img src="/assets/aegon.png" alt="insurer" className="insurer-image" />
                                                    <FormGroup row className={classNames(classes.formGroup, 'mui--hidden-sm mui--hidden-xs')}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    value="checkedA"
                                                                />
                                                            }
                                                            label="Add to compare"
                                                        />
                                                    </FormGroup>
                                                </div>
                                            </Col>
                                            <Col md="8" xs="6" className="col-insurer-desc-quote-motor">
                                                <div className="insurer-desc-quote-car-div">
                                                    <p className="insurer-desc-quote-car-heading">
                                                        Reliance private car package policy
                                                        <p style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '14px' }} className="mui--hidden-xs mui--hidden-sm">
                                                            <img src="/assets/pdf-file-symbol.svg" alt="pdf" style={{ width: '20px', height: '20px' }} />Policy Brochure
                                                        </p>
                                                    </p>
                                                    <p className="reviews-insurer-quote-car">
                                                        4.6
                                                        <StarRate style={{ marginBottom: '-6px', fontSize: '18px', color: '#efce4a' }} />

                                                    </p>
                                                    <div className="row-insurer-desc-quote-car-div mui--hidden-sm mui--hidden-xs">
                                                        <Row>
                                                            <Col md="3">
                                                                <p className="amount-insurer down-padding">₹ 1,03,309</p>
                                                            </Col>
                                                            <Col md="3" className="border-left">
                                                                <p className="percentage-insurer down-padding">98.2%</p>
                                                            </Col>
                                                            <Col md="3" className="border-left">
                                                                <p className="garages-insurer">garages near you</p>
                                                                <p className="number-garage-insurer down-padding-new">7</p>
                                                            </Col>
                                                            <Col md="3" className="border-left">
                                                                <table style={{ width: '100%' }}>
                                                                    <tr>
                                                                        <td>
                                                                            <p>Zero Depriciation</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className="success">Free</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p>Daily Allowance</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className="danger">NA</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p>Loss of personal belongings</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className="success">₹ 172</p>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <p className="show-all">Show all<img src="/assets/ic_keyboard_arrow_down_24px.svg" alt="arrow-down" style={{ width: '10px' }} /></p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md="2" xs="3" className="col-buy-plan-quote-motor">
                                                <Panel className="panel-car-insurer-plan">
                                                    <p className="buy-plain">Buy Plan</p>
                                                    <p className="amount">₹ 1,143 <span>/ month</span></p>
                                                </Panel>
                                                <p className="plain-details-car-insurer-text mui--hidden-sm mui--hidden-xs">
                                                    Plan Details
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ borderBottom: '1px solid rgb(112,112,112, 0.3)', padding: '6px' }}>
                                            <Col xs="4" sm="4">
                                                <p className="sm-amount-insurer-car-quote">₹ 1,03,309</p>
                                            </Col>
                                            <Col xs="4" sm="4" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                <p className="sm-percent-insurer-car-quote">98.2%</p>
                                            </Col>
                                            <Col xs="4" sm="4" className="" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                <p className="sm-no-garage-insurer-car-quote">47</p>
                                                <p className="sm-garage-text-insurer-car-quote">garages near you</p>
                                            </Col>
                                        </Row>
                                        <div className="mui--hidden-lg mui--hidden-md mui--hidden-xl">
                                            <FormGroup row classes={{
                                                root: classes.formGroup1
                                            }}>
                                                <FormControlLabel
                                                    classes={{
                                                        label: classes.formGroupL
                                                    }}
                                                    control={
                                                        <Checkbox
                                                            value="checkedA"
                                                        />
                                                    }
                                                    label="Add to compare"
                                                />
                                            </FormGroup>
                                            <p style={{ display: 'inline', marginLeft: '0px' }}>
                                                <img src="/assets/pdf-file-symbol.svg" alt="pdf" style={{ width: '20px', height: '20px' }} />Policy Brochure
                                        </p>
                                            <p className="plain-details-car-insurer-text" style={{ display: 'inline', paddingTop: '18px' }}>
                                                Plan Details
                                        </p>
                                        </div>
                                        <div className="panel-bottom-actions-div">
                                            <p style={{ padding: '6px 12px' }}><img src="/assets/checked-symbol-grn.svg" alt="checked" width="15" /> &nbsp;80% advance cash</p>
                                            <p style={{ padding: '6px 12px' }}><img src="/assets/checked-symbol-grn.svg" alt="checked" width="15" /> &nbsp;Pick Up & Drop with 6 months repair warranty</p>
                                        </div>
                                    </Panel>
                                    <p className="compr-plans-quote-motor" style={{ marginTop: '30px' }}>Third-Party Only Plans <span className="counts-quote-motor">(1)</span></p>
                                    {/* card4 */}
                                    <Panel>
                                        <Row className="border-sm-row-quote-motor">
                                            <Col md="2" sm="2" xs="3">
                                                <div className="logo-insurer-div-quote-car">
                                                    <img src="/assets/aegon.png" alt="insurer" className="insurer-image" />
                                                    <FormGroup row className={classNames(classes.formGroup, 'mui--hidden-sm mui--hidden-xs')}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    value="checkedA"
                                                                />
                                                            }
                                                            label="Add to compare"
                                                        />
                                                    </FormGroup>
                                                </div>
                                            </Col>
                                            <Col md="8" xs="6" className="col-insurer-desc-quote-motor">
                                                <div className="insurer-desc-quote-car-div">
                                                    <p className="insurer-desc-quote-car-heading">
                                                        Reliance private car package policy
                                                        <p style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '14px' }} className="mui--hidden-xs mui--hidden-sm">
                                                            <img src="/assets/pdf-file-symbol.svg" alt="pdf" style={{ width: '20px', height: '20px' }} />Policy Brochure
                                                        </p>
                                                    </p>
                                                    <p className="reviews-insurer-quote-car">
                                                        4.6
                                                        <StarRate style={{ marginBottom: '-6px', fontSize: '18px', color: '#efce4a' }} />

                                                    </p>
                                                    <div className="row-insurer-desc-quote-car-div mui--hidden-sm mui--hidden-xs">
                                                        <Row>
                                                            <Col md="3">
                                                                <p className="amount-insurer down-padding">₹ 1,03,309</p>
                                                            </Col>
                                                            <Col md="3" className="border-left">
                                                                <p className="percentage-insurer down-padding">98.2%</p>
                                                            </Col>
                                                            <Col md="3" className="border-left">
                                                                <p className="garages-insurer">garages near you</p>
                                                                <p className="number-garage-insurer down-padding-new">7</p>
                                                            </Col>
                                                            <Col md="3" className="border-left">
                                                                <table style={{ width: '100%' }}>
                                                                    <tr>
                                                                        <td>
                                                                            <p>Zero Depriciation</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className="success">Free</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p>Daily Allowance</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className="danger">NA</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <p>Loss of personal belongings</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className="success">₹ 172</p>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <p className="show-all">Show all <img src="/assets/ic_keyboard_arrow_down_24px.svg" alt="arrow-down" style={{ width: '10px' }} /></p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md="2" xs="3" className="col-buy-plan-quote-motor">
                                                <Panel className="panel-car-insurer-plan">
                                                    <p className="buy-plain">Buy Plan</p>
                                                    <p className="amount">₹ 1,143 <span>/ month</span></p>
                                                </Panel>
                                                <p className="plain-details-car-insurer-text mui--hidden-sm mui--hidden-xs">
                                                    Plan Details
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ borderBottom: '1px solid rgb(112,112,112, 0.3)', padding: '6px' }}>
                                            <Col xs="4" sm="4">
                                                <p className="sm-amount-insurer-car-quote">₹ 1,03,309</p>
                                            </Col>
                                            <Col xs="4" sm="4" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                <p className="sm-percent-insurer-car-quote">98.2%</p>
                                            </Col>
                                            <Col xs="4" sm="4" className="" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                <p className="sm-no-garage-insurer-car-quote">47</p>
                                                <p className="sm-garage-text-insurer-car-quote">garages near you</p>
                                            </Col>
                                        </Row>
                                        <div className="mui--hidden-lg mui--hidden-md mui--hidden-xl">
                                            <FormGroup row classes={{
                                                root: classes.formGroup1
                                            }}>
                                                <FormControlLabel
                                                    classes={{
                                                        label: classes.formGroupL
                                                    }}
                                                    control={
                                                        <Checkbox
                                                            value="checkedA"
                                                        />
                                                    }
                                                    label="Add to compare"
                                                />
                                            </FormGroup>
                                            <p style={{ display: 'inline', marginLeft: '0px' }}>
                                                <img src="/assets/pdf-file-symbol.svg" alt="pdf" style={{ width: '20px', height: '20px' }} />Policy Brochure
                                        </p>
                                            <p className="plain-details-car-insurer-text" style={{ display: 'inline', paddingTop: '18px' }}>
                                                Plan Details
                                        </p>
                                        </div>
                                        <div className="panel-bottom-actions-div">
                                            <p style={{ padding: '6px 12px' }}><img src="/assets/checked-symbol-grn.svg" alt="checked" width="15" /> &nbsp;80% advance cash</p>
                                            <p style={{ padding: '6px 12px' }}><img src="/assets/checked-symbol-grn.svg" alt="checked" width="15" /> &nbsp;Pick Up & Drop with 6 months repair warranty</p>
                                        </div>
                                    </Panel>
                                </div>
                            </div><br />
                        </div>
                    </Col>
                    <Col md="3" className="mui--hidden-xs mui--hidden-sm">
                        <Panel style={{ marginTop: '15px', marginRight: '10px' }}>
                            <p>Get Assistance offline</p>
                            <p className="text-get-asistance-offline">We would be happy to assist you
                                in any way you need. We'll help you through the whole process
                                without breaking a sweat.
                            </p>
                            <Row>
                                <Col md="6">
                                    <div style={{ textAlign: 'center' }}>
                                        <img src="/assets/Group 696.svg" alt="meet in person" style={{ width: '60px' }} />
                                        <p className="meet-in-person-quote-car">Meet in person</p>
                                    </div>
                                </Col>
                                <Col md="6" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <img src="/assets/Group 698.svg" alt="get a call" style={{ width: '60px' }} />
                                        <p className="meet-in-person-quote-car">Get a call back</p>
                                    </div>
                                </Col>
                            </Row>
                        </Panel>
                        <Panel style={{ marginTop: '15px', marginRight: '10px' }}>
                            <p>Get updates on policy</p>
                            <p className="text-get-asistance-offline">Save all your search results.
                             Make your account and get other benefits and high quality service as well.
                            </p>
                            <Row>
                                <Col md="12">
                                    <TextField label="Name" margin="dense" fullWidth />
                                    <TextField label="Mobile Number" margin="dense" fullWidth />
                                    <Button variant="outlined" color="primary" className={classes.button}>Get Updates</Button>
                                </Col>
                            </Row>
                        </Panel>
                    </Col>
                </Row>

                {/* Dialog for edit motor input details */}
                {/* <div className="close-dialog-icon" style={{right: `${this.state.iconWidth}px`}}>
                        <img src="/assets/group-2.svg"/>
                    </div> */}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    classes={{
                        paperScrollPaper: classes.paperScroll
                    }}
                    maxWidth="lg"
                    id="dialogEdit"
                    fullScreen={this.state.fullWidth}
                >
                    {window.innerWidth <= 767 &&
                        <div>
                            <p className="edit-details-heading-dialog">
                                Edit Details
                                <img src="/assets/cancel.svg" style={{ float: 'right', verticalAlign: 'middle' }} onClick={() => { this.setState({ open: false }) }} alt="cancel" />
                            </p>
                        </div>
                    }
                    <div className="tabs-input-motor-edit">
                        <p
                            className={this.state.active_step === 1 ? 'active-item' : ''}
                            onClick={() => { this.setState({ active_step: 1 }) }}>
                            Car{window.innerWidth <= 767 ? <br /> : ' '}Details
                            {(this.state.active_step !== 1 && window.innerWidth >= 767) &&
                                <div
                                    className="edit-div"
                                    onClick={() => { this.setState({ active_step: 1 }) }}>
                                    Edit
                                </div>
                            }
                        </p>
                        <p className={this.state.active_step === 2 ? 'active-item' : ''}
                            onClick={() => { this.setState({ active_step: 2 }) }}>
                            Policy{window.innerWidth <= 767 ? <br /> : ' '}Details
                            {(this.state.active_step !== 2 && window.innerWidth >= 767) &&
                                <div
                                    className="edit-div" style={{ left: '440px' }}
                                    onClick={() => { this.setState({ active_step: 2 }) }}>
                                    Edit
                                </div>
                            }
                        </p>
                        <p
                            className={this.state.active_step === 3 ? 'active-item' : ''}
                            onClick={() => { this.setState({ active_step: 3 }) }}>
                            Registration{window.innerWidth <= 767 ? <br /> : ' '}Details
                            {this.state.active_step !== 3 && window.innerWidth >= 767 &&
                                <div
                                    className="edit-div" style={{ left: '779px' }}
                                    onClick={() => { this.setState({ active_step: 3 }) }}>
                                    Edit
                                </div>
                            }
                        </p>
                    </div>
                    <br /><br /><br /><br />
                    <div className="tabs-input-motor-edit-content">

                        {/* Tab-1 */}
                        {this.state.active_step === 1 &&
                            <div className="tab-1-content">
                                <CarDetails />
                                <div className="outlined-button">
                                    <Button className={classNames(classes.buttonEdit)}>Save and Get Quotes</Button>
                                </div>
                            </div>
                        }

                        {/* Tab-2 */}
                        {this.state.active_step === 2 &&
                            <div className="tab-2-content">
                                <PolicyDetails />
                                <div className="outlined-button mtop2">
                                    <Button className={classNames(classes.buttonEdit)}>Save and Get Quotes</Button>
                                </div>
                            </div>
                        }

                        {/* Tab-3 */}
                        {this.state.active_step === 3 &&
                            <div className="tab-3-content">
                                <RegistrationDetails />
                                <div className="outlined-button mtop2">
                                    <Button className={classNames(classes.buttonEdit)}>Save and Get Quotes</Button>
                                </div>
                            </div>
                        }
                    </div>
                </Dialog>


                {/* Additional Cover Dialog */}
                <AdditionCoverDialog
                    open={this.state.openAdditionCover}
                    handleClose={this.handleAdditionClose}/>
            </div>
        )
    }
}

QuoteListMotor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuoteListMotor)
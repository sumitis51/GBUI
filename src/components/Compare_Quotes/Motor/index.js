import React from 'react'
import './compare_motor.css'
import compare from './json/compare.json'
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import green from '@material-ui/core/colors/green';
import Panel from 'muicss/lib/react/panel';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';




const styles = theme => ({
    root: {
        color: green[600],
        '&$checked': {
            color: green[500],
        },
    },
    checked: {},
    button: {
        margin: theme.spacing.unit,
        color: 'white',
        background: '#0da176',
        '&$hover': {
            background: '#0da176'
        }
    }
});


class CompareMotor extends React.Component {

    componentWillMount() {
        const vm = this;
        this.props.onCurrentComponent('CompareQuotesMotor.json');
        axios.get('/assets/json/CompareQuotesMotor.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
               
            })
    }


    state = {
        compare_json: compare,
        value: '',
    };

    handleChange = event => {
        
        this.setState({ value: event.target.value });
    };
    render() {
        const { classes } = this.props;
        return (
            <div className="parent_compare_motor" style={{ paddingTop: '4rem' }}>
                <div className="mui-container-fluid">
                    <h3 className="quotes_motor_heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorCarQuoteComparisonHeading : ''}</h3>
                    <p className="back_text_motor_compare"><img alt='motor' src="/assets/back.png" /> &nbsp;{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorBackToQuotesSubheading : ''}</p>
                    <div className="comparing_quotes_div">
                        <Panel style={{ padding: '0' }}>
                            <Row>
                                <Col md="3" sm="12">
                                    <div style={{ padding: '15px' }}>
                                        <FormControl component="fieldset" className={classes.formControl} margin="none">
                                            <FormLabel component="legend">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorHeading : ''}</FormLabel>
                                            <RadioGroup
                                                aria-label="Gender"
                                                name="gender1"
                                                className={classes.group}
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                            >
                                                <FormControlLabel value="female" margin="none" control={<Radio classes={{
                                                    root: classes.root,
                                                    checked: classes.checked,
                                                }} />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorRadioButtonLabelCompareAllQuote : ''} />
                                                <FormControlLabel value="male" margin="none" control={<Radio classes={{
                                                    root: classes.root,
                                                    checked: classes.checked,
                                                }} />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorRadioButtonCompareOnlyUniqueAttributes : ''} />
                                                <FormControlLabel value="other" margin="none" control={<Radio classes={{
                                                    root: classes.root,
                                                    checked: classes.checked,
                                                }} />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorRadioButtonFilterCriteria3 : ''} />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </Col>
                                {
                                    this.state.compare_json.icons.map((url, index) =>

                                        <Col md="3" className="logo_compare_motor_div mui--hidden-sm mui--hidden-xs">
                                            <div>
                                                <img src={url.url} alt="insurer pic" />
                                                <p className="compare_motor_logo_text">iProtect Smart Life</p>
                                                <Button variant="contained" className={`${classes.button} bouton`}>
                                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorButtonTextPrimary : ''}
                                                </Button>
                                                <p style={{ paddingTop: '15px', paddingBottom: '15px' }}><Link to="#" className="view_details_link">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorViewPlanDetailsLink : ''}</Link></p>
                                            </div>
                                        </Col>
                                    )
                                }
                            </Row>
                        </Panel>
                        <Panel className="mui--hidden-lg mui--hidden-xl mui-hidden-md">
                            <Row>
                                {
                                    this.state.compare_json.icons.map((url, index) =>

                                        <Col sm="4" xs="4" className="logo_compare_motor_div">
                                            <div>
                                                <img src={url.url} alt="insurer pic" />
                                                <p className="compare_motor_logo_text">iProtect Smart Life</p>
                                                <Button variant="contained" className={`${classes.button} bouton`}>
                                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorButtonTextPrimary : ''}
                                                </Button>
                                                <p style={{ paddingTop: '15px', paddingBottom: '15px' }}><Link to="#" className="view_details_link">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorViewPlanDetailsLink : ''}</Link></p>
                                            </div>
                                        </Col>
                                    )
                                }
                            </Row>
                        </Panel>
                    </div>
                    <div className="compare_quotes_div_new mui--hidden-sm mui--hidden-xs">
                        <Panel style={{ padding: '0px 15px' }}>
                            <div className="imp_details_header">
                                <h3 className="imp_details_heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorImportantDetailsHeading : ''}</h3>
                            </div>
                            <div className="imp_details_div">
                                <Row>
                                    <Col md="3" sm="4" xs="4" style={{ paddingRight: '0px', paddingLeft: '0px', marginTop: '-8px', paddingTop: '8px' }} className="mui--hidden-sm mui--hidden-xs">
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.imp_details.map((item, index) =>
                                            index % 2 === 0 ?
                                                <p className="imp_details_text even_imp_details even_imp_details_padding">{item}</p> :
                                                <p className="imp_details_text odd_imp_details odd_imp_details_padding">{item}</p>
                                        ): ''}
                                    </Col>
                                    {this.state.compare_json.imp_details.map((item, index) =>
                                        <Col md="3" sm="4" xs="4" className="imp_details_col" style={{ paddingRight: '0px', paddingLeft: '0px' }}>
                                            <p className="imp_details_text even_imp_details even_imp_details_padding">
                                                &#x20B9;{item.premium_account}
                                            </p>
                                            <p className="imp_details_text odd_imp_details odd_imp_details_padding" style={{ lineHeight: '0.6' }}>
                                                &#x20B9;{item.insurer_declared_value}<br />
                                                <p className="min_possible_imp_details_text">(Minimum Possible)</p>
                                            </p>
                                            <p className="imp_details_text even_imp_details even_imp_details_padding">
                                                &#x20B9;{item.premium_per_lac_idv}
                                            </p>
                                            <p className="imp_details_text odd_imp_details odd_imp_details_padding" style={{ color: '#0da176' }}>
                                                {item.cashless_garages} garages near you
                                            </p>
                                            <p className="imp_details_text even_imp_details even_imp_details_padding">
                                                {item.advance_cash === true ?
                                                    <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                    item.advance_cash === null ? <span className="not_selected">NA</span> :
                                                        <img src="/assets/cross.svg" width="16" height="16" alt="right" />}
                                            </p>
                                            <p className="imp_details_text odd_imp_details odd_imp_details_padding">
                                                {item.zero_depriciation === true ?
                                                    <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                    item.zero_depriciation === null ? <span className="not_selected">NA</span> :
                                                        <img src="/assets/cross.svg" width="16" height="16" alt="right" />}
                                            </p>
                                            <p className="imp_details_text even_imp_details even_imp_details_padding claims_year">
                                                {item.zero_depr_allowed_per_year} claims/year
                                            </p>
                                            <p className="imp_details_text odd_imp_details odd_imp_details_padding">
                                                {item.add_ons_included === true ?
                                                    <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                    item.add_ons_included === null ? <span className="not_selected">NA</span> :
                                                        <img src="/assets/cross.svg" width="16" height="16" alt="right" />}
                                            </p>
                                            <p className="imp_details_text even_imp_details even_imp_details_padding">
                                                {item.add_ons_selected === true ?
                                                    <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                    item.add_ons_selected === null ? <span className="not_selected">NA</span> :
                                                        <img src="/assets/cross.svg" width="16" height="16" alt="right" />}
                                            </p>
                                        </Col>

                                    )}
                                </Row>
                            </div>
                            <div className="imp_details_header" style={{ marginTop: '-20px' }}>
                                <h3 className="imp_details_heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorOtherDetailsHeading : ''}</h3>
                            </div>
                            <div className="comphrensive_div" style={{ marginTop: '-17px' }}>
                                <Row style={{ whiteSpace: 'nowrap' }}>
                                    <Col md="3" style={{ paddingRight: '0px' }} className="mui--hidden-sm mui--hidden-xs">
                                        <div className="compr_cvr_div">
                                            <h3 className="comp_covr_heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorComprehensiveCoverageHeading : ''}</h3>
                                            <div className="comp_covr_items">
                                            {this.props.FetchedLanguage ? this.props.FetchedLanguage.comp_cvr.map(item =>
                                                    <p className="item_comp_cvr">{item}</p>
                                                ): ''}
                                            </div>
                                        </div>
                                        <div className="liability_div">
                                            <div className="liability_div_item">
                                                <h3 className="liability_heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorLiabilityHeading : ''}</h3>
                                            </div>
                                            <div className="liability_items">
                                            {this.props.FetchedLanguage ? this.props.FetchedLanguage.liab_items.map((item, index) =>
                                                    index === 1 ?
                                                        <p className="item_comp_cvr" style={{ lineHeight: '0.6' }}>{item}<br />
                                                            <p className="min_possible_imp_details_text" style={{ textAlign: 'left' }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorMaximumUptoINRText : ''}</p>
                                                        </p> : index === 2 ? <p className="item_comp_cvr" style={{ borderBottom: 'none' }}>{item}</p> : <p className="item_comp_cvr">{item}</p>

                                                ): ''}
                                            </div>
                                        </div>
                                        <div className="compr_cvr_div">
                                            <h3 className="addons_item_text">
                                            {this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorAddonsAvailableHeading : ''} <span className="but_not_selct_text">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorButNotSelectedHelperText : ''}</span>
                                            </h3>
                                        </div>
                                        <div className="liability_div">
                                            <h3 className="cashless_garag_text_comp">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorCashlessGaragesHeading1 : ''}</h3>
                                        </div>
                                        <div className="advance_cash_div">
                                            <h3 className="cashless_garag_text_comp">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorAdvanceCashHeading : ''}</h3>
                                        </div>
                                        <div className="liability_div" style={{ marginTop: '-20px' }}>
                                            <h3 className="cashless_garag_text_comp">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorCashlessGaragesHeading2 : ''}</h3>
                                        </div>
                                    </Col>
                                    {
                                        this.state.compare_json.other_details.map((item, index) =>
                                            <Col md="3" sm="4" xs="4" className={`last_col_div_comp_cvr_${index}`} style={{ paddingLeft: '0px', borderLeft: '1px solid rgb(112,112,112, 0.1)' }}>

                                                <div className="compr_cvr_div_value">
                                                    {item.comprehensive_coverage.own_damage ?
                                                        <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                        item.comprehensive_coverage.own_damage === null ? <span className="not_selected">NA</span> :
                                                            <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                                    }
                                                </div>
                                                <div className="compr_cvr_div_owner_value">
                                                    {item.comprehensive_coverage.owner_driver_cover ?
                                                        <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                        item.comprehensive_coverage.owner_driver_cover === null ? <span className="not_selected">NA</span> :
                                                            <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                                    }
                                                </div>
                                                <div className="compr_cvr_div_owner_value">
                                                    {item.comprehensive_coverage.unnamed_passanger_cover ?
                                                        <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                        item.comprehensive_coverage.unnamed_passanger_cover === null ? <span className="not_selected">NA</span> :
                                                            <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                                    }
                                                </div>
                                                <div className="liability_value_div">
                                                    <div className="liability_div_value_3rd_party">
                                                        {item.liability.third_party_liability ?
                                                            <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                            item.liability.third_party_liability === null ? <span className="not_selected">NA</span> :
                                                                <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                                        }
                                                    </div>
                                                    <div className="liability_div_value_3rd_party_cvr_dmg">
                                                        {item.liability.third_party_coverage_damage ?
                                                            <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                            item.liability.third_party_coverage_damage === null ? <span className="not_selected">NA</span> :
                                                                <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                                        }
                                                    </div>
                                                    <div className="liability_div_value_3rd_party_cvr_dmg">
                                                        {item.liability.unnamed_passanger_cover ?
                                                            <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                            item.liability.unnamed_passanger_cover === null ? <span className="not_selected">NA</span> :
                                                                <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="compr_cvr_div_owner_value">
                                                    {
                                                        item.addons_avail.length > 0 && item.addons_avail.length < 2 ? item.addons_avail.map((add, index) =>
                                                            <p className="add_cvr_addon_comp add_cvr_addon_comp_1">{add}</p>
                                                        ) : item.addons_avail.length > 1 ? item.addons_avail.map((add, index) =>
                                                            <p className="add_cvr_addon_comp add_cvr_addon_comp_2">{add}</p>
                                                        ) : <div className="add_cvr_addon_comp_3"><img src="/assets/cross.svg" width="16" height="16" alt="right" /></div>
                                                    }
                                                </div>
                                                <div className="liability_div_value_3rd_party_cvr_dmg" style={{ paddingBottom: '6px', backgroundColor: '#f6f6f6' }}>
                                                    {item.cashless_garages ?
                                                        <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                        item.liability.third_party_coverage_damage === null ? <span className="not_selected">NA</span> :
                                                            <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                                    }
                                                </div>
                                                <div className="liability_div_value_3rd_party_cvr_dmg" style={{ paddingBottom: '10px' }}>
                                                    {item.advance_cash ?
                                                        <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                        item.advance_cash === null ? <span className="not_selected">NA</span> :
                                                            <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                                    }
                                                </div>
                                                <div className="compr_cvr_div_owner_value" style={{ backgroundColor: '#f6f6f6', paddingBottom: '8px' }}>
                                                    {item.zero_depriciation ?
                                                        <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                        item.zero_depriciation === null ? <span className="not_selected">NA</span> :
                                                            <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                                    }
                                                </div>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </div>
                        </Panel>
                    </div>
                    {/* Here the mobile view goes */}
                    <div className="mobile_view_table_compare mui--hidden-md mui--hidden-lg mui--hidden-xl">
                        <div className="table_th">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorImportantDetailsHeading : ''}</div>
                        <table style={{ width: '100%' }}>
                            <tr>
                                <td>
                                    <p className="mobile_view_col_heading_comp">{this.props.FetchedLanguage ? this.props.FetchedLanguage.imp_details[0] : ''}</p>
                                    <p className="table_comp_motor_value_p">{this.state.compare_json.imp_details[0].premium_account}</p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">{this.state.compare_json.imp_details[1].premium_account}</p></td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">{this.state.compare_json.imp_details[2].premium_account}</p></td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mobile_view_col_heading_comp">{this.props.FetchedLanguage ? this.props.FetchedLanguage.imp_details[1] : ''}</p>
                                    <p className="table_comp_motor_value_p">
                                        {this.state.compare_json.imp_details[0].insurer_declared_value}</p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {this.state.compare_json.imp_details[1].insurer_declared_value}
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {this.state.compare_json.imp_details[2].insurer_declared_value}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mobile_view_col_heading_comp">{this.props.FetchedLanguage ? this.props.FetchedLanguage.imp_details[2] : ''}</p>
                                    <p className="table_comp_motor_value_p">
                                        {this.state.compare_json.imp_details[0].premium_per_lac_idv}</p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {this.state.compare_json.imp_details[1].premium_per_lac_idv}
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {this.state.compare_json.imp_details[2].premium_per_lac_idv}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mobile_view_col_heading_comp">{this.props.FetchedLanguage ? this.props.FetchedLanguage.imp_details[3] : ''}</p>
                                    <p className="table_comp_motor_value_p">
                                        {this.state.compare_json.imp_details[0].cashless_garages}</p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {this.state.compare_json.imp_details[1].cashless_garages}
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {this.state.compare_json.imp_details[2].cashless_garages}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mobile_view_col_heading_comp">{this.props.FetchedLanguage ? this.props.FetchedLanguage.imp_details[4] : ''}</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.imp_details[0].advance_cash ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.imp_details[0].advance_cash === null ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.imp_details[1].advance_cash ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.imp_details[1].advance_cash === null ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.imp_details[2].advance_cash ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.imp_details[2].advance_cash === null ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mobile_view_col_heading_comp">{this.props.FetchedLanguage ? this.props.FetchedLanguage.imp_details[5] : ''}</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.imp_details[0].zero_depriciation ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.imp_details[0].zero_depriciation === null ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.imp_details[1].zero_depriciation ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.imp_details[1].zero_depriciation === null ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.imp_details[2].zero_depriciation ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.imp_details[2].zero_depriciation === null ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <p className="mobile_view_col_heading_comp">{this.props.FetchedLanguage ? this.props.FetchedLanguage.imp_details[6] : ''}</p>
                                    <p className="table_comp_motor_value_p">
                                        {this.state.compare_json.imp_details[0].zero_depr_allowed_per_year}</p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {this.state.compare_json.imp_details[1].zero_depr_allowed_per_year}
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {this.state.compare_json.imp_details[2].zero_depr_allowed_per_year}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mobile_view_col_heading_comp">{this.props.FetchedLanguage ? this.props.FetchedLanguage.imp_details[7] : ''}</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.imp_details[0].add_ons_included ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.imp_details[0].add_ons_included === null ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.imp_details[1].add_ons_included ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.imp_details[1].add_ons_included === null ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.imp_details[2].add_ons_included ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.imp_details[2].add_ons_included === null ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mobile_view_col_heading_comp">{this.props.FetchedLanguage ? this.props.FetchedLanguage.imp_details[8] : ''}</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.imp_details[0].add_ons_selected ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.imp_details[0].add_ons_included === null ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.imp_details[1].add_ons_selected ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.imp_details[1].add_ons_included === null ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.imp_details[2].add_ons_selected ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.imp_details[2].add_ons_included === null ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>

                            </tr>
                        </table>
                        <div className="table_th">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorOtherDetailsHeading : ''}</div>
                        <table style={{ width: '100%' }}>
                            <tr style={{ background: 'white' }}>
                                <td>
                                    <p className="mobile_view_col_heading_comp">{this.props.FetchedLanguage ? this.props.FetchedLanguage.imp_details[0] : ''}</p>
                                    <p className="mobile_view_col_heading_comp_pink">{this.props.FetchedLanguage ? this.props.FetchedLanguage.comp_cvr[0] : ''}</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[0].comprehensive_coverage.own_damage ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[0].comprehensive_coverage.own_damage ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden_othr">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[1].comprehensive_coverage.own_damage ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[1].comprehensive_coverage.own_damage ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden_othr">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[2].comprehensive_coverage.own_damage ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[2].comprehensive_coverage.own_damage ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                            </tr>
                            <tr style={{ background: 'white' }}>
                                <td>
                                    <p className="mobile_view_col_heading_comp_pink">{this.props.FetchedLanguage ? this.props.FetchedLanguage.comp_cvr[1] : ''}</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[0].comprehensive_coverage.owner_driver_cover ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[0].comprehensive_coverage.owner_driver_cover ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[1].comprehensive_coverage.owner_driver_cover ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[1].comprehensive_coverage.owner_driver_cover ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[2].comprehensive_coverage.owner_driver_cover ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[2].comprehensive_coverage.owner_driver_cover ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                            </tr>
                            <tr style={{ background: 'white' }}>
                                <td>
                                    <p className="mobile_view_col_heading_comp_pink">{this.props.FetchedLanguage ? this.props.FetchedLanguage.comp_cvr[2] : ''}</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[0].comprehensive_coverage.unnamed_passanger_cover ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[0].comprehensive_coverage.unnamed_passanger_cover ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[1].comprehensive_coverage.unnamed_passanger_cover ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[1].comprehensive_coverage.unnamed_passanger_cover ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[2].comprehensive_coverage.unnamed_passanger_cover ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[2].comprehensive_coverage.unnamed_passanger_cover ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                            </tr>
                            {/* Liability */}
                            <tr style={{ background: '#f6f6f6' }}>
                                <td>
                                    <p className="mobile_view_col_heading_comp">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorLiabilityHeading: ''}</p><br />
                                    <p className="mobile_view_col_heading_comp_pink">{this.props.FetchedLanguage ? this.props.FetchedLanguage.liab_items[0]: ''}</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[0].liability.third_party_liability ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[0].liability.third_party_liability ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden_othr">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[1].liability.third_party_liability ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[1].liability.third_party_liability ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden_othr">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[2].liability.third_party_liability ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[2].liability.third_party_liability ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                            </tr>
                            <tr style={{ background: '#f6f6f6' }}>
                                <td>
                                    <p className="mobile_view_col_heading_comp_pink">{this.props.FetchedLanguage ? this.props.FetchedLanguage.liab_items[1]: ''}</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[0].liability.third_party_coverage_damage ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[0].liability.third_party_coverage_damage ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden_othr">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[1].liability.third_party_coverage_damage ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[1].liability.third_party_coverage_damage ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden_othr">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[2].liability.third_party_coverage_damage ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[2].liability.third_party_coverage_damage ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                            </tr>
                            <tr style={{ background: '#f6f6f6' }}>
                                <td>
                                    <p className="mobile_view_col_heading_comp_pink">{this.props.FetchedLanguage ? this.props.FetchedLanguage.liab_items[2]: ''}</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[0].liability.paid_driver ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[0].liability.paid_driver ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden_othr">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[1].liability.paid_driver ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[1].liability.paid_driver ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                                <td>
                                    <p className="table_comp_motor_value_p_hidden_othr">h</p>
                                    <p className="table_comp_motor_value_p">
                                        {
                                            this.state.compare_json.other_details[2].liability.paid_driver ?
                                                <img src="/assets/checked-symbol-grn.svg" width="16" height="16" alt="right" /> :
                                                this.state.compare_json.other_details[2].liability.paid_driver ?
                                                    <span className="not_selected">NA</span> :
                                                    <img src="/assets/cross.svg" width="16" height="16" alt="right" />
                                        }
                                    </p>
                                </td>
                            </tr>
                            {/* Addons */}
                            {this.state.compare_json.other_details[0].addons_avail.map((addon, index) =>
                                <tr style={{ background: 'white' }}>
                                    <td>
                                        {index === 0 &&
                                            <p className="mobile_view_col_heading_comp">{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorAddonsAvailableHeading: ''} <span className="not_selected" style={{ fontSize: '9px' }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.CompareQuoteMotorButNotSelectedHelperText: ''}</span></p>}
                                        <p className="table_comp_motor_value_p">
                                            {
                                                addon
                                            }
                                        </p>
                                    </td>
                                    <td>
                                        <p className="table_comp_motor_value_p_hidden_othr">h</p>
                                        <p className="table_comp_motor_value_p">

                                        </p>
                                    </td>
                                    <td>
                                        <p className="table_comp_motor_value_p_hidden_othr">h</p>
                                        <p className="table_comp_motor_value_p">
                                            {
                                                addon
                                            }
                                        </p>
                                    </td>
                                </tr>
                            )

                            }
                        </table>
                        <br /><br />
                    </div>
                </div>
            </div>
        )
    }
}

CompareMotor.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    CurrentLanguage: state.language.current_language,
    FetchedLanguage: state.language.lang_data,
});

const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CompareMotor));
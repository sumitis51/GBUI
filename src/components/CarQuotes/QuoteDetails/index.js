import React from 'react'
import Panel from 'muicss/lib/react/panel'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import StarRate from '@material-ui/icons/StarRate'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import Help from '@material-ui/icons/Help'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Slider from '@material-ui/lab/Slider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import classNames from 'classnames'
import './quote.css'

const styles = theme => ({
    button: {
        // margin: theme.spacing.unit,
        background: 'white'
    },
    input: {
        display: 'none',
    },
    slider: {
        padding: '22px 0px',
    },
    sliderRoot: {
        background: '#0da176'
    },
    rootCheck: {
        color: 'black',
        '&$checked': {
            color: '#0da176',
        },
        margin: '-1rem 0'
    },
    checked: {},
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#0da176',
        '&:hover': {
            backgroundColor: '#0da176',
        },
        padding: '10px 60px',
        margin: '0.5rem 0 0rem 0'
    },
});

class QuoteDetails extends React.Component {

    state = {
        dropdownD: false,
        dropdownDValue: '',
        dropdownCover: false,
        dropdownCoverValue: '',
        dropdownYear: false,
        dropdownYearValue: '',
    }

    handleDropDown = (event) => {
      
        this.setState({
            dropdownDValue: event.target.attributes['value'].value,
            dropdownD: false
        })
    }
    handleDropDownComp = (event) => {
      
        this.setState({
            dropdownCoverValue: event.target.attributes['value'].value,
            dropdownCover: false
        })
    }
    handleDropDownYear = (event) => {
      
        this.setState({
            dropdownYearValue: event.target.attributes['value'].value,
            dropdownYear: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="parent-div-quote-details">
                <Panel>
                    <div style={{ textAlign: 'right' }}>
                        <h3 className="car-quotes-detail-heading">Car Quotes Details</h3>
                        <Button
                            variant="contained"
                            className={classes.button}>Get Discount</Button>
                    </div>
                    <img src="/assets/group.svg" alt="insurer" />
                    <span className="no_of_plans">3 plans by this insurer</span><br />

                    {/* Dropdown */}
                    <div className="dropdown-quote-details mui--hidden-xs mui--hidden-sm">
                        <div
                            className="dropdown-insurer-div"
                            onClick={() => {
                                const vm = this;
                                this.setState({ dropdownD: !vm.state.dropdownD })
                            }}>
                            <span className="package-name">
                                Bajaj Allianz car policy package |
                        </span>
                            <span className="cust-gb-rating">
                                Customers/GB Rating: <span style={{ fontWeight: '600', color: '#000000' }}>4.6/4.7</span>
                                <div style={{ display: 'inline' }}><StarRate style={{ marginBottom: '-7px', color: '#efce4a' }} /></div>
                                <KeyboardArrowDown color="black" style={{ marginBottom: '-6px' }} />
                            </span>
                        </div>
                        {this.state.dropdownD &&
                            <div id="dropdown-quote-content" className="dropdown-quote-content">
                                <p value="1" onClick={this.handleDropDown}>Text 1</p>
                                <p value="2" onClick={this.handleDropDown}>Text 2</p>
                                <p value="3" onClick={this.handleDropDown}>Text 3</p>
                                <p value="4" onClick={this.handleDropDown}>Text 4</p>
                            </div>
                        }
                    </div>
                    {/* Dropdown mobile */}
                    <div className="dropdown-insurer-mobile mui--hidden-md mui--hidden-lg mui--hidden-xl">
                        <div className="dropdown-insurer-mobile-btn">
                            Bajaj Allianz car policy package
                            <KeyboardArrowDown color="black" style={{ marginBottom: '-8px' }} />
                        </div>
                    </div>
                    <div className="cust-gb-rating">
                        Customers/GB Rating: <span style={{ fontWeight: '600', color: '#000000' }}>4.6/4.7</span>
                        <div style={{ display: 'inline' }}><StarRate style={{ marginBottom: '-8px', color: '#efce4a' }} /></div>
                        
                    </div>
                    <Row>
                        <Col md="12">
                            {/* Pdf link*/}
                            <p className="policy-broucher">
                                <img src="/assets/pdf-file-symbol.svg" width="15" height="15" alt="pdf" />&nbsp;
                                Policy Brochure & TnC
                            </p>
                        </Col>
                    </Row>
                    <hr style={{margin: '0px -15px'}} className="mui--hidden-md mui--hidden-lg mui--hidden-xl"/>

                    {/* details for plan */}
                    <Row>
                        <Col md="6">
                            <table style={{ width: '100%', marginTop: '1rem' }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span>
                                                Customers Rating: 4.7
                                                <StarRate style={{ marginBottom: '-8px', color: '#efce4a' }} />
                                                <Help style={{ marginBottom: '-2px', fontSize: '12px' }} />
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                GB Rating: 4.7
                                                <StarRate style={{ marginBottom: '-8px', color: '#efce4a' }} />
                                                <Help style={{ marginBottom: '-2px', fontSize: '12px' }} />
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>Cover Type</span>
                                        </td>
                                        <td>
                                            <div className="dropdown-comp-cover">
                                                <div
                                                    className="dropdown-comp-cover-btn"
                                                    onClick={()=>{
                                                        const vm =this;
                                                        this.setState({dropdownCover: !vm.state.dropdownCover})}}>
                                                    Comprehensive Cover
                                                    <KeyboardArrowDown style={{ marginBottom: '-8px' }} />
                                                </div>
                                                {this.state.dropdownCover &&
                                                    <div className="dropdown-comp-cover-content">
                                                        <p value="1" onClick={this.handleDropDownComp}>Text 1</p>
                                                        <p value="2" onClick={this.handleDropDownComp}>Text 2</p>
                                                        <p value="3" onClick={this.handleDropDownComp}>Text 3</p>
                                                        <p value="4" onClick={this.handleDropDownComp}>Text 4</p>
                                                    </div>
                                                }
                                            </div>
                                            <div className="mui--hidden-xs mui--hidden-sm">
                                                <p className="current-amount">Rs. 5,08,900</p>
                                                <Slider
                                                    classes={{ container: classes.slider, trackBefore: classes.sliderRoot, thumb: classes.sliderRoot }}
                                                    value={50}
                                                    aria-labelledby="label"
                                                />
                                                <p className="minValue">Rs. 1,00,999</p>
                                                <p className="maxValue">Rs. 5,08,900</p><br />
                                                <div className="recommended">Recommended: <span className="amount">₹6,72,809/-</span></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                                        <td>
                                            <span>Cover IDV</span>
                                        </td>
                                        <td>
                                            <p className="current-amount">Rs. 5,08,900</p>
                                            <Slider
                                                classes={{ container: classes.slider, trackBefore: classes.sliderRoot, thumb: classes.sliderRoot }}
                                                value={50}
                                                aria-labelledby="label"
                                            />
                                            <p className="minValue">Rs. 1,00,999</p>
                                            <p className="maxValue">Rs. 5,08,900</p><br />
                                            <div className="recommended">Recommended: <span className="amount">₹6,72,809/-</span></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>
                                                Cashless Garage at
                                                <span
                                                    style={{
                                                        fontSize: '18px',
                                                        color: '#9c0f46'
                                                    }}>
                                                    &nbsp;282001
                                                </span>
                                                <span className="edit mui--hidden-xs mui--hidden-sm" >&nbsp; Edit</span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="no_of_garage">47</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                        <Col md="6" style={{ borderLeft: window.innerWidth < 768 ? 'none':'1px solid #979797' }}>
                            <table style={{ width: '100%', marginTop: '1rem' }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span>OD policy Period</span><br />
                                            <span className="guide-line">You can avail discount by increasing your term period</span>
                                        </td>
                                        <td>
                                            <div className="td2">
                                                <div
                                                    className="dropdown-year-btn"
                                                    onClick={()=>{
                                                        const vm = this;
                                                        this.setState({dropdownYear: !vm.state.dropdownYear})
                                                    }}>
                                                    1 years <KeyboardArrowDown style={{ marginBottom: '-8px' }} />
                                                </div>
                                                {this.state.dropdownYear &&
                                                    <div className="dropdown-year-content">
                                                        <p value="1" onClick={this.handleDropDownYear}>Text 1</p>
                                                        <p value="2" onClick={this.handleDropDownYear}>Text 2</p>
                                                        <p value="3" onClick={this.handleDropDownYear}>Text 3</p>
                                                        <p value="4" onClick={this.handleDropDownYear}>Text 4</p>
                                                    </div>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>
                                                TP Policy Period
                                            </span>
                                        </td>
                                        <td>
                                            <div className="td2">
                                                1 year
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>
                                                Cover Value IDV)
                                            </span>
                                        </td>
                                        <td>
                                            <div className="td2">
                                                Rs. 5,08,900
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>
                                                Car Registration Date
                                            </span>
                                        </td>
                                        <td>
                                            <div className="td2">
                                                15th Mar, 2009
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>
                                                Manufacturing Date
                                            </span>
                                        </td>
                                        <td>
                                            <div className="td2">
                                                January 2009
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>
                                                Premium/Lac of SI
                                            </span>
                                        </td>
                                        <td>
                                            <div className="td2">
                                                ₹ 4,414
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                    <p className="plan-incl-excl-text">Plan Inclusions/Exclusions</p>

                    <hr style={{ margin: '0px -15px', backgroundColor: '#aaaaaa' }} />

                    {/* Key Features Div */}
                    <div className="key-feature-div">
                        <div className="MOB-KEY-FEATURE mui--hidden-md mui--hidden-lg mui--hidden-xl">
                            <h3 className="key-feature-heading">Key Feature</h3>
                            <p>1. Key Feature one</p>
                            <p>2. Key Feature two</p>
                        </div>
                        <Row className="mui--hidden-xs mui--hidden-sm">
                            <Col md="4">
                                <Row>
                                    <Col md="3">
                                        <div className="oval"></div>
                                    </Col>
                                    <Col md="9">
                                        <h3 className="key-feature-heading">1. Key Feature one</h3>
                                        <p>Some awesome content here which describe heading.</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="4">
                                <Row>
                                    <Col md="3">
                                        <div className="oval"></div>
                                    </Col>
                                    <Col md="9">
                                        <h3 className="key-feature-heading">2. Key Feature one</h3>
                                        <p>Some awesome content here which describe heading.</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="4">
                                <Row>
                                    <Col md="3">
                                        <div className="oval"></div>
                                    </Col>
                                    <Col md="9">
                                        <h3 className="key-feature-heading">3. Key Feature one</h3>
                                        <p>Some awesome content here which describe heading.</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <p className="see-more">See more features</p>
                    </div>

                    <div className="addons-div">
                        <h3 className="addons-heading">Add - Ons <Help style={{ fontSize: '13px' }} /></h3>

                        <Row>
                            {new Array(3).fill(0, 0).map((item, index) =>
                                <Col md="4">
                                    <Panel>
                                        <p className="addon-name">Some pretty long add-on name {index + 1}</p>
                                        <hr />
                                        <p className="benifits">Benefits</p>
                                        <p className="addon-desc">Won't it make sense to have just. There two terms policy Term.</p>
                                        <hr />
                                        <p className="addon-price">Rs. 48</p>
                                        <p className="a-r-checkbox">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={index === 1 ? true : false}
                                                        value="checkedG"
                                                        classes={{
                                                            root: classes.rootCheck,
                                                            checked: classes.checked,
                                                        }}
                                                    />
                                                }
                                                label="Add"
                                                labelPlacement="start"
                                            />
                                        </p>
                                    </Panel>
                                </Col>
                            )}
                        </Row>
                    </div>

                    {/* Additional covers */}
                    <div className="additional-cover-div">
                        <h3 className="addons-heading">Additional Cover <Help style={{ fontSize: '13px' }} /></h3>

                        <Row>
                            <Col md="4">
                                <Panel>
                                    <p className="accr-name">Electrical accessories value <Help style={{ fontSize: '13px', marginBottom: '-2px', float: 'right' }} /></p>
                                    <hr />
                                    <TextField
                                        label="Enter value"
                                        value={'Value'}
                                        fullWidth
                                        margin="dense" />
                                    <br /><br />
                                    <hr />
                                    <Button
                                        className={classNames(classes.buttonRoot3)}
                                        fullWidth>Add</Button>
                                </Panel>
                            </Col>
                            <Col md="4">
                                <Panel>
                                    <p className="accr-name">Non-electrical accessories value <Help style={{ fontSize: '13px', marginBottom: '-2px', float: 'right' }} /></p>
                                    <hr />
                                    <TextField
                                        label="Enter value"
                                        value={'Value'}
                                        fullWidth
                                        margin="dense" />
                                    <br /><br />
                                    <hr />
                                    <Button
                                        className={classNames(classes.buttonRoot3)}
                                        fullWidth>Add</Button>
                                </Panel>
                            </Col>
                            <Col md="4">
                                <Panel>
                                    <p className="accr-name">PA cover for passenger <Help style={{ fontSize: '13px', marginBottom: '-2px', float: 'right' }} /></p>
                                    <hr />
                                    <TextField
                                        label="No of members"
                                        value={'Value'}
                                        margin="dense"
                                        style={{ width: "110px" }} />
                                    <TextField
                                        label="Enter value"
                                        value={'Value'}
                                        margin="dense"
                                        style={{ width: "100px", marginLeft: '6px' }} />
                                    <br /><br />
                                    <hr />
                                    <Button
                                        className={classNames(classes.buttonRoot3)}
                                        fullWidth>Add</Button>
                                </Panel>
                            </Col>
                        </Row>
                    </div>
                    {/* Performance details */}
                    <div className="performance-details">
                        <h3 className="pf-d-heading">Performance Details</h3>

                        <div className="box">
                            <div className="text-box">
                                <p className="text-1">96.4%</p>
                                <p className="text-2">Claims Settled</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="text-box">
                                <p className="text-1">36 days</p>
                                <p className="text-2">Policy Issues</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="text-box">
                                <p className="text-1">4 days</p>
                                <p className="text-2">Policy served</p>
                            </div>
                        </div>
                        <div className="box">
                            <div className="text-box">
                                <p className="text-1">28 days</p>
                                <p className="text-2">Claims Serviced</p>
                            </div>
                        </div>
                    </div>

                    {/* Policy Details */}
                    <div className="policy-details">
                        <p className="policy-details-heading">Policy Details</p>

                        {/* TAbs */}
                        <div className="tabs">
                            <ul>
                                <li>Benefits & Features</li>
                                <li>Policy Conditions</li>
                                <li>Other Details</li>
                            </ul>
                        </div>
                        <div className="tab-content">
                            <h3 className="key-benifit-heading">Key Benefits of this plan</h3>
                            <p>
                                Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores mis sit em an
                                urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores mis sit em
                                an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores mis sit
                                em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores mis
                                sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                 mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                  mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                    mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                     mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                      mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                       mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                        mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum
                                        dolores mis sit em an urty
                            </p>
                            <h3 className="key-benifit-heading">Policy Features</h3>
                            <p>
                                Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores mis sit em an
                                urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores mis sit em
                                an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores mis sit
                                em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores mis
                                sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                 mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                  mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                    mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                     mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                      mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                       mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                        mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum
                                        dolores mis sit em an urty
                            </p>
                            <h3 className="key-benifit-heading">Additional Benefits</h3>
                            <p>
                                Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores mis sit em an
                                urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores mis sit em
                                an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores mis sit
                                em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores mis
                                sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                 mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                  mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                    mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                     mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                      mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                       mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                        mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum
                                        dolores mis sit em an urty
                            </p>
                            <h3 className="key-benifit-heading">Value Added Services</h3>
                            <p>
                                Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores mis sit em an
                                urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores mis sit em
                                an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores mis sit
                                em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores mis
                                sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                 mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                  mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                   mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                    mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                     mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                      mis sit em an urty Lorem ipsum dolores mis sit em an urty. Lorem ipsum dolores
                                       mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum dolores
                                        mis sit em an urty Lorem ipsum dolores mis sit em an urty Lorem ipsum
                                        dolores mis sit em an urty
                            </p>

                        </div>

                        <hr />

                        <h3 className="disclaimer">Disclaimer</h3>

                        <p className="disclaimer-text">
                            The critical details have been provided herein for ease of viewing.
                            For complete details, please refer to <span>Policy Brochure & TnC</span>
                        </p>
                    </div>

                    {/* secureity and partners */}
                    <Row className="partners">
                        <Col md="1" sm="7" xs="7">
                            <img
                                src="/assets/irdai.jpeg"
                                alt="irdai"
                                width="55"
                                height="55" />
                            <p className="licenced_no">LICENSED No.<br />123243567yterwq</p>
                        </Col>
                        <Col md="2" sm="5" xs="5">
                            <div className="rectangle"></div>
                            <div className="rectangle"></div>
                            <p style={{ marginLeft: '30px' }}>SECURE</p>
                        </Col>
                        <Col md="6" sm="12" xs="12" className="networks">
                            {new Array(7).fill(0, 0).map(item =>
                                <div className="rectangle"></div>
                            )}
                            <p style={{ marginLeft: '8.3rem', display: 'block' }}>PAYMENT NETWORK</p>
                        </Col>
                    </Row>
                </Panel>
            </div>
        )
    }
}

QuoteDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuoteDetails)
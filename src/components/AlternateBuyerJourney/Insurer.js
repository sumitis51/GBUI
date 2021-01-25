import React from 'react'
import './alternate_buyer_journey-insurer.css'
import HeaderAlternate from './Header'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);
 
// // Generate the chart
// Highcharts.chart('container', {
//   // options - see https://api.highcharts.com/highcharts
// });


const styles = theme => ({
    root: {
        color: green[600],
        '&$checked': {
          color: green[500],
        },
    },
    checked: {},
    cssRoot: {
        color: 'white',
        backgroundColor: '#0da176',
        '&:hover': {
          backgroundColor: '#0da176',
        },
        padding: '6px 60px',
        margin: '12px'
    },
    button: {
        color: '#0da176',
        background: '#ffffff',
        '&:hover': {
            backgroundColor: '#f6f6f6',
            border: '1px solid #0da176'
          },
          border: '1px solid #0da176',
          
    }
  });

class Insurer extends React.Component {


    state = {
        carType: 'personal',
        iterate: [0, 0, 0, 0, 0, 0],
        iterate2: [0, 0, 0],
        showAllAbout: true,
        showCarInsurer: false,
        isHelpful: false,
        blogLinks: false,
        options: {
            chart: {
                type: 'column'
              },
              title: {
                text: 'Ye chart'
              },
              xAxis: {
                categories: ['Bajaj Allianz Health Insurance', 'Industry Average']
              },
              yAxis: {
                min: 0,
                title: {
                  text: 'Percentage'
                }
              },
              tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
              },
              plotOptions: {
                column: {
                  stacking: 'percent'
                }
              },
              series: [{
                name: '3-month',
                data: [3, 4],
                color: '#8cffd6'
              }, {
                name: '< 1-3 month',
                data: [2, 2],
                color: '#56d3a5'
              },{
                name: '< 1 month',
                data: [5, 3],
                color: '#0da176'
              }]
        }
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
      
    };

    handleWindowChange() {
        if (window.innerWidth > 767) {
            this.setState({showAllAbout: true, showCarInsurer: true, isHelpful: true, blogLinks: true});
           
        } else {
            this.setState({showAllAbout: true, showCarInsurer: false, isHelpful: false, blogLinks: false});
           
        }
    }


    componentDidMount() {
        window.addEventListener('resize', this.handleWindowChange.bind(this));
        if (window.innerWidth > 767) {
            this.setState({showAllAbout: true, showCarInsurer: true, isHelpful: true, blogLinks: true});
           
        } else {
            this.setState({showAllAbout: true, showCarInsurer: false, isHelpful: false, blogLinks: false});
           
        }


        /*Here go for charts */
        Highcharts.chart('container-chart', this.state.options);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="alternateBuyerJourney">
                <div className="mui--hidden-xs mui--hidden-sm"><HeaderAlternate /></div>
                <h3 className="main_heading_altrnt_byr_jrny">Choose your Insurance just like you chose your ride</h3>
                <div className="mui-container-fluid">
                    <Row className="panel-row-alternate-buyer">
                        <Col md="1"></Col>
                        <Col md="4">
                            <img src="/assets/undraw-electric-car-b-7-hl.svg" alt='alternate-buyer-journey' className="mui--hidden-xs mui--hidden-sm" style={{width: '100%', height: 'auto'}} />
                        </Col>
                        <Col md="6">
                            <div className="mui-panel">
                                <div className="panel-alternate_buyer-content">
                                    <h3 className="mui-panel-heading-car">Car</h3>
                                    <p className="mui-panel-sub-heading-p">Got a new car? Want to get a new policy? Get car insurance here.</p>
                                    <div className="selection-alternate-buyer-journey">
                                    <RadioGroup
                                        aria-label="Car Type"
                                        name="carType"
                                        className={classes.group}
                                        value={this.state.carType}
                                        onChange={this.handleChange}
                                        row
                                        
                                    >
                                        <FormControlLabel value="personal" control={<Radio classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }} />} label="Personal Car" />
                                        <FormControlLabel value="commercial" control={<Radio classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }} />} label="Commercial Car" />
                                    </RadioGroup>
                                    <Row>
                                        <Col md="7">
                                            <TextField label="Vehicle Registration Number" fullWidth/>
                                            <p className="forgot_alternate_buyer">Forgot Registration Number?</p>
                                            <p className="forgot_alternate_buyer_right">Bought a New Car?</p>
                                        </Col>
                                        <Col md="5">
                                            <Button className={classNames(classes.cssRoot)}>Submit</Button>
                                        </Col>
                                    </Row>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md="1"></Col>
                    </Row>
                    {/* Panels */}
                    <Row className="panel-row-alternate-buyer">
                        <Col md="1"></Col>
                        <Col md="7">
                            <div className="panel-alternate-green-div">
                                <div className="panel-alternate-green-div-header">
                                    <h3 className="panel-alternate-green-div-header-text">
                                        BAJAJ ALLIANZ
                                        {!this.state.showAllAbout &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/invalid-name.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{float: 'right', paddingTop: '8px', cursor: 'pointer'}}
                                                onClick={() => this.setState({showAllAbout: !this.state.showAllAbout})}/>
                                        }
                                        {this.state.showAllAbout &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/copy-2.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{float: 'right', paddingTop: '12px', cursor: 'pointer'}}
                                                onClick={() => this.setState({showAllAbout: !this.state.showAllAbout})}/>
                                        }
                                    </h3>
                                    
                                </div>
                                {this.state.showAllAbout &&
                                    <div className="panel-body">
                                        <div className="panel-alternate-green-div-body">
                                            <h3 className="car_insurance_heading_alternate_buyer">Bajaj Allianz</h3>
                                            <p className="car_insurance_text_alternate_buyer">
                                                Car insurance (also known as auto or motor insurance) is done to protect your vehicle from unforeseen risks. 
                                                It basically provides protection against the losses incurred as a result of unavoidable instances. 
                                                It helps cover against theft, financial loss caused by accidents and any subsequent liabilities. 
                                                The cover level of Car insurance can be the insured party, the insured vehicle and third parties 
                                                (car and people). The premium of the insurance is dependent on certain parameters like value of 
                                                the car, type of coverage, vehicle classification; voluntary excess etc. Car insurance gives 
                                                confidence to drive peacefully. In emergencies it acts like a boon to the insurance holder.<br/><br/>

                                                With so many car insurance companies for customer base in the market, it is quite difficult to 
                                                make a decision like choosing the right policy and insurer. Figuring out the right insurance policy,
                                                fulfilling the requirement and being cost effective can be time consuming. Many a times car insurance
                                                may seem complex but having it saves you spending a fortune later. At policybazaar you can compare 
                                                car insurance quotes online and save up to 40% on your premium.
                                            </p>
                                        </div>
                                        {/* Another body with white background */}
                                        <div className="panel-alternate-green-div-body-2">
                                            <h3 className="alternate-body-2-heading">Key Features of Bajaj Allianz</h3>
                                            <p className="alternate-body-2-small">Some awesome line</p>
                                            <p className="alternate-insurer-text-key-feature">
                                                A car insurance premium calculator is a useful online tool to 
                                                figure out the quotes of different insurance companies in India. 
                                                The car insurance premium is calculated based on the below mentioned formula.<br/><br/>
                                                <p  style={{fontWeight: 'bold'}}>
                                                    Own damage premium – (depreciation + NCB) + Liability premium
                                                </p><br/>
                                                The premium for your car insurance depends on the below mentioned factors:
                                            </p>
                                            <br/>
                                                <li>IDV</li>
                                                <li>Cubic capacity</li>
                                                <li>Manufacturing year</li>
                                                <li>Geographical location</li>
                                                <li>No claim bonus (NCB)</li>
                                                <li>Remember that the IDV of a new car will always be the maximum,
                                                    but it will gradually lower down due to depreciation.</li>
                                            {/* </ul> */}
                                        </div>
                                        {/* Another body with grey background */}
                                        <div className="panel-alternate-green-div-body-2" style={{background: '#f4f4f4'}}>
                                            <h3 className="alternate-body-2-heading">Insurers Motor Plan</h3>
                                            <p className="alternate-body-2-small">Some awesome line</p>
                                            <div className="white-div-alternate-insurer" style={{backgroundColor: 'white'}}>
                                                <Row style={{background: 'white',marginLeft: '0px',marginRight: '0px', border: 'solid 1px rgb(112,112,112, 0.1)'}}>
                                                    <Col lg="3" className="mui--hidden-xs mui--hidden-sm mui--hidden-md"></Col>
                                                    <Col md="4" lg="3" xs="4" sm="4">
                                                        <div className="alternate-insurer-card" style={{borderLeft: 'none'}}>
                                                            <img alt='alternate-buyer-journey'
                                                               src="/assets/kotak-general-insurance.jpg" style={{width: '100%', height: 'auto'}} />
                                                            <p className="compare_motor_logo_text">iProtect Smart Life</p>
                                                            <Button variant="contained"   className={`${classes.button}`}>
                                                                Primary
                                                            </Button>
                                                            <p style={{paddingTop: '15px', paddingBottom: '15px'}}><Link to="#" className="view_details_link">View Plan Details</Link></p>
                                                        </div>
                                                    </Col>
                                                    <Col md="4" lg="3" sm="4" xs="4">
                                                        <div className="alternate-insurer-card">
                                                            <img alt='alternate-buyer-journey' src="/assets/kotak-general-insurance.jpg" style={{width: '100%', height: 'auto'}} />
                                                            <p className="compare_motor_logo_text">iProtect Smart Life</p>
                                                            <Button variant="contained"   className={`${classes.button} `}>
                                                                Primary
                                                            </Button>
                                                            <p style={{paddingTop: '15px', paddingBottom: '15px'}}><Link to="#" className="view_details_link">View Plan Details</Link></p>
                                                        </div>
                                                    </Col>
                                                    <Col md="4" lg="3" xs="4" sm="4">
                                                        <div className="alternate-insurer-card">
                                                            <img alt='alternate-buyer-journey' src="/assets/kotak-general-insurance.jpg" style={{width: '100%', height: 'auto'}} />
                                                            <p className="compare_motor_logo_text">iProtect Smart Life</p>
                                                            <Button variant="contained"   className={`${classes.button}`}>
                                                                Primary
                                                            </Button>
                                                            <p style={{paddingTop: '15px', paddingBottom: '15px'}}><Link to="#" className="view_details_link">View Plan Details</Link></p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="table-alternate-buyer-insurer">
                                                    <div className="table-div-alternate-buyer-insurer">
                                                        <div className="imp_details_header">
                                                            <h3 className="imp_details_heading">Important Details</h3>
                                                        </div>
                                                        <table>
                                                            <tr>
                                                                <td>Premium Amount</td>
                                                                <td>₹ 4,414</td>
                                                                <td>₹ 4,414</td>
                                                                <td>₹ 4,414</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Insurer Declared Value</td>
                                                                <td>₹ 1,81,287</td>
                                                                <td>₹ 1,81,287</td>
                                                                <td>₹ 1,81,287</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Premium per lac-IDV</td>
                                                                <td>Rs.  2,867</td>
                                                                <td>Rs.  2,867</td>
                                                                <td>Rs.  2,867</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Cashless Garages</td>
                                                                <td>47 garages near you</td>
                                                                <td>47 garages near you</td>
                                                                <td>47 garages near you</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Advance Cash</td>
                                                                <td>
                                                                    <img
                                                                        src="/assets/checked-symbol-grn.svg"
                                                                        width="16"
                                                                        height="16"
                                                                        alt="right"/>
                                                                </td>
                                                                <td>
                                                                    <img
                                                                        src="/assets/cross.svg"
                                                                        width="16"
                                                                        height="16"
                                                                        alt="right"/>
                                                                </td>
                                                                <td>
                                                                    <img
                                                                        src="/assets/checked-symbol-grn.svg"
                                                                        width="16"
                                                                        height="16"
                                                                        alt="right"/>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Another body with white background */}
                                        <div className="panel-alternate-green-div-body-2" style={{background: '#ffffff'}}>
                                            <h3 className="alternate-body-2-heading">Factors that Decide For Motor Insurance Premium</h3>
                                            <p className="alternate-body-2-small">Some awesome line</p>
                                            {/* <Highcharts /> */}
                                            <Row>
                                                <Col md="6">
                                                    <div id="container-chart" className="chart-div-insurer-alternate-motor"></div>
                                                </Col>
                                                <Col md="1"></Col>
                                                <Col md="5">
                                                    <Row>
                                                        <Col md="12">
                                                            <h3 className="claim-not-paid-alternate-buyer">Health Claim not paid</h3>
                                                            <div style={{marginTop: '24px'}}>
                                                                <p className="text-chart-percentage-alternate-buyer">Bajaj Allianz Score:
                                                                    <span className="value-chart-percentage-alternate-buyer">&nbsp;13.33%</span>
                                                                </p>
                                                                <p className="text-chart-percentage-alternate-buyer">Average Score:
                                                                    <span className="value-chart-percentage-alternate-buyer">&nbsp;6.59%</span>
                                                                </p>
                                                                <p className="text-chart-percentage-alternate-buyer">GB Score:
                                                                    <span className="value-chart-percentage-alternate-buyer">&nbsp;6.59%</span>
                                                                </p>
                                                            </div>
                                                        </Col>
                                                        <Col md="12">
                                                            <h3 className="claim-not-paid-alternate-buyer">NPS Score of Insurer</h3>
                                                            <div style={{marginTop: '24px'}}>
                                                                <p className="text-chart-percentage-alternate-buyer">Bajaj Allianz Score:
                                                                    <span className="value-chart-percentage-alternate-buyer">&nbsp;13.33%</span>
                                                                </p>
                                                                <p className="text-chart-percentage-alternate-buyer">Average Score:
                                                                    <span className="value-chart-percentage-alternate-buyer">&nbsp;6.59%</span>
                                                                </p>
                                                                <p className="text-chart-percentage-alternate-buyer">GB Score:
                                                                    <span className="value-chart-percentage-alternate-buyer">&nbsp;6.59%</span>
                                                                </p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <div style={{textAlign: 'center', paddingTop: '12px'}}>
                                                <p className="source-insurer-alternate">Source: Insurers’ public disclosure</p>
                                                <p className="last-update-insurer-alternate">Last updated on March,2018</p>
                                            </div>

                                            <p className="cashless_garage_near_alternate">Cashless garage near you</p>
                                            <Row>
                                                <Col md="6">
                                                    <div style={{paddingLeft: '12px'}}><TextField label="Your Pincode"  fullWidth /></div>
                                                    <Button className={classes.cssRoot} fullWidth>Submit</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        {/* Car Insurance Calculator */}
                                        <div className="panel-alternate-green-div-body-2" style={{background: '#f4f4f4'}}>
                                            <h3 className="car-insurance-alternate-body-2-heading">Car Insurance Calculator</h3>
                                            <p className="alternate-body-2-small">Some awesome line</p>
                                            <p className="car_insurance_text_alternate_text"><br/>
                                                A car insurance premium calculator is a useful online tool to figure out the quotes of different insurance companies in India.<br/><br/>

                                                The car insurance premium is calculated based on the below mentioned formula.<br/><br/>

                                                Own damage premium – (depreciation + NCB) + Liability premium<br/><br/>

                                                The premium for your car insurance depends on the below mentioned factors:
                                                <br/><br/>
                                                <ul>
                                                    <li>IDV</li>
                                                    <li>Cubic capacity</li>
                                                    <li>Manufacturing year</li>
                                                    <li>Geographical location</li>
                                                    <li>No claim bonus (NCB)</li>
                                                    <li>Remember that the IDV of a new car will always be the maximum,
                                                        but it will gradually lower down due to depreciation.</li>
                                                </ul>
                                            </p>
                                        </div>
                                        {/* Calculating your premium online */}
                                        <div className="panel-alternate-green-div-body-2" style={{background: '#ffffff'}}>
                                            <h3 className="car-insurance-alternate-body-2-heading">Calculating your premium online</h3>
                                            <p className="alternate-body-2-small">Some awesome line</p>
                                            <p className="car_insurance_text_alternate_text"><br/>
                                                Want to know the benefits of calculating your premium online using two wheeler 
                                                insurance calculator? Here are three of the most important ones:
                                                <br/><br/>
                                                <ul>
                                                    <li>It’s simple. Buy your two wheeler insurance in a matter of a few clicks,
                                                        nothing more – it’s that easy and hassle-free!</li>
                                                    <li>A range of options. Compare different types of policies and choose one
                                                        that perfectly matches your requirement!</li>
                                                    <li>No Paperwork Yes, there’s no paperwork required to be done,
                                                        when you calculate and buy your insurance online.</li>
                                                </ul>
                                            </p>
                                        </div>
                                        {/* Calculating your premium online */}
                                        <div className="panel-alternate-green-div-body-2" style={{background: '#f4f4f4'}}>
                                            <h3 className="car-insurance-alternate-body-2-heading">But why is it important to calculate premium using bike
                                            insurance calculator before you buy insurance policy?</h3>
                                            <p className="car_insurance_text_alternate_text"><br/>
                                                Want to know the benefits of calculating your premium online using two wheeler 
                                                insurance calculator? Here are three of the most important ones:
                                                <br/><br/>
                                                <ul>
                                                    <li>It’s simple. Buy your two wheeler insurance in a matter of a few clicks,
                                                        nothing more – it’s that easy and hassle-free!</li>
                                                    <li>A range of options. Compare different types of policies and choose one
                                                        that perfectly matches your requirement!</li>
                                                    <li>No Paperwork Yes, there’s no paperwork required to be done,
                                                        when you calculate and buy your insurance online.</li>
                                                </ul>
                                            </p>
                                            <div style={{textAlign: 'center'}}>
                                            <Button className={classNames(classes.cssRoot)}>Click here to calculate your Insurance</Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </Col>
                        <Col md="3" style={{marginTop: '12px'}}>
                            <div className="panel-alternate-green-div">
                                <div className="panel-alternate-green-div-header">
                                    <h3 className="panel-alternate-green-div-header-text">
                                        Car insurers with us
                                        {!this.state.showCarInsurer &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/invalid-name.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{float: 'right', paddingTop: '8px', cursor: 'pointer'}}
                                                onClick={() => this.setState({showCarInsurer: !this.state.showCarInsurer})}/>
                                        }
                                        {this.state.showCarInsurer &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/copy-2.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{float: 'right', paddingTop: '12px', cursor: 'pointer'}}
                                                onClick={() => this.setState({showCarInsurer: !this.state.showCarInsurer})}/>
                                        }
                                    </h3>
                                </div>
                                {this.state.showCarInsurer&&<div className="panel-alternate-green-div-body panel-alternate-green-div-body-img" style={{background: '#ffffff'}}>
                                    <img  alt='alternate-buyer-journey'src="/assets/kotak-general-insurance.jpg" /><br/>
                                    <img  alt='alternate-buyer-journey'src="/assets/kotak-general-insurance.jpg" /><br/>
                                    <img  alt='alternate-buyer-journey'src="/assets/kotak-general-insurance.jpg" /><br/>
                                    <img  alt='alternate-buyer-journey'src="/assets/kotak-general-insurance.jpg" />
                                </div>}
                            </div>
                            <div className="panel-alternate-green-div" style={{marginTop: '20px'}}>
                                <div className="panel-alternate-green-div-header">
                                    <h3 className="panel-alternate-green-div-header-text">
                                        Is this page helpful?
                                        {!this.state.isHelpful &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/invalid-name.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{float: 'right', paddingTop: '8px', cursor: 'pointer'}}
                                                onClick={() => this.setState({isHelpful: !this.state.isHelpful})}/>
                                        }
                                        {this.state.isHelpful &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/copy-2.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{float: 'right', paddingTop: '12px', cursor: 'pointer'}}
                                                onClick={() => this.setState({isHelpful: !this.state.isHelpful})}/>
                                        }
                                    </h3>
                                </div>
                                {this.state.isHelpful && <div className="panel-alternate-green-div-body" style={{background: '#ffffff'}}>
                                    <RadioGroup
                                        aria-label="Car Type"
                                        name="carType"
                                        className={classes.group}
                                        value={this.state.carType}
                                        onChange={this.handleChange}
                                        
                                    >
                                        <FormControlLabel value="personal" control={<Radio classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }} />} label="Yes" />
                                        <FormControlLabel value="commercial" control={<Radio classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }} />} label="No" />
                                    </RadioGroup>
                                </div>}
                            </div>
                            <div className="panel-alternate-green-div" style={{marginTop: '20px'}}>
                                <div className="panel-alternate-green-div-header">
                                    <h3 className="panel-alternate-green-div-header-text">
                                         Blog
                                        {!this.state.blogLinks &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/invalid-name.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{float: 'right', paddingTop: '8px', cursor: 'pointer'}}
                                                onClick={() => this.setState({blogLinks: !this.state.blogLinks})}/>
                                        }
                                        {this.state.blogLinks &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/copy-2.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{float: 'right', paddingTop: '12px', cursor: 'pointer'}}
                                                onClick={() => this.setState({blogLinks: !this.state.blogLinks})}/>
                                        }
                                    </h3>
                                </div>
                                {this.state.blogLinks && <div className="panel-alternate-green-div-body" style={{background: '#ffffff'}}>
                                    <p className="blog_link_alternate_journey">How to create beautiful typography</p>
                                    <p className="blog_link_alternate_journey">How to create beautiful typography</p>
                                    <p className="blog_link_alternate_journey">How to create beautiful typography</p>
                                    <p className="blog_link_alternate_journey">How to create beautiful typography</p>
                                    <p className="blog_link_alternate_journey">How to create beautiful typography</p>
                                    <p className="blog_link_alternate_journey">How to create beautiful typography</p>
                                </div>}
                            </div>
                        </Col>
                        <Col md="1"></Col>
                    </Row>
                    <br/>
                </div>
            </div>
        )
    }
}

Insurer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (Insurer)
import React from 'react'
import './alternate_buyer_journey.css'
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
        padding: '10px 50px'
    }
});

class AlternateBuyer extends React.Component {

    state = {
        carType: 'personal',
        iterate: [0, 0, 0, 0, 0, 0],
        iterate2: [0, 0, 0],
        showAllAbout: true,
        showCarInsurer: false,
        isHelpful: false,
        blogLinks: false,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
       
    };

    handleWindowChange() {
        if (window.innerWidth > 767) {
            this.setState({ showAllAbout: true, showCarInsurer: true, isHelpful: true, blogLinks: true });
           
        } else {
            this.setState({ showAllAbout: true, showCarInsurer: false, isHelpful: false, blogLinks: false });
           
        }
    }


    componentDidMount() {
        const vm = this;
        this.props.onCurrentComponent('AlternateBuyer.json');
        axios.get('/assets/json/AlternateBuyer.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
               
            })
        if (window.innerWidth > 767) {
            this.setState({ showAllAbout: true, showCarInsurer: true, isHelpful: true, blogLinks: true });
           
        } else {
            this.setState({ showAllAbout: true, showCarInsurer: false, isHelpful: false, blogLinks: false });
           
        }
        window.addEventListener('resize', this.handleWindowChange.bind(this));
    }

    render() {
        const { classes } = this.props;
        // {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosTestimonialsParagraph1 : ''}

        return (
            <div className="alternateBuyerJourney">
                <div className="mui--hidden-xs mui--hidden-sm"><HeaderAlternate header={this.props.FetchedLanguage} /></div>
                <h3 className="main_heading_altrnt_byr_jrny">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerHeadingChooseYourInsuranceJustLikeChooseYourRide : ''}</h3>
                <div className="mui-container-fluid">
                    <Row className="panel-row-alternate-buyer">
                        <Col md="1"></Col>
                        <Col md="4">
                            <img alt='alternate-buyer-journey' src="/assets/undraw-electric-car-b-7-hl.svg" className="mui--hidden-xs mui--hidden-sm" style={{ width: '100%', height: 'auto' }} />
                        </Col>
                        <Col md="6">
                            <div className="mui-panel">
                                <div className="panel-alternate_buyer-content">
                                    <h3 className="mui-panel-heading-car">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelHeadingCar : ''}</h3>
                                    <p className="mui-panel-sub-heading-p">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelSubheadingGotAnewCar : ''}</p>
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
                                            }} />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelRadioInputLabelPersonalCar : ''} />
                                            <FormControlLabel value="commercial" control={<Radio classes={{
                                                root: classes.root,
                                                checked: classes.checked,
                                            }} />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelRadioInputLabelCommercialCar : ''} />
                                        </RadioGroup>
                                        <Row>
                                            <Col md="7">
                                                <TextField label={this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelTextFieldLabelVehicleRegistrationNumber : ''} fullWidth />
                                                <p className="forgot_alternate_buyer">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelForgotRegistrationNumberLink : ''}?</p>
                                                <p className="forgot_alternate_buyer_right">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelBoughtANewCarLink : ''}</p>
                                            </Col>
                                            <Col md="5">
                                                <Button className={classNames(classes.cssRoot)}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelButtonTextSubmit : ''}</Button>
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
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelAllAboutCarInsuranceHeading : ''}
                                        {!this.state.showAllAbout &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/invalid-name.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '8px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ showAllAbout: !this.state.showAllAbout })} />
                                        }
                                        {this.state.showAllAbout &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/copy-2.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '12px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ showAllAbout: !this.state.showAllAbout })} />
                                        }
                                    </h3>

                                </div>
                                {this.state.showAllAbout &&
                                    <div className="panel-body">
                                        <div className="panel-alternate-green-div-body">
                                            <h3 className="car_insurance_heading_alternate_buyer">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelWhatIsCarInsuranceHeading : ''}</h3>
                                            <p className="car_insurance_text_alternate_buyer">
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelInsurancePara1 : ''}<br /><br />

                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelInsurancePara2 : ''}
                                            </p>
                                        </div>
                                        {/* Another body with white background */}
                                        <div className="panel-alternate-green-div-body-2">
                                            <h3 className="alternate-body-2-heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelFactorsDecideMotorInsurancePremiumHeading : ''}</h3>
                                            <p className="alternate-body-2-small">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelFactorsDecideMotorInsurancePremiumSomeLine : ''}</p>
                                            <Row>
                                                {this.state.iterate.map(i =>
                                                    <Col md="4" style={{ paddingTop: '12px' }}>
                                                        <div className="card-alternate-buyer-model-make">
                                                            <div className="rect-card-alternate-model"></div>
                                                            <p className="car-model-make-heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelCarModelAndMake : ''}</p>
                                                            <p className="car-model-make-text">
                                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelCarModelAndMakePara : ''}
                                                            </p>
                                                        </div>
                                                    </Col>
                                                )}
                                            </Row>
                                            <div style={{ textAlign: 'center', paddingTop: '20px' }}>
                                                <Button variant="outlined" color="primary" className={classes.button}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelButtonViewAllText : ''}</Button>
                                            </div>
                                        </div>
                                        {/* Another body with grey background */}
                                        <div className="panel-alternate-green-div-body-2" style={{ background: '#f4f4f4' }}>
                                            <h3 className="alternate-body-2-heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelFactorsDecideMotorInsurancePremiumHeadingTwo : ''}</h3>
                                            <p className="alternate-body-2-small">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelFactorsDecideMotorInsurancePremiumSomeLineTwo : ''}</p>
                                            <Row>
                                                {this.state.iterate2.map(i =>
                                                    <Col md="4" style={{ paddingTop: '12px' }}>
                                                        <div className="card-alternate-buyer-model-make">
                                                            <div className="rect-card-alternate-model"></div>
                                                            <p className="car-model-make-heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelCarModelAndMakeTwo : ''}</p>
                                                            <p className="car-model-make-text">
                                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelCarModelAndMakeParaTwo : ''}
                                                            </p>
                                                        </div>
                                                    </Col>
                                                )}
                                            </Row>
                                            <div style={{ textAlign: 'center', paddingTop: '20px' }}>
                                                <Button variant="outlined" color="primary" className={classes.button}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelButtonViewAllTextTwo : ''}</Button>
                                            </div>
                                        </div>
                                        {/* Another body with white background */}
                                        <div className="panel-alternate-green-div-body-2" style={{ background: '#ffffff' }}>
                                            <h3 className="alternate-body-2-heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelFactorsDecideMotorInsurancePremiumHeadingThree : ''}</h3>
                                            <p className="alternate-body-2-small">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelFactorsDecideMotorInsurancePremiumSomeLineThree : ''}</p>
                                            <Row>
                                                <Col md="8">
                                                    <p style={{ lineHeight: '0.5' }}><br />
                                                        <p className="step-1-alternate-buyer-journey">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerStep1 : ''}<br /><span className="step-1-heading-alternate-buyer-journey">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerStep1Heading : ''}</span></p>
                                                        <p className="step-1-alternate-buyer-journey-text">
                                                            {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerStep1Paragraph : ''}
                                                        </p>
                                                    </p>
                                                </Col>
                                                <Col md="4" style={{ textAlign: 'center' }}>
                                                    <img alt='alternate-buyer-journey'
                                                        src="/assets/undraw-choose-80-qg.svg" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="4" className="mui--hidden-sm mui--hidden-xs">
                                                    <img alt='alternate-buyer-journey'
                                                        src="/assets/undraw-people-search-wctu.svg" />
                                                </Col>
                                                <Col md="8">
                                                    <p style={{ lineHeight: '0.5' }}><br />
                                                        <p className="step-1-alternate-buyer-journey">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerStep2 : ''}<br /><span className="step-1-heading-alternate-buyer-journey">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerStep2Heading : ''}</span></p>
                                                        <p className="step-1-alternate-buyer-journey-text">
                                                            {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerStep2Paragraph : ''}
                                                        </p>
                                                    </p>
                                                </Col>
                                                <Col md="4" className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ textAlign: 'center' }}>
                                                    <img alt='alternate-buyer-journey'
                                                        src="/assets/undraw-people-search-wctu.svg" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="8">
                                                    <p style={{ lineHeight: '0.5' }}><br />
                                                        <p className="step-1-alternate-buyer-journey">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerStep3 : ''}<br /><span className="step-1-heading-alternate-buyer-journey">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerStep3Heading : ''}</span></p>
                                                        <p className="step-1-alternate-buyer-journey-text">
                                                            {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerStep3Paragraph : ''}
                                                        </p>
                                                    </p>
                                                </Col>
                                                <Col md="4" style={{ textAlign: 'center' }}>
                                                    <img alt='alternate-buyer-journey'
                                                        src="/assets/undraw-customer-survey-f-9-ur.svg" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="4" className="mui--hidden-sm mui--hidden-xs">
                                                    <img alt='alternate-buyer-journey'
                                                        src="/assets/undraw-successful-purchase-uyin.svg" />
                                                </Col>
                                                <Col md="8">
                                                    <p style={{ lineHeight: '0.5' }}><br />
                                                        <p className="step-1-alternate-buyer-journey">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerStep4 : ''}<br /><span className="step-1-heading-alternate-buyer-journey">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerStep4Heading : ''}</span></p>
                                                        <p className="step-1-alternate-buyer-journey-text">
                                                            {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerStep4Paragraph : ''}
                                                        </p>
                                                    </p>
                                                </Col>
                                                <Col md="4" className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ textAlign: 'center' }}>
                                                    <img alt='alternate-buyer-journey'
                                                        src="/assets/undraw-successful-purchase-uyin.svg" />
                                                </Col>
                                            </Row>
                                        </div>
                                        {/* Car Insurance Calculator */}
                                        <div className="panel-alternate-green-div-body-2" style={{ background: '#f4f4f4' }}>
                                            <h3 className="car-insurance-alternate-body-2-heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerCarInsuranceCalculaterHeading : ''}</h3>
                                            <p className="alternate-body-2-small">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerCarInsuranceCalculaterSomeLine : ''}</p>
                                            <p className="car_insurance_text_alternate_text"><br />
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerACarInsurancePremiumCalculatorLine1 : ''}<br /><br />

                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerACarInsurancePremiumCalculatorLine2 : ''}<br /><br />

                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerACarInsurancePremiumCalculatorLine3 : ''}<br /><br />

                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerACarInsurancePremiumCalculatorLine4 : ''}
                                                <br /><br />
                                                <ul>
                                                    <li>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerACarInsurancePremiumCalculatorKeyPonit1 : ''}</li>
                                                    <li>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerACarInsurancePremiumCalculatorKeyPonit2 : ''}</li>
                                                    <li>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerACarInsurancePremiumCalculatorKeyPonit3 : ''}</li>
                                                    <li>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerACarInsurancePremiumCalculatorKeyPonit4 : ''}</li>
                                                    <li>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerACarInsurancePremiumCalculatorKeyPonit5 : ''}</li>
                                                    <li>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerACarInsurancePremiumCalculatorKeyPonit6 : ''}</li>
                                                </ul>
                                            </p>
                                        </div>
                                        {/* Calculating your premium online */}
                                        <div className="panel-alternate-green-div-body-2" style={{ background: '#ffffff' }}>
                                            <h3 className="car-insurance-alternate-body-2-heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerCalculatingYourPremiumOnlineHeading : ''}</h3>
                                            <p className="alternate-body-2-small">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerCalculatingYourPremiumOnlineSomeLine : ''}</p>
                                            <p className="car_insurance_text_alternate_text"><br />
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerWantToknowTheBenefitsParagraph : ''}
                                                <br /><br />
                                                <ul>
                                                    <li>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerWantToknowTheBenefitsKeyPoint1 : ''}</li>
                                                    <li>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerWantToknowTheBenefitsKeyPoint2 : ''}</li>
                                                    <li>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerWantToknowTheBenefitsKeyPoint3 : ''}</li>
                                                </ul>
                                            </p>
                                        </div>
                                        {/* Calculating your premium online */}
                                        <div className="panel-alternate-green-div-body-2" style={{ background: '#f4f4f4' }}>
                                            <h3 className="car-insurance-alternate-body-2-heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerButWhyIsItImportantToCalculatePremiumText : ''}</h3>
                                            <p className="car_insurance_text_alternate_text"><br />
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerWantToKnowTheBenefitsOfCalculatingYourPremiumOnline : ''}
                                                <br /><br />
                                                <ul>
                                                    <li>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerWantToKnowTheBenefitsOfCalculatingYourPremiumOnlineKeyPoint1 : ''}</li>
                                                    <li>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerWantToKnowTheBenefitsOfCalculatingYourPremiumOnlineKeyPoint2 : ''}</li>
                                                    <li>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerWantToKnowTheBenefitsOfCalculatingYourPremiumOnlineKeyPoint3 : ''}</li>
                                                </ul>
                                            </p>
                                            <div style={{ textAlign: 'center' }}>
                                                <Button className={classNames(classes.cssRoot)}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerButtonClickToCalculateYourInsurance : ''}</Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </Col>
                        <Col md="3" style={{ marginTop: '12px' }}>
                            <div className="panel-alternate-green-div">
                                <div className="panel-alternate-green-div-header">
                                    <h3 className="panel-alternate-green-div-header-text">
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelHeadingCarInsuranceWithUs : ''}
                                        {!this.state.showCarInsurer &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/invalid-name.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '8px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ showCarInsurer: !this.state.showCarInsurer })} />
                                        }
                                        {this.state.showCarInsurer &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/copy-2.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '12px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ showCarInsurer: !this.state.showCarInsurer })} />
                                        }
                                    </h3>
                                </div>
                                {this.state.showCarInsurer && <div className="panel-alternate-green-div-body panel-alternate-green-div-body-img alt='alternate-buyer-journey'" style={{ background: '#ffffff' }}>
                                    <img alt='alternate-buyer-journey' src="/assets/kotak-general-insurance.jpg" /><br />
                                    <img alt='alternate-buyer-journey' src="/assets/kotak-general-insurance.jpg" /><br />
                                    <img alt='alternate-buyer-journey' src="/assets/kotak-general-insurance.jpg" /><br />
                                    <img alt='alternate-buyer-journey' src="/assets/kotak-general-insurance.jpg" />
                                </div>}
                            </div>
                            <div className="panel-alternate-green-div" style={{ marginTop: '20px' }}>
                                <div className="panel-alternate-green-div-header">
                                    <h3 className="panel-alternate-green-div-header-text">
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelHeadingIsThisPageHelpful : ''}
                                        {!this.state.isHelpful &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/invalid-name.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '8px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ isHelpful: !this.state.isHelpful })} />
                                        }
                                        {this.state.isHelpful &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/copy-2.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '12px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ isHelpful: !this.state.isHelpful })} />
                                        }
                                    </h3>
                                </div>
                                {this.state.isHelpful && <div className="panel-alternate-green-div-body" style={{ background: '#ffffff' }}>
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
                                        }} />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelRadioInputLabelYes : ''} />
                                        <FormControlLabel value="commercial" control={<Radio classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }} />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelRadioInputLabelNo : ''} />
                                    </RadioGroup>
                                </div>}
                            </div>
                            <div className="panel-alternate-green-div" style={{ marginTop: '20px' }}>
                                <div className="panel-alternate-green-div-header">
                                    <h3 className="panel-alternate-green-div-header-text">
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelHeadingIsThisPageHelpful : ''}
                                        {!this.state.blogLinks &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/invalid-name.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '8px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ blogLinks: !this.state.blogLinks })} />
                                        }
                                        {this.state.blogLinks &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/copy-2.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '12px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ blogLinks: !this.state.blogLinks })} />
                                        }
                                    </h3>
                                </div>
                                {this.state.blogLinks && <div className="panel-alternate-green-div-body" style={{ background: '#ffffff' }}>
                                    <p className="blog_link_alternate_journey">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelparaHowToCreateBeautifulTypography1 : ''}</p>
                                    <p className="blog_link_alternate_journey">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelparaHowToCreateBeautifulTypography2 : ''}</p>
                                    <p className="blog_link_alternate_journey">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelparaHowToCreateBeautifulTypography3 : ''}</p>
                                    <p className="blog_link_alternate_journey">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelparaHowToCreateBeautifulTypography4 : ''}</p>
                                    <p className="blog_link_alternate_journey">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelparaHowToCreateBeautifulTypography5 : ''}</p>
                                    <p className="blog_link_alternate_journey">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerPanelparaHowToCreateBeautifulTypography6 : ''}</p>
                                </div>}
                            </div>
                        </Col>
                        <Col md="1"></Col>
                    </Row>
                    <br />
                </div>
            </div>
        )
    }
}

AlternateBuyer.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AlternateBuyer));
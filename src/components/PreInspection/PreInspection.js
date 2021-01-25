import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { connect } from 'react-redux';
import './PreInspection.css';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import AddAddressForm from '../AddAddressForm/AddAddressForm';
import axios from 'axios';



const styles = theme => ({
    card: {
        maxWidth: 1200,
        maxHeight: 'auto',
        paddingBottom: '7rem',
        paddingTop: '2rem',
    },
    paper: {
        width: '100%',
        borderRadius: '6px',
        border: 'solid 1px #0da176',
        backgroundColor: '#ffffff',
    },
    panel: {
        marginTop: '10px',
    },
    panelSummary: {
        backgroundColor: '#0da176',
    },
    heading: {
        fontFamily: 'Nunito',
        fontSize: '16px',
        color: '#ffffff',
    },
    disabled: {
        color: '#808080',
    },
    checkbox: {
        display: 'inline',
        color: '#000000',
        '&$checked':
        {
            color: '#0da176',
        },
    },
    checked: {},
    label: {
        fontFamily: 'Nunito',
        fontSize: '15px',
        color: '#000000',
    },
    Typography: {
        color: '#ffffff',
        backgroundColor: '#0da176',
        fontFamily: 'Nunito',
        fontSize: '16px',
        padding: 5,
        borderRadius: '3px 3px 0px 0px'
    },
});

class PreInspection extends React.Component {
    componentWillMount() {
        const vm = this;
        this.props.onCurrentComponent('PreInspection.json');
        axios.get('/assets/json/PreInspection.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
                console.log(error);
            })
    }
    state = {
        checkboxShow: true,
        showPaneldisable: true,
        defaultexpande: false,
        NotshowVerificationPanel: true,
        expandVerificationPanel: false,
        showDateTimePanel: false,
        showVerificatonPanel: false,
    }


    AddAddressHandler() {
        this.props.onAddAddressForm();
    }
    handleSelectAddress() {
        window.scrollTo(0, 250);
        this.props.onSelectAddress();
        this.setState({
            checkboxShow: false,
            showPaneldisable: !this.state.showPaneldisable,
            defaultexpande: true,
            showDateTimePanel: !this.state.showDateTimePanel,
        });
    }
    scheduleInspectionHandler() {
        window.scrollTo(0, 380);
        this.props.onSelectDateTime();
        this.setState({
            showVerificatonPanel: !this.state.showVerificatonPanel,
            NotshowVerificationPanel: false,
            expandVerificationPanel: true,
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider>
                <div className='preInspectionContainer'>
                    <Card className={classes.card}>
                        <div className={classes.root}>

                            {/* 1.Address panel */}

                            <ExpansionPanel defaultExpanded>
                                {this.props.selectedAddress &&
                                    <div>
                                        <div className='PanelCompleted'>
                                            <Row>
                                                <Col md={4}> <div className='Heading' >{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionAddressPanelSelectYourPreInspectionAddress : ''}</div></Col>
                                                <Col md={4}><div className='userInfo' ><span style={{ fontWeight: 600 }}>Arpit Sharma</span><br></br>
                                                    9968872607<br></br>
                                                    413, Sector 17 B Vasundhara, Ghaziabad,<br></br>
                                                    UTTAR PRADESH - 201012
                                                    {!this.props.selectedDateTime &&
                                                        <div className='changeDiv' style={{ float: 'right', color: '#4a90e2', marginRight: '3rem', padding: '0px', cursor: 'pointer' }}
                                                            onClick={this.AddAddressHandler.bind(this)}>Change
                                                        </div>}
                                                    {this.props.onAddAddressForm &&
                                                        <AddAddressForm AddAddress={this.props.FetchedLanguage}/>}
                                                </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                }
                                {!this.props.selectedAddress &&
                                    <div>
                                        <ExpansionPanelSummary className={classes.panelSummary}>
                                            <Typography variant="title" className={classes.heading}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionAddressPanelSelectYourPreInspectionAddress : ''}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Row>
                                                <Col md={12} xs={12}>
                                                    <div>
                                                        <Paper className={classes.paper} elevation={1}>
                                                            <div className='innerPaper'>
                                                                {this.state.checkboxShow &&
                                                                    <FormControlLabel className='mui--hidden-xs' control={<Checkbox value="checked"
                                                                        onChange={this.handleSelectAddress.bind(this)}
                                                                        classes={{
                                                                            root: classes.checkbox,
                                                                            checked: classes.checked,
                                                                            label: classes.label
                                                                        }}
                                                                    />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionAdressPanelCheckboxLevelClickToSelectAddress : ''} />}
                                                                <div className='userInfo'>
                                                                    <p className='Username' style={{ fontWeight: 600 }}>
                                                                        Arpit Sharma
                                                                        <p
                                                                            className='changeDiv mui--visible-xs-block' style={{ float: 'right' }}
                                                                            onClick={this.AddAddressHandler.bind(this)}
                                                                        >{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionAddressPanelChangeLink : ''}</p>
                                                                    </p>
                                                                    <p className='UserAddress'>
                                                                        9968872607<br></br>
                                                                        413, Sector 17 B Vasundhara, Ghaziabad,<br></br>
                                                                        UTTAR PRADESH - 201012<br></br></p>
                                                                </div>
                                                                {this.props.onAddAddressForm &&
                                                                    <AddAddressForm AddAddress={this.props.FetchedLanguage} />}
                                                            </div>
                                                        </Paper>
                                                        {this.props.AddAddressFormOpen &&
                                                            <AddAddressForm AddAddress={this.props.FetchedLanguage} />}
                                                        <div className="mui--hidden-xs">
                                                            <ButtonLightSuccess Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionAddressPanelButtonAddNewAddressText : ''} onClick={this.AddAddressHandler.bind(this)} fullContent={true} />
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </ExpansionPanelDetails>
                                    </div>
                                }
                            </ExpansionPanel>

                            {/* 2.Date-Time panel */}

                            <ExpansionPanel id="DateTime" disabled={this.state.showPaneldisable} expanded={this.state.defaultexpande} className={classNames(classes.panel)}>
                                {!this.state.showDateTimePanel ?
                                    <ExpansionPanelSummary>
                                        <Typography className={classNames(classes.disabled, classes.heading)}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionDateTimePanelSelectYourPreInspectionDateTime : ''}</Typography>
                                    </ExpansionPanelSummary> :
                                    <div>
                                        {!this.props.selectedDateTime &&
                                            <div>
                                                <ExpansionPanelSummary className={classes.panelSummary}>
                                                    <Typography className={classNames(classes.heading)}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionDateTimePanelSelectYourPreInspectionDateTime : ''}</Typography>
                                                </ExpansionPanelSummary>

                                                <ExpansionPanelDetails>
                                                    <div className='expensionDateTime'>
                                                        <Row>
                                                            <Col md={12}>
                                                                <div className='selectDate'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionDatePanelSelectYourPreInspectionDateHeading : ''}</div>
                                                            </Col>
                                                            <Col md={3} xs={6}>
                                                                <div className='DateContainer'>
                                                                    <div className='date'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionDateSlotOne : ''}</div>
                                                                </div>
                                                            </Col>
                                                            <Col md={3} xs={6}>
                                                                <div className='DateContainer'>
                                                                    <div className='date'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionDateSlotTwo : ''}</div>
                                                                </div>
                                                            </Col>
                                                            <Col md={3} xs={6}>
                                                                <div className='DateContainer'>
                                                                    <div className='date'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionDateSlotThree : ''}</div>
                                                                </div>
                                                            </Col>
                                                            <Col md={3} xs={6}>
                                                                <div className='DateContainer'>
                                                                    <div className='date'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionDateSlotFour : ''}</div>
                                                                </div>
                                                            </Col>
                                                            <Col md={12}>
                                                                <div className='selectDate'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionDateTimePanelSelectTimeHeading : ''}</div>
                                                            </Col>
                                                            <Col md={3} xs={6}>
                                                                <div className='DateContainer'>
                                                                    <div className='date'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionTimePanelDateSlotOne : ''}</div>
                                                                </div>
                                                            </Col>
                                                            <Col md={3} xs={6}>
                                                                <div className='DateContainer'>
                                                                    <div className='date'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionTimePanelDateSlotTwo : ''}</div>
                                                                </div>
                                                            </Col>
                                                            <Col md={3} xs={6}>
                                                                <div className='DateContainer'>
                                                                    <div className='date'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionTimePanelDateSlotThree : ''}</div>
                                                                </div>
                                                            </Col>
                                                            <Col md={3} xs={6}>
                                                                <div className='DateContainer'>
                                                                    <div className='date'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionTimePanelDateSlotFour : ''}</div>
                                                                </div>
                                                            </Col>
                                                            <Col md={12}>
                                                                <FormControlLabel classes={{ label: classes.label }} control={<Checkbox value="checked"
                                                                    classes={{
                                                                        root: classes.checkbox,
                                                                        checked: classes.checked,
                                                                    }}
                                                                />} label={this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionCheckboxLabelUnableToFindSlot : ''} />
                                                            </Col>
                                                            <Col md={12}>
                                                                <div style={{ textAlign: 'center' }}>
                                                                    <ButtonLightSuccess Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionButtonTextScheduleInspection : ''} buttonText={true} onClick={this.scheduleInspectionHandler.bind(this)} />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </ExpansionPanelDetails>

                                            </div>}
                                    </div>
                                }

                                {this.props.selectedDateTime &&
                                    <div className='PanelCompleted'>
                                        <Row>
                                            <Col md={6}> <div className='Heading' >{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionDateTimePanelSelectYourPreInspectionDateTime : ''}</div></Col>
                                            <Col md={4}><div className='userInfo' >13- Oct-2018, 11 AM - 1 PM</div>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                            </ExpansionPanel>

                            {/* 1.Document Veification panel */}

                            <ExpansionPanel disabled={this.state.NotshowVerificationPanel} expanded={this.state.expandVerificationPanel} className={classNames(classes.panel)} >
                                {!this.state.showVerificatonPanel ?
                                    <ExpansionPanelSummary>
                                        <Typography className={classNames(classes.disabled, classes.heading)}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionVerificationPanelInspectionAndDocumentVerification : ''}</Typography>
                                    </ExpansionPanelSummary> :
                                    <ExpansionPanelSummary className={classes.panelSummary}>
                                        <Typography className={classNames(classes.heading)}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionVerificationPanelInspectionAndDocumentVerification : ''}</Typography>
                                    </ExpansionPanelSummary>}

                                <ExpansionPanelDetails>
                                    <Row>
                                        <Col md={6} xs={8}>
                                            <div className='verificationInfo'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionVerificationPanelRequestNumber : ''}</div>
                                        </Col>
                                        <Col md={4} xs={4}>
                                            <div className='verificationInfo' style={{ textAlign: 'right' }}>123456</div>
                                        </Col>
                                        <Col md={6} xs={4}>
                                            <div className='verificationInfo'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionVerificationPanelAddress : ''}</div>
                                        </Col>
                                        <Col md={4} xs={8}>
                                            <div className='verificationInfo' style={{
                                                textAlign: 'right'
                                            }}>
                                                Arpit Sharma, 9968872607
                                                413, Sector 17 B Vasundhara,
                                                Ghaziabad, UTTAR PRADESH - 201012
                                                </div>
                                        </Col>
                                        <Col md={6} xs={5}>
                                            <div className='verificationInfo'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionVerificationPanelDateTime : ''}</div>
                                        </Col>
                                        <Col md={4} xs={7}>
                                            <div className='verificationInfo' style={{ textAlign: 'right' }}>
                                                13-Oct- 2018,  11 AM- 1 PM
                                                </div>
                                        </Col>
                                        <Col md={11} xs={12}>
                                            <div className='declaration'>
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionVerificationPanelFinalMessage : ''}
                                            </div>
                                        </Col>
                                        <Col md={11} xs={12}>
                                            <div className='check'>
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionVerificationPanelTillThatTimeText : ''}
                                            </div>
                                        </Col>
                                    </Row>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel disabled className={classNames(classes.panel)}>
                                <ExpansionPanelSummary>
                                    <Typography className={classNames(classes.disabled, classes.heading)}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.PreInspectionPaymentPanelPayment : ''}</Typography>
                                </ExpansionPanelSummary>
                            </ExpansionPanel>
                        </div>
                    </Card>
                </div>
            </MuiThemeProvider>
        )
    }
}




PreInspection.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        selectedAddress: state.PreInspection.select_address_show,
        selectedDateTime: state.PreInspection.select_date_time_show,
        AddAddressForm: state.PreInspection.add_address_form_open,
        CurrentLanguage: state.language.current_language,
        FetchedLanguage: state.language.lang_data,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectAddress: () => dispatch({ type: 'SELECT_ADDRESS_SHOW' }),
        onSelectDateTime: () => dispatch({ type: 'SELECT_DATE_TIME_SHOW' }),
        onAddAddressForm: () => dispatch({ type: 'AddAddressForm_SHOW' }),
        onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
        onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
        onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PreInspection));
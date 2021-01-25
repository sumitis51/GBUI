import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Container from 'muicss/lib/react/container'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';

import './index.css'

const styles = theme => ({
    textField: {
        width: '100%',
        margin:0,
    },
    tabsRoot: {
        margin: '0px 0px',
        flexGrow: 1,
    },
    tabsIndicator: {
        height: 0
    },
    tabRoot: {
        textTransform: 'initial',
        backgroundColor: '#ffffff',
        minWidth: '33.33%',
        opacity: 1,
        fontSize: '14px',
        color: '#808080',
        borderBottom: '1px solid #ea0b4b',
        borderTop: '1px solid #979797',
        borderLeft: '1px solid #979797',
        borderRight: '1px solid #979797',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        fontFamily: [
            'Nunito'
        ].join(','),
        '&$tabSelected': {
            color: '#ea0b4b',
            borderTop: '1px solid #ea0b4b',
            borderLeft: '1px solid #ea0b4b',
            borderRight: '1px solid #ea0b4b',
            borderBottom: '#ffffff',
        },
        '&:focus': {
            outline: '#ffffff',
        },
    },
    tabSelected: {},
    card: {
        borderBottom: '1px solid #ea0b4b',
        borderLeft: '1px solid #ea0b4b',
        borderRight: '1px solid #ea0b4b',
    },
    divider: {
        backgroundColor: '#000000',
    },
    cardContent: {
        padding: ' 16px 0px'
    },
    labelContainer:{
        padding: '6px 0px'
    },
    button:{
        fontFamily: 'Source Sans Pro',
        fontSize: '12px',
        color: '#ea0b4b',
        border:'1px solid #ea0b4b',
        textTransform:'capitalize',
        padding:'8px 23px'
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    bootstrapInput: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 12,
        color: '#808080',
        width: '100%',
        padding: '8px 44px 8px 12px',
        // Use the system font instead of the default Roboto font.
        fontFamily: [
          'Nunito'
        ].join(','),
    },
    submitButton:{
        backgroundColor:'#ea0b4b',
        fontFamily: 'Nunito',
        fontSize: '14px',
        color: '#ffffff',
        padding:'7px 27px',
        '&:hover': {
            backgroundColor:'#ea0b4b',
          },
    },
    saveButton:{
        backgroundColor:'#ea0b4b',
        fontFamily: 'Nunito',
        fontSize: '14px',
        color: '#ffffff',
        padding:'7px 60px',
        '&:hover': {
            backgroundColor:'#ea0b4b',
          },
    },
    margin:{
        margin: '0px -5px 0px 0px'
    }
});

class PosProfile extends Component {
    state = {
        value: 0,
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <MuiThemeProvider>
                <div className='pos-profile'>
                    <Container fluid={true} className='pos-profile-container'>
                        <Row>
                            <Col md={12} xs={12}>
                                <div className='pos-profile-view' style={{ display: 'inline-flex' }}>
                                    <img alt='profile-pic' className='profile-pic'
                                        src='assets/pos/pos.png'
                                    />
                                </div>
                                <div className='pos-data' style={{ display: 'inline-block' }}>
                                    <div className='pos-name gbui-h5' >John Doe</div>
                                    <div className='pos-info gbui-menu-bar-1 '>POS ID: (POS/123/1234)</div>
                                    <div className='pos-info gbui-menu-bar-1'>PIN Code: 282001</div>
                                    <div className='pos-info gbui-menu-bar-1'>Region: AGRA</div>
                                    <div className='pos-info gbui-menu-bar-1 mui--hidden-xs mui-hidden-sm'>
                                        POS Membership:
                                       <span style={{ color: '#0da176' }}>1-Jan-2019 to 31 Dec- 2019</span>
                                        <span style={{ color: '#ea0b4b' }} className='gbui-body-2'>(View Details)</span>
                                    </div>
                                    <div className='pos-info gbui-menu-bar-1 mui--visible-xs-block'>
                                        POS Membership:
                                       <div style={{ color: '#0da176',wordBreak:'break-all' }}>1-Jan-2019 to 31 Dec- 2019</div>
                                        <div style={{ color: '#ea0b4b', }} className='gbui-body-2'>(View Details)</div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={12} xs={12}>
                                <Tabs
                                    variant="fullWidth"
                                    value={value}
                                    onChange={this.handleChange}
                                    classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                                >
                                    <Tab
                                        disableRipple
                                        classes={{ root: classes.tabRoot, selected: classes.tabSelected,labelContainer:classes.labelContainer }}
                                        label="Personal Details"
                                    />
                                    <Tab
                                        disableRipple
                                        classes={{ root: classes.tabRoot, selected: classes.tabSelected,labelContainer:classes.labelContainer }}
                                        label="Account Settings"
                                    />
                                    <Tab
                                        disableRipple
                                        classes={{ root: classes.tabRoot, selected: classes.tabSelected,labelContainer:classes.labelContainer }}
                                        label="Refer a friend"
                                    />
                                </Tabs>
                            </Col>
                            <Col md={12} xs={12}>
                                <Card square={true} className={classes.card}>
                                    {value === 0 &&
                                        <CardContent className={classes.cardContent}>
                                            <Row>
                                                <Col md={6} xs={12}>
                                                    <Col md={12} xs={12}>
                                                        <div className='gbui-menu-bar-1 pos-contact-information'>CONTACT INFORMATION</div>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <Divider className={classes.divider} />
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <Col md={8} xs={8} className='pos-contact-soure-column pos-contact-fields'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources'>
                                                                <span style={{ color: '#808080' }}>
                                                                    Email Id:</span> arpit.sharma@groupbima.com
                                                            </div>
                                                        </Col>
                                                        <Col md={4} xs={4} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources-changes'>
                                                                Change Email
                                                            </div>
                                                        </Col>
                                                        <Col md={8} xs={5} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources'>
                                                                <span style={{ color: '#808080' }}>
                                                                    Phone:</span><br className='mui--visible-xs-block'></br> 9876643210
                                                            </div>
                                                        </Col>
                                                        <Col md={4} xs={7} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources-changes'>
                                                                Change Phone Number
                                                            </div>
                                                        </Col>
                                                        <Col md={8} xs={8} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-fields' style={{ color: '#808080' }}>
                                                                Permanent Address:
                                                            </div>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources' style={{ wordBreak: "break-all" }}>
                                                                49/1 R.K Puram Tajnagari,
                                                                Phase 1, Agra, Uttar Pradesh,
                                                                282001
                                                            </div>
                                                        </Col>
                                                        <Col md={4} xs={4} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources-changes'>
                                                                Edit Address
                                                                </div>
                                                        </Col>
                                                        <Col md={8} xs={8} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-fields' style={{ color: '#808080' }}>
                                                                Communication  Address:
                                                                </div>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources' style={{ wordBreak: "break-all" }}>
                                                                49/1 R.K Puram Tajnagari,
                                                                Phase 1, Agra, Uttar Pradesh,
                                                                282001
                                                                </div>
                                                        </Col>
                                                        <Col md={4} xs={4} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources-changes'>
                                                                Edit Address
                                                                </div>
                                                        </Col>
                                                        <Col md={12} xs={12} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources-changes'>
                                                                Add Address
                                                                </div>
                                                        </Col>
                                                    </Col>
                                                </Col>
                                                <Col md={6} xs={12} className='contact-information-column'>
                                                    <Col md={12} xs={12} >
                                                        <div className='gbui-menu-bar-1 pos-contact-information'>BANK ACCOUNT DETAILS</div>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <Divider className={classes.divider} />
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <Col md={8} xs={7} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources'>
                                                                <span style={{ color: '#808080' }}>Bank Name:</span>
                                                                <br className='mui--visible-xs-block'></br>  BANK OF BARODRA
                                                                    <span style={{ color: '#ea0b4b' }}> (Primary)</span>
                                                            </div>
                                                        </Col>
                                                        <Col md={4} xs={5} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources-changes'>
                                                                Edit Bank Details
                                                                </div>
                                                        </Col>
                                                        <Col md={12} xs={12} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources'>
                                                                <span style={{ color: '#808080' }}> A/C Number:
                                                                    <br className='mui--visible-xs-block'></br>
                                                                </span>2345678909876543234567
                                                                </div>
                                                        </Col>
                                                        <Col md={12} xs={12} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources'>
                                                                <span style={{ color: '#808080' }}>IFSC Code:
                                                                      <br className='mui--visible-xs-block'></br>
                                                                </span> BARB0AGRA
                                                            </div>
                                                        </Col>
                                                        <Col md={12} xs={12} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources'>
                                                                <span style={{ color: '#808080' }}>Branch Area:</span>
                                                                <br className='mui--visible-xs-block'></br>
                                                                Fatehabad Road, Agra
                                                            </div>
                                                        </Col>
                                                        <Col md={8} xs={7} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources'>
                                                                <span style={{ color: '#808080' }}>Bank Name:
                                                                <br className='mui--visible-xs-block'></br>
                                                                </span> BANK OF BARODRA
                                                                <span style={{ color: '#0da176' }}>(Secondary)</span>
                                                            </div>
                                                        </Col>
                                                        <Col md={4} xs={5} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources-changes'>
                                                                Edit Bank Details
                                                                </div>
                                                        </Col>
                                                        <Col md={12} xs={12} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources'>
                                                                <span style={{ color: '#808080' }}> A/C Number:
                                                                <br className='mui--visible-xs-block'></br>
                                                                </span> 2345678909876543234567
                                                                </div>
                                                        </Col>
                                                        <Col md={12} xs={12} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources'>
                                                                <span style={{ color: '#808080' }}>IFSC Code:
                                                                <br className='mui--visible-xs-block'></br>
                                                                </span> BARB0AGRA
                                                                </div>
                                                        </Col>
                                                        <Col md={12} xs={12} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources'>
                                                                <span style={{ color: '#808080' }}>Branch Area:
                                                                <br className='mui--visible-xs-block'></br>
                                                                </span> Fatehabad Road, Agra
                                                                </div>
                                                        </Col>
                                                        <Col md={12} xs={12} className='pos-contact-soure-column'>
                                                            <div className='gbui-menu-bar-1 pos-contact-sources-changes'>
                                                                Add Bank Details
                                                            </div>
                                                        </Col>
                                                    </Col>
                                                </Col>
                                                <Col md={6} xs={12}>
                                                    <Col md={12} xs={12}>
                                                        <div className='gbui-menu-bar-1 pos-contact-information'>DOCUMENTS</div>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <Divider className={classes.divider} />
                                                    </Col>
                                                    <Col md={8} xs={8}>
                                                        <div className='gbui-menu-bar-1 pos-contact-sources-certificates'>
                                                            <span style={{ color: '#808080' }}>Aadhar Card :
                                                            <br className='mui--visible-xs-block'></br>
                                                            </span>1234 1234 1234
                                                            </div>
                                                    </Col>
                                                    <Col md={4} xs={4}>
                                                        <div className='gbui-menu-bar-1 
                                                          pos-contact-sources-changes 
                                                          pos-contact-sources-certificates'>
                                                            (View)
                                                            </div>
                                                    </Col>
                                                    <Col md={8} xs={8}>
                                                        <div className='gbui-menu-bar-1 pos-contact-sources-certificates'>
                                                            <span style={{ color: '#808080' }}>PAN Card :
                                                            <br className='mui--visible-xs-block'></br>
                                                            </span> 12345GT6
                                                            </div>
                                                    </Col>
                                                    <Col md={4} xs={4}>
                                                        <div className='gbui-menu-bar-1 pos-contact-sources-changes
                                                        pos-contact-sources-certificates'>
                                                            (View)
                                                            </div>
                                                    </Col>
                                                    <Col md={8} xs={8}>
                                                        <div className='gbui-menu-bar-1 pos-contact-sources-certificates'>
                                                            Cancelled Cheque
                                                            </div>
                                                    </Col>
                                                    <Col md={4} xs={4}>
                                                        <div className='gbui-menu-bar-1 pos-contact-sources-changes
                                                        pos-contact-sources-certificates'>
                                                            (View)
                                                            </div>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <div className='gbui-menu-bar-1 pos-contact-sources-certificates'>
                                                            <span style={{ color: '#808080' }}>Highest Education Certificate</span>
                                                        </div>
                                                    </Col>
                                                    <Col md={8} xs={8}>
                                                        <div className='gbui-menu-bar-1 pos-contact-sources-certificates'>
                                                            Graduation
                                                            </div>
                                                    </Col>
                                                    <Col md={4} xs={4}>
                                                        <div className='gbui-menu-bar-1 pos-contact-sources-changes
                                                          pos-contact-sources-certificates'>
                                                            (View)
                                                            </div>
                                                    </Col>
                                                    <Col md={8} xs={8}>
                                                        <div className='gbui-menu-bar-1 pos-certificate '>
                                                            TRAINING CERTIFICATE
                                                            </div>
                                                    </Col>
                                                    <Col md={4} xs={4}>
                                                        <div className='gbui-menu-bar-1 pos-contact-sources-changes
                                                         pos-contact-sources-certificates'>
                                                            (View)
                                                            </div>
                                                    </Col>
                                                    <Col md={8} xs={9}>
                                                        <div className='gbui-menu-bar-1 pos-certificate'>
                                                            GROUPBIMA APPOINTMENT LETTER
                                                            </div>
                                                    </Col>
                                                    <Col md={4} xs={3}>
                                                        <div className='gbui-menu-bar-1 pos-contact-sources-changes 
                                                          pos-contact-sources-certificates'>
                                                            (View)
                                                            </div>
                                                    </Col>
                                                    <Col md={8} xs={9}>
                                                        <div className='gbui-menu-bar-1 pos-certificate'>
                                                            GROUPBIMA CONTRACT
                                                            </div>
                                                    </Col>
                                                    <Col md={4} xs={3}>
                                                        <div className='gbui-menu-bar-1 pos-contact-sources-changes 
                                                          pos-contact-sources-certificates'>
                                                            (View)
                                                            </div>
                                                    </Col>
                                                </Col>
                                                <Col md={6} xs={12} className='contact-information-column gst-column'>
                                                    <Col md={12} xs={12}>
                                                        <div className='gbui-menu-bar-1 pos-contact-information'>GST DETAILS</div>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <Divider className={classes.divider} />
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <div className='gbui-menu-bar-1 pos-contact-sources gst-number
                                                          pos-contact-sources-certificates'>
                                                            <span style={{ color: '#808080' }}> GST Number: </span>1QWE23456TFGHYT
                                                        </div>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <div className='gbui-menu-bar-1 pos-contact-sources
                                                         pos-contact-sources-certificates' style={{ color: '#ea0b4b' }}>
                                                            Upload GST Certificate
                                                        </div>
                                                    </Col>
                                                </Col>
                                            </Row>
                                        </CardContent>
                                    }
                                    {value === 1 &&
                                        <CardContent className={classes.cardContent}>
                                           <Row>
                                                <Col md={6} xs={12} className='contact-information-column-2'>
                                                    <Col md={12} xs={12}>
                                                        <div className='gbui-menu-bar-1 pos-contact-information'>Change Password</div>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <Divider className={classes.divider} />
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <Col md={8} xs={12} className='pos-contact-soure-column pos-contact-fields'>
                                                            <TextField classes={{root:classes.textField}}                                                     
                                                                id="standard-name"
                                                                // value={this.state.name}
                                                                // onChange={this.handleChange('name')}
                                                                margin="normal"
                                                                label="Current Password"
                                                                />
                                                        </Col>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <Col md={8} xs={12} className='pos-contact-soure-column pos-contact-fields'>
                                                            <TextField classes={{root:classes.textField}}                                                     
                                                                id="standard-name"
                                                                // value={this.state.name}
                                                                // onChange={this.handleChange('name')}
                                                                margin="normal"
                                                                label="New Password"
                                                                />
                                                        </Col>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <Col md={8} xs={12} className='pos-contact-soure-column pos-contact-fields'>
                                                            <TextField classes={{root:classes.textField}}                                                     
                                                                id="standard-name"
                                                                // value={this.state.name}
                                                                // onChange={this.handleChange('name')}
                                                                margin="normal"
                                                                label="Confirm new Password"
                                                                />
                                                        </Col>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <Col md={12} xs={12} className='pos-contact-soure-column pos-contact-fields mui--hidden-xs mui--hidden-sm'>
                                                            <Button  variant="contained" color="secondary" className={classes.saveButton}>
                                                                Save
                                                            </Button>
                                                        </Col>
                                                        <Col md={12} xs={12} className='pos-contact-soure-column pos-contact-fields mui--visible-xs-block 
                                                                 mui--visible-sm-block'>
                                                            <div style={{margin:'10px 0px'}}>
                                                               <ButtonLightSuccess Text='save' fullWarningPink={true} />
                                                            </div>
                                                        </Col>
                                                    </Col>    
                                                </Col>
                                                <Col md={6} xs={12} className='mui--hidden-xs mui--hidden-sm'>
                                                    <Col md={12} xs={12} >
                                                        <div className='gbui-menu-bar-1 pos-contact-information'>Section for some additional setting if there is any in future</div>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <Divider className={classes.divider} />
                                                    </Col>
                                                </Col>
                                           </Row>
                                        </CardContent>
                                    }
                                    {value === 2 &&
                                        <CardContent>
                                            <Row>
                                                <Col md={12} xs={11} sm={12}>
                                                    <div className='gbui-h5 we-value-your-friendship-heading'>
                                                        We value your friendship. At Exactly Rs. 1000.
                                                    </div>
                                                </Col>
                                                <Col md={6} xs={12} sm={6} className='outer-column'>
                                                    <Col md={12} xs={12}>
                                                        <div className='gbui-menu-bar-1 your-refrel-code-subheading'>
                                                            Your referral Code is “8928403040”
                                                        </div>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <div className='gbui-body-2 your-mobile-number-text'>
                                                            Your mobile number "8928403040" is your referral code so 
                                                        </div>
                                                        <div className='gbui-body-2 your-mobile-number-text'>
                                                            share your mobile number as a referral to the referee.
                                                        </div>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <div className='gbui-body-2 or-text'>
                                                          &#8213;&#8213;&nbsp;&nbsp;    OR    &nbsp;&nbsp;&#8213;&#8213;
                                                        </div>
                                                    </Col>
                                                    <Col xl={6} md={12} sm={12} xs={12}>
                                                        <Button fullWidth variant="outlined"  className={classes.button} size="large">
                                                            pos.groupbima.com/referral/8928403040
                                                            <ShareIcon className={classes.rightIcon} />
                                                        </Button>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <div className='gbui-body-2 share-via'>
                                                           Share it via: 
                                                           <img alt='google-plus' className='pos-icon' src='/assets/pos/google-plus.svg' />
                                                           <img alt='google-plus' className='pos-icon' src='/assets/pos/facebook.svg' />
                                                           <img alt='google-plus' className='pos-icon' src='/assets/pos/email.svg' />
                                                           <img alt='google-plus' className='pos-icon' src='/assets/pos/twitter.svg' />
                                                           <img alt='google-plus' className='pos-icon' src='/assets/pos/whatsapp.svg' />
                                                           <img alt='google-plus' className='pos-icon' src='/assets/pos/smartphone.svg' />
                                                        </div>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <div className='gbui-menu-bar-1 do-you-have-code'>
                                                           Do you have  referral code?
                                                        </div>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <FormControl className={classes.margin}>
                                                            <InputBase
                                                            id="bootstrap-input"
                                                            defaultValue="Referral Code"
                                                            classes={{
                                                                root: classes.bootstrapRoot,
                                                                input: classes.bootstrapInput,
                                                            }}
                                                            />
                                                        </FormControl>
                                                        <Button  variant="contained" color="secondary" className={classes.submitButton}>
                                                            Submit
                                                        </Button>
                                                    </Col>
                                                    <Col md={12} xs={12}>
                                                        <div className='gbui-menu-bar-1 refrel-terms-and-conditions'>
                                                           Referral Terms & Conditions
                                                        </div>
                                                    </Col>
                                                </Col>
                                                <Col md={6} className='mui--hidden-xs mui--hidden-sm'>
                                                </Col>
                                                <Col md={6} sm={6} className='mui--hidden-xs'>
                                                 <img alt='pos-refrel-pic' className='pos-referal-pic' src='/assets/pos/pos-referal.svg' />
                                                </Col>
                                                <Col md={12}>
                                                <Col md={12} xs={12} className='outer-column'>
                                                    <div className='gbui-caption-1 pos-referal-caption'>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor.
                                                        Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
                                                    </div>
                                                </Col>
                                                </Col>
                                            </Row>
                                        </CardContent>
                                    }
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}

PosProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PosProfile);

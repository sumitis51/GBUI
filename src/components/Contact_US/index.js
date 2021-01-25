import React from 'react';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import axios from 'axios';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from 'muicss/lib/react/container';
import LeftPanel from '../ConnectWithUs/LeftPanel/index'


import './index.css'

const styles = theme => ({
    label: {
        fontFamily: 'Source Sans Pro',
        fontSize: '12px',
        color: '#aaaaaa'
    },
    selectOption: {
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        color: '#000000'
    },
    formControl:{
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        backgroundColor:'#f4f4f4'
    }

})

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
class ContactUs extends React.Component {


    state = {
        language: 'English',
        phone: '',
        open: false,
        bottom: false,
        age:''
    };
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    componentDidMount() {
        const vm = this;
        this.props.onCurrentComponent('ContactUs.json');
        axios.get('/assets/json/ContactUs.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
               
            })
        window.onclick = function (event) {
            if (!event.target.matches('.dropbtn')) {

                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }
    }
    componentWillUnmount() {
        window.onClick = null;
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClick() {
        alert('hello');
    }

    handleDropDown() {
        console.log(document.getElementById("myDropdown").classList.toggle("show"));
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleChangeRoute=name=>event=>{
        if(name==="age"){
         this.props.history  && this.props.history.push(event.target.value);
        }
     }
    render() {
        const { classes } = this.props;
        return (
            <div className='contact-us'>
                <Container fluid={true} className='connect-container'>
                    <Row className='connect-row'>
                        <Col md={3} className='mui--hidden-xs mui--hidden-sm'>
                            <LeftPanel parentComponent='contactUs' />
                        </Col>
                        <Col md={9} sm={12} xs={12} className='connect-with-us-column'>
                            <div className='connect-dropdown mui--visible-xs-block mui--visible-sm-block'>
                                <Col xs={12} >
                                    <FormControl fullWidth className={classes.formControl}>
                                        <NativeSelect
                                            value={this.state.age}
                                            onChange={this.handleChangeRoute("age")}
                                            input={<Input disableUnderline name="age" id="age-native-label-placeholder" />}
                                        >
                                            <option value="">Connect with Us - Contact Us</option>
                                                <option value={"/connect-with-us"}> Contact Us</option>
                                             <option value={"/feedback"} > Share your Feedback</option>
                                            <option value={"/complaints-grievances"} href="">Complains & Grievances</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            // <div>
            //     <div className="contact_drp container-fluid">
            //         <div class="dropdown">
            //             <button onClick={this.handleDropDown.bind(this)} class="dropbtn">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsDropdownHeading : ''}<span className="chevron_down">&#8964;</span></button>
            //             <div id="myDropdown" class="dropdown-content">
            //                 <Link to="/contact-us" className="contact_a">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsDropdownLinkContactUs : ''}</Link>
            //                 <Link to="/feedback" className="contact_a">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsDropdownLinkFeedback : ''}</Link>
            //                 <Link to="/complaints-grievances" className="contact_a">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsDropdownLinkComplaints : ''}</Link>
            //             </div>
            //         </div>
            //     </div>
            //     <Row>
            //         <Col md="3" className="contact-hidden-sm" style={{ paddingTop: '5rem', paddingRight: '0px', }}>
            //             <div className="left_col_menu">
            //                 <h3 className="left_menu_heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsLeftPanelHeading : ''}</h3>
            //                 <div className="menu">
            //                     <p className="link link_active"><Link to="/contact-us" className="menu_link" >{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsLeftPanelLinkContactUs : ''}</Link></p>
            //                     <p className="link"><Link to="/feedback" className="menu_link" >{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsLeftPanelLinkShareYourFeedback : ''}</Link></p>
            //                     <p className="link"><Link to="/complaints-grievances" className="menu_link" >{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsLeftPanelLinkComplains : ''} &<br />{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsLeftPanelLinkGrievances : ''}</Link></p>
            //                 </div>
            //             </div>
            //         </Col>
            //         <Col md="9" sm="12" xs="12" className="righ_contact_col">
            //             <div className="right_contact_jumbo">
            //                 <h4 className="how_contact_heading">
            //                     {this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsMainHeadingHowWouldYouLikeToContactUs : ''}
            //                 </h4>
            //                 <p className="how_contact_text">
            //                     {this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsMainParagraph1 : ''}<br />{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsMainParagraph2 : ''}
            //                 </p>
            //             </div>
            //             <div className="contact_recommend_other_div">
            //                 <Row>
            //                     <Col md="6" className="contact_recommend_col">
            //                         <div className="contact_recommended_div">
            //                             <h3 className="contact_recommended_heading">
            //                                 {this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsSubheadingRecommended : ''}
            //                             </h3>
            //                             <h3 className="contact_call_back_heading">
            //                                 {this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsSubheadingGetACallback : ''}
            //                             </h3>
            //                             <p>
            //                                 <span className="contact_avg_time">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsAverageWaitTimeText : ''}</span>
            //                                 <span className="contact_time">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsMinutesText : ''}</span>
            //                             </p>
            //                             <form noValidate autoComplete="off" style={{ marginTop: '2rem' }}>
            //                                 <FormControl fullWidth margin="dense">
            //                                     <InputLabel htmlFor="language">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsInputLabelLanguage : ''}</InputLabel>
            //                                     <Select
            //                                         value={this.state.language}
            //                                         onChange={this.handleChange}
            //                                         inputProps={{
            //                                             name: 'language',
            //                                             id: 'language',
            //                                         }}
            //                                     >
            //                                         <MenuItem value="">
            //                                             <em>None</em>
            //                                         </MenuItem>
            //                                         <MenuItem value={'English'}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsDropdownOptionEnglish : ''}</MenuItem>
            //                                         <MenuItem value={'Hindi'}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsDropdownOptionHindi : ''}</MenuItem>
            //                                     </Select>
            //                                 </FormControl><br />
            //                                 <TextField
            //                                     id="phone"
            //                                     name="phone"
            //                                     label={this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsInputLabelPhoneNumber : ''}
            //                                     value={this.state.phone}
            //                                     onChange={this.handleChange}
            //                                     margin="dense"
            //                                     fullWidth
            //                                 /><br />
            //                             </form>
            //                             <div style={{ marginTop: '3rem' }}>
            //                                 <ButtonLightSuccess Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsButtonTextSubmit : ''} fullWidth="true" />
            //                             </div>
            //                             <br />
            //                         </div>
            //                     </Col>
            //                     <Col md="6" className="contact_other_col">
            //                         <h3 className="contact_recommended_heading">
            //                         {this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsSubheadingOther : ''}
            //                         </h3>
            //                         <h3 className="contact_call_back_heading">
            //                         {this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsSubheadingWantToContactUs : ''}
            //                         </h3>
            //                         <p className="contact_helpline"><a href="tel:1800 324 0987">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsSubheadingContactNumber : ''}</a><br />
            //                             <span className="helpline_text">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsSubheadingHelplineText : ''}</span>
            //                         </p>
            //                         <p className="contact_customer_email"><a href="mailto:hello@groupbima.com">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsSubheadingEmail1 : ''}</a><br />
            //                             <span className="customer_email_text">
            //                             {this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsSubheadingCustomerQueryClaimsText : ''} &amp; {this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsSubheadingPolicyServicingText : ''}
            //                             </span>
            //                         </p>
            //                         <p className="contact_customer_email"><a href="mailto:hello@groupbima.com">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsSubheadingEmail2 : ''}</a><br />
            //                             <span className="customer_email_text">
            //                             {this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsCorporateQueries : ''}
            //                             </span>
            //                         </p>
            //                         <p className="contact_direct_chat">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsWantToHaveDirectChat : ''}</p>
            //                         <div style={{ marginTop: '2rem' }} className="mui--visible-md-block mui--visible-lg-block mui--visible-xl-block">
            //                             <ButtonLightSuccess onClick={this.handleClickOpen} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsButtonTextMeetInPerson : ''} outlined="true" />
            //                         </div>
            //                         <div style={{ marginTop: '2rem' }} className="mui--visible-sm-block mui--visible-xs-block">
            //                             <ButtonLightSuccess onClick={this.toggleDrawer('bottom', true)} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.ContactUsButtonTextMeetInPerson : ''} outlined="true" />
            //                         </div>
            //                         <div style={{ marginTop: '1rem' }}>
            //                             <ButtonLightSuccess Text="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" fullwidth="true" outlined="true" />
            //                         </div>
            //                         <br /><br />
            //                     </Col>
            //                 </Row>
            //             </div>
            //         </Col>
            //     </Row>
            //     <Dialog
            //         open={this.state.open}
            //         TransitionComponent={Transition}
            //         keepMounted
            //         onClose={this.handleClose}
            //         aria-labelledby="alert-dialog-slide-title"
            //         aria-describedby="alert-dialog-slide-description"
            //     >
            //         <DialogTitle id="alert-dialog-slide-title">
            //             <h3 className="contact_dialog_heading">Hi, we’re glad to assist you through this journey!</h3>
            //             <p className="contact_dialog_text">Just enter your contact details below and our partner will get in touch with you shortly.</p>
            //         </DialogTitle>
            //         <DialogContent>
            //             <DialogContentText id="alert-dialog-slide-description">
            //                 <div className="contact_meeting_form_div">
            //                     <form noValidate autoComplete="off" style={{ margin: '0rem 4rem', alignSelf: 'center' }}>
            //                         <TextField
            //                             name="meeting_name"
            //                             label="What's your name?"
            //                             margin="dense"
            //                             fullWidth /><br />
            //                         <TextField
            //                             name="meeting_phone"
            //                             label="Tell us your mobile number"
            //                             margin="dense"
            //                             fullWidth /><br />
            //                         <TextField
            //                             name="meeting_location"
            //                             label="Which location you like to meet at"
            //                             margin="dense"
            //                             fullWidth />
            //                     </form>
            //                     <div style={{ marginTop: '1rem' }}>
            //                         <ButtonLightSuccess onClick={this.handleClose} Text="Fix Meeting" />
            //                     </div>
            //                 </div>
            //             </DialogContentText>
            //         </DialogContent>
            //         {/* <DialogActions>
            //             <Button onClick={this.handleClose} color="primary">
            //             Disagree
            //             </Button>
            //             <Button onClick={this.handleClose} color="primary">
            //             Agree
            //             </Button>
            //         </DialogActions> */}
            //     </Dialog>
            //     <SwipeableDrawer
            //         anchor="bottom"
            //         open={this.state.bottom}
            //         onClose={this.toggleDrawer('bottom', false)}
            //         onOpen={this.toggleDrawer('bottom', true)}
            //     >
            //         <div
            //             tabIndex={0}
            //             role="button"
            //             onClick={this.toggleDrawer('bottom', false)}
            //             onKeyDown={this.toggleDrawer('bottom', false)}
            //         >
            //             <DialogTitle id="alert-dialog-slide-title">
            //                 <h3 className="contact_dialog_heading">Hi, we’re glad to assist you through this journey!</h3>
            //                 <p className="contact_dialog_text">Just enter your contact details below and our partner will get in touch with you shortly.</p>
            //             </DialogTitle>
            //             <DialogContent>
            //                 <DialogContentText id="alert-dialog-slide-description">
            //                     <div className="contact_meeting_form_div">
            //                         <form noValidate autoComplete="off" style={{ margin: '0rem 4rem', alignSelf: 'center' }}>
            //                             <TextField
            //                                 name="meeting_name"
            //                                 label="What's your name?"
            //                                 margin="dense"
            //                                 fullWidth /><br />
            //                             <TextField
            //                                 name="meeting_phone"
            //                                 label="Tell us your mobile number"
            //                                 margin="dense"
            //                                 fullWidth /><br />
            //                             <TextField
            //                                 name="meeting_location"
            //                                 label="Which location you like to meet at"
            //                                 margin="dense"
            //                                 fullWidth />
            //                         </form>
            //                         <div style={{ marginTop: '1rem' }}>
            //                             <ButtonLightSuccess onClick={this.handleClose} Text="Fix Meeting" />
            //                         </div>
            //                     </div>
            //                 </DialogContentText>
            //             </DialogContent>
            //         </div>
            //     </SwipeableDrawer>
            // </div>
        )
    }
}

ContactUs.propTypes = {
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

export default  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ContactUs))
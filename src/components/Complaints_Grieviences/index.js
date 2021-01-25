import React, { Fragment } from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import axios from 'axios';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Drawer from '../Shared/Drawer/index';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rightcard from '../Help/feedbackRatings/index'
import Divider from '@material-ui/core/Divider';
import './index.css'
import LeftPanel from '../ConnectWithUs/LeftPanel/index'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

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
    formControl: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        backgroundColor: '#f4f4f4'
    }

})

class ContactUs extends React.Component {
    state = {
        age: '',
        show_levels: true,
        show_level_1: false,
        show_level_2: false,
        show_level_3: false,
        complaints: [
            {
                key: 'level-1',
                level_heading: 'Level 1: Submitting a complaint for the first time?',
                level_text: 'Let us help you with your issues, by raising a complaint through your registered email id.',
                level_btn_text: 'Raise a Complaint',
                link: '/level-1'
            },
            // {
            //     key: 'level-2',
            //     level_heading: 'Level 2: You are not satisfied with the first response',
            //     level_text: 'Not satisfied with the resolution of your complaint? Click here to raise a query/request to “level 2 escalation”. ',
            //     level_btn_text: 'Level 2 Escalation',
            //     link:'/level-2'
            // },
            // {
            //     key: 'level-3',
            //     level_heading: 'Level 3: You are not satisfied with the second response',
            //     level_text: 'Answers provided by “level 2 escalation” did not match your expectations? Click here to send a mail regarding your query to “level 3 escalation”.',
            //     level_btn_text: 'Level 3 Escalation',
            //     link:'/level-3'
            // },
        ],
        setPage: '/complaints-grievances'
    };
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    componentDidMount() {
        const vm = this;
        this.props.onCurrentComponent('ComplainsNGrievances.json');
        axios.get('/assets/json/ComplainsNGrievances.json')
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

    handleDropDown() {

    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleChangeRoute = name => event => {
        if (name === "age") {
            this.props.history && this.props.history.push(event.target.value);
        }
    }
    handleNavChange = (event) => {
        this.setState({
            setPage: event.target.value
        })
        this.props.history.push(event.target.value);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className='complaints-grieviences connect-with-us'>
                <Container fluid={true} className='connect-container'>
                    <Row className='connect-row'>
                        {this.props.location.state && this.props.location.state.account ?
                            <Col md={2} className='mui--hidden-xs mui--hidden-sm'>
                                <div className='mui--hidden-xs mui--hidden-sm'>
                                    <Drawer variant="permanent" authenticate={true} />
                                </div>
                            </Col> :
                            <Col md={3} className='mui--hidden-xs mui--hidden-sm'>
                                <LeftPanel parentComponent='complaints' />
                            </Col>}
                        <Col md={6} sm={12} xs={12} className='connect-with-us-column'>
                            <div className='connect-dropdown mui--visible-xs-block mui--visible-sm-block'>
                                <Col md={8} xs={12} >
                                    <div className='mobile_select_menu btm_margin' >
                                        <Select className="mobile_select"
                                            onChange={this.handleNavChange}
                                            value={this.state.setPage}
                                        >
                                            <MenuItem value="/connect-with-us">Contact Us</MenuItem>
                                            <MenuItem value="/feedback">Share your Feedback</MenuItem>
                                            <MenuItem value="/complaints-grievances">Complains &amp; Grievances</MenuItem>

                                        </Select>
                                    </div>

                                </Col>

                            </div>
                            {/* <div class="connect-with-us-container-image">
                                <img alt='connect-with-us' className='connect-with-us-image mui--hidden-xs mui--hidden-sm' src='/assets/complaints.jpg' />
                                <img alt='connect-with-us' className='connect-with-us-image mui--visible-xs-block' src='/assets/complaints_mobile.jpg' />
                                <div class="centered-text-complaints gbui-h5">We are thankful for customers who complain.As we still have the opportunity to make them happy.
                                </div>
                            </div> */}
                            <Col md={12}>
                                <div className='gbui-h5 mainHeding-1'>It seems that your issue has not been resolved yet</div>
                            </Col>
                            <Col md={12}>
                                <div className='gbui-h5 mainHeding-1 colored'>How to submit a complaint</div>
                            </Col>
                            {this.state.complaints.map(item => {
                                return (
                                    <Fragment key={item.level_heading}>
                                        <Col md={12}>
                                            <div className='gbui-h7 mainHeding-1 bold'>{item.level_heading}</div>
                                        </Col>
                                        <Col md={12}><Divider /></Col>
                                        <Col md={12}>
                                            <div className='gbui-button-1 mainHeding-1'>{item.level_text}</div>
                                        </Col>
                                        <Col md={6} xl={4}>
                                            <div className='level-btn' >
                                                <ButtonLightSuccess
                                                    contentPink={true}
                                                    Text={item.level_btn_text}
                                                    style={{ padding: '0px' }}
                                                    onClick={() => { window.open(`${item.link}`, '_blank') }}
                                                />
                                            </div>
                                        </Col>
                                    </Fragment>
                                )
                            })}

                        </Col>
                        {this.props.location.state && this.props.location.state.account &&
                            <Col md={4} lg={3} className='rightcard' style={{ marginLeft: '71px', marginTop: '4rem', width: '28%' }}>
                                <Rightcard />
                            </Col>}
                    </Row>
                </Container>
            </div>
            // <div className='complaints'>
            //  <Container fluid={true} className='connect-container'>
            //     {this.state.show_levels && <div>
            //         <div className="contact_drp container-fluid">
            //             <div class="dropdown mui--visible-xs-block">
            //                 <button onClick={this.handleDropDown.bind(this)} class="dropbtn">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsDropdownHeading : ''} <span className="chevron_down">&#8964;</span></button>
            //                 <div id="myDropdown" class="dropdown-content">
            //                     <Link to="/contact-us" className="contact_a">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsDropdownLinkContactUs : ''}</Link>
            //                     <Link to="/feedback" className="contact_a">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsDropdownLinkFeedback : ''}</Link>
            //                     <Link to="/complaints-grievances" className="contact_a">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsDropdownLinkComplaints : ''}</Link>
            //                 </div>
            //             </div>
            //         </div>
            //         <Row>
            //             <Col md="3" className='connect-row'>
            //                 <div className="left_col_menu">
            //                     <div className="left_menu_heading gbui-h6">{this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsLeftPanelHeading : ''}</div>
            //                     <div className="menu">
            //                         <p className="link"><Link to="/contact-us" className="menu_link" >{this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsLeftPanelLinkContactUs : ''}</Link></p>
            //                         <p className="link"><Link to="/feedback" className="menu_link" >{this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsLeftPanelLinkShareYourFeedback : ''}</Link></p>
            //                         <p className="link link_active"><Link to="/complaints-grievances" className="menu_link" >{this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsLeftPanelLinkComplains : ''} &<br />{this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsLeftPanelLinkGrievances : ''}</Link></p>
            //                     </div>
            //                 </div>
            //                 <LeftPanel parentComponent='complaints' />
            //             </Col>
            //             <Col md="9" sm="12" xs="12" className="righ_contact_col">
            //                 <div className="right_contact_jumbo">
            //                     <h4 className="how_contact_heading">
            //                         {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsMainHeadingHowWouldYouLikeToContactUs : ''}
            //                     </h4>
            //                     <p className="how_contact_text">
            //                         {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsMainHeadingQuote1 : ''}<br />
            //                         {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsMainHeadingQuote2 : ''}<br />
            //                         {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsMainHeadingQuoteWriterName : ''}
            //                     </p>
            //                 </div>
            //                 <div className="contact_recommend_other_div">
            //                     <h3 className="feedback_share">
            //                         {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubHeadingItSeemsThatYourIssue : ''}
            //                     </h3>
            //                     <h3 className="c_g_heading">
            //                         {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubheadingHowToSubmitComplaint : ''}
            //                     </h3>
            //                     <Row>
            //                         <Col md="9">
            //                             <h3
            //                                 className="l1_heading">
            //                                 {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubheadingLevel1SubmittingAComplaint : ''}
            //                             </h3>
            //                             <p className="l1_text">
            //                                 {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubheadingLevel1Paragraph1 : ''}<br className="mui--hidden-sm mui--hidden-xs" />
            //                                 {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubheadingLevel1Paragraph2 : ''}<br className="mui--hidden-sm mui--hidden-xs" />
            //                                 {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubheadingLevel1Paragraph3 : ''}
            //                                 <div style={{ paddingTop: '1rem' }}>
            //                                     <ButtonLightSuccess
            //                                         midWidth={true}
            //                                         Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintButtonLabel1Submit : ''}
            //                                         onClick={() => { window.open('/level-1', '_blank') }}
            //                                     />
            //                                 </div>
            //                             </p>
            //                         </Col>
            //                     </Row>
            //                     <Row>
            //                         <Col md="9">
            //                             <h3
            //                                 className="l1_heading">
            //                                 {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubheadingLevel2YouAreNotSatisfied : ''}
            //                             </h3>
            //                             <p className="l1_text">
            //                                 {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubheadingLevel2Paragraph1 : ''}<br className="mui--hidden-sm mui--hidden-xs" />
            //                                 {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubheadingLevel2Paragraph2 : ''}<br className="mui--hidden-sm mui--hidden-xs" />{this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubheadingLevel2Paragraph3 : ''}
            //                                 <br className="mui--hidden-sm mui--hidden-xs" /><br className="mui--hidden-sm mui--hidden-xs" />
            //                                 {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubheadingLevel2Paragraph4 : ''}
            //                                 <div style={{ paddingTop: '1rem' }}>
            //                                     <ButtonLightSuccess
            //                                         midWidth={true}
            //                                         Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintButtonLabel2Submit : ''}
            //                                         onClick={() => { window.open('/level-2', '_blank') }}
            //                                     />
            //                                 </div>
            //                             </p>
            //                         </Col>
            //                     </Row>
            //                     <Row>
            //                         <Col md="9">
            //                             <h3
            //                                 className="l1_heading">
            //                                 {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubheadingLevel3YouAreNotSatisfied : ''}
            //                             </h3>
            //                             <p className="l1_text">
            //                                 {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubheadingLevel3Paragraph1 : ''}<br className="mui--hidden-sm mui--hidden-xs" />
            //                                 {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubheadingLevel3Paragraph2 : ''}<br className="mui--hidden-sm mui--hidden-xs" />{this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubheadingLevel3Paragraph3 : ''}
            //                                 <br className="mui--hidden-sm mui--hidden-xs" /><br className="mui--hidden-sm mui--hidden-xs" />
            //                                 {this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintsSubheadingLevel3Paragraph4 : ''}
            //                                 <div style={{ paddingTop: '1rem' }}>
            //                                     <ButtonLightSuccess
            //                                         midWidth={true}
            //                                         Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.ComplaintButtonLabel3Submit : ''}
            //                                         onClick={() => { window.open('/level-3', '_blank') }}
            //                                     />
            //                                 </div>
            //                             </p>
            //                         </Col>
            //                     </Row>
            //                 </div>



            //             </Col>
            //         </Row>
            //     </div>
            //     }
            //     {/* Level 1 */}
            //     {this.state.show_level_1 &&
            //         <div className="contact_recommend_other_div">
            //             Level 1 here.....
            //         </div>
            //     }

            //     {/* Level 2 */}
            //     {this.state.show_level_2 &&
            //         <div className="contact_recommend_other_div">
            //             Level 2 here.....
            //         </div>
            //     }

            //     {/* Level_3 */}
            //     {this.state.show_level_3 &&
            //         <div className="contact_recommend_other_div">
            //             Level 3 here.....
            //         </div>
            //     }
            //     </Container>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ContactUs))
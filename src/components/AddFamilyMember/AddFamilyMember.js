import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Card from '@material-ui/core/Card';
import './AddFamilyMember.css';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import axios from 'axios';
import { connect } from 'react-redux';
import Drawer from '../Shared/Drawer/index';
import AddFamilyMemberPopup from './AddFamilyPopup/index';
import constants from '../../constants/appConstants.json'
import Rightcard from '../Help/feedbackRatings/index'
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';


import * as moment from 'moment';


const styles = {
    snack:{
        marginTop:'6rem'
    },
    card: {
        borderRadius: ' 6px',
        boxShadow: ' 0 2px 4px 0 rgba(0, 0, 0, 0.5)',
        backgroundColor: ' #ffffff',
        margin: '1rem 0rem 0rem 0rem',
        paddingBottom: '0rem'
    },
    Content: {
        paddingLeft: '0px',
        paddingRight: '0px',
    }
};

class AddFamily extends Component {
    state = {
        openSnack:false,
        memberData: [],
        relations: {},
        anchorEl: null,
        EditMemberDetailsPopup: false,
        EditMemberInfo: {},
        redirect: false,
    }
   
    handleDOBChanged = (date) =>{
        let b =  moment(date,"DD-MM-YYYY");
        let a =  moment();

        let years = a.diff(b,'year');
        b.add(years,'years')

        let months = a.diff(b,'months');
        b.add(months,'months')

        let days = a.diff(b,'days');
        b.add(days,'days')
        let  ageText = `${years} years,${months} months,${days} days`
            
        return ageText;
    }
    
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    componentWillMount() {
        let token = localStorage.getItem('token')
        let config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        axios.get(`${constants.apiRootURL}/secure/family`, config)
            .then(response => {
                this.setState({
                    memberData: response.data.familyMembers,
                    relations: response.data.relations
                })
               
            }).catch(error => {
              
                if (error.response.status === 400) {
                    this.setState({
                        openSnack:true
                    })
                }
                if (error.response.status === 401) {
                    localStorage.clear();
                    this.props.onAuthFail()
                    this.props.history.push('/login-customer')
                }
                if (error.response.status === 403) {
                    this.props.history.push('/500')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
        const vm = this;
        vm.props.onCurrentComponent('AddFamilyMember.json');
        axios.get('/assets/json/AddFamilyMember.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
              
                if (error.response.status === 400) {
                    this.setState({
                        openSnack:true
                    })
                }
                if (error.response.status === 401) {
                    localStorage.clear();
                    this.props.onAuthFail()
                    this.props.history.push('/login-customer')
                }
                if (error.response.status === 403) {
                    this.props.history.push('/500')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
    }

    handleClickAddFamily() {
        this.props.onAddFamilyMemberForm();
    }

    handleClickMenu = index => event => {
        const memInfo = this.state.memberData[index]
        this.setState({ anchorEl: event.currentTarget, index, EditMemberInfo: memInfo });
    };

    onClickGetQuotes = () => {
        if (this.state.redirect) {
            return <Redirect to='/input-form-health' />
        }
    }

    handleClickEditMember = () => {
        this.setState({ EditMemberDetailsPopup: true, anchorEl: null })
    }

    handleClickDeleteMember = (familyMemberId) => {
       
        let token = localStorage.getItem('token')
        let config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        axios.delete(`${constants.apiRootURL}/secure/delete-member/${familyMemberId}`, config)
            .then(response => {
              
            }).catch(error => {
                if (error.response.status === 400) {
                    this.setState({
                        openSnack:true
                    })
                }
                if (error.response.status === 401) {
                    localStorage.clear();
                    this.props.onAuthFail()
                    this.props.history.push('/login-customer')
                }
                if (error.response.status === 403) {
                    this.props.history.push('/500')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
        this.setState({ anchorEl: null });
        // window.location.reload();
    }
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <MuiThemeProvider>
                {this.state.memberData.length > 0 ?
                   <div className='addedFamily'>
                   <Container fluid={true}>
                       <Row>
                       <Snackbar
                             className={classes.snack}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                            }}
                            open={this.state.openSnack}
                            ContentProps={{
                            'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">Something Went Wrong!</span>}
                        />
                           <Col md={2} className='mui--hidden-xs'>
                               <div className='mui--hidden-xs mui--hidden-sm'><Drawer variant="permanent" authenticate={true} /></div>
                           </Col>
                           <Col md={10} className='rightpanel'>
                               <Col md={8} className='AddedFamilyDetailsContainer'>
                                   <div className="AddedFamilyDetails">
                                       <Row>
                                           <Col md={2}>
                                               <div className='YourFamilyText'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AddedFamilyMemberFamilyMember : ''}</div>
                                           </Col>
                                           <Col md={5}>
                                               {this.props.onAddFamilyMemberForm && <AddFamilyMemberPopup relations={this.state.relations}
                                                       FamilyMembersValues={(value) => this.setState({ FamilyMembers: value })}
                                                       onFamilyMemberAdded={(value) => { this.setState({ AddedFamilyMembers: value }) }} />}
                                               <div className='AddFamilyButtonRight mui--hidden-xs'>
                                                   <ButtonLightSuccess onClick={this.handleClickAddFamily.bind(this)} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.AddedFamilyMemberAddMembersButtonText : ''} midWarningPink={true}>
                                                   </ButtonLightSuccess>
                                               </div>
                                           </Col>
                                           <Col md={5}>
                                               <div className='AddFamilyButtonLeft mui--hidden-xs'>
                                                   {this.onClickGetQuotes()}
                                                   <ButtonLightSuccess onClick={this.setRedirect} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.AddedFamilyMemberGetQuotesButtonText : ''} midPinkContent={true}></ButtonLightSuccess>
                                               </div>
                                           </Col>
                                       </Row>
                                       <Row>
                                           {this.state.memberData.length > 0 ? this.state.memberData.map((member, index) =>
                                               <Col md={4} key={index}>
                                                   <Card className={classes.card} key={index}>
                                                       <CardContent key={index} className={classes.Content} style={{ paddingBottom: '0px' }}>
                                                           <Row>
                                                               <Col md={6} key={index}>
                                                                   <div className='CardHeadingText'>{member.relationship}</div>
                                                               </Col>
                                                               {member.familyMemberId &&
                                                                   <Col md={6} key={index}>
                                                                       <i aria-owns={anchorEl ? `simple-menu${index}` : undefined} onClick={this.handleClickMenu(index)} class="material-icons" style={{ float: 'right', marginRight: '1rem', cursor: 'pointer' }}>
                                                                           more_horiz
                                                               </i>

                                                                       <Menu
                                                                           id={`simple-menu${index}`}
                                                                           anchorEl={anchorEl}
                                                                           open={Boolean(anchorEl)}
                                                                           onClose={this.handleClose}
                                                                           key={index}
                                                                           dateOfBirth  >
                                                                           <MenuItem key={index} onClick={this.handleClickEditMember}>
                                                                               <i aria-owns={anchorEl ? `simple-menu${index}` : undefined} class="material-icons" style={{ float: 'right', marginRight: '1rem', cursor: 'pointer' }}>
                                                                                   edit
                                                                       </i>Edit</MenuItem>
                                                                           <MenuItem key={index} onClick={() => this.handleClickDeleteMember(member.familyMemberId)}>
                                                                               <i aria-owns={anchorEl ? `simple-menu${index}` : undefined} class="material-icons" style={{ float: 'right', marginRight: '1rem', cursor: 'pointer' }}>
                                                                                   delete
                                                                       </i>
                                                                               Delete
                                                                   </MenuItem>
                                                                       </Menu>
                                                                       {this.state.EditMemberDetailsPopup &&
                                                                           <AddFamilyMemberPopup 
                                                                              FamilyMembersValues={(value) => this.setState({ FamilyMembers: value })}
                                                                              key={index} open={true} onClose={(value) => this.setState({ EditMemberDetailsPopup: value })}
                                                                              relations={this.state.relations} MainHeading='Edit Family Member' familyMemberDetails={this.state.EditMemberInfo}
                                                                           />
                                                                       }
                                                                   </Col>}
                                                               <Col md={12}>
                                                                   <div className='UserName'>{member.name}</div>
                                                               </Col>
                                                               <Col md={12}>
                                                                   <div className='InsuranceCovered'>{member.status ? member.previousPolicy : null}</div>
                                                               </Col>
                                                               <Col md={12}>
                                                                   <div className='CardContent'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AddedFamilyMemberAddMembersDOB : ''}: {member.dateOfBirth}</div>
                                                               </Col>
                                                               <Col md={12}>
                                                                   <div className='CardContentAge'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AddedFamilyMemberAddMembersAge : ''}:
                                                                      {this.handleDOBChanged(member.dateOfBirth)}</div>
                                                               </Col>
                                                               <Col md={12}>
                                                                   <div className='CoveredWithContainer'>
                                                                       <div className='CoveredWith'>{member.status}</div>
                                                                   </div>
                                                               </Col>
                                                           </Row>
                                                       </CardContent>
                                                   </Card>
                                               </Col>
                                           )
                                               : null}
                                       <Col xs={12}>
                                       <Row>
                                           <Col xs={6}>
                                               <div className='AddFamilyButtonLeft mui--visible-xs-block'>
                                                   {this.onClickGetQuotes()}
                                                   <ButtonLightSuccess onClick={this.setRedirect} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.AddedFamilyMemberGetQuotesButtonText : ''} fullPinkContent={true}></ButtonLightSuccess>
                                               </div>
                                           </Col>
                                           <Col xs={6}>
                                               <div className='GetQuotesButton2'>
                                                   <div className='AddFamilyButtonRight mui--visible-xs-block'><ButtonLightSuccess onClick={this.handleClickAddFamily.bind(this)} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.AddedFamilyMemberAddMembersButtonText : ''} fullWarningPink={true}></ButtonLightSuccess></div>
                                               </div>
                                           </Col>
                                       </Row>
                                   </Col>
                                       </Row>
                                   </div>
                               </Col>
                               <Col md={4} className='rightcard' style={{marginTop:'4rem'}}>
                                   <Rightcard />
                               </Col>
                           </Col>
                       </Row>
                   </Container>
               </div>
                    :
                    <div className='addFamily'>
                        <Container fluid={true}>
                            <Row>
                                <Col md={2}>
                                    <div className='mui--hidden-xs mui--hidden-sm'><Drawer variant="permanent" authenticate={true} /></div>
                                </Col>
                                <Col md={10} className='rightpanel'>
                                    <Col md={8} xs={12} className='no-member'>
                                        {this.props.onAddFamilyMemberForm && <AddFamilyMemberPopup relations={this.state.relations}
                                            onFamilyMemberAdded={(value) => { this.setState({ AddedFamilyMembers: value }) }} />}
                                        <div className="AddFamilyDetails">
                                            <div className='YourFamily'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AddFamilyMemberFamilyMember : ''}</div>
                                            <img src="assets/addMember.svg" className='AddVehicleDetailsPic' alt='AddVehicleDetails' />
                                            <div className='NoFamily'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AddFamilyMemberNoFamilyMember : ''}</div>
                                            <div className='AddFamilyYet'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AddFamilyMemberAddFamilyMemberYet : ''}</div>
                                            <div className='AddFamilyButton'><ButtonLightSuccess midWarningPink={true} onClick={this.handleClickAddFamily.bind(this)} Text={this.props.FetchedLanguage ? 
                                                this.props.FetchedLanguage.AddFamilyMemberAddFamilyMemberButtonText : ''}></ButtonLightSuccess></div>
                                        </div>
                                    </Col>
                                    <Col md={4} className='rightcard' style={{marginTop:'3.4rem'}}>
                                        <Rightcard />
                                    </Col>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                }
            </MuiThemeProvider>
        )
    }
}

AddFamily.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    CurrentLanguage: state.language.current_language,
    FetchedLanguage: state.language.lang_data,
    AddFamilyMemberForm: state.AddFamilyMember.add_family_member_form_open,
});

const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
    onAddFamilyMemberForm: () => dispatch({ type: 'AddFamilyMemberForm_SHOW' }),
    onAuth: (email, password) => dispatch({ type: 'AUTH_START', email, password }),
    onAuthFail: () => dispatch({ type: 'AUTH_FAIL' }),
    onAuthSuccess: (data) => dispatch({ type: 'AUTH_SUCCESS', data })
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddFamily));
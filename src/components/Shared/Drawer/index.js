import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import PhoneIcon from '@material-ui/icons/Phone';
import Avatar from '@material-ui/core/Avatar'
import classNames from 'classnames'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import constants from '../../../constants/appConstants.json'



import './drawer.css'

const drawerWidth = 245


const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 100000,
        // position: 'relative'
    },
    drawerPaper: {
        width: drawerWidth,
        zIndex: 1,
        position: 'relative',
        zIndex: 1299
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
        margin: '3rem 5.5rem 1rem 5.5rem',
    },
    bigAvatar: {
        width: 61,
        height: 61,
    },
    listTextStyle: {
        padding: '0px 10px'
    },
    listTextStyle2: {
        padding: '0px 10px',
        display:'inline-block'
    },
    listTextPrimary: {
        fontFamily: 'Nunito',
        fontSize: '14px',
        color: '#000000'
    },
    divider:{
        backgroundColor:'#ffffff'
    },
    icon:{
        marginRight:0,
        color: '#ffffff'
    },
    whiteList:{
        fontFamily: 'Nunito',
        fontSize: '12px',
        color: '#ffffff'
    },
    blackList:{
        fontFamily: 'Nunito',
        fontSize: '14px',
        color: '#333333'
    }
});

const sideList = (classes) =>(
    <div>
      <List>
        {[{link:'tel:9707600600',text:'9707600600'}, {link:'mailto:connect@groupbima.com',text:'connect@groupbima.com'}].map((text, index) => (
           <a href={text.link}><ListItem button key={text} >
            <ListItemIcon className={classes.icon}>{index % 2 === 0 ? <PhoneIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text.text} disableTypography={true}  classes={{root:classes.whiteList}}/>
          </ListItem></a>
        ))}
      </List>
      <Divider />
    </div>
);

const sideList2 = (classes) => (
    <div>
      <List>
        {[
        // {link:'',text:'How we work'},
         {link:'/about',text:'About Us'}
         ,{link:'/careers',text:'Careers'},
        {link:'/feedback',text:'Feedback'},{link:'/login-customer',text:'Login to your account'}].map((text, index) => (
            <Link to={text.link}><ListItem button key={text} >
            <ListItemText disableTypography={true} primary={text.text} className={classes.blackList} />
          </ListItem></Link>
        ))}
      </List>
      <Divider />
    </div>
);
const sideList3 =(classes) => (
    <div>
      <List>
        {['Support'].map((text, index) => (
          <ListItem button key={text} >
            <ListItemText disableTypography={true} primary={text} className={classes.blackList} />
          </ListItem>
        ))}
      </List>
    </div>
);

class LeftBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { text: 'Dashboard', link: '/dashboard-customer' ,icon:'/assets/dashboard.svg'},
                { text: 'Your Family Member', link: '/add-family-member',icon:'/assets/shape.svg' },
                { text: 'Track Your Policy Status', link: '/track-your-policy',icon:'/assets/bar-chart.svg' },
                { text: 'Help', link: '/help',icon:'/assets/customer.svg' },
                { text: 'Feedback', link: '/customer-feedback',icon:'/assets/ic-thumb-up-24-px.svg' },
                {text:  'Complaints and Grievances', link:'/complaints-grievances',icon:'/assets/complaint.svg'},
                { text: 'My Account', link: '/my-account',icon:'/assets/profile.svg' }, 

                // {text:'Buy Policies',link: '#'},
                // {text:'My Policies',link: '#'},
                // {text:'Your Vehicles',link: '/added-vehicle-detail'},
            ],
            drawer: this.props.open,
        };
    }
    // generateRandomColor() {
    //     let r = Math.round((Math.random() * 255)); //red 0 to 255
    //     let g = Math.round((Math.random() * 255)); //green 0 to 255
    //     let b = Math.round((Math.random() * 255)); //blue 0 to 255
    //     return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    //   };

    logout = () => {
        const token = localStorage.getItem("token")
        const params = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }
        axios.post(`${constants.apiRootURL}/secure/logout`,{}, params)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        this.props.onLogOut()
        this.props.onAuthFail()
        this.props.onAuthSuccessUSER("")
    }
    render() {
        //onClick={this.logout}
        const { classes} = this.props;
        const imageName=localStorage.getItem('username')
        return (
            <div className="drawer-parent">
                <Drawer
                    className={classes.drawer}
                    variant={this.props.variant}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open={this.props.open}
                    onClose={() => { this.props.onBurgerMenuClick(false) }}
                >
                    {this.props.authenticate ? 
                    <div>
                       <div className={classes.toolbar} />
                        <div className="avtar-div-left-name" style={{backgroundColor:'#ea0b4b',borderRadius: '50%',height:'115px',width:'147px',marginLeft:'40px'}}>
                           <h1>{imageName ? imageName.charAt(0) : 'A'}</h1>                    
                        </div>
                        {/* <Avatar
                            alt="Adelle Charles"
                            src="/assets/gropbima-logo.svg"
                            className={classNames(classes.avatar,classes.bigAvatar)}
                        /> */}
                        <div className="avtar-div-left-bar" >
                            <p className="avtar-name-left-bar">
                            {localStorage.getItem('username')}
                            </p>
                            {/* <p className="avtar-name-sub-text-left-bar">
                                Family Member Registered: 0 
                            </p> */}
                            <Row>
                                <Col xs="6">
                                    <div className="total-policies-div-left-bar">
                                        {localStorage.getItem("totalPolicy")}<br />
                                        Total Policies
                                    </div>
                                </Col>
                                <Col xs="6">
                                    <div className="due-policies-div-left-bar">
                                    {localStorage.getItem("duePolicy")}    <br />
                                        Due Policies
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Divider />
                        <List>
                            {this.state.items.map((text, index) => (
                                <Link key={text.text} to={{ pathname: text.link, state:{account:true }}}>
                                    <ListItem key={text} style={{ paddingRight: '0px' }} >
                                        <img src={text.icon} style={{ marginRight: '0' }} alt='dahsborad-icon' />
                                        <ListItemText
                                            classes={{
                                                root: classes.listTextStyle,
                                                primary: classes.listTextPrimary
                                            }}>{text.text}
                                        </ListItemText>
                                    </ListItem>
                                </Link>                                
                            ))}
                            <ListItem  style={{ paddingRight: '0px' }} onClick={this.logout} className='mui--visible-xs-block'>
                                <img src='/assets/dashboard.svg' style={{ marginRight: '0' }} alt='dahsborad-icon' />
                                <ListItemText
                                    classes={{
                                        root: classes.listTextStyle2,
                                        primary: classes.listTextPrimary
                                    }}>Logout
                                </ListItemText>
                            </ListItem>
                        </List>
                   
                    </div>:
                    <div>
                        <Row className='welcome-row'>
                            <Col xs={9}>
                                <div className='welcome-heading  gbui-h5'>
                                        Welcome
                                </div>
                            </Col>
                            <Col xs={3}>
                              <div className='close-icon'>
                                 <i class="material-icons" style={{verticalAlign:'middle' ,color:'#ffffff'}}
                                          onClick={() => { this.props.onBurgerMenuClick(false) }}>close</i>
                              </div> 
                            </Col>
                            <Col xs={12}>
                               <div className='guest gbui-button-1'>Guest</div>
                            </Col>
                            <Col xs={12}>
                              <Divider  className={classes.divider}/>
                            </Col>
                            {/* <Col xs={12}>
                             {sideList(classes)}
                            </Col> */}
                       </Row>
                       <Row>
                            <Col xs={12}>
                             {sideList2(classes)}
                            </Col>
                            <Col xs={12}>
                              <Divider />
                            </Col>
                            <Col xs={12}>
                             {sideList3(classes)}
                            </Col>
                       </Row>
                 </div>}
                </Drawer>
            </div>
        )
    }
}

LeftBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => ({
    onBurgerMenuClick: (drawer) => dispatch({ type: 'Drawer_visible', drawer }),
    onAuthSuccessUSER: (username) => dispatch({ type: 'SET_USER', username }),
    onAuthFail: () => dispatch({ type: 'AUTH_FAIL' }),
    onLogOut: () => dispatch({ type: 'LOGOUT' })
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(LeftBar))
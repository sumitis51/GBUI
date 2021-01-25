import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Drawer from '../../components/Shared/Drawer/index';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';

// import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import axios from 'axios';
import constants from '../../constants/appConstants.json'
import './Header.css';


const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
      },
    overrides: {
        // Name of the component ⚛️ / style sheet
        MuiInputBase: {
            // Name of the rule
            root: {
                // Some CSS
                fontFamily: 'Nunito',
                fontSize: '14px',
                color: '#808080',
            },
        },
    },
});

// const BootstrapInput = withStyles(theme => ({
//     input: {
//         marginTop: theme.spacing.unit * 2,
//         fontSize: '1rem',
//         textAlign: 'left',
//         color: '#808080',
//         marginTop:'-2px',
//         backgroundColor:'#ffffff',
//         fontFamily: ["Nunito"].join(','),
//       '&:focus': {
//         backgroundColor:'#ffffff',
//       },
//     },
//   }))(InputBase);

const styles = theme => ({
    root: {
        display: 'flex',
    },
    tooltip: {
        zIndex: 1,
        position: 'fixed'
    },
    paper: {
        marginRight: theme.spacing.unit * 2,
    },
    buttonMore: {
        fontFamily: "Nunito",
        fontSize: '1rem',
        color: '#5e5971',
        textTransform: 'capitalize',
        '&:focus': {
            outline: 'none'
        },
        '&:hover': {
            backgroundColor: '#ffffff'
        }
    }
});


class Header extends Component {
    state = {
        open: false,
        search: '',
        searchArea: false,
    };

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };


    componentWillMount() {
        const vm = this;
        axios.get('/assets/json/Header.json')
            .then((response) => {
                vm.props.onMainHeaderLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
                console.log(error);
            })
        this.getProfileDetails()
    }
    getProfileDetails() {
        const token = localStorage.getItem("token")
        const params = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }
        const vm = this;

        axios.get(`${constants.apiRootURL}/secure/myaccount`, params)
            .then(response => {
                console.log(response)
                const status = response.status
                if (status === 200) {
                    this.props.onAuthSuccessUSER(response.data.name)
                    localStorage.setItem("username", response.data.name)
                }
            }).catch(error => {
                vm.props.onAuthFail()
                // console.log(error, 'From 500')
                // if (error.response) {
                //     const errCode = error.response.status
                //     if (errCode === 401) {

                //         vm.props.onAuthFail()
                //         localStorage.clear()
                //         vm.props.history.push('/login-customer')
                //     }
                //     else if (errCode === 500) {
                //         vm.props.history.push('/500')
                //     }
                // }
            })
    }

    handleOnClickSearch = () => {
        this.setState({
            searchArea: true
        })
    }
    handleOnClickClose = () => {
        this.setState({
            searchArea: false
        })
    }

    toggleDrawer() {
        this.props.onBurgerMenuClick(true);
    };

    handleChangeSearch = search => event => {
        this.setState({
            search: event.target.value,
        });
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.onCurrentLanguage(event.target.value);
        const vm = this;
        axios.get('/assets/json/Footer.json')
            .then((response) => {
                vm.props.onFooterLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
                console.log(error);
            })
        axios.get(`/assets/json/${this.props.CurrentComponent}`)
            .then((response) => {
                vm.props.onFetchLanguage(response.data[event.target.value]);
            }, (error) => {
                console.log(error);
            })
        axios.get('/assets/json/Header.json')
            .then((response) => {
                vm.props.onMainHeaderLanguage(response.data[event.target.value]);
            }, (error) => {
                console.log(error);
            })
    };

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
        const { classes } = this.props;
        const { open } = this.state;
        return (
           
                <div className="HeaderStyle">
                
                    <nav className="nav-header navbar-light">
                        <span className='menu-logo mui--visible-xs-block mui--visible-sm-block'>
                            <span className='menuIcon' onClick={this.toggleDrawer.bind(this)} ><i className="material-icons">menu</i></span>
                            <Link to="/" >
                                <img className='GBlogo' src="/assets/BM-Mobile-logo.svg" alt="GB Logo" />
                            </Link>
                            <Link to="/connect-with-us" className="nav-link">
                                {this.props.MainHeader_language ? this.props.MainHeader_language.HeaderLinkSupport : ''}
                            </Link>
                            {!this.props.isAuthenticated && 
                                <Link to="/login-customer" className="nav-link">
                                    <div className='circle-image'>
                                       <img src="assets/account-circle.svg" alt="account" />&nbsp;
                                    </div>
                                </Link>
                            }
                            {this.props.isAuthenticated && 
                                <Link to="/dashboard-customer" className="nav-link">
                                    <div className='circle-image'>
                                       <img src="assets/account-circle.svg" alt="account" />&nbsp;
                                    </div>
                                </Link>
                            }
                        </span>
                        <Link to="/" >
                            <img className='GBlogo mui--hidden-xs' src="/assets/POM-logo.svg" alt="GB Logo" />
                        </Link>
                        {this.state.searchArea &&
                            <div className='search-bar pull-xs-right'>
                                <FormControl fullWidth>
                                    <MuiThemeProvider theme={theme}>
                                        <Input
                                            id="adornment-search"
                                            variant="standard"
                                            value={this.state.search}
                                            placeholder='SEARCH'
                                            disableUnderline={true}
                                            onChange={this.handleChangeSearch('search')}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <i className="material-icons" style={{ color: '#808080', fontSize: '20px' }}>
                                                        search
                                                </i>
                                                </InputAdornment>
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <i onClick={this.handleOnClickClose} className="material-icons" style={{ cursor: 'pointer', color: '#808080', fontSize: '20px' }}>
                                                        close
                                                </i>
                                                </InputAdornment>
                                            }
                                        />
                                    </MuiThemeProvider>
                                </FormControl>
                            </div>}
                        {!this.state.searchArea &&
                            <div className="navbar pull-xs-right">
                                <div className="nav-item">
                                  {!this.props.isAuthenticated && <Link to="/login-customer" className="nav-link">
                                        <span className='socialIcon mui--hidden-xs mui--hidden-sm'>
                                            <img src={'/assets/social/account-circle.svg'} alt="account_circle" />
                                            &nbsp;
                                        </span>
                                        <span className='mui--hidden-xs mui--hidden-sm'>
                                            {this.props.MainHeader_language ? this.props.MainHeader_language.HeaderLinkLogin : ''}
                                        </span>
                                    </Link>}
                                    {this.props.isAuthenticated && <Link to="/dashboard-customer" className="nav-link">
                                        <img src="assets/account-circle.svg" alt="account" />&nbsp;
                                        <span className='mui--hidden-xs mui--hidden-sm'>
                                            {this.props.username}
                                        </span>
                                    </Link>
                                    }
                                    <Link to="/connect-with-us" className="nav-link">
                                        {this.props.MainHeader_language ? this.props.MainHeader_language.HeaderLinkSupport : ''}
                                    </Link>
                                    {/* <div className="nav-link mui--hidden-xs mui--hidden-sm">
                                        <i onClick={this.handleOnClickSearch} class="material-icons" style={{ color: 'block', fontSize: '20px', verticalAlign: 'middle' }}>
                                            search
                                        </i>
                                    </div> */}
                                      <div className="nav-link mui--hidden-xs mui--hidden-sm">
                                        <div className={classes.root}>
                                            <div>
                                                <Button className={classes.buttonMore}
                                                    buttonRef={node => {
                                                        this.anchorEl = node;
                                                    }}
                                                    aria-owns={open ? 'menu-list-grow' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={this.handleToggle}
                                                >
                                                    More
                                                  <i className="material-icons" style={{ verticalAlign: 'middle' }}>arrow_drop_down</i>
                                                </Button>
                                                <Popper open={this.state.open} anchorEl={this.anchorEl} transition className={classes.tooltip}
                                                >
                                                    {({ TransitionProps, placement }) => (
                                                        <Grow
                                                            {...TransitionProps}
                                                            id="menu-list-grow"
                                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                                        >
                                                            <Paper>
                                                                <ClickAwayListener onClickAway={this.handleClose}>
                                                                    <MenuList>
                                                                        {/* <MenuItem onClick={this.handleClose}>How we work</MenuItem> */}
                                                                        <Link to='/about'><MenuItem onClick={this.handleClose}>About Us</MenuItem></Link>
                                                                        <Link to='/careers'><MenuItem onClick={this.handleClose}>Careers</MenuItem></Link>
                                                                        <Link to='/feedback'><MenuItem onClick={this.handleClose}>Feedback</MenuItem></Link>
                                                                    </MenuList>
                                                                </ClickAwayListener>
                                                            </Paper>
                                                        </Grow>
                                                    )}
                                                </Popper>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {this.props.isAuthenticated && <span className="nav-link" style={{ cursor: 'pointer' }} onClick={this.logout}>
                                        Logout
                                        </span>
                                    }
                                </div>
                            </div>}
                    </nav>
                    {/* <div className="sub-header mui--hidden-xs mui--hidden-sm">
                        <div class="mui-panel mui--z3" style={{ background: '#9c0f46', marginBottom: '0px' }}>
                            <ul>
                                <li>Car</li>
                                <li>Bike</li>
                                <li>Health</li>
                            </ul>
                        </div>
                    </div> */}
                    <div className='mui-visible-xs-block mui-visible-sm-block'>
                    <Drawer variant="temporary" open={this.props.Drawer}  authenticate={this.props.isAuthenticated}
                        className="mui--visible-xs-block" /></div>
                </div>
           
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    return {
        CurrentLanguage: state.language.current_language,
        CurrentComponent: state.language.current_component,
        footer_language: state.language.footer_lang_data,
        MainHeader_language: state.language.mainHeader_lang_data,
        Drawer: state.drawer.drawer_visible,
        isAuthenticated: state.auth.token,
        username: state.auth.user
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onCurrentLanguage: (currentlanguage) => dispatch({ type: 'CurrentLanguage', currentlanguage }),
        onCurrentComponent: () => dispatch({ type: 'CurrentComponent' }),
        onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
        onFooterLanguage: (footerlanguage) => dispatch({ type: 'FOOTER_LANGUAGE', footerlanguage }),
        onMainHeaderLanguage: (mainHeaderlanguage) => dispatch({ type: 'MAIN_HEADER_LANGUAGE', mainHeaderlanguage }),
        onBurgerMenuClick: (drawer) => dispatch({ type: 'Drawer_visible', drawer }),
        onAuthSuccessUSER: (username) => dispatch({ type: 'SET_USER', username }),
        onAuthFail: () => dispatch({ type: 'AUTH_FAIL' }),
        onLogOut: () => dispatch({ type: 'LOGOUT' })
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Header));
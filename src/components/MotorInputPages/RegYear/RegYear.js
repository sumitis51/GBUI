import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Menu from '@material-ui/core/Menu';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Link } from 'react-router-dom';
import './RegYear.css';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';




const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
        margin: 30,
        fontSize: 16,
    },
    rootDesk: {
        minHeight: '491px',
        minWidth: '783px'
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    menu: {
        width: 300,
    },
    formControl: {
        margin: window.innerWidth >= 768 ? theme.spacing.unit * 3 : theme.spacing.unit,
    },

});


class RegYear extends React.Component {
    state = {
        anchorEl: null,
        dialogSearch: false
    };
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClickMenu = (value) => {
        // console.log('8888',this.props.mobilePopup)
        this.props.clicked();
        this.props.mobilePopup(1);
    }


    handleChange = name => value => {
        this.setState({
            [name]: value,
        });
    };

    handleClose() {
        this.setState({dialogSearch: false});
        console.log('closed')
        // const vm = this;
        // setTimeout(()=>{
        //     vm.setState({dialogSearch: false});
        // });
    }
    componentWillMount() {
        console.log('hello');
        if (window.innerWidth <= 767 && (this.props.popupForgotShow || this.props.show_bought_new_car))
            this.setState({dialogSearch: true})
    }
    componentWillUpdate(props, state) {
        console.log(props, state);
    }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;


        return (
            <div className={`YearContainer ${window.innerWidth >= 768 ? classes.rootDesk : ''}`}>
                <div className='carInfo mui--visible-xs-block'> CAR NAME MODEL PETROL+CNG</div>
                {(this.props.popupForgotShow || this.props.show_bought_new_car) ?
                    <div>
                        <div className='mainHeading mui--hidden-xs mui--hidden-sm'>Where is your car registered?</div>
                    </div> : null}
                {(this.props.popupForgotShow || this.props.show_bought_new_car) &&
                    <div className='mui--hidden-xs mui--hidden-sm'>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="component-simple">Where is your car registered?</InputLabel>
                            <Input
                                aria-owns={anchorEl ? 'simple-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <img src="assets/CarInsurance/search.svg" className='search' alt='search' />
                                    </InputAdornment>
                                }
                                id="component-simple" value='Search' onChange={this.handleChange} />
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                // onClose={this.handleClose}
                            >
                                <MenuItem className={classes.menu}
                                    onClick={this.props.clicked}>Type 1</MenuItem>
                                <MenuItem onClick={this.props.clicked}>Type  2</MenuItem>
                                <MenuItem onClick={this.props.clicked}>Type  3</MenuItem>
                                <MenuItem onClick={this.props.clicked}>Type  4</MenuItem>
                                {/* <MenuItem onClick={this.props.clicked}>Type  5</MenuItem>
                        <MenuItem onClick={this.props.clicked}>Type  6</MenuItem>
                        <MenuItem onClick={this.props.clicked}>Type  7</MenuItem>
                        <MenuItem onClick={this.props.clicked}>Type  8</MenuItem>
                        <MenuItem onClick={this.props.clicked}>Type  9</MenuItem>
                        <MenuItem onClick={this.props.clicked}>Type  10</MenuItem> */}

                            </Menu>
                        </FormControl>
                        {this.props.popupForgotShow ? <hr style={{ margin: '2rem -22px' }} /> : ''}
                    </div>
                }


                <div>
                    <div className='lowerDiv'>
                        {!this.props.show_bought_new_car && <div className='mainHeading'>Your car registration year?</div>}
                        {!this.props.show_bought_new_car &&
                            <FormControl className={classNames(classes.formControl, 'mui--hidden-xs', 'mui--hidden-sm')}>
                                <InputLabel htmlFor="component-simple">car registration year?</InputLabel>
                                <Input
                                    aria-owns={anchorEl ? 'simple-menu' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleClick}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <img src="assets/CarInsurance/search.svg"  className='search' alt='search' />
                                        </InputAdornment>
                                    }
                                    id="component-simple" value='Search' />
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    // onClose={this.handleClose}
                                >
                                    <MenuItem className={classes.menu}
                                        onClick={this.props.clicked}>Type 1</MenuItem>
                                    <MenuItem onClick={this.props.clicked}>Type  2</MenuItem>
                                    <MenuItem onClick={this.props.clicked}>Type  3</MenuItem>
                                    <MenuItem onClick={this.props.clicked}>Type  4</MenuItem>
                                    {/* <MenuItem onClick={this.props.clicked}>Type  5</MenuItem>
                        <MenuItem onClick={this.props.clicked}>Type  6</MenuItem>
                        <MenuItem onClick={this.props.clicked}>Type  7</MenuItem>
                        <MenuItem onClick={this.props.clicked}>Type  8</MenuItem>
                        <MenuItem onClick={this.props.clicked}>Type  9</MenuItem>
                        <MenuItem onClick={this.props.clicked}>Type  10</MenuItem> */}

                                </Menu>
                            </FormControl>
                        }
                    </div>
                </div>
                <div className={classNames(classes.row, 'mui--visible-xs-block')}>
                    <Link to="#">
                        <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                            <div className='year'>
                                Year
                            </div>
                        </div>
                    </Link>


                    <Link to="#">
                        <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                            <div className='year'>
                                Year
                            </div>
                        </div>
                    </Link>
                    <Link to="#">
                        <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                            <div className='year'>
                                Year
                            </div>
                        </div>
                    </Link>
                    <Link to="#">
                        <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                            <div className='year'>
                                Year
                            </div>
                        </div>
                    </Link>
                    <Link to="#">
                        <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                            <div className='year'>
                                Year
                            </div>
                        </div>
                    </Link>
                    <Link to="#">
                        <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                            <div className='year'>
                                Year
                            </div>
                        </div>
                    </Link>
                    <Link to="#">
                        <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                            <div className='year'>
                                Year
                            </div>
                        </div>
                    </Link>
                    <Link to="#">
                        <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                            <div className='year'>
                                Year
                            </div>
                        </div>
                    </Link>
                    <Link to="#">
                        <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                            <div className='year'>
                                Year
                            </div>
                        </div>
                    </Link>
                    <Link to="#">
                        <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                            <div className='year'>
                                Year
                            </div>
                        </div>
                    </Link>
                </div>
                
                    <Dialog
                        fullScreen={true}
                        maxWidth="lg"
                        open={this.state.dialogSearch}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <div className={classes.root}>
                            <div style={{ width: '100%', margin: '0px -5px' }}>
                                <FormControl style={{ width: '340px' }}>
                                    <InputLabel htmlFor="component-simple">Search your car?</InputLabel>
                                    <Input
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <img src="/assets/cancel.svg" onClick={this.handleClose.bind(this)} className='search' alt='cancel' />
                                            </InputAdornment>
                                        }
                                        id="component-simple" value={'Search'} />
                                </FormControl>
                            </div>
                            <List component="nav" style={{ width: '100%' }}>
                                <ListItem button onClick={this.props.clicked}>
                                    <ListItemText primary="Area 1" />
                                </ListItem>
                                <Divider />
                                <ListItem button divider>
                                    <ListItemText primary="Area 2" />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary="Area 3" />
                                </ListItem>
                                <Divider light />
                                <ListItem button>
                                    <ListItemText primary="Area 4" />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary="Area 5" />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary="Area 6" />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary="Area 7" />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary="Area 8" />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary="Area 9" />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary="Area 10" />
                                </ListItem>
                                <Divider />
                            </List>
                        </div>
                    </Dialog>
            </div>
        );
    }
}

RegYear.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    console.log(state);
    return {
        textShow: state.popup.popup_text,
        popupForgotShow: state.popup.popup_forgot_show,
        show_bought_new_car: state.popup.popup_bought_new_car
    };
};


const mapDispatchToProps = dispatch => {
    return {
        mobilePopup: (value) => dispatch({ type: 'POPUP_MOBILE_VALUE_INCREASE', value }),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(RegYear));

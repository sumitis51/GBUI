
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
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './CarModel.css'



const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
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
        margin: theme.spacing.unit,
    },
});


class IntegrationReactSelect extends React.Component {
    constructor(props) {
        super();
    }
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };


    handleChange = name => value => {
        this.setState({
            [name]: value,
        });
    };
    handleClose = () => {
        alert('handledd close!!!!');
    }
    handleClickMenu() {
        this.props.clicked();
        this.props.mobilePopup(1);
    }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;


        return (
            <div className={classNames(classes.root, 'modelSearch', window.innerWidth >= 768 ? classes.rootDesk : '')}>
                <div className='carFuelName mui--hidden-md mui--hidden-lg mui--hidden-xl'> CAR NAME PETROL + CNG
                    <img
                        src="/assets/arrow-back (1).svg"
                        alt="exit"
                        style={{ float: 'left', marginLeft: '-30px', cursor: 'pointer' }}
                        onClick={this.props.popupStepperHide} />
                </div>
                <div className='mainHeading'>Which Model do you drive?</div>
                {window.innerWidth > 767 &&
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="component-simple">Which model do you drive ?</InputLabel>
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
                            onClose={this.handleClose}
                        >
                            <MenuItem className={classes.menu}
                                onClick={this.handleClickMenu.bind(this)}>Type 1</MenuItem>
                            <MenuItem onClick={this.handleClickMenu.bind(this)}>Type  2</MenuItem>
                            <MenuItem onClick={this.handleClickMenu.bind(this)}>Type  3</MenuItem>
                            <MenuItem onClick={this.handleClickMenu.bind(this)}>Type  4</MenuItem>
                            {/* <MenuItem onClick={this.props.clicked}>Type  5</MenuItem>
                        <MenuItem onClick={this.props.clicked}>Type  6</MenuItem>
                        <MenuItem onClick={this.props.clicked}>Type  7</MenuItem>
                        <MenuItem onClick={this.props.clicked}>Type  8</MenuItem>
                        <MenuItem onClick={this.props.clicked}>Type  9</MenuItem>
                        <MenuItem onClick={this.props.clicked}>Type  10</MenuItem> */}

                        </Menu>
                    </FormControl>
                }

                {window.innerWidth < 768 &&
                    <div className={classNames(classes.row, 'mui--visible-xs-block')}>
                        <Link to="#">
                            <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                                <div className='year'>
                                    Car Model
                            </div>
                            </div>
                        </Link>


                        <Link to="#">
                            <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                                <div className='year'>
                                    Car Model
                            </div>
                            </div>
                        </Link>
                        <Link to="#">
                            <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                                <div className='year'>
                                    Car Model
                            </div>
                            </div>
                        </Link>
                        <Link to="#">
                            <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                                <div className='year'>
                                   Car Model
                            </div>
                            </div>
                        </Link>
                        <Link to="#">
                            <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                                <div className='year'>
                                    Car Model
                            </div>
                            </div>
                        </Link>
                        <Link to="#">
                            <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                                <div className='year'>
                                    Car Model
                            </div>
                            </div>
                        </Link>
                        <Link to="#">
                            <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                                <div className='year'>
                                    Car Model
                            </div>
                            </div>
                        </Link>
                        <Link to="#">
                            <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                                <div className='year'>
                                    Car Model
                            </div>
                            </div>
                        </Link>
                        <Link to="#">
                            <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                                <div className='year'>
                                    Car Model
                            </div>
                            </div>
                        </Link>
                        <Link to="#">
                            <div className='YearDiv' onClick={this.handleClickMenu.bind(this)}>
                                <div className='year'>
                                    Car Model
                            </div>
                            </div>
                        </Link>
                    </div>
                }
            </div>
        );
    }
}

IntegrationReactSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        mobilePopup: (value) => dispatch({ type: 'POPUP_MOBILE_VALUE_INCREASE', value }),
        popupStepperHide: () => dispatch({ type: 'POPUP_STEPPER_HIDE' })
    };
};

export default connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(IntegrationReactSelect));

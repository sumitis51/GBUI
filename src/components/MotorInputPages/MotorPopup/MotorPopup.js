import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import './MotorPopus.css';
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import CarSearch from '../CarSearch/CarSearch';
import { connect } from 'react-redux';


const styles = theme => ({
    row: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    avatar: {
        border: ' solid 1px #979797',
    },
    bigAvatar: {
        width: 54,
        height: 54,
        display: 'inline-block',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    rootDesk: {
        minWidth: '783px',
        minHeight: '491px'
    }
});

class SimpleDialog extends Component {
    state = {
        show: false,
        search: 'Search',
    }
    handleChange = event => {
        this.setState({ search: event.target.value });
    };

    showCarHandler = () => {
        this.setState({
            show: true,
        });
        this.props.mobPopupSearchShow();
    };

    render() {
        const { classes} = this.props;
        return (
            <div className={window.innerWidth >= 768? classes.rootDesk: ''}> {!this.state.show &&
                <div>
                    <div className='carDetails mui--hidden-md mui--hidden-lg mui--hidden-xl'>
                        <img
                            src="/assets/arrow-back (1).svg"
                            alt="exit"
                            style={{float:'left', marginLeft: '-30px', cursor: 'pointer'}}
                            onClick={this.props.popupStepperHide} />
                        Please give us your car details
                    </div>
                    <div className='mainHeading'>Which car you are driving?</div>
                    <div className='topCar mui--hidden-xs' OnClick={this.showDiv}>Top Cars</div>
                
            

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="component-simple">Search your car?</InputLabel>
                    <Input
                        endAdornment={
                            <InputAdornment position="end">
                                <img src="assets/CarInsurance/search.svg" className='search' alt='search' />
                            </InputAdornment>
                        }
                        id="component-simple" value={this.state.search}
                        onClick={window.innerWidth <= 768 ? this.showCarHandler : null} />
                </FormControl>
                </div>}

                {/* <img src="assets/CarInsurance/search.svg" className='search' alt='search' /> */}
                <div className={classNames(classes.row, 'mui--hidden-xs')}>
                    <Link className='link' to="#" onClick={this.props.clicked}>
                        <div className='carContainer' >
                            <Avatar
                                alt="Adelle Charles"
                                src="assets/CarInsurance/carInsurance.svg"
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                            <div className='carName'>Car Name</div>
                        </div>
                    </Link>
                    <Link className='link' to="#" onClick={this.props.clicked}>
                        <div className='carContainer'>

                            <Avatar
                                alt="Adelle Charles"
                                src="assets/CarInsurance/carInsurance.svg"
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                            <div className='carName'>Car Name</div>
                        </div>
                    </Link>
                    <Link className='link' to="#" onClick={this.props.clicked}>
                        <div className='carContainer'>

                            <Avatar
                                alt="Adelle Charles"
                                src="assets/CarInsurance/carInsurance.svg"
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                            <div className='carName'>Car Name</div>
                        </div>
                    </Link>
                    <Link className='link' to="#" onClick={this.props.clicked}>
                        <div className='carContainer'>

                            <Avatar
                                alt="Adelle Charles"
                                src="assets/CarInsurance/carInsurance.svg"
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                            <div className='carName'>Car Name</div>
                        </div>
                    </Link>
                    <Link className='link' to="#" onClick={this.props.clicked}>
                        <div className='carContainer'>

                            <Avatar
                                alt="Adelle Charles"
                                src="assets/CarInsurance/carInsurance.svg"
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                            <div className='carName'>Car Name</div>
                        </div>
                    </Link>
                    <Link className='link' to="#" onClick={this.props.clicked}>
                        <div className='carContainer'>

                            <Avatar
                                alt="Adelle Charles"
                                src="assets/CarInsurance/carInsurance.svg"
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                            <div className='carName'>Car Name</div>
                        </div>
                    </Link>
                    <Link className='link' to="#" onClick={this.props.clicked}>
                        <div className='carContainer'>

                            <Avatar
                                alt="Adelle Charles"
                                src="assets/CarInsurance/carInsurance.svg"
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                            <div className='carName'>Car Name</div>
                        </div>
                    </Link>
                    <Link className='link' to="#" onClick={this.props.clicked}>
                        <div className='carContainer'>

                            <Avatar
                                alt="Adelle Charles"
                                src="assets/CarInsurance/carInsurance.svg"
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                            <div className='carName'>Car Name</div>
                        </div>
                    </Link>
                    <Link className='link' to="#" onClick={this.props.clicked}>
                        <div className='carContainer'>

                            <Avatar
                                alt="Adelle Charles"
                                src="assets/CarInsurance/carInsurance.svg"
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                            <div className='carName'>Car Name</div>
                        </div>
                    </Link>
                    <Link className='link' to="#" onClick={this.props.clicked}>
                        <div className='carContainer'>

                            <Avatar
                                alt="Adelle Charles"
                                src="assets/CarInsurance/carInsurance.svg"
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                            <div className='carName'>Car Name</div>
                        </div>
                    </Link>
                    <Link className='link' to="#" onClick={this.props.clicked}>
                        <div className='carContainer'>

                            <Avatar
                                alt="Adelle Charles"
                                src="assets/CarInsurance/carInsurance.svg"
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                            <div className='carName'>Car Name</div>
                        </div>
                    </Link>
                    <Link className='link' to="#" onClick={this.props.clicked}>
                        <div className='carContainer'>

                            <Avatar
                                alt="Adelle Charles"
                                src="assets/CarInsurance/carInsurance.svg"
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                            <div className='carName'>Car Name</div>
                        </div>
                    </Link>
                </div>

                <div className={classNames(classes.row, 'mui--hidden-xs')}>
                    <ButtonLightSuccess Text="Show all Cars" content={true} />
                </div>
                <div className={classNames('mui--visible-xs-block')} style={{margin: '0px -47px'}} >
                    {this.state.show &&
                        <CarSearch show={this.state.show} clicked={this.props.clicked} />
                    }
                </div>

                {!this.state.show &&
                    <div className={classNames('mui--visible-xs-block')}>
                        <Row>
                            <Col xs={4}>
                                <div className='carContainer' onClick={this.props.clicked} >
                                    <Avatar
                                        alt="Adelle Charles"
                                        src="assets/CarInsurance/carInsurance.svg"
                                        className={classNames(classes.avatar, classes.bigAvatar)}
                                    />
                                    <div className='carName'>Car Name</div>
                                </div>

                            </Col>
                            <Col xs={4}>
                                <div className='carContainer' onClick={this.props.clicked}>
                                    <Avatar
                                        alt="Adelle Charles"
                                        src="assets/CarInsurance/carInsurance.svg"
                                        className={classNames(classes.avatar, classes.bigAvatar)}
                                    />
                                    <div className='carName'>Car Name</div>
                                </div>

                            </Col>
                            <Col xs={4}>
                                <div className='carContainer' onClick={this.props.clicked}>
                                    <Avatar
                                        alt="Adelle Charles"
                                        src="assets/CarInsurance/carInsurance.svg"
                                        className={classNames(classes.avatar, classes.bigAvatar)}
                                    />
                                    <div className='carName'>Car Name</div>
                                </div>

                            </Col>
                            <Col xs={4}>
                                <div className='carContainer' onClick={this.props.clicked}>
                                    <Avatar
                                        alt="Adelle Charles"
                                        src="assets/CarInsurance/carInsurance.svg"
                                        className={classNames(classes.avatar, classes.bigAvatar)}
                                    />
                                    <div className='carName'>Car Name</div>
                                </div>

                            </Col>
                            <Col xs={4}>
                                <div className='carContainer' onClick={this.props.clicked}>
                                    <Avatar
                                        alt="Adelle Charles"
                                        src="assets/CarInsurance/carInsurance.svg"
                                        className={classNames(classes.avatar, classes.bigAvatar)}
                                    />
                                    <div className='carName'>Car Name</div>
                                </div>

                            </Col>
                            <Col xs={4}>
                                <div className='carContainer' onClick={this.props.clicked}>
                                    <Avatar
                                        alt="Adelle Charles"
                                        src="assets/CarInsurance/carInsurance.svg"
                                        className={classNames(classes.avatar, classes.bigAvatar)}
                                    />
                                    <div className='carName'>Car Name</div>
                                </div>

                            </Col>
                            <Col xs={4}>
                                <div className='carContainer' onClick={this.props.clicked}>
                                    <Avatar
                                        alt="Adelle Charles"
                                        src="assets/CarInsurance/carInsurance.svg"
                                        className={classNames(classes.avatar, classes.bigAvatar)}
                                    />
                                    <div className='carName'>Car Name</div>
                                </div>

                            </Col>
                            <Col xs={4}>
                                <div className='carContainer' onClick={this.props.clicked}>
                                    <Avatar
                                        alt="Adelle Charles"
                                        src="assets/CarInsurance/carInsurance.svg"
                                        className={classNames(classes.avatar, classes.bigAvatar)}
                                    />
                                    <div className='carName'>Car Name</div>
                                </div>

                            </Col>
                            <Col xs={4}>
                                <div className='carContainer' onClick={this.props.clicked}>
                                    <Avatar
                                        alt="Adelle Charles"
                                        src="assets/CarInsurance/carInsurance.svg"
                                        className={classNames(classes.avatar, classes.bigAvatar)}
                                    />
                                    <div className='carName'>Car Name</div>
                                </div>

                            </Col>
                            <Col xs={4}>
                                <div className='carContainer' onClick={this.props.clicked}>
                                    <Avatar
                                        alt="Adelle Charles"
                                        src="assets/CarInsurance/carInsurance.svg"
                                        className={classNames(classes.avatar, classes.bigAvatar)}
                                    />
                                    <div className='carName'>Car Name</div>
                                </div>

                            </Col>
                            <Col xs={4}>
                                <div className='carContainer' onClick={this.props.clicked}>
                                    <Avatar
                                        alt="Adelle Charles"
                                        src="assets/CarInsurance/carInsurance.svg"
                                        className={classNames(classes.avatar, classes.bigAvatar)}
                                    />
                                    <div className='carName'>Car Name</div>
                                </div>

                            </Col>
                            <Col xs={4}>
                                <div className='carContainer' onClick={this.props.clicked}>
                                    <Avatar
                                        alt="Adelle Charles"
                                        src="assets/CarInsurance/carInsurance.svg"
                                        className={classNames(classes.avatar, classes.bigAvatar)}
                                    />
                                    <div className='carName'>Car Name</div>
                                </div>

                            </Col>
                        </Row>
                        <div div className={classNames(classes.row, 'mui--visible-xs-block')}>
                            <ButtonLightSuccess Text="Show all Cars"  content={true} />
                        </div>
                    </div>
                }
            </div>

        )
    }

}





// mobPopupSearchShow:() => dispatch({type: 'POPUP_MOB_SEARCH_CAR_HIDE'})

SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
    return {
        mobPopupSearchShow:() => dispatch({type: 'POPUP_MOB_SEARCH_CAR_HIDE'}),
        popupStepperHide:() => dispatch({type: 'POPUP_STEPPER_HIDE'})
    };
  };
  
export default connect(null, mapDispatchToProps)(withStyles(styles)(SimpleDialog));






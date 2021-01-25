import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Policydialog from '../CarPolicyPopup/PolicyDialog';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import MotorPopup from '../MotorInputPages/MotorPopup/MotorPopup';
import CarFuel from '../MotorInputPages/CarFuel/CarFuel';
import CarModel from '../MotorInputPages/CarModel/CarModel';
import RegYear from '../MotorInputPages/RegYear/RegYear';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import './stepper.css';
import { MuiThemeProvider} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    padding: 0,
    fontFamily: 'Nunito',
    fontSize: '12px'
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    fontSize: '12px',
    color: '#808080',
    fontFamily: 'Nunito',
    marginTop: 10,
  },
  step: {
    padding: 10,
  },
  tab: {
    fontSize: '12px',
    textTransform: 'capitalize',
    minWidth: '33%',
    color: '#000000',
    borderBottom: 'solid 1px #808080',
    minHeight: 40,
  },
  tabsIndicator: {
    backgroundColor: '#0da176',
  },

  AppBar: {
    backgroundColor: '#ffffff',
    boxShadow: 'none',
  },
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};



class linearStepper extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
    this.props.mobPopupTabShow();
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };
  tabBack = (value) => {
    this.setState({ value: value, activeStep: 0 });
    this.props.onPopupValueDecrease(value);
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <MotorPopup clicked={this.handleNext} />;
      case 1:
        return <CarFuel clicked={this.handleNext} />;
      case 2:
        return <CarModel clicked={this.handleNext} />;
      case 3:
        return <RegYear clicked={this.handleNext} />;
      default:
        return <MotorPopup clicked={this.handleNext} />;
    }
  }

  handleStep = (label) => {
    this.setState({
      activeStep: 0,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeStep === this.props.getSteps.length) {
      // here dispatch hide
      this.props.onHidePopUp();
      this.props.onShowpolicyPopUp();
    }
  }

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;
    const steps = this.props.getSteps;
    const { activeStep } = this.state;

    return (
      <div className={classNames(classes.root, "stepper")}>
        {(this.props.activeStep === 4 || this.state.activeStep !== 4) &&
          <div>
            {window.innerWidth <= 767 &&
              <div className={classNames('stepBar', 'mui--visible-xs-block')}>
                <AppBar className={classes.AppBar}>
                  {(this.props.show_tabs_mob !== undefined ? this.props.show_tabs_mob : true) && 
                  <Tabs value={this.props.mobilePopupShow} classes={{ root: classes.tab, indicator: classes.tabsIndicator }} onChange={this.handleChange}>
                    <Tab label="Your Car" className={classes.tab} style={{ color: '#000000' }} onClick={() => { this.tabBack(0); }} />
                    <Tab label="Registration" className={classes.tab} style={{ color: '#000000' }} onClick={() => { this.tabBack(1) }} />
                    <Tab label="Policy" className={classes.tab} style={{ color: '#000000' }} onClick={() => { this.tabBack(2) }} />
                  </Tabs>}
                </AppBar>
                {value === 0 && <TabContainer>
                  <Typography className={classes.instructions}>{this.getStepContent(activeStep)}</Typography>
                </TabContainer>}
                {value === 1 && <TabContainer>
                  <RegYear mobilePopup={this.state.value} />
                </TabContainer>}
                {value === 2 && <TabContainer>
                  <Policydialog />
                </TabContainer>}
              </div>
            }
            <Stepper activeStep={activeStep} className={classNames(classes.root, 'mui--hidden-xs')}>
              {steps.map((label) => {
                const labelProps = {};
                return (
                  <MuiThemeProvider theme={theme}>
                    <StepLabel onClick={this.handleStep} {...labelProps}
                      className={classNames(classes.step, 'mui--hidden-xs')}>
                      <Typography>{label}</Typography>
                    </StepLabel>
                  </MuiThemeProvider>
                );
              })}
            </Stepper>
            <div >
              <Typography className={classNames(classes.instructions, 'mui--hidden-xs')}>
                {window.innerWidth > 767 ? this.getStepContent(activeStep) : ''}
              </Typography>
            </div>
          </div>
        }
      </div>
    );
  }
}

linearStepper.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    mobilePopupShow: state.popup.popup_mobile_value_1,
    policy: state.popup.popup_policy_show,
    show_tabs_mob: state.popup.popup_mob_search,
    show_bought_new_car: state.popup.popup_bought_new_car,
    commercial_vehicle: state.popup.popup_commercial_vehicle
  };
};


const mapDispatchToProps = dispatch => {
  return {
    onHidePopUp: () => dispatch({ type: 'POPUP_STEPPER_HIDE' }),
    onShowpolicyPopUp: () => dispatch({ type: 'POPUP_POLICY_SHOW' }),
    onPopupValueDecrease: (value) => dispatch({ type: 'POPUP_MOBILE_VALUE_DECREASE', value }),
    mobPopupTabShow: () => dispatch({ type: 'POPUP_MOB_SEARCH_CAR_SHOW' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(linearStepper));

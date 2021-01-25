
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';
import green from '@material-ui/core/colors/green';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import './carfuel.css'
import { connect } from 'react-redux';




const options = [
    'Petrol',
    'Diesel',
    'Petrol + CNG/LPG company fitted',
    'Petrol + CNG/LPG external fitted',
];

const styles = theme => ({
    input: {
        display: 'flex',
        padding: 0,
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    card: {
        minWidth: '270px',
        minHeight: '48px',
        borderRadius: '2px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.14)',
        backgroundColor: '#ffffff',
        margin: '1.8rem 0rem 0rem 0rem',
    },
    typography: {
        fontSize: '14px',
        color: '#000000',
    },
    title: {
        backgroundColor: '#f4f4f4',
    },
    content: {
        textAlign: 'center',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.14)',
        backgroundColor: '#ffffff',
    },
    label: {
        fontSize: '14px',
        fontFamily: 'Nunito',
        color: '#000000',
    },
    root: {
        maxWidth: 360,
        color: '#000000',
        '&$checked': {
            color: green[500],
        },
    },
    checked: {},
    paper: {
        width: '80%',
        maxHeight: 435,
    },
    rootDesk: {
        minHeight: '491px',
        minWidth: '783px'
    }
});


class ConfirmationDialogRaw extends React.Component {
    constructor(props) {
        super();
        this.state = {
            value: props.value,
            showKit: false,
            cardValue: 'default',
        };
    }

    // TODO
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
    }

    handleEntering = () => {
        this.radioGroupRef.focus();
    };

    handleCancel = () => {
        this.props.onClose(this.props.value);
    };

    handleOk = () => {
        this.props.onClose(this.state.value);
    };


    handleChange = (event) => {
        if (event.target.value === 'Petrol + CNG/LPG external fitted' || event.target.value === 'Petrol + CNG/LPG company fitted') {
            this.setState({ showKit: true });
        } else {
            this.setState({ showKit: false });
        }
        this.setState({ value: event.target.value });
    };
    handleCardClick(value) {
        this.setState({
            cardValue: value,
        })
    }

    render() {
        const { classes } = this.props;


        return (
            <div className={`fuelContainer ${window.innerWidth >= 768 ? classes.rootDesk : ''}`}>
                <div className='carName mui--hidden-md mui--hidden-lg mui--hidden-xl'> CAR NAME
                    <img
                        src="/assets/arrow-back (1).svg"
                        alt="exit"
                        style={{ float: 'left', marginLeft: '-30px', cursor: 'pointer' }}
                        onClick={this.props.popupStepperHide} />
                </div>
                <div className='mainHeading' style={{ padding: '0.1rem' }}>Your car fuel type?</div>
                <div className='mui--hidden-xs' style={{ textAlign: 'center', display: 'inline-block' }}>
                    <RadioGroup
                        ref={ref => {
                            this.radioGroupRef = ref;
                        }}
                        aria-label="Ringtone"
                        className='radioContainer'
                        name="ringtone"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {options.map((option, index) => (
                            <FormControlLabel
                                value={option} key={option}
                                control={<Radio classes={{
                                    root: classes.root,
                                    checked: classes.checked,
                                }} />}
                                label={option}
                            />
                        ))}

                    </RadioGroup>
                    {this.state.showKit &&
                        <div className='kitValue' style={{ marginBottom: '0.5rem' }}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="component-simple">kitValue</InputLabel>
                                <Input
                                    aria-haspopup="true"
                                    onClick={this.handleClick}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <img src="assets/CarInsurance/help.svg" className='help' alt='help' />
                                        </InputAdornment>
                                    }
                                    value='RS 1234' />
                            </FormControl>
                            <div className='value'>Enter the value between Rs. 0 to Rs. 50,000</div>
                        </div>
                    }
                    <div className='buttonContainer'>
                        <ButtonLightSuccess Text="Continue" midWidth={true} onClick={this.props.clicked} />
                    </div>

                </div>
                <div className='mui--visible-xs-block'>


                    <Card className={classes.card} onClick={this.props.clicked}>
                        <CardActionArea>
                            <CardContent>
                                <Typography className={classes.typography}>
                                    Petrol
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card className={classes.card} onClick={this.props.clicked}>
                        <CardContent>
                            <Typography className={classes.typography}>
                                Diesel
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className={classes.card} onClick={this.handleCardClick.bind(this, 'Petrol + CNG/LPG company fitted')}>
                        <CardContent>
                            <Typography className={classes.typography}>
                                Petrol + CNG/LPG company fitted
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className={classes.card} onClick={this.handleCardClick.bind(this, 'Petrol + CNG/LPG external fitted')}>
                        <CardContent>
                            <Typography className={classes.typography}>
                                Petrol + CNG/LPG external fitted
                            </Typography>
                        </CardContent>
                    </Card>
                    {this.state.cardValue === 'Petrol + CNG/LPG company fitted' ||
                        this.state.cardValue === 'Petrol + CNG/LPG external fitted' ?
                        <Dialog fullWidth='sm' open={this.state.cardValue}>
                            <DialogTitle className={classes.title} >
                                <div style={{ fontFamily: 'Nunito', fontSize: '14px', color: '#000000' }}>
                                    CNG/LPG Fitted after purchase
                                    <img
                                        src="/assets/cancel.svg"
                                        alt="cancel"
                                        style={{ float: 'right', verticalAlign: 'middle', cursor: 'pointer' }}
                                        onClick={() => { this.setState({ cardValue: false }) }} />
                                </div>
                            </DialogTitle>
                            <DialogContent className={classes.content}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="component-simple">kitValue</InputLabel>
                                    <Input
                                        aria-haspopup="true"
                                        onClick={this.handleClick}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <img src="assets/CarInsurance/help.svg" className='help' alt='help' />
                                            </InputAdornment>
                                        }
                                        value='RS 1234' />
                                </FormControl>
                                <div className='value' style={{ color: '#808080', fontSize: '10px', textAlign: 'center' }}>Enter the value between Rs. 0 to Rs. 50,000</div>
                                <div className='buttonContainer' style={{ marginTop: '5rem' }}>
                                    <ButtonLightSuccess Text="Continue" midWidth={true} onClick={this.props.clicked} />
                                </div>
                            </DialogContent>
                        </Dialog>
                        : null}


                </div>
            </div>
        );
    }
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func,
    value: PropTypes.string,
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        popupStepperHide:() => dispatch({type: 'POPUP_STEPPER_HIDE'})
    };
  };

export default connect(null, mapDispatchToProps)(withStyles(styles)(ConfirmationDialogRaw));

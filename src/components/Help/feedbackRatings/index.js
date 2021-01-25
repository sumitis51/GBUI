import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
    card: {
        minWidth: 275,
    },
    paper: {
        backgroundColor: '#f3f5fb',
    },
    paper1: {
        padding: theme.spacing.unit * 2,
    },
    textfield:{
        width:'70%'
    },
    cardHeader: {
        backgroundColor: '#f4f4f4'
    },
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: 'white',
        color: '#333'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
    formControl: {
        margin: `${theme.spacing.unit}px 0px`,
    },
    group: {
        margin: `0px 0`,
    },
    radio: {
        color: '#000000',
        '&$checked': {
            color: '#0da176',
        },
    },
    checked: {},
    label: {
        fontSize: '12px',
        fontFamily: 'Source Sans Pro',
        color: 'rgba(170, 170, 170, 0.54)'
    },
});


class FeedbackComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language:'',
            consent:false,
            mobile:'',
            reviews: '',
        };
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render () {
        const { classes } = this.props;
        return (
            <div className='right-card'>
            {/* <Paper square={true} className={`${classes.paper} mui--hidden-xs mui--hidden-sm`}>
                <div className='feedback-div'>
                    Feedback on recent policy
                    </div>
            </Paper>
            <Paper square={true} className={`${classes.paper} mui--visible-xs-block`}>
                <div className='feedback-div'>
                    Feedback on recent policy
                </div>
            </Paper>
            <Paper square={true} className={classes.paper1}>
                <div className='gbui-body-1 first-rating-content'>
                    Hey! You bought <span style={{ color: '#ea0b4b' }}>Reliance Health policy </span>from Groupbima. How would you like to rate the buying process?
                    </div>
                <div className='star-div' >
                    <i style={{ margin: '0rem 1rem', color: '#808080' }} class="material-icons">star_border</i>
                    <i style={{ margin: '0rem 1rem', color: '#808080' }} class="material-icons">star_border</i>
                    <i style={{ margin: '0rem 1rem', color: '#808080' }} class="material-icons">star_border</i>
                    <i style={{ margin: '0rem 1rem', color: '#808080' }} class="material-icons">star_border</i>
                    <i style={{ margin: '0rem 1rem', color: '#808080' }} class="material-icons">star_border</i>
                </div>
                <div className='text-area'>
                    <TextField
                        name='reviews'
                        classes={classes.textfield}
                        id="outlined-multiline-flexible"
                        multiline
                        value={this.state.reviews}
                        onChange={this.handlePostReviews}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className='submit-button-card'>
                    <ButtonLightSuccess Text='Submit' fullWarningPink={true} />
                </div>
            </Paper> */}
            <Paper square={true} className={classes.paper}>
                <div className='feedback-div'>
                    Important Links
                </div>
            </Paper>
            <Paper square={true} className={classes.paper1}>
                <a href='https://www.irdai.gov.in' target="_blank"><div className='questions gbui-body-2'>What is Insurance Regulatory and Development Authority of India</div></a>
                <Divider />
                <a href='http://www.policyholder.gov.in' target="_blank"><div className='questions gbui-body-2'>IRDAI Consumer Education Website </div></a>
                <Divider />
                <a href='http://www.igms.irda.gov.in' target="_blank"><div className='questions gbui-body-2'>Integrated Grievance Management System (IGMS) </div></a>
                <Divider />
                <a href='http://www.gbic.co.in' target="_blank"><div className='questions gbui-body-2'>Governing Body of Insurance Council (GBIC)</div></a>
                <Divider />
                <a href='https://www.gicouncil.in' target="_blank"><div className='questions gbui-body-2'>General Insurance Council</div></a>
                <Divider />
                <a href='http://www.ibai.org' target="_blank"><div className='questions gbui-body-2'>Insurance Brokers Association of India (IBAI)</div></a>
            </Paper>
        </div>
        )
    }
}

FeedbackComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedbackComponent)

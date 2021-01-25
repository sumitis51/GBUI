import React from 'react'
import Panel from 'muicss/lib/react/panel'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { connect } from 'react-redux';
import axios from 'axios';
import ButtonLight from '../../Shared/ButtonLightSuccess'
import appConstants from '../../../constants/appConstants.json'
import Snackbar from '@material-ui/core/Snackbar';


import './health.css'
import ComparasionTable from './ComparisionTable'


const styles = {
    snack:{
        marginTop:'6rem'
    },
    root: {
        color: 'black',
        '&$checked': {
            color: 'ea0b4b',
        },
    },
    checked: {},
    buttonRoot3: {
        color: 'white',
        backgroundColor: 'ea0b4b',
        textTransform: 'capitalize',
        fontSize: '14px',
        '&:hover': {
            backgroundColor: 'ea0b4b',
        },
        padding: window.innerWidth < 768 ? '10px 10px' : '10px 20px',
        margin: '0 0 0.5rem 0'
    },
    formlabel:{
        fontFamily: 'Nunito',
        fontSize: '16px',
        color:' #333333'
    },
    radiobuttonLabel:{
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        color:'#333333'
    }
};
class CompareHealth extends React.Component {

    state = {
        openSnack:false,
        insurers: [
            {
                img: '/assets/kotak-general-insurance.jpg',
                tag_line: 'iProtect Smart Life',
                link: ''
            },
            {
                img: '/assets/kotak-general-insurance.jpg',
                tag_line: 'iProtect Smart Life',
                link: ''
            },
            // {
            //     img: '/assets/kotak-general-insurance.jpg',
            //     tag_line: 'iProtect Smart Life',
            //     link: ''
            // }
        ],
        compare_quotes:'all',
        healthJson: []
    }
    handleChange = (event) => {
        const value = event.target.value
        
        if( value === 'all') {
            this.getPlansToCompare();
        } else {
            this.handleUnique()
        }
        this.setState({[event.target.name]: value})
        
    }

    componentWillMount() {
        // window.addEventListener("scroll", () => {
        //     const elementPosition = document.getElementById('panel-insurer-list-compare').offsetTop;
        //     if(window.screenTop > elementPosition) {
        //        
        //     } else {
        //        
        //     }
        // })
        if(!this.props.location.state) {
            this.props.history.push('/input-form-health')
        } else {
           
            this.getPlansToCompare();
        }
        
    }

    handleUnique = () => {
        const data  = [];
        this.props.location.state.plans.map(item => data.push(item.insurerPlanId))
        const req = {
            ids: data,
            healthQuoteInputDTO: this.props.inputFormHealth
        }
       
        axios.post(`${appConstants.apiRootURL}/get-compare-quotes-unique`, req)
            .then(response => {
               
                this.setState({healthJson: response.data})
            }).catch(error => 
                {
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
                }
        )
    }

    getPlansToCompare = () => {
        const data  = [];
        this.props.location.state.plans.map(item => data.push(item.insurerPlanId))
        const req = {
            ids: data,
            healthQuoteInputDTO: this.props.inputFormHealth
        }
       
        axios.post(`${appConstants.apiRootURL}/get-compare-quotes`, req)
            .then(response => {
               
                this.setState({healthJson: response.data})
            }).catch(error => 
                {
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
                }
        )
    }
    handleRouteChange = (index, location) =>() => {
        const item = this.props.location.state.plans[index]
        this.props.setCurrentPlan(item);
        localStorage.setItem("currentPlan", JSON.stringify(item))
        this.props.history.push(location, {insurer: item, modifyCovers: this.props.location.state.modifyCovers})
    }

    render() {

        const { classes } = this.props;

        return (
            <div className="compare-quotes-health-parent">
                {/* Conetent  Body*/}
                <div className="compare-quotes-health-content">
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
                    <p className="back-link" style={{cursor: 'pointer'}}><img src="/assets/back.png" alt="back" onClick={() => {this.props.history.push('/quote-listing-health')}} />&nbsp; BACK TO QUOTES</p>
                    {/* <h3 className="health-heading">Health Quote Comparison</h3> */}
                    <h3 className="health-heading">Health Quote Comparison </h3>

                    {/* First Panel containing filter */}
                    <Panel id="panel-insurer-list-compare">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <FormLabel className={classes.formlabel} component="legend">Comparing {this.state.healthJson.insurers ? this.state.healthJson.insurers.length: 3} Quotes</FormLabel>
                                            <RadioGroup
                                                aria-label="Comparing 3 Quotes"
                                                name="compare_quotes"
                                                className={classes.group}
                                                value={this.state.compare_quotes}
                                                onChange={this.handleChange}
                                            >
                                                <FormControlLabel
                                                    classes={{label:classes.radiobuttonLabel}}
                                                    value="all"
                                                    control={<Radio classes={{
                                                        root: classes.root,
                                                        checked: classes.checked,
                                                    }} />}
                                                    label="Compare all attributes" />
                                                <FormControlLabel
                                                    classes={{label:classes.radiobuttonLabel}}
                                                    value="unique"
                                                    control={<Radio classes={{
                                                        root: classes.root,
                                                        checked: classes.checked,
                                                    }} />} label="Compare only unique attributes" />
                                            </RadioGroup>
                                        </FormControl>
                                    </td>
                                    {this.state.healthJson.insurers ? this.state.healthJson.insurers.map((item, index) =>
                                        <td>
                                            <div className="insurer-div" style={{ textAlign: 'center' }}>
                                            <img src={`${appConstants.mediaBucketURL}/${item.img}`} width="65" height="25" alt="insurer" />
                                            {/* <p className="tag_line">{item.tag_line}</p> */}
                                            <p className="tag_line">{this.props.location.state.plans[index].planName}</p>
                                            <ButtonLight 
                                                Text="Buy Policy"
                                                smallWidth={true}
                                                onClick={this.handleRouteChange(index, '/proposal-form-health')}
                                                />
                                            {/* <Button
                                                className={classNames(classes.buttonRoot3)}>
                                                Buy Policy
                                            </Button> */}
                                            <p className="view-plan" style={{cursor:'pointer'}} onClick={this.handleRouteChange(index, '/health-quotes')}>View Plan Details</p>
                                        </div>
                                        </td>
                                    ): ''}
                                </tr>
                            </tbody>
                        </table>
                        {/* <Row>
                            <Col md="3" sm="12" xs="12">
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Comparing 3 Quotes</FormLabel>
                                    <RadioGroup
                                        aria-label="Comparing 3 Quotes"
                                        name="compare_quotes"
                                        className={classes.group}
                                        value={this.state.compare_quotes}
                                        onChange={this.handleChange}
                                    >
                                        <FormControlLabel
                                            value="all"
                                            control={<Radio classes={{
                                                root: classes.root,
                                                checked: classes.checked,
                                            }} />}
                                            label="Compare all attributes" />
                                        <FormControlLabel
                                            value="unique"
                                            control={<Radio classes={{
                                                root: classes.root,
                                                checked: classes.checked,
                                            }} />} label="Compare only unique attributes" />
                                    </RadioGroup>
                                </FormControl>
                            </Col>

                            <Col md="9">
                                <Row>
                                    {this.state.insurers.map(item =>
                                        <Col md={12 / this.state.insurers.length} lg={12 / this.state.insurers.length} xs="4" sm="4">
                                            <div className="insurer-div" style={{ textAlign: 'center' }}>
                                                <img src={item.img} width="65" height="18" alt="insurer" />
                                                <p className="tag_line">{item.tag_line}</p>
                                                <Button
                                                    className={classNames(classes.buttonRoot3)}>
                                                    Buy Policy
                                        </Button>
                                                <p className="view-plan">View Plan Details</p>
                                            </div>
                                        </Col>
                                    )}
                                </Row>
                            </Col>
                        </Row> */}
                    </Panel>


                    {/* Table */}
                    <ComparasionTable
                        comparision_data={this.state.healthJson}
                        /*plans={this.props.location.state.plans}
                        history={this.props.history}*/ />
                </div>
            </div>
        )
    }
}

CompareHealth.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    inputFormHealth: state.inputFormHealth.inputFormHealthData
});

const mapDispatchToProps = dispatch => ({
    setCurrentPlan: (plan) => dispatch({ type: 'CURRENT_PLAN',plan}),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CompareHealth));
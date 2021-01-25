import React from 'react'
import './quote-listing-motor.css'
import PolicyDetails from './MotorInputEdit/PolicyDetails'
import CarDetails from './MotorInputEdit/CarDetails'
import RegistrationDetails from './MotorInputEdit/RegistrationDetails'
import Switch from '@material-ui/core/Switch';
import Row from 'muicss/lib/react/row'
import InputLabel from '@material-ui/core/InputLabel';
import Col from 'muicss/lib/react/col'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Panel from 'muicss/lib/react/panel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import StarRate from '@material-ui/icons/StarRate';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import Slider from '@material-ui/lab/Slider'
import HeaderPanels from '../Health-Quotes/PanelsHeaderHealth'
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab'
import AdditionCoverDialog from './Dialogs/additionalCover'
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index'
// import HealthGroupTabs from './GroupHealthTabs/index'
import axios from 'axios';
import GetDiscount from '../Shared/Health/Discount'
import FilterDialog from '../Shared/Health/Filter'
import NetworkHospitals from './pathlab-view-modal'
import constants from '../../constants/appConstants.json'
import Snackbar from '@material-ui/core/Snackbar';
import Loader from '../cssLoader/Loader'


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => ({
    snack: {
        marginTop: '6rem'
    },
    fab: {
        backgroundColor: '#ea0b4b',
        top: 'auto',
        right: 10,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
    },
    fab1: {
        backgroundColor: '#ea0b4b',
        top: 'auto',
        right: 10,
        bottom: '16rem',
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
    },
    fab2: {
        backgroundColor: '#ea0b4b',
        top: 'auto',
        right: 10,
        bottom: '11rem',
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
    },
    fab3: {
        backgroundColor: '#ea0b4b',
        top: 'auto',
        right: 10,
        bottom: '6rem',
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
    },
    fabClose: {
        backgroundColor: '#878787',
        top: 'auto',
        right: 10,
        bottom: 0,
        left: 'auto',
        marginBottom: '1rem',
        position: 'fixed', '&:hover': {
            backgroundColor: '#878787',
        },
    },

    root: {
        display: 'flex',
    },
    margin: {
        margin: '4px',
    },
    cssRoot: {
        color: 'black',
        border: '1px solid  #ea0b4b',
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: 'white',
        },
        textTransform: 'capitalize',
        padding: '0px 10px',
        float: 'right'
    },
    formGroup: {
        display: 'block',
        marginTop: '32px'
    },
    formGroup1: {
        display: 'inline',
        fontSize: '10px',
    },
    formGroupL: {
        color: '#808080',
        marginLeft: '-7px',
        fontSize: '12px',
        fontFamily: 'Source Sans Pro'
    },
    button: {
        width: '100%',
        color: '#ea0b4b',
        background: '#ffffff',
        '&:hover': {
            backgroundColor: '#f6f6f6',
            border: '1px solid #ea0b4b'
        },
        border: '1px solid #ea0b4b',
        marginTop: '12px',
        textTransform: 'lowercase'
    },
    paperScroll: {
        // overflowX: 'auto'
    },
    buttonEdit: {
        color: '#ea0b4b',
        background: '#ffffff',
        '&:hover': {
            backgroundColor: '#f6f6f6',
            border: '1px solid #ea0b4b'
        },
        border: '1px solid #ea0b4b',
        padding: '10px 40px',
        margin: '0.8rem'
    },
    radio_root: {
        color: 'black',
        '&$checked': {
            color: '#ea0b4b',
        },
    },
    checked: {},
    label: {
        color: '#9c0f46',
        fontSize: '13px',
        fontFamily: 'Nunito',
        fontWeight: 'bold',
    },
    slider: {
        padding: '22px 0px',
    },
    sliderRoot: {
        background: '#ea0b4b'
    },
    colorSwitchBase: {
        color: '#333333',
        '&$colorChecked': {
            color: '#ea0b4b',
            '& + $colorBar': {
                backgroundColor: '#ea0b4b',
            },
        },
    },
    colorBar: {},
    colorChecked: {},
    switchLabel: {
        fontFamily: 'Nunito',
        fontSize: '12px',
        color: '#000000',
    }
});


class QuoteListMotor extends React.Component {

    state = {
        openSnack: false,
        consent: false,
        group: true,
        quote: true,
        insurere_5: false,
        open: false,
        crossParent: false,
        active_step: 1,
        iconWidth: 0,
        fullWidth: false,
        showDetails: {},
        show: false,
        sortBy: [
            { 'sort': 'Premium Low to High', 'sortOrder': 'Asc' },
            { 'sort': 'Premium High to Low', 'sortOrder': 'Desc' },
            // 'IDV- High to Low',
            // 'IDV- Low to High',
            // 'Rating- High to Low',
            // 'Most Relevant',
            // 'Claim Settled %- High to Low',
            // 'Value for money',
            // 'Coverage',
            // 'Servicing',
            // 'Best Product'
        ],
        sort_by_menu: false, // Show or hide sort by filter menu
        sortByFilterMenu: '', // Hold current value for sort by premium filter
        cover_type: 'basic',
        cover_type_menu: false, // Show or hide cover type menu
        openAdditionCover: false,
        checkedB: false,
        showFab: false,
        check_value: '',
        plansToCompare: [],
        quotes: [],
        filterdata: {},
        deductibleList: {},
        discountDialog: false,
        filterDialog: false,
        modifyCover: {
                minCovergae: 0,
                maxCoverage: 0,
                flag: false
        },
        sort: {
            sortType: "premium",
            sortOrder: '',
            flag: false,
        },
        showNetworkHospitals: false,
        currentInsurer: {},
        tooltipText: [
            {
                id: 'Insurer',
                data: 'Insurer refers to an entity (insurance company, insurance carrier or underwriter) that offers insurance.'
            },
            {
                id: 'Cover',
                data: 'The total amount for which the coverage is offered by the health insurance plan is known as the cover. '
            },
            {
                id: 'You Pay of bill',
                data: 'It is the percentage amount of medical expenses incurred, that customers need to pay under the co-pay system.'
            },
            {
                id: 'Cashless',
                data: 'Under the cashless system, either a major portion or entire medical expenses for covered illness/ injury is paid directly to the hospital by the insurer.'
            },
            {
                id: 'Key Details',
                data: 'Key details of a policy help the customers in making an informed decision regarding insurance and comparing various policies.'
            },
            {
                id: 'Premium',
                data: 'Premium is the amount to be paid by the insured to the insurer for the health insurance plan.'
            },
        ],
        coverMenu: [
            { value: '1lcs', label: 'Up to 3 Lac' },
            { value: '4lcs', label: '4 Lacs to 6 Lacs' },
            { value: '7lcs', label: '7 Lacs to 10 Lacs' },
            { value: '11lcs', label: '11 Lacs to 15 Lacs' },
            { value: '16lcs', label: '16 Lacs to 20 Lacs' },
            { value: '21lcs', label: '21 Lacs to 50 Lacs' },
            { value: '50lcs', label: '51 Lacs+' }
        ],
        covers: {
            '1lcs': {
                minCoverage: 100000,
                maxCoverage: 300000
            },
            '4lcs': {
                minCoverage: 400000,
                maxCoverage: 600000
            },
            '7lcs': {
                minCoverage: 700000,
                maxCoverage: 1000000
            },
            '11lcs': {
                minCoverage: 1100000,
                maxCoverage: 1500000
            },
            '16lcs': {
                minCoverage: 1600000,
                maxCoverage: 2000000
            },
            '21lcs': {
                minCoverage: 2100000,
                maxCoverage: 5000000
            },
            '50lcs': {
                minCoverage: 5100000,
                maxCoverage: 60000000
            }
        },
        cover_deductibleMenu: [
            { value: '1lcs', label: '1 Lac' },
            { value: '2lcs', label: '2 Lacs' },
            { value: '3lcs', label: '3 Lacs' },
            { value: '4lcs', label: '4 Lacs' },
            { value: '5lcs', label: '5 Lacs' },
            { value: '10lcs', label: '10 Lacs' },
            { value: '15lcs', label: '15 Lacs' },
            { value: '20lcs', label: '20 Lacs' },
        ],
        flagDeductible: false,
        loading: true
    }
    handleClickOpen = (step_value) => {
        const vm = this;
        this.setState({ open: true, active_step: step_value });
        setTimeout(() => {
            console.log(document.getElementsByClassName('tabs-input-motor-edit')[0].clientWidth);
            const width = window.innerWidth; //eslint-disable
            vm.setState({ iconWidth: width });
            console.log(width);
        });
    };

    handleChangeCheckbox = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    }

    handleChangeDeductible = (index, index1) => event => {
        let plans = [];
        let policy = this.state.quotes.topup[index][index1]
        for (let j = 0; j < this.state.quotes.topup[index][index1].length; j++) {
            let policy1 = policy[j]
            policy1.insurerPlanId === event.target.value ?
                policy1.showDeductible = true :
                policy1.showDeductible = false
            // this.setState({policy})
            policy[j] = policy1
            this.convertAmountToLacs(policy1.deductibleAmount)
        }
        this.setState({ policy })
        // this.setState({ [name]: event.target.value });
        // const value = event.target.value
        // for( let i = 0; i < this.state.quotes.topup.length ; i++){
        //     let items = this.state.quotes.topup[index]
        //     const  plan = items.filter((item) =>{
        //          return  item.deductibleAmount === value  
        //     })
        //     plan.length > 0 ? plans.push(plan) : false  
        // }   
        // console.log(plans)
    }
    convertAmountToLacs = (amount) => {
        //   const lacAmt=`${amount}` 
        //   const firstDigit= `${lacAmt[0]}.${lacAmt[1]}`
        //      return firstDigit
        var val = Math.abs(amount)
        if (val >= 100000) {
            val = (val / 100000).toFixed(1)
        }
        /*else if(val >= 1000) val = (val/1000).toFixed(2) + ' K';*/
        return val;
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    handleAdditionClose = () => {
        this.setState({ openAdditionCover: false })
    }
    handleSortByPremium = (event) => {
        let sortByFilterMenu = event.target.attributes['value'].value
        this.setState({
            sort: {
                sortType: "premium",
                sortOrder: event.target.attributes['value'].value,
                flag: true
            },
            sort_by_menu: false
        })

        let healthQuoteInputFormData;
        healthQuoteInputFormData = {
            healthQuoteInputForm: this.props.inputFormHealthData,
            sort: {
                sortType: "premium",
                sortOrder: sortByFilterMenu,
                flag: true
            },
            modifyCover: this.state.modifyCover,
            filter: this.state.filterdata
        }
        let obj = {
            sort: {
                sortType: "premium",
                sortOrder: sortByFilterMenu,
                flag: true
            },
            modifyCover: this.state.modifyCover,
            filter: this.state.filterdata
        }
        localStorage.setItem("operation", JSON.stringify(obj))
        axios.post(`${constants.apiRootURL}/health-quotes/operation`, healthQuoteInputFormData)
            .then(response => {
                this.setState({ quotes: response.data, loading: false })
            }).catch(error => {
                if (error.response.status === 400) {
                    this.setState({
                        openSnack: true,
                        loading: false
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
    handleChangeCoverValue = event => {
        let coverage = event.target.value
        let modifyCover = this.state.covers[coverage]
        modifyCover.flag = true
        this.setState({
            modifyCover,
            cover_type_menu: false,
            check_value: event.target.value,
            loading: true
        })
        localStorage.setItem('modifyCover', JSON.stringify(modifyCover))
        let healthQuoteInputFormData;
        const sort = this.state.sort;
        healthQuoteInputFormData = {
            healthQuoteInputForm: this.props.inputFormHealthData,
            sort: sort,
            modifyCover,
            filter: this.state.filterdata
        }
        let obj = {
            sort: sort,
            modifyCover,
            filter: this.state.filterdata,
            coverage
        }
        localStorage.setItem("operation", JSON.stringify(obj))

        axios.post(`${constants.apiRootURL}/health-quotes/operation`, healthQuoteInputFormData)
            .then(response => {
                this.setState({ quotes: response.data, loading: false })
            }).catch(error => {
                // this.setState({ quote: false })
                this.setState({ loading: false })
                // console.log(error)
                if (error.response.status === 400) {
                    this.setState({
                        openSnack: true
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

    handleCloseCrossParent = value => {
        this.setState({ crossParent: false });
    };
    handleClickCrossParent = () => {
        this.setState({
            crossParent: true
        })
    }

    handleChange = event => {
        this.setState({ check_value: event.target.value, cover_type_menu: false });
    };

    showFab = () => {
        this.setState({
            showFab: true
        })
    }

    hideFab = () => {
        this.setState({
            showFab: false
        })
    }

    // Add plans to compare
    addPlanToCompare = (item) => (event) => {
        console.log(item);

        const plansToCompare = this.state.plansToCompare;
        if (plansToCompare.length < 3) {
            const itemIndex = plansToCompare.findIndex(i => i.insurerPlanId === item.insurerPlanId);
            if (itemIndex !== -1) {
                plansToCompare.splice(itemIndex, 1)
                console.log(plansToCompare, itemIndex)
                this.setState({ plansToCompare })
            } else {
                plansToCompare.push(item);
                console.log(plansToCompare)
                this.setState({ plansToCompare })
            }
        }

    }

    doOperations(operations) {
        let healthQuoteInputFormData;
        healthQuoteInputFormData = {
            healthQuoteInputForm: this.props.inputFormHealthData,
            sort: operations.sort,
            modifyCover: operations.modifyCover,
            filter: operations.filterData
        }

        axios.post(`${constants.apiRootURL}/health-quotes/operation`, healthQuoteInputFormData)
            .then(response => {
                this.setState({ quotes: response.data, loading: false })
            }).catch(error => {
                // this.setState({ quote: false })
                // console.log(error)
                if (error.response.status === 400) {
                    this.setState({
                        openSnack: true,
                        loading: false
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

    componentWillMount() {
        // console.log(this.props.healthTab, 'may be redirection')
        // Check If Data is available in localStorage
        const inputForm = JSON.parse(localStorage.getItem("inputForm"))
        // Check for Input Form Details of Health, if not then redirect to inputForm Health
        if (this.props.inputFormHealthData && this.props.inputFormHealthData.familyDetails) {
            const operations = JSON.parse(localStorage.getItem("operation"))
            if (operations) {

                this.setState({
                    modifyCover: operations.modifyCover,
                    sort: operations.sort,
                    filter: operations.filter,
                    check_value: operations.coverage
                })
                this.doOperations(operations)
            } else {
                this.getQuotes()
            }

        } else if (inputForm) {
            this.props.loadInputFormHealth(inputForm)
            this.getQuotesWithLocalStorage(inputForm)
        } else {
            this.props.history.push("/")
        }
        // console.log(this.props.location)
        this.props.setCurrentPlan({})
    }
    getQuotesWithLocalStorage(inputFormData) {
        const modifyCoverGetData = JSON.parse(localStorage.getItem("modifyCover"))
        if (false) {
            //  this.handleChangeCoverValue()
        } else {
            axios.post(`${constants.apiRootURL}/health-quotes`, inputFormData)
                .then(response => {
                    // this.props.history.push('/quote-listing-health', { quotes: response.data })
                    const quotes = response.data
                    const showNoQuotes = quotes.base.length === 0 && quotes.criticalIllness.length === 0
                        && quotes.criticalIllnessDiseaseSpecific.length === 0
                        && quotes.hospitalCash.length === 0 && quotes.topup.length === 0
                    this.setState({
                        quotes,
                        showNoQuotes,
                        loading: false
                    })
                    if (response.data.length <= 5) {
                        this.setState({ insurere_5: true })
                    }
                    if (quotes.base.length === 0 && quotes.topup.length === 0 && quotes.criticalIllness.length === 0 &&
                        quotes.criticalIllnessDiseaseSpecific.length === 0 && quotes.hospitalCash.length === 0) {
                        this.setState({ quote: false })
                    } else {
                        this.setState({ quote: true })
                    }
                    console.log(response.data)
                }).catch(error => {
                    // this.setState({ quote: false })
                    // console.log(error)
                    if (error.response.status === 400) {
                        this.setState({
                            openSnack: true,
                            loading: false
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
    }
    getQuotes = () => {
        console.log(this.props.inputFormHealthData)
        axios.post(`${constants.apiRootURL}/health-quotes`, this.props.inputFormHealthData)
            .then(response => {
                // this.props.history.push('/quote-listing-health', { quotes: response.data })
                const quotes = response.data
                const showNoQuotes = quotes.base.length === 0 && quotes.criticalIllness.length === 0
                    && quotes.criticalIllnessDiseaseSpecific.length === 0
                    && quotes.hospitalCash.length === 0 && quotes.topup.length === 0
                this.setState({
                    quotes,
                    showNoQuotes,
                    loading: false
                })
                if (response.data.length <= 5) {
                    this.setState({ insurere_5: true })
                }
            }).catch(error => {
                // this.setState({ quote: false })
                // console.log(error)
                if (error.response.status === 400) {
                    this.setState({
                        openSnack: true
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
    componentDidMount() {
        if (window.innerWidth <= 767)
            this.setState({ fullWidth: true });
        else
            this.setState({ fullWidth: false });
        const vm = this;
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 767)
                vm.setState({ fullWidth: true });
            else
                vm.setState({ fullWidth: false });
        });
    }
    handleChangeSwitch = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    handleGetDiscountDialog = () => {
        this.setState({ discountDialog: !this.state.discountDialog })
    }
    handleFilterDialog = () => {
        this.setState({ filterDialog: !this.state.filterDialog })
    }
    ShowDeductibleList = (index) => {
        this.setState({ deductibleList: { ...this.state.deductibleList, [index]: !this.state.deductibleList[index] } })

    }
    ShowPolicyList = (index) => {
        this.setState({
            showDetails: { ...this.state.showDetails, [index]: !this.state.showDetails[index] },
            show: !this.state.show
        })
    }
    // Handle Network hospital list
    handleNetworkHospitals = currentPlan => () => {
        this.setState({ showNetworkHospitals: true, currentInsurer: currentPlan })
    }
    getCurrentCover = () => {
        const { check_value, coverMenu } = this.state;
        const cc = coverMenu.filter(item => item.value === check_value)[0]
        return cc ? cc.label : 'Up to 3 Lacs'
    }
    setDefaultAddonAmount = (selectedPlan) => {
        let amt = Math.round(selectedPlan.premium)
        try {

            selectedPlan.addOns = selectedPlan.addOns.map(item => {
                let it = item
                if (item.mandatory) {
                    it.checked = true
                    amt += it.amount
                } else {
                    it.checked = false
                }
                return it
            })
        } catch (error) {
            console.log(error)
        }
        if (amt !== Math.round(selectedPlan.premium)) {
            const serviceTax = Math.round((18 / 100) * amt)
            let totalPremium = Math.round(amt + Number(serviceTax))
            // totalPremium = totalPremium.toFixed(2)
            // amt = amt.toFixed(2)
            selectedPlan.premium = amt
            selectedPlan.gst = serviceTax
            selectedPlan.totalPremium = totalPremium

            const premiumDetails = {
                premiumAmount: amt,
                serviceTax: serviceTax,
                premiumWithServiceTax: totalPremium,
                proposerId: null
            }
            this.props.onPremiumFetch(premiumDetails)
            // this.props.selectedPlan(currentPlan)
            this.props.setCurrentPlan(selectedPlan)
        }
        console.log(selectedPlan, 'Selected plan in listing')
    }
    render() {
        const { classes } = this.props;
        const {plansToCompare} = this.state;
        return (
            <div className="quote-list-motor-parent">
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
                {/* HEader for editing mortor details like make model, policy or registration */}
                <div class="panel-edit-quote-motor-links">
                    <p className="heading-body-quote-motor-2 gbui-h7 mui--visible-xs-block mui--visible-sm-block ">Health Insurance Plans</p>
                    <HeaderPanels getQuotes={() => {
                        setTimeout(() => {
                            this.getQuotes()
                        }, 100)
                    }} history={this.props.history} />
                </div>
                {/* tabs */}
                <Col md={12} className='mui--hidden-xs'>
                    {/* <HealthGroupTabs /> */}
                </Col>
                {/* Row for dividing */}
                <Row>
                    <Col lg="9">
                        {/* Div for body contents */}

                        <div className="body-content-quote-motor"
                        // style={{ overflowY: 'hidden' }}
                        >
                            <div className="mui-container-fluid">
                                <Row>
                                    <Col md="12" xs="9">
                                        <div className="heading-body-and-results-text-div">
                                            <p className="heading-body-quote-motor mui--hidden-xs mui--hidden-sm">Health Insurance Plans</p>
                                            {this.state.quote && <p className="heading-body-results-text-quote-motor">Showing {this.state.quotes.base && (this.state.quotes.base.length +
                                                this.state.quotes.criticalIllness.length +
                                                this.state.quotes.criticalIllnessDiseaseSpecific.length +
                                                this.state.quotes.hospitalCash.length +
                                                this.state.quotes.topup.length)} Plans | GST Excluded</p>}
                                            {!this.state.quote && <p className="heading-body-quote-plan">Showing 0 Plans</p>}
                                        </div>
                                    </Col>
                                    {/* {this.props.healthTab !== 0 &&
                                        <Col xs={3} className='mui--visible-xs-block'>
                                            <div className="bag-container">
                                                <div className='number-container'><div style={{ color: '#ffffff', fontFamily: 'Nunito', fontSize: '9.1px', textAlign: 'center', display: 'inline', marginLeft: '6px' }}>1</div></div>
                                                <i class="material-icons" style={{ color: '#9c0f46', fontSize: '25px', margin: '0px 12px 0px', display: 'inline' }}>shopping_basket</i>
                                                <div style={{ color: '#9c0f46', fontFamily: 'Nunito', fontSize: '9.1px', textAlign: 'center' }}>Bag</div>
                                            </div>
                                        </Col>} */}

                                </Row>
                            </div>

                            {/* Sort div */}

                            <div className="sort-filter-motor-quote-div">
                                <div className="mui-container-fluid">
                                    <Row>
                                        <Col md="2" lg="2" xs="4" style={{ borderRight: '1px solid #aaaaaa' }}>
                                            <div className="premium-filter-dropdown">
                                                <div style={{ display: 'inline' }}
                                                    className="sort-by-filter-text-div"
                                                    onClick={() => {
                                                        const vm = this;
                                                        this.setState({
                                                            sort_by_menu: !vm.state.sort_by_menu,
                                                            cover_type_menu: false
                                                        });
                                                    }}>
                                                    <p className='sort-by-text'>Sort by</p>
                                                    {this.state.quote && <p className="sort-by-text-quote-motor">Premium
                                                    {this.state.sortBy.sortOrder || this.state.sort.sortOrder == 'Asc' ?
                                                            <img src="/assets/decrease.svg"
                                                                alt="sort" style={{ width: '8px', display: 'inline', marginLeft: '3px' }} /> : this.state.sort.sortOrder == 'Desc' ?
                                                                <img src="/assets/increase.svg" alt="sort" style={{ width: '8px', display: 'inline', marginLeft: '3px' }} /> :
                                                                <img src="/assets/decrease.svg" alt="sort" style={{ width: '8px', display: 'inline', marginLeft: '3px' }} />}
                                                    </p>}

                                                </div>
                                                {!this.state.quote && <div style={{ display: 'inline' }}>
                                                    <p className="sort-by-text-quote-motor">Premium <img src="/assets/Group 1911 (1).svg" alt="sort" style={{ width: '20px', display: 'inline' }} /></p>
                                                    {/* <i class="material-icons" fontSize='8px' style={{ display: 'inline', float: 'right' }}>
                                                        keyboard_arrow_down
                                                        </i> */}
                                                </div>}
                                                {/* Dropdown menu */}
                                                {this.state.quote && <div>
                                                    {this.state.sort_by_menu &&
                                                        <div className="dropdown-content-fliter-sort">
                                                            {this.state.sortBy.map((item, index) =>
                                                                <p value={item.sortOrder} onClick={this.handleSortByPremium} className={item.sortOrder === this.state.sort.sortOrder ? "selected" : "item"}>{item.sort}</p>
                                                            )}
                                                        </div>
                                                    }
                                                </div>}
                                            </div>
                                        </Col>

                                        {/* group-health */}
                                        {/* style={{ borderRight: '1px solid #aaaaaa' }} */}
                                        {this.state.quote && this.state.group && <Col md="3" lg="5" xs="5" >
                                            <div className="cover-type-dropdown">
                                                <div
                                                    className="cover-type-value-div-quote-motor"
                                                    onClick={() => {
                                                        const vm = this;
                                                        this.setState({
                                                            cover_type_menu: !vm.state.cover_type_menu,
                                                            sort_by_menu: false
                                                        })
                                                    }}>

                                                    <p className="label-cover-type-quote-motor p-motor-quote">Modify Cover</p>
                                                    <p className="cover-type-value-quote-list-motor">
                                                        {this.getCurrentCover()} &nbsp;
                                                    </p>
                                                </div>
                                                {/* Menu content */}
                                                {
                                                    this.state.cover_type_menu &&
                                                    <div className="cover-type-dropdown-menu-content">


                                                        {/* Cover Value */}
                                                        <FormControl component="fieldset" className={classes.formControl}>
                                                            <FormLabel component="legend" className={classes.label}>Cover Value</FormLabel>
                                                            <RadioGroup
                                                                aria-label="Cover Value"
                                                                name="check_value"
                                                                className={classes.group}
                                                                value={this.state.check_value}
                                                                onChange={this.handleChangeCoverValue}
                                                            >
                                                                {this.state.coverMenu.map((item, index) =>
                                                                    process.env.REACT_APP_PROFILE === 'POM' ?
                                                                        <FormControlLabel key={index} control={<Radio classes={{
                                                                            root: classes.radio_root,
                                                                            checked: classes.checked,
                                                                        }} />} value={item.value} label={item.label} />
                                                                        : process.env.REACT_APP_PROFILE === 'POS' && index <= 1 ?
                                                                            <FormControlLabel key={index} control={<Radio classes={{
                                                                                root: classes.radio_root,
                                                                                checked: classes.checked,
                                                                            }} />} value={item.value} label={item.label} /> : ''

                                                                )}
                                                            </RadioGroup>

                                                        </FormControl>
                                                    </div>
                                                }
                                            </div>
                                        </Col>}
                                        {!this.state.quote && <div>
                                            <Col md="2" lg="5" xs="6" className="border-left-text-edit-quote-motor">
                                                <div className="cover-type-dropdown">
                                                    <div
                                                        className="cover-type-value-div-quote-motor"
                                                        onClick={() => {
                                                            const vm = this;
                                                            this.setState({ cover_type_menu: !vm.state.cover_type_menu })
                                                        }}>
                                                        <p className="label-cover-type-quote-motor p-motor-quote">Cover value</p>
                                                        <p className="cover-type-value-quote-list-motor">
                                                            3 Lacs to 3.5 Lacs &nbsp;
                                                        </p>
                                                    </div>
                                                    {/* Menu content */}
                                                    {this.state.cover_type_menu &&
                                                        <div className="cover-type-dropdown-menu-content">


                                                            {/* Cover Value */}
                                                            <FormControl component="fieldset" className={classes.formControl}>
                                                                <FormLabel component="legend" className={classes.label}>Cover Value</FormLabel>

                                                            </FormControl>


                                                        </div>
                                                    }
                                                </div>
                                            </Col> </div>}
                                        {this.state.quote && !this.state.group && <Col md="8" lg="8" xs="12">
                                            <Button variant="contained"
                                                className={classNames(classes.margin, classes.cssRoot)}
                                                onClick={() => { this.setState({ openAdditionCover: true }) }}>Additional Covers</Button>

                                            <Button
                                                variant="contained"
                                                className={classNames(classes.margin, classes.cssRoot)}>Add-Ons</Button>
                                        </Col>}
                                        {/* Discount Dialog */}
                                        <GetDiscount open={this.state.discountDialog} close={this.handleGetDiscountDialog} />

                                        {/* Filter Dialog */}
                                        <FilterDialog open={this.state.filterDialog} close={this.handleFilterDialog}
                                            triggerQuoteUpdate={(data) => { this.setState({ quotes: data }) }}
                                            filterData={(filterData) => { this.setState({ filterdata: filterData }) }}
                                            sort={this.state.sort} modifyCover={this.state.modifyCover}
                                        />

                                        {/* group-health */}
                                        {this.state.group && <Col md="8" lg="5" >
                                            <span className="web-filter-button mui--hidden-xs mui--hidden-sm">
                                                <Button
                                                    variant="contained"
                                                    className={classNames(classes.margin, classes.cssRoot)}
                                                    onClick={this.handleFilterDialog}>Filter</Button></span>
                                            <div>
                                                <p className='mobile-filter-text mui--hidden-md mui--hidden-lg mui--hidden-xl'
                                                    style={{
                                                        color: '#ea0b4b', fontFamily: 'Source Sans Pro',
                                                        fontSize: '12px', display: 'flex'
                                                    }}
                                                    onClick={this.handleFilterDialog}><span> <i class="material-icons"
                                                        style={{ color: '#ea0b4b', borderLeft: '1px solid rgb(170, 170, 170)', paddingLeft: '11px', paddingTop: '9px' }}>filter_list</i></span>
                                                    <span className="filter-text" style={{ marginLeft: '4px', paddingTop: '12px' }}>Filter</span></p>
                                            </div>

                                            <Dialog open={this.state.crossParent} maxWidth='xs'
                                                onClose={this.handleCloseCrossParent}
                                                aria-labelledby="simple-dialog-title">
                                                <Row className='dialog-row' style={{ margin: '2rem 0rem' }}>
                                                    <Col md={12}><div className='dialog-title' style={{ color: '#ea0b4b' }}>Cross Parent Insurers</div></Col>
                                                    <Col md={12}><div className='warning-text'>
                                                        According to your input details there are some insurer who
                                                        provide cross parent insurance.
                                                         </div>
                                                    </Col>
                                                    <Col md={6}><ButtonLightSuccess warningContent={true} Text='Cancel' onClick={this.handleCloseCrossParent} /></Col>
                                                    <Col md={6}><ButtonLightSuccess warning={true} Text='Show Quotes' /></Col>
                                                </Row>
                                            </Dialog>
                                        </Col>}

                                    </Row>
                                </div>
                                {/* fields header div */}
                                <div className="mui-container-fluid">
                                    <div className="fields-header-div-quote-motor mui--hidden-xs mui--hidden-sm">
                                        <Row className="row">
                                            {this.state.tooltipText.map(item =>
                                                <Col md="2">
                                                    <p className="field-item tooltipHQ" style={{ textAlign: 'center' }}>{item.id}
                                                        {(!this.state.quote || this.state.group) &&
                                                            <i class="material-icons" style={{
                                                                fontSize: '14px',
                                                                verticalAlign: 'middle', marginLeft: '3px'
                                                            }} >help</i>}
                                                        <span class="tooltiptext">{item.data}</span>
                                                    </p>
                                                </Col>
                                            )}
                                        </Row>
                                    </div>
                                </div>

                                {/* Plans Card */}
                                {this.state.loading ?
                                    <div className="loaderOuter">
                                        <Loader />
                                    </div> : this.state.quotes.base &&
                                    <div className="mui-container-fluid insurer-detail-container-quote-motor" >
                                        {this.state.quotes.base.length > 0 && <p className="compr-plans-quote-motor">Base Plans <span className="counts-quote-motor">({this.state.quotes.base.length !== 0 && this.state.quotes.base.length})</span></p>}
                                        {/* Card-1 */}
                                        {this.state.quotes.base.map((item, index) => <Panel className="quote_listing_box">
                                            <Row className="border-sm-row-quote-motor">
                                                <Col md="2" sm="2" xs="3">
                                                    <div className="logo-insurer-div-quote-car">
                                                        {item.insurerLogo !== null ?
                                                            <img src={`${constants.mediaBucketURL}/${item.insurerLogo}`} alt="insurer" className="insurer-image" /> : item.insurerName}
                                                       
                                                       {this.state.quotes.base.length > 1 ? 
                                                        <FormGroup row className={classNames(classes.formGroup, 'mui--hidden-sm mui--hidden-xs')}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked= {this.state.plansToCompare.findIndex(i => i.insurerPlanId === item.insurerPlanId) !== -1}
                                                                        disabled = {this.state.plansToCompare.length === 3 && this.state.plansToCompare.findIndex(i => i.insurerPlanId === item.insurerPlanId) === -1}
                                                                        onChange={this.addPlanToCompare(item)}
                                                                    />
                                                                }
                                                                label="Add to compare"
                                                            />
                                                        </FormGroup> : null}
                                                    </div>
                                                </Col>
                                                <Col md="8" xs="5" className="col-insurer-desc-quote-motor" style={{ marginRight: '-12px' }}>
                                                    <div className="insurer-desc-quote-car-div ">
                                                        <div className="plan-name" style={{ position: 'relative' }}>
                                                            <span className="insurer-desc-quote-car-heading-policy">

                                                                {item.planName}</span>



                                                            <p className="reviews-insurer-quote-car mui--hidden-sm mui--hidden-xs" style={{ position: 'absolute', left: '340px' }}>
                                                                <div className='broucher-pdf gbui-body-2 mui--hidden-sm mui--hidden-xs'>
                                                                    <p style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '14px' }}></p>
                                                                    <span><img src="/assets/drive-pdf.svg" alt="drive-pdf" /></span>
                                                                    <a href={`${constants.mediaBucketURL}/${item.policyBrochure}`} target="_blank">
                                                                        <span className='link-mid-b'> Policy Brochure</span></a>
                                                                    <span style={{ color: '#000000' }}> &amp; </span>
                                                                    <a href={`${constants.mediaBucketURL}/${item.policyWording}`} target="_blank">
                                                                        <span className='link-mid-b'> TnC</span>
                                                                    </a>
                                                                </div>
                                                                {item.maternityCoverWaitingTime !== null &&
                                                                    <div className='maternity-cover gbui-body-2'>
                                                                        <span><i class="material-icons" style={{ fontSize: '13px', color: '#0da176' }}>
                                                                            pregnant_woman
                                                                </i></span>Includes maternity cover
                                                            </div>}
                                                            </p>
                                                            <p className="reviews-insurer-quote-car mui--hidden-md mui--hidden-lg mui--hidden-xl">

                                                                {item.maternityCoverWaitingTime !== null &&
                                                                    <div className='maternity-cover gbui-body-2'>
                                                                        <span><i class="material-icons" style={{ fontSize: '13px', color: '#0da176' }}>
                                                                            pregnant_woman
                                                                </i></span>Includes maternity cover
                                                            </div>}
                                                            </p>
                                                        </div>
                                                        <div className="row-insurer-desc-quote-car-div mui--hidden-sm mui--hidden-xs">
                                                            <Row>
                                                                <Col md="3">
                                                                    <p className="heading-h6 grey" style={{ whiteSpace: 'nowrap' }}>Hospitilization Cover</p>
                                                                    <p className="amount-insurer down-padding">₹ {/*3 Lacs*/}{this.convertAmountToLacs(item.sumInsured)} Lacs</p>
                                                                </Col>
                                                                <Col md="3" className="border-left">
                                                                    <p className="heading-h6 grey">You Pay</p>
                                                                    {Object.keys(item.coPay).length === 0 && item.coPay.constructor === Object ?
                                                                        <p className="percentage-insurer down-padding">NA</p>
                                                                        :
                                                                        <div>
                                                                            {Object.keys(item.coPay).map(key =>
                                                                                <p className="percentage-insurer down-padding">{key} of {item.coPay[key]}</p>
                                                                            )}
                                                                        </div>}
                                                                </Col>
                                                                <Col md="3" className="border-left">

                                                                    <p className="garages-insurer" onClick={this.handleNetworkHospitals(item)}>Hospitals near you</p>
                                                                    <p
                                                                        className="number-garage-insurer down-padding-new"
                                                                    >{item.hospitalsNearYou}</p>
                                                                </Col>
                                                                <Col md="3" className="border-left">
                                                                    <table style={{ width: '100%' }}>
                                                                        {!this.state.showDetails[index] ?
                                                                            (<tbody>
                                                                                {item.maternityCoverWaitingTime !== null &&
                                                                                    <tr>
                                                                                        <td>
                                                                                            <p>maternity Cover Waiting Time</p>
                                                                                        </td>
                                                                                        <td>
                                                                                            <p className="success">{item.maternityCoverWaitingTime} </p>
                                                                                        </td>
                                                                                    </tr>}
                                                                                {item.claimSettlements !== null &&
                                                                                    <tr>
                                                                                        <td>
                                                                                            <p>Claim Settlement</p>
                                                                                        </td>
                                                                                        <td>
                                                                                            <p className="success">{item.claimSettlements}</p>
                                                                                        </td>
                                                                                    </tr>}
                                                                            </tbody>) : (
                                                                                <tbody>
                                                                                    {item.maternityCoverWaitingTime !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>maternity Cover Waiting Time</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.maternityCoverWaitingTime} </p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.claimSettlements !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>Claim Settlement</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.claimSettlements}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.preExistingDisease !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>Existing Disease After</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.preExistingDisease}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.roomRentEligibility !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>Room Rent</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.roomRentEligibility}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.noClaimBonus !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>NCB</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.noClaimBonus}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.maxPolicyTerm !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p> Long Policy Option</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p style={{ color: '#000000' }}>{item.maxPolicyTerm} year</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.medicalTestRequired !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>Medical Test Required</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.medicalTestRequired || "NA"}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                </tbody>)
                                                                        }
                                                                    </table>
                                                                    <p className="show-all" onClick={() => this.ShowPolicyList(index)}>{this.state.show ? 'Show less' : 'Show all'}<img src="/assets/ic_keyboard_arrow_down_24px.svg" alt="arrow down" style={{ width: '10px' }} /></p>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="2" xs="3" className="col-buy-plan-quote-motor mui--hidden-sm mui--hidden-xs">
                                                    <Link to={{ pathname: `/proposal-form-health`, state: { insurer: item, rootPath: this.props.location.state && this.props.location.state.previousPath } }} onClick={() => {
                                                        this.props.setCurrentPlan(item);
                                                        this.setDefaultAddonAmount(item);
                                                        localStorage.setItem("currentPlan", JSON.stringify(item))
                                                    }} style={{ textDecoration: 'none' }}>
                                                        <Panel className="panel-car-insurer-plan" >
                                                            <p className="buy-plain"> Buy Plan</p>
                                                            <p className="amount">₹  {item.premium} <span>/ Year</span></p>
                                                        </Panel>
                                                    </Link>
                                                    <p className="plain-details-car-insurer-text mui--hidden-sm mui--hidden-xs">
                                                        <Link to={{ pathname: "/health-quotes", state: { insurer: item, modifyCovers: this.state.modifyCover } }} onClick={() => {
                                                            this.props.setCurrentPlan(item);
                                                            this.setDefaultAddonAmount(item);
                                                            localStorage.setItem("currentPlan", JSON.stringify(item))
                                                        }}>Policy Details</Link>
                                                    </p>
                                                </Col>
                                                <Col md="3" xs="4" className="col-buy-plan-quote-motor mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ padding: '0px', marginLeft: '4px' }}>
                                                    <Link to={{ pathname: `/proposal-form-health`, state: { insurer: item, rootPath: this.props.location.state && this.props.location.state.previousPath } }} onClick={() => {
                                                        this.props.setCurrentPlan(item);
                                                        localStorage.setItem("currentPlan", JSON.stringify(item))
                                                    }} style={{ textDecoration: 'none' }}>
                                                        <Panel className="panel-car-insurer-plan" style={{ padding: '0px 0px 0px 0px', margin: '0px !important' }}>
                                                            <p className="buy-plain" style={{ marginTop: '5px' }}> Buy Plan</p>
                                                            <p className="amount" style={{ marginBottom: '5px' }}>₹  {item.premium} <span>/ Year</span></p>
                                                        </Panel>
                                                    </Link>

                                                </Col>
                                            </Row>
                                            <Row className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ borderBottom: '1px solid rgb(112,112,112, 0.3)', padding: '6px' }}>
                                                <Col xs="4" sm="4">
                                                    <div className='gbui-caption-3' style={{ color: '#808080', textAlign: 'center', marginTop: 5 }}>Hospitilization Cover</div>
                                                    <p className="sm-no-garage-insurer-car-quote">₹ {item.sumInsured}</p>
                                                </Col>
                                                <Col xs="4" sm="4" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                    <div className='gbui-caption-3' style={{ color: '#808080', textAlign: 'center', marginTop: 5 }}>You pay of bill</div>
                                                    {Object.keys(item.coPay).length === 0 && item.coPay.constructor === Object ?
                                                        <p className="sm-no-garage-insurer-car-quote">NA</p>
                                                        :
                                                        <div>
                                                            {Object.keys(item.coPay).map(key =>
                                                                <p className="sm-no-garage-insurer-car-quote">{key} of {item.coPay[key]} yrs</p>
                                                            )}
                                                        </div>}
                                                </Col>
                                                <Col xs="4" sm="4" className="" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                    <div className="sm-garage-text-insurer-car-quote" style={{ textAlign: 'center', marginTop: 5 }}>Hospitals near you</div>
                                                    <p className="sm-no-garage-insurer-car-quote">{item.hospitalsNearYou}</p>
                                                </Col>

                                            </Row>
                                            <Row className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ borderBottom: '1px solid rgb(112,112,112, 0.3)', padding: '6px' }}>
                                                {!this.state.showDetails[index] ? <Col style={{ marginLeft: '-18px', position: 'relative', top: '14px' }}>
                                                    <Col xs="2" sm="2">
                                                        <p className='key_mobile'>Key Details:</p>

                                                    </Col>
                                                    <Col xs="8" sm="8">

                                                        {item.maxPolicyTerm !== null &&
                                                            <div>
                                                                <p className="detail_mobile">{item.claimSettlements !== null && `Claim Settlement`}{item.claimSettlements} Existing Disease After {item.preExistingDisease} & 4 More</p>

                                                            </div>}

                                                    </Col>
                                                    <Col xs="2" sm="2">

                                                        <p onClick={() => this.ShowPolicyList(index)}>{this.state.show ? '' : <img src="/assets/ic_keyboard_arrow_down_24px.svg" alt="arrow down" style={{ width: '10px', marginTop: '-6px', marginLeft: '36px' }} />}</p>

                                                    </Col>
                                                </Col>
                                                    :
                                                    <Col>
                                                        <Col xs="12" sm="12">
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <td><p style={{
                                                                            fontFamily: 'Source Sans Pro',
                                                                            fontSize: '10px', color: '#333333'
                                                                        }}>Key Details:</p></td>
                                                                        <td> <p></p> </td>
                                                                    </tr>
                                                                    {item.maternityCoverWaitingTime !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">maternity Cover Waiting Time</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.maternityCoverWaitingTime} </p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.claimSettlements !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">Claim Settlement</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.claimSettlements}</p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.preExistingDisease !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">Existing Disease After</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.preExistingDisease}</p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.roomRentEligibility !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">Room Rent</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.roomRentEligibility}</p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.noClaimBonus !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">NCB</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.noClaimBonus}</p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.maxPolicyTerm !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left"> Long Policy Option</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right" style={{ color: '#000000' }}>{item.maxPolicyTerm} year</p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.medicalTestRequired !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">Medical Test Required</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.medicalTestRequired || "NA"}</p>
                                                                            </td>
                                                                        </tr>}

                                                                </tbody>
                                                            </table>
                                                        </Col>
                                                    </Col>}
                                                <Col>
                                                    <Col xs="4" sm="4"></Col>
                                                    <Col xs="4" sm="4">
                                                        <p className="show-all" onClick={() => this.ShowPolicyList(index)} style={{
                                                            color: '#ea0b4b', fontFamily: 'Source Sans Pro',
                                                            fontSize: '10px'
                                                        }}> {this.state.show ? <div>show less <img src="/assets/keyboard_arrow_up-24px.svg"
                                                            alt="arrow up" style={{ width: '16px' }} /></div> : ''}</p>
                                                    </Col>
                                                </Col>
                                                <Col>
                                                    <Col xs="4" sm="4"></Col>
                                                    <Col xs="4" sm="4">
                                                        <p className="show-all" onClick={() => this.ShowPolicyList(index)} style={{
                                                            color: '#ea0b4b', fontFamily: 'Source Sans Pro',
                                                            fontSize: '10px'
                                                        }}> {this.state.show ? <div>show less <img src="/assets/ic_keyboard_arrow_down_24px.svg"
                                                            alt="arrow down" style={{ width: '10px' }} /></div> : ''}</p>
                                                    </Col>
                                                    <Col>
                                                    </Col>
                                                </Col>
                                            </Row>
                                            <div className="mui--hidden-lg mui--hidden-md mui--hidden-xl" style={{
                                                display: 'inline-flex', marginLeft: '-12px',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                 {this.state.quotes.base.length > 1 ? 
                                                <FormGroup row classes={{
                                                    root: classes.formGroup1
                                                }}
                                                    style={{ padding: '0px 16px 0px 0px' }}>
                                                    <FormControlLabel
                                                        classes={{
                                                            label: classes.formGroupL
                                                        }}
                                                        control={
                                                            <Checkbox
                                                                checked= {this.state.plansToCompare.findIndex(i => i.insurerPlanId === item.insurerPlanId) !== -1}
                                                                disabled = {this.state.plansToCompare.length === 3 && this.state.plansToCompare.findIndex(i => i.insurerPlanId === item.insurerPlanId) === -1}
                                                                onChange={this.addPlanToCompare(item)}
                                                                value="checkedA"
                                                            />
                                                        }
                                                        label="Add to compare"
                                                    />
                                                </FormGroup>
                                                : null }

                                                <p className='policy_mobile' style={{
                                                    display: 'inline', whiteSpace: 'nowrap', paddingTop: '15px',
                                                    fontSize: '12px', marginRight: '5px', marginLeft: '-10px', fontFamily: 'Source Sans Pro'
                                                }}>
                                                    <span><img src="/assets/drive-pdf.svg" alt="drive-pdf" /></span>
                                                    <a href={`${constants.mediaBucketURL}/${item.policyBrochure}`} target="_blank">
                                                        <span className='link-mid-b'> Policy Brochure</span></a>
                                                    <span style={{ color: '#000000' }}> & </span>
                                                    <a href={`${constants.mediaBucketURL}/${item.policyWording}`} target="_blank">
                                                        <span className='link-mid-b'> TnC</span>
                                                    </a>

                                                </p>
                                                <p className="plain-details-car-insurer-text" style={{ display: 'inline', whiteSpace: 'nowrap', paddingTop: '16px', fontSize: '12px', padding: '16px 0px 0px 26px' }}>
                                                    <Link to={{ pathname: "/health-quotes", state: { insurer: item, modifyCover: this.state.modifyCover } }} onClick={() => { this.props.setCurrentPlan(item) }}
                                                    >Policy Details</Link>
                                                </p>
                                            </div>
                                            <div className="panel-bottom-actions-div mui--hidden-xs mui--hidden-sm">
                                                {item.ribbonData ? item.ribbonData.map(rbn =>
                                                    <p style={{ padding: '6px 6px' }}><img src="/assets/check-copy.svg" alt="checked" width="15" /> &nbsp;{rbn}</p>
                                                ) : ''}
                                                {/* <p style={{ padding: '6px 12px' }}><img src="/assets/checked-symbol-grn.svg" alt="checked" width="15" /> &nbsp;Pick Up & Drop with 6 months repair warranty</p> */}
                                            </div>
                                            <div className="panel-bottom-actions-div mui--visible-xs-block mui--visible-sm-block" style={{ marginTop: '-12px' }}>
                                                {item.ribbonData ? item.ribbonData.map((rbn, index) =>
                                                    index <= 1 ?
                                                        <p style={{ padding: '6px 6px' }}><img src="/assets/check-copy.svg" alt="checked" width="15" /> &nbsp;{rbn}</p> : ''
                                                ) : ''}
                                            </div>
                                        </Panel>)}

                                        {this.state.quotes.topup.length > 0 && <p className="compr-plans-quote-motor">Top Up Plans  <span className="counts-quote-motor">({this.state.quotes.topup.length !== 0 && this.state.quotes.topup.length})</span></p>}
                                        {/* Card-1 */}
                                        {this.state.quotes.topup.map((topups, index) =>
                                            <div>
                                                {topups.map((item, index1) => <Panel>
                                                    {item.map((policy) =>
                                                        policy.showDeductible &&
                                                        <div>
                                                            <Row className="border-sm-row-quote-motor">
                                                                <Col md="2" sm="2" xs="3">
                                                                    <div className="logo-insurer-div-quote-car">
                                                                        {policy.insurerLogo !== null ?
                                                                            <img src={`${constants.mediaBucketURL}/${policy.insurerLogo}`} alt="insurer" className="insurer-image" /> : policy.insurerName}
                                                                      {this.state.quotes.base.length > 1 ? 
                                                                        <FormGroup row className={classNames(classes.formGroup, 'mui--hidden-sm mui--hidden-xs')}>
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                    checked= {this.state.plansToCompare.findIndex(i => i.insurerPlanId === policy.insurerPlanId) !== -1}
                                                                                        disabled = {this.state.plansToCompare.length === 3 && this.state.plansToCompare.findIndex(i => i.insurerPlanId === policy.insurerPlanId) === -1}
                                                                                        onChange={this.addPlanToCompare(policy)}
                                                                                    />
                                                                                }
                                                                                label="Add to compare"
                                                                            />
                                                                        </FormGroup> : null }
                                                                    </div>
                                                                </Col>
                                                                <Col md="8" xs="5" className="col-insurer-desc-quote-motor" style={{ marginRight: '-12px' }}>
                                                                    <div className="insurer-desc-quote-car-div">
                                                                        <div className="plan-name" style={{ position: 'relative' }}>
                                                                            <span className="insurer-desc-quote-car-heading-policy">

                                                                                {policy.planName}</span>

                                                                            <p className="reviews-insurer-quote-car" style={{ position: 'absolute', left: '340px' }}>
                                                                                <div className='broucher-pdf gbui-body-2 mui--hidden-sm mui--hidden-xs'>
                                                                                    <p style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '14px' }}></p>
                                                                                    <span><img src="/assets/drive-pdf.svg" alt="drive-pdf" /></span>
                                                                                    <a href={`${constants.mediaBucketURL}/${policy.policyBrochure}`} target="_blank">
                                                                                        <span className='link-mid-b'> Policy Brochure</span></a>
                                                                                    <span style={{ color: '#000000' }}> & </span>
                                                                                    <a href={`${constants.mediaBucketURL}/${policy.policyWording}`} target="_blank">
                                                                                        <span className='link-mid-b'> TnC</span>
                                                                                    </a>
                                                                                </div>

                                                                            </p>
                                                                            <p className="reviews-insurer-quote-car mui--hidden-md mui--hidden-lg mui--hidden-xl">

                                                                                {item.maternityCoverWaitingTime !== null &&
                                                                                    <div className='maternity-cover gbui-body-2'>
                                                                                        <span><i class="material-icons" style={{ fontSize: '13px', color: '#0da176' }}>
                                                                                            pregnant_woman
                                                                                 </i></span>Includes maternity cover
                                                                                      </div>}
                                                                            </p>
                                                                        </div>

                                                                        <p className="reviews-insurer-quote-car">

                                                                        </p>
                                                                        <div className="row-insurer-desc-quote-car-div mui--hidden-sm mui--hidden-xs">

                                                                            <Row>

                                                                                <Col md="3">
                                                                                    <p className="heading-h6 grey">Hospitilization Cover</p>
                                                                                    <p className="amount-insurer down-padding">₹ {/*3 Lacs*/}{this.convertAmountToLacs(policy.sumInsured)} Lacs</p>
                                                                                </Col>
                                                                                <Col md="3" className="border-left">
                                                                                    <FormControl fullWidth margin="dense" key={policy.insurerId}>
                                                                                        <div>
                                                                                            <p style={{ marginTop: '8px', marginBottom: '10px' }}><span className="heading-h6 grey">Deductibles</span><span
                                                                                                class="field-item tooltipHQ"><i class="material-icons" style={{
                                                                                                    fontSize: '14px', verticalAlign: 'middle', marginLeft: '3px'
                                                                                                }} >help</i>
                                                                                                <span class="tooltiptext">The expenses that are not covered in your policy.</span></span>
                                                                                            </p>
                                                                                            <p style={{ marginTop: '-25px' }}>
                                                                                                <InputLabel
                                                                                                    classes={{
                                                                                                        root: classes.selectRoot,
                                                                                                    }} htmlFor="income"></InputLabel>
                                                                                                <Select
                                                                                                    value={policy.insurerPlanId}
                                                                                                    onChange={this.handleChangeDeductible(index, index1)}
                                                                                                    inputProps={{
                                                                                                        name: 'income',
                                                                                                        id: 'income',
                                                                                                    }}
                                                                                                    classes={{
                                                                                                        root: classes.selectRoot
                                                                                                    }}
                                                                                                >
                                                                                                    {item.map(item => <MenuItem value={item.insurerPlanId} id={item.insurerPlanId}>{this.convertAmountToLacs(item.deductibleAmount)} Lacs</MenuItem>)}
                                                                                                </Select>
                                                                                            </p>
                                                                                        </div>
                                                                                    </FormControl>
                                                                                </Col>
                                                                                <Col md="3" className="border-left">
                                                                                    <p className="garages-insurer" onClick={this.handleNetworkHospitals(policy)}>Hospitals near you</p>
                                                                                    <p
                                                                                        className="number-garage-insurer down-padding-new"
                                                                                    >{policy.hospitalsNearYou}</p>
                                                                                </Col>
                                                                                <Col md="3" className="border-left">
                                                                                    <table style={{ width: '100%' }}>
                                                                                        {!this.state.showDetails[index] ?
                                                                                            (<tbody>
                                                                                                {policy.coPay !== null &&
                                                                                                    <tr>
                                                                                                        <td>
                                                                                                            <p>Co Pay</p>
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            {console.log(policy.coPay, "policyCoPay") &&
                                                                                                                Object.keys(policy.coPay) ? Object.keys(policy.coPay).map(key => {
                                                                                                                    <p className="success">{policy.coPay[key]}</p>
                                                                                                                }) : "NA"}
                                                                                                        </td>
                                                                                                    </tr>}
                                                                                                {policy.maternityCoverWaitingTime !== null &&
                                                                                                    <tr>
                                                                                                        <td>
                                                                                                            <p>maternity Cover Waiting Time</p>
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            <p className="success">{policy.maternityCoverWaitingTime}</p>
                                                                                                        </td>
                                                                                                    </tr>}
                                                                                                {policy.claimSettlements !== null &&
                                                                                                    <tr>
                                                                                                        <td>
                                                                                                            <p>Claim Settlement</p>
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            <p className="success">{policy.claimSettlements}</p>
                                                                                                        </td>
                                                                                                    </tr>}
                                                                                            </tbody>) : (
                                                                                                <tbody>
                                                                                                    {policy.coPay !== null &&
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <p>Co Pay</p>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                {/* {Object.keys(policy.coPay) ? Object.keys(policy.coPay).map(key => {
                                                                                                                    return
                                                                                                                    <p className="success">{policy.coPay[key]}</p>
                                                                                                                }) : "NA"} */}
                                                                                                                {console.log(policy.coPay, "policyCoPay") &&
                                                                                                                Object.keys(policy.coPay) ? Object.keys(policy.coPay).map(key => {
                                                                                                                    <p className="success">{policy.coPay[key]}</p>
                                                                                                                }) : "NA"}
                                                                                                            </td>
                                                                                                        </tr>}
                                                                                                    {policy.maternityCoverWaitingTime !== null &&
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <p>maternity Cover Waiting Time</p>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <p className="success">{policy.maternityCoverWaitingTime}</p>
                                                                                                            </td>
                                                                                                        </tr>}
                                                                                                    {policy.claimSettlements !== null &&
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <p>Claim Settlement</p>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <p className="success">{policy.claimSettlements}</p>
                                                                                                            </td>
                                                                                                        </tr>}
                                                                                                    {policy.preExistingDisease !== null &&
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <p>Existing Disease After</p>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <p className="success">{policy.preExistingDisease}</p>
                                                                                                            </td>
                                                                                                        </tr>}
                                                                                                    {policy.roomRentEligibility !== null &&
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <p>Room Rent</p>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <p className="success">{policy.roomRentEligibility}</p>
                                                                                                            </td>
                                                                                                        </tr>}
                                                                                                    {policy.noClaimBonus !== null &&
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <p>NCB</p>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <p className="success">{policy.noClaimBonus}</p>
                                                                                                            </td>
                                                                                                        </tr>}
                                                                                                    {policy.maxPolicyTerm !== null &&
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <p> Long Policy Option</p>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <p style={{ color: '#000000' }}>{policy.maxPolicyTerm} year</p>
                                                                                                            </td>
                                                                                                        </tr>}
                                                                                                    {policy.medicalTestRequired !== null &&
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <p>Medical Test Required</p>
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <p className="success">{policy.medicalTestRequired}</p>
                                                                                                            </td>
                                                                                                        </tr>}
                                                                                                </tbody>)
                                                                                        }
                                                                                    </table>
                                                                                    <p className="show-all" onClick={() => this.ShowPolicyList(index)}> Show all<img src="/assets/ic_keyboard_arrow_down_24px.svg" alt="arrow down" style={{ width: '10px' }} /></p>
                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col md="2" xs="3" className="col-buy-plan-quote-motor mui--hidden-sm mui--hidden-xs">
                                                                    <Link to={{ pathname: `/proposal-form-health`, state: { insurer: policy } }} onClick={() => {
                                                                        this.props.setCurrentPlan(policy);
                                                                        this.setDefaultAddonAmount(policy);
                                                                        localStorage.setItem("currentPlan", JSON.stringify(policy))
                                                                    }} style={{ textDecoration: 'none' }}>
                                                                        <Panel className="panel-car-insurer-plan">
                                                                            <p className="buy-plain"> Buy Plan</p>
                                                                            <p className="amount">₹  {policy.premium} <span>/ Year</span></p>
                                                                        </Panel>
                                                                    </Link>
                                                                    <p className="plain-details-car-insurer-text mui--hidden-sm mui--hidden-xs">
                                                                        <Link to={{ pathname: "/health-quotes", state: { insurer: policy, modifyCovers: this.state.modifyCover } }} onClick={() => {
                                                                            this.props.setCurrentPlan(policy)
                                                                            localStorage.setItem("currentPlan", JSON.stringify(policy));
                                                                        }}>Policy Details</Link>
                                                                    </p>
                                                                </Col>
                                                                <Col md="3" xs="4" className="col-buy-plan-quote-motor mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ padding: '0px', marginLeft: '4px' }}>
                                                                    <Link to={{ pathname: `/proposal-form-health`, state: { insurer: item, rootPath: this.props.location.state && this.props.location.state.previousPath } }} onClick={() => {
                                                                        this.props.setCurrentPlan(policy);
                                                                        this.setDefaultAddonAmount(policy);
                                                                        localStorage.setItem("currentPlan", JSON.stringify(policy))
                                                                    }} style={{ textDecoration: 'none' }}>
                                                                        <Panel className="panel-car-insurer-plan" style={{
                                                                            padding: '0px 0px 0px 0px',
                                                                            margin: '0px !important'
                                                                        }}>
                                                                            <p className="buy-plain" style={{ marginTop: '5px' }}> Buy Plan</p>
                                                                            <p className="amount" style={{ marginBottom: '5px' }}>₹  {policy.premium} <span>/ Year</span></p>
                                                                        </Panel>
                                                                    </Link>
                                                                </Col>
                                                            </Row>
                                                            <Row className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ borderBottom: '1px solid rgb(112,112,112, 0.3)', padding: '6px' }}>
                                                                <Col xs="4" sm="4">
                                                                    <div className='gbui-caption-3' style={{ color: '#808080', textAlign: 'center', marginTop: 5 }}>Hospitilization Cover</div>
                                                                    <p className="sm-no-garage-insurer-car-quote">₹ {policy.sumInsured}</p>
                                                                </Col>
                                                                <Col xs="4" sm="4" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                                    <div className='gbui-caption-3' style={{ color: '#808080', textAlign: 'center', marginTop: 5 }}>You pay of bill</div>
                                                                    {Object.keys(policy.coPay).length === 0 && policy.coPay.constructor === Object ?
                                                                        <p className="sm-no-garage-insurer-car-quote">NA</p>
                                                                        :
                                                                        <div>
                                                                            {Object.keys(policy.coPay).map(key =>
                                                                                <p className="sm-no-garage-insurer-car-quote">{key} of {policy.coPay[key]} yrs</p>
                                                                            )}
                                                                        </div>}
                                                                </Col>
                                                                <Col xs="4" sm="4" className="" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                                    <div className="sm-garage-text-insurer-car-quote" style={{ textAlign: 'center', marginTop: 5 }}>Hospitals near you</div>
                                                                    <p className="sm-no-garage-insurer-car-quote">{policy.hospitalsNearYou}</p>
                                                                </Col>
                                                            </Row>
                                                            <Row className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ borderBottom: '1px solid rgb(112,112,112, 0.3)', padding: '6px' }}>
                                                                {!this.state.showDetails[index] ? <Col style={{ marginLeft: '-18px', position: 'relative', top: '14px' }}>
                                                                    <Col xs="2" sm="2">
                                                                        <p className='key_mobile'>Key Details:</p>

                                                                    </Col>
                                                                    <Col xs="8" sm="8">

                                                                        {item.maxPolicyTerm !== null &&
                                                                            <div>
                                                                                <p className="detail_mobile">{item.claimSettlements !== null && `Claim Settlement`}{item.claimSettlements} Existing Disease After {item.preExistingDisease} & 4 More</p>

                                                                            </div>}

                                                                    </Col>
                                                                    <Col xs="2" sm="2">

                                                                        <p onClick={() => this.ShowPolicyList(index)}>{this.state.show ? '' : <img src="/assets/ic_keyboard_arrow_down_24px.svg" alt="arrow down" style={{ width: '10px', marginTop: '-6px', marginLeft: '36px' }} />}</p>

                                                                    </Col>
                                                                </Col>
                                                                    :
                                                                    <Col>
                                                                        <Col xs="12" sm="12">
                                                                            <table>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td><p style={{
                                                                                            fontFamily: 'Source Sans Pro',
                                                                                            fontSize: '10px', color: '#333333'
                                                                                        }}>Key details:</p></td>
                                                                                        <td> <p></p> </td>
                                                                                    </tr>
                                                                                    {item.maternityCoverWaitingTime !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p className="mobile_left">maternity Cover Waiting Time</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="mobile_right">{item.maternityCoverWaitingTime} </p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.claimSettlements !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p className="mobile_left">Claim Settlement</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="mobile_right">{item.claimSettlements}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.preExistingDisease !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p className="mobile_left">Existing Disease After</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="mobile_right">{item.preExistingDisease}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.roomRentEligibility !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p className="mobile_left">Room Rent</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="mobile_right">{item.roomRentEligibility}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.noClaimBonus !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p className="mobile_left">NCB</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="mobile_right">{item.noClaimBonus}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.maxPolicyTerm !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p className="mobile_left"> Long Policy Option</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="mobile_right" style={{ color: '#000000' }}>{item.maxPolicyTerm} year</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.medicalTestRequired !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p className="mobile_left">Medical Test Required</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="mobile_right">{item.medicalTestRequired || "NA"}</p>
                                                                                            </td>
                                                                                        </tr>}

                                                                                </tbody>
                                                                            </table>
                                                                        </Col>
                                                                    </Col>}
                                                                <Col>
                                                                    <Col xs="4" sm="4"></Col>
                                                                    <Col xs="4" sm="4">
                                                                        <p className="show-all" onClick={() => this.ShowPolicyList(index)} style={{
                                                                            color: '#ea0b4b', fontFamily: 'Source Sans Pro',
                                                                            fontSize: '10px'
                                                                        }}> {this.state.show ? <div>show less <img src="/assets/keyboard_arrow_up-24px.svg"
                                                                            alt="arrow down" style={{ width: '16px' }} /></div> : ''}</p>
                                                                    </Col>
                                                                    <Col xs="4" sm="4"></Col>
                                                                </Col>
                                                            </Row>
                                                            
                                                            <div className="mui--hidden-lg mui--hidden-md mui--hidden-xl" style={{ display: 'inline-flex', marginLeft: '-12px', whiteSpace: 'nowrap' }}>
                                                            {this.state.quotes.base.length > 1 ? 
                                                                <FormGroup row classes={{
                                                                    root: classes.formGroup1
                                                                }}>
                                                                    <FormControlLabel
                                                                        classes={{
                                                                            label: classes.formGroupL
                                                                        }}
                                                                        control={
                                                                            <Checkbox
                                                                                value="checkedA"
                                                                            />
                                                                        }
                                                                        label="Add to compare"
                                                                    />
                                                                </FormGroup> : null }
                                                                <p className='policy_mobile' style={{
                                                                    display: 'inline', whiteSpace: 'nowrap', paddingTop: '15px',
                                                                    marginRight: '5px', marginLeft: '-10px', fontSize: '12px', fontFamily: 'Source Sans Pro'
                                                                }}>
                                                                    <span><img src="/assets/drive-pdf.svg" alt="drive-pdf" /></span>
                                                                    <a href={`${constants.mediaBucketURL}/${item.policyBrochure}`} target="_blank">
                                                                        <span className='link-mid-b'> Policy Brochure</span></a>
                                                                    <span style={{ color: '#000000' }}> & </span>
                                                                    <a href={`${constants.mediaBucketURL}/${item.policyWording}`} target="_blank">
                                                                        <span className='link-mid-b'> TnC</span>
                                                                    </a>

                                                                </p>
                                                                <p className="plain-details-car-insurer-text" style={{ display: 'inline', whiteSpace: 'nowrap', paddingTop: '16px', fontSize: '12px' }}>
                                                                    <Link to={{ pathname: "/health-quotes", state: { insurer: policy } }} onClick={() => {
                                                                        this.props.setCurrentPlan(policy)
                                                                        localStorage.setItem("currentPlan", JSON.stringify(policy))
                                                                    }}>Policy Details</Link>
                                                                </p>
                                                            </div>
                                                            <div className="panel-bottom-actions-div mui--hidden-xs mui--hidden-sm">
                                                                {policy.ribbonData ? policy.ribbonData.map(rbn =>
                                                                    <p style={{ padding: '6px 6px' }}><img src="/assets/check-copy.svg" alt="checked" width="15" /> &nbsp;{rbn}</p>
                                                                ) : ''}
                                                                {/* <p style={{ padding: '6px 12px' }}><img src="/assets/checked-symbol-grn.svg" alt="checked" width="15" /> &nbsp;Pick Up & Drop with 6 months repair warranty</p> */}
                                                            </div>
                                                            <div className="panel-bottom-actions-div mui--visible-xs-block mui--visible-sm-block" style={{ marginTop: '-12px' }}>
                                                                {policy.ribbonData ? policy.ribbonData.map((rbn, index) =>
                                                                    index <= 1 ?
                                                                        <p style={{ padding: '6px 6px', marginTop: '0px' }}><img src="/assets/check-copy.svg" alt="checked" width="15" /> &nbsp;{rbn}</p> : ''
                                                                ) : ''}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Panel>)}
                                            </div>)}
                                        {this.state.quotes.criticalIllness.length > 0 && <p className="compr-plans-quote-motor">Critical Illness  Plans <span className="counts-quote-motor">({this.state.quotes.criticalIllness.length !== 0 && this.state.quotes.criticalIllness.length})</span></p>}
                                        {/* Card-1 */}
                                        {this.state.quotes.criticalIllness.map((item, index) =>

                                            <Panel>
                                                <Row className="border-sm-row-quote-motor">
                                                    <Col md="2" sm="2" xs="3">
                                                        <div className="logo-insurer-div-quote-car">
                                                            {item.insurerLogo !== null ?
                                                                <img src={`${constants.mediaBucketURL}/${item.insurerLogo}`} alt="insurer" className="insurer-image" /> : item.insurerName}
                                                           {this.state.quotes.base.length > 1 ? 
                                                            <FormGroup row className={classNames(classes.formGroup, 'mui--hidden-sm mui--hidden-xs')}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked= {this.state.plansToCompare.findIndex(i => i.insurerPlanId === item.insurerPlanId) !== -1}
                                                                            disabled = {this.state.plansToCompare.length === 3 && this.state.plansToCompare.findIndex(i => i.insurerPlanId === item.insurerPlanId) === -1}
                                                                            onChange={this.addPlanToCompare(item)}
                                                                        />
                                                                    }
                                                                    label="Add to compare"
                                                                />
                                                            </FormGroup> : null }
                                                        </div>
                                                    </Col>
                                                    <Col md="8" xs="5" className="col-insurer-desc-quote-motor" style={{ marginRight: '-12px' }}>
                                                        <div className="insurer-desc-quote-car-div">
                                                            <div className='plan-name' style={{ position: 'relative' }}>
                                                                <span className="insurer-desc-quote-car-heading-policy">

                                                                    {item.planName}</span>

                                                                <p className="reviews-insurer-quote-car" style={{ position: 'absolute', left: '340px' }}>
                                                                    <div className='broucher-pdf gbui-body-2 mui--hidden-sm mui--hidden-xs'>
                                                                        <p style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '14px' }}></p>
                                                                        <span><img src="/assets/drive-pdf.svg" alt="drive-pdf" /></span>
                                                                        <a href={`${constants.mediaBucketURL}/${item.policyBrochure}`} target="_blank">
                                                                            <span className='link-mid-b'> Policy Brochure</span></a>
                                                                        <span style={{ color: '#000000' }}> & </span>
                                                                        <a href={`${constants.mediaBucketURL}/${item.policyWording}`} target="_blank">
                                                                            <span className='link-mid-b'> TnC</span>
                                                                        </a>
                                                                    </div>
                                                                    {item.maternityCoverWaitingTime !== null ?
                                                                        <div className='maternity-cover gbui-body-2'>
                                                                            <span><i class="material-icons" style={{ fontSize: '13px', color: '#0da176' }}>
                                                                                pregnant_woman
                                                                     </i></span>Includes maternity cover
                                                                 </div> : ''
                                                                    }
                                                                </p>
                                                                <p className="reviews-insurer-quote-car mui--hidden-md mui--hidden-lg mui--hidden-xl">

                                                                    {item.maternityCoverWaitingTime !== null &&
                                                                        <div className='maternity-cover gbui-body-2'>
                                                                            <span><i class="material-icons" style={{ fontSize: '13px', color: '#0da176' }}>
                                                                                pregnant_woman
</i></span>Includes maternity cover
</div>
                                                                    }
                                                                </p>
                                                            </div>

                                                            <p className="reviews-insurer-quote-car">

                                                            </p>
                                                            <div className="row-insurer-desc-quote-car-div mui--hidden-sm mui--hidden-xs" >
                                                                <Row>
                                                                    <Col md="3">
                                                                        <p className="heading-h6 grey" style={{ whiteSpace: 'nowrap' }}>Hospitilization Cover</p>
                                                                        <p className="amount-insurer down-padding">₹ {/*3 Lacs*/}{this.convertAmountToLacs(item.sumInsured)} Lacs</p>
                                                                    </Col>
                                                                    <Col md="3" className="border-left">
                                                                        <p className="heading-h6 grey">You Pay</p>
                                                                        {Object.keys(item.coPay).length === 0 && item.coPay.constructor === Object ?
                                                                            <p className="percentage-insurer down-padding">NA</p>
                                                                            :
                                                                            <div>
                                                                                {Object.keys(item.coPay).map(key =>
                                                                                    <p className="percentage-insurer down-padding">{key} of {item.coPay[key]} yrs</p>
                                                                                )}
                                                                            </div>}
                                                                    </Col>
                                                                    <Col md="3" className="border-left">
                                                                        <p className="garages-insurer" onClick={this.handleNetworkHospitals(item)}>Hospitals near you</p>
                                                                        <p
                                                                            className="number-garage-insurer down-padding-new"
                                                                        >{item.hospitalsNearYou}</p>
                                                                    </Col>
                                                                    <Col md="3" className="border-left">
                                                                        <table style={{ width: '100%' }}>
                                                                            {!this.state.showDetails[index] ?
                                                                                (<tbody>
                                                                                    {item.maternityCoverWaitingTime !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>maternity Cover Waiting Time</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.maternityCoverWaitingTime}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.claimSettlements !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>Claim Settlement</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.claimSettlements}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                </tbody>) : (
                                                                                    <tbody>
                                                                                        {item.maternityCoverWaitingTime !== null &&
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <p>maternity Cover Waiting Time</p>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <p className="success">{item.maternityCoverWaitingTime}</p>
                                                                                                </td>
                                                                                            </tr>}
                                                                                        {item.claimSettlements !== null &&
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <p>Claim Settlement</p>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <p className="success">{item.claimSettlements}</p>
                                                                                                </td>
                                                                                            </tr>}
                                                                                        {item.preExistingDisease !== null &&
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <p>Existing Disease After</p>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <p className="success">{item.preExistingDisease}</p>
                                                                                                </td>
                                                                                            </tr>}
                                                                                        {item.roomRentEligibility !== null &&
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <p>Room Rent</p>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <p className="success">{item.roomRentEligibility}</p>
                                                                                                </td>
                                                                                            </tr>}
                                                                                        {item.noClaimBonus !== null &&
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <p>NCB</p>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <p className="success">{item.noClaimBonus}</p>
                                                                                                </td>
                                                                                            </tr>}
                                                                                        {item.maxPolicyTerm !== null &&
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <p> Long Policy Option</p>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <p style={{ color: '#000000' }}>{item.maxPolicyTerm} Year</p>
                                                                                                </td>
                                                                                            </tr>}
                                                                                        {item.medicalTestRequired !== null &&
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <p>Medical Test Required</p>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <p className="success">{item.medicalTestRequired}</p>
                                                                                                </td>
                                                                                            </tr>}
                                                                                    </tbody>)
                                                                            }
                                                                        </table>
                                                                        <p className="show-all" onClick={() => this.ShowPolicyList(index)}> Show all<img src="/assets/ic_keyboard_arrow_down_24px.svg" alt="arrow down" style={{ width: '10px' }} /></p>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md="2" xs="3" className="col-buy-plan-quote-motor mui--hidden-sm mui--hidden-xs">
                                                        <Link to={{ pathname: `/proposal-form-health`, state: { insurer: item } }} onClick={() => {
                                                            this.props.setCurrentPlan(item);
                                                            this.setDefaultAddonAmount(item);
                                                            localStorage.setItem("currentPlan", JSON.stringify(item))
                                                        }} style={{ textDecoration: 'none' }}>
                                                            <Panel className="panel-car-insurer-plan">
                                                                <p className="buy-plain"> Buy Plan</p>
                                                                <p className="amount">₹ {/*1,143*/} {item.premium} <span>/ Year</span></p>
                                                            </Panel>
                                                        </Link>
                                                        <p className="plain-details-car-insurer-text mui--hidden-sm mui--hidden-xs">
                                                            <Link to={{ pathname: "/health-quotes", state: { insurer: item, modifyCovers: this.state.modifyCover } }} onClick={() => {
                                                                this.props.setCurrentPlan(item);
                                                                localStorage.setItem("currentPlan", JSON.stringify(item))
                                                            }}>Policy Details</Link>
                                                        </p>
                                                    </Col>
                                                    <Col md="3" xs="4" className="col-buy-plan-quote-motor mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ padding: '0px', marginLeft: '4px' }}>
                                                        <Link to={{ pathname: `/proposal-form-health`, state: { insurer: item, rootPath: this.props.location.state && this.props.location.state.previousPath } }} onClick={() => {
                                                            this.props.setCurrentPlan(item);
                                                            this.setDefaultAddonAmount(item);
                                                            localStorage.setItem("currentPlan", JSON.stringify(item))
                                                        }} style={{ textDecoration: 'none' }}>
                                                            <Panel className="panel-car-insurer-plan" style={{
                                                                padding: '0px 0px 0px 0px',
                                                                margin: '0px !important'
                                                            }}>
                                                                <p className="buy-plain" style={{ marginTop: '5px' }}> Buy Plan</p>
                                                                <p className="amount" style={{ marginBottom: '5px' }}>₹  {item.premium} <span>/ Year</span></p>
                                                            </Panel>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                                <Row className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ borderBottom: '1px solid rgb(112,112,112, 0.3)', padding: '6px' }}>
                                                    <Col xs="4" sm="4">
                                                        <div className='gbui-caption-3' style={{ color: '#808080', textAlign: 'center', marginTop: 5 }}>Hospitilization Cover</div>
                                                        <p className="sm-no-garage-insurer-car-quote">₹ {item.sumInsured}</p>
                                                    </Col>
                                                    <Col xs="4" sm="4" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                        <div className='gbui-caption-3' style={{ color: '#808080', textAlign: 'center', marginTop: 5 }}>You pay of bill</div>
                                                        {Object.keys(item.coPay).length === 0 && item.coPay.constructor === Object ?
                                                            <p className="sm-no-garage-insurer-car-quote">NA</p>
                                                            :
                                                            <div>
                                                                {Object.keys(item.coPay).map(key =>
                                                                    <p className="sm-no-garage-insurer-car-quote">{key} of {item.coPay[key]} yrs</p>
                                                                )}
                                                            </div>}
                                                    </Col>
                                                    <Col xs="4" sm="4" className="" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                        <div className="sm-garage-text-insurer-car-quote" style={{ textAlign: 'center', marginTop: 5 }}>Hospitals near you</div>
                                                        <p className="sm-no-garage-insurer-car-quote">{item.hospitalsNearYou}</p>
                                                    </Col>
                                                </Row>
                                                <Row className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ borderBottom: '1px solid rgb(112,112,112, 0.3)', padding: '6px' }}>
                                                    {!this.state.showDetails[index] ? <Col style={{ marginLeft: '-18px', position: 'relative', top: '14px' }}>
                                                        <Col xs="2" sm="2">
                                                            <p className='key_mobile'>Key Details:</p>

                                                        </Col>
                                                        <Col xs="8" sm="8">

                                                            {item.maxPolicyTerm !== null &&
                                                                <div>
                                                                    <p className="detail_mobile">{item.claimSettlements !== null && `Claim Settlement`}{item.claimSettlements} Existing Disease After {item.preExistingDisease} & 4 More</p>

                                                                </div>}

                                                        </Col>
                                                        <Col xs="2" sm="2">

                                                            <p onClick={() => this.ShowPolicyList(index)}>{this.state.show ? '' : <img src="/assets/ic_keyboard_arrow_down_24px.svg" alt="arrow down" style={{ width: '10px', marginTop: '-6px', marginLeft: '36px' }} />}</p>

                                                        </Col>
                                                    </Col>
                                                        :
                                                        <Col>
                                                            <Col xs="12" sm="12">
                                                                <table>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><p style={{
                                                                                fontFamily: 'Source Sans Pro',
                                                                                fontSize: '10px', color: '#333333'
                                                                            }}>Key Details:</p></td>
                                                                            <td> <p></p> </td>
                                                                        </tr>
                                                                        {item.maternityCoverWaitingTime !== null &&
                                                                            <tr>
                                                                                <td>
                                                                                    <p className="mobile_left">maternity Cover Waiting Time</p>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="mobile_right">{item.maternityCoverWaitingTime} </p>
                                                                                </td>
                                                                            </tr>}
                                                                        {item.claimSettlements !== null &&
                                                                            <tr>
                                                                                <td>
                                                                                    <p className="mobile_left">Claim Settlement</p>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="mobile_right">{item.claimSettlements}</p>
                                                                                </td>
                                                                            </tr>}
                                                                        {item.preExistingDisease !== null &&
                                                                            <tr>
                                                                                <td>
                                                                                    <p className="mobile_left">Existing Disease After</p>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="mobile_right">{item.preExistingDisease}</p>
                                                                                </td>
                                                                            </tr>}
                                                                        {item.roomRentEligibility !== null &&
                                                                            <tr>
                                                                                <td>
                                                                                    <p className="mobile_left">Room Rent</p>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="mobile_right">{item.roomRentEligibility}</p>
                                                                                </td>
                                                                            </tr>}
                                                                        {item.noClaimBonus !== null &&
                                                                            <tr>
                                                                                <td>
                                                                                    <p className="mobile_left">NCB</p>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="mobile_right">{item.noClaimBonus}</p>
                                                                                </td>
                                                                            </tr>}
                                                                        {item.maxPolicyTerm !== null &&
                                                                            <tr>
                                                                                <td>
                                                                                    <p className="mobile_left"> Long Policy Option</p>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="mobile_right" style={{ color: '#000000' }}>{item.maxPolicyTerm} year</p>
                                                                                </td>
                                                                            </tr>}
                                                                        {item.medicalTestRequired !== null &&
                                                                            <tr>
                                                                                <td>
                                                                                    <p className="mobile_left">Medical Test Required</p>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="mobile_right">{item.medicalTestRequired || "NA"}</p>
                                                                                </td>
                                                                            </tr>}

                                                                    </tbody>
                                                                </table>
                                                            </Col>
                                                        </Col>}
                                                    <Col>
                                                        <Col xs="4" sm="4"></Col>
                                                        <Col xs="4" sm="4">
                                                            <p className="show-all" onClick={() => this.ShowPolicyList(index)} style={{
                                                                color: '#ea0b4b', fontFamily: 'Source Sans Pro',
                                                                fontSize: '10px'
                                                            }}> {this.state.show ? <div>show less  <img src="/assets/keyboard_arrow_up-24px.svg"
                                                                alt="arrow down" style={{ width: '16px' }} /></div> : ''}</p>
                                                        </Col>
                                                        <Col xs="4" sm="4"></Col>
                                                    </Col>
                                                </Row>
                                                <div className="mui--hidden-lg mui--hidden-md mui--hidden-xl" style={{ display: 'inline-flex', marginLeft: '-12px', whiteSpace: 'nowrap' }}>
                                                {this.state.quotes.base.length > 1 ? 
                                                    <FormGroup row classes={{
                                                        root: classes.formGroup1
                                                    }}>
                                                        <FormControlLabel
                                                            classes={{
                                                                label: classes.formGroupL
                                                            }}
                                                            control={
                                                                <Checkbox
                                                                    value="checkedA"
                                                                />
                                                            }
                                                            label="Add to compare"
                                                        />
                                                    </FormGroup> : null }
                                                    <p className='policy_mobile' style={{
                                                        display: 'inline', whiteSpace: 'nowrap', paddingTop: '15px', marginRight: '5px',
                                                        marginLeft: '-10px', fontSize: '12px', fontFamily: 'Source Sans Pro'
                                                    }}>
                                                        <span><img src="/assets/drive-pdf.svg" alt="drive-pdf" /></span>
                                                        <a href={`${constants.mediaBucketURL}/${item.policyBrochure}`} target="_blank">
                                                            <span className='link-mid-b'> Policy Brochure</span></a>
                                                        <span style={{ color: '#000000' }}> & </span>
                                                        <a href={`${constants.mediaBucketURL}/${item.policyWording}`} target="_blank">
                                                            <span className='link-mid-b'> TnC</span>
                                                        </a>

                                                    </p>
                                                    <p className="plain-details-car-insurer-text" style={{ display: 'inline', whiteSpace: 'nowrap', paddingTop: '16px', fontSize: '12px' }}>
                                                        <Link to={{ pathname: "/health-quotes", state: { insurer: item } }} onClick={() => { this.props.setCurrentPlan(item) }}>Policy Details</Link>
                                                    </p>
                                                </div>
                                                <div className="panel-bottom-actions-div mui--hidden-xs mui--hidden-sm">
                                                    {item.ribbonData ? item.ribbonData.map(rbn =>
                                                        <p style={{ padding: '6px 6px' }}><img src="/assets/check-copy.svg" alt="checked" width="15" /> &nbsp;{rbn}</p>
                                                    ) : ''}
                                                    {/* <p style={{ padding: '6px 12px' }}><img src="/assets/checked-symbol-grn.svg" alt="checked" width="15" /> &nbsp;Pick Up & Drop with 6 months repair warranty</p> */}
                                                </div>
                                                <div className="panel-bottom-actions-div mui--visible-xs-block mui--visible-sm-block" style={{ marginTop: '-12px' }}>
                                                    {item.ribbonData ? item.ribbonData.map((rbn, index) =>
                                                        index <= 1 ?
                                                            <p style={{ padding: '6px 6px', marginTop: '0px' }}><img src="/assets/check-copy.svg" alt="checked" width="15" /> &nbsp;{rbn}</p> : ''
                                                    ) : ''}
                                                </div>
                                            </Panel>)}
                                        {this.state.quotes.hospitalCash.length > 0 && <p className="compr-plans-quote-motor">HospitalCash Plans <span className="counts-quote-motor">(3)</span></p>}
                                        {/* Card-1 */}
                                        {this.state.quotes.hospitalCash.map((item, index) => <Panel>
                                            <Row className="border-sm-row-quote-motor">
                                                <Col md="2" sm="2" xs="3">
                                                    <div className="logo-insurer-div-quote-car">
                                                        {item.insurerLogo !== null ?
                                                            <img src={`${constants.mediaBucketURL}/${item.insurerLogo}`} alt="insurer" className="insurer-image" /> : item.insurerName}
                                                        {this.state.quotes.base.length > 1 ? 
                                                        <FormGroup row className={classNames(classes.formGroup, 'mui--hidden-sm mui--hidden-xs')}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked= {this.state.plansToCompare.findIndex(i => i.insurerPlanId === item.insurerPlanId) !== -1}
                                                                        disabled = {this.state.plansToCompare.length === 3 && this.state.plansToCompare.findIndex(i => i.insurerPlanId === item.insurerPlanId) === -1}
                                                                        onChange={this.addPlanToCompare(item)}
                                                                    />
                                                                }
                                                                label="Add to compare"
                                                            />
                                                        </FormGroup> : null }
                                                    </div>
                                                </Col>
                                                <Col md="7" xs="5" className="col-insurer-desc-quote-motor" style={{ marginRight: '-12px' }}>
                                                    <div className="insurer-desc-quote-car-div">
                                                        <div className="plan-name" style={{ position: 'relative' }}>
                                                            <span className="insurer-desc-quote-car-heading-policy">

                                                                {item.planName}</span>

                                                            <p className="reviews-insurer-quote-car" >
                                                                <div className='broucher-pdf gbui-body-2 mui--hidden-sm mui--hidden-xs' style={{ position: 'absolute', left: '340px' }}>
                                                                    <p style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '14px' }}></p>
                                                                    <span><img src="/assets/drive-pdf.svg" alt="drive-pdf" /></span>
                                                                    <a href={`${constants.mediaBucketURL}/${item.policyBrochure}`} target="_blank">
                                                                        <span className='link-mid-b'> Policy Brochure</span></a>
                                                                    <span style={{ color: '#000000' }}> & </span>
                                                                    <a href={`${constants.mediaBucketURL}/${item.policyWording}`} target="_blank">
                                                                        <span className='link-mid-b'> TnC</span>
                                                                    </a>
                                                                </div>
                                                                {item.maternityCoverWaitingTime !== null &&
                                                                    <div className='maternity-cover gbui-body-2'>
                                                                        <span><i class="material-icons" style={{ fontSize: '13px', color: '#0da176' }}>
                                                                            pregnant_woman
                                                                </i></span>Includes maternity cover
                                                            </div>}
                                                            </p>
                                                            <p className="reviews-insurer-quote-car mui--hidden-md mui--hidden-lg mui--hidden-xl">

                                                                {item.maternityCoverWaitingTime !== null &&
                                                                    <div className='maternity-cover gbui-body-2'>
                                                                        <span><i class="material-icons" style={{ fontSize: '13px', color: '#0da176' }}>
                                                                            pregnant_woman
</i></span>Includes maternity cover
</div>}
                                                            </p>
                                                        </div>



                                                        <p className="reviews-insurer-quote-car">

                                                        </p>
                                                        <div className="row-insurer-desc-quote-car-div mui--hidden-sm mui--hidden-xs">
                                                            <Row>
                                                                <Col md="3">
                                                                    <p className="heading-h6 grey" style={{ whiteSpace: 'nowrap' }}>Hospitilization Cover</p>
                                                                    <p className="amount-insurer down-padding">₹ {/*3 Lacs*/}{this.convertAmountToLacs(item.sumInsured)} Lacs</p>
                                                                </Col>
                                                                <Col md="3" className="border-left">
                                                                    <p className="heading-h6 grey">You Pay</p>
                                                                    {Object.keys(item.coPay).length === 0 && item.coPay.constructor === Object ?
                                                                        <p className="percentage-insurer down-padding">NA</p>
                                                                        :
                                                                        <div>
                                                                            {Object.keys(item.coPay).map(key =>
                                                                                <p className="percentage-insurer down-padding">{key} of {item.coPay[key]} yrs</p>
                                                                            )}
                                                                        </div>}
                                                                </Col>
                                                                <Col md="3" className="border-left">
                                                                    <p className="garages-insurer" onClick={this.handleNetworkHospitals(item)}>Hospitals near you</p>
                                                                    <p
                                                                        className="number-garage-insurer down-padding-new"
                                                                    >{item.hospitalsNearYou}</p>
                                                                </Col>
                                                                <Col md="3" className="border-left">
                                                                    <table style={{ width: '100%' }}>
                                                                        {!this.state.showDetails[index] ?
                                                                            (<tbody>
                                                                                {item.maternityCoverWaitingTime !== null &&
                                                                                    <tr>
                                                                                        <td>
                                                                                            <p>maternity Cover Waiting Time</p>
                                                                                        </td>
                                                                                        <td>
                                                                                            <p className="success">{item.maternityCoverWaitingTime}</p>
                                                                                        </td>
                                                                                    </tr>}
                                                                                {item.claimSettlements !== null &&
                                                                                    <tr>
                                                                                        <td>
                                                                                            <p>Claim Settlement</p>
                                                                                        </td>
                                                                                        <td>
                                                                                            <p className="success">{item.claimSettlements}</p>
                                                                                        </td>
                                                                                    </tr>}
                                                                            </tbody>) : (
                                                                                <tbody>
                                                                                    {item.maternityCoverWaitingTime !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>maternity Cover Waiting Time</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.maternityCoverWaitingTime}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.claimSettlements !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>Claim Settlement</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.claimSettlements}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.preExistingDisease !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>Existing Disease After</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.preExistingDisease}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.roomRentEligibility !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>Room Rent</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.roomRentEligibility}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.roomRentEligibility !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>NCB</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.noClaimBonus}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.maxPolicyTerm !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p> Long Policy Option</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p style={{ color: '#000000' }}>{item.maxPolicyTerm} year</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.maxPolicyTerm !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>Medical Test Required</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.medicalTestRequired}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                </tbody>)
                                                                        }
                                                                    </table>
                                                                    <p className="show-all" onClick={() => this.ShowPolicyList(index)}> Show all<img src="/assets/ic_keyboard_arrow_down_24px.svg" alt="arrow down" style={{ width: '10px' }} /></p>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="2" xs="3" className="col-buy-plan-quote-motor mui--hidden-sm mui--hidden-xs">
                                                    <Link to={{ pathname: `/proposal-form-health`, state: { insurer: item } }} onClick={() => {
                                                        this.props.setCurrentPlan(item);
                                                        this.setDefaultAddonAmount(item);
                                                        localStorage.setItem("currentPlan", JSON.stringify(item))
                                                    }} style={{ textDecoration: 'none' }}>
                                                        <Panel className="panel-car-insurer-plan">
                                                            <p className="buy-plain"> Buy Plan</p>
                                                            <p className="amount">₹ {/*1,143*/} {item.premium} <span>/ Year</span></p>
                                                        </Panel>
                                                    </Link>
                                                    <p className="plain-details-car-insurer-text mui--hidden-sm mui--hidden-xs">
                                                        <Link to={{ pathname: "/health-quotes", state: { insurer: item, modifyCovers: this.state.modifyCover } }} onClick={() => {
                                                            this.props.setCurrentPlan(item);
                                                            localStorage.setItem("currentPlan", JSON.stringify(item))
                                                        }}>Policy Details</Link>
                                                    </p>
                                                </Col>
                                                <Col md="3" xs="4" className="col-buy-plan-quote-motor mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ padding: '0px', marginLeft: '4px' }}>
                                                    <Link to={{ pathname: `/proposal-form-health`, state: { insurer: item, rootPath: this.props.location.state && this.props.location.state.previousPath } }} onClick={() => {
                                                        this.props.setCurrentPlan(item);
                                                        this.setDefaultAddonAmount(item);
                                                        localStorage.setItem("currentPlan", JSON.stringify(item))
                                                    }} style={{ textDecoration: 'none' }}>
                                                        <Panel className="panel-car-insurer-plan" style={{
                                                            padding: '0px 0px 0px 0px',
                                                            margin: '0px !important'
                                                        }}>
                                                            <p className="buy-plain" style={{ marginTop: '5px' }}> Buy Plan</p>
                                                            <p className="amount" style={{ marginBottom: '5px' }}>₹  {item.premium} <span>/ Year</span></p>
                                                        </Panel>
                                                    </Link>

                                                </Col>
                                            </Row>
                                            <Row className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ borderBottom: '1px solid rgb(112,112,112, 0.3)', padding: '6px' }}>
                                                <Col xs="4" sm="4">
                                                    <div className='gbui-caption-3' style={{ color: '#808080', textAlign: 'center', marginTop: 5 }}>Hospitilization Cover</div>
                                                    <p className="sm-no-garage-insurer-car-quote">₹ {item.sumInsured}</p>
                                                </Col>
                                                <Col xs="4" sm="4" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                    <div className='gbui-caption-3' style={{ color: '#808080', textAlign: 'center', marginTop: 5 }}>You pay of bill</div>
                                                    {Object.keys(item.coPay).length === 0 && item.coPay.constructor === Object ?
                                                        <p className="sm-no-garage-insurer-car-quote">NA</p>
                                                        :
                                                        <div>
                                                            {Object.keys(item.coPay).map(key =>
                                                                <p className="sm-no-garage-insurer-car-quote">{key} of {item.coPay[key]} yrs</p>
                                                            )}
                                                        </div>}
                                                </Col>
                                                <Col xs="4" sm="4" className="" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                    <div className="sm-garage-text-insurer-car-quote" style={{ textAlign: 'center', marginTop: 5 }}>Hospitals near you</div>
                                                    <p className="sm-no-garage-insurer-car-quote">{item.hospitalsNearYou}</p>
                                                </Col>
                                            </Row>
                                            <Row className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ borderBottom: '1px solid rgb(112,112,112, 0.3)', padding: '6px' }}>
                                                {!this.state.showDetails[index] ? <Col style={{ marginLeft: '-18px', position: 'relative', top: '14px' }}>
                                                    <Col xs="2" sm="2">
                                                        <p className='key_mobile'>Key Details:</p>

                                                    </Col>
                                                    <Col xs="8" sm="8">

                                                        {item.maxPolicyTerm !== null &&
                                                            <div>
                                                                <p className="detail_mobile">{item.claimSettlements !== null && `Claim Settlement`}{item.claimSettlements} Existing Disease After {item.preExistingDisease} & 4 More</p>

                                                            </div>}

                                                    </Col>
                                                    <Col xs="2" sm="2">

                                                        <p onClick={() => this.ShowPolicyList(index)}>{this.state.show ? '' : <img src="/assets/ic_keyboard_arrow_down_24px.svg" alt="arrow down" style={{ width: '10px', marginTop: '-6px', marginLeft: '36px' }} />}</p>

                                                    </Col>
                                                </Col>
                                                    :
                                                    <Col>
                                                        <Col xs="12" sm="12">
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <td><p style={{
                                                                            fontFamily: 'Source Sans Pro',
                                                                            fontSize: '10px', color: '#333333'
                                                                        }}>Key Details:</p></td>
                                                                        <td> <p></p> </td>
                                                                    </tr>
                                                                    {item.maternityCoverWaitingTime !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">maternity Cover Waiting Time</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.maternityCoverWaitingTime} </p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.claimSettlements !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">Claim Settlement</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.claimSettlements}</p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.preExistingDisease !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">Existing Disease After</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.preExistingDisease}</p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.roomRentEligibility !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">Room Rent</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.roomRentEligibility}</p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.noClaimBonus !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">NCB</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.noClaimBonus}</p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.maxPolicyTerm !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left"> Long Policy Option</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right" style={{ color: '#000000' }}>{item.maxPolicyTerm} year</p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.medicalTestRequired !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">Medical Test Required</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.medicalTestRequired || "NA"}</p>
                                                                            </td>
                                                                        </tr>}

                                                                </tbody>
                                                            </table>
                                                        </Col>
                                                    </Col>}
                                                <Col>
                                                    <Col xs="4" sm="4"></Col>
                                                    <Col xs="4" sm="4">
                                                        <p className="show-all" onClick={() => this.ShowPolicyList(index)} style={{
                                                            color: '#ea0b4b', fontFamily: 'Source Sans Pro',
                                                            fontSize: '10px'
                                                        }}> {this.state.show ? <div>show less<img src="/assets/keyboard_arrow_up-24px.svg"
                                                            alt="arrow down" style={{ width: '16px' }} /></div> : ''}</p>
                                                    </Col>
                                                    <Col xs="4" sm="4"></Col>
                                                </Col>
                                            </Row>
                                            <div className="mui--hidden-lg mui--hidden-md mui--hidden-xl" style={{ display: 'inline-flex', marginLeft: '-12px', whiteSpace: 'nowrap' }}>
                                            {this.state.quotes.base.length > 1 ? 
                                                <FormGroup row classes={{
                                                    root: classes.formGroup1
                                                }}>
                                                    <FormControlLabel
                                                        classes={{
                                                            label: classes.formGroupL
                                                        }}
                                                        control={
                                                            <Checkbox
                                                                value="checkedA"
                                                            />
                                                        }
                                                        label="Add to compare"
                                                    />
                                                </FormGroup> : null }
                                                <p className='policy_mobile' style={{
                                                    display: 'inline', whiteSpace: 'nowrap', paddingTop: '15px', marginRight: '5px',
                                                    marginLeft: '-10px', fontSize: '12px', fontFamily: 'Source Sans Pro'
                                                }}>
                                                    <span><img src="/assets/drive-pdf.svg" alt="drive-pdf" /></span>
                                                    <a href={`${constants.mediaBucketURL}/${item.policyBrochure}`} target="_blank">
                                                        <span className='link-mid-b'> Policy Brochure</span></a>
                                                    <span style={{ color: '#000000' }}> & </span>
                                                    <a href={`${constants.mediaBucketURL}/${item.policyWording}`} target="_blank">
                                                        <span className='link-mid-b'> TnC</span>
                                                    </a>

                                                </p>
                                                <p className="plain-details-car-insurer-text" style={{ display: 'inline', whiteSpace: 'nowrap', paddingTop: '16px', fontSize: '12px' }}>
                                                    <Link to={{ pathname: "/health-quotes", state: { insurer: item } }} onClick={() => { this.props.setCurrentPlan(item) }}>Policy Details</Link>
                                                </p>
                                            </div>
                                            <div className="panel-bottom-actions-div mui--hidden-xs mui--hidden-sm">
                                                {item.ribbonData ? item.ribbonData.map(rbn =>
                                                    <p style={{ padding: '6px 6px' }}><img src="/assets/check-copy.svg" alt="checked" width="15" /> &nbsp;{rbn}</p>
                                                ) : ''}
                                                {/* <p style={{ padding: '6px 12px' }}><img src="/assets/checked-symbol-grn.svg" alt="checked" width="15" /> &nbsp;Pick Up & Drop with 6 months repair warranty</p> */}
                                            </div>
                                            <div className="panel-bottom-actions-div mui--visible-xs-block mui--visible-sm-block" style={{ marginTop: '-12px' }}>
                                                {item.ribbonData ? item.ribbonData.map((rbn, index) =>
                                                    index <= 1 ?
                                                        <p style={{ padding: '6px 6px', marginTop: '0px' }}><img src="/assets/check-copy.svg" alt="checked" width="15" /> &nbsp;{rbn}</p> : ''
                                                ) : ''}
                                            </div>
                                        </Panel>)}
                                        {this.state.quotes.criticalIllnessDiseaseSpecific.length > 0 && <p className="compr-plans-quote-motor">Critical Illness Disease Specific Plans <span className="counts-quote-motor">({this.state.quotes.criticalIllnessDiseaseSpecific.length})</span></p>}
                                        {/* Card-1 */}
                                        {this.state.quotes.criticalIllnessDiseaseSpecific.map((item, index) => <Panel>
                                            <Row className="border-sm-row-quote-motor">
                                                <Col md="2" sm="2" xs="3">
                                                    <div className="logo-insurer-div-quote-car">
                                                        {item.insurerLogo !== null ?
                                                            <img src={`${constants.mediaBucketURL}/${item.insurerLogo}`} alt="insurer" className="insurer-image" /> : item.insurerName}
                                                        {this.state.quotes.base.length > 1 ? 
                                                        <FormGroup row className={classNames(classes.formGroup, 'mui--hidden-sm mui--hidden-xs')}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked= {this.state.plansToCompare.findIndex(i => i.insurerPlanId === item.insurerPlanId) !== -1}
                                                                        disabled = {this.state.plansToCompare.length === 3 && this.state.plansToCompare.findIndex(i => i.insurerPlanId === item.insurerPlanId) === -1}
                                                                        onChange={this.addPlanToCompare(item)}
                                                                    />
                                                                }
                                                                label="Add to compare"
                                                            />
                                                        </FormGroup> : null}
                                                    </div>
                                                </Col>
                                                <Col md="8" xs="5" className="col-insurer-desc-quote-motor" style={{ marginRight: '-12px' }}>
                                                    <div className="insurer-desc-quote-car-div">
                                                        <div className="plan-name" style={{ position: 'relative' }}>
                                                            <span className="insurer-desc-quote-car-heading-policy">

                                                                {item.planName}</span>
                                                            <p className="reviews-insurer-quote-car" style={{ position: 'absolute', left: '340px' }}>
                                                                <div className='broucher-pdf gbui-body-2 mui--hidden-sm mui--hidden-xs'>
                                                                    <p style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '14px' }}></p>
                                                                    <span><img src="/assets/drive-pdf.svg" alt="drive-pdf" /></span>
                                                                    <a href={`${constants.mediaBucketURL}/${item.policyBrochure}`} target="_blank">
                                                                        <span className='link-mid-b'> Policy Brochure</span></a>
                                                                    <span style={{ color: '#000000' }}> & </span>
                                                                    <a href={`${constants.mediaBucketURL}/${item.policyWording}`} target="_blank">
                                                                        <span className='link-mid-b'> TnC</span>
                                                                    </a>
                                                                </div>
                                                                {item.maternityCoverWaitingTime !== null &&
                                                                    <div className='maternity-cover gbui-body-2'>
                                                                        <span><i class="material-icons" style={{ fontSize: '13px', color: '#0da176' }}>
                                                                            pregnant_woman
                                                                </i></span>Includes maternity cover
                                                            </div>}
                                                            </p>
                                                            <p className="reviews-insurer-quote-car mui--hidden-md mui--hidden-lg mui--hidden-xl">

                                                                {item.maternityCoverWaitingTime !== null &&
                                                                    <div className='maternity-cover gbui-body-2'>
                                                                        <span><i class="material-icons" style={{ fontSize: '13px', color: '#0da176' }}>
                                                                            pregnant_woman
</i></span>Includes maternity cover
</div>}
                                                            </p>
                                                        </div>

                                                        <p className="reviews-insurer-quote-car">

                                                        </p>
                                                        <div className="row-insurer-desc-quote-car-div mui--hidden-sm mui--hidden-xs">
                                                            <Row>
                                                                <Col md="3">
                                                                    <p className="heading-h6 grey" style={{ whiteSpace: 'nowrap' }}>Hospitilization Cover</p>
                                                                    <p className="amount-insurer down-padding">₹ {/*3 Lacs*/}{this.convertAmountToLacs(item.sumInsured)} Lacs</p>
                                                                </Col>
                                                                <Col md="3" className="border-left">
                                                                    <p className="heading-h6 grey">You Pay</p>
                                                                    {Object.keys(item.coPay).length === 0 && item.coPay.constructor === Object ?
                                                                        <p className="percentage-insurer down-padding">NA</p>
                                                                        :
                                                                        <div>
                                                                            {Object.keys(item.coPay).map(key =>
                                                                                <p className="percentage-insurer down-padding">{key} of {item.coPay[key]} yrs</p>
                                                                            )}
                                                                        </div>}
                                                                </Col>
                                                                <Col md="3" className="border-left">
                                                                    <p className="garages-insurer" onClick={this.handleNetworkHospitals(item)}>Hospitals near you</p>
                                                                    <p
                                                                        className="number-garage-insurer down-padding-new"
                                                                    >{item.hospitalsNearYou}</p>
                                                                </Col>
                                                                <Col md="3" className="border-left">
                                                                    <table style={{ width: '100%' }}>
                                                                        {!this.state.showDetails[index] ?
                                                                            (<tbody>
                                                                                {item.maternityCoverWaitingTime !== null &&
                                                                                    <tr>
                                                                                        <td>
                                                                                            <p>maternity Cover Waiting Time</p>
                                                                                        </td>
                                                                                        <td>
                                                                                            <p className="success">{item.maternityCoverWaitingTime}</p>
                                                                                        </td>
                                                                                    </tr>}
                                                                                {item.claimSettlements !== null &&
                                                                                    <tr>
                                                                                        <td>
                                                                                            <p>Claim Settlement</p>
                                                                                        </td>
                                                                                        <td>
                                                                                            <p className="success">{item.claimSettlements}</p>
                                                                                        </td>
                                                                                    </tr>}
                                                                            </tbody>) : (
                                                                                <tbody>
                                                                                    {item.maternityCoverWaitingTime !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>maternity Cover Waiting Time</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.maternityCoverWaitingTime}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.claimSettlements !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>Claim Settlement</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.claimSettlements}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.roomRentEligibility !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>Room Rent</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.roomRentEligibility}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.preExistingDisease !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>Existing Disease After</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.preExistingDisease}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.roomRentEligibility !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>NCB</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.noClaimBonus}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.maxPolicyTerm !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p> Long Policy Option</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p style={{ color: '#000000' }}>{item.maxPolicyTerm} year</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                    {item.maxPolicyTerm !== null &&
                                                                                        <tr>
                                                                                            <td>
                                                                                                <p>Medical Test Required</p>
                                                                                            </td>
                                                                                            <td>
                                                                                                <p className="success">{item.medicalTestRequired}</p>
                                                                                            </td>
                                                                                        </tr>}
                                                                                </tbody>)
                                                                        }
                                                                    </table>
                                                                    <p className="show-all" onClick={() => this.ShowPolicyList(index)}> {this.state.show ? 'Show less' : 'Show all'}<img src="/assets/ic_keyboard_arrow_down_24px.svg" alt="arrow down" style={{ width: '10px' }} /></p>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md="2" xs="3" className="col-buy-plan-quote-motor mui--hidden-sm mui--hidden-xs">
                                                    <Link to={{ pathname: `/proposal-form-health`, state: { insurer: item } }} onClick={() => {
                                                        this.props.setCurrentPlan(item);
                                                        this.setDefaultAddonAmount(item);
                                                        localStorage.setItem("currentPlan", JSON.stringify(item))
                                                    }} style={{ textDecoration: 'none' }}>
                                                        <Panel className="panel-car-insurer-plan">
                                                            <p className="buy-plain"> Buy Plan</p>
                                                            <p className="amount">₹ {/*1,143*/} {item.premium} <span>/ Year</span></p>
                                                        </Panel>
                                                    </Link>
                                                    <p className="plain-details-car-insurer-text mui--hidden-sm mui--hidden-xs">
                                                        <Link to={{ pathname: "/health-quotes", state: { insurer: item, modifyCovers: this.state.modifyCover } }} onClick={() => {
                                                            this.props.setCurrentPlan(item);
                                                            localStorage.setItem("currentPlan", JSON.stringify(item));
                                                        }}>Policy Details</Link>
                                                    </p>
                                                </Col>
                                                <Col md="3" xs="4" className="col-buy-plan-quote-motor mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ padding: '0px', marginLeft: '4px' }}>
                                                    <Link to={{ pathname: `/proposal-form-health`, state: { insurer: item, rootPath: this.props.location.state && this.props.location.state.previousPath } }} onClick={() => {
                                                        this.props.setCurrentPlan(item);
                                                        this.setDefaultAddonAmount(item);
                                                        localStorage.setItem("currentPlan", JSON.stringify(item))
                                                    }} style={{ textDecoration: 'none' }}>
                                                        <Panel className="panel-car-insurer-plan" style={{
                                                            padding: '0px 0px 0px 0px',
                                                            margin: '0px !important'
                                                        }}>
                                                            <p className="buy-plain" style={{ marginTop: '5px' }}> Buy Plan</p>
                                                            <p className="amount" style={{ marginTop: '5px' }}>₹  {item.premium} <span>/ Year</span></p>
                                                        </Panel>
                                                    </Link>
                                                </Col>
                                            </Row>
                                            <Row className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ borderBottom: '1px solid rgb(112,112,112, 0.3)', padding: '6px' }}>
                                                <Col xs="4" sm="4">
                                                    <div className='gbui-caption-3' style={{ color: '#808080', textAlign: 'center', marginTop: 5 }}>Hospitilization Cover</div>
                                                    <p className="sm-no-garage-insurer-car-quote">₹ {item.sumInsured}</p>
                                                </Col>
                                                <Col xs="4" sm="4" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                    <div className='gbui-caption-3' style={{ color: '#808080', textAlign: 'center', marginTop: 5 }}>You pay of bill</div>
                                                    {Object.keys(item.coPay).length === 0 && item.coPay.constructor === Object ?
                                                        <p className="sm-no-garage-insurer-car-quote">NA</p>
                                                        :
                                                        <div>
                                                            {Object.keys(item.coPay).map(key =>
                                                                <p className="sm-no-garage-insurer-car-quote">{key} of {item.coPay[key]} yrs</p>
                                                            )}
                                                        </div>}
                                                </Col>
                                                <Col xs="4" sm="4" className="" style={{ borderLeft: '1px solid rgb(112,112,112, 0.3)' }}>
                                                    <div className="sm-garage-text-insurer-car-quote" style={{ textAlign: 'center', marginTop: 5 }}>Hospitals near you</div>
                                                    <p className="sm-no-garage-insurer-car-quote">{item.hospitalsNearYou}</p>
                                                </Col>
                                            </Row>
                                            <Row className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ borderBottom: '1px solid rgb(112,112,112, 0.3)', padding: '6px' }}>
                                                {!this.state.showDetails[index] ? <Col style={{ marginLeft: '-18px', position: 'relative', top: '14px' }}>
                                                    <Col xs="2" sm="2">
                                                        <p className='key_mobile'>Key Details:</p>

                                                    </Col>
                                                    <Col xs="8" sm="8">

                                                        {item.maxPolicyTerm !== null &&
                                                            <div>
                                                                <p className="detail_mobile">{item.claimSettlements !== null && `Claim Settlement`}{item.claimSettlements} Existing Disease After {item.preExistingDisease} & 4 More</p>

                                                            </div>}

                                                    </Col>
                                                    <Col xs="2" sm="2">

                                                        <p onClick={() => this.ShowPolicyList(index)}>{this.state.show ? '' : <img src="/assets/ic_keyboard_arrow_down_24px.svg" alt="arrow down" style={{ width: '10px', marginTop: '-6px', marginLeft: '36px' }} />}</p>

                                                    </Col>
                                                </Col>
                                                    :
                                                    <Col>
                                                        <Col xs="12" sm="12">
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <td><p style={{
                                                                            fontFamily: 'Source Sans Pro',
                                                                            fontSize: '10px', color: '#333333'
                                                                        }}>Key Details:</p></td>
                                                                        <td> <p></p> </td>
                                                                    </tr>
                                                                    {item.maternityCoverWaitingTime !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">maternity Cover Waiting Time</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.maternityCoverWaitingTime} </p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.claimSettlements !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">Claim Settlement</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.claimSettlements}</p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.preExistingDisease !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">Existing Disease After</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.preExistingDisease}</p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.roomRentEligibility !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">Room Rent</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.roomRentEligibility}</p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.noClaimBonus !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">NCB</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.noClaimBonus}</p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.maxPolicyTerm !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left"> Long Policy Option</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right" style={{ color: '#000000' }}>{item.maxPolicyTerm} year</p>
                                                                            </td>
                                                                        </tr>}
                                                                    {item.medicalTestRequired !== null &&
                                                                        <tr>
                                                                            <td>
                                                                                <p className="mobile_left">Medical Test Required</p>
                                                                            </td>
                                                                            <td>
                                                                                <p className="mobile_right">{item.medicalTestRequired || "NA"}</p>
                                                                            </td>
                                                                        </tr>}

                                                                </tbody>
                                                            </table>
                                                        </Col>
                                                    </Col>}
                                                <Col>
                                                    <Col xs="4" sm="4"></Col>
                                                    <Col xs="4" sm="4">
                                                        <p className="show-all" onClick={() => this.ShowPolicyList(index)} style={{
                                                            color: '#ea0b4b', fontFamily: 'Source Sans Pro',
                                                            fontSize: '10px'
                                                        }}> {this.state.show ? <div>show less <img src="/assets/keyboard_arrow_up-24px.svg"
                                                            alt="arrow down" style={{ width: '10px' }} /></div> : ''}</p>
                                                    </Col>
                                                    <Col xs="4" sm="4"></Col>
                                                </Col>
                                            </Row>
                                            <div className="mui--hidden-lg mui--hidden-md mui--hidden-xl" style={{ display: 'inline-flex', marginLeft: '-12px', whiteSpace: 'nowrap' }}>
                                            {this.state.quotes.base.length > 1 ? 
                                                <FormGroup row classes={{
                                                    root: classes.formGroup1
                                                }}>
                                                    <FormControlLabel
                                                        classes={{
                                                            label: classes.formGroupL
                                                        }}
                                                        control={
                                                            <Checkbox
                                                                value="checkedA"
                                                            />
                                                        }
                                                        label="Add to compare"
                                                    />
                                                </FormGroup> : null }
                                                <p className='policy_mobile' style={{
                                                    display: 'inline', whiteSpace: 'nowrap', paddingTop: '15px', marginRight: '5px',
                                                    marginLeft: '-10px', fontSize: '12px', fontFamily: 'Source Sans Pro'
                                                }}>
                                                    <span><img src="/assets/drive-pdf.svg" alt="drive-pdf" /></span>
                                                    <a href={`${constants.mediaBucketURL}/${item.policyBrochure}`} target="_blank">
                                                        <span className='link-mid-b'> Policy Brochure</span></a>
                                                    <span style={{ color: '#000000' }}> & </span>
                                                    <a href={`${constants.mediaBucketURL}/${item.policyWording}`} target="_blank">
                                                        <span className='link-mid-b'> TnC</span>
                                                    </a>

                                                </p>
                                                <p className="plain-details-car-insurer-text" style={{ display: 'inline', whiteSpace: 'nowrap', paddingTop: '16px', fontSize: '12px' }}>
                                                    <Link to={{ pathname: "/health-quotes", state: { insurer: item } }} onClick={() => { this.props.setCurrentPlan(item) }}>Policy Details</Link>
                                                </p>
                                            </div>
                                            <div className="panel-bottom-actions-div mui--hidden-xs mui--hidden-sm">
                                                {item.ribbonData ? item.ribbonData.map(rbn =>
                                                    <p style={{ padding: '6px 6px' }}><img src="/assets/check-copy.svg" alt="checked" width="15" /> &nbsp;{rbn}</p>
                                                ) : ''}
                                                {/* <p style={{ padding: '6px 12px' }}><img src="/assets/checked-symbol-grn.svg" alt="checked" width="15" /> &nbsp;Pick Up & Drop with 6 months repair warranty</p> */}
                                            </div>
                                            <div className="panel-bottom-actions-div mui--visible-xs-block mui--visible-sm-block" style={{ marginTop: '-12px' }}>
                                                {item.ribbonData ? item.ribbonData.map((rbn, index) =>
                                                    index <= 1 ?
                                                        <p style={{ padding: '6px 6px', marginTop: '0px' }}><img src="/assets/check-copy.svg" alt="checked" width="15" />&nbsp;{rbn}</p> : ''
                                                ) : ''}
                                            </div>
                                        </Panel>)}
                                        {this.state.insurere_5 && <Col md={12} className='unable-fetch-row'>
                                            <div className='unable-to-fetch-insurer'>We are unable to fetch quotes from 5 other insurers</div>
                                        </Col>}
                                    </div>}
                            </div><br />
                        </div>

                        {this.state.showNoQuotes && <div>
                            <div style={{ textAlign: 'center', marginTop: '1rem' }} className='no-record-found-image'>
                                <img alt='quotes' src='assets/addMember.svg' />
                            </div>
                            <Col md={12} xs={12}>
                                <div className='no-record-found-text'>No record found</div>
                            </Col>
                            <Col md={12} xs={12}>
                                <div className='unable-to-access-message'>We are unable to generate the quotes with the given information </div>
                            </Col>
                            <Col>
                                <Col md={3} xs={3}>
                                </Col>
                                <Col md={6} xs={6}>
                                    <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '0px 30px' }}>
                                        <Link to='/'><ButtonLightSuccess style={{ display: 'inline' }} Text='Edit Input Details' midWarningPink={true} /></Link>
                                    </div>
                                </Col>
                                <Col md={3} xs={3}>

                                </Col>
                            </Col>
                        </div>}
                        {this.state.plansToCompare.length > 0 && <div className="plansToCompare">
                            <Row>
                                <Col md="2" className="plans_count" style={{ textAlign: 'center' }}>
                                    <p className="no-of-plans-added-text gbui-body-1">{this.state.plansToCompare.length} plans Added</p>
                                </Col>
                                {this.state.plansToCompare.map(item =>
                                    <Col md="2" className="plans_mobile">
                                        <Panel style={{ padding: '5px' }}>
                                            <p
                                                style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', textTransform: 'uppercase', color: '#333333' }}
                                                className="gbui-label-1">{item.insurerName}</p>
                                            <p
                                                style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', textTransform: 'uppercase', color: '#333333' }}
                                                className="gbui-body-3">{item.planName}</p>

                                            <p
                                                style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', textTransform: 'uppercase', color: '#ea0b4b' }}
                                                className="gbui-body-3">{`Rs ${item.premium}/year`}</p>
                                        </Panel>
                                    </Col>
                                )}
                                <Col md="1" className="remove_all" style={{ textAlign: 'center' }}>
                                    <p
                                        className="gbui-label-1"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => { this.setState({ plansToCompare: [] }) }}>Remove All</p>
                                </Col>
                                <Col className="compare_btn" md="1" style={{ textAlign: 'center' }}>
                                    {this.state.plansToCompare.length > 1 && <Link to={{ pathname: "/compare-quotes-health", state: { plans: this.state.plansToCompare, modifyCovers: this.state.modifyCover } }}><ButtonLightSuccess Text="Compare" /></Link>}
                                </Col>
                            </Row>
                        </div>}
                        <Col xs={12} className='mui--visible-xs-block'>
                            {/* <HealthGroupTabs /> */}
                        </Col>
                    </Col>
                    <Col md="3" className="mui--hidden-xs mui--hidden-sm">

                    </Col>
                </Row>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    classes={{
                        paperScrollPaper: classes.paperScroll
                    }}
                    maxWidth="lg"
                    id="dialogEdit"
                    fullScreen={this.state.fullWidth}
                >
                    {window.innerWidth <= 767 &&
                        <div>
                            <p className="edit-details-heading-dialog">
                                Edit Details
                                <img src="/assets/cancel.svg" style={{ float: 'right', verticalAlign: 'middle' }} onClick={() => { this.setState({ open: false }) }} alt="cancel" />
                            </p>
                        </div>
                    }
                    <div className="tabs-input-motor-edit">
                        <p
                            className={this.state.active_step === 1 ? 'active-item' : ''}
                            onClick={() => { this.setState({ active_step: 1 }) }}>
                            Car{window.innerWidth <= 767 ? <br /> : ' '}Details
                            {(this.state.active_step !== 1 && window.innerWidth >= 767) &&
                                <div
                                    className="edit-div"
                                    onClick={() => { this.setState({ active_step: 1 }) }}>
                                    Edit
                                </div>
                            }
                        </p>
                        <p className={this.state.active_step === 2 ? 'active-item' : ''}
                            onClick={() => { this.setState({ active_step: 2 }) }}>
                            Policy{window.innerWidth <= 767 ? <br /> : ' '}Details
                            {(this.state.active_step !== 2 && window.innerWidth >= 767) &&
                                <div
                                    className="edit-div" style={{ left: '440px' }}
                                    onClick={() => { this.setState({ active_step: 2 }) }}>
                                    Edit
                                </div>
                            }
                        </p>
                        <p
                            className={this.state.active_step === 3 ? 'active-item' : ''}
                            onClick={() => { this.setState({ active_step: 3 }) }}>
                            Registration{window.innerWidth <= 767 ? <br /> : ' '}Details
                            {this.state.active_step !== 3 && window.innerWidth >= 767 &&
                                <div
                                    className="edit-div" style={{ left: '779px' }}
                                    onClick={() => { this.setState({ active_step: 3 }) }}>
                                    Edit
                                </div>
                            }
                        </p>
                    </div>
                    <br /><br /><br /><br />
                    <div className="tabs-input-motor-edit-content">

                        {/* Tab-1 */}
                        {this.state.active_step === 1 &&
                            <div className="tab-1-content">
                                <CarDetails />
                                <div className="outlined-button">
                                    <Button className={classNames(classes.buttonEdit)}>Save and Get Quotes</Button>
                                </div>
                            </div>
                        }

                        {/* Tab-2 */}
                        {this.state.active_step === 2 &&
                            <div className="tab-2-content">
                                <PolicyDetails />
                                <div className="outlined-button mtop2">
                                    <Button className={classNames(classes.buttonEdit)}>Save and Get Quotes</Button>
                                </div>
                            </div>
                        }

                        {/* Tab-3 */}
                        {this.state.active_step === 3 &&
                            <div className="tab-3-content">
                                <RegistrationDetails />
                                <div className="outlined-button mtop2">
                                    <Button className={classNames(classes.buttonEdit)}>Save and Get Quotes</Button>
                                </div>
                            </div>
                        }
                    </div>
                </Dialog>


                {/* Additional Cover Dialog */}
                <AdditionCoverDialog
                    open={this.state.openAdditionCover}
                    handleClose={this.handleAdditionClose} />

                {this.state.showNetworkHospitals && <NetworkHospitals
                    open={this.state.showNetworkHospitals}
                    insurer={this.state.currentInsurer}
                    onSelectPathlabView={() => { this.setState({ currentInsurer: {}, showNetworkHospitals: false }) }} />}
            </div>
        )
    }
}

QuoteListMotor.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    inputFormHealthData: state.inputFormHealth.inputFormHealthData,
    healthTab: state.GroupHealthTabs.value,
    currentPlan: state.CurrentPlan
})

const mapDispatchToProps = dispatch => ({
    setCurrentPlan: (plan) => dispatch({ type: 'CURRENT_PLAN', plan }),
    loadInputFormHealth: (data) => dispatch({ type: 'INPUT_FORM_HEALTH', data }),
    onPremiumFetch: (data) => dispatch({ type: 'PREMIUM_DETAILS', data })
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(QuoteListMotor))
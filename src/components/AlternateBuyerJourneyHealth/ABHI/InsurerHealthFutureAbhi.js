import React from 'react'
import './alternate-health-insurer.css'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';
import Chip from '@material-ui/core/Chip';
import * as d3 from "d3";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MenuIconDown from '@material-ui/icons/ArrowDropDown';
import MenuIconUp from '@material-ui/icons/ArrowDropUp'


import constants from '../../../constants/appConstants.json'
import InputHealthChildDialogue from '../../InputHealth/index'
import PremiumBreakup from '../../PremiumBreakupPopUp/index'
import { connect } from 'react-redux';


const styles = theme => ({
    snack:{
        marginTop:'6rem'
    },
    root: {
        padding:'6px',
        color: '#000000',
        '&$checked': {
            color: '#ea0b4b',
        },
    },
    checked: {},
    cssRoot: {
        fontFamily: 'Nunito',
        fontSize: '14px',
        color: 'white',
        fontWeight:600,
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '6px 60px',
        margin: '10px 12px',
        textTransform:'capitalize'
    },
    button: {
        fontFamily: 'Nunito',
        fontSize: '14px',
        textTransform:'capitalize',
        color: '#ffffff',       
        backgroundColor: '#ea0b4b',
        border: '1px solid #ea0b4b',
        border: '1px solid #ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
    },
    contentBtn1: {
        backgroundColor: '#ffffff',
        color: '#ea0b4b',
        fontSize: '14px',
        border: '1px solid #ea0b4b',
        fontFamily: 'Nunito',
        textTransform: 'Capitalize',
        width: '7rem'
    },
    contentBtn2: {
        backgroundColor: '#ffffff',
        color: '#ea0b4b',
        fontSize: '14px',
        border: '1px solid #ea0b4b',
        fontFamily: 'Nunito',
        textTransform: 'Capitalize',
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    paper2: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
        marginBottom: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 12px 2px rgba(51, 51, 51, 0.24)',
    },
    keywordPaper: {
        borderRadius: '4px',
        border: 'solid 1px #ea0b4b',
        backgroundColor: '#ffffff',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    tableCell: {
        padding: '4px 9px 4px 9px',
        fontSize: '16px',
        fontFamily: 'Source Sans Pro',
        borderRight: '2px solid #000000'
    },
    row: {
        '&:nth-of-type(even)': {
            backgroundColor: '#ffffff',
        },
        '&:nth-of-type(even)': {
            backgroundColor: '#f4f4f4',
        },
    },
    chip:{
        backgroundColor:'#808080',
        height:'23px',
        borderRadius:'0px 16px 16px 0px',
        float:'left',
        '&:focus':{
            backgroundColor:'#808080',
        }
    },
    chiplabel:{
        color:'#ffffff',
        fontSize: '10px',
        fontFamily:'Nunito',
    },
    cssLabelN: {
        color: '#aaaaaa',
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        '&$cssFocused': {
            color: '#aaaaaa',
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: '#000000',
        },
    },
    cssUnderlineN: {
        '&:after': {
            borderBottomColor: '#000000',
        },
    },
    tableHeading:{
        fontFamily: 'Source Sans Pro',
        fontSize: '14px',
        textAlign: 'center',
        color: '#000000',
        textAlign:'left',
    },
});
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

let id = 0;
function createData(year1, year2, year3) {
    id += 1;
    return { id, year1, year2, year3 };
}
const rows = [
    createData('Gross written premium- Health', '23,03,068', '5,30,806', ),
    createData('Growth in gross written premium', '3.34', 'NA', ),
    createData('Net incurred claims- Health', '13,41,373', '1,64,910',),
    createData('Assets under management', '3,32,961', '2,53,932',),
    createData('ASM/RSM', '1.67', '2.88',),
];

class InsurerHealth extends React.Component {
    state = {
        feedbackResponse:false,
        openSnack:false,
        pincode:'',
        cashlessHospital:{},
        maternity:false,
        activeStep: 0,
        iconValue: '',
        isInformatonHelpful: '',
        iterate: [0, 0, 0, 0, 0, 0],
        iterate2: [0, 0, 0],
        showAllAbout: true,
        showCarInsurer: false,
        isHelpful: false,
        blogLinks: false,
        keyServicingData: [
            {
                id: 0,
                keyWord: 'Claim Settlement Ratio',
                data: '85.34%',
            },
            {
                id: 1,
                keyWord: 'Claim Rejection Ratio',
                data: '7.70%',
            },
            {
                id: 2,
                keyWord: 'Claim Settlement Time',
                data: '10 Days',
            },
            {
                id: 3,
                keyWord: 'TAT for Endorsement',
                data: '8 Days',
            },
            {
                id: 4,
                keyWord: 'Total Policies Issued',
                data: '75614',
            },
            {
                id: 5,
                keyWord: 'Total Grievances',
                data: '-',
            },

        ],
        options: {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            // xAxis: {
            //     categories: ['Bajaj Allianz Health Insurance', 'Industry Average']
            // },
            // yAxis: {
            //     min: 0,
            //     title: {
            //         text: 'Percentage'
            //     }
            // },
            // tooltip: {
            //     pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            //     shared: true
            // },
            // plotOptions: {
            //     column: {
            //         stacking: 'percent'
            //     }
            // },
            series: [{
                name: '3-month',
                data: [3, 4],
                color: '#ea0b4b'
            }, {
                name: '< 1-3 month',
                data: [2, 2],
                color: '#ea0b4b'
            }, {
                name: '< 1 month',
                data: [5, 3],
                color: '#808080'
            }]
        }
    };


    handleChange = event => {
        this.setState({ isInformatonHelpful: event.target.value });
    };

    handleClick = (item) =>{
        if(item === 'maternity'){
            this.setState({maternity:!this.state.maternity})
        }
    }

    onSubmitFeedback = () => {
        const token = localStorage.getItem("token")
        const params = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }
       const data = {
            answer:this.state.isInformatonHelpful,
        }
        axios.post(`${constants.apiRootURL}/is-this-page-helpful`,data,params)
        .then(response => {
            if (response.status === 200) {
                this.setState({
                  feedbackResponse:true
                })
                setTimeout(() => {
                    this.setState({
                        feedbackResponse:false
                      })                   
                }, 3000);
            }
        }).catch(error => {
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
        })

    }
    
    handleSubmit = () => {
        if(this.state.pincode.length === 6){
            this.props.onSelectPremium(true, 'PREMIUM_BREAKUP')
            axios.get(`${constants.apiRootURL}/network-hospital/444/${this.state.pincode}`)
               .then(response => {
                  
                   this.setState({
                      cashlessHospital:response.data
                   })
               }).catch(error => {
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
               })
        }
    }

    handleChangePin = name => event => {
        this.setState({ [name]: event.target.value });
    };

    // Get Pincode using Geocode...
    getLocation = () => {
        const vm = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${'AIzaSyDzn5koL2GVQnaNLiVRwZdtkheMMmqIIqA'}`)
                    .then(resp => {
                        const results = resp.data.results

                        const pinString = results[0].formatted_address.split(',')[results[0].formatted_address.split(',').length - 2].trim().split(' ')

                        vm.setState({ pincode: pinString[pinString.length - 1] })

                    }).catch(error => {
                        console.error(error)
                    })
            })
        } else {
            alert("Geolocation is not supported by this browser.")
        }
        return true
    }

    handleSelf() {
        // Create Family Details on mobile view directly handling redux values
        const vm = this;
        let familyDetails = [];
        const dss = this.state.diseaseValue;
        const self = true
        if (self) {
            // Go for self
            let age = '';
            let diseases = [];
            vm.props.inputFormDataHealth ? vm.props.inputFormDataHealth.familyDetails.map((item, index) => {
                if (item.member === 'self') {
                    age = item.age
                    diseases = item.diseases
                }
                return true
            }): ''

            if (diseases.length < 1) {
                new Array(5).fill(0, 0).map((i, index) => {

                    return diseases.push({
                        name: dss[index].value,
                        value: false
                    })
                })
            }
            familyDetails.push({
                member: 'self',
                age: age,
                diseases: diseases,
                label: 'Self',
                memberCode: 'S'
            })
        }
        let formData = this.props.inputFormDataHealth ? this.props.inputFormDataHealth : {}
        formData.familyDetails = familyDetails
        formData.formMembers = {
            self: true,
            son: false,
            daughter: false,
            spouse: false,
            mother: false,
            father: false,
            mother_in_law: false,
            father_in_law: false,
        }
        this.props.loadInputFormHealth(formData)
    }

    componentDidMount() {
        if (window.innerWidth > 767) {
            this.setState({ showAllAbout: true, showCarInsurer: true, isHelpful: true, blogLinks: true });
           
        } else {
            this.setState({ showAllAbout: true, showCarInsurer: false, isHelpful: false, blogLinks: false });
           
        }
        /*Here go for charts */
        this.renderChart()
        this.renderCoumnChart()
    }
    renderCoumnChart(){
        const sample = [
            {
              language: '<1 months',
              value: 78.9,
            },
            {
              language: '1-3 months',
              value: 75.1,
            },
            {
              language: '>3 months',
              value: 68.0,
            },
          ];
      
          const svg = d3.select('svg')
        
          const margin = 80;
          const width = 700 - 2 * margin;
          const height = 500 - 2 * margin;
      
          const chart = svg.append('g')
            .attr('transform', `translate(${margin}, ${margin})`);

          const color = d3.scaleOrdinal()
            .range(["#808080","#333333","#ea0b4b"]);
      
          const xScale = d3.scaleBand()
            .range([0, width])
            .domain(sample.map((s) => s.language))
            .padding(0.3)
            
          
          const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, 100]);
            
          
          chart.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

          const barGroups = chart.selectAll()
            .data(sample)
            .enter()
            .append('g')
      
          barGroups
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (g) => xScale(g.language))
            .attr('y', (g) => yScale(g.value))
            .attr('height', (g) => height - yScale(g.value))
            .attr('width', xScale.bandwidth())
            .attr('fill', (d, i) => color(i))

          barGroups 
            .append('text')
            .attr('class', 'value')
            .attr('x', (a) => xScale(a.language) + xScale.bandwidth() /2)
            .attr('y', (a) => yScale(a.value)/2)
            .attr('text-anchor', 'middle')
            .text((a) => `${a.value}%`)  
    }
    renderChart() {
        var data = [
            { name: "Canada", value: 30 },
            { name: "Maxico", value: 10 },
        ];
        var text = "";

        var width = 260;
        var height = 215;
        var thickness = 50;

        var radius = Math.min(width, height) / 2;
        var color = d3.scaleOrdinal()
            .domain(["Abulia", "Betelgeuse",])
            .range(["#ea0b4b", "#808080",]);

        var svg = d3.select("#chart")
            .append('svg')
            .attr('class', 'pie')
            .attr('width', width)
            .attr('height', height);

        var g = svg.append('g')
            .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

        var arc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius);

        var pie = d3.pie()
            .value(function (d) { return d.value; })
            .sort(null);

        var path = g.selectAll('path')
            .data(pie(data))
            .enter()
            .append("g")
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i))
            .each(function (d, i) { this._current = i; });
        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .text(text);
    }
    
    render() {
        const { classes,theme } = this.props;
        return (
            <div className="alternateBuyerJourney">
                <div className="mui-container-fluid">
                <Row className="panel-row-alternate-buyer firstcontainer">
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
                        <Col md="1" lg={1} className='mui--hidden-xs mui--hidden-sm'></Col>
                        <Col md="6" lg={6} className='mui--hidden-xs mui--hidden-sm' id='procceed'>
                            <img src="/assets/family_pic.jpg" alt='alternate-buyer' className="mui--hidden-xs mui--hidden-sm" style={{ width: '100%', height: 'auto' }} />
                        </Col>
                        <Col md="4" lg={4} xs={12} className="health-column-alternate-buyer-from" >
                           <Col md={12} lg={12} className='paper-column-heading' style={{padding:'0px'}}>
                              <div className="main_heading_altrnt_byr_jrny">Get wholesome health cover Never worry again.</div>
                            <Paper square={false} className={classes.paper2} elevation={1}>
                                <div className='heading-card-1 gbui-h5'>Tell us about you</div>
                                <div className='heading-card-2 gbui-menu-bar-1'>You are?</div>
                                <Row>
                                    <Col md={6} xs={6} lg={6}>
                                        {this.state.iconValue === 'M' ?
                                            <div className='male-image'>
                                                <div className='image-border' style={{cursor:'pointer'}} onClick={() => this.setState({ iconValue: 'M' })}><img alt='male' className='male' src='/assets/HomePage/male_selected.svg' /></div>
                                            </div> :
                                            <div className='male-image'>
                                                <div className='image-border' style={{cursor:'pointer'}} onClick={() => this.setState({ iconValue: 'M' })}><img alt='male' className='male' src='/assets/HomePage/male.svg' /></div>
                                            </div>
                                        }
                                    </Col>
                                    <Col md={6} xs={6} lg={6}>
                                        {this.state.iconValue === 'F' ?
                                            <div className='female-image'>
                                                <div className='image-border' style={{cursor:'pointer'}} onClick={() => this.setState({ iconValue: 'F' })}><img alt='female' className='female' src='/assets/HomePage/female_selected.svg' /></div>
                                            </div> :
                                            <div className='female-image'>
                                                <div className='image-border' style={{cursor:'pointer'}} onClick={() => this.setState({ iconValue: 'F' })}><img alt='female' className='female' src='/assets/HomePage/female.svg' /></div>
                                            </div>
                                        }
                                    </Col>
                                </Row>
                                <div className='heading-card-2 gbui-menu-bar-1'>For whom you want to take insurance</div>
                                <Row>
                                    <Col md={6} xs={6} lg={6}>
                                        <div className='card-btn-1' >
                                            <ButtonLightSuccess midPinkContent={true} Text='Self'  
                                               disabled={!this.state.iconValue} onClick={() => this.setState({self:true})}/>
                                        </div>
                                    </Col>
                                    <Col md={6} xs={6} lg={6}>
                                        <div className='card-btn-2'>
                                            <ButtonLightSuccess midPinkContent={true} Text='Add Members' 
                                                disabled={!this.state.iconValue}  
                                                onClick={() => this.setState({members:true})}/>
                                        </div>
                                    </Col>
                                       {/*this.state.self*/ true &&
                                        <InputHealthChildDialogue inputFormOpen={(value) => this.setState({self:value})} open={this.state.self}
                                        gender={this.state.iconValue}   member={true} history={this.props.history}  step={2}/>
                                    }
                                     {/*this.state.members*/ true &&
                                    <InputHealthChildDialogue inputFormOpen={(value) => this.setState({members:value})} open={this.state.members}
                                       gender={this.state.iconValue} history={this.props.history}   />
                                    }
                                </Row>
                            </Paper>
                            </Col>
                        </Col>
                        <Col md="1" lg={1}></Col>
                    </Row>
                    {/* Panels */}
                    <Row className="panel-row-alternate-buyer" style={{backgroundColor:'#ffffff'}}>
                        <Col md="1"></Col>
                        <Col md="7" id='insurer-logo-column'>
                            <div className="panel-alternate-green-div">
                                <div className="panel-alternate-green-div-header" style={{ backgroundColor: '#ea0b4b' }}>
                                    <h3 className="panel-alternate-green-div-header-text">
                                      <div style={{textTransform:'uppercase'}}>Aditya Birla Health Insurance</div>
                                        {!this.state.showAllAbout &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/invalid-name.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '8px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ showAllAbout: !this.state.showAllAbout })} />
                                        }
                                        {this.state.showAllAbout &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/copy-2.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '12px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ showAllAbout: !this.state.showAllAbout })} />
                                        }
                                    </h3>

                                </div>
                                {this.state.showAllAbout &&
                                    <div className="panel-body">
                                        <div className="panel-alternate-green-div-body">
                                            <p className="car_insurance_text_alternate_buyer">
                                                By giving emphasis on proactive health, the Aditya Birla Health Insurance is 
                                                dedicated to bridge the gap in the health insurance industry and fulfill the 
                                                changing needs of the customers.
                                            </p>
                                        </div>
                                        {/* Another body with white background */}
                                        <div className="panel-alternate-green-div-body-2">
                                            <h3 className="car_insurance_heading_alternate_buyer">Aditya Birla Health Insurance Company Overview</h3>
                                            <p className="car_insurance_text_alternate_buyer">
                                                  Aditya Birla Health Insurance is a joint venture between the Aditya Birla 
                                                  Group and MMI Holding Limited. Through digitally integrated and incentivized 
                                                  wellness programs they motivate and help the customers to have a healthier 
                                                  lifestyle. At Aditya Birla, the endeavor is to become a preferred financial 
                                                  services brand choice for all the customers’ needs. They work to become a 
                                                  brand that customers will not only trust but also happily endorse.
                                            </p>
                                        </div>
                                        <div className="panel-alternate-green-div-body">
                                            <h3 className="car_insurance_heading_alternate_buyer">Awards and Recognition</h3>
                                            <p className="car_insurance_text_alternate_buyer">Aditya Birla health insurance has won many awards throughout the years for its work, such as:</p>
                                            <br />
                                            <div className="list-alternate-buyer-health">
                                                <li className='car_insurance_text_alternate_buyer'>
                                                      AON Best Employer Award in 2018
                                                </li>
                                                <li className='car_insurance_text_alternate_buyer'>
                                                     Certificate of Achievement from the Society for Human Resource Management (SHRM) in 2016.
                                                </li>
                                                <li className='car_insurance_text_alternate_buyer'>
                                                      India CSR award for innovation and leadership in 2018
                                                </li>
                                            </div>
                                        </div>
                                        <div className="panel-alternate-green-div-body-2">
                                            <h3 className="car_insurance_heading_alternate_buyer">Financial Highlights</h3>
                                        </div>
                                        <div className="panel-alternate-green-div-body-table">
                                            <Paper className={classes.paper}>
                                                <Table className='table-border'>
                                                    <TableHead>
                                                        <TableRow>
                                                            <CustomTableCell className='tablecell-financial-head mui--hidden-xs mui--hidden-sm'>Particulars </CustomTableCell>
                                                            <CustomTableCell className='tablecell-financial-head' align="center">2017-2018</CustomTableCell>
                                                            <CustomTableCell className='tablecell-financial-head' align="center">2016-2017</CustomTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rows.map(row => (
                                                            <TableRow className={classes.row} key={row.id}>
                                                                <CustomTableCell className='tablecell-financial mui--hidden-xs mui--hidden-sm' component="th" scope="row">
                                                                    {row.year1}
                                                                </CustomTableCell>
                                                                <CustomTableCell className='tablecell-financial-chip' align="center">
                                                                <div className='mui--visible-xs-block chip'>
                                                                    <Chip label={row.year1} classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                </div>
                                                                <div className='upper-div'>
                                                                  {row.year2}
                                                                </div>
                                                                </CustomTableCell>
                                                                <CustomTableCell className='tablecell-financial' align="center">
                                                                <div className='upper-div'>
                                                                  {row.year3}
                                                                </div>
                                                                </CustomTableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </Paper>
                                        </div>
                                        <div className="panel-alternate-green-div-body">
                                            <h3 className="car_insurance_heading_alternate_buyer">Key Servicing Data</h3>
                                            <Row>
                                                {this.state.keyServicingData.map(item =>
                                                    <Col md={4} xs={6}>
                                                        <Paper className={classes.keywordPaper}>
                                                            <div className='keyword gbui-body-1' style={{fontWeight: 600}}>{item.keyWord}</div>
                                                            <div className='data gbui-h4'>{item.data}</div>
                                                        </Paper>
                                                    </Col>
                                                )}
                                                 <Col md={6} xs={12}>
                                                    <Paper className={classes.keywordPaper}>
                                                        <div className='keyword gbui-body-1' style={{fontWeight: 600}}>
                                                            Claim Settlement time after hospitalization</div>
                                                            <div id='layout' className="chart-div-insurer-alternate-motor">
                                                                <div id='container' style={{fontSize:'16px',FontFamily:'Source Sans Pro',color:'#000000'}}>
                                                                   <svg viewBox='0 0 750 500' />
                                                                </div>
                                                            </div>
                                                    </Paper>
                                                </Col>
                                                <Col md={6} xs={12}>
                                                    <Paper className={classes.keywordPaper}>
                                                        <Col md={12} xs={12}>
                                                            <div className='keyword gbui-body-1' style={{fontWeight: 600}}>
                                                            Policy issuance time after payment</div>
                                                        </Col>
                                                        <Col md={7} xs={7}>
                                                           <div id="chart"></div>
                                                        </Col>
                                                        <Col md={5} xs={5}>
                                                          <div className='data gbui-h4' style={{fontWeight: 600,fontFamily:'Source Sans Pro'}}>5 Days</div>
                                                        </Col>
                                                        <Row>
                                                            <Col md={7} xs={7}><div  className='pre-medical-required' style={{float:'right'}}></div>
                                                            </Col>
                                                            <Col md={5} xs={5}>
                                                                <div className='gbui-body-1 subtext' style={{ color: '#ea0b4b'}}>Pre medical required.</div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={7} xs={7}><div className='pre-medical-required' style={{ backgroundColor: '#ea0b4b',float:'right' }}></div>
                                                            </Col>
                                                            <Col md={5} xs={5}>
                                                                <div className='gbui-body-1 subtext' style={{ color: '#ea0b4b' }}>Pre medical not required.</div>
                                                            </Col>
                                                        </Row>
                                                    </Paper>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="panel-alternate-green-div-body-2">
                                            <p className="cashless_hospitals_near_alternate gbui-h6">Cashless hospitals near you</p>
                                            <Row>
                                                <Col md={12}>
                                                    <Col md={3}></Col>
                                                    <Col md={6}>
                                                    <div style={{ paddingLeft: '12px' }}>
                                                            <FormControl required className={classes.margin} margin="dense" fullWidth
                                                               >
                                                                <InputLabel
                                                                    htmlFor="custom-css-input"
                                                                    FormLabelClasses={{
                                                                        root: classes.cssLabelN,
                                                                        focused: classes.cssFocused,
                                                                    }}
                                                                >
                                                                   Your Pincode
                                                                </InputLabel>
                                                                <Input
                                                                    classes={{
                                                                        underline: classes.cssUnderlineN,
                                                                    }}
                                                                    fullWidth
                                                                    name="selfPincode"
                                                                    onChange={this.handleChangePin('pincode')}
                                                                    value={this.state.pincode}
                                                                    endAdornment={<InputAdornment style ={{cursor:'pointer'}} position="end" onClick={this.getLocation}>
                                                                        <i class="material-icons">gps_fixed</i>
                                                                    </InputAdornment>}
                                                                />
                                                            </FormControl>                                                        
                                                        </div>
                                                        <Button className={classes.cssRoot} onClick={this.handleSubmit} fullWidth>Submit</Button>
                                                        <PremiumBreakup closeMethod={(value) => () => {this.setState({ PremiumBreakup: value }) }}  alternateBuyerHealthInsurer={this.state.cashlessHospital}/>
                                                    </Col>
                                                    <Col md={3}></Col>
                                                </Col>
                                                <Col md={12}>
                                                    <h3 className="car_insurance_heading_alternate_buyer">Why to buy health insurance from Aditya Birla Health Insurance?</h3>
                                                    <p className="car_insurance_text_alternate_buyer">
                                                       Aditya Birla Health Insurance offers a variety of unique health insurance benefits to its customers 
                                                       such as Health ReturnsTM, Chronic management program, second E-opinion, etc. ABHI offers you coverage 
                                                       right from day 1 for OPD expenses related to chronic diseases such as Hypertension, Asthma, Diabetes 
                                                       and High Cholesterol. Anchored by an extraordinary force of over 120,000 employees belonging to 42 
                                                       nationalities, the Group is built on a strong foundation of stakeholder value creation.
                                                  </p>
                                                </Col>
                                            </Row>
                                        </div>
                                        
                                        <div className="panel-alternate-green-div-body">
                                            <h3 className="car_insurance_heading_alternate_buyer">Insurer’s Plan</h3>
                                            <p className="car_insurance_text_alternate_buyer" style={{ fontWeight: '600' }}>1. Active Assure Diamond Plan</p>
                                            <p className="car_insurance_text_alternate_buyer" style={{ fontWeight: '600' }}>2. Active Health Enhance Plan</p>
                                            <p className="car_insurance_text_alternate_buyer" style={{ fontWeight: '600' }}>3. Active Secure Cancer Cover</p>
                                            <p className="car_insurance_text_alternate_buyer" style={{ fontWeight: '600' }}>4. Active Secure Critical Illness Cover</p>
                                        </div>

                                        {/* Another body with grey background */}
                                        <div className="panel-alternate-green-div-body-2" style={{textAlign:'center'}} >
                                            <h3 className="alternate-body-2-heading" style={{textAlign:'left'}}>Plan comparisons</h3>
                                            <div className="white-div-alternate-insurer" style={{ backgroundColor: 'white' }}>
                                            {this.state.activeStep === 0 &&
                                                <Row style={{ background: 'white', marginLeft: '12px', marginRight: '12px', border: 'solid 1px rgb(112,112,112, 0.1)' }}>
                                                    <Col lg="3" className="mui--hidden-xs mui--hidden-sm mui--hidden-md"></Col>
                                                    <Col md="4" lg="3" xs="4" sm="4" id='insurer-logo-column'>
                                                        <div className="alternate-insurer-card" style={{ borderLeft: 'none' }}>
                                                            <img alt='alternate-buyer-journey' src="/assets/insurerLogo/ABHI.svg" />
                                                            <p className="compare_motor_logo_text">Active Assure- Diamond Plan</p>
                                                            <Button variant="contained" className={`${classes.button}`}>
                                                                Buy Plan
                                                            </Button>
                                                            {/* <p style={{ paddingTop: '15px', paddingBottom: '15px' }}><Link to="#" className="view_details_link">View Plan Details</Link></p> */}
                                                        </div>
                                                    </Col>
                                                    <Col md="4" lg="3" sm="4" xs="4"  id='insurer-logo-column'>
                                                        <div className="alternate-insurer-card">
                                                            <img alt='alternate-buyer-journey' src="/assets/insurerLogo/ABHI.svg" />
                                                            <p className="compare_motor_logo_text">Active Health- Enhance Plan</p>
                                                            <Button variant="contained" className={`${classes.button} `}>
                                                                Buy Plan
                                                            </Button>
                                                            {/* <p style={{ paddingTop: '15px', paddingBottom: '15px' }}><Link to="#" className="view_details_link">View Plan Details</Link></p> */}
                                                        </div>
                                                    </Col>
                                                    <Col md="4" lg="3" xs="4" sm="4"  id='insurer-logo-column'>
                                                        <div className="alternate-insurer-card">
                                                            <img alt='alternate-buyer-journey' src="/assets/insurerLogo/ABHI.svg" />
                                                            <p className="compare_motor_logo_text">Active Secure-Critical Illness</p>
                                                            <Button variant="contained" className={`${classes.button}`}>
                                                                Buy Plan
                                                            </Button>
                                                            {/* <p style={{ paddingTop: '15px', paddingBottom: '15px' }}><Link to="#" className="view_details_link">View Plan Details</Link></p> */}
                                                        </div>
                                                    </Col>
                                                </Row>}
                                                {this.state.activeStep === 1 &&
                                                <Row style={{ background: 'white', marginLeft: '12px', marginRight: '12px', border: 'solid 1px rgb(112,112,112, 0.1)' }}>
                                                    <Col lg="3" className="mui--hidden-xs mui--hidden-sm mui--hidden-md"></Col>
                                                    <Col md="4" lg="3" sm="4" xs="4"  id='insurer-logo-column'>
                                                        <div className="alternate-insurer-card">
                                                            <img alt='alternate-buyer-journey' src="/assets/insurerLogo/ABHI.svg" />
                                                            <p className="compare_motor_logo_text">Active Health- Enhance Plan</p>
                                                            <Button variant="contained" className={`${classes.button} `}>
                                                                Buy Plan
                                                            </Button>
                                                            {/* <p style={{ paddingTop: '15px', paddingBottom: '15px' }}><Link to="#" className="view_details_link">View Plan Details</Link></p> */}
                                                        </div>
                                                    </Col>
                                                    <Col md="4" lg="3" xs="4" sm="4"  id='insurer-logo-column'>
                                                        <div className="alternate-insurer-card">
                                                            <img alt='alternate-buyer-journey' src="/assets/insurerLogo/ABHI.svg" />
                                                            <p className="compare_motor_logo_text">Active Secure-Critical Illness</p>
                                                            <Button variant="contained" className={`${classes.button}`}>
                                                                Buy Plan
                                                            </Button>
                                                            {/* <p style={{ paddingTop: '15px', paddingBottom: '15px' }}><Link to="#" className="view_details_link">View Plan Details</Link></p> */}
                                                        </div>
                                                    </Col>
                                                    <Col md="4" lg="3" xs="4" sm="4" id='insurer-logo-column'>
                                                        <div className="alternate-insurer-card" style={{ borderLeft: 'none' }}>
                                                            <img alt='alternate-buyer-journey' src="/assets/insurerLogo/ABHI.svg" />
                                                            <p className="compare_motor_logo_text">Active Secure-Cancer Secure Cover</p>
                                                            <Button variant="contained" className={`${classes.button}`}>
                                                                Buy Plan
                                                            </Button>
                                                            {/* <p style={{ paddingTop: '15px', paddingBottom: '15px' }}><Link to="#" className="view_details_link">View Plan Details</Link></p> */}
                                                        </div>
                                                    </Col>
                                                </Row>}
                                                {this.state.activeStep === 0 &&
                                                <div className="table-alternate-buyer-insurer">
                                                    <div className="table-div-alternate-buyer-insurer">
                                                        <div className="imp_details_header">
                                                        <h3 className="header-insurer-key-parameter" style={{ backgroundColor: '#333333' }}>Key Parameters</h3>
                                                        </div>
                                                        <table>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Sum Assured</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Sum Assured" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                        ₹ 2 Lacs
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                        ₹ 2 Lacs
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                <div className='upper-div'>
                                                                        ₹ 1 Lacs
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Policy Term</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Premium Per Lac of Sum Assured" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                       1 Year
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                       1 Year
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                       1 Year
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Medical Test Required</td>
                                                                <td style={{ color: '#ea0b4b' }} className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Medical Test Required" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                       Above 50 yrs
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                   <div style={{color:'#ea0b4b'}}>
                                                                      <div className='upper-div'>
                                                                         Above 50 yrs
                                                                       </div> 
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                   <div style={{color:'#ea0b4b'}}>
                                                                        <div className='upper-div'>
                                                                         Above 50 yrs
                                                                        </div> 
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Room Rent</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Room Rent" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                       1% of Sum Insured per day
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      Shared Room
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                   <div className='upper-div'>
                                                                    NA
                                                                   </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Co-pay</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Co-pay" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                      20% above 60 yrs 
                                                                    </div>
                                                                    
                                                                </td>
                                                                <td className='tabledata'>
                                                                  <div className='upper-div'>
                                                                    NA
                                                                   </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                  <div className='upper-div'>
                                                                    NA
                                                                   </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>No-claim bonus</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="No-claim bonus" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                       10% of SI per annum Max upto 50% of SI
                                                                   </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                   <div className='upper-div'>
                                                                    NA
                                                                   </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                  <div className='upper-div'>
                                                                    NA
                                                                   </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Pre-existing diseases</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Pre-existing diseases" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                      4 yrs
                                                                   </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                   <div className='upper-div'>
                                                                      3 yrs
                                                                   </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                   </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Domiciliary Hospitalisation</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Domiciliary Hospitalisation" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                      Upto 10% of S.I.
                                                                   </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      Continues for at least 3 consecutive days
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                   <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Alternative Treatment</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Alternative Treatment" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Ambulance Cover</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Ambulance Cover" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                      ₹ 1500
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      Actual
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Maternity Cover 
                                                                {!this.state.maternity &&
                                                                    <i   
                                                                       onClick={() => this.setState({maternity:true})} class="material-icons" style={{verticalAlign:'middle',cursor:'pointer'}}>arrow_drop_down
                                                                    </i>}
                                                                    {this.state.maternity &&
                                                                        <i   
                                                                         onClick={() => this.setState({maternity:false})} class="material-icons" style={{verticalAlign:'middle',cursor:'pointer'}}>arrow_drop_up
                                                                        </i>
                                                                }
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Maternity Cover" classes={{root:classes.chip,label:classes.chiplabel}}
                                                                         onDelete={() => this.handleClick('maternity')}
                                                                         clickable
                                                                         deleteIcon= {
                                                                             this.state.maternity ?
                                                                               <MenuIconUp 
                                                                                   style={{color:'#ffffff',verticalAlign:'middle'}}/>:
                                                                               <MenuIconDown
                                                                               style={{color:'#ffffff',verticalAlign:'middle'}}/>
                                                                            }   
                                                                        /> 
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                       Normal Delivery- ₹75000
                                                                    </div>
                                                                   {this.state.maternity && 
                                                                        <div className='upper-div'>
                                                                            LSCS (caesarian)- ₹100000
                                                                        </div>
                                                                    }
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>

                                                    </div>
                                                </div>}
                                                {this.state.activeStep === 1 &&
                                                <div className="table-alternate-buyer-insurer">
                                                    <div className="table-div-alternate-buyer-insurer">
                                                        <div className="imp_details_header">
                                                            <h3 className="header-insurer-key-parameter" style={{ backgroundColor: '#333333' }}>Key Parameters</h3>
                                                        </div>
                                                        <table>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Sum Assured</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Sum Assured" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                      ₹ 2 Lacs
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                <div className='upper-div'>
                                                                      ₹ 1 Lac
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      ₹ 5 Lacs
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Policy Term</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Premium Per Lac of Sum Assured" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                       1 Year
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                   <div className='upper-div'>
                                                                       1 Year
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                       1 Year
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Medical Test Required</td>
                                                                <td style={{ color: '#ea0b4b' }} className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Medical Test Required" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                       1 Year
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                       Above 45 yrs
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                       Above 45 yrs
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Room Rent</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Room Rent" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                      Shared Room
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Co-pay</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Co-pay" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>No-claim bonus</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="No-claim bonus" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Pre-existing diseases</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Pre-existing diseases" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                       3 yrs
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                   <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Domiciliary Hospitalisation</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Domiciliary Hospitalisation" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                      Continues for at least 3 consecutive days
                                                                    </div>                                                                    
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Alternative Treatment</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Alternative Treatment" classes={{root:classes.chip,label:classes.chiplabel}} 
                                                                         onDelete={() => this.handleClick('maternity')}
                                                                         clickable
                                                                         deleteIcon= {
                                                                             this.state.treatment ?
                                                                               <MenuIconUp 
                                                                                   style={{color:'#ffffff',verticalAlign:'middle'}}/>:
                                                                               <MenuIconDown
                                                                               style={{color:'#ffffff',verticalAlign:'middle'}}/>
                                                                            }   
                                                                      />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Ambulance Cover</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Ambulance Cover" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                      Actual
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Maternity Cover
                                                                   {!this.state.maternity &&
                                                                        <i   
                                                                        onClick={() => this.setState({maternity:true})} class="material-icons" style={{verticalAlign:'middle',cursor:'pointer'}}>arrow_drop_down
                                                                        </i>}
                                                                    {this.state.maternity &&
                                                                        <i   
                                                                         onClick={() => this.setState({maternity:false})} class="material-icons" style={{verticalAlign:'middle',cursor:'pointer'}}>arrow_drop_up
                                                                        </i>
                                                                    }
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Maternity Cover" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                      Normal Delivery- ₹75000
                                                                    </div>
                                                                    {this.state.maternity &&  
                                                                    <div className='upper-div'>
                                                                       LSCS (caesarian)- ₹100000
                                                                    </div>}
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      NA
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>

                                                    </div>
                                                </div>}
                                            </div>
                                            <div className='points' onClick={() => this.setState({activeStep:0})} style={{cursor:'pointer'}}></div>
                                            <div className='points' onClick={() => this.setState({activeStep:1})} style={{cursor:'pointer'}}></div>
                                        </div>
                                        <div className="panel-alternate-green-div-body-2" style={{ background: '#f4f4f4' }}>
                                            <h3 className="benefits car-insurance-alternate-body-2-heading">What is covered under Aditya Birla Health Insurance cover?</h3>
                                            <p className="benefits gbui-menu-bar-2">The benefits that are covered under the Aditya Birla Health Insurance company are:</p>
                                            <p className="benefits gbui-menu-bar-2">1. 	Premiums are as low as Rs12/day for coverage of Rs.4 Lakhs.</p>
                                            <p className="benefits gbui-menu-bar-2">2. 	10,000+ network hospitals for cashless treatment.</p>
                                            <p className="benefits gbui-menu-bar-2">3. 	Additional benefits such as Wellness Coach, Health ReturnsTM, etc.</p>
                                            <p className="benefits gbui-menu-bar-2">4. 	Rewards to the customers for maintaining a healthy lifestyle.</p>
                                            <p className="benefits gbui-menu-bar-2">5. 	Family Floater benefit in most of the insurance plans.</p>
                                            <p className="benefits gbui-menu-bar-2">6. 	Plenty of add-on covers to enhance the overall protection for the customers.</p>
                                        </div>
                                        {/* Calculating your premium online */}
                                        <div className="panel-alternate-green-div-body-2" style={{ background: '#ffffff' }}>
                                            <h3 style={{ textAlign: 'center' }} className="car-insurance-alternate-body-2-heading">Insurer Contact Information</h3>
                                            <Row>
                                                <Col md="12" sm="12" xs="12">
                                                    <p style={{textAlign:'center',color:'#333333'}} className='gbui-menu-bar-2'>
                                                        Corporate Address
                                                    </p>
                                                    <p style={{textAlign:'center',color:'#333333'}} className='gbui-menu-bar-2'>
                                                       Aditya Birla Health insurance Co. Limited
                                                    </p>
                                                    <p style={{textAlign:'center',color:'#333333'}} className='gbui-menu-bar-2'>
                                                       10th Floor, R-Tech, Nirlon IT park, Western Express Highway,
                                                    </p>
                                                    <p style={{textAlign:'center',color:'#333333'}} className='gbui-menu-bar-2'>
                                                       Goregaon East, Mumbai - 400063
                                                    </p>
                                                    <p style={{textAlign:'center',color:'#333333'}} className='gbui-menu-bar-2'>
                                                       Call- 1800 103 1033
                                                    </p>
                                                    <p style={{textAlign:'center',color:'#333333'}} className='gbui-menu-bar-2'>
                                                       Mail- customercare.abh@adityabirla.com
                                                    </p>
                                                    <p style={{textAlign:'center',color:'#333333'}} className='gbui-menu-bar-2'>
                                                       Website- www.healthinsurance.adityabirlahealth.com 
                                                    </p>
                                                </Col>
                                            </Row>
                                            <div style={{ textAlign: 'center' }}  onClick={() => {
                                                window.scrollTo({ left: 0, top: document.getElementById('procceed').offsetTop - 30, behavior: 'smooth' })
                                            }}>
                                                <Button className={classNames(classes.cssRoot)}>Proceed to Buy</Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </Col>
                        <Col md="3" className='mui--hidden-xs mui--hidden-sm'>
                            <div className="panel-alternate-green-div">
                                <div className="panel-alternate-green-div-header">
                                    <h3 className="panel-alternate-green-div-header-text" style={{fontSize:'18px'}}>
                                        Insurers with us
                                        {!this.state.showCarInsurer &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/invalid-name.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '8px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ showCarInsurer: !this.state.showCarInsurer })} />
                                        }
                                        {this.state.showCarInsurer &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/copy-2.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '12px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ showCarInsurer: !this.state.showCarInsurer })} />
                                        }
                                    </h3>
                                </div>
                                {this.state.showCarInsurer && <div className="panel-alternate-green-div-body panel-alternate-green-div-body-img alt='alternate-buyer-journey'" style={{ background: '#ffffff' }}>
                                    <div><img alt='alternate-buyer-journey' src='/assets/insurerLogo/sbi-logo.svg' className='big-image' /></div>
                                    <div><img alt='alternate-buyer-journey' src='/assets/insurerLogo/religare-insurer.png' className='big-image' /><br /></div>
                                    <div><img alt='alternate-buyer-journey' src='/assets/insurerLogo/future-generally-logo.png'/><br /></div>
                                    <div><img alt='alternate-buyer-journey' src='/assets/insurerLogo/hdfc-logo.png' /></div>
                                    <div><img alt='alternate-buyer-journey' src='/assets/insurerLogo/abhi-logo.png'/><br /></div>
                                </div>}
                            </div>
                            {localStorage.getItem("token") !== null &&
                            <div className="panel-alternate-green-div" style={{ marginTop: '20px' }}>
                                <div className="panel-alternate-green-div-header">
                                    <h3 className="panel-alternate-green-div-header-text" style={{fontSize:'18px'}}>
                                        Is this page helpful?
                                        {!this.state.isHelpful &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/invalid-name.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '8px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ isHelpful: !this.state.isHelpful })} />
                                        }
                                        {this.state.isHelpful &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/copy-2.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '12px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ isHelpful: !this.state.isHelpful })} />
                                        }
                                    </h3>
                                </div>
                                {this.state.isHelpful && <div className="panel-alternate-green-div-body" style={{ background: '#ffffff' }}>
                                    <RadioGroup
                                        aria-label="isInformatonHelpful"
                                        name="isInformatonHelpful"
                                        className={classes.group}
                                        value={this.state.isInformatonHelpful}
                                        onChange={this.handleChange}

                                    >
                                        <FormControlLabel value="Yes" control={<Radio classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }} />} label="Yes" />
                                        <FormControlLabel value="No" control={<Radio classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }} />} label="No" />
                                        <FormControlLabel value="You already knew this information" control={<Radio classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }} />} label="You already knew this information" />

                                    </RadioGroup>
                                    <div style={{ textAlign: 'center' }}>
                                        <Button className={classNames(classes.cssRoot)} onClick={this.onSubmitFeedback}>Submit</Button>
                                        {this.state.feedbackResponse &&
                                        <div className='gbui-button-1' style={{ color: '#ea0b4b' }}>Your feedback submitted Successfully</div>}
                                    </div>

                                </div>}
                            </div>}
                            <div className="panel-alternate-green-div" style={{ marginTop: '20px' }}>
                                <div className="panel-alternate-green-div-header">
                                    <h3 className="panel-alternate-green-div-header-text" style={{fontSize:'18px'}}>
                                          Blog  
                                        {!this.state.blogLinks &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/invalid-name.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '8px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ blogLinks: !this.state.blogLinks })} />
                                        }
                                        {this.state.blogLinks &&
                                            <img alt='alternate-buyer-journey'
                                                src="/assets/copy-2.svg"
                                                className="mui--hidden-md mui--hidden-lg mui--hidden-xl"
                                                style={{ float: 'right', paddingTop: '12px', cursor: 'pointer' }}
                                                onClick={() => this.setState({ blogLinks: !this.state.blogLinks })} />
                                        }
                                    </h3>
                                </div>
                                {this.state.blogLinks && <div className="panel-alternate-green-div-body" style={{ background: '#ffffff' }}>
                                <a target='_blank' href ='http://blog.groupbima.com/index.php/2019/04/02/health-insurance-regulations-issued-by-irdai-in-2016/'><p className="blog_link_alternate_journey">Health Insurance Regulations issued by IRDAI in 2016</p></a>
                                    <a target='_blank' href ='http://blog.groupbima.com/index.php/2019/03/21/top-reasons-to-have-a-health-insurance-policy/'><p className="blog_link_alternate_journey">Top reasons to have a health insurance policy?</p></a>
                                    <a target='_blank' href ='http://blog.groupbima.com/index.php/2019/04/02/how-does-health-insurance-work/'><p className="blog_link_alternate_journey">How does Health Insurance work?</p></a>
                                    <a target='_blank'  href ='http://blog.groupbima.com/index.php/2019/03/21/learn-all-about-no-claim-bonus/'><p className="blog_link_alternate_journey">Learn all about No-Claim Bonus</p></a>
                                    <a target='_blank' href ='http://blog.groupbima.com/index.php/2019/03/30/what-groupbima-stands-for/'><p className="blog_link_alternate_journey">What GroupBima stands for?</p></a>
                                    {/* <div style={{ textAlign: 'center' }}>
                                        <Button className={classNames(classes.cssRoot)}>View More</Button>
                                    </div> */}
                                </div>}
                            </div>
                        </Col>
                        <Col md="1"></Col>
                    </Row>
                    <br />
                </div>
            </div>
        )
    }
}

InsurerHealth.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        premiumBreakup: state.popup.premium_breakup_modal,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectPremium: (premium, model_id) => dispatch({ type: 'PREMIUM_BREAKUP_MODAL', premium, model_id }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles ,{ withTheme: true })(InsurerHealth))



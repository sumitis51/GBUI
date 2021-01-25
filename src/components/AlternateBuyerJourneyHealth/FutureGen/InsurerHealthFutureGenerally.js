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
import * as d3 from "d3";
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios';
import constants from '../../../constants/appConstants.json'
import Snackbar from '@material-ui/core/Snackbar';
import MenuIconDown from '@material-ui/icons/ArrowDropDown';
import MenuIconUp from '@material-ui/icons/ArrowDropUp'

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
        margin: '10px 0px',
        textTransform:'capitalize'
    },
    button: {
        padding:'6px 15px',
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
    keywordPaper: {
        borderRadius: '4px',
        border: 'solid 1px #ea0b4b',
        backgroundColor: '#ffffff',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
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
        height:'20px',
        borderRadius:'0px 16px 16px 0px',
        float:'left',
        '&:focus':{
            backgroundColor:'#808080',
        }
    },
    chiplabel:{
        color:'#ffffff',
        fontSize: '10px',
        FontFamily: 'Nunito',
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
function createData(year1, year2, year3, year4, year5, year6) {
    id += 1;
    return { id, year1, year2, year3, year4, year5, year6 };
}
const rows = [
    createData('Gross written premium- Health', '33,767', '20,815', '16,117', '15,582', '18,255'),
    createData('Growth in gross written premium', '0.62', '0.29', '0.034', '0.15', '0.097'),
    createData('Net incurred claims- Health', '22,403', '13,759', '12,282', '11,345', '12,218'),
    createData('Assets under management', '3,00,429', '255,145', '204,528', '204,901', '145,304'),
    createData('ASM/RSM', '1.69', '1.72', '1.54', '1.66', '1.62'),
];

class InsurerHealth extends React.Component {
    state = {
        feedbackResponse:false,
        openSnack:false,
        cashlessHospital:{},
        maternity:false,
        treatment:false,
        diseases:false,
        copay:false,
        self:false,
        members:false,
        pincode:'',
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
                data: '91.98%',
            },
            {
                id: 1,
                keyWord: 'Claim Rejection Ratio',
                data: '15.84%',
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
                data: '12345',
            },
            {
                id: 5,
                keyWord: 'Total Grievances',
                data: '96',
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

    handleClick = (item) =>{
        if(item === 'copay'){
            this.setState({copay:!this.state.copay})
        }
        if(item === 'diseases'){
            this.setState({diseases:!this.state.diseases})
        }
        if(item === 'treatment'){
            this.setState({treatment:!this.state.treatment})
        }
        if(item === 'maternity'){
            this.setState({maternity:!this.state.maternity})
        }
    }


    handleChange = event => {
        this.setState({ isInformatonHelpful: event.target.value });
    };

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
        const { classes } = this.props;
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
                           <Col md={12} lg={12} xs={12} className='paper-column-heading' style={{padding:'0px'}}>
                              <div className="main_heading_altrnt_byr_jrny">Get wholesome health cover Never worry again.</div>
                            <Paper square={false} className='paper2' elevation={1}>
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
                                <Row style={{margin:'0px'}}>
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
                                    <div style={{textTransform:'uppercase'}}>Future Generali</div>
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
                                            {/* <h3 className="car_insurance_heading_alternate_buyer">Future Generali</h3> */}
                                            <p className="car_insurance_text_alternate_buyer">
                                                Future Generali provides a comprehensive solution for customers and enterprises through retail,
                                                personal, commercial and rural insurance products to its customers. It believes in delivering
                                                relevant and accessible insurance solutions.
                                            </p>
                                        </div>
                                        {/* Another body with white background */}
                                        <div className="panel-alternate-green-div-body-2">
                                            <h3 className="car_insurance_heading_alternate_buyer">Future Generali Company Overview</h3>
                                            <p className="car_insurance_text_alternate_buyer">
                                                Future Generali India Insurance is a joint venture between the Future Group - and Generali
                                                Group. Future Generali has been aptly benefitting from the Indian expertise and network of
                                                Future Group and the global insurance insight in diverse product classes of Generali Group.
                                                Their competitive edge, extensive range of general insurance products, wide network, claim
                                                servicing capabilities and the ability to provide all possible general insurance solutions
                                                under one roof, makes them the most preferred partner for their customers.
                                            </p>
                                        </div>
                                        <div className="panel-alternate-green-div-body">
                                            <h3 className="car_insurance_heading_alternate_buyer">Awards and Recognition</h3>
                                            <p className="car_insurance_text_alternate_buyer">Future Generali health insurance has won many awards throughout the years for its work, such as:</p>
                                            <br />
                                            <div className="list-alternate-buyer-health">
                                                <li className='car_insurance_text_alternate_buyer'>
                                                    Best Product Launch PR Campaign of the Year at the Kamikaze Corporate Communication & PR Leadership Summit 2019
                                                    </li>
                                                <li className='car_insurance_text_alternate_buyer'>
                                                    ET Now Sales Champion Award in 2018
                                                    </li>
                                                <li className='car_insurance_text_alternate_buyer'>
                                                    Golden Star Awards - Claims Service Leader
                                                    </li>
                                                <li className='car_insurance_text_alternate_buyer'>
                                                    Golden Star Awards - Best Product Innovation
                                                    </li>
                                                <li className='car_insurance_text_alternate_buyer'>
                                                    Customer Experience Awards 2018
                                                    </li>
                                                <li className='car_insurance_text_alternate_buyer'>
                                                    Most policyholder & broker friendly insurer 2017 – IBAI
                                                    </li>
                                                <li className='car_insurance_text_alternate_buyer'>
                                                    People Capital Index 2017
                                                    </li>
                                                <li className='car_insurance_text_alternate_buyer'>
                                                    People Capital Index 2017
                                                    </li>
                                                <li className='car_insurance_text_alternate_buyer'>
                                                    EFFIE Award in 2011
                                                    </li>
                                                <li className='car_insurance_text_alternate_buyer'>
                                                    ISO Certification in February 2014
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
                                                            <CustomTableCell className='tablecell-financial-head' align="center">2015-2016</CustomTableCell>
                                                            <CustomTableCell className='tablecell-financial-head' align="center">2014-2015</CustomTableCell>
                                                            <CustomTableCell className='tablecell-financial-head' align="center">2013-2014</CustomTableCell>
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
                                                                <CustomTableCell className='tablecell-financial-chip' align="center">
                                                                <div className='upper-div'>
                                                                  {row.year3}
                                                                </div>
                                                                </CustomTableCell>
                                                                <CustomTableCell className='tablecell-financial-chip' align="center">
                                                                <div className='upper-div'>
                                                                  {row.year4}
                                                                </div>
                                                                </CustomTableCell>
                                                                <CustomTableCell className='tablecell-financial-chip' align="center">
                                                                <div className='upper-div'>
                                                                  {row.year5}
                                                                </div>
                                                                </CustomTableCell>
                                                                <CustomTableCell className='tablecell-financial-chip' align="center">
                                                                <div className='upper-div'>
                                                                  {row.year6}
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
                                                            <div className='keyword gbui-body-1'>{item.keyWord}</div>
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
                                                            <Col md={7} xs={6}><div  className='pre-medical-required' style={{float:'right'}}></div>
                                                            </Col>
                                                            <Col md={5} xs={6}>
                                                                <div className='gbui-body-1 subtext' style={{ color: '#ea0b4b'}}>Pre medical required.</div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={7} xs={6}><div className='pre-medical-required' style={{ backgroundColor: '#ea0b4b',float:'right' }}></div>
                                                            </Col>
                                                            <Col md={5} xs={6}>
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
                                                <Col md={3} className='mui--hidden-xs mui--hidden-sm'></Col>
                                                <Col md={6} xs={12}>
                                                    <div>
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
                                                <Col md={3} className='mui--hidden-xs mui--hidden-sm'></Col>
                                                <Col md={12}>
                                                    <h3 className="car_insurance_heading_alternate_buyer">Why to buy health insurance from Future Generali?</h3>
                                                    <p className="car_insurance_text_alternate_buyer">
                                                        Future Generali is an ISO 9001:2008 company which has been certified for quality excellence.
                                                        The Future Generali Health in-house servicing arm provides fast and easy claims settlement to
                                                        over 15 lakh customers. The insurance products are created just to provide an outstanding combination
                                                        of price and innovation to the customers. They are committed to providing value-added features such as
                                                        Future Xpress and Future Xpress plus and provide superior talent to deliver insurance solutions for your
                                                        needs.
                                                  </p>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="panel-alternate-green-div-body">
                                            <h3 className="car_insurance_heading_alternate_buyer">Insurer’s Plan</h3>
                                            <p className="car_insurance_text_alternate_buyer" style={{ fontWeight: '600' }}>1. Vital Plan</p>
                                            <p className="car_insurance_text_alternate_buyer" style={{ fontWeight: '600' }}>2. Premiere Plan</p>
                                            <p className="car_insurance_text_alternate_buyer" style={{ fontWeight: '600' }}>3. Superior Plan</p>
                                        </div>
                                        {/* Another body with grey background */}
                                        <div className="panel-alternate-green-div-body-2" >
                                            <h3 className="alternate-body-2-heading">Plan comparisons</h3>
                                            <div className="white-div-alternate-insurer" style={{ backgroundColor: 'white' }}>
                                                <Row style={{ background: 'white', marginLeft: '12px', marginRight: '12px', border: 'solid 1px rgb(112,112,112, 0.1)' }}>
                                                    <Col lg="3" md={3} className="mui--hidden-xs mui--hidden-sm mui--hidden-md"></Col>
                                                    <Col md="3" lg="3" xs="4" sm="4" id='insurer-logo-column'>
                                                        <div className="alternate-insurer-card" style={{ borderLeft: 'none' }}>
                                                            <img alt='alternate-buyer-journey' style={{width:'100%',height:'auto'}} src="/assets/insurerLogo/fg-logo.png" />
                                                            <p className="abj-plan-name gbui-overline-2">Health Total- Vital</p>
                                                            <Button variant="contained" className={`${classes.button}`}>
                                                                Buy Plan
                                                            </Button>
                                                            {/* <p style={{ paddingTop: '15px', paddingBottom: '15px' }}><Link to="#" className="view_details_link">View Plan Details</Link></p> */}
                                                        </div>
                                                    </Col>
                                                    <Col md="3" lg="3" sm="3" xs="4" id='insurer-logo-column'>
                                                        <div className="alternate-insurer-card">
                                                            <img alt='alternate-buyer-journey'  style={{width:'100%',height:'auto'}} src="/assets/insurerLogo/fg-logo.png" />
                                                            <p className="abj-plan-name gbui-overline-2">Health Total- Superior</p>
                                                            <Button variant="contained" className={`${classes.button} `}>
                                                                Buy Plan
                                                            </Button>
                                                            {/* <p style={{ paddingTop: '15px', paddingBottom: '15px' }}><Link to="#" className="view_details_link">View Plan Details</Link></p> */}
                                                        </div>
                                                    </Col>
                                                    <Col md="3" lg="3" xs="4" sm="3" id='insurer-logo-column'>
                                                        <div className="alternate-insurer-card">
                                                            <img alt='alternate-buyer-journey'  style={{width:'100%',height:'auto'}} src="/assets/insurerLogo/fg-logo.png" />
                                                            <p className="abj-plan-name gbui-overline-2">Health Total- Premiere</p>
                                                            <Button variant="contained" className={`${classes.button}`}>
                                                                Buy Plan
                                                            </Button>
                                                            {/* <p style={{ paddingTop: '15px', paddingBottom: '15px' }}><Link to="#" className="view_details_link">View Plan Details</Link></p> */}
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="panel-alternate-green-div-body-table">
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
                                                                      ₹ 3 Lacs
                                                                     </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                <div className='upper-div'>
                                                                      ₹ 15 Lacs
                                                                     </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      ₹ 50 Lacs
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Policy Term</td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Policy Term" classes={{root:classes.chip,label:classes.chiplabel}} />
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
                                                                <td style={{ color: '#ea0b4b' }} className='tabledata'>
                                                                     <div className='upper-div'>
                                                                      Above 18 yrs
                                                                    </div>
                                                                </td>
                                                                <td style={{ color: '#ea0b4b' }} className='tabledata'>
                                                                     <div className='upper-div'>
                                                                      Above 18 yrs
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
                                                                      No Limit & Up to SI
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                     <div className='upper-div'>
                                                                      No Limit & Up to SI
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                     <div className='upper-div'>
                                                                      No Limit & Up to SI
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>
                                                                    Co-pay
                                                                   {!this.state.copay &&
                                                                    <i   
                                                                       onClick={() => this.setState({copay:true})} class="material-icons" style={{verticalAlign:'middle',cursor:'pointer'}}>arrow_drop_down
                                                                    </i>}
                                                                    {this.state.copay &&
                                                                        <i   
                                                                         onClick={() => this.setState({copay:false})} class="material-icons" style={{verticalAlign:'middle',cursor:'pointer'}}>arrow_drop_up
                                                                        </i>
                                                                    }
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Co-pay" classes={{root:classes.chip,label:classes.chiplabel}} 
                                                                         onDelete={() => this.handleClick('copay')}
                                                                         clickable
                                                                         deleteIcon= {
                                                                             this.state.copay ?
                                                                               <MenuIconUp 
                                                                                   style={{color:'#ffffff',verticalAlign:'middle'}}/>:
                                                                               <MenuIconDown
                                                                               style={{color:'#ffffff',verticalAlign:'middle'}}/>
                                                                            }   
                                                                      />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                      60 - 64 yrs- 20% 
                                                                    </div>
                                                                    {this.state.copay &&
                                                                      <div>
                                                                            <div className='upper-div'>
                                                                              65 - 69 yrs- 25%
                                                                            </div>
                                                                            <div className='upper-div'>
                                                                              70 - 74 yrs- 30%
                                                                            </div>
                                                                            <div className='upper-div'>
                                                                              75 yr and above- 40%
                                                                            </div>
                                                                      </div>
                                                                    }
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      60 - 64 yrs- 20% 
                                                                    </div>
                                                                    {this.state.copay &&
                                                                        <div>
                                                                            <div className='upper-div'>
                                                                              65 - 69 yrs- 25%
                                                                            </div>
                                                                            <div className='upper-div'>
                                                                              70 - 74 yrs- 30%
                                                                            </div>
                                                                            <div className='upper-div'>
                                                                              75 yr and above- 40%
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </td>
                                                                <td className='tabledata'>
                                                                <div className='upper-div'>
                                                                      60 - 64 yrs- 20% 
                                                                    </div>
                                                                    {this.state.copay &&
                                                                        <div>
                                                                            <div className='upper-div'>
                                                                              65 - 69 yrs- 25%
                                                                            </div>
                                                                            <div className='upper-div'>
                                                                              70 - 74 yrs- 30%
                                                                            </div>
                                                                            <div className='upper-div'>
                                                                              75 yr and above- 40%
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>
                                                                    <div className='upper-div'>
                                                                      No-claim bonus
                                                                    </div>
                                                                </td>
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
                                                                <td className={classes.tableHeading}>Pre-existing diseases
                                                                   {!this.state.diseases &&
                                                                    <i   
                                                                       onClick={() => this.setState({diseases:true})} class="material-icons" style={{verticalAlign:'middle',cursor:'pointer'}}>arrow_drop_down
                                                                    </i>}
                                                                    {this.state.diseases &&
                                                                        <i   
                                                                         onClick={() => this.setState({diseases:false})} class="material-icons" style={{verticalAlign:'middle',cursor:'pointer'}}>arrow_drop_up
                                                                        </i>
                                                                    }
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Pre-existing diseases" classes={{root:classes.chip,label:classes.chiplabel}} 
                                                                         onDelete={() => this.handleClick('diseases')}
                                                                         clickable
                                                                         deleteIcon= {
                                                                             this.state.diseases ?
                                                                               <MenuIconUp 
                                                                                   style={{color:'#ffffff',verticalAlign:'middle'}}/>:
                                                                               <MenuIconDown
                                                                               style={{color:'#ffffff',verticalAlign:'middle'}}/>
                                                                            }   
                                                                      />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                       Compulsory waiting period 2 yrs
                                                                    </div>
                                                                       {this.state.diseases && <div>
                                                                            <div className='upper-div'>
                                                                              50% claim amount in 3rd yr
                                                                            </div>
                                                                            <div className='upper-div'>
                                                                               100% from 4th yr
                                                                            </div>
                                                                        </div>}
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                       Compulsory waiting period 2 yrs
                                                                    </div> 
                                                                    {this.state.diseases && <div>
                                                                        <div className='upper-div'>
                                                                            50% claim amount in 3rd yr
                                                                        </div>
                                                                        <div className='upper-div'>
                                                                            100% from 4th yr
                                                                        </div>
                                                                    </div>}
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                       Compulsory waiting period 2 yrs
                                                                    </div> 
                                                                   {this.state.diseases && <div>
                                                                        <div className='upper-div'>
                                                                            50% claim amount in 3rd yr
                                                                        </div>
                                                                        <div className='upper-div'>
                                                                            100% from 4th yr
                                                                        </div>
                                                                    </div>}
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>
                                                                    <div className='upper-div'>
                                                                      Domiciliary Hospitalisation
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Domiciliary Hospitalisation" classes={{root:classes.chip,label:classes.chiplabel}} />
                                                                    </div>
                                                                    <div className='upper-div'>
                                                                       max up to 10% of SI
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                     <div className='upper-div'>
                                                                       max up to 10% of SI
                                                                    </div>
                                                                </td>
                                                                <td className='tabledata'>
                                                                     <div className='upper-div'>
                                                                       max up to 10% of SI
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className={classes.row}>
                                                                <td className={classes.tableHeading}>Alternative Treatment 
                                                                   {!this.state.treatment &&
                                                                    <i   
                                                                       onClick={() => this.setState({treatment:true})} class="material-icons" style={{verticalAlign:'middle',cursor:'pointer'}}>arrow_drop_down
                                                                    </i>}
                                                                    {this.state.treatment &&
                                                                        <i   
                                                                         onClick={() => this.setState({treatment:false})} class="material-icons" style={{verticalAlign:'middle',cursor:'pointer'}}>arrow_drop_up
                                                                        </i>
                                                                    }
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='mui--visible-xs-block'>
                                                                      <Chip label="Alternative Treatment" classes={{root:classes.chip,label:classes.chiplabel}} 
                                                                          onDelete={() => this.handleClick('treatment')}
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
                                                                      Ayurveda 
                                                                    </div>
                                                                    {this.state.treatment && <div>
                                                                        <div className='upper-div'>
                                                                          Unani 
                                                                        </div>
                                                                        <div className='upper-div'>
                                                                          Sidha 
                                                                        </div>
                                                                        <div className='upper-div'>
                                                                          Homeopathy -reimbursement 
                                                                        </div>
                                                                    </div>}
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      Ayurveda 
                                                                    </div>
                                                                    {this.state.treatment && <div>
                                                                        <div className='upper-div'>
                                                                          Unani 
                                                                        </div>
                                                                        <div className='upper-div'>
                                                                          Sidha 
                                                                        </div>
                                                                        <div className='upper-div'>
                                                                          Homeopathy -reimbursement 
                                                                        </div>
                                                                    </div>}
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                      Ayurveda 
                                                                    </div>
                                                                    {this.state.treatment && <div>
                                                                        <div className='upper-div'>
                                                                          Unani 
                                                                        </div>
                                                                        <div className='upper-div'>
                                                                          Sidha 
                                                                        </div>
                                                                        <div className='upper-div'>
                                                                          Homeopathy -reimbursement 
                                                                        </div>
                                                                    </div>}
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
                                                                     Actual
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
                                                                       Normal Delivery-₹15000
                                                                    </div>
                                                                    {this.state.maternity && <div>
                                                                    <div className='upper-div'>
                                                                        LSCS (caesarian)-₹25000
                                                                    </div>
                                                                    </div>}
                                                                </td>
                                                                <td className='tabledata'>
                                                                    <div className='upper-div'>
                                                                       Normal Delivery-₹15000
                                                                    </div>
                                                                    {this.state.maternity && <div>
                                                                    <div className='upper-div'>
                                                                        LSCS (caesarian)-₹25000
                                                                    </div>
                                                                    </div>}
                                                                </td>
                                                                <td className='tabledata'>
                                                                <div className='upper-div'>
                                                                       Normal Delivery-₹50000
                                                                    </div>
                                                                    {this.state.maternity && <div>
                                                                    <div className='upper-div'>
                                                                        LSCS (caesarian)-₹100000
                                                                    </div>
                                                                    </div>}
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel-alternate-green-div-body-2" style={{ background: '#f4f4f4' }}>
                                            <h3 className="benefits car-insurance-alternate-body-2-heading">What is covered under Future Generali Health Insurance cover?</h3>
                                            <p className="benefits gbui-menu-bar-2">The benefits that are covered under the Future Generali Health Insurance company are:</p>
                                            <p className="benefits gbui-menu-bar-2">1. Room rent, maternity benefits, patient care expenses, operation theatre, diagnostics, medicines.</p>
                                            <p className="benefits gbui-menu-bar-2">2. Cashless treatment at more than 4800+ hospitals across the country.</p>
                                            <p className="benefits gbui-menu-bar-2">3. Pre-hospitalization expenses upto 60 days prior to hospitalization are covered and it includes check-ups and investigations cost, doctor consultation costs and the costs of medicines.</p>
                                            <p className="benefits gbui-menu-bar-2">4. Costs incurred during 180 days after hospitalization is covered and it includes doctors consultation costs, cost of medicines, check-up & investigations cost and recovery and rehab costs.</p>
                                            <p className="benefits gbui-menu-bar-2">5. It also covers the cost of the accompanying person during the hospitalization of a child upto the age of 12 years.</p>
                                            <p className="benefits gbui-menu-bar-2">6. Ambulance services without any charges, but subject to a limit specified in the policy.</p>
                                            <p className="benefits gbui-menu-bar-2">7. Portability option is also allowed to the insured under some plans.</p>
                                            <p className="benefits gbui-menu-bar-2">8. 	Medical treatment abroad is allowed to the insured after a waiting period of 4 years under some plans.</p>
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
                                                       Future Generali India Insurance Co Ltd.,
                                                    </p>
                                                    <p style={{textAlign:'center',color:'#333333'}} className='gbui-menu-bar-2'>
                                                        Indiabulls Finance Centre,
                                                    </p>
                                                    <p style={{textAlign:'center',color:'#333333'}} className='gbui-menu-bar-2'>
                                                       Tower 3, 6th Floor,
                                                    </p>
                                                    <p style={{textAlign:'center',color:'#333333'}} className='gbui-menu-bar-2'>
                                                       Senapati Bapat Marg,
                                                    </p>
                                                    <p style={{textAlign:'center',color:'#333333'}} className='gbui-menu-bar-2'>
                                                       Elphinstone Road, Prabhadevi (W), Mumbai - 400 013.
                                                    </p>
                                                </Col>
                                                <Col md={12}>
                                                    <p style={{textAlign:'center',color:'#333333'}} className='gbui-menu-bar-2'>
                                                      Fax: 022-41514555, 022- 40976785
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InsurerHealth))

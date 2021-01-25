import React from 'react';
import Button from '@material-ui/core/Button';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Panel from 'muicss/lib/react/panel';
import Icon from '@material-ui/core/Icon';
import FormCV from '../UploadCV';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Helmet} from "react-helmet";

import './careers.css'

const styles = theme => ({
    // formControl:{
    //    marginLeft: theme.spacing.unit,
    //    marginRight: theme.spacing.unit,
    //    paddingLeft: theme.spacing.unit,
    //    paddingRight: theme.spacing.unit,
    //    backgroundColor:'#ffffff',
    //    boxShadow:' 0 1px 2px 0 rgba(0, 0, 0, 0.16)',
    // },
    // select:{
    //     '&:focus': {
    //     backgroundColor:'#ffffff',
    //     }
    // }
});

class Careers extends React.Component {
    componentWillMount() {
        const vm = this;
        this.props.onCurrentComponent('Carrers.json');
        axios.get('/assets/json/Carrers.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
               
            })
    }
    constructor(props) {
        super(props);
        this.state = {
            formOpenId:0,
            slideIndex: 1,
            anchorEl: null,
            team: ''
        };
        this.slideIndex = 1;
        this.dropdown = false;
        this.dropdownM = false;
        this.showSlides = this.showSlides.bind(this);
        // this.plusSlides = this.plusSlides.bind(this);
        // this.currentSlide = this.currentSlide.bind(this);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };


    plusSlides(n) {
        const m = this.state.slideIndex += n; //eslint-disable-line
        this.setState({ slideIndex: m });
        this.showSlides(this.state.slideIndex);
       
    }
    currentSlide(n) {
        this.slideIndex = n;
       
        this.showSlides(n);
    }
    showSlides(n) {
        try {
            let i;
            let slides = document.getElementsByClassName('mySlides');
            let dots = document.getElementsByClassName('dot');
            if (n > slides.length) {
                this.slideIndex = 1;
            }
            if (n < 1) {
                this.slideIndex = slides.length;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }

            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(' active', '');
            }
            slides[this.slideIndex - 1].style.display = 'block';
           
            dots[this.slideIndex - 1].className += ' active';
            if (this.slideIndex <= 3) {
                this.slideIndex++;
            } else {
                this.slideIndex = 1;
            }
            setTimeout(() => {
                this.showSlides(n);
            }, 2500);
        } catch (error) {
           
        }
    }
    showFilterDropdown() {
        this.dropdown = !this.dropdown;
        
        const dropdown = document.getElementById('dropdown-content');
        if (this.dropdown) {
            dropdown.className += ' show_dropdown';
        } else {
            dropdown.classList.remove('show_dropdown');
        }
    }
    showFilterDropdownM() {
        this.dropdownM = !this.dropdownM;
        
        const dropdown = document.getElementById('dropdown-contentM');
        if (this.dropdownM) {
            dropdown.className += ' show_dropdown';
        } else {
            dropdown.classList.remove('show_dropdown');
        }
    }
    handleExpansion(id_no) {
        const btn = document.getElementById('d_job_btn_' + id_no);
        const form = document.getElementById('d_job_form_' + id_no);
        this.setState({formId:id_no})
        this.props.onCvUpload(true)       
    }
    componentDidMount() {
        // this.setState({slideIndex: 1});
        this.showSlides(this.slideIndex);
    }

    render() {
        return (
            <div class='career-page'>
                <Helmet>
                    <title>Join the top health insurance company for exciting careers</title>
                    <meta name="description" content="We are one of the best individual & family health insurance companies in India, which provides support to the customer to choose a health insurance plan."/>
                </Helmet>
                <Container fluid={true}>
                    <div className="carrer-image">
                        <img src="assets/group-2@2x.jpg" alt="1" style={{ width: "100%", height: 'auto' }} />
                    </div>
                    <div className="carrer-image mobile_show">
                        <h2>Don’t just work, challenge yourself to
learn something new every day.</h2>
<p>Chase your dreams; get spiked in your career and not just in your job. Surround yourself with smart, passionate, hardworking and friendly people while working towards your dream. 
We believe and value smart people who make ideas turn into action!
Unleash your potential with us!</p>
                         
                    </div>
                    <Row className='career-row'>
                        <Col md={12} xs={12}>
                            <div className='all-teams-div'>
                                <div className="dropdown">
                                <Button style={{ 'backgroundColor': '#ffffff' }} className="filter_btn"><span>All Jobs</span> <Icon style={{ paddingTop: '7px', marginLeft: '100px', color: '#ea0b4b' }}>filter_list</Icon></Button>
                                    {/* <Button style={{ 'backgroundColor': '#ffffff' }} className="filter_btn" onClick={this.showFilterDropdownM.bind(this)}><span>All Teams</span> <Icon style={{ paddingTop: '7px', marginLeft: '100px', color: '#ea0b4b' }}>filter_list</Icon></Button> */}
                                    {/* <div className="dropdown-content" id="dropdown-contentM">
                                        <p className="active_filter">All Teams</p>
                                        <p>Design Team</p>
                                        <p>Tech Team</p>
                                        <p>Sales Team</p>
                                        <p>Operations Team</p>
                                    </div> */}
                                </div>
                            </div>
                        </Col>
                        <Col md={12} xs={12}>
                            <div className=' gbui-subtitle-1 designing' >
                                Developers(3 Jobs)
                            </div>
                        </Col>
                        <Col md={12} xs={12}>
                            <Panel className='parent-panel'>
                                <Row>
                                    <Col md="12" xs={12} className='userExpDesign gbui-subtitle-1'>
                                        LEAD JAVA DEVELOPER
                                    </Col>
                                    <Col md="12" xs={12} className='exp gbui-body-2'>
                                        Experience:-5 Years
                                    </Col>
                                    <Col md="12" xs={12} className='responsibilities gbui-body-1'>
                                        Roles and responsibilities:
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            • Build high availability and extreme reliable high volume transactional systems.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            • Deliver reliable solutions that handle massive data and high traffic.
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className='details gbui-body-1'>
                                            •  Complete ownership of problem-free execution of owned modules and solutions.
                                        </div>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <div className='view-more-button' onClick={this.handleExpansion.bind(this,1)}  id="d_job_btn_1">
                                            <ButtonLightSuccess Text="View More" smallWarningPink={true} />
                                        </div>
                                        <div className="job_form1" id="d_job_form_1">
                                            <FormCV Key={this.state.formId} formId={1} />
                                        </div>
                                    </Col>
                                </Row>
                            </Panel>
                            <Panel className='parent-panel'>
                                <Row>
                                    <Col md="12" xs={12} className='userExpDesign gbui-subtitle-1'>
                                        JAVA DEVELOPERS (2)
                                </Col>
                                    <Col md="12" xs={12} className='exp gbui-body-2'>
                                        Experience:-2 Years
                                </Col>
                                    <Col md="12" xs={12} className='responsibilities gbui-body-1'>
                                        Roles and responsibilities:
                                </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            • Build high availability and extreme reliable high volume transactional systems.
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            • Deliver reliable solutions that handle massive data and high traffic.
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            • Complete ownership of problem-free execution of owned modules and solutions.
                                    </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className='details gbui-body-1'>
                                            •  Focus on code optimisation, code quality, maintainability etc.
                                    </div>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <div className='view-more-button' onClick={this.handleExpansion.bind(this,2)} id="d_job_btn_1">
                                            <ButtonLightSuccess Text="View More" smallWarningPink={true} />
                                        </div>
                                        {this.state.formOpenId === 2 &&  
                                        <div className="job_form1" id="d_job_form_1">
                                            <FormCV Key={this.state.formId} formId={2} onSelectCvUploadForm={true}/>
                                        </div>}
                                    </Col>
                                </Row>
                            </Panel>
                            <Panel className='parent-panel'>
                                <Row>
                                    <Col md="12" xs={12} className='userExpDesign gbui-subtitle-1'>
                                        FRONT END DEVELOPERS (2)
                                </Col>
                                    <Col md="12" xs={12} className='exp gbui-body-2'>
                                        Experience:-2 Years
                                </Col>
                                    <Col md="12" xs={12} className='responsibilities gbui-body-1'>
                                        Roles and responsibilities:
                                </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            • Developing new user-facing features using React.js
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            • Building reusable components and front-end libraries for future use
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            • Translating designs and wireframes into high quality code
                                    </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className='details gbui-body-1'>
                                            • Optimizing components for maximum performance across a vast array of web-capable devices and browsers.
                                    </div>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <div className='view-more-button' onClick={this.handleExpansion.bind(this,3)} id="d_job_btn_1">
                                            <ButtonLightSuccess Text="View More" smallWarningPink={true} />
                                        </div>
                                        <div className="job_form" id="d_job_form_3">
                                            <FormCV Key={this.state.formId} formId={3} />
                                        </div>
                                    </Col>
                                </Row>
                            </Panel>
                            {/* <Row className='navigation-row mui--hidden-xs mui--hidden-sm'>
                                <Col md={6}>
                                  <div className='gbui-subtitle-1 viewing-navigation'>Viewing 1 - 10 of 3015</div>
                                </Col>
                                <Col md={6}>
                                   <div className='next-button'>
                                       <ButtonLightSuccess Text='NEXT' midPinkContent={true} />
                                   </div>
                                </Col>
                            </Row> */}
                            {/* <Row className='navigation-row mui--visible-xs-block mui--visible-sm-block'>
                                <Col md={12}>
                                 <div className='mobile-navigation'>
                                    <div style={{display:'inline'}} className='gbui-subtitle-1 viewing-navigation'>1-10 of 100</div>
                                    <div style={{display:'inline'}}>
                                        <span style={{verticalAlign:'-webkit-baseline-middle',margin:'10px 0px'}}><i class="material-icons">keyboard_arrow_left</i></span>
                                        <span style={{verticalAlign:'-webkit-baseline-middle'}}><i class="material-icons">keyboard_arrow_right</i></span>
                                    </div>
                                  </div>
                                </Col>
                            </Row> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    CurrentLanguage: state.language.current_language,
    FetchedLanguage: state.language.lang_data,
});

const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
    onCvUpload: (value) => dispatch({ type: 'FORM_CV_UPLOAD', value }),
});

Careers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Careers))
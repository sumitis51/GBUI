import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import './TnC.css';
import axios from 'axios';
import { connect } from 'react-redux';
import Leftpanel from '../AboutTnCLeftPanel/LeftPanel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {Helmet} from "react-helmet";

class TnC extends Component {
    state= {
        setPage:'/TnC'
   }
    componentWillMount() {
        const vm = this;
        this.props.onCurrentComponent('TnC.json');
        axios.get('/assets/json/TnC.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
               
            })
    }
    handleChange = (event) =>  {
        this.setState({
            setPage:event.target.value
        })
        this.props.history.push(event.target.value);
      }
     
    render() {
        return (
            <MuiThemeProvider>
                 <Helmet>
                    <title>Group Bima | Terms and Conditions for Health Insurace Policies.</title>
                    <meta name="description" content="Readout about the Group Bima company's terms and conditions carefully, regarding content, information and many more."/>
                </Helmet>
                <div className='terms'>
                    <Container fluid={true} className='TermText'>
                        <Row>
                            <Leftpanel leftpanel={this.props.FetchedLanguage} Tnc={true}/>
                            <Col md={9} sm={12} xs={12}>
                            <Row className=' mui--hidden-lg mui--hidden-md mui--hidden-xl'>
                                    <Col xs={12}>
                                        <div className='mobile_select_menu'>
                                        <Select className="mobile_select"
              onChange={this.handleChange}
              value= {this.state.setPage}
        >
          <MenuItem value="/about">About Us</MenuItem>
          <MenuItem value="/TnC">Terms and Conditions</MenuItem>
          <MenuItem value="/privacy-policy">Privacy Policy</MenuItem>
        </Select>
                                        </div>
    
                                    </Col>
                                  
  
       
      
                                </Row>
                                <Col md={12} xs={12}>
                                    <div className="TitleText">{this.props.FetchedLanguage ? this.props.FetchedLanguage.TnCTermsAndConditionsHeading1 : ''}</div>
                                    <div className="SubTitleText">{this.props.FetchedLanguage ? this.props.FetchedLanguage.TnCLastUpdatedOn : ''}</div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                        Groupfit Insurance Brokers Pvt. Ltd. (GroupFit) operates the website <a href="https://developer.groupbima.com">www.groupbima.com</a> (Groupbima) to provide users with relevant 
                                        information to compare and buy insurance policies from multiple insurance companies. GroupFit is a licensed Insurance Broking Company
                                         with a Broking licence from the Insurance Regulatory and Development Authority of India.
                                    </div>
                                    <div className="policyText">
                                        IRDAI License No. 670<br/>
                                        IRDA Direct Broker Code: IRDA/DB741/18<br/>
                                        (Valid till 01.01.2022)
                                    </div>
                                    <div className="policyText">
                                        Some of the information available on our website is provided by our participating insurance companies. 
                                        Therefore, the information displayed may have some inaccuracies. GroupFit has limited control over this. 
                                        The accuracy of the information displayed and the standard of outcome from use of this website is not warranted 
                                        or guaranteed by GroupFit.
                                    </div>
                                    <div className="policyText">
                                        GroupFit is not liable for the information displayed on the website. You are accountable for the final choice made by you.
                                         Please read all relevant information before choosing a product. In case of any doubt, please contact GroupFit or 
                                         the relevant insurance company for further details.
                                    </div>
                                    <div className="policyText">
                                        GroupFit merely facilitates transactions by collecting premium deposit on behalf of the insurance company. Actual acceptance of the deposit as premium and issuance of policy is the discretion of insurance company and subject to their underwriting norms. 
                                        In case there is no issuance of policy, GroupFit will ensure that the deposit paid by the user is refunded.
                                    </div>
                                    <div className="policyText">
                                        By visiting and using this website and using the information, resources, services, products, and tools (hereinafter referred to as ‘Resources’), you are in agreement to the terms and conditions as stated in this User Agreement 
                                        and the terms and conditions in our Privacy Policy (please refer to the Privacy Policy section for further information).
                                    </div>
                                    <div className="policyText">
                                        This agreement is in effect as of 18th April, 2019.
                                    </div>
                                    <div className="policyText">
                                        GroupFit reserves the right to change and update this User Agreement without notice. It is the user’s responsibility to review this User Agreement regularly so as to be familiar with any changes. Continued use of this website after any modifications 
                                        will mean that the user is in agreement of the updated terms and conditions.
                                    </div>
                                </Col>
                                
                                
                                <Col md={12} xs={12}>
                                    <div className='UseText'>
                                        Use and Conduct
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                        By visiting and using this website, you agree to use the website only for purposes 
                                        permitted under the terms of this agreement and under relevant laws and regulations.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                        In this regard, you understand that:
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='midText'>
                                        To access the website and services offered, you might have to provide some personal 
                                        information such as your contact details to register yourself as a user. Any information that you provide must be exhaustive, authentic and up to date.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='midText'>
                                        All activities occurring through your account are your sole responsibility. 
                                        Please maintain confidentiality of your login ID and password.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='midText'>
                                        Accessing or trying to access the website and its services through any means other than 
                                        the means explicitly provided by us is strictly prohibited.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='midText'>
                                        Engaging in any activity which interferes with the website and its functioning, 
                                        including the servers and networks, is strictly prohibited.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='midText'>
                                        Attempting to copy, duplicate, reproduce, sell, trade or resell any resource available 
                                        on the website is strictly prohibited.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='midText'>
                                        If any unauthorized activities are conducted by you, you will be solely responsible for the consequences 
                                        and may incur criminal or civil liability for the same.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='midText'>
                                        You agree to indemnify and hold harmless Group Fit Brokers Pvt. Ltd. and their directors, employees, donors, agents and licensors from any liability 
                                        resulting from the violation of this User Agreement. We reserve the right to take over the exclusive defence of any claim in which we are entitled to 
                                        indemnification under this User Agreement. In such a situation, you agree to provide us with any cooperation that is reasonably requested by us.
                                    </div>
                                </Col>
                                {/* USe Generated contents */}
                                <Col md={12} xs={12}>
                                    <div className='headings'>User Generated Content</div>
                                    <div className="policyText">
                                        We may provide users opportunities to communicate on our website through public communication tools including but not limited to discussion forums, comments and blogs. You understand that content posted by users is not pre-screened or 
                                        regularly reviewed by us. If you choose to use these tools to submit any content on the website (“user generated content”), you are personally responsible to use the same responsibly and ethically. You agree that you will not create any content that:
                                    </div>
                                    <div className="midText">
                                        Contains any kind of advertising, whatsoever;
                                    </div>
                                    <div className="midText">Impersonates any person, living or dead;</div>
                                    <div className="midText">Impersonates any entity, existing or having previously existed;</div>
                                    <div className="midText">Infringes upon any party’s intellectual property rights;</div>
                                    <div className="midText">Is illegal, threatening, defamatory, degrading, harassing, abusive, intimidating, fraudulent, deceptive, invasive, racist, or contains any suggestive, inappropriate or explicit language.</div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className="headings">Privacy</div>
                                    <div className="policyText">Your privacy is important to us. For further details, please refer to our Privacy Policy. The Privacy Policy is included under the scope of this User Agreement.</div>
                                </Col>
                                {/* Limitation of warranties */}
                                <Col md={12} xs={12}>
                                    <div className="headings">Limitation of Warranties</div>
                                    <div className="policyText">All Resources provided on our website are “as is”. We do not warrant that:</div>
                                    <div className="midText">The use of our Resources will meet your needs or requirements.</div>
                                    <div className="midText">The use of our Resources will be timely, uninterrupted, secure or free from errors.</div>
                                    <div className="midText">The information provided through our Resources is accurate or reliable.</div>
                                    <div className="midText">Any defects in our Resources will be repaired or corrected.</div>
                                    <div className="policyText">Further, you understand and agree that:</div>
                                    <div className="midText">
                                        Any content downloaded or obtained through our Resources is done at your own risk and you are solely responsible for any damage 
                                        to your electronic devices including computers for any issue that may arise from download of such content.</div>
                                    <div className="midText">
                                        No information or advice, in any form, obtained by you from us shall create any new warranty, guarantee or conditions.
                                    </div>
                                </Col>
                                {/* Limitations of liability */}
                                <Col md={12} xs={12}>
                                    <div className='headings'>Limitation of Liability</div>
                                    <div className="policyText">Any claim against us shall be limited to the amount paid by you, if any, for use of our Resources. GroupFit will not be liable for any kind of loss or damages which may be incurred by the use of our Resources.</div>
                                </Col>
                                {/* Intellectual Property rights */}
                                <Col md={12} xs={12}>
                                    <div className='headings'>Intellectual Property Rights</div>
                                    <div className="policyText">
                                    All content available on <a href="http://www.groupbima.com/">www.groupbima.com/</a>, are the intellectual property of GroupFit and are protected by applicable laws. Any inappropriate and unauthorized use is strictly prohibited, unless expressly authorized by GroupFit.
                                    </div>
                                </Col>
                                
                                <Col md={12} xs={12}>
                                    <div className='headings'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.TerminationOfUse : ''}</div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.YouAgreeThatWeMay : ''}
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='headings'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.GoverningLaw : ''}</div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.ThisWebsiteIsControlledByGroupfit : ''}
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.FurthermoreAnyActionToEnforce : ''}
                                    </div>
                                </Col>
                                {/* NCPR/ NDNC */}
                                <Col md={12} xs={12}>
                                    <div className='headings'>NCPR/ NDNC</div>
                                    <div className="policyText">
                                        You authorize GroupFit to communicate with you on the number provided by you. This authorization overrides your registry to National Customer Preference Register or National Do Not Call Register.
                                    </div>
                                </Col>
                                <br/>
                                {/* <Col md={4} xs={12}>
                                    <div className='contactInformation'>
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.groupbimaAddressParagraph1 : ''}
                                    </div>
                                    <div className='contactInformation'>
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.groupbimaAddressParagraph2 : ''}
                                    </div>
                                    <div className='contactInformation'>
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.groupbimaAddressParagraph3 : ''}
                                    </div>
                                    <div className='bottomPolicy'>
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.groupbimaAddressParagraph4 : ''}
                                    </div>
                                </Col> */}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>

        )
    }
}

const mapStateToProps = state => {
    return {
        CurrentLanguage: state.language.current_language,
        FetchedLanguage: state.language.lang_data,
    };
}


const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TnC);
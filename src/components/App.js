import agent from '../agent';
import Header from '../components/Header/Header.js';
import Footer from '../components/Home/footer/FooterTemp'
import HeaderTemp from './Home/headerTemp/HeaderTemp';


import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import Home from '../components/Home';
import Careers from '../components/Careers/index'
import LoginPOS from '../components/LoginPOS/index'
import BecomePOS from '../components/BecomePOS/index'
import ContactUs from '../components/Contact_US/index'
import Feedback from '../components/Feedback/index'
import Complaints from '../components/Complaints_Grieviences/index'
import Level1 from '../components/Complaints_Grieviences/Level-1/index'
import Level2 from '../components/Complaints_Grieviences/Level-2/index'
import Level3 from '../components/Complaints_Grieviences/Level-3/index'
import CompareMotor from '../components/Compare_Quotes/Motor/index'
import AlternateBuyer from '../components/AlternateBuyerJourney/index';
import Insurer from '../components/AlternateBuyerJourney/Insurer'
import AlternateHealth from '../components/AlternateBuyerJourneyHealth/index'
import InsurerHealthFG from './AlternateBuyerJourneyHealth/FutureGen/InsurerHealthFutureGenerally'
import InsurerHealthAbhi from './AlternateBuyerJourneyHealth/ABHI/InsurerHealthFutureAbhi'
import InsurerHealthSBI from './AlternateBuyerJourneyHealth/SBI/InsurerHealthSBI'
import InsurerHealthReligare from './AlternateBuyerJourneyHealth/Religare/InsurerHealthReligare'
import InsurerHealthHDFC from './AlternateBuyerJourneyHealth/HDFC/InsurerHealthHDFC'
import QuoteListMotor from '../components/QuoteListing-Motor/index'
import InputHealth from '../components/InputHealth/inputHealthParent/index'
import Help from '../components/Help/index'
import ProposalMotorSummary from '../components/Proposal_Summary_Motor'
import CarQuotes from '../components/CarQuotes'
import ProposalFormMotor from '../components/ProposalFormMotor'
import CompareHealthQuotes from '../components/Compare_Quotes/Health'
import HealthQuotes from '../components/Health-Quotes'
import QuoteListingHealth from '../components/QuoteListingHealth'
import CustomerDashboard from '../components/CustomerDashboard/index'
import ProposalPdf from '../components/ProposalPdf/index'
import FindOutMore from '../components/Home/FindOutMore/index'
import CustomerFeedback from '../components/CustomerDashboard/CustomerFeedback/index'


import About from '../components/About/About';
import NotFound from '../components/NotFound/NotFound';
import TnC from '../components/TnC/TnC';
import ConnectWithUs from '../components/ConnectWithUs/index'
import PrivacyPolicy from '../components/PrivacyPolicy/index'
import PaymentStatus from '../components/PaymentStatus/index';
import MotorHomePage from '../components/MotorInputPages/MotorHomePage/HomePage';
import LoginCustomer from '../components/LoginCustomer/LoginCustomer';
import PreInspection from '../components/PreInspection/PreInspection';
import AddVehicleDetails from '../components/AddVehicleDetails/AddVehicleDetails';
import AddFamilyMembers from '../components/AddFamilyMember/AddFamilyMember';
import AddedVehicleDetails from '../components/AddVehicleDetails/AddedVehicles/AddedVehicles';
import MyAccount from '../components/MyAccount/MyAccount';
import TrackYourPolicyStatus from '../components/TrackYourPolicy/index';
import ProposalFormHEalth from '../components/ProposalFormHealth'
import SearchResult from '../components/SearchResult/index';
import PreMedicalRequired from '../components/Pre-medical-required/index';
import ISNP from '../components/ISNP/index';
import Error500 from '../components/Error500/index'
import Redirecting from '../components/RedirectingToPaymentGateway/index'
import Payment from '../components/Payment/index'
import Faq from './faq/index';
import PosLms from './PosLms/pos-verification/index';
import PosUploadDocuments from './PosLms/pos-upload-documents/index'
import PosTermsConditions from './PosTermsConditions/index'
import PosTrainingCertificate from './PosCertificate/index'
import PosProfile from './PosProfile/index'
import PosSalesTransaction from '../POS-Containers/pos-sales-transaction/index'
import ForgotPassword from './ForgotPassword'
import OTPVerification from './OTPVerification'
import ResetPassword from './ResetPassword'
import { store } from '../store';
import { push } from 'react-router-redux';
import './App.css'
import '../../node_modules/muicss/dist/css/mui.min.css'
import firebase from 'firebase'
import axios from 'axios'

import appConstants from '../constants/appConstants'
import ErrorBoundary from './ErrorBoundary'

const config = {
  apiKey: "AIzaSyDfnu6y_7ITGYh3Xe_I_5R_qTDDZBFDsiE",
  projectId: "groupbimadev",
  messagingSenderId: "505062185635"
};

firebase.initializeApp(config);




const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    appNameLogo: state.common.appNameLogo,
    currentUser: state.common.currentUser ? state.common.currentUser : null,
    redirectTo: state.common.redirectTo,
    CurrentLanguage: state.language.current_language,
    FetchedLanguage: state.language.lang_data,
    isAuthenticated: state.auth.token,
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT }),
  onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
  onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
  onCurrentLanguage: (currentlanguage) => dispatch({ type: 'CurrentLanguage', currentlanguage }),
  setToken: (token) => dispatch({ type: 'SET_TOKEN', token }),
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }

  }

  componentWillMount() {
    if (process.env.NODE_ENV !== 'development') {
     
    }
    else {
     

    }
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
    this.props.onCurrentLanguage('en');

    this.props.setToken(window.localStorage.getItem('token'))
  }

  componentDidMount() {

    // initialize messaging
    const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .then(() => {
       
        return messaging.getToken();
      })
      .then(token => {
        
        const data = {
          fcmToken: token,
          jwtToken: `Bearer ${localStorage.getItem('token')}`,
        }
        axios.post(`${appConstants.apiRootURL}/send-notification`, data)
          .then(response => {
           
          }).catch(err => {
            
          })
        //you probably want to send your new found FCM token to the
        //application server so that they can send any push
        //notification to you.
      })
      .catch(error => {
        if (error.code === "messaging/permission-blocked") {
          
        } else {
         
        }
      });


    // When message occurs
    messaging.onMessage(payload => {
     
      //this is the function that gets triggered when you receive a 
      //push notification while you’re on the page. So you can 
      //create a corresponding UI for you to have the push 
      //notification handled.
    });
  }
  
 


  render() {
    let routes;
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/find-out-more" component={FindOutMore} />
          <Route path="/notfound" component={NotFound} />
          <Route path="/TnC" component={TnC} />
          <Route path="/motor-homepage" component={MotorHomePage} />
          <Route path="/payment-status" component={PaymentStatus} />
          <Route path="/login-customer" component={LoginCustomer} />
          {/* <Route path="/proposal" component={ProposalForm}/> */}
          <Route path="/careers" component={Careers} />
          <Route path="/login-pos" component={LoginPOS} />
          <Route path="/become-pos" component={BecomePOS} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/customer-feedback" component={CustomerFeedback} />
          <Route path="/dashboard-customer" component={CustomerDashboard} />
          <Route path="/complaints-grievances" component={Complaints} />
          <Route exact path="/level-1" component={Level1} />
          <Route exact path="/level-2" component={Level2} />
          <Route exact path="/level-3" component={Level3} />
          <Route exact path="/compare-quotes-motor" component={CompareMotor} />
          <Route exact path="/alternate-buyer" component={AlternateBuyer} />
          <Route exact path="/alternate-buyer-insurer" component={Insurer} />
          <Route exact path="/alternate-buyer-health" component={AlternateHealth} />
          <Route exact path="/alternate-buyer-health-insurer-fg" component={InsurerHealthFG} />
          <Route exact path="/alternate-buyer-health-insurer-abhi" component={InsurerHealthAbhi} />
          <Route exact path="/alternate-buyer-health-insurer-sbi" component={InsurerHealthSBI} />
          <Route exact path="/alternate-buyer-health-insurer-religare" component={InsurerHealthReligare} />
          <Route exact path="/alternate-buyer-health-insurer-hdfc" component={InsurerHealthHDFC} />
          <Route exact path="/quote-listing-motor" component={QuoteListMotor} />
          <Route exact path="/input-form-health" component={InputHealth} />
          <Route path="/pre-inspection" component={PreInspection} />
          <Route path="/help" component={Help} />
          <Route path="/proposal-motor-summary" component={ProposalMotorSummary} />
          <Route path="/car-quotes" component={CarQuotes} />
          <Route path="/add-vehicle-detail" component={AddVehicleDetails} />
          <Route path="/add-family-member" component={AddFamilyMembers} />
          <Route path="/added-vehicle-detail" component={AddedVehicleDetails} />
          <Route path="/my-account" component={MyAccount} />
          <Route path="/track-your-policy" component={TrackYourPolicyStatus} />
          <Route path="/proposal-form-motor" component={ProposalFormMotor} />
          <Route path="/compare-quotes-health" component={CompareHealthQuotes} />
          <Route path="/health-quotes" component={HealthQuotes} />
          <Route path="/proposal-form-health" component={ProposalFormHEalth} />
          <Route path="/search-result" component={SearchResult} />
          <Route path="/quote-listing-health" component={QuoteListingHealth} />
          <Route path="/payment" component={Payment} />
          <Route path="/pre-medical-required" component={PreMedicalRequired} />
          <Route path="/500" component={Error500} />
          <Route path="/redirecting" component={Redirecting} />
          <Route path="/isnp" component={ISNP} />
          <Route path="/faq" component={Faq} />
          <Route path="/connect-with-us" component={ConnectWithUs} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/proposal-pdf" component={ProposalPdf} />
          <Redirect to="/" />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/find-out-more" component={FindOutMore} />
          <Route path="/notfound" component={NotFound} />
          <Route path="/TnC" component={TnC} />
          <Route path="/motor-homepage" component={MotorHomePage} />
          <Route path="/payment-status" component={PaymentStatus} />
          <Route path="/login-customer" component={LoginCustomer} />
          {/* <Route path="/proposal" component={ProposalForm}/> */}
          <Route path="/careers" component={Careers} />
          <Route path="/login-pos" component={LoginPOS} />
          <Route path="/become-pos" component={BecomePOS} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/customer-feedback" component={CustomerFeedback} />
          <Route path="/complaints-grievances" component={Complaints} />
          <Route exact path="/level-1" component={Level1} />
          <Route exact path="/level-2" component={Level2} />
          <Route exact path="/level-3" component={Level3} />
          <Route exact path="/compare-quotes-motor" component={CompareMotor} />
          <Route exact path="/alternate-buyer" component={AlternateBuyer} />
          <Route exact path="/alternate-buyer-insurer" component={Insurer} />
          <Route exact path="/alternate-buyer-health" component={AlternateHealth} />
          <Route exact path="/alternate-buyer-health-insurer-fg" component={InsurerHealthFG} />
          <Route exact path="/alternate-buyer-health-insurer-abhi" component={InsurerHealthAbhi} />
          <Route exact path="/alternate-buyer-health-insurer-sbi" component={InsurerHealthSBI} />
          <Route exact path="/alternate-buyer-health-insurer-religare" component={InsurerHealthReligare} />
          <Route exact path="/alternate-buyer-health-insurer-hdfc" component={InsurerHealthHDFC} />
          <Route exact path="/quote-listing-motor" component={QuoteListMotor} />
          <Route exact path="/input-form-health" component={InputHealth} />
          <Route path="/pre-inspection" component={PreInspection} />
          <Route path="/help" component={Help} />
          <Route path="/proposal-motor-summary" component={ProposalMotorSummary} />
          <Route path="/car-quotes" component={CarQuotes} />
          <Route path="/add-vehicle-detail" component={AddVehicleDetails} />
          <Route path="/add-family-member" component={AddFamilyMembers} />
          <Route path="/added-vehicle-detail" component={AddedVehicleDetails} />
          {/* <Route path="/my-account" component={MyAccount} /> */}
          <Route path="/track-your-policy" component={TrackYourPolicyStatus} />
          <Route path="/proposal-form-motor" component={ProposalFormMotor} />
          <Route path="/compare-quotes-health" component={CompareHealthQuotes} />
          <Route path="/health-quotes" component={HealthQuotes} />
          <Route path="/proposal-form-health" component={ProposalFormHEalth} />
          <Route path="/search-result" component={SearchResult} />
          <Route path="/quote-listing-health" component={QuoteListingHealth} />
          <Route path="/pre-medical-required" component={PreMedicalRequired} />
          <Route path="/isnp" component={ISNP} />
          <Route path="/500" component={Error500} />
          <Route path="/redirecting" component={Redirecting} />
          <Route path="/payment" component={Payment} />
          <Route path="/faq" component={Faq} />
          <Route path="/pos-verification" component={PosLms} />
          <Route path="/pos-terms-conditions" component={PosTermsConditions} />
          <Route path="/pos-documents" component={PosUploadDocuments} />
          <Route path="/pos-training-certificate" component={PosTrainingCertificate} />
          <Route path="/pos-profile" component={PosProfile} />
          <Route path="/pos-sales-transaction" component={PosSalesTransaction} />
          {/* Forgot Password design */}
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/otp-verification" component={OTPVerification} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/connect-with-us" component={ConnectWithUs} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/proposal-pdf" component={ProposalPdf} />
          <Redirect to="/" />
        </Switch>
      )
    }
    if (this.props.appLoaded) {
      return (
        <div>
          {/* {this.props.location.pathname !== '/' && <SubHeader/>} 
           {this.props.location.pathname !== '/' && <Header/>}  */}
          {/* <ErrorBoundary> */}
            <div>
              {/* {(this.props.location.pathname === '/' && this.props.location.pathname !== '/help' &&  this.props.location.pathname !== '/proposal-pdf'
              && this.props.location.pathname !== '/my-account'
              && this.props.location.pathname !== '/added-family-member' && this.props.location.pathname !== '/add-family-member'
              && this.props.location.pathname !== '/added-vehicle-detail' && this.props.location.pathname !== '/add-vehicle-detail'
              && this.props.location.pathname !== '/track-your-policy') && <HeaderTemp />}
            {(this.props.location.pathname !== '/' &&  this.props.location.pathname !== '/proposal-pdf') && <Header
              appName={this.props.appNameLogo}
              currentUser={this.props.currentUser}
              location={this.props.location.pathname} />} */}
              <Header
                appName={this.props.appNameLogo}
                currentUser={this.props.currentUser}
                location={this.props.location.pathname} />

              {/* <React.StrictMode></React.StrictMode> */}
              {routes}
            </div>
            {(this.props.location.pathname !== '/' && this.props.location.pathname !== '/my-account' && this.props.location.pathname !== '/proposal-pdf'
              && this.props.location.pathname !== '/added-family-member' && this.props.location.pathname !== '/add-family-member'
              && this.props.location.pathname !== '/added-vehicle-detail' && this.props.location.pathname !== '/add-vehicle-detail' && this.props.location.pathname !== '/track-your-policy'
              ) && <Footer />}
          {/* </ErrorBoundary> */}
        </div>
      );
    }

    return (
      <div>
        <Header
          appName={this.props.appNameLogo}
          currentUser={this.props.currentUser} />
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);

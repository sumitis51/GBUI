import React from 'react'
import './alternate-health.css'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import axios from 'axios';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import InputHealthChildDialogue from '../InputHealth/index'
import constants from '../../constants/appConstants.json'


const styles = theme => ({
    root: {
        color: '#ea0b4b',
        '&$checked': {
            color: '#ea0b4b',
        },
    },
    checked: {},
    cssRoot: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '6px 60px',
        margin: '12px',
        textTransform: 'capitalize'
    },
    button: {
        color: '#ea0b4b',
        background: '#ffffff',
        '&:hover': {
            backgroundColor: '#f6f6f6',
            border: '1px solid #ea0b4b'
        },
        border: '1px solid #ea0b4b',
        padding: '10px 50px'
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
});

class AlternateBuyerHealth extends React.Component {
    state = {
        iconValue: '',
        carType: 'personal',
        iterate: [0, 0, 0],
        iterate2: [0, 0, 0],
        showAllAbout: true,
        showCarInsurer: false,
        isHelpful: false,
        blogLinks: false,
        importanceOfInsurance: [
            {
                id: 0,
                heading: 'Precarious lifestyle increasing health risks:',
                data: 'Spending a hectic and stationary lifestyle in a polluted and electronically bothered surrounding, is resulting in unhealthy eating and sleeping habits. Having health insurance will provide you with coverage from any health issues that may arise and thus help you to cover the expenses in case of urgency. Some health insurance policies also provide regular health checkups in order to create awareness among people.'
            },
            {
                id: 1,
                heading: 'Increased rate of life-threatening diseases:',
                data: 'The diseases such as cancer, high cholesterol, diabetes, heart ailments, etc. which were supposed to be affecting older people mostly have been at a rise in young individuals as well now. Health insurance provides financial security for the treatment and rehabilitation from such unfortunate cases.  '
            },
            {
                id: 2,
                heading: 'Lower premiums:',
                data: 'If you take your health insurance policy at a younger age, you will have to pay lower premiums for it. Getting early health insurance will also help you avail a lot more benefits from the beginning and that too on payment of nominal premiums. '
            },
            {
                id: 3,
                heading: 'No waiting period:',
                data: 'Insurance for certain pre-existing or critical diseases have a waiting period in order for you to be eligible to reap the benefits. Thus insurance at a young age enables you to sail through the waiting period before any serious issue arises. '
            },
            {
                id: 4,
                heading: 'Helps in availing tax deductions:',
                data: 'You can avail tax deductions on the payment of premium for self-insurance for upto Rs.30,000 and upto Rs.50,000 for paying the premium for health insurance of a senior citizen in the family. '
            },
            {
                id: 5,
                heading: 'Cashless hospitalization:',
                data: 'Most health insurance plans allow you to avail the best facilities and treatment without worrying too much about the expenses.  Under the cashless plan, either a major portion or the entire cost of the covered services is paid directly to the hospital, by the insurer.'
            },
        ],
        keyFeaturesOfInsurance: [
            {
                id: 0,
                heading: 'Day care features:',
                data: 'Daycare procedures such as radiotherapy, chemotherapy, eye surgery, dialysis, etc. do not require the patients to be hospitalized for 24 hours in order to avail the claims.'
            },
            {
                id: 1,
                heading: 'Critical illness:',
                data: 'Many health insurance policies cover critical illness such as cancer, heart attack, coronary artery disease, stroke, paralysis, major organ transplant, chronic lung disease, Parkinson’s, etc. '
            },
            {
                id: 2,
                heading: 'Ambulance cover:',
                data: 'The expenses incurred on availing the ambulance services is also covered by maximum health insurance policies.'
            },
            {
                id: 3,
                heading: 'Medical check-ups:',
                data: 'Most insurers make it compulsory for the person to get their health checked before buying the policy if he/ she is suffering through any critical illness or is high in age.'
            },
            {
                id: 4,
                heading: 'Pre and Post hospitalization expenses:',
                data: 'Maximum insurance policies these days cover the expenses incurred a few days prior to hospitalization, as well as few days after hospitalization.'
            },
            {
                id: 5,
                heading: 'No Claim Bonus:',
                data: 'NCB is a type of benefit that the policyholder receives from the insurer if he doesn’t make any claims during the policy term. It ranges within a certain percentage of the sum insured and can be accumulated over the years. The maximum limit for NCB is up to the original sum insured, as specified by the insurance provider. '
            },
            {
                id: 6,
                heading: 'Co-Payment:',
                data: 'Co-pay is a fixed portion of a claim for the covered services, that is to be paid by the insured himself out-of-pocket at the time of receiving the services. It is represented as a certain percentage of the claim. The amount of co-payment varies as per the type of health care services covered under the policy. '
            },
            {
                id: 7,
                heading: 'Tax Benefits of Health Insurance:',
                data: 'You can avail tax deductions on the payment of premium for self-insurance upto Rs. 30,000 and upto Rs. 50,000 for paying the premium for health insurance of a senior citizen in the family. With your money saved in the form of deductions and financial security from health insurance, you can use it for other more useful purposes like investment and other saving schemes. '
            },
            {
                id: 8,
                heading: 'Third Party Administrator:',
                data: ' TPA is a person registered under the IRDAI and authorized to process claims in addition to providing cashless facilities, working as an outsourcing agency of an insurance company. He is engaged for a fee or remuneration by an insurance company. '
            },
        ],
        whatPolicyCovers: [
            {
                id: 0,
                heading: 'Cashless facility:',
                data: 'A card is issued to the insured by the insurance company and on showing this card in the network hospital, insured can avail the cashless facility. This means that a major portion of the medical expenses will be paid by the insurer, directly to the hospital. The Insurer would have a tie-up on almost all the hospitals already to facilitate the cashless facility.'
            },
            {
                id: 1,
                heading: 'Hospitalization cash benefits:',
                data: 'Fixed amount for each day an insured is hospitalised is also covered under health insurance policies to reduce the financial burden of the insured. This will help the insured by compensating for the loss of earnings and other costs. '
            },
            {
                id: 2,
                heading: 'Pre and post hospitalization costs:',
                data: 'The pre and post hospitalization expenses are usually covered under a health insurance policy for up to 60 to 90 days.'
            },
            {
                id: 3,
                heading: 'Ambulance charges:',
                data: 'Even ambulance charges are covered by some insurance company to relieve the insured from the stress about those charges.'
            },
            {
                id: 4,
                heading: 'Health checks up:',
                data: 'In case there is no Claim for a certain number of years, some company even provides free health check-up to the insured.'
            },
            {
                id: 5,
                heading: 'Pre existing diseases:',
                data: 'Pre-existing diseases are also covered under maximum health insurance policies. Just some waiting period is to be completed to become eligible for a claim against pre-existing diseases.'
            },
        ],
        whatPolicyNotCovers: [
            {
                id: 0,
                heading: 'Some specific medical condition:',
                data: 'Some medical conditions such as AIDS, replacement of hormones, sex change, etc. are not covered by a health insurance policy. Age-related ailments like Osteoarthritis and Osteoporosis are also not covered for a specific period of time, this time duration is decided by the insurance company.'
            },
            {
                id: 1,
                heading: 'Cosmetic surgery:',
                data: 'Cosmetic surgeries are usually not covered in health insurance as it does not affect an individual’s life and it is not life-threatening. Cosmetic surgeries, like liposuction, Botox and others are not part of the health insurance coverage.'
            },
            {
                id: 2,
                heading: 'Cost for Alternative therapy:',
                data: 'Alternative therapy like massage, aromatherapy, reflexology, acupuncture, acupressure, naturopathy, and other related therapies are not covered under health insurance policies as these are not a part of conventional medicines.'
            },
            {
                id: 3,
                heading: 'Diagnostic charges:',
                data: 'Diagnosis that are performed at hospital or nursing home, to identify the presence of diseases are not usually payable by health insurance.'
            },
            {
                id: 4,
                heading: 'Extra charges:',
                data: 'Service charge, registration fees, admission fees, and any other additional charges of similar nature will not be reimbursed under health insurance.'
            },
            {
                id: 5,
                heading: ' Supplements:',
                data: 'Costs for vitamins and other health tonics which are not part of the treatment for any disease or injury is not covered under any health policy. However, when supplements are given by the physician as a part of the treatment when a person is hospitalized, it will be covered in the policy.'
            },
        ],
        whatShouldBeChecked: [
            {
                id: 0,
                heading: 'Coverage:',
                data: 'One must check the coverage level offered by a health insurance policy, as it is the most important thing. While the basic coverage remains the same, some absolute limits and additional coverage tend to vary in different policies. It’s always better to choose a plan which has features that may be needed by you and not overburden you with unnecessary features.'
            },
            {
                id: 1,
                heading: 'Sublimits:',
                data: 'When investing in a health insurance policy, we often tend to overlook the sub-limits on certain benefits and then regret later. Hence, it is important to check the limits on ambulance charges, room rent, and other expenses so that these don’t overburden you later.'
            },
            {
                id: 2,
                heading: 'Waiting period:',
                data: 'Waiting period is the limited period during which certain ailments are not covered. It is always a good idea to check the waiting period beforehand, as different plans have different waiting periods for various diseases associated with them.'
            },
            {
                id: 3,
                heading: 'Cashless claim facility:',
                data: 'Cashless claim facility is a benefit where a major portion of your medical expenses is paid by your insurer, directly to the hospital. This facility is offered by the health insurers when the patient is treated in one of its network hospitals. '
            },
            {
                id: 4,
                heading: 'Entry age:',
                data: 'This factor is particularly important when you want to invest in a family insurance plan. It is necessary to check the eligibility criteria for the maximum age of dependent children and parents/parents-in-law, if applicable. '
            },
            {
                id: 5,
                heading: 'Network Hospitals:',
                data: 'When selecting a health insurance policy, it’s always wise to know about the network hospitals associated with the insurer as it enables you to make a cashless claim at the time of emergency. This ensures your mental relief at times of emergencies.'
            },
            {
                id: 6,
                heading: 'Exclusions:',
                data: 'You will be extremely disappointed if at the time of emergency, you come to know that your ailment or medical condition is not covered in your health insurance policy. Hence, it is always wise to read the policy document carefully and know about all the medical conditions which are excluded from your health insurance policy.'
            },
            {
                id: 7,
                heading: 'Additional benefits:',
                data: 'While looking for a health insurance policy, it will be a wise thing to look for add-on benefits offered with your policy in order to increase the scope, coverage and benefits of your health insurance plan.'
            },
            {
                id: 8,
                heading: 'Renewability:',
                data: 'Nowadays, a policy that provides a lifelong renewal will be an ideal health plan. Hence, renewability is an important factor while selecting the right health insurance policy for yourself and your loved ones.'
            },
            {
                id: 9,
                heading: 'Premium:',
                data: 'The premium to be payable should always be considered before investing in a health insurance policy. The amount that you will need to pay for your health insurance plan should be justifiable and appropriate as compared to the other health insurance plans in the market.'
            },
        ],
        howToChoose: [
            {
                id: 0,
                heading: 'Know Your Needs:',
                data: 'Everybody has a different health condition in comparison to others. Thus, the policy that you or your family members need may not be the same as required by your friends. Know what you need from your health insurance, and then choose the policy that best fits your requirements. '
            },
            {
                id: 1,
                heading: 'Compare policies:',
                data: 'When you are certain about your needs from the health policy, you need to compare the options available based on various features. Compare the prices, the features and the total coverage offered. Also see what benefits and add-ons are available, as many insurers offer services such as wellness benefits and vaccination cover. Paying higher premiums for benefits that you may never use is not a good decision. Moreover, don’t buy high priced health insurance just to save tax. '
            },
            {
                id: 2,
                heading: 'Research about Insurer:',
                data: 'Always consider an insurer with good financial and service records as an insurer with a low claim settlement ratio may bring trouble. The time period for which an insurer is serving in the market is also worth keeping in mind. Its expertise is reflected in the types of policies it offers. An insurer with an enriched product portfolio is a good choice.'
            },
            {
                id: 3,
                heading: 'Check the Network Hospitals:',
                data: 'Do have a look if your preferred hospital is included in the insurer’s network hospitals list. Network hospitals help you get a cashless treatment. Go for the insurer that has tie-ups with leading hospitals that you would prefer in case of any medical emergency. Also make sure that these hospitals are near to where you live.'
            },
            {
                id: 4,
                heading: 'Compare costs:',
                data: 'Summary of benefits of any policy should clearly mention how much you’ll have to pay out of pocket for medical services. As a consumer, the costs that you need to pay consists of the deductible and copayments. Usually, the lower your premium, the higher your out-of-pocket costs.'
            },
            {
                id: 5,
                heading: 'Compare benefits:',
                data: `After comparing the features and costs, go to the summary of benefits to see which plans cover a wider scope of services. Some may have better coverage for things like physical therapy or mental health care, while others might have better emergency coverage. It will help you to know which plan best fits you and your loved one's needs.`
            },
        ],
        whatMistakeShoudBeAvoided: [
            {
                id: 0,
                data: 'Not reading the health insurance policy document thoroughly'
            },
            {
                id: 2,
                data: 'Inadequate research before purchasing a policy'
            },
            {
                id: 3,
                data: 'Not asking questions and clarifying doubts while purchasing a policy'
            },
            {
                id: 4,
                data: 'Not opting for sufficient coverage'
            },
            {
                id: 5,
                data: 'Opting for coverages and riders not relevant for unique health insurance needs'
            },
            {
                id: 6,
                data: 'Dependency on health insurance offered by the employer'
            },
            {
                id: 7,
                data: 'Being unaware of the network hospitals of your health insurer'
            },
        ],
        whatStepsToBuyInsurance: [
            {
                id: 0,
                heading: 'Research policies:',
                data: 'The first step in buying a policy for yourself is to search for all the options based on your requirements. Make a list of what your health policy should cover and then research about every policy fulfilling those coverage fields. '
            },
            {
                id: 1,
                heading: 'Evaluate and select:',
                data: 'Once you have found all the policies fulfilling your requirement criteria, compare them based on various add-ons and features. Then select the policy that you feel is the best among all the policies and pay the amount for the policy.'
            },
            {
                id: 2,
                heading: 'Pre-medical checkup:',
                data: 'Health insurers require the customers to get a medical checkup to be done before the policy is assigned to them if the insured is older in age or if he has some medical history. So once you have selected the policy for you, complete the pre-medical checkup if required under your policy.'
            },
            {
                id: 3,
                heading: 'Policy Issuance:',
                data: 'Once you are done with the pre-medical checkup, if required, the policy will be assigned to you on the basis of the medical results.'
            },
        ],
        typesOfHealthInsurance: [
            {
                id: 0,
                heading: 'Indemnity health Plans:',
                data: 'Indemnity plans provide benefits to the customers on hospitalization. Under these plans, medical expenses incurred upto the amount of sum insured is reimbursed to the policyholder.'
            },
            {
                id: 1,
                heading: 'Family floater plan:',
                data: 'A Family Health Insurance plan is also known as a Family Floater plan, and offers you coverage from the medical risks and costs, in case of any mishappening or emergency. Family health insurance provides coverage to various members of your family for a fixed assured sum and that too in exchange for a single annual premium. '
            },
            {
                id: 2,
                heading: 'Unit Linked health plans:',
                data: 'This plan is a combination of Health insurance plan and market linked investment plan. Here the customer decides the premium that is to be set aside for the health cover. The savings component of the investment doesn’t affect the insurance charges.'
            },
            {
                id: 3,
                heading: 'Maternity plans:',
                data: 'There are many health plans that offer cover for maternity and other additional expenses related to it. These policies include expenses related to pre and postnatal care, delivery of the baby, etc. '
            },
            {
                id: 4,
                heading: 'Senior citizen plans:',
                data: 'The senior citizen health insurance plans provide coverage to the older members of the family and include the health issues that arise due to the increasing age.'
            },
            {
                id: 5,
                heading: 'Top up plan:',
                data: 'A top-up health policy provides additional coverage to people who have an existing individual plan or a mediclaim from the employer. It reimburses the expenditure which arises out of single illness, once the limit of the existing cover is exhausted.'
            },
            {
                id: 6,
                heading: 'Super Top up plan:',
                data: 'The super top-up plans pay for the aggregate medical costs, once it exceeds the threshold limit and the sum assured of existing individual plan or a mediclaim from the employer, within a policy year. They are similar to the top-up plans, except that the super top-up plan covers total of all hospitalization bills above the threshold limit. '
            },
            {
                id: 7,
                heading: 'Critical illness plan:',
                data: 'This plan provides coverage from various critical illnesses, such as kidney failure, paralysis, cancer, heart attack etc. Critical illness is a serious, possibly terminal, disease and is pre-defined by the provider. It mostly provides a lump-sum benefit if the insured is diagnosed with one or more of the specified terminal conditions.'
            },
            {
                id: 8,
                heading: 'OPD plan:',
                data: 'OPD plan provides coverage to the insured from expenses other than that incurred during hospitalization. OPD expenses include doctor’s consultation fees, health check-ups, pharmacy bills, dental treatment, diagnostic tests, etc.'
            },
        ],
        advantagesOfBuyingInsurance: [
            {
                id: 0,
                data: 'Instant access to various options available with the facility to compare them'
            },
            {
                id: 1,
                data: 'Policies from all major insurance providers available'
            },
            {
                id: 2,
                data: 'Ease of transaction, with an option to evaluate various combinations in real time'
            },
            {
                id: 3,
                data: 'Personalized cover'
            },
            {
                id: 4,
                data: 'A transparent and clear understanding of terms and understanding'
            },
            {
                id: 5,
                data: 'Availability of online reviews help in getting a real perspective of experienced customers'
            },
            {
                id: 6,
                data: 'Lesser chances of payment related problems'
            },
            {
                id: 7,
                data: 'In most cases, immediate policy issuance'
            },
            {
                id: 8,
                data: 'Assistance for claims and policy servicing'
            },
        ],
        claimProcess: [
            {
                id: 0,
                heading: 'Expense Reimbursement:',
                data1: `Health insurance policies provide the insured with the benefit of getting their medical expenses reimbursed by the insurer, on the basis of policy terms. The cost of some hospital charges such as bed charges, medicines, lab tests, surgeon's fees etc. are paid back to the insured at the time of claim. The insured has to pay the expenses but gets reimbursement later by the insurance company.`,
                data2: `When a claim arises, you are required to inform the insurance company as per required procedures. After hospitalization, ensure that you obtain and keep ready the documents such as claim form, discharge summary, prescriptions and bills that are required to be submitted for a claim.`
            },
            {
                id: 1,
                heading: 'Cashless Treatment:',
                data1: `Every Insurance company offers a list of network hospitals to get the medical treatment without having to pay the full amount. The insurer pays a major portion of the expenses directly to the hospital. Availing cashless benefit requires TPA (Third Party Administrator) approval.`,
                data2: `Before the discharge, you are required to submit all the medical documents like lab reports, claim forms, discharge summary and the final bills to the hospital to get the cashless benefit. It is always advisable that copy of these document is retained by you for your future medical need or future claim under the policy.`
            },
        ],
        cashlessTreatment:[
            {
                id: 0,
                data: 'The insured can also show the cashless card issued by the insurer at the particular hospital as proof of health insurance coverage. Following cases are considered for the cashless treatment:'
            },
        ],
        cashlessTreatmentList:[
            {
                id: 0,
                heading:'Planned Hospitalization:',
                data: 'In case of planned hospitalization, the insured is required to get the TPA (Third Party Administrator) approval in advance to avail the cashless benefit. The filled pre-authorization form, signed by the attending doctor, is to be provided at the insurance desk of the hospital along with supporting documents towards hospitalization.'
            },
            {
                id: 1,
                heading:'Emergency Hospitalization:',
                data: 'In emergency hospitalization cases, you are required to initiate the procedure of informing the insurer within 24 hours of hospitalization. The process for cashless mediclaim will be fast-tracked by the insurance desk in the hospital. If you fail to get TPA approval immediately, you can get the expenses reimbursed later. You will have to show the expenses bill, proof of medical expenses, discharge bill etc., as the proof of the treatment availed to get the reimbursement for your claim.'
            },
        ],
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        
    };

    handleWindowChange() {
        if (window.innerWidth > 767) {
            this.setState({ showAllAbout: true, showCarInsurer: true, isHelpful: true, blogLinks: true });
           
        } else {
            this.setState({ showAllAbout: true, showCarInsurer: false, isHelpful: false, blogLinks: false });
           
        }
    }

    onSubmitFeedback = () => {
        const data = {
             answer:this.state.isInformatonHelpful,
             tokenOrMobile: localStorage.getItem("token")
         }
         axios.post(`${constants.apiRootURL}/is-this-page-helpful`,data)
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
        const vm = this;
        this.props.onCurrentComponent('AlternateBuyerHealth.json');
        axios.get('/assets/json/AlternateBuyerHealth.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
               
            })
        if (window.innerWidth > 767) {
            this.setState({ showAllAbout: true, showCarInsurer: true, isHelpful: true, blogLinks: true });
           
        } else {
            this.setState({ showAllAbout: true, showCarInsurer: false, isHelpful: false, blogLinks: false });
           
        }
        window.addEventListener('resize', this.handleWindowChange.bind(this));
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
                    <Row className="panel-row-alternate-buyer-2">
                        <Col md="1"></Col>
                        <Col md="7">
                            <div className="panel-alternate-green-div">
                                <div className="panel-alternate-green-div-header" style={{ backgroundColor: '#ea0b4b' }}>
                                    <h3 className="panel-alternate-green-div-header-text">
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerHealthPanelAllAboutHealthInsuranceHeading : ''}
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
                                            <h3 className="car_insurance_heading_alternate_buyer">{this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerHealthPanelWhatIsHealthInsuranceHeading : ''}</h3>
                                            <p className="car_insurance_text_alternate_buyer">
                                                Health insurance provides coverage from the costs of medical and surgical emergencies on nominal premiums.
                                                It prevents the individual and his family from financial stress at the time of any such medical issues.
                                            </p>
                                            <p className="car_insurance_text_alternate_buyer">
                                                The increasing medical costs have made health insurance even more beneficial for everyone. Health insurance
                                                provides you freedom from financial stress that arises when there is any medical emergency like accidents or
                                                any other critical health issues. It also helps you in financial planning by offering tax benefits.
                                            </p>
                                        </div>
                                        {/* Another body with white background Types of Family Health Insurance Plan */}
                                        <div className="panel-alternate-green-div-body-2">
                                            <h3 className="alternate-body-2-heading">Why is Health Insurance important?</h3>
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>Having health insurance is quite beneficial due to many reasons, such as:</p>
                                            {this.state.importanceOfInsurance.map((item, index) =>
                                                <p className='why-important-p gbui-menu-bar-1'>
                                                    <span className='heading' style={{ color: '#ea0b4b', textDecoration: 'underline' }}>{index + 1}.{item.heading}</span>
                                                    {item.data}
                                                </p>
                                            )}
                                        </div>
                                        {/* Another body with grey background  Eligibility in Family Health Insurance Plan*/}
                                        <div className="panel-alternate-green-div-body-2" style={{ background: '#f4f4f4' }}>
                                            <h3 className="alternate-body-2-heading">What are the key features of Health Insurance policies?</h3>
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>
                                                Every customer needs a different health insurance plan as per his requirements.  The insurance companies offer varied plans for every such need of the customer, and every policy has different features. Let’s have a look at various features of health insurance policies here:
                                            </p>
                                            {this.state.keyFeaturesOfInsurance.map((item, index) =>
                                                <p className='why-important-p gbui-menu-bar-1'>
                                                    <span className='heading' style={{ color: '#ea0b4b', textDecoration: 'underline' }}>{index + 1}.{item.heading}</span>
                                                    {item.data}
                                                </p>
                                            )}
                                        </div>
                                        {/* Another body with white background Types of Family Health Insurance Plan */}
                                        <div className="panel-alternate-green-div-body-2">
                                            <h3 className="alternate-body-2-heading">What does a health insurance policy cover?</h3>
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>Besides medical expenses, health insurance covers some other benefits as well. Such as</p>
                                            {this.state.whatPolicyCovers.map((item, index) =>
                                                <p className='why-important-p gbui-menu-bar-1'>
                                                    <span className='heading' style={{ color: '#ea0b4b', textDecoration: 'underline' }}>{index + 1}.{item.heading}</span>
                                                    {item.data}
                                                </p>
                                            )}
                                        </div>
                                        {/* Another body with grey background  Eligibility in Family Health Insurance Plan*/}
                                        <div className="panel-alternate-green-div-body-2" style={{ background: '#f4f4f4' }}>
                                            <h3 className="alternate-body-2-heading">What is not covered under health insurance policy?</h3>
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>
                                                Even though medical insurance covers maximum unforeseen medical emergencies, there are some limitations to the policy:
                                            </p>
                                            {this.state.whatPolicyNotCovers.map((item, index) =>
                                                <p className='why-important-p gbui-menu-bar-1'>
                                                    <span className='heading' style={{ color: '#ea0b4b', textDecoration: 'underline' }}>{index + 1}.{item.heading}</span>
                                                    {item.data}
                                                </p>
                                            )}
                                        </div>
                                        {/* Another body with white background Types of Family Health Insurance Plan */}
                                        <div className="panel-alternate-green-div-body-2">
                                            <h3 className="alternate-body-2-heading">What should be checked while buying health insurance?</h3>
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>
                                                There are various factors that must considered before investing in a health insurance plan, we are giving you the top 10 tips to remember.
                                            </p>
                                            {this.state.whatShouldBeChecked.map((item, index) =>
                                                <p className='why-important-p gbui-menu-bar-1'>
                                                    <span className='heading' style={{ color: '#ea0b4b', textDecoration: 'underline' }}>{index + 1}.{item.heading}</span>
                                                    {item.data}
                                                </p>
                                            )}
                                        </div>
                                        {/* Another body with grey background  Eligibility in Family Health Insurance Plan*/}
                                        <div className="panel-alternate-green-div-body-2" style={{ background: '#f4f4f4' }}>
                                            <h3 className="alternate-body-2-heading"> How to choose a right health insurance?</h3>
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>
                                                Want to buy a health insurance but confused about how to find the best plan?
                                                Well, we will help you find the right health insurance for you.
                                                Here are the steps that can be followed to choose the right insurance product for your needs.
                                            </p>
                                            {this.state.howToChoose.map((item, index) =>
                                                <div>
                                                    <p className='why-important-p gbui-menu-bar-1'>
                                                        <span className='heading' style={{ color: '#ea0b4b', textDecoration: 'underline' }}> Step{index + 1}.{item.heading}</span>
                                                        {item.data}
                                                    </p>
                                                    <p className='why-important-p gbui-menu-bar-1'>
                                                        After you have gone through all these steps carefully, you know which health insurance policy you want to buy for yourself and your loved ones. Having a health insurance policy is very important, but it is equally important to buy the best policy based on your requirements.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        {/* Another body with white background Types of Family Health Insurance Plan */}
                                        <div className="panel-alternate-green-div-body-2">
                                            <h3 className="alternate-body-2-heading">What mistakes should be avoided while buying health insurance?</h3>
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>
                                                Mistakes can be made by anyone in anything, but it is necessary to avoid such mistakes. Similarly, mistakes are made while buying health insurance as well, and it results in the customer being dissatisfied with the terms and conditions, the coverage, and the care services. These mistakes ultimately lead to a bad review for the insurance company and a bad experience for the customer. Mistakes are made due to lack of information, blindly trusting the agent, lack of time, not understanding the terms and conditions, and so on.
                                            </p>
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>
                                                Let us have a look at some very common mistakes made by people in buying health insurance, that should be avoided:                                             </p>
                                            {this.state.whatMistakeShoudBeAvoided.map((item, index) =>
                                                <ul>
                                                    <li className='why-important-p gbui-menu-bar-1'>
                                                        {item.data}
                                                    </li>
                                                </ul>
                                            )}
                                        </div>

                                        {/* Another body with grey background  Eligibility in Family Health Insurance Plan*/}
                                        <div className="panel-alternate-green-div-body-2" style={{ background: '#f4f4f4' }}>
                                            <h3 className="alternate-body-2-heading"> What are the steps to buy health insurance plan?</h3>
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>
                                                Everything has some steps and processes involved in its fulfillment.
                                                Buying a health insurance policy also has some steps involved in it.
                                                We will help you in finding the policy for you with some easy steps, such as:
                                            </p>
                                            {this.state.whatStepsToBuyInsurance.map((item, index) =>
                                                <div>
                                                    <p className='why-important-p gbui-menu-bar-1'>
                                                        <span className='heading' style={{ color: '#ea0b4b', textDecoration: 'underline' }}>{index + 1}.{item.heading}</span>
                                                        {item.data}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        {/* Another body with white background Types of Family Health Insurance Plan */}
                                        <div className="panel-alternate-green-div-body-2">
                                            <h3 className="alternate-body-2-heading">What are the types of health insurance policies available?</h3>
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>
                                                There are different varieties of health insurance plans available, such as:
                                            </p>
                                            {this.state.typesOfHealthInsurance.map((item, index) =>
                                                <p className='why-important-p gbui-menu-bar-1'>
                                                    <span className='heading' style={{ color: '#ea0b4b', textDecoration: 'underline' }}>{index + 1}.{item.heading}</span>
                                                    {item.data}
                                                </p>
                                            )}
                                        </div>
                                        {/* Another body with grey background  Eligibility in Family Health Insurance Plan*/}
                                        <div className="panel-alternate-green-div-body-2" style={{ background: '#f4f4f4' }}>
                                            <h3 className="alternate-body-2-heading"> What is the eligibility criteria for Health insurance?</h3>
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>
                                                Almost everyone needs to have health insurance, but those who have dependents and/or families
                                                should compulsorily have health insurance to protect them from financial stress during medical
                                                emergencies. The health insurance policy secures one’s health as the medical expenses stand covered.
                                                Health insurance policy with extended coverage can be opted on the basis of two factors i.e., individual
                                                and family floater.
                                            </p>
                                            <p className="alternate-body-2-small gbui-menu-bar-1 margin-container" style={{ color: '#000000' }}>
                                                The eligibility criteria for health insurance can be categorized as:
                                            </p>
                                            <p className="alternate-body-2-small gbui-menu-bar-1 margin-container" style={{ color: '#000000' }}>
                                                1. 	For adults: 18 to 65 years (65 and above, based on the plan and insurer)
                                            </p>
                                            <p className="alternate-body-2-small gbui-menu-bar-1 margin-container" style={{ color: '#000000' }}>
                                                2. 	For children: 90 days to 18 years
                                            </p>
                                            <p className="alternate-body-2-small gbui-menu-bar-1 margin-container" style={{ color: '#000000' }}>
                                                A health insurance policy can be renewed lifelong, subject to medical clearance.
                                            </p>
                                        </div>
                                        {/* Another body with white background Types of Family Health Insurance Plan */}
                                        <div className="panel-alternate-green-div-body-2">
                                            <h3 className="alternate-body-2-heading">How to compute health insurance premium?</h3>
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>
                                                The amount of premium charged by the insurance companies is determined by
                                                statistics and mathematical calculations, which is done by the underwriting
                                                department of the insurance company. The insurance premium is based on the
                                                factors such as gender, age, family size, geographical location, tenure of policy,
                                                life history, and health.
                                            </p>
                                        </div>
                                        {/* Another body with grey background Types of Family Health Insurance Plan */}
                                        <div className="panel-alternate-green-div-body-2" style={{ background: '#f4f4f4' }}>
                                            <h3 className="alternate-body-2-heading">What are the advantages of buying health insurance online?</h3>
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>
                                                People usually prefer buying policies from agents than through online sources as they don't feel it to be safe. They think that the agents can provide them better deals in the policies, but the truth is that the online policies normally offer various options and are also trending these days.
                                            </p>
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>
                                                The benefits of buying health insurance online can be listed as:
                                            </p>
                                            {this.state.advantagesOfBuyingInsurance.map((item, index) =>
                                                <ul>
                                                    <li className='why-important-p gbui-menu-bar-1'>
                                                        {item.data}
                                                    </li>
                                                </ul>
                                            )}
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>
                                                We at Groupbima, a provide curated policy information to the insured after studying every clause in detail, highlighting key features. We also mention the clauses that are good for user. We implement our value frugality by informing the customers about which policy covers more for less, unlocking hidden clauses to avoid unpleasant surprises at the time of claim, along with insurance companies performance.
                                                Buying policy online is way easier, and safer. It enables you to make informed decisions.
                                            </p>
                                        </div>
                                        {/* Another body with white background Types of Family Health Insurance Plan */}
                                        <div className="panel-alternate-green-div-body-2">
                                            <h3 className="alternate-body-2-heading">What is the claim process involved in health insurance?</h3>
                                            <p className="alternate-body-2-small gbui-menu-bar-1" style={{ color: '#000000' }}>
                                                One can file a claim only against an event that is covered by the insurance policy. Claims for Health insurance policies can be made in two ways i.e., cashless treatment and expense reimbursement by the insurer.
                                            </p>
                                            {this.state.claimProcess.map((item, index) =>
                                                <div>
                                                    <p className='why-important-p gbui-menu-bar-1'>
                                                        <span className='heading' style={{ color: '#ea0b4b', textDecoration: 'underline' }}>{index + 1}.{item.heading}</span>
                                                        {item.data1}
                                                    </p>
                                                    <p className='why-important-p gbui-menu-bar-1'>
                                                        {item.data2}
                                                    </p>
                                                </div>
                                            )}
                                             {this.state.cashlessTreatment.map((item, index) =>
                                                <div>
                                                    <p className='why-important-p gbui-menu-bar-1'>
                                                        {item.data}
                                                    </p>
                                                </div>
                                            )}
                                            {this.state.cashlessTreatmentList.map((item, index) =>
                                                <ul>
                                                    <li className='why-important-p gbui-menu-bar-1'>
                                                        {item.heading}{item.data}
                                                    </li>
                                                </ul>
                                            )}
                                        </div>
                                        <div className='proceedToBuy' style={{ textAlign: 'center' }}  onClick={() => {
                                                window.scrollTo({ left: 0, top: document.getElementById('procceed').offsetTop - 30, behavior: 'smooth' })
                                            }}>
                                            <ButtonLightSuccess Text='Proceed to buy'  fullWarningPink={true}  />
                                        </div>
                                        <div className='viewOurPartners mui--hidden-xs mui--hidden-sm' style={{ textAlign: 'center' }}
                                               onClick={() => {
                                                window.scrollTo({ left: 0, top: document.getElementById('partners').offsetTop - 30, behavior: 'smooth' })
                                            }}>
                                            <ButtonLightSuccess Text='View our partners' fullWarningPink={true}/>
                                        </div>
                                        <div className='viewOurPartners mui--visible-xs-block' style={{ textAlign: 'center' }} 
                                          >
                                            <ButtonLightSuccess Text='View our partners' fullWarningPink={true}  
                                              onClick={() => this.setState({ showCarInsurer: true })}/>
                                        </div>
                                    </div>
                                }
                            </div>
                        </Col>
                        <Col md="3" >
                            <div className="panel-alternate-green-div">
                                <div className="panel-alternate-green-div-header">
                                    <h3 className="panel-alternate-green-div-header-text">
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.AlternateBuyerHealthPanelHeadingCarInsuranceWithUs : ''}
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
                                {this.state.showCarInsurer && <div className="panel-alternate-green-div-body panel-alternate-green-div-body-img right_insurer_img" alt='alternate-buyer-journey' style={{ background: '#ffffff' }}>
                                {/* <div id='partners'><img alt='alternate-buyer-journey' src='/assets/insurerLogo/FG.png'/><br /></div> */}
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
                                    <h3 className="panel-alternate-green-div-header-text">
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

AlternateBuyerHealth.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    CurrentLanguage: state.language.current_language,
    FetchedLanguage: state.language.lang_data,
});

const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AlternateBuyerHealth));







import React, { Component } from 'react'
import Container from 'muicss/lib/react/container'
import { MuiThemeProvider } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Row from 'muicss/lib/react/row'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Col from 'muicss/lib/react/col'
import TextField from '@material-ui/core/TextField'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

// import Fab from '@material-ui/core/Fab'


import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import './index.css'

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,

    },
    panel: {
        margin: '1rem 0rem'
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
    fab: {
        backgroundColor: '#0da176',
        top: 'auto',
        right: 10,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#0da176',
        },
    },
    fab1: {
        backgroundColor: '#0da176',
        top: 'auto',
        right: 10,
        bottom: '16rem',
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#0da176',
        },
    },
    fab2: {
        backgroundColor: '#0da176',
        top: 'auto',
        right: 10,
        bottom: '11rem',
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#0da176',
        },
    },
    fab3: {
        backgroundColor: '#0da176',
        top: 'auto',
        right: 10,
        bottom: '6rem',
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#0da176',
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
    textField:{
        fontFamily: 'Nunito',
        fontSize: '12px',
        color: 'rgba(170, 170, 170, 0.54)',
        '&$focused': {
            color: 'white',
        },
    },
    focused: {},
});

class faq extends Component {
    state = {
        search: '',
        showFab: false,
        filtered: [],
        FaqData:[
            {
                id:'0',
                heading:'Buying health insurance',
                content:[
                    {
                    id:'0',
                    question:'Why to buy health insurance?',
                    answerIntro:<div className='Panelcontent'>Having health insurance is quite beneficial and embracing due to many reasons, such as:</div>,
                    answerContent1:<div className='Panelcontent'><span style={{fontWeight:'bold'}}>Precarious lifestyle increasing health risks:</span>
                                   Spending a hectic and stationary lifestyle in a 
                                   polluted and electronically bothered surrounding, is resulting in unhealthy eating and sleeping habits. 
                                   Having health insurance in such a stressful life will prove to be a blessing to you. It provides you with 
                                   coverage from any health issues that may arise and thus help you to cover the expenses in case of urgency. 
                                   You can go for health insurance policies that provide regular health checkups as well in order to aid any 
                                   issues as and when they arise.</div>,
                    answerContent2:<div className='Panelcontent'><span style={{fontWeight:'bold'}}>Increased rate of life threatening diseases:</span>
                                    The diseases such as cancer, cholesterol, 
                                    diabetes, heart, etc. which were supposed to be affecting older people mostly have been at a rise in young individuals 
                                    as well now. Health insurance proves to be of great service in these cases as it provides financial security for the 
                                    treatment and rehabilitation from such unfortunate cases.</div>,
                    answerContent3:<div className='Panelcontent'><span style={{fontWeight:'bold'}}>Lower premiums:</span>
                                    Everyone loves to have greater benefits at lower costs. And if you take your health insurance policy at a younger age, 
                                    you will have to pay lower premiums for it. Getting early health insurance 
                                    will also help you avail a lot more benefits from the beginning 
                                    and that too on payment of nominal premiums.</div>,
                    answerContent4:<div className='Panelcontent'><span style={{fontWeight:'bold'}}>No waiting period:</span>
                                   Insurance for certain pre-existing or critical diseases have a waiting period in order for you to be eligible to reap 
                                    the benefits. Thus insurance at a young age enables you to sail through the waiting period before any serious issue arises. 
                                    This could be a fulfilling reason to buy health insurance at an early stage in life.</div>,
                    answerContent5:<div className='Panelcontent'><span style={{fontWeight:'bold'}}>Helps in availing tax deductions and planning finance:</span>
                                    You can avail tax deductions on the payment of premium for self-insurance upto Rs. 30,000 and upto Rs. 50,000 for paying the 
                                    premium for health insurance of a senior citizen in the family. With your money saved in the form of deductions and financial 
                                    security from health insurance, you can use it for other more useful purposes like investment and other saving schemes.</div>,
                     answerContent6:<div className='Panelcontent'><span style={{fontWeight:'bold'}}>Cashless hospitalization:</span>
                                    Most health insurance plans allow you to avail the best facilities and treatment without worrying too much about the expenses.  
                                    Under the cashless plan, either a major portion or the entire cost of the covered services is paid directly to the hospital, 
                                    by the insurer.</div>,
                },
                {
                    id:'1',
                    question:'Which Health Insurance one should buy?',
                    answerIntro:<div><div className='Panelcontent'>
                                A Health Insurance policy normally covers the expenses that are reasonable and necessarily come under the heads given below, for each insured person, subject to overall limit of the sum insured, in a policy period:
                                </div>
                                <div className='Panelcontent list'>
                                - Room or Boarding expenses
                                </div>
                                <div className='Panelcontent list'>
                                - Nursing expenses
                                </div>
                                <div className='Panelcontent list'>
                                - Surgeon fees, anesthetist, physician, consultants, specialists
                                </div>
                                <div className='Panelcontent list'>
                                - Anesthesia, blood, oxygen, operation theatre charges, surgical appliances, medicines, drugs, diagnostic materials, X-ray, Dialysis, chemotherapy, Radiotherapy, cost of pacemaker, Artificial limbs, cost or organs, and similar expenses.
                                </div>
                                <div className='Panelcontent'>
                                There are different varieties of health insurance plans available, such as:
                                </div></div>,
                    answerContent1: <div className='Panelcontent'>
                                        <span style={{fontWeight:'bold'}}>Indemnity health Plans: </span> Indemnity plans provide benefits to the customers on hospitalization. Under these plans, medical expenses incurred upto the amount of sum insured is reimbursed to the policyholder.
                                    </div>,
                    answerContent2: <div className='Panelcontent'>
                                      <span style={{fontWeight:'bold'}}>Family floater plan: </span> A Family Health Insurance plan is also known as a Family Floater plan, and offers you coverage from the medical risks and costs, in case of any mishappening or emergency. Family health insurance provides coverage to various members of your family for a fixed assured sum and that too in exchange for a single annual premium. 
                                    </div> ,
                    answerContent3:  <div className='Panelcontent'>
                                      <span style={{fontWeight:'bold'}}>Unit Linked health plans: </span> This plan is a combination of Health insurance plan and market linked investment plan. Here the customer decides the premium that is to be set aside for the health cover. The savings component of the investment doesn’t affect the insurance charges.
                                    </div>,
                    answerContent4:  <div className='Panelcontent'>
                                      <span style={{fontWeight:'bold'}}>Maternity plans: </span> There are many health plans that offer cover for maternity and other additional expenses related to it. These policies include expenses related to pre and postnatal care, delivery of the baby, etc. 
                                    </div>,
                    answerContent5: <div className='Panelcontent'>
                                      <span style={{fontWeight:'bold'}}>Senior citizen plans: </span> The senior citizen health insurance plans provide coverage to the older members of the family and include the health issues that arise due to the increasing age.
                                    </div>,
                    answerContent6: <div className='Panelcontent'>
                                    <span style={{fontWeight:'bold'}}>Top up plan: </span> A top-up health policy provides additional coverage to people who have an existing individual plan or a mediclaim from the employer. It reimburses the expenditure which arises out of single illness, once the limit of the existing cover is exhausted. 
                                    </div>,
                    answerContent7:  <div className='Panelcontent'>
                                    <span style={{fontWeight:'bold'}}>Critical illness plan: </span> This plan provides coverage from various critical illnesses, such as kidney failure, paralysis, cancer, heart attack etc. Critical illness is a serious, possibly terminal, disease and is pre-defined by the provider. It mostly provides a lump-sum benefit if the insured is diagnosed with one or more of the specified terminal conditions. 
                                    </div>,
                    answerContent8:   <div className='Panelcontent'>
                                    <span style={{fontWeight:'bold'}}>OPD plan: </span> OPD plan provides coverage to the insured from expenses other than that incurred during hospitalization. OPD expenses include doctor’s consultation fees, health check-ups, pharmacy bills, dental treatment, diagnostic tests, etc. 
                                    </div>,
                    answerContent9:   <div className='Panelcontent'>
                                        <span style={{fontWeight:'bold'}}>Super Top up plan:  </span>  The super top-up plans pay for the aggregate medical costs, once it exceeds the threshold limit and the sum assured, within a policy year. They are similar to the top-up plans, except that the super top-up plan covers a total of all hospitalization bills above the threshold limit.  
                                    </div>,                   
                },
                {
                    id:'2',
                    question:'What factors should be considered while choosing a health insurance product?',
                    answerIntro:<div className='Panelcontent'> Before you buy a health insurance policy for yourself and your loved ones, certain factors that affect a policy should be kept in mind, such as:</div>,
                    answerContent1: <div className='Panelcontent'>
                                        <span style={{fontWeight:'bold'}}>Sum Insured- </span> The Sum Insured offered under a policy may be on an individual basis or on floater basis for the whole family. 
                                    </div>,
                    answerContent2: <div className='Panelcontent'>
                                      <span style={{fontWeight:'bold'}}>Cumulative Bonus (CB)- </span> Under the Cumulative Bonus benefit, for every claim free year, the Sum Insured is increased by a certain percentage at the time of renewal, which is subject to a maximum percentage (generally 50%). In case of a claim, the bonus will be reduced by 10% at the next renewal.
                                    </div> ,
                    answerContent3:  <div className='Panelcontent'>
                                    <span style={{fontWeight:'bold'}}>Health Check-up cost- </span> The cost of health check-up is reimbursed under many health insurance policies. You should read your policy documents very carefully to understand what is covered under it.
                                    </div>,
                    answerContent4: <div className='Panelcontent'>
                                    <span style={{fontWeight:'bold'}}>Hospitalization period- </span>In order to make a claim under the policy, a minimum stay period in the Hospital is necessary, usually it is a period of 24 hours. This time limit may not apply for accidental injuries and certain other specified treatments. Read the policy documents carefully provision to understand the details.
                                    </div>,
                    answerContent5: <div className='Panelcontent'>
                                    <span style={{fontWeight:'bold'}}>Pre and post hospitalization expenses- </span>Expenses incurred during a certain number of days prior to hospitalization and post-hospitalization may be considered as a part of the claim provided the expenses are related to the covered disease/sickness. Follow specific provision in this regard.
                                    </div>,
                    answerContent6: <div className='Panelcontent'>
                                    <span style={{fontWeight:'bold'}}>Cashless Facility- </span>If the insured takes treatment in any of the network hospitals of the insurer, the maximum amount of hospital bills will be paid by the insurer, directly to the hospital. Expenses beyond the sub-limits prescribed under the policy or expenses relating to the items not covered under the policy are to be paid by the insured directly to the Hospital. In case the treatment is taken in a non-network hospital, insured has to pay the bills first and then claim reimbursement from Insurance Company.
                                    </div>,
                    answerContent7:  <div className='Panelcontent'>
                                    <span style={{fontWeight:'bold'}}>Additional Benefits and other stand-alone policies- </span>Insurance companies also offer various other benefits as “Add-ons” or riders. There are also some stand-alone policies that are designed to give benefits like “Hospital Cash”, “Critical Illness Benefits”, “Surgical Expense Benefits” etc. to the insured. These policies can either be taken separately or in addition to the hospitalization policy.
                                    </div>,
                    answerContent8:  <div className='Panelcontent'>
                                    Products in the nature of Top Up policies are also offered by some insurers to meet the actual expenses over and above the limit available in the basic health policy.
                                    </div>,
                    answerContent9: <div className='Panelcontent'>
                                    <span style={{fontWeight:'bold'}}>Exclusions- </span>You will be extremely disappointed if, at the time of emergency, you come to know that your ailment or medical condition is not covered in your health insurance policy. Hence, it is always wise to read the policy document carefully and know about all the medical conditions which are excluded from your health insurance policy.
                                    </div>,                   
                },
                {
                    id:'3',
                    question:' What does a health insurance policy cover?',
                    answerIntro:<div className='Panelcontent'> Besides medical expenses, health insurance covers some other benefits as well. Such as </div>,
                    answerContent1:  <div className='Panelcontent'>
                                    <span style={{fontWeight:'bold'}}>Cashless facility: </span> A card is issued to the insured by the insurance company and on showing this card in the network hospital, insured can avail the cashless facility. This means that a major portion of the medical expenses will be paid by the insurer, directly to the hospital. The Insurer would have a tie-up on almost all the hospitals already to facilitate the cashless facility.
                                    </div>,
                    answerContent2: <div className='Panelcontent'>
                    <span style={{fontWeight:'bold'}}>Hospitalization cash benefits: </span> Fixed amount for each day an insured is hospitalised is also covered under health insurance policies to reduce the financial burden of the insured. This will help the insured by compensating for the loss of earnings and other costs.
                    </div>,
                    answerContent3:   <div className='Panelcontent'>
                    <span style={{fontWeight:'bold'}}>Pre and post hospitalization costs: </span>  The pre and post hospitalization expenses are usually covered under a health insurance policy for up to 60 to 90 days.
                    </div>,
                    answerContent4: <div className='Panelcontent'>
                    <span style={{fontWeight:'bold'}}>Ambulance charges: </span> Even ambulance charges are covered by some insurance company to relieve the insured from the stress about those charges.
                    </div>,
                    answerContent5: <div className='Panelcontent'>
                    <span style={{fontWeight:'bold'}}>Health checks up: </span> In case there is no Claim for a certain number of years, some company even provides free health check-up to the insured.
                    </div>,
                    answerContent6: <div className='Panelcontent'>
                    <span style={{fontWeight:'bold'}}>Pre existing diseases: </span>Pre-existing diseases are also covered under maximum health insurance policies. Just some waiting period is to be completed to become eligible for a claim against pre-existing diseases.
                    </div>,               
                },
                {
                    id:'4',
                    question:'What is not covered under a health insurance policy?',
                    answerIntro:<div className='Panelcontent'>Even though medical insurance covers maximum unforeseen medical emergencies, there are some limitations to the policy:</div>,
                    answerContent1:   <div className='Panelcontent'>
                                        Even though medical insurance covers maximum unforeseen medical emergencies, there are some limitations to the policy:
                                    </div>,
                    answerContent2: <div className='Panelcontent'>
                    <span style={{fontWeight:'bold'}}>Some specific medical condition: </span>Some medical conditions such as AIDS, replacement of hormones, sex change, etc. are not covered by a health insurance policy. Age-related ailments like Osteoarthritis and Osteoporosis are also not covered for a specific period of time, this time duration is decided by the insurance company.
                    </div>,
                    answerContent3: <div className='Panelcontent'>
                    <span style={{fontWeight:'bold'}}>Cosmetic surgery:  </span>Cosmetic surgeries are usually not covered in health insurance as it does not affect an individual’s life and it is not life-threatening. Cosmetic surgeries, like liposuction, Botox and others are not part of the health insurance coverage.
                    </div>,
                    answerContent4:<div className='Panelcontent'>
                    <span style={{fontWeight:'bold'}}>Cost for Alternative therapy:  </span> Alternative therapy like massage, aromatherapy, reflexology, acupuncture, acupressure, naturopathy, and other related therapies are not covered under health insurance policies as these are not a part of conventional medicines.
                    </div>,
                    answerContent5:  <div className='Panelcontent'>
                    <span style={{fontWeight:'bold'}}>Diagnostic charges:  </span>Diagnosis that are performed at hospital or nursing home, to identify the presence of diseases are not usually payable by health insurance.
                    </div>,
                    answerContent6: <div className='Panelcontent'>
                    <span style={{fontWeight:'bold'}}>Extra charges:  </span>Service charge, registration fees, admission fees, and any other additional charges will not be reimbursed under health insurance.
                    </div>,
                    answerContent7:  <div className='Panelcontent'>
                    <span style={{fontWeight:'bold'}}>Supplements:  </span>Costs for vitamins and other health tonics which are not part of the treatment for any disease or injury is not covered under any health policy. However, when supplements are given by the physician as a part of the treatment when a person is hospitalized, it will be covered in the policy.
                    </div>,                  
                },
                {
                    id:'5',
                    question:`What are the Dos and Don'ts for Health Insurance?`,
                    answerIntro:<div className='Panelcontent'>Due to the increasing Healthcare costs, illness and hospitalization are affecting our finances, our earning capacity, and our daily lives,
                    Let us a look at some Dos and Don’ts for buying Health insurance
                    </div>,
                    answerContent1: <div className='general-info'>Do’s</div>,
                    answerContent2:   <div className='Panelcontent'>
                                    While buying a health insurance policy you should:
                                </div>,
                    answerContent3:<div> <div className='Panelcontent list'>
                                    - Know about the restrictions on coverage
                                   </div>
                                   <div className='Panelcontent list'>
                                     - Understand the terms and conditions in the policy like:
                                    </div>
                                   </div>,
                    answerContent4: <div>
                                    <div className='Panelcontent sublist'>
                                        Inclusion/Exclusion of pre-existing diseases
                                    </div>
                                    <div className='Panelcontent sublist'>
                                        Waiting period before certain diseases
                                    </div>
                                    <div className='Panelcontent sublist'>
                                        Restrictions or limits on various hospitalization expenses
                                    </div>
                                    <div className='Panelcontent sublist'>
                                        Co-payment, which means you have to share a part of the claim
                                    </div>
                                    <div className='Panelcontent sublist'>
                                    Pre-conditions for renewal
                                    </div>
                                    <div className='Panelcontent sublist'>
                                    Upper limits for age at entry and for renewal
                                    </div>
                                    </div>,
                     answerContent5: <div className='Panelcontent list'>
                                    - Disclose details regarding all the pre-existing health problems including
                                </div>,
                     answerContent6: <div>
                                    <div className='Panelcontent sublist'>
                                        Major ailments
                                        </div>
                                        <div className='Panelcontent sublist'>
                                        Conditions like high blood pressure or diabetes
                                        </div>
                                    </div>,
                    answerContent7:<div>
                                    <div className='Panelcontent list'>
                                    - The company may want medical test reports depending on the entry age, you should comply with all procedures and documentation requirements
                                    </div>
                                    <div className='Panelcontent list'>
                                    - Check where and how the medical tests will be carried out
                                    </div>
                                    <div className='Panelcontent list'>
                                    - Check who should bear the cost for the tests
                                    </div>
                                    <div className='Panelcontent list'>
                                    - Pay the premium only after the insurer accepts your proposal
                                    </div>
                                    <div className='Panelcontent list'>
                                    - Renew the policy carefully for the rest of your life
                                    </div>
                                    <div className='general-info'>Don’ts</div>
                                    <div className='Panelcontent list'>
                                    - Never conceal any facts otherwise you might have to face a dispute at the time of a claim
                                    </div>
                                    <div className='Panelcontent list'>
                                    - Don’t make a gap of even one day in your policy renewal, as it may render  your cover insufficient or useless
                                    </div>
                                    <div className='general-info'>General Advice for the time when you decide to buy an insurance policy:</div>
                                    <div className='Panelcontent list'>
                                    - Check if the company selling the policy is registered with IRDAI
                                    </div>
                                    <div className='Panelcontent list'>
                                    - Make sure you buy the policy through a genuine licensed agent or broker. Ask for an identity card or license
                                    </div>
                                    <div className='Panelcontent list'>
                                    - You can also buy policies from the company directly
                                    </div>
                                    <div className='Panelcontent list'>
                                    - Read the policy brochure/ prospectus carefully and get to know what the policy covers and does not cover
                                    </div>
                                    </div>,                 
                },
                {
                    id:'6',
                    question:'What mistakes should be avoided while buying health insurance?',
                    answerIntro:<div className='Panelcontent'> Mistakes can be made by anyone in anything, but it is necessary to avoid such mistakes. Similarly, mistakes are made while buying health insurance as well, and it results in the customer being dissatisfied with the terms and conditions, the coverage, and the care services. These mistakes ultimately lead to a bad review for the insurance company and a bad experience for the customer. Mistakes are made due to lack of information, blindly trusting the agent, lack of time, not understanding the terms and conditions, and so on. 
                    Let us have a look at some very common mistakes made by people in buying health insurance, that should be avoided: 
                    </div>,
                    answerContent1:   <div className='Panelcontent'>
                    Let us have a look at some very common mistakes made by people in buying health insurance, that should be avoided:
                    </div>,
                    answerContent2:  <div className='Panelcontent list'>
                        - Not reading the health insurance policy document thoroughly
                    </div>,
                    answerContent3:   <div className='Panelcontent list'>
                        - Inadequate research before purchasing a policy
                    </div>,
                    answerContent4: <div className='Panelcontent list'>
                        - Not asking questions and clarifying doubts while purchasing a policy
                    </div>,
                    answerContent5:   <div className='Panelcontent list'>
                        - Not opting for sufficient coverage
                    </div>,
                    answerContent6:  <div className='Panelcontent list'>
                    - Opting for coverages and riders not relevant for unique health insurance needs
                  </div>,
                    answerContent7:    <div className='Panelcontent list'>
                    - Dependency on health insurance offered by the employer
                  </div>,
                    answerContent8:  <div className='Panelcontent list'>
                    - Being unaware of the network hospitals of your health insurer
                  </div>,
                },
                {
                    id:'7',
                    question:' Can I cover my family members in one policy?',
                    answerIntro:<div className='Panelcontent'>Yes. You can cover the entire family under a Single Sum Insured. The members of the family who could be covered under the Policy are: 
                    </div>,
                    answerContent1:   <div className='Panelcontent'>
                    A. Proposer 
                    </div>,
                    answerContent2:    <div className='Panelcontent'>
                    B. Proposer’s Spouse  
                    </div>,
                    answerContent3:  <div className='Panelcontent'>
                    C. Proposer’s Dependent Children  
                    </div>,
                    answerContent4:  
                    <div className='Panelcontent'>
                       D. Proposer’s Parents  
                    </div>,
                    answerContent5: 
                    <div className='Panelcontent'>
                       E. Proposer’s In-Laws  
                    </div>,                                     
                },
                {
                    id:'8',
                    question:'Is pre-acceptance medical checkup required?',
                    answerIntro:<div className='Panelcontent'>Pre-acceptance medical test is required to be done by people who are older in age. 
                      A person also needs to undergo this pre-acceptance medical check-up if he has an adverse medical history.
                    </div>,                                     
                },
                {
                    id:'9',
                    question:'How and from whom to Buy Health Insurance?',
                    answerIntro:<div className='Panelcontent'>Pre-acceptance medical test is required to be done by people who are older in age. 
                      A person also needs to undergo this pre-acceptance medical check-up if he has an adverse medical history.
                    </div>,
                    answerContent1:<div className='general-info'> Insurance Intermediaries</div>,
                    answerContent2:<div>
                         <div className='Panelcontent list'>
                                - Insurance is a complex product that represents a promise to compensate the insured or third party, as per the terms and conditions specified, in the event of occurrence of an emergency covered. Usually, there is an intermediary involved in most of the insurance transactions, either an insurance agent (individual or corporate) or an insurance broker.
                        </div>
                        <div className='Panelcontent list'>
                                - Insurance intermediaries work as a bridge between the consumers and insurance companies.
                        </div>
                        <div className='Panelcontent list'>
                                - Insurance brokers are licensed by the IRDAI and governed by the Insurance Regulatory and Development Authority (Insurance Brokers) Regulations, 2002. Individual insurance agents and corporate agents are also licensed by the IRDAI and governed by the Insurance Regulatory and Development Authority (licensing of Individual Insurance Agents) Regulations, 2000 and the Insurance Regulatory and Development Authority (Licensing of Corporate Agents) Regulations, 2002, respectively. These Regulations lay down the Code of Conduct for the respective intermediaries.
                        </div>
                        <div className='Panelcontent list'>
                                - An intermediary has a distinct role to play in the entire life cycle of an insurance product, from the point of sale through policy servicing to the claim servicing. An intermediary shall provide all the material information regarding a proposed cover to enable the prospect of deciding about the best one. The intermediary is required to advise the prospective customer about the policies with complete disclosure and transparency. Once the sale is effected, the intermediary must coordinate effectively between the customer and the insurer for policy servicing as well as claim servicing.
                        </div>
                        <div className='Panelcontent list'>
                                - IRDAI has prescribed regulations for protecting policyholders’ interest, casting obligations not only on the Insurers but also the Intermediaries. The obligations at the point of sale, as well as policy servicing and claims servicing,  are prescribed.
                        </div>
                        <div className='Panelcontent' style={{fontWeight:'bold'}}>
                            How to deal with the Insurance Intermediaries
                        </div>
                        <div className='Panelcontent'>
                            While dealing with the Insurance Intermediaries, do check the following points:
                        </div>
                        <div className='Panelcontent list'>
                            - Check that the person has a valid license and is authorized for the particular business. For example, the Intermediary should be licensed to sell life insurance or general insurance or both (holding a composite license). 
                        </div>
                        <div className='Panelcontent list'>
                            - Make sure that he or she has a good knowledge of various insurance products/policies. 
                        </div>
                        <div className='Panelcontent list'>
                            - He or she should understand your needs. Always ensure that you consider only those products that you can afford. Beware of the big promises and over-selling tactics. 
                        </div>
                        <div className='Panelcontent list'>
                            - Ask questions and understand the policy terms and conditions of the policy the Intermediary is trying to explain to you. 
                        </div>
                        <div className='Panelcontent list'>
                            - You must understand what your responsibilities are. What are the payments or amounts that you have to bear not only when you take the policy but also when you surrender it or when you make a claim. 
                        </div>
                        <div className='Panelcontent list'>
                            - Ask for brochures and sales documents related to the product you are considering or the intermediary is trying to sell. Get the intermediary to explain the full facts of the products, scope of cover and exclusions, as applicable. 
                        </div>
                        <div className='Panelcontent list'>
                            - Insist on quality delivery and timely service. It can be judged by the turnaround time of the intermediary during the period of pre-sale when he or she is dealing with you. 
                        </div>
                        <div className='Panelcontent list'>
                            - Fill up the proposal form yourself and never sign any blank proposal form. If you find any term in the proposal form that you do not understand, ask the intermediary to explain it to you. 
                        </div>
                        <div className='Panelcontent list'>
                            - Check whether the intermediary is authorized by the insurance company to make the premium payments if you want to do it through an intermediary. Insist on a  duly signed premium receipt immediately. 
                        </div>
                        <div className='Panelcontent list'>
                            - Once you have received your policy, go through it thoroughly and make sure that you understand every term mentioned in there, contact your intermediary if you face any difficulties. Remember that for a health insurance policy has a term of three years or more, there is a free-look period within which you may return the policy if you do not agree with the terms and conditions mentioned therein. 
                        </div>
                        <div className='Panelcontent list'>
                            - Ask and understand every document and procedure involved in making a claim and understand them completely by the intermediary. In the event of a claim, there may be other agencies you may have to intimate apart from the insurance company. Get complete details about what you are expected to do. 
                        </div>
                    </div>,
                                                       
                },
              ]
            },
            {
                id:'1',
                heading:'Health Insurance Products',
                content:[
                    {
                    id:'0',
                    question:'What is Health insurance?',
                    answerIntro:<div className='Panelcontent'>
                    Health insurance provides coverage from the costs of medical and surgical emergencies on nominal premiums. It prevents the individual and his family from financial stress at the time of any such medical issues.
                  </div>, 
                   
                },
                {
                    id:'1',
                    question:'What are the forms of Health Insurance available?',
                    answerIntro: <div className='Panelcontent'>
                    The most common form of Health Insurance in India covers the expenses incurred on hospitalization of the insured, though a variety of other health insurance products are available that offer a range of health covers, as per the requirements and choice of the insured such as indemnity health plans, family floater plans, maternity plans, senior citizen plans, critical illness plans, etc. 
                  </div>,
                   
                },
                {
                    id:'2',
                    question:'What are the factors that affect a health insurance premium?',
                    answerIntro: <div className='Panelcontent'>
                    Certain factors that affect a health insurance premium are:
                    </div>,
                    answerContent1:<div className='Panelcontent'>
                    <span style={{fontWeight:'bold'}}>Age- </span>It is a major factor in determining the premium as the older you are the premium cost will be higher because you are more prone to illnesses.
                    </div>,
                    answerContent2:<div className='Panelcontent'>
                    <span style={{fontWeight:'bold'}}>Medical history- </span>Previous medical history is another major factor that determines the premium. If no prior medical history exists, the premium will be lower automatically. 
                    </div>,
                    answerContent3:<div className='Panelcontent'>
                    <span style={{fontWeight:'bold'}}>Claim free years- </span>Claim free years can also be a factor in determining the premium cost as it might benefit you with a certain percentage of discount. This will automatically help reduce your premium.
                    </div>                   
                },
                {
                    id:'3',
                    question:'Can I transfer my policy from insurer to another without losing the renewal benefits?',
                    answerIntro: <div className='Panelcontent'>
                     Yes. IRDAI (Insurance Regulatory and Development Authority of India) has directed the insurance companies to allow portability from 
                     one insurance company to another and from one plan to another, without making the insured to lose the renewal credits for pre-existing 
                     conditions, enjoyed in the previous policy, though a circular effective from 1st October 2011. However, this benefit will be limited to 
                     the Sum Insured (including Bonus) under the previous policy.
                    </div>,               
                },
                {
                    id:'4',
                    question:'What are the key features of Health Insurance policies?',
                    answerIntro: <div className='Panelcontent'>
                      Every customer needs a different health insurance plan as per his requirements. 
                      The insurance companies offer varied plans for every such need of the customer, and every policy has different features. 
                      Let’s have a look at various features of health insurance policies here:
                    </div>,  
                    answerContent1: <div>
                    <Col md={12}>
                        <div className='Panelcontent'>
                           Every customer needs a different health insurance plan as per his requirements.  The insurance companies offer varied plans for every such need of the customer, and every policy has different features. Let’s have a look at various features of health insurance policies here:
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                        <span style={{fontWeight:'bold'}}>Day care features: </span> Daycare procedures such as radiotherapy, chemotherapy, eye surgery, dialysis, etc. do not require the patients to be hospitalized for 24 hours in order to avail the claims.
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                        <span style={{fontWeight:'bold'}}>Critical illness: </span> Many health insurance policies cover critical illness such as cancer, heart attack, coronary artery disease, stroke, paralysis, major organ transplant, chronic lung disease, Parkinson’s, etc.
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                        <span style={{fontWeight:'bold'}}>Ambulance cover:  </span> The expenses incurred on availing the ambulance services is also covered by maximum health insurance policies.
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                        <span style={{fontWeight:'bold'}}>Medical check-ups:  </span> Most insurers make it compulsory for the person to get their health checked before buying the policy if he/ she is suffering through any critical illness or is high in age.
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                        <span style={{fontWeight:'bold'}}>Pre and Post hospitalization expenses: </span>Maximum insurance policies these days cover the expenses incurred a few days prior to hospitalization, as well as few days after hospitalization. 
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                        <span style={{fontWeight:'bold'}}>No Claim Bonus: </span>NCB is a type of benefit that the policyholder receives from the insurer if he doesn’t make any claims during the policy term. It ranges within a certain percentage of the sum insured and can be accumulated over the years. The maximum limit for NCB is up to the original sum insured, as specified by the insurance provider.
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                        <span style={{fontWeight:'bold'}}>Co-Payment: </span> Co-pay is a fixed portion of a claim for the covered services, that is to be paid by the insured himself out-of-pocket at the time of receiving the services. It is represented as a certain percentage of the claim. The amount of co-payment varies as per the type of health care services covered under the policy. 
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                        <span style={{fontWeight:'bold'}}>Tax Benefits of Health Insurance: </span>You can avail tax deductions on the payment of premium for self-insurance upto Rs. 30,000 and upto Rs. 50,000 for paying the premium for health insurance of a senior citizen in the family. With your money saved in the form of deductions and financial security from health insurance, you can use it for other more useful purposes like investment and other saving schemes.
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                        <span style={{fontWeight:'bold'}}>Third Party Administrator: </span> TPA is a person registered under the IRDAI and authorized to process claims in addition to providing cashless facilities, working as an outsourcing agency of an insurance company. He is engaged for a fee or remuneration by an insurance company.
                        </div>
                    </Col>
                </div>             
                },
                {
                    id:'5',
                    question:' How to choose a right health insurance?',
                    answerIntro: <div className='Panelcontent'>
                            Want to buy a health insurance but confused about how to find the best plan? 
                            Well, we will help you find the right health insurance for you. 
                            Here are the steps that can be followed to choose the right insurance product for your needs.
                           </div>,     
                    answerContent1: <div>
                    <Col md={12}>
                        <div className='Panelcontent'>
                          Want to buy a health insurance but confused about how to find the best plan? 
                        </div>
                        <div className='Panelcontent'>
                          Well, we will help you find the right health insurance for you. 
                        </div>
                        <div className='Panelcontent'>
                          Here are the steps that can be followed to choose the right insurance product for your needs. 
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                        <span style={{fontWeight:'bold'}}>Step 1. Know Your Needs: </span> Everybody has a different health condition in comparison to others. Thus, the policy that you or your family members need may not be the same as required by your friends. Know what you need from your health insurance, and then choose the policy that best fits your requirements.
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                        <span style={{fontWeight:'bold'}}>Step 2. Compare policies: </span> When you are certain about your needs from the health policy, you need to compare the options available based on various features. Compare the prices, the features and the total coverage offered. Also see what benefits and add-ons are available, as many insurers offer services such as wellness benefits and vaccination cover.
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                        <span style={{fontWeight:'bold'}}>Step 3. Research about Insurer:  </span> Always consider an insurer with good financial and service records as an insurer with a low claim settlement ratio may bring trouble. The time period for which an insurer is serving in the market is also worth keeping in mind. Its expertise is reflected in the types of policies it offers. An insurer with an enriched product portfolio is a good choice.
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                        <span style={{fontWeight:'bold'}}>Step 4. Check the Network Hospitals:  </span>Do have a look if your preferred hospital is included in the insurer’s network hospitals list. Network hospitals help you get a cashless treatment. Go for the insurer that has tie-ups with leading hospitals that you would prefer in case of any medical emergency. Also make sure that these hospitals are near to where you live.
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                        <span style={{fontWeight:'bold'}}>Step 5: Compare costs  </span>Summary of benefits of any policy should clearly mention how much you’ll have to pay out of pocket for medical services. As a consumer, the costs that you need to pay consists of the deductible and copayments. Usually, the lower your premium, the higher your out-of-pocket costs.
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                        <span style={{fontWeight:'bold'}}>Step 6: Compare benefits  </span>After comparing the features and costs, go to the summary of benefits to see which plans cover a wider scope of services. Some may have better coverage for things like physical therapy or mental health care, while others might have better emergency coverage.
                        </div>
                    </Col>
                </div>         
                },
                {
                    id:'6',
                    question:'What is the eligibility criteria for Health insurance?',
                    answerIntro: <div className='Panelcontent'>
                           </div>,     
                    answerContent1:  <div>
                    <Col md={12}>
                        <div className='Panelcontent'>
                          Almost everyone needs to have health insurance, but those who have dependents and/or families should compulsorily have health insurance to protect them from financial stress during medical emergencies. The health insurance policy secures one’s health as the medical expenses stand covered. Health insurance policy with extended coverage can be opted on the basis of two factors i.e., individual and family floater. 
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='Panelcontent'>
                           The eligibility criteria for health insurance can be categorized as:
                        </div>
                        <div className='Panelcontent list'>
                             - For adults: 18 to 65 years (65 and above, based on the plan and insurer)
                        </div>
                        <div className='Panelcontent list'>
                             - For children: 90 days to 18 years
                        </div>
                        <div className='Panelcontent'>
                           A health insurance policy can be renewed lifelong, subject to medical clearance.
                        </div>
                    </Col>
                </div>
                },
              ]
            },
            {
                id:'2',
                heading:'Insurance Processes',
                content:[
                    {
                        id:'0',
                        question:'Can I cancel my policy? If yes, will I get my premium back?',
                        answerIntro: <div>
                            <Col md={12}>
                                <div className='Panelcontent'>
                                Yes, you can cancel a policy after you buy it. A free look period of 15 days is provided to you after buying a policy to understand the terms and conditions. In case there is any objectionable clause, you can cancel the policy and get a refund. Stamp duty, expenses on medical check-up and proportionate risk premium (the number of days that the insurance company was at risk of bearing your health expenses) would be calculated while the premium amount is refunded. Refer the policy termination or policy cancellation section in your policy wording to know the amount that would be refunded.
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className='Panelcontent'>
                                Health policy can also be canceled, after the end of the grace period,  provided no claims have been made under it. The premium amount will be refunded as per the cancellation guidelines defined in the Policy documents.
                                </div>
                            </Col>
                        </div>
                    },
                    {
                        id:'1',
                        question:'How to make a claim?',
                        answerIntro:  <div>
                        <Col md={12}>
                            <div className='Panelcontent'>
                              The primary thing to do is intimate the insurance company and lodge the claim. Depending on the event, one may follow a different procedure. However, one must keep the following things ready at the time of intimation –
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className='Panelcontent list'>
                                - Name of the insured.
                            </div>
                            <div className='Panelcontent list'>
                                - Contact details of the insured/Claimant.
                            </div>
                            <div className='Panelcontent list'>
                                - Policy document.
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className='Panelcontent'>
                              Claims can be registered in two ways:
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className='Panelcontent'>
                            <span style={{fontWeight:'bold'}}>a) Cashless claims: </span>  You must contact the TPA (Third Party Administrator) help desk at the time of hospital admission. Submit the claim form along with the doctor’s reports to seek approval. Once the request is approved, TPA settles the bill directly with the hospital.
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className='Panelcontent'>
                            <span style={{fontWeight:'bold'}}>b) Reimbursement claim:  </span>Once hospitalization is completed and the hospital bill is settled, you need to send the claim form, discharge form along with the doctor’s prescriptions and reports to the insurer. The insurer investigates the documents submitted and then revert backs with the decision on claim settlement.
                            </div>
                        </Col>
                    </div>
                    },
                    {
                        id:'2',
                        question:' What do you need to do if anybody covered in the policy needs to get hospitalized?  ',
                        answerIntro:  <div className='Panelcontent'>
                        Upon the happening of any event which may give rise to a claim under the policy, please immediately intimate the TPA (Third Party Administrator),  with all the details such as the name of the Hospital, details of treatment, patient name, policy number etc. In case of emergency Hospitalisation, this information needs to be given to the TPA within 24 hours from the time of Hospitalisation. This is an important condition that you need to comply with. 
                         </div>
                    },
                    {
                        id:'3',
                        question:'In case of Ayurvedic treatment, will the entire amount be paid?',
                        answerIntro:  <div>
                            <div className='Panelcontent'>
                            The liability of the company in case of Ayurvedic / Homoeopathic / Unani treatment will be limited to a certain percentage of the Sum Insured, provided the treatment is taken in a government Hospital or in any institute recognized by government or accredited by Quality Council Of India or National Accreditation Board on Health, excluding centers for spas, massage and health rejuvenation procedures.
                            </div>
                    </div>
                    },
                    {
                        id:'4',
                        question:' Is there a limit to what the company will pay for hospitalization? ',
                        answerIntro:  <div>
                        <Col md={12}>
                            <div className='Panelcontent'>
                            Yes. The hospitalization expenses are paid up to a limit known as Sum Insured. In cases where the insured person was hospitalized more than once, the total of all amounts paid
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className='Panelcontent list'>
                              for all cases of Hospitalisation, 
                            </div>
                            <div className='Panelcontent list'>
                              expenses paid for medical expenses prior to Hospitalisation, and 
                            </div>
                            <div className='Panelcontent list'>
                                expenses paid for medical expenses after discharge from Hospital
                                shall not exceed the sum insured. The Sum Insured under the policy is available for any or all the members 
                                covered for one or more claims during the tenure of the policy.
                            </div>
                        </Col>
                    </div>
                    },
                    {
                        id:'5',
                        question:'What if my room rent is above the policy limit?',
                        answerIntro:  <div>
                        <Col md={12}>
                            <div className='Panelcontent'>
                            In case you exceed the room-rent limit provided under your policy, the insurer might proportionately reduce the reimbursement sub-limits on all other medical expenses associated with it. The reimbursement sub-limits on the medical expenses associated are reduced in the same proportion as the permissible limit for room-rent under your policy exceeds. This will result in the partial payment of the claim by the insurer and then you will have to meet the balance expense from your own pocket.
                            </div>
                        </Col>
                    </div>
                    },
                    {
                        id:'6',
                        question:'What happens to the policy coverage once a claim is made?',
                        answerIntro:  <div className='Panelcontent'>
                        Once an insured files a claim and it is settled, the policy coverage is reduced by the amount that has been paid for the claim. For Example: You started a policy with a coverage of Rs.10 lakhs for a year and you make a claim of Rs.4 lakhs during the year. Then the coverage available for the rest of the year, after the claim, will be the balance of Rs.6 lakhs.
                      </div>
                    },
                    {
                        id:'7',
                        question:'What is the maximum number of claims that are allowed during a year?',
                        answerIntro:  <div className='Panelcontent'>
                        Any number of claims is allowed throughout the policy period, unless a specific limit is  prescribed in the policy. However, the maximum limit of claims is upto the sum insured.
                      </div>
                    },
                    {
                        id:'8',
                        question:'How long is the policy valid?',
                        answerIntro: <div className='Panelcontent'>
                        The Policy is valid during the period of Insurance stated in the schedule attached to the policy. Usually, it is valid for a period of one year from the date of the beginning of insurance. 
                        </div>
                    },
                    {
                        id:'9',
                        question:'Can the policy be renewed when the present policy expires? ',
                        answerIntro: <div className='Panelcontent'>
                        Yes. You can renew the Policy before the expiry of the present policy. Renewing the policy will also help you to get all the continuity benefits under the Policy.
                        </div>
                    },
                    {
                        id:'10',
                        question:'Is there any grace period for renewal of the policy?',
                        answerIntro:
                        <div className='Panelcontent'>
                          Yes. If your Policy is renewed within 15 days of the expiry of the previous policy, then the continuity benefits would not be affected. Any illness contracted or injury sustained or hospitalization commencing during the break in insurance is not covered, even if you renew your Policy within 15 days of the expiry of previous policy. So it will be beneficial for you to renew your policy within the given time period. 
                        </div>
                    },
                ]    
            },
            {
                id:'3',
                heading:'Terminologies',
                content:[
                    {
                        id:'0',
                        question:'What is NCB in Insurance?',
                        answerIntro:  <div>
                            <Col md={12}>
                                <div className='Panelcontent'>
                                No-claim bonus is the additional coverage provided by the insurer if the policyholder does not make any claims in the policy year. It is provided as an additional increase in the sum assured or as a rebate on the renewal premium, and can be availed by the policyholder while renewing his health insurance policy. 
                                </div>
                                <div className='Panelcontent'>
                                NCB can be claimed on the first renewal of the policy on the condition that there was no claim made in the past year. 
                                </div>
                            </Col>
                        </div>
                    },
                    {
                        id:'1',
                        question:'What do pre-existing diseases mean?',
                        answerIntro:   <div>
                            <Col md={12}>
                                <div className='Panelcontent'>
                                It refers to "Any condition, ailment or Injury or related condition(s) for which the Insured Person had:
                                </div>
                                <div className='Panelcontent list'>
                                A.  Signs or symptoms, or
                                </div>
                                <div className='Panelcontent list'>
                                B. Been diagnosed or received medical advice, or
                                </div>
                                <div className='Panelcontent list'>
                                C. Been treated for any condition or disease, prior to the commencement of the policy.” Pre-existing diseases are covered under the policy after completion of some waiting period, given in the policy.
                                </div>
                            </Col>
                        </div>
                    },
                    {
                        id:'2',
                        question:'What is critical care benefit?',
                        answerIntro:   <div>
                        <Col md={12}>
                            <div className='Panelcontent'>
                              If during the Period of Insurance any Insured Person discovers that he/she is suffering from any Critical Illness such as:
                            </div>
                            <div className='Panelcontent list'>
                              A.  Cancer
                            </div>
                            <div className='Panelcontent list'>
                              B.  First Heart attack of specified severity
                            </div>
                            <div className='Panelcontent list'>
                              C.  Open chest CABG 
                            </div>
                            <div className='Panelcontent list'>
                              D.  Open Heart replacement or repair of Heart Valves 
                            </div>
                            <div className='Panelcontent list'>
                              E.  Coma of specified severity 
                            </div>
                            <div className='Panelcontent list'>
                              F.  Kidney failure requiring regular dialysis  
                            </div>
                            <div className='Panelcontent list'>
                              G.  Stroke resulting in permanent symptoms  
                            </div>
                            <div className='Panelcontent list'>
                              H.  Major organ/bone marrow transplant  
                            </div>
                            <div className='Panelcontent list'>
                              I.  Permanent paralysis of limbs  
                            </div>
                            <div className='Panelcontent list'>
                              J.  Motor neuron disease with permanent symptoms   
                            </div>
                            <div className='Panelcontent list'>
                              K.  Multiple sclerosis with persisting symptoms   
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className='Panelcontent'>
                              The critical illness cover may work either as a standalone policy or as a part of any existing health insurance policy. Depending upon a policy, a number of illnesses remain covered. Stroke, cancer, bypass of a coronary artery, paralysis and major organ failure are some illnesses covered under most of the plans.
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className='Panelcontent'>
                             Any payment under this benefit will be in addition to the sum insured and will not affect the sum insured.
                            </div>
                        </Col>
                    </div>
                    },
                    {
                        id:'3',
                        question:'What is new born baby cover?',
                        answerIntro: <div>
                                <Col md={12}>
                                    <div className='Panelcontent'>
                                    A New Born Baby to an insured mother, who has a Continuous Coverage, is covered for any Illness or Injury from the date of birth till the expiry of the Policy, within the terms of the Policy, without any additional Premium. 
                                    </div>
                                </Col>
                            </div>
                    },
                    {
                        id:'4',
                        question:'What is ‘Any one illness’?',
                        answerIntro: <div>
                        <Col md={12}>
                            <div className='Panelcontent'>
                              'Any one illness' means the continuous period of illness, including the relapse time within a certain number of days as specified in the policy. Usually it is 45 days.
                            </div>
                        </Col>
                       </div>
                    },
                    {
                        id:'5',
                        question:'What is health check facility?',
                        answerIntro:  <div>
                        <Col md={12}>
                            <div className='Panelcontent'>
                            Some health insurance policies pay for some specified expenses incurred towards the general health check up once in a few years. Normally this facility is available once in four years.
                            </div>
                        </Col>
                      </div>
                    },
                    {
                        id:'6',
                        question:'What do you mean by Family Floater Policy?',
                        answerIntro: <div>
                            <Col md={12}>
                                <div className='Panelcontent'>
                                A Family Health Insurance plan is also known as Family Floater plan, and offers you coverage from the medical risks and costs, in case of any mis-happening or emergency. Family health insurance provides coverage to various members of your family for a fixed assured sum and that too in exchange of a single annual premium. 
                                </div>
                            </Col>
                        </div>
                    },
                ]
            },
            {
                id:'4',
                heading:'Regulation',
                content:[
                    {
                        id:'0',
                        question:'What are the key activities of IRDAI?',
                        answerIntro: <div>
                        <Col md={12}>
                            <div className='Panelcontent'>
                               IRDAI stands for Insurance Regulatory and Development Authority of India.
                            </div>
                            <div className='Panelcontent list'>
                            Frames regulations for the insurance industry in terms of Section 114A of the Insurance Act 1938
                            </div>
                            <div className='Panelcontent list'>
                            From the year 2000 has registered new insurance companies in accordance with  regulations                                                    </div>
                            <div className='Panelcontent list'>
                            Monitors insurance sector activities for a healthy development of the industry and protection of policyholders’ interests                                                    </div>
                        </Col>
                    </div>
                    },   
                    {
                        id:'1',
                        question:'What is the role and responsibility of IRDAI?',
                        answerIntro: <div>
                        <Col md={12}>
                            <div className='Panelcontent'>
                            IRDAI has to fulfill the following roles and responsibilities:                                                    
                            </div>
                            <div className='Panelcontent list'>
                            Registering and regulating insurance companies
                            </div>
                            <div className='Panelcontent list'>
                            Protecting policyholders’ interests
                            </div>
                            <div className='Panelcontent list'>
                            Licensing and establishing norms for insurance intermediaries
                            </div>
                            <div className='Panelcontent list'>
                            Promoting professional organizations in insurance
                            </div>
                            <div className='Panelcontent list'>
                            Regulating and overseeing premium rates and terms of non-life insurance covers
                            </div>
                            <div className='Panelcontent list'>
                            Specifying financial reporting norms of insurance companies
                            </div>
                            <div className='Panelcontent list'>
                            Regulating investment of policyholders’ funds by insurance companies
                            </div>
                            <div className='Panelcontent list'>
                            Ensuring the maintenance of solvency margin by insurance companies
                            </div>
                            <div className='Panelcontent list'>
                            Ensuring insurance coverage in rural areas and of vulnerable sections of society
                            </div>
                        </Col>
                    </div>
                    },
                    {
                        id:'2',
                        question:' How to make a complaint?',
                        answerIntro:  <div>
                        <Col md={12}>
                            <div className='Panelcontent'>
                            If you have any issues with your insurance company, you can
                            </div>
                            <div className='Panelcontent list'>
                            Approach the Grievance Redressal Officer of its branch or any other office that you deal with.
                            </div>
                            <div className='Panelcontent list'>
                            Give your complaint in writing along with the necessary documents supporting it                                                    
                            </div>
                            <div className='Panelcontent list'>
                            Take a written acknowledgment of your complaint with the date.                                                    
                            </div>
                            <div className='Panelcontent'>
                            The insurance company should solve your query within a reasonable time period.
                            </div>
                            <div className='Panelcontent list'>
                            In case if it is not addressed within 15 days or if you are not happy with their resolution you can approach the Grievance Redressal Cell of the Consumer Affairs Department of IRDAI:                                                    
                            </div>
                            <div className='Panelcontent sublist'>
                            Call Toll Free Number 155255 (or) 1800 4254 732 or                                                    
                            </div>
                            <div className='Panelcontent sublist'>
                            Send an e-mail to complaints@irda.gov.in                                                    
                            </div>
                            <div className='Panelcontent list'>
                            Send a letter to IRDAI with your complaint:                                                    
                            </div>
                            <div className='Panelcontent sublist'>
                            Click here to download Complaint Registration Form                                                    
                            </div>
                            <div className='Panelcontent sublist'>
                            Fill and send the Complaint Registration Form along with any letter or enclosures, if felt necessary, by post or courier to:                                                   
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='Panelcontent sublist'>
                                General Manager
                                Consumer Affairs Department- Grievance Redressal Cell,
                                Insurance Regulatory and Development Authority of India(IRDAI),
                                Sy.No.115/1,Financial District, Nanakramguda,
                                Gachibowli, Hyderabad-500032

                            </div>
                        </Col>
                    </div>
                    },   
                    {
                        id:'3',
                        question:'What is Integrated Grievance Management System of IRDAI?',
                        answerIntro: <div>
                        <Col md={12}>
                            <div className='Panelcontent'>
                               IRDAI has launched a Integrated Grievance Management System (IGMS) in 2010. Besides creating a central repository of industry-wide insurance grievance data, IGMS is a grievance redressal monitoring tool for IRDAI. Policyholders who have grievances can register their complaints with the Grievance Redress Channel of the Insurance Company first. If policyholders are unable to access the insurance company directly due to any reason, IGMS provides a gateway to register complaints with insurance companies.
                               Complaints shall be registered with insurance companies first and only if necessary, should be escalated to IRDAI (Consumer Affairs Department). IGMS is a comprehensive solution which not only provides centralised and online access to the policyholder but also has complete access and control to IRDAI for monitoring market conduct issues for which are the main indicators for the policyholder grievances. IGMS has the ability to classify different complaint types based on pre-defined rules. The system is able to assign, store and track unique complaint IDs. It also sends intimations to various stakeholders as required, within the workflow. The system has defined target Turnaround Times (TATs) and measures the actual TATs on all the complaints. IGMS sets up alerts for pending tasks nearing the laid down Turnaround Time. The system automatically triggers activities at the appropriate time through rule-based workflows.
                            </div>
                            <div className='Panelcontent'>
                               A complaint registered through IGMS will flow to the insurer's system as well as the IRDAI repository. Updated status will be mirrored in the IRDAI system. 
                               Thus IGMS provides a standard platform to all the insurers to resolve policyholder grievances and provides IRDAI with a tool to monitor the effectiveness of the grievance redress system of insurers.
                            </div>
                        </Col>
                    </div>
                    },   
                    {
                        id:'4',
                        question:'What is the role of Ombudsman in Insurance?',
                        answerIntro:<div>
                        <Col md={12}>
                            <div className='Panelcontent'>
                            The Insurance Ombudsman scheme was created by the Government of India with the purpose to help the individual policyholders in settling their complaints out of the courts’ system in a cost-effective, efficient and impartial way.
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className='Panelcontent'>
                            Presently there are 17 Insurance Ombudsman in different locations. Any person having a grievance against an insurer may make a complaint to the Insurance Ombudsman within whose territorial jurisdiction the branch or office of the insurer complained against or the residential address or place of residence of the complainant is located. The complaint can be made either by the policyholder himself or through his legal heirs, nominee or assignee,  in writing.                                                    </div>
                        </Col>
                        <Col md={12}>
                            <div className='Panelcontent' style={{fontWeight:'bold'}}>
                            You can approach the Ombudsman with a complaint in case:
                            </div>
                            <div className='Panelcontent list'>
                             You have first approached your insurance company with the complaint and
                            </div>
                            <div className='Panelcontent sublist'>
                             It was rejected by them                                                    
                            </div>
                            <div className='Panelcontent sublist'>
                              It was not resolved to your satisfaction or                                                    
                            </div>
                            <div className='Panelcontent sublist'>
                              They did not respond to it at all for 30 days                                                    
                            </div>
                            <div className='Panelcontent list'>
                            Your complaint is in regard to any policy that you have taken in your capacity as an individual and
                            </div>
                            <div className='Panelcontent list'>
                            The value of the claim including expenses is not above Rs 30 lakhs.
                            </div>
                            <div className='Panelcontent' style={{fontWeight:'bold'}}>
                            You can file a complaint to the Ombudsman about the following issues:
                            </div>
                            <div className='Panelcontent list'>
                             Delay in settlement of claims, beyond the time specified in the regulations, framed under the IRDAI Act, 1999.
                            </div>
                            <div className='Panelcontent list'>
                            Any partial or total repudiation of claims by the Life insurer, General insurer or the Health insurer.
                            </div>
                            <div className='Panelcontent list'>
                            Any dispute about premium paid or payable in terms of an insurance policy
                            </div>
                            <div className='Panelcontent list'>
                            Misrepresentation of policy terms and conditions at any time in the policy document or policy contract.
                            </div>
                            <div className='Panelcontent list'>
                            Legal construction of insurance policies in so far as the dispute relates to claim.
                            </div>
                            <div className='Panelcontent list'>
                            Policy servicing related grievances against insurers and their agents and intermediaries.
                            </div>
                            <div className='Panelcontent list'>
                            Issuance of life insurance policy, general insurance policy including health insurance policy which is not in conformity with the proposal form submitted by the proposer.
                            </div>
                            <div className='Panelcontent list'>
                            Non-issuance of an insurance policy after receipt of premium in life insurance and general insurance including health insurance and                                                    
                            </div>
                            <div className='Panelcontent list'>
                            Any other matter resulting from the violation of provisions of the Insurance Act, 1938 or the regulations, circulars, guidelines or instructions issued by the IRDAI from time to time or the terms and conditions of the policy contract                                                    
                            </div>
                            <div className='Panelcontent' style={{fontWeight:'bold'}}>
                            The settlement process Recommendation:
                            </div>
                            <div className='Panelcontent'>
                            The Ombudsman will act as a mediator and
                            </div>
                            <div className='Panelcontent list'>
                            Arrive at a fair recommendation on the basis of facts of the dispute
                            </div>
                            <div className='Panelcontent list'>
                            If a full and final settlement is accepted by you, then the Ombudsman will infor
                            </div>
                            <div className='Panelcontent' style={{fontWeight:'bold'}}>
                            Award:
                            </div>
                            <div className='Panelcontent'>
                            If a settlement by the recommendation does not work, the Ombudsman will:
                            </div>
                            <div className='Panelcontent list'>
                            Pass an award within 3 months of receiving all the requirements from the complainant, which will be binding on the insurance company
                            </div>
                            <div className='Panelcontent' style={{fontWeight:'bold'}}>
                            Once the Award is passed
                            </div>
                            <div className='Panelcontent list'>
                            The Insurer shall comply with the award passed by the Ombudsman within 30 days of receipt of the award and also intimate the compliance of the same to the Ombudsman.
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className='Panelcontent'>
                             Health policy can also be canceled, after the end of the grace period,  provided no claims have been made under it. The premium amount will be refunded as per the cancellation guidelines defined in the Policy documents.
                            </div>
                        </Col>
                    </div>
                    },   
                ]
            },
            {
                id:'5',
                heading:'GroupBima',
                content:[
                    {
                        id:'0',
                        question:'What does GroupBima do?',
                        answerIntro: <div>
                        <Col md={12}>
                            <div className='Panelcontent'>
                                We are an insurance broking company, licensed and authorized by the IRDA, to sell insurance policies across all insurance companies in India.
                                Through our website www.groupbima.com , we help you find the right insurance policy for you from a choice of plans available in the market. You can research every insurance issue and choose which policy you should buy, after comparing various plans, instantly at the click of a button.
                                We provide you with every information you need about health insurance and make the insurance buying process as simple and quick as buying plane tickets, books and clothes online.
                            </div>
                        </Col>
                    </div>
                    }, 
                    {
                        id:'1',
                        question:'What kind of insurance can I buy from GroupBima?',
                        answerIntro: <div>
                            <Col md={12}>
                                <div className='Panelcontent'>
                                Currently, you can buy only health insurance products. In the near future, you would also be able to buy life insurance, motor insurance, home insurance, and travel insurance.
                                </div>
                            </Col>
                        </div>
                    }, 
                    {
                        id:'2',
                        question:'How long does it take to buy insurance on GroupBima.',
                        answerIntro:  <div>
                        <Col md={12}>
                            <div className='Panelcontent'>
                            Once you input your details, it takes you less than 5 minutes to buy your policy. In case of any issues, our support team is available on call or chat to assist you.
                            </div>
                        </Col>
                    </div>
                    }, 
                    {
                        id:'3',
                        question:'I need to understand the features of the policy I wish to buy. Who can I talk to?',
                        answerIntro:  <div>
                        <Col md={12}>
                            <div className='Panelcontent'>
                            At Groupbima, we have worked hard to ensure you understand all the features of the plan while shortlisting on the website itself. If you still need help, our support team is available to chat with you on the website. Alternatively, if you want to talk to someone, feel free to call us on 022-49707006
                            </div>
                        </Col>
                    </div>
                    }, 
                ]
            }
        ]
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

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSearch = () =>{
        const filter = this.state.search.toLowerCase();

        // Variable to hold the original version of the list
        let currentList = this.state.FaqData;
            // Variable to hold the filtered list before putting into state
        let searchedList = [];
        let FirstSearch = [];
            
            // If the search bar isn't empty
        if (this.state.search !== "") {
            FirstSearch = currentList.filter(item =>  item.heading.toLowerCase().includes(filter)); // FAQ heading match;
           

            searchedList = FirstSearch

            if(!FirstSearch.length){
                searchedList = currentList.filter(item =>  item.content.filter(item2=> item2.question.toLowerCase().includes(filter)).length) // if heading is empty then searched in content's question;
              
            }
        } 
            // Set the filtered state based on what our rules added to newList
        this.setState({
          filtered: searchedList
        });
    }
    render() {
        const { classes } = this.props;
        let FaqData = this.state.filtered.length > 0 ? this.state.filtered : this.state.FaqData
        return (
            <div className='faq'>
                <MuiThemeProvider>
                    <Container fluid={true}>
                        <Row>
                            <Col md={11} xs={12}>
                                <Col md={12}>
                                    <div className='frequent'>Frequently Asked Questions</div>
                                </Col>
                                <Col md={12}>
                                    <Col md={2}></Col>
                                    <Col md={7} xs={12} className='search-column'>
                                        <Paper square={true} classes={{ root: classes.root }} elevation={1}>
                                            <Row>
                                                <Col md={7} xs={6}>
                                                    <FormControl required className={classes.margin} margin="dense" fullWidth>
                                                            <InputLabel
                                                                htmlFor="custom-css-input"
                                                                FormLabelClasses={{
                                                                    root: classes.cssLabelN,
                                                                    focused: classes.cssFocused,
                                                                }}
                                                            >
                                                                Search Keyword
                                                            </InputLabel>
                                                            <Input
                                                                classes={{
                                                                    underline: classes.cssUnderlineN,
                                                                }}
                                                                fullWidth
                                                                name='search'
                                                                onChange={this.handleChange('search')}
                                                                value={this.state.search}
                                                               
                                                            />
                                                        </FormControl>
                                                   
                                                </Col>
                                                <Col md={5} xs={6}>
                                                    <div className='search-button'>
                                                        <ButtonLightSuccess Text='Search' smallWarningPink={true} onClick={this.handleSearch}/>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Paper>
                                    </Col>
                                    <Col md={2}></Col>
                                </Col>
                                {FaqData.map((item,index) =><div>
                                <Col md={12}>
                                    <div className='general-info'>{item.heading}</div>
                                </Col>
                                <Col md={12}>
                                    {item.content && item.content.map((data,index) => 
                                    <ExpansionPanel  className={classes.panel}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography className='heading'>{index+1}.{data.question}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <div>
                                                <Col md={12}>
                                                    {data.answerIntro}
                                                </Col>
                                                <Col md={12}>
                                                    {data.answerContent1}
                                                </Col>
                                                <Col md={12}>
                                                    {data.answerContent2}
                                                </Col>
                                                <Col md={12}>
                                                    {data.answerContent3}
                                                </Col>
                                                <Col md={12}>
                                                    {data.answerContent4}
                                                </Col>
                                                <Col md={12}>
                                                    {data.answerContent5}
                                                </Col>
                                                <Col md={12}>
                                                    {data.answerContent6}
                                                </Col>
                                                <Col md={12}>
                                                    {data.answerContent7}
                                                </Col>
                                                <Col md={12}>
                                                    {data.answerContent8}
                                                </Col>
                                                <Col md={12}>
                                                    {data.answerContent9}
                                                </Col>
                                            </div>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>)}
                                </Col>
                                </div>)}
                                             
                              
                                {/* <Col md={12} xs={12}>
                                    {!this.state.showFab &&
                                        <Fab onClick={this.showFab} aria-label="Add" className={classes.fab}>
                                            <img class="group-chat" src='/assets/groupChat.svg' alt='group-chat' />
                                        </Fab>}
                                    {this.state.showFab && <div>
                                        <div className='chat'>
                                            <Fab onClick={this.showFab} aria-label="Add" className={classes.fab1}>
                                                <img class="faq" src='/assets/faq.svg' alt='faq' />
                                            </Fab>
                                        </div>
                                        <div className='chat'>
                                            <Fab onClick={this.showFab} aria-label="Add" className={classes.fab2}>
                                                <img class="chat" src='/assets/chat.svg' alt='chat' />
                                            </Fab>
                                        </div>
                                        <div className='chat'>
                                            <Fab onClick={this.showFab} aria-label="Add" className={classes.fab3}>
                                                <img class="call" src='/assets/call.svg' alt='call' />
                                            </Fab>
                                        </div>
                                        <div className='chat'>
                                            <Fab  onClick={this.hideFab} aria-label="Add" className={classes.fabClose}>
                                                <i class="material-icons" style={{ color: '#ffffff' }}>
                                                    close
                                                </i>
                                            </Fab>
                                        </div>
                                    </div>
                                    }
                                </Col> */}
                            </Col>
                        </Row>
                    </Container>
                </MuiThemeProvider>
            </div>
        )
    }
}

faq.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(faq)
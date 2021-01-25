import React, { Component } from 'react'
import { MuiThemeProvider} from '@material-ui/core/styles';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table'; 
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import {Helmet} from "react-helmet";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import './index.css'


const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#ea0b4b',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    formcontrol: {
        width: '90%',
    },
    table: {
        minWidth: 700,
    },
    tablerow: {
        height: '30px',
        margin: '0 10px'
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

let id = 0;
function createData(parameters, tat, tat_starts_from) {
    id += 1;
    return { id, parameters, tat, tat_starts_from };
}
function createDataFinensial(endorsement, document) {
    id += 1;
    return { id, endorsement, document };
}

const rows1 = [
    createData('i. Filling up the proposal form', 'Immediate', '-'),
    createData('ii.	Acceptance of the proposal', '15 days', 'Date of receipt of proposals or any requirements called for by the insurer'),
    createData('iii. Compliance of KYC norms', 'Immediate', 'KYC is not required up to the premium payment of 50K.However, for a premium above 50K pan number is required.'),
    createData('iv.	Payment of premiums', 'Immediate', '-'),
    createData('v.	Any other activity not specifically provided for', '15 days', 'Date of receipt of proposals or any requirements called for by the insurer'),
];

const rows2 = [
    createData('i.	Offer and acceptance of the proposal form', '15 days', 'Date of receipt of proposals or any requirements called for by the insurer'),
    createData('ii.	Issuance of the  Policy,', '30 days', 'Date of acceptance of a proposal'),
    createData('iii. Issuance of the endorsement', '10 days', 'Receipt of the request'),
    createData('iv.	Collection of renewal premiums and remittance to insurers', 'Immediate', '-'),
    createData('v. Pre-inspection of risks', '7 days', 'Receipt of the request'),
    createData('vi.	Appointment of Investigator', '30 days', 'Receipt of last necessary document'),
    createData('vii. Submission of investigation report', '15 days', 'Receipt of all relevant papers and required clarifications Or Appointment of Investigator, whichever is relevant'),
    createData('viii. Settlement and Payment of claims', '30 days', 'Receipt of all relevant papers and required clarifications'),
    createData('ix.	Other Service operations as may be specific for the products', '15 days', 'Receipt of the request'),
    createData('x. Acknowledgement of Grievance', '3 days', 'Date of receipt of Grievance'),
    createData('xi. Providing a copy of the accepted proposal form', '5 days', 'Date of acceptance of the proposal'),
    createData('xii. Resolution of Grievance', '15 days', 'Date of receipt of the Grievance'),
    createData('xiii. Refund of proposal deposit post cancellation of the proposal', '15 days', 'Date of case decision/date of receipt of last necessary document /date of receipt of the request for cancellation of the proposal, whichever is later'),
    createData('xiv. Requests for refund of premium during free look period', '15 days', 'Date of receipt of request/last necessary document, whichever is later'),
];

const rows3 = [
    createDataFinensial('i.	Deletion of Insured Member or Death or Separation of Policyholder/ Insured 	Person Leaving the country, (Applicable only if no claims are paid/ outstanding)', 'For Death - Death Certificate For Separation - Supporting document confirming separation(It can be nil for the various insurer)'),
    createDataFinensial('ii.	Change in Age/ Date of Birth of Insured Member', 'Age Proof (It can be nil for various insurer)'),
    createDataFinensial('iii. Addition of Member (Newly-wed spouse/ New Born Baby) This is applicable if insurer permits', 'Marriage Certificate Proof / Birth Certificate Proof (It can be nil for various insurer)'),
    createDataFinensial('iv.	Rectification in Gender of the Proposer/ Insured Person', 'Identity Proof(It can be nil for various insurer)'),
    createDataFinensial('v.	Change in Address of the Proposer(If change is outside the geographical location considered for premium, it would have impact on premium and it would be an financial endorsement, else not)', 'Address Proof'),
];

const rows4 = [
    createDataFinensial('i.	A correction/change in the Sum Insured', 'Nil'),
    createDataFinensial('ii.	Others', 'Supporting Documents'),
];
const rows5 = [
    createDataFinensial('i.	Change in Previous Policy Details', 'Previous Policy Copy'),
];
const rows6 = [
    createDataFinensial('i. Correction/Change in Proposer/ Insured Persons Name', 'Identity Proof (It can be nil for the various insurer)'),
    createDataFinensial('ii. Correction/Change in Policy Holders Email Address and/or Mobile Number', 'Identity Proof (It can be nil for the various insurer)'),
    createDataFinensial('iii. Updation of alternative contact details of the proposer', 'Identity Proof (It can be nil for the various insurer)'),
    createDataFinensial('iv. Rectification in the Relationship of the Insured Person with the proposer', 'Identity Proof (It can be nil for the various insurer)'),
    createDataFinensial('v. Correction/Change in Nominee Name', 'Identity Proof (It can be nil for the various insurer)'),
];


class Isnp extends Component {
    state = {
        service: false,
        procedure: true,
        page: ''
    };

    handleChange = page => event => {
        event.target.value === 'service' ?
            this.setState({
                [page]: event.target.value,
                service: true,
                procedure: false,
            }) :
            this.setState({
                [page]: event.target.value,
                service: false,
                procedure: true,
            })
    };

    handleClickProcedure = () => {
        this.setState({
            procedure: true,
            service: false
        });
    };

    handleClickService = () => {
        this.setState({
            procedure: false,
            service: true
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider>
                <Helmet>
                    <title>Process and Procedures to buy health Insurance policy or plans online</title>
                    <meta name="description" content="Know about the complete process and procedures before to buy the best medical health insurance plan for individuals, family, etc."/>
                </Helmet>
                <div className='isnp'>
                    <Container fluid={true}>
                        <Row>
                            <Col md={3} className='mui--hidden-sm mui--hidden-xs'>
                                {this.state.service && <div>
                                    <Row>
                                        <Col md={12}>
                                            <div className='isnp-block'>
                                                <div class='isnp-text'>ISNP</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <div className="service" onClick={this.handleClickService}  >
                                                <div className='service-text' style={{ color: '#333333' }}>Service TAT</div>
                                            </div>
                                            <div onClick={this.handleClickProcedure} className='procedure'>Procedure & Processes</div>
                                        </Col>
                                    </Row></div>}
                                {this.state.procedure && <div>
                                    <Row>
                                        <Col md={12}>
                                            <div className='isnp-block'>
                                                <div class='isnp-text'>ISNP</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <div onClick={this.handleClickService} className='procedure'>Service TAT</div>
                                            <div className="service" onClick={this.handleClickProcedure}  >
                                                <Link to="#" style={{ color: '#333333' }}><div className='procedure-text'>Procedure & Processes</div></Link>
                                            </div>
                                        </Col>
                                    </Row></div>}
                            </Col>
                            <Col md={9} sm={12} xs={12} className='main-column'>
                                <Row className='option mui--hidden-lg mui--hidden-md mui--hidden-xl'>
                                    <Col xs={12}>
                                        <div className='company'>
                                            <FormControl className={classes.formcontrol} >
                                                <NativeSelect
                                                    value={this.state.page}
                                                    onChange={this.handleChange('page')}
                                                    input={<Input disableUnderline={true} name="page" id="age-native-helper" />}
                                                >
                                                    {/* <option value="service">ISNP</option> */}
                                                    <option value='service'>Service TAT</option>
                                                    <option value='procedure'>Procedure &amp; Processes</option>
                                                </NativeSelect>
                                            </FormControl>
                                            
                                        </div>
                                        
                                    </Col>
                                </Row>
                                {this.state.service && <div>
                                    <Col md={12} xs={12}>
                                        <div className="title-service-tat" >Service TAT</div>
                                        <div className="subtitle-service-tat">
                                           Schedule I of the Insurance e-commerce guidelines issued by IRDAI on 9th March 2017 is followed by GroupBima as an ISNP, for the online sale of Health Insurance products.
                                         </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='pre-sales-heading'>
                                          Pre-Sales
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <Paper className={classes.root}>
                                            <Table className={classes.table}>
                                                <TableHead >
                                                    <TableRow className={classes.tablerow}>
                                                        <CustomTableCell>Key Parameters</CustomTableCell>
                                                        <CustomTableCell>TAT</CustomTableCell>
                                                        <CustomTableCell>Beginning of TAT</CustomTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows1.map(row => {
                                                        return (
                                                            <TableRow className={classes.row} key={row.id}>
                                                                <CustomTableCell component="th" scope="row" padding='checkbox'>
                                                                    {row.parameters} <i style={{ float: 'right', fontSize: '10px' }} class="material-icons">help</i>
                                                                </CustomTableCell>
                                                                <CustomTableCell>{row.tat}</CustomTableCell>
                                                                <CustomTableCell>{row.tat_starts_from}</CustomTableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </Paper>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='pre-sales-heading'>
                                          Post-Sales
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <Paper className={classes.root}>
                                            <Table className={classes.table}>
                                                <TableHead >
                                                    <TableRow className={classes.tablerow}>
                                                        <CustomTableCell>Key Parameters</CustomTableCell>
                                                        <CustomTableCell>TAT</CustomTableCell>
                                                        <CustomTableCell>Beginning of TAT</CustomTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows2.map(row => {
                                                        return (
                                                            <TableRow className={classes.row} key={row.id}>
                                                                <CustomTableCell component="th" scope="row" padding='checkbox'>
                                                                    {row.parameters} <i style={{ float: 'right', fontSize: '10px' }} class="material-icons">help</i>
                                                                </CustomTableCell>
                                                                <CustomTableCell >{row.tat}</CustomTableCell>
                                                                <CustomTableCell>{row.tat_starts_from}</CustomTableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </Paper>
                                    </Col>
                                </div>}
                                {this.state.procedure && <div>
                                    <Col md={12} xs={12}>
                                        <div className="title-service-tat" >Processes and Procedures</div>
                                        {/* <div className="subtitle-service-tat">Awesome Line if required</div> */}
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='pre-sales-heading'>
                                          Pre-Sales
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='filing-form-heading'>Filling, Review, and Acceptance of the proposal form</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>A proposal form is the form completed by the policyholder when applying for insurance. It contains the following sections:</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='filing-form-heading'>Filling up of proposal form:</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-heading'>1. Proposer Details –
                                        <span className='procedure-heading-text'>This section contains details such as name, gender, profession, nationality, income, marital status, DOB</span>
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-heading'>2. Insured Members –
                                        <span className='procedure-heading-text'>This section contains details of insured members such as name, relation, gender, DOB, height, weight, medical history along with personal habits</span>
                                        </div>
                                    </Col> 
                                    <Col md={12} xs={12}>
                                        <div className='procedure-heading'>3. Nominee details –
                                        <span className='procedure-heading-text'>This section contains details on nomination such as name, relation</span>
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-heading'>4. Contact details –
                                        <span className='procedure-heading-text'>This section contains details such as communication address, pin code, city, state</span>
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-heading'>5. Previous Insurer details–
                                        <span className='procedure-heading-text'>This section contains details such as previous insurer’s name, previous policy number.</span>
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='filing-form-heading'>Review and Acceptance of Proposal Form:</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>This section contains details of all the information filled up in previous sections for easy review and a declaration (to be signed by proposer) stating all the information provided by the proposer are true. Once the proposer fills the proposal form he/she may be asked for a pre-medical test based on the requirements of the policy. If pre-medical test is not required then the proposal would be accepted basis the information provided in proposal else basis the outcome of pre-medical test results. Proposal form would be validated by One Time Password send on his/her registered mobile number along with acceptance of declaration informing that all the information provided by him/her are true and that he agrees to conduct the pre-medical tests, wherever required.</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='filing-form-heading'>Compliance of KYC</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>KYC is not required up to premium payment of 50K. However, for a premium above 50K pan number is required. In comply with any provisions, if KYC document(s) are required then the Customer relationship team will follow up on completion of the proposal form.</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='filing-form-heading'>Payment of premium</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>The customer is redirected to the payment gateway (PG) page of insurer and premium payment is made by him/her. The customer has various payment options to pay the initial premium at the time of application for example - through internet banking, debit card, credit card and wallets. These options are available on the payment page of the proposal form journey on our website. This might change from time to time.</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='pre-sales-heading'>Post Sale</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='filing-form-heading'> Offer and acceptance of the proposal form</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>The proposer can choose any of the policies shown on the website based on the primary information given by him/her (the policies that will be shown will come with a standard pricing basis limited information provided by the proposer, which may change basis the details submitted by the proposer in the proposal form). Proposer will be redirected to the proposal form on selecting the buying option of the policy. Once the proposer fills the proposal form he/she may be asked for a pre-medical test based on the requirements of the policy. If pre-medical test is not required then the proposal would be accepted basis the information provided in proposal else basis the outcome of pre-medical test results.</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>After the proposer fills the proposal form it would be validated by One Time Password send on his/her registered mobile number along with acceptance of declaration informing that all the information provided by him/her are true and that he agrees to conduct the pre-medical tests, wherever required.</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='filing-form-heading'> lssuance of the policy</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>On completion of payment and proposal form filling, a copy of policy and proposal form (PDF) along with payment acknowledgment will be sent to the customer’s registered email ID.</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='filing-form-heading'> lssuance of endorsement</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>An endorsement refers to a change in an insurance policy made by the insurer on the behest of the policyholder. It acts like a tailpiece to an already existing policy. When an endorsement is made, the policy will incorporate the changes that have been asked for. There are 2 types of insurance endorsement:</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-heading'>1. Financial Endorsement :
                                        <span className='procedure-heading-text'> This type of changes do affect the premium and hence additional/refundable premium is required for making the necessary changes in the policy and for passing the requisite endorsement under the policy. For each insurance company the process of approving such endorsement requisite is unique.</span>
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-heading'>2. Non Financial Endorsement :
                                        <span className='procedure-heading-text'>  This type of changes do not affect the premium and hence no additional/refundable premium is required for making the necessary changes in the policy and for passing the requisite endorsement under the policy. For each insurance company the process of approving such endorsement requisite is unique.</span>
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='filing-form-heading'>
                                          1. Financial Endorsement
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>a. Change in Policy Details:</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <Paper className={classes.root}>
                                            <Table className={classes.table}>
                                                <TableHead >
                                                    <TableRow className={classes.tablerow}>
                                                        <CustomTableCell>Endorsement Reason</CustomTableCell>
                                                        <CustomTableCell>Documents Required for Endorsement</CustomTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows3.map(row => {
                                                        return (
                                                            <TableRow className={classes.row} key={row.id}>
                                                                <CustomTableCell component="th" scope="row">
                                                                    {row.endorsement}
                                                                </CustomTableCell>
                                                                <CustomTableCell >{row.document}</CustomTableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </Paper>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>b. Change in Coverage Details:</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <Paper className={classes.root}>
                                            <Table className={classes.table}>
                                                <TableHead >
                                                    <TableRow className={classes.tablerow}>
                                                        <CustomTableCell>Endorsement Reason</CustomTableCell>
                                                        <CustomTableCell>Documents Required for Endorsement</CustomTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows4.map(row => {
                                                        return (
                                                            <TableRow className={classes.row} key={row.id}>
                                                                <CustomTableCell component="th" scope="row" >
                                                                    {row.endorsement}
                                                                </CustomTableCell>
                                                                <CustomTableCell >{row.document}</CustomTableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </Paper>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='filing-form-heading'>
                                           2. Non-Financial Endorsement
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>a. Change in Policy Details:</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <Paper className={classes.root}>
                                            <Table className={classes.table}>
                                                <TableHead >
                                                    <TableRow className={classes.tablerow}>
                                                        <CustomTableCell>Endorsement Reason</CustomTableCell>
                                                        <CustomTableCell>Documents Required for Endorsement</CustomTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows3.map(row => {
                                                        return (
                                                            <TableRow className={classes.row} key={row.id}>
                                                                <CustomTableCell component="th" scope="row" >
                                                                    {row.endorsement}
                                                                </CustomTableCell>
                                                                <CustomTableCell >{row.document}</CustomTableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </Paper>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>b. Change in Coverage Details</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <Paper className={classes.root}>
                                            <Table className={classes.table}>
                                                <TableHead >
                                                    <TableRow className={classes.tablerow}>
                                                        <CustomTableCell>Endorsement Reason</CustomTableCell>
                                                        <CustomTableCell>Documents Required for Endorsement</CustomTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows6.map(row => {
                                                        return (
                                                            <TableRow className={classes.row} key={row.id}>
                                                                <CustomTableCell component="th" scope="row" >
                                                                    {row.endorsement}
                                                                </CustomTableCell>
                                                                <CustomTableCell >{row.document}</CustomTableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </Paper>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='filing-form-heading'>d) Collection of renewal premiums and remittance to insurers</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-heading'>1.
                                        <span className='procedure-heading-text'> Select the insurer for which you wish to pay the renewal premium.</span>
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-heading'>2.
                                        <span className='procedure-heading-text'> Input policy number for which premium is due.</span>
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-heading'>3.
                                        <span className='procedure-heading-text'>Enter the DOB (Date of Birth) of the insured.</span>
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-heading'>4.
                                        <span className='procedure-heading-text'>Pay amount due on the Payment Gateway through internet banking, debit card, credit card</span>
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='filing-form-heading'>e) Pre-inspection of risks/Pre-Medical Check-Up</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>The proposer once filled the proposal form may be asked to take a medical check-up at a network center of the insurer as a requirement of the policy on the basis of information shared on the proposal form. The proposer will have to get his medical check-up done as per the directions by the insurer which may be different insurer to insurer. Basis the pre-medical test results the application would be accepted or rejected by the insurer with/without loading (loading based upon the declarations made in the proposal form and the pre-medical results of the persons proposed for insurance). In case it is rejected the premium would be refunded as per refund policy of the insurer.</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='filing-form-heading'>f) Appointment of investigator</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>Where the circumstances of a claim warrant an investigation in the opinion of the insurer, it would initiate and complete such investigation at the earliest, in any case not later than 30 days from the date of receipt of last necessary document.</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='filing-form-heading'>g) Submission of investigation reports</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>Investigator would submit his final report to the insurer within 15 days from the date of receipt of the last necessary document.</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='filing-form-heading'>h) Settlement and Payment of claims</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='procedure-text'>An insurer would settle or reject a claim, as may be the case, within thirty days of the receipt of the last necessary document.</div>
                                    </Col>
                                </div>}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}


Isnp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Isnp);

// 1. Select the insurer for which you wish to pay the renewal premium.
// 2. Input policy number for which premium is due.
// 3. Enter DOB of the insured.
// 4. Pay amount due on the Payment Gateway through internet banking, debit card, credit card




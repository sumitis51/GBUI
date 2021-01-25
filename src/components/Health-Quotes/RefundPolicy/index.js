import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import axios from 'axios'
import constants from '../../../constants/appConstants.json'
import { connect } from 'react-redux';


import './refund_policy.css';

const styles = theme => ({});
const RawHTML = ({ children, className = "" }) =>
    <div className={className}
        dangerouslySetInnerHTML={{ __html: children }} />
class RefundPolicy extends React.Component {
    state = {
        html: ''
    }
    componentWillMount() {
        this.getRefundPolicy()
    }
    getRefundPolicy() {
       
        const {planCode, insurerId} = this.props.currentPlan
        axios.get(`${constants.apiRootURL}/refund-policy/${insurerId}/${planCode}`)
        .then(resp => {
            this.setState({html: resp.data})
        })

    }
    render() {
        
        return (
            <div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
             <Dialog
                    fullWidth={true}
                    maxWidth={'md'}
                    open={this.props.refundPolicyOpen}
                    onClose={this.props.refundPolicyClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogContent>
                         <img src="/assets/cancel.svg" style={{ float: 'right', cursor: 'pointer' }} onClick={this.props.refundPolicyClose} />
                        
                        <div className="Main-Container">
                         <div className="Refund">
                         <h2>
                        Refund Policy
                       </h2>
                       
                       {/* <h3>Free look up period:15 days</h3>
                      
                       <h3 className="Conditions"> Conditions for free look up period</h3> */}
               
                       </div>
                       <div><RawHTML>{this.state.html}</RawHTML></div>
      
                       
     
   {/* <div className="List_Item">
       <p>a) You will be allowed a period of 15 days from the date of receipt of the Policy document to review the terms and 
      conditions of the Policy and to return the same if not acceptable.</p>
        <p>b) If no claim has been made during the free look period, You shall be entitled to:</p>
        
            <div className="Refund_Premium">
      <p>i) A refund of the premium paid less any expenses incurred by Future Generali  on medical examination of the Insured
                                   Persons and the stamp duty charges;</p>
      <p>ii) Where the risk has already commenced and the option of return of the policy is exercised by You, a
                                                  deduction towards the proportionate risk premium for period on cover or.</p>
     
      <p>iii) Where only a part of the risk has commenced, such proportionate risk premium commensurate with    
                the risk covered during such period."</p>
                            </div>
                          
                            
            </div>              
        <div className="Notice_period">
       <h2>Notice period for cancellation : 15 days written notice</h2>
    
   <div className="List_Subheading">
      <p><span className="List_Text">a) </span><span className="Cancellation_Insurer">Cancellation by the Insurer:</span>
       <span className="Cancellation_Insurer_Text"> Future Generali may cancel the policy by giving the insured at least
                  15 days written notice on the grounds of fraud, moral hazard or misrepresentation or non-cooperation.</span></p>
       <p> <span className="List_Text"> b) </span><span className="Cancellation_Insurer"> Cancellation by the Insured:</span></p>
       <p className="Cancellation_Insurer_Text">i) In case the policy period is equal to 1 year, the insured can cancel the policy by 
       giving Future Generali at least 15 days written notice, and if no claim has been made then Future Generali shall refund premium on
                                    short term rates for the unexpired policy period as per the rates detailed below:</p>
       </div>
       </div>           

                 
                  <table class="Refund_Timeperiod">
	      <thead >
		   <tr>
			<th class="mdl-data-table__cell--non-numeric">Period on risk</th>
			<th className="column_right">Rate of premium Refunded</th>
			
		</tr>
	</thead>
	<tbody className="table_body">
		<tr className="refund_row">
			<td class="mdl-data-table__cell--non-numeric">Upto one month</td>
			<td className="column_right">75% of annual rate</td>
			
		</tr>
		<tr className="refund_row">
        <td class="mdl-data-table__cell--non-numeric">Upto three month</td>
			<td className="column_right">50% of annual rate</td>
		</tr>
		<tr className="refund_row"> 
        <td class="mdl-data-table__cell--non-numeric">Upto six month</td>
			<td className="column_right">25% of annual rate</td>
		</tr>
        <tr className="refund_row">
        <td class="mdl-data-table__cell--non-numeric">Exceeding six months</td>
			<td className="column_right"> Nil</td>
		</tr>
	</tbody>
</table> */}
                         
                               {/* <div className="policy_condition"> 
                                   <p>ii) In case policy period exceeds 1 year, this policy may be cancelled by the Insured at any time by giving at least 15 days written notice to Future Generali. Future Generali will
                                        refund the premium on a pro-rata basis by reference to the time period
                             for which the cover is provided, subject to minimum retention of 25% of the premium.</p>
                             <p>iii) No refund of premium shall be due on cancellation if the Insured has made a claim under this policy.</p>
                             <p>iv) There will be no loading on the premium for adverse claims experience.</p>
                               </div>
                              
                           <h3 className="Contact_Information">Insurer Contact Information</h3>
                           <div className="Future_Generali">
                                <h3> Future Generali India Insurance Company Limited</h3> */}
                                {/* <p>
                                Indiabulls Finance Centre, Tower 3, 6th Floor, Senapati Bapat Marg,
                                Elphinstone Road (W), Mumbai - 400013.
<strong>Fax:</strong> 022-4097 6900 | <strong style={{ fontWeight: '600' }}>Email:</strong> fgcare@futuregenerali.in
 <strong style={{ fontWeight: '600' }}> Call us at</strong>: 1800-220-233 | <strong style={{ fontWeight: '600' }}> Website:</strong> https://general.futuregenerali.in
          
 </p> */}
 {/* </div> */}
     {/* <p className="Footer_text">
      Future Group’s and Generali Group’s liability is restricted to the extent of their shareholding in<br/>
Future Generali India Insurance Company Limited.
</p>      */}
                       </div>
                    </DialogContent>
                </Dialog> 
            </div>
        )
    }
}

RefundPolicy.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        currentPlan: state.currentPlan.details ? state.currentPlan.details : {}
    };
};


export default connect(mapStateToProps, null)(withStyles(styles)(RefundPolicy))
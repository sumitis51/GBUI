import React from 'react'
import Panel from 'muicss/lib/react/panel'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import { connect } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip';
import InputHealthChildDialogue from '../../InputHealth/index'

import './panels.css'

class PanelsHeaderHealth extends React.Component {
    state = {
        open: false,
        step: '',
        openMob: false
    }
    handleStepEditHEalth = (step) => () => {
        this.setState({
            open: true,
            step: step
        })
    }
    handleStepEditMob = (step) => () => {
        this.setState({
            openMob: true,
            step: step
        })
    }

    getDiseaseDetails = (index) => {
        const disease = this.props.inputFormHealthData.familyDetails[index * 1 + index].diseases.filter(items => {
            if (items.value === true) {
                return items
            }
        })
        if (disease.length > 0) {
            if (disease[0].name === 'DBTS') {
                return 'Diabet...'
            }
            if (disease[0].name === 'TNSN') {
                return 'Hypert...'
            }
            if (disease[0].name === 'LPDM') {
                return 'Hyperli...'
            }
            if (disease[0].name === 'ASTM') {
                return 'Asth...'
            }
            if (disease[0].name === 'NCRN') {
                return 'Non Chro...'
            }

        }
    }
    getDiseaseLength = (index) => {
        const diseaseLength = this.props.inputFormHealthData.familyDetails[index * 1 + index].diseases.filter(items => {
            if (items.value === true) {
                return items
            }
        })
        return diseaseLength.length > 1 ? ` + ${diseaseLength.length - 1} more ,` : '-'
    }

    getDiseaseDetails2 = (index) => {
        const disease2 = this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].diseases.filter(items => {
            if (items.value === true) {
                return items
            }
        })
        if (disease2.length > 0) {
            if (disease2[0].name === 'DBTS') {
                return 'Diabet...'
            }
            if (disease2[0].name === 'TNSN') {
                return 'Hypert...'
            }
            if (disease2[0].name === 'LPDM') {
                return 'Hyperli...'
            }
            if (disease2[0].name === 'ASTM') {
                return 'Asth...'
            }
            if (disease2[0].name === 'NCRN') {
                return 'Non Chro...'
            }

        }
    }

    getDiseaseLength2 = (index) => {
        const diseaseLength2 = this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].diseases.filter(items => {
            if (items.value === true) {
                return items
            }
        })
        return diseaseLength2.length > 1 ? ` + ${diseaseLength2.length - 1} more ,` : '-'
    }

    getDiseaseString = (index) => {
        let diseaseString = ''
        this.props.inputFormHealthData.familyDetails[index * 1 + index].diseases.map(dis => {
            if (dis.value) {
                if (dis.name === 'DBTS') {
                    diseaseString += ' Diabetes,'
                }
                if (dis.name === 'TNSN') {
                    diseaseString += ' Hypertension,'
                }
                if (dis.name === 'LPDM') {
                    diseaseString += ' Hyperlipidaemia,'
                }
                if (dis.name === 'ASTM') {
                    diseaseString += ' Asthma,'
                }
                if (dis.name === 'NCRN') {
                    diseaseString += ' Non Chronic,'
                }
            }
        })
        return diseaseString
    }
    getDiseaseString2 = (index) => {
        let diseaseString = ''
        this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].diseases.map(dis => {
            if (dis.value) {
                if (dis.name === 'DBTS') {
                    diseaseString += ' Diabetes,'
                }
                if (dis.name === 'TNSN') {
                    diseaseString += ' Hypertension,'
                }
                if (dis.name === 'LPDM') {
                    diseaseString += ' Hyperlipidaemia,'
                }
                if (dis.name === 'ASTM') {
                    diseaseString += ' Asthma,'
                }
                if (dis.name === 'NCRN') {
                    diseaseString += ' Non Chronic,'
                }
            }
        })
        return diseaseString
    }
    handleFGMarriedAlert() {
        const { maritalStatusList } = this.props
        const maritalStatus = this.props.proposalFormDataHealth ? this.props.proposalFormDataHealth.maritalStatus : ''

        if (maritalStatus) {
            const maritalStatusKey = Object.keys(maritalStatusList).filter(item => maritalStatusList[item] === maritalStatus)[0]
            if (maritalStatusKey === 'Married' && !this.props.formMembers.spouse && this.props.currentPlan.insurerId === 555) {
                this.props.selfSpouseFGAlert(true)
            }
        }
    }
    render() {
        return (
            <div className="panels-header-health-parent">
                <Row className="mui--hidden-xs mui--hidden-sm">
                    {/*this.state.open  && */
                        <div className='mui--hidden-xs mui--hidden-sm'>
                            <InputHealthChildDialogue getQuotes={() => { this.props.getQuotes() }} gender={this.props.inputFormHealthData.gender}
                                history={this.props.history} headerPanels={true} inputFormOpen={(value) => { this.setState({ open: value }); this.handleFGMarriedAlert() }} open={this.state.open} step={this.state.step} member={true} />
                        </div>
                    }
                    {this.state.openMob &&
                        <div className='mui--visible-xs-block mui--visible-sm-block'>
                            <InputHealthChildDialogue history={this.props.history} getQuotes={() => { this.props.getQuotes() }} step={this.state.step}
                                inputFormOpenMobile={(value) => this.setState({ openMob: value })} gender={this.props.inputFormHealthData.gender} />

                            {/* <InputHealthChildDialogue getQuotes={() => {this.props.getQuotes()}} gender={this.props.inputFormHealthData.gender}
                        history={this.props.history}  inputFormOpen={(value) => this.setState({open:value})} step={this.state.step} member={true}  /> */}
                        </div>
                    }
                    <Col md="4">
                        <Panel>
                            <div className="members">
                                <h3>Members</h3>
                                <p style={{ cursor: 'pointer' }}
                                    className="edit"
                                    onClick={this.handleStepEditHEalth(1)}
                                    id={`unique-edit-members-1st`}
                                >Edit</p>
                                <img src="/assets/health-quotes-members.svg" alt="Health Quotes Memebers" />
                                <div className="table-members">
                                    {/* <table>
                                        <tbody>
                                            {this.props.inputFormHealthData && this.props.inputFormHealthData.familyDetails.map(item,index => 
                                                     
                                                <tr>
                                                    {
                                                        
                                                           Number.isInteger(item[(index * 1 + index)].age) ?
                                                        <td>
                                                            {item[(index * 1 + index) + 1].age} year
                                                        </td>:
                                                        
                                                        <td>
                                                            {( 
                                                               item[(index * 1 + index) + 1].age === 0  || 
                                                                   item[(index * 1 + index) + 1].age === 0.08) ?
                                                                `${(Math.round((item[(index * 1 + index) + 1].age) *12 ))} month`:
                                                                `${(Math.round((item[(index * 1 + index) + 1].age) *12 ))} months`
                                                            }
                                                        </td>
                                                    }
                                                </tr>
                                            )}     
                                        </tbody>
                                    </table> */}
                                    <table>
                                        <tbody>
                                            {this.props.inputFormHealthData ? this.props.inputFormHealthData.familyDetails.map((item, index) => {

                                                return <tr>
                                                    {/* {
                                                        this.props.inputFormHealthData.familyDetails[(index * 1 + index)]
                                                            ? <td>{this.props.inputFormHealthData.familyDetails[(index * 1 + index)].label}: {this.props.inputFormHealthData.familyDetails[index * 1 + index].age}yrs</td> : true} */}

                                                    {
                                                        this.props.inputFormHealthData.familyDetails[(index * 1 + index)]
                                                            ? <td>
                                                                {this.props.inputFormHealthData.familyDetails[(index * 1 + index)].label}:
                                                            {this.props.inputFormHealthData.familyDetails[(index * 1 + index)].age === 0 ?
                                                                    '< 1 month'
                                                                    :
                                                                    (Number.isInteger(this.props.inputFormHealthData.familyDetails[(index * 1 + index)].age)) ?
                                                                        this.props.inputFormHealthData.familyDetails[(index * 1 + index)].age > 1 ?
                                                                            `${this.props.inputFormHealthData.familyDetails[(index * 1 + index)].age}years` :
                                                                            `${this.props.inputFormHealthData.familyDetails[(index * 1 + index)].age}year`
                                                                        :
                                                                        this.props.inputFormHealthData.familyDetails[(index * 1 + index)].age === 0 ||
                                                                            this.props.inputFormHealthData.familyDetails[(index * 1 + index)].age === 0.08 ?
                                                                            `${Math.round((this.props.inputFormHealthData.familyDetails[(index * 1 + index)].age) * 12)} month` :
                                                                            `${Math.round((this.props.inputFormHealthData.familyDetails[(index * 1 + index)].age) * 12)} months`
                                                                }
                                                            </td> : true}
                                                    {
                                                        this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1]
                                                            ? <td>
                                                                {this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].label}:
                                                            {this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].age === 0 ?
                                                                    '< 1 month'
                                                                    :
                                                                    (Number.isInteger(this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].age)) ?
                                                                        this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].age > 1 ?
                                                                            `${this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].age}years` :
                                                                            `${this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].age}year`
                                                                        :
                                                                        this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].age === 0 ||
                                                                            this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].age === 0.08 ?
                                                                            `${Math.round((this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].age) * 12)} month` :
                                                                            `${Math.round((this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].age) * 12)} months`
                                                                }
                                                            </td> : true}

                                                </tr>
                                            }) : true}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Panel>
                    </Col>
                    <Col md="4" style={{ padding: 0 }}>
                        <Panel>
                            <div className="diseases">
                                <h3>Disease</h3>
                                <p className="edit" onClick={this.handleStepEditHEalth(3)}>Edit</p>
                                {/* <img src="/assets/health-quotes-members.svg" alt="Health Quotes Memebers" /> */}
                                <img src="/assets/health-quote-deseases.svg" alt="Health Quotes Diseases" />
                                <div className="table-members">
                                    <table>
                                        <tbody>
                                            {this.props.inputFormHealthData ? this.props.inputFormHealthData.familyDetails.map((item, index) => {

                                                return <tr style={{ display: '-webkit-box' }}>
                                                    {this.props.inputFormHealthData.familyDetails[(index * 1 + index)]
                                                        ? this.getDiseaseString(index) ===
                                                            <td>{this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1] &&
                                                                this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].label}</td>
                                                            ? this.props.inputFormHealthData.familyDetails[(index * 1 + index)].label :
                                                            <Tooltip
                                                                title={this.getDiseaseString(index)}
                                                                placement="right-start">
                                                                <td>
                                                                    {this.props.inputFormHealthData.familyDetails[(index * 1 + index)] &&
                                                                        (this.props.inputFormHealthData.familyDetails[(index * 1 + index)].label === 'Father in law' ?
                                                                            'Father-in..' :
                                                                            this.props.inputFormHealthData.familyDetails[(index * 1 + index)].label
                                                                        )
                                                                    }:
                                                                {
                                                                        this.getDiseaseDetails(index)
                                                                    }
                                                                    {
                                                                        this.getDiseaseLength(index)
                                                                    }
                                                                </td>
                                                            </Tooltip> :
                                                        true}


                                                    {this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1]
                                                        ? this.getDiseaseString2(index) ===
                                                            <td>{this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1] &&
                                                                this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].label}</td>
                                                            ? this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].label :
                                                            <Tooltip
                                                                title={this.getDiseaseString2(index)}
                                                                placement="right-start">
                                                                <td>
                                                                    {this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1] &&
                                                                        (this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].label === 'Mother in law' ?
                                                                            'Mother-in..' :
                                                                            this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].label
                                                                        )
                                                                    }:
                                                                {
                                                                        this.getDiseaseDetails2(index)
                                                                    }
                                                                    {
                                                                        this.getDiseaseLength2(index)
                                                                    }
                                                                </td></Tooltip> :
                                                        true}
                                                </tr>
                                            }) : true}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Panel>
                    </Col>
                    <Col md="4">
                        <Panel>
                            <div className="details">
                                <h3>Details</h3>
                                <p className="edit" onClick={this.handleStepEditHEalth(4)}>Edit</p>
                                <div className="table-members">
                                    <table>
                                        <tbody>
                                            {this.props.inputFormHealthData ? this.props.inputFormHealthData.selfPincode && <tr>
                                                <td>Self Pincode:  {this.props.inputFormHealthData.selfPincode}</td>
                                            </tr> : ''}
                                            {this.props.inputFormHealthData ? this.props.inputFormHealthData.parentPincode && <tr>
                                                <td>Parents Pincode: {this.props.inputFormHealthData.parentPincode}</td>
                                            </tr> : ''}
                                            {this.props.inputFormHealthData ? this.props.inputFormHealthData.inLawPincode && <tr>
                                                <td>In Laws Pincode: {this.props.inputFormHealthData.inLawPincode}</td>
                                            </tr> : ''}
                                            {/* to do refactor */}
                                            {this.props.inputFormHealthData ? this.props.inputFormHealthData.income && <tr>
                                                {this.props.inputFormHealthData.income === 300000 &&
                                                    <td>Your Salary: Up to 3 lacs</td>}
                                                {this.props.inputFormHealthData.income === 500000 &&
                                                    <td>Your Salary: 3 to 5 lacs</td>}
                                                {this.props.inputFormHealthData.income === 700000 &&
                                                    <td>Your Salary: 5 to 7 lacs</td>}
                                                {this.props.inputFormHealthData.income === 1000000 &&
                                                    <td>Your Salary: 7 to 10 lacs</td>}
                                                {this.props.inputFormHealthData.income === 1500000 &&
                                                    <td>Your Salary: 10 to 15 lacs</td>}
                                                {this.props.inputFormHealthData.income === 1500001 &&
                                                    <td>Your Salary: 15 lacs+</td>}
                                            </tr> : ''}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Panel>
                    </Col>
                </Row>

                {/* Here for mobile */}
                <Panel style={{ paddingBottom: '0px', margin: '10px 0px 15px 0px' }} className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                    <p className="link-1-p">
                        Members:
                        {this.props.inputFormHealthData ?
                            this.props.inputFormHealthData.familyDetails.map((item, i) =>
                                (this.props.inputFormHealthData.familyDetails.length === i + 1) ?
                                    ' ' + item.label + ': ' + item.age + 'years' + '' :
                                    ' ' + item.label + ': ' + item.age + 'years' + ', ' 

                                ) : ''}

                        {/* Members:Self: 24, Spouse: 24, Son 1 : 1, Son 2: 1, Father: 48, Mother: 47 */}
                        <span className="edit-1-p" id='unique-edit-members-2nd'  onClick={this.handleStepEditMob(1)}>Edit</span>
                    </p>
                    <p className="link-1-p">
                        Disease:
                        {this.props.inputFormHealthData ? this.props.inputFormHealthData.familyDetails.map((item, index) => {
                            return <tr style={{ display: 'inline-grid' }}>
                                {
                                    this.props.inputFormHealthData.familyDetails[(index * 1 + index)]
                                        ? <td>{this.props.inputFormHealthData.familyDetails[(index * 1 + index)].label}: {
                                            this.props.inputFormHealthData.familyDetails[index * 1 + index].diseases.map(dis => {
                                                if (dis.name == 'DBTS' && dis.value) {
                                                    return 'Diabetes, '
                                                }
                                                if (dis.name == 'TNSN' && dis.value) {
                                                    return 'Hypertension,'
                                                }
                                                if (dis.name == 'LPDM' && dis.value) {
                                                    return 'Hyperlipidaemia, '
                                                }
                                                if (dis.name == 'ASTM' && dis.value) {
                                                    return 'Asthma, '
                                                }
                                                if (dis.name == 'NCRN' && dis.value) {
                                                    return 'Non Chronic, '
                                                }
                                            }
                                            )}</td> : true}
                                {
                                    this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1]
                                        ? <td>{this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].label}: {
                                            this.props.inputFormHealthData.familyDetails[(index * 1 + index) + 1].diseases.map(dis => {
                                                if (dis.name == 'DBTS' && dis.value) {
                                                    return 'Diabetes, '
                                                }
                                                if (dis.name == 'TNSN' && dis.value) {
                                                    return 'Hypertension,'
                                                }
                                                if (dis.name == 'LPDM' && dis.value) {
                                                    return 'Hyperlipidaemia, '
                                                }
                                                if (dis.name == 'ASTM' && dis.value) {
                                                    return 'Asthma, '
                                                }
                                                if (dis.name == 'NCRN' && dis.value) {
                                                    return 'Non Chronic, '
                                                }
                                            }
                                            )}</td> : true}
                            </tr>
                        }) : true}
                        {/* {this.props.inputFormHealthData ? this.props.inputFormHealthData.familyDetails.map(item => {
                            let flag
                            item.diseases.map(dis => {
                              return  flag = dis.value
                            })
                            return flag? item.label+',': ''
                        }): ''} */}
                        {/* Disease:Self, Spouse, Son 1, Son 2, Father, Mother */}
                        <span className="edit-1-p" onClick={this.handleStepEditMob(3)}>Edit</span>
                    </p>
                    <p className="link-1-p" style={{ borderBottom: 'none' }}>
                        Detail:{this.props.inputFormHealthData && this.props.inputFormHealthData.selfPincode && `Self PIN: ${this.props.inputFormHealthData.selfPincode}`}
                        {this.props.inputFormHealthData && this.props.inputFormHealthData.parentPincode && `, Parents PIN: ${this.props.inputFormHealthData.parentPincode}`}
                        {this.props.inputFormHealthData && this.props.inputFormHealthData.income && <span>, Salary:{this.props.inputFormHealthData.income == 300000 && <span>Up to 3 lacs</span>}
                            {this.props.inputFormHealthData.income == 500000 && <span>3 to 5 lacs</span>}
                            {this.props.inputFormHealthData.income == 700000 && <span>5 to 7 lacs</span>}
                            {this.props.inputFormHealthData.income == 1000000 && <span>7 to 10 lacs</span>}
                            {this.props.inputFormHealthData.income == 1500000 && <span> 10 to 15 lacs</span>}
                            {this.props.inputFormHealthData.income == 1500001 && <span>15 lacs+</span>}
                        </span>}
                        <span className="edit-1-p" onClick={this.handleStepEditMob(4)}>Edit</span>
                    </p>
                </Panel>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    inputFormHealthData: state.inputFormHealth.inputFormHealthData,
    formMembers: state.inputFormHealth.inputFormHealthData ? state.inputFormHealth.inputFormHealthData.formMembers: {},
    currentPlan: state.currentPlan.details ? state.currentPlan.details : {},
    proposalFormDataHealth: state.proposalFormHealth.proposalFormHealthData,
    maritalStatusList: state.MaritalStatusCodes.maritalStatusCodes
})

const mapDispatchToProps = dispatch => ({
    selfSpouseFGAlert: (data) => dispatch({ type: 'SELF_SPOUSE_FG_ALERT', data })
})


export default connect(mapStateToProps, mapDispatchToProps)(PanelsHeaderHealth)
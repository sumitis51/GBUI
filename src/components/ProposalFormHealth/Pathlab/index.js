import React, { Component } from 'react'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Panel from 'muicss/lib/react/panel'
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux'


import './index.css'
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';


class Pathlab extends Component {
    componentWillMount() {
        this.props.dialogueClose(true)
    }
    componentDidMount() {
        console.log(this.props.premedical.updatedMem)
    }
    render() {
        return (
            <div>
                {(this.props.step === 7) &&
                    <div>
                        <Panel>

                            <Row className='pathlab-row'>
                                <Col md="11" sm="10" xs="10">
                                    <p className="selected-pathlabs">Selected Pathologies</p>
                                </Col>
                                <Col md="1" sm="2" xs="2">
                                    <p className="selected-pathlabs">Edit</p>
                                </Col>
                                <Col md={12}>
                                    <p className="pathologies">Pathologies</p>
                                </Col>
                                <Col md={12}>
                                    <Divider />
                                </Col>
                                {this.props.premedical.premedical && this.props.premedical.premedical.premedicalRequiredFor.map((item, index) =>
                                    <Col md={4} xs={12} className='members'>
                                        <Col md={12} xs={12} className='member-column'>
                                            <Col md={12} xs={6} className='membername'>{item.relationship}:</Col>
                                            <Col md={12} xs={6} className='member'>
                                                {item.memberName}
                                            
                                            </Col>
                                            <Col md={12} className='checkup mui--hidden-xs'>
                                                <ul>{item.premedicalTests.map(test => <li>{test}</li>)}</ul>
                                            </Col>
                                            <Col md={12} className='pathology-name'>{this.props.premedical.updatedMem.length > 0 ? this.props.premedical.updatedMem[index].pathLabDetails ? `${this.props.premedical.updatedMem[index].pathLabDetails.pathlabName + ` ` + this.props.premedical.updatedMem[index].pathLabDetails.pathlabaddress}`:
                                                 'Our Team will contact you for the medical test': ''}
                                            </Col>
                                        </Col>
                                    </Col>
                                )}
                            </Row>
                        </Panel>
                        <Panel className='mui--visible-xs-block'>
                            <Row>
                                <Col xs={12}>
                                    <ButtonLightSuccess Text='Confirm and Next' fullWidth={true} />
                                </Col>
                            </Row>
                        </Panel>
                    </div>}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    step: state.proposal_form_motor.stepH,
    proposalFormDataHealth: state.proposalFormHealth.proposalFormHealthData,
    currentPlan: state.currentPlan.details ? state.currentPlan.details : {},
})

const mapDispatchToProps = dispatch => ({
    setStep: step => dispatch({ type: 'SET_STEP_H', step }),
    loadProposalFormHealth: (data) => dispatch({ type: 'PROPOSAL_FORM_HEALTH', data })
})
export default connect(mapStateToProps, mapDispatchToProps)(Pathlab);
import React from 'react'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import { connect } from 'react-redux'
import './details.css'

class Details extends React.Component {
    render() {
        const member = this.props.proposalFormDataHealth.insuredMembersList[this.props.activeTab]
        return (
            <div className="personal-show-details">
                <Row>
                    <Col md="11" sm="10" xs="10">
                        <h3 className="step-detail">Step 2 of {this.props.totalSteps}</h3>
                        <h3 className="personal-heading">Personal Details</h3>
                    </Col>
                    {this.props.step < 7 &&
                    <Col md="1" sm="2" xs="2">
                        <h3
                            className="edit"
                            onClick={() => { this.props.setStep(1) }}>Edit</h3>
                    </Col>
                    }
                </Row>
                <div className="mui--hidden-xs mui--hidden-sm"><hr /></div>
                <div className="mui--hidden-lg mui--hidden-xl mui--hidden-md"><hr style={{ marginTop: '-2px' }} /></div>

                {/* Here details of filled elements */}
                <div className="desktop-data mui--hidden-sm mui--hidden-xs">
                    <Row>
                        <Col md="4">
                            <p className="key-name">Name:</p>
                            <p className="key-value">
                                {Object.keys(this.props.salutation)[Object.values(this.props.salutation)
                                    .indexOf(member.salutation)]} {member.firstName} {member.lastName}
                            </p>
                        </Col>
                        <Col md="4">
                            <p className="key-name">Marital Status :</p>
                            <p className="key-value">{Object.keys(this.props.maritalStatus)[Object.values(this.props.maritalStatus).indexOf(member.maritalStatus)]}</p>
                        </Col>
                        <Col md="4">
                            <p className="key-name">Height:</p>
                            <p className="key-value">{member.heightFeet}ft {member.heightInches}inch</p>
                        </Col>
                    </Row>
                    {/* Second row */}
                    <Row>
                        {/* <Col md="4">
                            <p className="key-name">Gender:</p>
                            <p className="key-value">
                                {Object.keys(this.props.gender)[Object.values(this.props.gender).indexOf(member.gender)]}
                            </p>
                        </Col> */}
                      
                        <Col md="4">
                            <p className="key-name">Date of Birth(DOB):</p>
                            <p className="key-value">{member.dateOfBirth}</p>
                        </Col>
                        <Col md="4">
                            <p className="key-name">Weight:</p>
                            <p className="key-value">{member.weight} Kgs</p>
                        </Col>
                        {this.props.preExistingDisease  ?
                        <Col md="4">
                            <p className="key-name">Pre-Existing diseases :</p>
                            <p className="key-value">
                             { this.props.preExistingDisease ?
                                 Object.keys(this.props.preExistingDisease).map(key => {
                                return member.preExistingDisease && member.preExistingDisease.map(item => {
                                    if(this.props.preExistingDisease[key] === item){
                                        return key+","
                                    }
                                }) 
                            }) : null
                            
                            }
                            </p>
                        </Col>: null
                    }
                    </Row>
                    <Row>
                        <Col md="4">
                            <p className="key-name">Profession:</p>
                            <p className="key-value">
                                {Object.keys(this.props.proffession)[Object.values(this.props.proffession).indexOf(member.profession)]}
                                {/* {member.profession} */}
                            </p>
                        </Col>
                        <Col md="4">
                            <p className="key-name">Nationality:</p>
                            <p className="key-value">
                                {member.nationality}
                            </p>
                        </Col>
                       
                    </Row>
                    <Row>
                        <Col md="4">
                            <p className="key-name">Pincode:</p>
                            <p className="key-value">
                                {member.insuredMemberAddress.pincode}
                            </p>
                        </Col>
                        <Col md="4">
                            <p className="key-name">Address:</p>
                            <p className="key-value">
                                {member.insuredMemberAddress.address}
                            </p>
                        </Col>
                    </Row>

                </div>
                {/* For Mobile View */}
                {/* Table */}
                <table className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                    <tbody>
                        <tr>
                            <td>
                                Name:
                            </td>
                            <td>
                                {member.salutation} {member.firstName} {member.lastName}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Marital Status:
                            </td>
                            <td>
                            {Object.keys(this.props.maritalStatus)[Object.values(this.props.maritalStatus).indexOf(member.maritalStatus)]}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Height:
                                </td>
                            <td>
                                {member.heightFeet}ft {member.heightInches}in
                            </td>
                        </tr>
                       
                        {/* <tr>
                            <td>
                                Gender:
                                </td>
                            <td>
                                {member.gender}
                            </td>
                        </tr> */}
                        <tr>
                            <td>
                                Date of Birth(DOB):
                                </td>
                            <td>
                                {member.dateOfBirth}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Weight:
                                </td>
                            <td>
                                {member.weight} Kgs
                            </td>
                        </tr>
                        {/* <tr>
                            <td>
                                Relationship:
                                </td>
                            <td>
                                {member.relationship} 
                            </td>
                        </tr> */}
                        <tr>
                            <td>
                                Profession:
                                </td>
                            <td>
                                {member.profession} 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Nationality:
                                </td>
                            <td>
                                {member.nationality} 
                            </td>
                        </tr>
                        <tr>
                            <td>
                               Address:
                                </td>
                            <td>
                                {member.insuredMemberAddress.address} 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Pincode:
                                </td>
                            <td>
                                {member.pincode} 
                            </td>
                        </tr>
                        {this.props.preExistingDisease  ?
                        <tr>
                            <td>
                            Pre-Existing diseases:
                                </td>
                            <td>

                            {Object.keys(this.props.preExistingDisease).map(key => {
                                return member.preExistingDisease && member.preExistingDisease.map(item => {
                                    if(this.props.preExistingDisease[key] === item){
                                        return key+","
                                    }
                                }) 
                            })}
                            </td>
                        </tr>: null
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    step: state.proposal_form_motor.stepH,
    proposalFormDataHealth: state.proposalFormHealth.proposalFormHealthData,
    activeTab: state.proposalFormHealth.insuredMemberTabValue,
    proposalFormHealthMemberData: state.proposalFormHealth.insuredMembersDetail.insuredMembersList,
})

const mapDispatchToProps = dispatch => ({
    setStep: step => dispatch({ type: 'SET_STEP_H', step }),
    loadProposalFormHealth: (data) => dispatch({ type: 'PROPOSAL_FORM_HEALTH', data }),
    ProposalFormHealthMember: (value) => dispatch({ type: 'PROPOSAL_FORM_HEALTH_MEMBER', value })
})

export default connect(mapStateToProps, mapDispatchToProps)(Details)
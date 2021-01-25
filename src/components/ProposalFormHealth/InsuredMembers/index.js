import React from 'react'
import Panel from 'muicss/lib/react/panel'
import { connect } from 'react-redux'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import './personal.css'
import Form from './Form'
import Details from './Details'



const styles = theme => ({
    formControl: {
        margin: 0,
        marginBottom: 0
    },
    group: {
        margin: 0,
    },
    root: {
        color: 'black',
        '&$checked': {
            color: '#ea0b4b !important',
        },
        margin: 0
    },
    checked: {},
    label: {
        color: '#000000',
        fontFamily: 'Source Sans Pro',
        fontSize: '12px',
        margin: '0px'
    },
    focused_label: {
        color: '#ea0b4b !important'
    },
    text_field: {
        color: 'black',
        display: 'block',
        marginTop: '0px',
        marginLeft: '8px'
    },
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '13px 50px',
        marginTop: '1rem',
        marginLeft: '0.5rem'
    },
    buttonRoot: {
        color: '#ea0b4b',
        backgroundColor: '#ffffff',
        border: '1px solid #ea0b4b',
        '&:hover': {
            backgroundColor: '',
        },
        padding: '12px 36px',
        marginTop: '1rem'
    },
    labelFrm: {
        marginRight: '10px'
    }
});
class InsuredMembers extends React.Component {
    state = {
        formdata: {},
        personal_flag_init: true,
        Tabdata: [],
        tabs: [],
        activeTab: 0,
        isFormValid: '',
        medicalHistory: [],
        Questiondata: [],
        medicalHistoryMember: '',
    }

    componentDidMount() {
        if (!this.props.isProposalSummary) {
            let arr = [];
            if (this.props.inputformdata) {
                let index = 0;
                for (let i in this.props.inputformdata.familyDetails) {

                    let obj = {
                        id: index,
                        memberName: ''
                    }
                    obj.relationship = this.props.inputformdata.familyDetails[i].member;
                    this.state.Tabdata.push(this.props.inputformdata.familyDetails[i])
                    arr.push(obj)
                    index++
                }
                let proposalFormData = this.props.proposalFormDataHealth ? this.props.proposalFormDataHealth : {}
                proposalFormData.insuredMembersList = arr
                const newObj = {
                    insuredMembersList: arr
                }


                this.props.ProposalFormHealthMember(newObj)
            }
        }
    }

    render() {
        const { classes } = this.props;

        const renderButtons = () => {
            return (
                <div>
                    {this.props.activeTab !== 0 &&
                        <Button
                            className={classNames(classes.buttonRoot)}
                            onClick={() => {
                                this.props.insuredMemberTabValue(this.props.activeTab - 1);
                                this.setState({ personal_flag_init: true })
                            }}>
                            Previous
                   </Button>
                    }
                    {(this.props.inputformdata.familyDetails.length - 1 !== this.props.activeTab) &&
                        <Button
                            disabled={!this.state.isFormValid}
                            className={classNames(classes.buttonRoot3)}
                            onClick={() => {
                                this.props.insuredMemberTabValue(this.props.activeTab + 1);
                                this.setState({ personal_flag_init: true })
                            }}>
                            Next Member
                    </Button>
                    }
                    {(this.props.inputformdata.familyDetails.length - 1 == this.props.activeTab) &&
                        <Button disabled={!this.state.isFormValid}
                            className={classNames(classes.buttonRoot3)}
                            onClick={() => {
                                this.props.setStep(2);
                                this.setState({ personal_flag_init: true })
                            }}>
                            Continue to General Questions
                    </Button>
                    }
                </div>
            )
        }

        return (
            <div className="personal-detail-parent">
                <Panel>
                    {true &&
                        <div className="show-from">
                            {(this.props.step < 1 && this.state.personal_flag_init) &&
                                <Row>
                                    <Col md="11" sm="10" xs="10">
                                        <p className="step-details">Step 2 of {this.props.totalSteps}</p>
                                        <p className="step-name">Insured Members</p>
                                    </Col>
                                    <Col md="1" sm="2" xs="2">
                                        {this.props.step < 7 &&
                                            <p className="edit">Edit</p>
                                        }
                                    </Col>
                                </Row>
                            }
                            {(this.props.step === 1) &&
                                <div className="form-personal-details">
                                    <h3 className="personal-details-heading">
                                        Insured Members &nbsp;&nbsp;<span className="edit-members">Edit Members</span>
                                    </h3>
                                    <p className="step-detail-success">Step 2 of {this.props.totalSteps}</p>
                                    <hr />


                                    {/* Tabs for form */}
                                    <div className="tabs-insured-members">
                                        <div className="tabs-item">
                                            {this.props.inputformdata.familyDetails.map((item, index) =>

                                                <p
                                                    className={`${this.props.activeTab === index ? 'active-tab ' : ''}tab-link`}
                                                    onClick={() => { this.setState({ activeTab: index }); this.props.insuredMemberTabValue(index); }}>{item.member}</p>

                                            )}
                                        </div>
                                        {/* Tabs content */}
                                        {this.props.inputformdata.familyDetails.map((item, index) =>

                                            this.props.activeTab === index &&
                                            <div className="div-content">
                                                <Form
                                                    gender={this.props.gender}
                                                    maritalStatus={this.props.maritalStatus}
                                                    salutation={this.props.salutation}
                                                    relation={this.props.relation}
                                                    proffession={this.props.proffession}
                                                    preExistingDisease={this.props.preExistingDisease}
                                                    key={item.id}
                                                    activeTab={this.props.activeTab}
                                                    tabName={item.member}
                                                    datePickers={this.props.datePickers}
                                                    formIsValid={(value) => { this.setState({ isFormValid: value }) }}
                                                    insurerId={this.props.insurer.insurerId}
                                                    textlimit={this.props.textlimit}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/*  Button next */}
                                    <div className="button-next">

                                        {renderButtons()}

                                    </div>
                                </div>
                            }

                            {/* Now show form details */}
                            {this.props.step > 1 &&
                                // Here details goes
                                <div className="form-personal-details">
                                    <div className="tabs-insured-members">
                                        <div className="tabs-item">
                                            {this.props.inputformdata.familyDetails.map((item, index) =>

                                                <p
                                                    className={`${this.props.activeTab === index ? 'active-tab ' : ''}tab-link`}
                                                    onClick={() => { this.setState({ activeTab: index }); this.props.insuredMemberTabValue(index); }}>{item.member}</p>
                                            )}

                                        </div>
                                        {/* Tabs content */}
                                        {this.props.inputformdata.familyDetails.map((item, index) =>
                                            this.props.activeTab === index &&
                                            <div className="div-content">
                                                <Details
                                                    gender={this.props.gender}
                                                    maritalStatus={this.props.maritalStatus}
                                                    salutation={this.props.salutation}
                                                    relation={this.props.relation}
                                                    proffession={this.props.proffession}
                                                    preExistingDisease={this.props.preExistingDisease}
                                                    key={item.id}
                                                    activeTab={this.props.activeTab}
                                                    totalSteps={this.props.totalSteps}
                                                    maritalStatus={this.props.maritalStatus} />
                                            </div>
                                        )}
                                    </div>
                                </div>

                            }
                        </div>
                    }
                </Panel>
            </div>
        )
    }
}

InsuredMembers.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    step: state.proposal_form_motor.stepH,
    proposalFormDataHealth: state.proposalFormHealth.proposalFormHealthData,
    activeTab: state.proposalFormHealth.insuredMemberTabValue,
    inputformdata: state.inputFormHealth.inputFormHealthData,
    currentPlan: state.currentPlan.details ? state.currentPlan.details : {}
})

const mapDispatchToProps = dispatch => ({
    setStep: step => dispatch({ type: 'SET_STEP_H', step }),
    loadProposalFormHealth: (data) => dispatch({ type: 'PROPOSAL_FORM_HEALTH', data }),
    insuredMemberTabValue: (value) => dispatch({ type: 'INSURED_MEMBER_TAB_VALUE', value }),
    ProposalFormHealthMember: (value) => dispatch({ type: 'PROPOSAL_FORM_HEALTH_MEMBER', value })
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InsuredMembers))  
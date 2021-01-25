import React from 'react'
import Panel from 'muicss/lib/react/panel'
import { connect } from 'react-redux'
import Row from 'muicss/lib/react/row'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Col from 'muicss/lib/react/col'
import Radio from '@material-ui/core/Radio'
import FormGroup from '@material-ui/core/FormGroup';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField'
import './medical.css'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const styles = theme => ({
    formControl: {
        margin: 0,
        marginBottom: 0
    },
    formGroup: {
        margin: '0px 4px'
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
class GeneralQuestions extends React.Component {
    state = {
        personal_flag_init: true,
        isFormValid: true,
        medicalHistoryMember: 'yes',
        medicalHistory: [],
    }

    componentWillMount() {
        console.log(this.props.Questiondata)
    }
    componentDidMount() {
        // this.setState({Questiondata: this.props.Questiondata})
    }

    addLoading = (index) => {
        // Package Premium is premiumAmount
        const basePremium = Number(this.props.currentPlan.basePremium);
        let premiumAmount = Number(this.props.premium.premiumAmount)
        let loading = 0;
        if(this.props.currentPlan.loadingCalculationType === 'CALCULATE_ON_BASE_PREMIUM') {
            loading= ((5 / 100) * this.props.currentPlan.basePremiums[index])
            if(!Number.isInteger(loading))
                loading = Number(loading.toPrecision(loading.toString().indexOf('.') + 1))
        } else {
            loading = ((5 / 100) * basePremium)
        }
        premiumAmount= (premiumAmount+loading);
        // let loadingServiceTax = (18/100)*loading
        // let totalServiceTax = Math.round((loadingServiceTax + serviceTax) * 100) / 100
        let totalServiceTax = ((18/ 100) * premiumAmount)
        let totalPremium = Math.round((premiumAmount + totalServiceTax))
        
        console.log(basePremium, premiumAmount, loading, totalServiceTax, totalPremium)
        let premium = this.props.premium
        premium.premiumWithServiceTax = totalPremium
        premium.serviceTax = (totalServiceTax)
        premium.premiumAmount = (premiumAmount)

        this.props.onPremiumUpdate(premium)

        // For current Plan
        let currentPlan = this.props.currentPlan
        currentPlan.totalPremium = totalPremium
        currentPlan.serviceTax = (totalServiceTax)
        currentPlan.premiumAmount = (premiumAmount)
        this.props.setCurrentPlan(currentPlan)
        this.props.onLoading(!this.props.loading)
    }

    removeLoading = (index) => {
        const basePremium = Number(this.props.currentPlan.basePremium);
        let premiumAmount = Number(this.props.premium.premiumAmount)
        let loading = 0;
        if(this.props.currentPlan.loadingCalculationType === 'CALCULATE_ON_BASE_PREMIUM') {

            loading = ((5 / 100) * this.props.currentPlan.basePremiums[index])
            if(!Number.isInteger(loading))
                loading = Number(loading.toPrecision(loading.toString().indexOf('.') + 1))
        } else {
            loading = ((5 / 100) * basePremium)
        }
        premiumAmount-=loading;
        let totalServiceTax = (((18/ 100) * premiumAmount))
        // let loadingServiceTax = (18/100)*loading
        // let totalServiceTax = serviceTax - loadingServiceTax
        let totalPremium = Math.round((premiumAmount + totalServiceTax))
        // totalPremium =  Math.round(totalPremium * 100) / 100
        let premium = this.props.premium
        premium.premiumWithServiceTax = totalPremium
        premium.serviceTax = (totalServiceTax)
        premium.premiumAmount = (premiumAmount)


        this.props.onPremiumUpdate(premium)

        // For current Plan
        let currentPlan = this.props.currentPlan
        currentPlan.totalPremium = totalPremium
        currentPlan.serviceTax = (totalServiceTax)
        currentPlan.premiumAmount = (premiumAmount)
        this.props.setCurrentPlan(currentPlan)
        this.props.onLoading(!this.props.loading)
    }

    handleChange = (event) => {
        // console.log(event.target.name, event.target.value)
        this.props.isMedicalHistory(event.target.value)
        this.setState({ [event.target.name]: event.target.value })
    }

    /**
     * OPTIMISE LATER [all the levels can be done by using index as well]
     */
    handleLevel1 = (uniqueId, indexPerMember) => (event) => {
        const medicalHistory = this.props.medicalHistory
        const Questiondata = this.props.Questiondata
        let mH = medicalHistory // For the medical History update at first time

        if (event.target.checked) {
            // findByUniqueId and mark it true
            Questiondata.map(question => {
                if (question.questionUniqueId === uniqueId) {
                    question.value = true
                    if (question.message && question.message.indexOf("5%") != -1) {
                        // console.log("Yes add loading....", question)
                        this.addLoading(indexPerMember)
                    }
                } else {
                    question.value = false
                }
            })

            // update indexPerMember info
            mH[indexPerMember].map(question => question.questionUniqueId === uniqueId ? question.value = true : false)

            // Now update questions as prop
            this.props.onUpdateQuestion(Questiondata)
            // Now set state of medical History per member
            this.props.onUpdateMedicalHistory(mH)
            // console.log(mH, indexPerMember)
        } else { // as false case of checkbox
            // find question at given indexPerMember and mark it as false
            mH[indexPerMember].map(question => question.questionUniqueId === uniqueId ? question.value = false : false)
            // Now check if any of member has same disease
            let flag = false
            mH.map(mh =>
                mh.map(question => {
                    if (question.questionUniqueId === uniqueId) {
                        flag = flag || question.value
                        console.log(question.value)
                    }
                }
                )
            )
            // Now assign flag value to the Question of props
            Questiondata.map(question => {
                if (question.questionUniqueId === uniqueId) {
                    question.value = flag
                    if (question.message && question.message.indexOf("5%") != -1) {
                        // console.log('Yes remove loading....', question)
                        this.removeLoading(indexPerMember)
                    }
                } else {
                    question.value = false
                }
            })
            // Now update questions as prop
            this.props.onUpdateQuestion(Questiondata)
            // Now set state of medical History per member
            this.props.onUpdateMedicalHistory(mH)
        }
    }
    // handle level1 subjective
    handleLevel1Subjective = (index, member_index_l1) => event => {
        const medicalHistory = this.props.medicalHistory
        medicalHistory[member_index_l1][index].answer = event.target.value
        console.log(medicalHistory)
        this.props.onUpdateMedicalHistory(medicalHistory)
    }

    // Handle level2 of Question OBJECTIVE types
    handleLevel2 = (uniqueId, uniqueIdL2, indexPerMember) => event => {
        const medicalHistory = this.props.medicalHistory
        const Questiondata = this.props.Questiondata
        let mH = medicalHistory // For the medical History update at first time

        if (event.target.checked) {
            // findByUniqueId, findByUniqueIdL2 and mark it true
            Questiondata.map(question => {
                if (question.questionUniqueId === uniqueId) {
                    question.insurerQuestions.map(iq => iq.questionUniqueId === uniqueIdL2 ? iq.value = true : false)
                }
            })
            // update indexPerMember info
            mH[indexPerMember].map(question => {
                if (question.questionUniqueId === uniqueId) {
                    question.insurerQuestions.map(iq => iq.questionUniqueId === uniqueIdL2 ? iq.value = true : false)
                }
            })

            // Now update questions as prop
            this.props.onUpdateQuestion(Questiondata)
            // Now set state of medical History per member
            this.props.onUpdateMedicalHistory(mH)
            // console.log(mH, indexPerMember)
        } else { // as false case of checkbox
            // find question at given indexPerMember by uniqueId, uniqueIdL2 and mark it as false
            mH[indexPerMember].map(question => {
                if (question.questionUniqueId === uniqueId) {
                    question.insurerQuestions.map(iq => iq.questionUniqueId === uniqueIdL2 ? iq.value = false : false)
                }
            })
            // Now check if any of member has same disease
            let flag = false
            mH.map(mh =>
                mh.map(question => {
                    if (question.questionUniqueId === uniqueId) {
                        question.insurerQuestions.map(iq => {
                            if (iq.questionUniqueId === uniqueIdL2) {
                                flag = flag || iq.value
                            }
                        })
                    }
                }
                )
            )
            // Now assign flag value to the Question of props
            Questiondata.map(question => {
                if (question.questionUniqueId === uniqueId) {
                    question.insurerQuestions.map(iq => iq.questionUniqueId === uniqueIdL2 ? iq.value = flag : false)
                }
            })
            // Now update questions as prop
            this.props.onUpdateQuestion(Questiondata)
            // Now set state of medical History per member
            this.props.onUpdateMedicalHistory(mH)
        }
    }

    // handle level2 subjective
    handleLevel2Subjective = (index, iq_index, member_index_l2) => event => {
        const medicalHistory = this.props.medicalHistory
        medicalHistory[member_index_l2][index].insurerQuestions[iq_index].answer = event.target.value
        console.log(medicalHistory)
        this.props.onUpdateMedicalHistory(medicalHistory)
    }
    // handle level3 Objective
    handleLevel3 = (uniqueId, uniqueIdL2, uniqueIdL3, indexPerMember) => event => {
        const medicalHistory = this.props.medicalHistory
        const Questiondata = this.props.Questiondata
        let mH = medicalHistory // For the medical History update at first time

        if (event.target.checked) {
            // findByUniqueId, findByUniqueIdL2 and mark it true
            Questiondata.map(question => {
                if (question.questionUniqueId === uniqueId) {
                    question.insurerQuestions.map(iq => {
                        if (iq.questionUniqueId === uniqueIdL2) {
                            iq.insurerSubQuestions.map(isq => isq.questionUniqueId === uniqueIdL3 ? isq.value = true : false)
                        }
                    })
                }
            })
            // update indexPerMember info
            mH[indexPerMember].map(question => {
                if (question.questionUniqueId === uniqueId) {
                    question.insurerQuestions.map(iq => {
                        if (iq.questionUniqueId === uniqueIdL2) {
                            iq.insurerSubQuestions.map(isq => isq.questionUniqueId === uniqueIdL3 ? isq.value = true : false)
                        }
                    })
                }
            })

            // Now update questions as prop
            this.props.onUpdateQuestion(Questiondata)
            // Now set state of medical History per member
            this.props.onUpdateMedicalHistory(mH)
            // console.log(mH, indexPerMember)
        } else { // as false case of checkbox
            // find question at given indexPerMember by uniqueId, uniqueIdL2 and mark it as false
            mH[indexPerMember].map(question => {
                if (question.questionUniqueId === uniqueId) {
                    question.insurerQuestions.map(iq => {
                        if (iq.questionUniqueId === uniqueIdL2) {
                            iq.insurerSubQuestions.map(isq => isq.questionUniqueId === uniqueIdL3 ? isq.value = false : false)
                        }
                    })
                }
            })
            // Now check if any of member has same disease
            let flag = false
            mH.map(mh =>
                mh.map(question => {
                    if (question.questionUniqueId === uniqueId) {
                        question.insurerQuestions.map(iq => {
                            if (iq.questionUniqueId === uniqueIdL2) {
                                iq.insurerSubQuestions.map(isq => {
                                    if (isq.questionUniqueId === uniqueIdL3) {
                                        flag = flag || iq.value
                                    }
                                })

                            }
                        })
                    }
                }
                )
            )
            // console.log(flag)
            // Now assign flag value to the Question of props
            Questiondata.map(question => {
                if (question.questionUniqueId === uniqueId) {
                    question.insurerQuestions.map(iq => iq.questionUniqueId === uniqueIdL2 ?
                        iq.insurerSubQuestions(isq => isq.questionUniqueId === uniqueIdL3 ? isq.value = flag : false) : false)
                }
            })
            // Questiondata['insurerQuestions'].map(question => question.questionUniqueId === uniqueId ? question.value = flag : false)
            // Now update questions as prop
            this.props.onUpdateQuestion(Questiondata)
            // Now set state of medical History per member
            this.props.onUpdateMedicalHistory(mH)
        }
    }
    // handle level3 subjective
    handleLevel3Subjective = (index, iq_index, isq_index, member_index_l3) => event => {
        const medicalHistory = this.props.medicalHistory
        medicalHistory[member_index_l3][index].insurerQuestions[iq_index].insurerSubQuestions[isq_index].answer = event.target.value
        console.log(medicalHistory)
        this.props.onUpdateMedicalHistory(medicalHistory)
    }

    // Now load Medical history according to each member
    loadMedicalHistory = () => {
        const proposalFormDataHealth = this.props.proposalFormDataHealth
        proposalFormDataHealth.insuredMembersList.map((member, index) => {
            if (member.medicalHistory) {
                member.medicalHistory.generalQuestions = this.props.medicalHistory[index]
            } else {
                member.medicalHistory = {}
                member.medicalHistory.generalQuestions = this.props.medicalHistory[index]
            }

        })
        // console.log(proposalFormDataHealth)
        this.props.loadProposalFormHealth(proposalFormDataHealth)
        localStorage.setItem("generalHistory", JSON.stringify(this.props.medicalHistory))
        localStorage.setItem("generalQuestions", JSON.stringify(this.props.Questiondata))
    }
    getMenuOptions = (range) => {
        let items = []
        for (let i = range[0]; i <= range[1]; i++) {
            items.push(<MenuItem value={i}>{i}</MenuItem>)
        }
        // console.log(items)
        return items
    }

    render() {
        const { classes } = this.props;
        const Questiondata = this.props.Questiondata;
        return (
            <div className="personal-detail-parent">
                <Panel>
                    {true &&
                        <div className="show-from">
                            {(this.props.step < 2 && this.state.personal_flag_init) &&
                                <Row>
                                    <Col md="11" sm="10" xs="10">
                                        <p className="step-details">Step 3 of {this.props.totalSteps}</p>
                                        <p className="step-name">General Questions</p>
                                    </Col>
                                    <Col md="1" sm="2" xs="2">
                                        <p className="edit">Edit</p>
                                    </Col>
                                </Row>
                            }
                            {(this.props.step === 2) &&
                                <div className="form-personal-details">
                                    <h3 className="personal-details-heading">
                                        General Questions &nbsp;&nbsp;<span className="edit-members">Edit</span>
                                    </h3>
                                    <p className="step-detail-success">Step 3 of {this.props.totalSteps}</p>
                                    <hr />


                                    {/* Hello Medical History */}
                                    {/* <Row>
                                        <Col md="2"><p className="gbui-menu-bar-1">Any Medical History</p></Col>
                                        <Col md="3">
                                            <FormControl className={classes.formControl} fullWidth>
                                                <RadioGroup
                                                    aria-label="Medical History"
                                                    name="medicalHistoryMember"
                                                    className={classes.group}
                                                    value={this.state.medicalHistoryMember}
                                                    onChange={this.handleChange}
                                                    row
                                                >
                                                    <FormControlLabel value="yes" control={<Radio classes={{
                                                        root: classes.root,
                                                        checked: classes.checked,
                                                    }} />} label="Yes" />
                                                    <FormControlLabel value="no" control={<Radio classes={{
                                                        root: classes.root,
                                                        checked: classes.checked,
                                                    }} />} label="No" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Col>
                                    </Row> */}

                                    {true && <div>
                                        {Questiondata.map((questionData, index) =>
                                            <div>
                                                <Row>
                                                    <Col md="12">
                                                        <p className="medical-query">
                                                            Q{index + 1}. {questionData.question}
                                                        </p>
                                                    </Col>
                                                    <Col md="12">
                                                        <FormGroup row>
                                                            {/* <FormControl className={classes.formControl} fullWidth row> */}
                                                            {this.props.inputformdata.familyDetails.map((item, item_index) =>
                                                                <div>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={this.props.medicalHistory[item_index][index].value}
                                                                                onChange={this.handleLevel1(questionData.questionUniqueId, item_index)}
                                                                                value='S'
                                                                                classes={{
                                                                                    root: classes.checkboxRoot,
                                                                                    checked: classes.checked
                                                                                }} />
                                                                        }
                                                                        label={item.member}
                                                                    />
                                                                    {this.props.medicalHistory[item_index][index].value && <p style={{ color: 'red' }} key={index}>{questionData.message}</p>}
                                                                </div>
                                                            )}
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            {questionData.questionType === 'SUBJECTIVE' && this.props.inputformdata.familyDetails.map((item, member_index_l1) =>
                                                                <TextField
                                                                    label={item.member}
                                                                    margin="dense"
                                                                    className={classes.formGroup}
                                                                    value={this.props.medicalHistory[member_index_l1][index].answer}
                                                                    onChange={this.handleLevel2Subjective(index, member_index_l1)} />)}
                                                        </FormGroup>

                                                    </Col>
                                                </Row>

                                                {/* Now look for Insurer Questions */}
                                                {questionData.value && questionData.insurerQuestions ?
                                                    questionData.insurerQuestions.map((iq, iq_index) =>
                                                        <div>
                                                            <Row>
                                                                <Col md="12">
                                                                    <p className="medical-query">
                                                                        Q{index + 1}.{iq_index + 1}. {iq.question}
                                                                    </p>
                                                                </Col>
                                                                <Col md="12">
                                                                    <FormGroup row>
                                                                        {/* <FormControl className={classes.formControl} fullWidth row> */}
                                                                        {this.props.inputformdata.familyDetails.map((item, item_index_l2) =>
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                        checked={this.props.medicalHistory[item_index_l2][index].insurerQuestions[iq_index].value}
                                                                                        onChange={this.handleLevel2(questionData.questionUniqueId, iq.questionUniqueId, item_index_l2)}
                                                                                        value='S'
                                                                                        classes={{
                                                                                            root: classes.checkboxRoot,
                                                                                            checked: classes.checked
                                                                                        }} />
                                                                                }
                                                                                label={item.member}
                                                                            />)}
                                                                    </FormGroup>
                                                                    <FormGroup row>
                                                                        {iq.questionType === 'SUBJECTIVE' && this.props.inputformdata.familyDetails.map((item, member_index_l2) =>
                                                                            <TextField
                                                                                label={item.member}
                                                                                margin="dense"
                                                                                className={classes.formGroup}
                                                                                value={this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index].answer}
                                                                                onChange={this.handleLevel2Subjective(index, iq_index, member_index_l2)} />)}
                                                                    </FormGroup>
                                                                    <FormGroup row>
                                                                        {iq.questionType === 'SELECT' && this.props.inputformdata.familyDetails.map((item, member_index_l2) =>
                                                                            <FormControl>
                                                                                <InputLabel htmlFor="select">{item.member}</InputLabel>
                                                                                <Select
                                                                                    // value={this.state.proposerDetails.profession}
                                                                                    value={this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index].answer}
                                                                                    onChange={this.handleLevel2Subjective(index, iq_index, member_index_l2)}
                                                                                >
                                                                                    {this.getMenuOptions(iq.range)}

                                                                                    {/* {Array(50).fill(0).map((key, slctVal) => { return <MenuItem value={slctVal}>{key}</MenuItem> } */}
                                                                                    )}
                                                                                </Select>
                                                                            </FormControl>
                                                                            // <TextField
                                                                            //     label={item.member}
                                                                            //     className={classes.formGroup}
                                                                            //     value={this.props.medicalHistory[member_index_l3][index].insurerQuestions[iq_index].insurerSubQuestions[isq_index].answer}
                                                                            //     onChange={this.handleLevel3Subjective(index, iq_index, isq_index, member_index_l3)} />
                                                                        )}
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            {iq.value && iq.insurerSubQuestions ?
                                                                iq.insurerSubQuestions.map((isq, isq_index) =>
                                                                    <div>
                                                                        <Row>
                                                                            <Col md="12">
                                                                                <p className="medical-query">
                                                                                    Q{index + 1}.{iq_index + 1}.{isq_index + 1} {isq.question}
                                                                                </p>
                                                                            </Col>
                                                                            <Col md="12">
                                                                                <FormGroup row>
                                                                                    {/* <FormControl className={classes.formControl} fullWidth row> */}
                                                                                    {this.props.inputformdata.familyDetails.map((item, item_index_l3) =>
                                                                                        <FormControlLabel
                                                                                            control={
                                                                                                <Checkbox
                                                                                                    checked={this.props.medicalHistory[item_index_l3][index].insurerQuestions[iq_index].insurerSubQuestions[isq_index].value}
                                                                                                    onChange={this.handleLevel3(questionData.questionUniqueId, iq.questionUniqueId, isq.questionUniqueId, item_index_l3)}
                                                                                                    value='S'
                                                                                                    classes={{
                                                                                                        root: classes.checkboxRoot,
                                                                                                        checked: classes.checked
                                                                                                    }} />
                                                                                            }
                                                                                            label={item.member}
                                                                                        />)}
                                                                                </FormGroup>
                                                                                <FormGroup row>
                                                                                    {isq.questionType === 'SUBJECTIVE' && this.props.inputformdata.familyDetails.map((item, member_index_l3) =>
                                                                                        <TextField
                                                                                            label={item.member}
                                                                                            className={classes.formGroup}
                                                                                            value={this.props.medicalHistory[member_index_l3][index].insurerQuestions[iq_index].insurerSubQuestions[isq_index].answer}
                                                                                            onChange={this.handleLevel3Subjective(index, iq_index, isq_index, member_index_l3)} />)}
                                                                                </FormGroup>
                                                                                <FormGroup row>
                                                                                    {isq.questionType === 'SELECT' && this.props.inputformdata.familyDetails.map((item, member_index_l3) =>
                                                                                        <FormControl>
                                                                                            <InputLabel htmlFor="select">{item.member}</InputLabel>
                                                                                            <Select
                                                                                                // value={this.state.proposerDetails.profession}
                                                                                                value={this.props.medicalHistory[member_index_l3][index].insurerQuestions[iq_index].insurerSubQuestions[isq_index].answer}
                                                                                                onChange={this.handleLevel3Subjective(index, iq_index, isq_index, member_index_l3)}
                                                                                            >
                                                                                                {Array(50).fill(0).map((key, index) => { return <MenuItem value={index}>{key}</MenuItem> }
                                                                                                )}
                                                                                            </Select>
                                                                                        </FormControl>
                                                                                        // <TextField
                                                                                        //     label={item.member}
                                                                                        //     className={classes.formGroup}
                                                                                        //     value={this.props.medicalHistory[member_index_l3][index].insurerQuestions[iq_index].insurerSubQuestions[isq_index].answer}
                                                                                        //     onChange={this.handleLevel3Subjective(index, iq_index, isq_index, member_index_l3)} />
                                                                                    )}
                                                                                </FormGroup>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>) : ''}
                                                        </div>
                                                    ) : ''}
                                            </div>
                                        )}
                                    </div>}

                                    {/*  Button next */}
                                    <div className="button-next">
                                        <Button
                                            className={[classNames(classes.buttonRoot), "button_prev"].join(" ")}
                                            onClick={() => {
                                                this.props.setStep(1);
                                                this.setState({ personal_flag_init: true })
                                                this.loadMedicalHistory()
                                            }}>
                                            Previous
                                        </Button>
                                        <Button disabled={!this.state.isFormValid}
                                            className={[classNames(classes.buttonRoot3), "button_next"].join(" ")}
                                            onClick={() => {
                                                this.props.setStep(this.state.medicalHistoryMember === "yes" ? 3 : 4);
                                                this.setState({ personal_flag_init: true })
                                                this.loadMedicalHistory()
                                            }}>
                                            Next
                                         </Button>
                                    </div>
                                </div>
                            }
                            {this.props.step > 2 && <div className="owner_show_details">
                                <Row>
                                    <Col md="11" sm="10" xs="10">
                                        <h3 className="step-detail">Step 3 of {this.props.totalSteps}</h3>
                                        <h3 className="owners-heading">General Questions Detail</h3>
                                    </Col>
                                    <Col md="1" sm="2" xs="2">
                                    {this.props.step < 7 &&
                                        <h3
                                            className="edit"
                                            onClick={() => { this.props.setStep(2); }}>Edit</h3>
                                    }
                                    </Col>
                                </Row>
                                <hr />
                                <div className="desktop-data">
                                    {/* <Row>
                                        <Col md="2"><p className="gbui-menu-bar-1">Any Medical History</p></Col>
                                        <Col md="3">
                                            <FormControl className={classes.formControl} fullWidth>
                                                <RadioGroup
                                                    aria-label="Medical History"
                                                    name="medicalHistoryMember"
                                                    className={classes.group}
                                                    value={this.state.medicalHistoryMember}
                                                    onChange={this.handleChange}
                                                    row
                                                    disabled={true}
                                                >
                                                    <FormControlLabel value="yes" control={<Radio classes={{
                                                        root: classes.root,
                                                        checked: classes.checked,
                                                    }} disabled={true} />} label="Yes" />
                                                    <FormControlLabel value="no" control={<Radio classes={{
                                                        root: classes.root,
                                                        checked: classes.checked,
                                                    }} disabled={true} />} label="No" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Col>

                                    </Row> */}

                                    {true && <div>
                                        {Questiondata.map((questionData, index) =>
                                            <div>
                                                <Row>
                                                    <Col md="12">
                                                        <p className="medical-query">
                                                            Q{index + 1}. {questionData.question}
                                                        </p>
                                                    </Col>
                                                    <Col md="12">
                                                        <FormGroup row>
                                                            {/* <FormControl className={classes.formControl} fullWidth row> */}
                                                            {this.props.inputformdata.familyDetails.map((item, item_index) =>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={this.props.medicalHistory[item_index][index].value}
                                                                            onChange={this.handleLevel1(questionData.questionUniqueId, item_index)}
                                                                            value='S'
                                                                            classes={{
                                                                                root: classes.checkboxRoot,
                                                                                checked: classes.checked
                                                                            }}
                                                                            disabled={true} />
                                                                    }
                                                                    label={item.member}
                                                                />)}
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            {questionData.questionType === 'SUBJECTIVE' && this.props.inputformdata.familyDetails.map((item, member_index_l1) =>
                                                                <TextField
                                                                    label={item.member}
                                                                    margin="dense"
                                                                    disabled={true}
                                                                    className={classes.formGroup}
                                                                    value={this.props.medicalHistory[member_index_l1][index].answer}
                                                                    onClick={this.handleLevel2Subjective(index, member_index_l1)} />)}
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                {/* Now look for Insurer Questions */}
                                                {questionData.value && questionData.insurerQuestions ?
                                                    questionData.insurerQuestions.map((iq, iq_index) =>
                                                        <div>
                                                            <Row>
                                                                <Col md="12">
                                                                    <p className="medical-query">
                                                                        Q{index + 1}.{iq_index + 1}. {iq.question}
                                                                    </p>
                                                                </Col>
                                                                <Col md="12">
                                                                    <FormGroup row>
                                                                        {/* <FormControl className={classes.formControl} fullWidth row> */}
                                                                        {this.props.inputformdata.familyDetails.map((item, item_index_l2) =>
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                        checked={this.props.medicalHistory[item_index_l2][index].insurerQuestions[iq_index].value}
                                                                                        onChange={this.handleLevel2(questionData.questionUniqueId, iq.questionUniqueId, item_index_l2)}
                                                                                        value='S'
                                                                                        classes={{
                                                                                            root: classes.checkboxRoot,
                                                                                            checked: classes.checked
                                                                                        }}
                                                                                        disabled={true} />
                                                                                }
                                                                                label={item.member}
                                                                            />)}
                                                                    </FormGroup>
                                                                    <FormGroup row>
                                                                        {iq.questionType === 'SUBJECTIVE' && this.props.inputformdata.familyDetails.map((item, member_index_l2) =>
                                                                            <TextField
                                                                                label={item.member}
                                                                                disabled={true}
                                                                                margin="dense"
                                                                                className={classes.formGroup}
                                                                                value={this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index].answer}
                                                                                onClick={this.handleLevel2Subjective(index, iq_index, member_index_l2)} />)}
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            {iq.value && iq.insurerSubQuestions ?
                                                                iq.insurerSubQuestions.map((isq, isq_index) =>
                                                                    <div>
                                                                        <Row>
                                                                            <Col md="12">
                                                                                <p className="medical-query">
                                                                                    Q{index + 1}.{iq_index + 1}.{isq_index + 1} {isq.question}
                                                                                </p>
                                                                            </Col>
                                                                            <Col md="12">
                                                                                <FormGroup row>
                                                                                    {/* <FormControl className={classes.formControl} fullWidth row> */}
                                                                                    {this.props.inputformdata.familyDetails.map((item, item_index_l3) =>
                                                                                        <FormControlLabel
                                                                                            control={
                                                                                                <Checkbox
                                                                                                    disabled={true}
                                                                                                    checked={this.props.medicalHistory[item_index_l3][index].insurerQuestions[iq_index].insurerSubQuestions[isq_index].value}
                                                                                                    onChange={this.handleLevel3(questionData.questionUniqueId, iq.questionUniqueId, isq.questionUniqueId, item_index_l3)}
                                                                                                    value='S'
                                                                                                    classes={{
                                                                                                        root: classes.checkboxRoot,
                                                                                                        checked: classes.checked
                                                                                                    }} />
                                                                                            }
                                                                                            label={item.member}
                                                                                        />)}
                                                                                </FormGroup>
                                                                                <FormGroup row>
                                                                                    {isq.questionType === 'SUBJECTIVE' && this.props.inputformdata.familyDetails.map((item, member_index_l3) =>
                                                                                        <TextField
                                                                                            label={item.member}
                                                                                            disabled={true}
                                                                                            className={classes.formGroup}
                                                                                            value={this.props.medicalHistory[member_index_l3][index].insurerQuestions[iq_index].insurerSubQuestions[isq_index].answer}
                                                                                            onChange={this.handleLevel3Subjective(index, iq_index, isq_index, member_index_l3)} />)}
                                                                                </FormGroup>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>) : ''}
                                                        </div>
                                                    ) : ''}
                                            </div>
                                        )}
                                    </div>}
                                </div>
                                {/* For Mobile View */}
                                {/* Table */}

                            </div>}
                        </div>
                    }
                </Panel>
            </div>
        )
    }
}

GeneralQuestions.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    step: state.proposal_form_motor.stepH,
    proposalFormDataHealth: state.proposalFormHealth.proposalFormHealthData,
    activeTab: state.proposalFormHealth.insuredMemberTabValue,
    inputformdata: state.inputFormHealth.inputFormHealthData,
    currentPlan: state.currentPlan.details ? state.currentPlan.details : {},
    premium: state.premium.details,
})

const mapDispatchToProps = dispatch => ({
    setStep: step => dispatch({ type: 'SET_STEP_H', step }),
    loadProposalFormHealth: (data) => dispatch({ type: 'PROPOSAL_FORM_HEALTH', data }),
    insuredMemberTabValue: (value) => dispatch({ type: 'INSURED_MEMBER_TAB_VALUE', value }),
    ProposalFormHealthMember: (value) => dispatch({ type: 'PROPOSAL_FORM_HEALTH_MEMBER', value }),
    onPremiumUpdate: (data) => dispatch({ type: 'PREMIUM_DETAILS', data }),
    setCurrentPlan: (plan) => dispatch({ type: 'CURRENT_PLAN', plan }),
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GeneralQuestions))
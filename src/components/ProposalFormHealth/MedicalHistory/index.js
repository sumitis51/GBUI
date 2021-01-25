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
import MaskedInput from 'react-text-mask';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import './medical.css'
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

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            placeholder={'mm/yyyy'}
            showMask
        />
    );
}

class MedicalHistory extends React.Component {
    state = {
        personal_flag_init: true,
        isFormValid: true,
        medicalHistoryMember: 'no',
        medicalHistory: [],
        months: [
            { key: 'January', value: '01' },
            { key: 'February', value: '02' },
            { key: 'March', value: '03' },
            { key: 'April', value: '04' },
            { key: 'May', value: '05' },
            { key: 'June', value: '06' },
            { key: 'July', value: '07' },
            { key: 'August', value: '08' },
            { key: 'September', value: '09' },
            { key: 'October', value: '10' },
            { key: 'November', value: '11' },
            { key: 'December', value: '12' },

        ]
    }
    handleChange = (event) => {
        if (event.target.value == 'no') {
            this.setState({ [event.target.name]: event.target.value, isFormValid: true})
        }else{
            this.setState({ [event.target.name]: event.target.value, isFormValid: false })
        }
        
        localStorage.setItem('isMedicalHistory', event.target.value)
    }

    /**
     * OPTIMISE LATER [all the levels can be done by using index as well]
     */
    handleLevel1 = (uniqueId, indexPerMember) => (event) => {
        const medicalHistory = this.props.medicalHistory
        const Questiondata = this.props.Questiondata
        let mH = medicalHistory // For the medical History update at first time
        let isValid = true
        if (event.target.checked) {
            // findByUniqueId and mark it true
            Questiondata.map(question => question.questionUniqueId === uniqueId ? question.value = true : false)
            // update indexPerMember info
            mH[indexPerMember].map(question => question.questionUniqueId === uniqueId ? question.value = true : false)

            this.setState({ isFormValid: !isValid })
            // Now update questions as prop
            this.props.onUpdateQuestion(Questiondata)
            // Now set state of medical History per member
            this.props.onUpdateMedicalHistory(mH)
        } else { // as false case of checkbox
            // find question at given indexPerMember and mark it as false
            mH[indexPerMember].map(question => question.questionUniqueId === uniqueId ? question.value = false : false)
            // Now check if any of member has same disease
            let flag = false
            mH.map(mh =>
                mh.map(question => {
                    if (question.questionUniqueId === uniqueId) {
                        flag = flag || question.value
                    }
                }
                )
            )
            // Now assign flag value to the Question of props
            Questiondata.map(question => question.questionUniqueId === uniqueId ? question.value = flag : false)
            // Now update questions as prop
            this.setState({ isFormValid: !isValid })
            this.props.onUpdateQuestion(Questiondata)

            // Now set state of medical History per member
            this.props.onUpdateMedicalHistory(mH)
        }
        mH.map(member => {
            member.map(question => {
                if (question.insurerQuestions) {
                    question.insurerQuestions.map(iq => {
                        isValid = question.value  ? (iq.value && iq.year && iq.month && isValid) : isValid
                        // console.log(iq.value , (iq.year && iq.month && isValid))
                    })
                } else {
                    isValid = question.mandatory && question.value ? question.answer !== null && isValid : true && isValid
                    if (question.mandatory && question.value)
                        !question.answer ? question.valid = false : question.valid = true
                }

                //  debugger;
                // console.log(question.mandatory, question.answer, question.value, isValid)
            })
        })
    }
    // handle level1 subjective
    handleLevel1Subjective = (index, member_index_l1) => event => {
        const medicalHistory = this.props.medicalHistory
        medicalHistory[member_index_l1][index].answer = event.target.value
        medicalHistory[member_index_l1][index].valid = medicalHistory[member_index_l1][index].mandatory && medicalHistory[member_index_l1][index].answer
        // Check validity
        let isValid = true
        medicalHistory.map(member => {
            member.map(question => {
                isValid = question.value ? (question.mandatory && question.answer && isValid) : isValid
                // console.log(question.mandatory , question.answer , isValid)
            })
        })

        this.setState({ isFormValid: isValid })
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
            let isValid = true
            mH.map(member => {
                member.map(question => {
                    question.insurerQuestions ? question.insurerQuestions.map(iq => {
                        isValid = iq.value ? (iq.year && iq.month && isValid) : isValid
                        // console.log(iq.value, (iq.year && iq.month && isValid))
                       
                        console.log(iq.value ,iq.answer, iq.questionType, "oooooooooooooooooo")
                        // console.log((iq.value == false && iq.questionType == "subjective") && (iq.answer = null), "iiiiiiiiiii")
                        
                    }) : ''

                })
            })
            this.setState({ isFormValid: isValid })

            // Now update questions as prop
            this.props.onUpdateQuestion(Questiondata)
            // Now set state of medical History per member
            this.props.onUpdateMedicalHistory(mH)
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
            let isValid = true
            mH.map(member => {
                member.map(question => {
                    question.insurerQuestions ? question.insurerQuestions.map(iq => {
                       /* by harish */
                        if(iq.questionType == "SUBJECTIVE") {
                            if(iq.value == false){
                                iq.answer = null;
                            }
                        }
                        
                        isValid = !question.value && (iq.value ? (iq.year && iq.month && isValid) : isValid)
                        console.log(iq.value, (iq.year && iq.month && isValid))
                    }) : ''

                })
            })
            this.setState({ isFormValid: isValid })
            // Now update questions as prop
            this.props.onUpdateQuestion(Questiondata)
           
            // Now set state of medical History per member
            this.props.onUpdateMedicalHistory(mH)
            console.log(mH, "pppppppppp")

        }
    }

    // handle level2 subjective
    handleLevel2Subjective = (index, iq_index, member_index_l2) => event => {
       
        // debugger;
        const medicalHistory = this.props.medicalHistory
        const question = medicalHistory[member_index_l2][index].insurerQuestions[iq_index]
        if (question.questionType === 'MONTH_YEAR') {
            const name = event.target.name
            const value = event.target.value    
            medicalHistory[member_index_l2][index].insurerQuestions[iq_index][name] = value
            medicalHistory[member_index_l2][index].insurerQuestions[iq_index].answer = `${medicalHistory[member_index_l2][index].insurerQuestions[iq_index]['month']}/${medicalHistory[member_index_l2][index].insurerQuestions[iq_index]['year']}`
            // if() {

            // }
            let isValid = true
            medicalHistory.map(member => {
                member.map(question => {
                    question.insurerQuestions ? question.insurerQuestions.map(iq => {
                        isValid = iq.value ? (iq.year && iq.month && isValid) : isValid
                        console.log(iq.value, (iq.year && iq.month && isValid))
                    }) : ''

                })
            })
            // console.log(medicalHistory)
            this.setState({ isFormValid: isValid })

        } else {

            let FieldValue = event.target.value;
            FieldValue = FieldValue.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            if(FieldValue !== "") {
            medicalHistory[member_index_l2][index].insurerQuestions[iq_index].answer = FieldValue;
            this.setState({ isFormValid:true })
            // console.log("yyyyyyyyyyyyyyy")
            } else {
                medicalHistory[member_index_l2][index].insurerQuestions[iq_index].answer = FieldValue;
                this.setState({ isFormValid: false })
                // console.log("nnnnnnnnnnnnnnn")
            }
        }

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
        this.props.onUpdateMedicalHistory(medicalHistory)
    }

    // Now load Medical history according to each member
    loadMedicalHistory = () => {
        const proposalFormDataHealth = this.props.proposalFormDataHealth
        proposalFormDataHealth.insuredMembersList.map((member, index) => {
            if (member.medicalHistory) {
                member.medicalHistory.medicalHistoryQuestions = this.props.medicalHistory[index]
            } else {
                member.medicalHistory = {}
                member.medicalHistory.medicalHistoryQuestions = this.props.medicalHistory[index]
            }

        })
        this.props.loadProposalFormHealth(proposalFormDataHealth)
        localStorage.setItem("medicalHistory", JSON.stringify(this.props.medicalHistory))
        localStorage.setItem("medicalQuestions", JSON.stringify(this.props.Questiondata))
    }

    getMenuOptions = (member_index_l2) => {
        const minYear = Number(new Date(this.props.proposalFormDataHealth.insuredMembersList[member_index_l2].dateOfBirth).getFullYear())
        const maxYear = Number(new Date().getFullYear())
        let items = []
        for (let i = minYear; i <= maxYear; i++) {
            items.push(<MenuItem value={i}>{i}</MenuItem>)
        }
        // console.log(items)
        return items
    }
    getMenuOptionsMonths = (member_index_l2, year) => {
        const dob = new Date(this.props.proposalFormDataHealth.insuredMembersList[member_index_l2].dateOfBirth)
        let items = []
        const months = this.state.months
        if (year === new Date().getFullYear()) {
            for (let i = 0; i <= new Date().getMonth(); i++) {
                items.push(<MenuItem value={months[i].value}>{months[i].key}</MenuItem>)
            }
        } else if (dob.getFullYear() === year) {
            for (let i = dob.getMonth(); i < months.length; i++) {
                items.push(<MenuItem value={months[i].value}>{months[i].key}</MenuItem>)
            }
        }
        else {
            for (let i = 0; i < months.length; i++) {
                items.push(<MenuItem value={months[i].value}>{months[i].key}</MenuItem>)
            }
        }
        return items
        // this.state.months.map((item, index) => {
        //     return index <= new Date().getMonth() ?
        //          : ''

        // })
    }
    componentDidMount() {
        if (this.props.isProposalSummary) {
            this.setState({ medicalHistoryMember: localStorage.getItem('isMedicalHistory') })
        }
    }
    render() {
        const { classes } = this.props;
        const Questiondata = this.props.Questiondata;

        return (
            <div className="personal-detail-parent">
                <Panel>
                    {true &&
                        <div className="show-from">
                            {(this.props.step < 3 && this.state.personal_flag_init) &&
                                <Row>
                                    <Col md="11" sm="10" xs="10">
                                        <p className="step-details">Step 4 of {this.props.totalSteps}</p>
                                        <p className="step-name">Medical History</p>
                                    </Col>
                                    <Col md="1" sm="2" xs="2">
                                        <p className="edit">Edit</p>
                                    </Col>
                                </Row>
                            }
                            {(this.props.step === 3) &&
                                <div className="form-personal-details">
                                    <h3 className="personal-details-heading">
                                        Medical History &nbsp;&nbsp;<span className="edit-members">Edit</span>
                                    </h3>
                                    <p className="step-detail-success">Step 4 of {this.props.totalSteps}</p>
                                    <hr />


                                    {/* Hello Medical History */}
                                    <Row>
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

                                    </Row>

                                    {this.state.medicalHistoryMember === 'yes' && <div>
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
                                                                            }} />
                                                                    }
                                                                    label={item.member}
                                                                />)}
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            {questionData.questionType === 'SUBJECTIVE' && this.props.inputformdata.familyDetails.map((item, member_index_l1) =>
                                                                this.props.medicalHistory[member_index_l1][index].value &&
                                                                <React.Fragment>

                                                                    <TextField
                                                                        label={item.member}
                                                                        margin="dense"
                                                                        className={classes.formGroup}
                                                                        value={this.props.medicalHistory[member_index_l1][index].answer}
                                                                        onChange={this.handleLevel1Subjective(index, member_index_l1)} />
                                                                    {!this.props.medicalHistory[member_index_l1][index].valid && <p className="error" style={{ display: 'block' }}>Please enter medical history details for {item.member}</p>}</React.Fragment>)}

                                                            {/* {questionData.questionType === 'MONTH_YEAR' && this.props.inputformdata.familyDetails.map((item, member_index_l1) =>
                                                                this.props.medicalHistory[member_index_l1][index].value &&

                                                                <TextField
                                                                    label={item.member}
                                                                    margin="dense"
                                                                    className={classes.formGroup}
                                                                    value={this.props.medicalHistory[member_index_l1][index].answer}
                                                                    onChange={this.handleLevel2Subjective(index, member_index_l1)}
                                                                    placeholder="mm/yyyy" />)} */}

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
                                                                        this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index].value &&
                                                                        <div>
                                                                        {console.log(this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index].answer, "sssss")}
                                                                            <TextField
                                                                                label={item.member}
                                                                                margin="dense"
                                                                                className={classes.formGroup}
                                                                                value={this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index].answer}
                                                                                onChange={this.handleLevel2Subjective(index, iq_index, member_index_l2)} />
                                                                                </div>)}
                                                                        {iq.questionType === 'MONTH_YEAR' && this.props.inputformdata.familyDetails.map((item, member_index_l2) =>
                                                                            this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index].value &&
                                                                            // <FormControl className={classes.formControl}>
                                                                            //     <InputLabel htmlFor="formatted-text-mask-input">{item.member}</InputLabel>
                                                                            //     <Input
                                                                            //         margin="dense"
                                                                            //         className={classes.formGroup}
                                                                            //         placeholder="mm/yyyy"
                                                                            //         value={this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index].answer}
                                                                            //         onChange={this.handleLevel2Subjective(index, iq_index, member_index_l2)}
                                                                            //         id="formatted-text-mask-input"
                                                                            //         inputComponent={TextMaskCustom}
                                                                            //     />
                                                                            // </FormControl>
                                                                            <React.Fragment>
                                                                                <FormControl style={{ width: '120px' }}>
                                                                                    <InputLabel shrink={this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index]['year'] ? true : false} htmlFor={`year-${iq_index}`}>Year for {item.member}</InputLabel>
                                                                                    <Select
                                                                                        // value={this.state.proposerDetails.profession}
                                                                                        value={this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index]['year']}
                                                                                        onChange={this.handleLevel2Subjective(index, iq_index, member_index_l2)}
                                                                                        name="year"
                                                                                        id={`year-${iq_index}`}
                                                                                    >
                                                                                        {this.getMenuOptions(member_index_l2)}

                                                                                        {/* {Array(5).fill(1).map((key, slctVal) => { return <MenuItem value={slctVal}>{key}</MenuItem> } */}
                                                                                        )}
                                                                            </Select>
                                                                                </FormControl>
                                                                                <FormControl style={{ width: '120px' }}>
                                                                                    <InputLabel
                                                                                        htmlFor={`month-${iq_index}`}
                                                                                        shrink={this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index]['month'] ? true: false}>Month for {item.member}</InputLabel>
                                                                                    <Select
                                                                                        value={this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index]['month']}
                                                                                        onChange={this.handleLevel2Subjective(index, iq_index, member_index_l2)}
                                                                                        name="month"
                                                                                        id={`month-${iq_index}`}
                                                                                    >
                                                                                        {/* {this.getMenuOptions(iq.range)} */}
                                                                                        {this.getMenuOptionsMonths(member_index_l2, this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index]['year'])}
                                                                                        {/* {this.state.months.map((item, index) => {
                                                                                            return index <= new Date().getMonth() ?
                                                                                                <MenuItem value={item.value}>{item.key}</MenuItem> : ''
                                                                                        }
                                                                                        )} */}
                                                                                    </Select>
                                                                                </FormControl>

                                                                            </React.Fragment>
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
                                                this.props.setStep(2);
                                                this.setState({ personal_flag_init: true })
                                                this.loadMedicalHistory()
                                            }}>
                                            Previous
                                        </Button>
                                        <Button disabled={!this.state.isFormValid}
                                            className={[classNames(classes.buttonRoot3), "button_next"].join(" ")}
                                            onClick={() => {
                                                this.props.setStep(4);
                                                this.setState({ personal_flag_init: true })
                                                this.loadMedicalHistory()
                                            }}>
                                            Next
                                         </Button>
                                    </div>
                                </div>
                            }
                            {this.props.step > 3 && <div className="owner_show_details">
                                <Row>
                                    <Col md="11" sm="10" xs="10">
                                        <h3 className="step-detail">Step 4 of {this.props.totalSteps}</h3>
                                        <h3 className="owners-heading">Medical History Details</h3>
                                    </Col>
                                    <Col md="1" sm="2" xs="2">
                                    {this.props.step < 7 &&
                                        <h3
                                            className="edit"
                                            onClick={() => { this.props.setStep(3); }}>Edit</h3>
                                    }
                                    </Col>
                                </Row>
                                <hr />
                                <div className="desktop-data">
                                    <Row>
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

                                    </Row>

                                    {this.state.medicalHistoryMember === 'yes' && <div>
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
                                                                                onChange={this.handleLevel2Subjective(index, iq_index, member_index_l2)} />)}
                                                                        {iq.questionType === 'MONTH_YEAR' && this.props.inputformdata.familyDetails.map((item, member_index_l2) =>
                                                                            this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index].value &&
                                                                            // <FormControl className={classes.formControl}>
                                                                            //     <InputLabel htmlFor="formatted-text-mask-input">{item.member}</InputLabel>
                                                                            //     <Input
                                                                            //         margin="dense"
                                                                            //         className={classes.formGroup}
                                                                            //         placeholder="mm/yyyy"
                                                                            //         value={this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index].answer}
                                                                            //         onChange={this.handleLevel2Subjective(index, iq_index, member_index_l2)}
                                                                            //         id="formatted-text-mask-input"
                                                                            //         inputComponent={TextMaskCustom}
                                                                            //     />
                                                                            // </FormControl>
                                                                            <React.Fragment>
                                                                                <FormControl style={{ width: '120px' }}>
                                                                                    <InputLabel htmlFor={`month-${iq_index}`}>Month for {item.member}</InputLabel>
                                                                                    <Select
                                                                                        value={this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index]['month']}
                                                                                        onChange={this.handleLevel2Subjective(index, iq_index, member_index_l2)}
                                                                                        name="month"
                                                                                        id={`month-${iq_index}`}
                                                                                        disabled={true}
                                                                                    >
                                                                                        {/* {this.getMenuOptions(iq.range)} */}

                                                                                        {this.state.months.map(item => { return <MenuItem value={item.value}>{item.key}</MenuItem> }
                                                                                        )}
                                                                                    </Select>
                                                                                </FormControl>
                                                                                <FormControl style={{ width: '120px' }}>
                                                                                    <InputLabel htmlFor={`year-${iq_index}`}>Year for {item.member}</InputLabel>
                                                                                    <Select
                                                                                        // value={this.state.proposerDetails.profession}
                                                                                        value={this.props.medicalHistory[member_index_l2][index].insurerQuestions[iq_index]['year']}
                                                                                        onChange={this.handleLevel2Subjective(index, iq_index, member_index_l2)}
                                                                                        name="year"
                                                                                        id={`year-${iq_index}`}
                                                                                        disabled={true}
                                                                                    >
                                                                                        {this.getMenuOptions(member_index_l2)}

                                                                                        {/* {Array(5).fill(1).map((key, slctVal) => { return <MenuItem value={slctVal}>{key}</MenuItem> } */}
                                                                                        )}
                                                                            </Select>
                                                                                </FormControl>
                                                                            </React.Fragment>
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

MedicalHistory.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MedicalHistory))
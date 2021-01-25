import React, { Component } from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';




import './index.css'
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index'




const styles = theme => ({
    root: {
        display: 'flex',
    },
    tabsRoot: {
        minHeight: '80px',
        minWidth: '25%',
    },
    tabsIndicator: {
        backgroundColor: '#ea0b4b',
        minWidth: '25%',
    },
    tabRoot: {
        outline: 'none',
        textTransform: 'initial',
        backgroundColor: '#ffffff',
        minWidth: 349,
        color: '#808080',
        marginRight: 0,
        border: '1px solid #aaaaaa',
        fontFamily: [
            'Nunito'
        ].join(','),
        '&$tabSelected': {
            color: '#ea0b4b',
            border: '1px solid #ea0b4b',
        },
        '&:focus': {
            color: '#ea0b4b',
            outline: 'none'
        },
    },
    tabsRoot2: {
        minHeight: '80px',
        minWidth: '25%',
    },
    tabsIndicator2: {
        backgroundColor: '#ea0b4b',
        minWidth: '25%',
        left: '-3px',
    },
    tabRoot2: {
        outline: 'none',
        textTransform: 'initial',
        backgroundColor: '#ffffff',
        minWidth: 78,
        color: '#808080',
        marginRight: 0,
        border: '1px solid #aaaaaa',
        fontFamily: [
            'Nunito'
        ].join(','),
        '&$tabSelected': {
            color: '#ea0b4b',
            border: '1px solid #ea0b4b',
        },
        '&:focus': {
            color: '#ea0b4b',
            outline: 'none'
        },
    },
    label: {
        paddingLeft: '9px',
        paddingRight: '9px'
    },
    tabSelected: {},
});

class GroupHealthTabs extends Component {
    state = {
        mobileView: false,
        value: 0,
        del_value: 0,
        open: false,
        snack: false,
        vertical: 'top',
        horizontal: 'center',
        group: {
            self: [],
            parents: [],
            inLaws: []
        },
        tabData: [{ id: 0, planfor: '10 Plans for', mamberplan: 'Self +2', cancel: 'cancel', memberincluded: 'You, your wife, and two sons' },
        { id: 1, planfor: '10 Plans for', mamberplan: 'Father & Mother', cancel: 'cancel', memberincluded: 'Your father and Mother' },
        { id: 2, planfor: '10 Plans for', mamberplan: 'Father & Mother(in laws)', cancel: 'cancel', memberincluded: 'Your (father and Mother) in laws' },
        { id: 3, planfor: '10 Plans for', mamberplan: 'All family members', cancel: 'cancel', memberincluded: 'You, spouse, kids, parents & in laws' }],
        tabData2: [{ id: 0, planfor: '10 Plans for', mamberplan: 'Self +2', cancel: 'cancel', memberincluded: 'You, your wife, and two sons' },
        { id: 1, planfor: '10 Plans for', mamberplan: 'Father & Mother', cancel: 'cancel', memberincluded: 'Your father and Mother' },
        { id: 2, planfor: '10 Plans for', mamberplan: 'in laws', cancel: 'cancel', memberincluded: 'Your (father and Mother) in laws' },
        { id: 3, planfor: '10 Plans for', mamberplan: 'All members', cancel: 'cancel', memberincluded: 'You, spouse, kids, parents & in laws' }]
    }
    componentWillMount() {
        if (window.innerWidth <= 544) {
            this.setState({ mobileView: true })
        }
        const vm = this;
        window.addEventListener("resize", () => {
            if (window.innerWidth <= 544) {
                vm.setState({
                    mobileView: true
                })
            }
            else {
                vm.setState({ mobileView: false })
            }
        });
        this.props.onHealthTabClick(0);
        this.setState({ value: this.props.healthTab === undefined ? 0 : this.props.healthTab })
    }

    handleChange = (event, value) => {
        this.setState({ value });
        this.props.onHealthTabClick(value);
    };
    handleClose = value => {
        this.setState({ open: false });
    };
    handleClick = (id) => {
        this.setState({
            del_value: id,
            open: true
        })
    }

    handleGroupDeletion = (id) => {
        this.state.tabData.splice(id, 1)
        this.setState({
            open: false,
            snack: true,
            value:0,
        });
    }

    handleCloseSnack = () => {
        this.setState({ snack: false });
    };


    render() {
        const { classes } = this.props;
        const { value } = this.state;
        const { vertical, horizontal } = this.state;
        return (
            <div className={classes.root}>
                {this.state.mobileView ?
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        classes={{ root: classes.tabsRoot2, indicator: classes.tabsIndicator2 }}
                    >
                        {this.state.tabData2.map((p, index) =>
                            <Tab key={p.id}
                                disableRipple
                                classes={{ root: classes.tabRoot2, selected: classes.tabSelected, labelContainer: classes.label }}
                                label={<div>
                                    <div className='plan-for'>{p.planfor}</div>
                                    <div className='members-plan2'>{p.mamberplan}</div>
                                </div>
                                }
                            />
                        )}
                    </Tabs> :
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                    >
                        {this.state.tabData.map((p, index) =>
                            <Tab key={p.id}
                                disableRipple
                                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                label={<div>
                                    <div className='plan-for'>{p.planfor}</div>
                                    <div className='members-plan'>{p.mamberplan}</div>
                                    <div className='cancel-icon'><i onClick={this.handleClick.bind(this, index)} class="material-icons" style={{ fontSize: '15px', display: 'inline' }}>{p.cancel}</i></div>
                                    <div className='members-included'>{p.memberincluded}</div>
                                </div>
                                }
                            />
                        )}
                        {this.state.group.parents.map((p, index) =>
                            <Tab key={p.id}
                                disableRipple
                                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                label={<div>
                                    <div className='plan-for'>{p.planfor}</div>
                                    <div className='members-plan'>{p.mamberplan}</div>
                                    <div className='cancel-icon'><i onClick={this.handleClick.bind(this, index)} class="material-icons" style={{ fontSize: '15px', display: 'inline' }}>{p.cancel}</i></div>
                                    <div className='members-included'>{p.memberincluded}</div>
                                </div>
                                }
                            />
                        )}
                        {this.state.group.inLaws.map((p, index) =>
                            <Tab key={p.id}
                                disableRipple
                                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                                label={<div>
                                    <div className='plan-for'>{p.planfor}</div>
                                    <div className='members-plan'>{p.mamberplan}</div>
                                    <div className='cancel-icon'><i onClick={this.handleClick.bind(this, index)} class="material-icons" style={{ fontSize: '15px', display: 'inline' }}>{p.cancel}</i></div>
                                    <div className='members-included'>{p.memberincluded}</div>
                                </div>
                                }
                            />
                        )}
                    </Tabs>}
                <Dialog open={this.state.open} maxWidth='xs'
                    onClose={this.handleClose}
                    aria-labelledby="simple-dialog-title">
                    <Row className='dialog-row'>
                        <Col md={12}><div className='dialog-title'>Warning</div></Col>
                        {this.state.tabData.length > 0 ?
                            <Col md={12}><div className='warning-text'>
                                Are you sure you want to delete “
                                {this.state.tabData[this.state.del_value].planfor}&nbsp;&nbsp;
                                {this.state.tabData[this.state.del_value].mamberplan}”
                                Group.
                                 </div>
                                 {/* <div>{this.state.del_value}</div> */}
                            </Col>:null}
                        <Col md={6}><ButtonLightSuccess warningContent={true} Text='Cancel' onClick={this.handleClose} /></Col>
                        <Col md={6}><ButtonLightSuccess warning={true} Text='Delete Group' onClick={this.handleGroupDeletion.bind(this, this.state.del_value)} /></Col>
                    </Row>
                </Dialog>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={this.state.snack}
                    onClose={this.handleCloseSnack}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Group deleted</span>}
                />
            </div>
        )
    }
}

GroupHealthTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    healthTab: state.GroupHealthTabs.value,
    inputFormDataHealth: state.inputFormHealth.inputFormHealthData
})
const mapDispatchToProps = dispatch => ({
    onHealthTabClick: (tab) => dispatch({ type: 'GROUP_HEALTH_TABS', tab }),
});


export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles)(GroupHealthTabs)))
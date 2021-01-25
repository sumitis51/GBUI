import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/icons/Menu'
import { connect } from 'react-redux'

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: 'white',
        color: '#333'
    },
});


class dashboardHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            helpType: 'Servicing',
            policy: 'CAR - 8UW34567823566',
            serviceType: 'Policy Servicing',
            claim_request: 'Intimitation',
            drawer: false,
        };
    }

    toggleDrawer = () => {
        this.props.onToggleDrawer(!this.props.burgermenu);
    };

    render() {
        const { classes } = this.props;
        return (
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Menu
                        style={{ marginRight: '1rem' }}
                        onClick={this.toggleDrawer}
                        className="mui--hidden-md mui--hidden-lg mui--hidden-xl" />
                    <Link to="/">
                        <img
                            src="/assets/logo.svg"
                            width={window.innerWidth < 768 ? "23.5" : "42"}
                            height="32.2"
                        />
                        <img
                            src="/assets/logotext.svg"
                            style={{
                                width: window.innerWidth < 768 ? '67.1px' : '120px',
                                height: 'auto',
                                marginLeft: '18px'
                            }}
                        />
                    </Link>
                </Toolbar>
            </AppBar>
        )
    }
}

dashboardHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
    return {
      burgermenu: state.sidebar.burger_menu
    }
  };
  
  const mapDispatchToProps = dispatch => ({
    onToggleDrawer: (value) =>
      dispatch({ type: 'SIDEBAR', value })
  });
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(dashboardHeader));
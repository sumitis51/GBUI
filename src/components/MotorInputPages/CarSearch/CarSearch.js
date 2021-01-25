import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        backgroundColor: theme.palette.background.paper,
        marginTop: '-48px'
    }
});

class CarSearch extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div style={{width: '100%', margin: '0px -5px'}}>
                    <FormControl style={{width: '340px'}}>
                        <InputLabel htmlFor="component-simple">Search your car?</InputLabel>
                        <Input
                            endAdornment={
                                <InputAdornment position="end">
                                    <img src="/assets/cancel.svg" onClick={this.props.clicked} className='search' alt='cancel' />
                                </InputAdornment>
                            }
                            id="component-simple" value={'Search'} />
                    </FormControl>
                </div>
                <List component="nav" style={{width: '100%'}}>
                    <ListItem button onClick={this.props.clicked}>
                        <ListItemText primary="Car 1" />
                    </ListItem>
                    <Divider />
                    <ListItem button divider>
                        <ListItemText primary="Car 1" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Car 1" />
                    </ListItem>
                    <Divider light />
                    <ListItem button>
                        <ListItemText primary="Car 1" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Car 1" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Car 1" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Car 1" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Car 1" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Car 1" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Car 1" />
                    </ListItem>
                    <Divider />
                </List>
            </div>
        )
    }
}

CarSearch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CarSearch);
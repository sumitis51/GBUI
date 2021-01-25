import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';




const styles = {
    root: {}
};

// function getSteps() {
//     return ['Company Name'];
// }

class CommercialDetails extends React.Component {

    state = {
        open: true,
    };
    
    render() {
        // const { classes} = this.props;
        return(
            <div className="parent-div-commercial-details">
                <Dialog
                    open={this.state.open}
                    maxWidth="lg"
                    onClose={() => {this.setState({open: false})}}> 
                    Hello world!!!
                </Dialog>
            </div>
        )
    }
}


CommercialDetails.propTypes = {
    classes: PropTypes.object.isRequired
  };
export default withStyles(styles)(CommercialDetails);
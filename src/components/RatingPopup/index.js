import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import PropTypes from 'prop-types'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import DialogContent from '@material-ui/core/DialogContent'
import { connect } from 'react-redux'
import Divider from '@material-ui/core/Divider';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import './index.css'
import { right } from 'glamor';

class Rating extends Component {
    state={
        icon:[<i class="material-icons" style={{ color: '#808080',cursor:'pointer'}}>
        star_border
    </i>,<i class="material-icons" style={{ color: '#808080',cursor:'pointer'}}>
        star_border
    </i>,<i class="material-icons" style={{ color: '#808080',cursor:'pointer'}}>
        star_border
    </i>,<i class="material-icons" style={{ color: '#808080',cursor:'pointer'}}>
        star_border
    </i>,<i class="material-icons" style={{ color: '#808080',cursor:'pointer'}}>
        star_border
    </i>],
    fill:'',
    unfill:''
    }
     handleClose=()=>{
         this.props.onClose()
     }
    
    render() {
        const { fullScreen } = this.props;
  
        return (
            <div className='rating'>
                <Dialog
                    fullScreen={fullScreen}
                    open={true}
                    maxWidth="md"
                //    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>
                        <div className="rating-content" >
                            <Row style={{display:'flex'}}>
                             <Col xs={2} className='mui--visible-xs-block'>
                                <div className='arrow-back'>
                                    <i class="material-icons">
                                    keyboard_backspace
                                    </i>
                                </div>
                             </Col>
                             <Col xs={10} md={11}>
                                <h3 className="rating-heading gbui-h5">
                                    Rate your buying journey
                                </h3>
                             </Col>
                             <Col xs={1} className='mui--hidden-xs'>
                                <div className='close' style={{float:'right'}}>
                                    <i  onClick={this.handleClose} class="material-icons">
                                       close
                                    </i>
                                </div>
                             </Col>
                            </Row>
                            <div className='rating-gb-process gbui-button-1'>Ratings for GROUPBIMA process?</div>
                            {this.state.icon.map((item,index)=>(<ul style={{ color: '#808080',display:'contents' }}>
                                <li onClick={(event)=>this.handleSelectRating(event,index)}>{item}</li></ul>))}
                            <div className='add-reviews gbui-button-1'>+Add Review</div>
                            <div className='divider'>
                                <Divider />
                            </div>
                            <div className='rating-gb-process gbui-button-1'>Ratings for “ INSURER COMPANY NAME”?</div>
                           {this.state.icon.map((item,index)=>(<ul style={{ color: '#808080',display:'contents' }}><li >{item}</li></ul>))}
                            <div className='add-reviews gbui-button-1'>+Add Review</div>
                            <div className='divider'>
                                <Divider />
                            </div>
                            <div className='rating-gb-process gbui-button-1'>Ratings for “ PRODUCT ”?</div>
                            {this.state.icon.map((item,index)=>(<ul style={{ color: '#808080',display:'contents' }}><li >{item}</li></ul>))}
                            
                            <div className='add-reviews gbui-button-1'>+Add Review</div>
                        </div>
                        <div className='submit-btn'>
                          <ButtonLightSuccess Text='Submit' midWarningPink={true} onClick={this.handleSubmit}/>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

Rating.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
    rating: state.popup.rating_popup,
})

export default withMobileDialog({ breakpoint: 'xs' })(connect(mapStateToProps)(Rating))
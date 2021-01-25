import React from 'react'
import './header_alternate.css'

class HeaderAlternate extends React.Component {

    render() {
        return(
            <div className="alternate_header_parent">
                <div class="mui-panel mui--z3" style={{background: '#9c0f46', marginBottom: '0px'}}>
                    <ul>
                        <li>Car</li>
                        <li>Bike</li>
                        <li>Health</li>
                        {/* <li>{this.props.header ? this.props.header.HeaderTermLifeLink : ''}</li>
                        <li>{this.props.header ? this.props.header.HeaderPALink : ''}</li> */}
                    </ul>
                </div>
            </div>
        )
    }
}


export default HeaderAlternate
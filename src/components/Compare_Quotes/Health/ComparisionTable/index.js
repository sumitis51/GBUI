import React from 'react'
import Panel from 'muicss/lib/react/panel'

import './comparision.css'
class ComparisionTable extends React.Component {

componentWillMount(){
    // planName
   
}
    render() {
        return (
            <div className="compare-table-parent">
                <Panel>
                    <div className="header-key-parameters">
                        <p>Key Parameters</p>

                    </div>

                    {/* TAble for Key Parameters */}
                    <table>
                        <tbody>
                            {this.props.comparision_data.key_parameters ? this.props.comparision_data.key_parameters.map((item, index) =>
                                index + 1 === this.props.comparision_data.key_parameters.length ?
                                item.insurer_data !== null ?  item.insurer_data.length > 0 && <tr>
                                        <td className="key_name mui--hidden-xs mui--hidden-sm">{item.key_name}</td>
                                        {item.insurer_data.map((data, index) =>
                                            <td style={{color: window.innerWidth < 767?'#0da176': ''}}>
                                                {index === 0? <p className="mui--hidden-md mui--hidden-lg mui--hidden-xl"><span>{item.key_name}</span></p>: ''}
                                                {/* {item.symbol === "rupee" ? '₹' : ''} */}
                                                {
                                                    data === true ?
                                                        <img src="/assets/checked-symbol-grn.svg" width="14" height="14" alt="checked" /> :
                                                        data === false ? <img src="/assets/cross.svg" width="14" height="14" alt="canceled" /> : data === null ? 
                                                        <img src="/assets/cross.svg" width="14" height="14" alt="canceled" />: data
                                                }</td>
                                        )}
                                    </tr> : '' :
                                    item.insurer_data !==null ? item.insurer_data.length > 0 &&<tr>
                                        <td className="key_name mui--hidden-xs mui--hidden-sm">{item.key_name}</td>
                                        {item.insurer_data.map((data, index) =>
                                            <td>{index === 0? <p className="mui--hidden-md mui--hidden-lg mui--hidden-xl"><span>{item.key_name}</span></p>: ''}{data}</td>
                                        )}
                                    </tr> : ''
                            ) : ''}
                        </tbody>
                    </table>
                </Panel>

                {/* Coverage Details */}
                <Panel>
                    <div className="header-key-parameters">
                        <p>Coverage Details </p>

                    </div>
                    {/* TAble for Covergae Details*/}
                    <table>
                        <tbody>
                            {this.props.comparision_data.coverage_details? this.props.comparision_data.coverage_details.map((item) =>
                                item.key_name !== 'Co-Pay' && item.insurer_data !==null ?  item.insurer_data.length > 0 &&<tr>
                                    <td className="key_name mui--hidden-xs mui--hidden-sm">
                                        {item.key_name}
                                        <p style={{fontSize: '10px', margin: '0px'}}>{item.sub_key? item.sub_key: ''}</p>
                                    </td>
                                    {item.insurer_data.map((data, index) =>
                                        <td>
                                            {index === 0? <p className="mui--hidden-md mui--hidden-lg mui--hidden-xl"><span>{item.key_name}</span></p>: ''}
                                        {/* {item.symbol === "rupee" ? '₹' : ''} */}
                                        {
                                            data === true ?
                                                <img src="/assets/checked-symbol-grn.svg" width="14" height="14" alt="checked" /> :
                                                data === false ? <img src="/assets/cross.svg" width="14" height="14" alt="canceled" /> : data === null ? 
                                                <img src="/assets/cross.svg" width="14" height="14" alt="canceled" />: data === null ? 
                                                <img src="/assets/cross.svg" width="14" height="14" alt="canceled" />: data
                                        }
                                        {(item.key_name === 'Pre-Hospitalisation Cover' ||item.key_name === 'Post-Hospitalisation Cover') && <span> days</span>}
                                        </td>
                                    )}
                                </tr> : ''

                            ): ''}
                        </tbody>
                    </table>
                </Panel>

                {/* Other Details */}
                <Panel>
                    <div className="header-key-parameters">
                        <p>Other Benefits </p>
                    </div>
                    {/* TAble for Covergae Details*/}
                    <table>
                        <tbody>
                            {this.props.comparision_data.other_benifits? this.props.comparision_data.other_benifits.map((item) =>
                                item.insurer_data !==null ?  item.insurer_data.length > 0 &&<tr>
                                    <td className="key_name mui--hidden-xs mui--hidden-sm">
                                        {item.key_name}
                                        <p style={{fontSize: '10px', margin: '0px'}}>{item.sub_key? item.sub_key: ''}</p>
                                    </td>
                                    {item.insurer_data.map((data, index) =>
                                        <td>{index === 0? <p className="mui--hidden-md mui--hidden-lg mui--hidden-xl"><span>{item.key_name}</span></p>: ''}
                                        {/* {item.symbol === "arrow_up"?
                                        <img alt='compare-quotes' src="/assets/arrow-drop-up.svg" style={{marginBottom: '6px'}} />: ''} */}
                                        {
                                            data === true ?
                                                <img src="/assets/checked-symbol-grn.svg" width="14" height="14" alt="checked" /> :
                                                data === false ? <img src="/assets/cross.svg" width="14" height="14" alt="canceled" /> : (data === null || data === undefined) ?  <img src="/assets/cross.svg" width="14" height="14" alt="canceled" /> : data
                                        }</td>
                                    )}
                                </tr> : ''

                            ): ''}
                        </tbody>
                    </table>
                </Panel>

                {/* Servicing Parameters */}
                <Panel>
                    <div className="header-key-parameters">
                        <p>Servicing Parameters </p>

                    </div>
                    {/* TAble for Servicing Parameters*/}
                    <table>
                        <tbody>
                            {this.props.comparision_data.servicing_parameters? this.props.comparision_data.servicing_parameters.map((item) =>
                                item.insurer_data !==null ? item.insurer_data.length > 0 &&<tr>
                                    <td className="key_name mui--hidden-xs mui--hidden-sm">
                                        {item.key_name}
                                        <p style={{fontSize: '10px', margin: '0px'}}>{item.sub_key? item.sub_key: ''}</p>
                                    </td>
                                    {item.insurer_data.map((data, index) =>
                                        <td>{index === 0? <p className="mui--hidden-md mui--hidden-lg mui--hidden-xl"><span>{item.key_name}</span></p>: ''}
                                        {item.symbol === "rupee" ? '₹' : item.symbol === "arrow_up"?
                                        <img alt='compare-quotes' src="/assets/arrow-drop-up.svg" style={{marginBottom: '6px'}} />: ''}{
                                            data === true ?
                                                <img src="/assets/checked-symbol-grn.svg" width="14" height="14" alt="checked" /> :
                                                data === false ? <img src="/assets/cross.svg" width="14" height="14" alt="canceled" /> : data === null ? 
                                                <img src="/assets/cross.svg" width="14" height="14" alt="canceled" />: data
                                        }</td>
                                    )}
                                </tr> : ''

                            ):''}
                        </tbody>
                    </table>
                </Panel>
            </div>
        )
    }
}

export default ComparisionTable
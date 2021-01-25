import React from 'react';
import './Loader.css'

class NewLoader extends React.Component {
  render() {
    return(
      <div className="loaderContainer">
      <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <p className="loadingtext">Loading...</p>
      </div>
    )
  }
}
export default NewLoader;
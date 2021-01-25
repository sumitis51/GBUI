// import ReduxBurgerMenu from './BurgerMenu';
import MainView from './MainView';
import {Helmet} from "react-helmet";

import React from 'react';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';



const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});
const homepageStyle=
  {
    backgroundColor:'#F4F4F4',
   };

class Home extends React.Component {
  componentWillMount() {

    // const tab = this.props.token ? 'feed' : 'all';
    // const articlesPromise = this.props.token ?
    //   agent.Articles.feed :
    //   agent.Articles.all;
    // const articlesPromise = this.props.token ? 'feed' : 'all';

    // this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
  

  render() {
    return (
      <div className="home-page" style={homepageStyle} >
        <Helmet>
            <title>Online Health Insurance, Get Quote, Renew &amp; Buy Insurance Policy. Compare &amp; Get The Best Health Insurance.</title>
        </Helmet>

        {/* <Banner token={this.props.token} appName={this.props.appName} /> */}

        <div className="page">
        <MainView history={this.props.history}/> 
            {/* <ReduxBurgerMenu/> */}
            {/* <div className="col-md-3">
              <div className="sidebar">

                <p>Popular Tags</p>

                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag} />

              </div>
            </div> */}

          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

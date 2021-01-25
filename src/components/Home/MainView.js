import React from 'react';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';
import LiveSoon from './livesoon/LiveSoon'
import OurTeamTemp from './ourTeamTemp/OurTeamTemp'
import Carrers from './careers/Careers'
import GetHealthCover from './GetHealthCover/index'
import Blogs from './blogs/index'
import FooterTemp from './footer/FooterTemp';
import axios from 'axios';
import { MuiThemeProvider } from '@material-ui/core'



const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token,
  CurrentLanguage: state.language.current_language,
  FetchedLanguage: state.language.lang_data,
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload }),
  onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
  onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
  onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
});


class MainView extends React.Component {

  componentWillMount() {
    const vm = this;
    this.props.onCurrentComponent('mainview.json');
    axios.get('/assets/json/mainview.json')
      .then((response) => {
        vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
      }, (error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <MuiThemeProvider>
        <GetHealthCover history={this.props.history}/>
        {/* <div id='about'><LiveSoon liveSoon={this.props.FetchedLanguage} /></div>
        <div id='team'>
          <OurTeamTemp ourteam={this.props.FetchedLanguage} />
        </div>
        <div id='carrers'><Carrers /></div>  */}
        <div id='blog'><Blogs /></div>
        <FooterTemp footerTemp={this.props.FetchedLanguage} />
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

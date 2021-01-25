import React from 'react';
import { Link } from 'react-router-dom';
import './headerTemp.css'
import { connect } from 'react-redux';
import axios from 'axios';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  listStyle: {
    fontFamily: 'Nunito',
    fontSize: '14px',
    color: '#000000'
  }
};




class HeaderTemp extends React.Component {
  state = {
    labelWidth: 0,
    left: false,
    drawer: [
      { 'id': 0, 'linkText': 'About', 'link': 'about' },
      { 'id': 1, 'linkText': 'Team', 'link': 'team', },
      { 'id': 2, 'linkText': 'Careers', 'link': 'carrers', },
      // { 'id': 3, 'linkText': 'Blog', 'link': 'blog', },
    ],
    currentHash: 'about',
  };

  toggleDrawer = (side, open, hash) => () => {
    this.setState({
      [side]: open,
    });
    // const vm = this;
    // setTimeout(() => {
    //   console.log(hash)
    //   if (vm.state.currentHash) {
    //     window.scrollTo(0, document.getElementById(vm.state.currentHash).scrollIntoView())
    //   }
    // }, 500)
    setTimeout(() => {
      if (this.state.currentHash === 'carrers') {
        window.scrollTo({ left: 0, top: document.getElementById(this.state.currentHash).offsetTop - 50, behavior: 'smooth' })
      } else {
        window.scrollTo({ left: 0, top: document.getElementById(this.state.currentHash).offsetTop - 30, behavior: 'smooth' })
      }
    }, 500)
  };
  handleHash = (hash) => () => {
    this.setState({ currentHash: hash })
    console.log(hash)
    this.toggleDrawer('left', false, hash)
  }


  componentWillMount() {
    const vm = this;
    axios.get('/assets/json/HeaderTemp.json')
      .then((response) => {
        vm.props.onHeaderLanguage(response.data[this.props.CurrentLanguage]);
      }, (error) => {
        console.log(error);
      })
  }



  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.onCurrentLanguage(event.target.value);
    const vm = this;

    axios.get('/assets/json/Footer.json')
      .then((response) => {
        vm.props.onFooterLanguage(response.data[this.props.CurrentLanguage]);
      }, (error) => {
        console.log(error);
      })

    axios.get('/assets/json/HeaderTemp.json')
      .then((response) => {
        vm.props.onHeaderLanguage(response.data[this.props.CurrentLanguage]);
      }, (error) => {
        console.log(error);
      })

    axios.get(`/assets/json/${this.props.CurrentComponent}`)
      .then((response) => {
        vm.props.onFetchLanguage(response.data[event.target.value]);
      }, (error) => {
        console.log(error);
      })
  };

  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem>
            <img className='GBlogo1' src="/assets/logo.svg" alt="GB Logo" />
            <img className='GBlogo2' hspace='14px' src="/assets/logotext.svg" alt="GB Logo" />
          </ListItem>
          <Divider />

          {this.state.drawer.map((item) => (
            <div>
              <ListItem button key={item.id} onClick={this.handleHash(item.link)}>
                <Link to={`#${item.link}`}
                  onClick={() => {
                    window.scrollTo({ left: 0, top: document.getElementById(item.link).offsetTop - 30, behavior: 'smooth' })
                  }}>
                  <ListItemText disableTypography={true} className={classes.listStyle} primary={item.linkText} />
                </Link>
              </ListItem>
              <Divider />
            </div>

          ))}
        </List>
      </div>
    );
    return (
      <div className="headerStyle">
        <nav className="navbar navbar-light">
          <div className="header-container">

            {/* <FormControl>
                <Select
                  value={this.props.CurrentLanguage}
                  onChange={this.handleChange}
                >
                  <option value="en" >English</option>
                  <option value="mr" >Marathi</option>
                </Select>
              </FormControl> */}

            <materialIcons className="material-icons" onClick={this.toggleDrawer('left', true, this.state.currentHash)}>menu</materialIcons>
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false, this.state.currentHash)} >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false, this.state.currentHash)}
                onKeyDown={this.toggleDrawer('left', false, this.state.currentHash)}
              >
                {sideList}
              </div>
            </Drawer>
            <a href="/" className="navbar-left">
              <img className='GBlogo1' src="/assets/logo.svg" alt="GB Logo" />
              <img className='GBlogo2' hspace='14px' src="/assets/logotext.svg" alt="GB Logo" />
            </a>
            <div className="navbar pull-xs-right">
              <div className="nav-item">
                <Link to="#" className="nav-link" onClick={() => { window.scrollTo({ left: 0, top: document.getElementById("about").offsetTop - 30, behavior: 'smooth' }) }} >
                  {this.props.header_language ? this.props.header_language.HeaderTempFirstTabAboutText : ''}
                </Link>
                <Link to="#team" onClick={() => { window.scrollTo({ left: 0, top: document.getElementById('team').offsetTop - 30, behavior: 'smooth' }) }} className="nav-link">
                  {this.props.header_language ? this.props.header_language.HeaderTempSecondTabTeamText : ''}
                </Link>
                <Link to="#carrers" onClick={() => { window.scrollTo({ left: 0, top: document.getElementById('carrers').offsetTop - 30, behavior: 'smooth' }) }} className="nav-link">
                  {this.props.header_language ? this.props.header_language.HeaderTempThirdTabCareersText : ''}
                </Link>
                {/* <Link to="#blog" onClick={() => { window.scrollTo({ left: 0, top: document.getElementById('blog').offsetTop - 30, behavior: 'smooth' }) }} className="nav-link">
                  Blog
                </Link> */}
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    CurrentLanguage: state.language.current_language,
    CurrentComponent: state.language.current_component,
    FetchedLanguage: state.language.lang_data,
    header_language: state.language.header_lang_data,
    footer_language: state.language.footer_lang_data,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    onCurrentLanguage: (currentlanguage) => dispatch({ type: 'CurrentLanguage', currentlanguage }),
    onCurrentComponent: () => dispatch({ type: 'CurrentComponent' }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onHeaderLanguage: (headerlanguage) => dispatch({ type: 'HEADER_LANGUAGE', headerlanguage }),
    onFooterLanguage: (footerlanguage) => dispatch({ type: 'FOOTER_LANGUAGE', footerlanguage }),
  };
};

HeaderTemp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HeaderTemp))




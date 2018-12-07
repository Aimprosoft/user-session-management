import React, {Component} from 'react';

import Header from 'src/browser/components/Header/Header';
import Footer from 'src/browser/components/Footer/Footer';
import Sidebar from 'src/browser/components/SideBar/SideBar';
import SiteRouter from 'src/browser/container/SiteRouter';
import 'src/browser/IconImport';
import store, {user} from 'src/browser/stores/LocalStorage';
import {getUser, logoutUser} from 'src/browser/actions/Authentication';
import {connect} from 'react-redux';
import '@babel/polyfill';
import {isSigned} from 'src/browser/utils/AuthenticationUtil';
import {withRouter} from 'react-router';

class App extends Component {
  constructor(params) {
    super(params);
    this.state = {
      user: user,
      isToggle: true,
    };
    this.updateState = this.updateState.bind(this);
    this.onSideBarToggle = this.onSideBarToggle.bind(this);
  }

  async componentDidMount() {
    const {getUser} = this.props;
    getUser();
    this.updateState();
  }

  onSideBarToggle() {
    const {isToggle} = this.state;
    this.setState({isToggle: !isToggle});
  }

  updateState() {
    this.setState({user: store.getState().user});
  }

  componentDidCatch() {
    //logoutUser();
  }

  render() {
    const {user, isToggle} = this.state;

    const bodyClassName = isToggle ? 'nav-md' : 'nav-sm';
    try {
      return (
        <div className={bodyClassName}>
          {isSigned() ? (
            <div className="container body">
              <div className="main_container">
                <Header onToggle={this.onSideBarToggle} user={user} />
                <Sidebar isToggle={isToggle} />
                <div className="right_col" role="main">
                  <SiteRouter />
                </div>
                <Footer />
              </div>
            </div>
          ) : (
            <SiteRouter />
          )}
        </div>
      );
    } catch (e) {
      return <SiteRouter />;
    }
  }
}
const mapStateToProps = ({user}) => ({user});

export default withRouter(
  connect(
    mapStateToProps,
    {getUser, logoutUser},
  )(App),
);

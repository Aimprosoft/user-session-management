/* eslint-disable react/prop-types,no-console,react/no-children-prop */
import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link, Route} from 'react-router-dom';
import SideBarFooter from 'src/browser/components/SideBar/SideBarFooter';
import SideBarTitle from 'src/browser/components/SideBar/SideBarTitle';
import ProfilePicture from 'src/browser/components/ProfilePicture/ProfilePicture';
import store from 'src/browser/stores/LocalStorage';
import {Clearfix, Col, Collapse} from 'react-bootstrap';
import style from './SideBar.scss';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: {
        'mnu-users': false,
      },
    };
    this.handleToggleMenuItem = this.handleToggleMenuItem.bind(this);
  }

  handleToggleMenuItem(id) {
    const {toggle} = this.state;
    this.setState({toggle: {[id]: !(toggle[id] || false)}});
  }

  render() {
    const {user} = store.getState();
    const {toggle} = this.state;
    return (
      <Col md={3} className="left_col">
        <div className="left_col scroll-view">
          <SideBarTitle>
            <ProfilePicture avatar={user.avatarUrl} size="md" />
            <div className="profile_info hidden-small">
              <span>Welcome,</span>
              <h2>{user.fullName}</h2>
            </div>
          </SideBarTitle>

          <Clearfix />
          <div
            id="sidebar-menu"
            className="main_menu_side hidden-print main_menu">
            <div className="menu_section">
              <h3>General</h3>
              <ul className="nav side-menu">
                <Route
                  path="/"
                  children={({match}) => (
                    <li className={match && match.isExact ? 'active' : ''}>
                      <Link to="/">
                        <FontAwesomeIcon icon="home" />
                        Home
                      </Link>
                    </li>
                  )}
                />

                <Route
                  path="/users"
                  children={({match}) => (
                    <li className={match ? 'active' : ''}>
                      <button
                        className={style.dropDownButton}
                        type="submit"
                        name="mnu-users"
                        onClick={this.handleToggleMenuItem.bind(
                          this,
                          'mnu-users',
                        )}>
                        <FontAwesomeIcon icon="users" />
                        Users
                      </button>
                      <Collapse in={toggle['mnu-users'] || match != undefined}>
                        <ul
                          className={
                            'nav child_menu ' +
                            (toggle['mnu-users'] ? style.toggled : '')
                          }
                          aria-labelledby="dropdownMenuButton">
                          <Route
                            path="/users/all"
                            children={({match}) => (
                              <li
                                className={
                                  match && match.isExact ? 'active' : ''
                                }>
                                <Link to="/users/all">All</Link>
                              </li>
                            )}
                          />
                          <Route
                            path="/users/active"
                            children={({match}) => (
                              <li
                                className={
                                  match && match.isExact ? 'active' : ''
                                }>
                                <Link to="/users/active">Active</Link>
                              </li>
                            )}
                          />
                        </ul>
                      </Collapse>
                    </li>
                  )}
                />
              </ul>
            </div>
          </div>
        </div>
        <SideBarFooter hiddenSmall />
      </Col>
    );
  }
}

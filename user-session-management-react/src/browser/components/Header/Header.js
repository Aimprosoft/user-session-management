import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import store from 'src/browser/stores/LocalStorage';
import {logoutUser} from 'src/browser/actions/Authentication';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class Header extends Component {
  constructor(props) {
    super(props);
    this.onToggle = e => {
      e.preventDefault();
      if (props.onToggle) props.onToggle();
    };
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    const {logoutUser} = this.props;
    e.preventDefault();
    logoutUser();
  }

  render() {
    const {user} = store.getState();
    return (
      <div className="top_nav">
        <div className="nav_menu">
          <nav>
            <div className="nav toggle">
              <button type="button" onClick={this.onToggle}>
                <FontAwesomeIcon icon="bars" />
              </button>
            </div>

            <ul className="nav navbar-nav navbar-right">
              <li className="">
                <button
                  type="submit"
                  className="user-profile dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded="false">
                  <img src={user.avatarUrl} alt="" />
                  {user.fullName}
                </button>
                <ul className="dropdown-menu dropdown-usermenu pull-right">
                  <li>
                    <Link to="/profile">
                      <FontAwesomeIcon className="pull-right" icon="user-alt" />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings">
                      <FontAwesomeIcon className="pull-right" icon="user-cog" />
                      <span>Settings</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/help">
                      <FontAwesomeIcon
                        className="pull-right"
                        icon="info-circle"
                      />
                      <span>Help</span>
                    </Link>
                  </li>
                  <li>
                    <button type="button" onClick={this.logout}>
                      <FontAwesomeIcon
                        className="pull-right"
                        icon="sign-out-alt"
                      />
                      <span>Log Out</span>
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({user});

export default withRouter(
  connect(
    mapStateToProps,
    {logoutUser},
  )(Header),
);

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SideBarTitle extends Component {
  render() {
    const {children} = this.props;
    return <div className="navbar nav_title">{children}</div>;
  }
}
SideBarTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

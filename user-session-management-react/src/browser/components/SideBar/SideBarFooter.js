import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SideBarFooter extends Component {
  render() {
    const {children, hiddenSmall} = this.props;
    return (
      <div className={'sidebar-footer ' + (hiddenSmall ? 'hidden-small' : '')}>
        {children}
      </div>
    );
  }
}
SideBarFooter.propTypes = {
  hiddenSmall: PropTypes.bool,
  children: PropTypes.node,
};
SideBarFooter.defaultProps = {
  hiddenSmall: false,
  children: null,
};

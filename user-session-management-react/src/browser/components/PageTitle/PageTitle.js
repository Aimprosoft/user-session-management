import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class PageTitle extends Component {
  render() {
    const {title, children} = this.props;
    return (
      <div className="page-title">
        <div className="title_left">
          <h3>{title}</h3>
        </div>
        {children}
      </div>
    );
  }
}
PageTitle.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};
PageTitle.defaultProps = {
  children: null,
};

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class GlyphIcon extends Component {
  render() {
    const {icon, title} = this.props;
    const buttonIcon = icon ? 'glyphicon-' + icon : '';
    return (
      <span data-toggle="tooltip" data-placement="top" title={title}>
        <span className={'glyphicon ' + buttonIcon} aria-hidden="true" />
      </span>
    );
  }
}
GlyphIcon.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ProfilePicture extends Component {
  render() {
    const {avatar, size} = this.props;
    return (
      <div className="profile_pic">
        <img
          src={avatar}
          alt="..."
          className={'img-circle profile_img profile_' + size}
        />
      </div>
    );
  }
}
ProfilePicture.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  avatar: PropTypes.string,
};
ProfilePicture.defaultProps = {
  avatar: '/assets/images/avatar-placeholder.png',
  size: 'md',
};

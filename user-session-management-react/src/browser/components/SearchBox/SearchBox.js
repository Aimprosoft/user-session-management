import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SearchBox extends Component {
  render() {
    const {position} = this.props;
    return (
      <div>
        {position === 'left' && <div className="clearfix" />}
        <div className={'title_' + position}>
          <div
            className={
              'col-md-5 col-sm-5 col-xs-12 form-group top_search pull-' +
              position
            }>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for..."
              />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  Go!
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SearchBox.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
};
SearchBox.defaultProps = {
  position: 'right',
};

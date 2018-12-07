import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {Component} from 'react';
import {Clearfix, Collapse} from 'react-bootstrap';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';

export default class EChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
    };
  }

  render() {
    const {title, data} = this.props;
    const {toggle} = this.state;
    return (
      <div>
        <div className="x_title">
          <h2>{title}</h2>
          <ul className="nav navbar-right panel_toolbox">
            <li>
              <button
                type="submit"
                onClick={() =>
                  this.setState(prevState => ({toggle: !prevState.toggle}))
                }
                className="collapse-link">
                <FontAwesomeIcon icon={'chevron-' + (toggle ? 'down' : 'up')} />
              </button>
            </li>
            <li>
              <button type="button" className="close-link">
                <FontAwesomeIcon icon="times" />
              </button>
            </li>
          </ul>
          <Clearfix />
        </div>
        <Collapse in={toggle}>
          <div>
            <ReactEcharts
              showLoading={Object.keys(data).length === 0}
              lazyUpdate
              option={data}
            />
          </div>
        </Collapse>
      </div>
    );
  }
}

EChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

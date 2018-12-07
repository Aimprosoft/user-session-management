import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Clearfix, Col, Row} from 'react-bootstrap';

export default class Card extends Component {
  render() {
    const {columnCount, children} = this.props;
    const colStyle = 'row row-' + columnCount;
    return (
      <div className={colStyle}>
        <Col md={12}>
          <div className="x_panel">
            <div className="x_content">
              <Row>
                <Clearfix />
                {children}
              </Row>
            </div>
          </div>
        </Col>
      </div>
    );
  }
}
Card.propTypes = {
  columnCount: PropTypes.number,
};
Card.defaultProps = {
  columnCount: 1,
};

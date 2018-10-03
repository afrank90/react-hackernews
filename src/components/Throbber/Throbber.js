import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Throbber = ({ className }) => (
  <div className="c-throbber">
    <div className={className} />
  </div>
);

Throbber.defaultProps = {
  className: ''
};

Throbber.propTypes = {
  className: PropTypes.string
};

export default Throbber;

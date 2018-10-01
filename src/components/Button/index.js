import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, className }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

/**
 * By using defaultProps we can define all default values for expected props above.
 */
Button.defaultProps = {
  className: ''
};

/**
 * Defining properties types.
 * Some kind of equivalent to TypeScript for component properties.
 */
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Button;

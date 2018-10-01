import React from 'react';
import PropTypes from 'prop-types';

/**
 * Stateless component with no use of lifecycle functions.
 *
 * @param {Object} props Reactjs object of props.
 */
const Search = ({ value, onChange, onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={onChange} />
    <button type="submit">{children}</button>
  </form>
);

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.string,
  value: PropTypes.string
};

export default Search;

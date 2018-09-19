import React from 'react';

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

export default Search;

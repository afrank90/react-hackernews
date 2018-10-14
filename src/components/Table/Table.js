import React from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';

/**
 * Table to render list of items.
 */
const Table = ({ list, onDismiss }) => (
  <div className="c-table">
    {list.map(item => (
      <div key={item.objectID} className="c-table__row">
        <span>
          <a href={item.url} className="c-column--large">
            {item.title}{' '}
          </a>
          <span className="c-column--medium">{item.author} </span>
          <span className="c-column--small">{item.comments} </span>
          <span className="c-column--small">{item.points}</span>
        </span>

        <span>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="c-button--inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);

/**
 * Defining properties types.
 * Some kind of equivalent to TypeScript for component properties.
 *
 * In this example we can specify also type for expected array values.
 */
Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
      objectID: PropTypes.string.isRequired
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Table;

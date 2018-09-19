import React from 'react';
import Button from '../Button';

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

export default Table;

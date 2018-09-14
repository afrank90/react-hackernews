import React, { Component } from 'react';
import './App.css';

// Configurations
const DEFAULT_SEARCH = 'redux';

const BASE_PATH = 'https://hn.algolia.com/api/v1';
const SEARCH_ENDPOINT = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_SEARCH
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  /**
   * @description Search list via API
   */
  onSearchSubmit(event) {
    const { searchTerm } = this.state;

    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  }

  /**
   * @param {Object} results
   */
  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey] ? results[searchKey] : [];

    const updatedHits = [...oldHits, ...hits];

    // User spread operator?
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  onDismiss(objectID) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const updatedList = hits.filter(item => item.objectID !== objectID);

    this.setState({
      // Object assign is ES6 construction used to merge objects and  keep immutability.
      // ES6 also has array spread operator.
      // results: Object.assign({}, this.state.results, { hits: updatedList })

      // Spread operator to merge objects - create new object, used for immutability.
      // This is construction from future ES...
      results: {
        ...results,
        [searchKey]: { hits: updatedList, page }
      }
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  /**
   * Lifecycle method which is called after render().
   * Useful for fetching data form API.
   */
  componentDidMount() {
    const { searchTerm } = this.state;

    this.setState({ searchKey: searchTerm });

    this.fetchSearchTopStories(searchTerm);
  }

  /**
   * @description Fetching list of result from API using search term.
   *
   * @param {string} searchTerm
   */
  fetchSearchTopStories(searchTerm, page = 0) {
    const url = `${BASE_PATH}${SEARCH_ENDPOINT}`;
    const urlQueryParams = `?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

    fetch(`${url}${urlQueryParams}`)
      .then(response => response.json())
      .then(results => this.setSearchTopStories(results))
      .catch(error => error);
  }

  render() {
    // Map values from state object to list of variables. Equal to PHP list() function.
    const { results, searchTerm, searchKey } = this.state;
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;

    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="c-page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>

        <Table list={list} onDismiss={this.onDismiss} />

        <div className="interactions">
          <Button
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </Button>
        </div>
      </div>
    );
  }
}

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

const Button = ({ onClick, children, className = '' }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

export default App;

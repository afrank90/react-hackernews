import React, { Component } from 'react';
import axios from 'axios';
import Button from '../Button';
import Search from '../Search';
import Table from '../Table';
import Throbber from '../Throbber';
import './index.css';

// Configurations
const DEFAULT_SEARCH = 'redux';

const BASE_PATH = 'https://hn.algolia.com/api/v1';
const SEARCH_ENDPOINT = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      results: null,
      error: null,
      isLoading: false,
      searchKey: '',
      searchTerm: DEFAULT_SEARCH
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }

  /**
   * @description Before we perform request to API to pull top stories,
   * we need to check if we already have them stored in cache/state
   */
  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  /**
   * @description Search list via API
   */
  onSearchSubmit(event) {
    const { searchTerm } = this.state;

    this.setState({
      searchKey: searchTerm,
      isLoading: true
    });

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

    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      },
      isLoading: false
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
    this._isMounted = true;

    const { searchTerm } = this.state;

    this.setState({
      searchKey: searchTerm,
      isLoading: false
    });

    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * @description Fetching list of result from API using search term.
   *
   * @param {string} searchTerm
   */
  fetchSearchTopStories(searchTerm, page = 0) {
    const url = `${BASE_PATH}${SEARCH_ENDPOINT}`;
    const urlQueryParams = `?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

    this.setState({ isLoading: true });

    axios(`${url}${urlQueryParams}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  }

  render() {
    // Map values from state object to list of variables. Equal to PHP list() function.
    const { results, searchTerm, searchKey, isLoading, error } = this.state;

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
        {error ? (
          <div className="interactions">
            <p>Can't fetch data!</p>
          </div>
        ) : (
          <Table list={list} onDismiss={this.onDismiss} />
        )}

        <div className="interactions">
          {isLoading ? (
            <Throbber className="c-throbber__small" />
          ) : (
            <Button
              onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
            >
              More
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default App;

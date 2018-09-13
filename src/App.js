import React, { Component } from 'react';
import './App.css';

// Configurations
const DEFAULT_SEARCH = 'redux';

const BASE_PATH = 'https://hn.algolia.com/api/v1';
const SEARCH_ENDPOINT = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

// Higher order function to identify search and return callback to filter.
// const isSearched = searchTerm =>
//   item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      apiResponse: null,
      searchTerm: DEFAULT_SEARCH,
    }

    // Previously that was required to make "this" be available inside of the method. 
    // It seems to be not an issue anymore (When you use method in the same component with arrow function you do not need to bind it).
    this.onDismiss = this.onDismiss.bind(this);

    // This is required if we are not using arrow function to handle events.
    this.onSearchChange = this.onSearchChange.bind(this);

    this.setSearchTopStories = this.setSearchTopStories.bind(this);

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  /**
   * @description Search list via API
   */
  onSearchSubmit(event) {
    const { searchTerm } = this.state;

    this.fetchSearchTopStories(searchTerm);

    event.preventDefault();
  }

  /**
   * @param {Object} apiResponse 
   */
  setSearchTopStories(apiResponse) {
    const { hits, page } = apiResponse;

    const oldHits = page !== 0
      ? this.state.apiResponse.hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    // User spread operator? 
    this.setState({ apiResponse: { hits:  updatedHits, page } });
  }

  onDismiss(objectID) {
    const updatedList = this.state.apiResponse.hits.filter(
      item => item.objectID !== objectID
    );

    this.setState({
      // Object assign is ES6 construction used to merge objects and  keep immutability.
      // ES6 also has array spread operator. 
      // apiResponse: Object.assign({}, this.state.apiResponse, { hits: updatedList })

      // Spread operator to merge objects - create new object, used for immutability. 
      // This is construction from future ES...
      apiResponse: { ...this.state.apiResponse, hits: updatedList }
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  /**
   * Lifecycle method which will be called once before render(). 
   * Similar to construct(...).
   */
  // componentWillMount() {
  //   console.log('Hello from will mount.');
  // }

  /**
   * Lifecycle method which is called after render(). 
   * Useful for fetching data form API.
   */
  componentDidMount() {
    const { searchTerm } = this.state;
    
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
      .then(apiResponse => this.setSearchTopStories(apiResponse))
      .catch(error => error);
  }

   /**
   * Lifecycle method which is called each time after render(). 
   * Useful for fetching data form API. 
   * And other manipulation with the app after render().
   */
  // componentDidUpdate(prevProps, prevSate) {
  //   console.log('Hello I am DID Update.');
  // }

  /**
   * Lifecycle method which will be called if props or state changes. 
   * Returns true/false which will either trigger render() or not.
   */
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('Hello I am Should update.');
  //   return true;
  // }

  /**
   * Lifecycle method which will be called before render(). 
   * It is last chance to make changes to state or props before we render.
   */
  // componentWillUpdate(nextProps, nextState) {
  //   console.log('Hello I am WILL update.');
  // }

  /**
   * Lifecycle method which is when component is destrcuted 
   */
  // componentWillUnmount() {
  //   console.log('Hello I am Will unmount.');
  // }

  // This will work. But I believe it's bad practise to use method as higher-order function.
  // isSearched(searchTerm) {
  //   return function (item) {
  //     return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  //   }
  // }

  render() {
    // Map values from state object to list of variables. Equal to PHP list() function.
    const { apiResponse, searchTerm } = this.state;
    const page = (apiResponse && apiResponse.page) || 0;

    return (
      <div className="c-page">
        <div className="interactions">
          <Search 
            value={searchTerm} 
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >Search</Search>
        </div>
        
        { apiResponse &&
          <Table 
            list={apiResponse.hits}
            onDismiss={this.onDismiss}
          />
        }

        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
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
const Search = ({ value, onChange, onSubmit, children }) => 
  <form onSubmit={onSubmit}>
    <input 
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
  </form>

/**
 * Table to render list of items.
 */
const Table = ({ list, onDismiss }) =>
  <div className="c-table">
    {list.map(item => 
      <div key={item.objectID} className="c-table__row">
        <span>
          <a href={item.url} className="c-column--large">{item.title} </a> 
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
    )}
  </div>

const Button = ({onClick, children, className = ''}) => 
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

export default App;

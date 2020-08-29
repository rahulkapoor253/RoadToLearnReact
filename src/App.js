import React from "react";
import "./App.css";
import Search from "./Components/Search";
import Table from "./Components/Table";
import Button from "./Components/Button";
import axios from "axios";
//instead of using typescript we can use react proptypes
import PropTypes from "prop-types";
import Loading from "./Components/Loading";
import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PARAM_HPP,
  PARAM_PAGE,
  PARAM_SEARCH,
  PATH_BASE,
  PATH_SEARCH,
} from "./Constants";

class App extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    //also store the state of SORT
    this.state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
    };

    //auto bound using ES6 arrow functions
    //this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({
      searchKey: searchTerm,
    });

    this.fetchStoriesBySearch(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  fetchStoriesBySearch = (searchTerm, page = 0) => {
    this.setState({
      isLoading: true,
    });

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;

    //look for mounting to avoid data leaks
    axios(proxyurl + url)
      .then((response) => {
        if (this._isMounted) {
          this.setTopStoriesResponse(response.data);
          this.setState({
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        if (this._isMounted) {
          this.setState({ error });
          this.setState({
            isLoading: false,
          });
        }
      });
  };

  setTopStoriesResponse = (result) => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    //console.log(result);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      },
    });
  };

  onSearchSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    this.setState({
      searchKey: searchTerm,
    });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchStoriesBySearch();
    }
  };

  onDismiss = (id) => {
    const { results, searchKey } = this.state;
    const { hits, page } = results[searchKey];

    const updatedList = hits.filter((item) => item.objectID !== id);
    this.setState({
      results: { ...results, [searchKey]: { hits: updatedList, page } },
    });
  };

  handleInput = (event) => {
    //console.log(event.target.value);
    this.setState({
      searchTerm: event.target.value,
    });
  };

  render() {
    const { results, searchTerm, searchKey, error } = this.state;
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="App">
        <div className="App-header">
          <Search
            value={searchTerm}
            onChange={this.handleInput}
            onSubmit={this.onSearchSubmit}
            children="Search"
          />
          {error ? (
            <div>
              <p>Something went wrong. Please try again.</p>
            </div>
          ) : (
            <React.Fragment>
              {this.state.isLoading ? (
                <div className="loading-container">
                  <Loading />
                  <div>
                    <p>Loading...</p>
                  </div>
                </div>
              ) : (
                <div className="content-container">
                  <Table list={list} onDismiss={this.onDismiss} />
                  <Button
                    children="More"
                    onClick={() =>
                      this.fetchStoriesBySearch(searchKey, page + 1)
                    }
                  />
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
  onDismiss: PropTypes.func,
};

export default App;

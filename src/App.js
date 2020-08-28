import React from "react";
import "./App.css";
import Search from "./Components/Search";
import Table from "./Components/Table";
import Button from "./Components/Button";
import axios from "axios";
//instead of using typescript we can use react proptypes
import PropTypes from "prop-types";

import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PARAM_HPP,
  PARAM_PAGE,
  PARAM_SEARCH,
  PATH_BASE,
  PATH_SEARCH,
} from "./Constants";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Table.propTypes = {
  list: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

class App extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      error: null,
    };

    //auto bound using ES6 arrow functions
    //this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchStoriesBySearch();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchStoriesBySearch = (page = 0) => {
    const { searchTerm } = this.state;
    this.setState({
      searchKey: searchTerm,
    });

    if (this.state.results == null || this.state.results[searchTerm] == null) {
      const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;

      //look for mounting to avoid data leaks
      axios(url)
        .then((response) => {
          if (this._isMounted) {
            this.setTopStoriesResponse(response.data);
          }
        })
        .catch((error) => {
          if (this._isMounted) {
            this.setState({ error });
          }
        });
    }
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
    this.fetchStoriesBySearch();
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
              <Table list={list} onDismiss={this.onDismiss} />
              <Button
                children="More"
                onClick={() => this.fetchStoriesBySearch(page + 1)}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default App;

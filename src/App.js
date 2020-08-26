import React from "react";
import "./App.css";
import Search from "./Components/Search";
import Table from "./Components/Table";
import Button from "./Components/Button";

const DEFAULT_QUERY = "facebook";
const PATH_BASE = "http://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";
const DEFAULT_HPP = 50;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    //auto bound using ES6 arrow functions
    //this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    this.fetchStoriesBySearch();
  }

  fetchStoriesBySearch = (page = 0) => {
    const { searchTerm } = this.state;
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => this.setTopStoriesResponse(result))
      .catch((error) => error);
  };

  setTopStoriesResponse = (result) => {
    const { hits, page } = result;
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [...oldHits, ...hits];
    //console.log(result);
    this.setState({
      result: { hits: updatedHits, page },
    });
  };

  onSearchSubmit = (event) => {
    event.preventDefault();
    this.fetchStoriesBySearch();
  };

  onDismiss = (id) => {
    const updatedList = this.state.result.hits.filter(
      (item) => item.objectID !== id
    );
    this.setState({
      result: { ...this.state.result, hits: updatedList },
    });
  };

  handleInput = (event) => {
    //console.log(event.target.value);
    this.setState({
      searchTerm: event.target.value,
    });
  };

  render() {
    const { result, searchTerm } = this.state;
    const page = (result && result.page) || 0;
    return (
      <div className="App">
        <div className="App-header">
          <Search
            value={searchTerm}
            onChange={this.handleInput}
            onSubmit={this.onSearchSubmit}
            children="Search"
          />
          {result && <Table list={result.hits} onDismiss={this.onDismiss} />}
          <Button
            children="More"
            onClick={() => this.fetchStoriesBySearch(page + 1)}
          />
        </div>
      </div>
    );
  }
}

export default App;

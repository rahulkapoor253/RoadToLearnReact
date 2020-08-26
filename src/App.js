import React from "react";
import "./App.css";
import Search from "./Components/Search";
import Table from "./Components/Table";

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: "",
    };

    //auto bound using ES6 arrow functions
    //this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss = (id) => {
    const updatedList = this.state.list.filter((item) => item.objectID !== id);
    this.setState({
      list: updatedList,
    });
  };

  handleInput = (event) => {
    //console.log(event.target.value);
    this.setState({
      searchTerm: event.target.value,
    });
  };

  render() {
    const { list, searchTerm } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <Search
            value={searchTerm}
            onChange={this.handleInput}
            children="Search"
          />
          <Table
            searchTerm={searchTerm}
            list={list}
            onDismiss={this.onDismiss}
          />
        </div>
      </div>
    );
  }
}

export default App;

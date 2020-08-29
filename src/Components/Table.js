import React from "react";
import Button from "./Button";
import Sort from "./Sort";
import { sortBy } from "lodash";

const SORTS = {
  NONE: (list) => list,
  AUTHOR: (list) => sortBy(list, "author"),
  TITLE: (list) => sortBy(list, "title"),
};

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: "NONE",
    };
  }

  onSort = (sortKey) => {
    this.setState({
      sortKey,
    });
  };

  render() {
    const { list, onDismiss } = this.props;
    const { sortKey } = this.state;
    const sortedList = SORTS[sortKey](list);
    return (
      <div className="table">
        <div className="table-row">
          <span className="large-data">
            Title
            <Sort
              sortKey="TITLE"
              onSort={this.onSort}
              className="button-title"
            />
          </span>
          <span className="medium-data">
            Author
            <Sort sortKey="AUTHOR" onSort={this.onSort} />
          </span>
          <span className="small-data">Actions</span>
        </div>
        {sortedList.map((item) => (
          <div key={item.objectID} className="table-row">
            <span className="large-data">
              <a style={{ marginRight: "4px" }} href={item.url}>
                {item.title}
              </a>
            </span>
            <span className="medium-data">
              <span style={{ marginRight: "4px" }}>{item.author}</span>
            </span>
            <span className="small-data">
              <Button
                className="button-inline"
                onClick={() => onDismiss(item.objectID)}
                children="Dismiss"
              />
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default Table;

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
        {sortedList.map((item) => (
          <div key={item.objectID} className="table-row">
            <span style={{ width: "70%" }}>
              <a style={{ marginRight: "4px" }} href={item.url}>
                {item.title}
              </a>
              <Sort
                sortKey="TITLE"
                onSort={this.onSort}
                className="button-title"
              />
            </span>
            <span style={{ width: "20%" }}>
              <span style={{ marginRight: "4px" }}>{item.author}</span>
              <Sort sortKey="AUTHOR" onSort={this.onSort} />
            </span>
            <span style={{ width: "10%" }}>
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

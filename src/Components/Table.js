import React from "react";
import Button from "./Button";

const isSearched = (searchTerm) => (item) =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class Table extends React.Component {
  render() {
    const { list, searchTerm, onDismiss } = this.props;
    return (
      <div>
        {list.filter(isSearched(searchTerm)).map((item) => (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <Button
              onClick={() => onDismiss(item.objectID)}
              children="Dismiss"
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Table;

import React from "react";
import Button from "./Button";

const isSearched = (searchTerm) => (item) =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Table = ({ list, searchTerm, onDismiss }) => {
  return (
    <div className="table">
      {list.filter(isSearched(searchTerm)).map((item) => (
        <div key={item.objectID} className="table-row">
          <span style={{ width: "20%" }}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={{ width: "60%" }}>{item.author}</span>
          <span style={{ width: "20%" }}>
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
};

export default Table;

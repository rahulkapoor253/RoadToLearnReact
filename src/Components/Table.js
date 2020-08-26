import React from "react";
import Button from "./Button";

const Table = ({ list, onDismiss }) => {
  console.log(list);
  return (
    <div className="table">
      {list.map((item) => (
        <div key={item.objectID} className="table-row">
          <span style={{ width: "70%" }}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={{ width: "20%" }}>{item.author}</span>
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
};

export default Table;

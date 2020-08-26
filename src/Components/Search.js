import React from "react";

//no access to local component state or lifecycle methods, render is also implicit
const Search = ({ value, onChange, children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder={children}
        type="text"
        value={value}
        onChange={onChange}
        maxLength="15"
      />
      <button className="btn-search" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Search;

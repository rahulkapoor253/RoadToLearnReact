import React from "react";

//no access to local component state or lifecycle methods, render is also implicit
const Search = ({ value, onChange, children }) => {
  return (
    <form>
      <input
        placeholder={children}
        type="text"
        value={value}
        onChange={onChange}
        maxLength="15"
      />
    </form>
  );
};

export default Search;

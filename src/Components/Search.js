import React from "react";

//no access to local component state or lifecycle methods, render is also implicit
const Search = ({ value, onChange, children }) => {
  return (
    <form>
      <labe>{children}</labe>
      <input type="text" value={value} onChange={onChange} />
    </form>
  );
};

export default Search;

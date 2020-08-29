import React from "react";

//no access to local component state or lifecycle methods, render is also implicit
class Search extends React.Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { value, onChange, children, onSubmit } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input
          placeholder={children}
          type="text"
          value={value}
          onChange={onChange}
          maxLength="15"
          ref={(el) => (this.input = el)}
        />
        <button className="btn-search" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default Search;

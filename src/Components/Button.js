import React from "react";

class Button extends React.Component {
  render() {
    const { children, onClick, className = "" } = this.props;
    return (
      <button type="button" onClick={onClick} className={className}>
        {children}
      </button>
    );
  }
}

export default Button;

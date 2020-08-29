import React from "react";

const Button = ({ children, onClick, className }) => {
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: "",
};

export default Button;

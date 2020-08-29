import React from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons";

const Sort = ({ sortKey, onSort, className = "" }) => {
  return (
    <Button
      children={<FontAwesomeIcon icon={faSortAlphaDown} />}
      className={className}
      onClick={() => onSort(sortKey)}
    />
  );
};

export default Sort;

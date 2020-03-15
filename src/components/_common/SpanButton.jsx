import React from "react";
import ReactTooltip from "react-tooltip";

const SpanButton = ({ text, tooltip, faIcon, onClick, style }) => {
  return (
    <>
      <span className="span-button" onClick={onClick} data-tip={tooltip} style={style ? { ...style } : { ...{} }}>
        <ReactTooltip effect="solid" />
        {text}
        <i className={`fa fa-${faIcon}`}></i>
      </span>
    </>
  );
};

export default SpanButton;

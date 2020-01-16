import React from "react";

import { SimpleMarkerStyle } from "../../assets/js-css/SimpleMarkerStyle";

const SimpleMarker = ({ text }) => {
  return (
    <div style={SimpleMarkerStyle}>
      <i className="fa fa-map-marker"></i>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "7px",
          border: "1px solid black",
          borderRadius: "10px",
          height: "10px",
          width: "10px",
          backgroundColor: "black"
        }}
      ></div>
    </div>
  );
};

export default SimpleMarker;

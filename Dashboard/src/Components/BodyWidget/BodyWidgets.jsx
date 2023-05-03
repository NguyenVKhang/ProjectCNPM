import React from "react";
import "./BodyWidgets.css";
import LeftWidget from "./../LeftWidget/LeftWidget";
import RightWidget from "./../RightWidget/RightWidget";

function BodyWidgets() {
  return (
    <div className="bodyWidget">
      <LeftWidget />
      <RightWidget />
    </div>
  );
}

export default BodyWidgets;

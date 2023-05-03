import React from "react";
import "./BodyHeader.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function BodyHeader() {
  return (
    <div className="bodyHeaderContainer">
      <div className="featured">
        <h2 className="featuredTitle">Revenue</h2>
        <div className="amountContainer">
          <span className="featuredAmount">$2,454</span>
          <div className="compareContainer">
            <span className="compareAmount">-11.4</span>
            <ArrowDownwardIcon className="icon" />
          </div>
        </div>
        <div className="compareDesc">compared to last month</div>
      </div>
      <div className="featured">
        <h2 className="FeaturedTitle">Sales</h2>
        <div className="amountContainer">
          <span className="featuredAmount">$4454</span>
          <div className="compareContainer">
            <span className="compareAmount">-1.4</span>
            <ArrowDownwardIcon className="icon" />
          </div>
        </div>
        <div className="compareDesc">compared to last month</div>
      </div>
      <div className="featured">
        <h2 className="FeaturedTitle">Cost</h2>
        <div className="amountContainer">
          <span className="featuredAmount">$2,454</span>
          <div className="compareContainer">
            <span className="compareAmount">+2.1</span>
            <ArrowUpwardIcon className="icon2" />
          </div>
        </div>
        <div className="compareDesc">compared to last month</div>
      </div>
    </div>
  );
}

export default BodyHeader;

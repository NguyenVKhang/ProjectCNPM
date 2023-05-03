import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./BodyChart.css";

function BodyChart({ data, title, dataKey }) {
  return (
    <div className="bodyChart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 0.5}>
        <LineChart data={data}>
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#5550bd" />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BodyChart;

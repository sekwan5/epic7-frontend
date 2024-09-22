import React from "react";
import { YAxis as RechartsYAxis, YAxisProps } from "recharts";

const CustomYAxis: React.FC<YAxisProps> = (props) => {
  return <RechartsYAxis {...props} />;
};

export default CustomYAxis;

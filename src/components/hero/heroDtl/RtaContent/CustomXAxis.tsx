import React from "react";
import { XAxis as RechartsXAxis, XAxisProps } from "recharts";

const CustomXAxis: React.FC<XAxisProps> = (props) => {
  return <RechartsXAxis {...props} />;
};

export default CustomXAxis;

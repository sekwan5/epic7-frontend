import { type CampingResult } from "@/modules/api";
import CampingResultRow from "./CampingResultRow";

export interface ICampingResultRow {
  data: CampingResult[];
  useBookMark: boolean;
}

export default function CampingResult(props: ICampingResultRow) {
  const { data, useBookMark } = props;
  return (
    <div className="camping-content-wrap">
      <div className="results-container">
        <CampingResultRow data={data} useBookMark={useBookMark} />
      </div>
    </div>
  );
}

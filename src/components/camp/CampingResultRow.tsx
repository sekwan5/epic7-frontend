import HeroIcon from "../hero/heroIcon";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  delCampingBookMarkList,
  setCampingBookMarkList,
} from "@/store/campSlice";
import { CampingResult } from "@/modules/api/hero";

export interface ICampingResultRow {
  data: CampingResult[];
  useBookMark: boolean;
}

export default function CampingResultRow(props: ICampingResultRow) {
  const { data = [], useBookMark = true } = props;
  const dispatch = useAppDispatch();

  const [visibleCount, setVisibleCount] = useState(15);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 15);
  };

  const addBookMark = (item: CampingResult) => {
    dispatch(setCampingBookMarkList(item));
  };
  const deleteBookMark = (item: CampingResult) => {
    dispatch(delCampingBookMarkList(item));
  };
  return (
    <div>
      <table className="camping-result-table table-borderless">
        <thead>
          <tr>
            <th className="col-1"></th>
            <th
              className="col-5 text-align-center"
              style={{ maxWidth: "340px" }}
            >
              편성
            </th>
            <th className="col-4 col-xl-5">선택지</th>
            <th>사기</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.slice(0, visibleCount).map((row, index) => (
              <tr key={index} className="">
                <td className="align-middle">
                  <div className="index-cell d-flex align align-items-center justify-content-center gap-2">
                    <span>{index + 1}</span>
                    {useBookMark ? (
                      <i
                        className={`ico ico-camp-save color-gray`}
                        onClick={() => {
                          addBookMark(row);
                        }}
                      />
                    ) : (
                      <i
                        className={`ico ico-trash color-gray`}
                        onClick={() => {
                          deleteBookMark(row);
                        }}
                      />
                    )}
                  </div>
                </td>
                <td className="d-flex team">
                  {row.team.map((hero) => (
                    <div
                      key={hero.id}
                      style={{ width: "70px", padding: "5px 0px" }}
                    >
                      <HeroIcon data={hero} usename={false} />
                    </div>
                  ))}
                </td>
                <td className="al-c fw-light">
                  {`${row.bestChatOption1.hero.name} : ${row.bestChatOption1.option_kr}`}
                  <br />
                  {`${row.bestChatOption2.hero.name} : ${row.bestChatOption2.option_kr}`}
                </td>
                <td className="al-c">{row.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {visibleCount < data.length && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="load-more-button">
            더보기
          </button>
        </div>
      )}
    </div>
  );
}

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
                      <div
                        onClick={() => {
                          addBookMark(row);
                        }}
                      >
                        <svg
                          className="ico ico-camp-save"
                          xmlns="https://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          fill="#fff"
                        >
                          <path d="M160-80v-581q0-24.75 17.63-42.38Q195.25-721 220-721h360q24.75 0 42.38 17.62Q640-685.75 640-661v581L400-199 160-80Zm60-97 180-89 180 89v-484H220v484Zm520-62v-582H284v-60h456q24.75 0 42.38 17.62Q800-845.75 800-821v582h-60ZM220-661h360-360Z" />
                        </svg>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          deleteBookMark(row);
                        }}
                      >
                        <svg
                          className="ico ico-trash"
                          viewBox="0 0 24 24"
                          fill="fff"
                          xmlns="https://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 6H5H21"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
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

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ResetIcon from "@/components/common/ResetIcon";
import SearchIcon from "@/components/common/SearchIcon";
import CoImage from "@/components/common/CoImages";
import { getIconPosition, jobIcon, typeIcon } from "@/modules/utils";
import { IHero } from "@/modules/data/getHeroData";
export interface filterStatus {
  value: string;
  isSelect: boolean;
}
export interface IHeroFilterProps {
  data: IHero[];
  setData: (data: IHero[]) => void;
  tab?: number;
}

export default function HeroFilter(props: IHeroFilterProps) {
  const { data, setData } = props;

  const [heroNm, setHeroNm] = useState("");
  const [filter2Status, setFilter2Status] = useState<filterStatus[]>([
    { value: "All", isSelect: true },
    { value: "3", isSelect: false },
    { value: "4", isSelect: false },
    { value: "5", isSelect: false },
  ]);
  const [filter3Status, setFilter3Status] = useState<filterStatus[]>([
    { value: "All", isSelect: true },
    { value: "j01", isSelect: false },
    { value: "j02", isSelect: false },
    { value: "j03", isSelect: false },
    { value: "j04", isSelect: false },
    { value: "j05", isSelect: false },
    { value: "j06", isSelect: false },
  ]);
  const [filter4Status, setFilter4Status] = useState<filterStatus[]>([
    { value: "All", isSelect: true },
    { value: "t01", isSelect: false },
    { value: "t02", isSelect: false },
    { value: "t03", isSelect: false },
    { value: "t04", isSelect: false },
    { value: "t05", isSelect: false },
  ]);

  useEffect(() => {
    setSearchData();
  }, [filter2Status, filter3Status, filter4Status]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchData();
    }
  };

  function filterHeroList() {
    const updatedData = data.map((hero) => {
      const selectedGradeFilters = filter2Status
        .filter((f) => f.isSelect && f.value !== "All")
        .map((f) => f.value);
      const selectedJobFilters = filter3Status
        .filter((f) => f.isSelect && f.value !== "All")
        .map((f) => f.value);
      const selectedTypeFilters = filter4Status
        .filter((f) => f.isSelect && f.value !== "All")
        .map((f) => f.value);

      const gradeMatch =
        selectedGradeFilters.length === 0 ||
        selectedGradeFilters.includes(hero.grade);
      const jobMatch =
        selectedJobFilters.length === 0 ||
        selectedJobFilters.includes(hero.job_id);
      const typeMatch =
        selectedTypeFilters.length === 0 ||
        selectedTypeFilters.includes(hero.type_id);
      const nameMatch =
        !heroNm ||
        hero.name.includes(heroNm) ||
        hero.nm_en.toLowerCase().includes(heroNm.toLowerCase()) ||
        hero.keyword?.includes(heroNm);

      const isShow = gradeMatch && jobMatch && typeMatch && nameMatch;

      return { ...hero, isShow };
    });

    return updatedData;
  }

  function setSearchData() {
    const updatedData = filterHeroList();
    setData(updatedData as IHero[]);
  }

  const handleFilterClick = (
    filterStatus: filterStatus[],
    setFilterStatus: React.Dispatch<React.SetStateAction<filterStatus[]>>,
    value: string,
  ) => {
    const isAllFilter = value === "All";
    const updatedStatus = filterStatus.map((filter) => {
      if (isAllFilter) {
        return { ...filter, isSelect: filter.value === value };
      } else if (filter.value === value) {
        return { ...filter, isSelect: !filter.isSelect };
      } else if (filter.value === "All") {
        return { ...filter, isSelect: false };
      } else {
        return filter;
      }
    });

    const anyFilterSelected = updatedStatus.some(
      (filter) => filter.isSelect && filter.value !== "All",
    );
    if (!anyFilterSelected) {
      setFilterStatus(
        updatedStatus.map((filter) => ({
          ...filter,
          isSelect: filter.value === "All",
        })),
      );
    } else {
      setFilterStatus(updatedStatus);
    }
  };

  const handleReset = () => {
    setHeroNm(""); // 검색어 초기화

    // 모든 필터를 초기 상태로 되돌림
    setFilter2Status(
      filter2Status.map((option) => ({
        value: option.value,
        isSelect: option.value === "All",
      })),
    );
    setFilter3Status(
      filter3Status.map((option) => ({
        value: option.value,
        isSelect: option.value === "All",
      })),
    );
    setFilter4Status(
      filter4Status.map((option) => ({
        value: option.value,
        isSelect: option.value === "All",
      })),
    );
  };

  return (
    <div className="hero-filter-wrap">
      <div className="filter-row input-row">
        <div className="filter d-flex ">
          <input
            type="text"
            value={heroNm}
            onChange={(e) => setHeroNm(e.target.value)}
            placeholder="Search"
            className="search-input"
            onKeyDown={handleKeyDown}
          />
          <button
            className="search-button"
            onClick={() => {
              setSearchData();
            }}
          >
            <SearchIcon />
          </button>
        </div>
        <div id="filter2" className="filter">
          {filter2Status.map((option) => (
            <button
              key={option.value}
              className={`filter-button ${option.isSelect ? "selected" : ""}`}
              onClick={() =>
                handleFilterClick(filter2Status, setFilter2Status, option.value)
              }
            >
              {option.value === "All" ? (
                <span>{option.value}</span>
              ) : (
                <div className="star">
                  {[...Array(Number(option.value) || 0)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        marginRight: "-6px",
                      }}
                    >
                      <CoImage
                        src="/epic7-frontend/icons/star.png"
                        alt="star"
                        width={18}
                        height={18}
                      />
                    </div>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-row">
        <div className="filter" id="filter3">
          {filter3Status.map((option) => (
            <button
              key={option.value}
              className={`filter-button ${option.isSelect ? "selected" : ""}`}
              onClick={() =>
                handleFilterClick(filter3Status, setFilter3Status, option.value)
              }
            >
              {option.value === "All" ? (
                <span>{option.value}</span>
              ) : (
                <i
                  className="icon"
                  style={{
                    backgroundImage: `url(${jobIcon})`,
                    backgroundPositionY: getIconPosition("job", option.value),
                  }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="filter" id="filter4">
          {filter4Status.map((option) => (
            <button
              key={option.value}
              className={`filter-button ${option.isSelect ? "selected" : ""}`}
              onClick={() =>
                handleFilterClick(filter4Status, setFilter4Status, option.value)
              }
            >
              {option.value === "All" ? (
                <span>{option.value}</span>
              ) : (
                <i
                  className="icon"
                  style={{
                    backgroundImage: `url(${typeIcon})`,
                    backgroundPositionY: getIconPosition("type", option.value),
                  }}
                />
              )}{" "}
            </button>
          ))}
        </div>
      </div>
      <div className="reset-button-container">
        <button className="reset-button" onClick={handleReset}>
          {"필터 초기화"}
          <ResetIcon width={"16px"} height={"16px"} />
        </button>
      </div>
    </div>
  );
}

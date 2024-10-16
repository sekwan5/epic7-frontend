import React, { useEffect, useState } from "react";
import ProfileImg from "../hero/heroIcon/ProfileImg";
import CoImage from "../common/CoImages";
import { useInView } from "react-intersection-observer";

export interface IRTAListData {
  last_updated: string;
  hero_id: string;
  season: string;
  statistics: {
    wins: number;
    win_rate: number;
    pick_rate: number;
    pick_count: number;
    daily_stats: {
      [date: string]: {
        games: number;
        win_rate: number;
      };
    };
    preban_rate: number;
    total_games: number;
    preban_count: number;
    top_8_equips: {
      [key: string]: {
        win_rate: number;
        usage_rate: number;
      };
    };
    top_5_counters: Record<string, unknown>;
    available_games: number;
    max_battle_date: string;
    min_battle_date: string;
    top_4_artifacts: {
      [key: string]: {
        win_rate: number;
        usage_rate: number;
      };
    };
    top_5_teammates: Record<string, unknown>;
    top_8_equips_with_artifacts: {
      set: string[];
      arti: {
        [key: string]: {
          win_rate: number;
          usage_rate: number;
        };
      };
      win_rate: number;
      usage_rate: number;
    }[];
  };
}

export function RtaInfoGrid(props: { rtaDataList: IRTAListData[] }) {
  const { rtaDataList } = props;
  const imgUrl = import.meta.env.VITE_ASSETS_URL;

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  const parseSets = (setKey: string): string[] => {
    return setKey.slice(2, -2).split("', '").filter(Boolean);
  };

  const ITEMS_PER_PAGE = 20;

  const [visibleRows, setVisibleRows] = useState<IRTAListData[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  const sortedRows = React.useMemo(() => {
    const sortableRows = [...rtaDataList];
    if (sortConfig !== null) {
      sortableRows.sort((a, b) => {
        const aValue =
          sortConfig.key === "pickRate"
            ? a.statistics.pick_rate
            : sortConfig.key === "winRate"
              ? a.statistics.win_rate
              : a.statistics.preban_rate;
        const bValue =
          sortConfig.key === "pickRate"
            ? b.statistics.pick_rate
            : sortConfig.key === "winRate"
              ? b.statistics.win_rate
              : b.statistics.preban_rate;

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableRows;
  }, [rtaDataList, sortConfig]);

  useEffect(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setVisibleRows(sortedRows.slice(0, endIndex));
  }, [sortedRows, page]);

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "ascending";
    } else {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <table
      className="rta-info-grid"
      style={{ width: "100%", borderCollapse: "collapse" }}
    >
      <thead>
        <tr>
          <th className="col-1 col-sm-2 text-center"></th>
          <th
            className="col-1 text-center"
            onClick={() => requestSort("pickRate")}
          >
            픽률{" "}
            {sortConfig?.key === "pickRate"
              ? sortConfig.direction === "ascending"
                ? "▲"
                : "▼"
              : ""}
          </th>
          <th
            className="col-1 text-center"
            onClick={() => requestSort("winRate")}
          >
            승률{" "}
            {sortConfig?.key === "winRate"
              ? sortConfig.direction === "ascending"
                ? "▲"
                : "▼"
              : ""}
          </th>
          <th
            className="col-1 text-center"
            onClick={() => requestSort("banRate")}
          >
            프리밴률{" "}
            {sortConfig?.key === "banRate"
              ? sortConfig.direction === "ascending"
                ? "▲"
                : "▼"
              : ""}
          </th>
          <th className="col-1 text-center">세트 1순위</th>
          <th className="col-3 text-center">상대하기 어려운 영웅</th>
          <th className="col-3 text-center">함께 사용된 영웅</th>
        </tr>
      </thead>
      <tbody>
        {visibleRows.map((row) => {
          const top8Equips = row.statistics.top_8_equips
            ? Object.entries(row.statistics.top_8_equips)
                .sort((a, b) => b[1].usage_rate - a[1].usage_rate)
                .reduce(
                  (
                    acc: Record<
                      string,
                      { usage_rate: number; win_rate: number }
                    >,
                    [key, value],
                  ) => {
                    acc[key] = value as {
                      usage_rate: number;
                      win_rate: number;
                    };
                    return acc;
                  },
                  {},
                )
            : {};

          const topEquipKey = Object.keys(top8Equips)[0];
          const topEquipSets = topEquipKey ? parseSets(topEquipKey) : [];
          return (
            <tr key={row.hero_id}>
              <td>
                <div
                  className="hero-profile"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.location.href = `/hero/${row.hero_id}`;
                  }}
                >
                  <ProfileImg id={row.hero_id as string} />
                </div>
                {/* <span>{row.name}</span> */}
              </td>
              <td>{row.statistics.pick_rate.toFixed(2)}%</td>
              <td>{row.statistics.win_rate.toFixed(2)}%</td>
              <td>{row.statistics.preban_rate.toFixed(2)}%</td>
              <td>
                {topEquipSets.map((setName: string, i: number) => (
                  <CoImage
                    key={i}
                    className="set-icon"
                    src={`${imgUrl}/set/${setName}.png`}
                    alt={setName}
                  />
                ))}
                {topEquipSets.length === 1 && (
                  <CoImage
                    className="set-icon"
                    src={`${imgUrl}/set/set_random.png`}
                    alt="random"
                  />
                )}
              </td>
              <td>
                <div
                  className="d-flex flex-wrap gap-2 justify-content-center"
                  style={{ maxWidth: "250px" }}
                >
                  {Object.keys(row.statistics.top_5_counters)
                    .slice(0, 4)
                    .map((counterId) => (
                      <div
                        key={counterId}
                        className="hero-profile"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          // window.location.href = `/hero/${counterId}`;
                        }}
                      >
                        <ProfileImg id={counterId} />
                      </div>
                    ))}
                </div>
              </td>
              <td>
                <div
                  className="d-flex flex-wrap gap-2 justify-content-center"
                  style={{ maxWidth: "250px" }}
                >
                  {Object.keys(row.statistics.top_5_teammates)
                    .slice(0, 4)
                    .map((teammateId) => (
                      <div
                        key={teammateId}
                        className="hero-profile"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          // window.location.href = `/hero/${teammateId}`;
                        }}
                      >
                        <ProfileImg id={teammateId} />
                      </div>
                    ))}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={7} ref={ref} style={{ height: "20px" }} />{" "}
        </tr>
      </tfoot>
    </table>
  );
}

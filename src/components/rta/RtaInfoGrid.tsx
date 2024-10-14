import React, { useEffect, useState } from "react";
import ProfileImg from "../hero/heroIcon/ProfileImg";
import { IRTAData } from "@/modules/api";

export interface IRtaInfoGrid {
  id: string;
  name: string;
  pickRate: number;
  winRate: number;
  banRate: number;
  topSet: string;
  hardCounter: string;
  synergy: string;
}

const initialRows: IRTAData[] = [
  {
    id: "c5110",
    name: "한낮의 유영 플랑",
    total_games: 46145,
    pick_count: 2481,
    wins: 1277,
    win_rate: 51.47,
    pick_rate: 5.38,
    preban_count: 3,
    preban_rate: 0.01,
    min_battle_date: "2024-09-29",
    max_battle_date: "2024-10-11",
    top_8_equips: {
      "('set_speed', '', '')": {
        win_rate: 43.08,
        usage_rate: 3.33,
      },
      "('set_cri_dmg', '', '')": {
        win_rate: 58.21,
        usage_rate: 3.43,
      },
      "('set_speed', 'set_cri', '')": {
        win_rate: 54.22,
        usage_rate: 43.77,
      },
      "('set_speed', 'set_def', '')": {
        win_rate: 49.67,
        usage_rate: 7.84,
      },
      "('set_cri_dmg', 'set_cri', '')": {
        win_rate: 54.02,
        usage_rate: 11.48,
      },
      "('set_cri_dmg', 'set_def', '')": {
        win_rate: 49.48,
        usage_rate: 4.97,
      },
      "('set_def', 'set_cri', 'set_acc')": {
        win_rate: 50.7,
        usage_rate: 3.64,
      },
    },
    top_8_equips_with_artifacts: [
      {
        set: ["set_speed", "set_cri", ""],
        arti: {
          ef403: {
            win_rate: 56.4,
            usage_rate: 20.14,
          },
          efw02: {
            win_rate: 42.62,
            usage_rate: 7.14,
          },
          efw11: {
            win_rate: 58.51,
            usage_rate: 11.01,
          },
          efw31: {
            win_rate: 55.82,
            usage_rate: 39.23,
          },
        },
        win_rate: 54.22,
        usage_rate: 43.77,
      },
      {
        set: ["set_cri_dmg", "set_cri", ""],
        arti: {
          ef403: {
            win_rate: 80,
            usage_rate: 2.23,
          },
          efw11: {
            win_rate: 55.17,
            usage_rate: 12.95,
          },
          efw22: {
            win_rate: 60,
            usage_rate: 4.46,
          },
          efw31: {
            win_rate: 53.8,
            usage_rate: 76.34,
          },
        },
        win_rate: 54.02,
        usage_rate: 11.48,
      },
      {
        set: ["set_speed", "set_def", ""],
        arti: {
          ef403: {
            win_rate: 41.07,
            usage_rate: 36.6,
          },
          efw11: {
            win_rate: 47.06,
            usage_rate: 11.11,
          },
          efw17: {
            win_rate: 45,
            usage_rate: 13.07,
          },
          efw31: {
            win_rate: 55.56,
            usage_rate: 17.65,
          },
        },
        win_rate: 49.67,
        usage_rate: 7.84,
      },
      {
        set: ["set_cri_dmg", "set_def", ""],
        arti: {
          ef403: {
            win_rate: 33.33,
            usage_rate: 9.28,
          },
          efw02: {
            win_rate: 50,
            usage_rate: 12.37,
          },
          efw31: {
            win_rate: 55.36,
            usage_rate: 57.73,
          },
        },
        win_rate: 49.48,
        usage_rate: 4.97,
      },
      {
        set: ["set_def", "set_cri", "set_acc"],
        arti: {
          efw18: {
            win_rate: 53.45,
            usage_rate: 81.69,
          },
          efw31: {
            win_rate: 38.46,
            usage_rate: 18.31,
          },
        },
        win_rate: 50.7,
        usage_rate: 3.64,
      },
      {
        set: ["set_cri_dmg", "", ""],
        arti: {
          ef403: {
            win_rate: 33.33,
            usage_rate: 17.91,
          },
          efw11: {
            win_rate: 58.33,
            usage_rate: 17.91,
          },
          efw31: {
            win_rate: 65.12,
            usage_rate: 64.18,
          },
        },
        win_rate: 58.21,
        usage_rate: 3.43,
      },
      {
        set: ["set_speed", "", ""],
        arti: {
          ef403: {
            win_rate: 25,
            usage_rate: 12.31,
          },
          efw11: {
            win_rate: 52.63,
            usage_rate: 29.23,
          },
          efw31: {
            win_rate: 70,
            usage_rate: 15.38,
          },
          efw35: {
            win_rate: 34.78,
            usage_rate: 35.38,
          },
        },
        win_rate: 43.08,
        usage_rate: 3.33,
      },
    ],
    top_4_artifacts: {
      ef403: {
        win_rate: 50,
        usage_rate: 16.81,
      },
      efw02: {
        win_rate: 51.85,
        usage_rate: 6.92,
      },
      efw11: {
        win_rate: 54.55,
        usage_rate: 11.84,
      },
      efw31: {
        win_rate: 54.87,
        usage_rate: 41.57,
      },
    },
    top_5_teammates: {
      c1134: {
        count: 135,
        win_rate: 63.7,
      },
      c1156: {
        count: 64,
        win_rate: 62.5,
      },
      c2007: {
        count: 179,
        win_rate: 64.8,
      },
      c2039: {
        count: 62,
        win_rate: 67.74,
      },
      c2066: {
        count: 170,
        win_rate: 64.71,
      },
    },
    top_5_counters: {
      c1055: {
        count: 118,
        win_rate: 50,
      },
      c1103: {
        count: 100,
        win_rate: 42,
      },
      c2039: {
        count: 107,
        win_rate: 50.47,
      },
      c2066: {
        count: 122,
        win_rate: 50,
      },
      c2109: {
        count: 106,
        win_rate: 47.17,
      },
    },
    daily_stats: {
      "2024-09-29": {
        games: 24,
        win_rate: 66.67,
      },
      "2024-09-30": {
        games: 71,
        win_rate: 53.52,
      },
      "2024-10-01": {
        games: 71,
        win_rate: 50.7,
      },
      "2024-10-02": {
        games: 116,
        win_rate: 52.59,
      },
      "2024-10-03": {
        games: 95,
        win_rate: 55.79,
      },
      "2024-10-04": {
        games: 140,
        win_rate: 45,
      },
      "2024-10-05": {
        games: 179,
        win_rate: 60.89,
      },
      "2024-10-06": {
        games: 208,
        win_rate: 54.81,
      },
      "2024-10-07": {
        games: 279,
        win_rate: 49.82,
      },
      "2024-10-08": {
        games: 282,
        win_rate: 48.94,
      },
      "2024-10-09": {
        games: 336,
        win_rate: 47.32,
      },
      "2024-10-10": {
        games: 268,
        win_rate: 50.37,
      },
      "2024-10-11": {
        games: 412,
        win_rate: 52.43,
      },
    },
  },
];

export function RtaInfoGrid() {
  const [rows, setRows] = useState(initialRows);
  console.log(setRows);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // const rta = await api.hero.getHeroRtaData("c2090", season);
    // setRows([rta]);
  };

  const sortedRows = React.useMemo(() => {
    const sortableRows = [...rows];
    if (sortConfig !== null) {
      sortableRows.sort((a, b) => {
        const aValue =
          sortConfig.key === "pickRate"
            ? a.pick_rate
            : sortConfig.key === "winRate"
              ? a.win_rate
              : a.preban_rate;
        const bValue =
          sortConfig.key === "pickRate"
            ? b.pick_rate
            : sortConfig.key === "winRate"
              ? b.win_rate
              : b.preban_rate;

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
  }, [rows, sortConfig]);

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
          <th className="col-2"></th>
          <th className="col-1" onClick={() => requestSort("pickRate")}>
            픽률{" "}
            {sortConfig?.key === "pickRate"
              ? sortConfig.direction === "ascending"
                ? "▲"
                : "▼"
              : ""}
          </th>
          <th className="col-1" onClick={() => requestSort("winRate")}>
            승률{" "}
            {sortConfig?.key === "winRate"
              ? sortConfig.direction === "ascending"
                ? "▲"
                : "▼"
              : ""}
          </th>
          <th className="col-1" onClick={() => requestSort("banRate")}>
            프리밴률{" "}
            {sortConfig?.key === "banRate"
              ? sortConfig.direction === "ascending"
                ? "▲"
                : "▼"
              : ""}
          </th>
          <th className="col-1">세트 1순위</th>
          <th className="col-3">상대하기 어려운 영웅</th>
          <th className="col-3">함께 사용된 영웅</th>
        </tr>
      </thead>
      <tbody>
        {sortedRows.map((row) => (
          <tr key={row.id}>
            <td className="d-flex align-items-center gap-2">
              <div
                className="hero-profile"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // window.location.href = `/hero/${sortedTeammates[index][0]}`;
                }}
              >
                <ProfileImg id={row.id as string} />
              </div>
              {row.name}
            </td>
            <td>{row.pick_rate}%</td>
            <td>{row.win_rate}%</td>
            <td>{row.preban_rate}%</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

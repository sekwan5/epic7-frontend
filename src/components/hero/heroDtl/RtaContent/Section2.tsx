import { IRTAData } from "@/modules/api";
import ProfileImg from "../../heroIcon/ProfileImg";
import CoImage from "@/components/common/CoImages";

export function Section2(props: {
  rtaData: IRTAData;
  onEquipSelect: (key: string[]) => void;
  selectedSet: string[];
}) {
  const { rtaData, onEquipSelect, selectedSet } = props;
  //  const top8Equips = rtaData.top_8_equips
  const top8Equips = rtaData.top_8_equips
    ? Object.entries(rtaData.top_8_equips)
        .sort((a, b) => b[1].usage_rate - a[1].usage_rate)
        .reduce(
          (
            acc: Record<string, { usage_rate: number; win_rate: number }>,
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

  // 팀메이트와 카운터 데이터가 있을 경우에만 정렬
  const sortedTeammates = rtaData.top_5_teammates
    ? Object.entries(rtaData.top_5_teammates).sort(
        (a, b) => b[1].win_rate - a[1].win_rate,
      )
    : [];

  const sortedCounters = rtaData.top_5_counters
    ? Object.entries(rtaData.top_5_counters).sort(
        (a, b) => a[1].win_rate - b[1].win_rate,
      )
    : [];

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#a4de6c",
    "#d0ed57",
    "#83a6ed",
    "#8dd1e1",
  ];
  const imgUrl = import.meta.env.VITE_ASSETS_URL;

  const handleSetSelection = (key: string[]) => {
    if (isSetSelected(key)) {
      onEquipSelect([]);
    } else {
      onEquipSelect(key);
    }
  };

  const isSetSelected = (sets: string[]) => {
    if (sets.length !== selectedSet.length) return false;

    const setCounts = new Map<string, number>();
    const selectedSetCounts = new Map<string, number>();

    sets.forEach((set) => {
      setCounts.set(set, (setCounts.get(set) || 0) + 1);
    });

    selectedSet.forEach((set) => {
      selectedSetCounts.set(set, (selectedSetCounts.get(set) || 0) + 1);
    });

    for (const [set, count] of setCounts) {
      if (selectedSetCounts.get(set) !== count) return false;
    }

    return true;
  };

  const parseSets = (setKey: string): string[] => {
    return setKey
      .slice(1, -1)
      .split(",")
      .map((s) => s.trim().replace(/'/g, ""))
      .filter(Boolean);
  };

  return (
    <div className="rta-section2">
      <div className="rta-left">
        {sortedTeammates.length > 0 || sortedCounters.length > 0 ? (
          <table className="rta-table">
            <colgroup>
              <col className="hero-col" />
              <col className="winrate-col" />
              <col className="hero-col" />
              <col className="winrate-col" />
            </colgroup>
            <thead>
              <tr>
                <th colSpan={2} className="text-center">
                  같이 선택하기 좋은 영웅
                </th>
                <th colSpan={2} className="text-center">
                  상대하기 힘든 영웅
                </th>
              </tr>
              <tr>
                <th className="text-center">영웅</th>
                <th className="text-center">승률</th>
                <th className="text-center">영웅</th>
                <th className="text-center">승률</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 })
                .map((_, index) => {
                  const hasTeammate = !!sortedTeammates[index];
                  const hasCounter = !!sortedCounters[index];

                  if (!hasTeammate && !hasCounter) return null;

                  return (
                    <tr key={index}>
                      {hasTeammate ? (
                        <>
                          <td className="d-flex align-items-center justify-content-center">
                            <div
                              className="hero-profile"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                window.location.href = `/hero/${sortedTeammates[index][0]}`;
                              }}
                            >
                              <ProfileImg id={sortedTeammates[index][0]} />
                            </div>
                          </td>
                          <td className="text-center">
                            {sortedTeammates[index][1].win_rate?.toFixed(2) ??
                              "N/A"}
                            %
                            <span className="sub-info">
                              ({sortedTeammates[index][1].count} 게임)
                            </span>
                          </td>
                        </>
                      ) : (
                        <td colSpan={2}></td>
                      )}
                      {hasCounter ? (
                        <>
                          <td className="d-flex align-items-center justify-content-center">
                            <div
                              className="hero-profile"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                window.location.href = `/hero/${sortedCounters[index][0]}`;
                              }}
                            >
                              <ProfileImg id={sortedCounters[index][0]} />
                            </div>
                          </td>
                          <td className="text-center">
                            {sortedCounters[index][1].win_rate?.toFixed(2) ??
                              "N/A"}
                            %
                            <span className="sub-info">
                              ({sortedCounters[index][1].count} 게임)
                            </span>
                          </td>
                        </>
                      ) : (
                        <td colSpan={2}></td>
                      )}
                    </tr>
                  );
                })
                .filter(Boolean)}
            </tbody>
          </table>
        ) : (
          <div className="no-data">데이터가 없습니다.</div>
        )}
      </div>
      <div className="rta-right">
        {Object.keys(top8Equips).length > 0 ? (
          <>
            <h4>세트 사용률</h4>
            <div className="stats-chart">
              {Object.entries(top8Equips).map(([setKey, data], index) => {
                const sets = parseSets(setKey);
                return (
                  <div
                    key={setKey}
                    className={`chart-row ${isSetSelected(sets) ? "selected" : ""}`}
                    onClick={() => handleSetSelection(sets)}
                  >
                    {sets.map((setName: string, i: number) => (
                      <CoImage
                        key={i}
                        className="set-icon"
                        src={`${imgUrl}/set/${setName}.png`}
                        alt={setName}
                      />
                    ))}
                    {sets.length === 1 && (
                      <CoImage
                        className="set-icon"
                        src={`${imgUrl}/set/set_random.png`}
                        alt="random"
                      />
                    )}
                    <div className="stat-bar-container">
                      <div
                        className="stat-bar"
                        style={{
                          width: `${data.usage_rate}%`,
                          backgroundColor: colors[index % colors.length],
                        }}
                      />
                      <div className="stat-value">
                        {data.usage_rate?.toFixed(2) ?? ""}%
                      </div>
                    </div>
                    <div className="stat-winrate">
                      승률: {data.win_rate?.toFixed(2) ?? ""}%
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="stats-chart">
            <div className="no-data">세트 사용률 데이터가 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}

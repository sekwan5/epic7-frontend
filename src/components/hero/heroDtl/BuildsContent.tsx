/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { IHeroBuild } from "@/modules/api";
import CoImage from "@/components/common/CoImages";
import Artifact from "@/components/arti/Artifact";

interface Stats {
  atk: number;
  chc: number;
  chd: number;
  spd: number;
  def: number;
  eff: number;
  efr: number;
  gs: number;
  hp: number;
}

const calculateAverageStats = (builds: IHeroBuild[]): Stats => {
  const sum = builds.reduce(
    (acc, build) => ({
      atk: acc.atk + build.atk,
      chc: acc.chc + build.chc,
      chd: acc.chd + build.chd,
      spd: acc.spd + build.spd,
      def: acc.def + build.def,
      eff: acc.eff + build.eff,
      efr: acc.efr + build.efr,
      gs: acc.gs + build.gs,
      hp: acc.hp + build.hp,
    }),
    { atk: 0, chc: 0, chd: 0, spd: 0, def: 0, eff: 0, efr: 0, gs: 0, hp: 0 },
  );

  const count = builds.length;
  return Object.entries(sum).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: Math.round(value / count),
    }),
    {} as Stats,
  );
};

const getSetKey = (sets: Record<string, number>): string => {
  return Object.entries(sets)
    .filter(([, value]) => value >= 2)
    .sort(([, a], [, b]) => b - a) // value 기준 내림차순 정렬
    .map(([key]) => key)
    .join("/");
};

export default function BuildsContent({
  builds,
  tab,
}: {
  builds: IHeroBuild[];
  tab: string;
}) {
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const imgUrl = import.meta.env.VITE_ASSETS_URL;
  //{set_acc: 2, set_speed: 4}
  const setOptions = useMemo(() => {
    const setGroups = builds.reduce(
      (acc, build) => {
        const key = getSetKey(build.sets);
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(build);
        return acc;
      },
      {} as Record<string, IHeroBuild[]>,
    );

    const totalBuilds = builds.length;
    const result = Object.entries(setGroups)
      .map(([key, groupBuilds]) => {
        const sets = key.split("/");
        return {
          key,
          label1: sets[0] || "",
          label2: sets[1] || "",
          label3: sets[2] || "",
          count: groupBuilds.length,
          usage: (groupBuilds.length / totalBuilds) * 100,
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return result;
  }, [builds]);

  const filteredBuilds = useMemo(() => {
    if (!selectedSet) return builds;
    return builds.filter((build) => getSetKey(build.sets) === selectedSet);
  }, [builds, selectedSet]);

  const averageStats = useMemo(
    () => calculateAverageStats(filteredBuilds),
    [filteredBuilds],
  );

  const artifactUsage = useMemo(() => {
    const usage = filteredBuilds.reduce(
      (acc, build) => {
        acc[build.artifactCode] = (acc[build.artifactCode] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const totalBuilds = filteredBuilds.length;
    const result = Object.entries(usage)
      .map(([code, count]) => ({
        code,
        count,
        usage: (count / totalBuilds) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
    return result;
  }, [filteredBuilds]);

  const handleSetSelection = (key: string) => {
    setSelectedSet((prevSet) => (prevSet === key ? null : key));
  };

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

  const statMaxValues = {
    atk: 5500,
    def: 4000,
    hp: 40000,
    spd: 350,
    chc: 100,
    chd: 350,
    eff: 350,
    efr: 350,
  };

  const statsChartData = useMemo(() => {
    return [
      {
        stat: "atk",
        name: "공격력",
        value: averageStats.atk,
        max: averageStats.atk < 4500 ? statMaxValues.atk : 8500,
      },
      {
        stat: "def",
        name: "방어력",
        value: averageStats.def,
        max: averageStats.def < 30000 ? statMaxValues.def : 50000,
      },
      {
        stat: "hp",
        name: "체력",
        value: averageStats.hp,
        max: statMaxValues.hp,
      },
      {
        stat: "spd",
        name: "속도",
        value: averageStats.spd,
        max: statMaxValues.spd,
      },
      {
        stat: "chc",
        name: "치명타 확률",
        value: averageStats.chc,
        max: statMaxValues.chc,
      },
      {
        stat: "chd",
        name: "치명 피해",
        value: averageStats.chd,
        max: statMaxValues.chd,
      },
      {
        stat: "eff",
        name: "효과적중",
        value: averageStats.eff,
        max: statMaxValues.eff,
      },
      {
        stat: "efr",
        name: "효과저항",
        value: averageStats.efr,
        max: statMaxValues.efr,
      },
    ];
  }, [averageStats]);

  const statColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F06292",
    "#AED581",
    "#FFD54F",
    "#4DB6AC",
  ];

  // builds 길이가 0인 경우를 확인하는 변수 추가
  const hasNoBuilds = builds.length === 0;
  if (tab === "RTA") return null;
  return (
    <div className="builds-content">
      <div className="charts-container">
        <div className="chart-wrapper">
          <h3>평균 스탯</h3>
          {hasNoBuilds ? (
            <p>데이터가 없습니다.</p>
          ) : (
            <div className="stats-chart">
              {statsChartData.map((stat, index) => (
                <div key={stat.name} className="chart-row stat">
                  <CoImage
                    className="stat-icon"
                    src={`${imgUrl}/stat/${stat.stat}.png`}
                    alt={stat.name}
                    width={20}
                    height={20}
                  />
                  <div className="stat-name">{stat.name}</div>
                  <div className="stat-bar-container">
                    <div
                      className="stat-bar"
                      style={{
                        width: `${(stat.value / stat.max) * 100}%`,
                        backgroundColor: statColors[index],
                      }}
                    />
                  </div>
                  <div className="stat-value">{stat.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="chart-wrapper">
          <h3>세트 사용률</h3>
          {hasNoBuilds ? (
            <p>데이터가 없습니다.</p>
          ) : (
            <div className="stats-chart">
              {setOptions.map((option, index) => (
                <div
                  key={option.key}
                  className={`chart-row ${selectedSet === option.key ? "selected" : ""}`}
                  onClick={() => handleSetSelection(option.key)}
                >
                  <CoImage
                    className="set-icon"
                    src={`${imgUrl}/set/${option.label1 || "set_random"}.png`}
                    alt={option.label1}
                  />
                  <CoImage
                    className="set-icon"
                    src={`${imgUrl}/set/${option.label2 || "set_random"}.png`}
                    alt={option.label2}
                  />
                  {option.label3 && (
                    <CoImage
                      className="set-icon"
                      src={`${imgUrl}/set/${option.label3 || "set_random"}.png`}
                      alt={option.label3}
                    />
                  )}

                  <div className="stat-bar-container">
                    <div
                      className="stat-bar"
                      style={{
                        width: `${option.usage}%`,
                        backgroundColor: colors[index % colors.length],
                      }}
                    />
                  </div>
                  <div className="stat-value">{option.usage.toFixed(1)}%</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="artifact-usage">
        <h3>아티팩트 채용률</h3>
        {hasNoBuilds ? (
          <p>아티팩트 채용률 데이터가 없습니다.</p>
        ) : (
          <div className="arti-wrap">
            {artifactUsage.map((item) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                style={{ marginBottom: "20px" }}
                key={item.code}
              >
                <Artifact data={item} useStatus={false} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

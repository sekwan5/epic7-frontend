import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from "recharts";
import PickBox from "../../PickBox";
import { IHero } from "@/modules/data/getHeroData";
import { IRTAData } from "@/modules/api";
export interface DailyStats {
  date: string;
  games: number;
  win_rate: number;
}
export function Section1({
  heroData,
  rtaData,
}: {
  heroData: IHero;
  rtaData: IRTAData;
}) {
  const dailyStats: DailyStats[] = rtaData.daily_stats
    ? Object.entries(rtaData.daily_stats)
        .map(([date, stats]) => ({
          date,
          games: stats.games,
          win_rate: stats.win_rate,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : [];

  // 승률, 픽률, 프리밴률에 대한 안전한 표시 함수
  const safeDisplay = (value: number | null, defaultValue: string = "-") => {
    if (value === null || isNaN(value)) {
      return defaultValue;
    }
    return value === 0 ? "0%" : `${value.toFixed(2)}%`;
  };

  return (
    <div className="rta-section1">
      <div className="rta-stats">
        <div className="hero-grid">
          <div className="pick-box-wrap">
            <PickBox data={heroData} useStatus={false} />
          </div>
        </div>
        <div className="text d-flex flex-column align-items-center">
          <p className="large">
            픽률:{" "}
            <span className="value">{safeDisplay(rtaData.pick_rate)}</span>
            <span className="sub-info">({rtaData.pick_count ?? 0} 게임)</span>
          </p>
          <p className="large">
            프리밴률:{" "}
            <span className="value">{safeDisplay(rtaData.preban_rate)}</span>
            <span className="sub-info">({rtaData.preban_count ?? 0} 게임)</span>
          </p>
          <p className="large">
            승률: <span className="value">{safeDisplay(rtaData.win_rate)}</span>
            <span className="sub-info">
              ({rtaData.wins ?? 0} 승{" "}
              {(rtaData.pick_count ?? 0) - (rtaData.wins ?? 0)} 패)
            </span>
          </p>
        </div>
      </div>
      {dailyStats.length > 0 ? (
        <div className="rta-chart">
          <ResponsiveContainer>
            <ComposedChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
              />
              <YAxis yAxisId="left" orientation="left" stroke="#FF4D6D" />
              <YAxis yAxisId="right" orientation="right" stroke="#399eee" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="right"
                dataKey="games"
                fill="#399eee"
                name="게임 수"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="win_rate"
                stroke="#FF4D6D"
                strokeWidth={3}
                name="승률"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="rta-chart">
          <div className="no-data">일일 통계 데이터가 없습니다.</div>
        </div>
      )}
    </div>
  );
}

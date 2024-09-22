/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { IRTAData } from "@/modules/api";
import Artifact from "@/components/arti/Artifact";

interface ArtifactData {
  code: string;
  usage_rate: number;
  win_rate: number;
}

const parseSets = (setKey: any): string[] => {
  if (Array.isArray(setKey)) {
    return setKey.filter(Boolean); // 빈 문자열 제거
  }
  if (typeof setKey === "string") {
    if (setKey.startsWith("[") && setKey.endsWith("]")) {
      return setKey
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/'/g, ""))
        .filter(Boolean);
    }
    return [setKey];
  }
  return [];
};

export function Section3({
  rtaData,
  selectedSet,
}: {
  rtaData: IRTAData;
  selectedSet: string[];
}) {
  const [artifacts, setArtifacts] = useState<ArtifactData[]>([]);

  useEffect(() => {
    if (selectedSet && selectedSet.length > 0) {
      const selectedEquipData = rtaData.top_8_equips_with_artifacts.find(
        (item) => {
          const parsedSet = parseSets(item.set);
          return (
            parsedSet.length === selectedSet.length &&
            parsedSet.every((set, index) => set === selectedSet[index])
          );
        },
      );
      if (selectedEquipData) {
        const sortedArtifacts = Object.entries(selectedEquipData.arti)
          .map(([code, data]) => ({
            code,
            usage_rate: data.usage_rate,
            win_rate: data.win_rate,
          }))
          .sort((a, b) => b.usage_rate - a.usage_rate);
        setArtifacts(sortedArtifacts);
      }
    } else if (rtaData.top_4_artifacts) {
      const sortedArtifacts = Object.entries(rtaData.top_4_artifacts)
        .map(([code, data]) => ({
          code,
          usage_rate: data.usage_rate,
          win_rate: data.win_rate,
        }))
        .sort((a, b) => b.usage_rate - a.usage_rate);
      setArtifacts(sortedArtifacts);
    }
  }, [rtaData, selectedSet]);

  return (
    <div className="rta-section3">
      <div className="artifact-usage">
        {artifacts.length > 0 ? (
          <>
            <h3>아티팩트 채용률</h3>
            <div className="arti-wrap">
              {artifacts.map((item) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                  style={{ marginBottom: "20px" }}
                  key={item.code}
                >
                  <Artifact
                    key={item.code}
                    data={{
                      code: item.code,
                      usage: item.usage_rate,
                      win_rate: item.win_rate,
                    }}
                    useStatus={false}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-data">아티팩트 채용률 데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

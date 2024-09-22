/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { IRTAData } from "@/modules/api";
import Artifact from "@/components/arti/Artifact";

export function Section3({
  rtaData,
  selectedSet,
}: {
  rtaData: IRTAData;
  selectedSet: string[];
}) {
  const [artifacts, setArtifacts] = useState<{ code: string; usage: number }[]>(
    [],
  );

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

  useEffect(() => {
    if (selectedSet && selectedSet.length > 0) {
      const top8EquipsWithArtifacts = rtaData.top_8_equips_with_artifacts || [];

      const selectedEquipData = (top8EquipsWithArtifacts as any[]).find(
        (item: any) => {
          const parsedSet = parseSets(item.set);
          return (
            parsedSet.length === selectedSet.length &&
            parsedSet.every((set: string) => selectedSet.includes(set))
          );
        },
      );

      if (selectedEquipData) {
        const sortedArtifacts = Object.entries(selectedEquipData.arti)
          .map(([code, usage]) => ({ code, usage: usage as number }))
          .sort((a, b) => b.usage - a.usage);
        setArtifacts(sortedArtifacts);
      }
    } else if (rtaData.top_4_artifacts) {
      const sortedArtifacts = Object.entries(rtaData.top_4_artifacts)
        .map(([code, usage]) => ({ code, usage }))
        .sort((a, b) => b.usage - a.usage);
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
                  <Artifact key={item.code} data={item} useStatus={false} />
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

/* eslint-disable @typescript-eslint/no-explicit-any */
// 아티팩트 데이터의 타입 정의
interface IArtifact {
  id: string;
  arti_nm_kr: string;
  arti_nm_en: string;
  grade: number;
  status: string | null;
  arti_desc_kr: string | null;
  arti_desc_en: string | null;
  arti_max_kr: string;
  arti_max_en: string;
  arti_base_kr: string;
  arti_base_en: string;
  atk_base: number;
  atk_max: number;
  health_base: number;
  health_max: number;
  job: string | null;
  identifier: string;
}

// 전체 아티팩트 데이터의 타입 정의
interface ArtifactData {
  [key: string]: IArtifact;
}

import artifactData from "./artifacts.json";

// JSON 데이터를 ArtifactData 타입으로 안전하게 변환
const artifacts: ArtifactData = Object.fromEntries(
  (artifactData as any[]).map((artifact) => [artifact.id, artifact]),
);

// identifier를 키로 하는 객체 생성
const artifactsByIdentifier: { [key: string]: IArtifact } = Object.fromEntries(
  (artifactData as any[]).map((artifact) => [artifact.identifier, artifact]),
);

export function getAllArtifacts(): IArtifact[] {
  return Object.values(artifacts);
}

export function getArtifactById(id: string): IArtifact | undefined {
  return artifacts[id];
}

export function getArtifactByCode(identifier: string): IArtifact | undefined {
  return artifactsByIdentifier[identifier];
}

export function getArtifactByStats(): IArtifact[] {
  return Object.values(artifacts)
    .filter((arti) => arti.status === "new" || arti.status === "update")
    .sort((a, b) => {
      // 먼저 status로 정렬 (new가 update보다 앞으로)
      if (a.status !== b.status) {
        return a.status === "new" ? -1 : 1;
      }

      // status가 같다면 grade로 정렬 (높은 grade가 앞으로)
      const gradeOrder: { [key: string]: number } = { "5": 3, "4": 2, "3": 1 };
      return (gradeOrder[b.grade] || 0) - (gradeOrder[a.grade] || 0);
    });
}

// Artifact와 ArtifactData 인터페이스도 export
export type { IArtifact, ArtifactData };

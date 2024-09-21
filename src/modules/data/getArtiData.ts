/* eslint-disable @typescript-eslint/no-explicit-any */
// 아티팩트 데이터의 타입 정의
interface IArtifact {
  id: string;
  arti_nm_kr: string;
  arti_nm_en: string;
  grade: number;
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

export function getArtifactsByJob(job: string | null): IArtifact[] {
  return Object.values(artifacts).filter((artifact) => artifact.job === job);
}

export function getArtifactsByGrade(grade: number): IArtifact[] {
  return Object.values(artifacts).filter(
    (artifact) => artifact.grade === grade,
  );
}

// Artifact와 ArtifactData 인터페이스도 export
export type { IArtifact, ArtifactData };

"use client";
import { useAppSelector } from "@/store/hooks";

export default function CampingTab(props: {
  setTab: (tab: number) => void;
  tab: number;
}) {
  const { setTab, tab } = props;
  const bookmarkCount = useAppSelector(
    (state) => state.camp.campBookMarkList.length
  );

  return (
    <div className="camping-tab-wrap">
      {/* 친구 추가 아이콘 */}
      <div
        className={`camping-tab-wrap-item ${tab === 0 ? "active" : ""}`}
        onClick={() => setTab(0)}
      >
        <i className={`ico ico-add_hero color-gray }`} />
      </div>

      <div
        className={`camping-tab-wrap-item ${tab === 1 ? "active" : ""}`}
        onClick={() => setTab(1)}
      >
        <i className={`ico ico-edit_hero color-gray `} />
      </div>

      <div
        className={`camping-tab-wrap-item ${tab === 2 ? "active" : ""}`}
        onClick={() => setTab(2)}
      >
        <i className={`ico ico-camp color-gray`} />
      </div>

      <div
        className={`camping-tab-wrap-item ${tab === 3 ? "active" : ""}`}
        onClick={() => setTab(3)}
      >
        <i className={`ico ico-camp-save color-gray`}></i>
        {bookmarkCount > 0 && (
          <span className="bookmark-count">{bookmarkCount}</span>
        )}
      </div>
    </div>
  );
}

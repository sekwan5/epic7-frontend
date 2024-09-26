import { useAppSelector } from "@/store/hooks";
import AddHeroIcon from "../common/AddHeroIcon";
import EditHeroIcon from "../common/EditHeroIcon";
import CampIcon from "../common/CampIcon";
import CampSaveIcon from "../common/CampSaveIcon";

export default function CampingTab(props: {
  setTab: (tab: number) => void;
  tab: number;
}) {
  const { setTab, tab } = props;
  const bookmarkCount = useAppSelector(
    (state) => state.camp.campBookMarkList.length,
  );

  return (
    <div className="camping-tab-wrap">
      {/* 친구 추가 아이콘 */}
      <div
        className={`camping-tab-wrap-item ${tab === 0 ? "active" : ""}`}
        onClick={() => setTab(0)}
      >
        <AddHeroIcon></AddHeroIcon>
      </div>

      <div
        className={`camping-tab-wrap-item ${tab === 1 ? "active" : ""}`}
        onClick={() => setTab(1)}
      >
        <EditHeroIcon />
      </div>

      <div
        className={`camping-tab-wrap-item ${tab === 2 ? "active" : ""}`}
        onClick={() => setTab(2)}
      >
        <CampIcon />
      </div>

      <div
        className={`camping-tab-wrap-item ${tab === 3 ? "active" : ""}`}
        onClick={() => setTab(3)}
      >
        <CampSaveIcon />
        {bookmarkCount > 0 && (
          <span className="bookmark-count">{bookmarkCount}</span>
        )}
      </div>
    </div>
  );
}

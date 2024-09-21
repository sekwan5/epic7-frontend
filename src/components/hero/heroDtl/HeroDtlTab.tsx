interface HeroDtlTabProps {
  tabs: string[];
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

export default function HeroDtlTab({
  tabs,
  activeTab,
  onTabChange,
}: HeroDtlTabProps) {
  return (
    <div className="tab-container">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => onTabChange && onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

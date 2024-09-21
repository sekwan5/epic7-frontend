interface HeroDtlTabProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function HeroDtlTab({
  tabs,
  activeTab,
  onTabChange,
}: HeroDtlTabProps) {
  return (
    <div className="tab-container">
      {tabs.length > 1 ? (
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      ) : (
        <div className="stats-header">
          <h2>{tabs[0]}</h2>
        </div>
      )}
    </div>
  );
}

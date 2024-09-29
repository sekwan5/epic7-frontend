import { PageTitle } from "@/components/common/PageTitle";

export default function GearEnhanceWrap() {
  return (
    <>
      <div className="container gear-enhance">
        <div className="gear-enhance-wrap">
          <PageTitle depth="gear">
            <h2>장비 강화 시뮬레이터</h2>
          </PageTitle>
          <div className="gear-enhance-content">{/* <CoImage src={} /> */}</div>
        </div>
      </div>
    </>
  );
}

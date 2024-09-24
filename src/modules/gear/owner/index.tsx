import { PageTitle } from "@/components/common/PageTitle";
import ImageToText from "@/components/gear/owner/ImageToText";
import { useState } from "react";

export function GearOwnerWrap() {
  const [text, setText] = useState<string>("텍스트가 여기에 표시됩니다.");

  return (
    <>
      <div className="container gear-owner">
        <div className="gear-owner-wrap">
          <PageTitle>
            <h2>장비 주인찾기</h2>
          </PageTitle>
          <div className="gear-owner-content">
            <div className="content-left">
              <ImageToText setText={setText} />
            </div>
            <div className="content-right">
              <textarea
                value={text}
                readOnly
                style={{ width: "100%", height: "200px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

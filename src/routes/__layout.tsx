import { Outlet } from "react-router-dom";

import { ContentsContainer, Header, Sidebar } from "@/components/layout";

export function Component() {
  return (
    <div>
      <div className="smodWrap smodWrap-m">
        <Header />
        <Sidebar />
        <ContentsContainer>
          <Outlet />
        </ContentsContainer>
      </div>
    </div>
  );
}
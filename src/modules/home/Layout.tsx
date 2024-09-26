import { Outlet } from "react-router-dom";

import { ContentsContainer, Header, Sidebar } from "@/components/layout";
import { useRedirectHandler } from "@/hooks/useRedirectHandler";

export function Layout() {
  useRedirectHandler(); // 리다이렉트 핸들러 사용
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

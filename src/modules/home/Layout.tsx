import { Outlet } from "react-router-dom";

import { ContentsContainer, Header, Sidebar } from "@/components/layout";
import { useRedirectHandler } from "@/hooks/useRedirectHandler";
import ScrollToTop from "@/components/common/ScrollToTop";

export function Layout() {
  useRedirectHandler(); // 리다이렉트 핸들러 사용
  return (
    <div>
      <div className="smodWrap smodWrap-m">
        <ScrollToTop />
        <Header />
        <Sidebar />
        <ContentsContainer>
          <Outlet />
        </ContentsContainer>
      </div>
    </div>
  );
}

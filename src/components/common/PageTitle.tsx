import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export interface PageTitleProps extends PropsWithChildren {
  className?: string;
  border?: boolean;
}
export function PageTitle({ children }: PageTitleProps) {
  return (
    <div className="page-title">
      <div className="text">
        <div className="page-path">
          <span>
            <Link to="/">Home / </Link>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

import menus from "@/modules/menus.json";
import CoImage from "../common/CoImages";
import { useAppDispatch } from "@/store/hooks";
import { toggleSidebar } from "@/store/appSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
export function Header() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleClick = (to: string) => {
    navigate(to);
  };

  const dispatch = useAppDispatch();

  return (
    <div className="fixArea">
      <div className="top-area d-flex">
        <div className="ico-menu-wrap">
          <i
            className="ico ico-menu color-black"
            onClick={() => dispatch(toggleSidebar())}
          />
        </div>
        <Link to="/" className="logo-left">
          <CoImage
            className="pc-logo"
            src="/images/c2111_su.png" // public 폴더를 기준으로 한 경로
            alt="Example Image"
            width={130} // 원하는 이미지의 너비
            height={77} // 원하는 이미지의 높이
          />
          <CoImage
            className="mo-logo"
            src="/images/c2111_s.png" // public 폴더를 기준으로 한 경로
            alt="Example Image"
            width={35} // 원하는 이미지의 너비
            height={35} // 원하는 이미지의 높이
          />
          <span>Epic7.GG</span>
        </Link>
        <div className="smodGnb">
          <div className="spanWarp">
            {menus.map((menu) => {
              return (
                <span
                  key={`top-menu-${menu.id}`}
                  className={`${
                    pathname.split("/")[1] === menu.to.split("/")[1]
                      ? "active"
                      : ""
                  } `}
                  onClick={() => {
                    handleClick(menu.to);
                  }}
                  // to={menu.to}
                >
                  {menu.title}
                </span>
              );
            })}
          </div>
        </div>
        <div className="ico-menu-wrap align-right">
          {/* <i
            className="ico ico-menu"
            // onClick={() => dispatch(toggleSidebar())}
          /> */}
        </div>
      </div>
    </div>
  );
}

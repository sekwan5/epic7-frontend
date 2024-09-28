"use client";
import menus from "@/modules/menus.json";
import { setSidebar } from "@/store/appSlice";
import { useAppDispatch, useSelectorTyped } from "@/store/hooks";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const { sidebar } = useSelectorTyped((state) => ({
    sidebar: state.app.sidebar,
  }));

  return (
    // <div className={`sidebar-wrapper ${sidebar ? "show" : ""}`}>
    <>
      <aside className={`sidebar ${sidebar ? "show" : ""}`}>
        <div className="sidebar-header">
          <i
            className="ico-close"
            onClick={() => dispatch(setSidebar(false))}
          />
        </div>
        <div className="nav-wrapper">
          <ul className="nav flex-column">
            {menus
              .filter((e) => e.sidebar === true)
              .map((menu) => {
                return (
                  <Fragment key={`sidebar-menu-${menu.id}`}>
                    <li className="nav-item">
                      <Link
                        to={menu.to}
                        className={`nav-link ${
                          pathname.split("/")[1] === menu.to.split("/")[1]
                            ? "active"
                            : ""
                        }`}
                        onClick={() => dispatch(setSidebar(false))}
                      >
                        {menu.title}
                      </Link>
                    </li>
                  </Fragment>
                );
              })}
          </ul>
        </div>
      </aside>
      <div className={`sidebar-backdrop fade ${sidebar ? "show" : ""}`}></div>
    </>
    // </div>
  );
}

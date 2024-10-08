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

  const closeSidebar = () => {
    dispatch(setSidebar(false));
  };

  return (
    <>
      <aside className={`sidebar ${sidebar ? "show" : ""}`}>
        <div className="sidebar-header">
          <i className="ico-close" onClick={closeSidebar} />
        </div>
        <div className="nav-wrapper">
          <ul className="nav flex-column">
            {menus
              .filter((e) => e.sidebar === true)
              .map((menu) => {
                const isActive =
                  pathname.split("/")[1] === menu.to.split("/")[1];
                return (
                  <Fragment key={`sidebar-menu-${menu.id}`}>
                    <li className="nav-item">
                      <Link
                        to={menu.to}
                        className={`nav-link ${isActive ? "active" : ""}`}
                        onClick={closeSidebar}
                      >
                        {menu.title}
                      </Link>
                      {menu.submenus && menu.submenus.length > 0 && (
                        <ul className="nav flex-column submenu">
                          {menu.submenus.map((submenu) => (
                            <li
                              className="nav-item"
                              key={`sidebar-submenu-${submenu.id}`}
                            >
                              <Link
                                to={submenu.to}
                                className={`nav-link ${pathname === submenu.to ? "active" : ""}`}
                                onClick={closeSidebar}
                              >
                                {submenu.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  </Fragment>
                );
              })}
          </ul>
        </div>
      </aside>
      <div
        className={`sidebar-backdrop fade ${sidebar ? "show" : ""}`}
        onClick={closeSidebar}
      ></div>
    </>
  );
}

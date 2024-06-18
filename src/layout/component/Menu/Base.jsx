import {
  createContext,
  useEffect,
  useState,
  useContext,
  forwardRef
} from "react";

import { Ban, CircleGauge } from "lucide-react";

import { MenuContext } from "./context";

export function BaseMenu({
  children,
  onClickSubMenu: onClickSubMenuFunc,
  onClickMenuItem: onClickMenuItemFunc,
  selectedKey
}) {
  function onClickSubMenu(...props) {
    onClickSubMenuFunc && onClickSubMenuFunc(...props);
  }
  function onClickMenuItem(...props) {
    onClickMenuItemFunc && onClickMenuItemFunc(...props);
  }

  return (
    <MenuContext.Provider
      value={{ onClickSubMenu, onClickMenuItem, selectedKey }}
    >
      <div className="w-full"> {children}</div>
    </MenuContext.Provider>
  );
}

// export const Menu = forwardRef((BaseMenu))

export { MenuItem, MenuSubItem } from "./Item";

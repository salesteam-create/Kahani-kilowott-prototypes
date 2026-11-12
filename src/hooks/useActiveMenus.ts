"use client";

import { useEffect, useState } from "react";
import { menus, isMenuAvailable, type Menu } from "@/data/menus";

/**
 * Menus currently on offer. The static build renders the list as of build
 * time; on the client we re-check against today's date so an expired seasonal
 * menu (Christmas, New Year, Diwali…) disappears without a redeploy.
 */
export function useActiveMenus(): Menu[] {
  const [list, setList] = useState(() => menus.filter((m) => isMenuAvailable(m)));
  useEffect(() => {
    setList(menus.filter((m) => isMenuAvailable(m, new Date())));
  }, []);
  return list;
}

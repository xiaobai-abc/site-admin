import { forwardRef, useContext, useEffect, useState } from "react";
import { MenuContext } from "./context";
import { Button } from "@/shadcn-ui/ui/button";
import cn from "classnames";

const ItemButton = forwardRef(({ className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={cn("w-full flex justify-start  h-fit", className)}
      variant="outline"
      {...props}
    ></Button>
  );
});

export function MenuItem({ children, title, path }) {
  const [expand, setExpand] = useState(false);
  const menuContext = useContext(MenuContext);

  useEffect(() => {
    path;
    console.log(menuContext, path);
  }, []);

  return (
    <ItemButton
      className="[&:not(:last-child)]:mb-1"
      variant={menuContext.selectedKey === path ? "default" : "outline"}
      onClick={() => menuContext.onClickMenuItem(path)}
    >
      <span className="ml-[1.7rem]">{title}</span>
    </ItemButton>
  );
}

export function MenuSubItem({ children, title, path }) {
  const menuContext = useContext(MenuContext);
  const activeClassName = "text-[hsl(var(--primary))]";
  // "bg-gray-100 border-gray-200 text-[hsl(var(--primary))]";
  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <div className="sub-item [&:not(:last-child)]:mb-2">
      <ItemButton
        onClick={() => menuContext.onClickSubMenu?.(path)}
        className={menuContext.selectedKey === path ? activeClassName : ""}
      >
        {title}
      </ItemButton>

      <div className="mt-1">{children}</div>
    </div>
  );
}

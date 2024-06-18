import { Button } from "@/shadcn-ui/ui/button";
import { ScrollArea } from "@/shadcn-ui/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/shadcn-ui/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/shadcn-ui/ui/drawer";
import { Switch } from "@/shadcn-ui/ui/switch";
import { Label } from "@/shadcn-ui/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/shadcn-ui/ui/tooltip";

import {
  setThemeMode,
  setThemeColor,
  getThemeColorList
} from "@/store/modules/themeSlice.js";
import { useDispatch, useSelector } from "react-redux";

import LoadingComponent from "@/components/LodingComponent";
import Transition from "../components/Transition";

import { useEffect, useState, lazy, Suspense } from "react";

const LazyIcons = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("./component/LazyIcons"));
      }, 10000);
    })
);

// 主题测试 shadcn ui 框架的 主题颜色测试组件
export default function ThemeTest() {
  console.log("render");
  const [toggle, setToggle] = useState(false);
  const themeColorList = useSelector(getThemeColorList);

  useEffect(() => {}, []);

  function onSwitchChange(boo) {
    if (boo) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function onThemeColor(item) {
    console.log(item);
    document.body.className = item.themeColor;
  }

  return (
    <div className="border border-red-500 p-2 ">
      <div className="br w-fit m-6 p-2 ">
        <Button onClick={() => setToggle((t) => !t)}>切换</Button>
        <Transition in={toggle} className="absolute">
          <div className="bg-[red] w-[100px] h-[100px]"></div>
        </Transition>
      </div>

      <Card className="min-w-[200px] w-fit mb-6 p-3">
        <CardTitle>主题测试</CardTitle>

        <CardContent className="mt-2 p-1 flex">
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" onCheckedChange={onSwitchChange} />
            <Label htmlFor="airplane-mode">明暗切换</Label>
          </div>
          <div className="border p-1 rounded-md ml-4 flex">
            <TooltipProvider delayDuration={250}>
              {themeColorList.map((item) => {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onThemeColor(item)}
                        style={{ "--theme-primary": `hsl(${item.showColor})` }}
                        className="border-[--theme-primary] flex h-9 items-center justify-center rounded-full text-xs w-9"
                      >
                        <span className="h-6 w-6 rounded-full bg-[--theme-primary]"></span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>{item.name}</TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
      <div className="flex mb-4">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="mr-2">按钮</Button>
          </DrawerTrigger>
          <DrawerContent className="px-6 pb-4">
            <DrawerTitle className="mb-2">icon 列表</DrawerTitle>
            <ScrollArea className="h-[50vh] rounded-md border p-4">
              {/* <Suspense
                fallback={
                  <LoadingComponent className="mt-[100px]">
                    {(state) => {
                      console.log(state);
                      return <div>xxxx</div>;
                    }}
                  </LoadingComponent>
                }
              >
                <LazyIcons> </LazyIcons>
              </Suspense> */}
            </ScrollArea>
          </DrawerContent>
        </Drawer>
        <Button className="mr-2" variant="destructive">
          Destructive
        </Button>
        <Button className="mr-2" variant="outline">
          Outline
        </Button>
        <Button className="mr-2" variant="ghost">
          Ghost
        </Button>
        <Button className="mr-2" variant="link">
          Link
        </Button>
      </div>

      <Card className="w-96 mb-4">
        <CardHeader>
          <CardTitle>卡片组件</CardTitle>
          <CardDescription>卡片描述</CardDescription>
        </CardHeader>
        <CardContent>卡片内容</CardContent>
        <CardFooter>
          <p>卡片底部</p>
        </CardFooter>
      </Card>
    </div>
  );
}

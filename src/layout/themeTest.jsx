import { Button } from "@/shadcn-ui/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn-ui/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shadcn-ui/ui/drawer";
import { Switch } from "@/shadcn-ui/ui/switch";
import { Label } from "@/shadcn-ui/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shadcn-ui/ui/tooltip";

import * as lucideDefault from "lucide-react";
import { useEffect, useState } from "react";

const themeColor = ["green"];

// 主题测试 shadcn ui 框架的 主题颜色测试组件
export default function ThemeTest() {
  const [lucideIcon, setLucide] = useState([]);

  useEffect(() => {
    const iconsKeys = Object.keys(lucideDefault);

    const temp = [];
    iconsKeys.forEach((key) => {
      const name = lucideDefault[key].displayName;
      if (!temp.includes(name)) {
        temp.push(name);
      }
    });
    console.log(temp.length);
    setLucide(temp);
    // setLucide(iconsKeys.splice(0, 10));
    // setLucide(iconsKeys);
  }, []);

  function onSwitchChange(boo) {
    if (boo) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function onThemeColor(key) {
    console.log(key)
    // theme-blue
    document.body.className = `theme-blue`;
  }

  return (
    <div className="border border-red-500 p-2">
      <Card className="min-w-[200px] w-fit mb-6 p-3">
        <CardTitle>主题测试</CardTitle>

        <CardContent className="mt-2 p-1 flex">
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" onCheckedChange={onSwitchChange} />
            <Label htmlFor="airplane-mode">明暗切换</Label>
          </div>
          <div className="border border-red-500 ml-4">
            <TooltipProvider>
              {themeColor.map((key) => {
                return (
                  <Tooltip key={key}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={onThemeColor}
                        style={{ "--theme-primary": key }}
                        className="border-[--theme-primary] flex h-9 items-center justify-center rounded-full text-xs w-9"
                      >
                        <span className="h-6 w-6 rounded-full bg-[--theme-primary]"></span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>{key}</TooltipContent>
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
            <div className="h-[36vh] overflow-auto ">
              {(function () {
                function buttonClick(key) {
                  console.log(key);
                }

                return lucideIcon
                  .filter((key) => {
                    return (
                      typeof lucideDefault[key] === "object" &&
                      lucideDefault[key].displayName
                    );
                  })
                  .map((key) => {
                    // const IconAA = lucideDefault[key];
                    const Icon = lucideDefault[key];
                    return (
                      <Button
                        className="mr-2 mb-2"
                        key={key}
                        variant="outline"
                        onClick={() => buttonClick(key)}
                      >
                        <Icon></Icon>
                      </Button>
                    );
                  });
              })()}
            </div>

            {/* <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose> */}
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
        {/* <Button variant="outline" size="icon">
             
        </Button> */}
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

import { Button } from "@/shadcn-ui/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn-ui/ui/card";
import { useEffect, useState } from "react";

// 主题测试 shadcn ui 框架的 主题颜色测试组件
export default function ThemeTest() {
  useEffect(() => {}, []);

  return (
    <div className="border border-red-500 p-2">
      <Button>按钮</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>

      <Card>
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

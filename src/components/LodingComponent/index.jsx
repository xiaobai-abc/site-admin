import { cn } from "@/shadcn-ui/libs/utils.js";
import styles from "./index.module.less";

const { loader } = styles;

// loading 组件加载的样式
// 修改 单纯的占位
export default function LaodingComponent({ className, children }) {
  // const Com = ()=>children('state')
  return (
    <div className={cn("h-fit flex justify-center", className)}>
      {/* loading */}
      {/* <Com></Com> */}
      <div className={cn(loader)}></div>
    </div>
  );
}

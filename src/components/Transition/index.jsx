import { Transition, CSSTransition } from "react-transition-group";
import { cn } from "@/shadcn-ui/libs/utils";
import { useRef } from "react";
import styles from "./index.module.less";

export default function TransitionComponent({
  in: inProp,
  children,
  name,
  className
}) {
  const nodeRef = useRef(null);

  return (
    <Transition nodeRef={nodeRef} in={inProp} timeout={250} unmountOnExit>
      {(state) => {
        // console.log(state, inProp ? "in" : "out");
        return (
          <div
            className={cn(
              "w-fit transition",
              className,
              styles[`${name || "fade"}-${state}-${inProp ? "in" : "out"}`],
              styles[name]
            )}
            ref={nodeRef}
          >
            {children}
          </div>
        );
      }}
    </Transition>
    // <CSSTransition
    //   nodeRef={nodeRef}
    //   in={inProp}
    //   timeout={250}
    //   classNames="fade"
    //   unmountOnExit
    // >
    //   <div
    //     ref={nodeRef}
    //     className="transition"
    //     style={{
    //       transitionDuration: "250ms"
    //     }}
    //   >
    //     hello world
    //   </div>
    // </CSSTransition>
  );
}

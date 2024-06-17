import * as lucideDefault from "lucide-react";
import { Button } from "@/shadcn-ui/ui/button";

const IconsKeys = ((keys) => {
  const result = [];
  keys.forEach((key) => {
    const name = lucideDefault[key].displayName;
    if (!result.includes(name)) {
      result.push(name);
    }
  });
  return result;
})(Object.keys(lucideDefault));

export default function LazyIcons() {
  return (
    <div>
      {(function () {
        function buttonClick(key) {
          console.log(key);
        }

        return IconsKeys.filter((key) => {
          return (
            typeof lucideDefault[key] === "object" &&
            lucideDefault[key].displayName
          );
        }).map((key) => {
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
  );
}

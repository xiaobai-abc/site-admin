import { h } from "vue";

import { Descriptions as ArcoDescriptions } from "@arco-design/web-vue";

export function Descriptions(context) {
  const { data = [], ...prop } = context;
  return h(ArcoDescriptions, {
    data: data,
    size: "large",
    column: {
      sm: "2",
      md: "3",
      lg: "3",
      xl: "4",
      xxl: "6",
    },
    ...prop,
  });
}

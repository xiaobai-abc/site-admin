import { h } from "vue";
import { FormItem, Select, Option } from "@arco-design/web-vue";
import { requiredRules } from "./rules";
/**
 * @Description a-form-item Select
 * @description 执行函数生成select组件 传入需要操作的form对象即可
 * @author 杨鑫
 * @date 2024-04-11 09:44:09
 * @param {Object} formModel form表单对象
 */

export default function (formModel = {}) {
  return (context) => {
    const { label, field, option = [], ...prop } = context;
    const hintLabel = "请输入" + label;
    return h(
      FormItem,
      { ...prop, label, field, rules: requiredRules(hintLabel) },
      {
        default: () =>
          h(
            Select,
            {
              placeholder: hintLabel,
              modelValue: formModel[field],
              "onUpdate:modelValue": (e) =>
                formModel[field] && (formModel[field] = e)
            },
            {
              default: () =>
                option.map((item) =>
                  h(Option, { value: item.value, label: item.label })
                )
            }
          )
      }
    );
  };
}

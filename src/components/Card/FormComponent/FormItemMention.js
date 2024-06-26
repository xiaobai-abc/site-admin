import { h } from "vue";
import { FormItem, Mention } from "@arco-design/web-vue";

/**
 * @Description a-form-item Mention
 * @description 执行函数生成Mention组件 传入需要操作的form对象即可
 * @author 杨鑫
 * @date 2024-04-11 09:44:09
 * @param {Object} formModel form表单对象
 */

export default function (formModel = {}) {
  return (context) => {
    const { label, field, maxLength = 200, placeholder, ...prop } = context;
    const hintLabel = "请填写备注,不超过" + maxLength + '字';
    //
    return h(
      FormItem,
      { ...prop, label, field },
      {
        default: () =>
          h(Mention, {
            style: "border: none; background-color: #f2f3f5;",
            type: "textarea",
            placeholder: placeholder || hintLabel,
            allowClear: true,
            modelValue: formModel[field],
            "onUpdate:modelValue": (e) =>
              e.length < maxLength && (formModel[field] = e),
          }),
      }
    );
  };
}

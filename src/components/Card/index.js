export { default as Card } from "./Card.vue";

// 简化form表单组件
import FormItemInputGenerate from "./FormComponent/FormItemInput.js";
export { default as FormItemInputGenerate } from "./FormComponent/FormItemInput.js";

import FormItemSelectGenerate from "./FormComponent/FormItemSelect.js";
export { default as FormItemSelectGenerate } from "./FormComponent/FormItemSelect.js";

import FormItemMentionGenerate from "./FormComponent/FormItemMention.js";
export { default as FormItemMentionGenerate } from "./FormComponent/FormItemMention.js";

export function publicFormItemGenerate(formModel = {}) {
  const FormItemInput = FormItemInputGenerate(formModel);
  const FormItemSelect = FormItemSelectGenerate(formModel);
  const FormItemMention = FormItemMentionGenerate(formModel);
  return {
    FormItemInput,
    FormItemSelect,
    FormItemMention,
  };
}

// 简化 布局组件
export { Descriptions } from "./LayoutComponent/Descriptions.js";

// 表单校验 必输入
export { requiredRules } from "./FormComponent/rules.js";

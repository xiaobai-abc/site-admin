// 生成form校验规则

export const requiredRules = (message) => [
  { required: true, message: message || "请输入" },
];

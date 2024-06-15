import { useRef, useState } from "react";
import styles from "./index.module.less";
import { setAuthCache } from "@/utils/auth/index.js";

import { useNavigate } from "react-router-dom";
// import { postLogin } from "@/api/userApi.js";

function LoginPage() {
  const naviagate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initFormData = {
    username: "admin",
    password: "123456",
  };
  const formRef = useRef();

  async function onSubmit(v) {
    setLoading(true);
    return;
    // 登录
    const resp = await postLogin(v);
    if (resp && resp.code == 200) {
      setAuthCache(resp.data.token);
      naviagate("/");
    } else {
      if (formRef.current) {
        formRef.current.setFields({
          username: {
            error: {
              message: "账号或者密码错误",
            },
          },
          password: {
            error: {
              message: "账号或者密码错误",
            },
          },
        });
      }
      Message.error(resp?.message || "登录失败");
    }
    setLoading(false);
  }

  return <div className={styles["loginLayout"]}>login</div>;
}

export default LoginPage;

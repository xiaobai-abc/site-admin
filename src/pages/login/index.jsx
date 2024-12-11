import {
  Form,
  Input,
  Button,
  Message,
  Typography
} from "@arco-design/web-react";
import { IconUser, IconLock } from "@arco-design/web-react/icon";
import { useRef, useState } from "react";
import styles from "./index.module.less";
import { setAuthCache } from "@/utils/auth/index.js";

import { useNavigate } from "react-router-dom";
import { postLogin } from "@/api/userApi.js";

import axios from "@/api/index.js";

const FormItem = Form.Item;

function LoginPage() {
  const naviagate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const initFormData = {
    username: "admin",
    password: "336699"
  };

  function onSubmit(v) {
    setLoading(true);

    postLogin(v)
      .then((resp) => {
        if (resp && resp.code == 200) {
          setAuthCache(resp.data.token);
          naviagate("/");
        } else {
          if (formRef.current) {
            formRef.current.setFields({
              username: {
                error: {
                  message: "账号或者密码错误"
                }
              },
              password: {
                error: {
                  message: "账号或者密码错误"
                }
              }
            });
          }
          Message.error(resp?.message || "登录失败");
        }
      })
      .catch((err) => {
        Message.error(err?.message || "登录失败");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className={styles["loginLayout"]}>
      <div className={styles["loginBox"]}>
        <Form
          size="large"
          style={{ width: 320 }}
          autoComplete="off"
          wrapperCol={{ span: 24 }}
          ref={formRef}
          initialValues={initFormData}
          onSubmit={onSubmit}
        >
          <FormItem>
            <Typography.Title heading={6}>欢迎登录</Typography.Title>
          </FormItem>
          <FormItem
            style={{ marginBottom: 20 }}
            field="username"
            rules={[{ required: true, message: "请填写用户账号" }]}
          >
            <Input prefix={<IconUser />} placeholder="请输入您的账号" />
          </FormItem>
          <FormItem
            style={{ marginBottom: 20 }}
            field="password"
            rules={[{ required: true, message: "请填写用户密码" }]}
          >
            <Input.Password
              prefix={<IconLock />}
              placeholder="请输入您的密码"
            />
          </FormItem>
          <FormItem>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span style={{ fontSize: "12px" }}>管理部分没有注册</span>
              <Button
                className={styles.submitBtn}
                htmlType="submit"
                loading={loading}
              >
                登录
              </Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;

import { useEffect, useState } from "react";
import {
  Card,
  Space,
  Button,
  Typography,
  Descriptions
} from "@arco-design/web-react";
import { homeSetting } from "./modules/api";

import styles from "./index.module.less";

const settingMap = new Map([["title", "网站标题"]]);

export default function Setting() {
  const [settingData, setSetting] = useState([]);

  useEffect(() => {
    onGetHomeData();
  }, []);

  function onEditSetting() {}

  function onGetHomeData() {
    homeSetting().then((data) => {
      const settingData = Object.keys(data).map((key) => {
        return {
          label: settingMap.get(key),
          value: data[key]
        };
      });
      setSetting(settingData);
    });
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Card
          style={{ marginBottom: 20, borderRadius: 2, width: "100%" }}
          hoverable
          bordered={false}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography.Title heading={6} style={{ margin: 0 }}>
              网站设置
            </Typography.Title>
            <Button type="primary" onClick={onEditSetting}>
              编辑
            </Button>
          </div>
          {JSON.stringify(settingData)}
          <div className={styles.cardView}>
            <Descriptions
              column={1}
              data={settingData}
              style={{ marginBottom: 10 }}
              labelStyle={{ paddingRight: 20 }}
            ></Descriptions>
          </div>
        </Card>
      </div>
    </div>
  );
}

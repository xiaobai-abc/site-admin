import { useEffect, useState } from "react";
import {
  Card,
  Space,
  Button,
  Typography,
  Descriptions,
  Image
} from "@arco-design/web-react";

import { homeSetting } from "./modules/api";
import styles from "./index.module.less";

const settingMap = new Map([
  ["title", "网站标题"],
  ["image", "图片"]
]);

export default function Setting() {
  const [settingData, setSetting] = useState([]);

  useEffect(() => {
    onGetHomeData();
  }, []);

  function onEditSetting() {}

  function onGetHomeData() {
    homeSetting().then((data) => {
      const settingData = Object.keys(data)
        .map((key) => {
          const ele = data[key];
          const label = settingMap.get(key);
          if (!label) return null;
          switch (typeof ele) {
            case "string":
              return {
                label: label,
                value: ele
              };
            case "object":
              return {
                label: label,
                value: (
                  <Image.PreviewGroup infinite>
                    <Space>
                      {ele.map((src, index) => (
                        <Image
                          key={index}
                          src={src}
                          width={200}
                          alt={`lamp${index + 1}`}
                        />
                      ))}
                    </Space>
                  </Image.PreviewGroup>
                )
              };

            default:
              return null;
          }
        })
        .filter((item) => item);
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

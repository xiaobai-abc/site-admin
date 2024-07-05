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

const settingMap = new Map([
  ["title", "网站标题"],
  ["image", "图片"]
]);

export default function TestPage() {
  const [settingData, setSetting] = useState([]);

  useEffect(() => {
    onGetHomeData();
  }, []);

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
      <div>
        <Descriptions
          column={1}
          data={settingData}
          style={{ marginBottom: 10 }}
          labelStyle={{ paddingRight: 20 }}
        ></Descriptions>
      </div>
    </div>
  );
}

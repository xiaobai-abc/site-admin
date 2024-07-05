import { useEffect, useState } from "react";
import { Card, Space, Button, Typography } from "@arco-design/web-react";

export default function HomeSetting() {
  function onEditSetting() {}

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
              首页设置
            </Typography.Title>
            <Button type="primary" onClick={onEditSetting}>
              编辑
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

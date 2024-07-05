import { useEffect, useState } from "react";
import {
  Card,
  Space,
  Button,
  Typography,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Message
} from "@arco-design/web-react";
import axios from "@/api";

const FormItem = Form.Item;
const Option = Select.Option;

const mediaType = [
  { label: "视频", value: "video" },
  { label: "图片", value: "image" },
  { label: "文本", value: "text" }
];

const columns = [
  {
    title: "ID",
    dataIndex: "id"
  },
  {
    title: "标题",
    dataIndex: "title",
    width: 60
  },
  {
    title: "文案",
    dataIndex: "describe",
    width: 340
  },
  {
    title: "类型",
    dataIndex: "type",
    render: (_, record) => {
      return mediaType.find((item) => item.value === record.type).label;
    }
  },
  {
    title: "内容",
    dataIndex: "media"
  },
  {
    title: "操作",
    dataIndex: "op"
    // render: (_, record) => (
    //   <Button
    //     onClick={() => {
    //       console.log(  record);
    //     }}
    //     type="primary"
    //     status="danger"
    //   >
    //     Delete
    //   </Button>
    // )
  }
];

// 文案 设置
export default function WritePage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableParams, setTableParams] = useState({
    page: 1,
    pageSize: 10
  });
  const [total, setTotal] = useState(0);
  const [addVisible, setAddVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/write", tableParams)
      .then((resp) => {
        setTableData(resp.data.list);
        setTotal(resp.data.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tableParams]);

  function addWrite() {
    setAddVisible(true);
  }

  function onModalOk() {
    form.validate().then((values) => {
      // values
      setSubmitLoading(true);
      axios
        .post("/write/add", values)
        .then((resp) => {
          console.log(resp);
          if (resp && resp.code == 200) {
            Message.success("添加成功");
            setAddVisible(false);
            setTableParams({ ...tableParams });
            return;
          }
          return Promise.reject(resp?.message || "操作失败");
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    });
  }

  return (
    <div>
      <Card
        style={{ marginBottom: 20, borderRadius: 2, width: "100%" }}
        hoverable
        bordered={false}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space
            align="baseline"
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            <Typography.Title heading={6} style={{ margin: 0 }}>
              文案设置
            </Typography.Title>
            <Button type="primary" onClick={addWrite}>
              添加文案
            </Button>
          </Space>

          <Table
            columns={columns}
            data={tableData}
            loading={loading}
            pagination={{
              current: tableParams.page,
              pageSize: tableParams.pageSize,
              total: total,
              sizeCanChange: true,

              onChange(page, pageSize) {
                setTableParams({ ...tableParams, page, pageSize });
              }
            }}
            rowKey="id"
          />
        </Space>
      </Card>
      <Modal
        title="添加文案"
        visible={addVisible}
        onOk={onModalOk}
        onCancel={() => setAddVisible(false)}
        confirmLoading={submitLoading}
      >
        <Form
          form={form}
          initialValues={{ title: "" }}
          autoComplete="off"
          layout="vertical"
        >
          <FormItem label="标题" field="title">
            <Input placeholder="标题不是必输入" />
          </FormItem>
          <FormItem label="类型" field="type" rules={[{ required: true }]}>
            <Select placeholder="选择类型">
              {[...mediaType].map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="媒体地址" field="media" rules={[{ required: true }]}>
            <Input placeholder="输入媒体地址" />
          </FormItem>
          <FormItem label="文案" field="describe" rules={[{ required: true }]}>
            <Input placeholder="输入文案" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

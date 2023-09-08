import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Transfer,
  Row,
  Col,
  Divider,
  Cascader,
  Tooltip,
} from "antd";
import NumericInput from "../NumericInput/NumericInput";

const { Option } = Select;

const { SHOW_CHILD } = Cascader;

const layout = {
  // layout:'vertical',
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};
const mockData = Array.from({
  length: 20,
}).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

// const cascaderData = [
//   {
//     value: "zhejiang",
//     label: "Citric Acid Mix Ingredients",
//     children: [
//       {
//         value: "hangzhou",
//         label: "N1232345345 -N1234126",
//       },
//     ],
//   },
//   {
//     value: "jiangsu",
//     label: "Jiangsu",
//     children: [
//       {
//         value: "nanjing",
//         label: "Nanjing",
//       },
//     ],
//   },
// ];

const NewRecipeForm = ({
  rows,
  open,
  setOpen,
  selected,
  setSelected,
  materials,
  materialClasses,
  processClasses,
  requiredProcessClasses,
}) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [batchSizeNom, setBatchSizeNom] = useState("");
  const [batchSizeMin, setBatchSizeMin] = useState("");
  const [batchSizeMax, setBatchSizeMax] = useState("");
  const [submittable, setSubmittable] = useState(false);
  const [mainBatchSelect, setMainBatchSelect] = useState(null);
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields().then(
      (values) => {
        console.log(values);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  const cascaderData = materialClasses.map((materialClass) => {
    return {
      value: materialClass.Name,
      label: materialClass.Name,
      children: materials
        .filter((material) => materialClass.ID === material.MaterialClass_ID)
        .map((material) => {
          return {
            value: material.Name,
            label: material.Name,
            ...material,
          };
        }),
      disabled:
        materials.filter(
          (material) => materialClass.ID === material.MaterialClass_ID
        ).length === 0,
    };
  });

  const availableTransferData = processClasses.map((processClass) => ({
    key: processClass.ID,
    title: processClass.Name,
    description: processClass.Description,
  }));

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log(nextTargetKeys, processClasses);
    console.log(
      processClasses.filter((processClass) => processClass.ID in nextTargetKeys)
    );
    setMainBatchSelect(
      processClasses
        .filter((processClass) => {
          return nextTargetKeys.includes(processClass.ID);
        })
        .map((processClass) => {
          return {
            key: processClass.ID,
            label: (
              <Tooltip title={processClass.Description}>
                {processClass.Name}
              </Tooltip>
            ),
            value: processClass.Name,
          };
        })
    );
    setTargetKeys(nextTargetKeys);
  };
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onFinish = (values) => {
    console.log(values);
  };
  const onChangeCasc = (value) => {
    console.log(value);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: "Hello world!", gender: "male" });
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    form.submit((e) => console.log(e));
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    console.log("Test");
  }, []);

  return (
    <Modal
      title="New Recipe"
      open={open}
      onOk={handleOk}
      okText={"Submit"}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      width={1000}
      okButtonProps={{
        disabled: !submittable,
      }}
    >
      {submittable}
      <Form form={form} onFinish={onFinish} {...layout}>
        <Row gutter={[16, 16]} justify={"space-around"}>
          <Col span={10}>
            <Divider orientation="left">Recipe Information</Divider>
            <Form.Item
              name="RID"
              label="Recipe ID"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                rows={2}
                placeholder="maxLength is 120"
                maxLength={120}
              />
            </Form.Item>
            <Form.Item
              name="Material"
              label="Material"
              rules={[{ required: true }]}
            >
              <Cascader
                options={cascaderData}
                onChange={onChangeCasc}
                showSearch
                showCheckedStrategy={SHOW_CHILD}
              />
            </Form.Item>
            <Divider orientation="left">Batch Size</Divider>
            <Form.Item
              name="Nominal"
              label="Nominal"
              rules={[{ required: true }]}
            >
              <InputNumber
                value={batchSizeNom}
                onChange={setBatchSizeNom}
                style={{ width: 100 }}
              />
            </Form.Item>
            <Form.Item name="Min" label="Min" rules={[{ required: true }]}>
              <InputNumber
                value={batchSizeMin}
                onChange={setBatchSizeMin}
                style={{ width: 100 }}
              />
            </Form.Item>
            <Form.Item name="Max" label="Max" rules={[{ required: true }]}>
              <InputNumber
                value={batchSizeMax}
                onChange={setBatchSizeMax}
                style={{ width: 100 }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Divider orientation="left">Required ProcessClasses</Divider>
            <Form.Item
              name="Required Process Classes"
              rules={[{ required: true }]}
            >
              <Transfer
                onChange={onChange}
                onSelectChange={onSelectChange}
                render={(item) => (
                  <Tooltip title={item.description}>{item.title}</Tooltip>
                )}
                dataSource={availableTransferData}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                titles={["Available", "Selected"]}
                showSelectAll={false}
                listStyle={{
                  width: 300,
                  height: 300,
                }}
              />
            </Form.Item>
            <Form.Item
              name="Main Proccess Class"
              label="Main Process Class"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: 200 }}
                allowClear
                options={mainBatchSelect}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewRecipeForm;

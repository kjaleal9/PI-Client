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
  Space,
  message,
} from "antd";
import SubmitButton from "../SubmitButton/SubmitButton";
import dayjs from "dayjs";
import { addRecipe } from "../../Requests/RecipeSearch";

const { SHOW_CHILD } = Cascader;

const layout = {
  // layout:'vertical',
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};

const NewRecipeForm = ({
  rows,
  open,
  setOpen,
  selected,
  setSelected,
  materials,
  materialClasses,
  processClasses,
  equipment,
  refreshTable,
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
  const [mainBatchSelect, setMainBatchSelect] = useState(null);

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
    addRecipe(processClasses, values)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        refreshTable();
        setSelectedKeys([]);
        setTargetKeys([]);
        setOpen(false);
        message.success("Recipe added");
      });
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
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <Modal
      title="New Recipe"
      open={open}
      onOk={handleOk}
      okText={"Submit"}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      width={1000}
      footer={null}
      destroyOnClose={true}
      afterClose={() => console.log("closed")}
    >
      {console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"))}
      <Form form={form} onFinish={onFinish} {...layout} preserve={false}>
        <Row gutter={[16, 16]} justify={"space-around"}>
          <Col span={10}>
            <Divider orientation="left">Recipe Information</Divider>
            <Form.Item
              name="RID"
              label="Recipe ID"
              hasFeedback
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!rows.map((recipe) => recipe.RID).includes(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Recipe ID already exists!")
                    );
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea
                rows={2}
                placeholder="maxLength is 120"
                maxLength={120}
              />
            </Form.Item>
            <Form.Item
              name="material"
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
              name="nominal"
              label="Nominal"
              // hasFeedback
              dependencies={["min", "max"]}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      getFieldValue("max") >= value &&
                      getFieldValue("min") <= value
                    ) {
                      return Promise.resolve();
                    }
                    if (value > getFieldValue("max")) {
                      return Promise.reject(
                        new Error(
                          "Nominal must be less than or equal to the max"
                        )
                      );
                    }
                    if (value < getFieldValue("min")) {
                      return Promise.reject(
                        new Error(
                          "Nominal must be greater than or equal to the min"
                        )
                      );
                    }
                  },
                }),
              ]}
            >
              <InputNumber
                value={batchSizeNom}
                onChange={setBatchSizeNom}
                style={{ width: 100 }}
                controls={false}
              />
            </Form.Item>
            <Form.Item
              name="min"
              label="Min"
              // hasFeedback
              dependencies={["max"]}
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue("max") >= value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Min must be less than or equal to the max")
                    );
                  },
                }),
              ]}
            >
              <InputNumber
                value={batchSizeMin}
                onChange={setBatchSizeMin}
                style={{ width: 100 }}
                controls={false}
              />
            </Form.Item>
            <Form.Item
              name="max"
              label="Max"
              // hasFeedback
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                value={batchSizeMax}
                onChange={setBatchSizeMax}
                style={{ width: 100 }}
                controls={false}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Divider orientation="left">Required ProcessClasses</Divider>
            <Form.Item
              name="requiredProcessClasses"
              rules={[
                {
                  required: true,
                  message: "Must select at least one process class",
                },
              ]}
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
              name="mainProcessClass"
              label="Main Process Class"
              rules={[
                {
                  required: true,
                  message: "Must select at least one process class",
                },
              ]}
            >
              <Select
                style={{ width: 200 }}
                allowClear
                options={mainBatchSelect}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                ...layout.wrapperCol,
                offset: 16,
              }}
            >
              <Space>
                <Button onClick={handleCancel}>Cancel</Button>
                <SubmitButton form={form} />
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewRecipeForm;

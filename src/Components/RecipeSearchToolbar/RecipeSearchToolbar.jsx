import React, { useState } from "react";

import {
  Space,
  Switch,
  Radio,
  Button,
  Popconfirm,
  Divider,
  Tooltip,
  Input,
  message,
} from "antd";

import {
  PlusSquareOutlined,
  CheckCircleOutlined,
  SolutionOutlined,
  StopOutlined,
  CopyOutlined,
  EditOutlined,
  ImportOutlined,
  ExportOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { deleteRecipe } from "../../Requests/RecipeSearch";

const RecipeSearchToolbar = ({
  anyRowSelected,
  setMode,
  setOpen,
  handleDelete,
  filter,
  setFilter,
  selected,
  refreshTable,
}) => {
  const [status, setStatus] = useState(null);

  const handleStatusChange = (e) => {
    console.log(e);
    let value = e.target.value;
    console.log(value === status);
    if (value === status) {
      value = null;
      console.log("match");
      setStatus(null);
    } else {
      setStatus(value);
    }

    value
      ? setFilter({ ...filter, status: value })
      : setFilter({ ...filter, status: "" });
  };

  const handleShowAllChange = (e) => {
    setFilter({ ...filter, showAll: !e });
  };

  const handleSearch = (event) => {
    setFilter({ ...filter, search: event.target.value.toLowerCase() });
  };

  const handleNewRecipe = () => setOpen(true);

  const confirm = () => {
    const { RID, Version } = selected;
    deleteRecipe(RID, Version)
      .then((response) => response.json())
      .then((data) => {
        refreshTable();
        message.success("Recipe Deleted");
      });
  };

  return (
    <Space split={<Divider type="vertical" />}>
      <Input.Search
        placeholder="Search for a recipe"
        style={{ width: 200 }}
        onChange={(event) => handleSearch(event)}
      />
      <Tooltip title="Show all or latest versions">
        <Switch
          defaultChecked
          checkedChildren="Latest"
          unCheckedChildren="All"
          onChange={handleShowAllChange}
        />
      </Tooltip>
      <Radio.Group
        value={status}
        optionType="button"
        buttonStyle="solid"
        onClick={(e) => console.log(e)}
      >
        <Tooltip title="Approved Recipes">
          <Radio.Button
            value="Approved"
            onClick={handleStatusChange}
            type="primary"
          >
            <CheckCircleOutlined />
          </Radio.Button>
        </Tooltip>
        <Tooltip title="Registered Recipes">
          <Radio.Button
            value="Registered"
            onClick={handleStatusChange}
            type="primary"
          >
            <SolutionOutlined />
          </Radio.Button>
        </Tooltip>
        <Tooltip title="Obsolete Recipes">
          <Radio.Button
            value="Obsolete"
            onClick={handleStatusChange}
            type="primary"
          >
            <StopOutlined />
          </Radio.Button>
        </Tooltip>
      </Radio.Group>
      <Space>
        <Tooltip title="New Recipe">
          <Button
            icon={<PlusSquareOutlined />}
            type="primary"
            onClick={handleNewRecipe}
          ></Button>
        </Tooltip>
        <Tooltip title="Copy Recipe">
          <Button
            icon={<CopyOutlined />}
            type="primary"
            disabled={selected === ""}
          ></Button>
        </Tooltip>
        <Tooltip title="Edit Recipe">
          <Button
            icon={<EditOutlined />}
            type="primary"
            disabled={selected === ""}
            onClick={refreshTable}
          ></Button>
        </Tooltip>
        <Tooltip title="Delete Recipe" disabled={selected === ""}>
          <Popconfirm
            title="Are you sure delete this recipe?"
            okText="Yes"
            cancelText="No"
            disabled={selected === ""}
            onConfirm={confirm}
            onOpenChange={() => console.log("open change")}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              disabled={selected === ""}
            ></Button>
          </Popconfirm>
        </Tooltip>
      </Space>
      <Space>
        <Button icon={<ImportOutlined />}>Import</Button>
        <Button icon={<ExportOutlined />}>Export</Button>
      </Space>
    </Space>
  );
};

export default RecipeSearchToolbar;

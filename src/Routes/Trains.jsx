import React, { useState, useEffect } from "react";
import { Card, Table, Row, Col, Space } from "antd";
import { getTrains } from "../Requests/Trains";

// Create a flowchart to visually show trains

const Trains = () => {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  function refreshTable() {
    function getAllData() {
      return Promise.all([getTrains()]);
    }

    getAllData()
      .then(([allTrains]) => {
        setRows(allTrains);
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    refreshTable();
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "Train ID",
      dataIndex: "ID",
      key: "ID",
      sorter: (a, b) => a.ID - b.ID,
      sortOrder: sortedInfo.columnKey === "ID" ? sortedInfo.order : null,
      ellipsis: true,
      width: "15ch",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      sorter: (a, b) => a.Name.length - b.Name.length,
      sortOrder: sortedInfo.columnKey === "Name" ? sortedInfo.order : null,
      ellipsis: true,
      width: "30ch",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      ellipsis: true,
      width: "40ch",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Copy</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const onSelectChange = (record) => {
    setSelected(record);
    setSelectedRowKeys([record.key]);
  };
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col sm={24} md={12}>
          <Card title="Trains" style={{ height: "90vh" }}>
            <Table
              size={"small"}
              loading={loading}
              columns={columns}
              dataSource={rows}
              onChange={handleChange}
              pagination={{
                total: rows.length,
                showTotal: (total) => `Total ${total} items`,
                defaultPageSize: 17,
                // pageSizeOptions: [5, 10, 15],
                defaultCurrent: 1,
                // showSizeChanger: true,
              }}
              onRow={(record) => {
                return {
                  style: { cursor: "pointer" },
                  onClick: () => {
                    onSelectChange(record);
                  },
                };
              }}
              rowSelection={{
                type: "radio",
                selectedRowKeys,
                getCheckboxProps: () => {
                  return {
                    style: {
                      display: "none",
                    },
                  };
                },
                onChange: onSelectChange,
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Trains;

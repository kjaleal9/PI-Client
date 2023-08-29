import React, { useState, useEffect } from "react";
import { Card, Table, Col } from "antd";

const ErrorLog = ({ label, value, onChange }) => {
  const [errorLog, setErrorLog] = useState([]);

  const loadData = () => {
    const getErrors = () =>
      fetch(`${process.env.REACT_APP_API_URL}/errors`).then((response) =>
        response.json()
      );

    function getAllData() {
      return Promise.all([getErrors()]);
    }

    getAllData()
      .then(([errors]) => {
        setErrorLog(errors);
      })
      .catch((err) => console.log(err, "uih"));
  };
  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      title: "Log ID",
      dataIndex: "LogID",
    },
    {
      title: "Error Value",
      dataIndex: "ErrorValue",
    },
    {
      title: "Error Message",
      dataIndex: "ErrorMessage",
    },
    {
      title: "Error Time",
      dataIndex: "ErrorTime",
    },
    {
      title: "Object Name",
      dataIndex: "ObjectName",
    },
    {
      title: "Username",
      dataIndex: "UserName",
    },
  ];

  return (
    <Col sm={24} md={24} lg={24} xl={24}>
      <Card title="Error Log">
        <Table
          size={"small"}
          columns={columns}
          dataSource={errorLog}
          pagination={{
            total: errorLog.length,
            showTotal: (total) => `Total ${total} items`,
            defaultPageSize: 10,
            pageSizeOptions: [5, 10, 15],
            defaultCurrent: 1,
            showSizeChanger: true,
          }}
        />
      </Card>
    </Col>
  );
};

export default ErrorLog;

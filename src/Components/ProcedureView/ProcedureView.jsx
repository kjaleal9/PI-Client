import React from "react";
import { Table } from "antd";

const ProcedureView = (props) => {
  const { procedure } = props;

  const columns = [
    {
      title: "Step",
      dataIndex: "Step",
      width: 61,
    },
    {
      title: "Message",
      dataIndex: "Message",
    },
  ];

  return (
    <>
      <Table
        size="small"
        pagination={false}
        rowKey="ID"
        columns={columns}
        dataSource={procedure}
        scroll={{ y: "40vh" }}
       
      />
    </>
  );
};

export default React.memo(ProcedureView);

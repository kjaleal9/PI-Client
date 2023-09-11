import React from "react";
import { Button, Table, Row, Col, Divider } from "antd";
import { Link } from "react-router-dom";

const ProcedureView = (props) => {
  const { procedure, selected } = props;

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
    <Row gutter={[8, 8]} justify={"center"}>
      <Col span={24}>
        <Table
          size="small"
          pagination={false}
          rowKey="ID"
          columns={columns}
          dataSource={procedure}
          scroll={{ y: 570 }}
        />
      </Col>
      <Col span={4}>
        <Button type="link">
          <Link to={`/procedure/${selected.RID}/${selected.Version}`}>
            Edit Procedure
          </Link>
        </Button>
      </Col>
    </Row>
  );
};

export default React.memo(ProcedureView);

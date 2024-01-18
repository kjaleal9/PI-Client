import React, { useState, useEffect } from "react";
import { Card, Table, Col, Row, Divider, Select } from "antd";

const BatchTimes = ({ label, value, onChange }) => {
  const [batchTimes, setBatchTimes] = useState([]);
  const [batchSelect, setBatchSelect] = useState([]);

  const loadData = () => {
    const getBatchTimes = () =>
      fetch(`${process.env.REACT_APP_API_URL}/batch-times`).then((response) =>
        response.json()
      );

    function getAllData() {
      return Promise.all([getBatchTimes()]);
    }

    getAllData()
      .then(([batchTimes]) => {
        // const calculatedBatchTimes = batchTimes.map((batch) => {
        //   const volPerSec = batch.batchVolume / batch.batchTime;
        //   return {
        //     ...batch,
        //     volPerSec: volPerSec,
        //   };
        // });
        // setBatchTimes(calculatedBatchTimes);
        setBatchTimes(batchTimes);
      })
      .catch((err) => console.log(err, "uih"));
  };
  useEffect(() => {
    loadData();
  }, []);

  const batchTimeColumns = [
    {
      title: "Batch ID",
      dataIndex: "batchID",
    },
    {
      title: "Batch Volume",
      dataIndex: "batchVolume",
    },
    {
      title: "Batch Time",
      dataIndex: "batchTime",
    },
    { title: "Vol/Sec", dataIndex: "volPerSec" },
    {
      title: "Phase 1 Time",
      dataIndex: "phase1Time",
    },
    {
      title: "Phase 1 Time %",
      dataIndex: "phase1Percent",
    },
    {
      title: "Phase 2 Time",
      dataIndex: "phase2Time",
    },
    {
      title: "Phase 2 Time %",
      dataIndex: "phase2Percent",
    },
    {
      title: "Phase 3 Time",
      dataIndex: "phase3Time",
    },
    {
      title: "Phase 3 Time %",
      dataIndex: "phase3Percent",
    },
  ];

  return (
    <Col>
      <Row gutter={[12, 12]}>
        <Col sm={24} md={24} lg={24} xl={24}>
          <Card title="Recipe A">
            <Table
              size={"small"}
              columns={batchTimeColumns}
              dataSource={batchTimes}

              //   pagination={{
              //     total: batchTimes.length,
              //     showTotal: (total) => `Total ${total} items`,
              //     defaultPageSize: 10,
              //     pageSizeOptions: [5, 10, 15],
              //     defaultCurrent: 1,
              //     showSizeChanger: true,
              //   }}
            />
          </Card>
        </Col>
        {/* <Col sm={24} md={24} lg={8} xl={8}>
          <Card title="Phase Averages">
            <Select
              dropdownStyle={{
                zIndex: 10000,
              }}
              style={{ width: "100%" }}
              value={batchSelect}
              onChange={(batch) => {
                setBatchSelect(batch);
              }}
              options={batchTimes.map((batch) => batch["Batch ID"])}
            />
            <Divider />
            <Table
              size={"small"}
              columns={batchAverageColumns}
              dataSource={batchTimes}
              //   pagination={{
              //     total: batchTimes.length,
              //     showTotal: (total) => `Total ${total} items`,
              //     defaultPageSize: 10,
              //     pageSizeOptions: [5, 10, 15],
              //     defaultCurrent: 1,
              //     showSizeChanger: true,
              //   }}
            />
          </Card>
        </Col> */}
      </Row>
    </Col>
  );
};

export default BatchTimes;

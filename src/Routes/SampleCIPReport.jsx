import React, { useState, useEffect, useRef, PureComponent } from "react";
import { timeParse, dateParse, timeFormat, interpolateNumber } from "d3";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Timeline,
  Badge,
  Descriptions,
  Tag,
  Divider,
  Table,
  Space,
  Statistic,
  Typography,
} from "antd";
import {
  ClockCircleOutlined,
  CheckOutlined,
  LockFilled,
  PlayCircleFilled,
  CheckCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

import CustomLineChart from "../Components/CustomLineChart/CustomLineChart";
import ApexDonut from "../Components/ApexDonut";

const { Countdown } = Statistic;

const parseTime = timeParse("%Y-%m-%dT%H:%M:%S.%L");
const parseTime2 = timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

function formatChart(data, processParameterName) {
  const formattedData = data.map((d) => {
    return {
      x: moment(parseTime2(d.x)).valueOf(),
      y: d.y,
      device: processParameterName,
    };
  });
  return formattedData;
}
const stepGroupHead = {
  ID: 4054,
  stepGroupName: "Pre-Rinse",
  startTime: "07/13/2023 1:23:46 PM",
  startStep: 100,
  endStep: 100,
  duration: "0:17:19",
};

const stepGroupTitle = [
  {
    key: "1",
    label: "Start Time",
    span: 2,
    children: stepGroupHead.startTime,
  },
  {
    key: "2",
    label: "Start Step",
    children: stepGroupHead.startStep,
  },
  {
    key: "3",
    label: "End Step",
    children: stepGroupHead.endStep,
  },
  {
    key: "4",
    label: "Duration",
    children: stepGroupHead.duration,
  },
];

const data = [
  {
    name: "Return Conductivity",
    startValue: 0,
    endValue: 0,
    difference: 0,
    min: 0,
    max: 0,
    average: 0,
    units: "mS/cm",
  },
  {
    name: "Return Temprature",
    startValue: 81.05,
    endValue: 75.62,
    difference: -5.43,
    min: 74.72,
    max: 81.05,
    average: 76.51,
    units: "F",
  },
  {
    name: "Supply Flow",
    startValue: 0,
    endValue: 0,
    difference: 0,
    min: 0,
    max: 273.18,
    average: 183.87,
    units: "gpm",
  },
  {
    name: "Supply Temperature",
    startValue: 83.67,
    endValue: 74.89,
    difference: -8.78,
    min: 74.76,
    max: 83.67,
    average: 76.26,
    units: "F",
  },
];

const columns = [
  {
    title: "Process Parameter",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Start Value",
    dataIndex: "startValue",
  },
  {
    title: "End Value",
    dataIndex: "endValue",
  },
  {
    title: "Difference",
    dataIndex: "difference",
  },
  {
    title: "Min",
    dataIndex: "min",
  },
  {
    title: "Max",
    dataIndex: "max",
  },
  {
    title: "Average",
    dataIndex: "average",
  },
];

const items = [
  {
    key: "1",
    label: "CIP ID",
    children: "30844635420",
  },
  {
    key: "2",
    label: "Circuit Name",
    children: "CL800302",
  },
  {
    key: "3",
    label: "CIP Line",
    children: "CL8003",
  },
  {
    key: "4",
    label: "CIP Program",

    children: "Caustic Disinfection",
  },
  {
    key: "5",
    label: "Start Time",
    children: "2018-04-24 18:00:00",
  },
  {
    key: "6",
    label: "EndTime",

    children: "2019-04-24 18:00:00",
  },

  {
    key: "7",
    label: "Started By",
    children: "Supervisor",
  },
  {
    key: "8",
    label: "Ended By",
    children: "System",
  },
  {
    key: "9",
    label: "Result",
    span: 2,
    children: (
      <Tag icon={<CheckCircleOutlined />} color="success">
        Cleaned
      </Tag>
    ),
  },
  {
    key: "10",
    label: "Included Units",
    children: (
      <>
        R0110 <Divider type="vertical" />
        L1121 <Divider type="vertical" />
        R0110 <Divider type="vertical" />
        R0110 <Divider type="vertical" />
        R0110 <Divider type="vertical" />
      </>
    ),
  },
];

const MultipleLineCharts = () => {
  const [ppData, setPpData] = useState(null);
  const [selectedPie, setSelectedPie] = useState(null);
  const [value, setValue] = useState("Home");
  useEffect(() => {
    function getChartData() {
      return fetch(`${process.env.REACT_APP_API_URL}/sampleCIPReport`).then(
        (response) => response.json()
      );
    }
    getChartData().then((data) => {
      const pp1 = formatChart(data["FT81160"], "FT81160");
      const pp2 = formatChart(data["CT81182"], "CT81182");
      const pp3 = formatChart(data["TT81182"], "TT81182");
      setPpData([...pp1, ...pp2, ...pp3]);
    });
  }, []);

  useEffect(() => {
    // Perform your custom logic here based on the selected element or event
    if (selectedPie === null) {
      setValue("Home");
      console.log("Home");
    } else {
      console.log(selectedPie);
      setValue(selectedPie);
    }

    // ... your custom logic ...
  }, [selectedPie]);

  const onFinish = () => {
    console.log("finished!");
  };
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  return (
    <Row gutter={[16, 16]}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Col span={24}>
            <Card title="General Info">
              <Descriptions
                column={2}
                layout="horizontal"
                // bordered
                items={items}
                size="small"
              />
              {/* <Descriptions
            column={3}
            title="General Info"
            layout="vertical"
            bordered
            items={items}
            size="small"
          /> */}
            </Card>
          </Col>
        </Col>
        <Col span={8}>
          <Col span={24}>
            <Card title="General Info">
              <Descriptions
                column={2}
                layout="horizontal"
                // bordered
                items={items}
                size="small"
              />
              {/* <Descriptions
            column={3}
            title="General Info"
            layout="vertical"
            bordered
            items={items}
            size="small"
          /> */}
            </Card>
          </Col>
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Active"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Idle"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: "#cf1322" }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Uptime"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ClockCircleOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Col span={12}>
                  <Countdown
                    title="Countdown"
                    value={deadline}
                    format="HH:mm:ss:SSS"
                    onFinish={onFinish}
                  />
                </Col>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Col span={24}>
            <Card title="Step Group Info">
              <Table
                title={() => (
                  <Descriptions
                    column={5}
                    title={stepGroupHead.stepGroupName}
                    layout="horizontal"
                    bordered={false}
                    items={stepGroupTitle}
                    size="small"
                  />
                )}
                size={"small"}
                columns={columns}
                dataSource={data}
                pagination={false}
              />
              <Divider type="Horizontal" style={{ marginTop: "50px" }} />
              <Table
                title={() => (
                  <Descriptions
                    column={5}
                    title={"Caustic"}
                    layout="horizontal"
                    bordered={false}
                    items={stepGroupTitle}
                    size="small"
                  />
                )}
                size={"small"}
                columns={columns}
                dataSource={data}
                pagination={false}
              />
              <Divider type="Horizontal" style={{ marginTop: "50px" }} />
              <Table
                title={() => (
                  <Descriptions
                    column={5}
                    title={"Mid-Rinse"}
                    layout="horizontal"
                    bordered={false}
                    items={stepGroupTitle}
                    size="small"
                  />
                )}
                size={"small"}
                columns={columns}
                dataSource={data}
                pagination={false}
              />
              <Divider type="Horizontal" style={{ marginTop: "50px" }} />
              <Table
                title={() => (
                  <Descriptions
                    column={5}
                    title={"Acid"}
                    layout="horizontal"
                    bordered={false}
                    items={stepGroupTitle}
                    size="small"
                  />
                )}
                size={"small"}
                columns={columns}
                dataSource={data}
                pagination={false}
              />
              <Divider type="Horizontal" style={{ marginTop: "50px" }} />
              <Table
                title={() => (
                  <Descriptions
                    column={5}
                    title={"Final Rinse"}
                    layout="horizontal"
                    bordered={false}
                    items={stepGroupTitle}
                    size="small"
                  />
                )}
                size={"small"}
                columns={columns}
                dataSource={data}
                pagination={false}
              />
              <Divider type="Horizontal" style={{ marginTop: "50px" }} />
              <Table
                title={() => (
                  <Descriptions
                    column={5}
                    title={"Final Drain"}
                    layout="horizontal"
                    bordered={false}
                    items={stepGroupTitle}
                    size="small"
                  />
                )}
                size={"small"}
                columns={columns}
                dataSource={data}
                pagination={false}
              />
            </Card>
          </Col>
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card
                style={{
                  width: "auto",
                }}
              >
                <ApexDonut />
              </Card>
            </Col>
            <Col span={24}>
              <Card
                title="Journal"
                style={{
                  width: "auto",
                }}
              >
                <Timeline
                  style={{
                    maxHeight: "70vh",
                    overflow: "auto",
                    paddingTop: "5px",
                  }}
                  items={[
                    {
                      dot: <LockFilled />,
                      color: "Orange",
                      children: "07/28/2023 11:21:38 AM - CL810102_CC Acquired",
                    },
                    {
                      dot: <Badge status="processing" />,

                      children: "07/28/2023 11:21:38 AM - CL8101_Oper Running",
                    },
                    {
                      dot: <Badge status="processing" />,
                      children: "07/28/2023 11:21:39 AM - CL810102_CC Running",
                    },
                    {
                      dot: <Badge status="processing" />,
                      children: "07/28/2023 11:21:39 AM - R0110_CIP Running",
                    },
                    {
                      dot: <Badge status="processing" />,
                      children: "07/28/2023 11:21:39 AM - L1121_CIP Running",
                    },
                    {
                      dot: <CheckOutlined />,
                      children: "07/28/2023 01:05:39 PM - CL8101_Oper Complete",
                      color: "green",
                    },
                    {
                      dot: <CheckOutlined />,
                      children: "07/28/2023 01:10:39 PM - CL810102_CC Complete",
                      color: "green",
                    },
                    {
                      dot: <CheckOutlined />,
                      children: "07/28/2023 01:10:39 PM - L1121_CIP Complete",
                      color: "green",
                    },
                    {
                      dot: <CheckOutlined />,
                      children: "07/28/2023 01:10:39 PM - R0110_CIP Complete",
                      color: "green",
                    },
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Col span={24}>
        <Card>{ppData && <CustomLineChart ppData={ppData} />}</Card>
      </Col>
      <Col span={24}></Col>
      <div style={{ marginBottom: "10px" }}>{""}</div>
    </Row>
  );
};

export default MultipleLineCharts;

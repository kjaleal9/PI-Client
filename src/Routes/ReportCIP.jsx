import React, { useState, useEffect } from "react";
import {
  Card,
  Space,
  Typography,
  Row,
  Col,
  Button,
  Table,
  Pagination,
  Statistic,
  Select,
  Form,
  TreeSelect,
  DatePicker,
  Cascader,
  Divider,
} from "antd";
import { getCIPSelect, getCIPReports, getUnits } from "../Requests/reportCIP";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const { SHOW_CHILD: CASC_SHOW_CHILD } = Cascader;

const ReportCIP = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [form] = Form.useForm();
  const [cascaderData, setCascaderData] = useState([]);

  function refreshScreen() {
    function getAllData() {
      return Promise.all([getCIPSelect(), getCIPReports()]);
    }

    getAllData()
      .then(async ([menuData, CIPReports]) => {
        const cascaderData = menuData.map((line) => {
          return {
            label: line.line,
            value: line.line,
            children: Array.from(
              line.circuits.map((circuit) => {
                return {
                  label: circuit.circuit,
                  value: circuit.circuit,
                  children: Array.from(
                    circuit.units.map((unit) => {
                      return {
                        label: unit,
                        value: unit,
                      };
                    })
                  ),
                };
              })
            ),
          };
        });
        setTableData(CIPReports);
        setCascaderData(cascaderData);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    console.log("refresh");
    refreshScreen();
  }, []);

  const onChange = (value) => {
    console.log(value);
  };

  const onFinish = async (fieldsValue) => {
    const circuits = [];
    const units = [];
    const rangeTimeValue = fieldsValue["range-time-picker"];

    fieldsValue.cascader.map((d) => {
      circuits.push(d[1]);
      units.push(d[2]);
    });

    const values = {
      units: units,
      circuits: circuits,
      dateTime: [
        rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
        rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"),
      ],
    };

    getCIPReports(values).then((data) => setTableData(data));
  };

  const columns = [
    {
      title: "Unit",
      dataIndex: "Equipment_Name",
      render: (text) => (
        <a href={"http://localhost:3000/sampleCIPReport"}>{text}</a>
      ),
    },
    {
      title: "CIP ID",
      dataIndex: "CIPLineWorkLog_WorkID",
    },
    {
      title: "CIP Program",
      dataIndex: "CIPProgram",
    },
    {
      title: "CIP Result",
      dataIndex: "CIPResult",
    },
    {
      title: "Start Time",
      dataIndex: "StartDateTime",
    },
    {
      title: "End Time",
      dataIndex: "EndDateTime",
    },
    {
      title: "Duration",
      dataIndex: "Duration",
    },
    {
      title: "Time Since Last CIP",
      dataIndex: "TimeSinceLastCIP",
    },
  ];

  const rangePresets = [
    {
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Last 14 Days",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];

  return (
    <Row justify={"center"} gutter={[16, 16]}>
      <Col m={24}>
        {!loading && (
          <Card title="CIP Report Search" style={{ width: "1650px" }}>
            <Form
              name="CIP_summary_search"
              layout="inline"
              form={form}
              onFinish={onFinish}
              initialValues={{
                "range-time-picker": [dayjs().add(-7, "d"), dayjs()],
              }}
            >
              <Form.Item name="range-time-picker" label="Time Range">
                <RangePicker
                  showTime
                  format="MM-DD-YYYY HH:mm:ss a"
                  presets={rangePresets}
                />
              </Form.Item>
              <Form.Item name="cascader" label="Circuit">
                <Cascader
                  style={{ width: "600px" }}
                  options={cascaderData}
                  onChange={onChange}
                  multiple
                  showSearch
                  maxTagCount={6}
                  showCheckedStrategy={CASC_SHOW_CHILD}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Divider></Divider>
            <Table
              size={"small"}
              columns={columns}
              dataSource={tableData}
              pagination={{
                // total: errorLog.length,
                // showTotal: (total) => `Total ${total} items`,
                defaultPageSize: 10,
                pageSizeOptions: [5, 10, 15],
                defaultCurrent: 1,
                showSizeChanger: true,
              }}
            />
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default ReportCIP;

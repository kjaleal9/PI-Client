import React from "react";
import { Row, Col, Card, Statistic } from "antd";

import {
  CheckCircleOutlined,
  SolutionOutlined,
  StopOutlined,
} from "@ant-design/icons";

const RecipeStatistics = ({ fullDatabase }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Total Recipes"
            value={fullDatabase.length}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
          <Row justify="space-between" align="middle">
            <Col span={12}>
              <Statistic
                title="Approved Recipes"
                value={
                  fullDatabase.filter((recipe) => recipe.Status === "Approved")
                    .length
                }
                valueStyle={{ color: "#3f8600" }}
              />
            </Col>
            <Col span={6}>
              <CheckCircleOutlined
                style={{ fontSize: "48px", color: "#3f8600" }}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
          <Row justify="space-between" align="middle">
            <Col span={12}>
              <Statistic
                title="Registered Recipes"
                value={
                  fullDatabase.filter(
                    (recipe) => recipe.Status === "Registered"
                  ).length
                }
                valueStyle={{ color: "#1520A6" }}
              />
            </Col>
            <Col span={6}>
              <SolutionOutlined
                style={{ fontSize: "48px", color: "#1520A6" }}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
          <Row justify="space-between" align="middle">
            <Col span={12}>
              <Statistic
                title="Obsolete Recipes"
                value={
                  fullDatabase.filter((recipe) => recipe.Status === "Obsolete")
                    .length
                }
                valueStyle={{ color: "#cf1322" }}
              />
            </Col>
            <Col span={6}>
              <StopOutlined style={{ fontSize: "48px", color: "#cf1322" }} />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default RecipeStatistics;

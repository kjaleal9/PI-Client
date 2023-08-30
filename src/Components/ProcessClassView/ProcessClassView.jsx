import React from "react";
import { Collapse, Divider } from "antd";

const ProcessClassView = (props) => {
  const { RPC, equipment } = props;

  const items = RPC.map((processClass, index) => {
    return {
      key: index,
      label: `${processClass.ProcessClass_Name} - ${processClass.Equipment_Name}`,
      children: equipment
        .filter((item) => +item.ProcessClass_ID === +processClass.PClass_ID)
        .map((filteredEquipment) => {
          return (
            <>
              <a>{filteredEquipment.Name}</a>
              <Divider type="vertical" />
            </>
          );
        }),
    };
  });

  console.log(
    RPC.map((processClass, index) => {
      return {
        key: index,
        label: `${processClass.ProcessClass_Name} - ${processClass.Equipment_Name}`,
        children: equipment
          .filter((item) => +item.ProcessClass_ID === +processClass.PClass_ID)
          .map((filteredEquipment) => `${filteredEquipment.Name}`),
      };
    })
  );

  const onChange = (key) => {
    console.log(key);
  };
  return (
    <>
      <Collapse
        style={{ display: "block" }}
        accordion={true}
        items={items}
        defaultActiveKey={["0"]}
        onChange={onChange}
      />
    </>
  );
};

export default React.memo(ProcessClassView);

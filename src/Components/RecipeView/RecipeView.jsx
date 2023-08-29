import React, { useState, useEffect } from "react";

import { Typography, Descriptions, Button, Row, Col, Card } from "antd";

// const recipe = [
//   {
//     key: "1",
//     label: "Start Time",
//     span: 2,
//     children: stepGroupHead.startTime,
//   },
//   {
//     key: "2",
//     label: "Start Step",
//     children: stepGroupHead.startStep,
//   },
//   {
//     key: "3",
//     label: "End Step",
//     children: stepGroupHead.endStep,
//   },
//   {
//     key: "4",
//     label: "Duration",
//     children: stepGroupHead.duration,
//   },
// ];

const RecipeView = (props) => {
  const { selected, setMode, setOpen } = props;
  const [loading, setLoading] = useState(false);
  const [openProcessClassModal, setOpenProcessClassModal] = useState(false);
  const [openProcedureModal, setOpenProcedureModal] = useState(false);
  const [procedure, setProcedure] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [RPC, setRPC] = useState([]);

  const handleButtonProcessClasses = () => {
    setOpenProcessClassModal(true);
  };

  const handleButtonProcedure = () => {
    setOpenProcedureModal(true);
  };

  // const getProcedure = () =>
  //   fetch(
  //     `${process.env.REACT_APP_API_URL}/recipes/procedure/${selected.RID}/${selected.Version}/condense`
  //   ).then((response) => response.json());

  // const getRPC = () =>
  //   fetch(
  //     `${process.env.REACT_APP_API_URL}/process-classes/required/${selected.RID}/${selected.Version}`
  //   ).then((response) => response.json());

  // const getEquipment = () =>
  //   fetch(`${process.env.REACT_APP_API_URL}/equipment`).then((response) =>
  //     response.json()
  //   );

  // function getAllData() {
  //   return Promise.all([getRPC(), getEquipment(), getProcedure()]);
  // }

  // useEffect(() => {
  //   getAllData()
  //     .then(
  //       ([requiredProcessClasses, requiredEquipment, selectedProcedure]) => {
  //         setRPC(requiredProcessClasses);
  //         setEquipment(requiredEquipment);
  //         setProcedure(selectedProcedure);
  //       }
  //     )
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   Promise.all([getRPC(), getProcedure()]).then(
  //     ([requiredProcessClasses, selectedProcedure]) => {
  //       setRPC(requiredProcessClasses);
  //       setProcedure(selectedProcedure);
  //       setLoading(false);
  //     }
  //   );
  // }, [selected]);

  // useEffect(() => {
  //   getRPC().then((data) => setRPC(data));
  // }, [selected]);

  return (
    <Card>
      {loading ? (
        <Typography>Loading</Typography>
      ) : (
        <Row>
          <Row>
            <Col span={24}>
              <Descriptions
                column={5}
                // title={selected.RID.toUpperCase()}
                layout="horizontal"
                bordered={false}
                // items={recipe}
                size="small"
              />
            </Col>
          </Row>

          {/* <Button variant="contained" sx={{ m: 1, width: "75%" }}>
              BOM
            </Button>
            <Button
              variant="contained"
              sx={{ m: 1, width: "75%" }}
              onClick={handleButtonProcessClasses}
            >
              Process Classes
            </Button>
            <Button
              variant="contained"
              sx={{ m: 1, width: "75%" }}
              onClick={handleButtonProcedure}
            >
              Procedure
            </Button>
            <Button
              variant="contained"
              sx={{ m: 1, width: "75%" }}
              onClick={handleButtonProcedure}
            >
              Trains
            </Button>
          </Box> */}
        </Row>
      )}
    </Card>
  );
};

export default RecipeView;

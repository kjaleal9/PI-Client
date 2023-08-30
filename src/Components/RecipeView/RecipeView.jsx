import React, { useState, useEffect } from "react";

import {
  Typography,
  Descriptions,
  Button,
  Row,
  Col,
  Card,
  Tabs,
  Input,
} from "antd";
import ProcessClassView from "../ProcessClassView/ProcessClassView";
import ProcedureView from "../ProcedureView/ProcedureView";

const { TextArea } = Input;

const RecipeView = (props) => {
  const { selected } = props;
  const [loading, setLoading] = useState(true);
  const [procedure, setProcedure] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [RPC, setRPC] = useState([]);

  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };

  const getProcedure = () =>
    fetch(
      `${process.env.REACT_APP_API_URL}/recipes/procedure/${selected.RID}/${selected.Version}/condense`
    ).then((response) => response.json());

  const getRPC = () =>
    fetch(
      `${process.env.REACT_APP_API_URL}/process-classes/required/${selected.RID}/${selected.Version}`
    ).then((response) => response.json());

  const getEquipment = () =>
    fetch(`${process.env.REACT_APP_API_URL}/equipment`).then((response) =>
      response.json()
    );

  useEffect(() => {
    getEquipment()
      .then((requiredEquipment) => setEquipment(requiredEquipment))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      setLoading(true);
      Promise.all([getRPC(), getProcedure()]).then(
        ([requiredProcessClasses, selectedProcedure]) => {
          setRPC(requiredProcessClasses);
          setProcedure(selectedProcedure);
          setLoading(false);
        }
      );
    }
  }, [selected]);

  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      getRPC().then((data) => setRPC(data));
    }
  }, [selected]);

  console.log(selected);
  const recipe = [
    {
      key: "1",
      label: "Version",
      children: selected.Version,
    },
    {
      key: "2",
      label: "Date",
      span: 2,
      children: selected.VersionDate,
    },
    {
      key: "3",
      label: "Status",
      span: 3,
      children: selected.Status,
    },
    {
      key: "4",
      label: "Max",
      children: selected.BatchSizeMax,
    },
    {
      key: "5",
      label: "Max",
      children: selected.BatchSizeMin,
    },
    {
      key: "6",
      label: "Nominal",
      children: selected.BatchSizeNominal,
    },
  ];
  const recipeView = [
    {
      key: "1",
      label: "Recipe Procedure",
      children: <ProcedureView procedure={procedure} />,
    },
    {
      key: "2",
      label: "Process Classes",

      children: <ProcessClassView RPC={RPC} equipment={equipment} />,
    },
    {
      key: "3",
      label: "Bill of Materials",

      children: selected.Status,
    },
    {
      key: "4",
      label: "Trains",
      children: selected.BatchSizeMax,
    },
    {
      key: "5",
      label: "Comment",
      children: (
        <TextArea
          showCount
          // maxLength={100}
          style={{ height: 500, resize: "none" }}
          onChange={onChange}
          placeholder="disable resize"
          defaultValue="Title: Savory Herb-Crusted Baked Salmon

          Description:
          Indulge in the exquisite flavors of our Savory Herb-Crusted Baked Salmon recipe. This dish combines the delicate richness of salmon with a flavorful herb crust that adds a delightful texture and taste. It's a perfect balance of healthy and indulgent, making it a show-stopping centerpiece for any occasion.
          
          Ingredients:
          
          4 salmon fillets (6 oz each)
          1 cup breadcrumbs (preferably panko)
          2 tablespoons fresh parsley, finely chopped
          1 tablespoon fresh dill, finely chopped
          1 teaspoon fresh thyme leaves
          Zest of 1 lemon
          2 cloves garlic, minced
          2 tablespoons Dijon mustard
          2 tablespoons olive oil
          Salt and black pepper to taste
          Instructions:
          
          Preheat your oven to 400°F (200°C). Line a baking sheet with parchment paper.
          In a mixing bowl, combine the breadcrumbs, chopped parsley, dill, thyme, lemon zest, minced garlic, salt, and black pepper. Mix well.
          In a separate bowl, whisk together the Dijon mustard and olive oil until smooth.
          Pat the salmon fillets dry with a paper towel. Brush each fillet with the Dijon mustard and olive oil mixture, ensuring they are well-coated.
          Press the herb breadcrumb mixture onto the top of each salmon fillet, creating a generous crust.
          Place the herb-crusted salmon fillets on the prepared baking sheet.
          Bake in the preheated oven for about 12-15 minutes, or until the salmon is cooked through and flakes easily with a fork.
          Once baked, carefully transfer the salmon fillets to serving plates.
          Garnish with additional fresh herbs and lemon slices if desired.
          Serve the Savory Herb-Crusted Baked Salmon alongside a refreshing mixed green salad or steamed vegetables for a complete and balanced meal.
          This recipe is a celebration of quality ingredients and culinary finesse. The crispy herb crust elevates the natural flavors of the salmon, creating a dish that's not only visually stunning but also a delight for your taste buds. Whether it's a special family dinner or an elegant dinner party, this recipe is sure to impress your guests and leave them craving for more."
        />
      ),
    },
  ];

  return (
    <Card>
      {loading ? (
        <Typography>Loading</Typography>
      ) : (
        <Row gutter={[16, 16]}>
          <Row>
            <Col span={24}>
              <Descriptions
                column={3}
                title={selected.RID.toUpperCase()}
                layout="horizontal"
                bordered={false}
                items={recipe}
                size="small"
              />
            </Col>

            <Col span={24}>
              <Tabs
                defaultActiveKey="1"
                type="card"
                items={recipeView}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </Row>
      )}
    </Card>
  );
};

export default RecipeView;

import React, { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";

import {
  getRecipes,
  getPCPhases,
  getEquipment,
  getMaterials,
  getMaterialClasses,
  getStepTypes,
  getProcedureData,
  getStepParameters,
} from "../Requests/RecipeProcedure";

import { Button, Card, Table, Row, Col, Select, Typography } from "antd";

import { MenuOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import StepView from "../Components/StepView/StepView";
const { Title, Text } = Typography;

const columns = [
  {
    key: "sort",
    width: 50,
  },
  {
    title: "Step",
    dataIndex: "Step1",
    width: 61,
  },
  {
    title: "Message",
    dataIndex: "Message",
  },
];
const TableRow = ({ children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });

  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      }
    ),
    transition,
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 9999,
        }
      : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if (child.key === "sort") {
          return React.cloneElement(child, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{
                  touchAction: "none",
                  cursor: "move",
                }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

// 20230224185204
// http://localhost:5000/recipes/latest
const RecipeProcedure = () => {
  // Fetch steps from database
  // Pull Recipe_RID Recipe_Version TPIBK_StepType_ID ProcessClassPhase_ID, Step UserString Material_ID ProcessClass_ID
  // Assign a temporary ID

  // Temporary
  const [recipes, setRecipes] = useState([]);
  const [recipeSelect, setRecipeSelect] = useState("");
  const [versionSelect, setVersionSelect] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState([]);

  const [selected, setSelected] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepParameters, setStepParameters] = useState([]);
  const { procedureData } = useLoaderData();

  const [phases, setPCPhases] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [materialClasses, setMaterialClasses] = useState([]);
  const [stepTypes, setStepTypes] = useState("");
  const [equipment, setEquipment] = useState([]);

  const [selectedRER, setSelectedRER] = useState("");
  const [isProcedureEditable, setIsProcedureEditable] = useState(false);

  const [stepTypeSelect, setStepTypeSelect] = useState(stepTypes);

  useEffect(() => {
    loadData();
    const { procedure, RID, Version } = procedureData;
    async function setFieldData() {
      setSelectedRecipe(procedure);
      setRecipeSelect(RID);
      setVersionSelect(Version);
    }
    if (procedure) {
      setFieldData();
    }
  }, []);

  useEffect(() => {
    setVersionSelect("");
  }, [recipeSelect]);

  useEffect(() => {
    const sortedSteps = selectedRecipe.map((step, index) => {
      return { ...step, Step: index + 1, key: step.ID };
    });
    setSteps(sortedSteps);
  }, [selectedRecipe]);

  // Move to route loader
  function loadData() {
    function getAllData() {
      return Promise.all([
        getRecipes(),
        getPCPhases(),
        getStepTypes(),
        getMaterials(),
        getMaterialClasses(),
        getEquipment(),
      ]);
    }

    getAllData()
      .then(
        ([
          recipes,
          pcPhases,
          stepTypes,
          allMaterials,
          allMaterialClasses,
          requiredEquipment,
        ]) => {
          setRecipes(recipes);
          setPCPhases(pcPhases);
          setMaterials(allMaterials);
          setMaterialClasses(allMaterialClasses);
          setEquipment(requiredEquipment);
          const formattedStepTypes = stepTypes.map((step) => {
            return {
              value: step.ID,
              label: step.Name,
            };
          });
          setStepTypes(formattedStepTypes);
        }
      )
      .catch((err) => console.log(err, "uih"));
  }

  useEffect(() => {
    console.log(selected);
    if (selected.TPIBK_StepType_ID <= 5) {
      getStepParameters(selected.ID, selected.ProcessClassPhase_ID).then(
        (data) => {
          console.log(data);
          setStepParameters(data);
        }
      );
    } else {
      setStepParameters([]);
    }
  }, [selectedRowKeys]);

  const handleNewStep = () => {};
  const handleDeleteStep = () => {};
  const handleEditStep = () => {};

  const onProcedureSearchButton = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/recipes/procedure/${recipeSelect}/${versionSelect}`
    ).then((response) =>
      response.json().then((data) => {
        setSelectedRecipe(data);
      })
    );
    fetch(
      `${process.env.REACT_APP_API_URL}/recipes/process-classes/required/${recipeSelect}/${versionSelect}`
    )
      .then((response) => response.json())
      .then((data) => setSelectedRER(data));
  };

  // const handleClick = (event, step, row) => {
  //   const selectedRow = `${selected.ID}-${selected.Message}` === step;
  //   let newSelected = "";

  //   if (selectedRow === false) {
  //     newSelected = row;
  //   }

  //   setSelected(newSelected);
  // };

  // function isSelected(step) {
  //   return selected.Step === step;
  // }

  // const handleCancelButton = () => {
  //   setIsProcedureEditable(false);
  //   setSteps(selectedRecipe);
  // };

  // const handleEditProcedureButton = () => {
  //   setIsProcedureEditable(true);
  // };

  const onSelectChange = (record) => {
    const selectedRow = selected.ID === record.ID;

    if (selectedRow === false) {
      setSelected(record);
      setSelectedRowKeys([record.key]);
    } else {
      setSelected("");
      setSelectedRowKeys([]);
    }
  };

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setSteps((previous) => {
        const activeIndex = previous.findIndex((i) => i.ID === active.id);
        const overIndex = previous.findIndex((i) => i.ID === over?.id);
        const updatedSteps = arrayMove(previous, activeIndex, overIndex);
        const sortedSteps = updatedSteps.map((step, index) => ({
          ...step,
          Step: index + 1,
        }));

        return sortedSteps;
      });
    }
  };

  return (
    <Row>
      <Col sm={24} md={12}>
        <Card style={{ height: "calc(100vh - 100px)" }}>
          <Row>
            <Col span={12}>
              <Select
                dropdownStyle={{
                  zIndex: 10000,
                }}
                style={{ width: "100%" }}
                value={recipeSelect}
                onChange={(recipe) => {
                  setRecipeSelect(recipe);
                }}
                options={Array.from(
                  [...new Set(recipes.map((recipe) => recipe.RID))].map(
                    (name) => {
                      return { value: name, label: name };
                    }
                  )
                )}
              />
            </Col>
            <Col span={6}>
              <Select
                dropdownStyle={{
                  zIndex: 10000,
                }}
                style={{ width: "100%" }}
                value={versionSelect}
                disabled={!recipeSelect}
                onChange={(version) => {
                  setVersionSelect(version);
                }}
                options={Array.from(
                  [
                    ...recipes
                      .filter((recipe) => recipe.RID === recipeSelect)
                      .map((recipe) => recipe.Version)
                      .sort((a, b) => a - b),
                  ].map((version) => {
                    return { value: version, label: version };
                  })
                )}
              />
            </Col>
            <Col span={6}>
              <Button
                type="primary"
                disabled={!versionSelect}
                style={{ width: "100%" }}
                onClick={onProcedureSearchButton}
              >
                Confirm
              </Button>
            </Col>
          </Row>
          <DndContext
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={onDragEnd}
          >
            <SortableContext
              items={steps.map((i) => i.ID)}
              strategy={verticalListSortingStrategy}
            >
              <Table
                components={{
                  body: {
                    row: TableRow,
                  },
                }}
                size="small"
                pagination={false}
                rowKey="ID"
                columns={columns}
                dataSource={steps}
                scroll={{ y: "75vh" }}
                onRow={(record) => {
                  return {
                    style: { cursor: "pointer" },
                    onClick: () => {
                      onSelectChange(record);
                    },
                  };
                }}
                rowSelection={{
                  type: "radio",
                  selectedRowKeys,
                  getCheckboxProps: () => {
                    return {
                      style: {
                        display: "none",
                      },
                    };
                  },
                  onChange: onSelectChange,
                }}
              />
            </SortableContext>
          </DndContext>
        </Card>
      </Col>
      <Col sm={24} md={12}>
        {selected && (
          <Card>
            <Title level={4}>Step Details</Title>
            <Text>
              Type
              {
                stepTypes.find(
                  (step) => step["value"] === selected.TPIBK_StepType_ID
                )["label"]
              }
            </Text>

          </Card>
        )}
      </Col>
    </Row>
  );
};

export default RecipeProcedure;

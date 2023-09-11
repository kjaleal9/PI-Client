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
} from "../Requests/RecipeProcedure";

import { Button, Card, Table, Row, Col, Select } from "antd";

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

const columns = [
  {
    key: "sort",
    width: 50,
  },
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

  const [phases, setPCPhases] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [materialClasses, setMaterialClasses] = useState([]);
  const [selected, setSelected] = useState("");
  const [steps, setSteps] = useState([]);
  const [stepTypes, setStepTypes] = useState("");
  const [equipment, setEquipment] = useState([]);

  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const [selectedRER, setSelectedRER] = useState("");
  const [isProcedureEditable, setIsProcedureEditable] = useState(false);
  const { procedureData } = useLoaderData();

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
          setStepTypes(stepTypes);
          setMaterials(allMaterials);
          setMaterialClasses(allMaterialClasses);
          setEquipment(requiredEquipment);
        }
      )
      .catch((err) => console.log(err, "uih"));
  }

  useEffect(() => {
    loadData();
    const { procedure, RID, Version } = procedureData;
    async function setFieldData() {
      setSelectedRecipe(procedure);
      await setRecipeSelect(RID);
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
      return { ...step, Step: index + 1 };
    });
    setSteps(sortedSteps);
  }, [selectedRecipe]);

  const handleNewStep = () => {};
  const handleDeleteStep = () => {};
  const handleEditStep = () => {};

  const procedureSearchButton = () => {
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
      <Col span={12}>
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
                onClick={procedureSearchButton}
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
              />
            </SortableContext>
          </DndContext>
        </Card>
      </Col>
    </Row>
  );
};

export default RecipeProcedure;

import React, { useState, useEffect } from "react";

import { Card, Row, Col, Table, Divider } from "antd";

import {
  getRecipes,
  getMaterials,
  getMaterialClasses,
  getProcessClasses,
  getRequiredProcessClasses,
} from "../Requests/RecipeSearch";

import RecipeView from "../Components/RecipeView/RecipeView";
import RecipeSearchToolbar from "../Components/RecipeSearchToolbar/RecipeSearchToolbar";
import RecipeStatistics from "../Components/RecipeStatistics/RecipeStatistics";
import NewRecipeForm from "../Components/NewRecipeForm/NewRecipeForm";

// TODO rename components
// import EnhancedTableToolbar from "../Components/Table/EnhancedTableToolbar/EnhancedTableToolbar";
// import EnhancedModal from "../Components/Modals/EnhancedModal/EnhancedModal";
// import DeleteDialog from "../Components/DeleteDialog/DeleteDialog";
// import Snackbar from "../Components/SnackBar/SnackBar";
// import RecipeView from "../Components/RecipeView/RecipeView";
// import CustomTableBody from "../Components/Table/CustomTableBody/CustomTableBody";

const RecipeSearch = () => {
  const [fullDatabase, setFullDatabase] = useState([]);
  const [latestVersion, setLatestVersionRecipes] = useState([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [materialClasses, setMaterialClasses] = useState([]);
  const [processClasses, setProcessClasses] = useState([]);

  const [requiredProcessClasses, setRequiredProcessClasses] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [filter, setFilter] = useState({
    showAll: false,
    approved: false,
    registered: false,
    obsolete: false,
    search: "",
  });

  useEffect(() => {
    refreshTable();
  }, []);

  // Table filter useEffect. Runs everytime the filter changes
  useEffect(() => {
    filterRows();
  }, [filter]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  function groupRecipes(rows) {
    function groupBy(objectArray, property) {
      return objectArray.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    }

    const groupedRecipes = groupBy(rows, "RID");

    return Object.keys(groupedRecipes).map((key) =>
      groupedRecipes[key].reduce((max, recipe) =>
        +max["Version"] > +recipe["Version"] ? max : recipe
      )
    );
  }

  function refreshTable() {
    function getAllData() {
      return Promise.all([
        getRecipes(),
        getMaterials(),
        getMaterialClasses(),
        getProcessClasses(),
        getRequiredProcessClasses(),
      ]);
    }
    setLoading(true);
    getAllData()
      .then(
        ([
          allRecipes,
          allMaterials,
          allMaterialClasses,
          allProcessClasses,
          allRequiredProcessClasses,
        ]) => {
          setFullDatabase(allRecipes);
          setLatestVersionRecipes(groupRecipes(allRecipes));
          setRows(groupRecipes(allRecipes));
          setMaterials(allMaterials);
          setMaterialClasses(allMaterialClasses);
          setProcessClasses(allProcessClasses);
          setRequiredProcessClasses(allRequiredProcessClasses);
        }
      )
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }

  async function filterRows() {
    console.time("Filter");
    const { showAll, status } = filter;
    let filteredRows;
    showAll ? (filteredRows = fullDatabase) : (filteredRows = latestVersion);
    filteredRows = filteredRows.filter(
      (row) =>
        (!status || row.Status === status) &&
        row.RID.toLowerCase().includes(filter.search)
    );
    await setRows(filteredRows);
    console.timeEnd("Filter");
  }

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "RID",
      dataIndex: "RID",
      key: "RID",
      sorter: (a, b) => a.RID.length - b.RID.length,
      sortOrder: sortedInfo.columnKey === "RID" ? sortedInfo.order : null,
      ellipsis: true,
      width: "25ch",
    },
    {
      title: "Ver",
      dataIndex: "Version",
      key: "version",
      sorter: (a, b) => a.Version - b.Version,
      sortOrder: sortedInfo.columnKey === "version" ? sortedInfo.order : null,
      ellipsis: true,
      align: "right",
      width: "8ch",
    },
    {
      title: "Date",
      dataIndex: "VersionDate",
      key: "date",
      sorter: (a, b) => a.VersionDate - b.VersionDate,
      sortOrder: sortedInfo.columnKey === "date" ? sortedInfo.order : null,
      ellipsis: true,
      width: "15ch",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "status",
      sorter: (a, b) => a.Status.length - b.Status.length,
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
      ellipsis: true,
      // width: "15ch",
    },
    {
      title: "Product ID",
      dataIndex: "ProductID",
      key: "product-id",
      sorter: (a, b) => a.ProductID.length - b.ProductID.length,
      sortOrder:
        sortedInfo.columnKey === "product-id" ? sortedInfo.order : null,
      ellipsis: true,
      // width: "20ch",
      responsive: ["lg"],
    },
    {
      title: "Description",
      dataIndex: "Name",
      key: "description",
      ellipsis: true,
      // width: "11ch",
      responsive: ["xl"],
    },
  ];

  const onSelectChange = (record) => {
    const selectedRow =
      selected.RID === record.RID && selected.Version === record.Version;

    if (selectedRow === false) {
      setSelected(record);
      setSelectedRowKeys([record.key]);
    } else {
      setSelected("");
      setSelectedRowKeys([]);
    }
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <NewRecipeForm
          open={open}
          setOpen={setOpen}
          materials={materials}
          materialClasses={materialClasses}
          processClasses={processClasses}
          requiredProcessClasses={requiredProcessClasses}
          rows={rows}
          selected={selected}
          setSelected={setSelected}
          refreshTable={refreshTable}
        />
        <Col sm={24} md={14}>
          <Card title="Recipe Search" style={{ height: "90vh" }}>
            <RecipeSearchToolbar
              filter={filter}
              setFilter={setFilter}
              anyRowSelected={selected !== ""}
              setOpen={setOpen}
              selected={selected}
              refreshTable={refreshTable}
            />
            <Divider />
            <Table
              size={"small"}
              loading={loading}
              columns={columns}
              dataSource={rows}
              onChange={handleChange}
              pagination={{
                total: rows.length,
                showTotal: (total) => `Total ${total} items`,
                defaultPageSize: 15,
                defaultCurrent: 1,
                showSizeChanger: false,
              }}
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
          </Card>
        </Col>
        <Col sm={24} md={10}>
          {!selected ? (
            <RecipeStatistics fullDatabase={fullDatabase} />
          ) : (
            <RecipeView selected={selected} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default RecipeSearch;

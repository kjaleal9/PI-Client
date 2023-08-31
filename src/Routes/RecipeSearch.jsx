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
} from "antd";

import CountUp from "react-countup";

import {
  getRecipes,
  getMaterials,
  getMaterialClasses,
  getProcessClasses,
  getRequiredProcessClasses,
} from "../Requests/RecipeSearch";

import RecipeView from "../Components/RecipeView/RecipeView";

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
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [materialClasses, setMaterialClasses] = useState([]);
  const [processClasses, setProcessClasses] = useState([]);
  const [requiredProcessClasses, setRequiredProcessClasses] = useState([]);

  const [filter, setFilter] = useState({
    showAll: false,
    approved: false,
    registered: false,
    obsolete: false,
    search: "",
  });

  function groupRecipes(rows) {
    function groupBy(objectArray, property) {
      return objectArray.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        // Add object to list for given key's value
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

    getAllData()
      .then(
        ([
          allRecipes,
          allMaterials,
          allMaterialClasses,
          allProcessClasses,
          allRequiredProcessClasses,
        ]) => {
          console.log(allRecipes);
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

  useEffect(() => {
    refreshTable();
  }, []);

  // Table filter useEffect. Runs everytime the filter changes
  useEffect(() => {
    filterRows();
  }, [filter]);


  function filterRows() {
    console.time("Filter");
    const { showAll, status } = filter;
    let filteredRows;
    showAll ? (filteredRows = fullDatabase) : (filteredRows = latestVersion);
    filteredRows = filteredRows.filter(
      (row) =>
        (!status || row.Status === status) &&
        row.RID.toLowerCase().includes(filter.search)
    );
    setRows(filteredRows);
    console.timeEnd("Filter");
  }

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (record) => {
    setSelected(record);
    setSelectedRowKeys([record.key]);
    console.log(record);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col sm={24} md={14}>
          <Card title="Recipe Search" style={{height:'90vh'}}>
            <Table
              size={"small"}
              loading={loading}
              columns={columns}
              dataSource={rows}
              onChange={handleChange}
              pagination={{
                total: rows.length,
                showTotal: (total) => `Total ${total} items`,
                defaultPageSize: 17,
                // pageSizeOptions: [5, 10, 15],
                defaultCurrent: 1,
                // showSizeChanger: true,
              }}
              onRow={(record) => {
                return {
                  style: { cursor: "pointer" },
                  onClick: () => {
                    onSelectChange(record); // Select the clicked row
                    console.log("onclick");
                  },
                };
              }}
              rowSelection={{
                type: "radio", // Use radio buttons for row selection
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
        <Col sm={24} md={10} >
          {selected && <RecipeView selected={selected} />}
        </Col>
      </Row>
    </>
  );
};

export default RecipeSearch;

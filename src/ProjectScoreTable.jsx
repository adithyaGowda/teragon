/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Edit,
  Delete,
  Cancel,
  ArrowUpward,
  ArrowDownward,
  Remove,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ProjectScoreIdUpdate from "./ProjectScoreIdUpdate";
import { useDispatch, useSelector } from "react-redux";
import { fetchParamData } from "../utils/parameterSlice";
import { SCORE_LIST_API } from "../utils/constants";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Menu from "@mui/material/Menu";
import {
  bulkUpdateScoreList,
  fetchFilterScoreList,
  fetchScoreList,
} from "../utils/projectScoreSlice";

const DataTableWithParams = () => {
  // const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("projectName");
  const [editRows, setEditRows] = useState({});
  const [deleteRows, setDeleteRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState(null);
  const { isSidebarOpen } = useSelector((store) => store.parameter);

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const Open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [filter, setFilter] = useState({
    projectId: "",
    projectName: "",
    engineeringManagerName: "",
    du: "",
    weekOfAssessment: "",
  });

  const { params, status, totalWeightage, paramNames } = useSelector(
    (store) => store.parameter
  );
  const data = useSelector((store) => store.projectScore.scoreList);
  const projStatus = useSelector((store) => store.projectScore.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchParamData());
    }
    if (projStatus === "idle") {
      dispatch(fetchScoreList());
    }
  }, [status, dispatch]);

  const [editModal, setEditModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [weekOfAssessmentFilter, setWeekOfAssessmentFilter] = useState("");
  const handleModalPopup = (selectedRow) => {
    setSelectedRow(selectedRow);
    setEditModal(true);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const calculateoverallScoreCurrentWeek = (paramScoreList) => {
    let totalScore = 0;

    for (const param in paramScoreList) {
      const score = parseInt(paramScoreList[param]?.score) || 0;
      const weightage = parseInt(paramScoreList[param]?.weightage) || 0;
      totalScore += score * weightage;
    }
    const score = Math.ceil((totalScore / totalWeightage) * 100);
    return `${score}%`;
  };

  const handleEditFormChange = (event, id, field, param) => {
    const { value } = event.target;
    setEditRows((prev) => {
      const newRow = {
        ...prev[id],
        paramScoreList: {
          ...prev[id].paramScoreList,
          [param]: {
            ...prev[id].paramScoreList[param],
            [field]: value,
          },
        },
      };
      newRow.overallScoreCurrentWeek = calculateoverallScoreCurrentWeek(
        newRow.paramScoreList
      );
      return {
        ...prev,
        [id]: newRow,
      };
    });
  };

  const handleEditForm = (e, record, field) => {
    setEditRows({
      ...editRows,
      [record.id]: {
        ...editRows[record.id],
        [field]: e.target.value,
      },
    });
  };

  const handleSaveAllClick = async () => {
    const updatedData = [];
    const deleteData = [];
    const newData = data.map((item) => {
      if (editRows[item.id]) {
        updatedData.push({ ...item, ...editRows[item.id] });
        return { ...item, ...editRows[item.id] };
      }
      if (deleteRows.includes(item.id)) {
        deleteData.push({ ...item, deleted: true });
        return { ...item, deleted: true };
      }
      return item;
    });
    dispatch(bulkUpdateScoreList([...updatedData, ...deleteData]));
    setEditRows({});
    setDeleteRows([]);
  };

  const handleWeekOfAssessmentFilterChange = (event) => {
    const { value } = event.target;
    setWeekOfAssessmentFilter(value);
    dispatch(fetchFilterScoreList(value));
  };

  const handleEditClick = (row) => {
    setEditRows((prev) => ({
      ...prev,
      [row.id]: { ...row },
    }));
  };
  const handleCancelEditClick = (id) => {
    setEditRows((prev) => {
      const newEditRows = { ...prev };
      delete newEditRows[id];
      return newEditRows;
    });
  };
  const handleDeleteClick = (id) => {
    setOpen(true);
    setDeleteRowId(id);
  };
  const handleDeleteConfirm = () => {
    setDeleteRows((prev) => [...prev, deleteRowId]);
    setOpen(false);
    setDeleteRowId(null);
  };
  const handleClose = () => {
    setOpen(false);
    setDeleteRowId(null);
  };
  const handleCancelDeleteClick = (id) => {
    setDeleteRows((prev) => prev.filter((rowId) => rowId !== id));
  };
  const filteredData = data.filter(
    (item) =>
      item.du.toLowerCase().includes(filter.du.toLowerCase()) &&
      item.projectId.toLowerCase().includes(filter.projectId.toLowerCase()) &&
      item.projectName
        .toLowerCase()
        .includes(filter.projectName.toLowerCase()) &&
      item.engineeringManagerName
        .toLowerCase()
        .includes(filter.engineeringManagerName.toLowerCase()) &&
      item.weekOfAssessment.includes(filter.weekOfAssessment)
  );
  const sortedData = filteredData.sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    }
    return a[orderBy] > b[orderBy] ? -1 : 1;
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };
  const calculateRAGStatus = (score) => {
    const percentage = parseInt(score.replace("%", ""));
    if (percentage < 60) return "#E4080A";
    if (percentage <= 70) return "#EDC21B";
    if (percentage < 90) return "#F8B551";
    return "#37A809";
  };
  const renderScoreBox = (score) => {
    const percentage = parseInt(score.replace("%", ""));
    let bgColor = "";
    if (percentage < 60) {
      bgColor = "#E4080A";
    } else if (percentage <= 70) {
      bgColor = "#F9658C";
    } else if (percentage < 90) {
      bgColor = "#EDC21B";
    } else {
      bgColor = "#37A809";
    }
    return (
      <div
        style={{
          width: "60%",
          height: "25px",
          backgroundColor: bgColor,
          color: "white",
          textAlign: "center",
          borderRadius: "7%",
        }}
      >
        {score}
      </div>
    );
  };
  const exportToPDF = () => {
    const doc = new jsPDF("landscape");
    const title = "Project Score List";
    const header = [
      "Project ID",
      "DU",
      "Project Name",
      "Engineering manager",
      "CurrentWeekScore",
      "PreviousWeekScore",
      ...Object.keys(
        data.reduce((acc, row) => {
          const paramScoreListKeys = Object.keys(row.paramScoreList || {});
          return paramScoreListKeys.length > Object.keys(acc).length
            ? row.paramScoreList
            : acc;
        }, {})
      ),
    ];
    const exportData = data.map((row) => ({
      ...row,
      ...Object.fromEntries(
        Object.entries(row.paramScoreList || {}).flatMap(([key, { score }]) => [
          [`${key} Score`, score],
        ])
      ),
    }));
    const tableRows = exportData.map((row) => [
      row.projectId,
      row.du,
      row.projectName,
      row.engineeringManagerName,
      row.overallScoreCurrentWeek,
      row.overallScorePreviousWeek,

      ...Object.values(row.paramScoreList || {}).map(({ score }) => score),
    ]);
    doc.setFontSize(13);
    doc.text(title, 14, 22);

    doc.autoTable({
      head: [header],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 6, cellPadding: 1 },
      headStyles: { fillColor: [41, 150, 243], textColor: [255, 255, 255] },
      theme: "striped",
      columnStyles: { 0: { cellWidth: 15 }, 120: { cellWidth: 30 } },
    });

    doc.save("ProjectScores.pdf");
    setAnchorEl(null);
  };

  const exportToExcel = () => {
    const dataForExcel = data.map((row) => {
      const flatRow = {
        id: row.id,
        du: row.du,
        projectId: row.projectId,
        projectName: row.projectName,
        // RAGStatus: row.RAGStatus,s
        engineeringManagerName: row.engineeringManagerName,
        overallScoreCurrentWeek: row.overallScoreCurrentWeek,
        overallScorePreviousWeek: row.overallScorePreviousWeek,
        //indicator: row.indicator,
      };
      for (const key in row.paramScoreList) {
        flatRow[`${key} Score`] = row.paramScoreList[key].score;
      }
      return flatRow;
    });
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ProjectScores");
    XLSX.writeFile(workbook, "ProjectScores.xlsx");
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        width: isSidebarOpen ? "80%" : "100%",
        fontFamily: "roboto",
        marginLeft: "10px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h3
          style={{ marginLeft: "10px", color: "#2F3A74", fontFamily: "roboto" }}
        >
          Project Score List
        </h3>
        <TextField
          label="Filter by Week of Assessment"
          color="primary"
          type="date"
          size="small"
          value={weekOfAssessmentFilter}
          onChange={handleWeekOfAssessmentFilterChange}
          InputLabelProps={{ shrink: true }}
          style={{
            width: "200px",
            marginLeft: isSidebarOpen ? "47%" : "57%",
            marginTop: "18px",
          }}
        />
        {/* <Button
          onClick={exportToPDF}
          variant="contained"
          color="primary"
          style={{
            marginLeft: isSidebarOpen ? "1%" : "1%",
            height: "40px",
            marginTop: "18px",
          }}
        >
          Export to PDF
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={exportToExcel}
          style={{
            marginLeft: isSidebarOpen ? "1%" : "5px",
            height: "40px",
            marginTop: "18px",
          }}
        >
          Export Data <DownloadIcon />
        </Button> */}
        <div>
          <Button
            id="demo-positioned-button"
            variant="contained"
            color="primary"
            aria-controls={Open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Open ? "true" : undefined}
            onClick={handleClick}
            style={{
              marginLeft: isSidebarOpen ? "10px" : "10px",
              height: "40px",
              marginTop: "18px",
            }}
          >
            Export Data <DownloadIcon />
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={Open}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={exportToExcel}>Download Exel</MenuItem>
            <MenuItem onClick={exportToPDF}>Download PDF</MenuItem>
          </Menu>
        </div>
      </div>

      <TableContainer
        sx={{
          maxWidth: "100%",
          maxHeight: "400px",
          overflowX: "auto",
          overflowY: "auto",
        }}
        size="small"
        aria-label="a dense table"
      >
        <Table stickyHeader sx={{ minWidth: 2700 }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#004BA8" }}>
              <TableCell
                sx={{
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "#004BA8",
                }}
              >
                Actions
              </TableCell>
              <TableCell style={{ backgroundColor: "#004BA8" }}>
                <TableSortLabel
                  active={orderBy === "du"}
                  direction={orderBy === "du" ? order : "asc"}
                  onClick={() => handleRequestSort("du")}
                  style={{ color: "white" }}
                >
                  DU
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ backgroundColor: "#004BA8" }}>
                <TableSortLabel
                  active={orderBy === "projectId"}
                  direction={orderBy === "projectId" ? order : "asc"}
                  onClick={() => handleRequestSort("projectId")}
                  style={{ color: "white" }}
                >
                  Project ID
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ backgroundColor: "#004BA8" }}>
                <TableSortLabel
                  active={orderBy === "projectName"}
                  direction={orderBy === "projectName" ? order : "asc"}
                  onClick={() => handleRequestSort("projectName")}
                  style={{ color: "white" }}
                >
                  Project Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "white", backgroundColor: "#004BA8" }}>
                WeekOfAssessment
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  backgroundColor: "#004BA8",
                  textAlign: "center",
                }}
              >
                RAG Status
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "#004BA8",
                }}
              >
                Engineering Manager
              </TableCell>
              <TableCell style={{ backgroundColor: "#004BA8" }}>
                <TableSortLabel
                  active={orderBy === "  overallScoreCurrentWeek"}
                  direction={
                    orderBy === "  overallScoreCurrentWeek" ? order : "asc"
                  }
                  onClick={() => handleRequestSort("overallScoreCurrentWeek")}
                  style={{ color: "white" }}
                >
                  Current Week Score
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ backgroundColor: "#004BA8" }}>
                <TableSortLabel
                  active={orderBy === "overallScorePreviousWeek"}
                  direction={
                    orderBy === "overallScorePreviousWeek" ? order : "asc"
                  }
                  onClick={() => handleRequestSort("overallScorePreviousWeek")}
                  style={{ color: "white" }}
                >
                  Previous Week Score
                </TableSortLabel>
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "#004BA8",
                }}
              >
                Indicator
              </TableCell>
              {params.length > 0
                ? params.map((param) => (
                    <TableCell
                      key={param.id}
                      style={{ color: "white", backgroundColor: "#3b66f5" }}
                    >
                      {param.paramName}
                    </TableCell>
                  ))
                : ""}
            </TableRow>
          </TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <TextField
                name="du"
                variant="standard"
                size="small"
                label="Filter by DU"
                value={filter.du}
                onChange={handleFilterChange}
                style={{ width: "80px" }}
              />
            </TableCell>
            <TableCell>
              <TextField
                name="projectId"
                variant="standard"
                size="small"
                label="Filter by ID"
                value={filter.projectId}
                onChange={handleFilterChange}
                style={{ width: "80px" }}
              />
            </TableCell>
            <TableCell>
              <TextField
                name="projectName"
                variant="standard"
                size="small"
                label="Filter by Project Name"
                value={filter.projectName}
                onChange={handleFilterChange}
                style={{ width: "80px" }}
              />
            </TableCell>
            <TableCell>
              <TextField
                name="weekOfAssessment"
                variant="standard"
                type="date"
                value={filter.weekOfAssessment}
                onChange={handleFilterChange}
                style={{ width: "120px", height: "1px" }}
              />
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <TextField
                name="engineeringManagerName"
                variant="standard"
                size="small"
                label="Filter by Engineering manager"
                value={filter.engineeringManagerName}
                onChange={handleFilterChange}
                style={{ width: "80px" }}
              />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  style={{
                    backgroundColor: deleteRows.includes(row.id)
                      ? "#ffcccc"
                      : "inherit",
                    textDecoration: deleteRows.includes(row.id)
                      ? "line-through"
                      : "none",
                  }}
                >
                  <TableCell>
                    {editRows[row.id] ? (
                      <IconButton onClick={() => handleCancelEditClick(row.id)}>
                        <Cancel />
                      </IconButton>
                    ) : (
                      <>
                        <IconButton
                          onClick={() => handleEditClick(row)}
                          disabled={deleteRows.includes(row.id)}
                        >
                          <Edit />
                        </IconButton>
                        {deleteRows.includes(row.id) ? (
                          <IconButton
                            onClick={() => handleCancelDeleteClick(row.id)}
                          >
                            <Cancel />
                          </IconButton>
                        ) : (
                          <IconButton onClick={() => handleDeleteClick(row.id)}>
                            <Delete />
                          </IconButton>
                        )}
                      </>
                    )}
                  </TableCell>
                  <TableCell>{row.du}</TableCell>
                  <TableCell>
                    {
                      <Link
                        onClick={() => {
                          handleModalPopup(row);
                        }}
                      >
                        {row.projectId}
                      </Link>
                    }
                  </TableCell>
                  <TableCell>
                    {editRows[row.id] ? (
                      <TextField
                        size="small"
                        name="projectName"
                        value={editRows[row.id].projectName}
                        onChange={(e) =>
                          handleEditForm(e, editRows[row.id], "projectName")
                        }
                        style={{ width: "130px" }}
                      />
                    ) : (
                      row.projectName
                    )}
                  </TableCell>
                  <TableCell>{row.weekOfAssessment}</TableCell>
                  <TableCell>
                    {
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: calculateRAGStatus(
                            row.overallScoreCurrentWeek
                          ),
                        }}
                      ></div>
                    }
                  </TableCell>
                  <TableCell>
                    {editRows[row.id] ? (
                      <TextField
                        name="engineeringManagerName"
                        size="small"
                        value={editRows[row.id].engineeringManagerName}
                        onChange={(e) =>
                          handleEditForm(
                            e,
                            editRows[row.id],
                            "engineeringManagerName"
                          )
                        }
                        style={{ width: "130px" }}
                      />
                    ) : (
                      row.engineeringManagerName
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {editRows[row.id] ? (
                      <TextField
                        size="small"
                        style={{ width: "80px" }}
                        name="overallScoreCurrentWeek"
                        value={editRows[row.id].overallScoreCurrentWeek}
                        disabled
                      />
                    ) : (
                      renderScoreBox(row.overallScoreCurrentWeek)
                    )}
                  </TableCell>
                  <TableCell>
                    {row.overallScorePreviousWeek &&
                      renderScoreBox(row.overallScorePreviousWeek)}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {parseInt(
                      row.overallScoreCurrentWeek == !null &&
                        row.overallScoreCurrentWeek?.replace("%", "")
                    ) >
                    parseInt(
                      row.overallScorePreviousWeek == !null &&
                        row.overallScorePreviousWeek?.replace("%", "")
                    ) ? (
                      <ArrowUpward style={{ color: "green" }} />
                    ) : parseInt(
                        row.overallScoreCurrentWeek == !null &&
                          row.overallScoreCurrentWeek?.replace("%", "")
                      ) <
                      parseInt(
                        row.overallScoreCurrentWeek == !null &&
                          row?.overallScorePreviousWeek?.replace("%", "")
                      ) ? (
                      <ArrowDownward style={{ color: "red" }} />
                    ) : (
                      <Remove style={{ color: "gray" }} />
                    )}
                  </TableCell>
                  {data.length > 0 &&
                    Object.keys(row.paramScoreList).map((param) => {
                      if (paramNames.includes(param)) {
                        return (
                          <TableCell key={param} sx={{ textAlign: "center" }}>
                            {editRows[row.id] ? (
                              <Select
                                value={
                                  editRows[row.id].paramScoreList[param].score
                                }
                                onChange={(e) =>
                                  handleEditFormChange(
                                    e,
                                    row.id,
                                    "score",
                                    param
                                  )
                                }
                                size="small"
                                style={{ width: "100px" }}
                              >
                                {params.length > 0 ? (
                                  params.map((listParam) => {
                                    if (param === listParam.paramName) {
                                      return Object.keys(
                                        listParam.parameterOptions
                                      ).map((key) => (
                                        <MenuItem value={key} key={key}>
                                          {`${key} - ${listParam.parameterOptions[key]}`}
                                        </MenuItem>
                                      ));
                                    }
                                  })
                                ) : (
                                  <MenuItem value="">
                                    <em>No Value</em>
                                  </MenuItem>
                                )}
                              </Select>
                            ) : (
                              row.paramScoreList[param].score
                            )}
                          </TableCell>
                        );
                      }
                    })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "10px", marginLeft: "40%" }}
        onClick={handleSaveAllClick}
        disabled={Object.keys(editRows).length === 0 && deleteRows.length === 0}
      >
        Update All
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>

          <Button onClick={handleDeleteConfirm} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={editModal}
        onClose={() => setEditModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            bgcolor: "background.paper",
            height: "92vh",
            boxShadow: 24,
            p: 2,
          }}
        >
          {/* <span
            style={{
              fontFamily: "Roboto",
              fontSize: "30px",
              fontWeight: 100,
              float: "right",
              paddingBottom: 16,
            }}
          >
            X
          </span> */}
          <IconButton
            sx={{ float: "right" }}
            onClick={() => setEditModal(false)}
          >
            <CloseIcon />
          </IconButton>
          <ProjectScoreIdUpdate
            selected={selectedRow}
            setEditModal={setEditModal}
          />
        </Box>
      </Modal>
    </div>
  );
};
export default DataTableWithParams;

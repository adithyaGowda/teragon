/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
  //Tooltip,
} from "@mui/material";
import {
  Edit,
  Delete,
  Cancel,
  ArrowUpward,
  ArrowDownward,
  Remove,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
const initialData = [
  {
    id: "1",
    projectId: "ID01",
    projectName: "ABG",
    RAGStatus: "Green",
    engagementManagerName: "Noopur Prabhakar",
    currentWeekScore: "62%",
    previousWeekScore: "80%",
    indicator: "Up",
    summary: "2",
    overallRAG: "2",
    individualStatus: "2",
    gogreenplan: "2",
    rissues: "3",
    howrecent: "1",
    almmetrics: "1",
    pastactionitems: "3",
    valueadds: "1",
    frequency: "1",
  },
  {
    id: "2",
    projectId: "ID02",
    projectName: "Atlas Copco",
    RAGStatus: "Red",
    engagementManagerName: "Prashanth Gantela",
    currentWeekScore: "45%",
    previousWeekScore: "50%",
    indicator: "Down",
    summary: "1",
    overallRAG: "48",
    individualStatus: "5",
    gogreenplan: "2",
    rissues: "3",
    howrecent: "1",
    almmetrics: "1",
    pastactionitems: "3",
    valueadds: "1",
    frequency: "1",
  },
  {
    id: "3",
    projectId: "ID03",
    projectName: "Sabre",
    RAGStatus: "Red",
    engagementManagerName: "Patha Baral",
    currentWeekScore: "94%",
    previousWeekScore: "94%",
    indicator: "Down",
    summary: "2",
    overallRAG: "2",
    individualStatus: "3",
    gogreenplan: "2",
    rissues: "3",
    howrecent: "1",
    almmetrics: "1",
    pastactionitems: "3",
    valueadds: "1",
    frequency: "1",
  },
  {
    id: "4",
    projectId: "ID04",
    projectName: "Chevron",
    RAGStatus: "Red",
    engagementManagerName: "Sanjay Bhatija",
    currentWeekScore: "45%",
    previousWeekScore: "50%",
    indicator: "Down",
    summary: "1",
    overallRAG: "48",
    individualStatus: "5",
    gogreenplan: "2",
    rissues: "3",
    howrecent: "1",
    almmetrics: "1",
    pastactionitems: "3",
    valueadds: "1",
    frequency: "1",
  },
  {
    id: "5",
    projectId: "ID05",
    projectName: "IEE",
    RAGStatus: "Red",
    engagementManagerName: "Nilesh jade",
    currentWeekScore: "90%",
    previousWeekScore: "50%",
    indicator: "Down",
    summary: "1",
    overallRAG: "48",
    individualStatus: "5",
    gogreenplan: "2",
    rissues: "3",
    howrecent: "1",
    almmetrics: "1",
    pastactionitems: "3",
    valueadds: "1",
    frequency: "1",
  },
];
const DataTableWithParams = () => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("projectName");
  const [editRows, setEditRows] = useState({});
  const [deleteRows, setDeleteRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState(null);
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
  const handleEditClick = (row) => {
    setEditRows((prev) => ({
      ...prev,
      [row.id]: { ...row },
    }));
  };
  const handleEditFormChange = (event, id) => {
    const { name, value } = event.target;
    setEditRows((prev) => ({
      ...prev,
      [id]: { ...prev[id], [name]: value },
    }));
  };
  const handleSaveAllClick = () => {
    const newData = data
      .filter((item) => !deleteRows.includes(item.id))
      .map((item) => {
        if (editRows[item.id]) {
          return { ...item, ...editRows[item.id] };
        }
        return item;
      });
    setData(newData);
    setEditRows({});
    setDeleteRows([]);
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
  const sortedData = data.sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    }
    return a[orderBy] > b[orderBy] ? -1 : 1;
  });

  const getRagColor = (score) => {
    const percentage = parseInt(score.replace("%", ""));
    if (percentage <= 60) return "#AB0000";
    if (percentage <= 70) return "#A5107D";
    if (percentage <= 90) return "#A69A31";
    return "#225E22";
  };
  const renderScoreBox = (score) => {
    const percentage = parseInt(score.replace("%", ""));
    let bgColor = "";
    if (percentage < 50) {
      bgColor = "#AB0000";
    } else if (percentage < 70) {
      bgColor = "#A69A31";
    } else {
      bgColor = "green";
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
  return (
    <div style={{ width: "80%" }}>
      <h4 style={{ fontFamily: "roboto", marginLeft: "10px" }}>
        Project Score List
      </h4>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "100%",
          maxHeight: "500px",
          overflowX: "auto",
          overflowY: "auto",
          padding: "10px",
        }}
        size="small"
        aria-label="a dense table"
      >
        <Table sx={{ minWidth: 2300 }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#004BA8" }}>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Actions
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "projectId"}
                  direction={orderBy === "projectId" ? order : "asc"}
                  onClick={() => handleRequestSort("projectId")}
                  style={{ color: "white" }}
                >
                  Project ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "projectName"}
                  direction={orderBy === "projectName" ? order : "asc"}
                  onClick={() => handleRequestSort("projectName")}
                  style={{ color: "white" }}
                >
                  Project Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                RAG Status
              </TableCell>

              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Engineering Manager
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "  currentWeekScore"}
                  direction={orderBy === "  currentWeekScore" ? order : "asc"}
                  onClick={() => handleRequestSort("currentWeekScore")}
                  style={{ color: "white" }}
                >
                  Current Week Score
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "previousWeekScore"}
                  direction={orderBy === "previousWeekScore" ? order : "asc"}
                  onClick={() => handleRequestSort("previousWeekScore")}
                  style={{ color: "white" }}
                >
                  Previous Week Score
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Indicator
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Summary
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Overall RAG
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Individual Status
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Go-Green Plan
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Risks/Issues
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                How Recent
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                ALM Metrics
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Past Action Items
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Value Adds
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center" }}>
                Frequency
              </TableCell>
            </TableRow>
          </TableHead>
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
                    <div style={{ display: "flex" }}>
                      {editRows[row.id] ? (
                        <IconButton
                          onClick={() => handleCancelEditClick(row.id)}
                        >
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
                            <IconButton
                              onClick={() => handleDeleteClick(row.id)}
                            >
                              <Delete />
                            </IconButton>
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`./AddParameterForm/${row.projectId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {row.projectId}
                    </Link>
                  </TableCell>
                  <TableCell>{row.projectName}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: getRagColor(row.currentWeekScore),
                        margin: "auto",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {editRows[row.id] ? (
                      <TextField
                        name="engagementManagerName"
                        value={editRows[row.id].engagementManagerName}
                        onChange={(e) => handleEditFormChange(e, row.id)}
                      />
                    ) : (
                      row.engagementManagerName
                    )}
                  </TableCell>
                  <TableCell>{renderScoreBox(row.currentWeekScore)}</TableCell>
                  <TableCell>{renderScoreBox(row.previousWeekScore)}</TableCell>
                  <TableCell>
                    {parseInt(row.currentWeekScore.replace("%", "")) >
                    parseInt(row.previousWeekScore.replace("%", "")) ? (
                      <ArrowUpward style={{ color: "green" }} />
                    ) : parseInt(row.currentWeekScore.replace("%", "")) <
                      parseInt(row.previousWeekScore.replace("%", "")) ? (
                      <ArrowDownward style={{ color: "red" }} />
                    ) : (
                      <Remove style={{ color: "gray" }} />
                    )}
                  </TableCell>
                  <TableCell>
                    {editRows[row.id] ? (
                      <TextField
                        name="summary"
                        value={editRows[row.id].summary}
                        onChange={(e) => handleEditFormChange(e, row.id)}
                      />
                    ) : (
                      row.summary
                    )}
                  </TableCell>
                  <TableCell>
                    {editRows[row.id] ? (
                      <TextField
                        name="overallRAG"
                        value={editRows[row.id].overallRAG}
                        onChange={(e) => handleEditFormChange(e, row.id)}
                      />
                    ) : (
                      row.overallRAG
                    )}
                  </TableCell>
                  <TableCell>
                    {editRows[row.id] ? (
                      <TextField
                        name="individualStatus"
                        value={editRows[row.id].individualStatus}
                        onChange={(e) => handleEditFormChange(e, row.id)}
                      />
                    ) : (
                      row.individualStatus
                    )}
                  </TableCell>
                  <TableCell>
                    {editRows[row.id] ? (
                      <TextField
                        name="gogreenplan"
                        value={editRows[row.id].gogreenplan}
                        onChange={(e) => handleEditFormChange(e, row.id)}
                      />
                    ) : (
                      row.gogreenplan
                    )}
                  </TableCell>
                  <TableCell>
                    {editRows[row.id] ? (
                      <TextField
                        name="overallRAG"
                        value={editRows[row.id].overallRAG}
                        onChange={(e) => handleEditFormChange(e, row.id)}
                      />
                    ) : (
                      row.overallRAG
                    )}
                  </TableCell>
                  <TableCell>
                    {editRows[row.id] ? (
                      <TextField
                        name="howrecent"
                        value={editRows[row.id].howrecent}
                        onChange={(e) => handleEditFormChange(e, row.id)}
                      />
                    ) : (
                      row.howrecent
                    )}
                  </TableCell>
                  <TableCell>
                    {editRows[row.id] ? (
                      <TextField
                        name="almmetrics"
                        value={editRows[row.id].almmetrics}
                        onChange={(e) => handleEditFormChange(e, row.id)}
                      />
                    ) : (
                      row.almmetrics
                    )}
                  </TableCell>
                  <TableCell>
                    {editRows[row.id] ? (
                      <TextField
                        name="pastactionitems"
                        value={editRows[row.id].pastactionitems}
                        onChange={(e) => handleEditFormChange(e, row.id)}
                      />
                    ) : (
                      row.pastactionitems
                    )}
                  </TableCell>
                  <TableCell>
                    {editRows[row.id] ? (
                      <TextField
                        name="valueadds"
                        value={editRows[row.id].valueadds}
                        onChange={(e) => handleEditFormChange(e, row.id)}
                      />
                    ) : (
                      row.valueadds
                    )}
                  </TableCell>
                  <TableCell>
                    {editRows[row.id] ? (
                      <TextField
                        name="frequency"
                        value={editRows[row.id].frequency}
                        onChange={(e) => handleEditFormChange(e, row.id)}
                      />
                    ) : (
                      row.frequency
                    )}
                  </TableCell>
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
        onClick={handleSaveAllClick}
        variant="contained"
        color="primary"
        style={{
          width: "150px",
          margin: "60px",
          marginTop: "30px",
          marginLeft: "40%",
        }}
      >
        Update All
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this row? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DataTableWithParams;

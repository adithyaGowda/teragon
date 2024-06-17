import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../config";
import { useEffect } from "react";
import {
  deleteParam,
  resetEditDelete,
  editParam,
  fetchParamData,
} from "../../utils/parameterSlice";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import UpdateTableParam from "./UpdateTableParam";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const ParameterTable = () => {
  const { tableTitle, updateBtn, tabelHead } = config.parameterTable;
  const { modalDesc, confirmBtn, cancelBtn, modalCaution } = config.modalUi;
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteParamId, setDeleteParamId] = useState(null);

  const params = useSelector((store) => store.parameter.params);
  const status = useSelector((store) => store.parameter.status);
  const deletedIds = useSelector((store) => store.parameter.deleteParams);
  const editIds = useSelector((store) => store.parameter.editParams);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchParamData());
    }
  }, [status, dispatch]);

  const handleEditMode = (id) => {
    dispatch(editParam(id));
  };

  const handleModalToggle = (id = null) => {
    setDeleteParamId(id);
    setConfirmDelete(!confirmDelete);
  };

  const handleConfirmDelete = () => {
    if (deleteParamId !== null) {
      dispatch(deleteParam(deleteParamId));
      setConfirmDelete(false);
    }
  };

  const handleBulkUpdate = () => {
    const editedArr = params.filter((param) => editIds.includes(param.id));

    const deletedArr = params
      .filter((param) => deletedIds.includes(param.id))
      .map((param) => ({ ...param, ["isDeleted"]: true }));

    console.log([...editedArr, ...deletedArr]);
    dispatch(resetEditDelete());
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "100%",
          maxHeight: "360px",
          overflowX: "auto",
          overflowY: "auto",
        }}
        size="small"
        aria-label="a dense table"
      >
        <Table sx={{ minWidth: 1800 }} stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#004BA8", padding: 0 }}>
              <TableCell
                sx={{
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "#004BA8",
                }}
              >
                {tabelHead.actions}
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "#004BA8",
                }}
              >
                {tabelHead.param_name}
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "#004BA8",
                }}
              >
                {tabelHead.weightage}
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  paddingLeft: 50,
                  backgroundColor: "#004BA8",
                }}
              >
                {tabelHead.param_values}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {params.length > 0 &&
              params.map((param) => {
                return editIds.includes(param.id) ? (
                  <UpdateTableParam key={param.id} param={param} />
                ) : (
                  !param.isDeleted && (
                    <TableRow
                      key={param.id}
                      sx={
                        deletedIds.includes(param.id)
                          ? {
                              textDecoration: "line-through",
                              backgroundColor: "#ffcccc",
                            }
                          : {}
                      }
                    >
                      <TableCell sx={{ textAlign: "center" }}>
                        <IconButton
                          onClick={() => handleEditMode(param.id)}
                          disabled={
                            deletedIds.includes(param.id) ? true : false
                          }
                        >
                          <Edit sx={{ padding: 0 }} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleModalToggle(param.id)}
                          disabled={
                            deletedIds.includes(param.id) ? true : false
                          }
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: 1,
                          textAlign: "center",
                        }}
                      >
                        {param.param_name}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: 1,
                          width: "1px",
                          whiteSpace: "nowrap",
                          textAlign: "center",
                        }}
                      >
                        {param.weightage}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: 1,
                          textAlign: "center",
                        }}
                      >
                        {Object.keys(param.range).map((key) => (
                          <TableCell
                            sx={{
                              width: 150,
                              borderBottom: "none",
                              padding: 1,
                              textAlign: "center",
                            }}
                            key={key}
                          >
                            {`${key} - ${param.range[key]}`}
                          </TableCell>
                        ))}
                      </TableCell>
                    </TableRow>
                  )
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ textAlign: "center", padding: 30 }}>
        <Button
          sx={{ backgroundColor: "#2D9CDB" }}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleBulkUpdate}
        >
          {updateBtn}
        </Button>
      </div>
      <Dialog
        open={confirmDelete}
        onClose={handleModalToggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modalDesc}
          </DialogContentText>
          <DialogContentText sx={{ fontSize: 12, color: "red" }}>
            {modalCaution}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete} autoFocus>
            {confirmBtn}
          </Button>
          <Button onClick={handleModalToggle}>{cancelBtn}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ParameterTable;

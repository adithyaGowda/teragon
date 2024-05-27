import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../../config";
import { useEffect } from "react";
import { addParam } from "../utils/parameterSlice";
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
  const { getMockData } = config;
  const { tableTitle, updateBtn, tabelHead } = config.parameterTable;
  const { modalDesc, confirmBtn, cancelBtn } = config.modalUi;
  const dispatch = useDispatch();
  const [editIds, setEditIds] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const params = useSelector((store) => store.parameter.params);

  useEffect(() => {
    dispatch(addParam(getMockData));
  }, []);

  const handleEditMode = (id) => {
    setEditIds((prevIds) => [...prevIds, id]);
  };

  const handleModalToggle = () => {
    setConfirmDelete(!confirmDelete);
  };

  const handleBulkUpdate = () => {
    console.log(params);
    setEditIds([]);
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", padding: 50 }}>{tableTitle}</h3>
      <TableContainer
        component={Paper}
        sx={{ minWidth: 650, margin: "auto" }}
        size="small"
        aria-label="a dense table"
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#004BA8" }}>
              <TableCell sx={{ color: "white" }}>{tabelHead.actions}</TableCell>
              <TableCell sx={{ color: "white" }}>
                {tabelHead.param_name}
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                {tabelHead.weightage}
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                {tabelHead.param_values}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {params.length > 0 &&
              params.map((param) => {
                return editIds.includes(param.id) ? (
                  <UpdateTableParam
                    key={param.id}
                    param={param}
                    setEditIds={setEditIds}
                    editIds={editIds}
                  />
                ) : (
                  <TableRow key={param.id}>
                    <TableCell>
                      <IconButton onClick={() => handleEditMode(param.id)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={handleModalToggle}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                    <TableCell>{param.param_name}</TableCell>
                    <TableCell>{param.weightage}</TableCell>
                    <TableCell>
                      {Object.keys(param.range).map((key) => (
                        <TableCell sx={{ width: 100 }} key={key}>
                          {param.range[key]}
                        </TableCell>
                      ))}
                    </TableCell>
                  </TableRow>
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
        </DialogContent>
        <DialogActions>
          <Button autoFocus>{confirmBtn}</Button>
          <Button onClick={handleModalToggle}>{cancelBtn}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ParameterTable;

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
import { Edit, Delete } from "@mui/icons-material";
import { Paper } from "@mui/material";
import UpdateTableParam from "./UpdateTableParam";

const ParameterTable = () => {
  const { getMockData } = config;
  const { tableTitle, updateBtn, tabelHead } = config.parameterTable;
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(-1);

  const params = useSelector((store) => store.parameter.params);

  useEffect(() => {
    dispatch(addParam(getMockData));
  }, []);
  console.log(params);
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
            <TableRow sx={{ backgroundColor: "#2196f3" }}>
              <TableCell sx={{ color: "white" }}>{tabelHead.edit}</TableCell>
              <TableCell sx={{ color: "white" }}>{tabelHead.delete}</TableCell>
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
                return editId === param.id ? (
                  <UpdateTableParam key={param.id} param={param} />
                ) : (
                  <TableRow key={param.id}>
                    <TableCell>
                      <IconButton onClick={() => setEditId(param.id)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton>
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
        <Button variant="contained" color="primary" type="submit">
          {updateBtn}
        </Button>
      </div>
    </div>
  );
};

export default ParameterTable;

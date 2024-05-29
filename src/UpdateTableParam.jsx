import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeEditId, updateParam } from "../utils/parameterSlice";
import CancelIcon from "@mui/icons-material/Cancel";

const UpdateTableParam = ({ param }) => {
  const { id, param_name, weightage, range } = param;
  const [initailParam, setInitialParam] = useState({
    param_name,
    weightage,
    range,
  });
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(updateParam({ id, ...initailParam }));
    dispatch(removeEditId(id));
  };

  const handleChange = (field, value) => {
    dispatch(
      updateParam({
        ...param,
        [field]: value,
      })
    );
  };

  const handleRangeChange = (key, value) => {
    dispatch(
      updateParam({
        ...param,
        range: { ...param.range, [key]: value },
      })
    );
  };

  return (
    <TableRow>
      <TableCell sx={{ textAlign: "center" }}>
        <IconButton onClick={handleClose}>
          <CancelIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          margin="normal"
          size="small"
          value={param.param_name}
          onChange={(e) => handleChange("param_name", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          margin="normal"
          size="small"
          value={param.weightage}
          onChange={(e) => handleChange("weightage", e.target.value)}
        />
      </TableCell>
      <TableCell>
        {Object.keys(param.range).map((key) => (
          <TableCell sx={{ width: 100, borderBottom: "none" }} key={key}>
            <TextField
              variant="outlined"
              margin="normal"
              size="small"
              value={param.range[key]}
              onChange={(e) => handleRangeChange(key, e.target.value)}
            />
          </TableCell>
        ))}
      </TableCell>
    </TableRow>
  );
};

export default UpdateTableParam;

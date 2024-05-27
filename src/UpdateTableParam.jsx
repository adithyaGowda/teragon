import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateParam } from "../utils/parameterSlice";
import CancelIcon from "@mui/icons-material/Cancel";

const UpdateTableParam = ({ param, editIds, setEditIds }) => {
  const [localParamName, setLocalParamName] = useState(param.param_name);
  const [localWeightage, setLocalWeightage] = useState(param.weightage);
  const [localRange, setLocalRange] = useState(param.range);
  const dispatch = useDispatch();

  const handleClose = () => {
    const filteredArr = editIds.filter((id) => param.id !== id);
    setEditIds(filteredArr);
  };

  const handleUpdate = () => {
    dispatch(
      updateParam({
        ...param,
        param_name: localParamName,
        weightage: localWeightage,
        range: localRange,
      })
    );
  };

  return (
    <TableRow>
      <TableCell>
        <IconButton onClick={handleClose}>
          <CancelIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          margin="normal"
          value={localParamName}
          onChange={(e) => setLocalParamName(e.target.value)}
          onBlur={handleUpdate}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          margin="normal"
          value={localWeightage}
          onChange={(e) => setLocalWeightage(e.target.value)}
          onBlur={handleUpdate}
        />
      </TableCell>
      <TableCell>
        {Object.keys(param.range).map((key) => (
          <TableCell sx={{ width: 100 }} key={key}>
            <TextField
              variant="outlined"
              margin="normal"
              value={localRange[key]}
              onChange={(e) =>
                setLocalRange({ ...localRange, [key]: e.target.value })
              }
              onBlur={handleUpdate}
            />
          </TableCell>
        ))}
      </TableCell>
    </TableRow>
  );
};

export default UpdateTableParam;

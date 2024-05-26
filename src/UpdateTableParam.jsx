import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import config from "../../config";
import { useDispatch } from "react-redux";
import { updateParam } from "../utils/parameterSlice";

const UpdateTableParam = ({ param, setIsParamUpdated }) => {
  const { updateBtn } = config.parameterTable;
  const [localParamName, setLocalParamName] = useState(param.param_name);
  const [localWeightage, setLocalWeightage] = useState(param.weightage);
  const [localRange, setLocalRange] = useState(param.range);
  const dispatch = useDispatch();

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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleUpdate}
        >
          {updateBtn}
        </Button>
      </TableCell>
      <TableCell>
        <IconButton disabled={true}>
          <Delete />
        </IconButton>
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          margin="normal"
          value={localParamName}
          onChange={(e) => setLocalParamName(e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          margin="normal"
          value={localWeightage}
          onChange={(e) => setLocalWeightage(e.target.value)}
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
            />
          </TableCell>
        ))}
      </TableCell>
    </TableRow>
  );
};

export default UpdateTableParam;

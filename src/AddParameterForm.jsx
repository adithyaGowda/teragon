import React, { useState } from "react";
import config from "../../config";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";

const AddParameterForm = () => {
  const { title, formLabels, buttonLabel, formErrors, noItemsText } =
    config.addParameter;
  const [param, setParam] = useState("");
  const [weightage, setWeightage] = useState("");
  const [range, setRange] = useState(0);
  const [rangeText, setRangeText] = useState({});
  const [errors, setErrors] = useState({});

  const handleSetRange = (e) => {
    if (e.target.value < 1) {
      setErrors({ ...errors, range: formErrors.rangeErr });
      setRange(0);
    } else {
      setRange(e.target.value);
      setErrors({ ...errors, range: "" });
    }
  };

  const handleSetParamName = (e) => {
    if (e.target.value === "") {
      setErrors({ ...errors, param_name: formErrors.paramNameErr });
      setParam("");
    } else {
      setParam(e.target.value);
      setErrors({ ...errors, param_name: "" });
    }
  };

  const handleSetWeightage = (e) => {
    if (e.target.value === "") {
      setErrors({ ...errors, weightage: formErrors.weightageErr });
      setWeightage("");
    } else {
      setWeightage(e.target.value);
      setErrors({ ...errors, weightage: "" });
    }
  };

  const rangeLabel = [...Array(parseInt(range)).keys()];

  const handleRangeChange = (e, ele) => {
    setRangeText({ ...rangeText, [ele]: e.target.value });
  };

  const handleSubmit = () => {
    if (param === "" || weightage === "" || range === 0) {
      setErrors({ ...errors, emptySubmit: formErrors.emptySubmitErr });
    } else {
      console.log({
        param_name: param,
        weightage,
        max_range: range,
        range_text: rangeText,
      });
    }

    setParam("");
    setWeightage("");
    setRange(0);
    setRangeText({});
    setErrors({});
  };

  return (
    <div style={{ textAlign: "center" }}>
      <AppBar
        sx={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: "#004BA8",
        }}
        position="static"
      >
        <h3>{title}</h3>
      </AppBar>

      <form>
        <div
          style={{
            margin: 10,
            padding: 10,
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ position: "relative" }}>
            {errors.param_name && (
              <span
                style={{
                  fontSize: 12,
                  color: "red",
                  position: "absolute",
                  top: -10,
                  left: 10,
                }}
              >
                {errors.param_name}
              </span>
            )}
            <TextField
              label={formLabels.param_name}
              variant="outlined"
              margin="normal"
              value={param}
              onChange={handleSetParamName}
            />
          </div>
          <div style={{ position: "relative" }}>
            {errors.weightage && (
              <span
                style={{
                  fontSize: 12,
                  color: "red",
                  position: "absolute",
                  top: -10,
                  left: 10,
                }}
              >
                {errors.weightage}
              </span>
            )}
            <TextField
              label={formLabels.weightage}
              variant="outlined"
              margin="normal"
              value={weightage}
              onChange={handleSetWeightage}
            />
          </div>
          <div style={{ position: "relative" }}>
            {errors.range && (
              <span
                style={{
                  fontSize: 12,
                  color: "red",
                  position: "absolute",
                  top: -10,
                  left: 10,
                }}
              >
                {errors.range}
              </span>
            )}
            <TextField
              label={formLabels.max_range}
              variant="outlined"
              margin="normal"
              type="number"
              value={range}
              onChange={handleSetRange}
            />
          </div>
        </div>
        {
          <>
            {range > 0 && <h3>{noItemsText}</h3>}
            <div
              style={{
                margin: 10,
                padding: 10,
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              {rangeLabel.map((ele) => (
                <TextField
                  key={ele}
                  label={ele}
                  variant="outlined"
                  margin="normal"
                  onChange={(e) => handleRangeChange(e, ele)}
                />
              ))}
            </div>
          </>
        }
      </form>
      <div style={{ position: "relative" }}>
        {errors.emptySubmit && (
          <span
            style={{
              fontSize: 12,
              color: "red",
              position: "absolute",
              bottom: 45,
            }}
          >
            {errors.emptySubmit}
          </span>
        )}
        <div style={{ paddingBottom: 20 }}>
          <Button
            sx={{ backgroundColor: "#2D9CDB" }}
            onClick={handleSubmit}
            variant="contained"
            type="submit"
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddParameterForm;

import React, { useState } from "react";
import config from "../../config";
import { Button, TextField } from "@mui/material";

const AddParameterForm = () => {
  const { title, formLabels, buttonLabel, formErrors } = config.addParameter;
  const [param, setParam] = useState("");
  const [weightage, setWeightage] = useState(0);
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
      setWeightage(0);
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
    if (Object.entries(errors).length < 2) {
      setErrors({ ...errors, emptySubmit: formErrors.emptySubmitErr });
    } else {
      console.log({
        param_name: param,
        weightage,
        max_range: range,
        range_text: rangeText,
      });
    }
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h3>{title}</h3>
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
              onBlur={handleSetParamName}
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
              type="number"
              onBlur={handleSetWeightage}
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
              onBlur={handleSetRange}
            />
          </div>
        </div>
        {
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
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          type="submit"
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};

export default AddParameterForm;

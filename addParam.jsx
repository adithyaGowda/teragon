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

  const handleSetParamName = (e) => {
    const paramName = e.target.value;
    setParam(paramName);
    validateField("param_name", paramName);
  };

  const handleSetWeightage = (e) => {
    const weight = e.target.value;
    setWeightage(weight);
    validateField("weightage", weight);
  };

  const handleSetRange = (e) => {
    const newRange = parseInt(e.target.value);
    setRange(newRange);
    validateField("range", newRange);
  };

  const handleRangeChange = (e, ele) => {
    setRangeText({ ...rangeText, [ele]: e.target.value });
  };

  const validateField = (fieldName, value) => {
    if (fieldName === "param_name" && value === "") {
      setErrors({ ...errors, [fieldName]: formErrors.paramNameErr });
    } else if (fieldName === "weightage" && value === "") {
      setErrors({ ...errors, [fieldName]: formErrors.weightageErr });
    } else if (fieldName === "range" && value < 1) {
      setErrors({ ...errors, [fieldName]: formErrors.rangeErr });
    } else {
      setErrors({ ...errors, [fieldName]: "" });
    }
  };

  const handleSubmit = () => {
    const errorCount = Object.values(errors).filter((error) => error).length;
    if (errorCount < 2) {
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

  const renderRangeInputs = () => {
    if (range > 0) {
      return rangeLabel.map((ele) => (
        <TextField
          key={ele}
          label={ele}
          variant="outlined"
          margin="normal"
          onChange={(e) => handleRangeChange(e, ele)}
        />
      ));
    }
    return null;
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
              <span className="error-message">{errors.param_name}</span>
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
              <span className="error-message">{errors.weightage}</span>
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
              <span className="error-message">{errors.range}</span>
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
        <div
          style={{
            margin: 10,
            padding: 10,
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {renderRangeInputs()}
        </div>
      </form>
      <div style={{ position: "relative" }}>
        {errors.emptySubmit && (
          <span className="error-message">{errors.emptySubmit}</span>
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

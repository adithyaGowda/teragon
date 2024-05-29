import React, { useState } from "react";
import config from "../../config";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../utils/parameterSlice";

const AddParameterForm = () => {
  const { title, formLabels, buttonLabel, formErrors, rangePlaceholder } =
    config.addParameter;
  const [param, setParam] = useState("");
  const [weightage, setWeightage] = useState(0);
  const [rangeCount, setRangeCount] = useState(0);
  const [rangeText, setRangeText] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  //remove the subscription as this is just for testing
  const params = useSelector((store) => store.parameter.params);

  const handleSetRange = (e) => {
    if (e.target.value < 1) {
      setErrors({ ...errors, range: formErrors.rangeErr });
      setRangeCount(0);
    } else {
      setRangeCount(e.target.value);
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
    if (e.target.value < 0) {
      setErrors({ ...errors, weightage: formErrors.weightageErr });
      setWeightage(0);
    } else {
      setWeightage(e.target.value);
      setErrors({ ...errors, weightage: "" });
    }
  };

  const rangeLabel = [...Array(parseInt(rangeCount)).keys()];

  const handleRangeChange = (e, ele) => {
    setRangeText({ ...rangeText, [ele]: e.target.value });
  };

  const handleSubmit = () => {
    if (param === "" || weightage === "" || rangeCount === 0) {
      setErrors({ ...errors, emptySubmit: formErrors.emptySubmitErr });
    } else {
      dispatch(
        submitForm({
          id: params.length + 1,
          param_name: param,
          weightage,
          range: rangeText,
          isDeleted: false,
        })
      );
    }

    setParam("");
    setWeightage(0);
    setRangeCount(0);
    setRangeText({});
    setErrors({});
  };

  return (
    <div style={{ backgroundColor: "#FCFCFC" }}>
      <AppBar
        sx={{
          height: "60px",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          backgroundColor: "#004BA8",
        }}
        position="static"
      >
        <h3
          style={{
            paddingLeft: 20,
            fontFamily: "Roboto",
            fontWeight: "lighter",
          }}
        >
          {title}
        </h3>
      </AppBar>

      <form style={{ paddingTop: 20 }}>
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
              size="small"
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
              type="number"
              size="small"
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
              size="small"
              value={rangeCount}
              onChange={handleSetRange}
            />
          </div>
        </div>
        {rangeLabel.length > 0 ? (
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
                size="small"
                margin="normal"
                placeholder={rangePlaceholder}
                onChange={(e) => handleRangeChange(e, ele)}
              />
            ))}
          </div>
        ) : (
          <div style={{ height: "80px" }}></div>
        )}
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
        <div style={{ paddingBottom: 20, textAlign: "center" }}>
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

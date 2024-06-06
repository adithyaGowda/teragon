import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectData } from "../utils/projectDataSlice";
import config from "../../config";
import { AppBar, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { set } from "date-fns";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { fetchParamData } from "../utils/parameterSlice";

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
})(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary[theme.palette.mode],
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary[theme.palette.mode],
    },
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

const isInSameWeek = (dayA, dayB) => {
  if (dayB == null) {
    return false;
  }

  return dayA.isSame(dayB, "week");
};

function Day(props) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}

const ProjectScoreUpdate = () => {
  const { formTitle, formLabels, deliveryUnits, totalWeightage } =
    config.projectScoreUpdate;
  const { tabelHead } = config.projectScoreUpdate.projectTable;
  const [projectScore, setProjectScore] = useState(null);
  const [openCalender, setOpenCalender] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [value, setValue] = useState(dayjs("06-06-2024"));
  const [projectId, setprojectId] = useState("");
  const [duName, setDuName] = useState("");
  const [selectedProjs, setSelectedProjs] = useState([]);
  const [paramScore, setParamScore] = useState({});
  const [addScore, setAddScore] = useState(0);

  const dispatch = useDispatch();
  console.log(new Date().toJSON().slice(0, 10));
  const status = useSelector((store) => store.projectData.status);
  const projects = useSelector((store) => store.projectData.projects);
  const params = useSelector((store) => store.parameter.params);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjectData());
      dispatch(fetchParamData());
    }
  }, [status, dispatch]);

  const handleDUChange = (du) => {
    setDuName(du);
    const filteredProj = projects.filter((proj) => proj.du === du);
    setSelectedProjs([...filteredProj]);
  };

  const handleParamScore = (paramName, e) => {
    setParamScore({ ...paramScore, [paramName]: e.target.value });
  };

  const handleCalculateScore = () => {
    let sum = 0;
    params.forEach((param) => {
      if (paramScore.hasOwnProperty(param.param_name)) {
        sum +=
          parseInt(param.weightage) * parseInt(paramScore[param.param_name]);
      }
    });
    setProjectScore((sum / totalWeightage) * 100);
  };

  console.log(value);
  return (
    <div
      style={{
        width: "80%",
        padding: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="section"
        sx={{
          background: "#FCFCFC",
          boxShadow: 2,
        }}
      >
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
            <h4
              style={{
                paddingLeft: 20,
                fontFamily: "Roboto",
                fontWeight: "lighter",
              }}
            >
              {formTitle}
            </h4>
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
              <div style={{ position: "relative", paddingTop: 24 }}>
                <FormControl sx={{ minWidth: 230 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    {formLabels.delivery_unit}
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={duName}
                    label={formLabels.delivery_unit}
                    onChange={(e) => handleDUChange(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {deliveryUnits.map((data) => (
                      <MenuItem value={data} key={data}>
                        {data}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ position: "relative", paddingTop: 24 }}>
                <FormControl sx={{ minWidth: 230 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    {formLabels.projId_name}
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={projectId}
                    label={formLabels.projId_name}
                    onChange={(e) => setprojectId(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {selectedProjs.length > 0 &&
                      selectedProjs.map((data) => (
                        <MenuItem value={data.projectId} key={data.id}>
                          {`${data.projectId} - ${data.projectName}`}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ paddingTop: 8 }}>
                <TextField
                  sx={{ minWidth: 230, position: "relative" }}
                  label={formLabels.weekOfAssessment}
                  placeholder={formLabels.weekOfAssessment}
                  variant="outlined"
                  margin="normal"
                  size="small"
                  onFocus={() => setOpenCalender((prev) => !prev)}
                  onBlur={() => setOpenCalender((prev) => !prev)}
                />
                <IconButton
                  sx={{ position: "absolute", left: 1010, top: 205 }}
                  onClick={() => setOpenCalender((prev) => !prev)}
                >
                  <CalendarMonthIcon />
                </IconButton>
                {openCalender && (
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 999,
                      backgroundColor: "white",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        showDaysOutsideCurrentMonth
                        displayWeekNumber
                        slots={{ day: Day }}
                        slotProps={{
                          day: (ownerState) => ({
                            selectedDay: value,
                            hoveredDay,
                            onPointerEnter: () => setHoveredDay(ownerState.day),
                            onPointerLeave: () => setHoveredDay(null),
                          }),
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                )}
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label={formLabels.weekOfAssessment}
                      slotProps={{ textField: { size: "small" } }}
                    />
                  </DemoContainer>
                </LocalizationProvider> */}
              </div>
              <div style={{ textAlign: "center" }}>
                <label
                  style={{
                    color: "#2F3A74",
                    fontStyle: "Roboto",
                    fontSize: "18px",
                    fontWeight: 500,
                  }}
                >
                  {formLabels.projectScore}
                </label>
                <Box
                  sx={{
                    width: "194px",
                    height: "43px",
                    backgroundColor: "#D4DEFF",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#004BA8",
                      fontWeight: 800,
                      fontSize: "20px",
                      fontFamily: "Roboto",
                    }}
                  >
                    {projectScore === null ? "--" : projectScore}
                  </span>
                </Box>
              </div>
            </div>
          </form>
        </div>
      </Box>
      <div
        style={{
          paddingTop: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "75%",
            maxHeight: "300px",
            overflowY: "auto",
          }}
          size="small"
          aria-label="a dense table"
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#004BA8", padding: 0 }}>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  {tabelHead.hash}
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  {tabelHead.param_name}
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  {tabelHead.param_score}
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  {tabelHead.remarks}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                params.length > 0 &&
                  params.map((param, index) => (
                    <TableRow key={param.id}>
                      <TableCell
                        sx={{
                          padding: 1,
                          textAlign: "center",
                        }}
                      >
                        {index + 1}
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
                          textAlign: "center",
                        }}
                      >
                        <FormControl sx={{ minWidth: 180 }} size="small">
                          <InputLabel id="demo-select-small-label">
                            Select Score
                          </InputLabel>
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            // value={age}
                            label="Select Value"
                            onChange={(e) =>
                              handleParamScore(param.param_name, e)
                            }
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {Object.keys(param.range).map((key) => (
                              <MenuItem value={key} key={key}>
                                {`${key} - ${param.range[key]}`}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <TextField
                          label={tabelHead.remarks}
                          variant="outlined"
                          margin="normal"
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))

                // Object.keys(selected).length > 0 &&
                //   Object.keys(selected.paramList).map((key, index) => )
              }
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            padding: 30,
            display: "flex",
          }}
        >
          <Button
            onClick={handleCalculateScore}
            sx={{
              backgroundColor: "#2D9CDB",
              marginRight: 20,
            }}
            variant="contained"
            color="primary"
            type="submit"
          >
            calculate
          </Button>
          <Button
            disabled={projectScore === null ? true : false}
            sx={{ backgroundColor: "#2D9CDB" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectScoreUpdate;

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectData } from "../utils/projectDataSlice";
import config from "../../config";
import { AppBar, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
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
  ...(day.day() === 1 && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(day.day() === 5 && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
  ...(day.day() === 0 && {
    backgroundColor: "white",
    color: "black",
  }),
  ...(day.day() === 6 && {
    backgroundColor: "white",
    color: "black",
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
  const { formTitle, formLabels, totalWeightage, projectScoreColor } =
    config.projectScoreUpdate;
  const { tabelHead } = config.projectScoreUpdate.projectTable;
  const [projectScore, setProjectScore] = useState(null);
  const [openCalender, setOpenCalender] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [value, setValue] = useState(dayjs(new Date().toJSON().slice(0, 10)));
  const [projectId, setprojectId] = useState("");
  const [duName, setDuName] = useState("");
  const [selectedProjs, setSelectedProjs] = useState([]);
  const [paramScore, setParamScore] = useState({});

  const dispatch = useDispatch();

  const status = useSelector((store) => store.projectData.status);
  const projects = useSelector((store) => store.projectData.projects);
  const params = useSelector((store) => store.parameter.params);
  const deliveryUnits = useSelector((store) => store.projectData.deliveryUnits);

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

  const handleParamScore = (paramName, weightage, e) => {
    setParamScore({
      ...paramScore,
      [paramName]: {
        ...paramScore[paramName],
        score: e.target.value,
        weightage,
      },
    });
  };

  const handleComments = (paramName, e) => {
    setParamScore({
      ...paramScore,
      [paramName]: { ...paramScore[paramName], comments: e.target.value },
    });
  };

  const handleCalculateScore = () => {
    let sum = 0;
    // params.forEach((param) => {
    //   if (Object.prototype.hasOwnProperty.call(paramScore, param.param_name)) {
    //     sum +=
    //       parseInt(param.weightage) *
    //       parseInt(paramScore[param.param_name]["score"]);
    //   }
    // });
    Object.keys(paramScore).map((key) => {
      sum +=
        parseInt(paramScore[key]["score"]) *
        parseInt(paramScore[key]["weightage"]);
    });

    setProjectScore(Math.ceil((sum / totalWeightage) * 100));
  };

  const handleDateChange = (newValue) => {
    const monday = newValue.startOf("week").add(1, "day");
    setValue(monday);
    setOpenCalender(false);
  };

  const handleScoreCss = () => {
    return {
      color:
        projectScore < 60
          ? projectScoreColor.red
          : projectScore <= 70
          ? projectScoreColor.pink
          : projectScore > 70 && projectScore < 90
          ? projectScoreColor.amber
          : projectScore >= 90
          ? projectScoreColor.green
          : projectScoreColor.blue,
      fontWeight: 800,
      fontSize: "20px",
      fontFamily: "Roboto",
    };
  };

  return (
    <div
      style={{
        width: "80%",
        padding: 10,
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
                paddingBottom: 30,
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "lighter",
                    color: "#2F3A74",
                    paddingBottom: 15,
                    fontSize: "14px",
                  }}
                >
                  {formLabels.delivery_unit}
                </label>
                <FormControl sx={{ minWidth: 230 }} size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={duName}
                    onChange={(e) => handleDUChange(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {deliveryUnits?.map((data, index) => (
                      <MenuItem value={data} key={index}>
                        {data}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "lighter",
                    color: "#2F3A74",
                    paddingBottom: 15,
                    fontSize: "14px",
                  }}
                >
                  {formLabels.projId_name}
                </label>
                <FormControl sx={{ minWidth: 230 }} size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={projectId}
                    onChange={(e) => setprojectId(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {selectedProjs.length > 0 &&
                      selectedProjs?.map((data) => (
                        <MenuItem value={data.projectId} key={data.id}>
                          {`${data.projectId} - ${data.projectName}`}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label
                    style={{
                      fontFamily: "Roboto",
                      fontWeight: "lighter",
                      color: "#2F3A74",
                      fontSize: "14px",
                    }}
                  >
                    {formLabels.weekOfAssessment}
                  </label>
                  <TextField
                    sx={{ minWidth: 230, position: "relative" }}
                    variant="outlined"
                    margin="normal"
                    size="small"
                    value={value.format("DD-MM-YYYY")}
                    onFocus={() => setOpenCalender((prev) => !prev)}
                    onBlur={() => setOpenCalender((prev) => !prev)}
                  />
                </div>
                <IconButton
                  sx={{ position: "absolute", left: "75%", top: "34%" }}
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
                        onChange={handleDateChange}
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
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "lighter",
                    color: "#2F3A74",
                    fontSize: "14px",
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
                    marginTop: 1.5,
                  }}
                >
                  <span style={handleScoreCss()}>
                    {projectScore === null ? "--" : `${projectScore}%`}
                  </span>
                </Box>
              </div>
            </div>
          </form>
        </div>
      </Box>
      <div
        style={{
          paddingTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "80%",
            maxHeight: "230px",
            overflowY: "auto",
          }}
          size="small"
          aria-label="a dense table"
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#004BA8", padding: 0 }}>
                <TableCell
                  sx={{
                    color: "white",
                    textAlign: "center",
                    backgroundColor: "#004BA8",
                  }}
                >
                  {tabelHead.hash}
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    textAlign: "center",
                    backgroundColor: "#004BA8",
                  }}
                >
                  {tabelHead.param_name}
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    textAlign: "center",
                    backgroundColor: "#004BA8",
                  }}
                >
                  {tabelHead.param_score}
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    textAlign: "center",
                    backgroundColor: "#004BA8",
                  }}
                >
                  {tabelHead.remarks}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {params.length > 0 &&
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
                      {param.paramName}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: 1,
                        textAlign: "center",
                      }}
                    >
                      <FormControl sx={{ minWidth: 392.16 }} size="small">
                        <InputLabel id="demo-select-small-label">
                          Select Score
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          label="Select Value"
                          onChange={(e) =>
                            handleParamScore(
                              param.paramName,
                              param.weightage,
                              e
                            )
                          }
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {Object.keys(param.parameterOptions).map((key) => (
                            <MenuItem value={key} key={key}>
                              {`${key} - ${param.parameterOptions[key]}`}
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
                        onChange={(e) => handleComments(param.paramName, e)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
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

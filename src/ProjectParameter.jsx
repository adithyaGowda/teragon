import React from "react";
import AddParameterForm from "./AddParameterForm";
import { Box } from "@mui/material";
import ParameterTable from "./ParameterTable";
import config from "../../config";

const ProjectParameter = () => {
  const { tableTitle } = config.parameterTable;
  return (
    <div style={{ width: "80%" }}>
      <Box
        component="section"
        sx={{
          borderRadius: 2,
          boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.3)",
          background: "#FCFCFC",
        }}
      >
        <AddParameterForm />
      </Box>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          background: "white",
          paddingTop: 30,
          flexDirection: "column",
        }}
      >
        <h3 style={{ paddingLeft: 50 }}>{tableTitle}</h3>
        <Box
          sx={{
            height: "100vh",
            background: "#FCFCFC",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: 1,
            padding: 4,
          }}
        >
          <ParameterTable />
        </Box>
      </div>
    </div>
  );
};

export default ProjectParameter;

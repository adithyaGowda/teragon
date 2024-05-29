import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <Box
      sx={{
        width: "20%",
        height: "100vh",
        backgroundColor: "#F9F9F9",
        paddingTop: "20px",
      }}
    >
      <List>
        <ListItemButton>
          <Link
            to={"/projectParam"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemText primary="Project Parameter" />
          </Link>
        </ListItemButton>
        <ListItemButton>
          <Link
            to={"/projectData"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemText primary="Project Data" />
          </Link>
        </ListItemButton>
      </List>
    </Box>
  );
};

export default SideBar;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Icon, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item) => {
    setSelectedItem(item);
  };
  const menuItems = [
    {
      id: "projectScoreList",
      label: "Project Score List",
      link: "/projectScoreList",
      image: "../projectscoreupdate.png",
    },
    {
      id: "projectScoreUpdate",
      label: "Project Score Update",
      link: "/projectScoreUpdate",
      image: "../new.png",
    },
    {
      id: "projectData",
      label: "Project Data",
      link: "/",
      image: "../projectdata.png",
    },
    {
      id: "projectParam",
      label: "Project Parameter",
      link: "/projectParam",
      image: "../parameter.png",
    },
  ];
  return (
    <Box
      sx={{
        width: "20%",
        height: "100%",
        backgroundColor: "#F9F9F9",
        paddingTop: "5px",
        borderRight: "1px solid gray",
      }}
    >
      <List>
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            style={{
              textDecoration: "none",
              color: selectedItem === item.id ? "white" : "Black",
              fontFamily: "Roboto",
              fontSize: "8px",
            }}
          >
            <ListItemButton
              onClick={() => handleClick(item.id)}
              sx={{
                backgroundColor: selectedItem === item.id ? "#004BA8" : "",
              }}
            >
              <img
                src={item.image}
                alt=""
                style={{ width: "20px", height: "20px", padding: "10px" }}
              />
              <ListItemText primary={item.label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );
};
export default SideBar;

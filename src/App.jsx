import React, { useEffect, useState } from "react";
import "@fontsource/roboto/500.css";
import "./App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import appStore from "./utils/appStore";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setIsSidebarOpen } from "./utils/parameterSlice";
import Login from "./components/Login";
import { jwtDecode } from "jwt-decode";
import {
  fetchUserRole,
  getDataFromDummy,
  userProfile,
} from "./utils/userSlice";
import Cookies from "js-cookie";
import AccessError from "./components/AccessError";

const App = () => {
  const dispatch = useDispatch();

  const code = window.location.href.split("=")[1];
  const ClientId = "itke9a465pu2h3c03re23lvu7";
  const redirect_uri = "http://localhost:5173";

  useEffect(() => {
    if (code) {
      fetch(
        "https://ltim-de-user-pool.auth.us-east-1.amazoncognito.com/oauth2/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=authorization_code&code=${code}&client_id=${ClientId}&redirect_uri=${redirect_uri}`,
        }
      )
        .then((response) => response.json())
        .then((res) => {
          const { access_token, id_token, refresh_token } = res;
          localStorage.setItem("AWS_ACCESS_TOKEN", access_token);
          localStorage.setItem("AGILE_REFRESH_TOKEN", refresh_token);
          localStorage.setItem("AGILE_ID_TOKEN", id_token);
          // Cookies.set("AGILE_ID_TOKEN", id_token, { expires: 1, secure: true });
          const user = jwtDecode(id_token);
          // dispatch(userProfile(user));
          return user?.email;
        })
        .then((email) => dispatch(getDataFromDummy(email.toLowerCase())))
        .catch((err) => console.log(err));
      // .then((email) => dispatch(fetchUserRole(email)))
    }
  }, []);

  const userData = useSelector((store) => store.user.userData);

  const toggleSidebar = () => {
    dispatch(setIsSidebarOpen());
  };

  if (!localStorage.getItem("AGILE_ID_TOKEN")) {
    return <Login />;
  }

  if (Object.keys(userData).length === 0) {
    return <AccessError />;
  } else
    return (
      <div className="app-container ">
        <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
          <Box
            component="header"
            sx={{
              height: "70px",
              borderBottom: "1px solid gray",
            }}
          >
            <Header toggleSidebar={toggleSidebar} />
          </Box>
          <Box sx={{ display: "flex", flex: 1 }}>
            {userData?.role === "admin" && <SideBar />}
            <Outlet />
            <ToastContainer />
          </Box>
        </Box>
      </div>
    );
};
export default App;

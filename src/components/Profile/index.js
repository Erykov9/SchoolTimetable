import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styles from "./style.module.scss";

import Classes from "./ClassesComponent/Classes";
import Classrooms from "./ClassroomsComponent/Classrooms";
import Subjects from "./SubjetsComponent/Subjects";
import Teachers from "./TeachersComponent/Teachers";
import Timetables from "./TimetablesComponent/Timetables";
import {
  advancedDrawer,
  restDrawer,
  schoolPlannerDrawer,
} from "./profileConfig";
import Labels from "./LabelsComponent/Labels";

import SchoolInfoStore from "../../mobx/SchoolInfoStore";
import { observer } from "mobx-react";
import Lessons from "./LessonsComponent/Lessons";

const drawerWidth = 240;

const Profile = observer(() => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { schoolPlanConfig } = SchoolInfoStore;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Typography variant="h3" textAlign={"center"} fontWeight={300}>
        LOGO
      </Typography>
      <Divider />
      <List>
        {schoolPlannerDrawer.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            onClick={() => navigate(`${item.href}`)}
          >
            <ListItemButton>
              <ListItemIcon>
                {item.icon(schoolPlanConfig?.loading)}
              </ListItemIcon>
              <ListItemText primary={item.value} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {advancedDrawer.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            onClick={() => navigate(`${item.href}`)}
          >
            <ListItemButton>
              <ListItemIcon>
                {item.icon(schoolPlanConfig?.loading)}
              </ListItemIcon>
              <ListItemText primary={item.value} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {restDrawer.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            onClick={() => navigate(`${item.href}`)}
          >
            <ListItemButton>
              <ListItemIcon>
                {item.value === "Wyloguj"
                  ? item.icon
                  : item.icon(schoolPlanConfig?.loading)}
              </ListItemIcon>
              <ListItemText
                primary={item.value}
                sx={item.value === "Wyloguj" ? { color: "#ed6c02" } : {}}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Zespół Szkół Zawodowych nr 2 w Wypizdowie Wielkim
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          justifyContent: "center",
        }}
      >
        <Toolbar />
        <div className={styles.wrapper}>
          <Routes>
            <Route path="/classes" element={<Classes />} />
            <Route path="/timetables" element={<Timetables />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/classrooms" element={<Classrooms />} />
            <Route path="/labels" element={<Labels />} />
            <Route path="/lessons" element={<Lessons />} />
          </Routes>
        </div>
      </Box>
    </Box>
  );
});

export default Profile;

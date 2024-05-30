import HomeIcon from "@mui/icons-material/Home";
import TableChartIcon from "@mui/icons-material/TableChart";
import Looks3Icon from "@mui/icons-material/Looks3";
import SchoolIcon from "@mui/icons-material/School";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CalculateIcon from "@mui/icons-material/Calculate";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import CreateIcon from "@mui/icons-material/Create";
import LabelIcon from "@mui/icons-material/Label";
import { Skeleton } from "@mui/material";

export const schoolPlannerDrawer = [
  {
    id: 1,
    value: "Start",
    href: "/profile",
    icon: function (isLoading) {
      return isLoading ? (
        <Skeleton variant="rectangular" width={260} height={35} />
      ) : (
        <HomeIcon />
      );
    },
  },
  {
    id: 2,
    value: "Plany lekcji",
    href: "timetables",
    icon: function (isLoading) {
      return isLoading ? (
        <Skeleton variant="rectangular" width={260} height={35} />
      ) : (
        <TableChartIcon />
      );
    },
  },
  {
    id: 3,
    value: "Klasy",
    href: "classes",
    icon: function (isLoading) {
      return isLoading ? (
        <Skeleton variant="rectangular" width={260} height={35} />
      ) : (
        <Looks3Icon />
      );
    },
  },
  {
    id: 4,
    value: "Przedmioty",
    href: "subjects",
    icon: function (isLoading) {
      return isLoading ? (
        <Skeleton variant="rectangular" width={260} height={35} />
      ) : (
        <CalculateIcon />
      );
    },
  },
  {
    id: 5,
    value: "Nauczyciele",
    href: "teachers",
    icon: function (isLoading) {
      return isLoading ? (
        <Skeleton variant="rectangular" width={260} height={35} />
      ) : (
        <SchoolIcon />
      );
    },
  },
  {
    id: 6,
    value: "Sale lekcyjne",
    href: "classrooms",
    icon: function (isLoading) {
      return isLoading ? (
        <Skeleton variant="rectangular" width={260} height={35} />
      ) : (
        <MeetingRoomIcon />
      );
    },
  },
  {
    id: 7,
    value: "Etykiety",
    href: "labels",
    icon: function (isLoading) {
      return isLoading ? (
        <Skeleton variant="rectangular" width={260} height={35} />
      ) : (
        <LabelIcon />
      );
    },
  },
];

export const advancedDrawer = [
  {
    id: 101,
    value: "Preferencje",
    href: "preferences",
    icon: function (isLoading) {
      return isLoading ? (
        <Skeleton variant="rectangular" width={260} height={35} />
      ) : (
        <SettingsIcon />
      );
    },
  },
  {
    id: 102,
    value: "Zaawansowane",
    href: "advanced",
    icon: function (isLoading) {
      return isLoading ? (
        <Skeleton variant="rectangular" width={260} height={35} />
      ) : (
        <SettingsSuggestIcon />
      );
    },
  },
  {
    id: 103,
    value: "Kreator",
    href: "creator",
    icon: function (isLoading) {
      return isLoading ? (
        <Skeleton variant="rectangular" width={260} height={35} />
      ) : (
        <CreateIcon />
      );
    },
  },
];

export const restDrawer = [
  {
    id: 200,
    value: "Finanse",
    href: "finances",
    icon: function (isLoading) {
      return isLoading ? (
        <Skeleton variant="rectangular" width={260} height={35} />
      ) : (
        <MonetizationOnIcon />
      );
    },
  },
  {
    id: 201,
    value: "Wyloguj",
    href: null,
    icon: <LogoutIcon color="warning" />,
  },
];

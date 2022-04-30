import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import FlightIcon from "@mui/icons-material/Flight";
const menuItems = [
  {
    id: 1,
    name: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
    isAdmin: true,
    isUser: true,
  },
  {
    id: 2,
    name: "Passenger List",
    icon: <SupervisedUserCircleIcon />,
    path: "/passenger-list",
    isAdmin: false,
    isUser: false,
  },
  {
    id: 3,
    name: "Ancillary services",
    icon: <ElectricalServicesIcon />,
    path: "/ancillary-services",
    isAdmin: false,
    isUser: false,
  },
  {
    id: 4,
    name: "Check-in",
    icon: <FactCheckIcon />,
    path: "/check-in",
    isAdmin: false,
    isUser: true,
  },
  {
    id: 5,
    name: "In Flight",
    icon: <FlightIcon />,
    path: "/in-flight",
    isAdmin: false,
    isUser: true,
  },
];

export const serviceCategories = [
  {
    id: "1",
    name: "Ancillary Services",
  },
  {
    id: "2",
    name: "Special Meals",
  },
  {
    id: "3",
    name: "In Flight Shoppings",
  },
];

export default menuItems;

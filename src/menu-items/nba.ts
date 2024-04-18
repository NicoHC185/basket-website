// assets
import {
  IconDashboard,
  IconVs,
  IconUsersGroup,
  IconPlayBasketball,
  IconCalendarMonth,
} from "@tabler/icons-react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { IMenu } from "interfaces";

// constant
const icons = {
  IconDashboard,
  IconVs,
  IconUsersGroup,
  IconPlayBasketball,
  IconCalendarMonth,
  FiberManualRecordIcon,
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const NBA: IMenu = {
  id: "nba",
  title: "NBA",
  type: "group",
  icon: icons.IconDashboard,
  children: [
    {
      id: "games",
      title: "Games",
      type: "item",
      url: "games",
      icon: icons.IconVs,
      breadcrumbs: false,
    },
    {
      id: "teams",
      title: "Teams",
      type: "item",
      url: "teams",
      icon: icons.IconUsersGroup,
      breadcrumbs: false,
    },
    {
      id: "players",
      title: "Players",
      type: "item",
      url: "players",
      icon: icons.IconPlayBasketball,
      breadcrumbs: false,
    },
    {
      id: "calendar",
      title: "Calendar",
      type: "item",
      url: "calendar",
      icon: icons.IconCalendarMonth,
      breadcrumbs: false,
    },
  ],
};

export default NBA;

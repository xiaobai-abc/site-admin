// import * as Icons from "@arco-design/web-react/icon";
import {
  IconDashboard,
  IconUser,
  IconCodepen
} from "@arco-design/web-react/icon";

export default function Iconkey({ icon }) {
  function Icon(icon) {
    switch (icon) {
      case "IconDashboard":
        return <IconDashboard></IconDashboard>;
      case "IconUser":
        return <IconUser></IconUser>;
      case "IconCodepen":
        return <IconCodepen></IconCodepen>;
    }
  }
  return <>{Icon(icon)}</>;
}

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

import { BrowserRouter, Link as RouterLink } from "react-router-dom";
import RouteNav from "./routes";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
}));

const Header = () => {
  const { header, logo } = useStyles();

  const headersData = [
    {
      label: "Create Mentor",
      href: "/CreateMentor",
    },
    {
      label: "Create Student",
      href: "/CreateStudent",
    },
    {
      label: "Assign Mentor",
      href: "/AssignMentor",
    },
  ];

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  const displayDesktop = () => {
    return (
      <Toolbar>
        {Toplogo}

        <div className="menu"> {getMenuButtons()}</div>
      </Toolbar>
    );
  };
  const Toplogo = (
    <>
      <Typography variant="h4" component="h1" className={logo}>
        Assign Mentor
      </Typography>
    </>
  );

  return (
    <header>
      <BrowserRouter>
        <AppBar className={header}>{displayDesktop()}</AppBar>
        <RouteNav />
      </BrowserRouter>
    </header>
  );
};
export default Header;

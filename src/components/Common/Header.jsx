import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Logo from "../../assets/SpaceX-Logo.svg";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(5),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "6ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));

const pages = [
  { label: "Launches", link: "/launches/page/1" },
  { label: "Payloads", link: "/payloads/page/1" },
  { label: "Cores", link: "/cores/page/1" },
  { label: "Rockets", link: "/rockets/page/1" },
  { label: "Ships", link: "/ships/page/1" },
  { label: "Launch Pads", link: "/launchpads/page/1" },
];

function HideOnScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  return (
    <HideOnScroll>
      <AppBar sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{ flexGrow: 0 }}
          >
            <img
              src={Logo}
              className="App-logo"
              alt="SpaceX-Logo"
              style={{ width: "250px", height: "50px" }}
            />
          </Typography>

          {pages.map((page) => (
            <Button
              key={page.label}
              component={Link}
              to={page.link}
              color="inherit"
            >
              {page.label}
            </Button>
          ))}

          <Search sx={{ flexGrow: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Rockets, Payloads or Cores"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;

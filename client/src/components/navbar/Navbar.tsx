import { Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  LinkBox,
  LinkGroup,
  NavbarContainer,
  NavbarLink,
  NavbarLinks,
} from "./Navbar.styles";

import { UserContext } from "../../context/UserContext";

import {
  ACCESS_TOKEN,
  CLOSE_TIME,
  COLOR_1,
  COLOR_3,
} from "../../constants/constants";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";

export default function Navbar() {
  // const navigate = useNavigate();
  const { currentUser, userModifier } = useContext(UserContext);
  const location = useLocation();

  const handleOnLogoutClick = async () => {
    const jwtToken: string | null = localStorage.getItem(ACCESS_TOKEN);
    if (jwtToken) {
      userModifier(null);
      localStorage.clear();
      toast.success("You have successfully logged out", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: CLOSE_TIME,
      });
    } else {
      toast.error("Unsuccessful logout!!!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: CLOSE_TIME,
      });
    }
  };

  return (
    <>
      <Paper
        sx={{
          backgroundColor: COLOR_3,
          width: "300px",
          height: "90vh",
          minHeight: "500px",
          borderRadius: "10px",
          position: "absolute",
          top: "30px",
          left: "30px",
        }}
      >
        <NavbarContainer>
          <NavbarLinks>
            <Box
              sx={{
                width: "90%",
                margin: "-50px",
              }}
            >
              <Avatar
                src={currentUser?.imageUrl}
                sx={{ width: 100, height: 100 }}
              />
              <Typography variant="h5" sx={{ color: "silver" }}>
                Welcome
              </Typography>
              <Box
                sx={{
                  backgroundColor:
                    location.pathname === "/user" ? COLOR_3 : COLOR_1,
                }}
              >
                {currentUser && (
                  <NavbarLink to="/user">{currentUser.username}</NavbarLink>
                )}
              </Box>
            </Box>

            <LinkGroup>
              <LinkBox
                style={{
                  backgroundColor:
                    location.pathname === "/plants" ? COLOR_3 : COLOR_1,
                }}
              >
                <NavbarLink to="/plants">Add Plants</NavbarLink>
              </LinkBox>
              <LinkBox
                style={{
                  backgroundColor:
                    location.pathname === "/" ? COLOR_3 : COLOR_1,
                }}
              >
                {currentUser && <NavbarLink to="/">My Plants</NavbarLink>}
              </LinkBox>
              <LinkBox
                style={{
                  backgroundColor:
                    location.pathname === "/chat" ? COLOR_3 : COLOR_1,
                }}
              >
                {currentUser && <NavbarLink to="/chat">Chat</NavbarLink>}
              </LinkBox>
            </LinkGroup>
            {currentUser && (
              <Box sx={{ width: "90%" }}>
                <Button
                  variant="text"
                  startIcon={<ExitToAppIcon fontSize="large" />}
                  onClick={handleOnLogoutClick}
                  size="large"
                >
                  logout
                </Button>
              </Box>
            )}
          </NavbarLinks>
        </NavbarContainer>
      </Paper>
      <Outlet />
    </>
  );
}

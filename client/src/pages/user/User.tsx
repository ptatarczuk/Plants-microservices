/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import UserApi from "../../api/UserApi";
import { CLOSE_TIME, COLOR_3 } from "../../constants/constants";
import {
  UserInfoContainer,
  UserInfoDetails,
  UserMainContainerStyle,
} from "./User.styles";

export default function User() {
  const navigate = useNavigate();
  const { currentUser, userModifier } = useContext(UserContext);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const onDeleteClick = useCallback(async () => {
    try {
      if (currentUser?.id) {
        const response = await UserApi.deleteUserById(currentUser.id);
        if (
          response.data ===
          "Oops! Something went wrong, please try to delete user later!"
        ) {
          toast.error(
            "Oops! Something went wrong, please try to delete user later!",
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: CLOSE_TIME,
            }
          );
        } else if (response.data.includes("not found in database")) {
          console.log("response.data: ", response.data);
          toast.error(`User ${currentUser.id} not found in database`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: CLOSE_TIME,
          });
        } else {
          localStorage.clear();
          userModifier(null);
          navigate("/login");
          toast.success(response.data, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: CLOSE_TIME,
          });
        }
      }
    } catch (error: any) {
      let message: string;

      if (error.response && error.response.status === 400) {
        message = "Incorrect user Id";
      } else {
        message = "An error occured when trying to connect to server";
      }
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: CLOSE_TIME,
      });
    }
  }, [currentUser?.id, navigate, userModifier]);

  return (
    <UserMainContainerStyle>
      <Paper
        sx={{
          backgroundColor: COLOR_3,
          width: "500px",
          height: "90vh",
          minHeight: "500px",
          borderRadius: "10px",
        }}
      >
        <UserInfoContainer>
          <Typography variant="h4">User Profile</Typography>
          <UserInfoDetails>
            <Stack direction="column" spacing={3} mt={4} width="85%">
              <Box>
                <Typography variant="h6" color="text.secondary">
                  username:
                </Typography>
                <Typography variant="h5" sx={{ wordBreak: "break-all" }}>
                  {currentUser?.username}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" color="text.secondary">
                  email:
                </Typography>
                <Typography variant="h5" sx={{ wordBreak: "break-all" }}>
                  {currentUser?.sub}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" color="text.secondary">
                  role:
                </Typography>
                <Typography variant="h5">{currentUser?.role}</Typography>
              </Box>
            </Stack>
            <Stack
              width="200px"
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap={4}
            >
              {!confirmDelete && (
                <Button
                  size="large"
                  color="error"
                  sx={{ marginBottom: "36px" }}
                  onClick={() => setConfirmDelete(true)}
                >
                  Delete Account
                </Button>
              )}
              {confirmDelete && (
                <Button
                  size="large"
                  color="error"
                  sx={{ marginBottom: "36px" }}
                  onClick={() => onDeleteClick()}
                >
                  Confirm
                </Button>
              )}
              {confirmDelete && (
                <Button
                  size="large"
                  sx={{ marginBottom: "36px" }}
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancel
                </Button>
              )}
            </Stack>
          </UserInfoDetails>
        </UserInfoContainer>
      </Paper>
    </UserMainContainerStyle>
  );
}

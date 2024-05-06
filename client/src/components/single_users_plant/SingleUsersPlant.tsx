import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { UsersPlant } from "../../model/api/UsersPlant";
import { CLOSE_TIME, COLOR_1, COLOR_2 } from "../../constants/constants";
import UsersPlantApi from "../../api/UsersPlantApi";
import { CardInfoContainer } from "./SingleUsersPlant.styles";

interface SingleUsersPlantProps {
  usersPlant: UsersPlant;
  updateNextWatering: (updatedPlant: UsersPlant) => void;
  removeUsersPlant: (plantToBeDeletedId: number) => void;
}

export default function SingleUsersPlant({
  usersPlant,
  updateNextWatering,
  removeUsersPlant,
}: SingleUsersPlantProps) {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const waterPlant = useCallback(async () => {
    try {
      const response = await UsersPlantApi.updateNextWatering(usersPlant.id);
      const updatedPlant: UsersPlant = { ...response.data, needsWater: false };
      updateNextWatering(updatedPlant);
    } catch (error) {
      toast.error("something went wrong with the server!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: CLOSE_TIME,
      });
    }
  }, [updateNextWatering, usersPlant.id]);

  const deleteUsersPlant = useCallback(async () => {
    try {
      await UsersPlantApi.deleteUsersPlant(usersPlant.id);
      removeUsersPlant(usersPlant.id);
    } catch (error) {
      toast.error("something went wrong with the server!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: CLOSE_TIME,
      });
    }
  }, [usersPlant.id, removeUsersPlant]);

  return (
    // <Card sx={{ width: 245, backgroundColor: COLOR_2 }}>
    //   <CardMedia
    //     sx={{ height: 200 }}
    //     image={usersPlant.plant.photo}
    //     title={usersPlant.plant.name}
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       {usersPlant.plant.name}
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       {usersPlant.plant.description}
    //     </Typography>
    //     <Typography gutterBottom variant="body2" color="text.secondary">
    //       Water every {usersPlant.plant.wateringInterval} days
    //     </Typography>
    //     <Typography variant="body1" color="text.secondary">
    //       Water on {new Date(usersPlant.nextWatering).toLocaleDateString()}
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     {!confirmDelete && (
    //       <Button onClick={() => setConfirmDelete(true)}>Delete</Button>
    //     )}
    //     {confirmDelete && <Button onClick={deleteUsersPlant}>Confirm</Button>}
    //     {confirmDelete && (
    //       <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
    //     )}
    //     {!confirmDelete && usersPlant.needsWater && (
    //       <Button onClick={waterPlant}>Water me</Button>
    //     )}
    //   </CardActions>
    // </Card>
    <Paper
      elevation={4}
      sx={{
        backgroundColor: COLOR_1,
        width: "250px",
        height: "450px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardInfoContainer>
        <img
          src={usersPlant.plant.photo}
          alt="plant"
          width="200px"
          height="200px"
        />

        <Typography variant="h6">{usersPlant.plant.name}</Typography>
        <Stack spacing={1} sx={{ marginTop: "8px", width: "200px" }}>
          <Typography variant="subtitle1">
            Water every {usersPlant.plant.wateringInterval} days
          </Typography>
          <Typography variant="subtitle1" sx={{ wordBreak: "break-all" }}>
            {usersPlant.plant.description}
          </Typography>

          <Typography variant="subtitle2">
            Water on {new Date(usersPlant.nextWatering).toLocaleDateString()}
            {/* Water on {new Date(usersPlant.nextWatering).toLocaleString()} */}
          </Typography>
          <Box
            sx={{
              width: "200px",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            {!confirmDelete && (
              <Button onClick={() => setConfirmDelete(true)}>Delete</Button>
            )}
            {confirmDelete && (
              <Button onClick={deleteUsersPlant}>Confirm</Button>
            )}
            {confirmDelete && (
              <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
            )}
            {!confirmDelete && usersPlant.needsWater && (
              <Button onClick={waterPlant}>Water me</Button>
            )}
          </Box>
        </Stack>
      </CardInfoContainer>
    </Paper>
  );
}

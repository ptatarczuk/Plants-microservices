import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Plant } from "../../model/Plant";
import { COLOR_1 } from "../../constants/constants";
import { CardInfoContainer } from "./SinglePlant.styles";

interface SinglePlantProps {
  plant: Plant;
  addUsersPlant: (chosenPlantId: string) => void;
}

export default function SinglePlant({
  plant,
  addUsersPlant,
}: SinglePlantProps) {
  return (
    // <Card sx={{ width: 345 }}>
    //   <CardMedia sx={{ height: 200 }} image={plant.photo} title={plant.name} />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       {plant.name}
    //     </Typography>
    //     <Typography
    //       variant="body2"
    //       color="text.secondary"
    //       // sx={{ wordBreak: "break-all" }}
    //     >
    //       {plant.description}
    //     </Typography>
    //     <Typography variant="body1" color="text.secondary">
    //       Water every {plant.wateringInterval} days
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small" onClick={() => addUsersPlant(plant.id)}>
    //       Add to my collection
    //     </Button>
    //   </CardActions>
    // </Card>
    <Paper
      elevation={4}
      sx={{
        backgroundColor: COLOR_1,
        width: "250px",
        height: "420px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardInfoContainer>
        <Stack direction="column" alignItems="center">
          <img src={plant.photo} alt="plant" width="200px" height="200px" />
          <Typography variant="h6">{plant.name}</Typography>
        </Stack>
        <Stack spacing={1} sx={{ marginTop: "8px", width: "200px" }}>
          <Typography variant="subtitle1">
            Water every {plant.wateringInterval} days
          </Typography>
          <Typography variant="subtitle1" sx={{ wordBreak: "break-all" }}>
            {plant.description}
          </Typography>
        </Stack>

        {/* <Box
            sx={{
              width: "200px",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          > */}
        <Button onClick={() => addUsersPlant(plant.id)}>
          Add to my collection
        </Button>
        {/* </Box> */}
      </CardInfoContainer>
    </Paper>
  );
}

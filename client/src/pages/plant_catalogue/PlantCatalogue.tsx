/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import SearchPlants from "../../components/search_plant/SearchPlants";
import { Plant } from "../../model/Plant";
import {
  InfoContainer,
  LoaderContainer,
  PlantCatalogueMainContainerStyle,
  SearchBackgroundContainer,
  SearchPlantsContainer,
  SearchResultsContainer,
} from "./PlantCatalogue.styles";
import { UsersPlantCreate } from "../../model/api/UsersPlantCreate";
import { UserContext } from "../../context/UserContext";
import UsersPlantApi from "../../api/UsersPlantApi";
import { CLOSE_TIME } from "../../constants/constants";
import SinglePlant from "../../components/single_plant/SinglePlant";
import { Loader } from "../../router/App.styles";
import { Box, Paper, Stack, Typography } from "@mui/material";

export default function PlantCatalogue() {
  const { currentUser } = useContext(UserContext);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shouldDisplayNotFound, setShouldDisplayNotFound] =
    useState<boolean>(false);

  const updatePlants = (
    foundPlants: Plant[],
    shouldDisplayNotFound: boolean
  ) => {
    setPlants(foundPlants);
    setIsLoading(false);
    setShouldDisplayNotFound(shouldDisplayNotFound);
  };
  // roślinka not found - można użyć jak wyszukiwarka nic nie znajdzie
  // https://perenual.com/storage/image/upgrade_access.jpg

  const addUsersPlant = useCallback(
    async (chosenPlantId: string) => {
      try {
        if (currentUser?.id) {
          const usersPlantCreateRequest: UsersPlantCreate = {
            appUserId: currentUser.id,
            plantId: chosenPlantId,
          };

          await UsersPlantApi.addUsersPlant(usersPlantCreateRequest);
          toast.success("plant has been added to your collection", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: CLOSE_TIME,
          });
        }
      } catch (error: any) {
        let message: string;

        if (error.response && error.response.status === 400) {
          message = "Incorrect plant id or user id";
        } else {
          message = "An error occured when trying to connect to server";
        }
        toast.error(message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: CLOSE_TIME,
        });
      }
    },
    [currentUser?.id]
  );

  return (
    <PlantCatalogueMainContainerStyle>
      <SearchBackgroundContainer>
        <SearchPlantsContainer>
          <SearchPlants
            updatePlants={updatePlants}
            setIsLoading={setIsLoading}
          />
        </SearchPlantsContainer>
      </SearchBackgroundContainer>

      <SearchResultsContainer>
        {isLoading && (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        )}
        {shouldDisplayNotFound && (
          <InfoContainer>
            <Paper
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                borderRadius: "10px",
                padding: "20px",
                width: "350px",
              }}
            >
              <Stack
                direction="column"
                spacing={4}
                alignItems="center"
                mt="36px"
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "300px",
                    height: "300px",
                  }}
                >
                  <img
                    src="../../public/plant-svgrepo-com.svg"
                    width="280px"
                    style={{ position: "absolute" }}
                  />
                  <img
                    src="../../not-found-16-svgrepo-com.svg"
                    width="300px"
                    style={{ zIndex: "+5", position: "absolute" }}
                  />
                </Box>
                <Typography variant="h4">No plants found</Typography>
              </Stack>
            </Paper>
          </InfoContainer>
        )}
        {!shouldDisplayNotFound && !plants.length && !isLoading && (
          <InfoContainer>
            <Paper
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                borderRadius: "10px",
                padding: "20px",
                width: "350px",
                height: "380px",
              }}
            >
              <Stack
                direction="column"
                spacing={4}
                alignItems="center"
                height="380px"
              >
                <img src="../../public/plant-svgrepo-com.svg" width="300px" />
                <Typography variant="h4">Search for Your plants</Typography>
              </Stack>
            </Paper>
          </InfoContainer>
        )}
        {plants.map((plant) => (
          <SinglePlant
            key={plant.id}
            plant={plant}
            addUsersPlant={addUsersPlant}
          />
        ))}
      </SearchResultsContainer>
    </PlantCatalogueMainContainerStyle>
  );
}

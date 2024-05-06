import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { InputAdornment, TextField } from "@mui/material";
import { debounce } from "lodash";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Plant } from "../../model/Plant";
import PlantApi from "../../api/PlantApi";
import { CLOSE_TIME } from "../../constants/constants";

interface SearchPlantsProps {
  updatePlants: (foundPlants: Plant[], shouldDisplayNotFound: boolean) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<any>>;
}

const MIN_CHARS_TO_SEARCH: number = 3;

export default function SearchPlants({
  updatePlants,
  setIsLoading,
}: SearchPlantsProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [shouldSearch, setShouldSearch] = useState<boolean>(false);

  const searchPlantsByName = useCallback(async (searchName: string) => {
    try {
      setIsLoading(true);
      const response = await PlantApi.searchPlantsByName(searchName);
      response.data.length > 0
        ? updatePlants(response.data, false)
        : updatePlants(response.data, true);
    } catch (error) {
      toast.error("An error occured when trying to connect to server", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: CLOSE_TIME,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((searchName: string) => {
        return searchPlantsByName(searchName);
      }, 1200),
    [searchPlantsByName]
  );

  useEffect(() => {
    if (shouldSearch) {
      debouncedSearch(searchTerm);
      setShouldSearch(false);
    }
    if (!searchTerm) {
      updatePlants([], false);
    }
  }, [searchTerm, debouncedSearch, shouldSearch, updatePlants]);

  const onSearchTermChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= MIN_CHARS_TO_SEARCH) {
      setShouldSearch(true);
    }
  };

  const onClearClick = () => {
    setSearchTerm("");
    updatePlants([], false);
  };

  return (
    <TextField
      color="primary"
      fullWidth
      id="user_search_field"
      name="plants_serch_field"
      // label="Search e-mail"
      value={searchTerm}
      onChange={onSearchTermChange}
      placeholder="Search plants"
      // size={textFieldSize}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() => onClearClick()}
            />
          </InputAdornment>
        ),
        sx: {
          borderRadius: "10px", // Adjust the border radius as desired
        },
      }}
    />
  );
}

import { authorizedApi } from "../hoc/withAxiosIntercepted";
import { Plant } from "../model/Plant";

export default class PlantApi {
  static searchPlantsByName = async (searchName: string) =>
    authorizedApi.get<Plant[]>(`/api/plant/name`, {
      params: { name: searchName },
    });
}
// API do roślin
// https://perenual.com/api/species-list?key=sk-yyjM65eee55d0e0404529&indoor=1&page=1
// key=sk-yyjM65eee55d0e0404529

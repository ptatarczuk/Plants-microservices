import { authorizedApi } from "../hoc/withAxiosIntercepted";
import { UsersPlant } from "../model/api/UsersPlant";
import { UsersPlantCreate } from "../model/api/UsersPlantCreate";

export default class UsersPlantApi {
  static getUsersPlants = async (userId: string) =>
    authorizedApi.get<UsersPlant[]>(`/api/users_plant/${userId}`);

  static updateNextWatering = async (plantId: number) =>
    authorizedApi.patch<UsersPlant>(`/api/users_plant/${plantId}`);

  static deleteUsersPlant = async (plantId: number) =>
    authorizedApi.delete(`/api/users_plant/${plantId}`);

  static addUsersPlant = async (request: UsersPlantCreate) =>
    authorizedApi.post<UsersPlant>(`/api/users_plant/`, request);
}

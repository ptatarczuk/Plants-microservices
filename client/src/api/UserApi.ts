import { authorizedApi } from "../hoc/withAxiosIntercepted";

export default class UserApi {
  static deleteUserById = async (id: string) =>
    authorizedApi.delete<string>(`/api/user/${id}`);
}

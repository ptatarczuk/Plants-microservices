import axios from "axios";
import { authorizedApi } from "../hoc/withAxiosIntercepted";
import { Message } from "../model/socket/Message";

export default class ChatApi {
  static getChat = async (room: string) =>
    authorizedApi.get<Message[]>(`/api/message/${room}`);
}

// export default class ChatApi {
//   static getChat = async (room: string) =>
//     axios.get<Message[]>(`http://localhost:9090/api/message/${room}`);
// }

import { Plant } from "../Plant";

export interface UsersPlant {
  id: number;
  appUserId: string;
  plant: Plant;
  nextWatering: Date;
  needsWater: boolean;
}

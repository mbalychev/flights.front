import { IPagination } from "../../models/pagination";

export interface IFilterFlights {
  arrival: string;
  status: string;
  scheduledArriveMin: string;
  scheduledArriveMax: string;
}
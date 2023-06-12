import { IPagination } from "../../models/pagination";

export interface IFilterFlights {
  pagination: IPagination;
  arrival: string;
  status: string;
  scheduledArriveMin: string;
  scheduledArriveMax: string;
}

import { requestPost } from "../request";
import { IFilterFlights } from "./flights.intefaces";
import { IFlightResponse } from "../../models/flights";
import { IApiError } from "../../models/error";
import { IPagination } from '../../models/pagination';


const url = '/api/Flights';

export const getFlights = async (filter: IFilterFlights, pagination: IPagination): Promise<IFlightResponse | IApiError> => {
    const resp = await requestPost<IFlightResponse | IApiError>(`${url}`, { ...filter, pagination: pagination });

    return resp;
}
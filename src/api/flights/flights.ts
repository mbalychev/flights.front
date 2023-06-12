import { requestPost } from "../request";
import { IFilterFlights } from "./flights.intefaces";
import { IFlightResponse } from "../../models/flights";
import { IApiError } from "../../models/error";


const url = '/api/Flights';

export const getFlights = async (filter: IFilterFlights): Promise<IFlightResponse | IApiError> => {
    const resp = await requestPost<IFlightResponse | IApiError>(`${url}`, filter);

    return resp;
}
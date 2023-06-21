import { createEffect, createEvent, createStore } from "effector";
import { IFlight, IFlightResponse } from "../models/flights";
import { IFilterFlights } from "../api/flights/flights.intefaces";
import { IPagination } from "../models/pagination";
import { getFlights } from "../api/flights/flights";
import { IApiError } from "../models/error";
import { useStore } from "effector-react";
import { error } from "console";
import { Pagination } from 'antd';


const pagination: IPagination = {
    page: 1,
    onPage: 10,
    total: 0
}



export interface IStoreFlight {
    flights: IFlight[];
    pagination: IPagination;
    error?: IApiError;
}

const flightsStore = createStore<IStoreFlight>({ flights: [], pagination: {} as IPagination, error: undefined });

const setFlights = createEvent<IFlightResponse>('setFlights');
const setError = createEvent<IApiError | null>('person:setError');
const setPagination = createEvent<IPagination>('person:setPagination');

export const getFlightsFx = createEffect(async (filter: IFilterFlights) => {

    const resp = await getFlights(filter);

    if ('error' in resp) {
        setError(resp as IApiError);
    }

    return (resp as IFlightResponse);

})

export const setPaginationFx = createEffect((pagination: IPagination) => {
    return (pagination);
});

setPaginationFx.done.watch(({ result }) => {
    setPagination(result);
});

flightsStore.on(setPagination, (state: IStoreFlight, pagination: IPagination) => {
    return { ...state, pagination: pagination };
})

flightsStore.on(setError, (state: IStoreFlight, error: IApiError | null) => {
    if (error)
        return { ...state, error: error };
});



flightsStore.on(setFlights, (state: IStoreFlight, models: IFlightResponse) => ({
    ...state,
    flights: models.flights,
    pagination: {
        onPage: models.onPage,
        page: models.page,
        total: models.total
    },
    error: undefined
}
))

getFlightsFx.done.watch(({ result }) => {
    setPagination({ page: result.page, onPage: result.onPage, total: result.total })
    setFlights(result);
})

export const useFlights = () => {
    return {
        state: useStore(flightsStore),
        loading: useStore(getFlightsFx.pending)
    }
}
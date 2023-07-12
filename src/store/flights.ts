import { createEffect, createEvent, createStore } from "effector";
import { IFlight, IFlightResponse } from "../models/flights";
import { IFilterFlights } from "../api/flights/flights.intefaces";
import { IPagination } from "../models/pagination";
import { getFlights } from "../api/flights/flights";
import { IApiError } from "../models/error";
import { useStore } from "effector-react";
import { PaginationInit } from "../utils/init/paginations";

export interface IStoreFlight {
    flights: IFlight[]; //модели полетов
    filter: IFilterFlights; //фильтр полетов
    pagination: IPagination; //пагинация
    error?: IApiError; //возможные ошибки
}

const flightsStore = createStore<IStoreFlight>({ flights: [], pagination: PaginationInit, error: undefined, filter: {} as IFilterFlights });

const setFlights = createEvent<IFlight[]>('setFlights');
const setError = createEvent<IApiError | null>('flights:setError');
const setFilter = createEvent<IFilterFlights>('flights.filter');
const setPagination = createEvent<IPagination>('flights:setPagination');


//получить модели полетов
export const getFlightsFx = createEffect(async (filter: IFilterFlights) => {

    const resp = await getFlights(filter, flightsStore.getState().pagination);
    setFilter(filter);

    if ('error' in resp) {
        setError(resp as IApiError);
        return;
    }

    return (resp as IFlightResponse);

})

//установка модели пагинации (при смене пагинации)
export const setPaginationFx = createEffect((pagination: IPagination) => {
    return (pagination);
});

setPaginationFx.done.watch(({ result }) => {
    setPagination(result);
    getFlightsFx(flightsStore.getState().filter);
});

flightsStore.on(setFilter, (state: IStoreFlight, filter: IFilterFlights) => {
    return { ...state, filter: filter };
})

flightsStore.on(setPagination, (state: IStoreFlight, pagination: IPagination) => {
    return { ...state, pagination: pagination };
})

flightsStore.on(setError, (state: IStoreFlight, error: IApiError | null) => {
    if (error)
        return { ...state, error: error };
});

flightsStore.on(setFlights, (state: IStoreFlight, models: IFlight[]) => ({
    ...state,
    flights: models,
    error: undefined
}))

getFlightsFx.done.watch(({ result }) => {
    if (result) {
        setPagination({ page: result.page, onPage: result.onPage, total: result.total });
        setFlights(result.flights);
    }
})

export const useFlights = () => {
    return {
        state: useStore(flightsStore),
        loading: useStore(getFlightsFx.pending)
    }
}
import { createEffect, createEvent, createStore } from "effector";
import { IFlight, IFlightResponse } from "../models/flights";
import { IFilterFlights } from "../api/flights/flights.intefaces";
import { IPagination } from "../models/pagination";
import { getFlights } from "../api/flights/flights";
import { IApiError } from "../models/error";
import { useStore } from "effector-react";
import { error } from "console";


const pagination: IPagination = {
    page: 1,
    onPage: 10,
    total: 0
}

const filter: IFilterFlights = {
    pagination: pagination,
    arrival: 'SVO',
    status: 'Scheduled',
    scheduledArriveMin: new Date('2016.01.01').toISOString(),
    scheduledArriveMax: new Date('2023.01.01').toISOString()
}

export interface IStoreFlight {
    flights: IFlight[];
    pagination: IPagination;
    error?: IApiError;
}

const flightsStore = createStore<IStoreFlight>({ flights: [], pagination: {} as IPagination, error: undefined });

const setFlights = createEvent<IFlightResponse>('setFlights');
const setError = createEvent<IApiError | null>('person:setError');

export const getFlightsFx = createEffect(async () => {

    const resp = await getFlights(filter);

    if ('error' in resp) {
        setError(resp as IApiError);
    }

    return (resp as IFlightResponse);

})

flightsStore.on(setError, (state: IStoreFlight, error: IApiError | null) => {
    if (error)
        return { ...state, error: error };
}
);

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
    setFlights(result);
})

export const useFlights = () => {
    return {
        state: useStore(flightsStore),
        loading: useStore(getFlightsFx.pending)
    }
}
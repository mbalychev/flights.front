import React, { useEffect, useState } from "react";
import { IFlight, IFlightResponse } from "../../models/flights";
import { getFlights } from "../../api/flights/flights";
import { IPagination } from '../../models/pagination';
import { IFilterFlights } from "../../api/flights/flights.intefaces";
import { IApiError } from "../../models/error";
import { useFlights } from "../../store/flights";
import { error } from 'console';


export const Flights = () => {

    const [flights, setFlights] = useState<IFlight[]>();
    const [error, setError] = useState<IApiError>();
    const store = useFlights();

    const load = async () => {

        if (store.loading)
            setFlights(store.state.flights);

    }

    useEffect(() => {
        load();
    }, [store.loading])

    useEffect(() => {
        if (store.state.error) {
            setError(store.state.error);
        }
    }, [store.loading, store.state.error])

    return (
        <h2>Онлайн табло</h2>
    )
}
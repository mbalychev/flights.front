import React, { useEffect, useState } from "react";
import { IFlightResponse } from "../../models/flights";
import { getFlights } from "../../api/flights/flights";
import { IPagination } from '../../models/pagination';
import { IFilterFlights } from "../../api/flights/flights.intefaces";
import { IApiError } from "../../models/error";

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

export const Flights = () => {

    const [flights, setFlights] = useState<IFlightResponse>();
    const [error, setError] = useState<IApiError>();

    const load = async () => {

        const resp = await getFlights(filter);

        if ('error' in resp) {
            setError(resp as IApiError);
            return;
        }

        setFlights(resp as IFlightResponse);
    }

    useEffect(() => {
        load();
    }, [])

    return (
        <h2>Онлайн табло</h2>
    )
}
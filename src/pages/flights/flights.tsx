import React, { useEffect, useMemo, useState } from "react";
import { IPagination } from '../../models/pagination';
import { IApiError } from "../../models/error";
import { IStoreFlight, getFlightsFx, useFlights, setPaginationFx } from '../../store/flights';
import { FilterFlights } from "./filter";
import { PaginationInit } from "../../utils/init/paginations";
import { PaginationsComponent } from "../../components/common/PaginationsComponent";
import { Table } from "antd";
import { IFlight } from "../../models/flights";
import { ColumnsType } from "antd/es/table";
import { IFilterFlights } from "../../api/flights/flights.intefaces";

interface IFlightsModel extends IFlight {
    key: number;
}


export const Flights = () => {

    const [error, setError] = useState<IApiError>();
    const [pagination, setPagination] = useState<IPagination>(PaginationInit());
    const store = useFlights();

    const filter: IFilterFlights = {
        pagination: pagination,
        arrival: 'SVO',
        status: 'Scheduled',
        scheduledArriveMin: new Date('2016.01.01').toISOString(),
        scheduledArriveMax: new Date('2023.01.01').toISOString()
    }

    const load = async () => {

        getFlightsFx(filter);

    }

    const flights: IFlightsModel[] = useMemo(() => {

        if (!store.loading) {

            setPagination(store.state.pagination);

            return store.state.flights.map(f => ({
                ...f,
                key: f.flightId
            }));

        }
        else { return []; }

    }, [store.state])

    const flightsColumns: ColumnsType<IFlightsModel> = [
        {
            key: 'flightNo',
            title: 'No',
            dataIndex: 'flightNo',
            render: n => <span>{n}</span>


        }]

    useEffect(() => {
        load();
    }, [])

    useEffect(() => {
        if (store.state.error) {
            setError(store.state.error);
        }
    }, [store.loading, store.state.error])


    const onPaginationChange = (pagination: IPagination) => {
        setPagination(pagination);
        getFlightsFx({ ...filter, pagination: pagination });
    }

    return (
        <>
            <FilterFlights />
            <Table
                columns={flightsColumns}
                dataSource={flights}
                pagination={false}
            />
            <PaginationsComponent onChange={(p) => onPaginationChange(p)} pagination={pagination} />
        </>
    )
}
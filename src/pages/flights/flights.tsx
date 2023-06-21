import React, { useEffect, useMemo, useState } from "react";
import { IPagination } from '../../models/pagination';
import { IApiError } from "../../models/error";
import { getFlightsFx, useFlights, setPaginationFx } from '../../store/flights';
import { FilterFlights } from "./filter";
import { PaginationInit } from "../../utils/init/paginations";
import { PaginationsComponent } from "../../components/common/PaginationsComponent";
import { Table } from "antd";
import { IFlight } from "../../models/flights";
import { ColumnsType } from "antd/es/table";
import { IFilterFlights } from "../../api/flights/flights.intefaces";
import { ErrorComponent } from "../../components/common/Error";

interface IFlightsModel extends IFlight {
    key: number;
}

export const Flights = () => {

    const [error, setError] = useState<IApiError>();
    const [pagination, setPagination] = useState<IPagination>(PaginationInit);
    const store = useFlights();
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
        if (store.state.error) {
            setError(store.state.error);
        }
    }, [store.loading, store.state.error])


    const onPaginationChange = (pagination: IPagination) => {
        setPaginationFx(pagination);
    }

    const filterSubmit = async (filter: IFilterFlights) => {
        return await getFlightsFx(filter);
    }

    return (
        <>
            <FilterFlights search={filterSubmit} />
            {(error) ?
                <ErrorComponent error={error} />
                :
                <>
                    <Table
                        columns={flightsColumns}
                        dataSource={flights}
                        pagination={false}
                        loading={store.loading}
                    />
                    <PaginationsComponent onChange={(p) => onPaginationChange(p)} pagination={pagination} />
                </>}
        </>
    )
}
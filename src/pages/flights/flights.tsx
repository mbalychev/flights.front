import React, { useEffect, useMemo, useState } from "react";
import { IPagination } from '../../models/pagination';
import { IApiError } from "../../models/error";
import { getFlightsFx, useFlights, setPaginationFx } from '../../store/flights';
import { FilterFlights } from "./filter";
import { PaginationInit } from "../../utils/init/paginations";
import { PaginationsComponent } from "../../components/common/PaginationsComponent";
import { Popover, Space, Table } from "antd";
import { IFlight } from "../../models/flights";
import { ColumnsType } from "antd/es/table";
import { IFilterFlights } from "../../api/flights/flights.intefaces";
import { ErrorComponent } from "../../components/common/Error";
import { useThesaurus } from "../../hooks/thesaurus";
import { ITAirport } from "../../models/Thesaurus/TAiport";
import { StatusRus } from "../../utils/init/status";
import { ExclamationCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import moment from "moment";

interface IFlightsModel extends IFlight {
    key: number;
}

export const Flights = () => {

    const [error, setError] = useState<IApiError>();
    const [pagination, setPagination] = useState<IPagination>(PaginationInit);
    const store = useFlights();
    const { airports: { airportsState, ready } } = useThesaurus();
    const [airports, setAirports] = useState<ITAirport[]>([]);

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


    useEffect(() => {
        if (ready && airportsState) { setAirports(airportsState) }
    }, [ready])

    const getNameAirport = (code: string) => {
        const name = airports.find(x => x.code == code)?.name;

        return name;
    }

    //данные о задержки вылета
    const delayDeparture = (scheduledDeparture: string, actualDeparture?: string): JSX.Element => {
        if (!actualDeparture) { return <></> }

        const delay = moment.duration(moment(actualDeparture).diff(scheduledDeparture));
        // actualDeparture:    "2017-07-16T06:44:00Z"
        // scheduledDeparture: "2017-07-16T06:35:00Z"
        const content = (
            <>
                {`задержка вылета на ${delay.asMinutes()} минут`}
            </>
        )

        return (
            <Popover content={content}>
                <ExclamationCircleOutlined style={{ marginLeft: '10px' }} />
            </Popover>
        )
    }

    //данные о вылете
    const infoDeparture = (actualDeparture?: string): JSX.Element => {

        return actualDeparture ? (
            <Space>
                <span>
                    время вылета: {moment(actualDeparture).format('DD.MM.YYYY')} UTC
                </span>
            </Space>
        ) : <span>нет данных</span>
    }

    const flightsColumns: ColumnsType<IFlightsModel> = [
        {
            key: 'flightNo',
            title: 'No',
            dataIndex: 'flightNo',
            render: nom => <span>{nom}</span>
        },
        {
            key: 'departureAirport',
            title: 'место вылета',
            dataIndex: 'departureAirport',
            render: (code, { actualDeparture, scheduledDeparture }) =>
            (
                <>
                    <Popover
                        placement='right'
                        content={infoDeparture(actualDeparture)}>
                        <span>{getNameAirport(code)}</span>
                        <QuestionCircleOutlined
                            style={{ marginLeft: '10px' }} />
                    </Popover>
                    {delayDeparture(scheduledDeparture, actualDeparture)}
                </>
            )

        },
        {
            key: 'arrival',
            dataIndex: '',
            render: code => <span>{'->'}</span>

        },
        {
            key: 'arrival',
            title: 'место назначения',
            dataIndex: 'arrivalAirport',
            render: code => <span>{getNameAirport(code)}</span>

        },
        {
            key: 'status',
            title: 'статус',
            dataIndex: 'status',
            render: status => <span>{StatusRus(status)}</span>

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
                : <>
                    <Table
                        columns={flightsColumns}
                        dataSource={flights}
                        pagination={false}
                        loading={store.loading} />
                    <PaginationsComponent onChange={(p) => onPaginationChange(p)} pagination={pagination} />
                </>}
        </>
    )
}
import React, { useEffect, useMemo, useState } from "react";
import { IPagination } from '../../models/pagination';
import { IApiError } from "../../models/error";
import { getFlightsFx, useFlights, setPaginationFx } from '../../store/flights';
import { FilterFlights } from "./filter";
import { PaginationInit } from "../../utils/init/paginations";
import { PaginationsComponent } from "../../components/common/PaginationsComponent";
import { Breadcrumb, Col, Popover, Row, Space, Table, Tag } from "antd";
import { IFlight } from "../../models/flights";
import { ColumnsType } from "antd/es/table";
import { IFilterFlights } from "../../api/flights/flights.intefaces";
import { ErrorComponent } from "../../components/common/Error";
import { useThesaurus } from "../../hooks/thesaurus";
import { ITAirport } from "../../models/Thesaurus/TAiport";
import { StatusRus } from "../../utils/init/status";
import { ExclamationCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { ITAircrafts } from "../../models/Thesaurus/TAircrafts";
import imgTerminal from "../../images/terminal.jpeg"
import Title from "antd/es/typography/Title";
import { statusColor } from "../../utils/statusColor";
import { IoIosAirplane } from "../../../node_modules/react-icons/io"
interface IFlightsModel extends IFlight {
    key: number;
}

const colFirstStyle: React.CSSProperties = {
    padding: '20px'
}
const imgStyle: React.CSSProperties = {
    borderRadius: '10px',
    width: '100%',
}
export const Flights = () => {

    const [error, setError] = useState<IApiError>();
    const [pagination, setPagination] = useState<IPagination>(PaginationInit);
    const store = useFlights();
    const { airports: { airportsState, ready: readyAirports },
        aircrafts: { aircraftsState, ready: readyAircrafts } } = useThesaurus();
    const [airports, setAirports] = useState<ITAirport[]>([]);
    const [aircrafts, setAircrafts] = useState<ITAircrafts[]>([]);

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
        if (readyAirports && airportsState) { setAirports(airportsState) }
        if (readyAircrafts && aircraftsState) { setAircrafts(aircraftsState) }
    }, [readyAirports, readyAircrafts])

    const getNameAirport = (code: string) => {
        const name = airports.find(x => x.code == code)?.name;

        return name;
    }
    const getNameAircraft = (code: string) => {

        const name = aircrafts.find(x => x.code == code)?.model;
        // if (name) { return 'не определено'; }

        return name;
    }

    //данные о задержки вылета
    const delayDeparture = (scheduledDeparture: string, actualDeparture?: string): JSX.Element => {
        if (!actualDeparture) { return <></> }

        const delay = moment.duration(moment(actualDeparture).diff(scheduledDeparture));
        const content = (
            <>
                {`задержка вылета на ${delay.asMinutes()} минут`}
            </>
        )

        return (
            <Popover content={content}>
                <ExclamationCircleOutlined style={{ marginLeft: '10px', color: '##ad2102' }} />
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


    const departureInfo = (actualDeparture: string, code: string): JSX.Element => {
        if (actualDeparture) {
            return (
                <Popover
                    placement='right'
                    content={infoDeparture(actualDeparture)}>
                    <span>{getNameAirport(code)}</span>
                    <QuestionCircleOutlined
                        style={{ marginLeft: '10px', color: '#002c8c' }} />
                </Popover>
            )
        }

        return (
            <span>{getNameAirport(code)}</span>
        );
    }

    const flightsColumns: ColumnsType<IFlightsModel> = [
        {
            key: 'flightNo',
            title: 'рейс',
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
                    {departureInfo(actualDeparture, code)}
                    {delayDeparture(scheduledDeparture, actualDeparture)}
                </>
            )

        },
        {
            key: 'aircraftCode',
            title: 'судно',
            dataIndex: 'aircraftCode',
            render: code => <span>{getNameAircraft(code)}</span>
        },
        {
            key: 'arrival',
            dataIndex: '',
            width: '5%',
            render: code => <IoIosAirplane />

        },
        {
            key: 'arrival',
            title: 'место назначения',
            dataIndex: 'arrivalAirport',
            render: code => <span>{getNameAirport(code)}</span>

        },
        {
            key: 'scheduledArrival',
            title: 'время',
            dataIndex: 'scheduledArrival',
            render: date => <span>{moment(date).format('DD.MM.YYYY HH:MM')}</span>

        },
        {
            key: 'status',
            title: 'статус',
            dataIndex: 'status',
            render: status => <Tag color={statusColor(status)}>{StatusRus(status)}</Tag>

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
            <Row>
                <Col xl={6} lg={12} md={24} style={colFirstStyle}>
                    <img src={imgTerminal} style={imgStyle} />
                </Col>
                <Col xl={18} lg={12} md={24}>
                    <Title level={3}>Просмотр рейсов</Title>
                    <FilterFlights search={filterSubmit} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {(error) ?
                        <ErrorComponent error={error} />
                        : <>
                            <Table
                                columns={flightsColumns}
                                dataSource={flights}
                                pagination={false}
                                loading={store.loading}
                                scroll={{ y: 500 }}
                                style={{ width: '100%' }} />
                            <PaginationsComponent
                                onChange={(p) => onPaginationChange(p)}
                                pagination={pagination} />
                        </>}
                </Col>
            </Row>
        </>
    )
}
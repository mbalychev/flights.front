import '../../css/flights.css';
import React, { useEffect, useMemo, useState } from "react";
import { IPagination } from '../../models/pagination';
import { IApiError } from "../../models/error";
import { getFlightsFx, useFlights, setPaginationFx } from '../../store/flights';
import { FilterFlights } from "./filter";
import { PaginationInit } from "../../utils/init/paginations";
import { PaginationsComponent } from "../../components/common/PaginationsComponent";
import { Typography, Col, Popover, Row, Space, Table, Tag } from "antd";
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
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'

const { Text } = Typography;
interface IFlightsModel extends IFlight {
    key: number;
}

export const Flights = () => {

    const [error, setError] = useState<IApiError>();
    const [pagination, setPagination] = useState<IPagination>(PaginationInit);
    const store = useFlights();
    const {
        airports: { airportsState, ready: readyAirports },
        aircrafts: { aircraftsState, ready: readyAircrafts }
    } = useThesaurus();
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
                    время вылета: {dayjs(actualDeparture).format('DD.MM.YYYY HH.mm')}
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
            render: date => <span>{moment(date).format('DD.MM.YYYY HH:mm')}</span>

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

    const labledText = (label: string, child: string) => {
        return <>
            <Text type='secondary'>{label}</Text>
            <Text>{child}</Text>
        </>
    }

    const labledDate = (label: string, child: string) => {
        return <div className='divLabel'>
            <Text type='secondary' className='labelComponent'>{label}: </Text>
            <Text className='valueComponent'>{dayjs(child).format('DD.MM.YYYY HH:mm')}</Text>
        </div>
    }

    const expandedRow = (model: IFlightsModel) => {
        return <div className='divExpanded'>
            <div className='divArrival'>
                <Title level={5}>Место вылета</Title>
                {labledDate('планово', model.scheduledDeparture)}
                {labledDate('фактически', model.actualDeparture)}
            </div>
            <div className='divDeparture'>
                <Title level={5}>Место прибытия</Title>
                {labledDate('планово', model.scheduledArrival)}
                {labledDate('фактически', model.actualArrival)}
            </div>
        </div>

    }

    return (
        <>
            <div className='divHead'>
                <div className='divPicture'>
                    {/* <img src={imgTerminal} className='imgStyle' /> */}
                </div>
                <div className='divHeadFilter'>
                    <Title level={3} className='title'>Просмотр рейсов</Title>
                    <FilterFlights search={filterSubmit} />
                </div>
            </div>
            <div>
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
                                style={{ width: '100%' }}
                                expandable={{
                                    expandedRowRender: (record) => expandedRow(record)
                                }} />
                            <PaginationsComponent
                                onChange={(p) => onPaginationChange(p)}
                                pagination={pagination} />
                        </>}
                </Col>
            </div>
        </>
    )
}
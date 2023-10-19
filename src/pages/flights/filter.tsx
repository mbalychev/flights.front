import '../../css/flights.filter.css'
import Title from "antd/es/typography/Title"
import { AutoComplete, Button, Col, Form, Input, Row, Select, Space, Spin } from 'antd';
import { IFilterFlights } from '../../api/flights/flights.intefaces';
import { useEffect, useMemo, useState } from "react";
import { ITAirport } from "../../models/Thesaurus/TAiport";
import { useThesaurus } from '../../hooks/thesaurus';
import { Status } from "../../components/common/Status";
import { findFlightsNum } from "../../api/thesaurus/thesaurus";
import { SortType } from "../../models/flightSort";
import { purple } from '@ant-design/colors';
import { SearchOutlined } from '@ant-design/icons';
interface IProps {
    search: (filter: IFilterFlights) => void;
}


export const FilterFlights = (props: IProps) => {

    const { airports: { ready, airportsState, isLoading } } = useThesaurus();
    const [airports, setAiports] = useState<ITAirport[]>();
    const [flightsNumber, setFlightsNumber] = useState<{ value: string }[]>([]);
    const loading = useMemo((): boolean => {
        return isLoading;;
    }, [isLoading])

    useEffect(() => {
        if (airportsState) {
            setAiports(airportsState);
        }
    }, [ready])

    const search = (values: IFilterFlights) => {
        props.search(values);
    }

    const searchFlightsNum = async (num: string) => {

        if (num) {
            const resp = await findFlightsNum(num);

            let obj: { value: string }[] = [];
            (resp as string[]).forEach(n => {
                obj.push({ value: n });
            });
            setFlightsNumber(obj);
        }
    }

    return (
        <div style={{width: '100%'}}>
            <Spin spinning={loading}>
                <Form
                    initialValues={{ status: undefined }}
                    onFinish={search}>
                    <div className='filterPanel'>
                        <div className='inputDivMax'>
                            <div className='inputLabel'>назначение</div>
                            <Form.Item
                                name='arrival'
                                className='inputPanel'>
                                <Select
                                    options={airports?.map(x => ({ value: x.code, label: x.name }))}
                                    clearIcon={true} />
                            </Form.Item>
                        </div>
                        <div className='inputDivMin'>
                            <div className='inputLabel'>статус</div>
                            <Form.Item
                                name='sort'
                                className='inputPanel'>
                                <Select
                                    options={[
                                        { value: undefined, label: 'Все' },
                                        { value: 'Departed', label: 'Отбыл' },
                                        { value: 'Arrived', label: 'Прибыл' },
                                        { value: 'On Time', label: 'Вовремя' },
                                        { value: 'Cancelled', label: 'Отменен' },
                                        { value: 'Delayed', label: 'Отложенный' },
                                        { value: 'Scheduled', label: 'Планируется' }
                                    ]} />
                            </Form.Item>
                        </div>
                        <div className='inputDivMin'>
                            <div className='inputLabel'>рейс</div>
                            <Form.Item
                                name='number'
                                className='inputPanel'>
                                <AutoComplete
                                    allowClear
                                    defaultValue={undefined}
                                    options={flightsNumber}
                                    onSearch={(num) => searchFlightsNum(num)} />
                            </Form.Item>
                        </div>
                        <div className='inputDivMin'>
                            <div className='inputLabel'>сорт.</div>
                            <Form.Item
                                name='sort'
                                className='inputPanel'>
                                <Select
                                    allowClear
                                    defaultValue={undefined}
                                    options={[
                                        { value: SortType.status, label: 'статус' },
                                        { value: SortType.arrivalTime, label: 'время прилета' },
                                        { value: SortType.departureTime, label: 'время вылета' }
                                    ]} />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='filterButtonsPanel'>
                        <Form.Item>
                            <Button
                                className='buttonStandart'
                                htmlType="submit"
                                type='primary'>
                                <SearchOutlined />
                                найти
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Spin>
        </div>
    )
}
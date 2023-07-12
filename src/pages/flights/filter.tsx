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
        <div style={{ marginTop: '20px' }}>

            <Spin spinning={loading}>
                <Form

                    initialValues={{ status: undefined }}
                    onFinish={search}>

                    <Row>
                        <Col xxl={7} xl={10} lg={24}>
                            <Form.Item
                                name='arrival'
                                label='место назначения'
                                labelCol={{ xl: { span: 9 }, lg: { span: 12 } }}>
                                <Select
                                    options={airports?.map(x => ({ value: x.code, label: x.name }))}
                                    style={{ width: '200px' }} clearIcon={true} />
                            </Form.Item>
                        </Col>
                        <Col xxl={4} xl={8} lg={24}>
                            <Form.Item
                                name='status'
                                label='статус'
                                labelCol={{ xl: { span: 5 }, lg: { span: 12 } }}
                                style={{ textAlign: 'left' }}>
                                <Select
                                    style={{ width: '150px' }}
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
                        </Col>
                        <Col xxl={6} xl={8} lg={24}>
                            <Form.Item
                                name='number'
                                label='№ рейса'
                                labelCol={{ xl: { span: 6 }, lg: { span: 12 } }}>
                                <AutoComplete
                                    allowClear
                                    defaultValue={undefined}
                                    options={flightsNumber}
                                    onSearch={(num) => searchFlightsNum(num)}
                                    style={{ width: '200px' }} />
                            </Form.Item>
                        </Col>
                        <Col xxl={6} xl={8} lg={24}>
                            <Form.Item
                                name='sort'
                                label='сортировка:'
                                labelCol={{ xl: { span: 7 }, lg: { span: 12 } }}>
                                <Select
                                    allowClear
                                    defaultValue={undefined}
                                    style={{ width: '150px' }}
                                    options={[
                                        { value: SortType.status, label: 'статус' },
                                        { value: SortType.arrivalTime, label: 'время прилета' },
                                        { value: SortType.departureTime, label: 'время вылета' }
                                    ]} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4} offset={20}>
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    type='primary'
                                    style={{ width: '100%', backgroundColor: '#3d2f4f', borderColor: '#0d031c' }}> найти </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </div>
    )
}
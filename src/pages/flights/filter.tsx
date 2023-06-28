import Title from "antd/es/typography/Title"
import { AutoComplete, Button, Form, Input, Select, Space, Spin } from 'antd';
import { IFilterFlights } from '../../api/flights/flights.intefaces';
import { useEffect, useMemo, useState } from "react";
import { ITAirport } from "../../models/Thesaurus/TAiport";
import { useThesaurus } from '../../hooks/thesaurus';
import { Status } from "../../components/common/Status";
import { findFlightsNum } from "../../api/thesaurus/thesaurus";

interface IProps {
    search: (filter: IFilterFlights) => void;
}


export const FilterFlights = (props: IProps) => {

    const [filter, setFilter] = useState<IFilterFlights>();
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
        <>
            <Spin spinning={loading}>
                <Space>
                    <Form
                        initialValues={{ status: undefined }}
                        onFinish={search}
                        layout='inline'>
                        <Form.Item
                            name='arrival'
                            label='место назначения'>
                            <Select
                                options={airports?.map(x => ({ value: x.code, label: x.name }))}
                                style={{ width: '200px' }} />
                        </Form.Item>
                        <Form.Item
                            name='status'
                            label='статус'>
                            <Select
                                style={{ width: '100px' }}
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
                        <Form.Item
                            name='number'
                            label='№ рейса'>
                            <AutoComplete
                                options={flightsNumber}
                                onSearch={(num) => searchFlightsNum(num)}
                                style={{ width: '200px' }} />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                type='primary'> найти </Button>
                        </Form.Item>
                    </Form>
                </Space>
            </Spin>
        </>
    )
}
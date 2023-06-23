import Title from "antd/es/typography/Title"
import { Button, Form, Select, Space, Spin } from 'antd';
import { IFilterFlights } from '../../api/flights/flights.intefaces';
import { useEffect, useMemo, useState } from "react";
import { ITAirport } from "../../models/Thesaurus/TAiport";
import { useThesaurus } from '../../hooks/thesaurus';
import { Status } from "../../components/common/Status";

interface IProps {
    search: (filter: IFilterFlights) => void;
}


export const FilterFlights = (props: IProps) => {

    const [filter, setFilter] = useState<IFilterFlights>();
    const { airports: { ready, airportsState, isLoading } } = useThesaurus();
    const [airports, setAiports] = useState<ITAirport[]>([]);

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

    return (
        <>
            <Title level={5}>фильтр</Title>
            <Spin spinning={loading}>

                <Space>
                    <Form
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
                            {/* не передает значение */}
                            {/* <Status width={`200px`} /> */}
                            <Select
                                style={{ width: '100px' }}
                                defaultValue={null}
                                options={[
                                    { value: null, label: 'Все' },
                                    { value: 'Departed', label: 'Отбыл' },
                                    { value: 'Arrived', label: 'Прибыл' },
                                    { value: 'On Time', label: 'Вовремя' },
                                    { value: 'Cancelled', label: 'Отменен' },
                                    { value: 'Delayed', label: 'Отложенный' },
                                    { value: 'Scheduled', label: 'Планируется' }
                                ]} />
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